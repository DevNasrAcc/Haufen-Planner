<?php

echo '<tr><td colspan="3">';
if($_SERVER['HTTP_HOST'] == 'localhost')
        echo '  <input type="button"  value="Login Double Entry" onclick="LoginDoubleEntry()">
    	    	<input type="button"  value="Switching" id="switchingEmp"  ">
				<input type="button"  value="Get Days" onclick="getPerDay()">
				<input type="button"  value="All Projects" onclick="allAandFinishProjects()">
				<button type="button" id="AllmodelerProjects">All Modeler Projects </button>
				<button type="button"  id="AllmodelerFree">Free Employee All</button>
				<button type="button"  id="AllmodelerNotAvaiable">Not Avaiable Total</button>
				<button type="button"  id="AllmodNotAvailDetail">Not Available Detail</button>
				<button type="button"  id="AllmodelerNotAvaiableFilter">Leave Details</button>
				<button type="button"  id="MonthlySheet">Monthly Sheet</button>
				<button type="button"  id="MonthlyCompensationSheet">Monthly Compensation Sheet</button>

				<br>';
                include 'modelerProjects.php';
echo '</td></tr>';
?>