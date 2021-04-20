<!DOCTYPE HTML>
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <script type="text/javascript" src="jquery-1.9.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="Employee_Switch_Person.js"></script>
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <title>Project Status Edit-PMS</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
</head>

<body class="container">
<?php
if (isset($_COOKIE["userID"]))
    if($_COOKIE['permission_MainMenuTop'] == 1)
        include 'menu.php';
?>

<h2>Edit Project Status</h2>
<p>Edit Project Progress, Questions, Priority, and Feedback.</p><hr>
<div class="row">
<div id="ProjectStatus">
</div>

<div id="ProjectStatus1">
</div>
    </div>



</body>
</html>