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

        string approvalUrl = _config[ConfigKeys.NOFRIXION_IDENTITY_DOMAIN] + "/approve";

        var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
        var state = tokens.RequestToken;

        string returnUrl = "/Approve/Callback";

        var approveModel = new ApproveModel
        {
            ApproveType = approveType,
            ID = id,
            ReturnUrl = returnUrl,
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
            // _logger.LogInformation($"Approval callback, cancellation for id {id}, approval type {approveType}.");
            // TempData[TempDataKeys.ERROR_MESSAGE] = $"The {approveType} approve operation was cancelled.";
            //
            // var redirectAction = approveType switch
            // {
            //     var at when at == ApproveTypesEnum.Payout && id != Guid.Empty => RedirectToAction("Display", "Payout", new { id = id }),
            //     ApproveTypesEnum.BatchPayout => RedirectToAction("All", "Payout"),
            //     ApproveTypesEnum.Payout => RedirectToAction("All", "Payout"),
            //     // ApproveTypesEnum.Rule => RedirectToAction("All", "Rule"),
            //     // ApproveTypesEnum.Message => RedirectToAction(nameof(Result)),
            //     // ApproveTypesEnum.UserToken => RedirectToAction("CreateApiTokenResult", "Account"),
            //     _ => RedirectToAction(nameof(Result)),
            // };
            //
            // return redirectAction;
            return Redirect("Payout?id=" + id);
        }
        else if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(state))
        {
            // _logger.LogWarning($"Approval callback, the code or state fields were missing in the approve callback.");
            // TempData[TempDataKeys.ERROR_MESSAGE] = "The code or state fields were missing in the approve callback.";
            // return RedirectToAction(nameof(Result));
            return Redirect("Payout?id=" + id);
        }
        else
        {
            _logger.LogInformation($"Approval callback received with code and state set.");

            try
            {
                Request.Headers.Add("RequestVerificationToken", state);
                await _antiforgery.ValidateRequestAsync(HttpContext);
            }
            catch
            {
                _logger.LogError($"Approval callback validation of the state anti-forgery token failed.");
                // TempData[TempDataKeys.ERROR_MESSAGE] = "The state field could not be validated, please refresh the page and try again.";
                // return RedirectToAction(nameof(Result));
                return Redirect("Payout?id=" + id);
            }

            string redirectUri = "/Approve/Callback";
            var tokenResponse = await _tokenAcquirer.GetToken(code, redirectUri);

            if (string.IsNullOrEmpty(tokenResponse?.AccessToken))
            {
                _logger.LogWarning($"Approval callback failed to get access token from the identity server.");
                // TempData[TempDataKeys.ERROR_MESSAGE] = "Failed to get access token from the identity server.";
                // return RedirectToAction(nameof(Result));
                return Redirect("Payout?id=" + id);
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                if (tokenHandler.CanReadToken(tokenResponse?.AccessToken))
                {
                    JwtSecurityToken token = tokenHandler.ReadJwtToken(tokenResponse?.AccessToken);

                    var approveResult = new ApproveResultModel(token.Claims);

                    _logger.LogInformation($"Approval callback access token successfully acquired and parsed for approval type {approveResult.ApproveType} and ID {approveResult.ID}.");

                    switch (approveResult.ApproveType)
                    {
                        case ApproveTypesEnum.BatchPayout:

                            var batchPayoutApproveResponse = await _moneyMoovClient.PayoutClient().SubmitBatchPayoutAsync(tokenResponse.AccessToken, approveResult.ID);

                            if (batchPayoutApproveResponse.Problem.IsEmpty)
                            {
                                _logger.LogInformation($"{approveResult.ApproveType} {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                                // TempData[TempDataKeys.SUCCESS_MESSAGE] = $"{approveResult.ApproveType} successfully approved and submitted.";
                            }
                            else
                            {
                                _logger.LogWarning($"Failed to approve {approveResult.ApproveType} {approveResult.ID} for user ID {User.WhoAmI()}. {batchPayoutApproveResponse.Problem.ToTextErrorMessage()}");
                                // TempData[TempDataKeys.ERROR_MESSAGE] = batchPayoutApproveResponse.Problem.ToHtmlErrorMessage();
                            }

                            return Redirect("Payout?id=" + id);

                        case ApproveTypesEnum.Payout:

                            var payoutApproveResponse = await _moneyMoovClient.PayoutClient().SubmitPayoutAsync(tokenResponse.AccessToken, approveResult.ID);

                            if (payoutApproveResponse.Problem.IsEmpty)
                            {
                                _logger.LogInformation($"{approveResult.ApproveType} {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                                // TempData[TempDataKeys.SUCCESS_MESSAGE] = $"{approveResult.ApproveType} successfully approved and submitted.";
                            }
                            else
                            {
                                _logger.LogWarning($"Failed to approve {approveResult.ApproveType} {approveResult.ID} for user ID {User.WhoAmI()}. {payoutApproveResponse.Problem.ToTextErrorMessage()}");
                                // TempData[TempDataKeys.ERROR_MESSAGE] = payoutApproveResponse.Problem.ToHtmlErrorMessage();
                            }

                            return Redirect("Payout?id=" + id);

                        // case ApproveTypesEnum.Rule:
                        //
                        //     var ruleApproveResponse = await _moneyMoovClient.RuleClient().ApproveRuleAsync(tokenResponse.AccessToken, approveResult.ID);
                        //
                        //     if (ruleApproveResponse.Problem.IsEmpty)
                        //     {
                        //         _logger.LogInformation($"Rule {approveResult.ID} successfully approved by user ID {User.WhoAmI()}.");
                        //         TempData[TempDataKeys.SUCCESS_MESSAGE] = "Rule successfully approved.";
                        //     }
                        //     else
                        //     {
                        //         _logger.LogWarning($"Failed to approve rule {approveResult.ID} for user ID {User.WhoAmI()}. {ruleApproveResponse.Problem.ToTextErrorMessage()}");
                        //         TempData[TempDataKeys.ERROR_MESSAGE] = ruleApproveResponse.Problem.ToHtmlErrorMessage();
                        //     }
                        //
                        //     return RedirectToAction("All", "Rule");

                        // case ApproveTypesEnum.Message:
                        //
                        //     var result = "<table><tr><th>Claim Type</th><th>Claim Value</th></tr>";
                        //
                        //     //result += $"<tr><td>Approve Type</td><td>{approveResult.ApproveType}</td></tr>";
                        //     //result += $"<tr><td>Approve ID</td><td>{approveResult.ApproveID}</td></tr>";
                        //     //result += $"<tr><td>Approve Hash</td><td>{approveResult.ApproveHash}</td></tr>";
                        //
                        //     foreach (var claim in token.Claims)
                        //     {
                        //         result += $"<tr><td>{claim.Type}</td><td>{claim.Value}</td></tr>";
                        //     }
                        //
                        //     result += "</table>";
                        //
                        //     TempData[TempDataKeys.SUCCESS_MESSAGE] = result;
                        //
                        //     return RedirectToAction(nameof(Result));
                        //
                        // case ApproveTypesEnum.UserToken:
                        //
                        //     var expiresAt = DateTime.Now.AddSeconds(tokenResponse.ExpiresIn.GetValueOrDefault());
                        //
                        //     _logger.LogInformation($"Approve user token callback successfully minted token for user {User.WhoAmI()}, " +
                        //                             $"token ID {approveResult.ID}, expires at {expiresAt}.");
                        //
                        //     TempData[TempDataKeys.SUCCESS_MESSAGE] = $"User token successfully minted, expires at {expiresAt}.";
                        //     TempData[TempDataKeys.API_ACCESS_TOKEN] = tokenResponse.AccessToken;
                        //
                        //     return RedirectToAction("CreateApiTokenResult", "Account");

                        default:

                            _logger.LogWarning($"Approval callback no post approval action for {approveResult.ApproveType}.");
                            // TempData[TempDataKeys.ERROR_MESSAGE] = $"The approve type of {approveResult.ApproveType} was not recognised. Please try again and if the problem persists contact support.";
                            // return RedirectToAction(nameof(Result));
                            return Redirect("Payout?id=" + id);
                    }
                }
                else
                {
                    _logger.LogWarning($"Approval callback failed to parse JWT access token after successful approval.");
                    // TempData[TempDataKeys.ERROR_MESSAGE] = "Failed to acquire access token required to approve the operation. Please try again and if the problem persists contact support.";
                    // return RedirectToAction(nameof(Result));
                    return Redirect("Payout?id=" + id);
                }
            }
        }
    }
}