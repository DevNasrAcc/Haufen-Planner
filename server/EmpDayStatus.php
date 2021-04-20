<?php
/**
 * Created by PhpStorm.
 * User: Faizan
 * Date: 7/28/2015
 * Time: 11:23 AM
 */
$localhost = "127.0.0.1";
$root = "root";
$rootpass = "p@k!st@n";
$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
$db = mysql_select_db("ttl_employee_switch", $con);
global $con;
global $db;

/*Handling GET Reqeusts - Start*/
if (isset($_GET["action"]))
{
    $funcName = $_GET["action"];    //return function name => get_folder_ele
    $vars	  = $_GET["vars"];    // return Path
    switch($vars)
    {
        case '0':
            $funcName();
            break;
        case '1':
            $var1 = $_GET["var1"];
            $funcName($var1);
            break;
        case '2':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $funcName($var1,$var2);
            break;
        case '3':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $funcName($var1,$var2,$var3);
            break;
        case '4':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $funcName($var1,$var2,$var3,$var4);
            break;
        case '5':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $funcName($var1,$var2,$var3,$var4,$var5);
            break;
        case '6':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6);
            break;
        case '7':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7);
            break;
        case '8':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $var8 = $_GET["var8"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7,$var8);
            break;
    }
    unset($_GET["action"]);
}

/*Handling GET Reqeusts - END*/
if (isset($_POST["action"]) && !empty($_POST["action"])) {
 //Checks if action value exists
        $action = $_POST["action"];
        switch($action){
            case "addEmployeeDayStatus":
                echo addEmployeeDayStatus();
                break;
        }
}

function getEmpStatusByDate ($date){
    global $con;
    $sql = "SELECT sp.PK as empSwitchId, sp.PTPK, pro.Name as projectName, sp.Half, sp.EmployeeNamePK ETPK, emp.Employee_Name, sp.Half, sp.LeadBy, EmpDaysStatusId, sp.SwitchDate, lev.LeaveName
            FROM `switch_person` sp
            left join employee emp
            on sp.EmployeeNamePK = emp.PK
            left join  tbl_leave lev
            on  sp.EmpDaysStatusId =lev.Id
            left join projects pro
            on sp.PTPK = pro.PK
            WHERE SwitchDate = '".$date."'
            and Half IN (1,2)
            order by PTPK, ETPK, Half";
    //and EmpDaysStatusId is null
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function getNotAvailableEmpStatusByDate ($date){
    global $con;
    $sql = "SELECT sp.PK as empSwitchId, sp.PTPK, pro.Name as projectName, sp.Half, sp.EmployeeNamePK ETPK, emp.Employee_Name, sp.Half, sp.LeadBy, EmpDaysStatusId, sp.SwitchDate, lev.LeaveName
            FROM `switch_person` sp
            left join employee emp
            on sp.EmployeeNamePK = emp.PK
            left join  tbl_leave lev
            on  sp.EmpDaysStatusId =lev.Id
            left join projects pro
            on sp.PTPK = pro.PK
            WHERE SwitchDate = '".$date."'
            AND sp.PTPK = 0
            and Half IN (1,2)
            order by PTPK, ETPK, Half";
    //and EmpDaysStatusId is null
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function getAvailableEmpStatusByDate ($date){
    global $con;
    $sql = "SELECT sp.PK as empSwitchId, sp.PTPK, pro.Name as projectName, sp.Half, sp.EmployeeNamePK ETPK, emp.Employee_Name, sp.Half, sp.LeadBy, EmpDaysStatusId, sp.SwitchDate, lev.LeaveName
            FROM `switch_person` sp
            left join employee emp
            on sp.EmployeeNamePK = emp.PK
            left join  tbl_leave lev
            on  sp.EmpDaysStatusId =lev.Id
            left join projects pro
            on sp.PTPK = pro.PK
            WHERE SwitchDate = '".$date."'
            AND sp.PTPK <> 0
            and Half IN (1,2)
            order by PTPK, ETPK, Half";
    //and EmpDaysStatusId is null
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function getEmpStatusBySwitchPK ($switchTblPK){
    global  $con;
    $sql = "SELECT sp.PK as empSwitchId, sp.PTPK, pro.Name as projectName, sp.Half, sp.EmployeeNamePK ETPK, emp.Employee_Name, sp.Half, sp.LeadBy, EmpDaysStatusId, sp.SwitchDate, lev.LeaveName
            FROM `switch_person` sp
            left join employee emp
            on sp.EmployeeNamePK = emp.PK
            left join  tbl_leave lev
            on  sp.EmpDaysStatusId =lev.Id
            left join projects pro
            on sp.PTPK = pro.PK
            WHERE  sp.PK = '".$switchTblPK."'
            and Half IN (1,2)
            order by PTPK, ETPK, Half";
    //and EmpDaysStatusId is null
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function getSpecificEmpDayStatusByIdAndSwitchDate($empId, $switchDate){
    global  $con;
    $sql = "SELECT sp.PK as empSwitchId, sp.PTPK, pro.Name as projectName, sp.Half, sp.EmployeeNamePK ETPK, emp.Employee_Name, sp.Half, sp.LeadBy, EmpDaysStatusId, sp.SwitchDate, lev.LeaveName
            FROM `switch_person` sp
            left join employee emp
            on sp.EmployeeNamePK = emp.PK
            left join  tbl_leave lev
            on  sp.EmpDaysStatusId =lev.Id
            left join projects pro
            on sp.PTPK = pro.PK
            WHERE SwitchDate = '".$switchDate."'
            AND sp.EmployeeNamePK = ".$empId."
            AND Half IN (1,2)
            order by PTPK, ETPK, Half";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function getAllEmpDaysStausName(){
    global $con;
    $sql = "select * FROM tbl_leave";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function addEmpDayStatus($queryPart){
    global $con;
    $sql = "UPDATE switch_person SET  ".$queryPart;
    if(mysql_query($sql,$con)){
        echo 1;//successfully updated data
    }else{
        echo 0;
    }

}
function addEmployeeDayStatus(){
    global $con;
    $sql = "UPDATE switch_person SET  ".$_POST["queryPart"];
    if(mysql_query($sql,$con)){
        echo 1;//successfully updated data
    }else{
        echo 0;
    }

}