using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.MapGet("/", () => "Hello World!").WithName("HelloWorld").WithOpenApi();

app.MapGet("/Security/GetWindowsToken", ([FromQuery] string domain, string userName) => {
        // var domain = "TEST";
        // var userName = "ABC1234";
        //var _jwtTokenKey = "T4eRe83aNaNzr1nTIl0g4tsFFzJefIg4823Fh82n";//QSB
        // var _jwtTokenKey = "A89Gjhf976DSF7hffh3hcne8U832hfdn233900vn";//SB
        var _jwtTokenKey = "T4eRe83aNaNzr1nTIl0g4tsFFzJefIg4823Fh82n";
        var _jwtExpireDays = 7;
        var payload = new Dictionary<string, object>
        {
            { "udomain", domain },
            { "uname", userName },
            { "expiry", DateTime.Now.AddDays(_jwtExpireDays) }
        };
        IJwtEncoder encoder = new JwtEncoder(
            new HMACSHA256Algorithm(),
            new JsonNetSerializer(),
            new JwtBase64UrlEncoder());
        var token = encoder.Encode(payload, _jwtTokenKey);
        Console.WriteLine(token);
        return token;
    })
    .WithName("GetToken")
    .WithOpenApi();
    
app.Run();
