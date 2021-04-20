var clock, size, interval = null;
var $jq = jQuery.noConflict(true);

$jq(document).ready(function() {
    // if(+readCookie("permission_EmpSwitchRequest") || + readCookie("permission_GetSwitchRequest")){
    //updateAlerts(true);
    // }
    var pageName = window.location;
    if(window.location.href.indexOf("projectCommentHistory.php") > -1){
        allAandFinishProjects(0);
    }
    if(window.location.href.indexOf("script_detail") > -1) {
        var go_path = "Employee_Switch_Person.php?action=slidechange&vars=0";

        $jq.get(go_path,
            {
            }, function(data)
            {
                //$jq("#chk").val(data);
                // $jq.getScript( "Slider/js/bjqs-1.3.min.js");
                $jq("#banner-slide").find('.bjqs').html(data);
                $jq.getScript('Slider/js/bjqs-1.3.min.js', function() {
                    $jq("#chk").val('Javascript is loaded successful! sayHello() function is loaded!');
                });
            });
    }
    if(window.location.href.indexOf("vote_Form1") > -1){
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
    if(window.location.href.indexOf("ModelerPage") > -1){
        updateAlerts(true);
        getUserAssignWork();
        if(+readCookie("permission_GetSwitchRequest")){
            getProjectModeChangeRequest();
            $jq.when(getPersonNameAndProjectName(),GetProject_ModeOptions(), getPersonNameAndProjectNameWithRestriction())
                .then(getpermissions()).then(allUnFinishProject()).then( allAandFinishProjects()).then( votingQuestion()).then(whiteboardfnCalling());
        }
        else if (+readCookie("permission_EmpSwitchRequest")) {
            getProjectModeChangeRequestMadeList();
            ProjectListForProjectModeChange();
            $jq.when(getPersonNameAndProjectName(),GetProject_ModeOptions(), getPersonNameAndProjectNameWithRestriction())
                .then(getpermissions()).then(allUnFinishProject()).then( allAandFinishProjects()).then( votingQuestion()).then(whiteboardfnCalling());
        }
        else{
            $jq("#requestBottomPanel").hide();
            $jq("#ProjectModeBottomPanel").hide();
            $jq.when(votingQuestion()).then(whiteboardfnCalling()).then(getpermissions());
        }

        $jq(function(){	// refresh white board again an again at every x second
            interval = setInterval(whiteboardfnCallingRepeatly, 20000);
        });

        $jq("#flipcountdownbox1").flipcountdown({
            size:"sm",
            am:true
        });


        //window.onfocus = function () {
        //    console.log("WB Refresh On Focus");
        //    refreshWB();
        //};
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
        //$jq("#btnExport").click(function () {
        //    $jq("#tblExport").btechco_excelexport({
        //        containerid: "tblExport"
        //        //, datatype: $jqdatatype.Table


        //    });
        //});
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
            if(nameID == "0" || projID == 0 || typeof nameID == 'undefined' || typeof projID == 'undefined')
            {
                alert ("Please Select the Person and Project First");
                return false;
            }
            if(confirm("Do You want to make a switch request for " +$jq("#"+tabParID).find(".nameEmpToSwitch option:selected").text()+ " to "+  $jq("#"+tabParID).find('.ProjectNameWhereToSwitch').find('.dmProjName option:selected').text()))
            {
                var go_path = "Employee_Switch_Person.php?action=SwitchEmpRequestCompare&vars=2&var1="+nameID+"&var2="+projID;
                $jq.get(go_path,
                    {
                    }, function(data)
                    {
                        if(data == "")
                        {
                            var go_path = "Employee_Switch_Person.php?action=getEmpCurrentProjectName&vars=1&var1="+nameID;
                            $jq.get(go_path,{},function(data){
                                var go_path = "Employee_Switch_Person.php?action=SwitchEmpRequest&vars=3&var1="+nameID+"&var2="+projID+"&var3="+data; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
                                console.log(go_path);
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
            //var switchProjectTeamLeadId = getProjectTeamLead(projID);
            //console.log("switchProjectTeamLeadId",switchProjectTeamLeadId);
            go_path = "Employee_Switch_Person.php?action=getProjectTeamLeadId&vars=1&var1="+ projID;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    var dataResponse = JSON.parse(data);
                    switchEmployeeCall(nameID, projID, dataResponse[0].TeamLead);
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
            //alert("Click");
            var tabParID = $jq(this).closest('table').attr('id');
            console.log(tabParID);
            MonthlySheet(tabParID);
        });
		 $jq('#MonthlySheetWithEfforts').click(function () {
            //alert("Click");
            var tabParID = $jq(this).closest('table').attr('id');
            console.log(tabParID);
            MonthlySheetWithEfforts(tabParID);

        });
        $jq('#SinglePersonEfforts').click(function () {
            //alert("Click");
            var tabParID = $jq(this).closest('table').attr('id');
            console.log(tabParID);
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
            //alert("Click");
            var tabParID = $jq(this).closest('table').attr('id');
            memberTotalDaysOnProj(tabParID);

        });
        $jq('#ProjectsDaysSummary').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            ProjectsDaysSummary(tabParID);

        });
        $jq('#ShowPermissions').click(function () {
            var tabParID = $jq(this).closest('table').attr('id');
            //alert("permission: "+tabParID );
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
                        console.log(get_data_col);
                        htmls = htmls + "<tr>";
                        if(i== 10)
                            htmls += "</tr><tr>";
                        var get_data_col = new Array();
                        get_data_col  = get_data_row[i].split(',');
                        console.log(get_data_col);
                        for(var j = 0; j<get_data_col.length ; j++)
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
            var go_path = "Employee_Switch_Person.php?action=permission&vars=17&var1="+id+"&var2="+
                switchs+"&var3="+AllowProjects+"&var4="+VerifyAllowProjects+"&var5="+WhiteBoard+"&var6="+
                ChkEmpProjDays+"&var7="+ChkProjDays+"&var8="+permissionPage+"&var9="+MemberNames+"&var10="+
                MainMenuTop+"&var11="+WhiteBoard_EmpDetail+"&var12="+Entry_WhiteBoard+"&var13="+Proj_StatusEdit+
                "&var14="+Ger_StatusReport+"&var15="+SwitchRequest+"&var16="+GetSwitchRequest+"&var17="+selfCategoryList;//TODO:
            console.log(go_path);
            $jq.get(go_path,
                {
                }, function(data)
                {
                    $jq("#chk").val(go_path);
                    console.log("successfully updated data",data);
                    $jq("#permissionInfo").html("");
                }
            );
        });
        $jq('#Submit_Daily_Question').click(function () {
            Submit_Daily_Question();
        });
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
                    $jq("#chk").val(data);
                }).done(function(){

                    IndicatorBusyNot();
                });
        });
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
            var go_path = "Employee_Switch_Person.php?action=SaveEmpDetail&vars=7&var1="+id+"&var2="+name+"&var3="+loginanme+"&var4="+dept+"&var5="+desig+"&var6="+shiftmode+"&var7="+dept_category;
            $jq.get(go_path,
                {
                }, function(data)
                {

                    //$jq("#chk").val(go_path);
                    if(data == "")
                        $jq("#editverify").html("Has been changed Sucessfully");
                    else
                        $jq("#editverify").html("Some Error occur");
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

        var go_path = "atuocompleteDB.php?action=ProjectListContinueStartPause&vars=0"; //33 is omer bahi id
        $jq.get(go_path,
            {
            }, function(data)
            {
                console.log(data);
                $jq( ".projectName").html(data);
                $jq(".dmProjName").attr("name","id")
            });
        $jq("#addproject").click(function()
        {
            console.log("before");
            addproject();
            console.log("after");
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
        console.log(getUrlVars().dt);
        EmployeeProgressAddList(getUrlVars().dt);
    }
    else if(window.location.href.indexOf("empProgressSelect.php")> -1){
        showAllProjectsName();
    }
});
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
                        console.log("atuocompleteDB.php?action=lastAddProject&vars=1&var1="+NewprojName);
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
            if(data.length>0){

                if(previousDataStringAssignWork != JSON.stringify(data)){
                    var tblBody = "<h1>Your Tasks</h1><p><strong><big> "+ data.length +"</big></strong> Pending Task(s) for you!</p>";
                    tblBody+= "<table><tr><td>Project Name</td><td>Work Description</td><td>Start Date</td><td>Assign By</td></tr>";
                    for (var i=0; i<data.length; i++)
                    {
                        tblBody += "<tr><td>"+ data[i].ProjectName + "</td><td>"+ data[i].AssignWork+"</td><td>" + data[i].WorkDate+ "</td><td>"+ data[i].AssignedBy+"</td></tr>";
                    }
                    tblBody += "</table>";
                    $jq("#WorkBottomPanel").html("<summary>Your Assigned Tasks</summary>" + tblBody);
                    $jq("#WorkBottomPanel").prop("open",true);
                    previousDataStringAssignWork = JSON.stringify(data);
                }
            }
            else {
                var tblBody = "<p>No pending Task for you!</p>";
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
            console.log("emp switch alert",data);
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
                var tblBody = "<tr><td>Request By</td><td>Person Name</td><td>Current Project</td><td>Switch to Project</td><td>DateTime</td>";
                if(+readCookie("permission_GetSwitchRequest")){
                    tblBody += "<td colspan='2'>Accept or Reject</td>";
                }
                else if(+readCookie("permission_EmpSwitchRequest")){
                    tblBody += "<td colspan='2'>Cancel</td>";
                }else {
                    //tblBody += "<td colspan='2'>onProgress</td>";
                }
                tblBody += "</tr>";

                for(var i=0;i<response.length;i++){
                    var cteamLead, nteamLead;
                    if(!response[i].CurrentProTL)
                        cteamLead = "none";
                    else
                        cteamLead = response[i].CurrentProTL;
                    if(!response[i].NewProTL)
                        nteamLead = "none";
                    else
                        nteamLead = response[i].NewProTL;
                    tblBody = tblBody + " "+ "<tr><td>"+response[i].requestBy+"</td><td>"+response[i].Employee_Name+"</td><td>"+response[i].CurrentProject+ "</br><small>[" + cteamLead  +"]</small></td><td>"+response[i].projectName+"</br><small>[" + nteamLead  +"]</small></td><td>"+response[i].requestDateTime.substr(0,10)+"</br>"+ response[i].requestDateTime.substr(11,response[i].requestDateTime.length) +"</td>";
                    if(+readCookie("permission_GetSwitchRequest")){
                        tblBody += "<td><input type='button' id='acceptSwitch'  onclick='acceptRequest("+response[i].nameId+","+ response[i].projId+","+ response[i].id+ ","+ response[i].NewProTLId +")' value='Accept'></td><td><input type='button' id='rejectSwitch' value='Reject' onclick='empSwitchRequestUpdate(2,"+ response[i].id+")'></td>";
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
                //if((($jq.trim(html).length) - ($jq.trim($jq("#requestBottomPanel").html()).length)) > 100)
                //{
                    //$jq("#switchRequestEmp").html(html);
                    $jq("#requestBottomPanel").prop("open",true);
                    getPersonNameAndProjectNameWithRestriction();
                //}
            }
            else {
                $jq("#requestBottomPanel").hide();
                $jq("#switchRequestEmp").html("");
            }

        }
    });
    //setTimeout(updateAlerts, 15000); // Every 15 seconds.
}

function acceptRequest(nameID, projID, recordId, teamLeadId){
    switchEmployeeCall(nameID,projID, teamLeadId);
    empSwitchRequestUpdate(1, recordId);
    updateAlerts(false);
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
            console.log("retriveProjectDetail()");
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
function showAllProjectsName(){
    var go_path = "Employee_Switch_Person.php?action=allAandFinishProjects&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq(".ProjectNameModeChange").html(data);
            console.log(data);
        }
    );
}
function ProjectListForProjectModeChange(){
    if($jq("#showAllProjectCheck").prop('checked')){
        showAllProjectsName();
    }
    else{
        go_path = "Employee_Switch_Person.php?action=getTeamLeadProjectAndEmployee&vars=1&var1="+1;
        $jq.get(go_path,
            {
            }, function(data)
            {
                var get_data = new Array();     // declare array
                var get_data = data.split('----//------'); // get_data is data comming from php file
                //$jq(".nameEmpToSwitch").html(get_data[0]);  //employee name from employee table
                $jq(".ProjectNameModeChange").html(get_data[1]);  // project name from project table

            });

        //var go_path = "Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1="+33;
        //$jq.get(go_path,
        //    {
        //    }, function(data)
        //    {
        //        console.log("new Data")
        //        var get_data = new Array();     // declare array
        //        var get_data = data.split('----//------'); // get_data is data comming from php file
        //        //$jq(".nameEmpToSwitch").html(get_data[0]);  //employee name from employee table
        //        $jq(".ProjectName").html(get_data[1]);  // project name from project table
        //        console.log(get_data[1]);
        //    });
    }
    //getPersonNameAndProjectName();
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
    var go_path = "Employee_Switch_Person.php?action=GetProject_ModeOptions&vars=0";
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
    console.log("whiteboardfnCallingRepeatly()");
    console.log(document.hasFocus());
    if(document.hasFocus()){
        refreshWB();
        getProjectModeChangeRequestListForEveryKindOfUser();
        getUserAssignWork();
        updateAlerts(false);
    }

    window.onfocus = function (){
        console.log("doc has focused");
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
    console.log(difference.getTime());
    setTimeout(function() {
        overTimeStart() }, difference.getTime());
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
function votingQuestion(){
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
                htmls += '<button id="'+get_data[0]+'" type="Button" onclick="Save_Vote(this.id)">Save</button> ';
            }
            else
            {
                //htmls += '<button id="'+get_data[0]+'" type="Button" onclick="Reset_Vote(this.id)">Reset</button>';
                //alert (get_data[2]);
            }
            htmls += '<button id="'+get_data[0]+'" type="Button" onclick="Detail_Vote(this.id)">Detail</button>';
            htmls += "</tr></table>";
            htmls += get_data[3];
            if(get_data.length > 3)
                htmls += get_data[4];
            $jq("#votingQuestion").html("<h3>Voting Question</h3>"+htmls);
            $jq("#chk").val(htmls);
        }
    );
}
function Save_Vote(pkid){
    var optionsLen = $jq('.VoteAns').length;
    var tf = "";
    var tfVal = "";
    var i= 1;
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
    $jq("#chk").val(tf);
    var go_path = "Employee_Switch_Person.php?action=Save_Vote&vars=4&var1="+pkid+"&var2="+optionsLen+"&var3="+tf+"&var4="+tfVal;
    $jq("#chk").val(go_path);
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#chk").val(data);

            refreshPage();
        }
    );
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
function Detail_Vote (pkid){
    var voter = $jq('input[name=voter]');
    var sortVoteBy = voter.filter(':checked').val();
    var go_path = "Employee_Switch_Person.php?action=Detail_Vote&vars=2&var1="+pkid+"&var2="+sortVoteBy;
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
                    htmls = htmls+"</td>";
                }
                htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
            $jq("#votingDetail").html(htmls);
        });
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
    //alert(html);
    var go_path = "Employee_Switch_Person.php?action=Submit_Question&vars=2&var1="+mainQueestion+"&var2="+html;
    $jq.get(go_path,
        {
        }, function(data)
        {
            $jq("#chk").val(data);

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
            $jq("#chk").val(data);
            var get_data = data.split(',');//2,2,,2013-09-18,2013-10-16
            $jq("#loginname").val( get_data[1]);
            $jq("#dept").val(get_data[2]);
            $jq("#desig").val(get_data[3]);

            //$jq("#chk").val(get_data[4]);
            $jq("#shift").val(get_data[4]);
            $jq("#dept_category").val(get_data[5]);
            $jq("#name").val( get_data[0]);
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
            $jq("#chk").val(data);
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
            $jq("#chk").val(data);
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
function memberTotalDaysOnProj(tabParID){
    var dateRng = $jq("#"+tabParID).find(".date").val();

    var projID = $jq("#"+tabParID).find('.ProjectName').find('.dmProjName').val();

    if(projID == "0")
    {
        alert ("Please Select the Project First");
        return false;
    }
    var go_path = "Employee_Switch_Person.php?action=memberTotalDaysOnProj&vars=2&var1="+projID+"&var2="+dateRng;

    $jq.get(go_path,
        {
        }, function(data)
        {
            console.log("see this "+data);
            console.log("error :: "+data.indexOf('xdebug-error'));
            if(data.indexOf('xdebug-error') == -1){
                $jq("#chk").val(data);
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
                $jq("#ProjectsPreviousDaysInfo").html(htmls);
            }


            else{
                alert("Sorry! No data found.");
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
            $jq("#chk").val(data);
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
    console.log("AllmodelerNotAvaiableFilter");
    var nameID = $jq("#"+tabParID).find(".nameEmp").val();
    var dateRng = $jq("#"+tabParID).find(".date").val();
    if(dateRng == "")
    {
        alert ("Please Enter the Date Firstt");
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
            console.log(data);
            var empDaysStatusRecords = JSON.parse(data);
            var excelName;
            if(empDaysStatusRecords.length !=0) {
                console.log(empDaysStatusRecords);
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
                    var indexCount = 1;
                    for (var i = 0; i < empDaysStatusRecords.length; i++) {
                        if(empDaysStatusRecords[i].SwitchDate != previousSwitchDate){
                            htmls += "<tr><td>" + indexCount + "</td><td><a target='_blank' href=EmpDayStatus.php?switchDate="+empDaysStatusRecords[i].SwitchDate+"&empId="+empDaysStatusRecords[i].EmpId+">"+empDaysStatusRecords[i].Employee_Name+"</a></td><td>" + empDaysStatusRecords[i].Half + "</td>" +
                            "<td>" + empDaysStatusRecords[i].LeaveName + "<td>" + empDaysStatusRecords[i].SwitchDate + "</td>";
                            htmls += "<td>0.5</td>";
                            indexCount++;
                        }
                        else
                        {
                            htmls = htmls.substr(0, htmls.length - 12);
                            htmls += "<td>1</td></tr>";
                        }
                        previousSwitchDate = empDaysStatusRecords[i].SwitchDate;
                    }
                    htmls = htmls + "</table>";
                    htmls += "<input type='button' download='FileName' onclick=\"tableToExcel('ProjectsDaysInfo','Employee Off Sheet','"+empDaysStatusRecords[0].Employee_Name+" - "+dateRng +".xls')\" value='Export to Excel'>";
                    $jq("#ProjectsDaysInfo").html(htmls);
                }
                else {
                    htmls = "<table border = 1><caption class='text-center'>Date Range : " + dateRng + "</caption>";
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
                    //htmls += "<input type='button' id='btnExport' onclick='btnExport()' value='Export to Excel'>";
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
//Employee Progress Functions - Start
function progressColorChange(that){
    console.log(that);
    console.log($jq("#"+ that).parent(".progressColorGrade"));
    //$jq("#"+that).parent(".progressColorGrade").css("display","none");
    //$jq("#that").css('display','none');
    //$jq("#that").css('color','red');
    //$jq('#'+that).children().

    $jq("#" + that).parent().children('.progressColorGrade').each(function(indx,obj){
        console.log('child object',$jq(this).children('div').is(":hidden"));
        console.log('child object',obj);
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
    //var previousDate = new Date();
    //var date = previousDate.getDate();
    //var month = previousDate.getMonth()+1;
    //var year = previousDate.getFullYear();
    //var dateString = year+"-"+month+"-"+date;
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
    //html += '<td width="30px" class="tdClick"><img val="1" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\TickStatus.jpg" style="display: none;"></td>'
    //go_path = "Employee_Switch_Person.php?action=viewEmpProgressByDate&vars=2&var1="+readCookie("userID")+"&var2="+dateString;
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
            //"<td class='col-lg-1'>Below Avg.</td><td class='col-lg-1'>Avg.</td><td class='col-lg-1'>Good</td><td class='col-lg-1'>Excellent.</td></tr>";

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
                            console.log(id);
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
                            console.log(id);
                            //dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[k].ColorCode + '">-</div></td>';
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
                        console.log(id);
                        //dataToDisplay += '<td class = "progressColorGrade empPK_'+parseData[i].PK +'" onclick="progressColorChange(this.id)" id='+id+'><div style="display : none; background-color:'+ progressColors[l].ColorCode + '">-</div></td>';
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
            //if($jq("#whiteboard_PreDate").html().length !=15)
            $jq("#btnExcelExport").html("<input type='button' onclick=\"tableToExcel('displayProgress', 'W3C Example Table')\" value='Export to Excel'>");
            $jq("#displayProgress").html(dataToDisplay);

        });
}
function viewEmpProgressBetweenDateCollectively(){
    var progressColors, colorHtml;
    //var previousDate = new Date();
    //var date = previousDate.getDate();
    //var month = previousDate.getMonth()+1;
    //var year = previousDate.getFullYear();
    //var dateString = year+"-"+month+"-"+date;
    var go_path = "Employee_Switch_Person.php?action=employeeProgressColor&vars=0";
    $jq.get(go_path,{},function(data){
        progressColors = JSON.parse(data);
    });
    var dateStartString = $jq('#empProgressViewDateStart').val();
    var dateEndString = $jq('#empProgressViewDateEnd').val();
    //console.log(dateString);
    var dateSave;
    //html += '<td width="30px" class="tdClick"><img val="1" class="DC_Status " at="status_'+id+'_'+phase+'_'+Rows+'" src="img\\TickStatus.jpg" style="display: none;"></td>'
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
	 //if date selected then show selected date Data
    //if($jq("#empProgressDate").val()){
    //    dateString = $jq("#empProgressDate").val();
    //}
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
            console.log(data);
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
            console.log(data);
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
			//console.log(SPEfforts);
			
			var html = "<table border='1'><tbody>";
			html += "<tr>" 
			
			html += "<th>Employee Name</th><th>Project Name</th><th>Marking</th><th>Half</th><th>Date</th>"
			
			
			html += "</tr>" 
			
			var whr = 0;
			var whr_Itr = 0;
			for (var i = 0; i < SPEfforts.length; i ++)
			{
				if(SPEfforts[i].hoursWorked  != 0)
				{
					html += "<tr><td>"+SPEfforts[i].Employee_Name +"</td><td>"+SPEfforts[i].Name +"</td><td style ='background-color :  "+SPEfforts[i].ColorCode+"  '>"+SPEfforts[i].hoursWorked +"</td><td>"+SPEfforts[i].Half +"</td><<td>"+SPEfforts[i].SwitchDate +"</td></tr>"
					whr += parseInt(SPEfforts[i].hoursWorked)
					whr_Itr += 1;
				}
				
				
			}
			var avg  = ( whr / whr_Itr)
			html += "<tr><td>Total </td><td> "+whr+" / "+whr_Itr+" </td> "       
			html += '<td style="background-color : '+ GetFloorUpto10Value(avg, 10) +  ' \"> '
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
		console.log("ProgressColorArr In : " + ProgressColorArr);
	});
			
	 var go_path = "Employee_Switch_Person.php?action=MonthlySheetWithEfforts&vars=2&var1=" + nameID + "&var2=" + dateRng;
	  $jq.get(go_path,
        {
        }, function(data)
        {
			var ProjName_Array = [];    // ["ProjName"]		// Contain Only Project name
			EmpObj = [];	        	// each element single object which has all Project information
			console.log(JSON.parse(data));
			var EffortsObjects = JSON.parse(data);
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

			for (var i = 0 ; i < EffortsObjects.length; i++)
			{
				EmpObj[EffortsObjects[i].EmployeeNamePK]["Employee_Name"] = EffortsObjects[i].Employee_Name;
				if(EffortsObjects[i].hoursWorked != 0)	
				{
					EmpObj[EffortsObjects[i].EmployeeNamePK][EffortsObjects[i].Name] += parseInt( EffortsObjects[i].hoursWorked);
					EmpObj[EffortsObjects[i].EmployeeNamePK][EffortsObjects[i].Name + "_Itr"] += 1;
				}
			}

			// now Dispay on page
			var html = "<table border='1'><tbody>";
			html += "<th>" ;
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
					for ( j = 1 ; j < ProjectNames.length ; j++)
					{
						var calcHr;
						if(EmpObj[i][ProjectNames[j]] != 0)
						{
							calcHr = EmpObj[i][ProjectNames[j]] / EmpObj[i][ProjectNames[j] + "_Itr"];
							CountNonZeroHr++
						}
						else  calcHr = EmpObj[i][ProjectNames[j]];
						
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
					html += '<td style="background-color : '+ ProgressColorArr[GetFloorUpto10Value(totalAvg, 10)] +  ' \">' + totalAvg.toFixed(2) + "</td>"
					html += '<td>' + TotalHoursRow.toFixed(3) + "</td>";
					html += "</tr>" ;
				}
			}
			
			html += "</tbody></table>";
			$jq("#ProjectsDaysInfo").html(html);
		});
		
}
function GetFloorUpto10Value(number , multiplier){
	Number.round = function(number, multiplier){
    multiplier = multiplier || 1;
    return Math.floor(number / multiplier) * multiplier;
};
 return Number.round(number, multiplier)
}
//Employees Progress Functions END
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
            for(var i = 0; i<get_data_row.length; i++ )
            {
                var get_data_col = new Array();
                get_data_col  = get_data_row[i].split(',');
                ProjNoArr[get_data_col[1]] =  get_data_col[1]; //get_data_col[1] : PTPK
                ProjNanmeArr[get_data_col[1]] =  get_data_col[3]; //get_data_col[3] : Name
                ModNoArr[get_data_col[0]] =  get_data_col[0] ;//get_data_col[1] : PTPK
                ModNameArr[get_data_col[0]] =  get_data_col[2]; //get_data_col[3] : Name
            }
            console.log(ModNoArr);
            console.log(ModNameArr);
            console.log(ProjNoArr);
            console.log(ProjNanmeArr);
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
                htmls += "</tr>"
            }
            htmls += "<tr class='totalColumn'>";
            for (p = -1; p <ProjNoArr.length; p++ )
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
                var  val = parseInt( $jq("#"+get_data_col[0]+"_"+get_data_col[1]).text() );
                val +=1;
                $jq("#"+get_data_col[0]+"_"+get_data_col[1]).html(val);
            }
            SumRows();
            SumColumn();
            rowhilight();
        });
}
function SumRows(){	// sum of rows
    var colValues = 0;
    $jq('#stripeTable > tbody > tr').each(function(i){
        colValues = 0;
        $jq('#stripeTable > tbody > tr:nth-child('+(i+1)+')>td').each(function(j){
            var cell = $jq('#stripeTable > tbody > tr:nth-child('+(i+1)+')>td:eq('+(j+3)+')').html();
            cell = parseInt(cell);
            if(($jq.isNumeric(cell)))
                colValues += cell;
        });

        if (i == -1)
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

    var go_path = "Employee_Switch_Person.php?action=fn_emp_resign_fire&vars=1&var1="+id;
    $jq.get(go_path,
        {
        }, function(data)
        {
        }
    );
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
            $jq("#result").text("	Added Successfully 	");
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
            $jq("#chk").val(data);
            $jq(".nameEmp").html(data);  //employee name from employee table
        });
}
function getPersonNameAndProjectNameWithRestriction(){
    var go_path;
    if(+readCookie("permission_memberNames")){
        go_path = "Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1="+33;
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
            $jq("#chk").val(data);
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
        }


    );
}
function updateProjectInfo(){
    var projID = $jq("#tbUpdProj").find('.dmProjName').val();
    var projStatusID = $jq("#tbUpdProj").find('.projStatus').val();
    var projModeID = $jq("#tbUpdProj").find('.projMode').val();
    var go_path = "Employee_Switch_Person.php?action=updateProjectInfo&vars=3&var1="+projID+"&var2="+projStatusID+"&var3="+projModeID;
    $jq.get(go_path,
        {
        }, function(data)
        {

        }
    );
}
function requestProjectModeChange(){
    if(confirm("Do you want to Change Project Mode Request?")){
        var projID = $jq("#reqUpdProj").find('.dmProjName').val();
        var projStatusID = $jq("#reqUpdProj").find('.projStatus').val();
        var projModeID = $jq("#reqUpdProj").find('.projMode').val();
        //requestProjectModeChange
        var go_path = "Employee_Switch_Person.php?action=requestProjectModeChange&vars=3&var1="+projID+"&var2="+projStatusID+"&var3="+projModeID;
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
function new_whiteboard_print_horizontal(data,tableid) {
    $jq("#"+tableid).html(data);
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
    //console.log("Ealier Data",get_data_row);
    for(var i = 0; i< get_data_row.length; i++ )
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
            if(table_Arr[get_data_col[1]][get_data_col[6]]== null)
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
                if( get_data_col[3] != get_data_col[9])
                {
                    table_Arr[get_data_col[1]][get_data_col[6]].push(test);
                    if(count_members[get_data_col[1]] == null)
                        count_members[get_data_col[1]] = 0;

                    count_members[get_data_col[1]] +=1;
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
                            if( table_Arr.length-1 == i || table_Arr[i][j][k][3] != table_Arr[i][j][k][9] ) //1 mean its lead
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
    //console.log("alligne Data",table_Arr);
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
    console.log("this make life easy");
    var go_path = "Employee_Switch_Person.php?action=new_whiteboardfn&vars=0";
    $jq.get(go_path,
        {
        }, function(data)
        {
            //alert(data);
            //console.log("--DATA--",data);
            $jq("#chk").val(data);
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
    $jq("#chk").val(go_path);
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
function whiteboardfn_PreDate(){
    var half = 0;
    if($jq('#half1').is(':checked'))
        half = 1;
    else if($jq('#half2').is(':checked'))
        half = 2;
    else
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
                    //col_Length =  $jq("#whiteboard_PreDate").find('tbody > tr:eq(0) td').length;
                    ////alert("Free_col: "+( Free_col ))
                    //col_Length -= 1;
                    ////alert("col_Length: "+( col_Length ))
                    //$jq.each($jq("#whiteboard_PreDate  tr"), function()
                    //{
                    //    if(typeof Free_col != 'undefined')
                    //        $jq(this).children(":eq("+col_Length+")").after($jq(this).children(":eq("+Free_col+")"));
                    //})
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
    for(var i =0; i<totalRow; i++)
    {
        temp =  $jq("#"+tableid).find('tbody > tr:eq('+i+') td').length; // current number of cell in this rows

        $jq("."+i).text(temp-4); // count total member in this projects //change to count member
        $jq("."+i).removeAttr('class');
        if( highcol < temp)
            highcol = temp;

    }
    for(var row =0; row<totalRow; row++)
    {
        temp =  $jq("#"+tableid).find('tbody > tr:eq('+row+') td').length;
        //alert("temp1: "+temp);
        temp = highcol - temp;
        //alert("temp2: "+temp);
        for(var i =0; i<temp; i++)
            $jq("#"+tableid).find('tbody > tr:eq('+row+')').append("<td style='border: 1px solid black'></td>");
    }
}
function rowINTOcolumn(tableid){
    $jq("#"+tableid).each(function() {
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
function switchEmployeeCall (nameID, projID, teamLeadId){
    var go_path = "Employee_Switch_Person.php?action=SwitchEmp&vars=3&var1="+nameID+"&var2="+projID+"&var3="+teamLeadId; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
    $jq.get(go_path,
        {
        }, function(data)
        {
            if(data == "done")
                alert("Switching Successfull");
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
            <td>Options</td><td><div id="options_div"><input name="Names" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_1" value="Values" contenteditable="false"><label id="VoteAns_'+latestNumber  +'_1_lbl" contenteditable="true">6 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_1"></label><br>\
            <input name="Names" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_2" value="Values" contenteditable="false"><label contenteditable="true">7 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_2"></label><br>\
            <input name="Names" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_3" value="Values" contenteditable="false"><label contenteditable="true">8 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_3"></label><br>\
            <input name="Names" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_4" value="Values" contenteditable="false"><label contenteditable="true">9 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_4"></label><br>\
            <input name="Names" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_5" value="Values" contenteditable="false"><label contenteditable="true">10 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_5"></label><br>\
            <input name="Names" type="radio" class="VoteAns" id="VoteAns_'+latestNumber  +'_6" value="Values" contenteditable="false"><label contenteditable="true">11 : 00 PM</label><label id="VoteAnsOP_'+latestNumber  +'_6"></label><br>\
            </div>\
            </td>\
            </tr>\
            </tbody></table>';
            var go_path = "Employee_Switch_Person.php?action=Submit_Daily_Question&vars=2&var1="+mainQueestion+"&var2="+html;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    $jq("#chk").val(data);
                    if(data == "")
                        $jq("#ConformationMsg").html("Sucessfully Save");
                    location.reload();
                });
        });

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
function showAssignWork(workStatus, showAll){
    //$workStatus       //1 completed    //2 cancel    //0 pending
    if($jq(".viewAllTasks").is(":checked")) //check that show full list or just own created task list
        var go_path = "Employee_Switch_Person.php?action=showAssignWorkAll&vars=1&var1="+workStatus;
    else
        var go_path = "Employee_Switch_Person.php?action=showAssignWork&vars=1&var1="+workStatus;


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

        var html = "<table id='assignWorkTable' class='table .table-hover'><thead><tr class="+ className+"><td class='col-lg-1'>Project Name</td><td class='col-lg-2'>Employee Name</td> <td class='col-lg-6'>Assign Work</td> <td class='col-lg-1'>Work Date</td> <td class='col-lg-2'>Operations</td></tr></thead>";
        for(var i=0; i<data.length; i++){
            html += "<tbody><tr><td>"+ data[i].ProjectName +"</td><td>"+ data[i].EmployeeName+"</td><td>"+ data[i].AssignWork +"</td><td>"+ data[i].WorkDate;
            if(workStatus ==0){
                html += "</td><td><button onclick='assignWorkCancel("+data[i].EmpAWPK+")' class='btn btn-danger glyphicon glyphicon-remove'></button> " +
                "<button class='btn btn-default' onclick='assignWorkComplete("+data[i].EmpAWPK+")'>Complete</button>" +
                "</td></tr>" ;
            }
            else if(workStatus ==2){
                html += "</td><td><button class='btn btn-default' onclick='assignWorkReactive("+data[i].EmpAWPK+")'>Reactive</button>" +
                "</td></tr>" ;
            }
            else if(workStatus ==1){
                html +=  "</td><td><button class='btn btn-default' onclick='assignWorkIncomplete("+data[i].EmpAWPK+")'>incomplete</button>" +
                "</td></tr>" ;
            }
        }
        html += "</tbody></table>";

        $jq(".showAssignWork").html(heading+html);
        //$jq("#assignWorkTable").DataTable();
    });
}
function showAllAssignWork(workStatus){
    showAssignWork(workStatus,true);
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
    //var reasonToCancel = prompt("Reason to Cancel Assigned Work");
    var go_path = "Employee_Switch_Person.php?action=assignWorkComplete&vars=1&var1="+ assignWorkId;
    $jq.get(go_path,{},function(data){
        showAssignWork(0);
        countAssignTasks()
    });
}
function assignWorkIncomplete(assignWorkId){
    //var reasonToCancel = prompt("Reason to Cancel Assigned Work");
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
//Assign Work Functions -- END
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

    //var query =   $jq.trim($jq(".workDescription").val()); //trim white space
    //query = query.replace(/ /gi, '|'); //add OR for regex query
    //
    //$jq(".showAssignWork").each(function() {
    //    ($jq(this).text().search(new RegExp(query, "i")) < 0) ? $jq(this).hide().removeClass('visible') : $jq(this).show().addClass('visible');
    //});
    //.workDescription
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
//Project Mode related functions -- START//
function getProjectModeChangeRequest(){
    var go_path = "Employee_Switch_Person.php?action=ProjectModeChangeRequest&vars=0";
    $jq.get(go_path,{},function(data){
        //alert("data"+data);
        var previousObject;
        data = JSON.parse(data);
        if(data.length>0){
            if(JSON.stringify(data) != previousObject){
                var html = "<h2>Project Mode Change Request</h2><table><thead><tr>" +
                    "<th>Project Name</th><th>Project Status</th><th>Project Mode</th><th>Request by</th><th>Timing</th><th>Operation</th></thead>";

                for(var i=0;i<data.length;i++)
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
                previousObject = JSON.stringify(data);
            }
        }
        else{
            $jq("#ProjectModeBottomPanel").html("");
        }
    });
    //setTimeout(getProjectModeChangeRequest, 15000);
}
function ProjectModeChangeRequestHandle(recordId, status, projID, projModeID, projStatusID){
    console.log("Project Mode Change Function Fire");
    var go_path = "Employee_Switch_Person.php?action=ProjectModeChangeRequestHandle&vars=2&var1="+status+"&var2="+recordId;
    $jq.get(go_path,{},function(data){

        if(data == 1 && status ==1)
        {
            var go_path = "Employee_Switch_Person.php?action=updateProjectInfo&vars=3&var1="+projID+"&var2="+projStatusID+"&var3="+projModeID;
            $jq.get(go_path,
                {
                }, function(data)
                {
                    getProjectModeChangeRequestListForEveryKindOfUser()
                }
            );
        }
        else{
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

                for(var i=0;i<data.length;i++)
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
            $jq("#ProjectModeBottomPanel").html("");
        }
    });
    //setTimeout(getProjectModeChangeRequestMadeList, 20000);
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
    }else{

        go_path = "Employee_Switch_Person.php?action=getTeamLeadProjectAndEmployee&vars=1&var1="+1;
        $jq.get(go_path,
            {
            }, function(data)
            {
                var get_data = new Array();     // declare array
                var get_data = data.split('----//------'); // get_data is data comming from php file
                //$jq(".nameEmpToSwitch").html(get_data[0]);  //employee name from employee table
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

