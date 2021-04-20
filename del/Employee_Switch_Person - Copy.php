<?php

//include 'login.php';
//include 'EncodeDecode.php';
$localhost = "localhost";
$root = "root";
$rootpass = "";
$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
$db=mysql_select_db("ttl_employee_switch", $con);
global $con;
global $db;


if (isset($_GET["action"]))
   {
	   
	/*$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
	$db=mysql_select_db("ttl_employee_switch", $con);*/
	   
	//echo "in\n";
	$id =(int) $_COOKIE['userID'];
	
	
	$sql = "SELECT `Active` FROM  `emp_curr_proj` WHERE  `ETPK` = $id ";
		
		$result = mysql_query($sql,$con) or die(mysql_error());
		
	//	$no_result = mysql_num_rows($result);
		//return $no_result;
	//echo "working";
	$row = mysql_fetch_assoc($result);
	//echo "id: $id &&& active: ". $row['Active'] ;
	
	if($row['Active'] == '0' )
	{
		echo "you are not login ";
		
		require_once('login.php');

		logout();
		return false;
		
	}
	
	
	
	
	  
    //echo "get";
    // Retrieve the GET parameters and executes the function
	  $funcName = $_GET["action"];    //return function name => get_folder_ele
	  $vars	  = $_GET["vars"];    // return Path
	  //echo"type: ".gettype ($vars).',';
          //$vars = '*'.$vars.'*';
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
			case '4':
                $var1 = $_GET["var1"];
                $var2 = $_GET["var2"];
				$var3 = $_GET["var3"];
				$var4 = $_GET["var4"];
				
                $funcName($var1,$var2,$var3,$var4);  
                //echo "here is 2 variable";
                break;
			case '5':
                $var1 = $_GET["var1"];
                $var2 = $_GET["var2"];
				$var3 = $_GET["var3"];
				$var4 = $_GET["var4"];
				$var5 = $_GET["var5"];
				
                $funcName($var1,$var2,$var3,$var4,$var5);  
                //echo "here is 2 variable";
                break;
			case '6':
                $var1 = $_GET["var1"];
                $var2 = $_GET["var2"];
				$var3 = $_GET["var3"];
				$var4 = $_GET["var4"];
				$var5 = $_GET["var5"];
				$var6 = $_GET["var6"];
                $funcName($var1,$var2,$var3,$var4,$var5,$var6);  
                //echo "here is 2 variable";
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
                //echo "here is 2 variable";
                break;
        }
	  //$funcName($vars);	
          
          unset($_GET["action"]);
		
   }
//   else if (isset($_POST[action]))
//   {
//    echo "post";
//	  // Retrieve the POST parameters and executes the function
//	  $funcName	 = $_POST[action];
//	$vars	  = $_POST[vars];
//	$funcName($vars); 
//	  unset($_GET[action]);
//   } else
//   {
//	  // If there is no action in the URL, then do this
//	//echo "<INPUT NAME='btnSubmitAdmin' TYPE='button' ONCLICK='javascript:javaFunction()' VALUE='Call Javafunction() which redirects to a PHP function'>";
//   }
//-----------------------Daabase & DB Connection ----------------------------------------
//----------------------------------------------------------------------------------------

function chkNewLoginName($loginID)
{
	global $con;
	$sql = "SELECT COUNT(*) FROM `employee` where `loginID` = $loginID"; // get all project name
	$result = mysql_query($sql,$con) or die(mysql_error());

	$total_rows = mysql_fetch_row($result);
	$ETPK = $total_rows[0]; //total rows
	echo "total_rows: $total_rows";
	echo "ETPK: $ETPK";
}

function designation()
{
	/*$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
	$db=mysql_select_db("ttl_employee_switch", $con);*/
	global $con;
	$sql = "SELECT `PK`,`Designation` FROM `designation`"; // get all project name
	$result = mysql_query($sql,$con) or die(mysql_error());
        
      $no_result = mysql_num_rows($result); 
	  echo "<select class='desigName'>";

        for ($i=0;$i<=$no_result-1;$i++)
            {
                echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
            //echo "<p>".mysql_result($result,$i,1)."</p>"; 
            }
        echo "</select>";
	
}
function addProject($projName,$hod,$tl,$about,$stdate,$deadDate)
{
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	
	ini_set('date.timezone', 'Asia/Karachi');
	$id =(int) $_COOKIE['userID'];
	$curDate = date('Y-m-d');
	
	$originalDate = $stdate;
	$stdate = date("Y-m-d", strtotime($originalDate));
	
	$originalDate = $deadDate;
	$deadDate = date("Y-m-d", strtotime($originalDate));
	
	$time = date('H:i:s');
	$sql = "INSERT INTO `ttl_employee_switch`.`projects` ( `Name`, `Time`, `Status`, `About`, `TeamLead`, `HOD`, `StartDate`, `DeadLIneDate`,  `Add Date`, `AddByPerson`) 
													VALUES ( '$projName', '$time', '2', '$about', '$tl', '$hod', '$stdate', '$deadDate', '$curDate', '$id')";
	
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}
function getPermissions()
{
	$id =(int) $_COOKIE['userID'];
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	
	// shifted into login.php
	
	$sql = "SELECT * FROM `permissionsinpage` where `ETPK` = $id "; //chk allow  project name 
	//echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
	$no_result = mysql_num_rows($result); // total rows 
	
	 //echo "ID,Name,Switch,Allow Projects,Verify Proj,WhiteBoard,Chk Emp Proj Days, Chk Proj Days,Permissions";
           
		  
		   
			/*global $array;
			 require 'permissionArray.php';
			require 'generateNumber.php';
			require 'cookiesloop.php';
		 	echo Count($array);*/
		   
		    while($row = mysql_fetch_assoc($result))
            {
               	setcookie ("permission_switch",  $row['switch']);
				setcookie ("permission_AllowProjects",  $row['AllowProjects']);
				setcookie ("permission_VerifyAllowProjects",  $row['VerifyAllowProjects']);
				setcookie ("permission_WhiteBoard",  $row['WhiteBoard']);
				setcookie ("permission_ChkEmpProjDays",  $row['ChkEmpProjDays']);
				setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
				setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
				setcookie ("permission_permissionPage",  $row['permissionPage']);
				
				echo " row['switch']: ". $row['switch'];
				echo "COOKIE['userID']: ".$_COOKIE['userID'];
				echo "COOKIE['permission_switch']: ".$_COOKIE['permission_switch'];
			}
	
}


function permission($a1,$a2,$a3,$a4,$a5,$a6,$a7,$a8)
{
	if($a2 == 'true')
		$a2 = 1;
	else
		$a2 = 0;
		
	if($a3 == 'true')
		$a3 = 1;
	else
		$a3 = 0;
		
	if($a4 == 'true')
		$a4 = 1;
	else
		$a4 = 0;
		
	if($a5 == 'true')
		$a5 = 1;
	else
		$a5 = 0;
		
	if($a6 == 'true')
		$a6 = 1;
	else
		$a6 = 0;
		
	if($a7 == 'true')
		$a7 = 1;
	else
		$a7 = 0;
		
	if($a8 == 'true')
		$a8 = 1;
	else
		$a8 = 0;
	
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	
	$sql = "UPDATE `permissionsinpage` SET   `switch` = $a2, `AllowProjects` = $a3, `VerifyAllowProjects` = $a4, `WhiteBoard` = $a5, `ChkEmpProjDays` = $a6,`ChkProjDays` = $a7, `permissionPage` = $a8 where `ETPK` = $a1"; 
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}
function AddPerson($name,$logname,$pass,$dept,$desig)
{
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	
	
	
	
	$addby = $pk =(int) $_COOKIE['userID'];
	$sql = "INSERT INTO `employee` ( `Cost_Department`, `Employee_Name`, `Designation`, `loginID`, `password`,`add_by`) VALUES ( $dept, '$name',$desig ,'$logname',  '$pass',$addby)"; 
	//echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
	
	$sql = "SELECT COUNT(*) FROM employee";
	$result = mysql_query($sql,$con) or die(mysql_error());
	$total_rows = mysql_fetch_row($result);
	$ETPK = $total_rows[0]; //total rows


	if($desig == '3')
	{
		echo "\n\nlast add: $ETPK \n\n";
	
		$sql = "INSERT INTO `emp_curr_proj` (  `ETPK`, `PTPK`, `Active`) VALUES ($ETPK, 4,0)"; // 4: free, 0: not avaiable
		
		$result = mysql_query($sql,$con) or die(mysql_error());
	} 
	
	
	
	$sql = "INSERT INTO `permissionsinpage` (  `ETPK`, `switch`, `AllowProjects`, `VerifyAllowProjects`, `WhiteBoard`, `ChkEmpProjDays`,`ChkProjDays`) VALUES ( $ETPK,0,0,0,0,0,0)"; 
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
	
		
		
}
function permissionPage($id)
{
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	
	$sql = "SELECT * FROM `permissionsinpage` where `ETPK` = $id "; //chk allow  project name 
	//echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
	$no_result = mysql_num_rows($result); // total rows 
	
	 echo "ID,Name,Switch,Allow Projects,Verify Proj,WhiteBoard,Chk Emp Proj Days, Chk Proj Days,Permissions";
            while($row = mysql_fetch_assoc($result))
            {
                echo "----//------";

				
				echo $row['ETPK'];echo",";
				$name = GetEmpName($row['ETPK']);
                echo $name;echo",";
               
                //$desName = GetDesignatin($row['HOD']);
                //echo $desName;echo",";
				echo '<input type="checkbox" id="switch"';
				if ($row['switch'] == 1)
					echo "checked";
				echo">,";
				
                //$desName = GetDesignatin($row['TeamLead']);
                //echo $desName;echo",";
				echo '<input type="checkbox" id="AllowProjects"';
                if ($row['AllowProjects'] == 1)
					echo "checked";
				echo">,";
				
				echo '<input type="checkbox" id="VerifyAllowProjects"';
				if ($row['VerifyAllowProjects'] ==1)
						echo "checked";
				echo">,";
						
				echo '<input type="checkbox" id="WhiteBoard"';
				if($row['WhiteBoard'] ==1)
					echo "checked";
				echo">,";
				
				echo '<input type="checkbox" id="ChkEmpProjDays"';
				if( $row['ChkEmpProjDays'] ==1)
					echo "checked";
				echo">,";
				
				echo '<input type="checkbox" id="ChkProjDays"';
				if($row['ChkProjDays'] ==1)
					echo "checked";
				echo">,";
				
				echo '<input type="checkbox" id="permissionPage"';
				if( $row['permissionPage'] == 1)
					echo "checked";
				echo">";
				
               
            }    
	
}

function ProjectsPreDays($projID, $dateRng)
{
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	
	if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
	{
		$date = explode(" - ", $dateRng);
		
		$date1 = explode("/", $date[0]);
		$date2 = explode("/", $date[1]);
		
	}
	
	
	if(isset($date))

		$sql = 	"SELECT  *
		FROM  `switch_person` 
		WHERE `PTPK` = $projID and  `date` BETWEEN  '$date1[0]' AND  '$date2[0]' and `Month` BETWEEN  '$date1[1]' AND  '$date2[1]'
		and `Year` BETWEEN  '$date1[2]' AND  '$date2[2]'";
	else
		$sql = "SELECT * FROM `switch_person` where   `PTPK` = $projID "; //chk allow  project name 
		
	$result = mysql_query($sql,$con) or die(mysql_error());
	$no_result = mysql_num_rows($result); // total rows 
	
	 echo "ProjectName,Persons,Half,date";
            while($row = mysql_fetch_assoc($result))
            {
                echo "----//------";
                //echo $row['PK'];echo",";
				$Projname  = GetProjectName($row['PTPK']);
                echo $Projname;echo",";
				
				$name = GetEmpName($row['EmployeeNamePK']);
				echo $name;echo",";
				
				
               
                //$desName = GetDesignatin($row['HOD']);
                //echo $desName;echo",";
                echo $row['SwitchTime'];echo",";
                //$desName = GetDesignatin($row['TeamLead']);
                //echo $desName;echo",";
                echo $row['Half'];echo",";
				echo $row['date']."-";//echo",";
				echo $row['Month']."-";//echo",";
                echo $row['Year'];
               
            }    
}

function Count_Emp_Per_Day_Project($projID, $dateRng)
{
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
	{
		$date = explode(" - ", $dateRng);
		
		$date1 = explode("/", $date[0]);
		$date2 = explode("/", $date[1]);
		
		
		
	}
	
	
	if(isset($date))

		$sql = 	"SELECT  `PTPK` ,  `Persons` ,  `Day` ,  `Month` ,  `Year` ,  `Half` 
		FROM  `currrent_projects` 
		WHERE `PTPK` = $projID and  `Day` BETWEEN  '$date1[0]' AND  '$date2[0]' and `Month` BETWEEN  '$date1[1]' AND  '$date2[1]'
		and `Year` BETWEEN  '$date1[2]' AND  '$date2[2]'";
	else
		$sql = "SELECT * FROM `currrent_projects` where   `PTPK` = $projID "; //chk allow  project name 
		
	$result = mysql_query($sql,$con) or die(mysql_error());
	$no_result = mysql_num_rows($result); // total rows 
	
	 echo "Name,Persons,Half,date";
            while($row = mysql_fetch_assoc($result))
            {
                echo "----//------";
				
                //echo $row['PK'];echo",";
				//$name = GetEmpName($row['EmployeeNamePK']);
				//echo $name;echo",";
				
				$Projname  = GetProjectName($row['PTPK']);
                echo $Projname;echo",";
               
                //$desName = GetDesignatin($row['HOD']);
                //echo $desName;echo",";
                echo $row['Persons'];echo",";
                //$desName = GetDesignatin($row['TeamLead']);
                //echo $desName;echo",";
                echo $row['Half'];echo",";
				echo $row['Day']."-";//echo",";
				echo $row['Month']."-";//echo",";
                echo $row['Year'];
               
            }    
	
		
}
function GetPerDay($id , $projID)
{
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	$sql = "SELECT * FROM `switch_person` where   `PTPK` = $projID and `EmployeeNamePK` = $id"; //chk allow  project name 
	//echo $sql; 
	$result = mysql_query($sql,$con) or die(mysql_error());
	$no_result = mysql_num_rows($result); // total rows 
	
	 echo "Name,ProjectName,Start,Half,date";
            while($row = mysql_fetch_assoc($result))
            {
                echo "----//------";
                //echo $row['PK'];echo",";
				$name = GetEmpName($row['EmployeeNamePK']);
				echo $name;echo",";
				
				$Projname  = GetProjectName($row['PTPK']);
                echo $Projname;echo",";
               
                //$desName = GetDesignatin($row['HOD']);
                //echo $desName;echo",";
                echo $row['SwitchTime'];echo",";
                //$desName = GetDesignatin($row['TeamLead']);
                //echo $desName;echo",";
                echo $row['Half'];echo",";
				echo $row['date']."-";//echo",";
				echo $row['Month']."-";//echo",";
                echo $row['Year'];
               
            }    
	
	
}

 function GetProjectName($id)
    {
        $con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
         
        $sql = "SELECT Name FROM `projects` WHERE `PK` =$id";
        //echo $sql;
        //return $sql;
        $DESresult = mysql_query($sql,$con) or die(mysql_error());
        return mysql_result($DESresult,0);
        
    }
function AllowProj($id , $projID)
{
	//$pk = $_COOKIE["userID"]; // can not use b/c hod is making change so hod pk not use
	
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	$sql = "SELECT `PK`,`ETPK`,`PTPK` FROM `emp_allow_projs` where   `ETPK` = $id and PTPK = $projID"; //chk allow  project name 
	//echo $sql; 
	$result = mysql_query($sql,$con) or die(mysql_error());
	$no_result = mysql_num_rows($result); // total rows 
	//echo "$no_result : "+$no_result +"\n";
	if ($no_result != 1) // mean  not allow before or denay/remove  before
	{
		 //allow  project name 
		mysql_query("INSERT INTO `emp_allow_projs` ( `ETPK`, `PTPK`) VALUES ( $id, $projID)",$con);
	}
	else
		echo "Already Assigned";
	
	
	 
}
function DenayProj($id , $projID)
{
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
	
	$sql = "delete from `emp_allow_projs` where  `ETPK` = $id and PTPK = $projID";
	//echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
	//mysql_query("delete from `emp_allow_projs`  where `ETPK` = $id and PTPK = $projID)",$con);
	
	
	
}
function changePassword($email, $pass, $newpass)
{	//Employee_Switch_Person.php?action=changePassword&vars=3&var1=smabn&var2=1234&var3=123

	$email = $str = strtolower($email);
	$newpass = $str = strtolower($newpass);
	
	  $con = mysql_connect("localhost","root","");
      $db=mysql_select_db("ttl_employee_switch", $con);
	  $pk = $_COOKIE["userID"];
	  
	  //echo $pk;
	  $sql ="SELECT `PK`,`loginID`, `password` FROM `employee` WHERE `PK` = $pk";
		 
		// echo $sql;
	 $result = mysql_query($sql,$con) or die(mysql_error());
	 $no_result = mysql_num_rows($result);
	 //echo ($no_result);
	 $id = $_COOKIE["userID"];
	   while($row = mysql_fetch_assoc($result))
            {
                //echo $row['loginID'];
				//echo $email ." ". $row['loginID'] ." ".  $pass ." ". $row['password'] ." ". $id ." ". $row['PK'];	//omer omer 123456 123456 33 33sucessful
				
				if($email == $row['loginID'] && $pass == $row['password'] && $id == $row['PK'] )
				{
					mysql_query("update `employee` SET `password` =  '$newpass' where  `employee`.`PK` ='$pk' ",$con);
					echo "sucessful";
				}
					
				else
					echo "operation fail";
				 
				
				
			}
	 
	 /* $row = mysql_fetch_assoc($result))
      echo $row['PK'];*/
				
	/* 	echo mysql_result($result,0,['PK']);
		echo mysql_result($result,0,1);
		echo mysql_result($result,0,2);
	 */
	  
}

function connection()
{
    $username = "root";
    $password = "";
    $hostname = "localhost"; 
    //connection to the database
    $con= mysql_connect($hostname, $username, $password)  or die("Unable to connect to MySQL");
    echo "Connected to MySQL";
    
    $db = mysql_select_db("ttl_employee_switch",$con) 
      or die("Could not select examples");
  
    
}
//----------------------------------------------------------------------------------------
function allAandFinishProjects()
{
	  $con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
    
     $sql = "SELECT `PK`,`Name` FROM `projects`"; // get all project name
	  $result = mysql_query($sql,$con) or die(mysql_error());
        
      $no_result = mysql_num_rows($result); 
	  echo "<select class='dmProjName'>";

        for ($i=0;$i<=$no_result-1;$i++)
            {
                echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
            //echo "<p>".mysql_result($result,$i,1)."</p>"; 
            }
        echo "</select>";

}
//--------------------------------allUnFinishProject-----------------------------------------
function allUnFinishProject()
{
    $con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
    
     $sql = "SELECT `PK`,`Name` FROM `projects` where  NOT `Status` = 3"; // get all project name 
        
        $result = mysql_query($sql,$con) or die(mysql_error());
        
        $no_result = mysql_num_rows($result);
        
        echo "<select class='UnFinishProjName'>";

        for ($i=0;$i<=$no_result-1;$i++)
            {
                echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
            //echo "<p>".mysql_result($result,$i,1)."</p>"; 
            }
        echo "</select>";
    
    
}
//------------------------------------------------------------------------------------------
//-----------------------Get Employee & project Name  ----------------------------------------
    function EmpProjNames($id)		// when or if email id already exist return 1
   {
	   
	   //http://localhost/Employee_Switch_Persons/Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1=2
	   
	   
      //echo "here is a function id = $id\n";
      	$con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
        //echo $title;
        
        if((int) $_COOKIE['userDesig'] == 3)	// 3 is modeler 
        $id = (int) $_COOKIE['userID'];		// et the current modeler  id 
		
			
		
		echo " id ". $id;
		echo " COOKIE['userDesig']: ". $_COOKIE['userDesig'];	
		
        $sql = "SELECT `PK`,`Employee_Name` , `Designation` FROM `employee` where `PK` = $id"; // get desiganation number if 3 mean modeler show only his name and conselt projects
        // echo  $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());
        
        $no_result = mysql_num_rows($result);	// total number of rows
		
		
        //echo "\ngettt ".mysql_result($result,0,1);
		//echo (gettype((int)((mysql_result($result,0,2)))));
		
		//echo ((((mysql_result($result,0,2)))));
		$desig =  (int)(mysql_result($result,0,2));
		echo "\n desig ".$desig;
		//echo gettype($desig);
		
		if( $desig == 3 )	// 3: medeler(designation) shows only his name  
		{
			//echo "medeler  here: ";
			echo "<select id='dmEmpName'>";
			echo "<option value=".mysql_result($result,0,0).">".mysql_result($result,0,1)."</option>";
		}
		else	// show all name 
		{
				
			//echo "not modeler: ";
		$sql = "SELECT `PK`,`Employee_Name` , `Designation` FROM `employee`"; // get all project name 
        // echo  $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());
        
        $no_result = mysql_num_rows($result);	// total number of rows
		
			 echo "<select id='dmEmpName'>";
			for ($i=0;$i<=$no_result-1;$i++)
				{
					echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
				//echo "<p>".mysql_result($result,$i,1)."</p>"; 
				}
		}
			
        echo "</select>";
        
        echo "----//------";
        
        //----------------- get `PK`,`Name` FROM projects table ---------------------
		
		if($desig != 3 ) // not a modeler
		{
			 $sql = "SELECT `PK`,`Name` FROM `projects` where `Status` = 1 or `Status` = 0"; // 1: Continue 0: free 
        
			$result = mysql_query($sql,$con) or die(mysql_error());
			
			$no_result = mysql_num_rows($result);
			
			echo "<select class='dmProjName'>";
	
			for ($i=0;$i<=$no_result-1;$i++)
				{
					echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
				//echo "<p>".mysql_result($result,$i,1)."</p>"; 
				}
			 echo "</select>";
		}
		else	// modeler projects
		{
			
			$sql = "SELECT projects.PK, projects.Name FROM projects INNER JOIN emp_allow_projs ON emp_allow_projs.ETPK = $id and emp_allow_projs.PTPK=projects.PK ";
			//echo $sql; 
			$result = mysql_query($sql,$con) or die(mysql_error());
			
			$no_result = mysql_num_rows($result);
			
			echo "<select class='dmProjName'>";
	
			for ($i=0;$i<=$no_result-1;$i++)
				{
					echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
				//echo "<p>".mysql_result($result,$i,1)."</p>"; 
				}
				echo "<option value=4>Free</option>";
			 echo "</select>";
			
			
		}
       
       
   }
   
   
   function SwitchEmp($nameID, $projID)
   {	//Employee_Switch_Person.php?action=SwitchEmp&vars=2&var1=1&var2=2
	   if($projID == 4)
	   if( $_COOKIE['userDesig'] == 3 )
	   {
		   echo "You are not allow to switch to free";
		   return false;
		}
	          
        $con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
        //echo "2 vars";
        //echo "nameID: ".$nameID." projID: ".$projID;
		ini_set('date.timezone', 'Asia/Karachi');
		//echo date('d/m/Y h:i: s A');
        
        if (date('a') == "pm")
            $half = 2;
        else
            $half = 1;
			
/*
	//----------------------------------------------------------------
	ini_set('date.timezone', 'Asia/Karachi');
	$id =(int) $_COOKIE['userID'];
	$curDate = date('Y-m-d');
	
	$originalDate = $stdate;
	$stdate = date("Y-m-d", strtotime($originalDate));
	
	$originalDate = $deadDate;
	$deadDate = date("Y-m-d", strtotime($originalDate));
	
	$time = date('H:i:s');
	$date = date;
	$sql = "INSERT INTO `ttl_employee_switch`.`projects` ( `Name`, `Time`, `Status`, `About`, `TeamLead`, `HOD`, `StartDate`, `DeadLIneDate`,  `Add Date`, `AddByPerson`) 
													VALUES ( '$projName', '$time', '2', '$about', '$tl', '$hod', '$stdate', '$deadDate', '$curDate', '$id')";
	
	
	
	
	//---------------------------------------------------------------------
	*/		
			
        $sql = "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`date`,`Month`,`Year`) VALUES ($projID,$nameID,".date('gis').",$half,".date('d').",".date('m').",".date('Y').")"; // get all project name 
       //echo $sql;
        mysql_query($sql,$con) or die(mysql_error());
       
        //----------------------- Udateing Emp current project On which he is doing work ---------------------
         $result = mysql_query("update `emp_curr_proj` SET `PTPK` =  '$projID' where  `emp_curr_proj`.`ETPK` ='$nameID' ",$con);        
        //if (mysql_affected_rows()==0) 
           // $result = mysql_query("insert into  `ttl_employee_switch`.`emp_curr_proj` (ETPK, PTPK) values ($nameID,$projID)",$con);
		   
		   
        
		$sql = "SELECT `PK` , `Name` FROM `projects` WHERE `Status`=1"; //get the running projects
		$resultStatusRun = mysql_query($sql) or die(mysql_error());
		
		if (!$resultStatusRun) {
			echo "Could not successfully run query ($sql) from DB: " . mysql_error();
			exit;
		}
		
		if (mysql_num_rows($resultStatusRun) == 0) {
			echo "No rows found, nothing to print so am exiting";
			exit;
		}
				
		 while($row = mysql_fetch_assoc($resultStatusRun))
		 {
			echo "-----".$row['PK']."------------";
			echo "-----".$row['Name']."------------";
			$projIDRunn = $row['PK'];
			$sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK=$projIDRunn and `Active` = 1";  // get the persons of each running projects
			$result = mysql_query($sql) or die(mysql_error());
			$total_rows = mysql_fetch_row($result);
			$total_person = $total_rows[0]; //total rows
			
			
			echo "total num :".$total_rows ;
				echo "-----------";
			
			 $sql = "SELECT `PK` FROM currrent_projects WHERE PTPK=$projIDRunn and  `Day` = ".date('d')." and  `Month` = ".date('m')." and `Year` = ".date('Y')." and `Half` = $half ";
			$result = mysql_query($sql) or die(mysql_error());
			$total_rows = mysql_num_rows($result);
			
			if($total_rows == 0)
			{
				echo "------new Recored-----";
				 $sql = "INSERT INTO `currrent_projects`( `PTPK`, `Persons`, `Day`, `Month`, `Year`, `Half`)  
				VALUES ($projIDRunn,".$total_person.",".date('d').",".date('m').",".date('Y').",$half)";
				//echo $sql;
				mysql_query($sql,$con) or die(mysql_error());
			}
			else //if($total_rows == 0) // if current half record already exist 
			{
				echo "---------half record already -------";
				
				while($row_itr = mysql_fetch_assoc($result))
				{
					echo $row_itr['PK'];
					$sql = "UPDATE `currrent_projects` SET `Persons` = '$total_person' WHERE `PK` =".$row_itr['PK'];
					mysql_query($sql,$con) or die(mysql_error());
				} 
			}
			
			
		}
		
		mysql_free_result($result);
		
		
		
		
		
		
		
		/*
        //-------------------------------------------------------------------------------------------
        // ---------- Calculate # of person in $projID project 
        
        //$sql = "SELECT `EmployeeNamePK` FROM `switch_person` WHERE `PTPK` = $projID and  `date` =".date('d')." and  `Month` = ".date('m')." and `Year` = ".date('Y')."";
       //$sql ="SELECT ETPK FROM emp_curr_proj WHERE PTPK =$projID";
	   
       $sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK=$projID";
        //echo $sql;
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_fetch_row($result);
        $total_person = $total_rows[0]; //total rows
        /*
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
        //echo "  before: ".$no_result;
    
        $result_array = array();
        while($row = mysql_fetch_assoc($result))
        {
            $result_array[] = $row['EmployeeNamePK'];
            //echo "\n".$result_array[Count($result_array)-1];
        }
        $result_array = array_unique($result_array);
        //echo "after: ".Count($result_array);
        */
        // ---------- Updating # of person in projID project in `current_project` table
		
         $sql = "SELECT `PK` FROM currrent_projects WHERE PTPK=$projID and  `Day` = ".date('d')." and  `Month` = ".date('m')." and `Year` = ".date('Y')." and `Half` = $half ";
        //echo $sql;
		/*
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_num_rows($result);
		
		while($row = mysql_fetch_assoc($result))
		*/
		
		
		
		/*
		$result = mysql_query($sql,$con) or die(mysql_error());
		$total_rows = mysql_num_rows($result); // total rows 
		
		 
		$row = mysql_fetch_assoc($result);
		
			//echo Count($row);
			//echo $row[0];
			//echo  $total_rows;
			echo $row['PK'];
			//$pk =  $row['PK'];
			if($total_rows > 0)
			{
				//echo "working";
				
				//echo "id: $id &&& active: ". $row['PK'] ;
				//echo $row['PTPK'];
				$pk =  $row['PK'];
				$sql = "UPDATE `currrent_projects` SET `Persons` = '$total_person' WHERE `PK` =$pk";
				$result = mysql_query($sql,$con) or die(mysql_error());
			}
			else
			{		// previous work
			
			
			
				 $sql = "INSERT INTO `currrent_projects`( `PTPK`, `Persons`, `Day`, `Month`, `Year`, `Half`)  
				VALUES ($projID,".$total_person.",".date('d').",".date('m').",".date('Y').",$half)";
				//echo $sql;
				$result = mysql_query($sql,$con) or die(mysql_error());
			}
			echo "------loop ------";
		
		
		*/
		
			
		
       
        
        echo "done";
        
   }
   function RunningProjectsStatus()
   {
	   echo "Name,Status,TeamLead,# members, Start Date,End Date,Total Days,Remaining Days,Actual working Days,On leave";
		projStatusDetail(1);
		
		
	   freeANDleaveDays();
	   

	}
	function numProjectPersons($projID , $active)
	{
		$con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
		
		$sql = "SELECT * FROM  `emp_curr_proj` WHERE  `PTPK` = $projID AND  `Active` =$active";
		
		$result = mysql_query($sql,$con) or die(mysql_error());
		$no_result = mysql_num_rows($result);
		return $no_result;
	}
	
   function freeANDleaveDays()
   {
	   
		echo "----//------";
		echo ", - , , , , , , , ,";
		echo "----//------";
		echo "Free,,,";
		echo numProjectPersons(4,1);	// 4 free preson projects 1 : active means avaiable 
		echo ",,,,,,";
		//echo "----//------";
		echo numProjectPersons(4,0);	// 4 free preson projects 1 : active means avaiable 
		
		
		
		
		
		
		
	}
	    function projStatus($projStatusID)
		{
			  echo "Name,Status,TeamLead,# members, Start Date,End Date,Total Days,Remaining Days,Actual working Days,On leave";
			  projStatusDetail($projStatusID);
		}
	
    function projStatusDetail($projStatusID)
	//function projStatus()
    {
		//$numArgs = func_num_args(); //return the number of argument 
		//echo "\n numArgs : $numArgs\n\n";	//numArgs : 1
		
		//echo  "values: ". func_get_arg(0).".=--- -";
		
        $con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
        
	//if($projStatusID == 1) // Continue status of pojects
	//{
            //$sql = "SELECT `Name`,`Status`,`HOD`,`TeamLead`,`StartDate`,`DeadLineDate` FROM `projects` WHERE `Status` = $projStatusID";
            //$sql = "SELECT projects.Name,project_status.Status,designation.Designation,TeamLead,StartDate,DeadLineDate FROM `projects`,`project_status` WHERE `project.Status` = $projStatusID";
           // echo "Name,Status,TeamLead,# members, Start Date,End Date,Total Days,Remaining Days,Actual working Days,On leave";
		   
		   // for ($i = 0; $i <$numArgs; $i++) 
			//{
				
			
			    $sql ="SELECT projects.PK,projects.Name,project_status.Status,projects.HOD,projects.TeamLead,projects.StartDate,projects.DeadLineDate FROM `projects`,`project_status` WHERE project_status.PK = $projStatusID and projects.Status = $projStatusID";
				//$pk = func_get_arg($i);
				//echo "\n\n------$pk------\n\n";
				//$sql ="SELECT projects.Name,project_status.Status,projects.HOD,projects.TeamLead,projects.StartDate,projects.DeadLineDate FROM `projects`,`project_status` WHERE project_status.PK = $pk and projects.Status = $pk";
				
				//echo $sql;
				$result = mysql_query($sql,$con) or die(mysql_error());
				$no_result = mysql_num_rows($result);
				//
			   
				while($row = mysql_fetch_assoc($result))
				{
					echo "----//------";
					echo $row['Name'];echo",";
					echo $row['Status'];echo",";
					//echo $row['HOD'];echo",";
					//$desName = GetDesignatin($row['HOD']);
					//echo $desName;echo",";
					//echo $row['TeamLead'];echo",";
					$desName = GetDesignatin($row['TeamLead']);
					echo $desName;echo",";
					echo  numProjectPersons($row['PK'],1);echo",";
					
					$d =  $row['StartDate'];
					$originalDate =  $d;
					$newDate = date("d-M-Y", strtotime($originalDate));
					echo $newDate ;
					echo",";
					
					 $d  = $row['DeadLineDate'];
					 $originalDate = $d;
					$newDate = date("d-M-Y", strtotime($originalDate));
					echo $newDate ;
					 echo",";
					
					// total days 
					$datetime1 = date_create( $row['StartDate']);
					$datetime2 = date_create( $row['DeadLineDate']);
					$interval = date_diff($datetime1, $datetime2);
					echo $interval->format('%R%a days');	//+0 days
					//echo substr( $interval->format('%R%a days'),1,-1);
					
					echo",";
					if( $interval->format('%R%a') > 0)
					//	Remaining days
					$today = date('Y-m-d');
					$datetime1 = date_create($today);
					$intervals = date_diff($datetime1, $datetime2);
					//if((int) trim( $interval->format('%R%a')) > 0)	// not working
						echo $intervals->format('%R%a days');	//+0 days
					//echo substr( $interval->format('%R%a days'),1,-1);
					
					echo",";
					
					//	Actual days
					$datetime2 = date_create( $row['StartDate']);
					$intervals = date_diff($datetime2, $datetime1);
					echo $intervals->format('%R%a days');	//+0 days
					//echo substr( $interval->format('%R%a days'),1,-1);
					
					
					echo",";
					echo "";
					
				   
				}  
			//}
	//}

        
        
    }
	
	
    
    function GetDesignatin($despk)
    {
        $con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
         
        $sql = "SELECT employee.Employee_Name FROM `employee` WHERE employee.PK =$despk";
        //echo $sql;
        //return $sql;
        $DESresult = mysql_query($sql,$con) or die(mysql_error());
        return mysql_result($DESresult,0);
        
    }


//----------------------------------------------------------------------------------------

//--------------------------- updateProjectInfo ie finish, start ec------------------------
function updateProjectInfo($projID, $projStatusID)
{
     $con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
    
    $sql = "UPDATE  `ttl_employee_switch`.`projects` SET  `Status` =  '$projStatusID' WHERE  `projects`.`PK` =$projID;";
     //echo $sql;
     mysql_query($sql,$con) or die(mysql_error());
     
     
     if($projStatusID == 3 or $projStatusID = 4 ) // 3 : Finish , 4 : Pause 
     {
        $sql ="SELECT ETPK FROM emp_curr_proj WHERE PTPK =$projID";
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
       
        while($row = mysql_fetch_assoc($result))
        {
          SwitchEmp($row['ETPK'], '4');   // 4 : Free 
        }   
     }
     
    
     //
   
     
     
    
}
//----------------------------------------------------------------------------------------
//-----------------------------GetProjName onchange user name----------------------------------
function GetProjName($nameID)
{
    $con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
    
    $sql = "select PTPK FROM emp_curr_proj WHERE ETPK = $nameID";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo mysql_result($result,0);
	
	/*
	// no yahw tu sirf current project ki value a rahi hai
//	if not a modeler then also find allow projects

	  	if((int) $_COOKIE['userDesig'] != 3)	// 3 is modeler 
		{
			 $id = (int) $nameID;		// et the current modeler  id 
		
			$sql = "SELECT projects.PK, projects.Name FROM projects INNER JOIN emp_allow_projs ON emp_allow_projs.ETPK = $id and emp_allow_projs.PTPK=projects.PK ";
			//echo $sql; 
			$result = mysql_query($sql,$con) or die(mysql_error());
			
			$no_result = mysql_num_rows($result);
			
			echo "<select class='dmProjName'>";
	
			for ($i=0;$i<=$no_result-1;$i++)
				{
					echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
				//echo "<p>".mysql_result($result,$i,1)."</p>"; 
				}
				echo "<option value=4>Free</option>";
			 echo "</select>";
		}
       
    */
}

//-------------------------------------------------------------------

//------------------------------ whiteboardfn() ---------------------------
function whiteboardfn()
{
      $con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
    
    $sql = "SELECT `PK`,`Name` FROM `projects` where `Status` = 1 or `Status` = 0"; // 1: Continue 
        
        $result = mysql_query($sql,$con) or die(mysql_error());
        
        $no_result = mysql_num_rows($result);
        
      

        for ($i=0;$i<=$no_result-1;$i++)
            {
                echo "<tr>";
                echo "<td>".mysql_result($result,$i,1)."</td>";
                //echo "<td>".mysql_result($result,$i,0)."</td>";
                //echo "<td>".collectEmpOnWorking(mysql_result($result,$i,0))."</td>";    // project number PK
            	collectEmpOnWorking(mysql_result($result,$i,0));
                //echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
            	//echo "<p>".mysql_result($result,$i,1)."</p>";
			
            echo "</tr>";
			
            }
			echo "<tr>";
			global $abscentEmp;
			 echo "<td>Not Avaiable</td>";
			 for ($i=0; $i<=Count($abscentEmp)-1; $i++)
			 {
				echo "<td>";
				echo '<a href="DetailEmp.php?id='.$abscentEmp[$i].'">';
			
			
					GetEmpName($abscentEmp[$i]);
				echo '<a>';
				echo "</td>";
			}
			echo "</tr>";
		
}
///$abscentEmp;
$abscentEmp = array();



	
function collectEmpOnWorking($projID)
{
      $con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
    
    $sql = "select `ETPK` , `Active` FROM emp_curr_proj WHERE PTPK = $projID "  ;
    $result = mysql_query($sql,$con) or die(mysql_error());
    
	
    while($row = mysql_fetch_assoc($result))
        {
            //echo ($row['ETPK']);
		 //echo gettype($row['ETPK']), "\n";
		if( ($row['Active']) == 1 )
		{
			echo "<td> ";
			//(int)($row['Active'])
			// echo gettype((int)($row['Active'])), "\n";
			//echo $row['Active'];
			$temp = $row['ETPK'];
			echo '<a href="DetailEmp.php?id='.$temp.'">';
			GetEmpName($row['ETPK']);
			echo '<a>';
			echo "</td>"; 
		}
			else
			{
				global $abscentEmp;
				$temp = $row['ETPK'] ;
				$abscentEmp[] = $temp;
			}
          
        }
    
    
}
function GetEmpName($despk)
    {
        $con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
         
        $sql = "SELECT employee.Employee_Name FROM `employee` WHERE employee.PK =$despk";
        //echo $sql;
        //return $sql;
        $DESresult = mysql_query($sql,$con) or die(mysql_error());
        
        echo mysql_result($DESresult,0);
        
        
    }
	


//-------------------------------------------------------------------------

//connection();
//EmpProjNames();
function testing()
{
	//----------------- Convert Oner --> omer -----------------------------
	$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);
         
        $sql = "SELECT `PK`,`loginID` FROM `employee`";
		$result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
       
        while($row = mysql_fetch_assoc($result))
        {
			$str = strtolower($row['loginID']);
         	$sql = "UPDATE  `employee` SET  `loginID` =  '$str' WHERE  `employee`.`PK` =". $row['PK'];
			$result1 = mysql_query($sql,$con) or die(mysql_error());
			
		  	echo "\n". $row['PK'] ." ".$row['loginID'] ." " . strtolower($row['loginID']) ;
        }  
		//-----------------  ----------------------------- 
		
	//$time = date('H:i:s');
	//echo $time


/*
$str= encrypt($input,$key,$iv,$bit_check);
echo $str;
//echo "Start: $input - Excrypted: $str - Decrypted: ".decrypt($str,$key,$iv,$bit_check);
echo decrypt($str,$key,$iv,$bit_check);

*/
	
	
	
	/*
	
$datetime1 = date_create('2009-10-11');
$datetime2 = date_create('2009-10-13');
$interval = date_diff($datetime1, $datetime2);
echo $interval->format('%R%a days');
ini_set('date.timezone', 'Asia/Karachi');
//echo date('d/m/Y h:i: s A');
echo date("a");
*/
}





function loginAll()
{
	 $con = mysql_connect("localhost","root","");
     $db=mysql_select_db("ttl_employee_switch", $con);
		
	$sql = "UPDATE `emp_curr_proj` SET  `Active` = '1' WHERE  `Active` =0";
	mysql_query($sql,$con) or die(mysql_error());
}
function logoutAll()
{
	 $con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
		
	$sql = "UPDATE `emp_curr_proj` SET  `Active` = '0' WHERE  `Active` =1";
	mysql_query($sql,$con) or die(mysql_error());
}
?>