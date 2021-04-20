<!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Edit Projects-PMS</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <link rel="stylesheet" href="ui.all.css" type="text/css" media="screen" />
</head>
<body class="container">

<?php
include 'menu.php';
?>

<h2>Edit Project</h2>
<p>Edit already created projects.</p><hr>
<div >
<div border="1" id="tbEditProject" class="form">
    <div class="form-group">
        <div class="col-lg-3">Project Name</div>
        <div class="ProjectName col-lg-5"></div>
        <br/>
    </div>
    <div class="form-group">
        <div class="col-lg-3">Name</div>
        <div class="col-lg-5"><input class="form-control" name="Name" type="text" id="ProjName" placeholder= "Project Name"></div>
        <br/>
    </div>
    <div class="form-group">
        <div class="col-lg-3">Hod</div>
        <div class="col-lg-5"><select name="select" class="nameEmp form-control"></select>
        </div>
        <br/>
    </div>
    <div class="form-group">
        <div class="col-lg-3">Project Supervisor</div>
        <div class="col-lg-5"><select name="select" class="nameEmp form-control" ></select>
        </div>
        <br/>
    </div>
    <div class="form-group">
        <div class="col-lg-3">About</div>
        <div class="col-lg-5"><textarea class="form-control" name="textarea" id="textarea" cols="45" rows="5"></textarea></div>
        <br/>
    </div>
    <div class="row"></div>
    <div class="form-group">
        <div class="col-lg-3">Start date</div>
        <div class="col-lg-5"><input class="dateinput form-control" name="idate" type="text" id="stdate" placeholder= "When Project Start"></div>
        <br/>
    </div>
    <div class="form-group">
        <div class="col-lg-3" >Dead Line date</div>
        <div class="col-lg-5"><input class="dateinput form-control" name="idate" type="text" id="deaddate"  placeholder= "When Project Finish"></div>
        <br/>
    </div>
    <div class="form-group">
        <div class="col-lg-3">&nbsp;</div>
        <div class="col-lg-5">
            <input type="submit" class="button btn-primary" name="button" id="editproject" value="Edit Project" /> <label id="result"></label>
            <input type="submit" class="button btn-primary" name="button" id="saveEditProjects" value="Save Changes" />
            <label class="blink">Busy</label>
        </div>
    </div>
</div>
</div>
<hr>
<div class="row">
<h2>Update Projects</h2>
<p>Showing UnFinish Project in the below Dropdown menu</p>
<div border="1" id="tbUpdProj" class="form">
    <div class="form-group">
        <div class="col-lg-2">
            <label>Update Project</label>
        </div>
        <div class="ProjectName col-lg-3">
            <select>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="vw">VW</option>
                <option value="audi" selected>Audi</option>
            </select>
        </div>
        <div class="col-lg-2" >
            <select class="projStatus form-control">
<!--                <option value="1">Continue</option>-->
<!--                <option value="3">Finish</option>-->
<!--                <option value="4">Pause</option>-->

            </select>
        </div>
        <div class="col-lg-2">
            <select class="projMode form-control">
            </select>
        </div>
        <div class="col-lg-2">
            <button class="button btn-primary" onclick= "updateProjectInfo();">Update</button>
            <input class="button btn-primary" type="button" value="All Projcts" onClick="allAandFinishProjects();">
        </div>
    </div>
</div>
</div>
<br>
<?php
//if($_COOKIE["userDesig"] == 2 || $_COOKIE["userDesig"] == 4 )
   // include 'textarea.php';

?>
</body>
</html>
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery.min.js"></script>
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery-ui.min.js"></script>
<script>
    $(".dateinput").datepicker({ altField: 'input#date', altFormat: 'yy-mm-dd',dateFormat: 'yy-M-dd' });
</script>
<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>