<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Project Comment History-PMS</title>
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

<h2>Project Comment History</h2>
<p>View history of Project's Comments.</p><hr>

<div class="row">
<div id="tblogindetail" class="form">
    <div id="tbUpdProj" class="form-group">
        <div class="ProjectName col-lg-8">
        </div>
        <div class="col-lg-2">
            <input type="button" class="button btn-primary" value="View" onclick="viewProjectCommentHistory()">
        </div>
    </div>
</div>
</div>
<br>
<div class="row" id="displyHistory"></div>

</body>
</html>
                                                                                                                                       