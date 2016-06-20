using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Cok_Kriterli_Karar_Verici.App_Start;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Optimization;

namespace Cok_Kriterli_Karar_Verici
{
    public class MvcApplication : System.Web.HttpApplication
    {      
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
