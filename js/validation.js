//function isNumber(n){
//    return !isNaN(parseFloat(n)) && isFinite(n);
//}
//
//
//function fn(){
//
//    $( "#hello" ).dialog({ autoOpen: false });
//}

$(document).ready(function()
{
    $( "#hello" ).dialog({
        autoOpen: false
    });

    $( "#PDFOptions" ).click(function() {
        $("#hello").dialog("open");
        //$('#pop').bPopup({
        //    follow: [false, false], //x, y
        //    position: [150, 400] //x, y
        //});
    });
    $('#closePopup').click(function(){
        $("#hello").dialog("close");
        $(".NonPDF").show();

    });
    });