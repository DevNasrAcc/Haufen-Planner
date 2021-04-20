<?php
//include 'login.php';
//include 'EncodeDecode.php';


#region variables
include 'connect.php';
global $con;
global $db;
#endregion variables

if (isset($_GET["action"]))
   {
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
			case '4':
                $var1 = $_GET["var1"];
                $var2 = $_GET["var2"];
				$var3 = $_GET["var3"];
				$var4 = $_GET["var4"];
                $funcName($var1,$var2,$var3,$var4);  
                //echo "here is 2 variable";
                break;
			case '6':
                $var1 = $_GET["var1"];
                $var2 = $_GET["var2"];
				$var3 = $_GET["var3"];
				$var4 = $_GET["var4"];
				$var3 = $_GET["var3"];
				$var4 = $_GET["var4"];
				$var5 = $_GET["var5"];
				$var6 = $_GET["var6"];
                $funcName($var1,$var2,$var3,$var4,$var5,$var6);  
                //echo "here is 2 variable";
                break;
            case '7':
                $var1 = $_GET["var1"];
                $var2 = $_GET["var2"];
                $var3 = $_GET["var3"];
                $var4 = $_GET["var4"];
                $var3 = $_GET["var3"];
                $var4 = $_GET["var4"];
                $var5 = $_GET["var5"];
                $var6 = $_GET["var6"];
                $var7 = $_GET["var7"];
                $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7);
                //echo "here is 2 variable";
                break;
		}
   }
   else
   echo "action not set";
   
// function getlist()
//{
//
//	global $con;
//	$sql = "select pk, name from projects";
//	//echo $sql;
//	//return false;
//	$result = mysql_query($sql,$con) or die(mysql_error());
//	//echo '<div class="ui-widget">';
//	//echo '  <select id="combobox"> <option value="">Select one...</option>';
//	while ($row = mysql_fetch_assoc($result)) {
//		
//		echo ':='.$row['pk'].':='.$row['name'];
//	
//	}
//
//}

function ProjectListContinueStartPause()
{
	global $con;	
	$sql = "Select * from projects where Status IN (1,2,4)" ;
	$result = mysql_query($sql,$con) or die(mysql_error());
	echo '<select name="id" class="dmProjName"><option value="0">Select Project</option>';
	while ($row = mysql_fetch_assoc($result)) {
		echo '<option value="'.$row['PK'].'">'.$row['Name'].'</option>';
	}
	echo '</select>';
}
function ProjectList()
{
    global $con;
    $sql = "Select * from projects where Status IN (1,2,4)" ;
    $result = mysql_query($sql,$con) or die(mysql_error());
    while ($row = mysql_fetch_assoc($result)) {
        echo '<option data-xyz='.$row['PK'].' value="'.$row['Name'].'"></option>';
    }
}
function addProject($projName)
{
	//($projName,$hod,$tl,$about,$stdate,$deadDate)
	global $con;	

	ini_set('date.timezone', 'Asia/Karachi');
	$id =(int) $_COOKIE['userID'];
	
	$curDate = date('Y-m-d');
	
	//$originalDate = $stdate;
//	$stdate = date("Y-m-d", strtotime($originalDate));
//	
//	$originalDate = $deadDate;
//	$deadDate = date("Y-m-d", strtotime($originalDate));
//	$time = date('H:i:s');

	
	//$sql = "INSERT INTO `ttl_employee_switch`.`projects` ( `Name`, `Time`, `Status`, `About`, `TeamLead`, `HOD`, `StartDate`, `DeadLIneDate`,  `Add Date`, `AddByPerson`) VALUES ( '$projName', '$time', '2', '$about', '$tl', '$hod', '$stdate', '$deadDate', '$curDate', '$id')";
	
	$sql = "
	INSERT INTO `ttl_employee_switch`.`projects` (`PK`, `Name`, `Day`, `Month`, `Year`, `Time`, `Status`, `StatusMode`, `ProjProgress`, `ProgressBy`, `ProgUpdateTime`, `ModeComments`, `CommentBy`, `CommentsUpdateTime`, `About`, `TeamLead`, `HOD`, `StartDate`, `DeadLIneDate`, `FinishDate`, `PauseDate`, `ResumeDate`, `Add Date`, `AddByPerson`) VALUES (NULL, '".$projName."', '0', '', '0', '00:00:00', '2', '1', '0', '33', '0000-00-00 00:00:00', '', '".$id."', '0000-00-00 00:00:00', '', '".$id."', '".$id."', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '0000-00-00', '".$curDate."', '".$id."');
	";
	//echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
	
}
function lastAddProject($projName)
{
	global $con;
	$sql = "select PK from projects where Name = '".$projName."'";
	//echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		echo $row['PK'];
	}
	
	
}

function InsertProjdata($projID,$client,$leader,$descrip,$CurrStatus,$PrevStatus,$IssuedBy)
{
    echo "<script>console.log('from server',$projID ,$client,$leader,$descrip,$CurrStatus,$PrevStatus,$IssuedBy)</script>";
		global $con;
	$sql ="INSERT INTO statusreport(`SR_Client`, `SR_ProjID`, `SR_Leader`, `SR_CurrStatus`, `SR_PreStatus`, `SR_Descrip`, `SR_IssueBy`)
            VALUES (".$client.",".$projID.",".$leader.",'".$CurrStatus."','".$PrevStatus."','".$descrip."',".$IssuedBy.")";
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}

function UpdateProjData($projID,$client,$leader,$descrip,$CurrStatus,$PrevStatus,$IssueBy)
{
    global $con;
    $sql = "UPDATE  `ttl_employee_switch`.`statusreport` SET  `SR_Client` =  '".$client."', `SR_Leader` =  '".$leader."', `SR_CurrStatus` =  '".$CurrStatus."', `SR_PreStatus` =  '".$PrevStatus."', `SR_Descrip` =  '".$descrip."', `SR_IssueBy` =  '".$IssueBy."' WHERE  `statusreport`.`SR_ProjID` = ".$projID." ; ";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
}

//function UpdateProjData($projID,$client,$leader,$descrip,$CurrStatus,$PrevStatus)
//{
//	global $con;
//	$sql = "UPDATE  `ttl_employee_switch`.`statusreport` SET  `SR_Client` =  '".$client."', `SR_Leader` =  '".$leader."', `SR_CurrStatus` =  '".$CurrStatus."', `SR_PreStatus` =  '".$PrevStatus."', `SR_Descrip` =  '".$descrip."' WHERE  `statusreport`.`SR_ProjID` = ".$projID." ; ";
//	//echo $sql;
//	$result = mysql_query($sql,$con) or die(mysql_error());
//}

function UpdateTableSingleVal($data)
{
	global $con;
	$dataArr = explode("<-->", $data);
	$sql = 'Update '.$dataArr[2].' Set '.$dataArr[2].' = '.$dataArr[0].' where '.$dataArr[1].' = '.$dataArr[0].'';
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}
function UpdateRowProjectData($data)
{
	global $con;
	$dataArr = explode("<-->", $data);
	$sql = "UPDATE statusreport 
   			SET ".$dataArr[1]." = ".$dataArr[0]." where SR_ProjID = ".$dataArr[2];
	echo $sql;
			
	$result = mysql_query($sql,$con) or die(mysql_error());
}


function getlist($TableName)
{
	global $con;
	$TableNameArr = explode("-", $TableName);
	$sql = "select ".$TableNameArr[1];
	if(count($TableNameArr) <= 3)
	$sql = $sql . ", ".$TableNameArr[2];
	$sql = $sql .  " from ". $TableNameArr[0];
	$result = mysql_query($sql,$con) or die(mysql_error());
	while ($row = mysql_fetch_assoc($result)) {
		
		echo ':='.$row[$TableNameArr[1]];
		if(count($TableNameArr) > 2)
			echo ':='.$row[$TableNameArr[2]];
		if(count($TableNameArr) > 3)
			{echo ':='.$row[$TableNameArr[3]];}
		//if(count($TableNameArr) > 4)
//			{echo ':='.$row[$TableNameArr[4]];}
//		if(count($TableNameArr) > 5)
//			{echo ':='.$row[$TableNameArr[5]];}
	}

}

function Addlist($TableName, $newString)
{
	global $con;
	$TableNameArr = explode("-", $TableName);
	 $newString = trim( $newString);
	$sql = "INSERT INTO `ttl_employee_switch`.`".$TableNameArr[0]."` (`".$TableNameArr[2]."`) VALUES ('$newString');";
	$result = mysql_query($sql,$con) or die(mysql_error());
}

function deleteRow($data)
{
	global $con;
	$dataArr = explode("<-->", $data);
	$sql = 'DELETE from '.$dataArr[2].' WHERE '.$dataArr[1].' IN '.$dataArr[0];
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}
	//	UPDATE sr_client t
//   SET src_name = CASE WHEN src_pk = 7 THEN '4444'
//                    WHEN src_pk= 4 THEN '7777'
//                    
//                    ELSE src_name 
//                END
// WHERE src_pk IN (4,7);
function UpdateRowDataConsisten($data)
{
	global $con;
	$dataArr = explode("<-->", $data);
	$sql = "UPDATE sr_dataconsist t
   			SET DC_".$dataArr[1]." = CASE ".$dataArr[0];
	//echo $sql;
			
	$result = mysql_query($sql,$con) or die(mysql_error());
}

function UpdateRowReCommdPrced($data)
{
	global $con;
	$dataArr = explode("<-->", $data);
	$sql = "UPDATE sr_recomprocd t
   			SET RP_".$dataArr[1]." = CASE ".$dataArr[0];
	echo $sql;
			
	$result = mysql_query($sql,$con) or die(mysql_error());
}
function UpdateRowMileStones($data)
{
	global $con;
	$dataArr = explode("<-->", $data);
	$sql = "UPDATE sr_milestones t
   			SET MS_".$dataArr[1]." = CASE ".$dataArr[0];
	echo $sql;
			
	$result = mysql_query($sql,$con) or die(mysql_error());
}


function NewRowDataConsisten($data)
{
	global $con;
	$data = rtrim($data, ",");
	$sql = "INSERT INTO sr_dataconsist(`DC_ProjID`, `DC_Phase`, `DC_ComSNO`, `DC_ProjIDPhaseSNO`, `DC_Comments`, `DC_Responsible`, `DC_Status`) VALUES ".$data;
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}
function NewRowReCommdPrced($data)
{
	//INSERT INTO sr_dataconsist(`DC_ProjID`, `DC_Phase`, `DC_ComSNO`, `DC_ProjIDPhase`, `DC_Comments`, `DC_Responsible`, `DC_Status`) VALUES (1,1,2,112,'2nd Comments',1,2), (1,1,3,113,'3nd Comments',1,2)
	global $con;
	$data = rtrim($data, ",");
	$sql = "INSERT INTO sr_recomprocd(`RP_ProjID`, `RP_Phase`, `RP_ComSNO`, `RP_ProjIDPhaseSNO`, `RP_Comments`, `RP_Date`, `RP_Responsible`, `RP_Status`) VALUES ".$data;
echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}

function WholeListOfMileStones($ProjID)
{
	global $con;
	$sql = "SELECT * FROM 
(
SELECT * FROM `sr_milestones_list`
) as msl
left join 
(
select * from sr_milestones where `MS_ProjID` =".$ProjID."
)as ms 
on msl.msl_pk = ms.MS_mslID";
//echo $sql;

	$result = mysql_query($sql,$con) or die(mysql_error());

	while ($row = mysql_fetch_assoc($result)) 
	{
		echo '<tr><td><input  type="checkbox" PID="'.$row['MS_ProjID'].'"  MSID="'.$row['msl_pk'].'" class = "milestonechk';
		if($row['MS_mslID'] == $row['msl_pk'])
			echo'" checked';
		else
			echo ' none"';
		echo ' />'.$row['msl_topic'].'</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
	}
	
}

function SaveChangesDelMilestones($values)
{
	global $con;
	$sql = "DELETE FROM sr_milestones WHERE MS_ProjIDMslID IN ".$values;
	$result = mysql_query($sql,$con) or die(mysql_error());
}
function SaveChangesInsMilestones($values)
{
	global $con;
	$sql = "INSERT INTO sr_milestones(`MS_ProjID`, `MS_mslID`, `MS_ProjIDMslID`, `MS_weightage`, `MS_Plan`, `MS_Actual`, `MS_ShotComments`, `MS_Status`) VALUES".$values;
	echo $sql;
	$result = mysql_query($sql,$con) or die(mysql_error());
}
function SetPhaseActive($Projid,$ActiveID)
{
	
	//return false;
	global $con;
		$sql=	"UPDATE sr_milestones t
   SET MS_Active = CASE WHEN MS_ProjID = $Projid THEN '0'
                    ELSE MS_Active 
                END
 WHERE MS_ProjID IN ($Projid);";
 $result = mysql_query($sql,$con) or die(mysql_error());
 
$sql = "UPDATE  `ttl_employee_switch`.`sr_milestones` SET  `MS_Active` =  '1' WHERE  `MS_ProjIDMslID` = $ActiveID;" ;


 $result = mysql_query($sql,$con) or die(mysql_error());
 
}

function test()
{
	echo str_replace("o","M","Hello world!");
}
?>


