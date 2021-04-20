function login() {
  //alert("working");
  	 var loginID = $("#loginID").val();
   	 var pass = $("#password").val();
	 //alert("loginID "+loginID +" password: "+pass);
   var go_path = "login.php?action=login&vars=2&var1="+loginID+"&var2="+pass;
  	$("#chk").val(go_path);
       $.get(go_path,
        { 
        }, function(data)
        {
            //alert (data);
			 //$("#chk").val(data);
			 //location.reload();
			//alert("count datalenght: "+data.length);
			 //alert("------"+data+"-----------");
			 
			 if($.trim(data) == "successful")
			 {
				 $("#mesg").css('color', 'green');
			 		//window.location.replace("http://14.192.128.60/Employee_Switch_Persons/ModelerPage.php");
				  //window.location.replace("http://localhost/Employee_Switch_Persons/ModelerPage.php");
				   window.location.replace("http://"+location.host+"/Employee_Switch_Persons/ModelerPage.php");
			}
				 
			else 
				{
					$("#mesg").text("------Invalid Information-----");
					$("#mesg").css('color', 'red');
					// $("#mesg").text(data);	
				}
				

        });   


location.host
}
function logout()
{
	  var go_path = "login.php?action=logout&vars=0";
	   $.get(go_path,
        { 
        }, function(data)
        {
            //alert (data);
			 $("#chk").val(data);
			// location.reload();
			//alert("location.host: "+location.host); // localhost or 14.192.128.60
			window.location.replace("http://"+location.host+"/Employee_Switch_Persons/loginPage.php");

        });   
	  
}