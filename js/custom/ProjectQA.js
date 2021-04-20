/**
 * Created by Faizan Khan on 11/9/2016.
 */

var $jqueryLib = jQuery.noConflict();
if(window.location.href.indexOf("ProjectQA.php") > -1){
    if(+readCookie("permission_ProjectQuestionAnswer")){
        GetProjectNamesAll();
        ProjectQuestionAnswerAll();
    }else{
        alert("You don't have permission to view this page, you are redirecting to homepage, Please contact Administration.");
        window.location = "ModelerPage.php";
    }

}



$jqueryLib("#SubmitNewQuestion").click(function(){

    if($jqueryLib("#NewQuestion").val() <= 0){
        alert("Validation Error - Question must be enter!");
        return;
    }

    var data = {
        "action" : "SaveProjectNewQuestion",
        "ProjectId" : $jqueryLib("#QuestionProjectId option:selected").val(),
        "ProjectQuestion" : $jqueryLib("#NewQuestion").val(),
        "QuestionById": readCookie("userID")
    };

    $jqueryLib.ajax({
        url : "Employee_Switch_Person.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {
            console.log(data);
            ProjectQuestionAnswerAll();
            $jqueryLib("#NewQuestion").val("");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });

});


function ProjectQuestionAnswerAll(){

    var go_path = "Employee_Switch_Person.php?action=ProjectQuestionAnswerAll&vars=0";
    $jqueryLib.get(go_path,
        {
        }, function(data)
        {
            var html = "<table class='sortable table table-hover' border='1'><thead><tr>";
            html = html + "<th>Project Name</th>";
            html = html + "<th>Asked by</th>";
            html = html + "<th>Ask Date</th>";
            html = html + "<th>Question</th>";

            html = html + "<th>Answer</th>";
            html = html + "<th>Ans Date</th>" +
                          "<th>Deactive</th>" +
                          "<th>Editable</th>" +
                          "</thead><tbody>";
            var output = JSON.parse(data);

            for(var i = 0; i < output.length; i++){
                html += "<tr><td>" + output[i].Name + "</td>";
                html += "<td>" + output[i].AskedBy + "</td>";
                html += "<td>" + output[i].AskDateTime + "</td>";
                html += "<td id='projectQAQuestion_"+ output[i].ProjectQAId + "'>" + output[i].ProjectQuestion + "</td>";
                html += "<td>" + output[i].ProjectAnswer + "</td>";
                html += "<td>" + output[i].AnswerDateTime + "</td>";


                //deactive buttons logic
                if(output[i].Active == 0){
                    console.log("its not active");
                    html += "<td>Deactivate</td>";
                }
                else if("string" == typeof output[i].AnswerDateTime){// && output[i].Active == 1
                    console.log("its answered but not deactivated");
                    console.log("its Answered"+typeof output[i].AnswerDateTime);
                    var id = output[i].ProjectQAId;
                    if(readCookie("userID") == output[i].QuestionBy){
                        html += "<td><input type='button' value='Deactive it' class='btn-primary' onclick='ProjectQAAnswerDeactive("+ id + ")'/></td>";
                    }
                    else{
                        html += "<td>Deactive it</td>";
                    }
                }
                else {
                    console.log("answered and deactive");
                    var id = output[i].ProjectQAId;
                    //html += "<td><input type='button' value='' class='disabled' disabled id='ProjectQAId_" + id + "'/></td>";
                    html += "<td>Active</td>";
                }

                if(output[i].isEditable == 1){
                    if(readCookie("userID") == output[i].QuestionBy){
                    var id = output[i].ProjectQAId;
                        html += "<td><input type='button' value='Edit' class='btn-primary' id='projectQAQuestionBtn_" +id + "' onclick='ProjectQAQuestionUpdate("+ id + ")'/></td>";
                    }
                    else{
                        html += "<td>Editable</td>";
                    }
                }
                else{
                    html += "<td>No</td>";
                }


                html += "</tr>";
            }
            html += "</tbody></table>";

            $jqueryLib("#ProjectQuestionAnswerDataDisplay").html(html);
            load_js();
        });
}

function ProjectQAQuestionUpdate(projectQAId){
    //check the button name so that it decide that either update text or allow to update text(make it editable)

    if($jqueryLib("#projectQAQuestionBtn_" +projectQAId).attr('value') =='Edit'){//make editable text

    var projectQAEditableQuestionCssId =  "#projectQAQuestion_" + projectQAId;
    var questionText = $jqueryLib("#projectQAQuestion_" + projectQAId).text();

    var html = "<input  type='text' value='nothing'";
    $jqueryLib(projectQAEditableQuestionCssId).html("<textarea class='bg-primary' id='projectQAQuestionEdit_"+projectQAId+"'>"+questionText+"</textarea>");

    //changing button text
    $jqueryLib("#projectQAQuestionBtn_" +projectQAId).attr('value','Save Edits')
    }
    else  if($jqueryLib("#projectQAQuestionBtn_" +projectQAId).attr('value') =='Save Edits'){ //edit the text
        //if(confirm("You will not be able to edit it again until util production manager allow you again!")){

            console.log($jqueryLib("#projectQAQuestionBtn_" +projectQAId).attr('value'))
            ProjectQAQuestionUpdateEditSave(projectQAId);
        //}


    }
}

//Question Edit save
function ProjectQAQuestionUpdateEditSave(projectQAId){

    var projectQAAnswercssId = "projectQAQuestionEdit_" + projectQAId;
    var ProjectQuestionUpdate = $jqueryLib("#" + projectQAAnswercssId).val();

    var data = {
        "action" : "ProjectQAQuestionUpdateEditSave",
        "ProjectQAId" : projectQAId,
        "ProjectQuestionUpdate" : ProjectQuestionUpdate
    };

    $jqueryLib.ajax({
        url : "Employee_Switch_Person.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {
            console.log(data);
            ProjectQuestionAnswerAll();
            if(typeof ProjectQuestionAnswerByCurrentUser == 'function'){
                ProjectQuestionAnswerByCurrentUser();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error occur ", errorThrown);
        }
    });
}

//De-active specific Question
function ProjectQAAnswerDeactive(projectQAId){

    var data = {
        "action" : "ProjectQAAnswerDeactive",
        "ProjectQAId" : projectQAId,
        "active" : 0
    };

    $jqueryLib.ajax({
        url : "Employee_Switch_Person.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {
            console.log(data);
            ProjectQuestionAnswerAll();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error occur ", errorThrown);
        }
    });

}

//Get All projects names and bind it with the dropdown control
function GetProjectNamesAll(){
    var go_path = "Employee_Switch_Person.php?action=GetProjectNamesAll&vars=0";
    $jqueryLib.get(go_path,
        {
        }, function(data)
        {
            var output = JSON.parse(data);
            var html ="";
            for(var i = 0; i < output.length; i++){
                html += "<Option value=" + output[i].PK + ">" + output[i].Name + "</Option>";
            }
            $jqueryLib("#QuestionProjectId").html(html);
        });
}

//Get specific projects names by team lead and bind it with the dropdown control
function GetProjectNamesByTeamLead(){
    var go_path = "Employee_Switch_Person.php?action=GetProjectNamesByTeamLead&vars=0";
    $jqueryLib.get(go_path,
        {
        }, function(data)
        {
            var output = JSON.parse(data);
            var html ="";
            for(var i = 0; i < output.length; i++){
                html += "<Option value=" + output[i].PK + ">" + output[i].Name + "</Option>";
            }
            $jqueryLib("#QuestionProjectId").html(html);
        });
}


/*---------Utility Functions=Start---------*/

//This function will add sortable script reference in page after the html table has created.
function load_js()
{
    var head = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'js/sortableTableLib/sorttable.js';
    head.appendChild(script);
}

//provide cookie name to get its value
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/*---------Utility Functions=End---------*/




