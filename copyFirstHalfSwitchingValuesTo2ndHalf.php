<?php
echo '<h2>Maintain Previous miss date 2nd Half data</h2> ';
echo '
		<table border="1" id="tb_copyFirstHalfSwitchingValuesTo2ndHalf">

   <tr>
    <td>White board Prevs Date </td>
    <td><input class="dateinput" name="idate" type="text"  placeholder= "Date for White Board"></td>
    <td>
        
        <input type="radio" name="half" value="half2"  id="half2"  checked="checked">2 Half
	</td>
    <td> <input type="button" value="Copy switching Values in 2nd Half" id="copyFirstHalfSwitchingValuesTo2ndHalf">
		 <input type="button" value="All Copy switching Values in 2nd Half" id="All_copyFirstHalfSwitchingValuesTo2ndHalf">
	</td>
  <tr>
	
</table>

		';
?>

