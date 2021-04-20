<?php session_start();
if(!isset( $_COOKIE['userID']))
    Header("Location: loginPage.php");
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PMS</title>
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    </style>
</head>
<body class="container">
<!--Check Menu Permission-->
<?php
if (isset($_COOKIE["userID"])) {
    $desgi = (int)$_COOKIE['userDesig'];
    if ($_COOKIE['permission_MainMenuTop'] == 1)
        include 'menu.php';
}
?>
<h2>Employee's Day Status</h2>
<p>Add Leave and Office Off details about Employee.</p><hr>
<!--<table class="table">
<tr>
    <td>Select Date:</td>
    <td> <input type="date" id="empStatusDate"></td>
    <td> Colour Description</td>
    <td>Status Not Updated</td>
    <td> Status Updated (No Colour)</td>
</tr>
</table>-->
<div class = "row">
    <div class = "col-lg-5">
    <fieldset>
    <legend>Show</legend>
     <input type="radio" id="rdbEmpStatusFilter" name="rdbEmpStatusFilter" OnChange="employeeDayStatusByAvailablity()" value="All" /> All Employee
     <input type="radio" id="rdbEmpStatusFilter"name="rdbEmpStatusFilter" OnChange="employeeDayStatusByAvailablity()" value="Available"/> Available Employee
     <input checked type="radio" id="rdbEmpStatusFilter" name="rdbEmpStatusFilter" OnChange="employeeDayStatusByAvailablity()" value="notAvailable"/> Not Available Employee
    </fieldset>

    </div>
    <div class = "col-lg-2">
    <fieldset>
    <legend>Select Date</legend>
                       <input type="date" id="empStatusDate">
    </fieldset>
    </div>
    <div class = "col-lg-5">
    <fieldset>
    <legend> Colour Info</legend>
     <div class = "col-lg-6 bg-primary">
        Status Not Updated
    </div>
    <div class = "col-lg-6">
    Status Updated (No Colour)
    </div>
    </fieldset>



    </div>
</div>
<div id="displayEmpDayStatus">

</div>
<div></div>
<script src = "compiled/jquery1.10.2.js"></script>
<script src = "js/bootstrap.min.js"></script>
<script src = "js/custom/EmpDayStatus.js"></script>
</body>
</html>
