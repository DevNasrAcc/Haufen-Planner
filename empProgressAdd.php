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
<h2>Employee Progress</h2>
<p>Add today's worked hours of your sub-ordinates.</p><hr>
<div class="row">
    <div id="displayProgress"></div>
</div>
        <?php
    if($_COOKIE['permission_AllowProjects'] == 1 ) // have to allow these project to shift him self
    {
        echo '';
    }
    ?>
<input type="button" id="EmployeeProgress" class="btn btn-primary" onclick="EmployeeProgressAdd()" value="Submit Efforts">

<div class="se-pre-con"></div>
</body>
</html>
