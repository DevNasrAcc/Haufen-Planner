var clock, size, interval = null;
var $jq = jQuery.noConflict(true);
var voteQuestionTimeOut;
$jq(document).ready(function() {
    if(window.location.href.indexOf("projectCommentHistory.php") > -1){
        allAandFinishProjects(0);
    }
    else if(window.location.href.indexOf("script_detail") > -1) {
        var go_path = "Employee_Switch_Person.php?action=slidechange&vars=0";

        $jq.get(go_path,
            {
            }, function(data)
            {
                ////$jq("#chk").val(data);
                // $jq.getScript( "Slider/js/bjqs-1.3.min.js");
                $jq("#banner-slide").find('.bjqs').html(data);
                $jq.getScript('Slider/js/bjqs-1.3.min.js', function() {
                    $jq("#chk").val('Javascript is loaded successful! sayHello() function is loaded!');
                });
            });
    }
    else if(window.location.href.indexOf("vote_Form1") > -1){
        var go_path = "Employee_Switch_Person.php?action=vote_pollLastPK&vars=0";
        $jq.get(go_path,
            {
            }, function(data)
            {

                //alert (data);
                var highPK =  (parseInt(data)+1) ;
                //alert(highPK);
                var options =  $jq('#options').attr('class');
                var options_type =  $jq('#options_type').attr('class');
                //alert (options_type);

                var html = "";
                if(options_type == "radio")
                    for (var i=1;i<=parseInt(options);i++)
                    {
                        html += '<input  name="Names" type="radio" class= "VoteAns" id="VoteAns_'+highPK+'_'+i+'" value="Values"><label  id="VoteAns_'+highPK+'_'+i+'_lbl" contenteditable="true">Can change Contant</label><label id="VoteAnsOP_'+highPK+'_'+i+'"></label><br>';
                    }
                else
                if(options_type == "check")
                    for (var i=1;i<=parseInt(options);i++)
                    {
                        html += '<input  type="checkbox" class="VoteAns"  id="VoteAns_'+highPK+'_'+i+'"/><label contenteditable="true">Can change Contant</label><br>';
                    }

                $jq('#options_div').html(html);

                $jq('#Submit_Question').click(function ()
                {
                    $jq('input').attr('contenteditable', 'false');
                    Submit_Question();
                });
            });
    }
    else if(window.location.href.indexOf("ModelerPage") > -1){
        updateAlerts(true);
        //voting question generation check
        if(readCookie("userDesig") == 3 || readCookie("userDesig") == 4) {
            checkVotingQuestionTime();
            voteQuestion = setInterval(checkVotingQuestionTime, 60000);
        }

        getUserAssignWork();
        getProjectTaskNames();
        updateAlertsEmpProjectTaskChange();

        if(+readCookie("userID") == 33 && +readCookie("permission_ProjectQuestionAnswer")){
            ProjectQuestionAnswerByActive();
        }
        else if(+readCookie("permission_ProjectQuestionAnswer")){
            ProjectQuestionAnswerByCurrentUser();
        }else{
            $jq("#ProjectQuestionAnswerBottomPanel").hide();
        }

        setInterval(updateAlertsEmpProjectTaskChange, 300000);

        if(+readCookie("permission_GetSwitchRequest") && +readCookie("permission_EmpSwitchRequest")){
            getProjectModeChangeRequest();
            getProjectModeChangeRequestMadeList();
            ProjectListForProjectModeChange('ProjectNameModeChange');
            $jq.when(getPersonNameAndProjectName(), GetProject_ModeOptions(), GetProjectStatusOptions(), getPersonNameAndProjectNameWithRestriction())
                .then(getpermissions()).then(allUnFinishProject()).then( allAandFinishProjects()).then( votingQuestion()).then(whiteboardfnCalling());
            setTimeout( UnvoteEmployeeDetails, 5000);
            setInterval( UnvoteEmployeeDetails, 300000);
        }
        else if(+readCookie("permission_GetSwitchRequest")){
            getProjectModeChangeRequest();
            $jq.when(getPersonNameAndProjectName(), GetProject_ModeOptions(), GetProjectStatusOptions(), getPersonNameAndProjectNameWithRestriction())
                .then(getpermissions()).then(allUnFinishProject()).then( allAandFinishProjects()).then( votingQuestion()).then(whiteboardfnCalling());
        }

        else if (+readCookie("permission_EmpSwitchRequest")) {
            getProjectModeChangeRequestMadeList();
            ProjectListForProjectModeChange('ProjectNameModeChange');
            $jq.when(getPersonNameAndProjectName(),GetProject_ModeOptions(),  GetProjectStatusOptions(), getPersonNameAndProjectNameWithRestriction())
                .then(getpermissions()).then(allUnFinishProject()).then( allAandFinishProjects()).then( votingQuestion()).then(whiteboardfnCalling());
            setTimeout( UnvoteEmployeeDetails, 5000);
            setInterval( UnvoteEmployeeDetails, 300000);
        }
        else {
            $jq("#requestBottomPanel").hide();
            //$jq("#ProjectModeBottomPanel").hide();
            $jq.when(votingQuestion()).then(whiteboardfnCalling()).then(getpermissions());
        }


        $jq(function(){	// refresh white board again an again at every x second
            interval = setInterval(whiteboardfnCallingRepeatly, 20000);
        });

        $jq("#flipcountdownbox1").flipcountdown({
            size:"sm",
            am:true
        });
        getEmployeeCount();

        $jq('#Remove_extra_record').click(function () {
            Remove_extra_record();
        });

        $jq('.dateinput').on('changed',function () {
            alert("change");
            $jq('input.dateinput').val(this.value);
            $jq(".test .text-field").each(function() {
                alert($(this).val());
            });
        });
        $jq("#exportExcel").click(function(){
            $jq("#whiteboard_PreDate").table2excel({
                // exclude CSS class
                exclude: ".noExl",
                name: "The Location Lab"
            });
        });

        // when user select username return the current  project of that person
        $jq('.nameEmp').change(function (){
            var tabParID = $jq(this).closest('table').attr('id');
            $jq(".hightlight").removeClass("hightlight");
            $jq("#modeler"+$jq(this).val()).addClass('hightlight');
            $jq.when(empProjList(tabParID)).then($jq('.nameEmp').val($jq(this).val()));

        });
        $jq('#allEmployeeNames').click(function () {
            allEmployeeNames();
        });
        $jq('#AllowProj').click(function () {
            var values = $jq.map($jq("#tbChkAllowProj").find('.ProjectName').find('.dmProjName option'), function(e) { return e.text }); // get teh list of already assigned projects of that person in "verify the allow projects"
            if(values.length > 1)
                if (!confirm("Already Assigned\n\n"+values))
                {
                    return false;

                }
            var tabParID = $jq(this).closest('table').attr('id');
            var nameID = $jq("#"+tabParID).find(".nameEmp").val();   // 7
            var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
            var go_path = "Employee_Switch_Person.php?action=AllowProj&vars=2&var1="+nameID+"&var2="+projID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
            $jq.get(go_path,
                {
                }, function(data)
                {
                    if (data == "Already Assigned")
                        alert(data);
                    if ($jq("#AllowProj_Switch").is(':checked'))
                    {
                        switchWhenAllow(); //switch this person to allow project also
                    }
                    else
                    {
                        $jq.when(empProjList("tbSwitchPerson")).then($jq("#tbSwitchPerson").find('.ProjectName').find('.dmProjName').val(projID));
                        whiteboardfnCallingRepeatly();
                    }
                }
            );
        });
        $jq('#DenayProj').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            var nameID = $jq("#"+tabParID).find(".nameEmp").val();   // 7
            var projID =  $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
            var go_path = "Employee_Switch_Person.php?action=DenayProj&vars=2&var1="+nameID+"&var2="+projID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
            $jq.get(go_path,
                {
                }, function(data)
                {});

        });
        $jq('#SwitchRequest').click(function(){
            var tabParID = $jq(this).closest('table').attr('id');
            var nameID = $jq("#"+tabParID).find(".nameEmpToSwitch").val();   // 7
            var projID = $jq("#"+tabParID).find('.ProjectNameWhereToSwitch').find('.dmProjName').val();
            var projTaskID = $jq("#"+tabParID).find('.projectTaskList').find('.ProjTaskName').val();

            if(projID == 4 && projTaskID > 1){
                alert("You can't assign task while making a employee free request. Leave the task option or select it to None");
                //$jq(".projectTaskList").find(".ProjTaskName option:contains('None')").attr('selected','selected');
                return;
            }
            if(projID == 4){
                projTaskID = 1;
            }

            if(projTaskID ==0){
                alert("Please select project task also.");
                return;

            }
            if(nameID == "0" || projID == 0 || typeof nameID == 'undefined' || typeof projID == 'undefined')
            {
                alert ("Please Select the Person and Project First");
                return false;
            }
            if(confirm("Do You want to make a switch request for " + $jq("#"+tabParID).find(".nameEmpToSwitch option:selected").text() + " to "+  $jq("#"+tabParID).find('.ProjectNameWhereToSwitch').find('.dmProjName option:selected').text()))
            {
                // Request for ProjectMode change  if project is status is not Continue
                //getProjectStatusAndContinueRequest(projID);
                go_path = "Employee_Switch_Person.php?action=SwitchEmpRequestCompare&vars=2&var1=" + nameID + "&var2=" + projID;
                $jq.get(go_path,
                    {
                    }, function(data)
                    {
                        if(data == "")
                        {
                            var go_path = "Employee_Switch_Person.php?action=getEmpCurrentProjectName&vars=1&var1="+nameID;
                            $jq.get(go_path,{},function(data){
                                var go_path = "Employee_Switch_Person.php?action=SwitchEmpRequest&vars=4&var1="+nameID+"&var2="+projID+"&var3="+data+"&var4="+projTaskID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
                                $jq.get(go_path,
                                    {
                                    }, function(data)
                                    {
                                        updateAlerts();
                                    });
                            });
                        } else {
                            alert("This request has already been made");
                        }
                    }
                );
            }


        });
        $jq('#SwitchEmp').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            var nameID = $jq("#"+tabParID).find(".nameEmp").val();   // 7
            if(nameID == "0" )
            {
                alert ("Please Select the Person First");
                return false;
            }
            var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
            var taskID = $jq("#"+tabParID).find('.projectTaskList').find('.ProjTaskName ').val();

            go_path = "Employee_Switch_Person.php?action=getProjectTeamLeadId&vars=1&var1="+ projID;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    var dataResponse = JSON.parse(data);
                    switchEmployeeCall(nameID, projID, dataResponse[0].TeamLead, taskID);
                    new_whiteboardfn();
                });

        });
        $jq('#switchingEmp').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            fnswitchingEmp(tabParID);
        });
        $jq('#ProjectsPreDays').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            var dateRng = $jq("#"+tabParID).find(".date").val();
            var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
            if(projID == "0")
            {
                alert ("Please Select the Project First");
                return false;
            }
            var go_path = "Employee_Switch_Person.php?action=ProjectsPreDays&vars=2&var1="+projID+"&var2="+dateRng;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    var get_data_row = new Array();     // declare array
                    var get_data_row  = data.split('----//------');
                    htmls = "<table border=1>";
                    for(var i = 0; i<get_data_row.length; i++ )
                    {
                        htmls = htmls+"<tr>";
                        var get_data_col = new Array();
                        get_data_col  = get_data_row[i].split(',');
                        for(var j = 0; j<get_data_col.length ; j++)
                        {
                            htmls = htmls+"<td>";
                            htmls = htmls + get_data_col[j];
                        }
                        htmls = htmls+"</tr>";
                    }	htmls = htmls+"</td>";

                    htmls = htmls + "</table>";

                    $jq("#ProjectsPreviousDaysInfo").html(htmls);
                });
        });
        $jq('#Count_Emp_Per_Day_Project').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            var dateRng = $jq("#"+tabParID).find(".date").val();
            var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
            if(projID == "0")
            {
                alert ("Please Select the Project First");
                return false;
            }
            var go_path = "Employee_Switch_Person.php?action=Count_Emp_Per_Day_Project&vars=2&var1=" + projID + "&var2=" + dateRng;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    var get_data_row = new Array();     // declare array
                    var get_data_row  = data.split('----//------');
                    htmls = "<table border=1>";
                    for(var i = 0; i<get_data_row.length; i++ )
                    {
                        htmls = htmls+"<tr>";
                        var get_data_col = new Array();
                        get_data_col  = get_data_row[i].split(',');
                        for(var j = 0; j<get_data_col.length ; j++)
                        {
                            htmls = htmls+"<td>";

                            htmls = htmls + get_data_col[j];
                            htmls = htmls+"</td>";
                        }
                        htmls = htmls+"</tr>";
                    }
                    htmls = htmls + "</table>";
                    $jq("#ProjectsPreviousDaysInfo").html(htmls);
                });
        });
        $jq('#copyFirstHalfSwitchingValuesTo2ndHalf').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            alert("tabParID"+tabParID);
            copyFirstHalfSwitchingValuesTo2ndHalf(tabParID);

        });
        $jq('#All_copyFirstHalfSwitchingValuesTo2ndHalf').click(function (){
            var tabParID = $jq(this).closest('table').attr('id');
            All_copyFirstHalfSwitchingValuesTo2ndHalf(tabParID);
        });
        $jq('#AllmodelerProjects').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            AllmodelerProjects(tabParID);
        });
        $jq('#MonthlySheet').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            MonthlySheet(tabParID);
        });
        $jq('#MonthlyCompensationSheet').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            MonthlyCompensationSheet(tabParID);
        });
        $jq('#MonthlySheetWithEfforts').click(function () {
            //alert("Click");
            var tabParID = $jq(this).closest('table').attr('id');
            MonthlySheetWithEfforts(tabParID);

        });
        $jq('#TotalDaysAndTaskAssigned').click(function () {
            //alert("Click");
            var tabParID = $jq(this).closest('table').attr('id');
            TotalDaysAndTaskAssigned(tabParID);

        });
        $jq('#TotalDaysAndTaskAssignedSpecificEmp').click(function () {

            var tabParID = $jq(this).closest('table').attr('id');
            TotalDaysAndTaskAssignedSpecificEmp(tabParID);

        });


        $jq('#SinglePersonEfforts').click(function () {
            //alert("Click");
            var tabParID = $jq(this).closest('table').attr('id');
            SinglePersonEfforts(tabParID);

        });
        $jq('#AllmodelerFree').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            AllmodelerFree(tabParID);

        });
        $jq('#AllmodelerNotAvaiable').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            AllmodelerNotAvaiable(tabParID);

        });
        $jq('#AllmodelerNotAvaiableFilter').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            AllmodelerNotAvaiableFilter(tabParID);

        });
        $jq('#AllmodNotAvailDetail').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            AllmodNotAvailDetail(tabParID);

        });
        $jq('#MonthTotalContProj').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            MonthTotalContProj(tabParID);

        });
        $jq('#MonthTotalContProjDateDetail').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            MonthTotalContProjDateDetail(tabParID);
        });
        $jq('#memberTotalDaysOnProj').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            memberTotalDaysOnProj(tabParID);
        });
        $jq('#memberTotalDaysOnProjWithTask').click(function () {

            var tabParID = $jq(this).closest('table').attr('id');
            memberTotalDaysOnProjWithTask(tabParID);
        });

        $jq('#ProjectsDaysSummary').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            ProjectsDaysSummary(tabParID);

        });
        $jq('#ShowPermissions').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            var nameID =  $jq("#"+tabParID).find(".nameEmp").val();
            if(nameID == "0" )
            {
                alert ("Please Select the Person First");
                return false;
            }
            var go_path = "Employee_Switch_Person.php?action=permissionPage&vars=1&var1="+nameID;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    var get_data_row = new Array();     // declare array
                    var get_data_row  = data.split('----//------');

                    htmls = "<div class='col-lg-12'><table class='row'>";
                    for(var i = 0; i < get_data_row.length ; i++)
                    {
                        htmls = htmls + "<tr>";
                        if(i== 10)
                            htmls += "</tr><tr>";
                        var get_data_col = new Array();
                        get_data_col  = get_data_row[i].split(',');

                        for(var j = 0; j < get_data_col.length ; j++)
                        {

                            htmls = htmls+"<td class='col-lg-2'>";
                            htmls = htmls + get_data_col[j];
                            htmls = htmls+"</td>";
                        }
                        htmls = htmls+"</tr>";
                    }
                    htmls = htmls + "</table></div>";
                    $jq("#permissionInfo").html(htmls);
                }
            );
        });
        $jq('#SavePermissions').click(function () {
            if($jq("#permissionInfo").html() == "")
                return false;
            alert("SavePermissions");
            var tabParID = $jq(this).closest('table').attr('id');
            id = $jq("#"+"permissionInfo").find(" tr:eq(1) td:eq(0)").text();
            switchs = $jq('#' + "switch").is(":checked");
            AllowProjects = $jq('#' + "AllowProjects").is(":checked");
            VerifyAllowProjects = $jq('#' + "VerifyAllowProjects").is(":checked");
            WhiteBoard = $jq('#' + "WhiteBoard").is(":checked");
            ChkEmpProjDays = $jq('#' + "ChkEmpProjDays").is(":checked");
            ChkProjDays = $jq('#' + "ChkProjDays").is(":checked");
            permissionPage = $jq('#' + "permissionPage").is(":checked");
            MemberNames = $jq('#' + "MemberNames").is(":checked");
            MainMenuTop = $jq('#' + "MainMenuTop").is(":checked");
            WhiteBoard_EmpDetail = $jq('#' + "WhiteBoard_EmpDetail").is(":checked");
            Entry_WhiteBoard = $jq('#' + "Entry_WhiteBoard").is(":checked");
            Proj_StatusEdit = $jq('#' + "Proj_StatusEdit").is(":checked");
            Ger_StatusReport = $jq('#' + "Ger_StatusReport").is(":checked");
            SwitchRequest = $jq('#' + "RequestForSwitchEmployee").is(":checked");
            GetSwitchRequest = $jq('#' + "GetSwitchRequest").is(":checked");
            selfCategoryList = $jq('#' + "selfCategoryList").is(":checked");
            ProjectQuestionAnswer = $jq('#' + "ProjectQuestionAnswer").is(":checked");
            var go_path = "Employee_Switch_Person.php?action=permission&vars=18&var1="+id+"&var2="+
                switchs+"&var3="+AllowProjects+"&var4="+VerifyAllowProjects+"&var5="+WhiteBoard+"&var6="+
                ChkEmpProjDays+"&var7="+ChkProjDays+"&var8="+permissionPage+"&var9="+MemberNames+"&var10="+
                MainMenuTop+"&var11="+WhiteBoard_EmpDetail+"&var12="+Entry_WhiteBoard+"&var13="+Proj_StatusEdit+
                "&var14="+Ger_StatusReport+"&var15="+SwitchRequest+"&var16="+GetSwitchRequest+"&var17="+selfCategoryList
                +"&var18="+ProjectQuestionAnswer;//TODO:

            $jq.get(go_path,
                {
                }, function(data)
                {
                    $jq("#chk").val(go_path);
                    $jq("#permissionInfo").html("");
                }
            );
        });

        $jq('#Submit_Daily_Question').click(function () {
            Submit_Daily_Question();
        });
        $jq('.projStatus').change(function(){
            GetProject_ModeOptions();
        });
        var projectId ;
        $jq('.ProjectNameModeChange').change(function(){
            var projectId = $jq(this).find(".dmProjName ").val();
            if(projectId <= 0 || isNaN(projectId) || projectId == 4){
                alert("select Valid Project")
            }
            getSupervisorCurrentProjectsEmployeeName(projectId);
        });

        $jq("#ChangeTask").click(function(){
            var taskId = $jq("#tbTaskChange").find(".projectTaskList").find(".ProjTaskName").val();
            var empId = $jq("#tbTaskChange").find(".supervisorProjectEmpList").val();
            var half = readCookie("half");

            employeeChangeTask(empId, taskId, half);
        });

        $jq("#requestChangeTask").click(function(){

            var taskId = $jq("#tbTaskChangeRequest").find(".projectTaskList").find(".ProjTaskName").val();
            var half = readCookie("half");
            var empId = readCookie("userID");
            //First Check that request maker is on any project or not. If he is free then he can't make any request.
            go_path = "Employee_Switch_Person.php?action=getEmployeeProjectByEmployeeId&vars=1&var1="+ empId;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    var dataObj = JSON.parse(data);
                    if(dataObj.length > 0) {
                        var projectId = dataObj[0].PTPK;
                        if (projectId == 4) {
                            alert("Currently You are Free! You can't make request.");
                            return;
                        }
                        //check duplicate result- if employee have already make request then alert him that he cant make request again until it
                        //handeld by the concern person.
                        go_path = "Employee_Switch_Person.php?action=CheckLastTaskChangeRequest&vars=2&var1=" + empId +"&var2=" + projectId;
                        $jq.get(go_path,
                            {}, function (data) {
                                if(data == 0){
                                    go_path = "Employee_Switch_Person.php?action=requestChangeEmpProjectTask&vars=4&var1=" + empId + "&var2=" + projectId + "&var3=" + half + "&var4=" + taskId;
                                    $jq.get(go_path,
                                        {}, function (data) {
                                            if(data == 1){
                                                updateAlertsEmpProjectTaskChange();
                                                alert("Request successfully made. Your Supervisor soon will proceed it as he will see.")
                                            }
                                            else{
                                                alert("Unexpected Error occur :" + data)
                                            }
                                        });
                                }
                                else{
                                    alert(" Your request already pending, You can't make request again until it entertained.");
                                }
                            });
                    }
                    else
                    {
                        alert("Sorry! No project found where you are currently working.");
                    }
                });
        });
        $jq("#clearProjectsPreviousDaysInfo").click(function(){
            $jq("#ProjectsPreviousDaysInfo").html("");
        });
        $jq(document).on('change',"#maximizeProjectQuestionAnswerPanel",function(){ //"#maximizeProjectQuestionAnswerPanel"
            console.log("is checked1");
            if(this.checked){
                console.log("is checked");
                //isNotShowOnStartup = false;
            }
            else{
                //isNotShowOnStartup = true;
                console.log("is not checked");
            }
        });

        $jq("#maximizeProjectQuestionAnswerPanel").click(function(){
            //console.log($jq("#maximizeProjectQuestionAnswerPanel").html());
            var alt = $jq("#maximizeProjectQuestionAnswerPanel").attr("alt");
            //console.log(alt);
            if(alt =="Maximize"){
                //console.log(alt);
                $jq('#maximizeProjectQuestionAnswerPanel').attr('src', '');
                $jq('#maximizeProjectQuestionAnswerPanel').attr('src', 'img/RestoreWindow.png');
                $jq('#maximizeProjectQuestionAnswerPanel').attr('alt', 'RestoreWindow');

                $jq("#ProjectQuestionAnswerBottomPanel").css("width","100%");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","95%");
                $jq("#ProjectQuestionAnswer").css("height","800px");
            }
            else {
                $jq('#maximizeProjectQuestionAnswerPanel').attr('src', 'img/MaximizeIcon.png');
                $jq('#maximizeProjectQuestionAnswerPanel').attr('alt', 'Maximize');
                $jq("#ProjectQuestionAnswerBottomPanel").css("width","");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","");
                $jq("#ProjectQuestionAnswer").css("height","140px");
            }
            /*
            if($jq("#maximizeProjectQuestionAnswerPanel").html() =="Maximize"){
                $jq("#maximizeProjectQuestionAnswerPanel").html("Restore-Down");
                $jq("#maximizeProjectQuestionAnswerPanel").removeClass("glyphicon glyphicon-menu-up").addClass("glyphicon glyphicon-menu-down");
                //$jq("#ProjectQuestionAnswerBottomPanel").addClass("ProjectQuestionAnswerBottomPanelMaximizeSetting");
                $jq("#ProjectQuestionAnswerBottomPanel").css("width","100%");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","95%");
                $jq("#ProjectQuestionAnswer").css("height","800px");

            }
            else{
                $jq("#maximizeProjectQuestionAnswerPanel").html("Maximize");
                $jq("#maximizeProjectQuestionAnswerPanel").removeClass("glyphicon glyphicon-menu-down").addClass("glyphicon glyphicon-menu-up");
                //$jq("#ProjectQuestionAnswerBottomPanel").removeClass("ProjectQuestionAnswerBottomPanelMaximizeSetting");
                $jq("#ProjectQuestionAnswerBottomPanel").css("width","");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","");
                $jq("#ProjectQuestionAnswer").css("height","140px");
            }
*/
            var id = "#ProjectQuestionAnswerBottomPanel";
            console.log("maximizeProjectQuestionAnswerPanel CLK");

        });
        /*$jq("#ProjectQuestionAnswerBottomPanel").click(function(){

            console.log("change occur");
            if(typeof $jq(this).attr("open") !== 'undefined'){
                console.log("open found");
                $jq(this).css("height","");
                $jq(this).css("height","200px");
            }else{
                console.log("open Not found");
                $jq(this).css("height","");
                $jq(this).css("height","40px");
            }
        });*/

        /*
        $jq("#ProjectQuestionAnswerBottomPanel").click(function(){

           console.log("change occur");
            if($jq("#ProjectQuestionAnswerBottomPanel").attr("open")){
                console.log("open found");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","200px");
            }else{
                console.log("open found");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","");
                $jq("#ProjectQuestionAnswerBottomPanel").css("height","40px");
            }
        });//*/


        //$jq("#TotalDaysAndTaskAssignedTable").tablesorter();

        //radio button check selection change event in jquery
        //as u can see in comments i have tried all these code but none of this working form me. tired of seraching
        //and trying different codes whats the problem please help. I want to display  specific html on different radio option click

        /*
         $jq("input[name=Names]:radio").on('change', function(){
         console.log("dfdfd");
         });
         $jq("input[name=Names]:radio").click(function(){
         console.log("dfdfd");
         });
         console.log($jq("#VoteAns_268_1").val());
         $jq('.VoteAns').change(function (){
         console.log("vote Answers");
         });
         */
        /*  $jq("input[name=Names]:radio").change(function () {
         conosle.log("radiobutton changes");
         })*/

        /*   $jq(".VoteAns").change(function(){
         conosle.log("VoteAns");
         });*/
        /*$jq(".VoteAns").on('change',function(){
         conosle.log("VoteAns");
         });
         $jq("#VoteAns_269_1_lbl").on('change',function(){
         conosle.log("VoteAns123");
         });*/
        /*$jq(".VoteAns").click(function(){
         alert("kk");
         })*/
        /*$jq("input:radio[name='Names'").click(function(){
         alert("input!!");
         });
         $jq("input:radio[name='Names'").change(function(){
         alert("input11!!");
         })*/
        /*$jq("input:radio[name='Names']").change(function(){
         alert("input11!!");
         });*/
        /*$jq("input[name='Names'").change(function(){
         alert("input11!!");
         });*/
        /*$jq("input[name=Names]:radio").change(function () {
         alert('input!!');
         });*/

        /*
         $jq("input:radio[name='Names']").change(function () {
         console.log("this is working");
         alert('input!!');
         });

         $jq("input[name='Names']").change(function(){
         alert($jq(this).next().text());
         });
         //alert("this is work");
         */
    }
    else if(window.location.href.indexOf("logindetail") > -1){
        allEmployeeNames();
    }
    else if(window.location.href.indexOf("projSummary") > -1) {
        RunningProjectsStatus();
        whiteboardfnCallingRepeatly();
    }
    else if(window.location.href.indexOf("AddProjects") > -1) {

        getPersonNameAndProjectName();
        $jq('#addproject').click(function ()
        {
            var projname = $jq("#projName").val();
            if($jq.trim(projname) == "")
            {
                alert("proj Name is Empty ");
                return;
            }
            var personClass = new Array();
            $jq(".nameEmp").each(function() {
                //alert($jq(this).val());
                personClass.push($jq(this).val());
            });

            if(personClass[0] == "0" || personClass[1] == "0")
            {
                alert ("Please Select the Person First");
                return false;
            }
            var about = $jq("#textarea").val();
            var stdate = $jq("#stdate").val();
            var deaddate = $jq("#deaddate").val();
            var go_path = "Employee_Switch_Person.php?action=addProject&vars=6&var1="+projname+"&var2="+personClass[0]+"&var3="+personClass[1]+"&var4="+about
                +"&var5="+stdate+"&var6="+deaddate;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    $jq("#result").text("	Added Successfully 	");
                    $jq("#result").css('color', 'green');
                });

        });


    }
    else if(window.location.href.indexOf("AddPerson.php") > -1) {
        designation();
        Department();
        $jq('#btnAddPerson').click(function ()
        {
            AddEmployee();
        });

        $jq("#loginname").focusout(function(){
            var loginName = $jq(this).val();
            //alert("loginName: "+loginName);
            var go_path = "Employee_Switch_Person.php?action=chkNewLoginName&vars=1&var1="+loginName;

            $jq.get(go_path,
                {
                }, function(data)
                {
                    //alert (data);
                    //$jq("#chk").val(go_path);
                    if(data == "LoginName already in used")
                        $jq("#verify").html(data);
                    else
                        $jq("#verify").html('<input type="submit"  name="button" id="btnAddPerson" value="Add Person" onclick="AddEmployee()" /><label id="result"></label>');
                });

        });
    }
    else if(window.location.href.indexOf("EditProjects.php") > -1)  {
        IndicatorBusy();
        var ProjID = getUrlParameter('ProjID');
        if( ProjID == undefined)
        {
            $jq.when(
                getPersonNameAndProjectName()
            ).then(
                GetProjectStatusOptions()
            ).then(
                GetProject_ModeOptions()
            ).then(
                retriveProjectDetail(ProjID)
            );
        }
        else
        {
            $jq.when(IndicatorBusy())
                .then(getPersonNameAndProjectName())
                .then(GetProjectStatusOptions())
                .then(GetProject_ModeOptions())
                .then(allAandFinishProjects(ProjID))
                .done(function(){ }).fail();
        }
        $jq('#editproject').click(function () {
            var ProjID = $jq(".dmProjName").val();
            var personClass = new Array();
            retriveProjectDetail(ProjID);
        });
        $jq('#saveEditProjects').click(function () {
            IndicatorBusy();
            var ProjID = $jq(".dmProjName").val();
            var personClass = new Array();
            $('.nameEmp').each(function(index, obj){
                personClass.push($(this).val());
            });

            if(personClass[0] == "0" || personClass[1] == "0")
            {
                alert ("Please Select the Person First");
                return false;
            }
            var abt = $jq("#textarea").val();
            var stdate = $jq("#stdate").val();
            var dldate = $jq("#deaddate").val();
            if(dldate == "")
                dldate = "NULL";
            var projName = $jq("#ProjName").val();

            var go_path = "Employee_Switch_Person.php?action=saveEditProjects&vars=7&var1="+ProjID+"&var2="+personClass[0]+"&var3="+personClass[1]+"&var4="+abt+"&var5="+stdate+"&var6="+dldate+"&var7="+projName; //33 is omer bahi id
            $jq("#chk").val(go_path);
            $jq.get(go_path,
                {
                }, function(data)
                {
                    //$jq("#chk").val(data);
                }).done(function(){
                    IndicatorBusyNot();
                });
        });
        $jq('.projStatus').change(function(){
            GetProject_ModeOptions();
        })
    }
    else if(window.location.href.indexOf("statusreport.php") > -1) {

        $jq.when
        (
            getPersonNameAndProjectName()
        ).then( ).then();
        $jq('.pk_id_status').on('change', function() {
            alert($jq('input[name=group2]:checked').attr('id'));
            $jq('input[name=group2]:checked').attr('checked', 'checked');
        });
    }
    else if(window.location.href.indexOf("DetailEmp.php") > -1) {
        designation();
        Department();
        $jq('#detailOther').click(function ()
        {
            var id = $jq(".nameEmp").val();
            window.location.replace("/Employee_Switch_Persons/DetailEmp.php?id="+id);
        });

        $jq('#ResetPassword').click(function ()
        {
            var id = $jq("#logoutThis").attr("name");
            var go_path = "Employee_Switch_Person.php?action=ResetPassword&vars=1&var1="+id;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    if(data == "")
                        $jq("#idverify").html("Has been changed to '1234'");
                    else
                        $jq("#idverify").html("Some Error occur");
                }
            );
        });
        $jq('#idSaveEmpDetail').click(function ()
        {
            var id = $jq("#logoutThis").attr("name");
            var name = $jq("#name").val();
            var loginanme = $jq("#loginname").val();
            var dept = $jq("#dept").val();
            var desig = $jq("#desig").val();
            var shiftmode = $jq("#shift").val();
            var dept_category = $jq("#dept_category").val();
            var isActiveLogin  = $jq("#isActiveLogin").is(":checked");

            var go_path = "Employee_Switch_Person.php?action=SaveEmpDetail&vars=8&var1=" + id+
                "&var2="+name+"&var3="+loginanme+"&var4="+dept+"&var5="+desig+"&var6="+shiftmode+"&var7="+dept_category+"&var8="+isActiveLogin;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    if(data == 1)
                        $jq("#editverify").html("<b class='bg-info'>Has been changed Sucessfully</b>");
                    else
                        $jq("#editverify").html("<b class='bg-danger'>Some Error occur</b>");
                }
            );
        });
        $jq('#is_teamlead').click(function ()
        {
            var is_teamlead ;
            if($jq('#mark_Teamlead').is(':checked'))
                is_teamlead = 1;
            else
                is_teamlead = 0;
            var id = $jq("#logoutThis").attr("name");
            var go_path = "Employee_Switch_Person.php?action=MarkTeamlead&vars=2&var1="+id+"&var2="+is_teamlead;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    if(data == "")
                        $jq("#verify_is_teamlead").html("Changes Sucessfully");
                    else
                        $jq("#verify_is_teamlead").html("Some error occur");
                }
            );
        });
        allEmployeeNames();
        $jq.when(DetailEmpPgInfo()).then();
        window.setTimeout( DetailEmpInfo, 500 ); // 5 seconds
    }
    else if(window.location.href.indexOf("LogOut_All_logined_Modeler") > -1)  {
        logoutAll();
        CloseTab();

    }
    else if(window.location.href.indexOf("projectstatus.php") > -1) {
        ProjectStatus();
        ProjectFeedbackFilter("LowPriority");
        ProjectFeedbackFilter("Question");
        ProjectFeedbackFilter("Feedback");
        var go_path = "atuocompleteDB.php?action=ProjectListContinueStartPause&vars=0"; //33 is omer bahi id
        $jq.get(go_path,
            {
            }, function(data)
            {
                $jq( ".projectName").html(data);
                $jq(".dmProjName").attr("name","id")
            });
        $jq("#addproject").click(function()
        {
            addproject();
        });
        //goToStatusReport(1);
        //$("#showProjDetail").click(function(e){
        //   alert("Dfd")
        //});
    }
    else if(window.location.href.indexOf("projectstatusedit.php") > -1) {
        ProjectStatusEdit();
    }
    else if(window.location.href.indexOf("AssignWork.php") > -1){

        //allEmployeeNames();
        if(!+readCookie("permission_memberNames")){
            var go_path = "Employee_Switch_Person.php?action=getTeamLeadProjectAndEmployee&vars=1&var1="+1; //33 is omer bahi id
            $jq.get(go_path,
                {
                }, function(data)
                {
                    var get_data = new Array();     // declare array
                    var get_data = data.split('----//------'); // get_data is data comming from php file
                    $jq(".nameEmp").html(get_data[0]);  //employee name from employee table
                    $jq(".ProjectName").html(get_data[1]);  // project name from project table
                });
        }
        else  getPersonNameAndProjectName();
        countAssignTasks();
        showAssignWork(0);

        //allProjectList();
    }
    else if(window.location.href.indexOf("empProgressAdd.php") >-1){
        EmployeeProgress();
    }
    else if(window.location.href.indexOf("empProgress.php") >-1){
        EmployeeProgressAddList(getUrlVars().dt);
    }
    else if(window.location.href.indexOf("empProgressSelect.php")> -1){
        showAllProjectsName();
    }
    else if(window.location.href.indexOf("AddDinnerMenu.php")> -1){
        getDinnerItem();
    }
    else if(window.location.href.indexOf("ProjectTaskAdd.php")> -1){
        $jq.when(getAllProjectTask());
    }
    load_js();
});
function getAllProjectTask(){
    var go_path = "Employee_Switch_Person.php?action=getAllProjectTask&vars=0";
    $jq.get(go_path,
        {}, function (data) {
            var html = "<table><tr><th>S. No.</th><th>Task Name</th><th>Delete</th><th>Edit</th></tr>";
            var dataReturn = JSON.parse(data);
            for(var i = 0; i < dataReturn.length; i++){
                html += "<tr><td>" +(i+1) + "</td><td id='task_" + dataReturn[i].pk  + "' contenteditable>" + dataReturn[i].taskName + "</td>";
                html += "<td><button onclick='projectTaskDeleteById(" + dataReturn[i].pk + ")' class='btn btn-danger glyphicon glyphicon-remove'></button></td>";
                html += "<td><button onclick='projectTaskUpdate(" + dataReturn[i].pk + ")' class='btn btn-primary glyphicon glyphicon-edit'></button></td>";
            }
            $jq(".ProjectTasks").html(html);
        });
}
function projectTaskDeleteById(taskId){
    var go_path = "Employee_Switch_Person.php?action=projectTaskDeleteById&vars=1&var1=" + taskId;
    $jq.get(go_path,
        {}, function (data) {

            getAllProjectTask();
            if(data != 1){
                alert("Unexpected Error occur : "+ data);
            }
        });
}

//For getting URL Data
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
function addproject(){
    var NewprojName = ( $jq("#NewprojName").val());
    if(	 $jq.trim(NewprojName) == ""	)
    {
        alert("Its empty");
        return false
    }
    var vl= NewprojName;
    var xyz =  $jq("#projectNames1 option").filter(function(){
        return this.value ==vl;
    }).data('xyz');
    if(!xyz)
    {
        var NewAddConform = confirm("Do you wana add \n\n'"+ $jq.trim(NewprojName)+"'\n\nas a new project");
        if(NewAddConform == false)
            return false;

        var go_path = "atuocompleteDB.php?action=addProject&vars=1&var1="+NewprojName;
        var jqxhr = $jq.ajax( go_path )
            .done(function() {
                $jq.ajax({
                    url: "atuocompleteDB.php?action=lastAddProject&vars=1&var1="+NewprojName,
                    type: "GET",
                    data: 'show=content',
                    success: function(data) {

                    }
                }).done(function(data){
                    var currurl = window.location.href ;
                    var currurlArr  = currurl.split('=');
                    replaceUrl = "statusreport.php?id"+"="+data;
                    unsaved = false;
                    window.location.replace(replaceUrl)
                }).fail(function() {
                    alert( "Some Error In Getting  new projects PK." );
                });
            })
            .fail(function() {
                alert( "Some Error In registering new projects." );
            })
            .always(function() {
            });
    }
    else{
        alert("Name is already exists. Please choose antoher name.");
        return false;
    }
}
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
var previousDataStringAssignWork;
function getUserAssignWork(){
    var go_path = "Employee_Switch_Person.php?action=getUserAssignWork&vars=0";
    $jq.get(go_path,
        {}, function (data) {
            data = JSON.parse(data);
            if(data.length > 0){

                if(previousDataStringAssignWork != JSON.stringify(data)){
                    var tblBody = "<h1>Your Tasks</h1><p><strong><big> "+ data.length +"</big></strong> Pending Task(s) for you!</p>";
                    tblBody += "<table>" +
                    "<tr>" +
                    "<td>Project Name</td>" +
                    "<td>Work Description</td>" +
                    "<td>Start Date</td>" +
                    "<td>Assign By</td>" +
                    "<td>Solution</td>" +
                    "<td>Save</td>" +
                    "</tr>";
                    for (var i = 0; i < data.length; i++)
                    {
                        tblBody += "<tr><td>"+ data[i].ProjectName + "</td><td>"+ data[i].AssignWork + "</td><td>" + data[i].WorkDate + "</td><td>" + data[i].AssignedBy+ "</td>" +
                        "<td><textarea  class='bg-primary textarea-width-height' id='taskSolution" + data[i].EmpAWPK + "' type='text'>" + data[i].Solution + "</textarea></td>" +
                        "<td><input class='btn-primary' type='button' id='saveSolution' onclick='saveTaskSolution(" + data[i].EmpAWPK + ")' value='submit'/></td></tr>";
                    }
                    tblBody += "</table>";
                    $jq("#WorkBottomPanel").html("<summary>Your Assigned Tasks</summary>" + tblBody);
                    $jq("#WorkBottomPanel").prop("open",true);
                    previousDataStringAssignWork = JSON.stringify(data);
                }
            }
            else {
                var tblBody = "<p>No pending Task for you!</p>";
                $jq("#WorkBottomPanel").hide();
                $jq("#WorkBottomPanel").html("");
            }
        });
    //setTimeout(getUserAssignWork,5000);
}
function ProjectModeChangeRequest(){
    var go_path = "Employee_Switch_Person.php?action=getUserAssignWork&vars=0";
    $jq.get(go_path,
        {}, function (data) {
            data = JSON.parse(data);
            if(data.length >0){
                var tblBody = "<h1>Your Tasks</h1><p><strong><big> " + data.length + "</big></strong> Pending Task(s) for you!</p>";
                tblBody+= "<table><tr><td>Project Name</td><td>Work Description</td><td>Start Date</td></tr>";
                for (var i=0; i<data.length; i++)
                {
                    tblBody += "<tr><td>"+ data[i].ProjectName + "</td><td>"+ data[i].AssignWork+"</td><td>" + data[i].WorkDate+ "</td></tr>";
                }
                tblBody += "</table>";
            }
            else {
                var tblBody = "<p>No pending Task for you!</p>";
            }
            $jq("#EmpAssignWork").html(tblBody);

        });
    //setTimeout(getUserAssignWork,5000);
}
//notification of person change request for project
function updateAlerts(doNotice) {
    var data ={};
    if(+readCookie("permission_GetSwitchRequest"))
    {
        data = {
            "action": "checkAlerts"
        };
    }
    else if(+readCookie("permission_EmpSwitchRequest")) {
        data = {
            "action": "checkSpecificAlerts"
        };
    }
    else{
        data = {
            "action" : "empOwnSwitchRequestStatus"
        };
    }
    $jq.ajax({
        url : "Employee_Switch_Person.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {
            var response = $jq.parseJSON(data);
            if(response.length > 0){
                if(typeof doNotice =='undefined')
                    doNotice = true;
                if(doNotice){
                    var options = {
                        clickToHide: true,
                        style: 'bootstrap',
                        autoHideDelay: 1500
                    };
                    if(+readCookie("permission_GetSwitchRequest")) {
                        //$jq.notify("You have recevied " + response.length + " requests for switch employee", options);
                        //$jq.titleAlert("New request !", {
                        //    requireBlur:false,
                        //    stopOnFocus:true,
                        //    duration: 2000
                        //});
                    }
                }
                var tblBody = "<tr><td>Request By</td><td>Person Name</td><td>Current Project</td><td>Switch to Project</td><td>Task Name</td><td>DateTime</td>";
                if(+readCookie("permission_GetSwitchRequest")){
                    tblBody += "<td colspan='2'>Accept or Reject</td>";
                }
                else if(+readCookie("permission_EmpSwitchRequest")){
                    tblBody += "<td colspan='2'>Cancel</td>";
                }
                tblBody += "</tr>";

                for(var i= 0; i < response.length; i++){
                    var cteamLead, nteamLead;
                    if(!response[i].CurrentProTL)
                        cteamLead = "none";
                    else
                        cteamLead = response[i].CurrentProTL;
                    if(!response[i].NewProTL)
                        nteamLead = "none";
                    else
                        nteamLead = response[i].NewProTL;
                    tblBody = tblBody + " "+ "<tr><td>"+response[i].requestBy+"</td><td>"+response[i].Employee_Name+"</td><td>"+response[i].CurrentProject+
                    "</br><small>[" + cteamLead  +"]</small></td><td>"+response[i].projectName+"</br><small>[" + nteamLead  +"]</small></td><td>"
                    +response[i].taskName+"</td><td>"
                    +response[i].requestDateTime.substr(0,10)+"</br>"+ response[i].requestDateTime.substr(11,response[i].requestDateTime.length) +"</td>";
                    if(+readCookie("permission_GetSwitchRequest")){
                        tblBody += "<td><input type='button' id='acceptSwitch'  onclick='acceptRequest(" + response[i].nameId + "," + response[i].projId + ","
                        + response[i].id + "," + response[i].NewProTLId + ",\"" + response[i].requestDateTime + "\"," + response[i].requestById + ","
                        + response[i].projTaskPK + ")' value='Accept'></td><td><input type='button' id='rejectSwitch' value='Reject' onclick='empSwitchRequestUpdate(2,"+ response[i].id+")'></td>";
                    }
                    else if(+readCookie("permission_EmpSwitchRequest"))
                    {
                        tblBody += "<td><input type='button' id='rejectSwitch' value='Cancel' onclick='empSwitchRequestUpdate(3,"+ response[i].id+")'></td>";
                    }
                    tblBody += "</tr>";
                }
                var heading = "<h1>Requests </h1>";
                var html = heading +'' +"<table>"+""+ tblBody+"" +"</table>";
                $jq("#requestBottomPanel").show();
                $jq("#requestBottomPanel").html("<summary>Employee Switch Request</summary>"+html);
                $jq("#requestBottomPanel").prop("open",true);
                getPersonNameAndProjectNameWithRestriction();
            }
            else {
                $jq("#requestBottomPanel").hide();
                $jq("#switchRequestEmp").html("");
            }
        }
    });
    //setTimeout(updateAlerts, 15000); // Every 15 seconds.
}
function updateAlertsEmpProjectTaskChange(){
    var data = {};

    var switchPermission = readCookie("permission_EmpSwitchRequest");
    var userDesignation = readCookie("userDesig");
    if(switchPermission == 1 && userDesignation  != 4)
    {
        data = {
            "action": "getUnrespondChangeTaskRequestForSupervisor"
        };
    }
    else  {
        data = {
            "action": "getEmpOwnChangeTaskRequest"
        };
    }

    $jq.ajax({
        url : "Employee_Switch_Person.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {

            var response = JSON.parse(data);
            if(response.length > 0){
                if(typeof doNotice =='undefined')
                    doNotice = true;
                if(doNotice){
                    var options = {
                        clickToHide: true,
                        style: 'bootstrap',
                        autoHideDelay: 1500
                    };
                    if(+readCookie("permission_GetSwitchRequest")) {
                        //$jq.notify("You have recevied " + response.length + " requests for switch employee", options);
                        //$jq.titleAlert("New request !", {
                        //    requireBlur:false,
                        //    stopOnFocus:true,
                        //    duration: 2000
                        //});
                    }
                }
                var tblBody = "<tr><td>Request By</td><td>Project</td><td>Switch to Task</td><td>DateTime</td><td colspan='2'>Operation</td>";
                tblBody += "</tr>";


                for(var i= 0; i < response.length; i++){
                    tblBody = tblBody + " "+ "<tr><td>"+response[i].Employee_Name+"</td><td>"+response[i].ProjectName+ "</td><td>"
                    +response[i].taskName+"</td><td>"
                    +response[i].RequestDateTime.substr(0,10)+"</br>"+ response[i].RequestDateTime.substr(11,response[i].RequestDateTime.length) +"</td>";
                    if(+readCookie("permission_EmpSwitchRequest") && readCookie("userDesig") !=4){
                        tblBody += "<td><input type='button' id='acceptSwitch'  onclick='empTaskSwitchRequestUpdate(1,"+ response[i].ChangeTaskRequestPK + ","
                        + response[i].EmpId + "," + response[i].ProjectPK + "," + response[i].Half + ","
                        + response[i].TaskPK + ")' value='Accept'></td><td><input type='button' id='rejectTaskSwitch' value='Reject' onclick='empTaskSwitchRequestUpdate(2," + response[i].ChangeTaskRequestPK + ")'></td>";
                    }
                    else
                    {
                        tblBody += "<td><input type='button' id='rejectTaskSwitch' value='Cancel' onclick='empTaskSwitchRequestUpdate(3," + response[i].ChangeTaskRequestPK+")'></td>";
                    }

                    tblBody += "</tr>";
                }
                var heading = "<h1>Requests </h1>";
                var html = heading +'' +"<table>"+""+ tblBody+"" +"</table>";
                $jq("#taskRequestBottomPanel").show();
                $jq("#taskRequestBottomPanel").html("<summary>Task Switch Request</summary>"+html);
                $jq("#taskRequestBottomPanel").prop("open",true);
                getPersonNameAndProjectNameWithRestriction();
            }
            else {
                $jq("#taskRequestBottomPanel").hide();
                $jq("#taskChangeRequestEmp").html("");
            }
        }
    });//*/
}
function empTaskSwitchRequestUpdate(requestState, requestId, empId, projId, half, taskId){
    //updateAlertsEmpProjectTaskChange();
    go_path = "Employee_Switch_Person.php?action=CheckLastTaskChangeRequestById&vars=1&var1="+ requestId;
    $jq.get(go_path,
        {
        }, function(data) {
            if(data >= 0){
                ProjectTaskChangeRequestUpdate(requestId, requestState);
                if (requestState == 1) {
                    employeeChangeTask(empId, taskId, half);
                }
            }
            else if(data == 0){
                alert("This request has already entertained. You can't response on it.")
            }
            else{
                alert("Unexpected Error occur : "+ data)
            }

        });
    updateAlertsEmpProjectTaskChange();
}
function employeeChangeTask(empId, taskId, half){
    go_path = "Employee_Switch_Person.php?action=employeeChangeTask&vars=3&var1="+ empId + "&var2=" + taskId + "&var3=" +half;
    $jq.get(go_path,
        {
        }, function(data)
        {

            if(data == 1){
                updateAlertsEmpProjectTaskChange();
                new_whiteboardfn();
                updateAlertsEmpProjectTaskChange

            }
            else{
                alert("Unexpected Error occur : "+ data);
            }
        });
}
function ProjectTaskChangeRequestUpdate(requestId, stateId){
    var go_path = "Employee_Switch_Person.php?action=ProjectTaskChangeRequestUpdate&vars=2&var1=" + requestId + "&var2="+stateId; //33 is omer bahi id
    $jq.get(go_path,
        {}, function (data) {

        });
}
function acceptRequest(nameID, projID, recordId, teamLeadId, requestDateTime, requsetBy, taskId){
    switchEmployeeCall(nameID, projID, teamLeadId, taskId);
    empSwitchRequestUpdate(1, recordId);
    updateAlerts(false);

}
function AddProjectTaskForEmployee(empId, projectId, taskId, assignDateTime, assignBy){

    var assingTaskDate = new Date(assignDateTime);

    $jq.post("Employee_Switch_Person.php?action=AddProjectTaskForEmployee&vars=0",{
        employeeId : empId,
        projectIdd : projectId,
        assignTaskId : taskId,
        assignTaskDate : assingTaskDate,
        assignById :assignBy
    }).done(function(data){
        if(data == 1){
            alert("Task Successfully created and assigned!")
        }
    })

}
function IndicatorBusy(){
    $jq(".blink").show();
}
function IndicatorBusyNot(){
    $jq(".blink").hide("Slow","linear");
}
function retriveProjectDetail(ProjID){
    if(typeof ProjID == 'undefined' || ProjID == 0)
        return false;
    IndicatorBusy();
    var go_path = "Employee_Switch_Person.php?action=getprojectDetail&vars=1&var1=" + ProjID; //33 is omer bahi id
    $jq.get(go_path,
        {}, function (data) {
            //alert(data);
            var get_data = data.split(',');//2,2,,2013-09-18,2013-10-16

            $('.nameEmp').each(function (index, obj) {

                $jq(this).val(get_data[index]);
            });
            $jq("#textarea").val(get_data[2]);

            $jq("#stdate").val(get_data[3]);
            $jq("#deaddate").val(get_data[4]);
            $jq("#ProjName").val(get_data[5]);
            $('.dmProjName option[value="' + ProjID + '"]').attr("selected", "selected");
        }).done(function () {
            IndicatorBusyNot();
        });
}
function allAandFinishProjects(){
    var go_path = "Employee_Switch_Person.php?action=allAandFinishProjects&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#tbEditProject").find('.ProjectName').html(data);
            $jq("#tbPerPersonDays").find('.ProjectName').html(data);
            $jq("#tbPreProjDays").find('.ProjectName').html(data);
            $jq("#tbUpdProj").find('.ProjectName').html(data);
        }
    );
}
function showAllProjectsName(classNameWhereToShow){
    var go_path = "Employee_Switch_Person.php?action=allAandFinishProjects&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("." + classNameWhereToShow).html(data);

        }
    );
}
function ProjectListForProjectModeChange(classNameWhereToShow){
    if(($jq("#showAllProjectCheck").prop('checked') && classNameWhereToShow =="ProjectNameModeChange")  || ($jq("#showAllProjectCheckEmpSwitch").prop('checked') && classNameWhereToShow =="ProjectNameWhereToSwitch")){
        showAllProjectsName(classNameWhereToShow);
    }
    else {
        go_path = "Employee_Switch_Person.php?action=getTeamLeadProjectAndEmployee&vars=1&var1="+1;
        $jq.get(go_path,
            {
            }, function(data)
            {
                var get_data = new Array();     // declare array
                var get_data = data.split('----//------');          // Get_data is data comming from php file
                $jq("." + classNameWhereToShow).html(get_data[1]);  // Project name from project table
            });
    }

}
function allEmpList(){
    if($jq("#showAllEmp").prop('checked')){
        allEmployeeNames();
    }
    else {

        getOwnPersonNames();
        //getPersonNameAndProjectName();
    }

}
function allAandFinishProjects(ProjID){
    var go_path = "Employee_Switch_Person.php?action=allAandFinishProjects&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#tbEditProject").find('.ProjectName').html(data);
            $jq("#tbPerPersonDays").find('.ProjectName').html(data);
            $jq("#tbPreProjDays").find('.ProjectName').html(data);
            $jq("#tbUpdProj").find('.ProjectName').html(data);
        }).done(function() {
            retriveProjectDetail(ProjID)
        }
    );
}
function getUrlParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
function GetProjectStatusOptions(){
    var go_path = "Employee_Switch_Person.php?action=GetProjectStatusOptions&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            htmls = "";
            var get_data_row  = data.split('----//------');
            for(var i = 0; i < get_data_row.length - 1 ; i++ )
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');
                htmls = htmls + "<option value="+get_data_col[0]+">"+get_data_col[1]+"</option>"
            }
            $jq(".projStatus").html(htmls);
        }
    );
}
function GetProject_ModeOptions(){
    var projectStatusId = $jq(".projStatus").val();
    if(projectStatusId ==null) projectStatusId = 1;
    var go_path = "Employee_Switch_Person.php?action=GetProject_ModeOptions&vars=1&var1="+projectStatusId;
    $jq.get(go_path,
        {
        }, function(data)
        {
            htmls = "";
            var get_data_row  = data.split('----//------');
            for(var i = 0; i < get_data_row.length - 1 ; i++ )
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');
                htmls = htmls + "<option value="+get_data_col[0]+">"+get_data_col[1]+"</option>"
            }
            $jq(".projMode").html(htmls);
        }
    );
}
function goToStatusReport(id){
    window.location.href ="statusreport.php?id="+16;
}
function ProjectStatus(){
    var go_path = "Employee_Switch_Person.php?action=ProjectStatus&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i < get_data_row.length -1 ; i++ )
            {
                htmls = htmls+"<tr>";
                //alert ("row: "+get_data_row[i]);
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');

                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            htmls = "";
            mode = 0;
            //console.log(get_data_row.length)
            for(var i = 1; i < get_data_row.length - 1 ; i++ ) // project_mode.PM_PK Mode start with i = 1 index
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');
                if(get_data_col[7] != mode )
                {
                    if(mode != 0)
                        htmls += "</table>";

                    htmls = htmls + "<H2>"+get_data_col[5]+"</H2>"
                    htmls += "<table border=1>";

                    mode = get_data_col[7]

                    htmls = htmls+"<th>Projects</th>";
                    htmls = htmls+"<th>Supervisors</th>";
                    htmls = htmls+"<th>Progress</th>";
                    htmls = htmls+"<th>Further Description</th>";

                    if(get_data_col.length == 12)	//if login then
                        htmls = htmls+"<th>Progress Time</th>";

                    htmls = htmls+"<th>Dead_Line</th>";


                }
                htmls = htmls+"<tr>";
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[0];
                htmls = htmls+"</td>";

                //Supervisors
                //htmls = htmls+"<td>"; comming from php
                htmls = htmls + get_data_col[1];
                htmls = htmls+"</td>";

                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[2];
                htmls = htmls+"</td>";

                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[3];
                //htmls = htmls+"</td>";

                //Further Description	 Date
                var tmp = get_data_col[9].split(" ");
                htmls = htmls + "\t( " + tmp[0] +") "+tmp[1]+" (PST)" ;
                htmls = htmls+"</td>";

                if(get_data_col.length == 12) // if login then
                {
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[11]+" (PST)";
                    htmls = htmls+"</td>";

                }
                htmls = htmls + get_data_col[10];
                htmls = htmls+"</td>";
                htmls = htmls+"</tr>";
            }
            $jq("#ProjectStatus1").html(htmls);
        }
    );
}
function ProjectFeedbackFilter(quertyTypeName){
    var go_path = "Employee_Switch_Person.php?action=ProjectFeedbackFilter&vars=1&var1=" + quertyTypeName;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row  = data.split('----//------');
            /*htmls = "<table border=1>";
            for(var i = 0; i < get_data_row.length -1 ; i++ )
            {
                htmls = htmls+"<tr>";
                //alert ("row: "+get_data_row[i]);
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');

                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";*/
            htmls = "";
            mode = 0;
            for(var i = 1; i < get_data_row.length - 1 ; i++ ) // project_mode.PM_PK Mode start with i = 1 index
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');

                if(get_data_col[7] != mode )
                {
                    //if(mode != 0)
                      //  htmls += "</table>";
                    mode = get_data_col[7]
                    htmls = htmls + "<H2>"+get_data_col[5]+"</H2>"

                    htmls += "<table class='sortable table table-hover' border='1'><thead><tr>";
                    htmls = htmls+"<th>Projects</th>";
                    htmls = htmls+"<th>Supervisors</th>";
                    htmls = htmls+"<th>Progress</th>";
                    htmls = htmls+"<th>Further Description</th>";

                    //if login then
                    if(get_data_col.length == 12){
                        htmls = htmls+"<th>Progress Time</th>";}

                    htmls = htmls+"<th>Dead_Line</th>";
                    htmls = htmls+"<th>Last Status Update</th>";
                    htmls += "</tr></thead><tbody>";
                }
                var today = new Date();
                today.setMonth(today.getMonth()-1);

                var oneMonthLaterDate = new Date(today).getTime();
                var recordDate = new Date(get_data_col[13]).getTime();
                //last one month feedback project highlight
                if(recordDate > oneMonthLaterDate){
                htmls = htmls+"<tr class='bg-info'>";
                }
                else{
                    htmls = htmls+"<tr>";
                }
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[0];
                htmls = htmls+"</td>";

                htmls = htmls + get_data_col[1];
                htmls = htmls+"</td>";

                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[2];
                htmls = htmls+"</td>";

                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[3];

                var tmp = get_data_col[9].split(" ");
                htmls = htmls + "\t( " + tmp[0] +") "+tmp[1]+" (PST)" ;
                htmls = htmls+"</td>";

                if(get_data_col.length == 12) // if login then
                {
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[11]+" (PST)";
                    htmls = htmls+"</td>";
                }
                htmls = htmls + get_data_col[10];

                htmls = htmls+"</td>";
                htmls += "<td>" + get_data_col[13] + "</td>";//get_data_col[11]
                htmls = htmls+"</tr>";
            }
            htmls = htmls+"</tbody></table>";
            if(quertyTypeName == "LowPriority"){
                $jq("#LowPriorityProjects").html(htmls);
            }
            else
            if(quertyTypeName == "Question"){
                $jq("#QuestionProjects").html(htmls);
            }
            else
            if(quertyTypeName == "Feedback"){
                $jq("#FeedbackProjectFilter").html(htmls);
            }

            load_js();
        }
    );
}
function ProjectStatusEdit(){
    var go_path = "Employee_Switch_Person.php?action=ProjectStatusEdit&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            var n = data.indexOf('----//------');
            if(n < 0)
            {
                $jq("#ProjectStatus").html(data);
                return false;
            }
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i < get_data_row.length -1 ; i++ )
            {
                htmls = htmls+"<tr>";
                //alert ("row: "+get_data_row[i]);
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');

                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            htmls = "";
            mode = 0;
            for(var i = 1; i < get_data_row.length - 1 ; i++ ) // project_mode.PM_PK Mode start with i = 1 index
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split('`');
                if(get_data_col[7] != mode )
                {
                    if(mode != 0)
                        htmls += "</table>";
                    htmls = htmls + "<H2>"+get_data_col[5]+"</H2>"
                    htmls += "<table border=1>";
                    mode = get_data_col[7]
                    // Tables Headings
                    htmls = htmls+"<th>Projects</th>";
                    htmls = htmls+"<th>Supervisors</th>";
                    htmls = htmls+"<th>Progress</th>";
                    htmls = htmls+"<th>Save</th>";
                    htmls = htmls+"<th>Further Description</th>";
                    htmls = htmls+"<th>Save</th>";
                }
                htmls = htmls+"<tr>";
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[0];
                htmls = htmls+"</td>";
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[1];
                htmls = htmls+"</td>";
                // Progress 100%
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[2];
                htmls = htmls+"</td>";
                // Progress Save
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[get_data_col.length - 2];
                htmls = htmls+"</td>";
                //Further Description
                htmls = htmls+"<td>";
                htmls = htmls +  get_data_col[3] ;
                htmls = htmls+"</td>";
                //Further Description	 Date
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[get_data_col.length - 1];
                htmls = htmls+"</td>";
                htmls = htmls+"</tr>";
            }
            $jq("#ProjectStatus1").html(htmls);
        }
    );
}
function ProjectProgressSave(id){
    var idd = id.replace('ProjS_',"Prog_");
    var str = $jq("#"+idd).html();
    var go_path = "Employee_Switch_Person.php?action=ProjectProgressSave&vars=2&var1="+id+"&var2="+str;
    $jq.get(go_path,
        {
        }, function(data)
        {
            refreshPage();
        });
}
function ProjectionDescriptionSave(id){
    var idd = id.replace('S_',"p_");
    var str = $jq("#"+idd).html();
    var go_path = "Employee_Switch_Person.php?action=ProjectionDescriptionSave&vars=2&var1="+id+"&var2="+str;
    $jq.get(go_path,
        {
        }, function(data)
        {
            refreshPage();
        }
    );
}
function refreshWB(){
    new_whiteboardfn()
}
function whiteboardfnCallingRepeatly(){
    if(document.hasFocus()){
        refreshWB();
        getProjectModeChangeRequestListForEveryKindOfUser();
        getUserAssignWork();
        updateAlerts(false);
    }

    window.onfocus = function (){
        refreshWB();
        getProjectModeChangeRequestListForEveryKindOfUser();
        getUserAssignWork();
        updateAlerts(false);
    };
    //if(document.hasFocus())
    //{
    //    console.log("doc has focused");
    //    refreshWB();

    //    getProjectModeChangeRequestListForEveryKindOfUser();
    //    getUserAssignWork();
    //
    //}
    //else
    //{
    //    console.log("whiteboardfnCallingRepeatly() called waiting");
    //    window.onfocus = function ()
    //    {
    //        console.log("whiteboardfnCallingRepeatly() called waiting called");
    //        refreshWB();
    //        if(+readCookie("permission_EmpSwitchRequest") || +readCookie("permission_GetSwitchRequest")){
    //            console.log("updateAlerts() called waiting");
    //            updateAlerts();
    //        }
    //    };
    //}
}
function whiteboardfnCalling(){
    var d = new Date();
    var day = d.toString().split(" ")[0];
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    a = time; //"10:22:57";
    if(day == "Fri")
        b = "19:30:00"; // 7:00 PM
    else
        b = "19:10:00"; 	// 6:00 PM
    p = "1/1/1970 ";
    difference = new Date(new Date(p+b) - new Date(p+a));
    setTimeout(function() {
        overTimeStart()
    }, difference.getTime());
    refreshWB();
}
function overTimeStart(){
    value = $jq("label[id='half']").text();
    if (value == "2")
    {
        if (confirm('PMS is going to LogOff\n\nPress:\n\n "OK" to LogOff\n\n"Cancel" to Over Time'))
        {

            var go_path = "login.php?action=logoutAsNotavaiable&vars=0";
            $jq.get(go_path,
                {
                }, function(data)
                {
                    refreshWB();
                });
        }
        else  {
            var go_path = "login.php?action=relogin&vars=0";
            $jq.get(go_path,
                {
                }, function(data)
                {
                    refreshWB();
                }
            );
        }
    }
}
function CloseTab(){
    window.open('','_self');
    window.close();
}
function votingQuestion(placeId){

    if(!placeId){
        placeId ="#votingQuestion";
    }
    var go_path = "Employee_Switch_Person.php?action=votingQuestion&vars=0";
    $jq.get(go_path,
        { }, function(data)
        {
            var get_data  = data.split('----//------');

            var htmls = "";
            for(var i = 1; i<2; i++ )
            {
                if(get_data[i] != "true")
                {
                    htmls += get_data[i];
                    htmls += "</br>"
                }
            }

            htmls += "<table border='1' class='table-bordered'><tr><td>";
            htmls += "Sort by</td>";
            htmls +=  '<td><input type="radio" name="voter" value="Employee_Name">Name <input type="radio" name="voter" value="Projects" checked="checked">Project <input type="radio" name="voter" value="Option">Options ';
            htmls += "</td><td>";
            if(get_data[2] == "true")
            {
                htmls += '<button class="VoteSubmitBtn"  id="'+get_data[0]+'" type="Button" onclick="Save_Vote(this.id)">Save</button> ';
            }
            else
            {
                //htmls += '<button id="'+get_data[0]+'" type="Button" onclick="Reset_Vote(this.id)">Reset</button>';
                //alert (get_data[2]);
            }
            htmls += '<button class="voteTimingQuestionId" id="'+get_data[0]+'" type="Button" onclick="Detail_Vote(this.id)">Detail</button>';
            htmls += '<button id="'+get_data[0]+'" type="Button" onclick="Detail_Vote_with_Dinner(this.id)">Dinner Detail</button>';
            htmls += "</tr></table>";
            htmls += get_data[3];
            if(get_data.length > 3)
                htmls += get_data[4];
            $jq(placeId).html("<h3>Voting Question</h3>"+htmls);
            $jq("#chk").val(htmls);
            if(placeId == "#votingQuestionDisplay"){
                $jq("#votingQuestionPanel").prop("open",true);
                $jq("#votingQuestion").html("");
                alert("Leaving Time must be selected!");

            }
        }
    );
}
function Save_Vote(pkid){

    var currentDateTime = new Date();
    //if(currentDateTime.getHours() <= 6 && currentDateTime.getMinutes() <= 30){
    var optionsLen = $jq('.VoteAns').length;
    var tf = "";
    var tfVal = "";
    var i= 1;
    var dinnerSelectedId = $jq(".dinnerList").val();

    if(dinnerSelectedId == 0) {
        alert("What will you like to take in dinner? :) Please select Dinner menu!");
        return false;
    }

    for ( i = 1; i <= optionsLen; i++)
    {
        tf += "_";
        tf += $jq("input:radio[id='VoteAns_"+pkid+"_"+i+"']").is(":checked");
    }

    for ( i = 1; i <=optionsLen; i++)
    {
        tfVal += "_";
        tfVal += $jq("#VoteAns_"+pkid+"_"+i+"_lbl").html();
    }

    if ( tf.search("true") < 0)
    {
        alert("Select Options first");
        return false;
    }

    var optionBool;
    if(tf.indexOf("true") > -1){
        optionBool = tf.split("_");
    }


    $jq("#chk").val(tf);
    //if dinner menu doesn't show nor user selected 4,5,6 option it means that no dinner for employee
    if(typeof dinnerSelectedId == 'undefined' && optionBool[4] == 'false' && optionBool[5] == 'false' && optionBool[6] == 'false'){
        dinnerSelectedId = -1;
    }
    ////if dinner menu doesn't show and user selected one option from 4,5,6 it means that employee doing lat sitting but he didnt selected dinner menu/or dinner
    //menue doesn't show to him
    else if(typeof dinnerSelectedId == 'undefined' && (optionBool[4] == 'true' || optionBool[5] == 'true' || optionBool[6] == 'true')){
        alert("Validation Error\nPlease select dinner Menu! If the Dinner Menu is not showing then, please wait for some seconds and ensure that Javascript is enabled in your browser settings!");
        return false;
    }
    if(optionsLen <4){
        dinnerSelectedId = 1212;
    }

    var go_path = "Employee_Switch_Person.php?action=Save_Vote&vars=5&var1="+pkid+"&var2="+optionsLen+"&var3="+tf+"&var4="+tfVal+"&var5="+dinnerSelectedId;
    $jq
    ("#chk").val(go_path);

    $jq.get(go_path,
        {
        }, function(data)
        {
            refreshPage();
        }
    );
    //}
}
function Reset_Vote(pkid){
    var go_path = "Employee_Switch_Person.php?action=Reset_Vote&vars=1&var1="+pkid;
    $jq("#chk").val(go_path);
    $jq.get(go_path,
        {
        }, function(data)
        {

        });
}
function getCurrentDateFullFormat(){
    var questionDate = new Date();
    var day = questionDate.getDate();
    //make day double digit
    if(day.toString().length==1)
        day ="0"+day;
    var month = questionDate.getMonth() + 1;
    var year = questionDate.getFullYear();
    var fullDate = year +"-"+ month +"-"+ day;
    return fullDate;
}
function UnvoteEmployeeDetails(pkid){
    var currentDateTime  = new Date();

    if((currentDateTime.getHours() >= 17 && currentDateTime.getMinutes() >= 30) || currentDateTime.getHours() >= 18) {
        //console.log(currentDateTime.getHours() +":"+ currentDateTime.getMinutes() >= 30+":"+currentDateTime.getHours())
        //console.log(currentDateTime.getHours())
        //console.log(currentDateTime.getMinutes())

        if (!pkid) {
            var questionId = $jq('.voteTimingQuestionId').attr('id');
            pkid = questionId;
        }
        var voter = $jq('input[name=voter]');
        var sortVoteBy = voter.filter(':checked').val();
        var go_path = "Employee_Switch_Person.php?action=getActiveQuestionDate&vars=0";
        $jq.get(go_path,
            {}, function (data) {
                var askDate = data;

                var go_path = "Employee_Switch_Person.php?action=VoteNotEnterDetails&vars=2&var1=" + pkid + "&var2=" + askDate;
                $jq.get(go_path,
                    {}, function (data) {

                        var get_data_row = new Array();     // declare array
                        var get_data_row = data.split('----//------');
                        if(get_data_row.length >= 4){
                        htmls = "<h5>Late sitting timing: " + askDate + "</h5><table width='200px'>";
                        for (var i = 0; i < get_data_row.length; i++) {
                            htmls = htmls + "<tr>";
                            var get_data_col = new Array();

                            get_data_col = get_data_row[i].split(',');
                            if (get_data_col.length > 1) {
                                var columnLength;

                                columnLength = get_data_col.length;

                                for (var j = 0; j < columnLength; j++) {
                                    htmls = htmls + "<td>";
                                    htmls = htmls + get_data_col[j];
                                    htmls = htmls + "</td>"
                                }
                            }
                            htmls = htmls + "</tr>";
                        }
                        htmls = htmls + "</table>";
                        $jq("#UnVotedEmployeeDisplay").html(htmls + "<p></p><p>Your above Project's member didn't enter late sitting timing. Please enusre late sitting timings.</p>");
                        }
                    });
            });
    }
}
function Detail_Vote(pkid){

    var voter = $jq('input[name=voter]');
    var sortVoteBy = voter.filter(':checked').val();
    var go_path = "Employee_Switch_Person.php?action=getActiveQuestionDate&vars=0";
    $jq.get(go_path,
        {}, function(data) {
            var dayStatus;

            if(data == getCurrentDateFullFormat()){
                dayStatus = "Today";
            }
            else {
                dayStatus = "Previous";
            }
            var askDate = data;
            var go_path = "Employee_Switch_Person.php?action=Detail_Vote&vars=3&var1=" + pkid + "&var2=" + sortVoteBy + "&var3=" + askDate;
            $jq.get(go_path,
                {}, function (data) {


                    var get_data_row = new Array();     // declare array
                    var get_data_row = data.split('----//------');
                    htmls = "<h3>All Late Sitting Details On Date: " + askDate + ", " + dayStatus + "</h3><table>";
                    for (var i = 0; i < get_data_row.length; i++) {
                        htmls = htmls + "<tr>";
                        var get_data_col = new Array();

                        get_data_col = get_data_row[i].split(',');
                        if (get_data_col.length > 1) {
                            var columnLength;
                            //Delete Column show for 3 and 33 user Id
                            if(readCookie("userID") == 3 || readCookie("userID") == 33){
                                columnLength = get_data_col.length;
                            }else{
                                columnLength = get_data_col.length-1;
                            }
                            for (var j = 0; j < columnLength; j++) {
                                console.log(get_data_col[j]);
                                if(get_data_col[j] == readCookie("userName").replace('+',' ')){
                                    htmls = htmls + "<td class='thismodeler'>";
                                    htmls = htmls + get_data_col[j];
                                    htmls = htmls + "</td>"
                                }
                                else {
                                    htmls = htmls + "<td>";
                                    htmls = htmls + get_data_col[j];
                                    htmls = htmls + "</td>"
                                }
                            }
                        }
                        htmls = htmls + "</tr>";
                    }
                    htmls = htmls + "</table>";
                    $jq("#votingDetail").html(htmls);
                });
        });
}
function Detail_Vote_with_Dinner(pkid){
    var voter = $jq('input[name=voter]');
    var sortVoteBy = voter.filter(':checked').val();
    //var go_path = "Employee_Switch_Person.php?action=Detail_Vote_with_dinner&vars=3&var1="+pkid+"&var2=" + sortVoteBy + "&var3=" + getCurrentDateFullFormat();
    var go_path = "Employee_Switch_Person.php?action=getActiveQuestionDate&vars=0";
    $jq.get(go_path,
        {}, function(data)
        {
            var askDate = data;
            var dayStatus;

            if(data == getCurrentDateFullFormat()){
                dayStatus = "Today";
            }
            else{
                dayStatus = "Previous";
            }

            var go_path = "Employee_Switch_Person.php?action=Detail_Vote_with_dinner&vars=3&var1=" + pkid + "&var2=" + sortVoteBy + "&var3=" + askDate;
            $jq.get(go_path,
                {}, function(data)
                {
                    if(data.length > 87){
                        var get_data_row = new Array();     // declare array
                        var get_data_row  = data.split('----//------');
                        htmls = "<div class='row'><div class='col-lg-8'><h3>Late Sitting Details with Dinner.</h3><table border=1>";
                        for(var i = 0; i< get_data_row.length-1; i++ )
                        {

                            htmls = htmls + "<tr>";
                            htmls = htmls + "<td>";
                            htmls = htmls + i;
                            htmls = htmls + "</td>";
                            var get_data_col = new Array();

                            get_data_col  = get_data_row[i].split(',');
                            if(get_data_col.length > 1){
                                for(var j = 0; j < get_data_col.length ; j++)
                                {
                                    if(get_data_col[j] == readCookie("userName").replace('+',' ')){
                                        htmls = htmls + "<td class='thismodeler'>";
                                        htmls = htmls + get_data_col[j];
                                        htmls = htmls + "</td>"
                                    }
                                    else {
                                        htmls = htmls + "<td>";
                                        htmls = htmls + get_data_col[j];
                                        htmls = htmls + "</td>"
                                    }

                                    //htmls = htmls + "<td>";
                                    //htmls = htmls + get_data_col[j];
                                    //htmls = htmls + "</td>";
                                }
                            }
                            htmls = htmls+"</tr>";
                        }
                        htmls = htmls + "</table></div>";

                        go_path = "Employee_Switch_Person.php?action=getDinnerDetail&vars=2&var1=" + pkid + "&var2=" + sortVoteBy;
                        $jq.get(go_path,
                            {
                            }, function(data)
                            {
                                var data = JSON.parse(data);
                                var secondHtml = "<div class='col-lg-4'><h3>Total Dinner Selection on Date: " + askDate + ", "+dayStatus+"</h3><table><tr><td>Dinner Item</td><td>Quantity</td></tr>";
                                var totalDinner = 0;
                                for(var i = 0; i< data.length; i++){
                                    if(data[i].dinnerName != null)
                                        secondHtml += "<tr><td>"+data[i].dinnerName+"</td><td>"+data[i].Total+"</td></tr>";
                                    if(data[i].dinnerName != "No Thanks")
                                        totalDinner += parseInt(data[i].Total);
                                }
                                secondHtml += "<tr><td>Total Dinner</td><td>"+totalDinner+"</td></tr></table></div>";
                                var finalHTML =  htmls + secondHtml;
                                $jq("#votingDetail").html(finalHTML);
                            })
                    }
                    else{
                        $jq("#votingDetail").html("<h5 class='text-primary'>Sorry, no data available yet.</h5>");
                    }
                });
        });
}
function deleteUserVoteEntry(questIdAndEmpId){

    var splitQuestIdAndEmpId = questIdAndEmpId.split("--");
    var questId = splitQuestIdAndEmpId[0];
    var empId = splitQuestIdAndEmpId[1];
    var go_path = "Employee_Switch_Person.php?action=deleteUserVoteEntry&vars=2&var1="+questId+"&var2="+empId;
    $jq.get(go_path,{},function(data){

        if(data == 1){
            Detail_Vote(questId);
        }
        else{
            alert("Error\nDeletion failed!")
        }
    })
}
function getEmployeeCount(){

    var go_path = "Employee_Switch_Person.php?action=getEmployeeCount&vars=0";
    $jq.get(go_path,{},function(data){

        var response = JSON.parse(data);
        var html = '<table class="table table-bordered"><tr><td colspan="' + response.length + 1 + '" class="text-center">Colour Codes, Designation & Production Total Employees</td></tr><tr>';
        var totalProductionEmployee = 0;
        for(var i = 0; i < response.length; i++){
            html += '<td class="fixed-width text-center" bgcolor="' + response[i].ColourCode + '">' + response[i].Category_Name + ' ('
            + response[i].totalEmployee+')</td>';
            totalProductionEmployee += parseInt(response[i].totalEmployee);
        }
        html += '<td class="fixed-width text-center bg-primary"> Total(' + totalProductionEmployee + ')</td></tr>';
        $jq(".employeCount").html(html);
    })
}
function rowhilight(){
    $jq('.hightlyRow').hover(function() {
        $jq(this).addClass('highlight');
    }, function() {
        $jq(this).removeClass('highlight');
    });
}
function VoteAnsOP(id,val){
    $jq('#'+id).html('	'+val);
}
function votingValueTrue(id){
    $jq('#'+id).prop('checked', true);
}
function Submit_Question(){
    alert("working")
    var html = $jq("#vote_html").html();
    var mainQueestion = $jq("#mainQueestion").html();
    var go_path = "Employee_Switch_Person.php?action=Submit_Question&vars=2&var1="+mainQueestion+"&var2="+html;
    $jq.get(go_path,
        {
        }, function(data)
        {
            //$jq("#chk").val(data);
            if(data == "")
                $jq("#ConformationMsg").html("Sucessfully Save");
            alert(data);
        });
}
function DetailEmpPgInfo(){
    $jq.get('Employee_Switch_Person.php?action=DetailEmpPgInfo&vars=0', function(data) {
        var get_data_row = new Array();     // declare array
        var get_data_row  = data.split('----//------');
        $jq("#dept").html( get_data_row[0]);
        $jq("#dept_category").html( get_data_row[1]);
    });
}
function DetailEmpInfo(){

    var id = $jq("#logoutThis").attr("name");
    var go_path = "Employee_Switch_Person.php?action=EditEmpDetail&vars=1&var1="+id;
    $jq.get(go_path,
        {
        }, function(data)
        {
            //$jq("#chk").val(data);
            var get_data = data.split(',');//2,2,,2013-09-18,2013-10-16
            $jq("#loginname").val( get_data[1]);
            $jq("#dept").val(get_data[2]);
            $jq("#desig").val(get_data[3]);

            //$jq("#chk").val(get_data[4]);
            $jq("#shift").val(get_data[4]);
            $jq("#dept_category").val(get_data[5]);
            $jq("#name").val( get_data[0]);
            if(get_data[6] == 1){
                $jq("#isActiveLogin").prop('checked',true);
            }
            else{
                $jq("#isActiveLogin").prop('checked',false);
            }

                //val( get_data[0]);isActiveLogin
        });
}
function MonthTotalContProj(tabParID){
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=MonthTotalContProj&vars=2&var1="+projID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            //$jq("#chk").val(data);
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#ProjectsPreviousDaysInfo").html(htmls);
        });
}
function MonthTotalContProjDateDetail(tabParID){
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        return false;
    }
    $jq("#ProjectsPreviousDaysInfo").html("<H3>Wait, Its takes time</H3>");
    var go_path = "Employee_Switch_Person.php?action=MonthTotalContProjDateDetail&vars=2&var1="+projID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            //$jq("#chk").val(data);
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#ProjectsPreviousDaysInfo").html(htmls);
        });
}
var projectAndTask = [], specificTaskTotalDaysSpent = [];
function ProjectWithTask(empId, empName, days, category, taskPk, task, taskTotal){
    this.empId = empId;
    this.empName = empName;
    this.days = days;
    this.category = category;
    this.taskArray  = [{
        taskId : taskPk,
        taskName : task,
        taskCount : taskTotal
    }];
}
function TotalTimeSpentOnTask(taskId, taskName, days){
    this.taskId = taskId,
        this.taskName = taskName,
        this.days = days;

}
function TotalTimeSpentOnTaskAdd(taskId, taskName, day){
    var obj = new TotalTimeSpentOnTask(taskId,taskName, day);
    specificTaskTotalDaysSpent.push(obj);
}
function ProjectWithTaskAdd(empId, empName, days, category, taskPk, task, taskTotal){
    var obj = new ProjectWithTask(empId, empName, days, category, taskPk, task, taskTotal);
    projectAndTask.push(obj);
}
/*Developer found my true passion in coding, database design */
var isShowFilterTask = true;
function filterTaskList(filterTaskBool){

    isShowFilterTask = filterTaskBool;
    var tabParID = $jq("#memberTotalDaysOnProjWithTask").closest('table').attr('id');
    memberTotalDaysOnProjWithTask(tabParID);
}
function memberTotalDaysOnProjWithTask(tabParID){
    projectAndTask = [];
    specificTaskTotalDaysSpent = [];
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
    if(projID <= 0){
        alert("Please select project first.");
        return;
    }
    var go_path = "Employee_Switch_Person.php?action=memberTotalDaysOnProjWithTask&vars=2&var1="+projID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var returnData = JSON.parse(data);
            if(returnData.length == 0){
                $jq("#ProjectsPreviousDaysInfo").html("Sorry, no record found of specified date!");
                return;
            }
            var empId = 0, index = 0;
            for(var i = 0; i < returnData.length; i++){
                if(empId == returnData[i].EmployeeNamePK){
                    index = projectAndTask.length - 1;

                    projectAndTask[index].days =  parseInt(projectAndTask[index].days) + parseInt(returnData[i].taskCount);
                    projectAndTask[index].taskArray.push({
                        taskId : returnData[i].TaskPK,
                        taskName : returnData[i].taskName,
                        taskCount : returnData[i].taskCount
                    });

                }
                else{
                    ProjectWithTaskAdd(returnData[i].EmployeeNamePK,
                        returnData[i].Employee_Name,
                        returnData[i].taskCount,
                        returnData[i].Category_Name,
                        returnData[i].TaskPK,
                        returnData[i].taskName,
                        returnData[i].taskCount);
                    /* projectAndTask[index].taskArray.push({
                     taskId : returnData[i].TaskPK,
                     taskName : returnData[i].taskName,
                     taskCount : returnData[i].taskCount
                     });*/

                    //..++index;
                }
                empId = returnData[i].EmployeeNamePK;

            }

            go_path = "Employee_Switch_Person.php?action=getProjectTaskNames&vars=0";
            $jq.get(go_path,{}, function(data){
                var returnData = JSON.parse(data);
                var tableHeaderData = ["S.No.",$jq("#" + tabParID).find('.ProjectName').find('.dmProjName option:selected').text(), "Days", "Category"];

                //Table header making - adding Project task name in array for latter use in header
                for(var i = 0; i < returnData.length; i++){
                    tableHeaderData.push(returnData[i].pk + "_" + returnData[i].taskName);
                    TotalTimeSpentOnTaskAdd(returnData[i].pk , returnData[i].taskName, 0);
                }

                var html = "<button onClick='filterTaskList(true)'>Filter Task</button><button onClick='filterTaskList(false)'>All Task</button>";
                html += "<table class='table table-hover'><tr>";

                //html for table header
                for(var i = 0; i < tableHeaderData.length; i++){
                    console.log(tableHeaderData[i]);
                    if(i > 3){//check that if task name have started then, only show its name not the primary key as tableHeaderData also container task
                        //name with key
                        html += "<td class='th task_" + tableHeaderData[i].split('_')[0] + "'>" + tableHeaderData[i].split('_')[1] +"</td>";
                    }
                    else {
                        html += "<td class='th task_" + tableHeaderData[i].split('_')[0] + "'>" + tableHeaderData[i] +"</td>";
                    }
                }
                var totalDays = 0;

                for(var i = 0; i < projectAndTask.length; i++){
                    totalDays += projectAndTask[i].days/2
                    html += "<tr>"+
                    "<td>" + (i+1) +"</td>"+//serial no.
                    "<td>" + projectAndTask[i].empName + "</td>" +
                    "<td>" + (projectAndTask[i].days/2) + "</td>" +
                    "<td>" + projectAndTask[i].category + "</td>";

                    var loopLastIndex = 4; // this variable will save the last position of k -loop in order to run it from the same last position
                    for(var j = 0; j < projectAndTask[i].taskArray.length; j++){
                        for(var k = loopLastIndex; k < tableHeaderData.length; k++) {
                            if (tableHeaderData[k].split('_')[0] == projectAndTask[i].taskArray[j].taskId) {
                                //html += "<td class=task_" + tableHeaderData[k].split('_')[0] + ">" + projectAndTask[i].taskArray[j].taskCount/2 + "</td>";
                                html += "<td >" + projectAndTask[i].taskArray[j].taskCount/2 + "</td>";
                                //for testing un comment it
                                //html += "<td>" + projectAndTask[i].taskArray[j].taskName + '_' + projectAndTask[i].taskArray[j].taskId + "</td>";
                                var l;
                                for(l = 0; l < specificTaskTotalDaysSpent.length; l++) {
                                    if (projectAndTask[i].taskArray[j].taskId == specificTaskTotalDaysSpent[l].taskId) {
                                        specificTaskTotalDaysSpent[l].days = specificTaskTotalDaysSpent[l].days + (projectAndTask[i].taskArray[j].taskCount / 2);
                                        break;
                                    }
                                }
                                if(specificTaskTotalDaysSpent.length == 0 || (l == specificTaskTotalDaysSpent.length)){//||

                                    TotalTimeSpentOnTaskAdd(projectAndTask[i].taskArray[j].taskId, tableHeaderData[k].split('_')[1], projectAndTask[i].taskArray[j].taskCount / 2);
                                }
                                loopLastIndex = ++k; //save the last position of array i.e., again start for next index
                                break;
                            }
                            else {
                                //html += "<td class='task_" +tableHeaderData[k].split('_')[0] + "'> </td>";
                                html += "<td ></td>";
                            }
                        }
                    }
                    html += "</tr>";
                }

                html +="</tr><tr class='bold'><td></td><td></td><td></td><td>Total</td>";
                for(var i = 0; i < specificTaskTotalDaysSpent.length; i++){
                    html += "<td class='task_" + specificTaskTotalDaysSpent[i].taskId + "'>" + specificTaskTotalDaysSpent[i].days + " </td>";
                }
                html +="</tr>";
                html +="</table>";

                $jq("#ProjectsPreviousDaysInfo").html(" ");
                $jq("#ProjectsPreviousDaysInfo").html(html);

                if(isShowFilterTask){
                    for(var i = 0; i < specificTaskTotalDaysSpent.length; i++){
                        if(specificTaskTotalDaysSpent[i].days <= 0 || specificTaskTotalDaysSpent[i].days == null){
                            $jq("td.task_"+specificTaskTotalDaysSpent[i].taskId).hide();
                            //hiding the speicifc header colum
                            $jq('tr').each(function(){
                                $jq(this).find('td:eq(' + $jq("td.task_"+specificTaskTotalDaysSpent[i].taskId).index()+")").hide();
                            });
                        }
                    }
                }
                //creating missing cell
                createMissCellsWithoutVisible("ProjectsPreviousDaysInfo");
            });
        });
}
function memberTotalDaysOnProj(tabParID){
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();

    if(!dateRng){
        //alert("Please select Date.");
        //return;
    }
    if(projID == "0")
    {
        alert ("Please Select the Project First");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=memberTotalDaysOnProj&vars=2&var1="+projID+"&var2="+dateRng;
    $jq("#ProjectsPreviousDaysInfo").html("Wait. . .");
    $body = $jq("body");
    $body.addClass("loading");//Show loading option
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(data.indexOf('xdebug-error') == -1){
                var get_data_row = new Array();     // declare array
                var get_data_row  = data.split('----//------');
                htmls = "<table class='table' style='width : auto;'>";
                for(var i = 0; i<get_data_row.length; i++ )
                {
                    htmls = htmls+"<tr>";
                    //alert ("row: "+get_data_row[i]);
                    var get_data_col = new Array();
                    get_data_col  = get_data_row[i].split(',');

                    for(var j = 0; j<get_data_col.length ; j++)
                    {
                        htmls = htmls+"<td>";

                        htmls = htmls + get_data_col[j];
                        htmls = htmls+"</td>";
                    }
                    htmls = htmls+"</tr>";
                    }
                htmls = htmls + "</table>";
                var go_path = "Employee_Switch_Person.php?action=OverTimeDetails&vars=2&var1="+projID+"&var2="+dateRng;
                $jq.get(go_path,
                    {
                    }, function(data)
                    {

                        var dataOutput = JSON.parse(data);
                        console.log(dataOutput);
                        var hour = 0;
                        var responseObjForHtml = [
                            {
                                hour: 6,
                                totalDays: 0
                            },
                            {
                                hour: 7,
                                totalDays: 0
                            },
                            {
                                hour: 8,
                                totalDays: 0
                            },
                            {
                                hour: 9,
                                totalDays: 0
                            },
                            {
                                hour: 10,
                                totalDays: 0
                            },
                            {
                                hour: 11,
                                totalDays: 0
                            }
                        ];

                        for(var j = 0; j < dataOutput.length; j++)
                        {
                            if(dataOutput[j].maxTime == 1){
                                responseObjForHtml[0].totalDays = dataOutput[j].TotalCount;
                            }
                            if(dataOutput[j].maxTime == 2){
                                responseObjForHtml[1].totalDays = dataOutput[j].TotalCount;
                            }
                            if(dataOutput[j].maxTime == 3){
                                responseObjForHtml[2].totalDays = dataOutput[j].TotalCount;
                            }
                            if(dataOutput[j].maxTime == 4){
                                responseObjForHtml[3].totalDays = dataOutput[j].TotalCount;
                            }
                            if(dataOutput[j].maxTime == 5){
                                responseObjForHtml[4].totalDays = dataOutput[j].TotalCount;
                            }
                            if(dataOutput[j].maxTime == 6){
                                responseObjForHtml[5].totalDays = dataOutput[j].TotalCount;
                            }
                        }
                        console.log(responseObjForHtml);
                        var html2 = "<h3>Over Time Details</h3><table class='table-bordered' ><tr><td>Time</td><td>6:00</td><td>7:00</td><td>8:00</td><td>9:00</td>" +
                            "<td>10:00</td><td>11:00</td></tr><tr><td>Total Days</td>";
                        for(var k = 0; k < responseObjForHtml.length; k++){
                            html2 += "<td>" + responseObjForHtml[k].totalDays + "</td>";
                        }






                        //for(var i = 0; i < dataOutput.length; i++){
                        //    if(dataOutput[i].maxTime == 1){
                        //        hour = 6;
                        //    }
                        //    else if(dataOutput[i].maxTime == 2){
                        //        hour = 7;
                        //    }
                        //    else if(dataOutput[i].maxTime == 3){
                        //        hour = 8;
                        //    }
                        //    else if(dataOutput[i].maxTime == 4){
                        //        hour = 9;
                        //    }
                        //    else if(dataOutput[i].maxTime == 5){
                        //        hour = 10;
                        //    }
                        //    else if(dataOutput[i].maxTime == 6){
                        //        hour = 11;
                        //    }
                        //    //html2 += "<td>"+ hour + "</td>"+
                        //    html2 += "<td>"+ dataOutput[i].TotalCount + "</td>"+
                        //    "</tr>";
                        //}
                        html2 += "</tr></table>";




                        /*var html2 = "<table><tr><td>Time</td><td>Total</td></tr>";

                        var hour = 0;
                        for(var i = 0; i < dataOutput.length; i++){
                            html2 += "<tr>";

                            if(dataOutput[i].maxTime == 1){
                                hour = 6;
                            }
                            else if(dataOutput[i].maxTime == 2){
                                hour = 7;
                            }
                            else if(dataOutput[i].maxTime == 3){
                                hour = 8;
                            }
                            else if(dataOutput[i].maxTime == 4){
                                hour = 9;
                            }
                            else if(dataOutput[i].maxTime == 5){
                                hour = 10;
                            }
                            else if(dataOutput[i].maxTime == 6){
                                hour = 11;
                            }
                            html2 += "<td>"+ hour + "</td>"+
                            "<td>"+ dataOutput[i].TotalCount + "</td>"+
                            "</tr>";
                        }
                        html2 += "</table>";*/
                        $body.removeClass("loading");//hiding loading option
                        $jq("#ProjectsPreviousDaysInfo").html(htmls + html2);
                    });

            }
            else{
                $body.removeClass("loading");//hiding loading option
                alert("Sorry! No data found.");
                $jq("#ProjectsPreviousDaysInfo").html("No record available");
            }
        });
}
function LoginDoubleEntry(){
    tabParID = "tbPerPersonDays";
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        return false;
    }
    $jq("#ProjectsDaysInfo").html("Working...\n have to wait long");
    var go_path = "Employee_Switch_Person.php?action=LoginDoubleEntry&vars=1&var1="+dateRng;
    $jq("#chk").val(go_path);
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');

            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');

                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td id='td"+i+""+j+"' contenteditable='true'>";
                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#ProjectsDaysInfo").html(htmls);
        }
    );
}
function updateError(text){
    alert("text: "+text);
}
function fnswitchingEmp(tabParID){
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var nameID =  $jq("#"+tabParID).find(".nameEmp").val();
    if(nameID == "0" )
    {
        alert ("Please Select the Person First");
        return false;
    }
    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=fnSwitchingEmp&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            //$jq("#chk").val(data);
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');

            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                //alert ("row: "+get_data_row[i]);
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');

                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";

            $jq("#ProjectsDaysInfo").html(htmls);
        });
}
function AllmodelerFree(tabParID){

    var nameID = $jq("#"+tabParID).find(".nameEmp").val();

    var dateRng = $jq("#"+tabParID).find(".date").val();

    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        return false;
    }

    var go_path = "Employee_Switch_Person.php?action=AllmodelerFree&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq("#chk").val(go_path);

    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');

            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#ProjectsDaysInfo").html(htmls);
        });
}
function AllmodelerNotAvaiable(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert ("Please Enter the Date Firstt");
        return false;
    }

    var go_path = "Employee_Switch_Person.php?action=AllmodelerNotAvaiable&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq("#chk").val(go_path);

    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#ProjectsDaysInfo").html(htmls);
        });
}
function makeStatusDaysDropDown(id, empDaysStatusData, switchPersonPK){
    var empDaysStatusDropDown = "<select class='statusList "+ switchPersonPK +" form-control'>";
    for(var i = 0; i < empDaysStatusData.length; i++){
        if(id == empDaysStatusData[i].id )
            empDaysStatusDropDown += "<option selected  value='"+empDaysStatusData[i].id +"'>"+empDaysStatusData[i].LeaveName+"</option>"
        else
            empDaysStatusDropDown += "<option  value='"+empDaysStatusData[i].id +"'>"+empDaysStatusData[i].LeaveName+"</option>"
    }
    empDaysStatusDropDown += "</select>";
    return empDaysStatusDropDown;
}
function AllmodelerNotAvaiableFilter(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert ("Validation Error\nPlease select  Date First!");
        return false;
    }

    var empDaysStatusData;
    go_path = "Server/EmpDayStatus.php?action=getAllEmpDaysStausName&vars=0";
    $jq.get(go_path,
        {
        }, function(data) {
            empDaysStatusData = JSON.parse(data);
        });

    var go_path = "Employee_Switch_Person.php?action=AllmodelerNotAvaiableFilter&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq("#chk").val(go_path);

    $jq.get(go_path,
        {
        }, function(data)
        {
            var empDaysStatusRecords = JSON.parse(data);
            if(empDaysStatusRecords.length !=0) {
                if (nameID != 0) {
                    htmls = "<table border = 1><caption class='text-center'>Date Range : " + dateRng + "</caption>";
                    htmls +="<tr>" +
                    "<td>S.No</td>" +
                    "<td>Employee Name</td>" +
                    "<td>Half</td>" +
                    "<td>Leave Type</td>" +
                    "<td>Leave Date</td>" +
                    "<td>Leave Count</td>" +
                    "</tr>";

                    var previousSwitchDate;
                    var indexCount = 1, leaveCount = 0;

                    for (var i = 0; i < empDaysStatusRecords.length; i++) {
                        if(empDaysStatusRecords[i].SwitchDate != previousSwitchDate){
                            htmls += "<tr><td>" + indexCount + "</td><td><a target='_blank' href=EmpDayStatus.php?switchDate="+empDaysStatusRecords[i].SwitchDate+"&empId="+empDaysStatusRecords[i].EmpId+">"+empDaysStatusRecords[i].Employee_Name+"</a></td><td>" + empDaysStatusRecords[i].Half + "</td>" +
                            "<td>" + empDaysStatusRecords[i].LeaveName + "<td>" + empDaysStatusRecords[i].SwitchDate + "</td>";
                            htmls += "<td>0.5</td>";
                            indexCount++;
                            //Don't include official off Count
                            if(empDaysStatusRecords[i].EmpDaysStatusId != 2){
                                leaveCount +=0.5;
                            }


                        }
                        else
                        {
                            htmls = htmls.substr(0, htmls.length - 12);
                            htmls += "<td>1</td></tr>";
                            //Don't include official off Count
                            if(empDaysStatusRecords[i].EmpDaysStatusId != 2){
                                leaveCount +=0.5;
                            }
                        }
                        previousSwitchDate = empDaysStatusRecords[i].SwitchDate;
                    }
                    //htmls = "<tr><td colspan='5'>Total Leaves</td><td>"+ leaveCount +"</td></tr>"
                    //+ "<tr><td colspan='5'>Total Leaves</td><td>"+ leaveCount +"</td></tr>"
                    htmls = htmls  + "<tr><td colspan='5'>Total Leaves</td><td>"+ leaveCount +"</td></tr>"+ "</table>";
                    htmls += "<input type='button' download='FileName' onclick=\"tableToExcel('ProjectsDaysInfo','Employee Off Sheet','"+empDaysStatusRecords[0].Employee_Name+" - "+dateRng +".xls')\" value='Export to Excel'>";
                    $jq("#ProjectsDaysInfo").html(htmls);
                }
                else {
                    htmls = "<table border = 1><caption class='text-center'>All Employees Leave Details </br>Date Range : " + dateRng + "</caption>";
                    htmls += "<tr>" +
                    "<td>S.No</td>" +
                    "<td>Employee Name</td>" +
                    "<td>Sick Leave</td>" +
                    "<td>Casual Leave</td>" +
                    "<td>Annual Leave</td>" +
                    "<td>Official Off</td>" +
                    "<td>Absent Days</td>" +
                    "</tr>";
                    for (var i = 0; i < empDaysStatusRecords.length; i++) {
                        htmls += "<tr><td>" + (i + 1) + "</td><td>" + empDaysStatusRecords[i].Employee_Name + "</td><td>" + empDaysStatusRecords[i].SickLeave + "</td>" +
                        "<td>" + empDaysStatusRecords[i].CasualLeave + "<td>" + empDaysStatusRecords[i].AnnualLeave + "</td>" +
                        "<td>" + empDaysStatusRecords[i].OfficialOFF + "<td>" + empDaysStatusRecords[i].TotalLeave + "</td>";
                        htmls += "</tr>";
                    }
                    htmls = htmls + "</table>";
                    htmls += "<input type='button' onclick=\"tableToExcel('ProjectsDaysInfo','All Employee Off Sheet','"+"All Employee - "+ dateRng +".xls')\" value='Export to Excel'>";
                    $jq("#ProjectsDaysInfo").html(htmls);
                }
            }
            else {
                alert("Sorry! No Data available");
            }
        });
}
function AllmodNotAvailDetail(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert ("Please Enter the Date Firstt");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=AllmodNotAvailDetail&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq("#chk").val(go_path);
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";

            $jq("#ProjectsDaysInfo").html(htmls);
        });
}

//Employee Progress Functions -- START//
function progressColorChange(that){

    //$jq("#"+that).parent(".progressColorGrade").css("display","none");
    //$jq("#that").css('display','none');
    //$jq("#that").css('color','red');
    //$jq('#'+that).children().

    $jq("#" + that).parent().children('.progressColorGrade').each(function(indx,obj){

        $jq(obj).children().css("display",'none');
        $jq(obj).css('background-color',"");
        $jq(obj).children().removeClass('update');
        //if(!$(this).children('div').is(":hidden")){
        //    imgVal =$(this).children('img').attr('val');
        //}
    });


    $jq('#'+that).children().css('display','block');

    var childStyle = $jq('#'+that).children().css("background-color");
    $jq('#'+that).css('background-color',childStyle);
    $jq('#'+that).children().addClass('update');

}
function employeeProgressUpdate(pDate){

    var empEfforts = [];
    var empRowsCount =  $jq(".empRows").length;
    var empEffortsAssignCount = $jq(".update").length;
    if(empRowsCount != empEffortsAssignCount)
    {
        alert("Validation Error!\nSome Employee's Effort assignment is missing.");
        return false;
    }
    var progressStatus;
    var  queryToSend = "hoursWorked = CASE PK"; whereClause = "WHERE PK IN (";
    $jq(".update").each(function() {
        var id = $jq(this).parent().attr("id");
        progressStatus = id.split("_");
        if(progressStatus.length == 3){
            queryToSend += " WHEN " + progressStatus[1] +" THEN " + progressStatus[2] +" ";
            queryToSend += " WHEN " + progressStatus[0] +" THEN " + progressStatus[2] +" ";
            whereClause += progressStatus[0] +", "+ progressStatus[1] +", ";
        }
        else {
            queryToSend += " WHEN " + progressStatus[0] +" THEN " + progressStatus[1] +" ";
            whereClause += progressStatus[0] +", ";
        }
    });
    var go_path = "Employee_Switch_Person.php?action=checkEmployeesEffortAddORNot&vars=1&var1= " + progressStatus[0];
    $jq.get(go_path,
        {
        }, function(data){
            console.log(data);
            if(data == "[]"){
                alert("Info\nEmployees efforts enteries have already made. You cannot do it again");
                window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
                return false;
            }
            else {
                queryToSend += " END ";
                whereClause = whereClause.substring(0, whereClause.length - 2);
                whereClause += ")";
                var partialQuery = queryToSend + whereClause;

                var go_path = "Employee_Switch_Person.php?action=empProgressAdd&vars=1&var1= " + partialQuery;
                $jq.get(go_path,
                    {}, function (data) {
                        if (data == 1) {
                            alert("Employee Efforts Updated Successfully!");
                            //checking that is there any employee efforts assignment is remaining or not. if remaing then redirect empProgress again else modeler page
                            var previousDate = new Date(pDate);
                            previousDate.setDate(previousDate.getDate() - 1);
                            var d = previousDate.getDate();
                            var m = previousDate.getMonth() + 1;
                            var y = previousDate.getFullYear();
                            var dateString = y + '-' + m + '-' + d;
                            if(dateString == "2015-6-23")
                            {
                                window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
                                return false;

                            }
                            var go_path = "Employee_Switch_Person.php?action=checkEmployeesEffortAddORNotByLastDate&vars=2&var1=" +
                                readCookie("userID") + "&var2=" + dateString;
                            $jq.get(go_path,
                                {}, function (data) {
                                    if (data == "[]") {
                                        window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
                                    }
                                    else {
                                        alert("REDIRECTING YOU Again! Some previous sub-ordinate's progress assignment is Missing please add.");
                                        window.location.replace("http://" + location.host + "/Employee_Switch_Persons/empProgress.php?dt=" + dateString);

                                    }

                                });
                        }
                        else {
                            alert("An Error Occur!");
                        }

                    });
            }

        });


}
function viewEmpProgressByDate(){
    var progressColors, colorHtml;
    var go_path = "Employee_Switch_Person.php?action=employeeProgressColor&vars=0";
    $jq.get(go_path,{},function(data){
        progressColors = JSON.parse(data);
    });
    var dateString = $jq('#empProgressViewDate').val();
    console.log(dateString);
    //if production manager is view then show team lead as well
    if(readCookie("userDesig") == 2 && readCookie("Cost_Department") == 3){
        go_path = "Employee_Switch_Person.php?action=viewEmpAndTeamLeadProgressByDate&vars=2&var1="+readCookie("userID")+"&var2="+dateString;
    }
    else
    {
        go_path = "Employee_Switch_Person.php?action=viewEmpProgressByDate&vars=2&var1="+readCookie("userID")+"&var2="+dateString;
    }
    $jq.get(go_path,
        {}, function(data)
        {
            if(data == "[]")
            {
                alert("Sorry\nNo Record found.");
                $jq("#displayProgress").html("");
                $jq("#btnExcelExport").html("");
                return false;
            }
            var parseData = JSON.parse(data);

            console.log(data);
            var recordId, tempId, projectId, empId;
            var dataToDisplay = "<table class='tableEmpEffort table table-bordered'> <caption class='bg-primary text-center'>Employee Efforts Sheet of Date: "+ parseData[0].SwitchDate +"</caption>";
            dataToDisplay += "<tr><td colspan='2' class='text-center'>Employee Presence</td><td class='text-center' colspan='4'>Employee Efforts</td></tr>" +
            "<tr><td>1<sup>st</sup> Half Presence</td><td>2<sup>nd</sup> Half Presence</td>" +
            "<td class='column-width'>Below </td><td  class='column-width'>Avg.</td><td class='column-width'>Good</td><td class='column-width'>Excel.</td></tr>";

            for(var i = 0; i < parseData.length;i++){

                if(projectId != parseData[i].PTPK){
                    dataToDisplay += "<tr><td colspan='8' class='text-center bg-primary'>"+parseData[i].Name+"</td></tr>";
                }

                if(parseData[i].Half == 1){

                    if((i+1) < parseData.length &&  parseData[i].PK == parseData[i+1].PK){
                        dataToDisplay += "<tr class='empRows'><td  id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" +
                        "<td id =" + parseData[i+1].swithPersonId + ">"+parseData[i+1].Employee_Name+"</td>" ;
                        for (var j = 0; j < progressColors.length; j++){
                            var id = parseData[i].swithPersonId + '_' + parseData[i+1].swithPersonId + '_' + progressColors[j].colorId;
                            if(progressColors[j].colorId == parseData[i].hoursWorked)
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" style="background-color:'+ progressColors[j].ColorCode +'"  id='+id+'><div style="display : block; background-color:'+ progressColors[j].ColorCode + '"></div></td>';
                            else
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'"  id='+id+'><div style="display : none; background-color:'+ progressColors[j].ColorCode + '"></div></td>';
                        }
                        dataToDisplay += "</tr>";
                        i++;
                    }
                    else {
                        dataToDisplay += "<tr class='empRows'><td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td><td></td>";
                        for (var k = 0; k < progressColors.length; k++){
                            var id = parseData[i].swithPersonId + '_' + progressColors[k].colorId;
                            if(progressColors[k].colorId == parseData[i].hoursWorked)
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" style="background-color:'+ progressColors[k].ColorCode +'"  id='+id+'><div style="display : block; background-color:'+ progressColors[k].ColorCode + '"></div></td>';
                            else
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'"  id='+id+'><div style="display : none; background-color:'+ progressColors[k].ColorCode + '"></div></td>';
                        }
                        dataToDisplay += "</tr>";
                    }
                }
                else {
                    dataToDisplay += "<tr class='empRows'><td></td>" +
                    "<td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" ;
                    for (var l = 0; l < progressColors.length; l++){
                        var id = parseData[i].swithPersonId + '_' + progressColors[l].colorId;
                        if(progressColors[l].colorId == parseData[i].hoursWorked)
                            dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" style="background-color:'+ progressColors[l].ColorCode +'"  id='+id+'><div style="display : block; background-color:'+ progressColors[l].ColorCode + '"></div></td>';
                        else
                            dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'"  id='+id+'><div style="display : none; background-color:'+ progressColors[l].ColorCode + '"></div></td>';
                    }
                    dataToDisplay += "</tr>";
                }
                if(i < parseData.length)
                    projectId = parseData[i].PTPK;
            }
            $jq("#btnExcelExport").html("<input type='button' onclick=\"tableToExcel('displayProgress', 'W3C Example Table')\" value='Export to Excel'>");
            $jq("#displayProgress").html(dataToDisplay);

        });
}
function viewEmpProgressBetweenDateCollectively(){
    var progressColors, colorHtml;
    var go_path = "Employee_Switch_Person.php?action=employeeProgressColor&vars=0";
    $jq.get(go_path,{},function(data){
        progressColors = JSON.parse(data);
    });
    var dateStartString = $jq('#empProgressViewDateStart').val();
    var dateEndString = $jq('#empProgressViewDateEnd').val();
    //console.log(dateString);
    var dateSave;
    go_path = "Employee_Switch_Person.php?action=viewEmpProgressBetweenDate&vars=2&var1="+dateStartString+"&var2="+dateEndString;
    $jq.get(go_path,
        {}, function(data)
        {
            if(data == "[]")
            {
                alert("Sorry\nNo Record found.");
                return false;
            }
            var parseData = JSON.parse(data);

            var ModNoArr = [];
            var ModNameArr = [];
            var ProjNoArr = [];
            var ProjNanmeArr = [];
            console.log(parseData);
            var get_data_row  = parseData;

            for(var i = 0; i<get_data_row.length; i++ )
            {
                var get_data_col = new Array();
                //get_data_col  = get_data_row[i];
                ProjNoArr[get_data_row[i].PTPK] =  get_data_row[i].Name; //get_data_col[1] : PTPK
                //ProjNanmeArr[get_data_col[1]] =  get_data_col[3]; //get_data_col[3] : Name
                //ModNoArr[get_data_col[0]] =  get_data_col[0] ;//get_data_col[1] : PTPK
                ModNameArr[get_data_row[i].PK] =  get_data_row[i].Employee_Name; //get_data_col[3] : Name
            }
            var dataToDisplay = "<table class='tableEmpEffort table table-bordered'> <caption class='bg-primary text-center'>Employee Efforts Sheet of Date: "+ parseData[0].SwitchDate +"</caption>";
            //dataToDisplay += "<tr><td>"+ +"</td></tr>";
            dataToDisplay += "<tr>";
            console.log(ProjNoArr.length);
            for(var i = 0; i<ProjNoArr.length; i++){
                if(ProjNoArr[i] !="Undefined")
                    dataToDisplay += "<td>"+ProjNoArr[i] +"</td>"
            }
            dataToDisplay += "</tr>";
            dataToDisplay += "<tr>";
            for(var i = 0; i < ModNameArr.length; i++){
                dataToDisplay += "<tr><td>"+ModNameArr[i] +"</td></tr>"
            }
            $jq("#displayProgress").html(dataToDisplay);
            /*
             console.log(data);
             var recordId, tempId, projectId, empId;
             var dataToDisplay = "<table class='tableEmpEffort table table-bordered'> <caption class='bg-primary text-center'>Employee Efforts Sheet of Date: "+ parseData[0].SwitchDate +"</caption>";
             dataToDisplay += "<tr><td colspan='2' class='text-center'>Employee Presence</td><td class='text-center' colspan='4'>Employee Efforts</td></tr>" +
             "<tr><td>1<sup>st</sup> Half Presence</td><td>2<sup>nd</sup> Half Presence</td>" +
             "<td>Below Avg.</td><td>Avg.</td><td>Good</td><td>Excellent.</td></tr>";

             for(var i = 0; i < parseData.length;i++){

             if(projectId != parseData[i].PTPK){
             dataToDisplay += "<tr><td colspan='8' class='text-center bg-primary'>"+parseData[i].Name+"</td></tr>";
             }
             //if(parseData[i].SwitchDate != dateSave)
             //    dataToDisplay += "<tr><td colspan='8' class='text-center bg-primary'>"+parseData[i].SwitchDate+"</td></tr>";
             if(parseData[i].Half == 1){
             if(parseData[i].PK == parseData[i+1].PK){
             dataToDisplay += "<tr class='empRows'><td  id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" +
             "<td id =" + parseData[i+1].swithPersonId + ">"+parseData[i+1].Employee_Name+"</td>" ;
             for (var j = 0; j < progressColors.length; j++){
             var id = parseData[i].swithPersonId + '_' + parseData[i+1].swithPersonId + '_' + progressColors[j].colorId;
             console.log(id);
             if(progressColors[j].colorId == parseData[i].hoursWorked)
             dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : block; background-color:'+ progressColors[j].ColorCode + '">-</div></td>';
             else
             dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[j].ColorCode + '">-</div></td>';
             }
             dataToDisplay += "</tr>";
             i++;
             }
             else {
             dataToDisplay += "<tr class='empRows'><td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td><td></td>";
             for (var k = 0; k < progressColors.length; k++){
             var id = parseData[i].swithPersonId + '_' + progressColors[k].colorId;
             console.log(id);
             //dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[k].ColorCode + '">-</div></td>';
             if(progressColors[k].colorId == parseData[i].hoursWorked)
             dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : block; background-color:'+ progressColors[k].ColorCode + '">-</div></td>';
             else
             dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[k].ColorCode + '">-</div></td>';
             }
             dataToDisplay += "</tr>";
             }
             }
             else {
             dataToDisplay += "<tr class='empRows'><td></td>" +
             "<td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" ;
             for (var l = 0; l < progressColors.length; l++){
             var id = parseData[i].swithPersonId + '_' + progressColors[l].colorId;
             console.log(id);
             //dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[l].ColorCode + '">-</div></td>';
             if(progressColors[l].colorId == parseData[i].hoursWorked)
             dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : block; background-color:'+ progressColors[l].ColorCode + '">-</div></td>';
             else
             dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[l].ColorCode + '">-</div></td>';
             }
             dataToDisplay += "</tr>";
             }
             if(i < parseData.length)
             projectId = parseData[i].PTPK;
             dateSave = parseData[i].SwitchDate;
             }
             //if($jq("#whiteboard_PreDate").html().length !=15)
             $jq("#btnExcelExport").html("<input type='button' onclick=\"tableToExcel('displayProgress', 'W3C Example Table')\" value='Export to Excel'>");
             $jq("#displayProgress").html(dataToDisplay);
             //*/
        });
}
function viewEmpProgressBetweenDate(){
    var progressColors, colorHtml;
    var go_path = "Employee_Switch_Person.php?action=employeeProgressColor&vars=0";
    $jq.get(go_path,{},function(data){
        progressColors = JSON.parse(data);
    });
    var dateStartString = $jq('#empProgressViewDateStart').val();
    var dateEndString = $jq('#empProgressViewDateEnd').val();
    var dateSave;
    go_path = "Employee_Switch_Person.php?action=viewEmpProgressBetweenDate&vars=2&var1="+dateStartString+"&var2="+dateEndString;
    $jq.get(go_path,
        {}, function(data)
        {
            if(data == "[]")
            {
                alert("Sorry\nNo Record found.");
                return false;
            }
            var parseData = JSON.parse(data);

            console.log(data);
            var recordId, tempId, projectId, empId;
            var dataToDisplay = "<table class='tableEmpEffort table table-bordered'> <caption class='bg-primary text-center'>Employee Efforts Sheet of Date: "+ parseData[0].SwitchDate +"</caption>";
            dataToDisplay += "<tr><td colspan='2' class='text-center'>Employee Presence</td><td class='text-center' colspan='4'>Employee Efforts</td></tr>" +
            "<tr><td>1<sup>st</sup> Half Presence</td><td>2<sup>nd</sup> Half Presence</td>" +
            "<td>Below Avg.</td><td>Avg.</td><td>Good</td><td>Excellent.</td></tr>";

            for(var i = 0; i < parseData.length;i++){

                if(projectId != parseData[i].PTPK){
                    dataToDisplay += "<tr><td colspan='8' class='text-center bg-primary'>"+parseData[i].Name+"</td></tr>";
                }
                //if(parseData[i].SwitchDate != dateSave)
                //    dataToDisplay += "<tr><td colspan='8' class='text-center bg-primary'>"+parseData[i].SwitchDate+"</td></tr>";
                if(parseData[i].Half == 1){
                    if(parseData[i].PK == parseData[i+1].PK){
                        dataToDisplay += "<tr class='empRows'><td  id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" +
                        "<td id =" + parseData[i+1].swithPersonId + ">"+parseData[i+1].Employee_Name+"</td>" ;
                        for (var j = 0; j < progressColors.length; j++){
                            var id = parseData[i].swithPersonId + '_' + parseData[i+1].swithPersonId + '_' + progressColors[j].colorId;

                            if(progressColors[j].colorId == parseData[i].hoursWorked)
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : block; background-color:'+ progressColors[j].ColorCode + '">-</div></td>';
                            else
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[j].ColorCode + '">-</div></td>';
                        }
                        dataToDisplay += "</tr>";
                        i++;
                    }
                    else {
                        dataToDisplay += "<tr class='empRows'><td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td><td></td>";
                        for (var k = 0; k < progressColors.length; k++){
                            var id = parseData[i].swithPersonId + '_' + progressColors[k].colorId;
                            console.log(id);
                            //dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[k].ColorCode + '">-</div></td>';
                            if(progressColors[k].colorId == parseData[i].hoursWorked)
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : block; background-color:'+ progressColors[k].ColorCode + '">-</div></td>';
                            else
                                dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[k].ColorCode + '">-</div></td>';
                        }
                        dataToDisplay += "</tr>";
                    }
                }
                else {
                    dataToDisplay += "<tr class='empRows'><td></td>" +
                    "<td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" ;
                    for (var l = 0; l < progressColors.length; l++){
                        var id = parseData[i].swithPersonId + '_' + progressColors[l].colorId;
                        console.log(id);
                        //dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[l].ColorCode + '">-</div></td>';
                        if(progressColors[l].colorId == parseData[i].hoursWorked)
                            dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : block; background-color:'+ progressColors[l].ColorCode + '">-</div></td>';
                        else
                            dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[l].ColorCode + '">-</div></td>';
                    }
                    dataToDisplay += "</tr>";
                }
                if(i < parseData.length)
                    projectId = parseData[i].PTPK;
                dateSave = parseData[i].SwitchDate;
            }
            //if($jq("#whiteboard_PreDate").html().length !=15)
            $jq("#btnExcelExport").html("<input type='button' onclick=\"tableToExcel('displayProgress', 'W3C Example Table')\" value='Export to Excel'>");
            $jq("#displayProgress").html(dataToDisplay);

        });
}
function EmployeeProgressAddList(dt){
    var progressColors, colorHtml;
    var previousDate = new Date();
    var date = previousDate.getDate();
    var month = previousDate.getMonth()+1;
    var year = previousDate.getFullYear();
    var dateString = year+"-"+month+"-"+date;
    if(typeof dt != 'undefined'){
        dateString = dt;
    }
    else
    {
        alert("Access denied!\nYou are not allowed to visit this page now.\nYou are redirecting to Home");
        window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
        return false;
    }

    var go_path = "Employee_Switch_Person.php?action=employeeProgressColor&vars=0";
    $jq.get(go_path,{},function(data){
        progressColors = JSON.parse(data);
    });

    //For Team Lead Progress Views
    //Display Team Lead Progress
    if(readCookie("userDesig") == 2 && readCookie("Cost_Department") == 3){
        go_path = "Employee_Switch_Person.php?action=teamLeadandEmployee&vars=2&var1="+readCookie("userID")+"&var2="+dateString;
    }
    else
    {
        go_path = "Employee_Switch_Person.php?action=employeeProgress&vars=2&var1="+readCookie("userID")+"&var2="+dateString;
    }


    $jq.get(go_path,
        {}, function(data)
        {
            if(data == "[]")
            {
                alert("Sorry\nNo Record found of Date " + dateString);
                return false;
            }
            var parseData = JSON.parse(data);

            console.log(data);
            var recordId, tempId, projectId, empId;
            var dataToDisplay = "<table class='tableEmpEffort table table-bordered'> <caption class='bg-primary text-center'>Employee Efforts Sheet of Date: "+ parseData[0].SwitchDate +"</caption>";
            dataToDisplay += "<tr><td colspan='2' class='text-center'>Employee Presence</td><td class='text-center' colspan='4'>Employee Efforts</td></tr>" +
            "<tr><td>1<sup>st</sup> Half Presence</td><td>2<sup>nd</sup> Half Presence</td>" +
            "<td class='column-width'>Below </td><td  class='column-width'>Avg.</td><td class='column-width'>Good</td><td class='column-width'>Excel.</td></tr>";
            //"<td class='column-width'>Below Avg.</td><td  class='col-lg-1'>Avg.</td><td class='col-lg-1'>Good</td><td class='col-lg-1'>Excellent.</td></tr>";

            for(var i = 0; i < parseData.length;i++){

                if(projectId != parseData[i].PTPK){
                    dataToDisplay += "<tr><td colspan='8' class='text-center bg-primary'>"+parseData[i].Name+"</td></tr>";
                }
                if(parseData[i].Half == 1){
                    if((i+1) <parseData.length && parseData[i].PK == parseData[i+1].PK){
                        dataToDisplay += "<tr class='empRows'><td  id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" +
                        "<td id =" + parseData[i+1].swithPersonId + ">"+parseData[i+1].Employee_Name+"</td>" ;
                        for (var j = 0; j < progressColors.length; j++){
                            var id = parseData[i].swithPersonId + '_' + parseData[i+1].swithPersonId + '_' + progressColors[j].colorId;
                            console.log(id);
                            dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[j].ColorCode + '"></div></td>';
                        }
                        dataToDisplay += "</tr>";
                        i++;
                    }
                    else {
                        dataToDisplay += "<tr class='empRows'><td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td><td></td>";
                        for (var k = 0; k < progressColors.length; k++){
                            var id = parseData[i].swithPersonId + '_' + progressColors[k].colorId;
                            console.log(id);
                            dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[k].ColorCode + '"></div></td>';
                        }
                        dataToDisplay += "</tr>";
                    }
                }
                else {
                    dataToDisplay += "<tr class='empRows'><td></td>" +
                    "<td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" ;
                    for (var l = 0; l < progressColors.length; l++){
                        var id = parseData[i].swithPersonId + '_' + progressColors[l].colorId;
                        console.log(id);
                        dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[l].ColorCode + '"></div></td>';
                    }
                    dataToDisplay += "</tr>";
                }
                if(i < parseData.length)
                    projectId = parseData[i].PTPK;
            }
            dataToDisplay += '</table><input type="button" id="EmployeeProgress" class="btn btn-primary" onclick="employeeProgressUpdate(\''+dt+'\')" value="Submit Efforts">';
            $jq("#displayProgress").html(dataToDisplay);
        });
}
function EmployeeProgress(){
    var previousDate = new Date();
    var date = previousDate.getDate();
    var month = previousDate.getMonth()+1;
    var year = previousDate.getFullYear();
    var dateString = year+"-"+month+"-"+date;
    var go_path = "Employee_Switch_Person.php?action=employeeProgress&vars=2&var1="+readCookie("userID")+"&var2="+dateString;
    $jq.get(go_path,
        {}, function(data)
        {
            var parseData = JSON.parse(data);
            console.log(data);
            var recordId, tempId, projectId, empId;
            var dataToDisplay = "<table class='tableEmpEffort table table-bordered'> <caption class='bg-primary text-center'>Employee Efforts Sheet of Date: "+ parseData[0].SwitchDate +"</caption>";
            dataToDisplay += "<tr><td>1<sup>st</sup> Half Presence</td><td>2<sup>nd</sup> Half Presence</td><td align='center' colspan='2'>1<sup>st</sup> Half and 2<sup>nd</sup> Half Efforts Division<small>(Automatic division)</small> </td>" +
            "<td>Input Efforts <small>(Range : 0 - 15)</small></td><td>24 Hours</td></tr>";

            for(var i = 0; i < parseData.length;i++){
                if(projectId != parseData[i].PTPK){
                    dataToDisplay += "<tr><td colspan='6' class='text-center bg-primary'>"+parseData[i].Name+"</td></tr>";
                }
                if(parseData[i].Half == 1){
                    if((i+1) < parseData.length && parseData[i].PK == parseData[i+1].PK){
                        dataToDisplay += "<tr><td  id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" +
                        "<td id =" + parseData[i+1].swithPersonId + ">"+parseData[i+1].Employee_Name+"</td>" +
                        "<td class='halfHours' id =firstHalf" + parseData[i].swithPersonId + "><input readonly type='text'/> </td>" +
                        "<td class='halfHours' id =secondHalf" + parseData[i+1].swithPersonId + "><input readonly type='text'/></td>" +
                        "<td id = firstHalf" + parseData[i].swithPersonId + "_secondHalf" + parseData[i+1].swithPersonId + "><input type='text' placeholder='Enter Hours' onchange='calculateHours(event,this.value)'></td>" +
                        "</tr>";
                        i++;
                    }
                    else {
                        dataToDisplay += "<tr><td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td><td></td>" +
                        "<td class='halfHours' id = firstHalf" + parseData[i].swithPersonId + "><input readonly type='text'/></td><td id = secondHalf></td>" +
                        "<td id = firstHalf"+parseData[i].swithPersonId+"_secondHalf><input type='text' placeholder='Enter Hours' onchange='calculateHours(event,this.value)'></td></tr>";
                        //i++;
                    }
                }
                else {
                    dataToDisplay += "<tr><td></td>" +
                    "<td id =" + parseData[i].swithPersonId + ">"+parseData[i].Employee_Name+"</td>" +
                    "<td id = firstHalf></td>" +
                    "<td class='halfHours' id = secondHalf" + parseData[i].swithPersonId + "><input readonly type='text'/></td>" +
                    "<td id = firstHalf_secondHalf"+parseData[i].swithPersonId +"><input type='text' placeholder='Enter Hours' onchange='calculateHours(event,this.value)'></td></tr>";
                    //i++;
                }
                if(i < parseData.length)
                    projectId = parseData[i].PTPK;
            }
            /**simple*/
            /*
             var recordId, tempId,projectId, empId;
             var dataToDisplay = "<table class='table-bordered'>";

             for(var i = 0; i < parseData.length; i++){
             if(projectId != parseData[i].PTPK){
             dataToDisplay += "<tr><td colspan='3' class='text-center bg-primary'>"+parseData[i].Name+"</td></tr>";
             }
             if(empId == parseData[i].PK){
             //dataToDisplay += "<tr><td>"+parseData[i].Employee_Name+"</td>";
             //dataToDisplay += "<td>both</td>";

             }else{
             dataToDisplay += "<tr><td>"+parseData[i].Employee_Name+"</td>";
             //dataToDisplay += "<td>"+parseData[i].Half+"</td>";
             }


             dataToDisplay += "<td ><span class='input-group-addon'><div class='input-group'>"+ parseData[i].Half +"</span><input type='text' class='form-control' id='"+parseData[i].swithPersonId+"'></td>";
             projectId = parseData[i].PTPK;
             empId = parseData[i].PK;
             }//*/

            /*
             var dataToDisplay = "<table class='table table-bordered'> <caption class='bg-primary text-center'>Employee Efforts Sheet of Date: "+ parseData[0].SwitchDate +"</caption>";
             dataToDisplay += "<tr><td>1<sup>st</sup> Half Presence</td><td>2<sup>nd</sup> Half Presence</td><td align='center' colspan='2'>1<sup>st</sup> Half and 2<sup>nd</sup> Half Efforts Division<small>(Automatic division)</small> </td>" +
             "<td>Input Efforts <small>(Range : 0 - 15)</small></td><td>24 Hours</td></tr>";
             var projectPK, half, empPK, increment = 0, recordId, tempId =[];
             for(var i = 0; i < parseData.length; i++){
             recordId = 'workedHours'+ parseData[i].swithPersonId ;
             tempId.push(parseData[i].swithPersonId);

             //project heading
             if(projectPK != parseData[i].PTPK){
             if(increment == 1) {
             dataToDisplay += "<td style='background-color: #000000; color: white'></td>";
             dataToDisplay += "<td><input type='text' width='50px' readonly id='workedHoursfirstHalf"+ tempId[0] + "'></td><td><input type='text' width='50px' readonly id='workedHoursSecondHalf"+ tempId[1] + "'></td>" +
             "<td><input type='text' width='50px' id='"+ recordId +"'onchange='calculateHours("+ recordId +")'></td><td><input type='checkbox' id="+recordId+"></td></tr>";
             dataToDisplay += "<tr class='bg-primary'><td colspan='6' align='center'>" + parseData[i].Name+"</td>";
             }
             else {
             dataToDisplay += "<tr class='bg-primary'><td  colspan='6' align='center'>" + parseData[i].Name+"</td>";
             }
             }
             //Employees Second Half Name
             if(empPK == parseData[i].PK){
             dataToDisplay += "<td>"+ parseData[i].Employee_Name + "</td>";
             dataToDisplay += "<td><input type='text' width='50px' readonly id='workedHoursfirstHalf"+ tempId[0] + "'></td><td><input type='text' width='50px' readonly id='workedHoursSecondHalf"+ tempId[1] + "'></td>" +
             "<td><input type='text' width='50px' id='"+ recordId +"'onchange='calculateHours("+ recordId +")'></td><td><input type='checkbox' id="+recordId+"></td></tr>";
             increment += 5;
             }
             //Employees First Half Name
             else {
             if(increment == 1){
             if(parseData[i].Half == 1){
             dataToDisplay += "<tr><td>@"+ parseData[i].Employee_Name + "</td>";
             dataToDisplay += "<td style='background-color: #000000; color: white'></td>";
             }
             else if(parseData[i].Half == 2){
             dataToDisplay += "<tr><td style='background-color: #000000; color: white'></td>";
             dataToDisplay += "<td>#"+ parseData[i].Employee_Name + "</td>";
             }
             dataToDisplay += "<td><input type='text' width='50px' readonly id='workedHoursfirstHalf"+ tempId[0] + "'></td><td><input type='text' width='50px' readonly id='workedHoursSecondHalf"+ tempId[1] + "'></td>" +
             "<td><input type='text' width='50px' id='"+ recordId +"'onchange='calculateHours("+ recordId +")'></td><td><input type='checkbox' id="+recordId+"></td></tr>";
             increment += 5;
             }
             else if(increment == 0) {
             if(parseData.length - 1 == i){
             if(parseData[i].Half == 1){
             dataToDisplay += "<tr><td>$"+ parseData[i].Employee_Name + "</td>";
             dataToDisplay += "<td style='background-color: #000000; color: white'></td>";
             }

             else if(parseData[i].Half == 2){
             dataToDisplay += "<tr><td style='background-color: #000000; color: white'></td>";
             dataToDisplay += "<td>%"+ parseData[i].Employee_Name + "</td>";
             }

             dataToDisplay += "<td><input type='text' width='50px' readonly id='workedHoursfirstHalf"+ tempId[0] + "'></td><td><input type='text' width='50px' readonly id='workedHoursSecondHalf"+ tempId[1] + "'></td>" +
             "<td><input type='text' width='50px' id='"+ recordId +"'onchange='calculateHours("+ recordId +")'></td><td><input type='checkbox' id="+recordId+"></td></tr>";
             increment++;
             }
             else {
             if(parseData[i].Half == 1){
             dataToDisplay += "<tr><td>^"+ parseData[i].Employee_Name + "</td>";
             }
             else if(parseData[i].Half == 2){
             dataToDisplay += "<td>*"+ parseData[i].Employee_Name + "</td>";
             }
             increment++;
             }
             }
             }
             if(increment == 6)
             increment = 0;

             if(tempId.length == 2){
             tempId = [];
             }

             empPK = parseData[i].PK;
             projectPK = parseData[i].PTPK;
             half = parseData[i].half;
             }
             //*/
            $jq("#displayProgress").html(dataToDisplay);
        });
}
function calculateHours(e, Hours){
    var parentNodeId = e.target.parentNode.id;
    var halfs =  [];
    halfs = parentNodeId.split("_");

    if(isNaN(Hours)){
        $jq('#' + parentNodeId).children().val("");
        $jq("#"+halfs[1]).children().val("");
        $jq("#"+halfs[0]).children().val("");
        $jq('#' + parentNodeId).children().focus();
        return false;
    }
    if(Hours < 0 || Hours >15)
    {
        alert("Validation Error\n Input Efforts are unbeliveable! Enter again.");
        $jq('#' + parentNodeId).children().val("");
        $jq("#"+halfs[1]).children().val("");
        $jq("#"+halfs[0]).children().val("");
        $jq('#' + parentNodeId).children().focus();
        return false;
    }
    //Checking If IDs have textboxes or not so that divide hours to halfs
    if(halfs[0].toString().length > 9 && halfs[1].toString().length > 10){
        if(Hours <= 4){
            $jq("#"+halfs[0]).children().val(Hours);
            $jq("#"+halfs[1]).children().val(0);
        }
        else if(Hours > 4 && Hours < 8){
            $jq("#"+halfs[0]).children().val(4);
            $jq("#"+halfs[1]).children().val(Hours-4);
        }
        else {
            var firstHalfHours = Hours/2;
            var secondHalfHours = firstHalfHours;
            if(firstHalfHours > 4){
                secondHalfHours += firstHalfHours - 4;
                firstHalfHours = 4;
            }
            $jq("#" + halfs[0]).children().val(firstHalfHours);
            $jq("#" + halfs[1]).children().val(secondHalfHours);
        }
    }
    else if(halfs[0].toString().length <= 9 && halfs[1].toString().length > 10){
        $jq("#" + halfs[1]).children().val(Hours);
    }
    else if(halfs[0].toString().length > 9 && halfs[1].toString().length <= 10){
        $jq("#" + halfs[0]).children().val(Hours);
    }
}
function selectEmpProgress(){
    var projectId = $jq(".dmProjName").val();
    var dateStart = $jq("#selectedDate").val();
    var dateEnd = $jq("#selectedDateEnd").val();

    //var month =
    var go_path = "Employee_Switch_Person.php?action=selectEmpProgress&vars=3&var1="+projectId+"&var2="+dateStart+"&var3="+dateEnd;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var html = "<table><tr><td>Employee Name</td></td></tr>";
            var empPK;
            var empProgressData = JSON.parse(data);
            for(var i = 0; i < empProgressData.length; i++){

                html += "<tr>" +
                "<td>"+ empProgressData[i].Employee_Name +"</td>"+
                "<td>"+ empProgressData[i].SwitchDate +"</td>"+
                "<td>"+ empProgressData[i].hoursWorked +"</td>"+
                "</tr>";
                /*
                 html += "<td>"+ empProgressData[i].SwitchDate +"</td>";
                 if(empProgressData[i].PK != empPK){
                 html += "<tr>"+
                 "<td>"+ empProgressData[i].Employee_Name +"</td>";

                 //+"</tr>"
                 }
                 */
                empProgressData[i].PK = empPK;
            }
            $jq("#displayDynamicData").html(html);
        });
}
function EmployeeProgressAdd(){
    var empEfforts = [];
    $jq(".halfHours").each(function(){
        var id = $jq(this).attr("id");
        var  text;
        if(id.indexOf('first')> - 1){
            text = id.replace('firstHalf','');
        }
        else{
            text = id.replace('secondHalf','');
        }

        empEfforts.push({recordId : text,
            hours : $jq(this).children().val()});
    });
    var queryToSend;
    //queryToSend = "hoursWorked = CASE WHEN 	PK = " + empEfforts[0].recordId +" THEN " + empEfforts[0].hours +" END";
    //for(var i = 1; i < empEfforts.length; i++)
    //{
    //    queryToSend += ", hoursWorked = CASE WHEN 	PK = " + empEfforts[i].recordId +" THEN " + empEfforts[i].hours +" END";
    //}
    queryToSend = "hoursWorked = CASE PK";
    for(var i = 0; i < empEfforts.length; i++)
    {
        queryToSend += " WHEN " + empEfforts[i].recordId +" THEN " + empEfforts[i].hours +" ";
    }
    queryToSend += " END";

    //for(var i = 0;i<updatedArray.length;i++){
    //    updatedArray.recordId = updatedArray.recordId.replace('secondHalf','');
    //}
    console.log(empEfforts);
    console.log(queryToSend);
    var go_path = "Employee_Switch_Person.php?action=empProgressAdd&vars=1&var1= " + queryToSend;
    $jq.get(go_path,
        {
        }, function(data)
        {
        });
}
function SinglePersonEfforts(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();   // 7
    if(nameID == "0" )
    {
        alert ("Please Select the Person First");
        return false;
    }
    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        return false;
    }

    var go_path = "Employee_Switch_Person.php?action=SinglePersonEfforts&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            SPEfforts = JSON.parse(data);

            var html = "<table border='1'><tbody>";
            html += "<tr>";
            html += "<th>Employee Name</th><th>Project Name</th><th>Marking</th><th>Half</th><th>Date</th>";
            html += "</tr>";

            var whr = 0;
            var whr_Itr = 0;
            for (var i = 0; i < SPEfforts.length; i ++)
            {
                if(SPEfforts[i].hoursWorked  != 0)
                {
                    html += "<tr><td>"+SPEfforts[i].Employee_Name +"</td><td>"+SPEfforts[i].Name +"</td><td style ='background-color :  "+SPEfforts[i].ColorCode+"  '>"+SPEfforts[i].hoursWorked +"</td><td>"+SPEfforts[i].Half +"</td><<td>"+SPEfforts[i].SwitchDate +"</td></tr>"
                    whr += parseInt(SPEfforts[i].hoursWorked);
                    whr_Itr += 1;
                }
            }
            var avg  = ( whr / whr_Itr)
            html += "<tr><td>Total </td><td> "+whr+" / "+whr_Itr+" </td> ";
            html += '<td style="background-color : '+ GetFloorUpto10Value(avg, 10) +  ' \"> ';
            html +=  avg +"</td><td></td><td></td></tr>"
            $jq("#ProjectsDaysInfo").html(html);
        });

}
function MonthlySheetWithEfforts(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        return false;
    }
    var ProgressColorArr = [];
    var go_path = "Employee_Switch_Person.php?action=GetProgresColor&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            ProgressColor = JSON.parse(data);

            for (var i = 0; i < ProgressColor.length; i++)
            {
                ProgressColorArr[ProgressColor[i].colorId] =  ProgressColor[i].ColorCode;
            }
        });

    var go_path = "Employee_Switch_Person.php?action=MonthlySheetWithEfforts&vars=2&var1=" + nameID + "&var2=" + dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var freeEmp = 40;
            var ProjName_Array = [];    // ["ProjName"]		// Contain Only Project name
            EmpObj = [];	        	// each element single object which has all Project information
            var EffortsObjects = JSON.parse(data);
            console.log("EffortsObjects : ");
            console.log(EffortsObjects);
            //for(var i = 0 ; i < EffortsObjects.length; i++){
               // if(EffortsObjects[i].PTPK == 0){
                 //   EffortsObjects[i].hoursWorked = freeEmp;
                //}
           // }

            for (var i = 0 ; i < EffortsObjects.length; i++)
            {
                var idx = ProjName_Array.indexOf(EffortsObjects[i].Name);
                if(idx == -1)
                {
                    ProjName_Array.push(EffortsObjects[i].Name);
                }
            }

            //Make Array Unique
            var ProjectNames =  ProjName_Array.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);

            for (var i = 0 ; i < EffortsObjects.length; i++)
            {
                for (var j = 0 ; j< ProjName_Array.length; j++)
                {
                    if( EmpObj[EffortsObjects[i].EmployeeNamePK] == null ){
                        EmpObj[EffortsObjects[i].EmployeeNamePK] = {"Employee_Name":""};
                    }

                    if(ProjName_Array[j] != null)
                    {
                       EmpObj[EffortsObjects[i].EmployeeNamePK][ProjName_Array[j]] = 0;
                        EmpObj[EffortsObjects[i].EmployeeNamePK][ProjName_Array[j] + "_Itr"] = 0;
                    }
                }
            }
            console.log("EmpObj 1:");
            console.log(EmpObj);
            for (var i = 0 ; i < EffortsObjects.length; i++)
            {
                EmpObj[EffortsObjects[i].EmployeeNamePK]["Employee_Name"] = EffortsObjects[i].Employee_Name;
                if(EffortsObjects[i].hoursWorked != 0)
               {
                    EmpObj[EffortsObjects[i].EmployeeNamePK][EffortsObjects[i].Name] += parseInt( EffortsObjects[i].hoursWorked);
                    EmpObj[EffortsObjects[i].EmployeeNamePK][EffortsObjects[i].Name + "_Itr"] += 1;
               }
            }
            console.log("EmpObj 2:");
            console.log(EmpObj);

            // now Dispay on page
            var html = "<table border='1'><tbody>";
            html += "<th>";
            for ( i = 1 ; i < ProjectNames.length ; i++)
            {
                html += "<td>" + ProjectNames[i] + "</td>";
            }
            html += "<td>TotalAvg</td>";
            html += "<td>Total</td>";
            html += "</th>" ;
            for ( i = 0 ; i < EmpObj.length; i++)
            {
                if(EmpObj[i] != null)
                {
                    html += "<tr>";
                    html += "<td>" + EmpObj[i].Employee_Name + "</td>";
                    var CountNonZeroHr = 0;
                    var TotalHoursRow = 0;
                    for (j = 1 ; j < ProjectNames.length ; j++)
                    {
                        var calcHr;
                        console.log(EmpObj[i][ProjectNames[j]]);

                        if(EmpObj[i][ProjectNames[j]] != 0)
                        {
                            console.log(EmpObj[i][ProjectNames[j]]);
                            console.log(EmpObj[i][ProjectNames[j]] / EmpObj[i][ProjectNames[j] + "_Itr"]);
                            calcHr = EmpObj[i][ProjectNames[j]] / EmpObj[i][ProjectNames[j] + "_Itr"];
                            CountNonZeroHr++;
                        }
                        //else if(EmpObj[i][ProjectNames[j]] == 0 && ProjectNames[j] == "Free" && EmpObj[i][ProjectNames[j] + "_Itr"] > 0) {
                         //   console.log(EmpObj[i][ProjectNames[j]]);
                         //   console.log(freeEmp *  (EmpObj[i][ProjectNames[j] + "_Itr"]/2));
                         //   calcHr = (freeEmp *  (EmpObj[i][ProjectNames[j] + "_Itr"]/2)/(EmpObj[i][ProjectNames[j] + "_Itr"]/2));
                         //   CountNonZeroHr++;
                       // }
                        else {
                            calcHr = EmpObj[i][ProjectNames[j]];
                        }

                        TotalHoursRow += calcHr;
                        if(calcHr > 0)
                            calcHr = calcHr.toFixed(2);

                        html += '<td style="background-color : '+ ProgressColorArr[GetFloorUpto10Value(calcHr, 10)] +  ' \">' + calcHr + "</td>"
                    }
                    var totalAvg;
                    if(TotalHoursRow != 0)
                        totalAvg =  TotalHoursRow / CountNonZeroHr ;
                    else
                        totalAvg = 0;
                    console.log(EmpObj[i].Employee_Name + "TotalHoursRow :"+ TotalHoursRow+ ", CountNonZeroHr:"+ CountNonZeroHr+ " : totalAvg : " + totalAvg);
                    console.log("totalAvg : " + totalAvg);

                    html += '<td style="background-color : '+ ProgressColorArr[GetFloorUpto10Value(totalAvg, 10)] +  ' \">' + totalAvg.toFixed(2) + "</td>"
                    html += '<td>' + TotalHoursRow.toFixed(3) + "</td>";
                    html += "</tr>";
                }
            }

            html += "</tbody></table>";
            $jq("#ProjectsDaysInfo").html(html);
        });

}
function truncate (num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}
function TotalDaysAndTaskAssigned(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var projectId = $jq("#"+tabParID).find(".dmProjName").val();
    if(nameID == 0) {
        var go_path = "Employee_Switch_Person.php?action=TotalDaysAndTaskAssigned&vars=3&var1=" + nameID + "&var2=" + dateRng + "&var3=" + projectId;
        $jq.get(go_path, {}, function (data) {
            var returnData = JSON.parse(data);
            if (returnData.length == 0) {
                $jq("#ProjectsDaysInfo").html("sorry no data found!");
                return;
            }
            var html = "<table id='TotalDaysAndTaskAssignedTable' class='sortable table table-hover'><thead><tr>" +
                "<th>S. No.</th>" +
                "<th>Employee Name</th>" +
                "<th>Progress</th>" +
                "<th>Total Project Days</th>" +
                "<th>Total Leaves Days</th>" +
                "<th>Total Free Days</th>" +
                "<th>Total Company Days</th>" +
                "</tr></thead><tbody>";
            for (var i = 0; i < returnData.length; i++) {
                html += "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + returnData[i].Employee_Name + "</td>" +
                "<td>" + truncate(returnData[i].empProgressPercentage,2) + "</td>" +
                "<td>" + truncate(returnData[i].TotalEmpProjectDays,1) + "</td>" +
                "<td>" + truncate(returnData[i].TotalLeaves, 1) + "</td>" +
                "<td>" + truncate(returnData[i].TotalFreeDays, 1) + "</td>" +
                "<td>" + truncate(returnData[i].TotalCompanyDays, 1)  + "</td>" +
                "</tr>"
            }
            html += "</tbody></table>";
            $jq("#ProjectsDaysInfo").html(html);
            load_js();
        })
    }
    else{
        TotalDaysAndTaskAssignedSpecificEmp(tabParID);

    }
}
function TotalDaysAndTaskAssignedSpecificEmp(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var projectId = $jq("#"+tabParID).find(".dmProjName").val();
    if(nameID == 0){
        alert("Name must be selected");
        return;

    }
    var go_path = "Employee_Switch_Person.php?action=TotalDaysAndTaskAssignedSpecificEmp&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path,{},function(data){
        var returnData = JSON.parse(data);
        console.log(returnData);
        if(returnData.length ==0){
            $jq("#ProjectsDaysInfo").html("sorry no data found!");
            return;
        }
        var html = "<table id='TotalDaysAndTaskAssignedSpecificEmpTable' class='sortable table table-hover'><thead><tr>" +
            "<th>S. No.</th>" +
            "<th>Employee Name</th>" +
            "<th>Progress</th>" +
            "<th>Project</th>" +
            "<th>Half</th>" +
            "<th>Date</th>" +
            //"<th>Total Company Days</th>" +
            "</tr></thead><tbody>";
        for(var i = 0; i < returnData.length; i++){
            html += "<tr>" +
            "<td>" + (i +1) + "</td>" +
            "<td>" + returnData[i].Employee_Name + "</td>" +
            "<td>" + returnData[i].hoursWorked + "</td>"+
            "<td>" + returnData[i].Name + "</td>" +
            "<td>" + returnData[i].Half + "</td>" +
            "<td>" + returnData[i].SwitchDate + "</td>" +
            //"<td>"+ returnData[i].TotalCompanyDays + "</td>"+
            "</tr>"
        }
        html += "</tbody></table>";
        html+= "<h3>Total</h3>";


        var go_path = "Employee_Switch_Person.php?action=TotalDaysAndTaskAssigned&vars=3&var1="+nameID+"&var2="+dateRng+"&var3="+projectId;
        $jq.get(go_path,{},function(data){
            var returnData = JSON.parse(data);
            if(returnData.length ==0){
                $jq("#ProjectsDaysInfo").html("sorry no data found!");
                return;
            }
             html += "<table id='TotalDaysAndTaskAssignedTable' class='table table-hover'><thead><tr>" +
                "<th>S. No.</th>" +
                "<th>Employee Name</th>" +
                "<th>Progress</th>" +
                "<th>Total Project Days</th>" +
                "<th>Total Leaves Days</th>" +
                "<th>Total Free Days</th>" +
                "<th>Total Company Days</th>" +
                "</tr></thead><tbody>";
            for(var i = 0; i < returnData.length; i++){
                html += "<tr>" +
                "<td>"+ (i+1)+"</td>" +
                "<td>"+ returnData[i].Employee_Name + "</td>" +
                "<td>" + truncate(returnData[i].empProgressPercentage,2) + "</td>" +
                "<td>" + truncate(returnData[i].TotalEmpProjectDays,1) + "</td>" +
                "<td>" + truncate(returnData[i].TotalLeaves, 1) + "</td>" +
                "<td>" + truncate(returnData[i].TotalFreeDays, 1) + "</td>" +
                "<td>" + truncate(returnData[i].TotalCompanyDays, 1)  + "</td>" +
                "</tr>";
            }
            html += "</tbody></table>";
            $jq("#ProjectsDaysInfo").html(html);
            load_js();
        })
    })
}
function load_js() {
    var head = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'js/sortableTableLib/sorttable.js';
    head.appendChild(script);
}
function GetFloorUpto10Value(number , multiplier){
    Number.round = function(number, multiplier){
        multiplier = multiplier || 1;
        return Math.floor(number / multiplier) * multiplier;
    };
    return Number.round(number, multiplier)
}
//Employees Progress Functions -- END//
function MonthlyCompensationSheet(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert("Please Enter  the Date First");
        return false;
    }
    var ModNoArr = [];
    var ModNameArr = [];
    var ProjNoArr = [];
    var ProjNanmeArr = [];
    var go_path = "Employee_Switch_Person.php?action=MonthlyCompensationSheet&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#chk").val(data);
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i < get_data_row.length; i++ )
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                ProjNoArr[get_data_col[1]] =  get_data_col[1]; //get_data_col[1] : PTPK //----//------,32,,Signaling PFA 1.6
                ProjNanmeArr[get_data_col[1]] =  get_data_col[3]; //get_data_col[3] : Name
                ModNoArr[get_data_col[0]] =  get_data_col[0] ;//get_data_col[1] : PTPK
                ModNameArr[get_data_col[0]] =  get_data_col[2]; //get_data_col[3] : Name

                console.log(get_data_col[0]);
                console.log(get_data_col[2]);
            }

            ProjNanmeArr[0] = "Not Avaiable";
            ProjNoArr = ProjNoArr.filter(Boolean);
            ModNameArr[0] = "Name / Projects";
            ModNoArr[0] = 0;
            ModNoArr = ModNoArr.filter(Boolean);
            htmls += "<table border=1 id='stripeTable'>";
            for (e = -1; e < ModNoArr.length; e++)
            {
                if(e == -1 )
                    htmls += "<tr class='ProjectName'>";
                else
                    htmls += "<tr class='hightlyRow'>";
                for (p = -1; p <ProjNoArr.length; p++ )
                {
                    if(e == -1 )
                    {
                        htmls += '<td  id='+e+'_'+p+'><p contenteditable="true">'+ProjNanmeArr[ProjNoArr[p]]+'</p></td>';
                    }
                    else
                    {
                        if(p == -1)
                        {
                            htmls += "<td contenteditable='true' id="+e+"_"+p+">"+ModNameArr[ModNoArr[e]]+"</td>";
                            console.log(ModNameArr[ModNoArr[e]]);
                        }
                        else
                            htmls += "<td class='proj '  id="+ModNoArr[e]+"_"+ProjNoArr[p]+">0</td>";
                        if(p == ProjNoArr.length-1)
                        {

                        }
                    }
                }
                htmls += "<td class='proj '></td>";
                htmls += "</tr>"
            }

            $jq("#ProjectsDaysInfo").html(htmls);

            htmls += "<tr class='totalColumn'>";
            for (p = -1; p <ProjNoArr.length + 1; p++ )  // +1 : nth col nth row
            {
                if(p == -1)
                    htmls += "<td >0</td>";
                else
                    htmls += "<td class='totalCol'>0</td>";
            }
            htmls += "</tr>"
            htmls += "</table>";
            $jq("#ProjectsDaysInfo").html(htmls);

            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                var  val = parseFloat( $jq("#"+get_data_col[0]+"_"+get_data_col[1]).text() );
                val += .5;//adding days
                $jq("#"+get_data_col[0]+"_"+get_data_col[1]).html(val);
            }

            SumRows();
            SumColumn();
            rowhilight();

        });
}
function MonthlySheet(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert("Please Enter  the Date First");
        return false;
    }
    var ModNoArr = [];
    var ModNameArr = [];
    var ProjNoArr = [];
    var ProjNanmeArr = [];
    var go_path = "Employee_Switch_Person.php?action=MonthlySheet&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            //console.log(data);
            $jq("#chk").val(data);
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i < get_data_row.length; i++ )
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                ProjNoArr[get_data_col[1]] =  get_data_col[1]; //get_data_col[1] : PTPK //----//------,32,,Signaling PFA 1.6
                ProjNanmeArr[get_data_col[1]] =  get_data_col[3]; //get_data_col[3] : Name
                ModNoArr[get_data_col[0]] =  get_data_col[0] ;//get_data_col[1] : PTPK
                ModNameArr[get_data_col[0]] =  get_data_col[2]; //get_data_col[3] : Name
            }
            ProjNanmeArr[0] = "Not Avaiable";
            ProjNoArr = ProjNoArr.filter(Boolean);
            ModNameArr[0] = "Name / Projects";
            ModNoArr[0] = 0;
            ModNoArr = ModNoArr.filter(Boolean);
            htmls += "<table border=1 id='stripeTable'>";
            for (e = -1; e < ModNoArr.length; e++)
            {
                if(e == -1 )
                    htmls += "<tr class='ProjectName'>";
                else
                    htmls += "<tr class='hightlyRow'>";
                for (p = -1; p <ProjNoArr.length; p++ )
                {
                    if(e == -1 )
                    {
                        htmls += '<td  id='+e+'_'+p+'><p contenteditable="true">'+ProjNanmeArr[ProjNoArr[p]]+'</p></td>';
                    }
                    else
                    {
                        if(p == -1)
                        {
                            htmls += "<td contenteditable='true' id="+e+"_"+p+">"+ModNameArr[ModNoArr[e]]+"</td>";
                        }
                        else
                            htmls += "<td class='proj '  id="+ModNoArr[e]+"_"+ProjNoArr[p]+">0</td>";
                        if(p == ProjNoArr.length-1)
                        {

                        }
                    }
                }
                htmls += "<td class='proj '></td>"
                htmls += "</tr>"
            }

            $jq("#ProjectsDaysInfo").html(htmls);

            htmls += "<tr class='totalColumn'>";
            for (p = -1; p <ProjNoArr.length + 1; p++ )  // +1 : nth col nth row
            {
                if(p == -1)
                    htmls += "<td >0</td>";
                else
                    htmls += "<td class='totalCol'>0</td>";
            }
            htmls += "</tr>"
            htmls += "</table>";
            $jq("#ProjectsDaysInfo").html(htmls);

            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                var get_data_col = new Array();
                //console.log(get_data_col);
                get_data_col  = get_data_row[i].split(',');
                //console.log(get_data_col);
                //console.log(get_data_col[0]);
                //console.log(get_data_col[1]);
                var  val = parseFloat( $jq("#"+get_data_col[0]+"_"+get_data_col[1]).text() );
                //console.log(val);
                val += .5;//adding days
                $jq("#"+get_data_col[0]+"_"+get_data_col[1]).html(val);
                //console.log(val);
            }
            //*
            SumRows();
            SumColumn();
            rowhilight();
            //*/
        });
}
function SumRows(){	// sum of rows
    var colValues = 0;
    $jq('#stripeTable > tbody > tr').each(function(i){
        colValues = 0;
        $jq('#stripeTable > tbody > tr:nth-child('+(i+1)+')>td').each(function(j){
            var cell = $jq('#stripeTable > tbody > tr:nth-child('+(i+1)+')>td:eq('+(j+3)+')').html();
            cell = parseFloat(cell);
            if(($jq.isNumeric(cell)))
                colValues += cell;
        });

        //if (i == -1)
        if (i == 0)
            $jq('#stripeTable > tbody > tr:nth-child('+(i+1)+') >td:last-child').text("Total");
        else
            $jq('#stripeTable > tbody > tr:nth-child('+(i+1)+') >td:last-child').text(colValues)
    });
}
function SumColumn(){
    var totals = [];
    var $jqdataRows=$jq("#stripeTable tr:not('.ProjectName, .totalColumn')");

    $jqdataRows.each(function() {
        $jq(this).find('.proj').each(function(i){
            var cell = $jq(this).html();
            cell = parseInt(cell);
            if(($jq.isNumeric(cell)))
            {
                if(totals[i] == null )
                {
                    totals[i] = 0;
                    totals[i]+=cell;
                }
                else
                    totals[i]+=cell;
            }
        });
    });
    $jq("#stripeTable td.totalCol").each(function(i){
        $jq(this).html(totals[i]);
    });
}
function AllmodelerProjects(tabParID){
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert ("Please Enter  the Date First");
        $jq("#ProjectsDaysInfo").html("--------------Please Enter  the Date First-----------------");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=AllmodelerProjects&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq("#chk").val(go_path);

    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";

            $jq("#ProjectsDaysInfo").html(htmls);
        });
}
function ProjectsDaysSummary(tabParID){
    var dateRng = $jq("#"+tabParID).find(".date").val();
    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
    if(projID == "0")
    {
        alert ("Please Select the Project First");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=ProjectsDaysSummary&vars=2&var1="+projID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";

                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";

            $jq("#ProjectsPreviousDaysInfo").html(htmls);
        }
    );
}
function hourCalc(){
    var dateRng = $jq("#date").val();
    var tabParID  = "tblogindetail";
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var go_path = "Employee_Switch_Person.php?action=logindetail&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path, {}, function(data)
    {
        var get_data_row = new Array();     // declare array
        var get_data_row  = data.split('----//------');
        htmls = "<table border=1>";
        for(var i = 0; i<get_data_row.length; i++ )
        {
            htmls = htmls+"<tr>";
            var get_data_col = new Array();
            get_data_col  = get_data_row[i].split(',');

            for(var j = 0; j<get_data_col.length ; j++)
            {
                htmls = htmls+"<td>";
                htmls = htmls + get_data_col[j];
            }
            htmls = htmls+"</tr>";
        }	  htmls = htmls+"</td>";
        htmls = htmls + "</table>";
        $jq("#LoginDetailInfo").html(htmls);
    });
}
function lastEntry(){
    var dateRng = $jq("#date").val();
    var tabParID  = "tblogindetail";
    var nameID 	= $jq("#"+tabParID).find(".nameEmp").val();
    var go_path = "Employee_Switch_Person.php?action=lastEntry&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[j];
                }
                htmls = htmls+"</tr>";
            }	  htmls = htmls+"</td>";
            htmls = htmls + "</table>";
            $jq("#LoginDetailInfo").html(htmls);
        }
    );
}
function logindetail(){
    var dateRng = $jq("#date").val();
    var tabParID  = "tblogindetail";
    var nameID 	= $jq("#"+tabParID).find(".nameEmp").val();
    var go_path = "Employee_Switch_Person.php?action=logindetail&vars=2&var1="+nameID+"&var2="+dateRng;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');

            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                //alert ("row: "+get_data_row[i]);
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');

                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[j];
                }
                htmls = htmls+"</tr>";
            }	  htmls = htmls+"</td>";
            htmls = htmls + "</table>";
            $jq("#LoginDetailInfo").html(htmls);
        }
    );
}
function fn_emp_resign_fire(){
    var id = $jq("#logoutThis").attr("name");
    if(confirm("Are you sure to deactive this employee?")){
    var go_path = "Employee_Switch_Person.php?action=fn_emp_resign_fire&vars=1&var1="+id;
    $jq.get(go_path,
        { }, function(data)
        { });
    }
}
function AddEmployee(){
    var name = $jq.trim($jq("#name").val());
    var logname = $jq.trim($jq("#loginname").val());
    var pass = $jq("#password").val();
    var dept=  $jq("#dept").val();
    var desig=  $jq(".desigName").val();
    if(($jq.trim(name) == "") || ($jq.trim(logname) == "") || ($jq.trim(pass) == ""))
    {
        alert ("Fill all recored");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=AddPerson&vars=5&var1="+name+"&var2="+logname+"&var3="+pass+"&var4="+dept+"&var5="+desig; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#result").text(data);
        });
}
function ProjectTaskAdd(){
    var taskName = $jq("#name").val();
    if(taskName == "" || !isNaN(taskName)){
        $jq("#result").text("Enter Valid text");
        //$jq("#name").
        return;
    }
    var go_path = "Employee_Switch_Person.php?action=ProjectTaskAdd&vars=1&var1='"+taskName+"'";
    $jq.get(go_path, {},function(data){
        console.log(data)
        $jq("#result").text("Added Successfully.");
        getAllProjectTask();
    });
}
function projectTaskUpdate(id){
    var taskName = $jq("#task_" + id).text();
    console.log(taskName);
    if(taskName == "" || !isNaN(taskName)){
        $jq("#result").text("Enter Valid text.");
        //$jq("#name").
        return;
    }
    var go_path = "Employee_Switch_Person.php?action=projectTaskUpdate&vars=2&var1=" + id + "&var2='"  +taskName+"'";
    $jq.get(go_path, {},function(data){
        console.log(data)
        if(data != 1 ){
            alert("Unexpected error occur: "+ data);
        }
        //alert(data);
        //$jq("#result").text("Added Successfully.");
        getAllProjectTask();
    });
}
function addProjectTask(){
    var taskName = $jq("#name").val();
    var go_path = "Employee_Switch_Person.php?action=ProjectTaskAdd&vars=1&var1='"+taskName+"'";
    $jq.get(go_path, {},function(data){
        console.log(data)
        $jq("#result").text("Added Successfully.");
    });
}
function switchWhenAllow(){
    var tabParID = "tbAllowProj";
    //var nameID = $jq(this).val();
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();   // 7
    if(nameID == "0" )
    {
        alert ("Please Select the Person First");
        return false;
    }
    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
    var go_path = "Employee_Switch_Person.php?action=SwitchEmp&vars=2&var1="+nameID+"&var2="+projID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
    $jq("#chk").val(go_path);
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(data == "done")
                alert("Switching Successfull");

            if(data == "You are not allow to switch to free")
                alert("You are not allow to switch your self to free");
            whiteboardfnCallingRepeatly();
        });
    empProjList("tbSwitchPerson");
    $jq("#tbSwitchPerson").find('.ProjectName').find('.dmProjName').val(projID);
}
function designation(){
    var go_path = "Employee_Switch_Person.php?action=designationName&vars=0"; //33 is omer bahi id
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#desig").html(data);
        });
}
function Department(){
    var go_path = "Employee_Switch_Person.php?action=DepartmentName&vars=0"; //33 is omer bahi id
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#dept").html(data);
        });
}
function allEmployeeNames(){
    var go_path = "Employee_Switch_Person.php?action=allEmployeeNames&vars=0"; //33 is omer bahi id
    $jq.get(go_path,
        {}, function(data)
        {
            //$jq("#chk").val(data);
            $jq(".nameEmp").html(data);  //employee name from employee table
        });
}
function getPersonNameAndProjectNameWithRestriction(){

    var go_path;
    if(+readCookie("permission_memberNames")){
        go_path = "Employee_Switch_Person.php?action=dmProjName&vars=1&var1="+33;
        $jq.get(go_path,
            {
            }, function(data)
            {

                var get_data = new Array();     // declare array
                var get_data = data.split('----//------'); // get_data is data comming from php file
                $jq(".nameEmpToSwitch").html(get_data[0]);  //employee name from employee table
                $jq(".ProjectNameWhereToSwitch").html(get_data[1]);  // project name from project table

            });
    }
    else if(+readCookie("permission_selfCategoryList")){
        go_path = "Employee_Switch_Person.php?action=getProjectAndEmpListForNonTeamLead&vars=0";
        $jq.get(go_path,
            {
            }, function(data)
            {
                var get_data = new Array();     // declare array
                var get_data = data.split('----//------'); // get_data is data comming from php file
                $jq(".nameEmpToSwitch").html(get_data[0]);  //employee name from employee table
                $jq(".ProjectNameWhereToSwitch").html(get_data[1]);  // project name from project table

            });
    }
    else{
        go_path = "Employee_Switch_Person.php?action=getTeamLeadProjectAndEmployee&vars=1&var1="+1;
        $jq.get(go_path,
            {
            }, function(data)
            {

                var get_data = new Array();     // declare array
                get_data = data.split('----//------'); // get_data is data comming from php file
                $jq(".nameEmpToSwitch").html(get_data[0]);  //employee name from employee table
                $jq(".ProjectNameWhereToSwitch").html(get_data[1]);  // project name from project table
            });
    }






}
function getProjectTaskNames(){
    go_path = "Employee_Switch_Person.php?action=getProjectTaskNames&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(JSON.parse(data).length == 0){
                console.log(data);
                return data;
            }
            else{
                var dataToAppend
                dataToAppend = "<select name='ProjTaskName' class='ProjTaskName form-control'>"
                dataToAppend += "<option value='0'>Select Task</option>";


                //console.log(" " + data);
                dataParse = JSON.parse(data);

                for (var i=0; i< dataParse.length; i++)
                {
                    //console.log(dataParse[i]);
                    dataToAppend += "<option value=" + dataParse[i].pk + ">" + dataParse[i].taskName + "</option>";

                }
                dataToAppend +="</select>"
                $jq(".projectTaskList").html(dataToAppend);
                return dataParse;
            }
        });
}
function getPersonNameAndProjectName(){
    var go_path = "Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1="+33; //33 is omer bahi id
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data = new Array();     // declare array
            get_data = data.split('----//------'); // get_data is data comming from php file
            $jq(".nameEmp").html(get_data[0]);  //employee name from employee table
            $jq(".ProjectName").html(get_data[1]);  // project name from project table
        });
}
function getOwnPersonNames(){
    //var go_path = "Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1="+33; //33 is omer bahi id
    //$jq.get(go_path,
    //    {
    //    }, function(data)
    //    {
    //        var get_data = new Array();     // declare array
    //        get_data = data.split('----//------'); // get_data is data comming from php file
    //        $jq(".nameEmp").html(get_data[0]);  //employee name from employee table
    //       // $jq(".ProjectName").html(get_data[1]);  // project name from project table
    //    });

    var go_path = "Employee_Switch_Person.php?action=getTeamLeadProjectAndEmployee&vars=1&var1="+1;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data = new Array();     // declare array
            get_data = data.split('----//------'); // get_data is data comming from php file
            $jq(".nameEmp").html(get_data[0]);  //employee name from employee table
            //$jq(".ProjectNameWhereToSwitch").html(get_data[1]);  // project name from project table
        });
}
function loginAll(){
    var go_path = "login.php?action=loginAll&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            refreshPage();
        });
}
function logoutAll(){
    var go_path = "login.php?action=logoutAll&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            whiteboardfnCallingRepeatly();
        });
}
function empProjList(tabParID){
    if(tabParID == "tbChkAllowProj" || tabParID == "tbAllowProj") // verify the allow projects
    {
        var nameID =  $jq("#"+tabParID).find(".nameEmp").val();
        if(nameID == "0" )
        {
            alert ("Please Select the Person First");
            return false;
        }
        var go_path = "Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1="+nameID;
        $jq.get(go_path,
            {
            }, function(data)
            {
                var get_data = new Array();     // declare array
                var get_data = data.split('----//------'); // get_data is data comming from php file
                if(tabParID == "tbChkAllowProj")
                    $jq("#"+tabParID).find(".ProjectName").html(get_data[1]);  // project name from project table
                if(tabParID == "tbAllowProj")	// bc at the time switch we know the allow projects
                {
                    $jq("#tbSwitchPerson").find(".nameEmp").val(nameID);
                    $jq("#tbSwitchPerson").find('.ProjectName').html(get_data[1]); // hide for allowEmpProj list also
                }
            }
        );
    }
    else
    {
        var nameID =  $jq("#"+tabParID).find(".nameEmp").val();
        if(nameID == "0" )
        {
            alert ("Please Select the Person First");
            return false;
        }
        var go_path = "Employee_Switch_Person.php?action=GetProjName&vars=1&var1="+nameID;
        $jq.get(go_path,
            {
            }, function(data)
            {
                data = data.split( "----//------");
                if(data.length == 1)	// only return currenbt poject number
                    $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val(data[0]); // hide due to change multiple location
                else // also refresh list of allow project selected person
                {
                    $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').html(data[1]);
                    $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val(data[0]);
                }
            }
        );
    }
}
function RunningProjectsStatus(){
    var htmls ;
    var go_path = "Employee_Switch_Person.php?action=RunningProjectsStatus&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                if(i == 0)
                {
                    htmls = htmls+"<tr>";
                    //alert ("row: "+get_data_row[i]);
                    var get_data_col = new Array();
                    get_data_col  = get_data_row[i].split(',');
                    for(var j = 0; j<get_data_col.length ; j++)
                    {
                        //htmls = htmls+"<th data-sort='string'>";
                        htmls = htmls+"<th data-sort='int'>";

                        htmls = htmls + get_data_col[j];
                        htmls = htmls+"</th>";
                    }
                    htmls = htmls+"</tr>";
                }
                else
                {
                    htmls = htmls+"<tr>";
                    //alert ("row: "+get_data_row[i]);
                    var get_data_col = new Array();
                    get_data_col  = get_data_row[i].split(',');
                    for(var j = 0; j<get_data_col.length ; j++)
                    {
                        htmls = htmls+"<td>";

                        htmls = htmls + get_data_col[j];
                        htmls = htmls+"</td>";
                    }
                    htmls = htmls+"</tr>";
                }
            }
            htmls = htmls + "</table>";
            $jq("#projStatusTB").html(htmls);
        });
}
function getpermissions(){
    var go_path = "Employee_Switch_Person.php?action=getPermissions&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
        });
}
function testing() {
    var go_path = "Employee_Switch_Person.php?action=testing&vars=0";
    $jq.get(go_path,
        {}, function (data) {
            //$jq("#chk").val(data);
        });
}
function getPerDay(){
    var tabParID = "tbPerPersonDays";
    var nameID =  $jq("#"+tabParID).find(".nameEmp").val();
    if(nameID == "0" )
    {
        alert ("Please Select the Person First");
        return false;
    }
    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
    if(projID == "0")
    {
        alert ("Please Select the Project First");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=GetPerDay&vars=2&var1="+nameID+"&var2="+projID;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#ProjectsDaysInfo").html(htmls);
        }
    );
}
function allUnFinishProject(){
    var go_path = "Employee_Switch_Person.php?action=allUnFinishProject&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#tbUpdProj").find('.ProjectName').html(data);
        });
}
function projStatus(){
    var projStatusID = $jq("#tbprojStatus").find('.projStatus').val();
    var htmls ;
    var go_path = "Employee_Switch_Person.php?action=projStatus&vars=1&var1="+projStatusID;
    $jq.get(go_path,
        {
        }, function(data)
        {
            var get_data_row = new Array();     // declare array
            var get_data_row  = data.split('----//------');
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
                htmls = htmls+"<tr>";
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                for(var j = 0; j<get_data_col.length ; j++)
                {
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[j];
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#projStatusTB").html(htmls);
            GetProject_ModeOptions();
        }


    );
}
function updateProjectInfo(projID, projStatusID, projModeID){
    if(typeof projID == 'undefined', typeof projStatusID == 'undefined', typeof projModeID == 'undefined'){
        var projID = $jq("#tbUpdProj").find('.dmProjName').val();
        var projStatusID = $jq("#tbUpdProj").find('.projStatus').val();
        var projModeID = $jq("#tbUpdProj").find('.projMode').val();
        //var today = new Date();
        //today = getStringDate(today);
    }

    var go_path = "Employee_Switch_Person.php?action=updateProjectInfo&vars=3&var1="+projID+"&var2=" +projStatusID + "&var3=" + projModeID;
    $jq.get(go_path,
        {
        }, function(data)
        {
        }
    );
}
function updateProjectInfoPreviousVersion(projID, projStatusID, projModeID){
    if(typeof projID == 'undefined', typeof projStatusID == 'undefined', typeof projModeID == 'undefined'){
        var projID = $jq("#tbUpdProj").find('.dmProjName').val();
        var projStatusID = $jq("#tbUpdProj").find('.projStatus').val();
        var projModeID = $jq("#tbUpdProj").find('.projMode').val();
    }

    var go_path = "Employee_Switch_Person.php?action=updateProjectInfo&vars=3&var1="+projID+"&var2=" +projStatusID+"&var3="+projModeID;
    $jq.get(go_path,
        {
        }, function(data)
        {
        }
    );
}
function requestProjectModeChange(projID, projStatusID, projModeID){
    if(confirm("Do you want to Change Project Mode Request?")){

        if(typeof projID == 'undefined'&& typeof projStatusID == 'undefined'&& typeof projModeID == 'undefined'){
            var projID = $jq("#reqUpdProj").find('.dmProjName').val();
            var projStatusID = $jq("#reqUpdProj").find('.projStatus').val();
            var projModeID = $jq("#reqUpdProj").find('.projMode').val();
        }
        //requestProjectModeChange
        var go_path = "Employee_Switch_Person.php?action=requestProjectModeChange&vars=3&var1=" + projID + "&var2=" + projStatusID +
            "&var3=" + projModeID;
        $jq.get(go_path,
            {
            }, function(data)
            {

                if(+readCookie("permission_GetSwitchRequest")){
                    getProjectModeChangeRequest();
                }
                else{
                    getProjectModeChangeRequestMadeList();
                }
                if(data == 'Request already exists.'){
                    alert("Requested Project change mode already in pending. Contact production manager to proceed the request");
                }
            }
        );
    }

}
Array.prototype.sortMulti = function(){
    var argsLen = arguments.length,
        args = arguments;
    function custSort(a,b){
        for(var i=0; i<argsLen; i++){
            var
                col = args[i],
                x = a[col],
                y = b[col];
            switch(true){
                case x < y : return -1; break;
                case x > y : return 1; break;
                default : return 0;
            }
        }
    }
    return this.sort(custSort);
};
var myArray = [
    ['fred',23],
    ['andy',34],
    ['sandra',48],
    ['sid',54],
    ['ian',15]
];
function printIt(){
    var sorted = myArray.sortMulti(1);

    var out = [];
    for(var i=0;i<sorted.length;i++){
        out.push(sorted[i].join("--"));
    }
    document.getElementById('message').innerHTML = out.join("<br/>");
}
function new_whiteboard_print_horizontal(data, tableid) {
    $jq("#" + tableid).html(data);
    var table_Arr = [];
    table_Arr[0] = []; // Absent Employees
    var htmls = "";
    var get_data_row = new Array();     // declare array
    get_data_row  = data.split('----//------');
    get_data_col  = get_data_row[0].split(',');
    var count_members = [];
    var WhiteBrdDetail = get_data_col[7];
    var NotAvaiable = null;
    var newColoumn = -1;
    var headSet = false;
    for(var i = 0; i < get_data_row.length; i++ )
    {
        get_data_col  = get_data_row[i].split(',');
        if(get_data_col[0] != "") // present : Active in emp_curr_proj
        {
            if(get_data_col[1] == "") //projecs
            {
                get_data_col[1] = 0;
            }
            if(table_Arr[get_data_col[1]] == null)	// projects id 4,24,46
            {
                table_Arr[get_data_col[1]] = [];
            }
            if(table_Arr[get_data_col[1]][get_data_col[6]] == null)
            {
                table_Arr[get_data_col[1]][get_data_col[6]] = [];
            }
            var test =  [];
            test.push(get_data_col[0]);     //Active
            test.push(get_data_col[1]);     //PTPK
            test.push(get_data_col[2]);     //Project Name
            test.push(get_data_col[3]);     //Employee_Name
            test.push(get_data_col[4]);     //Category_Name QA
            test.push(get_data_col[5]);     //ETPK
            test.push(get_data_col[6]);     //Dept_Category
            test.push(get_data_col[7]);     //WhiteBoard Detail
            test.push(get_data_col[8]);     //Entry_WhiteBoard
            test.push(get_data_col[9]);     //LeadName
            test.push(get_data_col[10]);    //SwitchDate
            test.push(get_data_col[11]);    //is_teamlead
            if(get_data_col[0] == 1)        // present : Active in Switch_person emp_curr_proj
            {
                if(get_data_col[3].substr(0,get_data_col[3].indexOf("<")) != get_data_col[9])
                {
                    table_Arr[get_data_col[1]][get_data_col[6]].push(test);
                    if(count_members[get_data_col[1]] == null)
                        count_members[get_data_col[1]] = 0;

                    count_members[get_data_col[1]] += 1;
                }
                else {

                    table_Arr[get_data_col[1]][get_data_col[6]].push(test);
                    if(count_members[get_data_col[1]] == null)
                        count_members[get_data_col[1]] = 0;
                    //count_members[get_data_col[1]] +=1;
                }
            }
            else
            {
                if(get_data_col[0] == 0)
                {
                    if (table_Arr[0][get_data_col[6]] == null)
                    {
                        table_Arr[0][get_data_col[6]] = [];
                    }
                    test[1] = 0;
                    test[2] = "Not Available" ;
                    table_Arr[0][get_data_col[6]].push(test);

                    if(count_members[0] == null)
                        count_members[0] = 0;
                    count_members[0] +=1;
                }
            }
        }
        else
        {
            if(get_data_col[1] != "")
            {
                table_Arr[get_data_col[1]] = [];
                table_Arr[get_data_col[1]][0] = [];
                var test =  [];
                test.push(get_data_col[0]);     //Active
                test.push(get_data_col[1]);     //PTPK
                test.push(get_data_col[2]);     //Project Name
                test.push(get_data_col[3]);     //Employee_Name
                test.push(get_data_col[4]);     //Category_Name QA
                test.push(get_data_col[5]);     //ETPK
                test.push(get_data_col[6]);     //Dept_Category
                test.push(get_data_col[7]);     //WhiteBoard Detail
                test.push(get_data_col[8]);     //Entry_WhiteBoard
                test.push(get_data_col[9]);     //LeadName
                test.push(get_data_col[10]);    //SwitchDate
                test.push(get_data_col[11]);    //is_teamlead
                table_Arr[get_data_col[1]][0].push(test);
            }
        }
    }
    table_Arr.push(table_Arr[4]);
    table_Arr.push(table_Arr[0]);
    table_Arr[0]= undefined;
    table_Arr[4]= undefined;
    var thismodeler = $jq('.modelerid').attr('class');
    thismodeler = (thismodeler.split("modelerid mod"))[1];
    var thismodelerName = $jq(".mod"+thismodeler).html();
    var temp = 0;
    //Making Finalize Data to Show
    for (i = 0; i <= table_Arr.length; i++) // projects
    {
        if(table_Arr[i] != null)
        {

            for (j = 0; j <= table_Arr[i].length; j++) //Dept_Category
            {
                if(table_Arr[i][j] != null)
                {
                    table_Arr[i][j] = table_Arr[i][j].sortMulti(3);		// sorting in a sorting or sort in a sort Name sorting
                    for (k = 0; k <= table_Arr[i][j].length; k++) //Dept_Category
                    {
                        if(table_Arr[i][j][k] != undefined)
                        {
                            if(newColoumn  != table_Arr[i][j][k][1])
                            {
                                if(newColoumn!= -1)
                                    htmls = htmls+"</tr>";

                                htmls = htmls+"<tr>";
                                htmls = htmls+"<td class ='th'><b><U>"+table_Arr[i][j][k][2]+"</U></B></td>";
                                if(table_Arr.length-1 != i) //remove last notavaiiable coloumn  lead name
                                {
                                    if(table_Arr[i][j][k][9] == thismodelerName)
                                        htmls = htmls+"<td class ='thisTeamLead' >"+table_Arr[i][j][k][9]+"</td>";
                                    else
                                        htmls = htmls+"<td >"+table_Arr[i][j][k][9]+"</td>";
                                }
                                else
                                    htmls = htmls+"<td></td>";

                                if (count_members[table_Arr[i][j][k][1]] == undefined  )
                                    htmls = htmls+"<td>0</td>";
                                else
                                    htmls = htmls+"<td>"+count_members[table_Arr[i][j][k][1]]+"</td>";
                                newColoumn  = table_Arr[i][j][k][1];
                                //newColoumn  = table_Arr[i][j][6];
                                headSet = false;
                            }
                            if( table_Arr.length-1 == i || table_Arr[i][j][k][3].substr(0,table_Arr[i][j][k][3].indexOf("<")) != table_Arr[i][j][k][9] ) //1 mean its lead
                            {

                                if ( WhiteBrdDetail == 1 )
                                {
                                    if(table_Arr[i][j][k][5] == thismodeler) // hight light modeller
                                        htmls = htmls+"<td  class='thismodeler'><a href='DetailEmp.php?id="+table_Arr[i][j][k][5]+"&name="+table_Arr[i][j][k][3]+"'>"+table_Arr[i][j][k][3]+"</a></td>";
                                    else
                                        htmls = htmls+"<td  id='modeler"+table_Arr[i][j][k][5]+"' class='"+table_Arr[i][j][k][4]+"'><a href='DetailEmp.php?id="+table_Arr[i][j][k][5]+"&name="+table_Arr[i][j][k][3]+"'>"+table_Arr[i][j][k][3]+"</a></td>";
                                }
                                else
                                {
                                    if(table_Arr[i][j][k][5] == thismodeler)
                                        htmls = htmls+"<td class='thismodeler'>"+table_Arr[i][j][k][3]+"</td>";
                                    else
                                        htmls = htmls+"<td   id='modeler"+table_Arr[i][j][k][5]+"' class='"+table_Arr[i][j][k][4]+"'>"+table_Arr[i][j][k][3]+"</td>";
                                }
                            }
                        }
                    }// k loop
                }
            }
        }
    }
    if(htmls != "")
        $jq("#"+tableid).html(htmls);
    else
        $jq("#"+tableid).html("tr><td><h1><B>No Record Found<B/></h1></td></tr>");
}
function compareName(a, b){
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
}
function new_whiteboardfn(){
    var go_path = "Employee_Switch_Person.php?action=new_whiteboardfn&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(data == "")
                refreshPage();

            $jq.when(
                new_whiteboard_print_horizontal(data,"New_whiteboard")
            ).then(
                createMissCells("New_whiteboard")
            ).then(
                rowINTOcolumn("New_whiteboard")
            );
        }
    );
    //$jq("#chk").val(go_path);
}
function whiteboardfn_Clear(){
    $jq("#whiteboard_PreDate").html("");
    $jq("#btnExcelExport").html("");
}
function user(EmpID, ProjID, ProjName, EmpName, Desig, DesigID, LeadName, isLead){
    this.EmpID = EmpID;
    this.ProjID = ProjID;
    this.ProjName = ProjName;
    this.EmpName = EmpName;
    this.Desig = Desig;
    this.DesigID = DesigID;
    this.LeadName = LeadName;
    this.isLead = isLead;
}
function whiteboardfn_Attendance(){
    var half = 0;
    if($jq('#half1').is(':checked'))
        half = 1;
    else if($jq('#half2').is(':checked'))
        half = 2;
    else
        half = 3;
    var PreBoardDate =  $jq("#PreBoardDate").val();

    var go_path = "Employee_Switch_Person.php?action=whiteboardfn_Attendance&vars=1&var1="+PreBoardDate;
    $jq("#chk").val(go_path);

    //if( $row['PTPK'] != $projID)
    //{
    //    echo "<tr>";
    //    echo "<td class = 'th'><b><u>";
    //    if(((int)$row['PTPK'] )==0 )
    //    echo "Not Available";
    //else
    //    {
    //        echo $Proj_NameArr[$row['PTPK']];
    //    }
    //    echo "</b></td>";
    //    echo "<td>";
    //    echo "<td class=".$i.">change to count member</td>";
    //    echo "<td>-</td>";
    //    echo "</td>";
    //    $i +=1;
    //}


    //if (projId != myData[i-1].PTPK) {
    //    html += "<td style=''>" + countMember + "</td>";
    //    countMember =0;
    //}
    var countMember = 1;
    $jq.get(go_path,
        {}, function(data)
        {


            var myData = JSON.parse(data);
            console.log(myData);
            var newFilterData = [];
            var empId, tmpArr = [];
            for(var j = 0 ; j< myData.length; j++){
                /*
                 if(newFilterData.length ==0)
                 newFilterData.push(myData[j]);
                 else {
                 for(var k = 0; k < newFilterData.length; k++)
                 {
                 if(newFilterData[k].EmployeeNamePK == myData[j].EmployeeNamePK){
                 if(newFilterData[k].ProjPK == myData[j].ProjPK){
                 break;
                 }
                 else if((newFilterData[k].ProjPK == 0 || newFilterData[k].ProjPK == null) &&  myData[j].ProjPK == 4){
                 newFilterData[k] = myData[j];
                 break;
                 }
                 else if(newFilterData[k].ProjPK == 4 && (newFilterData[k].ProjPK == 0 || newFilterData[k].ProjPK == null))
                 break;
                 else if(myData[j].ProjPK == 4)
                 break;
                 else if(newFilterData[k].ProjPK == 0)
                 break;

                 }
                 }
                 if(k >= newFilterData.length)
                 newFilterData.push(myData[j]);
                 }//*/

                ///*
                for(var l=0; l < tmpArr.length;l++){
                    if(myData[j].EmployeeNamePK == tmpArr[l].EmployeeNamePK)
                    {
                        for(var k=0; k < tmpArr.length; k++){
                            if(myData[j].emppk == tmpArr[k].emppk){
                                if(myData[j].ProjPK == tmpArr[k].ProjPK){
                                    newFilterData.push(myData[j]);
                                    break;
                                }
                                else if (myData[j].ProjPK == "4") {
                                    newFilterData.push(tmpArr[k]);
                                    break;
                                } else{
                                    newFilterData.push(tmpArr[k]);
                                    break;
                                }
                            }
                        }
                    }
                }
                tmpArr.push(myData[j]);
                empId =myData[j].EmployeeNamePK;//*/

            }

            //  var newFilterData1 = newFilterData.sort(function IHaveAName(a, b) { // non-anonymous as you ordered...
            //     return b.Employee_Name < a.Employee_Name ?  -1 // if b should come earlier, push a to end
            //         : b.Employee_Name > a.Employee_Name ? 1 // if b should come later, push a to begin
            //         : 0;                   // a and b are equal
            //});

            function sortByProperty(prop){
                'use strict';
                return function(a,b){
                    var sortStatus = 0;
                    return a[prop] < b[prop] ? 1
                        : b[prop] > a[prop] ? -1
                        : 0
                }
            }

            var newFilterData1 = newFilterData.sort(function IHaveAName(a, b) { // non-anonymous as you ordered...
                return b.PTPK < a.PTPK ?  -1 // if b should come earlier, push a to end
                    : b.PTPK > a.PTPK ? 1 // if b should come later, push a to begin
                    : 0;                   // a and b are equal
            });
            myData = newFilterData1;
            function getConditionMatchTrEnd(ij){
                if(ij == 28 ||  ij == 56 ||  ij == 84 || ij == 112 || ij == 140 || ij == 168 || ij == 196
                    || ij == 224 || ij == 252 || ij == 280 || ij == 308 ||  ij == 336 || ij == 364 ||  ij == 392)
                    return true;
                else return false;
            }
            function getConditionMatchTrStart(ij){
                if(ij == 29 ||  ij == 57 || ij == 85 || ij == 113 || ij == 141 || ij == 169 || ij == 197
                    || ij == 225 || ij == 253 || ij == 281 || ij == 309 ||  ij == 337 || ij == 365 ||  ij == 393)
                    return true;
                else return false;
            }
            var arrMemberCount = [];
            var html,
                projId, ij = 1;
            for(var i = 1; i <= myData.length;i++) {
                if (ij == 1 || getConditionMatchTrStart(ij)) {
                    html += "<tr border='1'>";
                }
                if (projId == myData[i-1].PTPK) {
                    countMember += 1;
                    /*
                     if(myData[i-1].Category_Name == "ModelerCategory")
                     html += "<td style='background-color: #c5d9f1'>" + myData[i-1].Employee_Name + "</td>";
                     else if(myData[i-1].Category_Name == "Environment")
                     html += "<td style='background-color: #c0d998'>" + myData[i-1].Employee_Name + "</td>";
                     else if(myData[i-1].Category_Name == "Library")
                     html += "<td style='background-color: #CDB99C'>" + myData[i-1].Employee_Name + "</td>";
                     else if(myData[i-1].Category_Name == "CAD")
                     html += "<td style='background-color: #9a9cc8'>" + myData[i-1].Employee_Name + "</td>";
                     else if(myData[i-1].Category_Name == "Project_Leader")
                     html += "<td style='background-color: #d9d598'>" + myData[i-1].Employee_Name + "</td>";
                     else if(myData[i-1].Category_Name == "QA")
                     html += "<td style='background-color: #8B88FF'>" + myData[i-1].Employee_Name + "</td>";
                     else if(myData[i-1].Category_Name == "Developer")
                     html += "<td style='background-color: #d9d598'>" + myData[i-1].Employee_Name + "</td>";
                     else
                     */
                    html += "<td style='border: 1px solid black'>" + myData[i-1].Employee_Name + "</td>";
                    if (getConditionMatchTrEnd(ij)) {
                        html += "</tr>";
                        html +="<tr></tr>"
                    }
                    ij++;
                }
                else {
                    if (myData[i - 1].PTPK == "0"){
                        html += "<td></td>";
                        ij++;
                        if (getConditionMatchTrEnd(ij)) {
                            html += "</tr>";
                            html +="<tr style='border: 1px solid black'></tr>";
                            ij++;
                        }

                        if (getConditionMatchTrStart(ij)) {
                            html += "<tr style='border: 1px solid black'>"
                        }
                        html += "<td style='text-align: center; background-color: #bfbfbf; font-weight: bold; border: 1px solid black'>" + "Not available" + "</td>";
                        ij++;
                        if (getConditionMatchTrEnd(ij)) {
                            html += "</tr>";
                            html +="<tr style='border: 1px solid black'></tr>";
                            ij++;
                        }

                        if (getConditionMatchTrStart(ij)) {
                            html += "<tr style='border: 1px solid black'>"
                        }
                        html += "<td style='background-color: #DFD5D5; color:#ffffff font-weight: bold; text-align: center; border: 1px solid black' class='countMembers' id='project"+myData[i - 1].PTPK+"'></td>";
                        ij++;
                        if (getConditionMatchTrEnd(ij)) {
                            html += "</tr>";
                            html +="<tr style='border: 1px solid black'></tr>";
                            ij++;
                        }

                        if (getConditionMatchTrStart(ij)) {
                            html += "<tr style='border: 1px solid black'>"
                        }
                    }
                    else {
                        if(ij!=1){
                            html += "<td></td>";
                            ij++;
                            if (getConditionMatchTrEnd(ij)) {
                                html += "</tr>";
                                html +="<tr style='border: 1px solid black'></tr>";
                                ij++;
                            }

                            if (getConditionMatchTrStart(ij)) {
                                html += "</tr><tr style='border: 1px solid black'></tr><tr style='border: 1px solid black'>";// this is old
                                //html += "<tr style='border: 1px solid black'>"
                            }
                        }

                        html += "<td style='text-align: center; background-color: #bfbfbf; font-weight: bold; border: 1px solid #000000'>" + myData[i-1].Name + "</td>";
                        ij++;
                        if (getConditionMatchTrEnd(ij)) {
                            html += "</tr>";
                            html +="<tr style='border: 1px solid black'></tr>";
                            ij++;
                        }

                        if (getConditionMatchTrStart(ij)) {
                            html += "<tr style='border: 1px solid black'>";
                        }
                        html += "<td style='background-color: #DFD5D5; color:#ffffff font-weight: bold; text-align: center; border: 1px solid black' class='countMembers' id='project"+myData[i - 1].PTPK+"'></td>";
                        ij++;
                        if (getConditionMatchTrEnd(ij)) {
                            html += "</tr>";
                            html +="<tr style='border: 1px solid black'></tr>";
                            ij++;
                        }

                        if (getConditionMatchTrStart(ij)) {
                            html += "</tr><tr style='border: 1px solid black'></tr><tr style='border: 1px solid black'>";// this is old
                            //html += "<tr style='border: 1px solid black'>"
                        }
                        if(myData[i - 1].PTPK != "4"){
                            html += "<td style='background-color: #ffffff; font-weight: bold; border: 1px solid black; text-align: center'>" + myData[i-1].LeadName + "</td>";
                            ij++;
                            if (getConditionMatchTrEnd(ij)){
                                html += "</tr>";
                                html +="<tr style='border: 1px solid black'></tr>";
                                ij++;
                            }
                            if (getConditionMatchTrStart(ij)) {
                                html += "</tr><tr style='border: 1px solid black'></tr><tr style='border: 1px solid black'>"
                            }
                        }
                    }
                    html += "<td style='border: 1px solid black;'>" + myData[i-1].Employee_Name + "</td>";
                    if (getConditionMatchTrEnd(ij)) {
                        html += "</tr>";
                        html +="<tr style='border: 1px solid black'></tr>"
                    }
                    ij++;


                    if(i!=1) // not include first countMember as it will always one
                        arrMemberCount.push({
                            projectId : myData[i - 2].PTPK,  //i-2 so that get right project id and right memeber in same object
                            members: countMember
                        });
                    countMember = 1;
                }
                projId = myData[i-1].PTPK;
            }

            arrMemberCount.push({
                projectId : projId,
                members: countMember
            });

            html +="<tr></tr>";
            console.log("This is member list array",arrMemberCount);
            $jq("#whiteboard_PreDate").html(html);
            createMissCells("whiteboard_PreDate");//Creating missesd cells
            rowINTOcolumn("whiteboard_PreDate");  // Converting rows into Columns
            $jq("#whiteboard_PreDate").find("tr:first td").length;//get total column lengt
            $jq('#whiteboard_PreDate tr:first').before('<td class="sr-only" colspan="3" style="border : 1px solid #000000;"><h1>The Location Lab (Pvt.) Ltd</h1></td>' +
            '<td class="sr-only" colspan="2"><span style="float:left"> Date:'+PreBoardDate+'</span></td>');
            $jq('.countMembers').each(function(e) {
                var elementRrojectId = $jq(this).attr("id");
                elementRrojectId = elementRrojectId.substr(7, elementRrojectId.length);
                for (var i = 0; i < arrMemberCount.length; i++)
                {
                    if(arrMemberCount[i].projectId ==  elementRrojectId) {
                        $jq(this).html(arrMemberCount[i].members);
                        break;
                    }
                }
            });
            if($jq("#whiteboard_PreDate").html().length !=15)
                $jq("#btnExcelExport").html("<input type='button' onclick=\"tableToExcel('whiteboard_PreDate', 'W3C Example Table')\" value='Export to Excel'>");
        }
    );
}
function whiteboardfn_PreDateNavigation(nextOrPrevious){

    var dateObj = new Date($jq("#PreBoardDate").val());
    if(nextOrPrevious == "-")
    {
        dateObj.setDate(dateObj.getDate() - 1);
    }
    else {
        dateObj.setDate(dateObj.getDate() + 1);
    }

    $jq("#PreBoardDate").val(getStringDate(dateObj));
    whiteboardfn_PreDate();
}
function getStringDate(date){
    console.log("date.getDay() "+ date.getDate());
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if(day.toString().length < 2){
        day = "0"+day;
    }
    if(month.toString().length < 2){
        month = "0"+month;
    }
    var fullDate = year + "-" + month + "-" + day;
    return fullDate;
}
function whiteboardfn_PreDate(){
    var half = 0;
    if($jq('#half1').is(':checked'))
        half = 1;
    else if($jq('#half2').is(':checked'))
        half = 2;
    else if($jq('#half3').is(':checked'))
        half = 3;
    var PreBoardDate =  $jq("#PreBoardDate").val();
    var go_path = "Employee_Switch_Person.php?action=whiteboardfn_PreDate&vars=2&var1="+PreBoardDate+"&var2="+half;
    $jq.get(go_path,
        {
        }, function(data)
        {
            //this is original
            $jq("#whiteboard_PreDate").html(data);
            //original
            //$jq("#whiteboard_PreDate").html(data);
            $jq.when(createMissCells("whiteboard_PreDate")).then(rowINTOcolumn("whiteboard_PreDate"))
                .then(
                $jq.each($jq("#whiteboard_PreDate  tr:eq(0) td"), function(e)
                {
                    if($jq(this).text() == "Free")
                    {
                        Free_col = e;

                        return e
                    }
                })
            )
                .then(function()
                {
                })
                .then(function()
                {

                }
            );

        }
    );
}
function Addcoloumn(tableid){
    var totalRow =  $jq("#"+tableid).find('tbody > tr').length;
    var totalCol =  $jq("#"+tableid).find('tbody > tr:eq('+1+') td').length;
    var highcol = 0;	//hight number of cells
    var temp = 0;

    for(var i =0; i<totalRow; i++)
    {
        for(var c =0; c<=totalRow+1; c++)
        {
            $jq('#whiteboard_PreDate tr:eq('+i+')').find('td:eq('+c+')').after('<td style="width: 50px"  >.</td>');
            c++;
        }
    }


}
function createMissCells(tableid){
    var totalRow =  $jq("#"+tableid).find('tbody > tr').length;
    var highcol = 0;	//hight number of cells
    var temp = 0;

    for(var i = 0; i < totalRow; i++)
    {
        temp =  $jq("#"+tableid).find('tbody > tr:eq('+i+') td').length; // current number of cell in this rows

        $jq("."+i).text(temp-4); // count total member in this projects //change to count member
        $jq("."+i).removeAttr('class');
        if( highcol < temp)
            highcol = temp;

    }

    for(var row = 0; row < totalRow; row++)
    {
        temp =  $jq("#"+tableid).find('tbody > tr:eq(' + row + ') td').length;
        //alert("temp1: "+temp);
        temp = highcol - temp;
        //alert("temp2: "+temp);
        for(var i = 0; i < temp; i++)
            $jq("#"+tableid).find('tbody > tr:eq('+row+')').append("<td style='border: 1px solid black'></td>");
    }
}
function createMissCellsWithoutVisible(tableid){
    var totalRow =  $jq("#"+tableid).find('tbody > tr').length;
    var highcol = 0;	//hight number of cells
    var temp = 0;
    for(var i = 0; i < totalRow; i++)
    {
        temp =  $jq("#"+tableid).find('tbody > tr:eq('+i+') td:visible').length; // current number of cell in this rows
        $jq("."+i).text(temp-4); // count total member in this projects //change to count member
        $jq("."+i).removeAttr('class');
        if( highcol < temp)
            highcol = temp;

    }

    for(var row = 0; row < totalRow; row++)
    {
        temp =  $jq("#"+tableid).find('tbody > tr:eq(' + row + ') td:visible').length;
        temp = highcol - temp;
        for(var i = 0; i < temp; i++)
            $jq("#"+tableid).find('tbody > tr:eq('+row+')').append("<td style='border: 1px solid black'></td>");
    }
}
function rowINTOcolumn(tableid){
    $jq("#" + tableid).each(function() {
        var $jqthis = $jq(this);
        var newrows = [];
        $jqthis.find("tr").each(function(){
            var i = 0;
            $jq(this).find("td").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $jq("<tr></tr>"); }
                newrows[i].append($jq(this));
            });
        });
        $jqthis.find("tr").remove();
        $jq.each(newrows, function(){
            $jqthis.append(this);
        });
    });
}
function TransposeTable(tableId){
    var tbl = $jq('#' + tableId);
    var tbody = tbl.find('tbody');
    var oldWidth = tbody.find('tr:first td').length;
    var oldHeight = tbody.find('tr').length;
    var newWidth = oldHeight;
    var newHeight = oldWidth;
    var jqOldCells = tbody.find('td');
    var newTbody = $jq("<tbody></tbody>");
    for(var y=0; y<newHeight; y++)
    {
        var newRow = $jq("<tr></tr>");
        for(var x=0; x<newWidth; x++)
        {
            newRow.append(jqOldCells.eq((oldWidth*x)+y));
        }
        newTbody.append(newRow);
    }

    tbody.replaceWith(newTbody);
}
function copyFirstHalfSwitchingValuesTo2ndHalf(tabParID){
    alert("working ");
    var dateRng = $jq("#"+tabParID).find(".dateinput").val();

    if(dateRng == "")
    {
        alert ("Please Select the Date  First");
        return false;
    }
    //alert ("tabParID: "+tabParID);
    var go_path = "Employee_Switch_Person.php?action=copyFirstHalfSwitchingValuesTo2ndHalf&vars=1&var1="+dateRng;

    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#chk").val(go_path);
        }
    );
}
function All_copyFirstHalfSwitchingValuesTo2ndHalf(tabParID){
    var dateRng = $jq("#"+tabParID).find(".dateinput").val();

    if(dateRng == "")
    {
        alert ("Please Select the Date  First");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=All_copyFirstHalfSwitchingValuesTo2ndHalf&vars=1&var1="+dateRng;

    $jq.get(go_path,
        {
        }, function(data)
        {

        }
    );

}
function test(){
    $('#whiteboard').find('input:empty').length
}
function projStatusClear(){
    $jq("#projStatusTB").html('');
}
function refreshPage(){
    location.reload();
}
function slidechange(){
    alert ("slide change");
}
function viewSwitchRequestHistory(){

}
function viewProjectCommentHistory(){
    $jq("#displyHistory").html("");
    var projectId = $jq(".ProjectName").find(".dmProjName").val();
    var go_path = "Employee_Switch_Person.php?action=getProjectCommentHistory&vars=1&var1="+projectId;
    $jq.get(go_path,function(data){
        if(data.length == 0)
            return false;
        var get_data_row = new Array();     // declare array
        var get_data_row  = data.split('----//------');
        htmls = "<table border=1> <tr style='font-weight: bold;'><td>Comment</td><td>Date</td></tr>";
        for(var i = 0; i<get_data_row.length; i++ )
        {
            htmls = htmls+"<tr>";
            var get_data_col = new Array();
            get_data_col  = get_data_row[i].split('|||');
            console.log(get_data_col)
            if(get_data_col[0] ==""){
                continue;
            }

            for(var j = 0; j<get_data_col.length ; j++)
            {
                if(get_data_col[j] != ""){
                    htmls = htmls+"<td>";
                    htmls = htmls + get_data_col[j];
                }else{
                    htmls = htmls+"<td>";
                }
            }
            htmls = htmls+"</tr>";
        }	htmls = htmls+"</td>";

        htmls = htmls + "</table>";
        $jq("#displyHistory").html(htmls);
    });
}
function switchEmployeeCall(nameID, projID, teamLeadId, taskId){
    var go_path = "Employee_Switch_Person.php?action=SwitchEmp&vars=4&var1="
        + nameID+ "&var2=" + projID+"&var3=" +teamLeadId + "&var4=" + taskId; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
    $jq.get(go_path,
        {
        }, function(data)
        {
            console.log("switchEmployeeCall: " + data);
            // AddProjectTaskForEmployee(nameID, projID, taskId, requestDateTime, requestBy);
            if(data == "done"){
                alert("Switching Successfull");
            }
            if(data == "You are not allow to switch to free")
                alert("You are not allow to switch your self to free");
            new_whiteboardfn();
            getProjectModeChangeRequestListForEveryKindOfUser();
            getUserAssignWork();
        }
    );
}
function empSwitchRequestUpdate(status,RecordId){

    $jq(this).hide();
    var go_path = "Employee_Switch_Person.php?action=getSpecificRequestDetail&vars=1&var1="+RecordId;
    $jq.get(go_path,
        {
        }, function(data)
        {
            updateAlerts(false);
            //alert("what return"+ data);
            if(data == "")
            {
                acceptRejectDelEmpSwitchReq(status, RecordId);
                updateAlerts(false);
            }
            else {
                alert("Sorry! Your request has already been entertained..");
                updateAlerts(false);
            }
            //whiteboardfnCallingRepeatly();
            console.log(data);
        });
}
function acceptRejectDelEmpSwitchReq(status, RecordId){
    var go_path = "Employee_Switch_Person.php?action=SwitchEmpRequestUpdate&vars=2&var1="+status+"&var2="+RecordId;
    $jq.get(go_path,
        {
        }, function(data)
        {
            console.log("data----------------------------",data)
            updateAlerts(false);
            whiteboardfnCallingRepeatly();
        });
}
function Submit_Daily_Question() {
    if(confirm("Are you sure? Genereate Today late sitting Question?"))
    {
        var latestNumber;
        var go_path = "Employee_Switch_Person.php?action=vote_pollLastPK&vars=0";
        $jq.get(go_path,
            {
            }, function(data) {
                latestNumber = parseInt(data)+1;
                var questionDate = new Date();
                var mainQueestion = "Ask your Supervisor about your late sitting time and then select any one of the following";

                var html = '<table width="600" border="1">\
            <tbody>\
            <tr>\
            <td>Question:</td><td id="mainQueestion">\
            "Ask your Supervisor about your late sitting time and then select any one of the following time '+ questionDate.toDateString() +':" \
            </td>\
            </tr>\
            <tr>\
            <td>Options</td><td><div id="options_div">\
            <input name="Names" onChange="getSelectedLeaveTime(this.value)" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_1"  value="6"  contenteditable="false"><label id="VoteAns_' + latestNumber  + '_1_lbl" contenteditable="true">6 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_1"></label><br>\
            <input name="Names" onChange="getSelectedLeaveTime(this.value)" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_2"  value="7"  contenteditable="false"><label id="VoteAns_' + latestNumber  + '_2_lbl" contenteditable="true">7 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_2"></label><br>\
            <input name="Names" onChange="getSelectedLeaveTime(this.value)" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_3"  value="8"  contenteditable="false"><label id="VoteAns_' + latestNumber  + '_3_lbl" contenteditable="true">8 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_3"></label><br>\
            <input name="Names" onChange="getSelectedLeaveTime(this.value)" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_4"  value="9"  contenteditable="false"><label id="VoteAns_' + latestNumber  + '_4_lbl" contenteditable="true">9 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_4"></label><br>\
            <input name="Names" onChange="getSelectedLeaveTime(this.value)" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_5"  value="10" contenteditable="false"><label id="VoteAns_' + latestNumber  + '_5_lbl" contenteditable="true">10 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_5"></label><br>\
            <input name="Names" onChange="getSelectedLeaveTime(this.value)" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_6"  value="11" contenteditable="false"><label id="VoteAns_' + latestNumber  + '_6_lbl" contenteditable="true">11 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_6"></label><br>\
            </div>\
            </td>\
            </tr>\
            </tr>\
                <tr><span class="dinnerSelection"></span></tr>\
            </tbody></table>';

                var day = questionDate.getDate();
                var month = questionDate.getMonth() + 1;
                var year = questionDate.getFullYear();
                var fullDate = year +"-"+ month +"-"+ day;
                console.log(fullDate);
                var go_path = "Employee_Switch_Person.php?action=Submit_Daily_Question&vars=3&var1=" + mainQueestion + "&var2=" + html+ "&var3=" + fullDate;
                $jq.get(go_path,
                    {
                    }, function(data)
                    {
                        if(data == "")
                            $jq("#ConformationMsg").html("Sucessfully Save");
                        location.reload();
                    });
            });

    }


}

//Assign Work Functions -- START//
function AssignWork(){
    var projectId = $jq(".dmProjName").val(),
        empId = $jq(".nameEmp").val(),
        assignWork = $jq(".workDescription").val(),
        workDate = $jq(".workDate").val();
    $jq.post("Employee_Switch_Person.php?action=assignWork&vars=0",{
        projectId : $jq(".dmProjName").val(),
        empId : $jq(".nameEmp").val(),
        assignWork : $jq(".workDescription").val().replace(/\\/g,"/"),
        workDate : $jq(".workDate").val()
    }).done(function(data){
        if(data == 1)
            alert("Task Successfully created and assigned!")
    })

}
function showAssignWork(workStatus){
    //$workStatus       //1 completed    //2 cancel    //0 pending
    if($jq(".viewAllTasks").is(":checked")) //check that show full list or just own created task list
    {
        console.log("if");
        var go_path = "Employee_Switch_Person.php?action=showAssignWorkAll&vars=1&var1="+workStatus;
    }

    else{
        console.log("else");
        var go_path = "Employee_Switch_Person.php?action=showAssignWork&vars=1&var1="+workStatus;
    }

    $jq.get(go_path,{},function(data){
        data = JSON.parse(data);
        var heading, className;
        if(workStatus ==0) {
            heading = "<h3>Pending Tasks</h3> <input type='text' placeholder='Type here to filter List' class='filterData form-control'  onkeyup='getData();' /> ";
            // heading = "<h3>Pending Tasks</h3><p><input type='checkbox' class='showAllCheck' onclick='showAllAssignWork(0)' />View All</p>";
            className = 'bg-danger';
        }
        else  if(workStatus ==1){
            heading = "<h3>Completed Tasks</h3> <input type='text' placeholder='Type here to filter List' class='filterData form-control'  onkeyup='getData();' />";
            //heading = "<h3>Completed Tasks</h3><p><input type='check' class='showAllCheck' onclick='showAllAssignWork(1)' />View All</p>";
            className = 'bg-success';
        }
        else  if(workStatus ==2){
            heading = "<h3>Cancel Tasks</h3> <input type='text' placeholder='Type here to filter List' class='filterData form-control'  onkeyup='getData();' />";
            //heading = "<h3>Cancel Tasks</h3><p><input type='check' class='showAllCheck' onclick='showAllAssignWork(1)' />View All</p>";
            className = 'bg-primary';
        }

        var html = "<table id='assignWorkTable' class='table .table-hover'><thead><tr class="+ className+"><td class='col-lg-1'>Project Name</td><td class='col-lg-2'>Employee Name</td> <td class='col-lg-3'>Assign Work</td> <td class='col-lg-1'>Work Date</td> <td class='col-lg-2'>Operations</td><td class='col-lg-3'>Solution</td></tr></thead>";
        for(var i=0; i<data.length; i++){
            html += "<tbody><tr><td>"+ data[i].ProjectName +"</td><td>"+ data[i].EmployeeName+"</td><td>"+ data[i].AssignWork +"</td><td>"+ data[i].WorkDate;
            if(workStatus ==0){
                html += "</td><td><button onclick='assignWorkCancel("+data[i].EmpAWPK+")' class='btn btn-danger glyphicon glyphicon-remove'></button> " +
                "<button class='btn btn-default' onclick='assignWorkComplete("+data[i].EmpAWPK+")'>Complete</button>" +
                "</td>" ;
            }
            else if(workStatus ==2){
                html += "</td><td><button class='btn btn-default' onclick='assignWorkReactive("+data[i].EmpAWPK+")'>Reactive</button>" +
                "</td>" ;
            }
            else if(workStatus ==1){
                html +=  "</td><td><button class='btn btn-default' onclick='assignWorkIncomplete("+data[i].EmpAWPK+")'>incomplete</button>" +
                "</td>" ;
            }
            html += "<td><textarea class='input-sm' id='taskSolution"+data[i].EmpAWPK+"' type='text'>"+ data[i].Solution+"</textarea>" +
            "<input class='btn-primary' type='button' id='saveSolution' onclick='saveTaskSolution("+data[i].EmpAWPK+")' value='submit'/></td></tr>"
        }
        html += "</tbody></table>";

        $jq(".showAssignWork").html(heading+html);
        //$jq("#assignWorkTable").DataTable();
    });
}
function saveTaskSolution(assignWorkId){
    console.log($jq("#taskSolution"+assignWorkId).val());
    console.log(assignWorkId);
    var solution = $jq("#taskSolution"+assignWorkId).val().replace(/\\/g,"/");
    var go_path = "Employee_Switch_Person.php?action=saveTaskSolution&vars=0";
    $jq.post(go_path,
        {
            taskId : assignWorkId,
            taskSolution : solution

        }).done(function(data){
            if(data == 1)
                alert("Solution updated successfully!")
        });

}
function showAllAssignWork(workStatus){
    showAssignWork(workStatus);
}
function assignWorkCancel(cancelWorkId){
    var reasonToCancel = prompt("Reason to Cancel Assigned Work");
    var go_path = "Employee_Switch_Person.php?action=assignWorkCancel&vars=2&var1="+ cancelWorkId +"&var2="+ reasonToCancel;
    $jq.get(go_path,{},function(data){
        showAssignWork(0);
        countAssignTasks()
    });
}
function assignWorkReactive(cancelWorkId){
    //var reasonToCancel = prompt("Reason to Cancel Assigned Work");
    var go_path = "Employee_Switch_Person.php?action=assignWorkReactive&vars=1&var1="+ cancelWorkId;
    $jq.get(go_path,{},function(data){

        showAssignWork(2);
        countAssignTasks()
    });
}
function assignWorkUpdate(EmpAWP, EmpId, ProjectId,WorkDate,WorkDesc){
    console.log(WorkDate);
    console.log( EmpAWP, EmpId, ProjectId,WorkDate,WorkDesc);
    $jq('.nameEmp').val(EmpId);
    $jq('.dmProjName ').val(ProjectId);
    $jq('.workDate').text(WorkDate);
    $jq('.workDescription ').val(WorkDesc);
}
function assignWorkComplete(assignWorkId){
    var go_path = "Employee_Switch_Person.php?action=assignWorkComplete&vars=1&var1="+ assignWorkId;
    $jq.get(go_path,{},function(data){
        showAssignWork(0);
        countAssignTasks()
    });
}
function assignWorkIncomplete(assignWorkId){
    var go_path = "Employee_Switch_Person.php?action=assignWorkincomplete&vars=1&var1="+ assignWorkId;
    $jq.get(go_path,{},function(data){
        showAssignWork(1);
        countAssignTasks()
    });
}
function countAssignTasks(){
    var go_path = "Employee_Switch_Person.php?action=countAssignTasks&vars=0";
    $jq.get(go_path,{},function(data){
        data= JSON.parse(data);
        if(data.length > 0){
            $jq(".countPendingTask").html("");
            $jq(".countCompletedTask").html("");
            $jq(".countCancelTask").html("");
            for(var i=0;i<data.length; i++){
                if(data[i].hasCompleted ==0)
                    $jq(".countPendingTask").html(data[i].TotalTask);
                else if(data[i].hasCompleted ==1)
                    $jq(".countCompletedTask").html(data[i].TotalTask);
                else if(data[i].hasCompleted ==2)
                    $jq(".countCancelTask").html(data[i].TotalTask);
            }
        }
    });
}
function skipToHome(){
    window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
}
//Assign Work Functions -- END//

function getData(){

    //split the current value of searchInput
    var data = $jq(".filterData").val().split(" ");
    //create a jquery object of the rows
    var jo = $jq(".table").find("tbody");
    if ($jq(".filterData").val() == "") {
        jo.show();
        return;
    }
    //hide all the rows
    jo.hide();

    //Recusively filter the jquery object to get results.
    jo.filter(function (i, v) {
        var $t = $jq(this);
        // $t =$t.toLowerCase();
        for (var d = 0; d < data.length; ++d) {
            if ($t.is(":contains('" + data[d] + "')")) {
                return true;
            }
        }
        return false;
    })
        //show the rows that match.
        .show();
}
function filterList(){
    if($jq(".dmProjName  :selected").val() != 4 && $jq(".dmProjName  :selected").val() != 0)
    {
        $jq(".filterData").val($jq(".dmProjName  :selected").text());
        getData();
    }
    else{
        $jq(".filterData").val("");
        getData();
    }
}
function filterWorkListByEmployee(){
    var empName = capitalizeFirstLetter($jq(".nameEmp  :selected").text());
    $jq(".filterData").val(empName);
    getData();
}
//Get string with inital capitalized
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//Project Mode related functions -- START//
function getProjectModeChangeRequest(){
    var go_path = "Employee_Switch_Person.php?action=ProjectModeChangeRequest&vars=0";
    $jq.get(go_path,{},function(data){
        var previousObject;
        data = JSON.parse(data);
        if(data.length > 0){
            if(JSON.stringify(data) != previousObject){
                var html = "<h2>Project Mode Change Request</h2><table><thead><tr>" +
                    "<th>Project Name</th><th>Project Status</th><th>Project Mode</th><th>Request by</th><th>Timing</th><th>Operation</th></thead>";

                for(var i=0;i < data.length;i++)
                {
                    var status;
                    if(data[i].projStatusId=="1")
                        status = "Continue";
                    else if(data[i].projStatusId=="2")
                        status = "Start";
                    else if(data[i].projStatusId=="3")
                        status = "Finish";
                    else if(data[i].projStatusId=="4")
                        status = "Pause";
                    else if(data[i].projStatusId=="5")
                        status = "Resume";

                    html+= "<tr><td>" + data[i].ProjectName +"</td><td>"+
                    status + "</td><td>" +
                    data[i].ProjectMode + "</td><td>" +
                    data[i].RequestBy + "</td><td>" +
                    data[i].RequestTime + "</td>" +
                    "<td><input type='button' class='text-primary' onclick='ProjectModeChangeRequestHandle("+data[i].id+",1,"+ data[i].projId +","+  data[i].projModeId +","+data[i].projStatusId +")' value='Accept'> <input class='text-primary' type='button' onclick='ProjectModeChangeRequestHandle("+data[i].id+",2)' value='Reject'> </td></tr>"
                }

                html+="</table>";
                if((($jq.trim(html).length) - ($jq.trim($jq("#ProjectModeBottomPanel").html()).length)) > 100){
                    $jq("#ProjectModeBottomPanel").html("<summary>Project Mode Change</summary>"+html);
                    //$jq("#ProjectModeChangeRequest").html(html);
                    $jq("#ProjectModeBottomPanel").prop("open",true);
                }
                else{
                    console.log("100<");
                }
                previousObject = JSON.stringify(data);
            }
        }
        else{
            $jq("#ProjectModeBottomPanel").hide();
        }
    });
    //setTimeout(getProjectModeChangeRequest, 15000);
}
function ProjectModeChangeRequestHandle(recordId, status, projID, projModeID, projStatusID){

    var go_path = "Employee_Switch_Person.php?action=ProjectModeChangeRequestHandle&vars=2&var1=" + status + "&var2=" + recordId;
    $jq.get(go_path,{},function(data){

        if(data == 1 && status == 1)
        {
            var go_path = "Employee_Switch_Person.php?action=updateProjectInfo&vars=3&var1=" + projID + "&var2=" + projStatusID + "&var3=" + projModeID;
            $jq.get(go_path,
                {
                }, function(data)
                {

                    getProjectModeChangeRequestListForEveryKindOfUser();
                }
            );
        }
        else {
            getProjectModeChangeRequestListForEveryKindOfUser();
        }
        new_whiteboardfn();
    })
}
function getProjectModeChangeRequestListForEveryKindOfUser(){
    if(+readCookie("permission_GetSwitchRequest")){
        getProjectModeChangeRequest();
        new_whiteboardfn();

    }
    else if(+readCookie("permission_EmpSwitchRequest")){
        getProjectModeChangeRequestMadeList();
        new_whiteboardfn();

    }
}
var previousDataString;
function getProjectModeChangeRequestMadeList(){
    var go_path = "Employee_Switch_Person.php?action=getProjectModeChangeRequestMadeList&vars=0";
    $jq.get(go_path,{},function(data){

        data = JSON.parse(data);
        if(data.length > 0){
            if(JSON.stringify(data) !== previousDataString){
                var html = "<h2>Your Project Mode Change Request</h2><table><thead><tr>" +
                    "<th>Project Name</th><th>Project Status</th><th>Project Mode</th><th>Request by</th><th>Timing</th><th>Operation</th></thead>";

                for(var i=0; i < data.length; i++)
                {
                    var status;
                    if(data[i].projStatusId == "1")
                        status = "Continue";
                    else if(data[i].projStatusId == "2")
                        status = "Start";
                    else if(data[i].projStatusId == "3")
                        status = "Finish";
                    else if(data[i].projStatusId == "4")
                        status = "Pause";
                    else if(data[i].projStatusId == "5")
                        status = "Resume";

                    html+= "<tr><td>"+data[i].ProjectName +"</td><td>"+
                    status +"</td><td>" +
                    data[i].ProjectMode +"</td><td>" +
                    data[i].RequestBy + "</td><td>"+
                    data[i].RequestTime +"</td>" +
                    "<td><input type='button' class='text-primary' onclick='ProjectModeChangeRequestHandle("+data[i].id+",2)' value='Cancel'></td></tr>"
                }
                html+="</table>";
                $jq("#ProjectModeBottomPanel").html("<summary>Project Mode Change</summary>"+html);
                $jq("#ProjectModeBottomPanel").prop("open",true);
                previousDataString = JSON.stringify(data);
            }
        }
        else{
            //$jq("#ProjectModeBottomPanel").hide();
        }
    });
    //setTimeout(getProjectModeChangeRequestMadeList, 20000);
}
function ProjectQuestionAnswerByCurrentUserCall(projectQAId){
    var btnValue = $jq("#projectQAQuestionBtn_" +projectQAId).attr('value')
    if(btnValue == "Save Edits"){
        ProjectQuestionAnswerByCurrentUser();
    }
}
function ProjectQuestionAnswerByCurrentUser(){
    var go_path = "Employee_Switch_Person.php?action=ProjectQuestionAnswerByCurrentUser&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            var output = JSON.parse(data);
            if(output.length > 0) {
                var html = "<table class='sortable table table-hover' border='1'><thead><tr>";
                html = html + "<th>Project Name</th>";
                //html = html + "<th>Asked by</th>";
                html = html + "<th>Ask Date</th>";
                html = html + "<th>Question</th>";
                //html = html + "<th>Answer</th>";
                html = html + "<th>Ans Date</th>" +
                "<th>Deactive</th>" +
                "<th>Editable</th>" +
                "</thead><tbody>";

                var isNewAnswerReceived = false;

                for (var i = 0; i < output.length; i++) {
                    html += "<tr><td>" + output[i].Name + "</td>";
                    //html += "<td>" + output[i].AskedBy + "</td>";
                    html += "<td>" + output[i].AskDateTime + "</td>";
                    html += "<td >Q:<span id='projectQAQuestion_" + output[i].ProjectQAId + "'>" + output[i].ProjectQuestion + "</span></br><small class='text-info'>A:" + output[i].ProjectAnswer + "</small></td>";
                    //html += "<td>" + output[i].ProjectAnswer + "</td>";
                    html += "<td>" + output[i].AnswerDateTime + "</td>";


                    //De-active buttons logic
                    if (output[i].Active == 0) {

                        html += "<td>Deactivate</td>";
                    }
                    else if ("string" == typeof output[i].AnswerDateTime) {// && output[i].Active == 1
                        isNewAnswerReceived = true;
                        var id = output[i].ProjectQAId;
                        if (readCookie("userID") == output[i].QuestionBy) {
                            html += "<td><input type='button' value='Deactive it' class='btn-primary' onclick='ProjectQAAnswerDeactive(" + id + ");ProjectQuestionAnswerByCurrentUser()'/></td>";
                        }
                        else {
                            html += "<td>Deactive it</td>";
                        }
                    }
                    else {

                        var id = output[i].ProjectQAId;
                        //html += "<td><input type='button' value='' class='disabled' disabled id='ProjectQAId_" + id + "'/></td>";
                        html += "<td>Active</td>";
                    }

                    if (output[i].isEditable == 1) {
                        if (readCookie("userID") == output[i].QuestionBy) {
                            var id = output[i].ProjectQAId;
                            html += "<td><input type='button' value='Edit' class='btn-primary' id='projectQAQuestionBtn_" + id + "' onclick='ProjectQAQuestionUpdate(" + id + ");'/></td>";
                        }
                        else {
                            html += "<td>Editable</td>";
                        }
                    }
                    else {
                        html += "<td>No</td>";
                    }


                    html += "</tr>";
                }
                html += "</tbody></table>";


                //$jq("#ProjectQuestionAnswerBottomPanel").show();
                //$jq("#ProjectQuestionAnswerBottomPanel").html("<summary>Your Question</summary>" + html);
                //$jq("#ProjectQuestionAnswerBottomPanel").prop("open", true);
                if(isNewAnswerReceived){
                    $jq("#ProjectQuestionAnswerBottomPanelSummary").css('color','green');
                }
                $jq("#ProjectQuestionAnswer").show();
                $jq("#ProjectQuestionAnswer").html("<summary>Your Questions</summary>" + html);
                $jq("#ProjectQuestionAnswer").prop("open", true);
            }
            else{
                $jq("#ProjectQuestionAnswerBottomPanel").hide();
            }
        });
    setTimeout(ProjectQuestionAnswerByCurrentUser, 200000);
}
//only for production manager
function ProjectQuestionAnswerByActive(isNotShowOnStartup){
    var go_path = "Employee_Switch_Person.php?action=ProjectQuestionAnswerByActive&vars=0";
    $jq.get(go_path,{},function(data){
        data = JSON.parse(data);
        if(data.length > 0){

            $jq.get(go_path,
                {
                }, function(data)
                {
                    var output = JSON.parse(data);
                    if(output.length > 0) {

                        var html = "<table class='sortable table table-hover' border='1'><thead><tr>";
                        html = html + "<th class='col-md-2'>Project Name</th>";
                        html = html + "<th class='col-md-4'>Question</th>";
                        html = html + "<th class='col-md-2'>Ask Date</th>";
                        var isNoAnswerGivenQuestion = false;
                        for (var i = 0; i < output.length; i++) {

                            html += "<tr><td >" + output[i].Name + "</br><small>" + output[i].AskedBy + "</small></td>";

                            var questionCssId = 'projectQAAnswer_' + output[i].ProjectQAId;

                            if (typeof output[i].ProjectAnswer == 'string') {

                                html += "<td>Q: " + output[i].ProjectQuestion + "</br><span class='text-info'>A: " + output[i].ProjectAnswer + "</span></td>";
                                html += "<td>" + output[i].AskDateTime + "</br> <small class='text-info'>You have answered at </small></br><small class='text-info'>" + output[i].AnswerDateTime + "</small></td>";

                            }
                            else {
                                isNoAnswerGivenQuestion = true;
                                html += "<td >Q:" + output[i].ProjectQuestion + "</br><textarea rows='1' class='textareaProjectQAnswer' id='" + questionCssId + "'  rows='4' cols='10'></textarea></td>";
                                html += "<td>" + output[i].AskDateTime + "</br><input onclick='ProjectQAAnswerByPM(" + output[i].ProjectQAId + ")' type='button' value='Answer'/>";
                                if (output[i].isEditable == 0) {
                                    html += "</br><input onclick='ProjectQAAnswerAllowEdit(" + output[i].ProjectQAId + ")' type='button' value='Allow Edit'/></td>";
                                }
                                else {
                                    html += "</br><small>This Question will be updated!</small></td>";
                                }
                            }
                            html += "</tr>";
                        }
                        html += "</tbody></table>";
                        if(isNoAnswerGivenQuestion){
                            $jq("#ProjectQuestionAnswerBottomPanelSummary").css('color','green');
                        }

                        $jq("#ProjectQuestionAnswer").html(html);
                        //$jq("#ProjectQuestionAnswerBottomPanel").html("<summary><span id='maximizeProjectQuestionAnswerPanel' class='glyphicon glyphicon-menu-down'></span>All Projects Q/A <input class='text-left' id='maximizeProjectQuestionAnswerPanel' type='checkbox'/>Startup Open</summary>" + html);
                        //if(isNotShowOnStartup) {
                          //  $jq("#ProjectQuestionAnswerBottomPanel").hide();
                           // $jq("#ProjectQuestionAnswerBottomPanel").prop("open", false);
                        //}
                        //else{
                            //$jq("#ProjectQuestionAnswerBottomPanel").show();
                            //$jq("#ProjectQuestionAnswerBottomPanel").prop("open", true);
                        //}
                    }
                    else{
                        $jq("#ProjectQuestionAnswerBottomPanel").hide();
                    }

                });
        }
        else{
            //$jq("#ProjectModeBottomPanel").hide("");
        }
    });
    setTimeout(ProjectQuestionAnswerByActive, 200000);
}

function ProjectQAAnswerAllowEdit(projectQAId){
    var data = {
        "action" : "ProjectQAAnswerAllowEdit",
        "ProjectQAId" : projectQAId,
        "isEditable" : 1
    };

    $jq.ajax({
        url : "Employee_Switch_Person.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {
            console.log(data);
            ProjectQuestionAnswerByActive();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error occur ", errorThrown);
        }
    });
}


function ProjectQAAnswerByPM(projectQAId){

    var projectQAAnswercssId = "projectQAAnswer_" + projectQAId;
    var projectQAAnswer = $jq("#" + projectQAAnswercssId).val();

    var data = {
        "action" : "ProjectQAAnswerByPM",
        "ProjectQAId" : projectQAId,
        "ProjectQuestionAnswer" : projectQAAnswer
    };

    $jq.ajax({
        url : "Employee_Switch_Person.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {
            console.log(data);
            ProjectQuestionAnswerByActive();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error occur ", errorThrown);
        }
    });
}
// Project Mode Change related functions --END//
function allProjectList(){
    if($jq("#showAllProjectCheck").prop('checked')){
        var go_path = "Employee_Switch_Person.php?action=allAandFinishProjects&vars=0";
        $jq.get(go_path,
            {
            }, function(data)
            {
                $jq(".ProjectName").html(data);
            }
        );
    }
    else
    {
        go_path = "Employee_Switch_Person.php?action=getTeamLeadProjectAndEmployee&vars=1&var1="+1;
        $jq.get(go_path,
            {
            }, function(data)
            {
                var get_data = new Array();     // declare array
                var get_data = data.split('----//------'); // get_data is data comming from php file
                $jq(".ProjectName").html(get_data[1]);  // project name from project table
            });
    }
    //getPersonNameAndProjectName();
}
function getProjectTeamLead(projectId){
    go_path = "Employee_Switch_Person.php?action=getProjectTeamLeadId&vars=1&var1="+ projectId;
    $jq.get(go_path,
        {
        }, function(data)
        {
            return JSON.parse(data);
        });
}
function getProjectStatusAndContinueRequest(projID){
    var go_path = "Employee_Switch_Person.php?action=getProjectMode&vars=1&var1="+ projID;
    $jq.get(go_path,{},function(data){
        var projectStatusId = data;
        // If projectMode is not continue then request it to Continue and progress
        if(projectStatusId != 1){
            alert("Info\nThe project was currently not in continue mode. An additional request will made for project mode change.");
            //1 = contine, 2 = progress
            requestProjectModeChange(projID, 1, 2);
        }
    });
}
function getProjectStatusAndContinue(projID){
    var go_path = "Employee_Switch_Person.php?action=getProjectMode&vars=1&var1="+ projID;
    $jq.get(go_path,{},function(data){
        var projectStatusId = data;
        // If projectMode is not continue then request it to Continue and progress
        if(projectStatusId != 1){
            //alert("Info\nThe project was currently not in continue mode. An additional request will made for project mode change.");
            //1 = contine, 2 = progress
            //requestProjectModeChange(projID,1,2);
            updateProjectInfo(projID,1,2);
        }
    });
}
//Project Mode related functions -- END//

//Dinner Related functions -- START//
/*Add dinner items into database*/
function AddDinnerItem(){
    var dinnerName = $jq("#dinnerName").val().trim();
    if(dinnerName ==''){
        alert("Validation Error\nDinner Name must be inserted.");
        return false;
    }
    var dinnerDesc = '';
    var dinnerPrice = 0;
    var status = $jq("input[name=status]:checked", '#dinnerForm').val();
    go_path = "Employee_Switch_Person.php?action=AddDinnerItem&vars=4&var1='"+ dinnerName +"'&var2='" + dinnerDesc + "'&var3=" + dinnerPrice + "&var4=" + status;
    $jq.get(go_path,
        {
        }, function(data)
        {
            console.log(JSON.parse(data));
            if(data == 1){
                getDinnerItem();
            }
            else{
                alert("Insertion Failed! Error Occur \n" + data);
            }
        });
}
/*Get the dinner itmes and show it in table with active and deactive buttons*/
function getDinnerItem(){
    go_path = "Employee_Switch_Person.php?action=getDinnerItem&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            console.log(data);
            var data = JSON.parse(data);
            var html = "<h3>";
            if(data.length > 0){
                html = "<table class='table'><tr><td>Dinner Menu</td><td>Change Status</td><td>Delete</td></tr>";
                for(var i = 0; i < data.length; i++){
                    console.log(data[i].active);
                    if(data[i].active == 1)
                        html +="<tr><td class='bg-success'><h4>"+data[i].dinnerName+"</h4></td><td><button   class='btn btn-primary btn-block' onclick='dinnerItemStatusUpdate(0,"+data[i].dinnerId+")' >Deactive</button></td><td><button class='btn btn-danger glyphicon glyphicon glyphicon-remove' onClick='dinnerItemDelete("+data[i].dinnerId+")'></button></td></tr>";
                    else  if(data[i].active == 0)
                        html +="<tr><td class='bg-primary'><h4>"+data[i].dinnerName+"</h4></td><td><button class='btn btn-success btn-block' onclick='dinnerItemStatusUpdate(1,"+data[i].dinnerId+")'>Active</button></td><td><button class='btn btn-danger glyphicon glyphicon glyphicon-remove' onClick='dinnerItemDelete("+data[i].dinnerId+")'></button></td></tr>";
                }
                html += "</table>";
                $jq(".displayDinnerItem").html(html);
            }
            else{
                $jq(".displayDinnerItem").html("No data available yet.");
            }
        });
}
/*get Selected leave time of Employee in order to show him dinner options or not*/
function getSelectedLeaveTime(timeSelected){

    $jq(".VoteSubmitBtn").prop("disabled",false);
    if(timeSelected >= 9){
        var go_path = "Employee_Switch_Person.php?action=getDinnerItemActive&vars=0";
        $jq.get(go_path,
            {
            }, function(data)
            {
                var data = JSON.parse(data);
                var html = "<div> <span class='bg-primary'>Thank you for Giving Overtime. What you will like to take in Dinner :)</span> <select class='dinnerList'><option value='0'>Select Please</option>";
                for(var i = 0; i<data.length;i++){
                    html += "<option  value='"+data[i].dinnerId +"'>"+data[i].dinnerName+"</option>"
                }
                html +="</div>";
                $jq(".dinnerSelection").html(html);
            }
        );
    }
    else{
        $jq(".dinnerSelection").html("");
    }
}
/*Activate or deactivate dinner items which will show in list*/
function dinnerItemStatusUpdate(status, dinnerId){
    console.log(status);
    console.log(dinnerId);
    go_path = "Employee_Switch_Person.php?action=dinnerItemStatusUpdate&vars=2&var1='"+ dinnerId +"'&var2='" + status;
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(data ==1){
                getDinnerItem();
            }
            else{
                alert("Status Updation Failed! Error Occur \n" + data);
            }
        });
}
/*delete dinner item by id*/
function dinnerItemDelete(dinnerId){
    console.log(dinnerId);
    go_path = "Employee_Switch_Person.php?action=dinnerItemDelete&vars=1&var1="+ dinnerId;
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(data ==1){
                getDinnerItem();
            }
            else{
                alert("Deletion Failed! Error Occur \n" + data);
            }

        });
}
//Dinner Related functions -- END//

/*Checking Vote Question --Start*/
//Order of Function flow
// checkVotingQuestionTime -> checkVoteQuestionGenerated ->c heckVoteSubmitttedByUser //

function checkVotingQuestionTime(){
    var currentTime = new Date();
    if(currentTime.getHours() >= 16 && currentTime.getHours() < 23)
    {
        checkVoteQuestionGenerated();
    }
}
function checkVoteQuestionGenerated(){
    go_path = "Employee_Switch_Person.php?action=checkVoteQuestionGenerated&vars=1&var1="+ getCurrentDateFullFormat();
    $jq.get(go_path,
        {}, function(data)
        {
            response = JSON.parse(data);
            if(response.length > 0){
                var VoteId = response[0].VPPK;
                checkVoteSubmittedByUser(VoteId);
            }
        })
}
function checkVoteSubmittedByUser(VoteQuestId){
    go_path = "Employee_Switch_Person.php?action=checkVoteSubmittedByUser&vars=2&var1="+VoteQuestId +"&var2=" + readCookie("userID");
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(JSON.parse(data).length == 0){
                votingQuestion("#votingQuestionDisplay");
            }
            else{
                clearTimeout(voteQuestionTimeOut);
                $jq("#votingQuestionDisplay").html("");
            }

        })
}
function getSupervisorCurrentProjectsEmployeeName(projectId){
    go_path = "Employee_Switch_Person.php?action=getSupervisorCurrentProjectsEmployeeName&vars=1&var1="+projectId;
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(JSON.parse(data).length > 0){
                var options = JSON.parse(data);
                var optionsHtml ="";
                for(var i = 0; i < options.length; i++){
                    optionsHtml += "<option value= " + options[i].EmployeeNamePK + ">" + options[i].Employee_Name + "</option>";
                }
                $jq("#tbTaskChange").find(".supervisorProjectEmpList").html(optionsHtml);
            }
            else{
                alert("No employee found on this project.")
            }
        });
}

/*Checking Vote Question --END*/