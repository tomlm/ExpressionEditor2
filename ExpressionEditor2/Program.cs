using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Blazorise;
using Blazorise.Bootstrap;
using Blazorise.Icons.FontAwesome;
using Iciclecreek.Bot.Expressions.Humanizer;
using BlazorStyled;

namespace ExpressionEditor2
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.Services
                 .AddBlazorise(options =>
                 {
                     options.ChangeTextOnKeyPress = true;
                 })
                 .AddBootstrapProviders()
                 .AddFontAwesomeIcons()
                 .AddBlazorStyled();

            builder.RootComponents.Add<MyApp>("myApp");

            builder.Services.AddSingleton(sp => new HttpClient
            {
                BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)
            });

             // componentsApplicationBuilder.AddComponent<ClientSideStyled>("#styled");

            HumanizerFunctions.Register();
            var host = builder.Build();
            host.Services
                .UseBootstrapProviders()
                .UseFontAwesomeIcons();

            await host.RunAsync();
        }
    }
}
