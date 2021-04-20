<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <script type="text/javascript" src="jquery-1.9.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="Employee_Switch_Person.js"></script>

    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <title>Project Status-PMS</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />

</head>

<body class="container">

<?php
if (isset($_COOKIE["userID"]))
    if($_COOKIE['permission_MainMenuTop'] == 1)
        include 'menu.php';
?>
<h2>Project Status</h2>
<p>View Project Progress, Questions, Priority, and Feedback.</p><hr>

<div class="row">
    <?php
    if($_COOKIE['userID'] == 80)
        echo '
    <table class="NonPDF" border="1" width="100%" >
        <tr>
            <td width="50%">
                <form  action="statusreport.php" method="Get">
                    <div  name id="ProjectMenu" style="float:left;" class="projectName"></div>
                    <div id="showdetail">&nbsp;<button  type="submit" id="showProjDetail">Show Project Detail</button></div>
                </form>

            </td>
            <td>
                <div id="showdetail" style="float: right">
                    <input name="projName" placeholder="New Project Name" list="projectNames1" id="NewprojName" type="text"  width="250px">
                    <input type="button" name="button" id="addproject" value="Add New Project">
                </div>
            </td>
        </tr>
    </table>
	';
    ?>

    <div id="ProjectStatus">
    </div>

    <div id="ProjectStatus1">
    </div>
    <div id="QuestionProjects">
    </div>
    <div id="LowPriorityProjects">
    </div>
    <div id="FeedbackProjectFilter">
    </div>

</div>
<!--<table class="sortable">-->
<!--    <thead>-->
<!--    <tr>-->
<!--    <td>abc</td>-->
<!--    <td>cdd</td>-->
<!--    <td>ad</td>-->
<!--    </tr>-->
<!--    </thead>-->
<!--    <tbody>-->
<!--    <tr>-->
<!--    <td>aabc</td>-->
<!--    <td>ecdd</td>-->
<!--    <td>zad</td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td>aabc</td>-->
<!--        <td>dcdd</td>-->
<!--        <td>awzad</td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--        <td>baabc</td>-->
<!--        <td>decdd</td>-->
<!--        <td>azad</td>-->
<!--    </tr>    </tbody>-->
<!--</table>-->
<!--<script type="text/javascript" src="js/sortableTableLib/sorttable.js"></script>-->
</body>

</html>