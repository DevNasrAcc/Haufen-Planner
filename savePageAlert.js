$(document).ready(function()
{
     unsaved = false;

    $("body").change(function(){ //trigers change in all input fields including text type
        unsaved = true;
    });
    $("#WholeUpdateBtn").click(function(){ //trigers change in all input fields including text type
        unsaved = false;
    });
    function unloadPage(){
        if(unsaved){
            return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
        }
    }

    window.onbeforeunload = unloadPage;

});
