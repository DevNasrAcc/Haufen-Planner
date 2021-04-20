<?php
					global $array;
					while($row = mysql_fetch_assoc($result))
					{
						for ($i=0; $i<Count($array); $i++)
						{
							
							$input = $array[$i];
							$input1 = $row[$array[$i+1]];	// 0 or 1
							if($input1 == 0)
								$input1 = GenEvenNumber();
							else
								$input1 = GenOddNumber();
							//setcookie("userID", $total_rows['PK'], time()+3600*48);
							setcookie ($input, encrypt($input1,$key,$iv,$bit_check), time()+3600*48);
							$i++;
						}
					}
					
					
?>