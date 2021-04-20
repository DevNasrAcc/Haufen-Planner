<?php session_start();
if(!isset( $_COOKIE['userID']))
    Header("Location: loginPage.php");
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Home - PMS</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <!--<link rel="stylesheet" href="bootstrap3.3.4/custom.css" type="text/css" media="screen"/>-->
    <link rel="stylesheet" href="ui.all.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="compiled/jquery.flipcountdown.css" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <script type="text/javascript">
        var tableToExcel = (function () {
            var uri = 'data:application/vnd.ms-excel;base64,'
                , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
                , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
                , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
            return function (table, name, filename) {
                if (!table.nodeType) table = document.getElementById(table)
                var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
                document.getElementById("dlink").href = uri + base64(format(template, ctx));
                document.getElementById("dlink").download = filename;
                document.getElementById("dlink").click();
                //window.location.href = uri + base64(format(template, ctx))
            }
        })()
    </script>
    <style>
        .tblheading{
            color: red;
        }
        input[type="date"]{
            line-height: 18px;
        }
    </style>
</head>
<body class="container">

<?php
if (isset($_COOKIE["userID"])) {
    $desgi = (int)$_COOKIE['userDesig'];
    if ($_COOKIE['permission_MainMenuTop'] == 1)
        include 'menu.php';
}
?>

<div class="row">
    <?php
    //if($_COOKIE['permission_MainMenuTop'] ==1)
    include 'logoutPage.php';
    if(!isset($_COOKIE['permission_switch']) )
    {
        header("refresh: 1; url=http://" . $_SERVER['HTTP_HOST']."/Employee_Switch_Persons/ModelerPage.php");
        return ;
    }
    $input = "permission_AllowProjects";
    if($_COOKIE['permission_AllowProjects'] == 1 ) // have to allow these project to shift him self
    {
        echo '<details class="col-lg-5">';
        echo '<summary>Hod Allow Projects to employee</summary>';	// table for allow projects to modeler
        echo '<table id="tbAllowProj">';
        include 'nameAndProjects.php';
        echo '<td class="projectTaskList"></td>';
        include 'BtnSwitchPerson.php';
        echo "</table>";
        echo '</details>';
    }

    if($_COOKIE['permission_EmpSwitchRequest'] == 1) // have to allow these project to shift him self
    {
        echo '<details class="col-lg-5">';
        echo "<summary>Employee Switch Request</summary>";			// table for allow projects to modeler
        echo '<table id="tbAllowProj1">';
        include 'nameAndProjectsForSwitchEmp.php';
        include 'btnRequestToSwitch.php';
        echo "</table>";
        echo '</details>';

        echo ' <details class="col-lg-5">
                        <summary>Project Mode Change Request</summary>
                          <table id="reqUpdProj">
                              <thead>
                              <tr>
                                  <td class="col-lg-5">Select Project</td>
                                  <td class="col-lg-3">Project Mode</td>
                                  <td class="col-lg-3">Project Mode</td>
                                  <td class="col-lg-1">Operation</td>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td>
                                <span class="ProjectNameModeChange">
                                </span>
                           </td>
                                  <td>
                                      <select class="projStatus form-control">
                                          <option value="1">Continue</option>
                                          <option value="2">Start</option>
                                          <option value="3">Finish</option>
                                          <option value="4">Pause</option>
                                          <option value="5">Resume</option>
                                          <!--<option value="audi" selected>Resume</option>-->
                                      </select>
                                  </td>
                                  <td>
                                      <select class="projMode form-control">
                                      </select>
                                  </td>
                                  <td>
                                      <button class="button btn-primary" onclick= "requestProjectModeChange();">Request</button>
                                      <input type="checkbox" onclick="ProjectListForProjectModeChange(\'ProjectNameModeChange\');" value="Show All Projects" id="showAllProjectCheck">View All Project
                                  </td>
                              </tr>
                              </tbody>
                          </table>
                    </details>';
    }
    if($_COOKIE['permission_EmpSwitchRequest'] == 1 && $_COOKIE['userDesig'] != 4) // have to allow these project to shift him self
    {
        echo '<details class="col-lg-5">';
        echo '<summary>Change Task</summary>';	// table for allow projects to modeler
        echo '<table id="tbTaskChange">';//tbAllowProj
        echo  '
            <tr>
                <th>Project</th> <th>Name</th><th>Task</th><th>Change</th></tr>
            <tr>
	        <td>
	            <span class="ProjectNameModeChange"></span>
	        </td>
   	   <td>
   	   <select class="supervisorProjectEmpList form-control" >
		    <option value="0">Select Employee</option>
		    </select>
	   </td>
	    <td class="projectTaskList"></td>';
        echo '<td><button id="ChangeTask">Change</button></td>';
        echo "</table>";
        echo '</details>';
    }
    if($_COOKIE['userDesig'] == 3 || $_COOKIE['userDesig'] == 4){
        echo '<details class="col-lg-5">';
        echo '<summary>Request to change Task</summary>';
        echo '<table id="tbTaskChangeRequest">';
        echo '<tr><th>Task Category</th><th>Request</th></tr>';
        echo '<tr><td class="projectTaskList"> </td>';
        echo '<td><button id="requestChangeTask">Request</button></td></tr>';
        echo "</table>";
        echo '</details>';
    }
    ?>

    <div class="col-lg-10">
        <?php
        $input = "permission_WhiteBoard";
        if($_COOKIE['permission_WhiteBoard'] == 1 )
        {
            echo'<br>';
            include 'whiteboard_PrevDate.php';
        }
        ?>
        <div id="btnExcelExport"></div></div>
</div>

<?php
if($_COOKIE['userID'] != 80)
    echo "<div id='specialQuestion'></div>";
?>
<?php
$input = "permission_WhiteBoard";
if($_COOKIE['permission_WhiteBoard'] == 1 )
    include 'New_whiteboard.php';
?>
<div class="employeCount">

</div>
<div class="row">
    <?php
    $input = "permission_ChkEmpProjDays";
    if($_COOKIE['permission_ChkEmpProjDays'] == 1)
    {
        echo '<fieldset><legend>Employee Switching</legend>
                    <table border="1" id="tbPerPersonDays" class="table-bordered table-responsive col-lg-12">';
        include 'nameAndProjects.php';
        echo '<td><input class="date form-control"  type="textbox"  size="25" placeholder ="Click to Enter date"/></td>';
        include 'btnGetPerDays.php';
    }
    ?>
    </table>
    </fieldset>
</div>
<div id="ProjectsDaysInfo"></div>

<div class="row">
    <?php
    // All projects days
    $input = "permission_ChkProjDays";
    if($_COOKIE['permission_ChkProjDays'] == 1 )
    {
        echo '<fieldset><legend>Check All Project Days</legend>';
        // table for allow projects to modeler
        echo '<table id="tbPreProjDays" class="table-bordered col-lg-12">';
        echo '
		  <tr>
			<th class="col-lg-3">Project</th>
			<th class="col-lg-9">Operations</th>
		  </tr>
		  <tr>
			<td class="ProjectName">
				<select>
				<option value="volvo">Volvo</option>
				<option value="saab">Saab</option>
				<option value="vw">VW</option>
				<option value="audi" selected>Audi</option>
				</select>
			</td>';
        echo "<td>";
        include 'btnGetAllDays.php';
        include 'ProjectPerMemberTotalDays.php';
        include 'MonthTotalContProj.php';
        echo "</td>";
        echo ' <tr>
				<td>Select Date1</td>
				<td><input class="date" type="textbox" class="form-control"  size="25" placeholder ="Click to Enter date"/></td>
		       </tr>';
        echo "</table>";
        echo "</fieldset>";
    }
    ?>
</div>
<div id="ProjectsPreviousDaysInfo"></div>
<hr>
<div class="row">
    <?php
    $input = "permission_permissionPage";
    if($_COOKIE['permission_permissionPage'] == 1)
    {
        echo"<p>";
        echo "<h3>Permission Admin</h3>";
        echo '<table border="1" id="permissionEmp" class="table-bordered col-lg-12"><tbody>';
        include 'PermissionInPage.php';
        echo '</tbody></table>';
        echo '<div id="permissionInfo"></div>';
        echo"</p>";
    }
    ?>
</div>

<?php
if($_SERVER['HTTP_HOST'] == 'localhost')
    include 'copyFirstHalfSwitchingValuesTo2ndHalf.php';
?>

<?php
if($_COOKIE['userID'] != 80)
    include 'votingQuestion.php';
if($_COOKIE['userID'] == 33 || $_COOKIE['userID'] == 3)
    echo '<button  id="Submit_Daily_Question" type="Button" value="Submit">Submit Daily Question</button><label id="ConformationMsg"></label>';
?>
<!--<div id="dinnerSelection">1232222</div>-->

<?php
if($_SERVER['HTTP_HOST'] == 'localhost')
    include 'textarea.php';
?>

<!--Notification Panels - Start-->
<details class="bottom-panel" id="ProjectQuestionAnswerBottomPanel" style="position: fixed;
        bottom: 0px;
        right: 0px;
        background: rgb(244, 238, 238);
        padding-left:5px;
        color: rgb(180, 17, 17);">
    <summary id="ProjectQuestionAnswerBottomPanelSummary">All Projects Q/A</summary>
    <img src="img/MaximizeIcon.png" alt="Maximize" width="15" height="15" id='maximizeProjectQuestionAnswerPanel'>
<!--    <span id='maximizeProjectQuestionAnswerPanel' class='glyphicon glyphicon-menu-up' style='cursor:default'>Maximize</span>-->

<!--    <input class='text-left' id='StartMaximizeProjectQuestionAnswerPanel' type='checkbox'/>Startup Open-->

    <div id="ProjectQuestionAnswer"  style="overflow-y: scroll;  height: 140px;">

    </div>
</details>
<details class="bottom-panel" id="taskRequestBottomPanel" style="position: fixed;
        bottom: 60px;
        right: 0px;
        background: rgb(244, 238, 238);
        padding-left:5px;
        color: rgb(180, 17, 17);">
    <div id="taskChangeRequestEmp">
    </div>
</details>
<details class="bottom-panel" id="requestBottomPanel" style="position: fixed;
        bottom: 40px;
        right: 0px;
        background: rgb(242, 222, 222);
        padding-left:5px;
        color: rgb(180, 17, 17);">
    <div id="switchRequestEmp">
    </div>
</details>

<details class="bottom-panel" id="WorkBottomPanel" style="position: fixed;
        bottom: 19px;
        right: 0px;
        background: #b84d45;
        padding-left:5px;
        color: white;">
    <div id="EmpAssignWork">
    </div>
</details>

<details class="bottom-panel" id="ProjectModeBottomPanel" style="position: fixed;
        bottom: 80px;
        right: 0px;
        background: #5F1E19;
        padding-left:5px;
        color: white;">
    <div id="ProjectModeChangeRequest">
    </div>
</details>

<div class="bottom-panel" id="votingQuestionPanel"  style="position: fixed;
        bottom: 30%;
        right: 25%;
        background: #b84d45;
        padding-left:5px;
        color: #000000;">

    <div id="votingQuestionDisplay">
    </div>
</div>
<div class="bottom-panel" id="UnVotedEmployeePanel"  style="position: fixed;
        bottom: 0%;
        background: #b84d45;
        padding-left:5px;
        color: #e5e0de;
        left : 0;
        width : 210px;
        ">

    <div id="UnVotedEmployeeDisplay">
    </div>
</div>
<div class="modal"><!-- Place at bottom of page --></div>

<!--Notification Panels - END-->
<script type="text/javascript" src="js/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery-ui.min.js"></script>
<script>
    $(".date").datepicker({ altField: "#Range", altFormat: 'dd-mm-yy', dateFormat: 'dd/mm/yy', rangeSelect: true });
    $(".dateinput").datepicker({ altField: 'input#date', altFormat: 'yy-mm-dd', dateFormat: 'yy-M-dd' });
</script>
<script src="compiled/jquery1.10.2.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="compiled/jquery.flipcountdown.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>
<script type="text/javascript" src="js/sortableTableLib/sorttable.js"></script>
<script type="text/javascript" src="login.js"></script>
<script type="text/javascript" src="js/custom/ProjectQA.js"></script>
<footer class="text-muted text-center panel-footer ">© The Location Lab (Pvt.) Ltd. Karachi, Pakistan.</footer>
</body>
</html>
