using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Timest4blesMVC.Startup))]
namespace Timest4blesMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
