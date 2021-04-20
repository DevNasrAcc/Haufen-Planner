<?php
function calculateHalf()
{
	ini_set('date.timezone', 'Asia/Karachi');
			//echo date('d/m/Y h:i: s A');
			
			//if (date('a') == "pm")
			if(date('H') >= 22)	// hour		10 PM
			 $half = 4;
			
		elseif(date('H') >= 19 &&  date('D') == "Fri")	// hour	7 PM
			 $half = 3;
		elseif(date('H') >= 19 &&  date('D') != "Fri")	// hour	7 PM
			 $half = 3;
		
		elseif(date('H') >= 14)	// hour	2 PM
            $half = 2;
		elseif(date('H') >= 7)	// hour	8 AM
            $half = 1;
        else
            $half = 5;
	
	return $half;
}
			
?>