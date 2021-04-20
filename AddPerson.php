<?php

//checking user authentication
if(!isset( $_COOKIE['userID']))
    Header("Location: loginPage.php");

$notAllowedTo = array(1,3,5);
//checking user authorization
if(in_array($_COOKIE['userDesig'], $notAllowedTo))
    Header("Location: modelerPage.php");
?>
<!DOCTYPE html>
<html >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Add Person-PMS</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
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
<h2>Add Person</h2>
<p>Add person to sign-up new User.</p><hr>
<div class="row">
    <div border="1" class="form">
        <div class="form-group">
            <div class="col-lg-3">Name</div>
            <div class="col-lg-5"><input type="text" class="form-control" name="textfield" id="name"/></div>
            <br>
            <div class="col-lg-4"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Login Name</div>
            <div class="col-lg-5"><input type="text" class="form-control" name="name" id="loginname"/></div>
            <br>
            <div class="col-lg-4"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Password</div>
            <div class="col-lg-5"><input type="text" class="form-control" name="name2" id="password" value="1234"/></div>
            <br>
            <div class="col-lg-4"> </div>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Department</div>
            <div class="col-lg-5"><select name="dept" id="dept" class="form-control">
                    <option value="1">Admin</option>
                    <option value="2">Accounts</option>
                    <option value="3">Production</option>
                    <option value="4">IT</option>
                </select></div>
            <br>
            <div class="col-lg-4"> </div>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Designation</div>
            <div class="col-lg-5"  id="desig" ><select class="form-control">
                    <option value="1">CEO</option>
                    <option value="2">Manager</option>
                    <option value="3">Project Leader</option>
                    <option value="3">Modeler</option>
                </select></div>
           <br/>
        </div>
        <div class="form-group">
            <div class="col-lg-3">&nbsp;</div>
            <div class="col-lg-5" id="verify"><input type="submit" class="button btn-primary" name="button" id="btnAddPerson" value="Add Person" onclick="AddEmployee()" /><label id="result"></label></div>
          <br/>
        </div>
    </div>
</div>
<div class="row"></div>
<?php
if($_COOKIE["userDesig"] == 2 || $_COOKIE["userDesig"] == 4)
    include 'textarea.php';

?>
</body>
</html>
