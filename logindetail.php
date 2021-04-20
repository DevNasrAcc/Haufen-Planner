<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>

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


<table border="1" id="tblogindetail">
 

  <tbody><tr>	
	<th>Name</th>	
	<th>Project</th>
	<th>Operations</th>
  </tr>
  <tr>	
	<td>
		<select class="nameEmp"><option value="0">SelectEmployee</option><option value="1">irfanhaq</option><option value="2">sajjad</option><option value="3">ali</option><option value="4">anwar</option><option value="5">saad</option><option value="6">mobeen</option><option value="7">mehtab</option><option value="8">hassam</option><option value="9">shahrukh</option><option value="10">yasin</option><option value="11">usman</option><option value="12">irfansuleman</option><option value="13">ahsansiddiqui</option><option value="14">ahsanahmed</option><option value="15">ghazanfar</option><option value="16">junaid</option><option value="17">mubashirabbas</option><option value="18">azeem</option><option value="19">atif</option><option value="20">talha</option><option value="21">zahid</option><option value="22">umairferoz</option><option value="23">zain</option><option value="24">aquib</option><option value="25">nadeem</option><option value="26">faizan </option><option value="27">aftab</option><option value="28">asad</op		tion><option value="29">usamaamir</option><option value="30">umair</option><option value="31">yousuf</option><option value="32">younus</option><option value="33">omer</option><option value="34">alihassan</option><option value="35">usmanghias</option><option value="36">hameed</option><option value="37">jahanzab</option><option value="38">anas</option><option value="39">arsalan</option><option value="40">naveed</option><option value="41">abbaszaidi</option><option value="42">toufiq</option><option value="43">mubashirrahim</option><option value="44">hammadali</option><option value="45">tabrez</option><option value="46">asifatiq</option></select>
	</td>
   	<td ><input class="date" id="date" type="textbox"  size="25" Placeholder="01/9/2013 - 11/9/2013"/></td>
	
		<td>
		<input type="button" value="Login Detail" onclick="logindetail()">
		<input type="button" value="Last Entry" onclick="lastEntry()">
        <?php
			// include 'Hours.php';
		?>
		
		</td>
			
</tr></tbody></table>
<div id="LoginDetailInfo"></div>














<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery.min.js"></script>
<script type="text/javascript" src="js/libs/jquery/1.2.6/jquery-ui.min.js"></script>
<script>

//http://hackingon.net/post/jQuery-Datepicker-by-Example.html
//$(".date").datepicker({ altField: "#Range", altFormat: 'dd-mm-yy', dateFormat: 'dd/mm/yy', rangeSelect: true });
$(".date").datepicker({ altField: "#Range", altFormat: 'yy-mm-dd',  rangeSelect: true });


</script>
<script>

</script>

<script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>
<script type="text/javascript" src="login.js"></script>
</body>
</html>
