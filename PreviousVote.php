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
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PMS-Vote Records</title>
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <script type="text/javascript" src="jquery-1.9.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/custom/VotePreviousRecords.js"></script>
</head>

<body class="container">

<?php
include 'menu.php';
?>
<h2>Vote Records</h2>
<p>Get previous vote records by Date.</p><hr>
<div class="row">
    <div border="1" class="form" id="dinnerForm">
        <div class="form-group">
            <div class="col-lg-3">Select Date</div>
            <div class="col-lg-5"><input type="date" class="form-control"  id="VoteRecordDate"/></div>
            <br>
            <div class="col-lg-4"></div>
        </div>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-lg-12">
<h2>Late Sittings Records</h2>
        <div class="votingDetail">
            No record available.
        </div>
    </div>
</div>
</body>
</html>
