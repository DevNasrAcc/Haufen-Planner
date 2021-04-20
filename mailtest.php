<?php
	$txt = "First line of text\nSecond line of text";

		// Use wordwrap() if lines are longer than 70 characters
		$txt = wordwrap($txt,70);
		
		// Send email
		mail("smabn5@gmail.com","PMS Alert Illlegle login",$txt);
?>