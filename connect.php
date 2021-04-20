<?php
$localhost = "127.0.0.1";
$root = "root";
//$rootpass = "";
$rootpass = "";
$dbName = "ttl_employee_switch";
$con = mysql_connect($localhost,$root,$rootpass);
$db = mysql_select_db("ttl_employee_switch", $con);
#region PDOConnection
$connPDO = new PDO("mysql:host=$localhost;dbname=$dbName",$root,$rootpass);
#endregion

?>