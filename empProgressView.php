<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PMS-View Efforts</title>
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="css/site.css" />
    <script type="text/javascript" src="jquery-1.9.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="Employee_Switch_Person.js"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var tableToExcel = (function () {
            var uri = 'data:application/vnd.ms-excel;base64,'
                , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
                , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
                , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
            return function (table, name) {
                if (!table.nodeType) table = document.getElementById(table)
                var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
                window.location.href = uri + base64(format(template, ctx))
            }
        })()
    </script>
</head>

<body class="container">
<?php
include 'menu.php';
?>
<h2>Sub-ordinate(s) Progress</h2>
<p>View your Sub-ordinates progress by date.</p><hr>
<div class="row">
    <div class="col-lg-1"></div>
    <div class="col-lg-5">Select specific Date to Add your sub-ordinate(s) efforts</div>
    <div class="col-lg-5">
        <input type="date" class="form-control" id="empProgressViewDate" onchange="viewEmpProgressByDate();">
    </div>
    <div class="col-lg-1"></div>
</div>

<div class="row">
    <div class="col-lg-1"></div>
    <div class="col-lg-10" id="displayProgress"></div>
    <div class="col-lg-1"></div>

</div>
<?php
if($_COOKIE['permission_AllowProjects'] == 1 ) // have to allow these project to shift him self
{
    echo '';
}
?>
<!--<input type="button" id="EmployeeProgress" class="btn btn-primary" onclick="employeeProgressUpdate()" value="Submit Efforts">-->
<!--<input type="button" id="btnExcelExport" value="export to excel">-->

<div class="col-lg-1"></div>
<div class="col-lg-10">
    <div id="btnExcelExport"></div>
</div>
<div class="col-lg-1"></div>
</body>
</html>
