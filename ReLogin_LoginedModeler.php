<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>
<script type="text/javascript" src="login.js"></script>

</head>

<body>

<?php


	include 'login.php';
	 
$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
$db=mysql_select_db("ttl_employee_switch", $con);
global $con;
global $db;

	//insert in switch table as absent with ptpk =0 
	$sql ="SELECT `ETPK`  FROM `emp_curr_proj`  where  NOT `PTPK` = 0 and `Active` = 1";
	$result_absent = mysql_query($sql,$con) or die(mysql_error());
	if(date('H') >= 22)	// hour		10 PM
			 $half = 4;
		elseif(date('H') >= 19)	// hour	7 PM
			 $half = 3;
		elseif(date('H') >= 14)	// hour	2 PM
            $half = 2;
		elseif(date('H') >= 7)	// hour	8 AM
            $half = 1;
        else
            $half = 5;
			
		 while($row = mysql_fetch_assoc($result_absent))
        {
            //$result_array[] = $row['EmployeeNamePK'];
            //echo "\n".$result_array[Count($result_array)-1];
			
			// pehle koi aa kar log off kar k tu nahew chala gaya mean agar asa huwa tu switch table mai aaj ka record exist hoga
			$sql = "select * from `switch_person` where   `EmployeeNamePK` =  ".$row['ETPK']." and `Half` = $half and `date` = ".date('d')." and `Month` =  ".date('m')." and `Year` = ".date('Y')."";
			echo $sql;
			 $result = mysql_query($sql,$con) or die(mysql_error());
			$total_rows = mysql_num_rows($result);
			
			if($total_rows == 0) //means is ne is half mai login nahew kiya ye is half mai absent not avaiable tha
			{					
				
				$sql = "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`date`,`Month`,`Year`) VALUES (0,".$row['ETPK'].",".date('gis').",$half,".date('d').",".date('m').",".date('Y').")"; // get all project name 
			   //echo $sql;
				mysql_query($sql,$con) or die(mysql_error());
					
			}
			
        }
		
//	ab jo login hain un ko again login karwado
	
	$sql ="SELECT `ETPK` , `PTPK` FROM `emp_curr_proj`  where `emp_curr_proj`.`Active` = 1";
	$result = mysql_query($sql,$con) or die(mysql_error());
	
	  while($row = mysql_fetch_assoc($result))
	  {
		  //echo ($row['ETPK']);
		   
		   
		   //SwitchEmp($row['ETPK'],0);
		  SwitchEmp($row['ETPK'], $row['PTPK']);
		   
		   
	}
	 calcCurrent_Projs();
	
	function SwitchEmp($nameID, $projID)
   {	//Employee_Switch_Person.php?action=SwitchEmp&vars=2&var1=1&var2=2
   	//global $con;
	  /* if($projID == 4)
	   if( $_COOKIE['userDesig'] == 3 )
	   {
		   echo "You are not allow to switch to free";
		   return false;
		}*/
	   
        
        $con = mysql_connect("localhost","root","");
        $db=mysql_select_db("ttl_employee_switch", $con);
        //echo "2 vars";
        //echo "nameID: ".$nameID." projID: ".$projID;
		ini_set('date.timezone', 'Asia/Karachi');
		//echo date('d/m/Y h:i: s A');
        
       if(date('H') >= 22)	// hour		10 PM
			 $half = 4;
		elseif(date('H') >= 19)	// hour	7 PM
			 $half = 3;
		elseif(date('H') >= 14)	// hour	2 PM
            $half = 2;
		elseif(date('H') >= 7)	// hour	8 AM
            $half = 1;
        else
            $half = 5;
		
		$sql = "select * from `switch_person` where   `EmployeeNamePK` = $nameID and `Half` = $half and `date` = ".date('d')." and `Month` =  ".date('m')." and `Year` = ".date('Y')."";
		//echo $sql;
		 $result = mysql_query($sql,$con) or die(mysql_error());
		$total_rows = mysql_num_rows($result);
		
		if($total_rows != 0) // change  previous switch that done by mistake bc
		{					//	1 half can contain 1 switching 
			
			 mysql_query("update `switch_person` SET `PTPK` =  '$projID' where  `PK` ='".mysql_result($result,0,0)."' ",$con);  
				
		}
		else
		{
			$sql = "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`date`,`Month`,`Year`) VALUES ($projID,$nameID,".date('gis').",$half,".date('d').",".date('m').",".date('Y').")"; // get all project name 
		   //echo $sql;
			mysql_query($sql,$con) or die(mysql_error());	
		}
		
        
       
        //----------------------- Udateing Emp current project On which he is doing work ---------------------
        // $result = mysql_query("update `emp_curr_proj` SET `PTPK` =  '$projID' where  `emp_curr_proj`.`ETPK` ='$nameID' ",$con);        
        //if (mysql_affected_rows()==0) 
           // $result = mysql_query("insert into  `ttl_employee_switch`.`emp_curr_proj` (ETPK, PTPK) values ($nameID,$projID)",$con);
		   
		   
      		//mysql_free_result($result);
	   
        //echo "done";
        
   }
	
	
	function calcCurrent_Projs()
	{
		global $con;
		if(date('H') >= 22)	// hour		10 PM
			 $half = 4;
		elseif(date('H') >= 19)	// hour	7 PM
			 $half = 3;
		elseif(date('H') >= 14)	// hour	2 PM
            $half = 2;
		elseif(date('H') >= 7)	// hour	8 AM
            $half = 1;
        else
            $half = 5;  
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
			$sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK=$projIDRunn and `Active` = 1 and `is_teamlead` = 0";  // get the persons of each running projects
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
				//echo "------new Recored-----";
				 $sql = "INSERT INTO `currrent_projects`( `PTPK`, `Persons`, `Day`, `Month`, `Year`, `Half`)  
				VALUES ($projIDRunn,".$total_person.",".date('d').",".date('m').",".date('Y').",$half)";
				//echo $sql;
				mysql_query($sql,$con) or die(mysql_error());
			}
			else //if($total_rows == 0) // if current half record already exist 
			{
				//echo "\n---------half record already -------";
				
				while($row_itr = mysql_fetch_assoc($result))
				{
					//echo $row_itr['PK'];
					$sql = "UPDATE `currrent_projects` SET `Persons` = '$total_person' WHERE `PK` =".$row_itr['PK'];
					mysql_query($sql,$con) or die(mysql_error());
				} 
			}
			
			
		}
		

	}//function calcCurrent_Projs()
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>


</body>
</html>
