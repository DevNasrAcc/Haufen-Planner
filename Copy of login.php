<?php
$localhost = "localhost";
$root = "root";
$rootpass = "";
$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
$db=mysql_select_db("ttl_employee_switch", $con);
global $con;
global $db;

include 'EncodeDecode.php';
include 'generateNumber.php';
///http://snipplr.com/view/43435/
include 'permissionArray.php';
include 'calculateHalf.php';
					
if (isset($_GET["action"]))
   {
	// echo "http://". $_SERVER['HTTP_HOST'] ; //http://192.9.210.126
	 //echo $_SERVER['REQUEST_URI']; ///Employee_Switch_Persons/login.php?action=login&vars=2&var1=sajjad&var2=1234

	 
	global $con;
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
        }
	  //$funcName($vars);	
          
          unset($_GET["action"]);
   }
   
  
   
   function login($ID, $pass, $overTime)
   {
	   $ID = strtolower($ID);
	  global $con;
	  /* $con = mysql_connect("localhost","root","");
       $db=mysql_select_db("ttl_employee_switch", $con);
	*/
		 $sql ="SELECT `PK`,`Employee_Name`, `Designation`, `Active` FROM `employee` WHERE loginID = '$ID' and password = '$pass'";
		 
		// echo $sql;
		 $result = mysql_query($sql) or die(mysql_error());
		 
		 $numrows = mysql_num_rows($result); // total rows 
		 //while($row = mysql_fetch_assoc($result))
		 
		 //$total_rows = mysql_fetch_row($result);
		  $total_rows= mysql_fetch_assoc($result);
		 
		
		// echo "total rows: ".count($total_rows);
		// echo "count(result)".count($result);
		
		 if(count($total_rows) == 1 ) /// no data found
		 {
			 echo "Invalid UserName or Password";
		 	InsertLogInOutTime(0,1,"Unknown Login ".$ID); // 0 mean has no info found at the time login
		}
		else					// count($total_rows) ==4
		{
			//echo "going login setting<br>";
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
		 
		// echo $sql;
		 $result = mysql_query($sql) or die(mysql_error());
		 
		  $numrows = mysql_num_rows($result); // total rows 
		 //while($row = mysql_fetch_assoc($result))
		 
		 //$total_rows = mysql_fetch_row($result);
		  $total_rows= mysql_fetch_assoc($result);
		  
		  loginSetting($result,$total_rows,"Script Login");
	}
	

	
	function loginSetting($result,$total_rows, $abtLogin)
	{
		
		 $pk =$total_rows['PK'];
		 if($total_rows['Designation'] == '3')
		 {
		 	//$ipChk = $_SERVER['HTTP_HOST'];
		 	//echo "modeler------";
			
			//if(($_SERVER['HTTP_HOST'] == '192.9.210.13'))
			if(($_SERVER['HTTP_HOST'] == '192.9.210.13')||($_SERVER['HTTP_HOST'] == 'localhost') )	// only allow for moiodeller  
			//if(((ip2long($ipChk) >= -1073098239)&&(ip2long($ipChk) < -1062677761)) ||  ($_SERVER['HTTP_HOST'] == 'localhost'))	//127.0.0.1  2130706433	// live ip allow to all but ip restricted 	192.9.210.1 - 192.9.210.255
			//if(($_SERVER['HTTP_HOST'] == '192.9.210.13') )	// only allow for moiodeller
			{
				
				
			}
			else
			{
				//echo "not allow direct link";
				InsertLogInOutTime($pk,2,"Wrong Domain Use by desig : 3");		// login by illegle
				return false;	// not allow direct link
				
				
				
			}
				
		}
		
		 //echo "pk: ".$pk;
		 if($pk == '0')
		 	return false;
		else 
		 InsertLogInOutTime($pk,1,$abtLogin); // this information must be create when try to be login
		 	
		 
		 if($total_rows['Active'] == '1') // mean employee is still a member of company not fired
		 {
			 //echo "NonActive------<br>";
			 
			  if(Count($result) == 1 )
			 {
				 session_start();
				 echo "successful";
				 
				 setcookie("userID", $total_rows['PK']);	
				 setcookie("userName", $total_rows['Employee_Name']);
				 setcookie("userDesig", $total_rows['Designation']);
				 
				 $sql = "SELECT * FROM `permissionsinpage` where `ETPK` = $pk "; //chk allow  project name 
				//echo $sql;
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
							//setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
							setcookie ("permission_permissionPage",  $row['permissionPage']);
							setcookie ("permission_memberNames",  $row['MemberNames']);
							setcookie ("permission_switch",  $row['switch'] );
							setcookie ("permission_MainMenuTop",  $row['MainMenuTop'] );
							setcookie ("permission_WhiteBoard_EmpDetail",  $row['WhiteBoard_EmpDetail'] );
							setcookie ("permission_Entry_WhiteBoard",  $row['Entry_WhiteBoard'] );
							setcookie ("permission_Proj_StatusEdit",  $row['Proj_StatusEdit'] );
							
							
							
							
							
							if((isset($_GET["var3"])) && $_GET["var3"] == "Others")
							{
								//echo "<br>others";
								setcookie ("half",(  "others"+calculateHalf())  );
								if ( $row['Entry_WhiteBoard']  == 1)
									emp_curr_projActive1($pk);
							}
							else
							{
								//echo "<br>Propers";
								setcookie ("half",   calculateHalf());
								if((int)$row['Entry_WhiteBoard'] == 1)
								switchLogINtime($pk);	
							}
							
						}
				
			} // if($total_rows['Active'] == '1') // mean employee is still a member of company not fired
			
			// 	-----------------------------
			
	
		} 
		else
		{
			InsertLogInOutTime($pk,2,"Fire  person login :".$abtLogin);		// login by illegle
				return false;	// not allow direct link
		}
	}
	
	function emp_curr_projActive1($pk)
	{
		$sql = "UPDATE `emp_curr_proj` SET  `Active` = 1 WHERE  `ETPK` =$pk";
			//echo "\n".$sql;
				mysql_query($sql) or die(mysql_error());
	}

	function  switchLogINtime($pk)
	{
		//echo "function  switchLogINtime	";
		global $con;
	//	echo "switchLogINtime function";
		
		$sql = "SELECT `PTPK`, `Active` FROM emp_curr_proj WHERE `ETPK` = $pk"; 
		$result = mysql_query($sql) or die(mysql_error());
		$total_rows = mysql_fetch_row($result);
		$proj_no = $total_rows[0]; //total rows // 0
		//echo "\nproj_no: $proj_no----\n";	//proj_no: 0
		
		//echo  $total_rows[1]; 	// 1
		//echo  "\n----".$total_rows[1]; 	// 0 if logoff before 
		if($total_rows[1] == '0' ||  $_GET["vars"] == 0 )	// 0 logoff hai pehley se abhi login kiya hai  // active = 0  --- $_GET["vars"] == 0 mean query come from script auto logions
		{
		
			//echo "<br>emp_curr_proj Active = 0";
			$half = calculateHalf();
			
			
				
				// check that k pehle se notavailable / absent ki entry hai tu us ko change kar do 
				// agar nahew tu ye current date ka firs login hai.
				
				$sql = "select * from `switch_person` where `SwitchDate` =  CURDATE() and `Half` = $half LIMIT 0 , 1 ";
				//echo $sql;
				 $result = mysql_query($sql,$con) or die(mysql_error());
				$total_rows = mysql_num_rows($result);
				//echo "total_rows: ".$total_rows;
				if($total_rows != 0) // change  previous switch that done by mistake bc
				{					//	1 half can contain 1 switching 
					
					
					//echo "<br>	i am not first <br>";
				//	echo "update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis')." where  `SwitchDate` =  CURDATE() and   `EmployeeNamePK` = $pk and `Half` = $half <br>";
					
					 // mysql_query("update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis')." where  `PK` ='".mysql_result($result,0,0)."' ",$con);  mysql_query("update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis')." where  `PK` ='".mysql_result($result,0,0)."' ",$con);  
					
					sleep(2);
					 mysql_query("update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis')." where `SwitchDate` =  CURDATE() and   `EmployeeNamePK` = $pk and `Half` = $half ",$con);  
					
				
				}
				else
				{
				
					
					// insert all modeller record as a Not available / absent 
					//echo "	insert all	";
					$sql = "SELECT `ETPK` FROM emp_curr_proj WHERE `PTPK` <> '0'"; 
					$resultTemp = mysql_query($sql,$con) or die(mysql_error());
					while($emp = mysql_fetch_assoc($resultTemp))
					{
					//echo "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`SwitchDate`) VALUES ('0',".$emp['ETPK'].",'00:00:00',$half, CURDATE())";
						mysql_query("INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`SwitchDate`) VALUES ('0',".$emp['ETPK'].",'00:00:00',$half, CURDATE())",$con);
					}
					
					// now update the current user only
					
				$sql = "select * from `switch_person` where `SwitchDate` =  CURDATE() and   `EmployeeNamePK` = $pk and `Half` = $half ";
				//echo $sql;
				$result = mysql_query($sql,$con) or die(mysql_error());
				$total_rows = mysql_num_rows($result);
				
				while($emp = mysql_fetch_assoc($result))
				{
					//echo "========now update the curr user==========";
					//echo "\n\n\n--------------===============update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis')." where  `PK` ='".$emp['PK']."' ";
						 mysql_query("update `switch_person` SET `PTPK` =  '$proj_no' , `SwitchTime` = ".date('gis')." where  `PK` ='".$emp['PK']."' ",$con);  
				}
					
					
				
				}
				
				
			emp_curr_projActive1($pk);
			
			
			
			
			// now 	 calculate the total member on this projects
			$sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK=$proj_no and `Active` = 1 and `is_teamlead` = 0" ;  // get the persons of each running projects
			$result = mysql_query($sql) or die(mysql_error());
			$total_rows = mysql_fetch_row($result);
			$total_person = $total_rows[0]; //total rows
			
			//$sql = "SELECT `PK` FROM currrent_projects WHERE PTPK=$proj_no and  `Day` = ".date('d')." and  `Month` = ".date('m')." and `Year` = ".date('Y')." and `Half` = $half and `date` =  CURDATE()";
			$sql = "SELECT `PK` FROM currrent_projects WHERE  `date` =  CURDATE() and  PTPK=$proj_no and `Half` = $half";
			$result = mysql_query($sql) or die(mysql_error());
			$total_rows = mysql_num_rows($result);
			
			if($total_rows == 0)
			{
				//echo "------new Recored-----";
				 $sql = "INSERT INTO `currrent_projects`( `PTPK`, `Persons`, `Half`, `date`)  
				VALUES ($proj_no,".$total_person.",$half, CURDATE())";
				//echo $sql;
				mysql_query($sql,$con) or die(mysql_error());
			}
			else //if($total_rows == 0) // if current half record already exist 
			{
				//echo "---------half record already -------";
				
				while($row_itr = mysql_fetch_assoc($result))
				{
					//echo "row_itr = ";
					//echo $row_itr['PK'];
					$sql = "UPDATE `currrent_projects` SET `Persons` = '$total_person' WHERE `PK` =".$row_itr['PK'];
					mysql_query($sql,$con) or die(mysql_error());
				} 
			}
			
			
	//		$userID =(int) $_COOKIE['userID'];	 //  who login the user  always ame as $pk
		
		}
		else
		{
			//$sql = "UPDATE `emp_curr_proj` SET  `Active` = 1 WHERE  `ETPK` =$pk";
//			//echo "\n".$sql;
//				mysql_query($sql) or die(mysql_error());
		}
		
		
	}
	
	
	
	function InsertLogInOutTime($pk, $InOut ,$abt )	//$InOut : 1 = Login ,	0 = Logout , 	2 = try to login illigle way
	{
		
       $half = calculateHalf();
			
		
		$ip = $_SERVER['REMOTE_ADDR'];
		//$ip = gethostbyname(trim(`hostname`));
		
		if(isset($_COOKIE['userID']))
			$logoff_by = $_COOKIE['userID'];
		else
			$logoff_by = $pk;
			
		//$abt = "";
		$sql ="INSERT INTO `loginrecord` (
				`PK` ,`userID` ,`Date` ,`Time` ,`Half` ,`InOut` ,`IP` ,`Op_UserID`,`About`)
				VALUES (NULL ,  '$pk',  '".date('Y-m-d')."', '".date('gis')."',  '$half',  '".$InOut."',  INET_ATON('$ip'),  '$logoff_by' , '".$abt."')";	
				//echo $sql;
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

		//echo "id: ".$_COOKIE['userID']." type".gettype($_COOKIE['userID']);	//id: 1 typestring
		
		if(isset( $_COOKIE['userID']))
		{
			$pk =(int) $_COOKIE['userID'];

		
		if((int) $_COOKIE['permission_Entry_WhiteBoard'] == 1)
			switchLogoutTime($pk); //we need $_COOKIE['userID'] in fn
		
		
		//global $array;
//			
//						for ($i=0; $i<Count($array); $i++)
//						{
//							
//							$input = $array[$i];
//							
//							setcookie ($input, "", time() - 3600 * 48);
//							$i++;
//						}
				

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
		
		
		}
		
		
		
		// ------------- switch to freee this user -----------------------
		
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
		/*
		//global $con;
		ini_set('date.timezone', 'Asia/Karachi');
		echo date('d/m/Y h:i: s A');
        
        //if (date('a') == "pm")
		if(date('H') > 12)	// hour
           $half = 2;
        else
            $half = 1;
			
		$sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK=4 and `ETPK` = $pk";  //for checking Only 1 record of each person
		echo $sql;
		$result = mysql_query($sql) or die(mysql_error());
		$total_rows = mysql_fetch_row($result);
		$total_person = $total_rows[0]; //total rows // 0
	
		//echo "total_person: ".$total_person;
		
		//echo "total_person: $total_person";	//total_person: 0
		
		
		//		Dont be shift at free project unless is is being freee because white board k previous record mai 1 name 2 dafa aa raha hai
		//		us waq tak free mai shift mat karo jabtak wo free na  ho agar free hai tu switch karo
		if($total_person == 0) 
		{
			//echo "not freee state";
		 $sql = "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`date`,`Month`,`Year`) VALUES (4,$pk,".date('gis').",$half,".date('d').",".date('m').",".date('Y').")"; // get all project name 
		   //echo $sql;
			mysql_query($sql) or die(mysql_error());
		}
		
		*/
			$sql = "UPDATE `emp_curr_proj` SET  `Active` = 0 WHERE  `ETPK` =$pk";
			//echo "\n".$sql;
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
			
		    //sql = "select  `PK` FROM employee  WHERE Designation = 3 "  ;
			$sql = "SELECT `ETPK`  FROM `emp_curr_proj`  where  `Active` = 1";
			$result = mysql_query($sql,$con) or die(mysql_error());
			
			
			while($row = mysql_fetch_assoc($result))
			{
				
				$pk = $row['ETPK'];
				//echo "\npk: $pk";
				switchLogoutTime($pk);
					
				  
			}
			
			
		
	}



	

?>