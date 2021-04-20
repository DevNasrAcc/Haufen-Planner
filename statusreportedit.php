<?php
$localhost = "localhost";
$root = "root";
$rootpass = "";
$con = mysql_connect($localhost,$root,$rootpass); //$con = mysql_connect("localhost","root","");
$db=mysql_select_db("ttl_employee_switch", $con);
global $con;
global $db;

if(isset($_POST['dmProjName']) )
{
	$projID =  $_POST['dmProjName'];
	
	
	
	$sql ="	select  * from 
	(
	select 
	*   from  statusreport where SR_pk = ".$projID."
	)as sr
	
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
	select * from sr_proj_phase 
	)
	as phase
	on phase.srpp_pk= sr.SR_Phase
	
	left join 
	(
	select * from sr_proj_desc
	)
	as descrip
	on descrip.srpd_projID= sr.SR_Descrip
	
	left join 
	(
	select pk,  name from projects where pk = ".$projID."
	)
	as proj
	on proj.pk= sr.SR_ProjID
	
	";
	
	$result = mysql_query($sql,$con) or die(mysql_error());
	
	$num_rows=mysql_num_rows($result);    
	$row = mysql_fetch_array($result);    
	$columns = mysql_num_fields($result);    
	$fields =array();  
	 echo "<script> var person = {";
	for($i = 0; $i < $columns; $i++) {     
		$field = mysql_field_name($result,$i);
		$fields[$field] = $row[$field];
		echo $field.': "'.$row[$field].'"';
		echo "console.log('hello');";
		}  
	echo "}
	alert (person);
	 </script>";
	//var person = {firstName:"John", lastName:"Doe", age:46};
	
	
	
	
}


else
echo "Not project id  selected";






?>


<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<link type="text/css" rel="stylesheet" href="css/reportcss.css"/>
 <script type="text/javascript" src="jquery-1.9.1.js"></script>
 <script type="text/javascript" src="statusreport.js"></script>
</head>

<body>
<div id="container">
<form action="statusreport.php" method="post">
<div id="ProjectMenu" class="ProjectName"></div><div id="showdetail"><button type="submit" id="showProjDetail">Show Project Detail</button></div>
</form>
<table width="926" border="1">
  <tr>
    <td width="667" bgcolor="#D9D9D9"><strong>Date: 2015-02-25</strong></td>
  </tr>
</table>
<table width="926" border="1">
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
		$sql = "select * from sr_client ";
		$result = mysql_query($sql,$con) or die(mysql_error());
		echo '<select class="setAccDB" id="srpl_pk">';
		while($row = mysql_fetch_assoc($result))
            {
                echo  "<option value=".$row['src_pk'].">".$row['src_name']."</option>";
			}
		echo '</select>';
	?>
    </td>
    <td width="199"><strong>Currentstatus:</strong></td>
    <td width="69">&nbsp;</td>
  </tr>
  <tr>
    <td align="right"><strong>Project:</strong></td>
     <td></td>
    
    <td><strong>Previousstatus:</strong></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align="right"><strong>Projectleader:</strong></td>
    <td colspan="3">		<!--Projectleader-->
    <?php 
		$sql = "select * from sr_projleader ";
		$result = mysql_query($sql,$con) or die(mysql_error());
		echo '<select id="projleader">';
		while($row = mysql_fetch_assoc($result))
            {
                echo  "<option value=".$row['srpl_pk'].">".$row['srpl_name']."</option>";
			}
		echo '</select>';
	?>
    </td>
    </tr>
  <tr>
    <td align="right"><strong>Projectphase:</strong></td>
    <td><!-- Projectphase-->
     <?php
		$sql = "select * from sr_proj_phase ";
		$result = mysql_query($sql,$con) or die(mysql_error());
		echo '<select id="projleader">';
		while($row = mysql_fetch_assoc($result))
            {
                echo  "<option value=".$row['srpp_pk'].">".$row['srpp_name']."</option>";
			}
		echo '</select>';
	?>
    </td>
    <td><strong>Degreeofcompletion [%]:</strong></td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td height="75" align="right" valign="top"><strong>Project description:</strong></td>
    <td height="75" colspan="3">&nbsp;</td>
  </tr>
  <tr>
    <td align="right"><strong>Issuedby:</strong></td>
    <td colspan="3">&nbsp;</td>
  </tr>
  <tr>
    <td align="right">&nbsp;</td>
    <td>&nbsp;</td>
    <td colspan="2"><em>Status:</em></td>
  </tr>
</table>
<table width="926" border="1">
  <tr>
    <td width="551" bgcolor="#D9D9D9"><strong>Data inconsistencies/  other reasons for project delay</strong></td>
    <td width="219" bgcolor="#D9D9D9"><strong>Responsible</strong></td>
    <td colspan="4" align="center" bgcolor="#D9D9D9"><strong>Status</strong></td>
  </tr>

  <tr class="tr_DC">
    <td class="td_DC" id="pk_id_comments">this is comments 1</td>
    <td class="td_DC" id="pk_id_Responsible">Comments 2</td>
    <td><input class="pk_id_status" type="radio" id="1"  name="group2" val="Water"></td>
    <td><input class="pk_id_status" type="radio" id="2" name="group2" val="ice"></td>
    <td><input class="pk_id_status" type="radio" id="3" name="group2" val="sand"></td>
    <td><input class="pk_id_status" type="radio" id="4" name="group2" val="air"></td>
  </tr>



</table>
<table width="926" border="1">
  <tr>
    <td width="483" bgcolor="#D9D9D9"><strong>Recommended    procedure</strong></td>
    <td width="99" bgcolor="#D9D9D9"><strong>Date</strong></td>
    <td width="179" bgcolor="#D9D9D9"><strong>Responsible</strong></td>
    <td colspan="4" bgcolor="#D9D9D9"><strong>Status</strong></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td width="33">&nbsp;</td>
    <td width="29">&nbsp;</td>
    <td width="30">&nbsp;</td>
    <td width="35">&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
<table width="926" border="1">
  <tr>
    <td width="345" bgcolor="#D9D9D9"><strong>Milestones</strong></td>
    <td width="134" bgcolor="#D9D9D9"><strong> Plan</strong></td>
    <td width="97" align="center" bgcolor="#D9D9D9"><strong>Actual</strong></td>
    <td width="179" bgcolor="#D9D9D9"><strong>Short comment</strong></td>
    <td colspan="4" align="center" bgcolor="#D9D9D9"><strong>Status</strong></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td width="36">&nbsp;</td>
    <td width="30">&nbsp;</td>
    <td width="27">&nbsp;</td>
    <td width="34">&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>
</div>
</body>
</html>
