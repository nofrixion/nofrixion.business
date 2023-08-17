//  -----------------------------------------------------------------------------
//   Filename: HomeController.cs
// 
//   Description: The default controller to serve out the nofrixion-business app:
// 
//   Author(s):
//   Donal O'Connor (donal@nofrixion.com)
// 
//   History:
//   17 08 2023  Donal O'Connor   Created, Harcourt Street,
//  Dublin, Ireland.
// 
//   License:
//   Proprietary NoFrixion.
//  -----------------------------------------------------------------------------

using Microsoft.AspNetCore.Mvc;

namespace Nofrixion.Bff.Controllers;

public class HomeController : Controller
{
    private readonly IConfiguration _configuration;

    public HomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private string? BusinessJavascriptCdnSource { get; set; }
    
    [Route("/")]
    [Route("/home/{**catchAll}")]
    [Route("/{pullRequestId}")]
    [Route("/{pullRequestId}/{**catchAll}")]
    public IActionResult Index(string? pullRequestId)
    {
        BusinessJavascriptCdnSource = !string.IsNullOrEmpty(pullRequestId) 
            ? string.Format(_configuration[ConfigKeys.NOFRIXION_BUSINESS_CDN_LOCATION], $".{pullRequestId}" ) 
            : string.Format(_configuration[ConfigKeys.NOFRIXION_BUSINESS_CDN_LOCATION], string.Empty);
        
        return View(model: BusinessJavascriptCdnSource);
    }
}