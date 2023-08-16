//  -----------------------------------------------------------------------------
//   Filename: ConfigKeys.cs
// 
//   Description: Config keys for the app:
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

namespace Nofrixion.Bff;

public class ConfigKeys
{
    // <summary>
    // The maximum age a session can stay alive for before a manual authentication will be requested. This is a
    // fallback setting to prevent portal sessions being tricked into staying alive forever.
    // </summary>
    public const string AUTHENTICATION_MAX_AGE_HOURS = "NoFrixion:AuthenticationMaxAgeHours";
    
    public const string AUTHENTICATION_EXPIRY_MINUTES = "NoFrixion:AuthenticationExpiryMinutes";
    
    /// <summary>
    /// Url for the Seq logging instance being used. Typically only specified as an environment
    /// variable, not an app setting. 
    /// </summary>
    public const string SEQ_URL = "Seq_Url";

    /// <summary>
    /// Api key for the Seq logging instance being used. Typically only specified as an environment
    /// variable, not an app setting. 
    /// </summary>
    public const string SEQ_APIKEY = "Seq_ApiKey";
    
    /// <summary>
    /// NoFrixion Identity domain
    /// </summary>
    public const string NOFRIXION_IDENTITY_DOMAIN = "NoFrixion:NoFrixionIdentityDomain";

    /// <summary>
    /// The NoFrixion Identity Client ID.
    /// </summary>
    public const string NOFRIXION_IDENTITY_CLIENTID = "NoFrixion:ClientId";

    /// <summary>
    /// The NoFrixion Identity Client Secret.
    /// </summary>
    public const string NOFRIXION_IDENTITY_CLIENTSECRET = "NoFrixion:ClientSecret";
    
    /// <summary>
    /// The location of the nofrixion-business.js file.
    /// </summary>
    public const string NOFRIXION_BUSINESS_CDN_LOCATION = "NoFrixion:BusinessCdnLocation";

    /// <summary>
    /// Redis connection string.
    /// </summary>
    public const string CONNECTION_STRING_REDIS = "ConnectionStrings:BFFRedis";
}