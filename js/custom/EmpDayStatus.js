/**
 * Created by user on 7/28/2015.
 * EmpDayStatus.js will use Server\EmpDayStatus.php to Show and Manipulate EmpDayStatus (Leave, Sick Leave, Official Off etc.,)
**/

var $jqueryLib = jQuery.noConflict();

onLoad();

/** Jquery Selector section - Start*/

/*Display selected Date Emp Days status*/
$jqueryLib("#empStatusDate").change(function(){
    getEmployeesDayStatusByDate();
});

/** Jquery Selector section - End**/

/**-Function Section---Start-*/

function onLoad(){
    //Check that URL parameter have include the value of EmpID and SwitchDate then show the that Specific Employee List
    //if(typeof(getURLParameter("empId")) != 'undefined' && typeof(getURLParameter("switchDate")) != 'undefined'){
    if(getURLParameter("empId") && getURLParameter("switchDate")){
        var empId = getURLParameter("empId") ;
        var switchDate = getURLParameter("switchDate");
            getSpecificEmpDayStatusByIdAndSwitchDate(empId, switchDate);
    }

}

function getEmployeesDayStatusByDate(){
    //Get Employees All Days- Request
    var go_path = "Server/EmpDayStatus.php?action=getAllEmpDaysStausName&vars=0";
    $jqueryLib.get(go_path,
        {}, function(data) {
            var empDaysStatusData = JSON.parse(data);
            var empDaysStatusDropDown = "<select class='statusList form-control'>";
            for(var i = 0; i < empDaysStatusData.length; i++){
                empDaysStatusDropDown += "<option value='"+empDaysStatusData[i].id +"'>"+empDaysStatusData[i].LeaveName+"</option>"
            }
            empDaysStatusDropDown += "</select>";
            //Get Employees Status By Date All Days - Request
            var empStatusListOptionSelected = $jqueryLib('input[name=rdbEmpStatusFilter]:checked').val();
            var go_path;
            if(empStatusListOptionSelected== "All"){
                go_path = "Server/EmpDayStatus.php?action=getEmpStatusByDate&vars=1&var1="+ $jqueryLib("#empStatusDate").val();
            }
            else if(empStatusListOptionSelected== "Available"){
                go_path = "Server/EmpDayStatus.php?action=getAvailableEmpStatusByDate&vars=1&var1="+ $jqueryLib("#empStatusDate").val();
            }
            else if(empStatusListOptionSelected== "notAvailable"){
                go_path = "Server/EmpDayStatus.php?action=getNotAvailableEmpStatusByDate&vars=1&var1="+ $jqueryLib("#empStatusDate").val();
            }

            $jqueryLib.get(go_path,
                {
                }, function(data) {
                    var empStatusData = JSON.parse(data);
                    if(empStatusData.length < 1){
                        alert("Info\nNo record Available.");
                        $jqueryLib("#displayEmpDayStatus").html("");
                        return false;
                    }
                    var empProjectNameDropDown = "<select class='projectList form-control'>";
                    var tempProjectPk;
                    for(var i = 0; i < empStatusData.length; i++){
                        if(tempProjectPk != empStatusData[i].PTPK){
                            empProjectNameDropDown += "<option value='" + empStatusData[i].PTPK + "'>" +empStatusData[i].projectName + "</option>"
                        }
                        tempProjectPk = empStatusData[i].PTPK;
                    }
                    empProjectNameDropDown += "</select>";
                    html = "<hr><div class='row'><span class='col-lg-3'>Change Day's Status by Project Name</span><span class='col-lg-3'>" + empProjectNameDropDown +"</span><span class='col-lg-3'>" + makeStatusDaysDropDown(2, empDaysStatusData, "change")+"</span>" +
                    "<span class='col-lg-3'><input type='button' value='change' onclick='changeAbsentesDayStatusDropdownSelection()'></span></div><hr>" +
                    "<table class='table table-bordered'><tr>" +
                    "<td>Employee Name</td>" +
                    "<td>Project Name</td>" +
                    "<td>Half</td>" +
                    "<td>Day's Status</td>" +
                    "</tr>";
                    html += "";

                    for(var i = 0; i < empStatusData.length; i++)
                    {
                        /*
                         Check that if two consecutive record are same on the basis of two columns Employee ID and Project ID? then,
                         show only one record and make class name with two primary key Id
                         */
                        if(typeof empStatusData[i+1] != 'undefined' && empStatusData[i+1].ETPK == empStatusData[i].ETPK && empStatusData[i+1].PTPK == empStatusData[i].PTPK ){
                            if(empStatusData[i].EmpDaysStatusId == null){

                                html += "<tr class='empDaysAdd bg-primary' id='empStatusId_"+ empStatusData[i].empSwitchId +"_" +empStatusData[i+1].empSwitchId+"'><td>" +
                                i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                                empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half +" & "+ empStatusData[i+1].Half +"</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                                makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData, empStatusData[i].projectName) + "</td></tr>";
                            }
                            else {
                                html += "<tr class='empDaysAdd' id='empStatusId_"+ empStatusData[i].empSwitchId +"_" +empStatusData[i+1].empSwitchId +"'><td>" +
                                i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                                empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half +" & "+ empStatusData[i+1].Half + "</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                                makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData,empStatusData[i].projectName) + "</td></tr>";
                            }
                            i++;
                        }
                        /*IF records are not same then show one by one*/
                        else{
                            if(empStatusData[i].EmpDaysStatusId == null){

                                html += "<tr class='empDaysAdd bg-primary' id='empStatusId_"+ empStatusData[i].empSwitchId+"'><td>" +
                                i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                                empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half+"</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                                makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData, empStatusData[i].projectName) + "</td></tr>";
                            }
                            else {
                                html += "<tr class='empDaysAdd' id='empStatusId_"+ empStatusData[i].empSwitchId+"'><td>" +
                                i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                                empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half+"</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                                makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData,empStatusData[i].projectName) + "</td></tr>";
                            }
                        }
                        $jqueryLib("#displayEmpDayStatus").html(html);
                    }

                    html +="</table>";
                    html +="<input type='button' id='addEmpDayStatus' onclick='addEmpDayStatus()' value='ADD'/>"
                    $jqueryLib("#displayEmpDayStatus").html(html);
                });
        });
}

/*Making dropdown of EmpStatusOption (sick leave, annual or casual or official off) with selected index*/
function makeStatusDaysDropDown(id, empDaysStatusData, projectName){

    if(projectName != null)
    {
        projectName = projectName.replace(/\s/g,"");
        projectName = projectName.replace(".","");
    }
        var empDaysStatusDropDown = "<select class='statusList "+ projectName +" form-control'>";
        empDaysStatusDropDown += "<option selected value='null'></option>";
        for(var i = 0; i < empDaysStatusData.length; i++){
            if(id == empDaysStatusData[i].id)
                empDaysStatusDropDown += "<option selected value='"+empDaysStatusData[i].id +"'>" + empDaysStatusData[i].LeaveName + "</option>"
            else
                empDaysStatusDropDown += "<option  value='"+empDaysStatusData[i].id +"'>" + empDaysStatusData[i].LeaveName + "</option>"
        }
        empDaysStatusDropDown += "</select>";
        return empDaysStatusDropDown;
}

/*Making dropdown of Projects with  absent option*/
function makeProjectNameDropDown(id, empDaysStatusData, projectName){
     projectName = projectName.replace(/\s/g,"");
    projectName = projectName.replace(".","");
    var empDaysStatusDropDown = "<select class='statusList "+ projectName +" form-control'>";
    empDaysStatusDropDown += "<option selected value='null'></option>";
    for(var i = 0; i < empDaysStatusData.length; i++){
        if(id == empDaysStatusData[i].id)
            empDaysStatusDropDown += "<option selected value='"+empDaysStatusData[i].id +"'>" + empDaysStatusData[i].LeaveName + "</option>"
        else
            empDaysStatusDropDown += "<option  value='"+empDaysStatusData[i].id +"'>" + empDaysStatusData[i].LeaveName + "</option>"
    }
    empDaysStatusDropDown += "</select>";
    return empDaysStatusDropDown;
}

/*Add Emp days Status either he was sick leave, annual or casual or official off*/
function addEmpDayStatus(){
    var empStatusAdd = [];
    $jqueryLib(".empDaysAdd").each(function(){
        var recordId = $jqueryLib(this).attr("id").replace("empStatusId_",'');
        var selectedStatus = $jqueryLib(this).children().find(".statusList").val()
        //check that if dual entry required to do or single.
        if(recordId.indexOf("_") > -1){
            //Split and get second Id
            recordId = recordId.split("_");
            empStatusAdd.push({
                id :recordId[0],
                selectedStatus : selectedStatus
            });
            empStatusAdd.push({
                id :recordId[1],
                selectedStatus : selectedStatus
            });
        }
        else
        {
            empStatusAdd.push({
                id :recordId,
                selectedStatus : selectedStatus
            });
        }

    });
    var queryToSend, whereClause;
    queryToSend = "EmpDaysStatusId = CASE PK";
    whereClause = "WHERE PK IN (";
    for(var i = 0; i < empStatusAdd.length; i++)
    {
        queryToSend += " WHEN " + empStatusAdd[i].id +" THEN " + empStatusAdd[i].selectedStatus +" ";
        whereClause += empStatusAdd[i].id +", ";
    }
    queryToSend += " END ";//Caution:: space is necessary !!
    whereClause = whereClause.substring(0, whereClause.length - 2);
    whereClause += ")";
    var completePartialQueryString = queryToSend + whereClause;
        var data = {
            action : "addEmployeeDayStatus",
            queryPart : completePartialQueryString
        };
    $jqueryLib.ajax({
        url : "Server/EmpDayStatus.php",
        type : "POST",
        data : data,
        success : function(data, textStatus, XMLHttpRequest) {
            if(data == 1)
            alert("Successfully Updated");
            if($jqueryLib("#empStatusDate").val()){
                getEmployeesDayStatusByDate();
            }
        }
    }).fail(function(){
        alert("Failed to update!!");
    });
}

/*Change sepcific dropdown option selection*/
function changeAbsentesDayStatusDropdownSelection(){
    var className = $jqueryLib(".projectList option:selected").text().replace(/\s/g,"");
    className = className.replace(".","");
    $jqueryLib("."+className).each(function(){
        if($jqueryLib(this).val() ==  'null'){
            $jqueryLib(this).val($jqueryLib(".change").val());
        }
    });
}

function getSpecificEmpDayStatusByIdAndSwitchDate(empId,switchDate){
    var go_path = "Server/EmpDayStatus.php?action=getAllEmpDaysStausName&vars=0";
    $jqueryLib.get(go_path,
        {
        }, function(data) {
            var empDaysStatusData = JSON.parse(data);
            var empDaysStatusDropDown = "<select class='statusList form-control'>";
            for(var i = 0; i < empDaysStatusData.length; i++){
                empDaysStatusDropDown += "<option value='"+empDaysStatusData[i].id +"'>"+empDaysStatusData[i].LeaveName+"</option>"
            }
            empDaysStatusDropDown += "</select>";

            var go_path = "Server/EmpDayStatus.php?action=getSpecificEmpDayStatusByIdAndSwitchDate&vars=2&var1="+ empId+"&var2="+switchDate;
            $jqueryLib.get(go_path,
                {
                }, function(data) {
                    var empStatusData = JSON.parse(data);
                    if(empStatusData.length <1){
                        alert("Info\nNo record Available.");
                        $jqueryLib("#displayEmpDayStatus").html("");
                        return false;
                    }
                    //var html = "<div>For All Absent Employee " + makeStatusDaysDropDown(2, empDaysStatusData)+"</div>";
                    //"<div><span class='col-lg-4'>For All Absent Employee</span><span class='col-lg-4'>" + makeStatusDaysDropDown(2, empDaysStatusData, "change")+"</span>" +
                    //"<span class='col-lg-4'><input type='button' value='change' onclick='changeAbsentesDayStatusDropdownSelection()'></span></div>" +
                    html =   "<table class='table table-bordered'><tr>" +
                    "<td>Employee Name</td>" +
                    "<td>Project Name</td>" +
                    "<td>Half</td>" +
                    "<td>Day's Status</td>" +
                    "</tr>";
                    html += "";

                    for(var i = 0; i < empStatusData.length; i++)
                    {
                        if(empStatusData[i].EmpDaysStatusId == null){
                            html += "<tr class='empDaysAdd bg-primary' id='empStatusId_"+ empStatusData[i].empSwitchId+"'><td>" +
                            i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                            empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half+"</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                            makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData, empStatusData[i].projectName) + "</td></tr>";
                        }
                        else {
                            html += "<tr class='empDaysAdd' id='empStatusId_"+ empStatusData[i].empSwitchId+"'><td>" +
                            i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                            empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half+"</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                            makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData,empStatusData[i].projectName) + "</td></tr>";

                        }
                        $jqueryLib("#displayEmpDayStatus").html(html);
                    }

                    html +="</table>";
                    html +="<input type='button' id='addEmpDayStatus' onclick='addEmpDayStatus()' value='ADD'/>"
                    $jqueryLib("#displayEmpDayStatus").html(html);
                });
        });
}

function getSpecificEmployeeDayStatusDetails(switchTblPK){
    var go_path = "Server/EmpDayStatus.php?action=getAllEmpDaysStausName&vars=0";
    $jqueryLib.get(go_path,
        {
        }, function(data) {
            var empDaysStatusData = JSON.parse(data);
            var empDaysStatusDropDown = "<select class='statusList form-control'>";
            for(var i = 0; i < empDaysStatusData.length; i++){
                empDaysStatusDropDown += "<option value='"+empDaysStatusData[i].id +"'>"+empDaysStatusData[i].LeaveName+"</option>"
            }
            empDaysStatusDropDown += "</select>";

            var go_path = "Server/EmpDayStatus.php?action=getEmpStatusBySwitchPK&vars=1&var1="+ switchTblPK;
            $jqueryLib.get(go_path,
                {
                }, function(data) {
                    var empStatusData = JSON.parse(data);
                    if(empStatusData.length <1){
                        alert("Info\nNo record Available.");
                        $jqueryLib("#displayEmpDayStatus").html("");
                        return false;
                    }
                    //var html = "<div>For All Absent Employee " + makeStatusDaysDropDown(2, empDaysStatusData)+"</div>";
                    //"<div><span class='col-lg-4'>For All Absent Employee</span><span class='col-lg-4'>" + makeStatusDaysDropDown(2, empDaysStatusData, "change")+"</span>" +
                    //"<span class='col-lg-4'><input type='button' value='change' onclick='changeAbsentesDayStatusDropdownSelection()'></span></div>" +
                    html =   "<table class='table table-bordered'><tr>" +
                    "<td>Employee Name</td>" +
                    "<td>Project Name</td>" +
                    "<td>Half</td>" +
                    "<td>Day's Status</td>" +
                    "</tr>";
                    html += "";

                    for(var i = 0; i < empStatusData.length; i++)
                    {
                        if(empStatusData[i].EmpDaysStatusId == null){
                            html += "<tr class='empDaysAdd bg-primary' id='empStatusId_"+ empStatusData[i].empSwitchId+"'><td>" +
                            i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                            empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half+"</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                            makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData, empStatusData[i].projectName) + "</td></tr>";
                        }
                        else {
                            html += "<tr class='empDaysAdd' id='empStatusId_"+ empStatusData[i].empSwitchId+"'><td>" +
                            i + '. ' + empStatusData[i].Employee_Name + "</td><td>" +
                            empStatusData[i].projectName + "</td><td>"+empStatusData[i].Half+"</td><td id ="+ empStatusData[i].PTPK +"_" + empStatusData[i].empSwitchId + ">"+
                            makeStatusDaysDropDown(empStatusData[i].EmpDaysStatusId, empDaysStatusData,empStatusData[i].projectName) + "</td></tr>";

                        }
                        $jqueryLib("#displayEmpDayStatus").html(html);
                    }

                    html +="</table>";
                    html +="<input type='button' id='addEmpDayStatus' onclick='addEmpDayStatus()' value='ADD'/>"
                    $jqueryLib("#displayEmpDayStatus").html(html);
                });
        });
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function employeeDayStatusByAvailablity(){
    if($jqueryLib("#empStatusDate").val()){
        getEmployeesDayStatusByDate();
    }
}
/**-Function Section---END-**/