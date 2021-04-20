<?php
/**
 * Created by PhpStorm.
 * User: Faizan Khan
 * Date: 11/9/2016
 * Time: 3:21 PM
 */
?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Project Q/A - PMS</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
</head>
<body class="container">
<?php
if (isset($_COOKIE["userID"])) {
    $desgi = (int)$_COOKIE['userDesig'];
    if ($_COOKIE['permission_MainMenuTop'] == 1)
        include 'menu.php';
}
?>
<h2>Project Question/Answers</h2>
<p>Ask Questions about the projects and get answer form production Manager.</p><hr>
<div class="row">
    <div class="col-lg-3">
        Select Project
    </div>
    <div class="col-lg-9"><select class="form-control" id="QuestionProjectId"><option></option></select></textarea>
    </div>
</div>
<div class="row">
    <div class="col-lg-3">
        Enter New Question
    </div>
    <div class="col-lg-9"> <textarea class="form-control" id="NewQuestion"></textarea>
    </div>
</div>

<div class="row">
    <div class="col-lg-3"></div>
    <div class="col-lg-3">
        <input type="button" class="btn btn-primary" value="Submit" id="SubmitNewQuestion">
    </div>
</div>
<h3>Previous Q/A</h3>
<div id="ProjectQuestionAnswerDataDisplay"></div>


<script src="compiled/jquery1.10.2.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/custom/ProjectQA.js"></script>


</body>
</html>