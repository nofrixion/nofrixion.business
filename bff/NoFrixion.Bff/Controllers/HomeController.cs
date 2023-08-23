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
    const string NOFRIXION_NOFRIXION_BUSINESS_FILENAME = "nofrixion-business";
    
    private readonly IConfiguration _configuration;

    public HomeController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [Route("/")]
    [Route("/home/{**catchAll}")]
    [Route("/{pullRequestId:int}")]
    [Route("/{pullRequestId:int}/{**catchAll}")]
    public IActionResult Index(int? pullRequestId)
    {
        var businessJavascriptCdnSource = pullRequestId != null 
            ? _configuration[ConfigKeys.NOFRIXION_BUSINESS_CDN_LOCATION]
                .Replace(NOFRIXION_NOFRIXION_BUSINESS_FILENAME, $"{NOFRIXION_NOFRIXION_BUSINESS_FILENAME}.pr{pullRequestId}")
            : _configuration[ConfigKeys.NOFRIXION_BUSINESS_CDN_LOCATION];
        
        return View(model: businessJavascriptCdnSource);
    }
}