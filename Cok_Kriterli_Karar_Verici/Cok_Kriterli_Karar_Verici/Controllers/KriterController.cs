using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cok_Kriterli_Karar_Verici.Controllers
{
    public class KriterController : Controller
    {
        // GET: Kriter
        public ActionResult Kriterler()
        {
            return View();
        }
    }
}