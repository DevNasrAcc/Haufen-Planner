<!DOCTYPE HTML>
<head>
<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>
</head>
<html>


<body>
<label id="options_type" class="<?php echo $_POST["vote_type"]; ?>"></label>
<label id="options" class="<?php echo $_POST["options"]; ?>"></label>
<form action="ModelerPage.php" method="GET" id="form1">
<div id="vote_html">
	<table width="600" border="1">
	  <tr>
		  <td>Question:</td>
			<td id="mainQueestion"> <?php
				echo $_POST["question"];
			
			?></td>
	  </tr>
	  <tr>
	   <td>Options</td>
		<td>
			<div id="options_div"></div>
		</td>
	  </tr>
	 
	
	 </table>
 </div>

 </form>



<table >
 <tr>
   <td></td>
    <td>
		<button  id="Submit_Question" type="Button" value="Submit">Save</button><label id="ConformationMsg"></label>
        <!--<button  id="voteDetail_info_req" type="Button" value="Submit">Vote Detail</button>-->
 	</td>
  </tr>
  </table>

	
<?php 
if($_SERVER['HTTP_HOST'] == 'localhost')
include 'textarea.php'; 

?>




</body>
</html>