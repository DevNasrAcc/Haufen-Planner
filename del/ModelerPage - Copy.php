<?php session_start();
if(!isset( $_COOKIE['userID']))
Header("Location: loginPage.php");

?>
<!DOCTYPE HTML>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Emp Page</title>

  <script type="text/javascript" src="jquery-1.9.1.js"></script>
  <script type="text/javascript" src="Employee_Switch_Person.js"></script>
  <script type="text/javascript" src="login.js"></script>
  <link rel="stylesheet" href="ui.all.css" type="text/css" media="screen" />
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

  </style>
</head>

<body>
<!--Get Permissions-->


<?php
include 'logoutPage.php';

?>



 <?php
 //if($_COOKIE['switch'] == '1')
// echo "COOKIE['permission_switch']: ".$_COOKIE['permission_switch'];
 	if($_COOKIE['permission_switch'] == '1')
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
	
	if($_COOKIE['permission_AllowProjects'] == '1') // have to allow these project to shift him self
	{
		echo "<h2>Hod Allow Projects to employee</h2>";													// table for allow projects to modeler
		echo '<table border="1" id="tbAllowProj">';
		include 'nameAndProjects.php';
		include 'BtnAllowDenay.php';
		echo "</table>";
		
		echo "\n\n <h2>verify the allow projects</h2>";
															// table for checking  allow projects to modeler
		echo '<table border="1" id="tbChkAllowProj">';
		include 'nameAndProjects.php';
		
		echo "</table>";
		
		
	}
		
?>

<?php
	if($_COOKIE['permission_WhiteBoard'] == '1' )
 	include 'whiteboard.php';
?>


<p>

<table border="1" id="tbPerPersonDays">
 <?php
 	
	if($_COOKIE['permission_ChkEmpProjDays'] == '1')
	{
		echo '<h2> Check Employee project days </h2>';
		include 'nameAndProjects.php';
		 include 'btnGetPerDays.php';	
	}
 	 
  ?>

</table>

</p>
<p>
<div id="ProjectsDaysInfo"></div>
</p>

<?php
	// All projects days
	
	if($_COOKIE['permission_ChkProjDays'] == '1' ) 
	{
		echo "<h2> Check All project days </h2>";												// table for allow projects to modeler
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
		include 'btnGetAllDays.php';
		echo ' <tr>	
				
				<td>Select Dates</td>
				<td><input class="date" id="date" type="textbox"  size="25" value="01/9/2013 - 11/9/2013"/></td>
		  </tr>';
		echo "</table>";
		
		
		
		
	}
		
?>

<div id="ProjectsPreviousDaysInfo"></div>

<?php 

if($_COOKIE['permission_permissionPage'] == '1') 
{
	echo"<p>";
	echo "<h2>Permission Admin</h2>";	
	echo '<table border="1" id="permissionEmp"><tbody>';
	include 'PermissionInPage.php';
	echo '</tbody></table>';
	echo '<div id="permissionInfo"></div>';
	echo"</p>";	
}


?>

<?php include 'textarea.php'; ?>

<!--<div>
            <input type="text" id="temptime" class="bbit-dp-input">
            <img class="picker" align="middle" src="images/icons/cal.gif" alt="" isshow="0">
        </div>-->

<!--	<input id="date" type="textbox"/>-->
<<input class="date" type="textbox"/>


</body>
</html>


<!--	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
    			$(".date").datepicker({ showOn: 'button',  buttonImageOnly: true, buttonImage: 'images/icon_cal.png' });
  		
		});
	</script>-->
 
    