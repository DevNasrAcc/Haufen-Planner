<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Assign Work-PMS</title>
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
<h2>Assign Work</h2>
<p>Select Employee and assign work here.</p><hr>
<div class="row">
    <div border="1" class="form">
        <div class="form-group">
            <div class="col-lg-3">Employee</div>
            <div class="col-lg-5"><select class="nameEmp form-control" onchange="filterWorkListByEmployee();">
                    <option value="0">Select Employee</option>
                </select></div>
            <div class="col-lg-4"><input type="checkbox" id="showAllEmp" onclick="allEmpList();"/>Show All Employee </div>
            <br>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Project</div>
            <div class="col-lg-5 ProjectName"  id="desig" onchange="filterList();">
                <span class="ProjectName form-control" >
                    <select>
                        <option value="0">Select Project</option>
                    </select>
                </span>
            </div>
            <div class="col-lg-4"><input type="checkbox" onclick="allProjectList();" value="Show All Projects" id="showAllProjectCheck">Show All Projects </div>
            <br/>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Task Date</div>
            <div class="col-lg-5"><input type="date" class="workDate form-control" name="name2" id="password" /></div>
            <br>
            <div class="col-lg-4"> </div>
        </div>
        <div class="form-group">
            <div class="col-lg-3">Task Description</div>
            <div class="col-lg-5"><textarea type="text" class="workDescription form-control" name="textfield" id="name" ></textarea></div>
            <br>
            <div class="col-lg-4"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3">&nbsp;</div>
            <div class="col-lg-5" id="verify"><input type="submit" class="button btn-primary" name="button" id="btnAddPerson" value="Assign" onclick="AssignWork()" /><label id="result"></label></div>
            <br/>
            <div class="col-lg-4"></div>
        </div>
    </div>
</div>
<div class="row"></div>
<?php
if($_COOKIE['permission_AllowProjects'] == 1 ) // have to allow these project to shift him self
{
echo '<div><input type="checkbox" class="viewAllTasks"/>View All Created Task</div>';
}
?>
<br>
<div class="row">
    <div class="col-lg-4">
        <button class="btn btn-danger btn-block glyphicon glyphicon-tasks" type="button" onclick="showAssignWork(0)">
           Pending Tasks <span class="badge countPendingTask"></span>
        </button>
    </div>
    <div class="col-lg-4">
        <button class="btn btn-primary  btn-block glyphicon glyphicon-remove" type="button" onclick="showAssignWork(2)">
            Cancel Tasks <span class="badge countCancelTask"></span>
        </button>
    </div>
    <div class="col-lg-4">
        <button class="btn btn-success  btn-block" type="button" onclick="showAssignWork(1)">
            Completed Tasks <span class="badge countCompletedTask"></span>
        </button>
    </div>
</div>

<div class="showAssignWork"></div>

</body>
</html>
