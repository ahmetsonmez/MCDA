using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cok_Kriterli_Karar_Verici.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Topsis()
        {
            return View();
        }

        public ActionResult Ahp()
        {
            return View();
        }
    }
}