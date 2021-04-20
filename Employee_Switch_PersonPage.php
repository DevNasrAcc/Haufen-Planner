
/*http://www.ibm.com/developerworks/library/os-phpexcel/*/
<!DOCTYPE HTML>
<html>
<head>
  <title>Switch Employee</title>
  <script type="text/javascript" src="jquery-1.9.1.js"></script>
  <script type="text/javascript" src="Employee_Switch_Person.js"></script>
</head>
<body>
<h1>Detail Projects</h1>

<table border="1" id="tbprojStatus" >
  <tr>	
	<td>Project Status: </td>	
	
	<td >
		<select class="projStatus">
		<option value="1">Continue</option>
		<option value="2">Start</option>
		<option value="3">Finish</option>
		<option value="4">Pause</option>
		<option value="5">Resume</option>
		<!--<option value="audi" selected>Resume</option>-->
		</select>
	</td>
   	<td>
		<input type="button" value="Display" onclick="projStatus()"/>
	</td>
	<td>
		<input type="button" value="Clear" onclick="projStatusClear()"/>
	</td>
  </tr>

</table>

<div id="projStatusTB"></div>

<h1>Switching Persons</h1>
<table border="1" id="tbSwitchPerson">
  <tr>	
	<th>Name</th>	
	<th>Project</th>
	<th>Operations</th>
  </tr>
  <tr>	
	<td>
		<select id="nameEmp" onchange="GetProjName()">	
		<option value="volvo">Volvo</option>	
		<option value="saab">Saab</option>
		<option value="vw">VW</option>
		<option value="audi" selected>Audi</option>
		</select>
	</td>
   	<td class="ProjectName">
		<select>	
		<option value="volvo">Volvo</option>	
		<option value="saab">Saab</option>
		<option value="vw">VW</option>
		<option value="audi" selected>Audi</option>
		</select>
	</td>
   	<td>
		<input type="button" value="Switch" onclick="SwitchEmp()"/>
	</td>
  </tr>

</table>

<h1>Update Projects</h1>
<label>Showing UnFinish Project in the below Dropdown menu</label>
<table border="1" id="tbUpdProj">
  <tr>
    <td>
      <label>Update Project</label>
    </td>
    <td class="ProjectName">
	<select>	
	<option value="volvo">Volvo</option>	
	<option value="saab">Saab</option>
	<option value="vw">VW</option>
	<option value="audi" selected>Audi</option>
	</select>
    </td>
    <td >
		<select class="projStatus">
		<option value="1">Continue</option>
		<option value="2">Start</option>
		<option value="3">Finish</option>
		<option value="4">Pause</option>
		<option value="5">Resume</option>
		<!--<option value="audi" selected>Resume</option>-->
		</select>
	</td>
    <td>
      <button onclick=updateProjectInfo()>Update</button>
    </td>
  </tr>
</table>
<?php include 'whiteboard.php';?>
<button  hidden onclick=test()>click test</button>
<textarea id= "chk" hidden></textarea>
</body>
</html>














