//  -----------------------------------------------------------------------------
//   Filename: Index.cshtml.cs
// 
//   Description: Index page for the BFF
// 
//   Author(s):
//   Donal O'Connor (donal@nofrixion.com)
// 
//   History:
//   15 08 2023  Donal O'Connor   Created, Harcourt Street,
//  Dublin, Ireland.
// 
//   License:
//   Proprietary NoFrixion.
//  -----------------------------------------------------------------------------

using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Nofrixion.Bff;

public class Index : PageModel
{
    private readonly IConfiguration _configuration;

    public Index(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string? BusinessJavascriptCdnSource { get; set; }
    
    public void OnGet()
    {
        BusinessJavascriptCdnSource = _configuration[ConfigKeys.NOFRIXION_BUSINESS_CDN_LOCATION];
    }
}