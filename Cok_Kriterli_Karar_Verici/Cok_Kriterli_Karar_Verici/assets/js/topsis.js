var sayi = 0;
var sayi1 = 0;



function TopsisAddKriter() {
    sayi++;
    var degerler = "";

    degerler += '<div satir=' + sayi + ' class="KriterCalisma" id=' + sayi + ' >';
    degerler += '<div class="col-md-11" style="margin-top:10px;" >';
    degerler += '<div class="col-md-8">';
    degerler += '<input type="text"  name="KriterAciklama[' + sayi + ']"   placeholder="Topsis Kriter Giriniz "  required   class="form-control" type="text"  id="aciklama' + sayi + '" >';
    degerler += '<span for="aciklama' + sayi + '" class="help-block help-block-error valid"></span>';
    degerler += '</div>';
    degerler += '<div class="col-md-3">';
    degerler += '<input type="text"  name="kriterAgirlik[' + sayi + ']"  placeholder="Ağırlık Giriniz " onkeypress="return isNumberKey(event,this)"  required  class="form-control" type="text"  id="agirlikAciklama' + sayi + '" >';
    degerler += '</div>';
    degerler += '</div>';
    degerler += '<div class="col-md-1" style="margin-top:10px; margin-left:-10%;"> <button class="btn red" onclick=TopsisKriterSil(' + sayi + ');> <i class="fa fa-times"></i></button></div>';
    degerler += '</div>';

    $('#Kriterinputs').append(degerler);

}

function TopsisKriterSil(id) {
    $("#" + id).remove();
}

function TopsisAddAlternatif() {
    sayi1++;
    var alternatifler = "";

    alternatifler += '<div satir=' + sayi1 + '_' + ' class="AlternatifCalisma" id=' + sayi1 + '_' + ' > <div class="col-md-11" style="margin-top:10px;" > <input type="text"  name="alternatifAciklama[' + sayi1 + ']"  placeholder="Alternatif Giriniz "  required  class="form-control" type="text"  id="Alternatif' + sayi1 + '" > <span for="Alternatif' + sayi + '" class="help-block help-block-error valid"> </span></div> ';
    alternatifler += '<div class="col-md-1" style="margin-top:10px;"> <button class="btn red" onclick=TopsisAlternatifSil("' + sayi1 + '_' + '");> <i class="fa fa-times"></i></button> </div></div>';

    $('#TopsisAlternatifinputs').append(alternatifler);

}


function TopsisAlternatifSil(id) {
    $("#" + id).remove();
}



function TopsisKriterleriKaydet() {

    var veri = "";
    var TopsisKriterler = [];
    
    $("#Kriterinputs > div.KriterCalisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=KriterAciklama]", this).val();
        var _kriteragirlik = $("[name*=kriterAgirlik]", this).val();
        TopsisKriterler.push({ KRITERADI: _kriteradi, AGIRLIK : _kriteragirlik});
    });


    var TopsisAlternatifler = [];    
    $("#TopsisAlternatifinputs > div.AlternatifCalisma").each(function () { // Alternatifler içerisinde dön                
        var _alteratifAdi = $("[name*=alternatifAciklama]", this).val();
        TopsisAlternatifler.push({ ALTERNATIFADI: _alteratifAdi });
    });

    /*Sutunları Oluştur Başla*/
    veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>Karar Matrisi</th>";

    $.each(TopsisKriterler, function (key, value) {
        veri += "<th>" + value.KRITERADI + "</th>'>";
    });

    veri += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    veri += "<tbody id='degerlerimiz'> ";

    $.each(TopsisAlternatifler, function (key, value) {
        veri += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(TopsisKriterler, function (key, value) {
            var altKriter = value.KRITERADI;
            veri += "<td id=" + ustkey + "_" + key + ">";            
            veri += "<input  type='text' name=degerler[" + ustkey + "]  class='form-control' id=" + ustkey + "_" + key + " onkeypress='return isNumberKey(event,this)' /> </td>'>";
        });
        veri += "</tr>";
    });
    veri += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblTopsis").html(veri);


    $("#btntopnorm").css("display", "block");
  
}

function TopsisNormalizasyon() {

    var veri = "";
    var veriler = "";


    var inputDegerleri = [];
    $("#tblTopsis input" ).each(function () { 
        var sonuc = 0;
        var id = $(this).val();
        var idsi = $(this).attr("id");
        sonuc = id * id;
        inputDegerleri.push({ KARESI: sonuc,ID:idsi+"_yenisi" });
    });
       
    var TopsisKriterler = [];

    $("#Kriterinputs > div.KriterCalisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=KriterAciklama]", this).val();
        var _kriteragirlik = $("[name*=kriterAgirlik]", this).val();
        TopsisKriterler.push({ KRITERADI: _kriteradi, AGIRLIK: _kriteragirlik });
    });

    var TopsisAlternatifler = [];
    $("#TopsisAlternatifinputs > div.AlternatifCalisma").each(function () { // Alternatifler içerisinde dön                
        var _alteratifAdi = $("[name*=alternatifAciklama]", this).val();
        TopsisAlternatifler.push({ ALTERNATIFADI: _alteratifAdi });
    });

    /*Sutunları Oluştur Başla*/
    veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>Toplamlar Karekökü</th>";

    $.each(TopsisKriterler, function (key, value) {
        veri += "<th style='width:20%;'>" + value.KRITERADI + "</th>'>";
    });

    veri += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    veri += "<tbody id='degerlerimiz'> ";

    $.each(TopsisAlternatifler, function (key, value) {
        veri += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(TopsisKriterler, function (key, value) {
            var altKriter = value.KRITERADI;
            veri += "<td id=" + ustkey + "_" + key + "_yenisi" + "> </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
        });
        veri += "</tr>";
    });

    /*Toplamlar Satırı Oluştur*/
    veri += "<tr id='ToplamlarSatiri'><td style='font-weight: bold;'>Toplamlar</td> ";
    $.each(TopsisKriterler, function (key, value) {
        veri += "<td style='font-weight: bold;'></td>";
    });
    veri += "</tr>";
    /* Toplamlar Satırını Bitir*/

    veri += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblTopsisKaresi").html(veri);

    //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(inputDegerleri, function (key, value) {
        $("#tblTopsisKaresi #" + value.ID).text(parseFloat(value.KARESI).toFixed(2));
        $("#tblTopsisKaresi #" + value.ID).attr("normal", parseFloat(value.KARESI).toFixed(2));
    });
   
    //Toplamları Yazdır...
    $("#tblTopsisKaresi tr:last td:not(:first)").text(function (i) {
        var t = 0;
        var ort = 0;
        var degeri = 0;
        $(this).parent().prevAll().find("td:nth-child(" + (i + 2) + ")").each(function (a, b) {
            var idsi = b.id;
            degeri = $("#" + idsi).attr('normal');          
            t += parseFloat(degeri);
        });
        if (isNaN(t)) {
            var t = "";
        }        
        return  parseFloat(Math.sqrt(t)).toFixed(3);
    });
    

    // tblTopsis de girilen değerlerin her birine ulaşarak tblTopsisKaresi nde toplamı ile bölünür ve diziye atılır. 
    var normSonuc = 0;
    var normDizi = [];
    $.each(TopsisKriterler, function (key, value) {

        $.each(TopsisAlternatifler, function (alter, value) {
            normSonuc = 0;
            var deger               = $("#tblTopsis td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).find('input').val();
            var toplamlarKarakoku   = $("#tblTopsisKaresi tr:last td:not(:first)").eq(key).text();
            var yeniID              = $("#tblTopsis td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).find('input').attr("id");

            normSonuc = parseFloat(deger / toplamlarKarakoku).toFixed(3);
            normDizi.push({ NORMDEGER: normSonuc, YENIID: yeniID + "_yeniID" });

        });
    });

    /*Sutunları Oluştur Başla*/
    veriler += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>Normalize Matrisi</th>";

    $.each(TopsisKriterler, function (key, value) {
        veriler += "<th style='width:20%;'>" + value.KRITERADI + "</th>'>";
    });

    veriler += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    veriler += "<tbody id='degerlerimiz'> ";

    $.each(TopsisAlternatifler, function (key, value) {
        veriler += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(TopsisKriterler, function (key, value) {
            var altKriter = value.KRITERADI;
            veriler += "<td id=" + ustkey + "_" + key + "_yeniID" + "> </td>";//Normalizasyon değerlerini buraya bastıracağız.
        });
        veriler += "</tr>";
    });
   
    veriler += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblTopsisNorm").html(veriler);

    //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(normDizi, function (key, value) {
        $("#tblTopsisNorm #" + value.YENIID).text(parseFloat(value.NORMDEGER).toFixed(4));
        $("#tblTopsisNorm #" + value.YENIID).attr("normal", parseFloat(value.NORMDEGER).toFixed(4));
    });

    $("#btntopagrnorm").css("display", "block");

}

function TopsisAgirNormalizasyon()
{
    var veri = "";
    var veriler = "";
    var IdealVeri = "";

    var TopsisKriterler = [];

    $("#Kriterinputs > div.KriterCalisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=KriterAciklama]", this).val();
        var _kriteragirlik = $("[name*=kriterAgirlik]", this).val();
        TopsisKriterler.push({ KRITERADI: _kriteradi, AGIRLIK: _kriteragirlik });
    });

    var TopsisAlternatifler = [];
    $("#TopsisAlternatifinputs > div.AlternatifCalisma").each(function () { // Alternatifler içerisinde dön                
        var _alteratifAdi = $("[name*=alternatifAciklama]", this).val();
        TopsisAlternatifler.push({ ALTERNATIFADI: _alteratifAdi });
    });
   
    // Kriterlerin Ağırlık Bilgilerini Tabloda göster. Aşağıdaki işlemde kullanacağız...
    veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>Kriter Ağırlıkları</th>";
    $.each(TopsisKriterler, function (key, value) {
        veri += "<th deger="+value.AGIRLIK+" >"+value.KRITERADI + " ("+ value.AGIRLIK + ") "+ "</th>'>";
    });
    veri += "</tr></thead>";
    veri += "<tbody id='degerlerimiz'> ";    
    veri += "</tbody> ";
    $("#tblAgirlik4").html(veri);


    var agirSonuc = 0;
    var agirDizi = [];
    $.each(TopsisKriterler, function (key, value) {

        $.each(TopsisAlternatifler, function (alter, value) {
            agirSonuc = 0;
            var deger = $("#tblTopsisNorm  td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
            var kriterAgirDegeri = $("#tblAgirlik4  th:not(:first)").eq(key).attr("deger");
            var yeniIDsi = $("#tblTopsisNorm  td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).attr("id");

            agirSonuc = parseFloat(deger * kriterAgirDegeri).toFixed(3);
            agirDizi.push({ AGIRNORMDEGER: agirSonuc, YENIID: yeniIDsi + "si" });

        });
    });


    /* Ağırlıklı Normalizasyon Tablosunu Oluştur... */
    /*Sutunları Oluştur Başla*/
    veriler += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>Ağırlıklandırılmış  Matris</th>";

    $.each(TopsisKriterler, function (key, value) {
        veriler += "<th style='width:20%;'>" + value.KRITERADI + "</th>'>";
    });

    veriler += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    veriler += "<tbody id='degerlerimiz'> ";

    $.each(TopsisAlternatifler, function (key, value) {
        veriler += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(TopsisKriterler, function (key, value) {
            var altKriter = value.KRITERADI;
            veriler += "<td id=" + ustkey + "_" + key + "_yeniIDsi" + "> </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
        });
        veriler += "</tr>";
    });

    veriler += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblAgirlikliNormalizasyon").html(veriler);


    //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(agirDizi, function (key, value) {
        $("#tblAgirlikliNormalizasyon #" + value.YENIID).text(parseFloat(value.AGIRNORMDEGER).toFixed(4));
        $("#tblAgirlikliNormalizasyon #" + value.YENIID).attr("normal", parseFloat(value.AGIRNORMDEGER).toFixed(4));
    });


    // İdeal ve Negatif İdeal Değerlerini bulmak için...
    var MaxMinDizi = [];
    var MaxGenelDizi = [];
    var MinGenelDizi = [];
    var deger = 0;
    $.each(TopsisKriterler, function (key, value) {
        MaxMinDizi = []; //her dönüşte yeni sütun için boşalt.
        $.each(TopsisAlternatifler, function (alter, value) {
                       
            deger = $("#tblAgirlikliNormalizasyon   td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();                       
            MaxMinDizi.push(deger); //sütundaki değerleri diziye at.
        });       
        MaxGenelDizi.push({ MAXDEGER: Math.max.apply(Math, MaxMinDizi) }); // diziye atılan değerlerden max  değerini genel diziye at.
        MinGenelDizi.push({ MINDEGER: Math.min.apply(Math, MaxMinDizi) }); // diziye atılan değerlerden max  değerini genel diziye at.

    });



    /* İdeal ve Negatif İdeal Tablosunu Oluştur... */
    /*Sutunları Oluştur Başla*/
    IdealVeri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>İdeal ve Negatif İdeal</th>";

    $.each(TopsisKriterler, function (key, value) {
        IdealVeri += "<th style='width:20%;'>" + value.KRITERADI + "</th>'>";
    });

    IdealVeri += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    IdealVeri += "<tbody id='degerlerimiz'> ";

    IdealVeri += "<tr> <td>İdeal</td>";
      
 
    $.each(MaxGenelDizi, function (key, value) {            
        IdealVeri += "<td id=" + value.MAXDEGER + "_Ideal" + "> "+value.MAXDEGER+" </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
    });
    IdealVeri += "</tr>";

    IdealVeri += "<tr> <td>Negatif İdeal</td>";
    $.each(MinGenelDizi, function (key, value) {
        IdealVeri += "<td id=" + value.MINDEGER + "_Ideal" + "> "+value.MINDEGER+" </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
    });
    IdealVeri += "</tr>";

    IdealVeri += "</tbody> ";


    /*Tabloya Bastır*/
     $("#tblIdeal").html(IdealVeri);


}

function UzaklikBul() {

    var veriler = "";
    var veri = "";
  

    var TopsisKriterler = [];

    $("#Kriterinputs > div.KriterCalisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=KriterAciklama]", this).val();
        var _kriteragirlik = $("[name*=kriterAgirlik]", this).val();
        TopsisKriterler.push({ KRITERADI: _kriteradi, AGIRLIK: _kriteragirlik });
    });

    var TopsisAlternatifler = [];
    $("#TopsisAlternatifinputs > div.AlternatifCalisma").each(function () { // Alternatifler içerisinde dön                
        var _alteratifAdi = $("[name*=alternatifAciklama]", this).val();
        TopsisAlternatifler.push({ ALTERNATIFADI: _alteratifAdi });
    });


    // tblAgirlikliNormalizasyon de gelen değerlerin her birine ulaşarak İdeal ve Negatif İdeal Tablosunu nde toplamı ile çıkartılır ve üssü alınır.. ve diziye atılır. 
    var uzaklikSonuc = 0;
    var uzaklikSonucUssu = 0;
    var uzaklikDizi = [];
    $.each(TopsisKriterler, function (key, value) {

        $.each(TopsisAlternatifler, function (alter, value) {
            uzaklikSonuc = 0;
            uzaklikSonucUssu = 0;
            var deger = $("#tblAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
            var agirlikNormDegeri = $("#tblIdeal tr:not(:last) td:not(:first)").eq(key).text();
            var yeniIDsi = $("#tblAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).attr("id");

            uzaklikSonuc = parseFloat(deger - agirlikNormDegeri).toFixed(5);
            uzaklikSonucUssu = parseFloat(Math.pow(uzaklikSonuc, 2).toFixed(5));           
            uzaklikDizi.push({ UZAKLIKDEGER: uzaklikSonucUssu, YENIID: yeniIDsi + "_uzak" });

        });
    });

    /* Uzaklık Tablosunu Oluştur... */
    /*Sutunları Oluştur Başla*/
    veriler += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>İdeal Uzaklık</th>";

    $.each(TopsisKriterler, function (key, value) {
        veriler += "<th style='width:20%;'>" + value.KRITERADI + "</th>'>";
    });
    veriler += "<th style='width:20%'>Toplam</th>";
    veriler += "<th style='width:20%'>S<sup>+</sup><sub>i</sub></th>";
    veriler += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    veriler += "<tbody id='degerlerimiz'> ";

    $.each(TopsisAlternatifler, function (key, value) {
        veriler += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(TopsisKriterler, function (key, value) {
            var altKriter = value.KRITERADI;
            veriler += "<td id=" + ustkey + "_" + key + "_yeniIDsi_uzak" + "> </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
        });
        veriler += "<td id=" + ustkey + "_" + key + "_idealToplam" + "></td>";
        veriler += "<td id=" + ustkey + "_" + key + "_idealsi" + "></td>";
        veriler += "</tr>";
    });

    veriler += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblUzaklik").html(veriler);


    //Uzaklık tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(uzaklikDizi, function (key, value) {
        $("#tblUzaklik #" + value.YENIID).text(parseFloat(value.UZAKLIKDEGER).toFixed(5));
        $("#tblUzaklik #" + value.YENIID).attr("normal", parseFloat(value.UZAKLIKDEGER).toFixed(5));
    });

    var ToplamSutunu = TopsisKriterler.length;
    // Toplam Sütununu Yazdır...
    $.each(TopsisAlternatifler, function (key, value) {

        $("#tblUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text(function (p, m) {
            var t = 0;

            $(this).prevAll('td:not(:first-child)').each(function (a, b) {
                t += parseFloat($(this).text());

            });
            return parseFloat(t).toFixed(5);
        });
    });

    // İdeal  Sütununu Yazdır...
    $.each(TopsisAlternatifler, function (key, value) {
       
         // Toplamları dolaş değerlerini al ve karaköklerini alarak Si alanına yazdır.
         $("#tblUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text(function (p, m) {
             var GelenDeger = 0;
             var Sonuc = 0;
             GelenDeger = $("#tblUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text();
             Sonuc = parseFloat(Math.sqrt(GelenDeger)).toFixed(5);
             return Sonuc;
        });
    });

    /* NEGATIF TABLOSU */ 

     // tblAgirlikliNormalizasyon de gelen değerlerin her birine ulaşarak İdeal ve Negatif İdeal Tablosunu nde toplamı ile çıkartılır ve üssü alınır.. ve diziye atılır. 
    var NegatifSonuc = 0;
    var NegatifSonucUssu = 0;
    var NegatifDizi = [];
    $.each(TopsisKriterler, function (key, value) {

        $.each(TopsisAlternatifler, function (alter, value) {
            NegatifSonuc = 0;
            NegatifSonucUssu = 0;
            var deger = $("#tblAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
            var agirlikNormDegeri = $("#tblIdeal tr:last td:not(:first)").eq(key).text();
            var yeniIDsi = $("#tblAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).attr("id");

            NegatifSonuc = parseFloat(deger - agirlikNormDegeri).toFixed(5);
            NegatifSonucUssu = parseFloat(Math.pow(NegatifSonuc, 2).toFixed(5));
          
            NegatifDizi.push({ NEGATIFDEGER: NegatifSonucUssu, YENIID: yeniIDsi + "_negatif" });

        });
    });

    /* Negatif Uzaklık Tablosunu Oluştur... */
    /*Sutunları Oluştur Başla*/
    veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>Negatif Uzaklık</th>";

    $.each(TopsisKriterler, function (key, value) {
        veri += "<th style='width:20%;'>" + value.KRITERADI + "</th>'>";
    });
    veri += "<th style='width:20%'>Toplam</th>";
    veri += "<th style='width:20%'>S<sup>-</sup><sub>i</sub></th>";
    veri += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    veri += "<tbody> ";

    $.each(TopsisAlternatifler, function (key, value) {
        veri += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(TopsisKriterler, function (key, value) {
            var altKriter = value.KRITERADI;
            veri += "<td id=" + ustkey + "_" + key + "_yeniIDsi_negatif" + "> </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
        });
        veri += "<td id="+ustkey + "_" +key+"_negatifToplam"+"></td>";
        veri += "<td id=" + ustkey + "_" + key + "_negatifsi" + "></td>";
        veri += "</tr>";
    });

    veri += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblUzaklikNegatif").html(veri);


    //Uzaklık tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(NegatifDizi, function (key, value) {
        $("#tblUzaklikNegatif #" + value.YENIID).text(parseFloat(value.NEGATIFDEGER).toFixed(5));
        $("#tblUzaklikNegatif #" + value.YENIID).attr("normal", parseFloat(value.NEGATIFDEGER).toFixed(5));
    });

    // Toplam Sütununu Yazdır...
    $.each(TopsisAlternatifler, function (key, value) {

        $("#tblUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text(function (p, m) {
            var t = 0;

            $(this).prevAll('td:not(:first-child)').each(function (a, b) {
                t += parseFloat($(this).text());

            });
            return parseFloat(t).toFixed(5);
        });
    });

    // İdeal  Sütununu Yazdır...
    $.each(TopsisAlternatifler, function (key, value) {
       
         // Toplamları dolaş değerlerini al ve karaköklerini alarak Si alanına yazdır.
        $("#tblUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text(function (p, m) {
             var GelenDeger = 0;
             var Sonuc = 0;
             GelenDeger = $("#tblUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text();
             Sonuc = parseFloat(Math.sqrt(GelenDeger)).toFixed(5);
             return Sonuc;
        });
    });


}

function Sonuc() {

    var sonucVeri = "";

    var TopsisKriterler = [];

    $("#Kriterinputs > div.KriterCalisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=KriterAciklama]", this).val();
        var _kriteragirlik = $("[name*=kriterAgirlik]", this).val();
        TopsisKriterler.push({ KRITERADI: _kriteradi, AGIRLIK: _kriteragirlik });
    });

    var TopsisAlternatifler = [];
    $("#TopsisAlternatifinputs > div.AlternatifCalisma").each(function () { // Alternatifler içerisinde dön                
        var _alteratifAdi = $("[name*=alternatifAciklama]", this).val();
        TopsisAlternatifler.push({ ALTERNATIFADI: _alteratifAdi });
    });

   
    /*Sutunları Oluştur Başla*/
    sonucVeri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#125e91'>Sonuç</th>";
    sonucVeri += "<th style='width:20%'>S<sup>+</sup><sub>i</sub></th>";
    sonucVeri += "<th style='width:20%'>S<sup>-</sup><sub>i</sub></th>";
    sonucVeri += "<th style='width:20%'>C<sup>*</sup><sub>i</sub></th>";
    sonucVeri += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    sonucVeri += "<tbody> ";

    $.each(TopsisAlternatifler, function (key, value) {
        sonucVeri += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        for (var i = 0; i < 3; i++) {
            
            sonucVeri += "<td> </td>"; //Normalizasyon değerlerini buraya bastıracağız.     
        }                
        sonucVeri += "</tr>";
    });

    sonucVeri += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblSonuc").html(sonucVeri);

    var ToplamSutunu = TopsisKriterler.length;
    // S+ Yazdır
    $.each(TopsisAlternatifler, function (key, value) {

        
        $("#tblSonuc td:not(:first)").parent().find("td:nth-child(" + (0 + 2) + ")").eq(key).text(function (p, m) {
            var GelenDeger = 0;        
            GelenDeger = $("#tblUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text();        
            return GelenDeger;
        });
    });

    // S- yi yazdır.. 
    $.each(TopsisAlternatifler, function (key, value) {

        // Toplamları dolaş değerlerini al ve karaköklerini alarak Si alanına yazdır.
        $("#tblSonuc td:not(:first)").parent().find("td:nth-child(" + (1 + 2) + ")").eq(key).text(function (p, m) {
            var GelenDeger = 0;
            GelenDeger = $("#tblUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text();
            return GelenDeger;
        });
    });

    //Sonucu Yazdır
    $.each(TopsisAlternatifler, function (key, value) {

        // Toplamları dolaş değerlerini al ve karaköklerini alarak Si alanına yazdır.
        $("#tblSonuc tr:not(:first)  td:last-child").eq(key).text(function (p, m) {
            var GelenDeger  = 0;
            var sArti       = $("#tblSonuc tr:not(:first)  td:last-child").prev('td:not(:first-child)').prev().eq(key).text();
            var Eksi        = $("#tblSonuc tr:not(:first)  td:last-child").prev('td:not(:first-child)').eq(key).text();
           
            var toplamSonuc = parseFloat(sArti) + parseFloat(Eksi);

            return GelenDeger = parseFloat(Eksi).toFixed(5) / parseFloat(toplamSonuc).toFixed(5);
        });
    });

    //En yüksek değeri yeşil ile işaretle
    var max = 0;    
    $("#tblSonuc tr:not(:first)  td:last-child").each(function () {
        $this = parseFloat($(this).text());
        if ($this > max)  max = $this;     
    });
    $("#tblSonuc tr:not(:first)  td:last-child").each(function () {     
        if ($(this).text() == max)
            $(this).css({ "background-color": "#64b52a" }).prevAll().css({ "background-color": "#64b52a" });
    });

}

