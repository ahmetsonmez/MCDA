﻿

var sayi = 0;
$("#txtYeniHedef").focus();

//function YeniHedefOlustur() {

//    $("#YeniHedefAc").animate({
//        height: 'toggle'
//    });
//    $("#txtYeniHedef").focus();

//}
     
function HedefKaydet() {

    var yeniHedef = $("#txtYeniHedef").val();

    //if (yeniHedef == null || yeniHedef == "") {
    //    alert("Yeni hedefi giriniz");
    //    return;
    //}
            
    //$("#kriterBaslik").html("<i class='fa fa-list'></i>" + yeniHedef + " Hedefi Kriterleri");

    //$("#YeniKriterlerPaneli").show();  // Paneli Aç
    addInput(); // İlk kriter inputunu ekle

    //$('#btnHedefKaydet').attr("disabled", true); // mükerrer olmaması için butonu pasif yap.
};


function addInput() {
    sayi++;
    var degerler = "";

    degerler += '<div satir=' + sayi + ' class="calisma" id=' + sayi + ' > <div class="col-md-3" style="margin-top:10px;" > <input type="text"  name="Aciklama[' + sayi + ']"  placeholder="Kriter Giriniz "  onchange="kriterleriKaydet();" class="form-control" type="text"  id="aciklama" ></div> ';
    degerler += '<div class="col-md-1"   style="margin-top:10px;"> <button class="btn red" onclick=Sil(' + sayi + ');> <i class="fa fa-times"></i></button> </div></div>';

    $('#inputs').append(degerler);
   
}

function Sil(id) {
    $("#" + id).remove();
}

function kriterleriKaydet()
{
    var yeniHedef = $("#txtYeniHedef").val();
    var dataArr = [];
    var veri = "";
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        dataArr.push({                
            KRITERADI: _kriteradi
        });
    });

    $("#tblKriterHesapla").show();
    $("#agirlikBaslik").html("<i class='fa fa-calc'></i>" + yeniHedef + " Hedefi Kriterleri Değerleri");

    /*Sutunları Oluştur Başla*/
    veri += "<thead> <tr><th>Kriterler</th>";

    $.each(dataArr, function (key, value) {
        veri += "<th>" + value.KRITERADI + "</th>'>";
    });
           
    veri += "</tr></thead>";
    /*Sutunları Oluştur Bitir*/

    ///*Satırları Oluştur Başla*///
    veri += "<tbody id='degerlerimiz'> ";

    $.each(dataArr, function (key, value) {
        veri += "<tr><td>" + value.KRITERADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(dataArr, function (key, value) {
            var altKriter = value.KRITERADI;
            veri += "<td id=" + ustkey + "_" + key + ">";
            if (ustkey == key) {
                veri += "<input disabled type='text' name=degerler["+ustkey+"] class='form-control' id=" + ustkey + "_" + key + " hesapDegeri='1' value='1'/> </td>'>";                                                        
            }
            else {
                veri += "<input type='text'   data-toggle='popover'  data-placement='top' onkeypress='return isNumberKeyOnly(event)' onkeyup='this.value = minmax(this.value, 1, 9)' ";
                veri += "data-trigger='focus' data-content='" + ustKriter + " Kriterinin, " + altKriter + " Kriterine göre Önceliğini Giriniz (1-9) <br /> ";
                veri += "<div class=\"btn-group btn-group-xs btn-group-solid\">";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",9,\"0.1111\") class=\"btn btn-xs btn-default\">9</button>";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",8,\"0.1250\") class=\"btn btn-xs btn-default\">8</button> ";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",7,\"0.1428\") class=\"btn btn-xs btn-default\">7</button> ";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",6,\"0.1666\") class=\"btn btn-xs btn-default\">6</button> ";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",5,\"0.2000\") class=\"btn btn-xs btn-default\">5</button> ";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",4,\"0.2500\") class=\"btn btn-xs btn-default\">4</button> ";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",3,\"0.3333\") class=\"btn btn-xs btn-default\">3</button> ";
                veri += "<button type=\"button\" onclick=OnemsizDegerAta(\"" + ustkey + "_" + key + "\",2,\"0.5000\") class=\"btn btn-xs btn-default\">2</button> ";
                // veri += "<div class=\"btn-group btn-group-xs btn-group-solid\">";
                veri += "<button type=\"button\" onclick=EsitDegerAta(\"" + ustkey + "_" + key + "\",1,\"1\") class=\"btn btn-xs red \">1</button>";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",2,\"2\") class=\"btn btn-xs btn-default\">2</button> ";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",3,\"3\") class=\"btn btn-xs btn-default\">3</button> ";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",4,\"4\") class=\"btn btn-xs btn-default\">4</button> ";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",5,\"5\") class=\"btn btn-xs btn-default\">5</button> ";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",6,\"6\") class=\"btn btn-xs btn-default\">6</button> ";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",7,\"7\") class=\"btn btn-xs btn-default\">7</button> ";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",8,\"8\") class=\"btn btn-xs btn-default\">8</button> ";
                veri += "<button type=\"button\" onclick=OnemliDegerAta(\"" + ustkey + "_" + key + "\",9,\"9\") class=\"btn btn-xs btn-default\">9</button></div>";
                veri += "'";
                veri += "data-title='Kriter Öncelikleri' ";
                veri += "class='form-control input-sm' hesapDegeri=\" \" ustkey=" + ustkey + " altkey=" + key + " id=" + ustkey + "_" + key + " /> </td>'>";
            }                            
        });
               
        veri +="</tr>'>";
    });
            
    /*Satırları Oluştur Bitir*/

    /*Toplamlar Satırı Oluştur*/
    veri += "<tr id='ToplamlarSatiri'><td>Toplamlar</td> ";
    $.each(dataArr, function (key, value) {
        veri += "<td></td>";
    });
    veri += "</tr>";
    /* Toplamlar Satırını Bitir*/


    veri += "</tbody> ";
            

    /*Tabloya Bastır*/
    $("#tblKriterAgirlik").html(veri);
    $('[data-toggle="popover"]').popover({ html: true });

    // Yukarıda matris tabloda id'leri eşit olanları disabled'a çektikten sonra
    // disable'lar içinde dönerek önceki elemanları da disable'a çekiyoruz.
    $("#tblKriterAgirlik [disabled]").each(function () {
        var idsi = $(this).attr("id");
        $("#" + idsi).prevAll().find('input').attr('disabled', 'disabled');
    });
            
}
       
  

//Sadece Rakam Girişi
function isNumberKeyOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;


    return true;
}

// 1-9 Arası Değer Girişi
function minmax(value, min, max) {
    if (parseInt(value) < 0 || isNaN(value))
        return 0;
    else if (parseInt(value) > 9)
        return 1;
    else return value;
}

//İlk önce Önemsiz değer Seçilirse
function OnemsizDegerAta(id, deger, islemDegeri) {            
    $("#" + id).find('input').val("1\\" + deger);         
    $("#" + id).find('input').attr('hesapDegeri', islemDegeri);
    var karsilik = id.split("").reverse().join("");            
    $("#" + karsilik).find('input').val(deger);           
    $("#" + karsilik).find('input').attr('hesapDegeri', deger);              
}

//İlk önce Önemli değer Seçilirse
       
function OnemliDegerAta(id, deger, islemDegeri) {
    $("#" + id).find('input').val(deger);
    $("#" + id).find('input').attr('hesapDegeri', islemDegeri);
    var karsilik = id.split("").reverse().join("");
    $("#" + karsilik).find('input').val("1\\" + deger);
    $("#" + karsilik).find('input').attr('hesapDegeri', (1 / deger).toFixed(4));
}

//Eşitse Değer Ata
function EsitDegerAta(id, deger, islemDegeri) {
    $("#" + id).find('input').val(deger);
    $("#" + id).find('input').attr('hesapDegeri', islemDegeri);
    var karsilik = id.split("").reverse().join("");
    $("#" + karsilik).find('input').val(deger);
    $("#" + karsilik).find('input').attr('hesapDegeri', deger);         
}

function Normalizasyon() {

    var dizi = [];
    var normalizasyonDizi = [];

    /* --- C --- */
    // Sutunları Topla ve her sutun değerini dizi'ye at. Toplam Satırlarına Yazıdr. Dizi'ye atılanların içerisinde dön ve sutun toplamına böldür,
    // sonucu normalizasyonDizi'sine aktar.
    $("#tblKriterAgirlik tr:last td:not(:first)").text(function (i) {


        dizi = [];

        var t = 0;
        var ort = 0;
        var degeri = 0;
        $(this).parent().prevAll().find("td:nth-child(" + (i + 2) + ")").each(function (a, b) {
            var idsi = b.id;
            degeri = $("#" + idsi).find('input').attr('hesapDegeri');
            dizi.push({ DD: degeri,ID : idsi+"_yeni" }); //idsi'nide al. Aşağıda tablo doldurken id 'ye göre doldurulacak.
            t += parseFloat(degeri);
        });
        if (isNaN(t)) {
            var t = "";
        }

        $.each(dizi, function (key, value) {
            var sonuc = value.DD / t;
            normalizasyonDizi.push({ SONUC: sonuc, ID: value.ID });
        });

        return parseFloat(t).toFixed(3);

    });

    // Normalizasyon Tablosu oluştur.
    var veriler = "";
    var dataArr = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        dataArr.push({
            KRITERADI: _kriteradi
        });
    });


    /*Sutunları Oluştur Başla*/
    veriler += "<thead> <tr><th>Kriterler</th>";

    $.each(dataArr, function (key, value) {
        veriler += "<th>" + value.KRITERADI + "</th>'>";
    });
    veriler += "<th>Ağırlık</th>";
    veriler += "</tr></thead>";
    /*Sutunları Oluştur Bitir*/

    ///*Satırları Oluştur Başla*///
    veriler += "<tbody> ";

    $.each(dataArr, function (key, value) {
        veriler += "<tr><td>" + value.KRITERADI + "</td>";
        var ustkey = key;
        var ustKriter = value.KRITERADI;
        $.each(dataArr, function (key, value) {
            var altKriter = value.KRITERADI;
            veriler += "<td id=" + ustkey + "_" + key + "_yeni" + "> </td>"; //Normalizasyon değerlerini buraya bastıracağız.
        });
        veriler += "<td></td>"; //Ağırlık değerlerinide buraya
        veriler += "</tr>'>";
    });

    /*Satırları Oluştur Bitir*/           

    veriler += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblNormalizasyon").html(veriler);

    //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(normalizasyonDizi, function (key, value) {
        $("#" + value.ID).text( parseFloat(value.SONUC).toFixed(3));
        $("#" + value.ID).attr("normal", parseFloat(value.SONUC).toFixed(3));

    });


    /* --- W --- */
    var AgirlikDizi = [];
    //Ağırlık Değerlerini Yazdır.
    $("#tblNormalizasyon tr:not(:first)  td:last-child").text(function () {
        var t = 0;
        var carpim = 0;
        var donecekDeger = 0;
        $(this).prevAll('td:not(:first-child)').each(function (a, b) {
            t += parseFloat($(this).text());
                   
        });
                
        donecekDeger = t / dataArr.length;
        AgirlikDizi.push({ Agirlik: donecekDeger })
        return parseFloat(donecekDeger).toFixed(3);
    });

            
    /* --- D --- */
    //Tutarlılık Hesapla...
    var tutarlilikDizi = [];
    for (var i = 0; i < dataArr.length; i++) { // Kriter adetince dön.
        var topla = 0;
        $.each(AgirlikDizi, function (satir, veri) { // ağırlık dizi elemanlarını almak için dön.
                   
            // yukarıdan değişen her bir değer için her bir ağırlık değerini çarp topla.bittiğinde diziye at.
            //diğer  tr satırları için for yeniden başlasın...
            var tdDegeri = $("#tblKriterAgirlik tr:not(:first) td:last-child ").parent("tr:eq(" + i + ")").find("td:eq(" + (satir + 1) + ")").find('input').attr('hesapDegeri')

            topla += parseFloat(veri.Agirlik).toFixed(3) * parseFloat(tdDegeri).toFixed(3);                  
                  
        });

        tutarlilikDizi.push({ TutarlilikToplami : topla });

    }

           

    /* --- E --- */

    /* RI değerlerini diziye al ve kriter sayısına göre değeri hesaplamaya kat.*/
    /* rassallık göstergesi en çok 15 boyutlu matrisler için hesaplanabilmektedir */
    var RI = [];
    RI.push({ ID: 2, Deger: 0.00 })
    RI.push({ ID: 3, Deger: 0.58 })
    RI.push({ ID: 4, Deger: 0.90 })
    RI.push({ ID: 5, Deger: 1.12 })
    RI.push({ ID: 6, Deger: 1.24 })
    RI.push({ ID: 7, Deger: 1.32 })
    RI.push({ ID: 8, Deger: 1.41 })
    RI.push({ ID: 9, Deger: 1.45 })
    RI.push({ ID: 10, Deger: 1.49 })
    RI.push({ ID: 11, Deger: 1.51 })
    RI.push({ ID: 12, Deger: 1.48 })
    RI.push({ ID: 13, Deger: 1.56 })
    RI.push({ ID: 14, Deger: 1.57 })
    RI.push({ ID: 15, Deger: 1.59 })

    var RIdegeri = 0;
    $.each(RI, function (satir, veri) {

        if (dataArr.length == veri.ID) {
            RIdegeri += veri.Deger;
        }
        else if (dataArr.length > RI) {
            RIdegeri += 1.59
        }

    });            

    var TutarlilikBoluAgirlik = 0;
    var TutarlilikBoluAgirlikToplam = 0;
    var TutarlilikBoluAgirlikToplamBolumu = 0;
    var CL = 0;
    var CR = 0;
    $.each(tutarlilikDizi, function (satir, veri) { // ağırlık dizi elemanlarını almak için dön.
                
        var agirlik = (parseFloat($("#tblNormalizasyon tr:not(:first)  td:last-child").eq(satir).text()).toFixed(3));
                
        TutarlilikBoluAgirlik += parseFloat(veri.TutarlilikToplami) / parseFloat(agirlik);

    });
           

    TutarlilikBoluAgirlikToplam = TutarlilikBoluAgirlik;
    λ = TutarlilikBoluAgirlikToplam / dataArr.length;

    CL = (λ - dataArr.length) / (dataArr.length - 1);
    CR = parseFloat(CL / RIdegeri).toFixed(3);

    if (CR > 0.10) {
        $("#TutatlilikOrani").html('<h3><span class="label label-danger">' + CR + ' > 0.10 </span></h3>');
    }
    else {
        $("#TutatlilikOrani").html('<h3><span class="label label-success">' + CR + ' < 0.10 </span></h3>');
    }
            
}
       
        
        
       
      
        

