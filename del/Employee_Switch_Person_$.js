
$(document).ready(function() {
	
	//alert("working");
	/*
	var now = new Date();
	var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0, 0) - now;
	if (millisTill10 < 0) {
		 millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
	}
	setTimeout(function(){alert("It's 10am!")}, millisTill10);*/
	
	 
	  var pageName = window.location;
	  getPersonNameAndProjectName();	// switch emp
	  if(window.location.href.indexOf("ModelerPage") > -1)
	  {
			//alert("pageName: "+pageName);  
			/*var nameID = $(".nameEmp").val();
			alert("nameID: "+nameID);*/
			
			
			getpermissions(); // also here for refresh time  // this works goes tp login.php
		   allUnFinishProject();
		   whiteboardfn();
		   allAandFinishProjects();
			$('.nameEmp').change(function ()// when user select username return the current  project of that person
			{
				 var tabParID = $(this).closest('table').attr('id');
				 
				empProjList(tabParID);
				$('.nameEmp').val($(this).val()); 
				
			});
			$('#AllowProj').click(function ()
			{
				/*
				//							all values of select options
				$idProjects = $("#tbChkAllowProj").find('.ProjectName').find('.dmProjName').val();
				$("#tbChkAllowProj").find('.ProjectName').find('.dmProjName').option
				$("#id option").each(function()
				{
					// add $(this).val() to your list
				});
				*/
				//var values = $.map($('#group_select option'), function(e) { return e.value; });
				var values = $.map($("#tbChkAllowProj").find('.ProjectName').find('.dmProjName option'), function(e) { return e.text }); // get teh list of already assigned projects of that person in "verify the allow projects"

				// as a comma separated string
				//values.join('\n');
				//values = values.replace(",", ":");
				
				//alert ("Already Assigned\n"+values);
				
				/*
				myList = [];
				$("#tbChkAllowProj").find('.ProjectName').find('.dmProjName option').each(function() {
					myList.push($(this).text())
				});
				alert("myList: "+myList[0]);
				*/
				
				//alert("values: "+$.type(values));
				
				if(values.length > 1)
				if (!confirm("Already Assigned\n\n"+values))
				{
					return false;
						
				}
				//alert($(this).closest('table').attr('id'));  
					 var tabParID = $(this).closest('table').attr('id');
					//var nameID = $(this).val();  
					var nameID = $("#"+tabParID).find(".nameEmp").val();   // 7
					
					//var projID = $("select#dmProjName").val();  //1
					var projID = $("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
					//alert ("projID: "+projID);
					
					//alert("name = "+nameID);   // for value
					//alert("text: "+$("#dmEmpName option:selected").text());           // for text 
					//alert("name = "+projID);
				  
					
					 var go_path = "Employee_Switch_Person.php?action=AllowProj&vars=2&var1="+nameID+"&var2="+projID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
					   //$("#chk").val(go_path);  
					   
						$.get(go_path,
						{ 
						}, function(data)
						{
							if (data == "Already Assigned")
								alert(data);
				//            refreshPage();
							
						
								
							
							
				
							
							
							
							switchWhenAllow(); //switch this person to allow project also
							//empProjList("tbSwitchPerson"); this function is in the switchWhenAllow() 
							//$("#tbSwitchPerson").find('.ProjectName').find('.dmProjName').val(projID); 
						
							
							//switchWhenAllow().done(empProjList("tbSwitchPerson"));
							//promise(switchWhenAllow()).done((empProjList("tbSwitchPerson"));
							
							// refresh project list
							
							
							
						});
				  
				 
			});
			$('#DenayProj').click(function ()
			{
				//alert($(this).closest('table').attr('id'));  
				 var tabParID = $(this).closest('table').attr('id');
			
				var nameID = $("#"+tabParID).find(".nameEmp").val();   // 7
				
			
				var projID =  $("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
			
				 var go_path = "Employee_Switch_Person.php?action=DenayProj&vars=2&var1="+nameID+"&var2="+projID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
				   //$("#chk").val(go_path); 
				  // alert("working: "+go_path);
					$.get(go_path,
					{ 
					}, function(data)
					{
					   $("#chk").val(data);  
			//            
					});   
					
			});
			$('#SwitchEmp').click(function ()
			{
				
				
				 //alert($(this).closest('table').attr('id'));  
				 var tabParID = $(this).closest('table').attr('id');
				//var nameID = $(this).val();  
				var nameID = $("#"+tabParID).find(".nameEmp").val();   // 7
				
				//var projID = $("select#dmProjName").val();  //1
				var projID = $("#tbSwitchPerson").find('.ProjectName').find('.dmProjName').val();
				//alert ("projID: "+projID);
				
				//alert("name = "+nameID);   // for value
				//alert("text: "+$("#dmEmpName option:selected").text());           // for text 
				//alert("name = "+projID);
				
				var go_path = "Employee_Switch_Person.php?action=SwitchEmp&vars=2&var1="+nameID+"&var2="+projID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
				$("#chk").val(go_path);
					 
					$.get(go_path,
					{ 
					}, function(data)
					{
						//alert (data);
						//var get_data = new Array();     // declare array 
						//var get_data  = data.split('----//------'); // get_data is data comming from php file
						if(data == "done")
						   alert("Switching Successfull");
						
						if(data == "You are not allow to switch to free")
						   alert("You are not allow to switch your self to free");
					 $("#chk").val(data);
						//refreshPage();
					whiteboardfn();
					});   
				 
			});
			$('#ProjectsPreDays').click(function ()
			{
				var dateRng = $("#date").val();
				var tabParID = $(this).closest('table').attr('id');
				var projID = $("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
				//alert ("tabParID: "+tabParID);
				var go_path = "Employee_Switch_Person.php?action=ProjectsPreDays&vars=2&var1="+projID+"&var2="+dateRng;
				 $("#chk").val(go_path);
			   
					   $.get(go_path,
							{ 
							}, function(data)
							{
								//alert (data);
								
								var get_data_row = new Array();     // declare array 
								var get_data_row  = data.split('----//------');
								
								htmls = "<table border=1>";
								for(var i = 0; i<get_data_row.length; i++ )
								{
								   htmls = htmls+"<tr>";
								   //alert ("row: "+get_data_row[i]);
								   var get_data_col = new Array();
								   get_data_col  = get_data_row[i].split(',');
								   
								   for(var j = 0; j<get_data_col.length ; j++)
								   {
									  htmls = htmls+"<td>";
									  htmls = htmls + get_data_col[j];
									  htmls = htmls+"</td>";
								   }
								   htmls = htmls+"</tr>";
								}
								htmls = htmls + "</table>";
							   // $("#chk").val(htmls);
								$("#ProjectsPreviousDaysInfo").html(htmls);
							
								
						}); 
			});
			$('#Count_Emp_Per_Day_Project').click(function ()
			{
				var dateRng = $("#date").val();
				//alert("dateRng: "+dateRng);
				
				var tabParID = $(this).closest('table').attr('id');
				
				var projID = $("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
				//alert ("tabParID: "+tabParID);
				var go_path = "Employee_Switch_Person.php?action=Count_Emp_Per_Day_Project&vars=2&var1="+projID+"&var2="+dateRng;
				 $("#chk").val(go_path);
			   
					   $.get(go_path,
							{ 
							}, function(data)
							{
								//alert (data);
								
								var get_data_row = new Array();     // declare array 
								var get_data_row  = data.split('----//------');
								
								htmls = "<table border=1>";
								for(var i = 0; i<get_data_row.length; i++ )
								{
								   htmls = htmls+"<tr>";
								   //alert ("row: "+get_data_row[i]);
								   var get_data_col = new Array();
								   get_data_col  = get_data_row[i].split(',');
								   
								   for(var j = 0; j<get_data_col.length ; j++)
								   {
									  htmls = htmls+"<td>";
									  htmls = htmls + get_data_col[j];
									  htmls = htmls+"</td>";
								   }
								   htmls = htmls+"</tr>";
								}
								htmls = htmls + "</table>";
							   // $("#chk").val(htmls);
								$("#ProjectsPreviousDaysInfo").html(htmls);
							
								
						}); 
			});
			//function ShowPermissions()
			$('#ShowPermissions').click(function ()
			{
			var tabParID = $(this).closest('table').attr('id');
			//alert("permission: "+tabParID );
			var nameID =  $("#"+tabParID).find(".nameEmp").val();
			 var go_path = "Employee_Switch_Person.php?action=permissionPage&vars=1&var1="+nameID;
			
				$("#chk").val(go_path);
					$.get(go_path,
					{ 
					}, function(data)
					{
						
						//alert (data);
						$("#chk").val(data);
							
						var get_data_row = new Array();     // declare array 
						var get_data_row  = data.split('----//------');
						
						htmls = "<table border=1>";
						for(var i = 0; i<get_data_row.length; i++ )
						{
						   htmls = htmls+"<tr>";
						   //alert ("row: "+get_data_row[i]);
						   var get_data_col = new Array();
						   get_data_col  = get_data_row[i].split(',');
						   
						   for(var j = 0; j<get_data_col.length ; j++)
						   {
							  htmls = htmls+"<td>";
							  htmls = htmls + get_data_col[j];
							  htmls = htmls+"</td>";
						   }
						   htmls = htmls+"</tr>";
						}
						htmls = htmls + "</table>";
					   // $("#chk").val(htmls);
						$("#permissionInfo").html(htmls);
						
						
					});   
			
			});
			$('#SavePermissions').click(function ()
			{
				var tabParID = $(this).closest('table').attr('id');
				
				//alert( $("#"+"permissionInfo").find(" tr:eq(1) td:eq(0)").text());
				id = $("#"+"permissionInfo").find(" tr:eq(1) td:eq(0)").text();
				switchs = $('#' + "switch").is(":checked");
				//alert("switchs: "+switchs);
				AllowProjects = $('#' + "AllowProjects").is(":checked");
				VerifyAllowProjects = $('#' + "VerifyAllowProjects").is(":checked");
				WhiteBoard = $('#' + "WhiteBoard").is(":checked");
				ChkEmpProjDays = $('#' + "ChkEmpProjDays").is(":checked");
				ChkProjDays = $('#' + "ChkProjDays").is(":checked");
				permissionPage = $('#' + "permissionPage").is(":checked");
				
				var go_path = "Employee_Switch_Person.php?action=permission&vars=8&var1="+id+"&var2="+switchs+"&var3="+AllowProjects+"&var4="+VerifyAllowProjects+"&var5="+WhiteBoard+"&var6="+ChkEmpProjDays+"&var7="+ChkProjDays+"&var8="+permissionPage;
				$.get(go_path,
					{ 
					}, function(data)
					{
						 $("#chk").val(go_path);
					});
				
			});
			
			
			
		 
			
		}
		
		
		 else if(window.location.href.indexOf("projSummary") > -1)
		 {
			 //alert("working");
			 RunningProjectsStatus();
			 whiteboardfn();
			 
		}
		
		else if(window.location.href.indexOf("AddProjects") > -1)
		 {
			
			 
			 $('#addproject').click(function ()
			{
				//projName	
				//alert("working");
				var projname = $("#projName").val(); 
				if($.trim(projname) == "")
				{
					alert("proj Name is Empty ");
					return;
				}
				var personClass = new Array(); 
				$(".nameEmp").each(function() {
					//alert($(this).val());
					personClass.push($(this).val());
				});
				var about = $("#textarea").val(); 
				var stdate = $("#stdate").val(); 
				var deaddate = $("#deaddate").val(); 
				
				//alert ("personClass: "+personClass[0]);
				//alert ("personClass: "+personClass[1]);
				 var go_path = "Employee_Switch_Person.php?action=addProject&vars=6&var1="+projname+"&var2="+personClass[0]+"&var3="+personClass[1]+"&var4="+about
				 																			+"&var5="+stdate+"&var6="+deaddate; 
				
				
					$.get(go_path,
					{ 
					}, function(data)
					{
						
						$("#chk").val(go_path);
						$("#result").text("	Added Successfully 	");
						 $("#result").css('color', 'green');
				}); 
				
			});
		
			 
		}
		else if(window.location.href.indexOf("AddPerson.php") > -1)
		{
			//alert("Add persons");
			designation();
			
			$("#loginname").focusout(function(){
				var go_path = "Employee_Switch_Person.php?action=chkNewLoginName&vars=0"; //33 is omer bahi id
	 
	  $.get(go_path,
				{ 
				}, function(data)
				{
					//alert (data);
					$("#chk").val(go_path);
					$("#desig").html(data);
										
			}); 
			  
			});
		}
		else
		{}
		
		
		
		/*$("#temptime").datepicker({
		
		  //picker is a button to fire date picker up.
		
		  picker: "<img class="picker" align="middle" src="/themes/shared/images/s.gif" alt="">";
		});

*/



});

function switchWhenAllow() // special case when pressed allow then also switch 
{
				
				 //alert($(this).closest('table').attr('id'));  
				var tabParID = "tbAllowProj";
				//var nameID = $(this).val();  
				var nameID = $("#"+tabParID).find(".nameEmp").val();   // 7
				
				//var projID = $("select#dmProjName").val();  //1
				var projID = $("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
				//alert ("projID: "+projID);
				
				//alert("name = "+nameID);   // for value
				//alert("text: "+$("#dmEmpName option:selected").text());           // for text 
				//alert("name = "+projID);
				
				 var go_path = "Employee_Switch_Person.php?action=SwitchEmp&vars=2&var1="+nameID+"&var2="+projID; //get_folder_&_files.php?action=verfy_email&vars=+smabn5@gmail.com
				$("#chk").val(go_path);
					 
					$.get(go_path,
					{ 
					}, function(data)
					{
						//alert (data);
						//var get_data = new Array();     // declare array 
						//var get_data  = data.split('----//------'); // get_data is data comming from php file
						if(data == "done")
						   alert("Switching Successfull");
						
						if(data == "You are not allow to switch to free")
						   alert("You are not allow to switch your self to free");
					 $("#chk").val(data);
						//refreshPage();
					whiteboardfn();
					});  
					empProjList("tbSwitchPerson");
					$("#tbSwitchPerson").find('.ProjectName').find('.dmProjName').val(projID); 
					//alert("projID: "+projID);
					
				 
}

function designation()
{
	 var go_path = "Employee_Switch_Person.php?action=designation&vars=0"; //33 is omer bahi id
	 
	  $.get(go_path,
				{ 
				}, function(data)
				{
					//alert (data);
					$("#chk").val(go_path);
					$("#desig").html(data);
					
					/*var get_data = new Array();     // declare array 
					var get_data = data.split('----//------'); // get_data is data comming from php file
				  
				  
				  $(".nameEmp").html(get_data[0]);  //employee name from employee table
				  
				  $(".ProjectName").html(get_data[1]);  // project name from project table
				  //$("#tbSwitchPerson").find('.ProjectName').html(get_data[1]); // hide for allowEmpProj list also */
					
			}); 
}

function allProdectionMember()
{
	
}

function getPersonNameAndProjectName()
{
	  var go_path = "Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1="+33; //33 is omer bahi id
				$.get(go_path,
				{ 
				}, function(data)
				{
					//alert (data);
					$("#chk").val(go_path);
					
					var get_data = new Array();     // declare array 
					var get_data = data.split('----//------'); // get_data is data comming from php file
				  
				  
				  $(".nameEmp").html(get_data[0]);  //employee name from employee table
				  
				  $(".ProjectName").html(get_data[1]);  // project name from project table
				  //$("#tbSwitchPerson").find('.ProjectName').html(get_data[1]); // hide for allowEmpProj list also 
					
			}); 
}




function loginAll()
{
	 var go_path = "login.php?action=loginAll&vars=0"; 
	 $("#chk").val(go_path);
						$.get(go_path,
						{ 
						}, function(data)
						{
							//$("#chk").val(data);
							refreshPage();
						});
}
function logoutAll()
{
	 var go_path = "login.php?action=logoutAll&vars=0";
	 $("#chk").val(go_path); 
						$.get(go_path,
						{ 
						}, function(data)
						{
							//$("#chk").val(data);
							refreshPage();
						});
}


function empProjList(tabParID)
{
	 if(tabParID == "tbChkAllowProj" || tabParID == "tbAllowProj") // verify the allow projects
				 {
					  var nameID =  $("#"+tabParID).find(".nameEmp").val();
					  //alert("tabParID: "+tabParID);
					   var go_path = "Employee_Switch_Person.php?action=EmpProjNames&vars=1&var1="+nameID; 
						$.get(go_path,
						{ 
						}, function(data)
						{
							//alert (data);
							//$("#chk").val(go_path);
							var get_data = new Array();     // declare array 
							var get_data = data.split('----//------'); // get_data is data comming from php file
						  
						  //$(".nameEmp").html(get_data[0]);  //employee name from employee table
						  //Only show assign projects
						  if(tabParID == "tbChkAllowProj")
						 	 $("#"+tabParID).find(".ProjectName").html(get_data[1]);  // project name from project table
						  
						  
						  if(tabParID == "tbAllowProj")	// bc at the time switch we know the allow projects
						  {
							    $("#tbSwitchPerson").find(".nameEmp").val(nameID);
							  	$("#tbSwitchPerson").find('.ProjectName').html(get_data[1]); // hide for allowEmpProj list also 
						}
					}); 
				}
				 else
				 {
					
					  var nameID =  $("#"+tabParID).find(".nameEmp").val();
						//alert(nameID);
					   //alert ("nameID: "+nameID);
					   var go_path = "Employee_Switch_Person.php?action=GetProjName&vars=1&var1="+nameID;
					   $.get(go_path,
							{ 
							}, function(data)
							{
								 data = data.split( "----//------");
								//alert ("data.length: "+data[0]);
								if(data.length == 1)	// only return currenbt poject number
									$("#"+tabParID).find('.ProjectName').find('.dmProjName').val(data[0]); // hide due to change multiple location
								else // also refresh list of allow project selected person
								{
									//http://localhost/Employee_Switch_Persons/Employee_Switch_Person.php?action=GetProjName&vars=1&var1=2
									$("#"+tabParID).find('.ProjectName').find('.dmProjName').html(data[1]);
									$("#"+tabParID).find('.ProjectName').find('.dmProjName').val(data[0]);
								}
							}); 
					   
				 } //else
}


function RunningProjectsStatus()
{
	 var htmls ;
   var go_path = "Employee_Switch_Person.php?action=RunningProjectsStatus&vars=0"; 
    //var go_path = "Employee_Switch_Person.php?action=projStatus&vars=1&var1=1"; 
   $("#chk").val("");
   $("#chk").val(go_path);
        $.get(go_path,
        { 
        }, function(data)
        {
            //alert (data);
            var get_data_row = new Array();     // declare array 
            var get_data_row  = data.split('----//------');
            
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
               htmls = htmls+"<tr>";
               //alert ("row: "+get_data_row[i]);
               var get_data_col = new Array();
               get_data_col  = get_data_row[i].split(',');
               
               for(var j = 0; j<get_data_col.length ; j++)
               {
                  htmls = htmls+"<td>";
                  htmls = htmls + get_data_col[j];
                  htmls = htmls+"</td>";
               }
               htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
           // $("#chk").val(htmls);
            $("#projStatusTB").html(htmls);
        });   
}

function getpermissions()
{
	  var go_path = "Employee_Switch_Person.php?action=getPermissions&vars=0";
	   $.get(go_path,
			{ 
			}, function(data)
			{
				 $("#chk").val(go_path);
			});
}



function testing()
{
		
	var a  = "http://www.abc.com/search".hostname;
	alert ("a: "+location.host);

	//----------------------------------------------------------------------------
	  var go_path = "Employee_Switch_Person.php?action=testing&vars=0";
	   $("#chk").val(go_path);
	   $.get(go_path,
			{ 
			}, function(data)
			{
				$("#chk").val(data);
			});
}

//function ProjectsPreDays()


function getPerDay()
{
	
	//var tabParID = $(this).closest('table').attr('id');
	var tabParID = "tbPerPersonDays";
	 var nameID =  $("#"+tabParID).find(".nameEmp").val();
	 var projID = $("#"+tabParID).find('.ProjectName').find('.dmProjName').val();
	// alert ("tabParID: "+tabParID);
	  var go_path = "Employee_Switch_Person.php?action=GetPerDay&vars=2&var1="+nameID+"&var2="+projID;
	   $("#chk").val(go_path);
	   
	   $.get(go_path,
			{ 
			}, function(data)
			{
				//alert (data);
				
				var get_data_row = new Array();     // declare array 
				var get_data_row  = data.split('----//------');
				
				htmls = "<table border=1>";
				for(var i = 0; i<get_data_row.length; i++ )
				{
				   htmls = htmls+"<tr>";
				   //alert ("row: "+get_data_row[i]);
				   var get_data_col = new Array();
				   get_data_col  = get_data_row[i].split(',');
				   
				   for(var j = 0; j<get_data_col.length ; j++)
				   {
					  htmls = htmls+"<td>";
					  htmls = htmls + get_data_col[j];
					  htmls = htmls+"</td>";
				   }
				   htmls = htmls+"</tr>";
				}
				htmls = htmls + "</table>";
			   // $("#chk").val(htmls);
				$("#ProjectsDaysInfo").html(htmls);
            
				
        }); 
	   
	 
}

function allAandFinishProjects()
{
	var go_path = "Employee_Switch_Person.php?action=allAandFinishProjects&vars=0";
	 $.get(go_path,
        { 
        }, function(data)
        {
            
          $("#tbPerPersonDays").find('.ProjectName').html(data);
		  $("#tbPreProjDays").find('.ProjectName').html(data);
            
        }); 
	
}
function allUnFinishProject()
{
   var go_path = "Employee_Switch_Person.php?action=allUnFinishProject&vars=0";
   $.get(go_path,
        { 
        }, function(data)
        {
            //alert (data);
          $("#tbUpdProj").find('.ProjectName').html(data);
            
        });   
}

//if (isset($_GET[action])){ //set in php file
//function SwitchEmp()

function projStatus()
{
   //var projStatusID = $("select#projStatus").val();tbprojStatus
   var projStatusID = $("#tbprojStatus").find('.projStatus').val();
   //alert ("projStatusID :"+projStatusID );
   var htmls ;
   var go_path = "Employee_Switch_Person.php?action=projStatus&vars=1&var1="+projStatusID; 
        $.get(go_path,
        { 
        }, function(data)
        {
            //alert (data);
            var get_data_row = new Array();     // declare array 
            var get_data_row  = data.split('----//------');
            
            htmls = "<table border=1>";
            for(var i = 0; i<get_data_row.length; i++ )
            {
               htmls = htmls+"<tr>";
               //alert ("row: "+get_data_row[i]);
               var get_data_col = new Array();
               get_data_col  = get_data_row[i].split(',');
               
               for(var j = 0; j<get_data_col.length ; j++)
               {
                  htmls = htmls+"<td>";
                  htmls = htmls + get_data_col[j];
                  htmls = htmls+"</td>";
               }
               htmls = htmls+"</tr>";
            }
            htmls = htmls + "</table>";
           // $("#chk").val(htmls);
            $("#projStatusTB").html(htmls);
        });   
    //$("#chk").val(htmls);
    
    
}
function updateProjectInfo()//UnFinishProjName
{
   var projID = $("#tbUpdProj").find('.UnFinishProjName').val();
   var projStatusID = $("#tbUpdProj").find('.projStatus').val();
   //alert("projID "+projID );
   //alert("projStatusID "+projStatusID );
   
    var go_path = "Employee_Switch_Person.php?action=updateProjectInfo&vars=2&var1="+projID+"&var2="+projStatusID;
    $.get(go_path,
       { 
       }, function(data)
       {
         //$("#chk").val(data);
         updateProjectInfo();
      });
   
}


function whiteboardfn()
{
   var go_path = "Employee_Switch_Person.php?action=whiteboardfn&vars=0";
   $.get(go_path,
        { 
        }, function(data)
        {
            //alert (data);
           //$("#chk").val(data);
          $("#whiteboard").html(data);
		  createMissCells("whiteboard");
         //rowINTOcolumn();
         //TransposeTable("whiteboard");
        });
   
}
function createMissCells(tableid)
{
	
	var totalRow =  $("#"+tableid).find('tbody > tr').length;
	var highcol = 0;	//hight number of cells 
	var temp = 0;
	for(var i =0; i<totalRow; i++)
	{
		temp =  $("#"+tableid).find('tbody > tr:eq('+i+') td').length; // current number of cell in this rows
		//alert("temp1: "+temp);
		if( highcol < temp)
			highcol = temp;
		
	}	

	for(var row =0; row<totalRow; row++)
	{
		temp =  $("#"+tableid).find('tbody > tr:eq('+row+') td').length;
		//alert("temp1: "+temp);
		temp = highcol - temp;
		//alert("temp2: "+temp);
		for(var i =0; i<temp; i++)
		 $("#"+tableid).find('tbody > tr:eq('+row+')').append("<td></td>");	
	}
	rowINTOcolumn(tableid);
}
//----------------------------- table row into coloumn----------------------
function rowINTOcolumn(tableid)
{
   $("#"+tableid).each(function() {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function(){
            var i = 0;
            $(this).find("td").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                newrows[i].append($(this));
            });
        });
        $this.find("tr").remove();
        $.each(newrows, function(){
            $this.append(this);
        });
    });
}
function TransposeTable(tableId)
{        
    var tbl = $('#' + tableId);
    var tbody = tbl.find('tbody');
    var oldWidth = tbody.find('tr:first td').length;
    var oldHeight = tbody.find('tr').length;
    var newWidth = oldHeight;
    var newHeight = oldWidth;

    var jqOldCells = tbody.find('td');        

    var newTbody = $("<tbody></tbody>");
    for(var y=0; y<newHeight; y++)
    {
        var newRow = $("<tr></tr>");
        for(var x=0; x<newWidth; x++)
        {
            newRow.append(jqOldCells.eq((oldWidth*x)+y));
        }
        newTbody.append(newRow);
    }

    tbody.replaceWith(newTbody);        
}
//--------------------------------------------------------------------------------

function test()
{
   //var projID = $("#tbSwitchPerson.ProjectName.dmProjName").val();
   var projID = $("#tbSwitchPerson").find('.ProjectName').find('.dmProjName').val();
   alert("projID "+projID );
}
function projStatusClear()
{
   $("#projStatusTB").html('');
}

function refreshPage()
{
   location.reload();
}


