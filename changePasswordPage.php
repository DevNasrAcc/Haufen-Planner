<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>ChangePassword</title>
 <script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript">
function ChangePassword()
{
	//$("#dmEmpName option:selected").text()); 
    var nameID = $("#loginID").val();   // 7
	var pass = $("#password").val();
	var newpass = $("#newpassword").val();
	var confpass = $("#confpassword").val();
	//alert("nameID "+newpass);
	
	if(newpass == confpass)
	{
		   var go_path = "Employee_Switch_Person.php?action=changePassword&vars=3&var1="+nameID+"&var2="+pass+"&var3="+newpass; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
        $.get(go_path,
        { 
        }, function(data)
        {
            $("#chk").val(data);
			if(data != "sucessful")
			{
				$("#mesgChangePass").text("------Invalid Information-----");
				$("#mesgChangePass").css('color', 'red');
			}
			else
				{
					$("#mesgChangePass").text("------Sucessful-----");
					 window.location.replace("http://"+location.host+"/Employee_Switch_Persons/index.php");
				
				}
				
			/*
            //var get_data = new Array();     // declare array 
            //var get_data  = data.split('----//------'); // get_data is data comming from php file
            if(data == "done")
               alert("Switching Successfull");
          //$("#chk").val(data);
            refreshPage();
		*/
        }); 
	}
	else
		$("#mesgChangePass").text("Conform password not same");
	
}
function Cancel()
{
	 window.location.replace("http://"+location.host+"/Employee_Switch_Persons/index.php");
	 //header("refresh: 1; url=http://" . $_SERVER['HTTP_HOST']."/Employee_Switch_Persons/ModelerPage.php");
}
</script>
</head>
<body>
<?php
/*if (isset($_COOKIE["userID"]))
  echo "Welcome " . $_COOKIE["userID"] . "!<br>";
else
  echo "Welcome guest!<br>";
  
 setcookie("user", "Alex Porter", time()+3600);*/
?>


		<table width="200" border="1">
        <tr>
			
			<td colspan="2" id="mesgChangePass">Information Please</td>
		</tr>
		  <tr>
			<td>Login Name</td>
			<td><input type="text"  name="loginID" id="loginID"  placeholder= "LoginID" ></td>
		  </tr>
		  <tr>
			<td>Password</td>
			<td><input type="password" name="password" id="password" value="1234"></td>
		  </tr>
		  <tr>
			<td>New Password</td>
			<td><input type="password" name="newpassword" id="newpassword" value="1234"></td>
		  </tr>
            <tr>
			<td>Conform Password</td>
			<td><input type="password" name="confpassword" id="confpassword" value="1234"></td>
		  </tr>
            <tr>
			<td>Submit</td>
			<td>
				<button onClick="ChangePassword()">Change Password</button>
                <button onClick="Cancel()">Cancel</button>
			</td>
		  </tr>
		</table>
 <?php 
if($_COOKIE["userDesig"] == 2 || $_COOKIE["userDesig"] == 4 )
include 'textarea.php'; 

?>
		
</body>
</html>