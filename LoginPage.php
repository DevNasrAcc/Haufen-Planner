<?php
session_start();
if (isset($_COOKIE["userID"]))
    Header("Location: ModelerPage.php");
?>
<!DOCTYPE HTML>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>PMS - Login</title>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css"/>
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap-theme.css"/>
    <link rel="stylesheet" href="bootstrap3.3.4/custom.css"/>
    <link rel="stylesheet" href="css/loginPage.css"/>
    <script type="text/javascript" src="jquery-1.9.1.js"></script>
    <script type="text/javascript" src="js/aes.js"></script>
    <script type="text/javascript" src="login.js"></script>
</head>

<body class="container bg-primary form-center" onload="onLoadLogin()">

<?php
include 'calculateHalf.php';
include 'logoutPage.php';

if (!isset($_COOKIE["userID"]))
{
    echo'

		 <div class="form-signin pagination-centered center_div">
		    <h4 class="form-signin-heading text-center text-primary">Please Sign In </h4>
		    <label for="inputEmail" class="sr-only">Login Name</label>
		    <input class="form-control" type="text" name="loginID" id="loginID" placeholder="Username">
			<label for="inputPassword" class="sr-only" id="pw">Password</label>
			<input class="form-control" type="password" name="password" id="password" placeholder="Password" ></br>
			<input type="checkbox" id="rememberMeCheck" onclick="rememberMe()" />Remember Me';

    $half = calculateHalf();
    if($half > 2 )
        echo '<div>
			<div>Over Time</div>
			<div>
				<input type="radio" class="bg-info" name="overTime" value="Yes">Yes<br>
				<input type="radio" class="bg-info" name="overTime" value="Others" checked>No<br>
			</div>
		  </div>
		  <br>';

    echo '<button class="btn btn-lg btn-block btn-round text-white" type="submit" id="login_submit" onclick="login()">
            Login
          </button>
		</div>';

}
?>


</body>
</html>





<!--
				 $half = calculateHalf();
					if($half > 2)
					{
						$permision = mysql_fetch_assoc($result);
						$entryWb = $permision['Entry_WhiteBoard'];

						if($entryWb == 1)
						{
							if (confirm("Is this yours overtime "))
							{

								$continues = false;
							}
							else
							{
								//InsertLogInOutTime($pk,1); // this information must be create when try to be login
								return false;
							}
							//echo "use indirect link";	// provide by haris
						}

					}
-->