<?php
/**
 * Created by PhpStorm.
 * User: Faizan Khan
 * Date: 9/28/2015
 * Time: 10:58 AM
 */
/*$localhost = "127.0.0.1";
$root = "root";
//$rootpass = "p@k!st@n";
$rootpass = "";
$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
$db = mysql_select_db("ttl_employee_switch", $con);*/
include '../connect.php';
global $con;
global $db;

if(isset($_GET["action"]))
{
    $funcName = $_GET["action"];
    $vars = $_GET["vars"];

    switch($vars){

        case '0':
            $funcName();
            break;

        case '1':
            $var1 = $_GET["var1"];
            $funcName($var1);
            break;
    }
}
function PreviousVoteRecordByDate($askDate){
    global $con;
    $sql = "select VPPK from vote_poll where askDate = '$askDate'";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result)){
        $questionId = $row["VPPK"];
    }
    if(isset($questionId)){
        $sql = "select  DISTINCT (Employee_Name), Projects,b.Option, b.dinnerItemId, c.dinnerName, b.Question,  b.VPPK, b.vote_Value FROM
                (SELECT emp_curr_proj.ETPK, emp_curr_proj.`PTPK`, emp_curr_proj.`Active`, Employee.Employee_Name,projects.name AS Projects, EmpDaysStatusId FROM `emp_curr_proj`
                LEFT JOIN employee
                on employee.pk = emp_curr_proj.ETPK
                left join projects
                on projects.pk = emp_curr_proj.PTPK
                left join switch_person sp
                on sp.EmployeeNamePk = employee.pk
                where sp.SwitchDate = '$askDate') as a
                left join
                (select vote_poll_output.Option,EmpPK, dinnerItemId, vp.Question, vote_Value, vp.VPPK from vote_poll_output
                inner join vote_poll vp
                ON vp.VPPK =  vote_poll_output.QuesNo
                where `QuesNo` IN (select VPPK from vote_poll where askDate = '$askDate')
                and `Output` = 'true')as b
                on a.ETPK = b.emppk
                left join
                (select dinnerId, dinnerName FROM dinnermenu) AS c
                on b.dinnerItemId = c.dinnerId
                where a.EmpDaysStatusId = 1
                ORDER BY Question, `projects`";
        //ORDER BY `projects`, b.Option ASC";
        /*
    $sql = "select  Employee_Name, Projects,b.Option, b.dinnerItemId, c.dinnerName, b.Question FROM
                (SELECT emp_curr_proj.ETPK, emp_curr_proj.`PTPK`, emp_curr_proj.`Active`, Employee.Employee_Name,projects.name AS Projects, EmpDaysStatusId FROM `emp_curr_proj`
                LEFT JOIN employee
                on employee.pk = emp_curr_proj.ETPK
                left join projects
                on projects.pk = emp_curr_proj.PTPK
                left join switch_person sp
                on sp.EmployeeNamePk = employee.pk
                where sp.SwitchDate = '$askDate') as a
                left join
                (select vote_poll_output.Option,EmpPK, dinnerItemId, vp.Question from vote_poll_output
                inner join vote_poll vp
                ON vp.VPPK =  vote_poll_output.QuesNo
                where `QuesNo` = '$questionId'
                and `Output` = 'true')as b
                on a.ETPK = b.emppk
                left join
                (select dinnerId, dinnerName from dinnermenu) as c
                on b.dinnerItemId = c.dinnerId
                where a.EmpDaysStatusId = 1
                ORDER BY `projects` ASC";*/
        $result = mysql_query($sql,$con) or die(mysql_error());
        $data = array();
        while($row = mysql_fetch_assoc($result)){
            $data[] = $row;
        }
        echo json_encode($data);
    }
    else {
        echo "-1";
    }//*/


}