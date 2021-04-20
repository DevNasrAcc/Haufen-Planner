<?php
include 'connect.php';
global $con;
global $db;

include 'EncodeDecode.php';
include 'generateNumber.php';
///http://snipplr.com/view/43435/
include 'permissionArray.php';
include 'calculateHalf.php';

if (isset($_GET["action"]))
{
    global $con;
    // Retrieve the GET parameters and executes the function
    $funcName = $_GET["action"];    //return function name => get_folder_ele
    $vars	  = $_GET["vars"];    // return Path
    switch($vars)
    {
        case '0':
            //echo "here is 0 variable";
            $funcName();
            break;
        case '1':
            $var1 = $_GET["var1"];
            $funcName($var1);
            //echo "here is 1 variable";
            break;
        case '2':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $funcName($var1,$var2);
            //echo "here is 2 variable";
            break;
        case '3':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $funcName($var1,$var2,$var3);
            //echo "here is 2 variable";
            break;
    }
    unset($_GET["action"]);
}

function login($ID, $pass, $overTime)
{
    $ID = strtolower($ID);
    global $con;
    $sql ="SELECT `PK`,`Employee_Name`, `Designation`, `Cost_Department`, `Active` FROM `employee` WHERE loginID = '$ID' and password = '$pass'";
    $result = mysql_query($sql) or die(mysql_error());
    $numrows = mysql_num_rows($result); // total rows
    $total_rows= mysql_fetch_assoc($result);
    if(count($total_rows) == 1) /// no data found
    {
        echo "Invalid UserName or Password";
        InsertLogInOutTime(0,1,"Unknown Login ".$ID); // 0 mean has no info found at the time login
    }
    else
    {
        loginSetting($result,$total_rows,"Member Login ".$ID);
    }
}

function relogin()
{
    $pk =(int) $_COOKIE['userID'];
    if (isset ($pk))
        ScriptLogin($pk);
}

function ScriptLogin($pk)
{
    $sql ="SELECT `PK`,`Employee_Name`, `Designation`, `Active` FROM `employee` WHERE PK = '$pk'";
    $result = mysql_query($sql) or die(mysql_error());
    $numrows = mysql_num_rows($result); // total rows
    $total_rows= mysql_fetch_assoc($result);
    loginSetting($result,$total_rows,"Script Login");
}

function loginSetting($result,$total_rows, $abtLogin)
{
    $pk = $total_rows['PK'];
    if($total_rows['Designation'] == '3')
    {
        if(($_SERVER['HTTP_HOST'] == '192.9.210.2')||($_SERVER['HTTP_HOST'] == '192.9.210.67')||($_SERVER['HTTP_HOST'] == 'localhost') )	// only allow for moiodeller	// only allow for moiodeller
        {


        }
        else
        {
            InsertLogInOutTime($pk, 2, "Wrong Domain Use by desig : 3");		// login by IlLegal
            return false;	// not allow direct link
        }
    }

    if($pk == '0')
        return false;
    else
        InsertLogInOutTime($pk,1,$abtLogin); // this information must be create when try to be login


    if($total_rows['Active'] == '1') // mean employee is still a member of company not fired
    {
        if(Count($result) == 1 )
        {
            session_start();
            if($pk == 80 || $pk == 84)
                echo "successfulGermany";
            else
                echo "successful";

            setcookie("userID", $total_rows['PK']);
            setcookie("userName", $total_rows['Employee_Name']);
            setcookie("userDesig", $total_rows['Designation']);
            setcookie("Cost_Department", $total_rows['Cost_Department']);
            $sql = "SELECT * FROM `permissionsinpage` where `ETPK` = $pk "; //chk allow  project name
            $result = mysql_query($sql) or die(mysql_error());
            $no_result = mysql_num_rows($result); // total rows

            while($row = mysql_fetch_assoc($result))
            {
                $input = "1";
                setcookie ("permission_memberNames",  $row['MemberNames']);
                setcookie ("permission_AllowProjects",  $row['AllowProjects']);
                setcookie ("permission_VerifyAllowProjects",  $row['VerifyAllowProjects']);
                setcookie ("permission_WhiteBoard",  $row['WhiteBoard']);
                setcookie ("permission_ChkEmpProjDays",  $row['ChkEmpProjDays']);
                setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
                setcookie ("permission_permissionPage",  $row['permissionPage']);
                setcookie ("permission_memberNames",  $row['MemberNames']);
                setcookie ("permission_switch",  $row['switch']);
                setcookie ("permission_MainMenuTop",  $row['MainMenuTop']);
                setcookie ("permission_WhiteBoard_EmpDetail",  $row['WhiteBoard_EmpDetail']);
                setcookie ("permission_Entry_WhiteBoard",  $row['Entry_WhiteBoard']);
                setcookie ("permission_Proj_StatusEdit",  $row['Proj_StatusEdit']);
                setcookie ("permission_StatusReport",  $row['Ger_StatusReport']);
                setcookie ("permission_EmpSwitchRequest",  $row['SwitchRequest']);
                setcookie ("permission_GetSwitchRequest",  $row['GetSwitchRequest']);
                setcookie ("permission_selfCategoryList",  $row['selfCategoryList']);
                setcookie ("permission_ProjectQuestionAnswer",  $row['ProjectQuestionAnswer']);
                if((isset($_GET["var3"])) && $_GET["var3"] == "Others")//Var3 will become show when overtime check
                {
                    setcookie ("half",(  "others" + calculateHalf())  );
                    if ($row['Entry_WhiteBoard']  == 1)
                        emp_curr_projActive1($pk);
                }
                else
                {
                    setcookie ("half",   calculateHalf());
                    if((int)$row['Entry_WhiteBoard'] == 1)
                        switchLogINtime($pk);
                }
            }
        }
    }
    else
    {
        InsertLogInOutTime($pk,2,"Fire  person login :".$abtLogin);		// login by Illegal
        return false;	// not allow direct link
    }
}

function emp_curr_projActive1($pk)
{
    $sql = "UPDATE `emp_curr_proj` SET  `Active` = 1 WHERE  `ETPK` =$pk";
    mysql_query($sql) or die(mysql_error());
}

function  switchLogINtime($pk)
{
    global $con;
    $sql = "SELECT `PTPK`, `Active` FROM emp_curr_proj WHERE `ETPK` = $pk";
    $result = mysql_query($sql) or die(mysql_error());
    $total_rows = mysql_fetch_row($result);
    $proj_no = $total_rows[0]; //total rows // 0
    // 0 Log off hai pehley se abhi login kiya hai  // active = 0  --- $_GET["vars"] == 0 mean query come from script auto Login
    if($total_rows[1] == '0' ||  $_GET["vars"] == 0 )
    {
        $half = calculateHalf();
		//sleep(2);
        // check that k pehle se not available / absent ki entry hai tu us ko change kar do
        // agar nahew tu ye current date ka firs login hai.

        /*
        $sql = "select * from `switch_person` where `SwitchDate` =  CURDATE() and `Half` = $half LIMIT 0 , 1 ";
        $result = mysql_query($sql,$con) or die(mysql_error());
        $total_rows = mysql_num_rows($result);
        */
        $total_rows = switchPersonCheckEntry($half);
        if($total_rows != 0) // change  previous switch that done by mistake bc
        {					//	1 half can contain 1 switching
 /*
            mysql_query("update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis').", EmpDaysStatusId = 1 where `SwitchDate` =  CURDATE() and   `EmployeeNamePK` = $pk and `Half` = $half  order by `PK` desc limit 1",$con);
			mysql_query("
			update switch_person as sw
			inner join projects as p on sw.PTPK = p.PK
			set sw.LeadBy = p.TeamLead
			where	`SwitchDate` =  CURDATE()
			and   `EmployeeNamePK` = $pk 
			and `Half` = $half and 
			sw.PTPK = p.PK",$con);
            */
            switchPersonSpecificEmpEntry($proj_no, $pk, $half);
        }
        else
        {
            sleep(rand(1, 4));
            $anyEntryMade = switchPersonCheckEntry($half); //checking again to ensure that double entry not made
            if($anyEntryMade == 0){
                // INSERT ALL modeller record as a Not available / Absent - Jugaroo Kaam
                $sql = "SELECT `ETPK`, `TaskPK` FROM emp_curr_proj WHERE `PTPK` <> '0'";
                $resultTemp = mysql_query($sql,$con) or die(mysql_error());
                while($emp = mysql_fetch_assoc($resultTemp))
                {
                    //echo "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`SwitchDate`, `LeadBy`,`TaskPK` ) VALUES ('0',".$emp['ETPK'].",'00:00:00',$half, CURDATE(),'0',".$emp['TaskPK'].")";
                    $sqlQuery = "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`SwitchDate`, `LeadBy`,`TaskPK` ) VALUES ('0',".$emp['ETPK'].",'00:00:00',$half, CURDATE(),'0',".$emp['TaskPK'].")";
                    mysql_query($sqlQuery,$con);
                }

                // now update the current user only
                $sql = "select * from `switch_person` where `SwitchDate` =  CURDATE() and   `EmployeeNamePK` = $pk and `Half` = $half order by `PK` desc limit 1 ";
                $result = mysql_query($sql,$con) or die(mysql_error());
                $total_rows = mysql_num_rows($result);
                while($emp = mysql_fetch_assoc($result))
                {
                    //"========now update the curr user==========";
                    mysql_query("update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis').", EmpDaysStatusId = 1  where  `PK` ='".$emp['PK']."' ",$con);
                    mysql_query("
                     update switch_person as sw
                    inner join projects as p on sw.PTPK = p.PK
                    set sw.LeadBy = p.TeamLead
                    where `SwitchDate` =  CURDATE()
                    and   `EmployeeNamePK` = $pk
                    and `Half` = $half and
                    sw.PTPK = p.PK
                     ",$con);

                }
            }
            else {//If there is already entry of not logged user made as not Available then use this condition to enter single entry
                switchPersonSpecificEmpEntry($proj_no, $pk, $half);
            }
        }
        emp_curr_projActive1($pk);

        // now  calculate the total member on this projects
        $sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK=$proj_no and `Active` = 1 and `is_teamlead` = 0" ;  // get the persons of each running projects
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_fetch_row($result);
        $total_person = $total_rows[0]; //total rows

        $sql = "SELECT `PK` FROM currrent_projects WHERE  `date` =  CURDATE() and  PTPK=$proj_no and `Half` = $half";
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_num_rows($result);
    }
}

function switchPersonCheckEntry($half){
    global $con;
    $sql = "select * from `switch_person` where `SwitchDate` =  CURDATE() and `Half` = $half LIMIT 0 , 1 ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $total_rows = mysql_num_rows($result);
    return $total_rows;
}

function switchPersonSpecificEmpEntry($proj_no, $pk, $half){
    global $con;
    mysql_query("update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis').", EmpDaysStatusId = 1
                 where `SwitchDate` =  CURDATE() and   `EmployeeNamePK` = $pk and `Half` = $half  order by `PK` desc limit 1",$con);
    mysql_query("
			update switch_person as sw
			inner join projects as p on sw.PTPK = p.PK
			set sw.LeadBy = p.TeamLead
			where	`SwitchDate` =  CURDATE()
			and   `EmployeeNamePK` = $pk
			and `Half` = $half and
			sw.PTPK = p.PK

			 ",$con);
}

function InsertLogInOutTime($pk, $InOut ,$abt )	//$InOut : 1 = Login ,	0 = Logout , 2 = try to login ill-Legal way
{
    $half = calculateHalf();
    $ip = $_SERVER['REMOTE_ADDR'];

    if(isset($_COOKIE['userID']))
        $logoff_by = $_COOKIE['userID'];
    else
        $logoff_by = $pk;

    $sql ="INSERT INTO `loginrecord` (
				`PK` ,`userID` ,`Date` ,`Time` ,`Half` ,`InOut` ,`IP` ,`Op_UserID`,`About`)
				VALUES (NULL ,  '$pk',  '".date('Y-m-d')."', '".date('gis')."',  '$half',  '".$InOut."',  INET_ATON('$ip'),  '$logoff_by' , '".$abt."')";
    $result = mysql_query($sql) or die(mysql_error());
}


function mailfn()	//windows server not allow
{
    $txt = "First line of text\nSecond line of text";

    // Use wordwrap() if lines are longer than 70 characters
    $txt = wordwrap($txt,70);

    // Send email
    mail("smabn5@gmail.com","PMS Alert Illlegle login",$txt);
}

function logout()
{
    if(isset( $_COOKIE['userID']))
    {
        $pk =(int) $_COOKIE['userID'];

        if((int) $_COOKIE['permission_Entry_WhiteBoard'] == 1)
            switchLogoutTime($pk); //we need $_COOKIE['userID'] in fn

        setcookie ("userID", "", time() - 3600 * 48);
        setcookie ("userName", "", time() - 3600 * 48);
        setcookie ("userDesig", "", time() - 3600 * 48);
        setcookie ("permission_memberNames", "", time() - 3600 * 48);
        setcookie ("permission_AllowProjects", "",  time() - 3600 * 48);
        setcookie ("permission_VerifyAllowProjects","",  time() - 3600 * 48);
        setcookie ("permission_WhiteBoard", "", time() - 3600 * 48);
        setcookie ("permission_ChkEmpProjDays","", time() - 3600 * 48);
        setcookie ("permission_ChkProjDays","",time() - 3600 * 48);
        //setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
        setcookie ("permission_permissionPage","",time() - 3600 * 48);
        setcookie ("permission_memberNames","",time() - 3600 * 48);
        setcookie ("permission_switch","",time() - 3600 * 48);
        setcookie ("permission_MainMenuTop","",  time() - 3600 * 48);
        setcookie ("permission_WhiteBoard_EmpDetail","",time() - 3600 * 48);
        setcookie ("permission_Entry_WhiteBoard","",time() - 3600 * 48);
        setcookie ("permission_Proj_StatusEdit","",time() - 3600 * 48);
        setcookie ("half", time() - 3600 * 48 );
        setcookie ("Cost_Department", time() - 3600 * 48 );
        setcookie ("permission_StatusReport", time() - 3600 * 48 );
    }
    // ------------- switch to free this user -----------------------
    header("refresh: 1; url=http://" . $_SERVER['HTTP_HOST']."/Employee_Switch_Persons/index.php");
    InsertLogInOutTime($pk,0,""); // this information make at every fire
}

function logoutAsNotavaiable()
{
    setcookie ("half",  0);
}

function logoutByOther($pk)
{
    switchLogoutTime($pk);
    InsertLogInOutTime($pk,0,"");
    //echo "logoutby";
}

function switchLogoutTime($pk)
{
    global $con;
    $sql = "UPDATE `emp_curr_proj` SET  `Active` = 0 WHERE  `ETPK` =$pk";
    mysql_query($sql) or die(mysql_error());
    echo "done log out";
}

function loginAll()
{
    global $con;
    $sql = "select  `PK` FROM employee  WHERE Designation = 3 "  ;
    $result = mysql_query($sql) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $pk = $row['PK'];
        switchLogINtime($pk);
    }
}

function logoutAll()
{
    global $con;
    $sql = "SELECT `ETPK`  FROM `emp_curr_proj`  where  `Active` = 1";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $pk = $row['ETPK'];
        switchLogoutTime($pk);
    }
}

function isUserTeamLead($etpk){
    global $con;
    $sql = "select PTPK, Dept_Category from emp_curr_proj where ETPK = ".$etpk;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $arr = array();
    while($row = mysql_fetch_assoc($result)){
        $arr[] = $row;
    }
    echo json_encode($arr);
}
?>