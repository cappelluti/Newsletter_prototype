$(document).ready(function() {
    $.mobile.page.prototype.options.domCache = true;
     folder = "http://www.edizioniseed.it/app_newsletter/"
     //folder = "articoli/"
    
    news_file = new Array();
    news_titolo = new Array();
    
    news_file=["newsletter_1.html",
               "newsletter_2.html",
               "newsletter_3.html",
               "newsletter_4.html"];
    
    news_titolo=["1. L’arresto cardiaco intraospedaliero: ottimizzare l’organizzazione",
               "2. Reversibilità delle alterazioni RM in un caso di epilessia del lobo temporale mesiale",
               "3. Emergency Plasmapheresis in a case of Thrombotic Thrombocytopenic Purpura (TTP)",
               "4. Gravidanza in pazienti affette da epilessia: confronto tra strategie terapeutiche consolidate e opportunità offerte dai nuovi farmaci"];
    
    lista = [];
    lista.push("<div data-role='controlgroup' data-type='vertical'>");
    lista.push("<p>Seleziona newsletter</p>");
    for (i=news_file.length-1;i>-1;i--){  
       lista.push("<a href='#pag_news?id="+i+"' data-role='button' rel='external'>"+news_titolo[i]+"</a>");
    }    
    lista.push("</div>")
    $("#lista_news").append(lista.join(""));
    $("#lista_news").trigger("create");
});


$(document).on('pageshow', '#pag_news', function (event, data) {
    //Leggo URL
    var id = decodeURI((RegExp("id" + '=' + '(.+?)(&|$)').exec(window.location.href)||[,null])[1]);
    
    $("#menu").html("");
    $("#area").html("");
    
    for (i=news_file.length-1;i>-1;i--){
        selected="";
        if (i==id) {
            selected=" selected";
        }
        $("#menu").append("<option value='"+i+"'"+selected+">"+news_titolo[i]+"</option>");
    }    
    $("#menu").change(function(){        
        var valore = "";
        $( "select option:selected" ).each(function() {
            valore=$(this).attr('value');
        });
        file_da_caricare=folder+news_file[valore];
        
        $("#area").load( file_da_caricare, function(response,status,xhr) {
            if (status == "error") {$("#area").html("<h4>Errore: xhr.status=" + xhr.status + ". xhr.statusText" + xhr.statusText +"</h4>");};
            $(".sottotitolo-1").click(function(){$(this).nextUntil(".sottotitolo-1").slideToggle(600);}).click();
        });   
    }).change();
    
    $("#torna_su").click(function() {
        $('html, body').animate({scrollTop:0},1000);
    });
    
    $("[data-role=footer]").fixedtoolbar({ tapToggleBlacklist: ".sottotitolo-1, a" })
});
