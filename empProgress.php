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
<!--    <script type="text/javascript" src="login.js"></script>-->
</head>

<body class="container">
<?php
//include 'menu.php';
?>
<h2>Your sub-ordinates Progress</h2>
<p>Add today's progress of your sub-ordinate(s).</p><hr>
<?php
if($_COOKIE['userDesig'] == 2 ) // have to allow these project to shift him self
{
    echo '<input type="button" id="skipToHome" onclick="skipToHome()" value="skip"/>';
}
?>
<div class="row">
    <div class="col-lg-1"></div>
<!--    <div class="col-lg-5">Select Date to Add your sub-ordinate(s) efforts.</div>-->
    <div class="col-lg-5">
<!--    <input type="date" class="form-control" id="empProgressDate" onchange="EmployeeProgressAddList();"><br>-->
    </div>
    <div class="col-lg-1"></div>
</div>

<div class="row">
    <div class="col-lg-1"></div>
    <div class="col-lg-10" id="displayProgress">
        <div id="displayProgress"></div>
    </div>
    <div class="col-lg-1"></div>
</div>

<!--<input type="button" id="EmployeeProgress" class="btn btn-primary" onclick="employeeProgressUpdate()" value="Submit Efforts">-->

<div class="row">
    <div class="col-lg-1"></div>
    <div class="col-lg-10" id="displayTeamLeadProgress">
        <div id="displayProgress"></div>
    </div>
    <div class="col-lg-1"></div>
</div>
</body>
</html>
