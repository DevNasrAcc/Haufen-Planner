<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Add Projects-PMS</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <link rel="stylesheet" href="ui.all.css" type="text/css" media="screen" />
</head>
<body class="container">
<?php
include 'menu.php';
?>
<h2>Add New Project</h2>
<p>Add new project Details here.</p><hr>
<div class="row">
    <div width="498" border="1" id="tbAddProject" class="form">
        <div class="form-group">
            <div class="col-lg-3" width="121">Project Name</div>
            <div class="col-lg-5" width="319"><input name="projName" class="form-control"  placeholder= "Project Name " type="text" id="projName" width="250px" /></div>
            <br/>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Hod</div>
            <div class="col-lg-5">
                <select name="select" class="nameEmp form-control">
                </select>
            </div>
            <br/>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Project Supervisor</div>
            <div class="col-lg-5"><select name="select" class="nameEmp form-control"></select></div>
            <br/>
        </div>
        <div class="form-group">
            <div class="col-lg-3">About</div>
            <div class="col-lg-5"><textarea class="form-control" name="textarea" id="textarea" cols="45" rows="5"></textarea></div>
            <div class="col-lg-2 col-lg-offset-2"></div>
            <div class="col-lg-2"></div>
            <br/>
        </div>
        <div class="row"></div>
        <div class="form-group ">
            <div class="col-lg-3">Start date</div>
            <div class="col-lg-5"><input class="dateinput form-control" placeholder= "When Project start" name="idate" type="text" id="stdate"></div>
            <br/>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Dead Line date</div>
            <div class="col-lg-5"><input class="dateinput form-control" placeholder= "When Project Finish" name="idate" type="text" id="deaddate" ></div>
            <br/>
        </div>
        <div class="form-group">
            <div class="col-lg-3">&nbsp;</div>
            <div class="col-lg-5"><input class="button btn-primary"type="submit" name="button" id="addproject" value="Add Project" /> <label id="result"></label></div>
            <br/>
        </div>

    </div>
    <?php
    if(!isset($_COOKIE["userDesig"]))
        Header("Location: loginPage.php");
    if( $_COOKIE["userDesig"] == 2 || $_COOKIE["userDesig"] == 4)
        include 'textarea.php';
    ?>
</div>
</body>
</html>
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery.min.js"></script>
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery-ui.min.js"></script>
<script>
    //http://hackingon.net/post/jQuery-Datepicker-by-Example.html
    $(".dateinput").datepicker({ altField: 'input#date', altFormat: 'yy-mm-dd',dateFormat: 'yy-M-dd' });
    //$("div#calendar").datepicker({ altField: 'input#date', altFormat: 'yy-mm-dd' });
</script>
<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>
