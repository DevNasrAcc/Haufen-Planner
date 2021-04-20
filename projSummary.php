<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Project Descriptions</title>

<!--http://www.datatables.net/release-datatables/examples/basic_init/table_sorting.html
http://www.datatables.net/download/-->
<!--for sort table-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/sortTable/stupidtable.js?dev"></script>
<!--end for sort table-->



<!--  <script type="text/javascript" src="jquery-1.9.1.js"></script>-->
<script type="text/javascript" src="Employee_Switch_Person.js"></script>
  
  


<!--for sort table-->  
  
   <script>
    $jq(function(){
        // Helper function to convert a string of the form "Mar 15, 1987" into a Date object.
        var date_from_string = function(str) {
          var months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
          var pattern = "^([a-zA-Z]{3})\\s*(\\d{1,2}),\\s*(\\d{4})$";
          var re = new RegExp(pattern);
          var DateParts = re.exec(str).slice(1);

          var Year = DateParts[2];
          var Month = $jq.inArray(DateParts[0].toLowerCase(), months);
          var Day = DateParts[1];

          return new Date(Year, Month, Day);
        }

        var table = $jq("table").stupidtable({
          "date": function(a,b) {
            // Get these into date objects for comparison.
            aDate = date_from_string(a);
            bDate = date_from_string(b);
            return aDate - bDate;
          }
        });

        table.on("beforetablesort", function (event, data) {
          // Apply a "disabled" look to the table while sorting.
          // Using addClass for "testing" as it takes slightly longer to render.
          $jq("#msg").text("Sorting...");
          $jq("table").addClass("disabled");
        });

        table.on("aftertablesort", function (event, data) {
          // Reset loading message.
          $jq("#msg").html("&nbsp;");
          $jq("table").removeClass("disabled");

          var th = $jq(this).find("th");
          th.find(".arrow").remove();
          var dir = $jq.fn.stupidtable.dir;

          var arrow = data.direction === dir.ASC ? "&uarr;" : "&darr;";
          th.eq(data.column).append('<span class="arrow">' + arrow +'</span>');
        });
    });
  </script>


 <style type="text/css">
    body {
      font-family: "Ubuntu", "Trebuchet MS", sans-serif;
    }
    table {
      border-collapse: collapse;
      margin: 1em auto;
    }
    th, td {
      padding: 5px 10px;
      border: 1px solid #999;
      font-size: 12px;
    }
    th {
      background-color: #eee;
    }
    th[data-sort]{
      cursor:pointer;
    }

    /* just some random additional styles for a more real-world situation */
    #msg {
      color: #0a0;
      text-align: center;
    }
    td.name {
      font-weight: bold;
    }
    td.email {
      color: #666;
      text-decoration: underline;
    }
    /* zebra-striping seems to really slow down Opera sometimes */
    tr:nth-child(even) > td {
      background-color: #f9f9f7;
    }
    tr:nth-child(odd) > td {
      background-color: #ffffff;
    }
    .disabled {
      opacity: 0.5;
    }
  </style>
  
 <!--end for sort table-->
 </head>


<body>
<?php
include 'menu.php';
?>
<!--<table width="717" height="134" border="1">
  <tr>
    <td width="59">Projects</td>
    <td width="89">Assigned To</td>
    <td width="69">Start date</td>
    <td width="67">End Date</td>
    <td width="78">Toral Days</td>
    <td width="113">Remaining Days</td>
    <td width="153">Actual Working Days</td>
    <td width="37">Leave</td>
  </tr>
  
  
  
</table>-->


<div id="projStatusTB"></div>

<?php
	if($_COOKIE['permission_WhiteBoard'] == '1' )
 	include 'whiteboard.php';
?>

<?php 
if($_COOKIE["userDesig"] == 2 || $_COOKIE["userDesig"] == 4 )
include 'textarea.php'; 

?>		

</body>
</html>