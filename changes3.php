<?php


$con = mysql_connect("localhost","root","");
    $db=mysql_select_db("ttl_employee_switch", $con);


//login name convert into loawer case
/*         
        $sql = "SELECT `PK`,`loginID` FROM `employee`";
		$result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
       
        while($row = mysql_fetch_assoc($result))
        {
			$str = strtolower($row['loginID']);
         	$sql = "UPDATE  `employee` SET  `loginID` =  '$str' WHERE  `employee`.`PK` =". $row['PK'];
			$result1 = mysql_query($sql,$con) or die(mysql_error());
			
		  	echo "\n". $row['PK'] ." ".$row['loginID'] ." " . strtolower($row['loginID']);
		}
		//---------------------------------------------------------------------------
		
		
*/
/*
		//------------------------ Allow all modeler to white board---------------
		
		
			
		$sql = "SELECT `PK` FROM `employee` where `Designation` = '3'";
		$result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
       
        while($row = mysql_fetch_assoc($result))
        {
			$pk = $row['PK'];
			//echo $pk;
         	$sql = "UPDATE  `permissionsinpage` SET  `WhiteBoard` =  '1' WHERE  `permissionsinpage`.`ETPK` =$pk";
			$result1 = mysql_query($sql,$con) or die(mysql_error());
			
		  	
		}	
		
		
		
*/

//-------------------------------- Create Table LoginRecord----------------------------------------	
/*
$sql = "CREATE TABLE  IF NOT EXISTS `LoginRecord` (
                          `PK` int(11) AUTO_INCREMENT,
						  `userID` int(11),
                          `Date` Date,
                          `Time` Time,
                          `Half` tinyint (4),
                          `InOut` tinyint (4),
						  `IP` int(11) UNSIGNED,
						  `Op_UserID` int(11),
                          
                          PRIMARY KEY  (`PK`)
                          )  ";
						  
$result = mysql_query($sql,$con) or die(mysql_error());
*///-------------------------------------------------------------------
/*
$sql = "SELECT `PK` FROM `emp_curr_proj` where `Designation` = '3'";
		$result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
       
        while($row = mysql_fetch_assoc($result))
        {
			$pk = $row['PK'];
			//echo $pk;
         	$sql = "UPDATE  `permissionsinpage` SET  `WhiteBoard` =  '1' WHERE  `permissionsinpage`.`ETPK` =$pk";
			$result1 = mysql_query($sql,$con) or die(mysql_error());
			
		  	
		}	

?>
*/


/*
//-------------------------------- create new coloumn of combine that contain time and date ----------------------------------------	


//	2013-11-12 00:00:00 -> 2013-11-12 17:33:32
$sql = "SELECT `PK`, `Date`,`Time`,`Half` FROM `loginrecord";
$result = mysql_query($sql,$con) or die(mysql_error());

 while($row = mysql_fetch_assoc($result))
        {
			$dateOri = $row['Date'];
			if (strpos($dateOri,'00:00:00'))
			{
				$date = explode(" ", $dateOri);
				$pk = $row['PK'];
				
				if( $row['Half'] > 1)
				{
					$time =  $row['Time'];
					$hr  = explode(":", $time);
					$hr[0] = $hr[0]+12;
					
					$combine = $date[0]." ". $hr[0].":".$hr[1].":".$hr[2];
					$sql = "UPDATE  `loginrecord` SET  `Date` =  '$combine' WHERE  `PK` =$pk";
					$result1 = mysql_query($sql,$con) or die(mysql_error());
				}
				else
				{
					$combine = $date[0]." ".$row['Time'];
					$sql = "UPDATE  `loginrecord` SET  `Date` =  '$combine' WHERE  `PK` =$pk";
					$result1 = mysql_query($sql,$con) or die(mysql_error());
				}
				
				
				
				
					
			}
			
			
			
			
			
		  	
		}
*/



//-----------------Combine date month year coloumn  and paste in other coloumn ---------------------------------------

//2
//19
//10
//2013
//2013-10-19


$sql = "update `switch_person` set `SwitchDate` = concat(`Year`,`Month`, `date`)";

$result = mysql_query($sql,$con) or die(mysql_error());





		
//------------------------------------------------------------

//switch_person table


//
//date 1 --> 01
//$sql = "select `PK`,`date`,`Month` from switch_person where `date` Between 1 and 9 or `Month` Between 1 and 9";

//$sql = "select `PK`,`date`,`Month` from switch_person where `date` Between 1 and 9 or `Month` Between 1 and 9 ORDER BY PK desc";
//
//$result = mysql_query($sql,$con) or die(mysql_error());
//
// while($row = mysql_fetch_assoc($result))
//        {
//			$temp = $row['date'];
//			$tempMonth = $row['Month'];
//			$temp = sprintf("%02s", $temp);
//			$tempMonth= sprintf("%02s", $tempMonth);
//			echo  $row['PK'] ." ---- ".$temp."\n";
//			$pk = $row['PK'];
//			mysql_query("UPDATE  `switch_person` SET  `date` =  '$temp' , `Month` = '$tempMonth' WHERE  `PK` =$pk");
////			if (strpos($dateOri,'00:00:00'))
////			{
////				$date = explode(" ", $dateOri);
////				$pk = $row['PK'];
////				
////				if( $row['Half'] > 1)
////				{
////					$time =  $row['Time'];
////					$hr  = explode(":", $time);
////					$hr[0] = $hr[0]+12;
////					
////					$combine = $date[0]." ". $hr[0].":".$hr[1].":".$hr[2];
////					$sql = "UPDATE  `loginrecord` SET  `Date` =  '$combine' WHERE  `PK` =$pk";
////					$result1 = mysql_query($sql,$con) or die(mysql_error());
////				}
////				else
////				{
////					$combine = $date[0]." ".$row['Time'];
////					$sql = "UPDATE  `loginrecord` SET  `Date` =  '$combine' WHERE  `PK` =$pk";
////					$result1 = mysql_query($sql,$con) or die(mysql_error());
////				}
////					
////			}
//			
//		  	
//		}




//currrent_projects table
//
//$sql = "select `PK`,`day`,`Month` from currrent_projects where `day` Between 1 and 9 or `Month` Between 1 and 9";
//
////$sql = "select `PK`,`date`,`Month` from switch_person where `date` Between 1 and 9 or `Month` Between 1 and 9 ORDER BY PK Desc";
//
//$result = mysql_query($sql,$con) or die(mysql_error());
//
// while($row = mysql_fetch_assoc($result))
//        {
//			$temp = $row['day'];
//			$tempMonth = $row['Month'];
//			$temp = sprintf("%02s", $temp);
//			$tempMonth= sprintf("%02s", $tempMonth);
//			echo  $row['PK'] ." ---- ".$temp."\n";
//			$pk = $row['PK'];
//			mysql_query("UPDATE  `currrent_projects` SET  `day` =  '$temp' , `Month` = '$tempMonth' WHERE  `PK` =$pk");
////			if (strpos($dateOri,'00:00:00'))
////			{
////				$date = explode(" ", $dateOri);
////				$pk = $row['PK'];
////				
////				if( $row['Half'] > 1)
////				{
////					$time =  $row['Time'];
////					$hr  = explode(":", $time);
////					$hr[0] = $hr[0]+12;
////					
////					$combine = $date[0]." ". $hr[0].":".$hr[1].":".$hr[2];
////					$sql = "UPDATE  `loginrecord` SET  `Date` =  '$combine' WHERE  `PK` =$pk";
////					$result1 = mysql_query($sql,$con) or die(mysql_error());
////				}
////				else
////				{
////					$combine = $date[0]." ".$row['Time'];
////					$sql = "UPDATE  `loginrecord` SET  `Date` =  '$combine' WHERE  `PK` =$pk";
////					$result1 = mysql_query($sql,$con) or die(mysql_error());
////				}
////					
////			}
//			
//		  	
//		}
//







