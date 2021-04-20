<?php
	function GenOddNumber()
	{
		$random = 0;
		do{
			  $random = rand(10,1001);
			}while($random % 2 == 0); 
		return $random;
	}
	
	function GenEvenNumber()
	{
		$random = 0;
		do{
			  $random = rand(10,1001);
			}while($random % 2 != 0); 
		return $random;
	}

?>