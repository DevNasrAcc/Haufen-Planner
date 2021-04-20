<?php
if (isset($_COOKIE["userID"]))
	{
//		$desgi =(int) $_COOKIE['userDesig'];
//			if($_COOKIE['permission_MainMenuTop'] == 1)
//                include 'menu.php';
	echo '<table  id="logininfo" class="col-lg-2 pull-right">';
	echo "<tr><td colspan='2'>";
	// Pakistan Flag 14 August
	//echo	'<img src="img/flag_001.png" alt="Mountain View" style="width:160px;height:35px;display: block;float:left; margin: auto; border: 2px solid white" >'; 
	echo"<div id='flipcountdownbox1'></div></td></tr>";
	echo "<td> Welcome </td>";
	echo "<td class='modelerid mod".$_COOKIE["userID"]."'>" . $_COOKIE["userName"] . "</td>";
	echo '</tr><tr>';
	echo '<td><a href="changePasswordPage.php" rel=next media="not print">Change Password</a></td>';
	echo ('<td><button  type="submit" onclick="logout()">Logout</button>');
	echo '<label id="half" style="display: none;">'.$_COOKIE['half'].'</label>' ;
    echo '</td></tr></table>';
	}
?>

