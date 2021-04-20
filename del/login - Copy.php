
<?php

///http://snipplr.com/view/43435/
if (isset($_GET["action"]))
   {
	
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
        }
	  //$funcName($vars);	
          
          unset($_GET["action"]);
   }
   
   function login($ID, $pass)
   {
	   $con = mysql_connect("localhost","root","");
       $db=mysql_select_db("ttl_employee_switch", $con);
	
		 $sql ="SELECT `PK`,`Employee_Name`, `Designation` FROM `employee` WHERE loginID = '$ID' and password = '$pass'";
		 
		 //echo $sql;
		 $result = mysql_query($sql) or die(mysql_error());
		 
		 //while($row = mysql_fetch_assoc($result))
		 
		 //$total_rows = mysql_fetch_row($result);
		  $total_rows= mysql_fetch_assoc($result);
		 //echo ("total rows: "+Count($result));
		 //echo $total_rows['PK']; //total rows
		 //echo $total_rows['Employee_Name'];
		 
		
		 		 
		 if(Count($result) == 1)
		 {
			 session_start();
			 echo "successful";
			 
			 
			 setcookie("userID", $total_rows['PK'], time()+3600*48);
			 setcookie("userName", $total_rows['Employee_Name'], time()+3600*48);
			 setcookie("userDesig", $total_rows['Designation'], time()+3600*48);
			 
			 
			 
			/* session_start();
				// store session data
			$_SESSION['empKey']=$total_rows['PK'];
			$_SESSION['Name']=$total_rows['Employee_Name'];
			$_SESSION['Designation'] = $total_rows['Designation'];
			echo "\n Number: "+$_SESSION['empKey'];*/
			//echo "\nNamw: "+$_SESSION['Name'];
			
			$pk =$total_rows['PK'];
			//echo $pk;
			$sql ="UPDATE `emp_curr_proj` SET  `Active` =  '1' WHERE `emp_curr_proj`.`ETPK` = $pk";	// person avaiable
			//echo $sql;
			 $result = mysql_query($sql) or die(mysql_error());
			 
			 
			
			 $sql = "SELECT * FROM `permissionsinpage` where `ETPK` = $pk "; //chk allow  project name 
			//echo $sql;
			$result = mysql_query($sql,$con) or die(mysql_error());
			$no_result = mysql_num_rows($result); // total rows 
			
			// echo "ID,Name,Switch,Allow Projects,Verify Proj,WhiteBoard,Chk Emp Proj Days, Chk Proj Days,Permissions";
					while($row = mysql_fetch_assoc($result))
					{
						setcookie ("permission_switch",  $row['switch']);
						setcookie ("permission_AllowProjects",  $row['AllowProjects']);
						setcookie ("permission_VerifyAllowProjects",  $row['VerifyAllowProjects']);
						setcookie ("permission_WhiteBoard",  $row['WhiteBoard']);
						setcookie ("permission_ChkEmpProjDays",  $row['ChkEmpProjDays']);
						setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
						//setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
						setcookie ("permission_permissionPage",  $row['permissionPage']);
						
						/*echo " row['switch']: ". $row['switch'];
						echo "COOKIE['userID']: ".$_COOKIE['userID'];
						echo "COOKIE['permission_switch']: ".$_COOKIE['permission_switch'];*/
					}
		
			
			
			
		}
		
		
	
		
	}
	function beactive()
	{
		
	}
	
	function logout()
	{
		
		//echo "yers comieasda";
		 $con = mysql_connect("localhost","root","");
		 $db=mysql_select_db("ttl_employee_switch", $con);
		
	/*	if(	session_destroy())
		{*/
		
		
		//echo "id: ".$_COOKIE['userID']." type".gettype($_COOKIE['userID']);	//id: 1 typestring
		$pk =(int) $_COOKIE['userID'];
		$sql ="UPDATE  `emp_curr_proj` SET  `Active` =  '0' WHERE `emp_curr_proj`.`ETPK` = $pk";	// person not avaiable
		$result = mysql_query($sql) or die(mysql_error());
		
		//session_destroy();
		
		//}
		
		//setcookie( 'user');
		setcookie ("userID", "", time() - 3600 * 48);
		setcookie ("userName", "", time() - 3600 * 48);
		setcookie ("userDesig", "", time() - 3600 * 48);
		setcookie ("permission_switch", "", time() - 3600 * 48);
		setcookie ("permission_WhiteBoard", "", time() - 3600 * 48);
		setcookie ("permission_VerifyAllowProjects", "", time() - 3600 * 48);
		setcookie ("permission_ChkProjDays", "", time() - 3600 * 48);
		setcookie ("permission_ChkEmpProjDays", "", time() - 3600 * 48);
		setcookie ("permission_AllowProjects", "", time() - 3600 * 48);
		setcookie ("permission_permissionPage", "", time() - 3600 * 48);
		
		
		
		
		
		


		
	}
	

?>