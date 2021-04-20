// JavaScript Document
$(document).ready(function()
{
	console.log = function() {}
    $(document).on({
        ajaxStart: function() { $('body').addClass("loading");    },
        ajaxStop: function() { $('body').removeClass("loading"); }
    });

    var  unsaved;//tracking changes on page
    if(window.location.href.indexOf("projectCommentHistory.php")>-1)
    {
        ProjectListContinueStartPause()
    }
    if(window.location.href.indexOf("statusreport.php") > -1)
    {


        ///alert("statusreport");
        //$('.dmProjName').change(function ()// when user select username return the current  project of that person

        $.when
        (
            ProjectListContinueStartPause()
        ).then(
            //GetProjectStatusOptions()
            projectList()
        ).then(
            //SetOptions() // set options in <select> <option>
        )
            .then
        (

        );

//	$('.pk_id_status').on('change', function() {
//			   alert($('input[name=group2]:checked').attr('id'));
//			   $('input[name=group2]:checked').attr('checked', 'checked');
//			});

       function updateBtnDisable(){
           if($(".Red").length != 0)
           {
               $("#WholeUpdateBtn").toggle();
           }
           //else {
           //
           //    $("#WholeUpdateBtn").toggle();
           //}
       }
        Ownchangeable();


        // if row add in Data consistensi
        $("#AddRowDataConsisten").click(function()
        {
            var CurrRow = (parseInt ($("#TabDataConsisten").attr("rows")) + 1 );
            //alert(CurrRow);
            $("#TabDataConsisten").attr("rows",(CurrRow))

            AddRowDataConsisten(CurrRow);

        });
		
		


        $("#AddRowReCommdPrced").click(function()
        {
            CurrRow = (parseInt ($("#TabReCommdPrced").attr("rows")) + 1 );
            //AddRowITR
            $("#TabReCommdPrced").attr("rows",(CurrRow))
            AddRowReCommdPrced(CurrRow);
        });


        $("#AddRemoveMilestones").click(function()
        {
			if($(".Update").length != 0 || $(".New").length != 0)
			{
				alert("Some information remain to Update.\nPlease press 'Update' first");
				return false;
			}
	
		
            WholeListOfMileStones();
            //$(this).toggle();
			$(".NonPDF").hide();
			$(".MSL_Options").show();
			 

        });
        $("#SaveChangesMilestones").click(function()
        {

            SaveChangesMilestones();
            $(this).toggle();
			$(".NonPDF").show();
			$(".MSL_Options").hide();
            //$("#AddRemoveMilestones").toggle();

        });


        $("#addproject").click(function()
        {
            addproject();
        });
        dateBlur();



        $(".MS_weightageDone").focus(function()
        {
            $(this).addClass("Update");
        }).keyup(function(e)
        {

            if(parseFloat($(this).html()) > 100){
                $('#Errors').html("<strong class='NonPDF' style='color:Red;'>Validation Error: Greater then 100 is not allowed in this field</strong>");
               //alert("Validation Error:: Greater then 100 is not allowed in this field");
                $(this).addClass('Red');
                $(this).html();
                return false;
            }

            else{
                $(this).removeClass('Red');
                $('#Errors').html("");
            }

            if($(this).attr("before") == $(this).html())
                $(this).removeClass("Update");

            var doc =0.0;

            $('.MS_weightageDone').each(function(i, obj) {
                if($(this).html() != "")
                    doc += parseFloat($(this).html());
            });

            doc = doc / $(".MS_weightageDone").length;
            $("#DOC").html(doc.toFixed(2));
            $("#DOC").addClass("Update");

        }).blur(function(){
            if(isNaN($(this).html()))
            {
                alert("Please Enter Number Only");
                $(this).html("").focus();
                return false;
            }
            if($(this).html() =="" || $(this).html() ==" ")
            {
                $(this).html(0);
            }

        });
        var total ;
        $(".MS_weightage").focus(function()
        {
            total = 0;
            $('.MS_weightage').each(function(i, obj) {
                if(!isNaN(parseFloat($(this).html())))
                    total = total + parseFloat($(this).html());
            });
            if(typeof  total =='number')
            total = total.toFixed(4);
            total = +total - $(this).html();
            $(this).addClass("Update");

        }).keyup(function(e)
        {
            if(parseFloat($(this).html()) > 1){
                $('#Errors').html("<strong class='NonPDF' style='color:Red;'>Validation Error: More then 1 is not allowed in this field.</strong>");
                //alert("Validation Error\n More then 1 is not allowed in this field");
                $(this).html();
                $(this).addClass("Red");
                return false;
            }
            else{
                $(this).removeClass('Red');
                $('#Errors').html("");
            }
            var keypressText = $(this).html();
            if((keypressText.length) > 5)
            {
                keypressText = keypressText.substring(0, keypressText.length - 1) ;
                $(this).html(keypressText);
                $(this).focus().val(keypressText);
                return false;
            }
            if(!isNaN(parseFloat($(this).html())))
                var tmp = total + parseFloat($(this).html());
            else
                tmp = total;

            var wedDif = 1 - tmp;
            console.log("total: "+total);
            console.log("tmp: "+tmp);
            if((tmp > 1 || tmp < 1) && tmp !=0.99999999999999)
            {
                $("#wedUpd").html("weightage  "+tmp.toFixed(4));
                $("#wedDif").html("Diff  "+(1 - tmp).toFixed(4));
                $("#wedUpd").addClass('Red');
                $('#Errors').html("<strong class='NonPDF' style='color:Red;'>Validation Error: Weightage total must be equal to 1.</strong>");
            }
            else{
                $('#Errors').html("");
                $("#wedUpd").removeClass('Red');
            }
            if(tmp == 1)
            {
                $(".MS_weightage").removeClass("Red");
                if(!isNaN(tmp)){
                    $("#wedUpd").html("weightage  "+tmp.toFixed(4));
                    $("#wedDif").html("Diff  "+(1 - tmp).toFixed(4));
                }
            }
            else if (tmp != 1)
            {
                $("#wedUpd").html("Total  " + tmp.toFixed(4))
                $("#wedDif").html("Diff  " + (1 - tmp).toFixed(4))
            }
        }).blur(function(e){
            console.log("type of blurrrr",parseFloat($(this).html()));
            if(isNaN($(this).html()))
            {
                alert("Please Enter Number Only");
                $(this).html("").focus();
                return false;
            }
            if($(this).html() == "" || $(this).html() ==" ")
            {
                $(this).html(0);
            }
            var html = $(this).html();
            html = html.replace("&nbsp;","");
            if($(this).attr("before") == $.trim(html)	)
            {
                $(this).removeClass("Update");
            }
        });

        // on click on Status
        StatusChangeOnRuntime();
        // MileStones Tick Update
        milestonechkOnRuntime();
        //MileStonelist Appear on Click
        OwnchangeableMileStone();
        // change CurrentStatus
        StatusColChgOnRuntime();
		// add class 'Update' on click on comments
		CommentsFocusUpdate();
      
        $("#PDFOptions").click(function()
        {
            $(".NonPDF").hide();
            $(".plzHide").hide();
            $(".PDFOptions").show();
        });
        $("#PDFActual").click(function()
        {
            $('.MS_weightageDone').each(function(i, obj) {
                wedVal  = $(this).attr('before');
                Diff10 = (10 * wedVal)/100;
                $(this).focus().html(wedVal);

            });
            pdf();
        });
        $("#PDFDB").click(function()
        {
            $('.MS_weightageDone').each(function(i, obj) {
                wedVal  = $(this).attr('before')
                if(wedVal <100){
                    Diff = (10 * wedVal)/100

                    $(this).focus().html(wedVal - Diff);
                    $(this).blur();

                }
            });
            pdf();
        });
        $("#PDFClient").click(function()
        {
            $('.MS_weightageDone').each(function(i, obj) {
                wedVal  = $(this).attr('before')
                if(wedVal <100) {
                    Diff = (20 * wedVal) / 100
                    $(this).focus().html(wedVal - Diff);
                    $(this).blur();
                }

                //total += parseFloat($(this).html())
                //console.log(parseFloat($(this).html()))
            });
            pdf();
        })
        $("#PDFFrom").click(function()
        {
            $(".NonPDF").hide();
        });
        function pdf()
        {
            $("#hello").dialog("close");
            $(".NonPDF").hide();
            var pdf = new jsPDF('p', 'in', 'a4');
            pdf.addHTML($('body')[0], function() {
                var currentDate = new Date();
                var day = currentDate.getDate();
                var month = currentDate.getMonth()+1;
                var year = currentDate.getFullYear();
                if(month.toString().length ==1) month = "0"+month
                if(day.toString().length ==1) day = "0"+day;

                var fullDate = year+'-'+month+'-'+day;
                var pdfName = $("#projects-PK-Name").html();
                pdf.save(pdfName + '-'+ fullDate +'.pdf');
                //pdf.output('datauri');
                $(".NonPDF").show();
            });
            //
        }
        $('#DownloadPDF').click(function() {
            $("#hello").dialog("close");
            $(".hello").hide();
            $(".NonPDF").hide();
            //$("#container").css('zoom' , '10');
            //$('body').css({ zoom: 10, '-moz-transform': 'scale(' + 10 + ')' });
            pdf ()




        });



        //	$('#DownloadPDF').on('click', function() {
//				//http://mrrio.github.io/jsPDF/examples/basic.html
//				alert("click");
//				var pdf = new jsPDF('p', 'pt', 'letter')
//
//				// source can be HTML-formatted string, or a reference
//				// to an actual DOM element from which the text will be scraped.
//				//, source = $('#fromHTMLtestdiv')[0]
//				, source = $('#container')[0]
//
//				// we support special element handlers. Register them with jQuery-style
//				// ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
//				// There is no support for any other type of selectors
//				// (class, of compound) at this time.
//				, specialElementHandlers = {
//					// element with id of "bypass" - jQuery style selector
//					//'#bypassme': function(element, renderer){
//						'#ProjectData': function(element, renderer){
//						// true = "handled elsewhere, bypass text extraction"
//						return true
//					}
//				}
//
//				margins = {
//					top: 80,
//					bottom: 60,
//					left: 40,
//					width: 522
//				  };
//				  // all coords and widths are in jsPDF instance's declared units
//				  // 'inches' in this case
//				  console.log(source)
//				pdf.fromHTML(
//					source // HTML string or DOM elem ref.
//					, margins.left // x coord
//					, margins.top // y coord
//					, {
//						'width': margins.width // max width of content on PDF
//						, 'elementHandlers': specialElementHandlers
//					},
//					function (dispose) {
//					  // dispose: object with X, Y of the last line add to the PDF
//					  //          this allow the insertion of new lines after html
//						pdf.save('Test.pdf');
//					  },
//					margins
//				  )
//
//			});
//





    }
    else if(window.location.href.indexOf("statusreportedit.php") > -1)
    {
        $( document ).ready(function() {
            alert("edit");
            $.when
            (
                getPersonNameAndProjectName()
            ).then(
                //GetProjectStatusOptions()
            ).then(
                SetOptions() // set options in <select> <option>
            );
        });
    }
});

function CommentsFocusUpdate()
{
	
        $(".Comments").focus(function()
        {

            //if(CurrClass.indexOf("New") == -1)
			if($(this).html() == "New Comments" || $(this).html() == "Edit this text")
				$(this).html("")
            if(!($(this).hasClass("New")))
                $(this).addClass('Update')

        }).blur(function(){
            var html =$(this).html();
            html = html.replace("&nbsp;","");
            if($(this).attr('before') ==  $.trim(html))
            {
                $(this).removeClass('Update')
            }
			
        });

}
function dateBlur(){

    $(".date").click(function()
    {
        if($(this).parent().find(".Calender").length>0){
         
            return false;
        }
        var value = $(this).html();
        console.log("Value: "+value);
        $(this).toggle();
        var par = $(this).parent().get( 0 ); // return tr of this td to get all td
        console.log("par: "+par);


        $(par).append('<input type="date" class="Calender" value="'+value+'">');
        CalenderBlur();
    });
}
function CalenderBlur()
{
    $(".Calender").change(function()
    {
        console.log($( "#date" ));
        //alert('dfd');
        var par = $(this).parent().get( 0 )
        //$(par).children('img').hide();
        var value = $(this).val();
        if(value == "")
            value = "0000-00-00"
        //console.log("CalenderBlur value: "+value);
        var lbl = $(par).find('label')
        $(lbl).html(value)
        $(lbl).toggle();
        $(this).remove();
        if($(this).val() != $(lbl).attr('before'))
        {
            $(lbl).addClass("Update");
        }

    });

}
function AddHtml(id, html)
{

    $('#'+id+' tr:last').after(html)
}

function refreshPage(tf)
{
    location.reload(tf);
}
function addproject()
{

    var NewprojName = ($("#NewprojName").val());
    if(	$.trim(NewprojName) == ""	)
    {
        alert("Its empty");
        return false
    }
    var vl= NewprojName;
    var xyz = $("#projectNames1 option").filter(function(){
        return this.value ==vl;
    }).data('xyz');
    if(!xyz)
    {
        var NewAddConform = confirm("Do you wana add \n\n'"+$.trim(NewprojName)+"'\n\nas a new project");
        if(NewAddConform == false)
            return false;

        var go_path = "atuocompleteDB.php?action=addProject&vars=1&var1="+NewprojName;
        var jqxhr = $.ajax( go_path )
            .done(function() {
                $.ajax({
                    url: "atuocompleteDB.php?action=lastAddProject&vars=1&var1="+NewprojName,
                    type: "GET",
                    data: 'show=content',
                    success: function(data) {
                        console.log("atuocompleteDB.php?action=lastAddProject&vars=1&var1="+NewprojName);
                    }
                }).done(function(data){
                    //alert(data)
                    var currurl = window.location.href ;
                    var currurlArr  = currurl.split('=');
                    replaceUrl = currurlArr[0]+"="+data;
                    unsaved = false;
                    window.location.replace(replaceUrl)
                }).fail(function() {
                    alert( "Some Error In Geting  new projects PK" );
                });
            })
            .fail(function() {
                alert( "Some Error In registering new projects" );
            })
            .always(function() {
            });
    }
    else{
        alert("Name is already exists. Please choose antoher name");
        return false;
    }
}
function lastAddProjectindex()
{
    $.get( "test.php", function( data ) {
        return data;
    });
}
function TabBdyMilestonesHd()
{
    $("#TabBdyMilestones").html("");
    var html = '<tr><td width="403" bgcolor="#D9D9D9"><strong>Milestones</strong></td>';
    html +=  '<td width="75" bgcolor="#D9D9D9"><strong>Weightage</strong></td>'
    html += '<td width="93" bgcolor="#D9D9D9"><strong> Plan</strong></td>'
    html += '<td width="75" align="center" bgcolor="#D9D9D9"><strong>Actual</strong></td>'
    html += '<td width="132" bgcolor="#D9D9D9"><strong>Short comment</strong></td>'
    html +='<td colspan="4" align="center" bgcolor="#D9D9D9"><strong>Status</strong></td></tr>';
    $("#TabBdyMilestones").html(html);
}
function WholeListOfMileStones()
{
    var ProjID = $("#projects-PK-Name").attr('val')
    var go_path = "atuocompleteDB.php?action=WholeListOfMileStones&vars=1&var1="+ProjID;
    console.log(go_path);
    $.get(go_path,
        {
        }, function(data)
        {
            $.when
            (
                TabBdyMilestonesHd()
            )
             .then
            (
                AddHtml("TabBdyMilestones", data)
            ).then
			(
				$("#MSL_CheckAll").click(function()
				{
                    $(".milestonechk").each(function(e){
                       //console.log(e);
                       // console.log($(".milestonechk").eq(e).attr("checked"));
                       // if(typeof  $(".milestonechk").eq(e).attr("checked") == 'undefined')
                       // $(".milestonechk").addClass("Update");
                       // if(typeof  $(".milestonechk").eq(e).attr("checked") == 'undefined'){
                            //$(".milestonechk").eq(e).addClass("Update");

                            //$(".milestonechk").eq(e).removeClass("none");//new
                            //$(".milestonechk").eq(e).attr("checked","checked");


                        if(!$(".milestonechk").eq(e).prop('checked')){
                            $(".milestonechk").eq(e).addClass("Update");
                            $(".milestonechk").eq(e).prop("checked",true);//new
                        }
                        //}
                    });
                    //$(".milestonechk").prop('checked', true);

				})
			).then
			(
				$("#MSL_UnCheckAll").click(function()
				{
					//$(".milestonechk").prop('checked', false);
					//$(".milestonechk").addClass("none");
                    //if(!$(".milestonechk").hasClass("none"))

                    $(".milestonechk").each(function(e){
                        if($(".milestonechk").eq(e).is(':checked')){
                        //if($(".milestonechk").hasClass("none")){
                            $(".milestonechk").eq(e).removeClass("none");
                            $(".milestonechk").eq(e).prop("checked",false);
                            $(".milestonechk").eq(e).addClass("Update");//new
                        }

                        //}


                        //if($(".milestonechk").eq(e).attr("checked")){
                        //    if($(".milestonechk").eq(e).hasClass("none"))
                          //  $(".milestonechk").prop("checked",false);//new
                            //$(".milestonechk").eq(e).removeClass("none");
                            //$(".milestonechk").eq(e).removeClass("Update");//new
                            //$(".milestonechk").eq(e).addClass("Update");//new
                            //$(".milestonechk").eq(e).addClass("none");//new
                        //}

                    });
				})
			)
			;

            console.log(data);
        }).done(function(e)
        {
            milestonechkOnRuntime();
        });
}
function SaveChangesMilestones()
{
    //////////////////////////////////////////////////////////////////////////
    ////////////Delete Uncheck Entries
    //////////////////////////////////////////////////////////////////////////
    var MSKey = [];
    $('.Update').each(function(index, obj)
    {	// on check 'Update' Class will be add

        if($(this).hasClass( "milestonechk" ) && !$(this).hasClass( "none" ))
        {

            //if($(this).attr('msid') != "")
            {
                var key = $(this).attr('pid');
                key += $(this).attr('msid');
                MSKey.push(key);

            }

        }
    });

    var qry ="("
    for (var i = 0;  i< MSKey.length; i++)
    {
        qry += MSKey[i]+",";
    }
    qry = qry.substring(0, qry.length - 1);
    qry += ")";

    if(MSKey.length > 0)
    {
        var go_path = "atuocompleteDB.php?action=SaveChangesDelMilestones&vars=1&var1="+qry;
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                console.log(data);
            }).done(function()
            {
                unsaved =false;
                refreshPage(false);

            });;
    }
    //////////////////////////////////////////////////////////////////////////
    ////////////Now for New Entries
    //////////////////////////////////////////////////////////////////////////
    var MSnew = [];
    var pid = $("#projects-PK-Name").attr('val');

    $('.Update').each(function(index, obj)
    {	// on check 'Update' Class will be add

        if($(this).hasClass( "milestonechk" ) && $(this).hasClass( "none" ))
        {
                var key = $(this).attr('msid');
                MSnew.push(key);
        }
    });
    ///(1,1,2,112,'2nd Comments',1,2), (1,1,3,113,'3nd Comments',1,2)
    console.log('this in',$(this));
    var qry =""
    for (var i = 0;  i< MSnew.length; i++)
    {
        qry += "("+pid+","+MSnew[i]+","+pid+""+MSnew[i]+",0.0,'0000-00-00','0000-00-00','',0),";
    }
    qry = qry.substring(0, qry.length - 1);

    if(MSnew.length > 0)
    {
        var go_path = "atuocompleteDB.php?action=SaveChangesInsMilestones&vars=1&var1="+qry;
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log(data);
            }).done(function()
            {
                unsaved =false;
                location.reload(true);
            });
    }



    if(MSnew.length == 0 && MSKey.length == 0)
        location.reload(false);


}

function milestonechkOnRuntime()
{
    $(".milestonechk").change(function()
    {
        milestonechk(this);
    });
}
function StatusChangeOnRuntime()
{
    $(".tdClick").click(function()
    {
        tdClick(this);
    });
}
function StatusColChgOnRuntime()
{
    $(".tdColor").click(function()
    {
        tdColor(this);
    });
}
function SetOptions()
{
    alert  ("SetOptions");
    $(".setAccDB").each(function(){
        alert($(this).attr('id'));
        $(this).val('2');
        alert($(this).html());
    });

}
function OwnchangeableMileStone()
{
    $('.OwnchangeableMileStone').click( function(e) {
        if($(".EditableCurr_MS").length  != 0)
            return false;
        $(this).addClass("EditableCurr_MS");
        var thisHtml = $(this).html()
        $(".EditableCurr_MS").toggle();
        $('<input type="text" class="OwnchangeableMileStone" id="MileStoneListID" list="MileStoneList" value ="'+thisHtml +'"/>').insertAfter(".EditableCurr_MS");

    })	;

    $(document).on("focusout","#MileStoneListID",function(){


        var val = ($('#MileStoneListID').val());
        //alert(val)
        var ActiveID = $('#MileStoneList option').filter(function() {
            return this.value == val;
        }).data('xyz');


        //alert (ActiveID)
        if($('#MileStoneList').attr("before") == ActiveID)
        {
            $('#MileStoneList').removeClass("Update")
        }
        else
        {
            $('#MileStoneList').addClass("Update")
        }

        //$('<a href="javascript:void(0);" id="SetActivePhase" align="right">Set Active</a>').insertAfter(".EditableCurr_MS");
        $(".EditableCurr_MS").show();
        $(".EditableCurr_MS").html(val)
        $(".EditableCurr_MS").attr('val',ActiveID)
        $("#MileStoneListID").remove();
        $(".EditableCurr_MS").removeClass("EditableCurr_MS");

        //$("#SetActivePhase").click(function()
//			{
//				SetActivePhase(ActiveID)
//			});

    });



}
function InsertProjdata()
{
    $('#Currentstatus').removeClass("Update");
    $('#Previousstatus').removeClass("Update");
    var CurrStatus = $('#Currentstatus').attr("class");
    var PrevStatus = $('#Previousstatus').attr("class");

    CurrStatus = CurrStatus.replace("tdColor", "") == "" ? 0 : CurrStatus.replace("tdColor", "");
    PrevStatus = PrevStatus.replace("tdColor", "") =="" ? 0 : PrevStatus.replace("tdColor", "");
    var IssuedBy = $('.issuedBy').attr('val') == "" ? 0 : $('.issuedBy').attr('val');


    var id = $("#projects-PK-Name").attr('val');
    var client = $('#sr_client-src_pk-src_name').attr('val') == "" ? 0 : $('#sr_client-src_pk-src_name').attr('val');
    var leader = $('#sr_projleader-srpl_pk-srpl_name').attr('val') == "" ? 0 : $('#sr_projleader-srpl_pk-srpl_name').attr('val');
    var descrip = ($.trim($('#sr_description').html()));

    //if(id != 'undefined' && id != 0 && client !='undefined' && client != 0 && leader !='undefined' && leader != 0){
    if(id != 'undefined' && id != 0){
        var go_path = "atuocompleteDB.php?action=InsertProjdata&vars=7&var1="+id+"&var2="+client+"&var3="+leader+"&var4="+descrip+"&var5="+
            CurrStatus+"&var6="+PrevStatus+"&var7="+IssuedBy;
        console.log(go_path);

        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                console.log(data);
            }).done(function(){
                refreshPage(false);
            });
    }
    else{
        alert("Validation Error\n Client and Project Leader must be selected!");
    }


}
function UpdateProjdata()
{

    $('.Update').each(function(index, obj)
    {
        if($(this).has("#ProjPhase"))
        {
            var tmp = $(this).html();
           // tmp = tmp.replace(/(^<br>|<br>$)/g,"");
           // tmp = tmp.replace(/<\/?[^>]+(>|$)/g, "");
           // $(this).html(tmp);
            // Update Project Phase
            {
                var val = ($('#ProjPhase').html());
                //alert(val)
                var ActiveID = $('#MileStoneList option').filter(function() {
                    return this.value == val;
                }).data('xyz');
                SetActivePhase(ActiveID)

            }
        }
        if($(this).attr('id') == 'DOC')
        {

            var doc = $(this).html();
            console.log('doc',doc);
            var Sdata = doc+"<-->SR_DegreeOfComplete<-->"+($("#projects-PK-Name").attr("val"));
            console.log('Sdata', Sdata);
            //$('body').addClass("loading");
            var go_path = "atuocompleteDB.php?action=UpdateRowProjectData&vars=1&var1="+Sdata;
            console.log(go_path);
            $.get(go_path,
                {
                }, function(data)
                {
                    //$('body').removeClass("loading");
                    console.log(data);
                });
        }


    });

    if($('#sr_client-src_pk-src_name').attr('before') != $('#sr_client-src_pk-src_name').attr('val') ||
        $('#sr_projleader-srpl_pk-srpl_name').attr('before') != $('#sr_projleader-srpl_pk-srpl_name').attr('val') ||
        $('#sr_description').attr('value') != ($.trim($('#sr_description').html()) ) ||
        !$('#Currentstatus').hasClass($('#Currentstatus').attr('before')) ||
        !$('#Previousstatus').hasClass($('#Previousstatus').attr('before')) ||
        !$('.issuedBy').hasClass($('.issuedBy').attr('before'))  )
    {
        var id = $("#projects-PK-Name").attr('val');
        var client = $('#sr_client-src_pk-src_name').attr('val');
        var leader = $('#sr_projleader-srpl_pk-srpl_name').attr('val');
        var descrip = ($.trim($('#sr_description').html()) );
        var IssuedBy = $('.issuedBy').attr('val');
        $('#Currentstatus').removeClass("Update");
        $('#Previousstatus').removeClass("Update");
        var CurrStatus = $('#Currentstatus').attr("class");
        var PrevStatus = $('#Previousstatus').attr("class");

        CurrStatus = CurrStatus.replace("tdColor", "");
        PrevStatus = PrevStatus.replace("tdColor", "");


        //$('body').addClass("loading");
        var go_path = "atuocompleteDB.php?action=UpdateProjData&vars=7&var1="+id+"&var2="+client+"&var3="+leader+"&var4="+descrip+"&var5="+CurrStatus.trim()+"&var6="+PrevStatus.trim()+"&var7="+IssuedBy;
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                //$('body').removeClass("loading");
                console.log(data);
            });
    }


}
function SetActivePhase(ActiveID)
{

    //alert("SetActivePhase");
    //alert("ActiveID: "+ActiveID)

    id = $("#projects-PK-Name").attr('val');
    var go_path = "atuocompleteDB.php?action=SetPhaseActive&vars=2&var1="+id+"&var2="+ActiveID;
    $("#chk").val(go_path);
    $.get(go_path,
        {
        }, function(data)
        {
            console.log(data);
        });


}

function Ownchangeable()
{
    console.log("Ownchangeable");
    $('.Ownchangeable').focus( function(e) {
        $("#productName").html("")
        eve = $(e.target);
        id = eve.attr('id');
        if($(".EditableCurr").length  != 0)
        {
            //alert("Class found")
            return false;
        }
        var id  = $(this).attr('id');
        $(this).addClass("EditableCurr");
        var thisHtml = $(this).html();
        $(".EditableCurr").toggle();

        // Insert Html after new Class 'EditableCurr'
        function getClientList(val){
            var go_path = "atuocompleteDB.php?action=getlist&vars=1&var1="+id;
            console.log(go_path);
            $.get(go_path,
                {
                }, function(data)
                {

                    data = $.trim(data);
                    var array = {};

                    var get_data_row  = data.split(':=');
                    for(var i = 1; i < get_data_row.length ; i++ )
                    {
                        array[get_data_row[i]] = get_data_row[i + 1];
                        //$( "#productName").clear();
                        $( "#productName" ).append( '<option  data-xyz = "'+get_data_row[i]+'" value="'+get_data_row[i + 1]+'" at="0"></option>' );
                        i +=1;
                    }
                }).done(function(e){
                    var xyz = $('#productName option').filter(function() {
                        return this.value == val;

                    }).data('xyz');
                    //abc();
                    //alert("xyz: "+xyz)
                    /* if value doesn't match an option, xyz will be undefined*/
                    var valID = xyz ? '' + xyz : 'Undefined';
                    //alert("valID: "+valID);
                    if(valID != 'Undefined')
                    {
                        $(".EditableCurr").attr('val', valID)
                    }


                    // alert("New Value Added\nPlease select this field again")
                    $(".EditableCurr").show();
                    $(".EditableCurr").html(val) // ye change karta hai bt attr('val') ko update nahe karta
                    $("#AddNew").remove();
                    $(".EditableCurr").removeClass("EditableCurr");
                });
        }
        $('<input type="text" class="Ownchangeable" id="AddNew" list="productName" value ="'+thisHtml +'"/>').insertAfter(".EditableCurr");
        var go_path = "atuocompleteDB.php?action=getlist&vars=1&var1="+id;
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                data = $.trim(data);
                var array = {};

                var get_data_row  = data.split(':=');
                for(var i = 1; i < get_data_row.length ; i++ )
                {
                    array[get_data_row[i]] = get_data_row[i + 1];

                    $( "#productName" ).append( '<option  data-xyz = "'+get_data_row[i]+'" value="'+get_data_row[i + 1]+'" at="0"></option>' );
                    i +=1;
                }
            }).done(function(e)
            {
                $('#AddNew').focus();
                var val = ($('#AddNew').val());
                $('#AddNew').blur(function()
                {
                    //alert("done inside");
                    var val = ($('#AddNew').val()); // us ka text
                    val = $.trim(val);
                    // alert(val)
                    var xyz = $('#productName option').filter(function() {
                        return this.value == val;

                    }).data('xyz');
                    //alert(xyz)
                    /* if value doesn't match an option, xyz will be undefined*/
                    var valID = xyz ? '' + xyz : 'Undefined';
                    //alert(valID)
                    if (valID == 'Undefined' && val != "Not Defined")
                    {
                        if(confirm("Are you sure you want to add this? "+ val)){
                            //alert("undefinedsss")


                            // add new value in database
                            var go_path = "atuocompleteDB.php?action=Addlist&vars=2&var1="+id+"&var2="+val;
                            console.log(go_path);
                            $.get(go_path,
                                {
                                }, function(data)
                                {

                                    // After addition a new  value

                                }).done(function()
                                {


                                    getClientList(val);
                                    //setTimeout(function(){
                                    //    var xyz = $('#productName option').filter(function() {
                                    //        return this.value == val;
                                    //
                                    //    }).data('xyz');
                                    //    //abc();
                                    //    alert("xyz: "+xyz)
                                    //    /* if value doesn't match an option, xyz will be undefined*/
                                    //    var valID = xyz ? '' + xyz : 'Undefined';
                                    //    alert("valID: "+valID);
                                    //    if(valID != 'Undefined')
                                    //    {
                                    //        $(".EditableCurr").attr('val', valID)
                                    //    }
                                    //
                                    //
                                    //    // alert("New Value Added\nPlease select this field again")
                                    //    $(".EditableCurr").show();
                                    //    $(".EditableCurr").html(val) // ye change karta hai bt attr('val') ko update nahe karta
                                    //    $("#AddNew").remove();
                                    //    $(".EditableCurr").removeClass("EditableCurr");
                                    //},5000);



                                    $(".EditableCurr").addClass("Update");

                                });
                        }
                        else{
                            $(".EditableCurr").show();
                            $("#AddNew").remove();
                            $(".EditableCurr").removeClass("EditableCurr");

                            return false;
                        }


                    }
                    else
                    {
                        //alert("match")
                        $(".EditableCurr").show();

                        $(".EditableCurr").html(val)

                        if(valID != "Undefined" && $(".EditableCurr").attr("val") != valID)
                            $(".EditableCurr").attr("val",valID)

                        $("#AddNew").remove();
                        if(valID != "Undefined" && $(".EditableCurr").hasClass("Responsible"))
                            $(".EditableCurr").addClass("Update")

                        $(".EditableCurr").removeClass("EditableCurr");
                    }

                });
            });

    });
    $('#showProjectList').focus(function(e){
        $( "#showProjectList" ).append( '<option  data-xyz = "'+122+'" value="'+22+'" at="0"></option>' );

    });
}

function projectList(){

    var go_path = "atuocompleteDB.php?action=ProjectList&vars=0"; //33 is omer bahi id
    $.get(go_path,
        {
        }, function(data)
        {
            console.log("data data>>>>",data);
            $("#projectNames1").html(data);  // project name from project table


        });

}
function ProjectListContinueStartPause()
{
    var go_path = "atuocompleteDB.php?action=ProjectListContinueStartPause&vars=0"; //33 is omer bahi id
    $.get(go_path,
        {
        }, function(data)
        {



            //console.log("data data>>>>",data);
            //$(".ProjectName").html(data);  // project name from project table
            //$("#tbSwitchPerson").find('.ProjectName').html(get_data[1]); // hide for allowEmpProj list also
            //data = $.trim(data);
            //var array = {};
            //
            //var get_data_row  = data.split(':=');
            //for(var i = 1; i < get_data_row.length ; i++ )
            //{
            //    array[get_data_row[i]] = get_data_row[i + 1];
            //    //$( "#productName").clear();
            //    //$( "#projectName" ).append( '<option  data-xyz = "'+get_data_row[i]+'" value="'+get_data_row[i + 1]+'" at="0"></option>' );
            //
            //    i +=1;
            //}
            $( ".projectName" ).html(data);
            //$("#projectName")
            $(".dmProjName").attr("name","id")
        });
}
function getPhase()
{
    //phase = $("#sr_proj_phase-srpp_pk-srpp_name").attr('val');
    var phase = 1; // ye one he hoga kyew k Data Consistenscies is qaual for all Phases
    return phase;
}

function AddRowDataConsisten(Rows)
{
    //alert(" AddRowDataConsisten(Rows)")
    id = $("#projects-PK-Name").attr('val');
    phase =  getPhase();
    leader = $("#Leader").html();

    leaderVal  = $("#sr_projleader-srpl_pk-srpl_name").attr('val');
    //alert("$(this).prev(table).('id'): "+$(this).attr('id'));

    var html = '<tr class="tr_DC"><td class="Comments DC_Comments New" id="comments_'+id+'_'+phase+'_'+Rows+'" contenteditable="true">New Comments</td>';
    html += '<td val='+leaderVal+'>'+leader+'</td>'
    html += '<td width="30px" class="tdClick"><img val="1" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\TickStatus.jpg" style="display: none;"></td>'
    html += '<td width="30px" class="tdClick"><img val="2" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\SolidGreeen.jpg" style="display: none;"></td>'
    html += '<td width="30px" class="tdClick"><img val="3" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\SolidOrange.jpg" style="display: none;"></td>'
    html +='<td width="30px" class="tdClick"><img val="4" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\SolidRed.jpg" style="display: none;"></td>';

    $.when(AddHtml("TabBdyDataConsisten", html)).then
    (
        Ownchangeable()
    ).then
    (
        StatusChangeOnRuntime()
    ).then 
	(
		CommentsFocusUpdate()
	);

}



function UpdateRowDataConsisten()
{
    //alert("UpdateRowDataConsisten")
    // For Update
    var Comments = ""
    var Status = ""
    var Responsible = ""
    var ComKey = [];
    var StatKey = [];
    var ResKey = [];
    var DelRow = ""
    var DelKey = [];
    $('.Update').each(function(index, obj){

        var tmp = $(this).html()
        tmp = tmp.replace(/(^<br>|<br>$)/g,"");
        tmp = tmp.replace(/<\/?[^>]+(>|$)/g, "");
        $(this).html(tmp)
        //alert($(this).attr('class'))
        if( ($(this).hasClass( "DC_Comments" )) && ($.trim($(this).html()) == "" ))
        {
            $(this).removeClass('Update')
            idArr = ($(this).attr('id')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            DelKey.push(key);
            console.log("Delete Key: "+key);
        }
        else if($(this).hasClass( "DC_Comments" ))
        {
			 $(this).removeClass('Update')
            //you can use this to access the current item
            //alert("$(this).attr('id'): "+$(this).attr('id'))
            //alert("index: "+index)
            //alert("obj: "+obj.html())
            // move up//idArr = ($(this).attr('id')).split('_');
            value = $(this).html();
            idArr = ($(this).attr('id')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            ComKey.push(key);
            Comments +=  "WHEN DC_ProjIDPhaseSNO = "+key+" THEN '"+value+"' ";
        }
        else if($(this).hasClass( "DC_Status" ))
        {
            //alert(this.tagName);

            $(this).removeClass('Update')
            idArr = ($(this).attr('at')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            StatKey.push(key);
            var val = $(this).attr('val');
            Status +=  "WHEN DC_ProjIDPhaseSNO = "+key+" THEN '"+val+"' ";

        }
        else if($(this).hasClass( "Responsible" ))
        {
            value = $(this).attr('val');
            idArr = ($(this).attr('at')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            ResKey.push(key);
            Responsible +=  "WHEN DC_ProjIDPhaseSNO = "+key+" THEN '"+value+"' ";
        }

    });
    //Comments Row Delete
    if(DelKey.length > 0)
    {
        DelRow += "("
        for (var i = 0;  i< DelKey.length; i++)
        {
            DelRow += DelKey[i]+",";
        }
        DelRow = DelRow.substring(0, DelRow.length - 1);
        DelRow += ")"
        DelRow += "<-->DC_ProjIDPhaseSNO<-->sr_dataconsist"
        console.log("DelRow: "+DelRow);
        //$('body').addClass("")
        var go_path = "atuocompleteDB.php?action=deleteRow&vars=1&var1="+DelRow; //33 is omer bahi id
        console.log("go_path: "+go_path)
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("DelRow data: "+data)
            }).done(function()
            {
                console.log("UpdateRowDataConsisten DelRow Done")

            });
    }
    else
        console.log("No DC Delete Query");


    // For Comments
    if(ComKey.length > 0)
    {

        // Comments Update
        Comments += " ELSE DC_ProjIDPhaseSNO END WHERE DC_ProjIDPhaseSNO IN "
        Comments += "("
        for (var i = 0;  i< ComKey.length; i++)
        {
            Comments += ComKey[i]+",";
        }
        Comments = Comments.substring(0, Comments.length - 1);
        Comments += ");"
        Comments += "<-->Comments"

        var go_path = "atuocompleteDB.php?action=UpdateRowDataConsisten&vars=1&var1="+Comments; //33 is omer bahi id

        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowDataConsisten Comments")
                //console.log(data);
            }).done(function()
            {
                console.log("UpdateRowDataConsisten Comments Done")

            });;
    }
    else
        console.log("No Comments Update Query");

    // For Status
    if(StatKey.length > 0)
    {
        //for  Status
        Status += " ELSE DC_ProjIDPhaseSNO END WHERE DC_ProjIDPhaseSNO IN "
        Status += "("
        for (var i = 0;  i< StatKey.length; i++)
        {
            Status += StatKey[i]+",";
        }
        Status = Status.substring(0, Status.length - 1);
        Status += ");"
        Status += "<-->Status"
        var go_path = "atuocompleteDB.php?action=UpdateRowDataConsisten&vars=1&var1="+Status; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowDataConsisten Status")
                //console.log(data);
            }).done(function()
            {
                console.log("UpdateRowDataConsisten Status Done")

            });
    }
    else
        console.log("No Status Update Query");


    // For Responsible
    if(ResKey.length > 0)
    {
        //for  Responsible
        Responsible += " ELSE DC_ProjIDPhaseSNO END WHERE DC_ProjIDPhaseSNO IN "
        Responsible += "("
        for (var i = 0;  i< ResKey.length; i++)
        {
            Responsible += ResKey[i]+",";
        }
        Responsible = Responsible.substring(0, Responsible.length - 1);
        Responsible += ");"
        Responsible += "<-->Responsible"

        var go_path = "atuocompleteDB.php?action=UpdateRowDataConsisten&vars=1&var1="+Responsible; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowDataConsisten Responsible")
                console.log(data);
            }).done(function()
            {
                console.log("UpdateRowDataConsisten Responsible Done")
            });
    }
    else
        console.log("No Responsible Update Query");
    //Now for insert new Vlaues
    var newDataRow = ""
    id = $("#projects-PK-Name").attr('val');
    phase =  getPhase();
    leader = $("#sr_projleader-srpl_pk-srpl_name").attr('val');
    if(leader == "" )
        leader = 1;
    var imgValue = [];
	
    $('.New').each(function(index, obj){
        var imgVal = 0;
        $(this).parent().children('.tdClick').each(function(indx,obj){
            console.log('child object',$(this).children('img').is(":hidden"));
            console.log('child object',obj);
            if(!$(this).children('img').is(":hidden")){
                imgVal =$(this).children('img').attr('val');
            }
        });
        $(this).removeClass("New");//new added for test
        if($(this).hasClass( "DC_Comments" ))
        {
			if($.trim($(this).html()) != "")
			{
				 $(this).removeClass("New");
				leader = $(this).closest('td').next().find('label').attr('val');
				idArr = ($(this).attr('id')).split('_');
				value = $(this).html();
				newDataRow += "("+idArr[1]+","+
				idArr[2]+","+
				idArr[3]+","+
				idArr[1]+""+idArr[2]+""+idArr[3]+",'"+
				value+"',"+
				leader+","+ imgVal +"),";
			}	
			
        }
    });

    if(newDataRow != "")
    {
        var go_path = "atuocompleteDB.php?action=NewRowDataConsisten&vars=1&var1="+newDataRow; //33 is omer bahi id
		console.log("=-=-=-=-==-=-");
        console.log(go_path);
		
		console.log("=-=-=-=-==-=-");
		
        $.get(go_path,
            {
            }, function(data)
            {
				console.log("NewRowDataConsisten: data > "+data)
                console.log("UpdateRowDataConsisten newDataRow")
            }).done(function()
            {
                console.log("UpdateRowDataConsisten done newDataRow")

            });;
    }




//http://dba.stackexchange.com/questions/15696/update-many-rows-in-a-table-with-a-single-statement
//	UPDATE sr_client t
//   SET src_name = CASE WHEN src_pk = 7 THEN '4444'
//                    WHEN src_pk= 4 THEN '7777'
//
//                    ELSE src_name
//                END
// WHERE src_pk IN (4,7);
}
function AddRowReCommdPrced(Rows)
{

    ////alert(" AddRowDataConsisten(Rows)")
    //id = $("#projects-PK-Name").attr('val');
    //phase =  getPhase();
    //leader = $("#Leader").html();
    //
    //leaderVal  = $("#sr_projleader-srpl_pk-srpl_name").attr('val');
    ////alert("$(this).prev(table).('id'): "+$(this).attr('id'));
    //
    //var html = '<tr class="tr_DC"><td class="DC_Comments New" id="comments_'+id+'_'+phase+'_'+Rows+'" contenteditable="true">New Comments</td>';
    //html += '<td val='+leaderVal+'>'+leader+'</td>'
    //html += '<td width="30px" class="tdClick"><img val="1" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\TickStatus.jpg" style="display: none;"></td>'
    //html += '<td width="30px" class="tdClick"><img val="2" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\SolidGreeen.jpg" style="display: none;"></td>'
    //html += '<td width="30px" class="tdClick"><img val="3" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\SolidOrange.jpg" style="display: none;"></td>'
    //html +='<td width="30px" class="tdClick"><img val="4" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\SolidRed.jpg" style="display: none;"></td>';
    //
    //$.when(AddHtml("TabBdyDataConsisten", html)).then
    //(
    //    Ownchangeable()
    //).then
    //(
    //    StatusChangeOnRuntime()
    //);

    id = $("#projects-PK-Name").attr('val');
    phase =  getPhase();
    leader = $("#Leader").html();
    leaderVal  = $("#sr_projleader-srpl_pk-srpl_name").attr('val');

    var html = '<tr class="tr_RC">';
    //Comments
    html +='<td class="Comments RP_Comments New" id="comments_'+id+'_'+phase+'_'+Rows+'"" contenteditable="true" >Edit this text</td>';
    //Date
    html += '<td><label before="0000-00-00" value="0000-00-00" class="Date RP_Date" at="Date_'+id+'_'+phase+'_'+Rows+'">0000-00-00</label></td>';
//<label before="0000-00-00" value="0000-00-00" class="Date RP_Date" at="Date_27_1_1">0000-00-00</label>
    // Responsible
    html += '<td val='+leaderVal+'>'+leader+'</td>'
    //html += '<td val="1" class="Ownchangeable RP_Responsible" id="Responsible_'+id+'_'+phase+'_'+Rows+'"">KIM</td>';
    //Status
    html += '<td width="30px" class="tdClick"><img val="1" class="RP_Status" at="status_'+id+'_'+phase+'_'+Rows+'"" src="img\\TickStatus.jpg" style="display: none;"></td>';
    html += '<td width="30px" class="tdClick"><img val="2" class="RP_Status" at="status_'+id+'_'+phase+'_'+Rows+'"" src="img\\SolidGreeen.jpg" style="display: none;"></td>';
    html += '<td width="30px" class="tdClick"><img val="3" class="RP_Status" at="status_'+id+'_'+phase+'_'+Rows+'"" src="img\\SolidOrange.jpg" style="display: none;"></td>';
    html += '<td width="30px" class="tdClick"><img val="4" class="RP_Status" at="status_'+id+'_'+phase+'_'+Rows+'"" src="img\\SolidRed.jpg" style="display: none;"></td>';
    html += '</tr>';

    //$.when(AddHtml('TabReCommdPrced',html))
    //    .then(Ownchangeable())
    //    .then(StatusChangeOnRuntime())
    //    .then(dateBlur())
    //    .then(CalenderBlur());

    $.when($('#TabReCommdPrced tr:last').after(html))
        .then(Ownchangeable())
        .then(StatusChangeOnRuntime())
        .then(dateBlur())
        .then(CalenderBlur()
		).then
		(
			CommentsFocusUpdate()
		);
		

}
function UpdateRowReCommdPrced()
{
    console.log('updating');
    //alert("UpdateRowReCommdPrced")
    //	UPDATE sr_client t
//   SET src_name = CASE WHEN src_pk = 7 THEN '4444'
//                    WHEN src_pk= 4 THEN '7777'
//
//                    ELSE src_name
//                END
// WHERE src_pk IN (4,7);


    // For Update
    var Comments = ""
    var StatusRP = ""
    var ComKey = [];
    var StRPKey = [];
    var DateRP = ""
    var DateRPPKey = [];
    var ResponsibleRP ="";
    var ResRPKey = [];
    var DelRow = "";
    var DelKey = []
    $('.Update').each(function(index, obj){

        //alert($(this).attr('class'))
        var tmp = $(this).html()
        tmp = tmp.replace(/(^<br>|<br>$)/g,"");
        tmp = tmp.replace(/<\/?[^>]+(>|$)/g, "");
        $(this).html(tmp)
        if( ($(this).hasClass( "RP_Comments" )) && ($.trim($(this).html()) == "" ))
        {

            $(this).removeClass('Update')
            idArr = ($(this).attr('id')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            DelKey.push(key);
            console.log("Delete Key: "+key);
        }
        else if($(this).hasClass( "RP_Comments" ))
        {
            //you can use this to access the current item
            //alert("$(this).attr('id'): "+$(this).attr('id'))
            //alert("index: "+index)
            //alert("obj: "+obj.html())
            // move up//idArr = ($(this).attr('id')).split('_');
			 $(this).removeClass('Update')
            value = $(this).html();
            idArr = ($(this).attr('id')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            ComKey.push(key);
            Comments +=  "WHEN RP_ProjIDPhaseSNO = "+key+" THEN '"+value+"' ";
        }
        else if($(this).hasClass( "RP_Status" ))
        {
            //alert(this.tagName);

            $(this).removeClass('Update')
            idArr = ($(this).attr('at')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            StRPKey.push(key);
            var val = $(this).attr('val');
            StatusRP +=  "WHEN RP_ProjIDPhaseSNO = "+key+" THEN '"+val+"' ";

        }
        else if($(this).hasClass( "RP_Date" ))
        {
            //alert(this.tagName);

            $(this).removeClass('Update')
            idArr = ($(this).attr('at')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            DateRPPKey.push(key);
            var val = $(this).html();
            DateRP +=  "WHEN RP_ProjIDPhaseSNO = "+key+" THEN '"+val+"' ";

        }
        else if($(this).hasClass( "Responsible" ))
        {
            value = $(this).attr('val');
            idArr = ($(this).attr('at')).split('_');
            var key = idArr[1]+""+idArr[2]+""+idArr[3];
            ResRPKey.push(key);
            ResponsibleRP +=  "WHEN RP_ProjIDPhaseSNO = "+key+" THEN '"+value+"' ";
            $(this).removeClass("Update");
        }
        else{}

    });



//Comments Row Delete
    if(DelKey.length > 0)
    {
        DelRow += "("
        for (var i = 0;  i< DelKey.length; i++)
        {
            DelRow += DelKey[i]+",";
        }
        DelRow = DelRow.substring(0, DelRow.length - 1);
        DelRow += ")"
        DelRow += "<-->RP_ProjIDPhaseSNO<-->sr_recomprocd"
        console.log("DelRow: "+DelRow)
        var go_path = "atuocompleteDB.php?action=deleteRow&vars=1&var1="+DelRow; //33 is omer bahi id
        console.log("go_path: "+go_path)
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("DelRow data: "+data)
            }).done(function()
            {
                console.log("UpdateRowReCommdPrced DelRow Done")

            });
    }
    else
        console.log("No DC Delete Query");

    // For Comments
    if(ComKey.length > 0)
    {
        Comments += " ELSE RP_Comments END WHERE RP_ProjIDPhaseSNO IN "
        Comments += "("
        for (var i = 0;  i< ComKey.length; i++)
        {
            Comments += ComKey[i]+",";
        }
        Comments = Comments.substring(0, Comments.length - 1);
        Comments += ");"
        Comments += "<-->Comments"





        var go_path = "atuocompleteDB.php?action=UpdateRowReCommdPrced&vars=1&var1="+Comments; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowReCommdPrced Comments")
                //console.log(data);
            }).done(function(){
                console.log("UpdateRowReCommdPrced done Comments")
            });
    }
    else
        console.log("No Comments Update Query");

    // For Status
    if(StRPKey.length > 0)
    {

        //for  Status
        StatusRP += " ELSE RP_Status END WHERE RP_ProjIDPhaseSNO IN "
        StatusRP += "("
        for (var i = 0;  i< StRPKey.length; i++)
        {
            StatusRP += StRPKey[i]+",";
        }
        StatusRP = StatusRP.substring(0, StatusRP.length - 1);
        StatusRP += ");"
        StatusRP += "<-->Status"

        var go_path = "atuocompleteDB.php?action=UpdateRowReCommdPrced&vars=1&var1="+StatusRP; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowReCommdPrced  StatusRP")
                //console.log(data);
            }).done(function()
            {
                console.log("UpdateRowReCommdPrced done  StatusRP")

            });
    }

    // For Date
    if(DateRPPKey.length > 0)
    {

        //for  Status
        DateRP += " ELSE RP_Date END WHERE RP_ProjIDPhaseSNO IN "
        DateRP += "("
        for (var i = 0;  i< DateRPPKey.length; i++)
        {
            DateRP += DateRPPKey[i]+",";
        }
        DateRP = DateRP.substring(0, DateRP.length - 1);
        DateRP += ");"
        DateRP += "<-->Date"

        var go_path = "atuocompleteDB.php?action=UpdateRowReCommdPrced&vars=1&var1="+DateRP; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowReCommdPrced  StatusRP")
                //console.log(data);
            }).done(function()
            {
                console.log("UpdateRowReCommdPrced done  StatusRP")

            });
    }

    if(ResRPKey.length > 0)
    {

        //for  Status
        ResponsibleRP += " ELSE RP_Responsible END WHERE RP_ProjIDPhaseSNO IN "
        ResponsibleRP += "("
        for (var i = 0;  i< ResRPKey.length; i++)
        {
            ResponsibleRP += ResRPKey[i]+",";
        }
        ResponsibleRP = ResponsibleRP.substring(0, ResponsibleRP.length - 1);
        ResponsibleRP += ");"
        ResponsibleRP += "<-->Responsible"

        var go_path = "atuocompleteDB.php?action=UpdateRowReCommdPrced&vars=1&var1="+ResponsibleRP; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowReCommdPrced  ResponsibleRP")
                console.log(data);
            }).done(function()
            {
                console.log("UpdateRowReCommdPrced done  ResponsibleRP")

            });
    }



    //Now for insert new Vlaues
    var newDataRow = "";
    id = $("#projects-PK-Name").attr('val');
    phase =  getPhase();



    //$('.tr_DC').children()
    $('.New').each(function(index, obj){
        var imgVal = 0;
        $(this).parent().children('.tdClick').each(function(indx,obj){
            // console.log('child object',$(this).children('img').attr('val'));
            console.log('child object',$(this).children('img').is(":hidden"));
            console.log('child object',obj);
            if(!$(this).children('img').is(":hidden")){
                imgVal =$(this).children('img').attr('val');
            }
        });
        $(this).removeClass("New"); //new added for test
        console.log('find child',$('.tr_DC').children());
        if($(this).hasClass( "RP_Comments" ))
        {

			if($.trim($(this).html()) != "")
			{
				$(this).removeClass("New");
				idArr = ($(this).attr('id')).split('_');
				value = $(this).html();
	
				// get Date Responsible 'Val' and Status Also from This. parent
				var par = $(this).parent().get( 0 ) // return tr of this td to get all td
	
				var tdDate  = $(par).children().children('.Date').html();
				var  leader = $(par).children().children('.Leader').attr('val');
				newDataRow += "("+idArr[1]+","+
				idArr[2]+","+
				idArr[3]+","+
				idArr[1]+""+idArr[2]+""+idArr[3]+",'"+
				value+"','"+
				tdDate+"',"+
            leader+","+ imgVal+"),";
			}
            

        }

    });

    //INSERT INTO sr_dataconsist(`DC_ProjID`, `DC_Phase`, `DC_ComSNO`, `DC_ProjIDPhase`, `DC_Comments`, `DC_Responsible`, `DC_Status`) VALUES (1,1,2,112,'2nd Comments',1,2), (1,1,3,113,'3nd Comments',1,2)
    if(newDataRow != "")
    {
        var go_path = "atuocompleteDB.php?action=NewRowReCommdPrced&vars=1&var1="+newDataRow; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {
                console.log("UpdateRowReCommdPrced newDataRow")
                console.log(data);

            }).done(function()
            {
                console.log("UpdateRowReCommdPrced done newDataRow")

            });
    }
}
function UpdateRowMileStones()
{
    var weightage = ""
    var WedKey = [];
    var weightageDone = ""
    var WedDKey = [];
    var shtCmt = ""
    var SCmtKey = [];
    var StatusMS = ""
    var StatMSKey = [];
    var DateMSPlan =""
    var DateMSPlanKey =   [];
    var DateMSActual =""
    var DateMSActualKey =   [];

    $('.Update').each(function(index, obj){

        var tmp = $(this).html()
        tmp = tmp.replace(/(^<br>|<br>$)/g,"");
        tmp = tmp.replace(/<\/?[^>]+(>|$)/g, "");
        $(this).html(tmp)

        if($(this).hasClass( "MS_weightage" ))
        {
            value = $(this).html();
            var key = $(this).attr('at')
            WedKey.push(key);
            weightage +=  "WHEN MS_ProjIDMslID = "+key+" THEN '"+value+"' ";
            $(this).removeClass("Update")
        }
        if($(this).hasClass( "MS_weightageDone" ))
        {
            value = $(this).html();
            var key = $(this).attr('at')
            WedDKey.push(key);
            weightageDone +=  "WHEN MS_ProjIDMslID = "+key+" THEN '"+value+"' ";
            $(this).removeClass("Update")
        }

        else if($(this).hasClass( "MS_ShtComments" ))
        {
            value = $(this).html();
            var key = $(this).attr('at')
            SCmtKey.push(key);
            shtCmt +=  "WHEN MS_ProjIDMslID = "+key+" THEN '"+value+"' ";
            console.log("key: "+key)
            //$(this).removeClass("Update")
        }
        else if($(this).hasClass( "MS_Status" ))
        {
            //alert(this.tagName);

            $(this).removeClass('Update')
            idArr = ($(this).attr('at')).split('_');
            var key = idArr[3];
            StatMSKey.push(key);
            var val = $(this).attr('val');
            StatusMS +=  "WHEN MS_ProjIDMslID = "+key+" THEN '"+val+"' ";

        }
        else if($(this).hasClass( "MS_Plan" ))
        {
            $(this).removeClass('Update')
            idArr = ($(this).attr('at')).split('_');
            var key =idArr[3];
            DateMSPlanKey.push(key);
            var val = $(this).html();
            DateMSPlan +=  "WHEN MS_ProjIDMslID = "+key+" THEN '"+val+"' ";

        }
        else if($(this).hasClass( "MS_Actual" ))
        {
            $(this).removeClass('Update')
            idArr = ($(this).attr('at')).split('_');
            var key = idArr[3];
            DateMSActualKey.push(key);
            var val = $(this).html();
            DateMSActual +=  "WHEN MS_ProjIDMslID = "+key+" THEN '"+val+"' ";

        }
        else
        {}




    });


    if(WedKey.length > 0)
    {
        weightage += " ELSE MS_weightage END WHERE MS_ProjIDMslID IN "
        weightage += "("
        for (var i = 0;  i< WedKey.length; i++)
        {
            weightage += WedKey[i]+",";
        }
        weightage = weightage.substring(0, weightage.length - 1);
        weightage += ");"
        weightage += "<-->weightage"

        var go_path = "atuocompleteDB.php?action=UpdateRowMileStones&vars=1&var1="+weightage; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                //console.log(data);
            }).done(function()
            {
                console.log("UpdateRowMileStones done  weightage")

            });
    }
    if(WedDKey.length > 0)
    {
        weightageDone += " ELSE MS_weightageDone END WHERE MS_ProjIDMslID IN "
        weightageDone += "("
        for (var i = 0;  i< WedDKey.length; i++)
        {
            weightageDone += WedDKey[i]+",";
        }
        weightageDone = weightageDone.substring(0, weightageDone.length - 1);
        weightageDone += ");"
        weightageDone += "<-->weightageDone"

        var go_path = "atuocompleteDB.php?action=UpdateRowMileStones&vars=1&var1="+weightageDone; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                console.log(data);
            }).done(function()
            {
                console.log("UpdateRowMileStones done  weightageDone")

            });
    }
    console.log(SCmtKey)
    if(SCmtKey.length > 0)
    {
        shtCmt += " ELSE MS_ShotComments END WHERE MS_ProjIDMslID IN "
        shtCmt += "("
        for (var i = 0;  i< SCmtKey.length; i++)
        {
            shtCmt += SCmtKey[i]+",";
        }
        shtCmt = shtCmt.substring(0, shtCmt.length - 1);
        shtCmt += ");"
        shtCmt += "<-->ShotComments"

        var go_path = "atuocompleteDB.php?action=UpdateRowMileStones&vars=1&var1="+shtCmt; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                console.log(data);
            }).done(function()
            {
                console.log("UpdateRowMileStones done  shtCmt")

            });
    }
    if(StatMSKey.length > 0)
    {
        StatusMS += " ELSE MS_Status END WHERE MS_ProjIDMslID IN "
        StatusMS += "("
        for (var i = 0;  i< StatMSKey.length; i++)
        {
            StatusMS += StatMSKey[i]+",";
        }
        StatusMS = StatusMS.substring(0, StatusMS.length - 1);
        StatusMS += ");"
        StatusMS += "<-->Status"

        var go_path = "atuocompleteDB.php?action=UpdateRowMileStones&vars=1&var1="+StatusMS; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                //console.log(data);
            }).done(function()
            {
                console.log("UpdateRowMileStones done  StatusMS")

            });
    }

    if(DateMSPlanKey.length > 0)
    {
        DateMSPlan += " ELSE MS_Plan END WHERE MS_ProjIDMslID IN "
        DateMSPlan += "("
        for (var i = 0;  i< DateMSPlanKey.length; i++)
        {
            DateMSPlan += DateMSPlanKey[i]+",";
        }
        DateMSPlan = DateMSPlan.substring(0, DateMSPlan.length - 1);
        DateMSPlan += ");"
        DateMSPlan += "<-->PLan"

        var go_path = "atuocompleteDB.php?action=UpdateRowMileStones&vars=1&var1="+DateMSPlan; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                console.log(data);
            }).done(function()
            {
                console.log("UpdateRowMileStones done  DateMSPlan")

            });
    }
    if(DateMSActualKey.length > 0)
    {
        DateMSActual += " ELSE MS_Actual END WHERE MS_ProjIDMslID IN "
        DateMSActual += "("
        for (var i = 0;  i< DateMSActualKey.length; i++)
        {
            DateMSActual += DateMSActualKey[i]+",";
        }
        DateMSActual = DateMSActual.substring(0, DateMSActual.length - 1);
        DateMSActual += ");"
        DateMSActual += "<-->Actual"

        var go_path = "atuocompleteDB.php?action=UpdateRowMileStones&vars=1&var1="+DateMSActual; //33 is omer bahi id
        console.log(go_path);
        $.get(go_path,
            {
            }, function(data)
            {

                //console.log(data);
            }).done(function()
            {
                console.log("UpdateRowMileStones done  DateMSActual")

            });
    }

 //   location.reload();
}
function WholePageUpdate()
{
    if($(".Red").length != 0)
    {
        //$("#WholeUpdateBtn").toggle();
        alert("Update Failed\nSome Validations are missing!");
        return false;
    }

    $.when(
        $("#WholeUpdateBtn").html("Waiting")

    ).then
    (
        UpdateProjdata()
    ).then(
        UpdateRowDataConsisten()
    ).then(
        UpdateRowReCommdPrced()
    ).then(
        UpdateRowMileStones()
    ).then
    (
        //alert("Update Success."),
        $("#WholeUpdateBtn").html("Update")

    );
}

function tdClick(target) // thisis for status updates
{
    //alert ($( target ).parent().get( 0 ).tagName); // tr


    var par = $( target ).parent().get( 0 );
    //http://stackoverflow.com/questions/3024391/how-do-i-iterate-through-child-elements-of-a-div-using-jquery
    $(par).children('td').each(function () {
        //alert(this.tagName); // "this" is the current element in the loop
        $(this).children('img').hide();
    });
    $(target).children('img').show();
    if($(target).children('img').hasClass("New") == false)
        $(target).children('img').addClass("Update")
}

function tdColor(target)
{
    $(target).removeClass("tdColor")

    //$(target).html('<input type="color" id="ColorSet" value="#fe0000" list="colorslist">');
    childInput = $(target).children('input')
    $(childInput).show();
    $(childInput).focus()
    $(childInput).blur(function()
    {
        var ColVal = ($(this).val())

        ColVal = ColVal.substring(1, ColVal.length)

        $(this).parent().removeAttr("class")
        if(ColVal == "33cc33")
        {
            $(this).parent().addClass("tdColor Green")
            if($(this).parent().attr('before') != "Green")
                $(this).parent().addClass("Update")
        }

        else
        {
            $(this).parent().addClass("tdColor "+ColVal)

            if($(this).parent().attr('before') != ColVal)
                $(this).parent().addClass("Update")
        }

        $(this).hide();
    });

}

function milestonechk(target)
{
    $(target).toggleClass("Update");

}


