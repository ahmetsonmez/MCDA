var sayi = 0;
var sayi1 = 0;
$("#txtYeniHedef").focus();

function addInput() {
    sayi++;
    var degerler = "";

    degerler += '<div satir=' + sayi + ' class="calisma" id=' + sayi + ' > <div class="col-md-11" style="margin-top:10px;" > <input type="text"  name="Aciklama[' + sayi + ']"  placeholder="Kriter Giriniz "  required   onchange="kriterleriKaydet();" class="form-control" type="text"  id="aciklama' + sayi + '" > <span for="aciklama'+sayi+'" class="help-block help-block-error valid"> </span></div> ';
    degerler += '<div class="col-md-1" style="margin-top:10px;"> <button class="btn red" onclick=Sil(' + sayi + ');> <i class="fa fa-times"></i></button> </div></div>';

    $('#inputs').append(degerler);
   
}

function addAlternatif() {
    sayi1++;
    var alternatifler = "";

    alternatifler += '<div satir=' + sayi1 + '_' + ' class="calisma" id=' + sayi1 + '_' + ' > <div class="col-md-11" style="margin-top:10px;" > <input type="text" onchange="AlternatifleriKarsilastir();" name="Alternatif[' + sayi1 + ']"  placeholder="Alternatif Giriniz "  required  class="form-control" type="text"  id="Alternatif' + sayi1 + '" > <span for="Alternatif' + sayi + '" class="help-block help-block-error valid"> </span></div> ';
    alternatifler += '<div class="col-md-1" style="margin-top:10px;"> <button class="btn red" onclick=alternatifSil("' + sayi1 + '_' + '");> <i class="fa fa-times"></i></button> </div></div>';

    $('#Alternatifinputs').append(alternatifler);

}

function Sil(id) {
    $("#" + id).remove();
}

function alternatifSil(id) {
    $("#" + id ).remove();
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
               
        veri +="</tr>";
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

function isNumberKey(val, evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    var vallength = val.length;
    var c = 0;
    var sValue;

    for (var i = 0; i < vallength; i++) {
        sValue = val.substring(i, i + 1);
        if (sValue == "." ) // Virgül, Nokta
            c = c + 1;
    }

    if (c > 0 && (charCode == 44 || charCode == 46))
        return false;

    if (charCode == 46) // Virgül, Nokta
        return true;

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


var Agirliklar = [];
function Normalizasyon(e) {

    // Boşluk Kontrolü
    var sonuc = 0;
    $("#tblKriterAgirlik input").each(function () { // Kriterler içerisinde dön                

        var deger = $(this).val();
        //var idsi = $(this).attr("id");
        if (deger == '' || deger == null) {
            //  $(this).css('background-color', 'red');
            sonuc += 1;
        }
    });

    if (sonuc > 0) {
        alert("Karar Matrisinde Boş Alanlar var.Lütfen Tüm Alanları Doldurunuz...");
        e.preventDefault();
    }


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
    veriler += "<thead> <tr><th style='width:20%;'>Normalize Matris</th>";

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
    $("#tblNormalizasyon tr:not(:first)  td:last-child").text(function (p,m) {
        var t = 0;
        var carpim = 0;
        var donecekDeger = 0;
        $(this).prevAll('td:not(:first-child)').each(function (a, b) {
            t += parseFloat($(this).text());
                   
        });
        var tdAdi = $("#tblNormalizasyon tr:not(:first)  ").find('td:first-child').eq(p).text();
        donecekDeger = t / dataArr.length;
        AgirlikDizi.push({ y: donecekDeger,label: tdAdi.toString() })
        return parseFloat(donecekDeger).toFixed(3);
    });

    
    Agirliklar = AgirlikDizi;

   
    //console.log(AgirlikDizi);
    //console.log(Agirliklar);

    /* --- D --- */
    //Tutarlılık Hesapla...
    var tutarlilikDizi = [];
    for (var i = 0; i < dataArr.length; i++) { // Kriter adetince dön.
        var topla = 0;
        $.each(AgirlikDizi, function (satir, veri) { // ağırlık dizi elemanlarını almak için dön.
                   
            // yukarıdan değişen her bir değer için her bir ağırlık değerini çarp topla.bittiğinde diziye at.
            //diğer  tr satırları için for yeniden başlasın...
            var tdDegeri = $("#tblKriterAgirlik tr:not(:first) td:last-child ").parent("tr:eq(" + i + ")").find("td:eq(" + (satir + 1) + ")").find('input').attr('hesapDegeri')

            topla += parseFloat(veri.y).toFixed(3) * parseFloat(tdDegeri).toFixed(3);                  
                  
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

    function compareDataPointYAscend(dataPoint1, dataPoint2) {
        return dataPoint1.y - dataPoint2.y;
    }

    var chart = new CanvasJS.Chart("chartContainer", {

             colorSet: "greenShades",
            
			title:{
				text:"Kriter Ağırlık Değerleri Grafik"
               
			},
                        animationEnabled: true,
			axisX:{
				interval: 1,
				gridThickness: 0,
				labelFontSize: 14,			
				labelFontStyle: "normal",
				labelFontWeight: "normal",
				labelFontFamily: "Lucida Sans Unicode"

			},
			axisY2:{
				interlacedColor: null,
				gridColor: "rgba(1,77,101,.1)"

			},

			data: [
			{
				type: "bar",
                name: "companies",
				axisYType: "secondary",
								
				labelFontColor: "white",
				dataPoints: AgirlikDizi
			}

			]
    });
    chart.options.data[0].dataPoints.sort(compareDataPointYAscend);
    chart.render();
    chart = {};

}
       
function AlternatifleriKarsilastir() {

    //Alternatifleri Al.
    var alternatifArr = [];
    var veri = "";
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        alternatifArr.push({
            ALTERNATIF: _alternatifAdi
        });
    });

    //Kriter Değerlerini al.
    var KriterArr = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        KriterArr.push({
            KRITERADI: _kriteradi
        });
    });


    $.each(KriterArr, function (i, value) {

        veri += " <div class='col-md-12'>";
        //Kriter Adı Yazılacak
        veri += "<h2>" + value.KRITERADI + " Kriteri açısından karşılaştırma </h2> ";

        veri += "<table class='table table-striped table-bordered table-hover' id='tblAlternatif" + i + "'>";

        /*Sutunları Oluştur Başla*/
        veri += "<thead> <tr><th>Alternatifler</th>";

        $.each(alternatifArr, function (key, value) {
            veri += "<th>" + value.ALTERNATIF + "</th>";
        });

        veri += "</tr></thead>";
        /*Sutunları Oluştur Bitir*/

        ///*Satırları Oluştur Başla*///
        veri += "<tbody> ";

        $.each(alternatifArr, function (key, value) {
            veri += "<tr><td>" + value.ALTERNATIF + "</td>";
            var ustkey = key;
            var ustKriter = value.ALTERNATIF;
            $.each(alternatifArr, function (key, value) {
                var altKriter = value.ALTERNATIF;
                veri += "<td id=" + ustkey + "_" + key + " >";
                if (ustkey == key) {
                    veri += "<input disabled type='text' name=degerler[" + ustkey + "] class='form-control' id=" + ustkey + "_" + key +" hesapDegeri='1' value='1'/> </td>";
                }
                else {
                    veri += "<input type='text'   data-toggle='popover'  data-placement='top' onkeypress='return isNumberKeyOnly(event)' onkeyup='this.value = minmax(this.value, 1, 9)' ";
                    veri += "data-trigger='focus' data-content='" + ustKriter + " Kriterinin, " + altKriter + " Kriterine göre Önceliğini Giriniz (1-9) <br /> ";
                    veri += "<div class=\"btn-group btn-group-xs btn-group-solid\">";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",9,\"0.1111\","+ i + "\) class=\"btn btn-xs btn-default\">9</button>";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",8,\"0.1250\"," + i + "\) class=\"btn btn-xs btn-default\">8</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",7,\"0.1428\"," + i + "\) class=\"btn btn-xs btn-default\">7</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",6,\"0.1666\"," + i + "\) class=\"btn btn-xs btn-default\">6</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",5,\"0.2000\"," + i + "\) class=\"btn btn-xs btn-default\">5</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",4,\"0.2500\"," + i + "\) class=\"btn btn-xs btn-default\">4</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",3,\"0.3333\"," + i + "\) class=\"btn btn-xs btn-default\">3</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemsizDegerAta(\"" + ustkey + "_" + key + "\",2,\"0.5000\"," + i + "\) class=\"btn btn-xs btn-default\">2</button> ";
                    // veri += "<div class=\"btn-group btn-group-xs btn-group-solid\">";
                    veri += "<button type=\"button\" onclick=AlternatifEsitDegerAta(\"" + ustkey + "_" + key + "\",1,\"1\"," + i + "\) class=\"btn btn-xs red \">1</button>";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",2,\"2\"," + i + "\) class=\"btn btn-xs btn-default\">2</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",3,\"3\"," + i + "\) class=\"btn btn-xs btn-default\">3</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",4,\"4\"," + i + "\) class=\"btn btn-xs btn-default\">4</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",5,\"5\"," + i + "\) class=\"btn btn-xs btn-default\">5</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",6,\"6\"," + i + "\) class=\"btn btn-xs btn-default\">6</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",7,\"7\"," + i + "\) class=\"btn btn-xs btn-default\">7</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",8,\"8\"," + i + "\) class=\"btn btn-xs btn-default\">8</button> ";
                    veri += "<button type=\"button\" onclick=AlternatifOnemliDegerAta(\"" + ustkey + "_" + key + "\",9,\"9\"," + i + "\) class=\"btn btn-xs btn-default\">9</button></div>";
                    veri += "'";
                    veri += "data-title='Kriter Öncelikleri' ";
                    veri += "class='form-control input-sm' hesapDegeri=\" \" ustkey=" + ustkey + " altkey=" + key + " id=" + ustkey + "_" + key + " /> </td>";
                }
            });

            veri += "</tr>";
        });

        /*Satırları Oluştur Bitir*/

        /*Toplamlar Satırı Oluştur*/
        veri += "<tr id='ToplamlarSatiri"+i+"'><td>Toplamlar</td> ";
        $.each(alternatifArr, function (key, value) {
            veri += "<td></td>";
        });
        veri += "</tr>";
        /* Toplamlar Satırını Bitir*/


        veri += "</tbody> ";
        veri += "</table> </div>";

        /*Tabloları Bastır*/
        $("#alternatifTablolar").html(veri);
        $('[data-toggle="popover"]').popover({ html: true });

        

    });

    $.each(KriterArr, function (key, value) {
        // Yukarıda matris tabloda id'leri eşit olanları disabled'a çektikten sonra
        // disable'lar içinde dönerek önceki elemanları da disable'a çekiyoruz.
        $("#tblAlternatif" + key + " [disabled]").each(function () {
            var idsi = $(this).attr("id");
            $("#tblAlternatif"+key+" #" + idsi).prevAll().find('input').attr('disabled', 'disabled');
        });
    });   
    
}

//dinamik olduğu için işlem yapılacka tabloid 'sini daima gönder...
function AlternatifOnemsizDegerAta(id, deger, islemDegeri,tabloid) {
    $("#tblAlternatif" + tabloid + " #" + id).find('input').val("1\\" + deger);
    $("#tblAlternatif" + tabloid + " #" + id).find('input').attr('hesapDegeri', islemDegeri);
    var karsilik = id.split("").reverse().join("");
    $("#tblAlternatif" + tabloid + " #" + karsilik).find('input').val(deger);
    $("#tblAlternatif" + tabloid + " #" + karsilik).find('input').attr('hesapDegeri', deger);
}

//İlk önce Önemli değer Seçilirse

function AlternatifOnemliDegerAta(id, deger, islemDegeri,tabloid) {
    $("#tblAlternatif" + tabloid + " #" + id).find('input').val(deger);
    $("#tblAlternatif" + tabloid + " #" + id).find('input').attr('hesapDegeri', islemDegeri);
    var karsilik = id.split("").reverse().join("");
    $("#tblAlternatif" + tabloid + " #" + karsilik).find('input').val("1\\" + deger);
    $("#tblAlternatif" + tabloid + " #" + karsilik).find('input').attr('hesapDegeri', (1 / deger).toFixed(4));
}

//Eşitse Değer Ata
function AlternatifEsitDegerAta(id, deger, islemDegeri,tabloid) {
    $("#tblAlternatif" + tabloid + " #" + id).find('input').val(deger);
    $("#tblAlternatif" + tabloid + " #" + id).find('input').attr('hesapDegeri', islemDegeri);
    var karsilik = id.split("").reverse().join("");
    $("#tblAlternatif" + tabloid + " #" + karsilik).find('input').val(deger);
    $("#tblAlternatif" + tabloid + " #" + karsilik).find('input').attr('hesapDegeri', deger);
}

function AlternatifNormalizasyon() {

    //Kriter Değerlerini al.
    var KriterArr = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        KriterArr.push({
            KRITERADI: _kriteradi
        });
    });

    //Alternatifleri Al.
    var alternatifArr = [];    
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        alternatifArr.push({
            ALTERNATIF: _alternatifAdi
        });
    });

    var veriler = "";
    $("#tblAlternatifNormalizasyonTablolar").html("");

    $.each(KriterArr, function (kk, value) {

        veriler = "";

        var dizi = [];
        var normalizasyonDizi = [];

        /* --- C --- */
        // Sutunları Topla ve her sutun değerini dizi'ye at. Toplam Satırlarına Yazıdr. Dizi'ye atılanların içerisinde dön ve sutun toplamına böldür,
        // sonucu normalizasyonDizi'sine aktar.
        $("#tblAlternatif" + kk + " tr:last td:not(:first)").text(function (i) {
           

            dizi = [];

            var t = 0;
            var ort = 0;
            var degeri = 0;
            $(this).parent().prevAll().find("td:nth-child(" + (i + 2) + ")").each(function (a, b) {
                var idsi = b.id;
                degeri = $("#tblAlternatif" + kk+ " #" + idsi).find('input').attr('hesapDegeri');
                dizi.push({ DD: degeri, ID: idsi + "_yeni" }); //idsi'nide al. Aşağıda tablo doldurken id 'ye göre doldurulacak.
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
    
        veriler += " <div class='col-md-12'>";
        //Kriter Adı Yazılacak
        veriler += "<h2>" + value.KRITERADI + " Normalizasyonu </h2> ";

        veriler += "<table class='table table-striped table-bordered table-hover' id='tblAlternatifNormalizasyon" + kk + "'>";

        /*Sutunları Oluştur Başla*/
        veriler += "<thead> <tr><th>Alternatifler</th>";

        $.each(alternatifArr, function (key, value) {
            veriler += "<th>" + value.ALTERNATIF + "</th>";
        });
        veriler += "<th>Ağırlık</th>";
        veriler += "</tr></thead>";
        /*Sutunları Oluştur Bitir*/

        ///*Satırları Oluştur Başla*///
        veriler += "<tbody>";

        $.each(alternatifArr, function (key, value) {
            veriler += "<tr><td>" + value.ALTERNATIF + "</td>";
            var ustkey = key;
            var ustKriter = value.ALTERNATIF;
            $.each(alternatifArr, function (key, value) {
                var altKriter = value.ALTERNATIF;
                veriler += "<td id=" + ustkey + "_" + key + "_yeni" + "> </td>"; //Normalizasyon değerlerini buraya bastıracağız.
            });
            veriler += "<td></td>"; //Ağırlık değerlerinide buraya
            veriler += "</tr>";
        });

        /*Satırları Oluştur Bitir*/

        veriler += "</tbody> ";
        veriler += "</table> </div>";

        //Tutarlilik Değerlerini Yazdır.
        veriler += "<div class='col-md-12'>";
        veriler += "<div class='btn-set pull-right' style='margin-top:5px;'>";
        veriler += "<label id='TutatlilikOrani" + kk + "'></label>";
        veriler += " </div>     </div>";
                                               
                                       

        /*Tabloya Bastır*/
        $("#tblAlternatifNormalizasyonTablolar").append(veriler); //Yukarıda sıfırlanıyor.. her döndüğünde eklesin...

        //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
        $.each(normalizasyonDizi, function (key, value) {
            $("#tblAlternatifNormalizasyon" + kk + " #" + value.ID).text(parseFloat(value.SONUC).toFixed(3));
            $("#tblAlternatifNormalizasyon" + kk + " #" + value.ID).attr("normal", parseFloat(value.SONUC).toFixed(3));

        });
        

        /* --- W --- */
        var AgirlikDizi = [];
        //Ağırlık Değerlerini Yazdır.
        $("#tblAlternatifNormalizasyon" + kk + " tr:not(:first)  td:last-child").text(function () {
            var t = 0;
            var carpim = 0;
            var donecekDeger = 0;
            $(this).prevAll('td:not(:first-child)').each(function (a, b) {
                t += parseFloat($(this).text());

            });

            donecekDeger = t / alternatifArr.length;
            AgirlikDizi.push({ Agirlik: donecekDeger })
            return parseFloat(donecekDeger).toFixed(3);
        });


        /* --- D --- */
        //Tutarlılık Hesapla...
        var tutarlilikDizi = [];
        for (var i = 0; i < alternatifArr.length; i++) { // Kriter adetince dön.
            var topla = 0;
            $.each(AgirlikDizi, function (satir, veri) { // ağırlık dizi elemanlarını almak için dön.

                // yukarıdan değişen her bir değer için her bir ağırlık değerini çarp topla.bittiğinde diziye at.
                //diğer  tr satırları için for yeniden başlasın...
                var tdDegeri = $("#tblAlternatif" + kk + " tr:not(:first) td:last-child ").parent("tr:eq(" + i + ")").find("td:eq(" + (satir + 1) + ")").find('input').attr('hesapDegeri')

                topla += parseFloat(veri.Agirlik).toFixed(3) * parseFloat(tdDegeri).toFixed(3);

            });

            tutarlilikDizi.push({ TutarlilikToplami: topla });

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

            if (alternatifArr.length == veri.ID) {
                RIdegeri += veri.Deger;
            }
            else if (alternatifArr.length > RI) {
                RIdegeri += 1.59
            }

        });

        var TutarlilikBoluAgirlik = 0;
        var TutarlilikBoluAgirlikToplam = 0;
        var TutarlilikBoluAgirlikToplamBolumu = 0;
        var CL = 0;
        var CR = 0;
        $.each(tutarlilikDizi, function (satir, veri) { // ağırlık dizi elemanlarını almak için dön.

            var agirlik = (parseFloat($("#tblAlternatifNormalizasyon" + kk + " tr:not(:first)  td:last-child").eq(satir).text()).toFixed(3));

            TutarlilikBoluAgirlik += parseFloat(veri.TutarlilikToplami) / parseFloat(agirlik);

        });


        TutarlilikBoluAgirlikToplam = TutarlilikBoluAgirlik;
        λ = TutarlilikBoluAgirlikToplam / alternatifArr.length;

        CL = (λ - alternatifArr.length) / (alternatifArr.length - 1);
        CR = parseFloat(CL / RIdegeri).toFixed(3);

        if (CR > 0.10) {
            $("#TutatlilikOrani"+kk).html('<h3><span class="label label-danger">' + CR + ' > 0.10 </span></h3>');
        }
        else {
            $("#TutatlilikOrani"+kk).html('<h3><span class="label label-success">' + CR + ' < 0.10 </span></h3>');
        }
    });


      
    //Karar Tablosunu Oluştur..

        var Veri = "";
        Veri += " <div class='col-md-10'>";
        //Kriter Adı Yazılacak
        Veri += "<h4> AHP Sonuç Tablosu</h4> ";

        Veri += "<table class='table table-striped table-bordered' id='tblKarar'>";

        /*Sutunları Oluştur Başla*/
        Veri += "<thead> <tr><th>...</th>";

        $.each(KriterArr, function (key, value) {
            Veri += "<th>" + value.KRITERADI + "</th>";
        });
        Veri += "<th>Sonuç</th>";
        Veri += "</tr></thead>";
        /*Sutunları Oluştur Bitir*/

        ///*Satırları Oluştur Başla*///
        Veri += "<tbody>";

        $.each(alternatifArr, function (i, value) {
            Veri += "<tr><td>" + value.ALTERNATIF + "</td>";
            var ustkey = i;
            var ustKriter = value.ALTERNATIF;
            $.each(KriterArr, function (key, value) {

                var deger = $("#tblAlternatifNormalizasyon" + key + " tr:not(:first)  td:last-child").eq(i).text();
                Veri += "<td id=" + ustkey + "_" + key + "_yeni" + "> "+deger+" </td>"; //Normalizasyon değerlerini buraya bastıracağız.
            });
            Veri += "<td class='sonuc'> </td>";
            Veri += "</tr>";
        });

        /*Satırları Oluştur Bitir*/

        Veri += "</tbody> ";
        Veri += "</table> </div>";



        //Kriter Ağırlıklarını Getir
        var agirlikVeri = "";        
        Veri += " <div class='col-md-2'>";      
        Veri += "<h4>Kriter Ağırlıkları</h4>";
        Veri += "<table class='table table-striped table-bordered table-hover' id='tblKararAgirlik'>";
        Veri += "<thead> <tr><th>Kriter Ağırlık</th>";
        Veri += "</tr></thead>";
        Veri += "<tbody>";

        $.each(KriterArr, function (i, value) {
            var kriterAgirlikDegeri = $("#tblNormalizasyon tr:not(:first)  td:last-child").eq(i).text();           
            Veri += "<tr><td>" + kriterAgirlikDegeri + "</td>";                       
            Veri += "</tr>";
        });

        Veri += "</tbody> ";
        Veri += "</table> </div>";
             

        $("#Karar").html(Veri);


    /* --- D --- */
    //Karar Hesapla...
        var SonucDizi = [];
        for (var i = 0; i < alternatifArr.length; i++) { // Alternatif adetince dön.
            var topla = 0;
            $.each(KriterArr, function (satir, veri) { // satır değerlerini ve ağırlık kriter tablosundaki değeri bul ve çarptır.

                // yukarıdan değişen her bir değer için her bir ağırlık değerini çarp topla.bittiğinde diziye at.
                //diğer  tr satırları için for yeniden başlasın...
                var tdDegeri = $("#tblKarar tr:not(:first) td:last-child ").parent("tr:eq(" + i + ")").find("td:eq(" + (satir + 1) + ")").text();
                var kararAgirlikDeger = $("#tblKararAgirlik tr:not(:first)  td:last-child").eq(satir).text();
                topla += parseFloat(kararAgirlikDeger).toFixed(3) * parseFloat(tdDegeri).toFixed(3);

            });

            SonucDizi.push({ SonucToplami:parseFloat(topla).toFixed(3) });

        }
       
                      
        //Sonucu Yazdır.. Yeşil ile işaretlencek
        $.each(SonucDizi, function (i, value) {
           parseFloat($("#tblKarar tr:not(:first)  td:last-child").eq(i).text(value.SonucToplami)).toFixed(3);           
        });       

        //En yüksek değeri yeşil ile işaretle
            var max = 0;
            $("#tblKarar tr:not(:first)  td:last-child").each(function () {
                $this = parseFloat($(this).text());
                if ($this > max) max = $this;
            });
            $("#tblKarar tr:not(:first)  td:last-child").each(function () {
                if ($(this).text() == max)
                    $(this).css({ "background-color": "#64b52a" }).prevAll().css({ "background-color": "#64b52a" });
            });



        //Sonuç Grafiği
        var SonucGrafikDizi = [];
        var SonucDegeri = 0;
        var AlternatifAdi = "";
        $.each(alternatifArr, function (i, value) {
            SonucDegeri     = parseFloat($("#tblKarar tr:not(:first)  td:last-child").eq(i).text());
            AlternatifAdi   = $("#tblKarar tr:not(:first)  ").find('td:first-child').eq(i).text();
            SonucGrafikDizi.push({ y: SonucDegeri, label: AlternatifAdi.toString() });
        });
       
      
        SonucGrafigi(SonucGrafikDizi);
        
        
}

function SonucGrafigi(dizi) {

    function compareDataPointYAscend(dataPoint1, dataPoint2) {
        return dataPoint1.y - dataPoint2.y;
    }

    var kararGrafik = new CanvasJS.Chart("kararGrafikAlani", {

        colorSet: "greenShades",

        title: {
            text: "Kriter Ağırlık Değerleri Grafik"

        },
        animationEnabled: true,
        axisX: {
            interval: 1,
            gridThickness: 0,
            labelFontSize: 14,
            labelFontStyle: "normal",
            labelFontWeight: "normal",
            labelFontFamily: "Lucida Sans Unicode"

        },
        axisY2: {
            interlacedColor: null,
            gridColor: "rgba(1,77,101,.1)"

        },

        data: [
        {
            type: "bar",            
            axisYType: "secondary",           
            labelFontColor: "white",
            dataPoints: dizi
        }

        ]
    });
    kararGrafik.options.data[0].dataPoints.sort(compareDataPointYAscend);
    kararGrafik.render();
    kararGrafik = {};

}

/* AHP ve Topsis Ortak Kullanımı için  */

function AhpTopsisKriterleriKaydet() {

    var veri = "";

    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
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
            veri += "<td id=" + ustkey + "__" + key + ">";
            veri += "<input  type='text'  name=degerler[" + ustkey + "]  class='form-control' id=" + ustkey + "_" + key + " onkeypress='return isNumberKey(event,this)' /> </td>'>";
        });
        veri += "</tr>";
    });
    veri += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblAhpTopsis").html(veri);

    //info ve hesapla butonunu aktif et.
    $("#btnAhpTopsis").css("display", "block");
    $("#topsisinfo2").css("display", "absolute");

}

function AhpTopsisNormalizasyon(e) {

    // Boşluk Kontrolü
    var sonuc = 0;
    $("#tblAhpTopsis input").each(function () { // Kriterler içerisinde dön                
        
        var deger = $(this).val();
        //var idsi = $(this).attr("id");
        if (deger == '' || deger == null) {
          //  $(this).css('background-color', 'red');
            sonuc += 1;
        }
    });

    if (sonuc > 0) {
        alert("Karar Matrisinde Boş Alanlar var.Lütfen Tüm Alanları Doldurunuz...");        
        e.preventDefault();        
    }
    
    

    var veri = "";
    var veriler = "";


    var inputDegerleri = [];
    $("#tblAhpTopsis input").each(function () { // Kriterler içerisinde dön                
        var sonuc = 0;
        var id = $(this).val();
        var idsi = $(this).attr("id");
        sonuc = id * id;
        inputDegerleri.push({ KARESI: sonuc, ID: idsi + "_yenisi" });
    });

    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
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
    $("#tblAhpTopsisKaresi").html(veri);

    //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(inputDegerleri, function (key, value) {
        $("#tblAhpTopsisKaresi #" + value.ID).text(parseFloat(value.KARESI).toFixed(2));
        $("#tblAhpTopsisKaresi #" + value.ID).attr("normal", parseFloat(value.KARESI).toFixed(2));
    });

    //Toplamları Yazdır...
    $("#tblAhpTopsisKaresi tr:last td:not(:first)").text(function (i) {
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
        return parseFloat(Math.sqrt(t)).toFixed(3);
    });


    // tblTopsis de girilen değerlerin her birine ulaşarak tblTopsisKaresi nde toplamı ile bölünür ve diziye atılır. 
    var normSonuc = 0;
    var normDizi = [];
    $.each(TopsisKriterler, function (key, value) {

        $.each(TopsisAlternatifler, function (alter, value) {
            normSonuc = 0;
            var deger = $("#tblAhpTopsis td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).find('input').val();
            var toplamlarKarakoku = $("#tblAhpTopsisKaresi tr:last td:not(:first)").eq(key).text();
            var yeniID = $("#tblAhpTopsis td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).find('input').attr("id");

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
    $("#tblAhpTopsisNorm").html(veriler);

    //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(normDizi, function (key, value) {
        $("#tblAhpTopsisNorm #" + value.YENIID).text(parseFloat(value.NORMDEGER).toFixed(4));
        $("#tblAhpTopsisNorm #" + value.YENIID).attr("normal", parseFloat(value.NORMDEGER).toFixed(4));
    });
   
    //info butonlarını aktif et.
    $("#topsisinfo3").css("display", "absolute");
    $("#topsisinfo4").css("display", "absolute");
    $("#topsisinfo5").css("display", "absolute");
    $("#topsisinfo6").css("display", "absolute");
    $("#topsisinfo7").css("display", "absolute");
}

function AhpTopsisAgirNormalizasyon() {
    var veri = "";
    var veriler = "";
    var IdealVeri = "";

    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
    });
  

    var agirSonuc = 0;
    var agirDizi = [];
    $.each(TopsisKriterler, function (key, value) {

        $.each(TopsisAlternatifler, function (alter, value) {
            agirSonuc = 0;
            var deger = $("#tblAhpTopsisNorm  td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
            var kriterAgirDegeri = $("#tblNormalizasyon tr:not(:first)  td:last-child").eq(key).text();
            var yeniIDsi = $("#tblAhpTopsisNorm  td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).attr("id");

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
    $("#tblAhpAgirlikliNormalizasyon").html(veriler);


    //Normalizasyon tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(agirDizi, function (key, value) {
        $("#tblAhpAgirlikliNormalizasyon #" + value.YENIID).text(parseFloat(value.AGIRNORMDEGER).toFixed(4));
        $("#tblAhpAgirlikliNormalizasyon #" + value.YENIID).attr("normal", parseFloat(value.AGIRNORMDEGER).toFixed(4));
    });


    // İdeal ve Negatif İdeal Değerlerini bulmak için...
    var MaxMinDizi = [];
    var MaxGenelDizi = [];
    var MinGenelDizi = [];
    var deger = 0;
    $.each(TopsisKriterler, function (key, value) {
        MaxMinDizi = []; //her dönüşte yeni sütun için boşalt.
        $.each(TopsisAlternatifler, function (alter, value) {

            deger = $("#tblAhpAgirlikliNormalizasyon   td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
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
        IdealVeri += "<td id=" + value.MAXDEGER + "_Ideal" + "> " + value.MAXDEGER + " </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
    });
    IdealVeri += "</tr>";

    IdealVeri += "<tr> <td>Negatif İdeal</td>";
    $.each(MinGenelDizi, function (key, value) {
        IdealVeri += "<td id=" + value.MINDEGER + "_Ideal" + "> " + value.MINDEGER + " </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
    });
    IdealVeri += "</tr>";

    IdealVeri += "</tbody> ";


    /*Tabloya Bastır*/
    $("#tblAhpIdeal").html(IdealVeri);


}

function AhpTopsisUzaklikBul() {

    var veriler = "";
    var veri = "";


    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
    });


    // tblAgirlikliNormalizasyon de gelen değerlerin her birine ulaşarak İdeal ve Negatif İdeal Tablosunu nde toplamı ile çıkartılır ve üssü alınır.. ve diziye atılır. 
    var uzaklikSonuc = 0;
    var uzaklikSonucUssu = 0;
    var uzaklikDizi = [];
    $.each(TopsisKriterler, function (key, value) {

        $.each(TopsisAlternatifler, function (alter, value) {
            uzaklikSonuc = 0;
            uzaklikSonucUssu = 0;
            var deger = $("#tblAhpAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
            var agirlikNormDegeri = $("#tblAhpIdeal tr:not(:last) td:not(:first)").eq(key).text();
            var yeniIDsi = $("#tblAhpAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).attr("id");

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
    $("#tblAhpUzaklik").html(veriler);


    //Uzaklık tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(uzaklikDizi, function (key, value) {
        $("#tblAhpUzaklik #" + value.YENIID).text(parseFloat(value.UZAKLIKDEGER).toFixed(5));
        $("#tblAhpUzaklik #" + value.YENIID).attr("normal", parseFloat(value.UZAKLIKDEGER).toFixed(5));
    });

    var ToplamSutunu = TopsisKriterler.length;
    // Toplam Sütununu Yazdır...
    $.each(TopsisAlternatifler, function (key, value) {

        $("#tblAhpUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text(function (p, m) {
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
        $("#tblAhpUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text(function (p, m) {
            var GelenDeger = 0;
            var Sonuc = 0;
            GelenDeger = $("#tblAhpUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text();
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
            var deger = $("#tblAhpAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
            var agirlikNormDegeri = $("#tblAhpIdeal tr:last td:not(:first)").eq(key).text();
            var yeniIDsi = $("#tblAhpAgirlikliNormalizasyon td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).attr("id");

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
        veri += "<td id=" + ustkey + "_" + key + "_negatifToplam" + "></td>";
        veri += "<td id=" + ustkey + "_" + key + "_negatifsi" + "></td>";
        veri += "</tr>";
    });

    veri += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblAhpUzaklikNegatif").html(veri);


    //Uzaklık tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(NegatifDizi, function (key, value) {
        $("#tblAhpUzaklikNegatif #" + value.YENIID).text(parseFloat(value.NEGATIFDEGER).toFixed(5));
        $("#tblAhpUzaklikNegatif #" + value.YENIID).attr("normal", parseFloat(value.NEGATIFDEGER).toFixed(5));
    });

    // Toplam Sütununu Yazdır...
    $.each(TopsisAlternatifler, function (key, value) {

        $("#tblAhpUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text(function (p, m) {
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
        $("#tblAhpUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text(function (p, m) {
            var GelenDeger = 0;
            var Sonuc = 0;
            GelenDeger = $("#tblAhpUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 2) + ")").eq(key).text();
            Sonuc = parseFloat(Math.sqrt(GelenDeger)).toFixed(5);
            return Sonuc;
        });
    });


}

function AhpTopsisSonuc() {

    var sonucVeri = "";

    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
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
    $("#tblAhpSonuc").html(sonucVeri);

    var ToplamSutunu = TopsisKriterler.length;
    // S+ Yazdır
    $.each(TopsisAlternatifler, function (key, value) {


        $("#tblAhpSonuc td:not(:first)").parent().find("td:nth-child(" + (0 + 2) + ")").eq(key).text(function (p, m) {
            var GelenDeger = 0;
            GelenDeger = $("#tblAhpUzaklik td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text();
            return GelenDeger;
        });
    });

    // S- yi yazdır.. 
    $.each(TopsisAlternatifler, function (key, value) {

        // Toplamları dolaş değerlerini al ve karaköklerini alarak Si alanına yazdır.
        $("#tblAhpSonuc td:not(:first)").parent().find("td:nth-child(" + (1 + 2) + ")").eq(key).text(function (p, m) {
            var GelenDeger = 0;
            GelenDeger = $("#tblAhpUzaklikNegatif td:not(:first)").parent().find("td:nth-child(" + (ToplamSutunu + 3) + ")").eq(key).text();
            return GelenDeger;
        });
    });

    //Sonucu Yazdır
    $.each(TopsisAlternatifler, function (key, value) {

        // Toplamları dolaş değerlerini al ve karaköklerini alarak Si alanına yazdır.
        $("#tblAhpSonuc tr:not(:first)  td:last-child").eq(key).text(function (p, m) {
            var GelenDeger = 0;
            var sArti = $("#tblAhpSonuc tr:not(:first)  td:last-child").prev('td:not(:first-child)').prev().eq(key).text();
            var Eksi = $("#tblAhpSonuc tr:not(:first)  td:last-child").prev('td:not(:first-child)').eq(key).text();

            var toplamSonuc = parseFloat(sArti) + parseFloat(Eksi);

            return GelenDeger = parseFloat(Eksi).toFixed(5) / parseFloat(toplamSonuc).toFixed(5);
        });
    });

    //En yüksek değeri yeşil ile işaretle
    var max = 0;
    $("#tblAhpSonuc tr:not(:first)  td:last-child").each(function () {
        $this = parseFloat($(this).text());
        if ($this > max) max = $this;
    });
    $("#tblAhpSonuc tr:not(:first)  td:last-child").each(function () {
        if ($(this).text() == max)
            $(this).css({ "background-color": "#64b52a" }).prevAll().css({ "background-color": "#64b52a" });
    });

}

/* Vikor Kullanımı için  */

function VikorKararMatrisi()
{
    var TopsisMatrisDegerleri = [];
    $("#tblAhpTopsis input").each(function () {       
        var deger = $(this).val();
        var idsi = $(this).attr("id");       
        TopsisMatrisDegerleri.push({ Degeri: deger, ID: idsi + "_yeniVikor" });
    });


    var veri = "";

    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
    });

    /*Sutunları Oluştur Başla*/
    veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#7c3b97'>Topsis Karar Matrisi</th>";

    $.each(TopsisKriterler, function (key, value) {
        veri += "<th style='width:20%;'>" + value.KRITERADI + "</th>'>";
    });

    veri += "</tr></thead>";

    ///*Satırları Oluştur Başla*///
    veri += "<tbody id='VikorKararMatrisi'> ";

    $.each(TopsisAlternatifler, function (key, value) {
        veri += "<tr><td>" + value.ALTERNATIFADI + "</td>";
        var ustkey = key;        
        $.each(TopsisKriterler, function (key, value) {               
            veri += "<td id=" + ustkey + "_" + key + "_yeniVikor" + "> </td>"; //Normalizasyon değerlerini buraya bastıracağız.           
        });
        veri += "</tr>";
    });
    veri += "</tbody> ";
   
    $("#tblVikor").html(veri);

    $("#btnVikor").css("display", "block");
    $("#vikorinfo").css("display", "absolute");

    //tblVikor tablosunun değerlerini id'si eşit olanlar ile doldur.
    $.each(TopsisMatrisDegerleri, function (key, value) {
        $("#tblVikor #" + value.ID).text(parseFloat(value.Degeri).toFixed(2));
        $("#tblVikor #" + value.ID).attr("normal", parseFloat(value.Degeri).toFixed(2));
    });
}

function VikorMaxMinHesapla() {

    var Veri = "";
    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
    });
   
    // Max ve Min  Değerlerini bulmak için...
    var MaxMinDizi = [];
    var MaxMinGenelDizi = [];
    
    var deger = 0;
    $.each(TopsisKriterler, function (key, kriterler) {
        MaxMinDizi = []; //her dönüşte yeni sütun için boşalt.
        $.each(TopsisAlternatifler, function (alter, value) {

            deger = $("#tblVikor  td:not(:first)").parent().find("td:nth-child(" + (key + 2) + ")").eq(alter).text();
            MaxMinDizi.push(deger); //sütundaki değerleri diziye at.
        });
        //Aşağıda kullanılmak üzere min-max ve kriter adını tek dizide birleştir...
        MaxMinGenelDizi.push({ MAXDEGER: Math.max.apply(Math, MaxMinDizi), MINDEGER: Math.min.apply(Math, MaxMinDizi), KRITERADI: kriterler.KRITERADI });         
    });

    
    /*Sutunları Manual Oluştur*/
    Veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#7c3b97'>1. Adım</th>";
    Veri += "<th style='width:20%;'>f<sup>+</sup><sub>i</sub></th>";
    Veri += "<th style='width:20%;'>f<sup>-</sup><sub>i</sub></th>";
    Veri += "<th style='width:20%;'>w<sub>i</sub></th>";

    Veri += "</tr></thead>";
    Veri += "<tbody id='MaxMin'> ";    

    $.each(TopsisKriterler, function (key, ustKriter) { // Kriter Adetince dönç
        Veri += "<tr><td>" + ustKriter.KRITERADI + "</td>";
        var ustkey = key;
        $.each(MaxMinGenelDizi, function (key, value) {
            if (ustKriter.KRITERADI == value.KRITERADI) { // Dizideki kriter adı ile içinde bulunduğu kriter adı aynı ise + ve - değerleri td olarak yazdır.
                Veri += "<td id=" + value.MAXDEGER + "_Max" +value.KRITERADI+ "> " + value.MAXDEGER + " </td>"; 
                Veri += "<td id=" + value.MINDEGER + "_Min" +value.KRITERADI+ "> " + value.MINDEGER + " </td>"; 
            }            
        });
        Veri += "<td></td>"; //Ağırlık değerlerinide buraya
        Veri += "</tr>";
    });
    Veri += "</tbody> ";    
    $("#tblMaxMin").html(Veri);


    //Ağırlık Değerlerini son sutuna yazdır...
    $.each(TopsisKriterler, function (i, value) {
        var kriterAgirlikDegeri = $("#tblNormalizasyon tr:not(:first)  td:last-child").eq(i).text();
        $("#tblMaxMin tr:not(:first)  td:last-child").eq(i).text(kriterAgirlikDegeri);
    });
    $("#vikorinfo2").css("display", "absolute");
}


var sDizi = [];
var rDizi = [];
function sHesapla()
{
    var Veri = "";

    var TopsisKriterler = [];
    $("#inputs > div.calisma").each(function () { // Kriterler içerisinde dön                
        var _kriteradi = $("[name*=Aciklama]", this).val();
        TopsisKriterler.push({
            KRITERADI: _kriteradi
        });
    });


    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // alternatifler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
    });

    sDizi = [];
    rDizi = [];
    var MaxMinDeger = [];
    $.each(TopsisAlternatifler, function (key, alternatif) { // alternatif Adetince dönç
        var toplam = 0;
        var deger = 0;
        MaxMinDeger = [];
        $.each(TopsisKriterler, function (alt, kriter) {
           
            
        var MaxDegeri = $("#tblMaxMin  td:not(:first)").parent().find("td:nth-child(" + (0 + 2) + ")").eq(alt).text(); // Maxmin Tabosundaki nax değer           
        var kriterDegeri = $("#tblVikor tr:not(:first) td:last-child ").parent("tr:eq(" + key + ")").find("td:eq(" + (alt + 1) + ")").text();//Matris tablodaki değer
        var agirlik = $("#tblMaxMin tr:not(:first)  td:last-child").eq(alt).text(); // Ağırlık Değeri
        var MinDegeri = $("#tblMaxMin  td:not(:first)").parent().find("td:nth-child(" + (1 + 2) + ")").eq(alt).text(); // Maxmin tablosundaki min değeri

        toplam += (((MaxDegeri - kriterDegeri) * agirlik) / (MaxDegeri - MinDegeri)); // işlemi yap ve topla.

        deger = (((MaxDegeri - kriterDegeri) * agirlik) / (MaxDegeri - MinDegeri)); // R değerlerini bulmak için ayrı bir diziye at.aşağıda max değerleri bulunacak.
        MaxMinDeger.push(deger);
        });
       // console.log(MaxMinDeger);
        sDizi.push({ SDEGERI: toplam,altAdi:alternatif.ALTERNATIFADI });
        rDizi.push({ MAXDEGERI: Math.max.apply(Math, MaxMinDeger), altAdi: alternatif.ALTERNATIFADI })

    });

    console.log(sDizi);
    console.log(rDizi);

    /* S ve R Değerlerini Yazdır... */
    /*Sutunları Oluştur Başla*/
    Veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#7c3b97'>2.Adım</th>";

    $.each(TopsisAlternatifler, function (key, value) {
        Veri += "<th>" + value.ALTERNATIFADI + "</th>'>";
    });

    Veri += "<th>S<sup>-</sup> , R<sup>-</sup></th>'>";
    Veri += "<th>S<sup>*</sup> , R<sup>*</sup></th>'>";

    Veri += "</tr></thead>";
   
    Veri += "<tbody id='SRdegerleri'> ";

    Veri += "<tr id='S'> <td>S<sub>j</sub></td>";

    $.each(sDizi, function (key, value) {
        Veri += "<td> " + parseFloat(value.SDEGERI).toFixed(5) + " </td>"; 
    });

    Veri += "<td></td>";// Max Değerler Buraya ( S- ve R-)
    Veri += "<td></td>";// Min Değerler Buraya ( S* ve R*)
    Veri += "</tr>";

    Veri += "<tr id='R'> <td>R<sub>j</sub></td>";
    $.each(rDizi, function (key, value) {
        Veri += "<td> " + parseFloat(value.MAXDEGERI).toFixed(5) + " </td>"; 
    });
    Veri += "<td></td>";// Max Değerler Buraya ( S- ve R-)
    Veri += "<td></td>"; // Min Değerler Buraya ( S* ve R*)
    Veri += "</tr>";

    Veri += "</tbody> ";

    /*Tabloya Bastır*/
    $("#tblSR").html(Veri);

    var AlternatifSayisi = TopsisAlternatifler.length;

    var MaxDizi = [];
    for (var i = 0; i < 2; i++) {
        $("#tblSR td:not(:first)").parent().find("td:nth-child(" + (AlternatifSayisi + 2) + ")").eq(i).text(function () {
            var t = 0;
            MaxDizi = [];
            $(this).prevAll('td:not(:first-child)').each(function (a, b) {
                t = parseFloat($(this).text());
                MaxDizi.push(t);
            });
            var MaxDeger = Math.max.apply(Math, MaxDizi);
            return parseFloat(MaxDeger).toFixed(5);
        });
    }

    var MinDizi = [];
    for (var i = 0; i < 2; i++) {
        $("#tblSR td:not(:first)").parent().find("td:nth-child(" + (AlternatifSayisi + 3) + ")").eq(i).text(function () {
            var t = 0;
            MinDizi = [];
            $(this).prevAll('td:not(:first-child)').each(function (a, b) {
                t = parseFloat($(this).text());
                MinDizi.push(t);
            });
            var MinDeger = Math.min.apply(Math, MinDizi);
            return parseFloat(MinDeger).toFixed(5);
        });
    }

    $("#vDegeriAlani").css("display", "block");
    $("#btnQDegeri").css("display", "block");
    $("#vikorinfo3").css("display", "absolute");
    
}
var qDizi = [];
function QHesapla(e) {

    var veri = "";

    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // alternatifler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
    });

    var vDegeri = $("#txtVdegeri").val();

    if (vDegeri == '' || vDegeri == null) {
        alert("Lütfen V değerini giriniz...");
        e.preventDefault();
    }


    qDizi = [];
    $.each(TopsisAlternatifler, function (key, alternatif) { // alternatif Adetince dönç
       
        var islem = 0;       

        var Sdegeri = $("#tblSR tr:not(:first) td:last-child ").parent("tr:eq(" + 0 + ")").find("td:eq(" + (key + 1) + ")").text();
        var Rdegeri = $("#tblSR tr:not(:first) td:last-child ").parent("tr:eq(" + 1 + ")").find("td:eq(" + (key + 1) + ")").text();
        var Smax    = $("#tblSR tr:not(:first) td:last-child ").parent("tr:eq(" + 0 + ")").find("td:eq(" + (TopsisAlternatifler.length + 1) + ")").text();
        var Rmax    = $("#tblSR tr:not(:first) td:last-child ").parent("tr:eq(" + 1 + ")").find("td:eq(" + (TopsisAlternatifler.length + 1) + ")").text();
        var Smin    = $("#tblSR tr:not(:first) td:last-child ").parent("tr:eq(" + 0 + ")").find("td:eq(" + (TopsisAlternatifler.length + 2) + ")").text();
        var Rmin    = $("#tblSR tr:not(:first) td:last-child ").parent("tr:eq(" + 1 + ")").find("td:eq(" + (TopsisAlternatifler.length + 2) + ")").text();
        
        islem = vDegeri * ((Sdegeri - Smin) / (Smax - Smin)) + ((1 - vDegeri) * (Rdegeri - Rmin) / (Rmax - Rmin));
     
        qDizi.push({ SONUC: islem,altAdi:alternatif.ALTERNATIFADI });
    });

    
    /* Q Değerlerini Yazdır... */
  
    veri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#7c3b97'>3.Adım</th>";
    $.each(TopsisAlternatifler, function (key, value) {
        veri += "<th>" + value.ALTERNATIFADI + "</th>'>";
    });   
    veri += "</tr></thead>";
    veri += "<tbody> ";
    veri += "<tr> <td>Q<sub>j</sub></td>";
    $.each(qDizi, function (key, value) {
        veri += "<td> " + parseFloat(value.SONUC).toFixed(5) + " </td>";
    });   
    veri += "</tr>";
    veri += "</tbody> ";
    $("#tblQ").html(veri);

    $("#kosullar").css("display", "block");
    $("#kosullar2").css("display", "block");
    $("#vikorinfo4").css("display", "absolute");
    $("#vikorinfo5").css("display", "absolute");
}

function SDiziSort(a, b) {
    var aName = a.SDEGERI;
    var bName = b.SDEGERI;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function RDiziSort(a, b) {
    var aName = a.MAXDEGERI;
    var bName = b.MAXDEGERI;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function QDiziSort(a, b) {
    var aName = a.SONUC;
    var bName = b.SONUC;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function SRQSirala() // bunu bir butona bağla
{
    var Sveri = "";
    var Rveri = "";
    var Qveri = "";
   
   
    sDizi.sort(SDiziSort);
    rDizi.sort(RDiziSort);
    qDizi.sort(QDiziSort);

    Sveri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#7c3b97'>S Değeri</th>";
    Sveri += "<th>S<sub>j</th>";
    Sveri += "</tr></thead>";

    Sveri += "<tbody> ";

    $.each(sDizi, function (key, value) {
        Sveri += "<tr><td>" + value.altAdi + "</td>";
        Sveri += "<td id=" + key + ">" + value.SDEGERI + " </td>";
        Sveri += "</tr>";
    });
    Sveri += "</tbody> ";

    $("#tblSSiralama").html(Sveri);

    Rveri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#7c3b97'>R Değeri</th>";
    Rveri += "<th>R<sub>j</th>";
    Rveri += "</tr></thead>";

    Rveri += "<tbody> ";

    $.each(rDizi, function (key, value) {
        Rveri += "<tr><td>" + value.altAdi + "</td>";
        Rveri += "<td id=" + key + ">" + value.MAXDEGERI + " </td>";
        Rveri += "</tr>";
    });
    Rveri += "</tbody> ";

    $("#tblRSiralama").html(Rveri);

    Qveri += "<thead> <tr><th style='width:20%;color:#fff' bgcolor='#7c3b97'>Q Değeri</th>";
    Qveri += "<th>Q<sub>j</th>";
    Qveri += "</tr></thead>";

    Qveri += "<tbody> ";

    $.each(qDizi, function (key, value) {
        Qveri += "<tr><td>" + value.altAdi + "</td>";
        Qveri += "<td id=" + key + ">" + value.SONUC + " </td>";
        Qveri += "</tr>";
    });
    Qveri += "</tbody> ";

    

    $("#tblQSiralama").html(Qveri);



   
    
}

function Kosullar() {

    var TopsisAlternatifler = [];
    $("#Alternatifinputs > div.calisma").each(function () { // alternatifler içerisinde dön                
        var _alternatifAdi = $("[name*=Alternatif]", this).val();
        TopsisAlternatifler.push({
            ALTERNATIFADI: _alternatifAdi
        });
    });

    //1.Koşul
    var eniyiSonuc = qDizi[0].SONUC; //sıralama yapıldığı için ilk değer en iyi değerdir. 1. değer ise en iyi ikinci değerdir.
    var eniyiIkinci = qDizi[1].SONUC;
    var dq = 1 / (TopsisAlternatifler.length - 1);
    $("#dq").text("D(Q) = " + dq);

    var kosul1Sonuc = eniyiIkinci - eniyiSonuc;

    if (kosul1Sonuc == dq || kosul1Sonuc > dq) {
        $("#kosulsonuc1").removeClass("alert alert-danger");
        $("#kosulsonuc1").addClass("alert alert-success");
        $("#kosulsonuc1").text("C(1) = " + parseFloat(kosul1Sonuc).toFixed(5)+ " ≥ " + dq + " ( 1. Koşul Sağlandı)");
    }
    else {
        $("#kosulsonuc1").removeClass("alert alert-success");
        $("#kosulsonuc1").addClass("alert alert-danger");
        $("#kosulsonuc1").text("C(1) = " + parseFloat(kosul1Sonuc).toFixed(5) + " < " + dq + " ( 1. Koşul Sağlanamadı)");
    }

    //2.Koşul
    var eniyiAlt = qDizi[0].altAdi;
    var eniyiS = sDizi[0].altAdi;//en iyi değer
    var eniyiR = rDizi[0].altAdi;//en iyi değer..
    $("#eniyiAlt").text("En İyi Alternatif " + eniyiAlt);
    if (eniyiAlt  == eniyiS || eniyiAlt == eniyiR) {
        $("#kosulsonuc2").removeClass("alert alert-danger");
        $("#kosulsonuc2").addClass("alert alert-success");
        $("#kosulsonuc2").text(eniyiAlt + " alternatifi,S ve R değerlerinin de en az bir tanesinde en iyi skoru elde etmiştir.");
    }
    else {
        $("#kosulsonuc2").removeClass("alert alert-success");
        $("#kosulsonuc2").addClass("alert alert-danger");
        $("#kosulsonuc2").text(eniyiAlt + " alternatifi,S ve R değerlerinin de en az bir tanesinde bulunamadı.");
    }

    $("#vikorinfo6").css("display", "absolute");

}
