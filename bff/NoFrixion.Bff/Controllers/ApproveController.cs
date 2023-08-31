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
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    private string _payoutBaseUrl;
    private string _callbackUrl;
    private bool _isDevelopment = false;
    
    private readonly IConfiguration _config;
    private readonly ILogger<ApproveController> _logger;
    private readonly IAntiforgery _antiforgery;
    private readonly IMoneyMoovClient _moneyMoovClient;
    private readonly ITokenAcquirer _tokenAcquirer;

    public ApproveController(IConfiguration config, 
        ILogger<ApproveController> logger, 
        IAntiforgery antiforgery,
        IMoneyMoovClient moneyMoovClient,
        ITokenAcquirer tokenAcquirer)
    {
        _config = config;
        _logger = logger;
        _antiforgery = antiforgery;
        _moneyMoovClient = moneyMoovClient;
        _tokenAcquirer = tokenAcquirer;
        
        var developmentBaseUrl = _config[ConfigKeys.NOFRIXION_DEVELOPMENT_BASE_URL];
        
        if (!string.IsNullOrEmpty(developmentBaseUrl))
        {
            _isDevelopment = true;
            _payoutBaseUrl = developmentBaseUrl + "/home/payouts/";
        }
        
        _callbackUrl = _config[ConfigKeys.NOFRIXION_MONEYMOOV_BUSINESS_BASE_URL] + "/approve/callback";
    }
    
    // GET
    public IActionResult Index()
    {
        return View();
    }
    
    [Route("/approve/initiate")]
    public IActionResult Initiate(ApproveTypesEnum approveType, Guid id)
    {
        _logger.LogInformation($"Approve {nameof(Initiate)} requested for {approveType} and ID {id}.");

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
        if (cancelled)
        {
            _logger.LogInformation($"Approval callback, cancellation for id {id}, approval type {approveType}.");
            
            return Redirect( $"{_payoutBaseUrl}{id}/cancel");
        }
        else if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(state))
        {
            _logger.LogWarning($"Approval callback, the code or state fields were missing in the approve callback.");
            
            return Redirect( $"{_payoutBaseUrl}{id}/error");
        }
        else
        {
            _logger.LogInformation($"Approval callback received with code and state set.");

            // Skip the anti-forgery token validation in development mode.
            if (!_isDevelopment)
            {
                try
                {
                    Request.Headers.Add("RequestVerificationToken", state);
                    await _antiforgery.ValidateRequestAsync(HttpContext);
                }
                catch
                {
                    _logger.LogError($"Approval callback validation of the state anti-forgery token failed.");
            
                    return Redirect( $"{_payoutBaseUrl}{id}/error");
                }    
            }
            
            var tokenResponse = await _tokenAcquirer.GetToken(code, _callbackUrl);

            if (string.IsNullOrEmpty(tokenResponse?.AccessToken))
            {
                _logger.LogWarning($"Approval callback failed to get access token from the identity server.");
            
                return Redirect( $"{_payoutBaseUrl}{id}/error");
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                if (tokenHandler.CanReadToken(tokenResponse?.AccessToken))
                {
                    var token = tokenHandler.ReadJwtToken(tokenResponse?.AccessToken);

                    var approveResult = new ApproveResultModel(token.Claims);

                    _logger.LogInformation($"Approval callback access token successfully acquired and parsed for approval type {approveResult.ApproveType} and ID {approveResult.ID}.");

                    switch (approveResult.ApproveType)
                    {
                        case ApproveTypesEnum.BatchPayout:

                            var batchPayoutApproveResponse = await _moneyMoovClient.PayoutClient().SubmitBatchPayoutAsync(tokenResponse.AccessToken, approveResult.ID);

                            if (batchPayoutApproveResponse.Problem.IsEmpty)
                            {
                                _logger.LogInformation($"{approveResult.ApproveType} {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                                
                                return Redirect( $"{_payoutBaseUrl}{approveResult.ID}/success");
                            }
                            else
                            {
                                _logger.LogWarning($"Failed to approve {approveResult.ApproveType} {approveResult.ID} for user ID {User.WhoAmI()}. {batchPayoutApproveResponse.Problem.ToTextErrorMessage()}");
                                
                                return Redirect( $"{_payoutBaseUrl}{approveResult.ID}/error");
                            }

                        case ApproveTypesEnum.Payout:

                            var payoutApproveResponse = await _moneyMoovClient.PayoutClient().SubmitPayoutAsync(tokenResponse.AccessToken, approveResult.ID);

                            if (payoutApproveResponse.Problem.IsEmpty)
                            {
                                _logger.LogInformation($"{approveResult.ApproveType} {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                                
                                return Redirect( $"{_payoutBaseUrl}{approveResult.ID}/success");
                            }
                            else
                            {
                                _logger.LogWarning($"Failed to approve {approveResult.ApproveType} {approveResult.ID} for user ID {User.WhoAmI()}. {payoutApproveResponse.Problem.ToTextErrorMessage()}");
                                
                                return Redirect( $"{_payoutBaseUrl}{approveResult.ID}/error");
                            }

                        default:

                            _logger.LogWarning($"Approval callback no post approval action for {approveResult.ApproveType}.");
                            
                            return Redirect( $"{_payoutBaseUrl}{id}/error");
                    }
                }
                else
                {
                    _logger.LogWarning($"Approval callback failed to parse JWT access token after successful approval.");
                    
                    return Redirect( $"{_payoutBaseUrl}{id}/error");
                }
            }
        }
    }
}