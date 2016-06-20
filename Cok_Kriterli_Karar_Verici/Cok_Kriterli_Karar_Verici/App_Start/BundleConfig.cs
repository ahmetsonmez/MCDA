using System.Web.Optimization;

namespace Cok_Kriterli_Karar_Verici.App_Start
{
    public class BundleConfig
    {        
        public static void RegisterBundles(BundleCollection bundles)
        {
           
          



            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/assets/global/plugins/jquery-1.11.0.min.js",
                        "~/assets/global/plugins/jquery-migrate-1.2.1.min.js",
                        "~/assets/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js",
                        "~/assets/global/plugins/uniform/jquery.uniform.min.js",
                        "~/assets/global/plugins/jquery.blockui.min.js",
                        "~/assets/global/plugins/jquery-validation/js/jquery.validate.min.js",
                        "~/assets/global/plugins/jquery-migrate-1.2.1.min.js",
                        "~/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/assets/global/plugins/bootstrap/js/bootstrap.min.js",
                        "~/assets/global/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js",
                        "~/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js",
                        "~/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js",
                        "~/assets/global/plugins/bootbox/bootbox.min.js",
                        "~/assets/pages/scripts/ui-bootbox.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/metronic").Include(
                        "~/assets/global/scripts/metronic.js",
                        "~/assets/admin/layout/scripts/layout.js",
                        "~/assets/admin/pages/scripts/form-wizard.js",
                        "~/assets/global/plugins/select2/select2.min.js",
                        "~/assets/admin/layout/scripts/quick-sidebar.js",
                        "~/assets/global/scripts/canvasjs.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/mcda").Include(
                      "~/assets/js/mcda.js",
                      "~/assets/js/topsis.js"
                       ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                
                 "~/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css",
                
                 "~/assets/global/css/plugins.css",
                 "~/assets/admin/layout/css/layout.css",
                 "~/assets/admin/layout/css/custom.css",
                 "~/assets/global/plugins/select2/select2.css",
                 "~/assets/admin/layout/css/themes/light2.css").Include("~/assets/global/plugins/font-awesome/css/font-awesome.min.css", new CssRewriteUrlTransform()).Include("~/assets/global/plugins/simple-line-icons/simple-line-icons.min.css", new CssRewriteUrlTransform()).Include("~/assets/global/plugins/bootstrap/css/bootstrap.min.css",new CssRewriteUrlTransform()).Include("~/assets/global/css/components.css",new CssRewriteUrlTransform())
                 );         



        }
    }
}