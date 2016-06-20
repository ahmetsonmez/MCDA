using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cok_Kriterli_Karar_Verici.Classes
{
    public class Amac
    {
        public int IdAmac { get; set; }
        public string AmacBaslik { get; set; }
        public string OlusturulmaTarihi { get; set; }
        public string Aciklama { get; set; }
        public List<Kriterler> kriterListesi { get; set; }

    }
}