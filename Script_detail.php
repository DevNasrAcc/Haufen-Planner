<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
</head>

<body>

<div id="slider1">
 <div id="banner-slide1">

        <!-- start Basic Jquery Slider -->
        <ul class="bjqs">
          <li  onClick="slidechange()"><a href=""><img src="Slider/img/viewAlign_resize.gif"></a></li>
         <!-- <li><img src="Slider/img/banner02.jpg" title="Automatically generated caption"></li>-->
          <!--<li><img src="Slider/img/banner03.jpg" title="Automatically generated caption"></li>-->
		  <li  onClick="slidechange()"><img src="Slider/img/workingTransform.gif" ></li>
		  
        </ul>
        <!-- end Basic jQuery Slider -->

      </div>
      <!-- End outer wrapper -->
</div>

<br>
<div id="slider">
 <div id="banner-slide">

        <!-- start Basic Jquery Slider -->
        <ul class="bjqs">

		  
        </ul>
        <!-- end Basic jQuery Slider -->

      </div>
      <!-- End outer wrapper -->
</div>



</body>
</html>

<!--Slider -->

    <!-- bjqs.css contains the *essential* css needed for the slider to work -->
    <link rel="stylesheet" href="Slider/bjqs.css">

    <!-- some pretty fonts for this demo page - not required for the slider -->
    <link href='http://fonts.googleapis.com/css?family=Source+Code+Pro|Open+Sans:300' rel='stylesheet' type='text/css'> 

    <!-- demo.css contains additional styles used to set up this demo page - not required for the slider --> 
    <link rel="stylesheet" href="Slider/demo.css">

    <!-- load jQuery and the plugin -->
    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
   <script src="Slider/js/bjqs-1.3.min.js"></script>
      
	  
      <script class="secret-source">
        jQuery(document).ready(function($) {
          
          $('#banner-slide').bjqs({
            animtype      : 'slide',
            height        : 320,
            width         : 620,
            responsive    : true,
            randomstart   : true,
			
          });
		  
		    $('#banner-slide1').bjqs({
            animtype      : 'slide',
            height        : 320,
            width         : 480,
            responsive    : true,
            randomstart   : true,
			
          });
          
        });
      </script>
	  
	 <script type="text/javascript" src="jquery-1.9.1.js"></script>
<script type="text/javascript" src="Employee_Switch_Person.js"></script>

