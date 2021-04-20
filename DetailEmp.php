<!DOCTYPE html>
<html>
<head>
    <title>Emp Detail - PMS</title>
    <script type="text/javascript" src="jquery-1.9.1.js"></script>
    <link rel="shortcut icon" type="image/x-icon" href="img/Tll small.jpg" />
    <link rel="stylesheet" href="bootstrap3.3.4/bootstrap.css"/>
    <script type="text/javascript" src="login.js"></script>
    <script type="text/javascript" src="Employee_Switch_Person.js"></script>
</head>

<body class="container">
<?php
include 'menu.php';
?>
<h2>Employee Details</h2>
<p>Active/Deactive or set details about employees.</p><hr>
<?php
$id = $_GET["id"];
if(isset( $_GET["name"]))
    $name = $_GET["name"];

if(isset($name))
{
    echo '
	<table>
	<tr>
		<td>'.$name. '<button id="logoutThis" name="'.$id.'" onclick="logoutByOther()">Logout this User</button>
		</td>
	</tr>
	</table>';
}
else
{
    echo '<div id="logoutThis" name="'.$id.'">This person is Currently Logoff</div>';
}
?>


<div class="cnt" style="display: block;">
    <table  class="table table-bordered">
        <tr>
<!--            <td class="col-lg-1"></td>-->
            <td class = "col-lg-2">Other Member</td>
            <td class = "col-lg-3">
                <?php include 'modelerList.php';?>
                <button  type="text" id="detailOther">Detail</button>
            </td>
            <td class="invisible"><span class="text-info invisible "><small>Select details of a specific Employee<small></small></span></td>
        </tr>
        <tr>

        <tr>

            <td class="col-sm-2">Name</td>
            <td class="col-sm-2">
                <input type="text" name="textfield" id="name" class="form-control" />
            </td>

        </tr>
        <tr>

            <td>Login Name</td>
            <td>
                <input type="text" name="name" id="loginname" class="form-control" />

            </td>

        </tr>
        <tr>

            <td>Password</td>
            <td><button type="text" id="ResetPassword">Reset Password</button><div id="idverify"></div></td>
        </tr>
        <tr>

            <td>Department</td>
            <td><select name="dept" id="dept" class="form-control">
                    <option value="1">Admin</option>
                    <option value="2">Accounts</option>
                    <option value="3">Production</option>
                </select></td>

        </tr>

        <tr>
<!--            class="form-control"-->
            <td>Designation</td>
            <td  id="desig" ><select>
                    <option value="3">Modeler</option>
                </select></td>

        </tr>

        <tr>

            <td>Shift</td>
            <td>
                <select name="Shift" id="shift" class="form-control">
                    <option value="1">Day</option>
                    <option value="2">Night</option>

                </select>
            </td>
        </tr>


        <tr>

            <td>Dept Category</td>
            <td>
                <select name="Shift" id="dept_category" class="form-control">
                    <!-- <option value="1">Modeler</option>
                     <option value="2">Environment</option>-->

                </select>
            </td>

        </tr>
        <tr>

            <td>Login Permission</td>
            <td>
                <input type="checkbox" checked id="isActiveLogin" >Allow
            </td>

        </tr>
        <tr>

            <td><input type="submit" name="button" id="id_emp_resign_fire" value="Resign_Fire" onClick="fn_emp_resign_fire()" /></td>
            <td><div id="verify"><input type="submit" name="button" id="idSaveEmpDetail" value="Save Detail" /><div id="editverify"></div></div>

            </td>
        </tr>
    </table>
</div>


<?php
if($_SERVER['HTTP_HOST'] == 'localhost')
    include 'textarea.php';
?>
</body>
</html>