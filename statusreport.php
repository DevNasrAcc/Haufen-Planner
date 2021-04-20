<?php
 session_start();
if(!isset( $_COOKIE['userID']))
Header("Location: loginPage.php");

#region variables
include 'connect.php';
global $con;
global $db;
#endregion variables
if(isset($_GET['id']) && $_GET['id'] !='' )
{
$sql =
"


select  * from 
(
select pk,  name from projects where pk = ".$_GET['id']."
)
as proj

left join
(
select *   from  statusreport where SR_ProjID  = ".$_GET['id']."
)as sr
on  proj.pk= sr.SR_ProjID

left join
(
select * from sr_client
)
as client
on client.src_pk = sr.SR_Client

left join
(
select * from sr_projleader
)
as leader
on leader.srpl_pk= sr.SR_Leader

left join
(
select srpl_pk as IssueRefPK , srpl_name as IssueRefName  from sr_projleader
)
as issueby
on issueby.IssueRefPK = sr.SR_IssueBy

left join 
(
select PK as EPK , Employee_Name  from employee where Cost_Department = 6
)
as emp
on emp.EPK = sr.SR_Descrip";

$result = mysql_query($sql,$con) or die(mysql_error());

$num_rows=mysql_num_rows($result);    
$row = mysql_fetch_array($result);    
$columns = mysql_num_fields($result);  
$MaintotalRow = mysql_num_rows($result);  
$fields =array();    
for($i = 0; $i < $columns; $i++) {     
    $field = mysql_field_name($result,$i);
    $fields[$field] = $row[$field];
	}  

//print_r($fields);
//echo $fields['srpl_name'] ;
}
else
echo $_GET['id'];



////////////////////////////////////////////////////////////
//////////////////	Query for MilesStones
////////////////////////////////////////////////////////////



$sql ="SELECT * FROM 
(
SELECT * FROM `sr_milestones` where `MS_ProjID` =".$_GET['id']."
)as ms
left join sr_milestones_list
on sr_milestones_list.msl_pk = ms.MS_mslID
ORDER BY  `ms`.`MS_mslID` ASC";
$resultMileStone = mysql_query($sql,$con) or die(mysql_error());
$totalRow = mysql_num_rows($resultMileStone);


?>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Status Report</title>
<link type="text/css" rel="stylesheet" href="css/reportcss.css"/>
<link type="text/css" rel="stylesheet" href="bootstrap3.3.4/custom.css"/>
 <script type="text/javascript" src="jquery-1.9.1.js"></script>
<!-- <script type="text/javascript" src="bootstrap3.3.4/jqueryBpopu.js"></script> not use-->
    <script src="js/jquery-ui.js"></script>
    <link rel="stylesheet" href="css/jquery-ui.css">
  <script type="text/javascript" src="statusreport.js"></script>
  <script type="text/javascript" src="js/validation.js"></script>
  <script type="text/javascript" src="savePageAlert.js"></script>
<style>

body
{
	width:100%; 
}
#container
{
	margin:0 auto;
	width:1024px;
}
table {
	 	
		width:100%;
		
	
	 }
table, th, td {
   /*border: 1px solid black;*/
}

.BorderNones
{
	border:none;
	 border: 1px solid White;
}
form
{
	margin: 0px;
}
/*@font-face {
   font-family: 'DB Office'; 
  src: url(dboff03.ttf);
}
body
{
	 font-family:'DB Office'; 
}*/
li
{
	margin-left: 5px;
}
th
{
	
}
.DC_Status
{
	
}
.fd0002
{
	background-color:#fd0002; /*Red*/
}
.ffcc00
{
	background-color:#ffcc00  /*ORange*/
}
.ffffff
{
	background-image:url(img/TickStatusBig.jpg) ;
	 background-size: contain;
     background-repeat: no-repeat;
	 background-position: center; 
	
	 
	
	/*background-size: cover;*/
	/*background-color:#ffffff  /*White*/
	
}
.tdClick
{
	
	width:30px;
}
.RP_Status
{
	background-image:url(img/TickStatus.jpg) ;
	 background-size: contain;
	max-width:100%; 
	max-height:100%;
	margin:auto;
} 
/*.fa23e*/
.Green
{
	background-color:#33cc33 /*Green*/
}
.Red /*Using iun weightage*/
{
	background-color:#F00;
}


/* Start by setting display:none to make this hidden.
Then we position it in relation to the viewport window
with position:fixed. Width, height, top and left speak
speak for themselves. Background we set to 80% white with
our animation centered, and no-repeating */
.modal {
    display:    none;
    position:   fixed;
    z-index:    1000;
    top:        0;
    left:       0;
    height:     100%;
    width:      100%;
    background: rgba( 255, 255, 255, .8 )
    url('img/FhHRx.gif')
    /*url('http://i.stack.imgur.com/FhHRx.gif')*/
    50% 50%
    no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
    overflow: hidden;
}

/* Anytime the body has the loading class, our
   modal element will be visible */
body.loading .modal {
    display: block;
}
    #Menuinfo {
        width: 20%;
        float: left;
        border: none;
        margin: 0px;
        margin-bottom: 15px;
    }
    #Menuinfo tbody tr td a {
        text-decoration: none;
        padding-top: 15px;
        padding-bottom: 15px;
        line-height: 20px;

    }
    #Menuinfo > tbody > tr> td> a{
        /*position: relative;*/
        display: block;
        padding-left: 10px;
    }
    a{
        color: #337ab7;
    }
.brand{
    float: left;
    height: 50px;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 20px;
}

</style>
<!--    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css" type="text/css"  />-->
</head>

<body>
<datalist id="productName">
</datalist>
<datalist id="projectNames1">
</datalist>
<datalist id="colorslist">
<option>#ffffff</option>
<option>#33cc33</option>
<option>#ffcc00</option>
<option>#fd0002</option>
</datalist>

<div id="container">
<!--    --><?php
//    if (isset($_COOKIE["userID"]))
//        if($_COOKIE['permission_MainMenuTop'] == 1)
//            include 'menu.php';
//    ?>
    <table id="Menuinfo" class="NonPDF" width="300px" style="width: 20%; float: left; border:none">
        <tbody>
        <tr>
            <td calss="brand">
                PMS
            </td>
            <td>
                <a href="ModelerPage.php" rel="next" media="not print"> Main </a>
            </td>
            <td>
                <a href="projectstatus.php" rel="next" media="not print">Project Status </a>
            </td>

        </tr>
            </tbody>
    </table>
<table class="NonPDF" border="1" >
<tr>
<td width="50%">
<div>
<form  action="statusreport.php" method="Get">
<div  name id="ProjectMenu" style="float:left;" class="ProjectName"></div>
    <div id="showdetail"><button  type="submit" id="showProjDetail">Show Project Detail</button></div>
</form>
</div>
</td>
<td>
<!--<form class="NonPDF" action="statusreport.php" method="Get">-->
<div id="showdetail" style="float: right">
<!--    <label before="34" val="34" class="Ownchangeable" id="sr_client-src_pk-src_name" contenteditable="true" style="display: inline;">systems123</label>-->
<!--	<input name="projName" placeholder="New Project Name" id="showProjectList" list="productName" type="text" id="NewprojName" width="250px">-->
	<input name="projName" placeholder="New Project Name" list="projectNames1" id="NewprojName" type="text"  width="250px">
    <input type="button" name="button" id="addproject" value="Add New Project">
</div>
<!--</form>-->
</td>
</tr>
</table>

<table class="BorderNone"  border="0" >
<tr>
<td class="BorderNone"  width="50%">
<img src="img/MobilityNetworks.png" />
</td>
<td class="BorderNone"  align="right">
<h2>Statusreport</h2>
</td>
</tr>
</table>

<table border="1" id="ProjectData">
  <tr>
    <td  contenteditable="true" width="667" bgcolor="#D9D9D9"><strong>Date: <?php echo date("Y-m-d");?></strong></td>
  </tr>
</table>

<table border="1">
  <tr>
    <td colspan="4" bgcolor="#D9D9D9"><strong>Project data</strong></td>
  </tr>
  <tr>
    <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
    <td width="169" align="right"><strong>Client:</strong></td>
    <td width="461"> 	<!--Client-->
      <?php
	  	if (($fields['SR_Client']  == 0))
		{
			$ClientName = "Not Defined";
			$clientid = "0";//NotSet Include in DB
		}
		else
		{
			$ClientName = $fields['src_name'];
			$clientid = $fields['SR_Client'];;
		}
		echo '<div id="Client"><label before="'.$clientid.'" val="'.$clientid.'" class="Ownchangeable" id="sr_client-src_pk-src_name" contenteditable="true" >'.$ClientName.'</label></div>';
	?>
    </td>
    <td width="199" ><strong>Currentstatus:</strong></td>
    <td width="69" id="Currentstatus" before="<?php echo $fields['SR_CurrStatus']?>" class="tdColor <?php echo $fields['SR_CurrStatus']?>"><input type="color" id="ColorSet" list="colorslist" style="display:none; width:100%"></td>
  </tr>
  <tr>
    <td align="right"><strong>Project:</strong></td>
     <td>
    
      <?php
		echo '<div id="proj"><label id="projects-PK-Name" val="'.$fields['pk'].'" >'.$fields['name'].'</label></div>'; // id is using for data consistensi
		?>
     </td>
    
    <td><strong>Previousstatus:</strong></td>
    <td  id="Previousstatus" before="<?php echo $fields['SR_PreStatus']?>" class="tdColor <?php echo $fields['SR_PreStatus']?>"><input type="color" id="ColorSet" value="#fe0000" list="colorslist" style="display:none; width:100%"></td>
  </tr>
  <tr>
    <td align="right"><strong>Projectleader:</strong></td>
    <td colspan="3">		<!--Projectleader-->

    <?php
		if (($fields['SR_Leader']  == 0))
		{
			$LeaderName = "Not Defined";
			$Leaderid = "0";//NotSet Include in DB
		}
		else
		{
			$LeaderName = $fields['srpl_name'];
			$Leaderid = $fields['srpl_pk'];;
		}
		echo '<div id="Leader"><label before="'.$Leaderid.'" val="'.$Leaderid.'" class="Ownchangeable Leader" id="sr_projleader-srpl_pk-srpl_name" contenteditable="true" >'.$LeaderName.'</label></div>';
		?>
    </td>
    </tr>
  <tr>
    <td align="right"><strong>Projectphase:</strong></td>
    <td id="tdProjPhase"><!-- Projectphase-->
    <label id="ProjPhase" val="" class="OwnchangeableMileStone" contenteditable="true" style="display: inline;">Milestones not set</label>
    </td>
    <td><strong>Degree of completion [%]:</strong></td>
    <td> <?php
		echo '<label id="DOC" >'.$fields['SR_DegreeOfComplete'].'</label>'; // id is using for data consistensi
		?></label></td>
  </tr>
  <tr>
    <td height="75" align="right" valign="top"><strong>Project description:</strong></td>
    <td height="75" colspan="3">
     <?php	
	 if($fields['SR_Descrip'] == "")
	 	$description = "Description Here";
	else
		$description = $fields['SR_Descrip'];
	 echo '<p id="sr_description" value="'.$description.'"  contenteditable="true">'.$description.' ';
	 ?>
    </td>
  </tr>
  <tr>
    <td align="right"><strong>Issuedby:</strong></td>
    <td colspan="3">

        <?php
        if (($fields['SR_IssueBy']  == 0))
        {
            $SRIssueByName = "Not Defined";
            $SRIssueId = "0";//NotSet Include in DB
        }
        else
        {
            $SRIssueByName = $fields['IssueRefName'];
            $SRIssueId = $fields['SR_IssueBy'];
        }
        echo '<div id="Leader"><label before="'.$SRIssueId.'" val="'.$SRIssueId.'" class="Ownchangeable Leader issuedBy" id="sr_projleader-srpl_pk-srpl_name" contenteditable="true" >'.$SRIssueByName.'</label></div>';
        ?>
<!--     --><?php
//	  	if (($fields['src_name']  == 0))
//		{
//			$IssueName = "Not Defined";
//			$Issueid = "0";//NotSet Include in DB
//		}
//		else
//		{
//			$IssueName = $fields['src_name'];
//			$Issueid = $fields['SR_Client'];;
//		}
//		echo '<div id="Issueby"><label before="'.$Issueid.'" val="'.$Issueid.'" class="Issueby "  contenteditable="true" >'.$IssueName.'</label></div>';
//	?>
    </td>
  </tr>

</table>

<?PHP
	if($fields['SR_Client'] == NULL)
		{
			echo '<button type="button" onClick="InsertProjdata()">Register</button>';
			echo '<br><br>Note:';
			echo '<br><label>This is a new Project. ';
			echo '<br>Please Register it after settingup the "Not Defined" elements.';
			return false;
		}
	else
		if($_SERVER['HTTP_HOST'] == 'localhost')
		echo '<button type="button" onClick="UpdateProjdata()">Update ^</button>';
?>


<?PHP
$sql = "SELECT * FROM 
(
SELECT * FROM `sr_dataconsist` where `DC_ProjID` = ".$_GET['id']."  and `DC_Phase` = 1
) as a 
left join sr_projleader
on sr_projleader.srpl_pk  = a.DC_Responsible";
//echo $sql;
$result = mysql_query($sql,$con) or die(mysql_error());
$totalRow = mysql_num_rows($result);
?>
<table  border="1" rows="<?php echo $totalRow; ?>" id="TabDataConsisten">
<tbody  id="TabBdyDataConsisten">
  <tr>
    <th width="551" bgcolor="#D9D9D9"><strong>Data inconsistencies/  other reasons for project delay</strong></th>
    <th width="219" bgcolor="#D9D9D9"><strong>Responsible</strong></th>
    <th colspan="4" align="center" bgcolor="#D9D9D9"><strong>Status</strong></th>
  </tr>

<?PHP
while ($row = mysql_fetch_assoc($result)) {
		echo '<tr class="tr_DC">';
		echo '<td><li><label before="'.$row['DC_Comments'].'" class="Comments DC_Comments" id="comments_'.$row['DC_ProjID'].'_'.$row['DC_Phase'].'_'.$row['DC_ComSNO'].'" contenteditable="true">'.$row['DC_Comments'].'</label></li></td>';
		
			if($row['DC_Responsible'] == 0)
		{
			$responsible = "Not Defined";
			$responsibleVal = 0;
		}
		else
		{
			$responsible = $row['srpl_name'];
			$responsibleVal = $row['DC_Responsible'];
		}
		
		echo '<td>
		<label val="'.$responsibleVal.'" class="Ownchangeable Responsible" at="Responsible_'.$row['DC_ProjID'].'_'.$row['DC_Phase'].'_'.$row['DC_ComSNO'].'"  DC="'.$row['DC_ProjIDPhaseSNO'].'" id="sr_projleader-srpl_pk-srpl_name" contenteditable="true" style="display: inline;">'.$responsible.'</label>
		</td>';
//echo '<td><input class="pk_id_status" type="checkbox" id="1" name="group2" val="Water"></td>';
//		echo '<td><input class="pk_id_status" type="radio" id="2" name="group2" val="ice"</td>';
//		echo '<td><input class="pk_id_status" type="radio" id="3" name="group2" val="sand"></td>';
//		echo '<td><input class="pk_id_status" type="radio" id="4" name="group2" val="air"></td></tr>';

echo '<td width="30px" class="tdClick"><img val="1" class="DC_Status" at="status_'.$row['DC_ProjID'].'_'.$row['DC_Phase'].'_'.$row['DC_ComSNO'].'" src="img\TickStatus.jpg" align="middle" style="display: '. ( ($row['DC_Status'] == "1") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="2" class="DC_Status" at="status_'.$row['DC_ProjID'].'_'.$row['DC_Phase'].'_'.$row['DC_ComSNO'].'" src="img\SolidGreeen.jpg" align="middle" style="display: '. ( ($row['DC_Status'] == "2") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="3" class="DC_Status" at="status_'.$row['DC_ProjID'].'_'.$row['DC_Phase'].'_'.$row['DC_ComSNO'].'" src="img\SolidOrange.jpg" align="middle" style="display: '. ( ($row['DC_Status'] == "3") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="4" class="DC_Status" at="status_'.$row['DC_ProjID'].'_'.$row['DC_Phase'].'_'.$row['DC_ComSNO'].'" src="img\SolidRed.jpg" align="middle" style="display: '. ( ($row['DC_Status'] == "4") ? "inline" : "none" ). ';"></td>';
		
		
	}
?>

</tbody>
</table>

<button class="NonPDF" type="button" id="AddRowDataConsisten">Add Row ^</button>
<?php
if($_SERVER['HTTP_HOST'] == 'localhost')
echo '<button type="button" onClick="UpdateRowDataConsisten()">Update ^</button>';
?>
<!--</table>-->
<?PHP
$sql = "SELECT * FROM 
(
SELECT * FROM `sr_recomprocd` where `RP_ProjID` = ".$_GET['id']."  and `RP_Phase` = 1
) as a 
left join sr_projleader
on sr_projleader.srpl_pk  = a.RP_Responsible";
//echo $sql;
$result = mysql_query($sql,$con) or die(mysql_error());
$totalRow = mysql_num_rows($result);
?>
<table border="1" rows="<?php echo $totalRow; ?>" id="TabReCommdPrced">
  <tr>
    <th width="483" bgcolor="#D9D9D9"><strong>Recommended Procedure</strong></th>
    <th width="99" bgcolor="#D9D9D9"><strong>Date</strong></th>
    <th width="179" bgcolor="#D9D9D9"><strong>Responsible</strong></th>
    <th colspan="4" bgcolor="#D9D9D9"><strong>Status</strong></th>
  </tr>

  <?PHP
while ($row = mysql_fetch_assoc($result)) {
		echo '<tr class="tr_RC">';
		// RC Comments
		echo '<td><li><label  class="Comments RP_Comments" id="comments_'.$row['RP_ProjID'].'_'.$row['RP_Phase'].'_'.$row['RP_ComSNO'].'" contenteditable="true">'.$row['RP_Comments'].'<label></li></td>';
		
		// RC Date
		echo '<td><label before="'.$row['RP_Date'].'" value="'.$row['RP_Date'].'" class="Date RP_Date" at="Date_'.$row['RP_ProjID'].'_'.$row['RP_Phase'].'_'.$row['RP_ComSNO'].'">'.$row['RP_Date'].'</label></td>';
		
		// RC Responsible
		if($row['RP_Responsible'] == 0)
		{
			$responsible = "Not Defined";
			$responsibleVal = 0;
		}
		else
		{
			$responsible = $row['srpl_name'];
			$responsibleVal = $row['RP_Responsible'];
		}
		echo '<td>
		
		<label val="'.$responsibleVal.'" class="Ownchangeable RP Responsible" at="Responsible_'.$row['RP_ProjID'].'_'.$row['RP_Phase'].'_'.$row['RP_ComSNO'].'"  DC="'.$row['RP_ProjIDPhaseSNO'].'" id="sr_projleader-srpl_pk-srpl_name" contenteditable="true" style="display: inline;">'.$responsible.'</label>
		</td>';
		
	//RC Status	
	echo '<td width="30px" class="tdClick"><img val="1" class="RP_Status" at="status_'.$row['RP_ProjID'].'_'.$row['RP_Phase'].'_'.$row['RP_ComSNO'].'" src="img\TickStatus.jpg" align="middle" style="display: '. ( ($row['RP_Status'] == "1") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="2" class="RP_Status" at="status_'.$row['RP_ProjID'].'_'.$row['RP_Phase'].'_'.$row['RP_ComSNO'].'" src="img\SolidGreeen.jpg" align="middle" style="display: '. ( ($row['RP_Status'] == "2") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="3" class="RP_Status" at="status_'.$row['RP_ProjID'].'_'.$row['RP_Phase'].'_'.$row['RP_ComSNO'].'" src="img\SolidOrange.jpg" align="middle" style="display: '. ( ($row['RP_Status'] == "3") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="4" class="RP_Status" at="status_'.$row['RP_ProjID'].'_'.$row['RP_Phase'].'_'.$row['RP_ComSNO'].'" src="img\SolidRed.jpg" align="middle" style="display: '. ( ($row['RP_Status'] == "4") ? "inline" : "none" ). ';"></td>';
	
	echo "</td>"	;
}
?>
</table>

<button class="NonPDF" type="button" id="AddRowReCommdPrced">Add Row ^</button>
<?php
if($_SERVER['HTTP_HOST'] == 'localhost')
echo '<button class="NonPDF" type="button" onClick="UpdateRowReCommdPrced()">Update ^</button>';
?>




<br class="NonPDF"><label class="NonPDF" id="wedUpd"></label>
<br class="NonPDF"><label class="NonPDF" id="wedDif"></label>
<br class="NonPDF"><label class="NonPDF" id="Errors"></label>
<table border="1" id="TabMilestones" rows="$totalRow">
 <tbody id="TabBdyMilestones">
  <tr>
    <th  bgcolor="#D9D9D9"><strong>Milestones</strong></th>
     <th  bgcolor="#D9D9D9"><strong>Weightage</strong></th>
     <th  bgcolor="#D9D9D9"><strong>Progress %</strong></th>
    <th  bgcolor="#D9D9D9"><strong> Plan</strong></th>
    <th align="center" bgcolor="#D9D9D9"><strong>Actual</strong></th>
    <th  bgcolor="#D9D9D9"><strong>Short comment</strong></th>
    <th colspan="4" align="center" bgcolor="#D9D9D9"><strong>Status</strong></th>
  </tr>
 <?php
 echo '<datalist  id="MileStoneList" before=""></datalist>';
 while ($row = mysql_fetch_assoc($resultMileStone)) 
 {
	
	echo "<script>$('#MileStoneList').append('<option value=\"".$row['msl_topic']."\" data-xyz=\"".$row['MS_ProjIDMslID']."\" ></option>')</script>";
	echo "<tr>";
	// Comments
	echo '<td><li>'.$row['msl_topic'].'</li></td>';
	// weightage
    echo'<td  class="MS_weightage" before ="'.$row['MS_weightage'].'" at="'.$row['MS_ProjIDMslID'].'" contenteditable="true">'.$row['MS_weightage'].'</td>';
   echo'<td  class="MS_weightageDone" before ="'.$row['MS_weightageDone'].'" at="'.$row['MS_ProjIDMslID'].'" contenteditable="true">'.$row['MS_weightageDone'].'</td>';
   
   // Plan
   // echo'<td >'.$row['MS_Plan'].'</td>';
	echo '<td><label before="'.$row['MS_Plan'].'"  value="'.$row['MS_Plan'].'" class="Date MS_Plan" at="Date_'.$row['MS_ProjID'].'_'.$row['MS_mslID'].'_'.$row['MS_ProjIDMslID'].'">'.$row['MS_Plan'].'</label></td>';
		
	// Actual
 
	echo '<td><label before="'.$row['MS_Actual'].'" value="'.$row['MS_Actual'].'" class="Date MS_Actual" at="Date_'.$row['MS_ProjID'].'_'.$row['MS_mslID'].'_'.$row['MS_ProjIDMslID'].'">'.$row['MS_Actual'].'</label></td>';
	
	$shtCmt = $row['MS_ShotComments'];
	if($shtCmt == "")
    {
        $shtCmt = "No Comments available";
        $tmpClass = "NonPDF";
    }
     else
         $tmpClass = "";

	//Short Comments
    echo '<td><li><label class="Comments MS_ShtComments '.$tmpClass.'" before ="'.$shtCmt.'" at="'.$row['MS_ProjIDMslID'].'" contenteditable="true">'.$shtCmt.'<label></li></td>';
// Status
 echo '<td width="30px" class="tdClick"><img val="1" class="MS_Status" at="status_'.$row['MS_ProjID'].'_'.$row['MS_mslID'].'_'.$row['MS_ProjIDMslID'].'" src="img\TickStatus.jpg" align="middle" style="display: '. ( ($row['MS_Status'] == "1") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="2" class="MS_Status" at="status_'.$row['MS_ProjID'].'_'.$row['MS_mslID'].'_'.$row['MS_ProjIDMslID'].'" src="img\SolidGreeen.jpg" align="middle" style="display: '. ( ($row['MS_Status'] == "2") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="3" class="MS_Status" at="status_'.$row['MS_ProjID'].'_'.$row['MS_mslID'].'_'.$row['MS_ProjIDMslID'].'" src="img\SolidOrange.jpg" align="middle" style="display: '. ( ($row['MS_Status'] == "3") ? "inline" : "none" ). ';"></td>';
		echo '<td width="30px" class="tdClick"><img val="4" class="MS_Status" at="status_'.$row['MS_ProjID'].'_'.$row['MS_mslID'].'_'.$row['MS_ProjIDMslID'].'" src="img\SolidRed.jpg" align="middle" style="display: '. ( ($row['MS_Status'] == "4") ? "inline" : "none" ). ';"></td>';
	echo "</tr>";
	if($row['MS_Active'] == 1) echo '<script>$("#tdProjPhase").html("<label id=\"ProjPhase\"  val=\"'.$row['MS_ProjIDMslID'].'\" class=\"OwnchangeableMileStone\" contenteditable=\"true\">'.$row['msl_topic'].'</label>"); $("#MileStoneList").attr("before","'.$row['MS_ProjIDMslID'].'");</script>';
 }
 
 ?>
 </tbody>
  
  
</table>

<button class="NonPDF" type="button" id="AddRemoveMilestones">Add Remove MilesStones ^</button>
<button  type="button" class="MSL_Options" id="SaveChangesMilestones" style="display:none">Save Changes^</button>
<button  type="button" class="MSL_Options" id="MSL_CheckAll" style="display:none">Check All</button>
<button  type="button" class="MSL_Options" id="MSL_UnCheckAll" style="display:none">UnCheck All</button>
<button class="NonPDF" type="button" id="WholeUpdateBtn" onClick="WholePageUpdate()">Update^</button>
<!--<a href="" class="nonPdf" onclick ="$('#container').tableExport({type:'png', escape:'false'});">Generate PDF</a>-->
<!--<a href="javascript:void(0)" id="PDFFrom" >PDF From</a>-->
<br>
<a href="javascript:void(0)" class="NonPDF" id="PDFOptions" >PDFs</a>
<br>
<!--    title="PDF Options!"-->
    <div id="hello" title="PDF Options!" class="NonPDF">
        <p>
            <ul>
            <li><a href="javascript:void(0)" class="NonPDF PDFOptions" id="PDFActual" style="display:none" >Actual</a></li>
            <li><a href="javascript:void(0)" class="NonPDF PDFOptions" id="PDFDB" style="display:none" >DB Systel</a></li>
            <li><a href="javascript:void(0)" class="NonPDF PDFOptions" id="PDFClient" style="display:none" >Client</a></li>
<!--            <li><a href="javascript:void(0)" class="NonPDF PDFOptions" id="DownloadPDF"  style="display:none">DownloadPDF</a></li>-->
        </ul>
        <input type="button" id="closePopup" value="Close" style=" width: 100%;">
        </p>
    </div>
</div>
<div class="modal"><!-- Place at bottom of page --></div>
</body>
</html>
<!-- <script type="text/javascript" src="statusreport.js"></script>-->
 <script type="application/javascript" src="StatusReportJS/tableExport.js"></script>
 <script type="application/javascript" src="StatusReportJS/jspdf.min.js"></script>
<script type="text/javascript" src="StatusReportJS/html2canvas.js"></script>
<script type="text/javascript" src="StatusReportJS/jspdf.debug.js"></script>
<script type="text/javascript" src="StatusReportJS/canvas-toBlob.js"></script>

 
 
