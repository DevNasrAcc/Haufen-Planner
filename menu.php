<?php
if (!((isset($_COOKIE["userID"]))))
 return false;

$desgi =(int) $_COOKIE['userDesig'];
$dept =(int) $_COOKIE['Cost_Department'];

if($dept != 5 && $desgi != 3)
{
    echo '<nav id="Menuinfo" role="navigation" class="navbar">';
    echo '<div class="navbar-header"><span class="navbar-brand ">PMS</span></div>';
    echo '<ul class="nav navbar-nav text-white"><li><a href="ModelerPage.php" rel=next media="not print" ><span class="glyphicon glyphicon-home"></span> Home </a></li>';
    $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    if($dept != 5 && $desgi != 3)
    {
        if($desgi != 1) {
            echo '
            <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="glyphicon glyphicon-user"></span> Employees<b class="caret"></b></a>
            <ul role="menu" class="dropdown-menu">
                <li><a href="AddPerson.php" rel=next media="not print"><span class="glyphicon glyphicon-save"></span>  Add Person </a></li>
                <li><a href="AssignWork.php" rel=next media="not print"><span class="glyphicon glyphicon-tasks"></span> Assign Task</a></li>
                <li><a href="EmpDayStatus.php" rel=next media="not print"><span class="glyphicon glyphicon-stats"></span> Day\'s Status</a></li>
                <li><a href="AddDinnerMenu.php" rel=next media="not print"><span class="glyphicon glyphicon-cutlery"></span> Dinner Choices</a></li>
                <li><a href="PreviousVote.php" rel=next media="not print"><span class="glyphicon glyphicon-ok"></span> Vote Records</a></li>

            </ul>
            </li>';
        }

        echo '
            <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="glyphicon glyphicon-book"></span> Projects<b class="caret"></b></a>
            <ul role="menu" class="dropdown-menu">
                <li><a href="AddProjects.php" rel=next media="not print"><span class="glyphicon glyphicon-save"></span> Add Project </a></li>
                <li><a href="EditProjects.php" rel=next media="not print"> <span class="glyphicon glyphicon-edit"></span> Edit Project</a></li>
                <li><a href="ProjectTaskAdd.php" rel=next media="not print"> <span class="glyphicon glyphicon-save"></span> Add Project Task</a></li>
                <li class="divider"></li>
                <li><a href="projectstatus.php" rel=next media="not print"><span class="glyphicon glyphicon-indent-left"></span> Project Status </a></li>
                <li><a href="projectstatusedit.php" rel=next media="not print"><span class="glyphicon glyphicon-edit"></span>  Edit Status </a></li>
                <li class="divider"></li>
                <li><a href="ProjectQA.php" rel=next media="not print"><span class="glyphicon glyphicon glyphicon-pencil"></span> Projects Q/Ans </a></li>
            </ul>
            </li>';
        if($desgi != 1){
            echo '
            <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle" href="#"><span class="glyphicon glyphicon-record"></span> History<b class="caret"></b></a>
            <ul role="menu" class="dropdown-menu">
            <li><a href="projectCommentHistory.php" rel=next media="not print"><span class="glyphicon glyphicon-comment"></span> Project Comments</a></li>
            </ul>
          </li>';
        }
    }
    echo '</ul></nav>';
}
else {
    echo '<nav id="Menuinfo" role="navigation" class="navbar">';
    echo '<div class="navbar-header"><span class="navbar-brand">PMS</span></div>';
    echo '<ul class="nav navbar-nav"><li><a href="ModelerPage.php" rel=next media="not print"><span class="glyphicon glyphicon-home"></span> Home</a></li>';
    echo '<li><a href="projectstatus.php" rel=next media="not print"><span class="glyphicon glyphicon-indent-left"></span> Project Status </a></li>';
    echo '<li><a href="ProjectQA.php" rel=next media="not print"><span class="glyphicon glyphicon glyphicon-pencil"></span> Projects Q/Ans </a></li>';
    echo '<li><a href="empProgressView.php" rel=next media="not print"><span class="glyphicon glyphicon-search"></span> View Efforts </a></li>';
    $url = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    if (false !== strpos($url,'projectstatus'))
        echo '<li><a href="projectstatusedit.php" rel=next media="not print"><span class="glyphicon glyphicon-edit"></span>Edit Status </a></li>';
    echo '<li><a href="AssignWork.php" rel=next media="not print"><span class="glyphicon glyphicon-tasks"></span> Assign Task</a></li>';
    echo '</ul></nav>';
}
?>