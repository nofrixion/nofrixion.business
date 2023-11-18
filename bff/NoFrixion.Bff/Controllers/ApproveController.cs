//  -----------------------------------------------------------------------------
//   Filename: ApproveController.cs
// 
//   Description: Controller for initiating and handling approval callbacks from the identity server:
// 
//   Author(s):
//   Donal O'Connor (donal@nofrixion.com)
// 
//   History:
//   30 08 2023  Donal O'Connor   Created, Harcourt Street,
//  Dublin, Ireland.
// 
//   License:
//   Proprietary NoFrixion.
//  -----------------------------------------------------------------------------

using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using NoFrixion;
using NoFrixion.MoneyMoov;
using NoFrixion.MoneyMoov.Claims;
using NoFrixion.MoneyMoov.Enums;
using NoFrixion.MoneyMoov.Extensions;
using NoFrixion.MoneyMoov.Models.Approve;
using NoFrixion.MoneyMoov.TokenAcquirers;

namespace Nofrixion.Bff.Controllers;

[AllowAnonymous]
[Route("/approve")]
public class ApproveController : Controller
{
    private const string CallerBaseUrl = "CallerBaseUrl";
    private string _payoutBaseUrl;
    private string _callbackUrl;
    
    private readonly IConfiguration _config;
    private readonly ILogger<ApproveController> _logger;
    private readonly IAntiforgery _antiforgery;
    private readonly IMoneyMoovClient _moneyMoovClient;
    private readonly ITokenAcquirer _tokenAcquirer;
    private readonly IDistributedCache _cache;

    public ApproveController(IConfiguration config, 
        ILogger<ApproveController> logger, 
        IAntiforgery antiforgery,
        IMoneyMoovClient moneyMoovClient,
        ITokenAcquirer tokenAcquirer,
        IDistributedCache cache)
    {
        _config = config;
        _logger = logger;
        _antiforgery = antiforgery;
        _moneyMoovClient = moneyMoovClient;
        _tokenAcquirer = tokenAcquirer;
        _cache = cache;

        var developmentBaseUrl = _config[ConfigKeys.NOFRIXION_DEVELOPMENT_BASE_URL];
        
        if (!string.IsNullOrEmpty(developmentBaseUrl))
        {
            _payoutBaseUrl = developmentBaseUrl;
        }
        
        _callbackUrl = _config[ConfigKeys.NOFRIXION_MONEYMOOV_BUSINESS_BASE_URL] + "/approve/callback";
    }
    
    [Route("/approve/initiate")]
    public async Task<IActionResult> Initiate(ApproveTypesEnum approveType, Guid id, string callerBaseUrl)
    {
        _logger.LogInformation($"Approve {nameof(Initiate)} requested for {approveType} and ID {id}.");

        _payoutBaseUrl += callerBaseUrl;
        
        await _cache.SetStringAsync($"{id}.{CallerBaseUrl}", _payoutBaseUrl);
        
        var approvalUrl = _config[ConfigKeys.NOFRIXION_IDENTITY_DOMAIN] + "/approve";

        var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
        var state = tokens.RequestToken;

        var approveModel = new ApproveModel
        {
            ApproveType = approveType,
            ID = id,
            ReturnUrl = _callbackUrl,
            ClientID = _config[ConfigKeys.NOFRIXION_IDENTITY_CLIENTID],
            State = state
        };

        return Redirect(approvalUrl.ToUrl(approveModel.ToQueryParams()));
    }
    
    /// <summary>
    /// Callback action for the result of an identity server approval operation. A common callback
    /// is used for all items that require approval. For cancellations the approve type parameter
    /// will be set to indicate the item type. For successful approvals the access token acquired
    /// from the identity server will specify item type.
    /// </summary>
    /// <param name="code">If successful this will contain the OAuth2 code that can be used
    /// to acquire an access token from the identity server.</param>
    /// <param name="state">If successful this will contain the OAuth2 state that can be used
    /// to verify the callback in response to a genuine approval generated from this application.</param>
    /// <param name="id">Only set if the callback is for a cancellation and contains the ID of the
    /// payout that was being approved.</param>
    /// <param name="approveType">Only set if the callback is for a cancellation and contains the type of
    /// approval that was taking place.</param>
    /// <param name="cancelled">Set to true if the approval operation was cancelled.</param>
    [Route("/approve/callback")]
    public async Task<IActionResult> Callback(string code, string state, Guid id, ApproveTypesEnum approveType, bool cancelled = false)
    {
        var baseUrl = await _cache.GetStringAsync($"{id}.{CallerBaseUrl}");
        
        if (cancelled)
        {
            _logger.LogInformation($"Approval callback, cancellation for id {id}, approval type {approveType}.");
            
            return Redirect( $"{baseUrl}{id}/cancel");
        }
        else if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(state))
        {
            _logger.LogWarning($"Approval callback, the code or state fields were missing in the approve callback.");
            
            return RedirectResultError(baseUrl, id, new NoFrixionProblem("The code or state fields were missing in the approve callback."));
        }
        else
        {
            _logger.LogInformation($"Approval callback received with code and state set.");

            Request.Headers.Add("RequestVerificationToken", state);

            if (!await _antiforgery.IsRequestValidAsync(HttpContext))
            {
                _logger.LogError($"Approval callback validation of the state anti-forgery token failed.");
    
                return RedirectResultError(baseUrl, id, new NoFrixionProblem("The state field could not be validated, please refresh the page and try again."));
            }
            
            var tokenResponse = await _tokenAcquirer.GetToken(code, _callbackUrl);

            if (string.IsNullOrEmpty(tokenResponse?.AccessToken))
            {
                _logger.LogWarning($"Approval callback failed to get access token from the identity server.");
            
                return RedirectResultError(baseUrl, id, new NoFrixionProblem("Failed to get access token from the identity server."));
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                if (tokenHandler.CanReadToken(tokenResponse?.AccessToken))
                {
                    var token = tokenHandler.ReadJwtToken(tokenResponse?.AccessToken);

                    var approveResult = new ApproveResultModel(token.Claims);

                    baseUrl = await _cache.GetStringAsync($"{approveResult.ID}.{CallerBaseUrl}");
                    
                    _logger.LogInformation($"Approval callback access token successfully acquired and parsed for approval type {approveResult.ApproveType} and ID {approveResult.ID}.");

                    switch (approveResult.ApproveType)
                    {
                        case ApproveTypesEnum.BatchPayout:

                            var batchPayoutApproveResponse = await _moneyMoovClient.PayoutClient().SubmitBatchPayoutAsync(tokenResponse.AccessToken, approveResult.ID);

                            if (batchPayoutApproveResponse.Problem.IsEmpty)
                            {
                                _logger.LogInformation($"{approveResult.ApproveType} {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                                
                                return Redirect( $"{baseUrl}{approveResult.ID}/success");
                            }
                            else
                            {
                                _logger.LogWarning($"Failed to approve {approveResult.ApproveType} {approveResult.ID} for user ID {User.WhoAmI()}. {batchPayoutApproveResponse.Problem.ToTextErrorMessage()}");
                                
                                return RedirectResultError(baseUrl, approveResult.ID, batchPayoutApproveResponse.Problem);
                            }

                        case ApproveTypesEnum.Payout:

                            var payoutApproveResponse = await _moneyMoovClient.PayoutClient().SubmitPayoutAsync(tokenResponse.AccessToken, approveResult.ID);

                            if (payoutApproveResponse.Problem.IsEmpty)
                            {
                                _logger.LogInformation($"{approveResult.ApproveType} {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                                
                                return Redirect( $"{baseUrl}{approveResult.ID}/success");
                            }
                            else
                            {
                                _logger.LogWarning($"Failed to approve {approveResult.ApproveType} {approveResult.ID} for user ID {User.WhoAmI()}. {payoutApproveResponse.Problem.ToTextErrorMessage()}");
                                
                                return RedirectResultError(baseUrl, approveResult.ID, payoutApproveResponse.Problem);
                            }
                        
                        case ApproveTypesEnum.Beneficiary:

                            var beneficiaryApproveResponse = await _moneyMoovClient.BeneficiaryClient().AuthoriseBeneficiaryAsync(tokenResponse.AccessToken, approveResult.ID);

                            if (beneficiaryApproveResponse.Problem.IsEmpty)
                            {
                                _logger.LogInformation($"{approveResult.ApproveType} {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                                
                                return Redirect( $"{baseUrl}{approveResult.ID}/success");
                            }
                            else
                            {
                                _logger.LogWarning($"Failed to approve {approveResult.ApproveType} {approveResult.ID} for user ID {User.WhoAmI()}. {beneficiaryApproveResponse.Problem.ToTextErrorMessage()}");
                                
                                return RedirectResultError(baseUrl, approveResult.ID, beneficiaryApproveResponse.Problem);
                            }

                        default:

                            _logger.LogWarning($"Approval callback no post approval action for {approveResult.ApproveType}.");
                            
                            return RedirectResultError(baseUrl, approveResult.ID, new NoFrixionProblem($"The approve type of {approveResult.ApproveType} was not recognised. Please try again and if the problem persists contact support."));
                    }
                }
                else
                {
                    _logger.LogWarning($"Approval callback failed to parse JWT access token after successful approval.");
                    
                    return RedirectResultError(baseUrl, id, new NoFrixionProblem("Failed to acquire access token required to approve the operation. Please try again and if the problem persists contact support."));
                }
            }
        }
    }

    private RedirectResult RedirectResultError(string? baseUrl, Guid id, NoFrixionProblem problem)
    {
        var error = JsonSerializer.Serialize(problem);
        
        return Redirect( $"{baseUrl}{id}/error?apiError={Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(error))}");
    }
}