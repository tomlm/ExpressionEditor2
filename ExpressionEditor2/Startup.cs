using Blazorise;
using Blazorise.Bootstrap;
using Blazorise.Icons.FontAwesome;
using Microsoft.AspNetCore.Components.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ExpressionEditor2
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection
            .AddBlazorise()
            .AddBootstrapProviders()
            .AddFontAwesomeIcons();
        }

        public void Configure(IComponentsApplicationBuilder componentsApplicationBuilder)
        {
            componentsApplicationBuilder.Services
                .UseBootstrapProviders()
                .UseFontAwesomeIcons();

            componentsApplicationBuilder.AddComponent<MyApp>("myApp");
        }
    }
}
