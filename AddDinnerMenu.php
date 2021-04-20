<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PMS-Dinner Items</title>
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
<h2>Add Dinner Menu</h2>
<p>Add active/deactive  Dinner items.</p><hr>
<div class="row">
    <div border="1" class="form" id="dinnerForm">
        <div class="form-group">
            <div class="col-lg-3">Dinner Name</div>
            <div class="col-lg-5"><input type="text" class="form-control" name="textfield" id="dinnerName"/></div>
            <br>
            <div class="col-lg-4"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Status</div>
            <div class="col-lg-5">
                <input type="radio" checked  name="status" id="dinnerStatusActive" value="1"/>Active
                <input type="radio"  name="status" id="dinnerStatus" value="0"/>Deactive
            </div>
            <br>
            <div class="col-lg-4"> </div>
        </div>
        <!--<div class="form-group">
            <div class="col-lg-3">Price</div>
            <div class="col-lg-5"><input type="text" class="form-control" name="textfield" id="dinnerName"/></div>
            <br>
            <div class="col-lg-4"></div>
        </div>-->
        <div class="form-group">
            <div class="col-lg-3">&nbsp;</div>
            <div class="col-lg-5" id="verify"><input type="submit" class="button btn-primary" name="button" id="btnAddPerson" value="Add" onclick="AddDinnerItem()" /><label id="result"></label></div>
            <br/>
        </div>
    </div>
</div>
<hr>
<div class="row">

    <div class="text-center col-lg-offset-3 col-lg-5">

        <div class="row displayDinnerItem">
        </div>

    </div>

</div>
</body>
</html>
