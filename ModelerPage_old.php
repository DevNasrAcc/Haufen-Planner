<?php session_start();
if(!isset( $_COOKIE['userID']))
Header("Location: loginPage.php");

?>
<!DOCTYPE HTML>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Emp Page</title>
  <link rel="stylesheet" href="ui.all.css" type="text/css" media="screen" />
  
 <style type="text/css">
    body {
      font-family: "Ubuntu", "Trebuchet MS", sans-serif;
	  background-color: #eeeeee;
    }
	
	/*
    table {
      border-collapse: collapse;
      margin: 1em auto;
    }
	*/
    th, td {
      padding: 5px 10px;
      border: 1px solid #999;
      font-size: 12px;
    }
    .th {
      background-color: #bfbfbf;
    }
    .th[data-sort]{
      cursor:pointer;
    }

    /* just some random additional styles for a more real-world situation */
    #msg {
      color: #0a0;
      text-align: center;
    }
    td.name {
      font-weight: bold;
    }
    td.email {
      color: #666;
      text-decoration: underline;
    }
    /* zebra-striping seems to really slow down Opera sometimes */
	/*
    tr:nth-child(even) > td {
      background-color: #f9f9f7;
    }
    tr:nth-child(odd) > td {
      background-color: #ffffff;
    }
	*/
    .disabled {
      opacity: 0.5;
    }
	
  </style>
  
  <style>
  
  	.picker
	{
		height:16px;
		width:16px;
		background:url("/images/icons/cal.gif") no-repeat;
		margin-left:-19px;
		cursor:pointer;
		border:none;         
	}
	.thismodeler
	{
		background-color:#0F0;
		
	}
	.thisTeamLead
	{
		background-color:#66CCFF
	}
	.bold
	{
		font-weight: bold;
	}
	textarea {
    width: 100%;
    height: 200px;
	}
	
	.ModelerCategory
	{
		
		background-color:#c5d9f1;
	}
	.Environment
	{
		background-color:#c0d998;
	}
	.Library
	{
		background-color:#CDB99C;
	}
	.CAD
	{
		background-color:#9a9cc8;
	}
	.Project_Leader
	{
		background-color:#d9d598;
	}
	.QA
	{
		background-color:#8B88FF;
	}
	.hightlight
	{
		background: #ffffff;
		color: #000000;
	}
	#Menuinfo
	{
	
		/*float:left;*/
		
	}
	#logininfo
	{
	display:block;
	/*margin-right:1em;*/
	
	}
	#slider
	{
	
	margin-right:0;
	padding-right: 0;
	width: 630px;
	float:right;
		
	}
	/*table
	{
	border-collapse:collapse;
	}
	table,th, td
	{
	border: 1px solid black;
	
	}*/


  </style>
  

</head>

<body>
<!--Get Permissions-->


<?php



include 'logoutPage.php';
//include 'generateNumber.php';
//require('EncodeDecode.php');

// echo $_SERVER['REMOTE_ADDR']; //return ip 127.0.0.1

	
	

if(!isset($_COOKIE['permission_switch']) )
{
	//header("refresh: 1; url=http://localhost/Employee_Switch_Persons/ModelerPage.php");
	header("refresh: 1; url=http://" . $_SERVER['HTTP_HOST']."/Employee_Switch_Persons/ModelerPage.php");

	return ;
}

?>


<?php
	$input = "permission_AllowProjects";
	//if($_COOKIE[encrypt($input,$key,$iv,$bit_check)] != '0')
	if($_COOKIE['permission_AllowProjects'] == 1) // have to allow these project to shift him self
	{
		echo "<br/><h1>Hod Allow Projects to employee</h1>";													// table for allow projects to modeler
		echo '<table border="1" id="tbAllowProj">';
		include 'nameAndProjects.php';
		include 'BtnAllowDenay.php';
		echo "</table>";
		
		/*echo "\n\n <h2>verify the allow projects</h2>";
															// table for checking  allow projects to modeler
		// id change due to switch change here echo '<table border="1" id="tbChkAllowProj">';
		echo '<table border="1" id="tbSwitchPerson">';
		include 'nameAndProjects.php';
		 include 'BtnSwitchPerson.php';*/
		echo "</table>";
		
		
	}
	
	
		
?>

 <?php
 //if($_COOKIE['switch'] == '1')
// echo "COOKIE['permission_switch']: ".$_COOKIE['permission_switch'];
	/*
	$input =  $_COOKIE['permission_switch'];
	//$_COOKIE[$input];
	//echo $_COOKIE['permission_switch'];
	echo decrypt($input,$key,$iv,$bit_check);
	
	if((decrypt($input,$key,$iv,$bit_check) % 2) == '0')	
	//if($_COOKIE[encrypt($input,$key,$iv,$bit_check)] != '0')
	*/
	
	
	// this block is working but it close because is ka kam nechay verify k tale se lay rahey hain
	if($_COOKIE['permission_switch'] == 1)
	{
		echo '
		<p>
		<h2>Switching Persons</h2>
		<table border="1" id="tbSwitchPerson">
		';
		 
			 include 'nameAndProjects.php';
			 include 'BtnSwitchPerson.php';
		
		echo '
		</table>
		</p>
		';	
	}
 	
?>
<?php
///include 'copyFirstHalfSwitchingValuesTo2ndHalf.php';
?>


<?php

	$input = "permission_WhiteBoard";
	//if($_COOKIE[encrypt($input,$key,$iv,$bit_check)] != '0')
	if($_COOKIE['permission_WhiteBoard'] == 1 )
 	include 'whiteboard_PrevDate.php';

?>



<?php
	$input = "permission_WhiteBoard";
	//if($_COOKIE[encrypt($input,$key,$iv,$bit_check)] != '0')
	if($_COOKIE['permission_WhiteBoard'] == 1 )
 	include 'whiteboard.php';
?>



<p>

<table border="1" id="tbPerPersonDays">
 <?php
 	$input = "permission_ChkEmpProjDays";
	//if($_COOKIE[encrypt($input,$key,$iv,$bit_check)] != '0')
	if($_COOKIE['permission_ChkEmpProjDays'] == 1)
	{
		echo '<h2>Employee Switching</h1>';
		include 'nameAndProjects.php';
		 include 'btnGetPerDays.php';
		 	
	
	echo ' <tr>	
				
				<td>Select Dates</td>
				<td><input class="date"  type="textbox"  size="25" placeholder ="Click to Enter date"/></td>
		  </tr>';
	}
 	 
  ?>

</table>

</p>
<p>
<div id="ProjectsDaysInfo"></div>
</p>



<?php
	// All projects days
	
	$input = "permission_ChkProjDays";
	//if($_COOKIE[encrypt($input,$key,$iv,$bit_check)] != '0')
	if($_COOKIE['permission_ChkProjDays'] == 1 ) 
	{
		echo "<h1> Check All project days </h1>";												// table for allow projects to modeler
		echo '<table border="1" id="tbPreProjDays">';
		echo '

		  <tr>	
				
			<th>Project</th>
			<th>Operations</th>
		  </tr>
		  <tr>	
			
			<td class="ProjectName">
				<select>	
				<option value="volvo">Volvo</option>	
				<option value="saab">Saab</option>
				<option value="vw">VW</option>
				<option value="audi" selected>Audi</option>
				</select>
			</td>
			
			';
		echo "<td>";
		include 'btnGetAllDays.php';
		//include 'ProjectsDaysSummary.php'; // this is old options that required to use  split dates
		include 'ProjectPerMemberTotalDays.php';
		include 'MonthTotalContProj.php';
		
		
		echo "</td>";
		
		echo ' <tr>	
				
				<td>Select Date</td>
				<td><input class="date" type="textbox"  size="25" placeholder ="Click to Enter date"/></td>
				
		  </tr>';
		  //<td><input class="date" id="date" type="textbox"  size="25" placeholder ="Click to Enter date"/></td>
		echo "</table>";
		
		
		
		
	}
		
?>
<div id="ProjectsPreviousDaysInfo"></div>



<?php
 
$input = "permission_permissionPage";
//if($_COOKIE[encrypt($input,$key,$iv,$bit_check)] != '0')

if($_COOKIE['permission_permissionPage'] == 1) 
{
	echo"<p>";
	echo "<h1>Permission Admin</h1>";	
	echo '<table border="1" id="permissionEmp"><tbody>';
	include 'PermissionInPage.php';
	
	echo '</tbody></table>';
	echo '<div id="permissionInfo"></div>';
	echo"</p>";	
}


?>


<?php
//include 'copyFirstHalfSwitchingValuesTo2ndHalf.php';
?>


	  
	  
<?php 
if($_COOKIE["userDesig"] == 2 || $_COOKIE["userDesig"] == 4)
include 'textarea.php'; 

?>





















<!--<div>
    <input type="text" id="temptime" class="bbit-dp-input">
    <img class="picker" align="middle" src="images/icons/cal.gif" alt="" isshow="0">
</div>-->

<!--	<input id="date" type="textbox"/>-->
<!--<input class="date" type="textbox"/>-->

<!--<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js"></script>
-->
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery.min.js"></script>
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery-ui.min.js"></script>
<script>

//http://hackingon.net/post/jQuery-Datepicker-by-Example.html
$(".date").datepicker({ altField: "#Range", altFormat: 'dd-mm-yy', dateFormat: 'dd/mm/yy', rangeSelect: true });

$(".dateinput").datepicker({ altField: 'input#date', altFormat: 'yy-mm-dd',dateFormat: 'yy-M-dd' });


</script>


<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>
<script type="text/javascript" src="login.js"></script>






</body>
</html>


	
<!--	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
    			$(".date").datepicker({ showOn: 'button',  buttonImageOnly: true, buttonImage: 'images/icon_cal.png' });
  		
		});
	</script>-->
 
    