using Duende.Bff.Yarp;
using Microsoft.AspNetCore.HttpOverrides;
using NoFrixion.Common;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "cors-policy",
        builder =>
        {
            builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Host.UseSerilog((ctx, lc) =>
{
    var loggerConfig = lc.ReadFrom.Configuration(builder.Configuration);

    string seqUrl = Environment.GetEnvironmentVariable(ConfigKeys.SEQ_URL);
    if (!string.IsNullOrEmpty(seqUrl))
    {
        loggerConfig = loggerConfig.WriteTo.Seq(
            seqUrl,
            apiKey: Environment.GetEnvironmentVariable(ConfigKeys.SEQ_APIKEY));
    }
});

builder.Services.AddControllers();
builder.Services.AddBff()
    .AddRemoteApis();

// <summary>
// The maximum age a portal session can stay alive for before a manual authentication will be requested. This is a
// fallback setting to prevent portal sessions being tricked into staying alive forever.
// </summary>
const string AUTHENTICATION_MAX_AGE_HOURS = "NoFrixion:AuthenticationMaxAgeHours";
const string AUTHENTICATION_EXPIRY_MINUTES = "NoFrixion:AuthenticationExpiryMinutes";


var configuration = builder.Services.BuildServiceProvider().GetService<IConfiguration>();

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor |
        ForwardedHeaders.XForwardedProto;

    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "cookie";
    options.DefaultChallengeScheme = "oidc";
    options.DefaultSignOutScheme = "oidc";
})
.AddCookie("cookie", options =>
{
    options.Cookie.Name = "Standalone-bff";
    options.SlidingExpiration = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(configuration.GetValue(AUTHENTICATION_EXPIRY_MINUTES, 15));
})
.AddOpenIdConnect("oidc", options =>
{
    // Set the cookie policy so authentication can work from an https load balancer to an http app instance.
    options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.Always;
    options.CorrelationCookie.SameSite = SameSiteMode.None;
    options.NonceCookie.SecurePolicy = CookieSecurePolicy.Always;
    options.NonceCookie.SameSite = SameSiteMode.None;
    
    options.Authority = configuration[ConfigKeys.NOFRIXION_IDENTITY_DOMAIN];
    options.ClientId = configuration[ConfigKeys.NOFRIXION_IDENTITY_CLIENTID];
    options.ClientSecret = configuration[ConfigKeys.NOFRIXION_IDENTITY_CLIENTSECRET];
    options.ResponseType = "code";
    options.ResponseMode = "query";
    options.UsePkce = true;

    // The maximum age a portal session can stay alive for, even if it's active.
    options.MaxAge = TimeSpan.FromHours(configuration.GetValue(AUTHENTICATION_MAX_AGE_HOURS, 3));
    
    options.GetClaimsFromUserInfoEndpoint = true;
    options.MapInboundClaims = false;
    options.SaveTokens = true;

    options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();

    // Set the cookie policy so authentication can work from an https load balancer to an http app instance.
    options.CorrelationCookie.SecurePolicy = CookieSecurePolicy.Always;
    options.CorrelationCookie.SameSite = SameSiteMode.None;
    options.NonceCookie.SecurePolicy = CookieSecurePolicy.Always;
    options.NonceCookie.SameSite = SameSiteMode.None;
    
    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("nofrixion");
    options.Scope.Add("user_access");
    options.Scope.Add("offline_access");
    options.GetClaimsFromUserInfoEndpoint = true;

    options.TokenValidationParameters = new()
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseBff();
app.UseAuthorization();
app.UseForwardedHeaders();

app.Use(async (context, next) => 
{ 
    await next(); 
    var path = context.Request.Path.Value;

    if (!path.StartsWith("/api") && !path.StartsWith("/bff") && !Path.HasExtension(path)) 
    { 
        context.Request.Path = "/"; 
        await next(); 
    } 
});

app.UseDefaultFiles(new DefaultFilesOptions { DefaultFileNames = new 
    List<string> { "index.html" } });
app.UseStaticFiles();

app.MapBffManagementEndpoints();

app.MapControllers()
    .RequireAuthorization()
    .AsBffApiEndpoint();

app.UseEndpoints(endpoints =>
{
    _ = endpoints.MapRemoteBffApiEndpoint("/api", configuration["NoFrixion:MoneyMoovApiBaseUrl"])
        .RequireAccessToken();
});

app.UseCors("cors-policy");

await app.RunAsync();