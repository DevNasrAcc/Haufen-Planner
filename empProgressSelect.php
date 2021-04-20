<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PMS-Add Person</title>
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <script type="text/javascript" src="jquery-1.9.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="Employee_Switch_Person.js"></script>
</head>

<body class="container">
<?php
include 'menu.php';
?>
<h2>View Employee Progress</h2>
<p>View Employess Progress in different projects.</p><hr>
<div class="row">
    <div id="displayProgress"></div>
</div>
<?php
if($_COOKIE['permission_AllowProjects'] == 1 ) // have to allow these project to shift him self
{
    echo '';
}
?>

<div class="form-inline">
<table></table>
    <span class="ProjectNameModeChange"></span>
    <input id="selectedDateStart" class = form-control" type="date"/>
    <input id="selectedDateEnd" class = form-control" type="date"/>
    <input type="button" id="EmployeeProgress" class="btn btn-primary" onclick="selectEmpProgress()" value="View Efforts">
</div>
<div id="displayDynamicData"></div>

</body>
</html>
