<?php

#region variables
include 'connect.php';
global $con;
global $db;
global $connPDO;
#endregion variables

include 'calculateHalf.php';

function httpGet($url)
{
    $ch = curl_init();
    // set url
    curl_setopt($ch, CURLOPT_URL,$url);
    //curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
    curl_setopt($ch,CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_exec($ch);
    curl_close($ch);
    // return $output;
}
function testing()
{
    echo (strpos("2015-02-23 00:00:00" , date("Y-m-d") ));
}

#region request Handle
if (isset($_GET["action"]))
{
    $funcName = $_GET["action"];    //return function name => get_folder_ele
    $vars	  = $_GET["vars"];    // return Path
    switch($vars)
    {
        case '0':
            //echo "here is 0 variable";
            $funcName();
            break;
        case '1':
            $var1 = $_GET["var1"];
            $funcName($var1);
            //echo "here is 1 variable";
            break;
        case '2':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $funcName($var1,$var2);
            //echo "here is 2 variable";
            break;
        case '3':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $funcName($var1,$var2,$var3);
            //echo "here is 2 variable";
            break;
        case '4':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $funcName($var1,$var2,$var3,$var4);
            //echo "here is 2 variable";
            break;
        case '5':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];

            $funcName($var1,$var2,$var3,$var4,$var5);
            //echo "here is 2 variable";
            break;
        case '6':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6);
            //echo "here is 2 variable";
            break;
        case '7':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7);
            //echo "here is 2 variable";
            break;
        case '8':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $var8 = $_GET["var8"];

            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7,$var8);
            //echo "here is 2 variable";
            break;
        case '9':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $var8 = $_GET["var8"];
            $var9 = $_GET["var9"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7,$var8,$var9);
            //echo "here is 2 variable";
            break;

        case '10':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $var8 = $_GET["var8"];
            $var9 = $_GET["var9"];
            $var10 = $_GET["var10"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7,$var8,$var9,$var10);
            //echo "here is 2 variable";
            break;

        case '12':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $var8 = $_GET["var8"];
            $var9 = $_GET["var9"];
            $var10 = $_GET["var10"];
            $var11 = $_GET["var11"];
            $var12 = $_GET["var12"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7,$var8,$var9,$var10,$var11,$var12);
            //echo "here is 2 variable";
            break;

        case '13':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $var8 = $_GET["var8"];
            $var9 = $_GET["var9"];
            $var10 = $_GET["var10"];
            $var11 = $_GET["var11"];
            $var12 = $_GET["var12"];
            $var13 = $_GET["var13"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7,$var8,$var9,$var10,$var11,$var12,$var13);
            //echo "here is 2 variable";
            break;
        case '18':
            $var1 = $_GET["var1"];
            $var2 = $_GET["var2"];
            $var3 = $_GET["var3"];
            $var4 = $_GET["var4"];
            $var5 = $_GET["var5"];
            $var6 = $_GET["var6"];
            $var7 = $_GET["var7"];
            $var8 = $_GET["var8"];
            $var9 = $_GET["var9"];
            $var10 = $_GET["var10"];
            $var11 = $_GET["var11"];
            $var12 = $_GET["var12"];
            $var13 = $_GET["var13"];
            $var14 = $_GET["var14"];
            $var15 = $_GET["var15"];
            $var16 = $_GET["var16"];
            $var17 = $_GET["var17"];
            $var18 = $_GET["var18"];
            $funcName($var1,$var2,$var3,$var4,$var5,$var6,$var7,$var8,$var9,$var10,$var11,$var12,$var13,$var14,$var15,$var16,$var17,$var18);
            //echo "here is 2 variable";
            break;
    }
    //$funcName($vars);

    unset($_GET["action"]);

}
#endregion request Handle

#region All Functions
function DetailEmpPgInfo()
{
    echo  department();
    echo "----//------";
    echo dept_category();
}
function MoveToLoginPage()
{
    echo '
		<script>

				//var $jq = jQuery.noConflict();
					 var go_path = "login.php?action=logout&vars=0";
			   $jq.get(go_path,
				{
				}, function(data)
				{
					//alert (data);
					// $("#chk").val(data);
					// location.reload();
					//alert("location.host: "+location.host); // localhost or 14.192.128.60
					window.location.replace("http://"+location.host+"/Employee_Switch_Persons/loginPage.php");

			});
				</script>';
}
function InactiveReturn()
{
    global $con;
    if(((isset($_COOKIE['userID']))))
    {
        $id =(int) $_COOKIE['userID'];

        //$sql = "SELECT `Active` FROM  `emp_curr_proj` WHERE  `ETPK` = $id ";
		$sql = "select * from (
			SELECT PK, EmployeeNamePK , PTPK FROM `switch_person` WHERE `EmployeeNamePK` = $id order by PK desc limit 1) as a

			left join 
			(select ETPK as ecp_etpk, Active from emp_curr_proj where  ETPK = $id order by ETPK limit  1) as ecp 
			on a.EmployeeNamePK = ecp.ecp_etpk";
        $result = mysql_query($sql,$con) or die(mysql_error());
        $row = mysql_fetch_assoc($result);
        $total_rows = mysql_num_rows($result); // total rows  emp_curr_proj table not contain manager records
        if( $total_rows == 1 && $row['Active'] == 1 &&  $row['PTPK'] != 0)
        {

        }
        else
        {
            if ($total_rows == 1 )
                MoveToLoginPage();
        }

    }
    else
    {
        MoveToLoginPage();
    }
}
function GetProjectStatusOptions()
{
    global $con;
    $sql = "select * from `project_status` " ;
    $result = mysql_query($sql,$con) or die(mysql_error());

    while($row = mysql_fetch_assoc($result))
    {
        echo $row['PK'];echo"`";
        echo $row['Status'];
        echo"----//------";
    }
}
function GetProject_ModeOptions($projectStatusId)
{
    global $con;
    $sql = "select * from `project_mode` where ProjectStatusId =".$projectStatusId ;
    $result = mysql_query($sql,$con) or die(mysql_error());

    while($row = mysql_fetch_assoc($result))
    {
        echo $row['PM_PK'];echo"`";
        echo $row['PM_Name'];
        echo"----//------";
    }
}
function fromRGB($R, $G, $B){

    $R=dechex($R);
    If (strlen($R)<2)
        $R='0'.$R;

    $G=dechex($G);
    If (strlen($G)<2)
        $G='0'.$G;

    $B=dechex($B);
    If (strlen($B)<2)
        $B='0'.$B;

    return '#' . $R . $G . $B;


}
function dateDifference($date)
{
    $date1=($date);
    $date2=(date("Y-m-d"));
    $seconds_diff = (strtotime($date1) - strtotime($date2));
    $diff =  floor($seconds_diff/3600/24);
    return $diff;
}
function DeadLineColor($date)
{
    ini_set('date.timezone', 'Asia/Karachi');
    $diff ;
    if 	($date == "")
    {
        $hex = fromRGB(255,255,0);
        return $hex;
    }
    else
    {
        $diff = dateDifference($date);
        //echo $diff;
        //return $diff;
    }
    $hex;
    switch (true) {
        case  $diff < 1:
            $hex = fromRGB(255,0,0);
            break;
        case  $diff < 4:
            $hex = fromRGB(255,124,124);

            break;
        case  $diff < 7:
            $hex = fromRGB(255,178,178);
            break;

        case $diff < 10:
            $hex = fromRGB(255,230,230);
            break;

        default:
            $hex = "";


    }

    return $hex;
}
function DeadLineFontColor($date)
{
    $diff = dateDifference($date);

    if ( $diff  < 1 )
        $hex = fromRGB(255,255,255);

    else if ( $diff < 8 )

    {
        $tmp = 0;//255 - (255/$diff);
        $hex = fromRGB($tmp,$tmp,$tmp);
    }



    else

        $hex = fromRGB(0,0,0);


    return $hex;

}

function ProjectStatus()
{
    global $con;
    $login = false;
    if (isset($_COOKIE["userID"]))
    {
        $login = true;
        $userID = $_COOKIE["userID"];
    }

    $sql = "SELECT projects.PK as PPK ,projects.Name, projects.`TeamLead`, employee.Employee_Name,projects.ProjProgress,
                   projects.ProgUpdateTime, projects.`Status` as StatusKey, project_status.Status as StatusKeyName ,
                   projects.StatusMode, project_mode.PM_Name as StatusModeName ,projects.ProjProgress ,projects.ModeComments,
                   projects.CommentsUpdateTime, projects.DeadLIneDate FROM `projects`
            left join project_mode
            on projects.StatusMode = project_mode.PM_PK
            left join project_status
            on projects.`Status` =  project_status.pk
            left join employee
            on projects.TeamLead = employee.pk
            where  (projects.`Status`= 4 or  projects.`Status`= 1 ) and projects.StatusMode <> 1
            and StatusMode = 2
            order by StatusMode";
    $result = mysql_query($sql,$con) or die(mysql_error());

    echo"----//------";
    $PerStatusRep = $_COOKIE["permission_StatusReport"] == 1 ? true : false;

    while($row = mysql_fetch_assoc($result))
    {
        if($PerStatusRep)		//0
            echo '<a href="statusreport.php?id='.$row['PPK'].'">'.$row['Name'].'</a>';
        else
            echo $row['Name'];

        echo"`";
        if ( (isset($userID)) && $userID == $row['TeamLead'] )
        {
            echo "<td class='thisTeamLead'>". $row['Employee_Name'];echo"`";		//1
        }
        else
        {
            echo "<td>".$row['Employee_Name'];echo"`";		//1
        }
        echo $row['ProjProgress'];echo"%`";		//2
        echo $row['ModeComments'];echo"`";	//3
        echo $row['StatusKeyName'];echo"`";//4
        echo $row['StatusModeName'];echo"`";//5
        echo $row['StatusKey'];echo"`";//6
        echo $row['StatusMode'];echo"`";//7
        echo $row['TeamLead'];echo"`";//8
        echo $row['CommentsUpdateTime'];echo"`";//9
        if($row['StatusMode'] == 2 || $row['StatusMode'] == 3 || $row['StatusMode'] == 4)
            echo '<td style="background-color:'.DeadLineColor($row['DeadLIneDate']).';">';
        else
            echo '<td>';
        if (isset($_COOKIE["userID"]) && ($userID == 33 || $userID == 3) )
        {
            if($row['DeadLIneDate'] == "")
                echo '<a href="EditProjects.php?ProjID='.$row['PPK'].'">Not Available</a>';
            elseif($row['StatusMode'] == 2 || $row['StatusMode'] == 3 || $row['StatusMode'] == 4)
                echo '<a href="EditProjects.php?ProjID='.$row['PPK'].'" ><font color="'.DeadLineFontColor($row['DeadLIneDate']).'">'.$row['DeadLIneDate'].'</font></a>';
            else
                echo '<a href="EditProjects.php?ProjID='.$row['PPK'].'"><font color="#000">'.$row['DeadLIneDate'].'</font></a>';


            echo"`";
        } //10
        else
        {
            if($row['DeadLIneDate'] == "")
                echo "Not Avaiable";
            else
                echo $row['DeadLIneDate'];//10

            echo"`";
        }
        if($login)
            echo "`".$row['ProgUpdateTime']; //11

        echo"----//------";
    }
}

function ProjectFeedbackFilter($quertyTypeName)
{
    global $con;
    $login = false;
    if (isset($_COOKIE["userID"]))
    {
        $login = true;
        $userID = $_COOKIE["userID"];
    }

    $sql = "SELECT projects.PK as PPK ,projects.Name, projects.`TeamLead`, employee.Employee_Name,projects.ProjProgress,
                   projects.ProgUpdateTime, projects.`Status` as StatusKey, project_status.Status as StatusKeyName ,
                   projects.StatusMode, project_mode.PM_Name as StatusModeName ,projects.ProjProgress ,projects.ModeComments,
                   projects.CommentsUpdateTime, projects.DeadLIneDate, projects.LastStatusChangeDate FROM `projects`
                   left join project_mode
                   on projects.StatusMode = project_mode.PM_PK
                   left join project_status
                   on projects.`Status` =  project_status.pk
                   left join employee
                   on projects.TeamLead = employee.pk
                   where  (projects.`Status`= 4 or  projects.`Status`= 1 ) and projects.StatusMode <> 1 ";
    if($quertyTypeName == "Feedback"){
                   $sql = $sql." and StatusMode = 5";
    }
    else if($quertyTypeName == "Question"){
        $sql = $sql." and StatusMode = 3";
    }
    else if($quertyTypeName == "LowPriority"){
        $sql = $sql." and StatusMode = 4";
    }

    $sql = $sql."  order by projects.LastStatusChangeDate DESC";
    $result = mysql_query($sql,$con) or die(mysql_error());

    echo"----//------";
    $PerStatusRep = $_COOKIE["permission_StatusReport"] == 1 ? true : false;

    while($row = mysql_fetch_assoc($result))
    {
        if($PerStatusRep)		//0
            echo '<a href="statusreport.php?id='.$row['PPK'].'">'.$row['Name'].'</a>';
        else
            echo $row['Name'];

        echo"`";
        if ( (isset($userID)) && $userID == $row['TeamLead'] )
        {
            echo "<td class='thisTeamLead'>". $row['Employee_Name'];echo"`";		//1
        }
        else
        {
            echo "<td>".$row['Employee_Name'];echo"`";		//1
        }
        echo $row['ProjProgress'];echo"%`";		//2
        echo $row['ModeComments'];echo"`";	//3
        echo $row['StatusKeyName'];echo"`";//4
        echo $row['StatusModeName'];echo"`";//5
        echo $row['StatusKey'];echo"`";//6
        echo $row['StatusMode'];echo"`";//7
        echo $row['TeamLead'];echo"`";//8
        echo $row['CommentsUpdateTime'];echo"`";//9


        if($row['StatusMode'] == 2 || $row['StatusMode'] == 3 || $row['StatusMode'] == 4)
            echo '<td style="background-color:'.DeadLineColor($row['DeadLIneDate']).';">';
        else
            echo '<td>';
        if (isset($_COOKIE["userID"]) && ($userID == 33 || $userID == 3) )
        {
            if($row['DeadLIneDate'] == "")
                echo '<a href="EditProjects.php?ProjID='.$row['PPK'].'">Not Available</a>';
            elseif($row['StatusMode'] == 2 || $row['StatusMode'] == 3 || $row['StatusMode'] == 4)
                echo '<a href="EditProjects.php?ProjID='.$row['PPK'].'" ><font color="'.DeadLineFontColor($row['DeadLIneDate']).'">'.$row['DeadLIneDate'].'</font></a>';
            else
                echo '<a href="EditProjects.php?ProjID='.$row['PPK'].'"><font color="#000">'.$row['DeadLIneDate'].'</font></a>';
            echo"`";
        } //10
        else
        {
            if($row['DeadLIneDate'] == "")
                echo "Not Avaiable";
            else
                echo $row['DeadLIneDate'];//10

            echo"`";
        }
        if($login)
            echo "`".$row['ProgUpdateTime']; //11

        echo "`".$row['LastStatusChangeDate'];//13

        echo"----//------";
    }
}
function ProjectStatusEdit() // some change feom ProjectStatus() ie prject status
{
    global $con;
    if((isset($_COOKIE['userID']))   )
    {
        if( $_COOKIE['permission_Proj_StatusEdit'] == 0)
        {
            echo "Sorry You have no permission for further detail";
            return false;
        }
        else
            $pk =(int) $_COOKIE['userID'];

    }
    else
    {
        MoveToLoginPage();
        return false;
    }


    $sql = "SELECT projects.HOD ,  projects.TeamLead,  projects.PK as PPK ,projects.Name, projects.`TeamLead`, employee.Employee_Name,projects.ProjProgress, projects.`Status` as StatusKey, project_status.Status as StatusKeyName ,  projects.StatusMode, project_mode.PM_Name as StatusModeName ,projects.ProjProgress ,projects.ModeComments, projects.CommentsUpdateTime, permissionsinpage.Proj_StatusEdit FROM `projects`
            left join project_mode
            on projects.StatusMode = project_mode.PM_PK
            left join project_status
            on projects.`Status` =  project_status.pk
            left join employee
            on projects.TeamLead = employee.pk
            left join permissionsinpage
            on permissionsinpage.etpk = projects.TeamLead
            where  (projects.`Status`= 4 or  projects.`Status`= 1 ) and projects.StatusMode <> 1
            order by StatusMode";
    $result = mysql_query($sql,$con) or die(mysql_error());
// $table_name = mysql_field_table($result, 12, 1); ///get table name from field sql > permissionsinpage


    echo "ProjName,Supervisors,Progress,Further Description,Proj Status, Status Mode,Status Key,ModeKey,Lead ID,Permission";
    echo"----//------";
    while($row = mysql_fetch_assoc($result))
    {
        if ($pk ==  $row['HOD'] || $pk ==  $row['TeamLead'] ||  $pk == 3)  //4: Coder Designarion
        {
            echo $row['Name'];echo"`";
            echo $row['Employee_Name'];echo"`";
            echo "<p id='Prog_".$row['PPK']."' contenteditable='true'>". $row['ProjProgress']."</p>";echo"`";
            echo "<p id='p_".$row['PPK']."' contenteditable='true'>". $row['ModeComments']." </p>" ;echo"`";
            echo $row['StatusKeyName'];echo"`";
            echo $row['StatusModeName'];echo"`";
            echo $row['StatusKey'];echo"`";
            echo $row['StatusMode'];echo"`";
            echo $row['TeamLead'];echo"`";
            echo $row['Proj_StatusEdit'];echo"`";
            //echo $row['CommentsUpdateTime'];echo",";
            echo '<button id="ProjS_'.$row['PPK'].'" onclick="ProjectProgressSave(this.id)">Save</button>';echo"`";
            echo '<button id="S_'.$row['PPK'].'" onclick="ProjectionDescriptionSave(this.id)">Save</button>';
            echo"----//------";
        }
    }
}
function ProjectProgressSave($id,$progress)
{
    global $con;
    $userID = ($_COOKIE["userID"]);
    $pk = str_replace("ProjS_","" , $id);
    $progress = trim($progress," ");
    $progress = strip_tags($progress);

    if(intval($progress) > 100)
    {
        return false;
    }

    $sql = "select ProjProgress , ProgressBy, ProgUpdateTime from projects where pk = $pk";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $oldprogress = "";
    $projTime ;
    $lastupdateby;
    ini_set('date.timezone', 'Asia/Karachi');

    while($row = mysql_fetch_assoc($result))
    {

        $oldprogress=  $row['ProjProgress'];
        $projTime = $row['ProgUpdateTime'];
        $lastupdateby =  $row['ProgressBy'];
    }

    echo strpos($projTime , date("Y-m-d") ) ;

    if( $oldprogress == $progress)
        return false;


    if( (strpos($projTime , date("Y-m-d") )  === false  ))

    {
        echo "date not found";
        $sql = "INSERT INTO `ttl_employee_switch`.`project_progress_detial` (`PPD_PK`, `PPD_ProjID`, `PPD_Progress`, `PPD_DateTime`,PPD_UpdateBy) VALUES (NULL, '$pk', '". $oldprogress."', '".$projTime."',  '".$lastupdateby."'  );";
        echo $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());
    }
    else
        echo "date found";

    echo "update date ";
    $sql = "UPDATE  `ttl_employee_switch`.`projects` SET  `ProjProgress` =  '$progress',`ProgressBy` =  '$userID',  ProgUpdateTime = '".date("Y-m-d H:i:s")."'  WHERE  `projects`.`PK` =$pk ";

    $result = mysql_query($sql,$con) or die(mysql_error());


//    $sql = "UPDATE  `ttl_employee_switch`.`projects` SET  `ModeComments` =  '$comments', `CommentBy` =  '$userID' , CommentsUpdateTime = '".date("Y-m-d H:i:s")."'  WHERE  `projects`.`PK` =$pk ";
    $sql = "UPDATE  `ttl_employee_switch`.`projects` SET  CommentsUpdateTime = '".date("Y-m-d H:i:s")."'  WHERE  `projects`.`PK` =$pk ";

    $result = mysql_query($sql,$con) or die(mysql_error());


}
function ProjectionDescriptionSave($id,$comments)
{
    global $con;
    $userID = ($_COOKIE["userID"]);
    $comments = trim($comments," ");
    $comments  = str_replace("<div>","<br>",$comments );
    $comments = strip_tags($comments, '<br>');
    $pk = str_replace("S_","" , $id);
    $sql = "select ModeComments, CommentBy, CommentsUpdateTime from projects where pk = $pk";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $oldComments = "";
    $oldTime = "";
    $oldupdateby = "";
    ini_set('date.timezone', 'Asia/Karachi');
    while($row = mysql_fetch_assoc($result))
    {

        $oldComments =  $row['ModeComments'];
        $oldTime =  $row['CommentsUpdateTime'];
        $oldupdateby =  $row['CommentBy'];

    }

    if( $oldComments == $comments)
        return false;


    if( (strpos($oldTime , date("Y-m-d") )  === false  ))
    {
        $sql = "INSERT INTO `ttl_employee_switch`.`oldprojmodecomments` (`opm_pk`, `olm_projID`, `opm_OldComments`, `opm_timedate`,opm_updateBy) VALUES (NULL, '$pk', '". $oldComments."', '".$oldTime."', '".$oldupdateby."');";
        $result = mysql_query($sql,$con) or die(mysql_error());
    }

    $sql = "UPDATE  `ttl_employee_switch`.`projects` SET  `ModeComments` =  '$comments', `CommentBy` =  '$userID' , CommentsUpdateTime = '".date("Y-m-d H:i:s")."'  WHERE  `projects`.`PK` =$pk ";

    $result = mysql_query($sql,$con) or die(mysql_error());


}
function dept_category()
{
    global $con;
    $sql = "SELECT `PK`,`Category_Name` FROM `dept_category`"; // get all project name
    $result = mysql_query($sql,$con) or die(mysql_error());

    $no_result = mysql_num_rows($result);
    $return_tmp = "";
    $return_tmp = $return_tmp."<select class='desigName'>";

    for ($i=0;$i<=$no_result-1;$i++)
    {
        $return_tmp = $return_tmp. "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
        //echo "<p>".mysql_result($result,$i,1)."</p>";
    }
    $return_tmp = $return_tmp. "</select>";

    return $return_tmp;
}
function department()
{
    global $con;
    $sql = "SELECT `PK`,`department` FROM `department`"; // get all project name
    $result = mysql_query($sql,$con) or die(mysql_error());

    $no_result = mysql_num_rows($result);
    $return_tmp = "";
    $return_tmp = $return_tmp. "<select class='desigName'>";

    for ($i=0;$i<=$no_result-1;$i++)
    {
        $return_tmp = $return_tmp."<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
        //echo "<p>".mysql_result($result,$i,1)."</p>";
    }
    $return_tmp = $return_tmp. "</select>";
    return $return_tmp;
}
function DepartmentName()
{
    echo department();
}
function disable_emp_emp_curr_proj($pk)
{
    global $con;

//	$sql = "UPDATE  `emp_curr_proj`  SET  `emp_curr_proj`.`PTPK` =  Null , `Active` =  Null	WHERE `emp_curr_proj`.`ETPK` =$pk		";
    $sql = "DELETE FROM `ttl_employee_switch`.`emp_curr_proj` WHERE `emp_curr_proj`.`ETPK` = $pk;";
    //Delete FROM `switch_person` where  `EmployeeNamePK` = $pk and `SwitchDate` = '2014-07-22' and `Half` = 1;
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function fn_emp_joining($pk)
{
    global $con;
    $sql = "SELECT * FROM `permissionsinpage` where `ETPK` =$pk";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        if($row['Entry_WhiteBoard'] == '1')
            Entry_WhiteBoard_Allow($ETPK);
    }


    $sql = "UPDATE   `employee` SET
			 `employee`.`Active` = '1'
			WHERE `employee`.`PK` = $pk" ;
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function fn_emp_resign_fire($pk)
{
    global $con;

    disable_emp_emp_curr_proj($pk);
    removeRcd_switch_person($pk);

    $sql = "UPDATE   `employee` SET
			 `employee`.`Active` = '0'
			WHERE `employee`.`PK` = $pk" ;
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function AddPerson($name,$logname,$pass,$dept,$desig)
{
    $logname = strtolower($logname);

    global $con;

    $addby = $pk =(int) $_COOKIE['userID'];

    $sql = "INSERT INTO `employee` ( `Cost_Department`, `Employee_Name`, `Designation`, `loginID`, `password`,`add_by`) VALUES ( $dept,'$name',$desig ,'$logname', '$pass',$addby)";

    $result = mysql_query($sql,$con) or die(mysql_error());

    $ETPK = mysql_insert_id(); //Getting the last added record

    if($result == 1){
        if($desig == '3')
        {
            //Adding new Employee Name in Current Project list
            Add_Emp_IN_emp_curr_proj($ETPK);
        }

        //Adding permission for new Employee
        $sql = "INSERT INTO `permissionsinpage` (  `ETPK`, `switch`, `AllowProjects`, `VerifyAllowProjects`, `WhiteBoard`, `ChkEmpProjDays`,`ChkProjDays`) VALUES ( $ETPK,0,0,0,1,0,0)";

        $result = mysql_query($sql,$con) or die(mysql_error());
        if($result == 1){
            echo "New Employee Added Succesfully with permissions.";
        }
        else{
            echo "New Employee added successfully but error occur when creating his permissions : ". $result ;
        }

    }
    else{
        echo "Error occur when adding Employee:: ".$result ;
    }
}
function ProjectTaskAdd($taskName){
    global $con;
    $sql = "INSERT INTO `emp_project_task_list` (taskName) VALUES ($taskName)";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
function projectTaskUpdate($id, $taskName){
    global $con;

    //  $sql = "UPDATE  `employee` SET
//`password` =  '1234'
//WHERE `PK` =$pk";
    //echo $sql;
    //$result = mysql_query($sql,$con) or die(mysql_error());
    $sql = "UPDATE `emp_project_task_list` SET  `taskName` = $taskName WHERE `pk` = $id";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;

}
function getAllProjectTask(){
    global $connPDO;
    $sql = "SELECT * from emp_project_task_list";
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted ->setFetchMode(PDO::FETCH_ASSOC);
    $allProjectTasks = array();
    while($row = $queryExecuted->fetch()){
        $allProjectTasks[] = $row;
    }
    echo json_encode($allProjectTasks);
}
function AddProjectTaskForEmployee($empId, $projectId, $taskId, $assignDateTime, $assignBy){
    global $con;
    $sql = "INSERT INTO `emp_proj_task_assign` (empId, projId, taskId, assignDateTime, assignBy)
VALUES (".$_POST["employeeId"].",". $_POST["projectIdd"].",". $_POST["assignTaskId"].",'". $_POST["assignTaskDate"]."',". $_POST["assignById"].")";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
function getProjectTaskNames(){
    global $connPDO;
    $sql = "SELECT pk, taskName from emp_project_task_list";
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);
}
function ResetPassword($pk)
{
    global $con;
    $sql = "UPDATE  `employee` SET
`password` =  '1234'
WHERE `PK` =$pk";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function SaveEmpDetail($pk,$name, $loginname, $dept, $desig, $shiftMode, $dept_category, $isLoginActive)
{
    global $con;
    $userId = $_COOKIE["userID"];
    $sql =  "UPDATE  `employee`,`emp_curr_proj` SET
            `employee`.`Employee_Name` =  '$name',
            `employee`.`loginID` =  '$loginname',
            `employee`.`Active` =  $isLoginActive,
            `employee`.`Cost_Department` =  '$dept',
            `employee`.`Designation` =  '$desig',
            `employee`.`update_by` =  '$userId',
            `emp_curr_proj`.`Shift` =  '$shiftMode',
            `emp_curr_proj`.`dept_category` =  '$dept_category'
            WHERE `employee`.`PK` = $pk AND `emp_curr_proj`.`ETPK` = `employee`.`PK`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    if($result == 1){

        $sql = "UPDATE employee set Emp_Dept_Category = ".$dept_category." WHERE PK =".$pk;
        $result = mysql_query($sql,$con) or die(mysql_error());

        if($result == 1){

            $sql = "Update Employee SET Emp_Dept_Category ='$dept_category' where PK = '$pk'";
            $result = mysql_query($sql,$con) or die(mysql_error());

        }
    }
    echo $result;
}
function EditEmpDetail($pk)
{
    global $con;

    // $sql = "SELECT employee.PK, employee.Employee_Name, employee.loginID, employee.Cost_Department, employee.Designation, Shift,Dept_Category FROM employee  INNER JOIN emp_curr_proj ON emp_curr_proj.ETPK = $pk and emp_curr_proj.ETPK=employee.PK ";

    $sql = "SELECT employee.PK, employee.Employee_Name, employee.loginID, employee.Cost_Department, employee.Designation, Shift,Dept_Category, employee.Active FROM employee  left JOIN emp_curr_proj ON emp_curr_proj.ETPK = $pk and emp_curr_proj.ETPK=employee.PK
ORDER BY (PK= $pk)   DESC, RAND()
LIMIT 0 , 1";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    //echo ($no_result);
    $id = $_COOKIE["userID"];
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['Employee_Name'];echo",";
        echo $row['loginID'];echo",";
        echo $row['Cost_Department'];echo",";
        echo $row['Designation'];echo",";
        echo $row['Shift'];echo",";
        echo $row['Dept_Category'];echo",";
        echo $row['Active'];



    }

}
function vote_pollLastPK()
{
    global $con;
    $sql = "SELECT max(VPPK) as number FROM `vote_poll`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['number'];
    }
}
function Save_Vote($pkid, $optionsLen, $tf, $tfVal, $dinnerItemId)
{
    global $con;
    if(isset($_COOKIE['userID']))
    {
        $id =(int) $_COOKIE['userID'];
        $sql = "SELECT *  FROM `vote_poll_output` where `QuesNo` = $pkid and  `EmpPK` = $id ";
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result); // total rows
        if(	(	(int)($no_result)	) == 0	)	// Entery not found // new Entry
        {
            $tfArr = explode("_", $tf);
            $tfValArr = explode("_", $tfVal);
            for ($i = 1; $i <= $optionsLen; $i++)
            {
                echo 'time val '.$tfValArr[$i];
                $sql =   "INSERT INTO `vote_poll_output` (`VPOPPK`, `EmpPK`, `QuesNo`, `Option`, `Output`,`vote_Value`, `dinnerItemId`) VALUES (NULL, '$id', '$pkid',  '$i', '".$tfArr[$i]."', '".$tfValArr[$i]."',".$dinnerItemId.")";
                $result = mysql_query($sql,$con) or die(mysql_error());
            }
        }
        else
        {
            echo "Record Exist";
        }
    }
}
function Reset_Vote($pkid)
{
    global $con;
    if(isset($_COOKIE['userID']))
    {
        $id =(int) $_COOKIE['userID'];

        //$sql = "UPDATE  `ttl_employee_switch`.`vote_poll_output` SET  `Output` =  'false' WHERE  `vote_poll_output`.`EmpPK` = $id  and `vote_poll_output`.`QuesNo` = $pkid";
        $sql = "delete from  `ttl_employee_switch`.`vote_poll_output` WHERE  `vote_poll_output`.`EmpPK` = $id  and `vote_poll_output`.`QuesNo` = $pkid";
        echo $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());
    }
}
function Detail_Vote($pkid,$sortVoteBy, $askDate)
{
    //Get Active question date
    //$activeQuestDate = getActiveQuestionDate();
    global $con;
    //with only logged employee
    /*
    $sql = "select  Employee_Name, Projects,b.Option from
    (SELECT `ETPK`,`PTPK`,emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects FROM `emp_curr_proj`
    left join employee
    on employee.pk = emp_curr_proj.ETPK
    left join projects
    on projects.pk = emp_curr_proj.PTPK) as a
    left join
    (select vote_poll_output.Option,EmpPK, dinnerItemId from vote_poll_output where `QuesNo` =$pkid and `Output` = 'true')as b
    on a.ETPK = b.emppk
    where active = 1
    ORDER BY `$sortVoteBy` ASC";
    */
    //where active = 1 ORDER BY `$sortVoteBy` ASC";

    /*$sql = "
	select  Employee_Name, Projects,b.Option, b.dinnerItemId, c.dinnerName from
    (SELECT `ETPK`,`PTPK`,emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects FROM `emp_curr_proj`
    left join employee
    on employee.pk = emp_curr_proj.ETPK
    left join projects
    on projects.pk = emp_curr_proj.PTPK) as a
    left join
    (select vote_poll_output.Option,EmpPK, dinnerItemId from vote_poll_output where `QuesNo` =$pkid and `Output` = 'true')as b
    on a.ETPK = b.emppk
    left join
    (select dinnerId, dinnerName from dinnermenu) as c
    on b.dinnerItemId = c.dinnerId
    where active = 1 ORDER BY `$sortVoteBy` ASC";*/
    //echo $sql;
    //new sql with only present employee record show

    $sql = "select isSpecial from vote_poll where isSpecial = 1 and askDate = '$askDate' and active = 1";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $isSpecailQuestion = 0;
    while($row = mysql_fetch_assoc($result))
    {
        $isSpecailQuestion = $row;
    }
    if($isSpecailQuestion == 0){
        $sql = " SELECT  Employee_Name, Projects,b.Option, b.dinnerItemId, c.dinnerName, b.QuesNo, b.EmpPK, b.vote_Value from
                (SELECT emp_curr_proj.ETPK, emp_curr_proj.`PTPK`, emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects, EmpDaysStatusId FROM `emp_curr_proj`
                left join employee
                on employee.pk = emp_curr_proj.ETPK
                left join projects
                on projects.pk = emp_curr_proj.PTPK
                left join switch_person sp
                on sp.EmployeeNamePk = employee.pk
                where sp.SwitchDate = '$askDate'
                And sp.Half = 2
                ) as a
                left join
                (select vote_poll_output.Option, QuesNo, EmpPK, dinnerItemId, vote_Value from vote_poll_output where `QuesNo` =$pkid and `Output` = 'true')as b
                on a.ETPK = b.emppk
                left join
                (select dinnerId, dinnerName from dinnermenu) as c
                on b.dinnerItemId = c.dinnerId
                where a.EmpDaysStatusId = 1
                ORDER BY `$sortVoteBy` ASC";
        $result = mysql_query($sql,$con) or die(mysql_error());
        echo "<b>Name</b>,<b>Projects</b>,<b>Vote Selected</b>,<b>Delete</b>";
        echo"----//------";
        while($row = mysql_fetch_assoc($result))
        {
            if($row['Employee_Name'] !=null){
                echo $row['Employee_Name'];echo",";
                echo $row['Projects']; echo",";
                echo $row['vote_Value'];
                echo",";
                echo "<button type='button'  onClick='deleteUserVoteEntry(\"".$row['QuesNo']."--".$row['EmpPK']."\")'><span class='glyphicon glyphicon-trash'></span></button>";
                echo"----//------";
            }
        }
        echo"----//------";
    }
    else {
        getSpecialQuestions($pkid,$sortVoteBy, $askDate);
    }
}

function VoteNotEnterDetails($pkid,$askDate)
{
    $userId = $_COOKIE['userID'];
    global $con;
    $sql = "select isSpecial from vote_poll where isSpecial = 1 and askDate = '$askDate' and active = 1";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $isSpecailQuestion = 0;
    while($row = mysql_fetch_assoc($result))
    {
        $isSpecailQuestion = $row;
    }
    if($isSpecailQuestion == 0){
//        $sql = "
//   select * from (Select  Employee_Name, Projects, b.Option, b.dinnerItemId, c.dinnerName, b.QuesNo, b.EmpPK, b.vote_Value, a.pk, a.TeamLead from
//    (SELECT emp_curr_proj.ETPK, emp_curr_proj.`PTPK`, emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects,
//    EmpDaysStatusId,projects.pk, projects.TeamLead  FROM `emp_curr_proj`
//    left join employee
//    on employee.pk = emp_curr_proj.ETPK
//    left join projects
//    on projects.pk = emp_curr_proj.PTPK
//    left join switch_person sp
//	on sp.EmployeeNamePk = employee.pk
//    where sp.SwitchDate = '$askDate'
//    And sp.Half = 2
//    ) as a
//    left join
//    (select vote_poll_output.Option, QuesNo, EmpPK, dinnerItemId, vote_Value from vote_poll_output where `QuesNo` =$pkid and `Output` = 'true')as b
//    on a.ETPK = b.emppk
//    left join
//    (select dinnerId, dinnerName from dinnermenu) as c
//    on b.dinnerItemId = c.dinnerId
//    where a.EmpDaysStatusId = 1
//    ORDER BY Projects ASC) as mainQuery
//    where mainQuery.Option is  null
//and mainQuery.TeamLead = $userId";

        $sql = "
    select * from (Select  Employee_Name, Projects, b.Option, b.dinnerItemId, c.dinnerName, b.QuesNo, b.EmpPK, b.vote_Value, a.pk, a.TeamLead from
    (SELECT emp_curr_proj.ETPK, emp_curr_proj.`PTPK`, emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects, EmpDaysStatusId,projects.pk, projects.TeamLead  FROM `emp_curr_proj`
    left join employee
    on employee.pk = emp_curr_proj.ETPK
    left join projects
    on projects.pk = emp_curr_proj.PTPK
    left join switch_person sp
	on sp.EmployeeNamePk = employee.pk
    where sp.SwitchDate = '$askDate'
    And sp.Half = 2
    ) as a
    left join
    (select vote_poll_output.Option, QuesNo, EmpPK, dinnerItemId, vote_Value from vote_poll_output where `QuesNo` = $pkid and `Output` = 'true'
    )as b
    on a.ETPK = b.emppk
    left join
    (select dinnerId, dinnerName from dinnermenu) as c
    on b.dinnerItemId = c.dinnerId
    where a.EmpDaysStatusId = 1

	ORDER BY Projects ASC) as abc
where abc.Option is  null
and abc.TeamLead = $userId
";


        $result = mysql_query($sql,$con) or die(mysql_error());
        echo "<b>Name</b>,<b>Projects</b>";
        echo"----//------";
        while($row = mysql_fetch_assoc($result))
        {
            if($row['Employee_Name'] !=null){
                echo $row['Employee_Name'];
                echo",";
                echo $row['Projects'];
                echo"----//------";
            }
        }
        echo"----//------";
    }
}
function getSpecialQuestions($pkid,$sortVoteBy, $askDate){
    global $con;
    $sql = "select  Employee_Name, Projects,b.Option, b.dinnerItemId, b.QuesNo, b.EmpPK, b.vote_Value from
    (SELECT emp_curr_proj.ETPK, emp_curr_proj.`PTPK`, emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects, EmpDaysStatusId FROM `emp_curr_proj`
    left join employee
    on employee.pk = emp_curr_proj.ETPK
    left join projects
    on projects.pk = emp_curr_proj.PTPK
    left join switch_person sp
	on sp.EmployeeNamePk = employee.pk
    where sp.SwitchDate = '$askDate'
    and half = 2
    ) as a
    left join
    (select vote_poll_output.Option, QuesNo, EmpPK, dinnerItemId, vote_Value from vote_poll_output where `QuesNo` =$pkid and `Output` = 'true')as b
    on a.ETPK = b.emppk
    where a.EmpDaysStatusId = 1
	ORDER BY `$sortVoteBy` ASC";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo "<b>Name</b>,<b>Vote</b>,<b>Delete</b>";
    echo"----//------";
    while($row = mysql_fetch_assoc($result))
    {
        if($row['Employee_Name'] !=null){
            echo $row['Employee_Name'];echo",";
//            echo $row['Projects']; echo",";
//          echo $row['Option'];echo",";
            echo $row['vote_Value'];
            echo",";
            echo "<button type='button'  onClick='deleteUserVoteEntry(\"".$row['QuesNo']."--".$row['EmpPK']."\")'><span class='glyphicon glyphicon-trash'></span></button>";
            echo"----//------";
        }
    }
    echo"----//------";

}
function deleteUserVoteEntry($questId, $empId){
    global $connPDO;
//    Delete FROM `vote_poll_output`
//   where EmpPk =3
//    and QuesNo = 300
    $sql = "DELETE FROM vote_poll_output WHERE QuesNo = $questId AND EmpPk = $empId";
    //$sql = "DELETE vote_poll_output WHERE EmpPk = :questId AND QuesNo = :empId";

    $queryExecuted = $connPDO->prepare($sql);
    // $queryExecuted->bindParam(':questId',$questId,PDO::PARAM_INT);
    //$queryExecuted->bindParam(':empId',$empId,PDO::PARAM_INT);
    $a = $queryExecuted->execute();
    echo $a;
}
function getActiveQuestionDate(){
    global $connPDO;
    $sql =  "SELECT * FROM  `vote_poll` where Active = 1";
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);

    while($row = $queryExecuted->fetch()){
        $activeQuestDate = $row["askDate"];
    }
    echo $activeQuestDate;
}
function Detail_Vote_with_dinner($pkid, $sortVoteBy, $askDate)
{
    global $con;
    //Get Active question date
    //$activeQuestDate = getActiveQuestionDate();

    $sql = "
    select DISTINCT  * from
    (SELECT emp_curr_proj.`ETPK`,emp_curr_proj.`PTPK`,emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects, EmpDaysStatusId FROM `emp_curr_proj`
    left join employee
    on employee.pk = emp_curr_proj.ETPK
    left join projects
    on projects.pk = emp_curr_proj.PTPK
    left join switch_person sp
	on sp.EmployeeNamePk = employee.pk
    where sp.SwitchDate = '$askDate' and sp.Half <> 1 ) as a
    inner join
    (select vote_poll_output.Option,EmpPK, dinnerItemId, vote_Value from vote_poll_output where `QuesNo` = $pkid and `Output` = 'true'
    and vote_poll_output.Option > 3)as b
    on a.ETPK = b.emppk
    left join
    (select dinnerId, dinnerName from dinnermenu) as c
    on b.dinnerItemId = c.dinnerId
    where a.EmpDaysStatusId = 1
    ORDER BY `$sortVoteBy` ASC";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo "<b>Name</b>,<b>Projects</b>,<b>Vote Selected</b>,<b>Dinner Choice</b>";
    echo"----//------";
    while($row = mysql_fetch_assoc($result))
    {
        if($row['Employee_Name'] !=null){
            echo $row['Employee_Name'];echo",";
            echo $row['Projects']; echo",";
//            echo $row['Option'];echo",";
            echo $row['vote_Value'];echo",";
            echo $row['dinnerName'];
            echo"----//------";
        }
    }
    //echo"----//------";
    /*
    $sql = "
	select  Employee_Name, Projects,b.Option, b.dinnerItemId, c.dinnerName from
    (SELECT emp_curr_proj.`ETPK`,emp_curr_proj.`PTPK`,emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects, EmpDaysStatusId FROM `emp_curr_proj`
    left join employee
    on employee.pk = emp_curr_proj.ETPK
    left join projects
    on projects.pk = emp_curr_proj.PTPK
    left join switch_person sp
	on sp.EmployeeNamePk = employee.pk
    where sp.SwitchDate = '$askDate') as a
    inner join
    (select vote_poll_output.Option,EmpPK, dinnerItemId from vote_poll_output where `QuesNo` = $pkid and `Output` = 'true'
    and vote_poll_output.Option > 3)as b
    on a.ETPK = b.emppk
    left join
    (select dinnerId, dinnerName from dinnermenu) as c
    on b.dinnerItemId = c.dinnerId
    where a.EmpDaysStatusId = 1
    ORDER BY `$sortVoteBy` ASC";
    //where active = 1
    //ORDER BY `$sortVoteBy` ASC";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo "<b>Name</b>,<b>Projects</b>,<b>Options</b>,<b>Dinner Choice</b>";
    echo"----//------";
    while($row = mysql_fetch_assoc($result))
    {
        if($row['Employee_Name'] !=null){
            echo $row['Employee_Name'];echo",";
            echo $row['Projects']; echo",";
            echo $row['Option'];echo",";
            echo $row['dinnerName'];
            echo"----//------";
        }
    }
    echo"----//------";
    */
}
function votingQuestion()
{
    global $con;
    if(isset($_COOKIE['userID']))
    {
        $pkid =0;
        $sql = "SELECT * FROM `vote_poll` WHERE `active` = 1"; // get all active vote poll contents
        $result = mysql_query($sql,$con) or die(mysql_error());

        while($row = mysql_fetch_assoc($result))
        {
            $pkid = $row['VPPK'];
            echo $row['VPPK'];
            echo"----//------";
            echo $row['HTML'];

        }
        echo"----//------";

        $id =(int) $_COOKIE['userID'];
        $sql = "SELECT *  FROM `vote_poll_output` where `QuesNo` = $pkid and  `EmpPK` = $id and `Output` = 'true' ";
        //echo $sql;
        $resultOP = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($resultOP); // total rows

        if ($no_result > 0)
        {
            echo "false";
        }

        else
        {
            echo "true";
        }


        echo"----//------";
        // now print javascript
        while($row = mysql_fetch_assoc($resultOP))
        {
            // run javascript
            //echo "<script type='text/javascript' $"."jq('#VoteAns_".$row['QuesNo']."_".$row['Option']."').prop('checked', true) <//script>";
            echo "<script type='text/javascript'> votingValueTrue('VoteAns_".$row['QuesNo']."_".$row['Option']."'); </script>";
        }
        // SELECT `QuesNo`,`Option`, count(*) as total FROM vote_poll_output  WHERE  QuesNo= 2  and `Output` = 'true' GROUP BY `Option`;
        echo"----//------";
        $sql = "SELECT `QuesNo`,`Option`, count(*) as total FROM vote_poll_output  WHERE  QuesNo= $pkid and `Output` = 'true' GROUP BY `Option`";
        //echo $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());
        while($row = mysql_fetch_assoc($result))
        {
            // run javascript
            //echo "<script type='text/javascript' $"."jq('#VoteAns_".$row['QuesNo']."_".$row['Option']."').prop('checked', true) <//script>";
            echo "<script type='text/javascript'>  VoteAnsOP('VoteAnsOP_".$row['QuesNo']."_".$row['Option']."','".$row['total']."'); </script>";

        }
    }
}
function Submit_Question($ques, $html)
{
    global $con;
    $sql = "UPDATE `ttl_employee_switch`.`vote_poll` SET `Active` = '0' WHERE  `Active` = '1' ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $sql = "INSERT INTO `vote_poll` ( `Question`, `HTML`, `Active`) VALUES ( '$ques','$html', 1)";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function MarkTeamlead($pk,$is_teamlead)
{
    global $con;
    $sql = "UPDATE  `emp_curr_proj` SET
            `is_teamlead` = $is_teamlead
             WHERE  `emp_curr_proj`.`ETPK` =$pk";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function saveEditProjects($projNo,$hod,$tl,$about,$stdate,$deadDate,$projName)
{
    global $con;
    $originalDate = $stdate;// "2013-Oct-10";
    $stdate = date("Y-m-d", strtotime($originalDate));

    //echo $deadDate;
    if(trim($deadDate) != "NULL")
    {
        $originalDate = $deadDate;// "2013-Oct-10";
        $deadDate = date("Y-m-d", strtotime($originalDate));
    }
    else
        $deadDate = "NULL";

    $sql = "UPDATE  `projects` SET
            `Name` = '$projName',
            `About` =  '$about',
            `HOD` =  '$hod',
            `TeamLead` =  '$tl',
            `StartDate` =  '$stdate',
            `DeadLIneDate` = ";

    if($deadDate == "NULL")
        $sql = $sql." NULL";
    else
        $sql = $sql."'".$deadDate."'";
    $sql = $sql." WHERE  `projects`.`PK` =$projNo";

    echo $sql;

    $result = mysql_query($sql,$con) or die(mysql_error());
}
function getprojectDetail($projID)
{
    global $con;
    $sql = "SELECT `Name`, `HOD`,`TeamLead`,`StartDate`, `DeadLIneDate`,`About` FROM `projects` where `PK` = $projID"; // get all project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['HOD'];echo",";
        echo $row['TeamLead'];echo",";
        echo $row['About'];echo",";
        echo $row['StartDate'];echo",";
        echo $row['DeadLIneDate'];echo",";
        echo $row['Name'];
    }
}
function chkNewLoginName($loginName)
{
    global $con;
    $sql = "SELECT COUNT(*) FROM `employee` where `loginID` = '".$loginName."'";
    $result = mysql_query($sql,$con) or die(mysql_error());

    $total_rows = mysql_fetch_row($result);
    $rows = $total_rows[0]; // return total rows
    //echo "total_rows: $rows";
    if ($rows != 0)
    {
        echo "LoginName already in used";

    }

}
function designation()
{
    global $con;
    $sql = "SELECT `PK`,`Designation` FROM `designation`"; // get all project name
    $result = mysql_query($sql,$con) or die(mysql_error());

    $no_result = mysql_num_rows($result);
    $return_tmp = "";
    $return_tmp = $return_tmp. "<select class='desigName'>";

    for ($i=0;$i<=$no_result-1;$i++)
    {
        $return_tmp = $return_tmp. "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
    }
    $return_tmp = $return_tmp. "</select>";
    return $return_tmp;
}
function designationName()
{
    global $con;
    $sql = "SELECT `PK`,`Designation` FROM `designation`"; // get all project name
    $result = mysql_query($sql,$con) or die(mysql_error());

    $no_result = mysql_num_rows($result);
    $return_tmp = "";
    $return_tmp = $return_tmp. "<select class='desigName form-control'>";

    for ($i=0;$i<=$no_result-1;$i++)
    {
        $return_tmp = $return_tmp. "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
    }
    $return_tmp = $return_tmp. "</select>";
    echo $return_tmp;
}
function addProject($projName,$hod,$tl,$about,$stdate,$deadDate)
{
    global $con;
    ini_set('date.timezone', 'Asia/Karachi');
    $id =(int) $_COOKIE['userID'];
    $curDate = date('Y-m-d');

    $originalDate = $stdate;
    $stdate = date("Y-m-d", strtotime($originalDate));

    $originalDate = $deadDate;
    $deadDate = date("Y-m-d", strtotime($originalDate));

    $time = date('H:i:s');
    $sql = "INSERT INTO `ttl_employee_switch`.`projects` ( `Name`, `Time`, `Status`, `About`, `TeamLead`, `HOD`, `StartDate`, `DeadLIneDate`,  `Add Date`, `AddByPerson`)
													VALUES ( '$projName', '$time', '2', '$about', '$tl', '$hod', '$stdate', '$deadDate', '$curDate', '$id')";
    echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function getPermissions()
{
    $id =(int) $_COOKIE['userID'];
    global $con;
    $sql = "SELECT * FROM `permissionsinpage` where `ETPK` = $id "; //chk allow  project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    while($row = mysql_fetch_assoc($result))
    {
        setcookie ("permission_switch",  $row['switch']);
        setcookie ("permission_AllowProjects",  $row['AllowProjects']);
        setcookie ("permission_VerifyAllowProjects",  $row['VerifyAllowProjects']);
        setcookie ("permission_WhiteBoard",  $row['WhiteBoard']);
        setcookie ("permission_ChkEmpProjDays",  $row['ChkEmpProjDays']);
        setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
        setcookie ("permission_ChkProjDays",  $row['ChkProjDays']);
        setcookie ("permission_permissionPage",  $row['permissionPage']);
        setcookie ("permission_memberNames",  $row['MemberNames']);
        setcookie ("permission_MainMenuTop",  $row['MainMenuTop'] );
        setcookie ("permission_WhiteBoard_EmpDetail",  $row['WhiteBoard_EmpDetail'] );
        setcookie ("permission_Entry_WhiteBoard",  $row['Entry_WhiteBoard'] );
        setcookie ("permission_Proj_StatusEdit",  $row['Proj_StatusEdit'] );
        setcookie ("permission_StatusReport",  $row['Ger_StatusReport'] );

        echo " row['switch']: ". $row['switch'];
        echo "COOKIE['userID']: ".$_COOKIE['userID'];
        echo "COOKIE['permission_switch']: ".$_COOKIE['permission_switch'];
    }
}
function permission($a1,$a2,$a3,$a4,$a5,$a6,$a7,$a8,$a9,$a10,$a11,$a12,$a13,$a14,$a15,$a16,$a17,$a18)
{
    echo "agaya";
    if($a2 == 'true')
        $a2 = 1;
    else
        $a2 = 0;

    if($a3 == 'true')
        $a3 = 1;
    else
        $a3 = 0;

    if($a4 == 'true')
        $a4 = 1;
    else
        $a4 = 0;

    if($a5 == 'true')
        $a5 = 1;
    else
        $a5 = 0;

    if($a6 == 'true')
        $a6 = 1;
    else
        $a6 = 0;

    if($a7 == 'true')
        $a7 = 1;
    else
        $a7 = 0;

    if($a8 == 'true')
        $a8 = 1;
    else
        $a8 = 0;

    if($a9 == 'true')
        $a9 = 1;
    else
        $a9 = 0;

    if($a10 == 'true')
        $a10 = 1;
    else
        $a10 = 0;

    if($a11 == 'true')
        $a11 = 1;
    else
        $a11 = 0;

    if($a12 == 'true')
        $a12 = 1;
    else
        $a12 = 0;

    if($a13 == 'true')
        $a13 = 1;
    else
        $a13 = 0;

    if($a14 == 'true')
        $a14 = 1;
    else
        $a14 = 0;

    if($a15 == 'true')
        $a15 = 1;
    else
        $a15 = 0;

    if($a16 == 'true')
        $a16 = 1;
    else
        $a16 = 0;

    if($a17 == 'true')
        $a17 = 1;
    else
        $a17 = 0;

    if($a18 == 'true')
        $a18 = 1;
    else
        $a18 = 0;

    global $con;


    $sql = "UPDATE `permissionsinpage` SET   `switch` = $a2, `AllowProjects` = $a3,
     `VerifyAllowProjects` = $a4, `WhiteBoard` = $a5, `ChkEmpProjDays` = $a6,`ChkProjDays` = $a7,
     `permissionPage` = $a8 , `MemberNames` = $a9, `MainMenuTop` = $a10, `WhiteBoard_EmpDetail` = $a11,
      `Entry_WhiteBoard` = $a12, `Proj_StatusEdit` = $a13, `Ger_StatusReport` = $a14 , `SwitchRequest` = $a15 ,
      `GetSwitchRequest` = $a16,
      selfCategoryList = $a17,
       ProjectQuestionAnswer = $a18 where `ETPK` = $a1";
    echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo "permissionupdated code:". $result;
    if ($a12 == 1)
    {
        // Entry ehis emp in emp_curr_proj table
        Entry_WhiteBoard_Allow($a1);
    }
    else
    {
        disable_emp_emp_curr_proj($a1);
        removeRcd_switch_person($a1);
    }

}
function Entry_WhiteBoard_Allow($ETPK)
{
    Add_Emp_IN_emp_curr_proj($ETPK); //update
    AddRcd_switch_person($ETPK);
}
function AddRcd_switch_person($ETPK)
{
    global $con;
    $half = calculateHalf();
    $sql = "select * from `switch_person` where `SwitchDate` =  CURDATE() and   `EmployeeNamePK` = $ETPK and `Half` = $half ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $total_rows = mysql_num_rows($result);
    if($total_rows == 0)
    {
        mysql_query("INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `SwitchTime`, `Half`,`SwitchDate`) VALUES ('0',$ETPK,'00:00:00',$half, CURDATE())",$con);
    }
}
function removeRcd_switch_person($ETPK)
{
    global $con;
    $half = calculateHalf();
    $sql = "Delete FROM `ttl_employee_switch`.`switch_person` WHERE `switch_person`.`SwitchDate` =  CURDATE() and `Half` = $half and `EmployeeNamePK` =  $ETPK";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function Add_Emp_IN_emp_curr_proj($ETPK) // update else insert
{
    global $con;
    $sql = "select Count(*) from emp_curr_proj where ETPK = $ETPK";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $_rows0 = mysql_fetch_row($result);
    $var = $_rows0[0]; //total rows

    if($var == 0){
        $sql = "INSERT INTO `emp_curr_proj` ( `ETPK`, `PTPK`, `Active`,`is_teamlead`) VALUES ($ETPK, 4,0,0)"; // 4: free, 0: not avaiable
    //else
        //$sql = " Update emp_curr_proj set PTPK = 4,Active = 1, is_teamlead = 0, Shift = 1,Dept_Category = 1 where ETPK = $ETPK;";
    $result = mysql_query($sql,$con) or die(mysql_error());
    if($result != 1){
        echo "Error occur when adding new employee in Current Projects table : ".$result;
    }
    }
}
function permissionPage($id)
{
    global $con;
    $sql = "SELECT * FROM `permissionsinpage` where `ETPK` = $id "; //chk allow  project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows

    echo "ID,Name,Switch,MembersList, Self Category List, Allow Projects,Verify Proj,WhiteBoard,Chk Emp Proj Days, Chk Proj Days,Permissions,Main Menu,WhiteBoard_EmpDetail,Entry_WhiteBoard,Proj_StatusEdit,Ger_StatusReport, Switch_request, Get Switch Request, Project QuestionAnswer";
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $row['ETPK'];echo",";
        $name = GetEmpName($row['ETPK']);
        echo $name;echo",";
        echo '<input type="checkbox" id="switch"';
        if ($row['switch'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="MemberNames"';
        if ($row['MemberNames'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="selfCategoryList"';
        if( $row['selfCategoryList'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="AllowProjects"';
        if ($row['AllowProjects'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="VerifyAllowProjects"';
        if ($row['VerifyAllowProjects'] ==1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="WhiteBoard"';
        if($row['WhiteBoard'] ==1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="ChkEmpProjDays"';
        if( $row['ChkEmpProjDays'] ==1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="ChkProjDays"';
        if($row['ChkProjDays'] ==1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="permissionPage"';
        if( $row['permissionPage'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="MainMenuTop"';
        if( $row['MainMenuTop'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="WhiteBoard_EmpDetail"';
        if( $row['WhiteBoard_EmpDetail'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="Entry_WhiteBoard"';
        if( $row['Entry_WhiteBoard'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="Proj_StatusEdit"';
        if( $row['Proj_StatusEdit'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="Ger_StatusReport"';
        if( $row['Ger_StatusReport'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="RequestForSwitchEmployee"';
        if( $row['SwitchRequest'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="GetSwitchRequest"';
        if( $row['GetSwitchRequest'] == 1)
            echo "checked";
        echo">,";

        echo '<input type="checkbox" id="ProjectQuestionAnswer"';
        if( $row['ProjectQuestionAnswer'] == 1)
            echo "checked";
        echo">";
    }
}
function  hourCalc($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $temp = $date[0];
        $originalDate = $temp ;//"2013-Oct-10";
        $date[0] = date("Y-m-d", strtotime($originalDate));

        $temp = $date[1];
        $originalDate = $temp ;//"2013-Oct-10";
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }
    if(isset($date))
    {
        if($nameID !=0)
        {
            $sql = 	"SELECT  *
				FROM  `loginrecord`
				WHERE `userID` = $nameID and  `date` BETWEEN  '$date[0]' AND  '$date[1]'";
        }
        else
        {
            $sql = 	"SELECT  *
				FROM  `loginrecord`
				WHERE  `date` BETWEEN  '$date[0]' AND  '$date[1]'";
        }
    }

    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows

    $DbLogDtl = array();
    while($row = mysql_fetch_assoc($query))
    {
        // add each row returned into an array
        $DbLogDtl[] = $row;
        // OR just echo the data:
        echo "----//------";
        echo $row['Date']; // etc
    }
}
function lastEntry($nameID, $dateRng)
{
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);

    $Emp_NameArr =array();

    $Emp_NameArr[0] = "Dummy index";

    $sql= "select PK , `Employee_Name` from `employee`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $Emp_NameArr[$row['PK']] = $row['Employee_Name'];
    }


    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $temp = $date[0];
        $originalDate = $temp ;//"2013-Oct-10";
        $date[0] = date("Y-m-d", strtotime($originalDate));

        $temp = $date[1];
        $originalDate = $temp ;//"2013-Oct-10";
        $date[1] = date("Y-m-d", strtotime($originalDate));

    }

    if(isset($date))
    {
        if($nameID !=0)
        {

            echo "<b>PK</b>,<b>User name<b>,<b>date<b>,<b>Time,<b>Half</b>,<b>InOut</b>,<b>IP</b>,<b>OP by</b>";
            echo "----//------<b>-</b>,<b>-<b>,<b>-<b>,<b>,<b> -</b>,<b>-</b>,<b>-</b>,<b>-</b>";

            while( $date[0] <= $date[1])
            {
                $sql = "SELECT `PK`,`userID`,`Date`,`Time`, `Half` , `InOut`, `IP`, `Op_UserID`
                 FROM `loginrecord`
                 WHERE (date  = '$date[0]')and   userID = $nameID order by pk desc LIMIT  1";
                $result = mysql_query($sql,$con) or die(mysql_error());
                $no_result = mysql_num_rows($result); // total rows


                while($row = mysql_fetch_assoc($result))
                {
                    if($row['PK'] != null)
                    {
                        echo "----//------";
                        echo $row['PK'];echo",";
                        $name = $Emp_NameArr[$row['userID']];
                        echo $row['userID']."_".$name;
                        echo",";
                        $temp = $row['Date'];
                        $originalDate = $temp ;//"2013-Oct-10";
                        $deadDate = date("d-M-Y", strtotime($originalDate));
                        echo $deadDate;echo",";
                        echo $row['Time'];echo",";
                        echo $row['Half'];echo",";
                        echo $row['InOut'];echo",";
                        echo long2ip($row['IP']);echo",";
                        $name = $Emp_NameArr[$row['Op_UserID']];
                        echo $name;
                    }
                }
                $date[0] = new DateTime($date[0]);
                $date[0]->modify('+1 day');
                $date[0] =  $date[0]->format('Y-m-d');
                echo "----//------<b>-</b>,<b>-<b>,<b>-<b>,<b>,<b> -</b>,<b>-</b>,<b>-</b>,<b>-</b>";
            }

            echo "----//------<b>Total Rows</b>,<b>$no_result<b>,<b>- <b>,<b>,<b> -</b>";
        }
        else
        {
            echo "<b>PK</b>,<b>User name<b>,<b>date<b>,<b>Time,<b>Half</b>,<b>InOut</b>,<b>IP</b>,<b>OP by</b>";
            echo "----//------<b>-</b>,<b>-<b>,<b>-<b>,<b>,<b>-</b>,<b>-</b>,<b>-</b>,<b>-</b>";
            while( $date[0] <= $date[1])
            {
                $count = 1;
                for ($i = 1; $i< count($Emp_NameArr) ; $i++ )
                {
                    $sql = "SELECT `PK`,`userID`,`Date`,`Time`, `Half` , `InOut`, `IP`, `Op_UserID`
					FROM `loginrecord`
					WHERE (date  = '$date[0]')and  userID = $i order by pk desc LIMIT  1";
                    $result = mysql_query($sql,$con) or die(mysql_error());
                    $no_result = mysql_num_rows($result); // total rows
                    while($row = mysql_fetch_assoc($result))
                    {
                        if($row['PK'] != null)
                        {
                            echo "----//------";
                            //echo $row['PK'];echo",";
                            echo $count;echo",";
                            $count = $count + 1;

                            $name = GetEmpName($row['userID']);
                            //$name = $Emp_NameArr[$row['userID']];
                            echo $name;echo",";

                            $temp = $row['Date'];
                            $originalDate = $temp ;//"2013-Oct-10";
                            $deadDate = date("d-M-Y", strtotime($originalDate));
                            echo $deadDate;echo",";
                            echo $row['Time'];echo",";
                            echo $row['Half'];echo",";
                            echo $row['InOut'];echo",";
                            echo long2ip($row['IP']);echo",";
                            $name = $Emp_NameArr[$row['Op_UserID']];
                            echo $name;
                        }
                    }
                }
                $date[0] = new DateTime($date[0]);
                $date[0]->modify('+1 day');
                $date[0] =  $date[0]->format('Y-m-d');
                echo "----//------<b>-</b>,<b>-<b>,<b>-<b>,<b>,<b>-</b>,<b>-</b>,<b>-</b>,<b>-</b>";
                $count = 1;
            }
        }
    }

    else
    {
    }
}
function logindetail($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $temp = $date[0];
        $originalDate = $temp ;//"2013-Oct-10";
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $temp = $date[1];
        $originalDate = $temp ;//"2013-Oct-10";
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }

    if(isset($date))
    {
        if($nameID !=0)
        {
            $sql = 	"SELECT  *
				FROM  `loginrecord`
				WHERE `userID` = $nameID and  `date` BETWEEN  '$date[0]' AND  '$date[1]'";
        }
        else
        {
            $sql = 	"SELECT  *
				FROM  `loginrecord`
				WHERE  `date` BETWEEN  '$date[0]' AND  '$date[1]'";
        }
    }
    else
        if($nameID != 0)
            $sql = "SELECT * FROM `loginrecord` where   `userID` = $nameID "; //chk allow  project name
        else
            $sql = "SELECT * FROM `loginrecord` "; //chk allow  project name

    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows

    echo "<b>PK</b>,<b>User name<b>,<b>date<b>,<b>Time,<b>Half</b>,<b>InOut</b>,<b>IP</b>,<b>OP by</b>,<b>About</b>";
    echo "----//------<b>-</b>,<b> -<b>,<b>- <b>,<b>,<b> -</b>,<b> -</b>,<b> -</b>,<b> -</b>";
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $row['PK'];echo",";

        $name = GetEmpName($row['userID']);
        echo $name;echo",";

        $temp = $row['Date'];
        $originalDate = $temp ;//"2013-Oct-10";
        $deadDate = date("d-M-Y", strtotime($originalDate));
        echo $deadDate;echo",";
        echo $row['Time'];echo",";
        echo $row['Half'];echo",";
        echo $row['InOut'];echo",";
        echo long2ip($row['IP']);echo",";
        $name = GetEmpName($row['Op_UserID']);
        echo $name;
        echo",";
        echo $row['About'];
    }
    echo "----//------<b>Total Rows</b>,<b>$no_result<b>,<b>- <b>,<b>,<b> -</b>";
}
function ProjectsPreDays($projID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }

    if(isset($date))
    {
        $sql = 	"SELECT sp.PTPK, sp.EmployeeNamePK, sp.SwitchTime, sp.Half, sp.SwitchDate, emp.Emp_Dept_Category, dpt.Category_Name FROM `switch_person` sp
                inner join  employee emp
                ON sp.EmployeeNamePK = emp.PK
                INNER JOIN dept_category dpt
                ON dpt.PK = emp.Emp_Dept_Category
		WHERE `PTPK` = $projID and  `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]'";
    }

    else
        $sql = "SELECT sp.PTPK, sp.EmployeeNamePK, sp.SwitchTime, sp.Half, sp.SwitchDate, emp.Emp_Dept_Category, dpt.Category_Name FROM `switch_person` sp
                inner join  employee emp
                ON sp.EmployeeNamePK = emp.PK
                INNER JOIN dept_category dpt
                ON dpt.PK = emp.Emp_Dept_Category
                where   `PTPK` = $projID "; //chk allow  project name

    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    echo "<b>S.No</b>,<b>ProjectName</b>,<b>Employee Name<b>,<b>Category<b>,<b>Time<b>,<b>Half,<b>date</b>";
    echo "----//------<b>-</b>,<b> -<b>,<b>- <b>,<b>,<b> -</b>";
    $Sno = 1;
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $Sno;echo",";
        $Sno += 1;
        $Projname  = GetProjectName($row['PTPK']);
        echo $Projname;echo",";
        $name = GetEmpName($row['EmployeeNamePK']);
        echo $name;echo",";
        echo $row['Category_Name'];echo",";
        echo $row['SwitchTime'];echo",";
        echo $row['Half'];echo",";
        echo $row['SwitchDate'];
    }
    echo "----//------<b>Total Rows</b>,<b>$no_result<b>,<b>- <b>,<b>,<b> -</b>,<b> -</b>";
}
function modelerProjects($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();

    if(isset($date))
        $sql = 	" Select `PK`,`PTPK`,`EmployeeNamePK` ,COUNT(*)
		FROM  `switch_person`
		WHERE  `EmployeeNamePK` = $nameID and `Half` BETWEEN 1 AND 2 and `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]' group by  `PTPK`";

    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows

    $name = GetEmpNameReturn($nameID);

    echo '<label class="bold">S.No<label>';
    echo ',<label class="bold">'.$name.'</label>';echo",";
    echo '<label class="bold">Halfs<label>';echo",";
    echo '<label class="bold">Days<label>';

    $sno = 1;
    $totalHalf = 0;
    $RemHalf = 0;
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno.",";
        $sno += 1;
        $Projname  = $Proj_NameArr[$row['PTPK']];
        echo $Projname;echo",";
        $temp = $row['COUNT(*)']; //total Number of half contain 1 and 2 save in sql
        echo $temp;echo",";
        echo ($temp / 2);	// days

        $totalHalf += $temp;
        if($row['PTPK'] == 4 || $row['PTPK'] == 0 ) // 4: Free Project remove
            $RemHalf += $temp;
    }
    echo "----//------";
    echo",";
    echo "Total: ";echo",";
    echo $totalHalf ." - ".$RemHalf . " , " . ($totalHalf - $RemHalf)/2 . " <u>Days</u>";
}
function AllmodelerFree($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));
    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();
    $sql = "Select  employee.Employee_Name ,  projects.`Name`, count(*) as count FROM  `switch_person` INNER JOIN `employee` ON switch_person.EmployeeNamePK=employee.PK INNER JOIN `projects` ON switch_person.PTPK=projects.PK and  switch_person.`Half` BETWEEN 1 AND 2 and switch_person.`PTPK` = 4 and switch_person.`SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]' group by switch_person.`EmployeeNamePK` order by `count` Desc";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo "----//------";
    echo '<label class="bold">S.No<label>';
    echo ',<label class="bold">Name</label>';echo",";
    echo '<label class="bold">Free<label>';
    echo",";
    echo '<label class="bold">Days<label>';
    $sno = 1;
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno;echo",";
        $sno +=1;
        echo  $row['Employee_Name'];echo",";
        echo  $row['Name'];echo",";
        echo  $row['count']/2;
    }
}
function AllmodNotAvailDetail($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);

    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));
    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();
    if($nameID == 0)
        $sql = "Select  employee.Employee_Name , `switch_person`.`Half` , `switch_person`.`SwitchDate` FROM  `switch_person` INNER JOIN `employee` ON switch_person.EmployeeNamePK=employee.PK and  switch_person.`Half` BETWEEN 1 AND 2 and switch_person.`PTPK` = 0 and switch_person.`SwitchDate` BETWEEN   '$date[0]' AND  '$date[1]' ORDER by switch_person.`EmployeeNamePK` ";
    else
        $sql = "Select  employee.Employee_Name , `switch_person`.`Half` , `switch_person`.`SwitchDate` FROM  `switch_person` INNER JOIN `employee` ON switch_person.EmployeeNamePK=employee.PK and switch_person.`EmployeeNamePK` = $nameID and  switch_person.`Half` BETWEEN 1 AND 2 and switch_person.`PTPK` = 0 and switch_person.`SwitchDate` BETWEEN   '$date[0]' AND  '$date[1]' ORDER by switch_person.`EmployeeNamePK` ";

    $result = mysql_query($sql,$con) or die(mysql_error());

    echo '<label class="bold">S.No<label>';
    echo ',<label class="bold">Name</label>';echo",";
    echo '<label class="bold">Half<label>';
    echo",";
    echo '<label class="bold">Days<label>';
    $sno = 1;
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno;echo",";
        $sno +=1;
        echo  $row['Employee_Name'];echo",";
        echo  $row['Half'];echo",";
        echo  $row['SwitchDate'];
    }
}
function AllmodelerNotAvaiable($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);

    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();

    if($nameID != 0)
        $sql = "Select  employee.Employee_Name ,`switch_person`.`Half`, `switch_person`.`SwitchDate` FROM  `switch_person` INNER JOIN `employee` ON switch_person.EmployeeNamePK=employee.PK and  switch_person.`Half` BETWEEN 1 AND 2 and switch_person.`PTPK` = 0 and switch_person.`SwitchDate` BETWEEN   '$date[0]' AND  '$date[1]' and switch_person.`EmployeeNamePK` = $nameID  ORDER by switch_person.`EmployeeNamePK` ";
    else
        $sql = "Select  employee.Employee_Name , count(*) as `count` FROM  `switch_person` INNER JOIN `employee` ON switch_person.EmployeeNamePK=employee.PK and  switch_person.`Half` BETWEEN 1 AND 2 and switch_person.`PTPK` = 0 and switch_person.`SwitchDate` BETWEEN '$date[0]' AND  '$date[1]' group by switch_person.`EmployeeNamePK`   order by `count` Desc";
    $result = mysql_query($sql,$con) or die(mysql_error());

    if($nameID != 0)
    {
        echo '<label class="bold">S.No<label>';
        echo ',<label class="bold">Name</label>';echo",";
        echo '<label class="bold">Half<label>';
        echo",";
        echo '<label class="bold">Days<label>';
        echo '<label class="bold">Leave Type<label>';
        $sno = 1;
        while($row = mysql_fetch_assoc($result))
        {
            echo "----//------";
            echo $sno;echo",";
            $sno +=1;
            echo  $row['Employee_Name'];echo",";
            echo  $row['Half'];echo",";
            echo  $row['SwitchDate'];
        }
    }
    else
    {
        echo '<label class="bold">S.No<label>';
        echo ',<label class="bold">Name</label>';echo",";
        echo '<label class="bold">Absent Days<label>';
        $sno = 1;
        while($row = mysql_fetch_assoc($result))
        {
            echo "----//------";
            echo $sno;echo",";
            $sno +=1;
            echo  $row['Employee_Name'];echo",";
            echo  $row['count']/2;
        }
    }
}
function AllmodelerNotAvaiableFilter($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));
    $Proj_NameArr = array();
    $Proj_NameArr = GetProjNameArrReturn();

    if($nameID != 0){
        $sql="Select switch_person.PK, employee.PK as EmpId, employee.Employee_Name ,`switch_person`.`Half`, `switch_person`.`SwitchDate`,lev.LeaveName, switch_person.EmpDaysStatusId FROM  `switch_person`
              INNER JOIN `employee`
              ON switch_person.EmployeeNamePK = employee.PK
              left JOIN tbl_leave lev
              ON lev.id = switch_person.EmpDaysStatusId
              WHERE  switch_person.`Half` IN (1, 2)
              AND switch_person.EmpDaysStatusId IN (2,3,4,5)
              AND switch_person.PTPK = 0

              AND switch_person.`SwitchDate` BETWEEN   '$date[0]' AND  '$date[1]'
              AND switch_person.`EmployeeNamePK` = ".$nameID."
              ORDER by switch_person.`EmployeeNamePK`";
    }
    else{

        $sql = "SELECT temp.EmployeeNamePK, emp.Employee_Name, temp.SickLeave, temp.CasualLeave, temp.AnnualLeave, temp.OfficialOFF,
                        (SickLeave + CasualLeave + AnnualLeave) AS TotalLeave
                        FROM
                        (Select EmployeeNamePK,
                          sum(case when EmpDaysStatusId = 3 then 1 else 0 end)/2 as SickLeave,
                          sum(case when EmpDaysStatusId = 4 then 1 else 0 end)/2 as CasualLeave,
                          sum(case when EmpDaysStatusId = 5 then 1 else 0 end)/2 as AnnualLeave,
                          sum(case when EmpDaysStatusId = 2 then 1 else 0 end)/2 as OfficialOFF
                        FROM switch_person
                        WHERE SwitchDate BETWEEN '$date[0]' AND '$date[1]'
                        group by EmployeeNamePK) temp
                        inner join employee emp
                        ON emp.PK = temp.EmployeeNamePK
                        order by `TotalLeave` DESC";
    }

    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    if($nameID != 0)
    {
        while($row = mysql_fetch_assoc($result))
        {
            $jsonData[] = $row;
        }
        echo json_encode($jsonData);
    }
    else
    {
        while($row = mysql_fetch_assoc($result))
        {
            $jsonData[] = $row;
        }
        echo json_encode($jsonData);
    }
}
#region Employees Effort/Progress realted functions
function employeeProgress($teamLead, $switchDate){
    global $con;
    $sql = "SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE pro.TeamLead = ".$teamLead."
            AND sp.SwitchDate = '".$switchDate."'
            AND sp.Half IN (1,2)
            AND sp.LeadBy <> sp.EmployeeNamePK
            AND sp.LeadBy <> 0
           order by pro.PK,emp.PK, sp.Half";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] =$row;
    }
    echo json_encode($jsonData);
}
function viewEmpAndTeamLeadProgressByDate($teamLead, $switchDate){
    global $con;
    $sql = "select * from (SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half, hoursWorked from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE pro.TeamLead = ".$teamLead."
            AND sp.SwitchDate = '".$switchDate."'
            AND sp.Half IN (1,2)
            AND sp.LeadBy <> sp.EmployeeNamePK
           order by pro.PK,emp.PK, sp.Half) dummy1
           union all
            select * from((SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half, hoursWorked from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE sp.SwitchDate = '".$switchDate."'
            AND sp.Half IN (1,2)
            AND sp.LeadBy = sp.EmployeeNamePK
            ORDER BY pro.PK,emp.PK, sp.Half
           )) dummy2
           ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] =$row;
    }
    echo json_encode($jsonData);
}
function teamLeadProgress($switchDate){
    global $con;
    $sql = "SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE sp.SwitchDate = '".$switchDate."'
            AND sp.Half IN (1,2)
            AND sp.LeadBy = sp.EmployeeNamePK
            ORDER BY pro.PK,emp.PK, sp.Half";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] =$row;
    }
    echo json_encode($jsonData);
}
function teamLeadandEmployee($teamLead, $switchDate){
    global $con;
    $sql = "select * from (SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half from switch_person sp
INNER JOIN projects pro
 ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE pro.TeamLead = ".$teamLead."
            AND sp.SwitchDate = '".$switchDate."'
            AND sp.Half IN (1,2)
            AND sp.LeadBy <> sp.EmployeeNamePK
            ORDER BY pro.PK,emp.PK, sp.Half) dummy1

            union all
            select * from(
           (SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, 		  sp.SwitchDate, sp.Half from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE sp.SwitchDate = '".$switchDate."'
            AND sp.Half IN (1,2)
            AND sp.LeadBy = sp.EmployeeNamePK
            ORDER BY pro.PK,emp.PK, sp.Half
           )) dummy2 ";


    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] =$row;
    }
    echo json_encode($jsonData);
}
function checkEmployeesEffortAddORNot($recordId){
    global $con;
    $sql = "SELECT * FROM switch_person where hoursWorked = 0 and PK =".$recordId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
    }
    echo json_encode($jsonData);
}
function checkEmployeesEffortAddORNotByLastDate($empId, $date){
    global $con;
    $sql = "SELECT * FROM `switch_person` where LeadBy = ".$empId." and switchDate = '".$date."' AND EmployeeNamePK <> LeadBy and hoursWorked = 0 and PTPK <> 4 and half in(1,2)" ;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
        echo $row;
    }
    echo json_encode($jsonData);
}
function getEmployeeCategory($empId){
    global $con;
    $sql = "SELECT * FROM `employee` where PK = ".$empId ;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
    }
    echo json_encode($jsonData);
}
function getTeamLeadProjectIds(){
    global $con;
    $sql = "SELECT * FROM switch_person where hoursWorked = 0 and EmployeeNamePK = ".$empId." and switchDate ='".$date."'" ;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
        echo $row;
    }
    echo json_encode($jsonData);
}
function empProgressAdd($queryPart){
    global $con;
    $sql = "UPDATE switch_person SET ".$queryPart;
    if(mysql_query($sql,$con)){
        echo 1;//successfully updated data
    }else{
        echo 0;
    }
}
function viewEmpProgressByDate($teamLead,$date){
    global $con;
    $sql = "SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half, hoursWorked
            from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE SwitchDate = '".$date."'
            AND pro.TeamLead = ".$teamLead."
            AND  sp.Half IN (1,2)
             AND sp.LeadBy <> sp.EmployeeNamePK
                order by pro.PK,emp.PK,SwitchDate, sp.Half";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
    }
    echo json_encode($jsonData);
}
function viewEmpProgressBetweenDate($startDate, $endDate){
    global $con;
    $sql = "SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half, hoursWorked
            from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE SwitchDate BETWEEN '".$startDate."' AND '".$endDate."'
            AND  sp.Half IN (1,2)
            order by pro.PK,emp.PK,SwitchDate, sp.Half ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
    }
    echo json_encode($jsonData);
}
function employeeProgressColor(){
    global $con;
    $sql = "SELECT colorId, ColorCode, weightage FROM `tbl_emp_progress_color`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] =$row;
    }
    echo json_encode($jsonData);
}
function selectEmpProgress($projectId, $dateStart, $dateEnd){
    global $con;
    $sql = "SELECT sp.PK as swithPersonId, sp.PTPK, emp.Employee_Name, emp.PK, pro.Name, sp.SwitchDate, sp.Half, sp.firstHalfWorkedHours + sp.secondHalfWorkedHours as hoursWorked
            from switch_person sp
            INNER JOIN projects pro
            ON sp.PTPK = pro.PK
            INNER JOIN employee emp
            ON sp.EmployeeNamePK = emp.PK
            WHERE sp.PTPK = 106
            AND SwitchDate BETWEEN '2015-01-01' AND '2015-06-15'
            AND  sp.Half IN (1,2)
                order by pro.PK,emp.PK,SwitchDate, sp.Half ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
    }
    echo json_encode($jsonData);
}
function GetProgresColor()
{
    global $con;
    $sql = "SELECT * FROM `tbl_emp_progress_color`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $ObjArr = array();
    while($row = mysql_fetch_assoc($result))
    {
        $ObjArr[] = $row;
    }
    echo json_encode($ObjArr);
}
function checkPreviousDateOfficeOff($date,$teamLead){
    global $con;
    $sql = "SELECT * FROM `switch_person` WHERE SwitchDate ='".$date."' AND LeadBy =".$teamLead;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $ObjArr = array();
    while($row = mysql_fetch_assoc($result))
    {
        $ObjArr[] = $row;
    }
    echo json_encode($ObjArr);
}
function SinglePersonEfforts($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    $sql = "
			select * from
			(
			SELECT PK, `PTPK`,`EmployeeNamePK`,`Half`,`SwitchDate`,`hoursWorked` FROM `switch_person` where `SwitchDate` between '$date[0]' and '$date[1]' and `Half` between 1 and 2
			and  EmployeeNamePK = $nameID
			order by `EmployeeNamePK`
			) as e
			Left join
			(
				Select projects.PK as PPK, projects.Name from projects
			)as proj
			on proj.PPK = e.PTPK

			left join
			(
			Select  employee.PK as EPK , employee.Employee_Name from employee
			)as emp
			on emp.EPK = e.EmployeeNamePK

			left join tbl_emp_progress_color as ColCode
			on ColCode.colorId = e.hoursWorked

			Order by PTPK
			";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $ObjArr = array();
    while($row = mysql_fetch_assoc($result))
    {
        $ObjArr[] = $row;
    }
    echo json_encode($ObjArr);
}
function MonthlySheetWithEfforts($nameID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    $sql = "
			select * from
			(
				SELECT PK, `PTPK`,`EmployeeNamePK`,`Half`,`SwitchDate`,`hoursWorked` FROM `switch_person` where `SwitchDate` between '$date[0]' and '$date[1] and `Half` between 1 and 2'
			";

    if($nameID != 0)
        $sql =  $sql." and  EmployeeNamePK = $nameID	";

    $sql = $sql."  order by `EmployeeNamePK`
			) as e

			Left join
			(
				Select projects.PK as PPK, projects.Name from projects
			)as proj
			on proj.PPK = e.PTPK

			left join
			(
			Select  employee.PK as EPK , employee.Employee_Name from employee
			)as emp
			on emp.EPK = e.EmployeeNamePK
			Order by PTPK
			";

    $result = mysql_query($sql,$con) or die(mysql_error());
    $ObjArr = array();
    while($row = mysql_fetch_assoc($result))
    {
        $ObjArr[] = $row;
    }
    echo json_encode($ObjArr);
}
function TotalDaysAndTaskAssigned($empId, $dateRng, $projectId){
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    global $connPDO;
    $sql = "SELECT sp.EmployeeNamePK, emp.Employee_Name, sp.SwitchDate,
            SUM(sp.PTPK <> 4 && sp.PTPK <> 0)/2 as TotalEmpProjectDays,
            SUM(sp.PTPK = 0)/2 as TotalLeaves,
            SUM(sp.PTPK = 4)/2 as TotalFreeDays,
            COUNT(sp.PTPK)/2 as TotalCompanyDays,
            SUM(sp.hoursWorked)/ (COUNT(sp.PTPK)) as empProgressPercentage
            FROM switch_person sp
            inner Join employee emp
            ON emp.PK = sp.EmployeeNamePK
            where sp.SwitchDate Between '$date[0]' AND '$date[1]'
            and sp.half BETWEEN 1 AND 2 ";
    if($projectId != 0){
        $sql = $sql." and sp.PTPK =".$projectId;
    }
    if($empId == 0){
        $sql = $sql." group by (sp.EmployeeNamePK)";
    }
    else{
        $sql = $sql." and sp.EmployeeNamePk = ".$empId;
    }
    //echo $sql;

    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);
}
function TotalDaysAndTaskAssignedSpecificEmp($empId, $dateRng){
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    global $connPDO;
    $sql = "SELECT sp.EmployeeNamePK, emp.Employee_Name, sp.SwitchDate, sp.PTPK, sp.hoursWorked, sp.Half, pro.Name
            FROM switch_person sp
            inner Join employee emp
            ON emp.PK = sp.EmployeeNamePK
            inner join projects pro
            on pro.PK = sp.PTPK
            where sp.SwitchDate Between '$date[0]' AND '$date[1]'
            and sp.half BETWEEN 1 AND 2 and sp.EmployeeNamePk = ".$empId ;

    //echo $sql;

    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);
}

#endregion Employees Effort/Progress realted functions
function MonthlySheet($nameID, $dateRng)
{
    echo $nameID;
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    $sql = "
      select * from
          (select ETPK, PTPK, Employee_Name, Name ,TeamLead from (
                    select * from ( select * from ( select * from (
                    select distinct  switch_person.`PTPK`  from switch_person where switch_person.`SwitchDate`  between '$date[0]' and '$date[1]') as a
                    left join (select `emp_curr_proj`.`ETPK`,switch_person.`EmployeeNamePK` , switch_person.`PTPK` as BPTPK ,switch_person.`Half` ,switch_person.`SwitchDate`
                                from emp_curr_proj
                                left join switch_person
                                on switch_person.`EmployeeNamePK` = `emp_curr_proj`.`ETPK`
                                WHERE switch_person.`SwitchDate`  between '$date[0]' and '$date[1]' and `Half` between 1 and 2 ";

    if($nameID != 0){
        $sql = $sql . "  and  `emp_curr_proj`.`ETPK` = ".$nameID;
    }

    $sql = $sql." order by switch_person.`PTPK`)as b
                      on a.PTPK = b.BPTPK
                      order by `EmployeeNamePK`) as d
                      left join (select PK, Name ,TeamLead  from Projects) as proj
                      on proj.pk  = d.PTPK)as e
                      left join (select PK as EPK,Employee_Name from employee)as f
                      on e.etpk = f.epk) as g) as h
                      left join(
                      select PK as LeadPK,Employee_Name as LeadName from employee)as LName
                      on h.TeamLead = LName.LeadPK";
    ///http://localhost/Employee_Switch_Persons/Employee_Switch_Person.php?action=MonthlySheet&vars=2&var1=1&var2=01/08/2014%20-%2015/08/2014
    echo "--------------------------------------";
    // echo $sql;
    echo "--------------------------------------";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['ETPK'];
        echo ",";
        echo $row['PTPK'];
        echo ",";
        echo $row['Employee_Name'];
        echo ",";
        echo $row['Name'];
        echo ",";
        echo $row['LeadName'];
        echo "</br><b>(".$row['LeadName'].")</b>";

        // echo ",";
        //echo $row['hoursWorked'];
        echo "----//------";
    }

}
function MonthlyCompensationSheet($nameID, $dateRng)
{

    //echo $nameID;
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);

        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));

    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    $sql = "
      select * from (select * from
          (select ETPK, PTPK, Employee_Name, Name ,TeamLead, CompensationSheetOrder from (
                    select * from ( select * from ( select * from (
                    select distinct  switch_person.`PTPK`  from switch_person where switch_person.`SwitchDate`  between '$date[0]' and '$date[1]') as a
                    left join (select `emp_curr_proj`.`ETPK`,switch_person.`EmployeeNamePK` , switch_person.`PTPK` as BPTPK ,switch_person.`Half` ,switch_person.`SwitchDate`, employee.CompensationSheetOrder
                                from emp_curr_proj
                                INNER JOIN employee
                                ON employee.PK = emp_curr_proj.ETPK
                                left join switch_person
                                on switch_person.`EmployeeNamePK` = `emp_curr_proj`.`ETPK`
                                WHERE switch_person.`SwitchDate`  between '$date[0]' and '$date[1]' and `Half` between 1 and 2 ";
    if($nameID != 0){
        $sql = $sql . "  and  `emp_curr_proj`.`ETPK` = ".$nameID;
    }

    $sql = $sql." )as b
                      on a.PTPK = b.BPTPK
                      ) as d
                      left join (select PK, Name ,TeamLead  from Projects) as proj
                      on proj.pk  = d.PTPK)as e
                      left join (select PK as EPK, Employee_Name from employee)as f
                      on e.etpk = f.epk) as g) as h
                      left join(
                      select PK as LeadPK, Employee_Name as LeadName from employee)as LName
                      on h.TeamLead = LName.LeadPK) as MainQuery order by CompensationSheetOrder";//order by CompensationSheetOrder

    //uncomment it: testing
    // "--------------------------------------";
    //uncomment it: testing
    //echo "--------------------------------------";

    $result = mysql_query($sql,$con) or die(mysql_error());

    while($row = mysql_fetch_assoc($result))
    {
        echo $row['CompensationSheetOrder'];//ETPK
        echo ",";
        echo $row['PTPK'];
        echo ",";
        echo $row['Employee_Name'];
        echo ",";
        echo $row['Name'];
        echo ",";
        echo $row['LeadName'];
        echo "</br><b>(".$row['LeadName'].")</b>";

        // echo ",";
        //echo $row['hoursWorked'];
        echo "----//------";
    }

}
function AllmodelerProjects($nameID, $dateRng)
{
    global $con;
    if ($nameID != 0)
    {
        modelerProjects($nameID, $dateRng);
        return false;
    }
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));
    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();
    $sql = "SELECT * FROM `emp_curr_proj` WHERE `PTPK` != '0'";
    $resultEmp = mysql_query($sql,$con) or die(mysql_error());
    while($rowEmp = mysql_fetch_assoc($resultEmp))
    {
        $sql = 	"Select `PK`,`PTPK`,`EmployeeNamePK` ,COUNT(*)
		FROM  `switch_person`
		WHERE  `EmployeeNamePK` = ".$rowEmp['ETPK']." and `Half` BETWEEN 1 AND 2 and `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]' group by  `PTPK`";
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result); // total rows
        $name = GetEmpNameReturn($rowEmp['ETPK']);
        echo "----//------";
        echo '<label class="bold">S.No<label>';
        echo ',<label class="bold">'.$name.'</label>';echo",";
        echo '<label class="bold">Halfs<label>';echo",";
        echo '<label class="bold">Days<label>';
        $sno = 1;
        $totalHalf = 0;
        $freeHalf = 0;
        $absentHalf = 0;
        while($row = mysql_fetch_assoc($result))
        {
            echo "----//------";
            echo $sno.",";
            $sno +=1;
            $Projname  = $Proj_NameArr[$row['PTPK']];
            echo $Projname;echo",";
            $temp = $row['COUNT(*)']; //total Number of half contain 1 and 2 save in sql
            echo $temp;echo",";
            $temp /= 2;
            echo $temp;	// days

            $totalHalf += $temp;
            if($row['PTPK'] == 4 ) // 4: Free Project remove
                $freeHalf = $temp;

            if($row['PTPK'] == 0 ) // 0: Free Project remove
                $absentHalf = $temp;
        }
        echo "----//------";
        echo",";
        echo "Total: ";echo",";
        echo $totalHalf ." - ".$freeHalf . " - ".$absentHalf." , " . ($totalHalf - $freeHalf - $absentHalf) . " <u>Days</u>";
        echo "----//------";
        echo"-,";echo"-,";echo"-,";
    }
}
function MonthTotalContProj($projID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));
    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();
    if(isset($date))

        $sql = "select count(PTPK) as count,PTPK, Name ,`SwitchDate` ,Half ,status,ProjStatus  from (SELECT distinct  PTPK, `SwitchDate` ,Half FROM `switch_person` where `SwitchDate` between '$date[0]' and '$date[1]' and `Half` between 1 and 2
 ) as a

left join
(
select Pk, Name, status from projects
) as b

on a.ptpk = b.pk

left join
(
select pk, status as ProjStatus from project_status
)
as c
on b.status = c.pk




group by PTPK";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    echo '<label class="bold">S.No<label>';
    echo ',<label class="bold">Projects</label>';echo",";
    echo '<label class="bold">Days<label>';echo",";
    echo '<label class="bold">First In Range<label>';echo",";
    echo '<label class="bold">Project Status<label>';
    $sno = 1;
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno.",";
        $sno +=1;
        echo $row['Name'];echo",";
        echo $row['count']/2;echo",";
        echo $row['SwitchDate'];echo",";
        echo $row['ProjStatus'];
    }
}
function MonthTotalContProjDateDetail($projID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));
    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();
    if(isset($date))

        $sql = "select count(PTPK) as count,PTPK, Name ,`SwitchDate` ,Half ,status,ProjStatus  from (SELECT distinct  PTPK, `SwitchDate` ,Half FROM `switch_person` where `SwitchDate` between '$date[0]' and '$date[1]' and `Half` between 1 and 2
 ) as a

left join
(
select Pk, Name, status from projects
) as b

on a.ptpk = b.pk

left join
(
select pk, status as ProjStatus from project_status
)
as c
on b.status = c.pk




group by PTPK";

    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    echo '<label class="bold">S.No<label>';
    echo ',<label class="bold">Projects</label>';echo",";
    echo '<label class="bold">Days<label>';echo",";
    echo '<label class="bold">First In Range<label>';echo",";
    echo '<label class="bold">Project Status<label>';echo",";

    $dates = createRange($date[0], $date[1]);
    for ($i = 0; $i < count($dates); $i++)
    {
        echo '<label class="bold">'. $dates[$i].'<label>';echo",";

    }

    $sno = 1;
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno.",";
        $sno +=1;
        echo $row['Name'];echo",";
        echo $row['count']/2;echo",";
        echo $row['SwitchDate'];echo",";
        echo $row['ProjStatus'];echo",";

        for ($i = 0; $i < count($dates); $i++)
        {
            echo ceil((RetutnDaysCount_Emp_Per_Day_Project( $row['PTPK'], $dates[$i],$dates[$i])) / 2);
            echo",";
        }
    }
}
function RetutnDaysCount_Emp_Per_Day_Project($projID, $date0, $date1)
{
    global $con;
    if(isset($date0))
        $sql = 	"SELECT count(*) as count FROM `switch_person`
		WHERE `PTPK` = $projID and  `SwitchDate` BETWEEN  '$date0' AND  '$date1' and  `Half` BETWEEN 1 AND 2";

    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    $totalPerson = 0;
    $sno = 1;
    while($row = mysql_fetch_assoc($result))
    {
        $totalPerson +=  $row['count'];
    }
    return $totalPerson;
}
function createRange($startDate, $endDate) {
    $tmpDate = new DateTime($startDate);
    $tmpEndDate = new DateTime($endDate);
    $outArray = array();
    do {
        $outArray[] = $tmpDate->format('Y-m-d');
    } while ($tmpDate->modify('+1 day') <= $tmpEndDate);
    return $outArray;
}
function memberTotalDaysOnProj($projID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }
    $Emp_NameArr =array();
    $Emp_NameArr = GetEmpNameArrReturn();
    if(isset($date))
        $sql = "select * from
				(SELECT  sp.`PK`,`EmployeeNamePK`,COUNT(*),Emp_Dept_Category, Category_Name
							FROM  `switch_person` sp
							INNER JOIN employee emp
             				ON EmployeeNamePK = emp.PK
             				INNER JOIN dept_category dpt
             				ON dpt.PK = emp.Emp_Dept_Category
							WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2 and `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]'  group by  `EmployeeNamePK` ) as a

				join (
				 select count(*)  Total_Days from ( select
				  distinct  CONCAT_WS('', Half, SwitchDate) AS Contact_Phone
				  FROM  `switch_person` WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2 and `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]' ) as a
				) as total";
    else
        $sql = "select * from
				(SELECT  sp.`PK`,`EmployeeNamePK`,COUNT(*),Emp_Dept_Category, Category_Name
							FROM  `switch_person`sp
                            INNER JOIN employee emp
             				ON EmployeeNamePK = emp.PK
             				INNER JOIN dept_category dpt
             				ON dpt.PK = emp.Emp_Dept_Category
							WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2  group by  `EmployeeNamePK` ) as a
				join (
				 select count(*)  Total_Days from ( select
				  distinct  CONCAT_WS('', Half, SwitchDate) AS Contact_Phone
				  FROM  `switch_person` WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2 ) as a
				) as total";

    $result = mysql_query($sql,$con) or die(mysql_error());
    echo "result " + $result;echo "result " + $result;
    $no_result = mysql_num_rows($result); // total rows
    $Projname  = GetProjectName($projID);
    echo '<label class="bold">S.No<label>';
    echo ',<label class="bold">'.$Projname.'</label>';echo",";
    echo '<label class="bold">Days<label>';echo",";
    echo '<label class="bold">Category<label>';
    $sno = 1;
    $total_days = 0;
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno.",";
        $sno +=1;
        $name = $Emp_NameArr[$row['EmployeeNamePK']];
        echo $name;echo",";
        $temp = $row['COUNT(*)'];
        echo $temp/2; echo",";
        echo $row['Category_Name'];
        $total_days +=  $temp/2;
    }
    // get first row record
    mysql_data_seek($result, 0);
    $row = mysql_fetch_assoc($result);
    $TotalProjDays  = $row['Total_Days'];
    echo "----//------";
    echo ",";echo ",";
    echo "----//------";
    echo "<b>,Max Days<b>,  <b> ". $TotalProjDays/2 ."<b>";
    echo "----//------";
    echo ",";
    echo "<b>Average Days ,$total_days/". --$sno ." =<b> ".ceil($total_days/$sno)."</b>";
    echo "----//------";
    echo ",";
    echo "<b>Total Days,<b>".$total_days."</b>";
}
function OverTimeDetails($projID, $dateRng){
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }
    global $connPDO;
    if(isset($date))
    $sql = "SELECT maxTime, COUNT(*)  as TotalCount FROM (SELECT Max(vpo.Option) maxTime,  vp.askDate   FROM `vote_poll_output` AS vpo
            INNER JOIN vote_poll AS vp
            ON vpo.QuesNo = vp.VPPK
            INNER JOIN switch_person sp
            ON vpo.EmpPK = sp.EmployeeNamePK
            AND vp.askDate = sp.SwitchDate
            INNER JOIN employee emp
            ON vpo.EmpPK = emp.PK
            WHERE vp.askDate Between '$date[0]' AND  '$date[1]'
            AND sp.PTPK =  $projID
            AND vpo.Output = 'true'
            AND sp.Half = 2
            AND sp.SwitchDate Between '$date[0]' AND  '$date[1]'
            GROUP BY vp.askDate) as mainQuery
            GROUP by mainQuery.maxTime";
else
    $sql = "SELECT maxTime, COUNT(*)  as TotalCount FROM (SELECT Max(vpo.Option) maxTime,  vp.askDate   FROM `vote_poll_output` AS vpo
            INNER JOIN vote_poll AS vp
            ON vpo.QuesNo = vp.VPPK
            INNER JOIN switch_person sp
            ON vpo.EmpPK = sp.EmployeeNamePK
            AND vp.askDate = sp.SwitchDate
            INNER JOIN employee emp
            ON vpo.EmpPK = emp.PK
            WHERE  sp.PTPK =  $projID
            AND vpo.Output = 'true'
            AND sp.Half = 2
            GROUP BY vp.askDate) as mainQuery
            Group by mainQuery.maxTime";



    /*$sql = "SELECT maxTime, COUNT(*)  as TotalCount FROM (SELECT Max(vpo.Option) maxTime,  vp.askDate   FROM `vote_poll_output` AS vpo
            INNER JOIN vote_poll AS vp
            ON vpo.QuesNo = vp.VPPK
            INNER JOIN switch_person sp
            ON vpo.EmpPK = sp.EmployeeNamePK

            INNER JOIN employee emp
            ON vpo.EmpPK = emp.PK
            WHERE vp.askDate Between '$date[0]' AND  '$date[1]'
            AND sp.PTPK =  $projID
            AND vpo.Output = 'true'
            AND sp.Half = 2
            AND sp.SwitchDate Between '$date[0]' AND  '$date[1]'
            GROUP BY vp.askDate) as mainQuery
            Group by mainQuery.maxTime";
*/
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);


}
function memberTotalDaysOnProjWithTask($projID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }

    if(isset($date))
        $sql = "SELECT * FROM
				(SELECT  sp.`PK`,`EmployeeNamePK`, emp.Employee_Name,  Emp_Dept_Category, Category_Name, TaskPK,
                count(TaskPK) as taskCount, taskName
				FROM  `switch_person`sp
                INNER JOIN employee emp
             	ON EmployeeNamePK = emp.PK
             	INNER JOIN dept_category dpt
             	ON dpt.PK = emp.Emp_Dept_Category
                INNER JOIN emp_project_task_list eptl
                ON eptl.pk = TaskPK
				WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2
				 and `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]'
				group by  `EmployeeNamePK`,TaskPK ) AS a
				JOIN (
				SELECT count(*)  Total_Days from ( SELECT
				DISTINCT  CONCAT_WS('', Half, SwitchDate) AS Contact_Phone
				FROM  `switch_person` WHERE `PTPK` = $projID AND `Half` BETWEEN 1 AND 2 AND `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]' ) AS a
				) AS total";

    else
        $sql = "SELECT * FROM
				(SELECT  sp.`PK`,`EmployeeNamePK`, emp.Employee_Name,  Emp_Dept_Category, Category_Name, TaskPK,
                count(TaskPK) as taskCount, taskName
							FROM  `switch_person`sp
                            INNER JOIN employee emp
             				ON EmployeeNamePK = emp.PK
             				INNER JOIN dept_category dpt
             				ON dpt.PK = emp.Emp_Dept_Category
                            INNER JOIN emp_project_task_list eptl
                            ON eptl.pk = TaskPK
							WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2  group by  `EmployeeNamePK`,TaskPK ) AS a
				JOIN (
				SELECT count(*)  Total_Days from ( SELECT
				DISTINCT  CONCAT_WS('', Half, SwitchDate) AS Contact_Phone
				FROM  `switch_person` WHERE `PTPK` = $projID AND `Half` BETWEEN 1 AND 2 ) AS a
				) AS total";

    $result = mysql_query($sql,$con) or die(mysql_error());
    //echo "result " + $result;echo "result " + $result;
    $no_result = mysql_num_rows($result); // total rows
    $Projname  = GetProjectName($projID);
    //echo '<label class="bold">S.No<label>';
    //echo ',<label class="bold">'.$Projname.'</label>';echo",";
    //echo '<label class="bold">Days<label>';echo",";
    //echo '<label class="bold">Category<label>';
    $sno = 1;
    $total_days = 0;
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
        /*echo "----//------";
        echo $sno.",";
        $sno +=1;
        $name = $Emp_NameArr[$row['EmployeeNamePK']];
        echo $name;echo",";
        $temp = $row['COUNT(*)'];
        echo $temp/2; echo",";
        echo $row['Category_Name'];
        $total_days +=  $temp/2;*/
    }
    echo json_encode($data);
    /*
    // get first row record
    mysql_data_seek($result, 0);
    $row = mysql_fetch_assoc($result);
    $TotalProjDays  = $row['Total_Days'];
    echo "----//------";
    echo ",";echo ",";
    echo "----//------";
    echo "<b>,Max Days<b>,  <b> ". $TotalProjDays/2 ."<b>";
    echo "----//------";
    echo ",";
    echo "<b>Average Days ,$total_days/". --$sno ." =<b> ".ceil($total_days/$sno)."</b>";
    echo "----//------";
    echo ",";
    echo "<b>Total Days,<b>".$total_days."</b>";
    */
}
function ProjectsDaysSummary($projID, $dateRng)	//Btn: 'Mnthly_Days' not using 	// project detail for ina a one months date b/c date was split into 3 coloumn
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date[0] = date("Y-m-d", strtotime($originalDate));
    $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
    $date[1] = date("Y-m-d", strtotime($originalDate));

    if(isset($date))
        $sql = 	"SELECT  DISTINCT  `EmployeeNamePK`
		FROM  `switch_person`
		WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2 and `date` BETWEEN  '$date1[0]' AND  '$date2[0]' and `Month` BETWEEN  '$date1[1]' AND  '$date2[1]'
		and `Year` BETWEEN  '$date1[2]' AND  '$date2[2]' order by  `EmployeeNamePK`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    $Projname  = GetProjectName($projID);
    echo ',<label class="bold">'.$Projname.'</label>';echo",";
    echo '<label class="bold">Days<label>';
    $CountDays = 0;
    $sno = 1;
    while($row = mysql_fetch_assoc($result))
    {
        $sql ="SELECT  count(*) as num
						FROM  `switch_person`
						WHERE `PTPK` = $projID and `EmployeeNamePK` = ".$row['EmployeeNamePK']." and `Half` BETWEEN 1 AND 2 and  `date` BETWEEN  '$date1[0]' AND  '$date2[0]' and `Month` BETWEEN  '$date1[1]' AND  '$date2[1]'
						and `Year` BETWEEN  '$date1[2]' AND  '$date2[2]'
				 ";
        $result_count = mysql_query($sql,$con) or die(mysql_error());
        echo "----//------";
        echo $sno.",";
        $sno +=1;
        $name = GetEmpName($row['EmployeeNamePK']);
        echo $name;echo",";
        $total = mysql_fetch_assoc($result_count);
        echo $total['num']/2 . "";
        $CountDays += $total['num']/2;
    }
    echo "----//------";
    echo "-,-,-";
    echo "----//------";
    echo ',<label class="bold">Total Days:</label>,<label class="bold">'.$CountDays.'<label>';
    echo "----//------";
    if($no_result != 0)
    {
        echo ',<label class="bold">Average Days:~</label>,<label class="bold">'.ceil($CountDays/$no_result).'<label>';
        echo "----//------";
    }
    echo ',<label class="bold">Note: Only 1 & 2 Half Include</label>,';
}
function Count_Emp_Per_Day_Project($projID, $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }

    if(isset($date)){
        $sql = 	"SELECT  `PTPK`, COUNT(`EmployeeNamePK`) as EmpCount, `SwitchDate` ,  `Half`
		FROM  `switch_person`
		WHERE `PTPK` = $projID and  `SwitchDate` BETWEEN  '$date[0]' AND  '$date[1]' and  `Half` BETWEEN 1 AND 2 Group BY Half";
    }
    else
        $sql = "SELECT  `PTPK`, COUNT(`EmployeeNamePK`) as EmpCount, `SwitchDate` ,  `Half`
		FROM  `switch_person`
		WHERE `PTPK` = $projID and `Half` BETWEEN 1 AND 2 GROUP by `SwitchDate`,`Half`"; //chk allow  project name
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    $totalPerson = 0;
    $sno = 1;
    echo "S.No,Name,Persons,Half,Date";
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno;
        $sno +=1;
        echo",";
        $Projname  = GetProjectName($row['PTPK']);
        echo $Projname;echo",";
        echo $row['EmpCount'];echo",";
        $totalPerson +=$row['EmpCount'];
        echo $row['Half'];echo",";
        echo $row['SwitchDate'];
    }
    echo "----//------";
    echo "----//------";
    if($no_result != 0)
        //echo "Total,$totalPerson Persons,$no_result Half's, ".number_format( $totalPerson/$no_result , 2)." avg,". $no_result/2 . " Days";
        echo "Total, $totalPerson Persons,$no_result Half's, ".number_format( $totalPerson/($no_result) , 2)." avg,". $no_result/2 . " Days";
    //*/
}
function LoginDoubleEntry($dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }
    $Modeler_NameArr =array();
    $Modeler_NameArr  = GetModelerNameArrReturn();
    echo "S.No,Name,ProjectName,Time,Half,date,operations";
    while ($date[0] <= $date[1])
    {
        $date[0] = date ("Y-m-d", strtotime("+1 day", strtotime($date[0])));
        for ($x=1; $x<count($Modeler_NameArr); $x++)
        {
            $sql = "SELECT * FROM `switch_person` WHERE `SwitchDate` = '$date[0]' and `half` = 1  and `EmployeeNamePK` = $Modeler_NameArr[$x]";
            $result = mysql_query($sql,$con) or die(mysql_error());
            $no_result = mysql_num_rows($result); // total rows
            if($no_result > 1)
            {
                $sno = 1;
                // echo "S.No,PK,ETPK,Name,ProjectName,Time,Half,date";
                $name = GetEmpNameReturn($Modeler_NameArr[$x]);
                $Proj_NameArr =array();
                $Proj_NameArr = GetProjNameArrReturn();
                while($row = mysql_fetch_assoc($result))
                {
                    echo "----//------";
                    echo $row['PK'];echo",";
                    $sno+=1;
                    echo $Modeler_NameArr[$x];
                    echo $name;echo",";
                    echo $row['PTPK'];
                    $Projname  = $Proj_NameArr[$row['PTPK']];
                    echo $Projname;echo",";
                    echo $row['SwitchTime'];echo",";
                    echo $row['Half'];echo",";
                    echo $row['SwitchDate'];
                }
            }
            $sql = "SELECT * FROM `switch_person` WHERE `SwitchDate` = '$date[0]' and `half` = 2  and `EmployeeNamePK` = $Modeler_NameArr[$x]";
            $result = mysql_query($sql,$con) or die(mysql_error());
            $no_result = mysql_num_rows($result); // total rows
            if($no_result > 1)
            {
                $sno = 1;
                // echo "S.No,PK,ETPK,Name,ProjectName,Time,Half,date";
                $name = GetEmpNameReturn($Modeler_NameArr[$x]);
                $Proj_NameArr =array();
                $Proj_NameArr = GetProjNameArrReturn();
                while($row = mysql_fetch_assoc($result))
                {
                    echo "----//------";
                    echo $row['PK'];echo",";
                    $sno+=1;
                    echo $Modeler_NameArr[$x]." ";
                    echo $name;echo",";
                    $Projname  = $Proj_NameArr[$row['PTPK']];
                    echo $row['PTPK']." ";
                    echo $Projname;echo",";
                    echo $row['SwitchTime'];echo",";
                    echo $row['Half'];echo",";
                    echo $row['SwitchDate'];
                }
            }
        }
    }
}
function fnSwitchingEmp($id , $dateRng)
{
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
        //$tempdate = date("Ymd", strtotime($originalDate));
    }
    $sql = "SELECT * FROM `switch_person` where   `SwitchDate` BETWEEN  '$date[0]' and '$date[1]' and `EmployeeNamePK` = $id "; //chk allow  project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    $sno = 1;
    // echo "S.No,PK,ETPK,Name,ProjectName,Time,Half,date";
    $name = GetEmpNameReturn($id);
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();
    echo "S.No,Name,ProjectName,Time,Half,date";
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno;echo",";
        $sno+=1;
        echo $name;echo",";
        $Projname  = $Proj_NameArr[$row['PTPK']];
        echo $Projname;echo",";
        echo $row['SwitchTime'];echo",";
        echo $row['Half'];echo",";
        echo $row['SwitchDate'];
    }
}
function GetPerDay($id , $projID)
{
    global $con;
    $sql = "SELECT * FROM `switch_person` where   `PTPK` = $projID and `EmployeeNamePK` = $id"; //chk allow  project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    $sno = 1;
    // echo "S.No,PK,ETPK,Name,ProjectName,Time,Half,date";
    echo "S.No,Name,ProjectName,Time,Half,date";
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $sno;echo",";
        $sno+=1;
        $name = GetEmpName($row['EmployeeNamePK']);
        echo $name;echo",";
        $Projname  = GetProjectName($row['PTPK']);
        echo $Projname;echo",";
        echo $row['SwitchTime'];echo",";
        echo $row['Half'];echo",";
        echo $row['SwitchDate'];
    }
}
function GetProjectName($id)
{
    global $con ;

    $sql = "SELECT Name FROM `projects` WHERE `PK` =$id";
    $DESresult = mysql_query($sql,$con) or die(mysql_error());
    return mysql_result($DESresult,0);
}
function AllowProj($id , $projID)
{
    global $con;
    $sql = "SELECT `PK`,`ETPK`,`PTPK` FROM `emp_allow_projs` where   `ETPK` = $id and PTPK = $projID"; //chk allow  project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result); // total rows
    if ($no_result != 1) // mean  not allow before or denay/remove  before
    {
        //allow  project name
        mysql_query("INSERT INTO `emp_allow_projs` ( `ETPK`, `PTPK`) VALUES ( $id, $projID)",$con);
    }
    else
        echo "Already Assigned";
}
function DenayProj($id , $projID)
{
    global $con ;

    $sql = "delete from `emp_allow_projs` where  `ETPK` = $id and PTPK = $projID";
    echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function changePassword($email, $pass, $newpass)
{	//Employee_Switch_Person.php?action=changePassword&vars=3&var1=smabn&var2=1234&var3=123
    global $con;
    $pk = $_COOKIE["userID"];

    $sql ="SELECT `PK`,`loginID`, `password` FROM `employee` WHERE `PK` = $pk";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    $id = $_COOKIE["userID"];
    while($row = mysql_fetch_assoc($result))
    {
        if($email == $row['loginID'] && $pass == $row['password'] && $id == $row['PK'] )
        {
            mysql_query("update `employee` SET `password` =  '$newpass' where  `employee`.`PK` ='$pk' ",$con);
            echo "sucessful";
        }
        else
            echo "operation fail";
    }
}
function connection()
{
    $username = "root";
    $password = "faizan";
    $hostname = "localhost";
    //connection to the database
    $con= mysql_connect($hostname, $username, $password)  or die("Unable to connect to MySQL");
    echo "Connected to MySQL";
    $db = mysql_select_db("ttl_employee_switch",$con)
    or die("Could not select examples");
}
//----------------------------------------------------------------------------------------
function allAandFinishProjects()
{
    global $con;
    $sql = "SELECT `PK`,`Name` FROM `projects` order by `Name`"; // get all project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    echo "<select class='dmProjName form-control'>";
    echo '<option value="0"><b>Select Project</b></option>';
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
    }
    echo "</select>";
}
//--------------------------------allUnFinishProject-----------------------------------------
function allUnFinishProject(){
    global $con;

    $sql = "SELECT `PK`,`Name` FROM `projects` where  NOT `Status` = 3"; // get all project name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    echo "<select class='UnFinishProjName'>";
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
    }
    echo "</select>";
}
function allEmployeeNames(){
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
    $sql = "SELECT `PK`,`loginID` , `Designation` FROM `employee`  ORDER BY `loginID`"; // get all  production member name
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);	// total number of rows
    echo "<select id='dmEmpName' class='form-control'>";
    echo '<option value="0"><b>SelectEmployee</b></option>';
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
    }
    echo "</select>";
}
function getProjectAndEmpListForNonTeamLead(){
    global $con ;
    $db = mysql_select_db("ttl_employee_switch", $con);
    $sql = "select ETPK,
loginID from
(
SELECT * FROM `emp_curr_proj` where active =1 and
(`Dept_Category` =
(
select `Dept_Category` from emp_curr_proj where `ETPK` = ".$_COOKIE['userID']."
)
or `PTPK` = 4
)
) as ecp

left join
(
select pk as emppk, loginID from employee
) as emp
on emp.emppk  = ecp.etpk

order by loginID";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);	// total number of rows
    echo "<select id='dmEmpName form-control'>";
    echo '<option value="0"><b>SelectEmployee</b></option>';
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
    }
    echo "</select>";
    echo "----//------";
    $sql = "select pk, Name as 'Project Name' from projects where status = 1 or status = 0";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    echo "<select name='dmProjName' class='dmProjName'>";
    echo '<option value="0"><b>Select Project</b></option>';
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
    }
    echo "</select>";
}

function dmProjName($id){
    global $con;
    $db = mysql_select_db("ttl_employee_switch", $con);
    $sql = "SELECT p.Name as 'Project Name', ecp.ETPK,emp.loginID FROM projects p
              INNER JOIN emp_curr_proj ecp
              ON ecp.PTPK = p.PK
              RIGHT JOIN employee emp
              ON emp.pk = ecp.ETPK
              where p.status = 1
              AND emp.Active = 1
              OR ecp.PTPK = 4
              order by LoginID";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);	// total number of rows
    echo "<select id='dmEmpName form-control'>";
    echo '<option value="0"><b>SelectEmployee</b></option>';
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,1).">".mysql_result($result,$i,2)."</option>";
    }
    echo "</select>";
    echo "----//------";
    $sql = "select Name as 'Project Name',  pk  from projects  where status =1 ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    echo "<select name='dmProjName' class='dmProjName form-control'>";
    echo '<option value="0"><b>Select Project</b></option>';
    for ($i=0; $i <= $no_result-1; $i++)
    {
        echo "<option value=".mysql_result($result,$i,1).">".mysql_result($result,$i,0)."</option>";
    }
    echo "<option value='4'>Free</option>";
    echo "</select>";
}


function getTeamLeadProjectAndEmployee($id){
    global $con;
    $db = mysql_select_db("ttl_employee_switch", $con);
    $sql = "SELECT p.Name as 'Project Name', ecp.ETPK,emp.loginID FROM projects p
              INNER JOIN emp_curr_proj ecp
              ON ecp.PTPK = p.PK
              RIGHT JOIN employee emp
              ON emp.pk = ecp.ETPK
              where p.status =1
              and p.TeamLead =".$_COOKIE['userID']."
              AND emp.Active = 1
              OR ecp.PTPK = 4
              order by LoginID";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);	// total number of rows
    echo "<select id='dmEmpName form-control'>";
    echo '<option value="0"><b>SelectEmployee</b></option>';
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,1).">".mysql_result($result,$i,2)."</option>";
    }
    echo "</select>";
    echo "----//------";
    $sql = "select Name as 'Project Name',  pk  from projects  where status =1 and TeamLead =".$_COOKIE['userID'];
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    echo "<select name='dmProjName' class='dmProjName form-control'>";
    echo '<option value="0"><b>Select Project</b></option>';
    for ($i=0;$i<=$no_result-1;$i++)
    {
        echo "<option value=".mysql_result($result,$i,1).">".mysql_result($result,$i,0)."</option>";
    }
    echo "<option value='4'>Free</option>";
    echo "</select>";
}
//-----------------------Get Employee & project Name  ----------------------------------------
function EmpProjNames($id){ // when or if email id already exist return 1
    global $con;
    $db = mysql_select_db("ttl_employee_switch", $con);
    if((int) $_COOKIE['userDesig'] == 3)
        $id = (int) $_COOKIE['userID'];
    $sql = "SELECT employee.PK, employee.Employee_Name, employee.Designation, MemberNames FROM employee  INNER JOIN permissionsinpage ON permissionsinpage.ETPK = $id and permissionsinpage.ETPK=employee.PK and employee.Active=1";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);	// total number of rows
    $desig =  (int)(mysql_result($result,0,2));
    $member_list_allow =  (int)(mysql_result($result,0,3));
    if(( $desig == 3) && ($member_list_allow == 0) )	// 3: medeler(designation) shows only his name
    {
        echo "medeler  here: ".$_COOKIE['permission_MemberNames'] ;
        echo "<select name = 'dmEmpName' id='dmEmpName' class='form-control'>";
        echo "<option value=".mysql_result($result,0,0).">".mysql_result($result,0,1)."</option>";
    }
    else	// show all name
    {
        $sql = "SELECT `PK`,`loginID` , `Designation` FROM `employee` where  employee.Cost_Department = 3 AND employee.Active = 1 ORDER BY `loginID`"; // get all  production member name
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);	// total number of rows
        echo "<select id='dmEmpName form-control'>";
        echo '<option value="0"><b>SelectEmployee</b></option>';
        for ($i=0;$i<=$no_result-1;$i++)
        {
            echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
        }
    }
    echo "</select>";
    echo "----//------";
    //----------------- get `PK`,`Name` FROM projects table ---------------------
    if($desig != 3 ) // not a modeler
    {
        $sql = "SELECT `PK`,`Name` FROM `projects` where `Status` = 1 or `Status` = 0"; // 1: Continue 0: free
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
        echo "<select name='dmProjName' class='dmProjName form-control'>";
        echo '<option value="0"><b>Select Project</b></option>';
        for ($i=0;$i<=$no_result-1;$i++)
        {
            echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
        }
        echo "</select>";
    }
    else	// modeler projects
    {
        $sql = "SELECT projects.PK, projects.Name FROM projects INNER JOIN emp_allow_projs ON emp_allow_projs.ETPK = $id and emp_allow_projs.PTPK=projects.PK ";
        //echo $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
        echo "<select class='dmProjName'>";
        for ($i=0;$i<=$no_result-1;$i++)
        {
            echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
        }
        echo "<option value=4>Free</option>";
        echo "</select>";
    }
}
function getEmpCurrentProjectName($id){
    global $con;
    $db = mysql_select_db("ttl_employee_switch", $con);
    $sql = "SELECT PTPK from emp_curr_proj WHERE ETPK=".$id;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['PTPK'];
    }
}
function SwitchEmpRequestCompare($nameID, $projID){
    global $con;
    $requestByUserId = $_COOKIE["userID"];
    $sql = "Select id from tblswitchemprequest WHERE responseBy is null  AND nameId = ".$nameID." AND projId = ".$projID;
    mysql_query($sql,$con) or die(mysql_error());
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['id'];
    }
}
function SwitchEmpRequest($nameID, $projID, $currentProject,$projTaskPK){
    date_default_timezone_set("Asia/Karachi");
    global $con;
    $requestByUserId = $_COOKIE["userID"];
    $sql = "INSERT INTO `tblswitchemprequest`( `requestById`, `nameId`, `projId`,`requestDateTime`,`response`, `currentProject`, `projTaskPK`)
				VALUES ($requestByUserId,".$nameID.",".$projID.",'".date('Y-m-d H:i:s')."',0,$currentProject,$projTaskPK)";
    mysql_query($sql,$con) or die(mysql_error());
}
function SwitchEmpRequestUpdate($status, $id){
    global $con;
    $requestByUserId = $_COOKIE["userID"];
    date_default_timezone_set("Asia/Karachi");
    echo "<script>console.log('.$id.')</script>";
    $sql = "Update `tblswitchemprequest` set `response` = ".$status.", `responseBy`=".$requestByUserId.", `responseDateTime`='".date('Y-m-d H:i:s')."' where `id` =".$id;
    echo $sql;
    mysql_query($sql,$con) or die(mysql_error());
}
function getSpecificRequestDetail($recordId){
    global $con;
//    $sql = "SELECT projects.PK, projects.Name FROM projects INNER JOIN emp_allow_projs ON emp_allow_projs.ETPK = $id and emp_allow_projs.PTPK=projects.PK ";
    $sql = "SELECT `id`, `requestById`, `nameId`,`projId`,`requestDateTime`,`response`, responseBy
            FROM  `tblswitchemprequest`
            Where id=".$recordId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['responseBy'];
    }
}
function RunningProjectsStatus(){
    echo "Name,Status,Project supervisor,# members, Start Date,End Date,Total Days,Remaining Days,Actual working Days,On leave";
    projStatusDetail_2Arg(1,4);
    freeANDleaveDays();
}
function numProjectPersons($projID , $active){
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
    $sql = "SELECT * FROM  `emp_curr_proj` WHERE  `PTPK` = $projID AND  `Active` =$active and `is_teamlead` = 0";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    return $no_result;
}
function freeANDleaveDays(){
    echo "----//------";
    echo ", - , , , , , , , ,";
    echo "----//------";
    echo "Free,,,";
    echo numProjectPersons(4,1);	// 4 free preson projects 1 : active means avaiable
    echo ",,,,,,";
    //echo "----//------";
    echo Avaiability(0);	//  1 : active means avaiable
}
function Avaiability($active){
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
    $sql = "SELECT * FROM  `emp_curr_proj` WHERE    `Active` =$active";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    return $no_result;
}
function projStatus($projStatusID){
    echo "Name,Status,TeamLead,# members, Start Date,End Date,Total Days,Remaining Days,Actual working Days,On leave";
    projStatusDetail($projStatusID);
}
function projStatusDetail($projStatusID) {// return only Single project : received status forign key  1 mean Continue
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
    $sql ="SELECT projects.PK,projects.Name,project_status.Status,projects.HOD,projects.TeamLead,projects.StartDate,projects.DeadLineDate FROM `projects`,`project_status` WHERE project_status.PK = $projStatusID and projects.Status = $projStatusID";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $row['Name'];echo",";
        echo $row['Status'];echo",";
        $desName = GetDesignatin($row['TeamLead']);
        echo $desName;echo",";
        echo  numProjectPersons($row['PK'],1);echo",";

        $d =  $row['StartDate'];
        $originalDate =  $d;
        $newDate = date("d-M-Y", strtotime($originalDate));
        echo $newDate ;
        echo",";

        $d  = $row['DeadLineDate'];
        $originalDate = $d;
        $newDate = date("d-M-Y", strtotime($originalDate));
        echo $newDate ;
        echo",";

        // total days
        $datetime1 = date_create( $row['StartDate']);
        $datetime2 = date_create( $row['DeadLineDate']);
        $interval = date_diff($datetime1, $datetime2);
        echo $interval->format('%R%a days');	//+0 days
        echo",";
        if( $interval->format('%R%a') > 0)
            //	Remaining days
            $today = date('Y-m-d');
        $datetime1 = date_create($today);
        $intervals = date_diff($datetime1, $datetime2);
        echo $intervals->format('%R%a');	//+0 days
        echo",";
        //	Actual days
        $datetime2 = date_create( $row['StartDate']);
        $intervals = date_diff($datetime2, $datetime1);
        echo $intervals->format('%R%a');	//+0 days
        echo",";
        echo "";
    }
}
function projStatusDetail_2Arg($projStatusID_1,$projStatusID_2) // return only Two project : received status forign key  1 mean Continue, 4 means Pause
{
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
    $sql ="SELECT projects.PK,projects.Name,project_status.Status,projects.HOD,projects.TeamLead,projects.StartDate,projects.DeadLineDate FROM `projects`,`project_status` WHERE ( (project_status.PK = $projStatusID_1 and projects.Status = $projStatusID_1 ) or (project_status.PK = $projStatusID_2 and projects.Status = $projStatusID_2 )) ORDER BY projects.Status";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $row['Name'];echo",";
        echo $row['Status'];echo",";
        $desName = GetDesignatin($row['TeamLead']);
        echo $desName;echo",";
        echo  numProjectPersons($row['PK'],1);echo",";
        $d =  $row['StartDate'];
        $originalDate =  $d;
        $newDate = date("d-M-Y", strtotime($originalDate));
        echo $newDate ;
        echo",";
        $d  = $row['DeadLineDate'];
        $originalDate = $d;
        $newDate = date("d-M-Y", strtotime($originalDate));
        echo $newDate ;
        echo",";
        echo dateDiff($row['StartDate'], $row['DeadLineDate']);
        echo",";
        //	Remaining days
        echo dateDiff($row['DeadLineDate'],date("Y-m-d") );
        echo",";
        //	Actual days
        echo dateDiff($row['StartDate'],date("Y-m-d") );
        echo",";
        echo "";
    }
}
function dateDiff($time1, $time2, $precision = 6) {
    // If not numeric then convert texts to unix timestamps
    if (!is_int($time1)) {
        $time1 = strtotime($time1);
    }
    if (!is_int($time2)) {
        $time2 = strtotime($time2);
    }
    // If time1 is bigger than time2
    // Then swap time1 and time2
    if ($time1 > $time2) {
        $ttime = $time1;
        $time1 = $time2;
        $time2 = $ttime;
    }

    // Set up intervals and diffs arrays
    $intervals = array('year','month','day','hour','minute','second');
    $diffs = array();

    // Loop thru all intervals
    foreach ($intervals as $interval) {
        // Create temp time from time1 and interval
        $ttime = strtotime('+1 ' . $interval, $time1);
        // Set initial values
        $add = 1;
        $looped = 0;
        // Loop until temp time is smaller than time2
        while ($time2 >= $ttime) {
            // Create new temp time from time1 and interval
            $add++;
            $ttime = strtotime("+" . $add . " " . $interval, $time1);
            $looped++;
        }

        $time1 = strtotime("+" . $looped . " " . $interval, $time1);
        $diffs[$interval] = $looped;
    }
    $count = 0;
    $times = array();
    // Loop thru all diffs
    foreach ($diffs as $interval => $value) {
        // Break if we have needed precission
        if ($count >= $precision) {
            break;
        }
        // Add value and interval
        // if value is bigger than 0
        if ($value > 0) {
            // Add s if value is not 1
            if ($value != 1) {
                $interval .= "s";
            }
            // Add value and interval to times array
            $times[] = $value . " " . $interval;
            $count++;
        }
    }
    return implode("-", $times);
}
function GetDesignatin($despk){
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);

    $sql = "SELECT employee.Employee_Name FROM `employee` WHERE employee.PK =$despk";
    $DESresult = mysql_query($sql,$con) or die(mysql_error());
    return mysql_result($DESresult,0);
}
//----------------------------------------------------------------------------------------
//--------------------------- updateProjectInfo ie finish, start ec------------------------
function updateProjectInfo($projID, $projStatusID, $projModeID) { // this was  using  in the first previous page
    global $con ;
    $db = mysql_select_db("ttl_employee_switch", $con);
    $todayDate = date('Y-m-d');
    $sql = "UPDATE  `ttl_employee_switch`.`projects` SET  `Status` =  '$projStatusID' , `StatusMode` = $projModeID, `LastStatusChangeDate` = '$todayDate'  WHERE  `projects`.`PK` =$projID;";
    mysql_query($sql,$con) or die(mysql_error());
    if($projStatusID == 3 or $projStatusID == 4 ) // 3 : Finish , 4 : Pause
    {
        $sql ="SELECT ETPK, Dept_Category FROM emp_curr_proj WHERE PTPK = $projID";
        $result = mysql_query($sql,$con) or die(mysql_error());
        $no_result = mysql_num_rows($result);
        while($row = mysql_fetch_assoc($result))
        {
            //if the ETPK is team lead then don't directly switch him to FREE. check if he is team lead of other project as well then switch
            //him to any of the project
            if($row['Dept_Category'] == 5){
                //$sql1 = "select ETPK, PTPK, Active, is_teamlead, Shift, Dept_Category from emp_curr_proj where ETPK=".$row['ETPK']."Active = 1";
                $sql1 = "SELECT * FROM `projects` WHERE  Status = 1 AND TeamLead = ".$row['ETPK'];
                $result1 = mysql_query($sql1,$con) or die (mysql_error());
                $getRowsCount = mysql_num_rows($result1);
                if($getRowsCount> 0){
                    while($roww = mysql_fetch_assoc($result1)){
                        SwitchEmp1($row['ETPK'], $roww['PK']);
                        break;
                    }
                }
                else {
                    SwitchEmp1($row['ETPK'], '4');
                }
                echo 'rowscount'.$getRowsCount;
            }
            else{
                SwitchEmp1($row['ETPK'], '4');   // 4 : Free
            }
        }
        $sql = "delete from `emp_allow_projs` where PTPK = $projID";
        echo $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());
    }
}
function SwitchEmp1($nameID, $projID)
{	//Employee_Switch_Person.php?action=SwitchEmp&vars=2&var1=1&var2=2
    if($projID == 4)
        if( $_COOKIE['userDesig'] == 3)
        {
            echo "You are not allow to switch to free";
            return false;
        }
    global $con;
    $db = mysql_select_db("ttl_employee_switch", $con);
    $half = calculateHalf();
    mysql_query("update `switch_person` SET `PTPK` =  '$projID', TaskPK = '1'  where `SwitchDate` = CURDATE() and PTPK <> 0 and `EmployeeNamePK` = $nameID and `Half` = $half ",$con);
    //----------------------- Udateing Emp current project On which he is doing work ---------------------
    $result = mysql_query("update `emp_curr_proj` SET `PTPK` =  '$projID', TaskPK = '1' where  `emp_curr_proj`.`ETPK` ='$nameID' ",$con);
    $sql = "SELECT `PK` , `Name` FROM `projects` WHERE `Status`=1"; //get the running projects
    $resultStatusRun = mysql_query($sql) or die(mysql_error());

    if (!$resultStatusRun) {
        echo "Could not successfully run query ($sql) from DB: " . mysql_error();
        exit;
    }

    if (mysql_num_rows($resultStatusRun) == 0) {
        echo "No rows found, nothing to print so am exiting";
        exit;
    }

    while($row = mysql_fetch_assoc($resultStatusRun))
    {
        echo "-----".$row['PK']."------------";
        echo "-----".$row['Name']."------------";
        $projIDRunn = $row['PK'];
        $sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK=$projIDRunn and `Active` = 1 and `is_teamlead` = 0" ;  // get the persons of each running projects
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_fetch_row($result);
        $total_person = $total_rows[0]; //total rows
        echo "total num :".$total_rows ;
        echo "-----------";
        $sql = "SELECT `PK` FROM currrent_projects WHERE date =  CURDATE() and PTPK=$projIDRunn and  `Half` = $half ";
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_num_rows($result);
        if($total_rows == 0)
        {
            echo "------new Recored-----";
            $sql = "INSERT INTO `currrent_projects`( `PTPK`, `Persons`, `Half`,`date`) VALUES ($projIDRunn,".$total_person.",$half,CURDATE())";
            mysql_query($sql,$con) or die(mysql_error());
        }
        else //if($total_rows == 0) // if current half record already exist
        {
            //echo "---------half record already -------";
            while($row_itr = mysql_fetch_assoc($result))
            {
                echo $row_itr['PK'];
                $sql = "UPDATE `currrent_projects` SET `Persons` = '$total_person' WHERE `PK` =".$row_itr['PK'];
                mysql_query($sql,$con) or die(mysql_error());
            }
        }
    }
    mysql_free_result($result);
    echo "done";
}
function SwitchEmp($nameID, $projID, $teamLeadId, $taskId)
{
    if($projID == 4)
        if( $_COOKIE['userDesig'] == 3)
        {
            echo "You are not allow to switch to free";
            return false;
        }

    global $con;
    $db = mysql_select_db("ttl_employee_switch", $con);
    $half = calculateHalf();
    mysql_query("update `switch_person` SET `PTPK` =  '$projID', LeadBy = '$teamLeadId', `TaskPK` = '$taskId'
                where `SwitchDate` = CURDATE() and PTPK <> 0 and `EmployeeNamePK` = $nameID and `Half` = $half ",$con);
    //----------------------- Updating Emp current project On which he is doing work ---------------------
    $result = mysql_query("update `emp_curr_proj` SET `PTPK` =  '$projID', `TaskPK` = '$taskId' where  `emp_curr_proj`.`ETPK` ='$nameID' ",$con);
    $sql = "SELECT `PK` , `Name` FROM `projects` WHERE `Status`= 1"; //get the running projects
    $resultStatusRun = mysql_query($sql) or die(mysql_error());

    if (!$resultStatusRun) {
        echo "Could not successfully run query ($sql) from DB: " . mysql_error();
        exit;
    }

    if (mysql_num_rows($resultStatusRun) == 0) {
        echo "No rows found, nothing to print so am exiting";
        exit;
    }

    while($row = mysql_fetch_assoc($resultStatusRun))
    {
        echo "-----".$row['PK']."------------";
        echo "-----".$row['Name']."------------";
        $projIDRunn = $row['PK'];
        $sql = "SELECT COUNT(*) FROM emp_curr_proj WHERE PTPK = $projIDRunn and `Active` = 1 and `is_teamlead` = 0" ;  // get the persons of each running projects
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_fetch_row($result);
        $total_person = $total_rows[0]; //total rows
        echo "total num :".$total_rows ;
        echo "-----------";
        $sql = "SELECT `PK` FROM currrent_projects WHERE date =  CURDATE() and PTPK=$projIDRunn and  `Half` = $half ";
        $result = mysql_query($sql) or die(mysql_error());
        $total_rows = mysql_num_rows($result);
        if($total_rows == 0)
        {
            echo "------new Recored-----";
            $sql = "INSERT INTO `currrent_projects`( `PTPK`, `Persons`, `Half`,`date`)
				VALUES ($projIDRunn,".$total_person.",$half,CURDATE())";
            mysql_query($sql,$con) or die(mysql_error());
        }
        else //if($total_rows == 0) // if current half record already exist
        {
            //"---------half record already -------";
            while($row_itr = mysql_fetch_assoc($result))
            {
                echo $row_itr['PK'];
                $sql = "UPDATE `currrent_projects` SET `Persons` = '$total_person' WHERE `PK` =".$row_itr['PK'];
                mysql_query($sql,$con) or die(mysql_error());
            }
        }
    }
    mysql_free_result($result);
    echo "done";
}
//----------------------------------------------------------------------------------------
//-----------------------------GetProjName onchange user name----------------------------------
function GetProjName($nameID){
    global $con;
    $sql = "select PTPK FROM emp_curr_proj WHERE ETPK = $nameID";
    //echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo mysql_result($result,0);
// no yahw tu sirf current project ki value a rahi hai
//	if not a modeler then also find allow projects

    if((int) $_COOKIE['userDesig'] != 3)	// 3 is modeler
    {
        echo "----//------";
        $id = (int) $nameID;		// et the current modeler  id

        $sql = "SELECT projects.PK, projects.Name FROM projects INNER JOIN emp_allow_projs ON emp_allow_projs.ETPK = $id and emp_allow_projs.PTPK=projects.PK ";
        //echo $sql;
        $result = mysql_query($sql,$con) or die(mysql_error());

        $no_result = mysql_num_rows($result);

        echo "<select class='dmProjName form-control'>";

        for ($i=0;$i<=$no_result-1;$i++)
        {
            echo "<option value=".mysql_result($result,$i,0).">".mysql_result($result,$i,1)."</option>";
        }
        echo "<option value=4>Free</option>";
        echo "</select>";
    }
}

#region whiteboard Functions
function whiteboardfn_Attendance($PreBoardDate){

    //ChromePhp::log('Hello console!');
    //ChromePhp::log($_SERVER);
    global $con;

    $originalDate =$PreBoardDate;// "2013-Oct-10";
    $date = date("Y-m-d", strtotime($originalDate));
    if(($date) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date1 = explode("-", $date);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $originalDate = date("Y-m-d", strtotime($originalDate));

    $sql="

SELECT *  FROM
	(
	SELECT * FROM `switch_person` where switchDate = '".$originalDate."' /*curdate() */
	) as sp
	left join
	(
	select PK as emppk ,Employee_Name from employee
	)as emp

	on sp.EmployeeNamePK = emp.emppk

	left join
	(
	select pk as ProjPK, Name, TeamLead as projLead from projects
	)
	as proj
	on proj.ProjPK = sp.ptpk

	left join
	(
	select etpk as ecppk ,is_teamlead, Dept_Category from emp_curr_proj
	) as ecp
	on ecp.ecppk = sp.EmployeeNamePK

	left join
	(
	select pk as dptCatpk , Category_Name from dept_category
	) as dptCat
	on dptCat.dptCatpk  = ecp.Dept_Category

	left join
	(
	select PK as empProjLeadNamepk ,Employee_Name  as LeadName from employee
	)as empProjLeadName
	on empProjLeadName.empProjLeadNamepk =  proj.projLead
	WHERE Half IN (1,2)
	ORDER BY ProjPK Desc, Employee_Name ASC";

    $result = mysql_query($sql,$con) or die(mysql_error());
    $jsonData = array();
    while($row = mysql_fetch_assoc($result))
    {
        $jsonData[] = $row;
    }
    echo json_encode($jsonData);
}
function whiteboardfn_PreDate($PreBoardDate,$halfRecBrd){
    global $con;
    $originalDate = $PreBoardDate;// "2013-Oct-10";
    $date = date("Y-m-d", strtotime($originalDate));
    if(($date) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date1 = explode("-", $date);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $originalDate = date("Y-m-d", strtotime($originalDate));
    $date = explode("-", $originalDate);
    $Category_NameArr =array();
    $Category_NoArr[0] =0;
    $Category_NameArr[0] = "Dummy indexPreWB";
    $sql = "(SELECT `Category_Name` FROM `dept_category`)";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        array_push($Category_NameArr , $row['Category_Name']);
    }
    $sql = "(SELECT `ETPK`,`Dept_Category` FROM `emp_curr_proj`)";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $Category_NoArr[$row['ETPK']] = $row['Dept_Category'];
    }
    $Emp_NameArr = array();
    $Emp_NameArr = GetEmpNameArrReturn();
    $Proj_NameArr =array();
    $Proj_NameArr = GetProjNameArrReturn();
    $userID = ( (int) $_COOKIE['userID'] );
    $sql = "SELECT * FROM `switch_person` where `SwitchDate` = '$originalDate'  and `Half` = $halfRecBrd order by `PTPK`" ;
    echo "No Data Found";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $projID = -1;
    $projIDpre = 1 ;
    $i = 0;	// use for update class
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        if( $row['PTPK'] != $projID)
        {
            echo "<tr>";
            echo "<td class = 'th'><b><u>";
            if(((int)$row['PTPK'] )==0 )
                echo "Not Available";
            else
            {
                echo $Proj_NameArr[$row['PTPK']];
            }
            echo "</b></td>";
            echo "<td>";
            echo "<td class=".$i.">change to count member</td>";
            echo "<td>-</td>";
            echo "</td>";
            $i +=1;
        }
        $projID = $row['PTPK'];
        if($userID == $row['EmployeeNamePK'])
        {
            echo "<td class='thismodeler'>";
        }
        else
        {
            if(isset ($Category_NoArr[$row['EmployeeNamePK']]) ) // category  loss when anyone fire
                echo "<td class = '".$Category_NameArr[$Category_NoArr[$row['EmployeeNamePK']]]."'>";
            else
                echo "<td >";
        }
        echo $Emp_NameArr[$row['EmployeeNamePK']];
        echo "</td>";
    }
}
function new_whiteboardfn(){
    InactiveReturn(); // logoff  this user if some one has logoff it
    global $con;
    $userID =(int) $_COOKIE['userID'];
    $originalDate = "";
    $half =  calculateHalf();
    /*
    $sql = "
    select * from
    (
        select * from
        (
            select * from
            (
                select pk as ProjPK, Name , status ,TeamLead from projects where status between 0 and 1
            ) as a
            left join
            (
                select * from switch_person where switchDate = curdate() and half = $half
            )as b
            on a.ProjPK= b.ptpk
        )as leftt
        union
        select * from
        (
            select * from
            (
                select pk as ProjPK, Name , status ,TeamLead  from projects where status between 0 and 1
            ) as  c
            right join
            (
                select * from switch_person where switchDate = curdate() and half = $half
            )as d

                on c.ProjPK= d.ptpk
        ) as rightt

    )as Proj_SP
    left join
    (
    select ETPK as ECPK , PTPK as Proj_Key, Active as Active_Present, is_teamlead ,Dept_Category from emp_curr_proj
    ) as emp_curr_proj

    on emp_curr_proj.ECPK = Proj_SP.EmployeeNamePK

    left join permissionsinpage
    on permissionsinpage.ETPK = Proj_SP.EmployeeNamePK

    left join employee
    on employee.PK = Proj_SP.EmployeeNamePK

    left join
    (
    select PK as LN_PK, Employee_Name as LeadName from employee
    ) as LeadName
    on LeadName.LN_PK= Proj_SP.TeamLead

    left join
    (
    select PK as CN_PK,  Category_Name from dept_category
    ) as dept_category

    on dept_category.CN_PK= emp_curr_proj.Dept_Category

    ORDER BY (ETPK=  $userID)   DESC, RAND()
    ";
    */
// oer wali sql mai omer ka record nahew a raha tha or un ki permission etc  employee table filter ho rahah tha modeller se
    $sql = "
select * from
(
	select * from
	(
		select * from
		(
			select * from
			(
				select pk as ProjPK, Name , status ,TeamLead from projects where status between 0 and 1
			) as a
			left join
			(
				select * from switch_person where switchDate = curdate() and half = $half
			)as b
			on a.ProjPK= b.ptpk
		)as  inleft
		left join
                (
                SELECT `pk` as emppk, `Cost_Department` ,`Employee_Name`, `Designation`, `Active`FROM `employee`
                )
                as empl
		on empl.emppk = inleft.EmployeeNamePK

	)as leftt
	union
	select * from
	(
		select * from
		(
			select * from
			(
				select pk as ProjPK, Name , status ,TeamLead  from projects where status between 0 and 1
			) as  c
			right join
			(
				select * from switch_person where switchDate = curdate() and half = $half
			)as d
                        on c.ProjPK= d.ptpk
		)as inright

		right join
                (
                SELECT `pk` as emppk, `Cost_Department` ,`Employee_Name`, `Designation`, `Active`FROM `employee`
                )
                as empl
		on empl.emppk = inright.EmployeeNamePK

	) as rightt

)as Proj_SP
left join
(
select ETPK as ECPK , PTPK as Proj_Key, Active as Active_Present, is_teamlead ,Dept_Category from emp_curr_proj
) as emp_curr_proj

on emp_curr_proj.ECPK = Proj_SP.EmployeeNamePK

left join permissionsinpage
on permissionsinpage.ETPK = Proj_SP.emppk


left join
(
select PK as LN_PK, Employee_Name as LeadName from employee
) as LeadName
on LeadName.LN_PK= Proj_SP.TeamLead

left join
(
select PK as CN_PK,  Category_Name from dept_category
) as dept_category



on dept_category.CN_PK= emp_curr_proj.Dept_Category

left join
(
select * FROM  emp_project_task_list
) as task_category

on task_category.pk = Proj_SP.TaskPK


ORDER BY (emppk=  $userID)   DESC, RAND()
";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        echo $row['Active_Present'];	// from emp_curr_proj
        echo ",";
        echo $row['ProjPK'];			//1
        echo ",";
        if($row['Name'] == null){
            $row['Name'] = "Not Available";
        }
        echo $row['Name'];			//2
        echo ",";
        echo $row['Employee_Name']."</br><small>(".$row['taskName'].")<small>";
        echo ",";
        echo $row['Category_Name'];		//4
        echo ",";
        echo $row['ETPK'];					//5
        echo ",";
        echo $row['Dept_Category'];			//6
        echo ",";
        echo $row['WhiteBoard_EmpDetail'];	//7
        echo ",";
        echo $row['Entry_WhiteBoard'];		//8
        echo ",";
        echo $row['LeadName'];				//9
        echo ",";
        echo $row['SwitchDate'];			//10
        echo ",";
        echo $row['is_teamlead'];			//11
        echo "----//------";
    }
}
function whiteboardfn(){
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
//get dept_category table in array
    $Category_NameArr =array();
    $Category_NoArr[0] =0;
    $Category_NameArr[0] = "Dummy index";

    $sql = "(SELECT `Category_Name` FROM `dept_category`)";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        array_push($Category_NameArr , $row['Category_Name']);
    }

    $sql = "(SELECT `ETPK`,`Dept_Category` FROM `emp_curr_proj`)";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $Category_NoArr[$row['ETPK']] = $row['Dept_Category'];
    }
    $Emp_NameArr =array();
    $Emp_NameArr = GetEmpNameArrReturn();
    $userDesig = (int)  $_COOKIE['userDesig'];
    if ($userDesig != 3 ) // 3: Modeler
        $sql = "SELECT `PK`,`Name`, `TeamLead` FROM `projects` where (`Status` = 1 or `Status` = 0)"; // 1: Continue 0 free
    else
    {
        $userID =(int) $_COOKIE['userID'];
        $sql = "SELECT `PK`,`Name`, `TeamLead`, `Dept_Category` FROM `projects`,`emp_curr_proj`  where (`projects`.`Status` = 1 or `projects`.`Status` = 0 ) and (`emp_curr_proj`.`ETPK` =  $userID and `emp_curr_proj`.`Active` =  1)";
    }
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);

    if($no_result != 0)
    {
        $freeRowitr =0;
        $rowNo =-1;
        for ($i=0;$i<=$no_result-1;$i++)
        {
            $TeamleadID = mysql_result($result,$i,2);	//$TeamleadID : TeamLead coloumn of project table // 0 mean free coloumn
            if($TeamleadID != 0) // 0: free project coloumn no temalead
            {
                $rowNo = $rowNo + 1;
                echo "<tr>";
                echo "<td class ='th'> ".mysql_result($result,$i,1)."</td>"; // Project Names First Row of white Board
                $name = $Emp_NameArr[$TeamleadID];
                $userID =(int) $_COOKIE['userID'];
                if($userID == $TeamleadID)	// if this is a proj leaader
                    echo '<td class= "thisTeamLead"> ';
                else
                    echo "<td> <label class='teamlead'>";		//Other team leader or project leadder

                if(( (int) $_COOKIE['userDesig'] )!= 3)
                {
                    echo '<a href="DetailEmp.php?id='.$TeamleadID.'&name='.$name.'"><b>';
                    echo $Emp_NameArr[$TeamleadID];
                    echo '</b><a>';
                }
                else
                {
                    echo GetEmpName($TeamleadID);
                }
                echo "</label></td>";

                echo "<td class=".$rowNo.">change to count member</td>";
                echo "<td>-</td>";
                collectEmpOnWorking4Arg(mysql_result($result,$i,0), $TeamleadID,$Category_NameArr,$Emp_NameArr);	//$Category_NameArr: dept_category table
                echo "</tr>";
            }
            else	// free coloum		Blank space in 2nd row free coloumn
            {
                collectEmpOnWorking4Arg(mysql_result($result,$i,0), $TeamleadID,$Category_NameArr,$Emp_NameArr);	//$Category_NameArr: dept_category table
            }
        }
// Free coloumn
        $rowNo = $rowNo +1;
        echo "<tr>";
        global $freePerson;
        echo "<td class='th'>Free</td>";
        echo "<td> </td>";
        echo "<td class=".$rowNo.">sfsdf</td>";
        //echo "<td>".(intval(str_replace(" ", "", $no_result)))-1."</td>";
        echo "<td>-</td>";
        for ($i=0; $i<Count($freePerson); $i++)
        {
            echo '<a href="DetailEmp.php?id='.$freePerson[$i].'">';
            if(( (int) $_COOKIE['userDesig'] )!= 3)
            {
                echo '<td class="modelercss '.$Category_NameArr[$Category_NoArr[$freePerson[$i]]].'" id="modeler'.$freePerson[$i].'"> ';
                echo '<a href="DetailEmp.php?id='.$freePerson[$i].'">';
                echo $Emp_NameArr[$freePerson[$i]];
                echo '<a>';
            }
            else
            {
                if(( $freePerson[$i] )!= ( (int) $_COOKIE['userID'] ))
                {
                    echo '<td class="modelercss '.$Category_NameArr[$Category_NoArr[$freePerson[$i]]].'" id="modeler'.$freePerson[$i].'"> ';
                    echo $Emp_NameArr[$freePerson[$i]];
                }
                else
                {
                    echo '<td class= "thismodeler"> ';
                    echo $Emp_NameArr[$freePerson[$i]];
                }
            }
            echo "</td>";
        }
        echo "</tr>";
// absent coloumn
        $rowNo = $rowNo +1;
        echo "<tr>";
        global $abscentEmp;
        echo "<td class='th'>Not Available</td>";
        echo "<td></td>";
        echo "<td class=".$rowNo.">sfsdf</td>";
        echo "<td>-</td>";
        for ($i=0; $i<=Count($abscentEmp)-1; $i++)
        {
            if(( (int) $_COOKIE['userDesig'] )!= 3)
            {
                echo '<td class="modelercss '.$Category_NameArr[$Category_NoArr[$abscentEmp[$i]]].'" id="modeler'.$abscentEmp[$i].'">';
                echo '<a href="DetailEmp.php?id='.$abscentEmp[$i].'"> ';
                echo $Emp_NameArr[$abscentEmp[$i]];
                echo '<a>';
            }
            else
            {
                echo '<td class="modelercss '.$Category_NameArr[$Category_NoArr[$abscentEmp[$i]]].'" id="modeler'.$abscentEmp[$i].'">';
                echo $Emp_NameArr[$abscentEmp[$i]];
            }
            echo "</td>";
        }
        echo "</tr>";
    }
}
#endregion whiteboard functions

$abscentEmp = array();
function collectEmpOnWorking4Arg($projID,$TeamleadID,$Category_NameArr,$Emp_NameArr){
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
    if(date('H') < 22)
        $shift =1;
    else
        $shift = 2;
    $sql = "select `ETPK` , `Active`,`Dept_Category` FROM emp_curr_proj WHERE PTPK = $projID  and `Shift` =  $shift order by Dept_Category "  ;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $no_result = mysql_num_rows($result);
    if($projID == 4)
    {
        global $freePerson;
        while($row = mysql_fetch_assoc($result))
        {
            if( ($row['Active']) == 1 )
            {
                $temp = $row['ETPK'] ;

                $freePerson[] = $temp;
            }
            else
            {
                global $abscentEmp;
                $temp = $row['ETPK'];
                $abscentEmp[] = $temp;
            }
        }
    }
    else
    {
        while($row = mysql_fetch_assoc($result))
        {
            if( ($row['Active']) == 1 )
            {
                if($row['ETPK'] != $TeamleadID)
                {
                    $temp = $row['ETPK'];
                    $name = $Emp_NameArr[$row['ETPK']];
                    if(( (int) $_COOKIE['userDesig'] )!= 3)	// 3 means modeler
                    {
                        echo '<td class="modelercss '.$Category_NameArr[$row['Dept_Category']].'" id="modeler'.$row['ETPK'].'">  '; //$Category_NameArr : contain table: dept_category	data  // -1 is laye '$Category_NameArr' k array 0 se start hotahai aur data 1 se 		//vars=2&var1="+loginID+"&var2="+pass;
                        echo '<a href="DetailEmp.php?id='.$temp.'&name='.$name.'">';
                        echo $name;
                        echo '<a>';
                    }
                    else
                    {
                        if(( $temp )!= ( (int) $_COOKIE['userID'] ))
                        {
                            echo '<td class="thismodeler '.$Category_NameArr[$row['Dept_Category']].'" id="modeler'.$row['ETPK'].'">  ';
                            echo $Emp_NameArr[$row['ETPK']];
                        }
                        else
                        {
                            echo '<td class= "thismodeler"> ';
                            echo $Emp_NameArr[$row['ETPK']];
                        }
                    }
                    echo "</td>";
                }
            }
            else
            {
                global $abscentEmp;
                $temp = $row['ETPK'];
                $abscentEmp[] = $temp;
            }
        }
    }
}
function collectEmpOnWorking($projID,$TeamleadID){
    global $con;
    if(date('H') < 22)
        $shift =1;
    else
        $shift = 2;
    $sql = "select `ETPK` , `Active` FROM emp_curr_proj WHERE PTPK = $projID  and `Shift` =  $shift "  ;
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        if( ($row['Active']) == 1  )
        {
            if($row['ETPK'] != $TeamleadID)
            {
                $temp = $row['ETPK'];
                $name = GetEmpNameReturn($row['ETPK']);
                if(( (int) $_COOKIE['userDesig'] )!= 3)	// 3 means modeler
                {
                    echo '<td class="modelertd" id="modeler'.$row['ETPK'].'"> ';								//vars=2&var1="+loginID+"&var2="+pass;
                    echo '<a '.$row['ETPK'].'" href="DetailEmp.php?id='.$temp.'&name='.$name.'"> ';
                    echo $name;

                    echo '<a>';
                }
                else
                {
                    if(( $temp )!= ( (int) $_COOKIE['userID'] ))
                    {
                        echo '<td> ';
                        echo GetEmpName($row['ETPK']);
                    }
                    else
                    {
                        echo '<td class= "thismodeler"> ';
                        echo GetEmpName($row['ETPK']);
                    }
                }
                echo "</td>";
            }
        }
        else
        {
            global $abscentEmp;
            $temp = $row['ETPK'] ;
            $abscentEmp[] = $temp;
        }
    }
}
function GetLoginIDReturn($despk) {
    global $con;
    $sql = "SELECT employee.loginID FROM `employee` WHERE employee.PK =$despk";
    $DESresult = mysql_query($sql,$con) or die(mysql_error());
    return mysql_result($DESresult,0);
}
function GetEmpNameReturn($despk){
    global $con;
    $sql = "SELECT employee.Employee_Name FROM `employee` WHERE employee.PK =$despk";
    $DESresult = mysql_query($sql,$con) or die(mysql_error());
    return mysql_result($DESresult,0);
}
function GetEmpName($despk){
    global $con;
    $sql = "SELECT employee.Employee_Name FROM `employee` WHERE employee.PK =$despk";
    $DESresult = mysql_query($sql,$con) or die(mysql_error());
    echo mysql_result($DESresult,0);
}
function GetEmpNameArrReturn(){
    global $con;
    $Emp_NameArr =array();
    $Emp_NameArr[0] = "Dummy index";
    $sql= "select PK , `Employee_Name` from `employee`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $Emp_NameArr[$row['PK']] = $row['Employee_Name'];
    }
    return $Emp_NameArr;
}
function getProjectCommentHistory($projectId){
    global $con;
    $db=mysql_select_db("ttl_employee_switch", $con);
    $sql = "SELECT opm_pk, olm_projID, opm_OldComments, opm_timedate, opm_updateBy FROM `oldprojmodecomments` WHERE olm_projID = $projectId";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        echo "----//------";
        echo $row['opm_OldComments']; echo"|||";
        echo $row['opm_timedate'];
    }
}
function GetProjNameArrReturn(){
    global $con;
    $Proj_NameArr =array();
    $Proj_NameArr[0] = "Not Available";
    $sql= "select PK , `Name` from `projects`";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $Proj_NameArr[$row['PK']] = $row['Name'];
    }
    return $Proj_NameArr;
}
function GetModelerNameArrReturn(){
    global $con;
    $Modeler_NameArr =array();

    $Modeler_NameArr [0] = "Not Available";

    $sql= "select `ETPK` from `emp_curr_proj` ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        array_push($Modeler_NameArr,$row['ETPK']);
    }
    return $Modeler_NameArr;
}
function get_real_up_address() {
    if (isset($_SERVER)) {
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
            return $_SERVER["HTTP_X_FORWARDED_FOR"];
        if (isset($_SERVER["HTTP_CLIENT_IP"]))
            return $_SERVER["HTTP_CLIENT_IP"];
        return $_SERVER["REMOTE_ADDR"];
    }
    if (getenv(�HTTP_X_FORWARDED_FOR�))
                         return getenv(�HTTP_X_FORWARDED_FOR�);
                      if (getenv(�HTTP_CLIENT_IP�))
                         return getenv(�HTTP_CLIENT_IP�);
                      if (getenv(�REMOTE_ADDR�))
                         return getenv(�REMOTE_ADDR�);
                      return �UNKNOWN�;
}
function getip() {
    if (isSet($_SERVER)) {
        if (isSet($_SERVER["HTTP_X_FORWARDED_FOR"])) {
            $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        } elseif (isSet($_SERVER["HTTP_CLIENT_IP"])) {
            $realip = $_SERVER["HTTP_CLIENT_IP"];
        } else {
            $realip = $_SERVER["REMOTE_ADDR"];
        }
    } else {
        if ( getenv( 'HTTP_X_FORWARDED_FOR' ) ) {
            $realip = getenv( 'HTTP_X_FORWARDED_FOR' );
        } elseif ( getenv( 'HTTP_CLIENT_IP' ) ) {
            $realip = getenv( 'HTTP_CLIENT_IP' );
        } else {
            $realip = getenv( 'REMOTE_ADDR' );
        }
    }
    return $realip;
}
function copyFirstHalfSwitchingValuesTo2ndHalf($dateRng){
    global $con;
    if(($dateRng) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date = explode(" - ", $dateRng);
        $date1 = explode("/", $date[0]);
        $date2 = explode("/", $date[1]);
        $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
        $date[0] = date("Y-m-d", strtotime($originalDate));
        $originalDate = $date2[2]."-".$date2[1]."-".$date2[0];
        $date[1] = date("Y-m-d", strtotime($originalDate));
    }
    $date = $date[0];
    echo $date;
    if(isset($date))
        $sql = 	"SELECT  `EmployeeNamePK`,`PTPK`, `SwitchDate`
		FROM  `switch_person`
		WHERE  `Half` = 1 and `SwitchDate` =  '$date' ";
    echo $sql;
    $result = mysql_query($sql,$con) or die(mysql_error());
    while($row = mysql_fetch_assoc($result))
    {
        $ETPK = $row['EmployeeNamePK'];
        $sql = 	"SELECT *  FROM  `switch_person` WHERE  `SwitchDate` =  '$date'  and   `Half` = 2 and `EmployeeNamePK` = $ETPK
					";
        echo $sql;
        $count = mysql_query($sql,$con) or die(mysql_error());
        $total_rows = mysql_fetch_row($count);
        $rows = $total_rows[0]; // return total rows
        if ($rows == 0)
        {
            $PTPK = $row['PTPK'];
            echo "record found ".$row." -> ".$ETPK." -> " .$row['EmployeeNamePK']."---".$row['PTPK']."---".$row['SwitchDate']."
					";
            $sql =  "select * from `loginrecord` where `Date` = '$date' and `UserID` = $ETPK order by `PK` desc limit 1"; //fet last record //select * from `loginrecord` where `Date` = '2013-12-20' and `UserID` = 6 order by `PK` desc limit 1
            $loginRcd = mysql_query($sql,$con) or die(mysql_error());
            while($LogRow = mysql_fetch_assoc($loginRcd))
            {
                $realtime = $LogRow['Time'];
                $time = explode(":", $realtime);//01:05:34
                if(!($LogRow['InOut'] == 0 and $time[0] < 3) )  //agar koi empl 4 bajay se pehle logoff karta hai tu us ka second half count nahew ho ga
                {
                    $sql = "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `Half`,`SwitchDate`) VALUES($PTPK,$ETPK,2,'$date')"; // get all project name
                    echo $sql;
                    mysql_query($sql,$con) or die(mysql_error());
                }
            }
        }
    }
}
function All_copyFirstHalfSwitchingValuesTo2ndHalf($date)
{
    global $con;
    echo "-=====================---------------------------------------------";
    $originalDate =$date;// "2013-Oct-10";
    $date = date("Y-m-d", strtotime($originalDate));
    if(($date) != "") // has a space 01-09-2013 - 11-09-2013
    {
        $date1 = explode("-", $date);
    }
    $originalDate = $date1[2]."-".$date1[1]."-".$date1[0];
    $date = date("Y-m-d", strtotime($originalDate));
    while(date("Y-m-d") != $date)
    {
        echo "match with today";

        if(isset($date))
            $sql = 	"SELECT  `EmployeeNamePK`,`PTPK`, `SwitchDate`
			FROM  `switch_person`
			WHERE  `Half` = 1 and `SwitchDate` =  '$date' ";
        $result = mysql_query($sql,$con) or die(mysql_error());
        while($row = mysql_fetch_assoc($result))
        {
            $ETPK = $row['EmployeeNamePK'];
            $sql = 	"SELECT *  FROM  `switch_person` WHERE  `SwitchDate` =  '$date'  and   `Half` = 2 and `EmployeeNamePK` = $ETPK";
            echo $sql;
            $count = mysql_query($sql,$con) or die(mysql_error());
            $total_rows = mysql_fetch_row($count);
            $rows = $total_rows[0]; // return total rows
            if ($rows == 0)
            {
                $PTPK = $row['PTPK'];
                echo "record found ".$row." -> ".$ETPK." -> " .$row['EmployeeNamePK']."---".$row['PTPK']."---".$row['SwitchDate']."
						";
                $sql =  "select * from `loginrecord` where `Date` = '$date' and `UserID` = $ETPK order by `PK` desc limit 1"; //fet last record //select * from `loginrecord` where `Date` = '2013-12-20' and `UserID` = 6 order by `PK` desc limit 1
                $loginRcd = mysql_query($sql,$con) or die(mysql_error());
                while($LogRow = mysql_fetch_assoc($loginRcd))
                {
                    $realtime = $LogRow['Time'];
                    $time = explode(":", $realtime);//01:05:34
                    if(!($LogRow['InOut'] == 0 and $time[0] < 4) )  //agar koi empl 4 bajay se pehle logoff karta hai tu us ka second half count nahew ho ga
                    {
                        $sql = "INSERT INTO `switch_person`( `PTPK`, `EmployeeNamePK`, `Half`,`SwitchDate`) VALUES($PTPK,$ETPK,2,'$date')"; // get all project name
                        mysql_query($sql,$con) or die(mysql_error());
                    }
                }
            }
        }
        $date = new DateTime($date);
        $date->modify('+1 day');
        $date =  $date->format('Y-m-d');
        echo "-------------".$date;
    } // while
    echo $date;
}
function slidechange(){
    $i = 1;
    foreach (glob("GIF/*.jpg") as $filename) {
        if($i == 1)
        {
            echo '<li onClick="slidechange()"><a href=""><img src="'.$filename.'" ></a></li>';
            $i = 0;
        }
        else
            echo '<li onClick="slidechange()"><img src="'.$filename.'" ></li>';
    }
}
if (is_ajax()) {
    if (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
        $action = $_POST["action"];

        switch($action){
            case "checkAlerts":
                echo getAllAlerts();
                break;
            case "checkSpecificAlerts":
                echo getUserSpecificAlerts();
                break;
            case "empOwnSwitchRequestStatus":
                echo empOwnSwitchRequestStatus();
                break;
            case "getUnrespondChangeTaskRequestForSupervisor":
                echo getUnrespondChangeTaskRequestForSupervisor();
                break;
            case "getEmpOwnChangeTaskRequest":
                echo getEmpOwnChangeTaskRequest();
                break;
            case "SaveProjectNewQuestion":
                echo SaveProjectNewQuestion();
                break;
            case "ProjectQAAnswerByPM":
                echo ProjectQAAnswerByPM();
                break;
            case "ProjectQAAnswerDeactive":
                echo ProjectQAAnswerDeactive();
                break;
            case "ProjectQAQuestionUpdateEditSave":
                echo ProjectQAQuestionUpdateEditSave();
                break;
            case "ProjectQAAnswerAllowEdit":
                echo ProjectQAAnswerAllowEdit();
                break;


        }
    }
}
//Function to check if the request is an AJAX request
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
function getAllAlerts(){
    global $con;
    $sql = "SELECT `id`, `requestById`, `projTaskPK`, `nameId`,`projId`,`requestDateTime`,`response`, employee.Employee_Name,
            projects.Name as projectName, e.Employee_Name as requestBy, emp_curr_proj.PTPK, p.Name as CurrentProject,
             emp.Employee_Name as CurrentProTL, empl.Employee_Name as NewProTL, empl.pk as NewProTLId, eptl.taskName
            FROM  `tblswitchemprequest`
            INNER JOIN `emp_project_task_list` eptl
			ON tblswitchemprequest.projTaskPK = eptl.pk
            INNER JOIN  `projects`
            ON tblswitchemprequest.projId = projects.PK
            INNER JOIN  employee
            ON tblswitchemprequest.nameId = employee.PK
            INNER JOIN employee e
            ON tblswitchemprequest.requestById = e.PK
            INNER JOIN emp_curr_proj
            ON emp_curr_proj.ETPK = employee.PK
            INNER JOIN projects p
            ON emp_curr_proj.PTPK= p.PK
            Left JOIN employee emp
            ON emp.PK= p.TeamLead
            Left JOIN employee empl
            ON empl.PK= projects.TeamLead
            where response = 0";

    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function getUnrespondChangeTaskRequestForSupervisor(){

    global $connPDO;

    $sql = "SELECT ChangeTaskRequestPK, EmpId, ProjectPK, RequestDateTime, taskName, Employee_Name, pro.Name as ProjectName, ctr.TaskPK, ctr.Half FROM `change_task_request` ctr
            Inner JOIN projects pro
            ON pro.PK = ctr.ProjectPK
            Inner JOIN employee emp
            ON emp.PK = ctr.EmpId
            Inner JOIN 	emp_project_task_list eptl
            ON ctr.TaskPK = eptl.pk
            WHERE Response is null
            AND pro.TeamLead = ".$_COOKIE["userID"];

    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);
}

function getEmpOwnChangeTaskRequest(){

    global $connPDO;

    $sql = "SELECT ChangeTaskRequestPK, EmpId, ProjectPK, RequestDateTime, taskName, Employee_Name, pro.Name as ProjectName, ctr.TaskPK, ctr.Half  FROM `change_task_request` ctr
            Inner JOIN projects pro
            ON pro.PK = ctr.ProjectPK
            Inner JOIN employee emp
            ON emp.PK = ctr.EmpId
            Inner JOIN 	emp_project_task_list eptl
            ON ctr.TaskPK = eptl.pk
            WHERE Response is null
            AND EmpId = ".$_COOKIE["userID"];

    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);

}
function Submit_Daily_Question($ques, $html, $askDate){
    global $con;
    $sql = "UPDATE `ttl_employee_switch`.`vote_poll` SET `Active` = '0' WHERE  `Active` = '1' ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $sql = "INSERT INTO `vote_poll` ( `Question`, `HTML`, `Active`, `askDate`) VALUES ( '$ques','$html', 1,'$askDate')";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function getAllProjectName(){
    global $con;
    $sql ="SELECT PK, Name from projects";
}
function getUserSpecificAlerts(){
    global $con;
    $sql = "SELECT `id`, `requestById`, `projTaskPK`, `nameId`,`projId`,`requestDateTime`,`response`, employee.Employee_Name,
            projects.Name as projectName, e.Employee_Name as requestBy, emp_curr_proj.PTPK, p.Name as CurrentProject,
            emp.Employee_Name as CurrentProTL, empl.Employee_Name as NewProTL, empl.pk as NewProTLId, eptl.taskName
            FROM  `tblswitchemprequest`
            INNER JOIN `emp_project_task_list` eptl
			ON tblswitchemprequest.projTaskPK = eptl.pk
            INNER JOIN  `projects`
            ON tblswitchemprequest.projId = projects.PK
            INNER JOIN  employee
            ON tblswitchemprequest.nameId = employee.PK
            INNER JOIN employee e
            ON tblswitchemprequest.requestById = e.PK
            INNER JOIN emp_curr_proj
            ON emp_curr_proj.ETPK = employee.PK
            INNER JOIN projects p
            ON emp_curr_proj.PTPK= p.PK
            Left JOIN employee emp
            ON emp.PK= p.TeamLead
            Left JOIN employee empl
            ON empl.PK= projects.TeamLead
            where response = 0
            AND requestById=". $_COOKIE["userID"];
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function empOwnSwitchRequestStatus(){
    global $con;
    $sql ="SELECT `id`, `requestById`, `nameId`,`projId`, `projTaskPK`,`requestDateTime`,`response`, employee.Employee_Name,
            projects.Name as projectName, e.Employee_Name as requestBy, emp_curr_proj.PTPK, p.Name as CurrentProject,
            emp.Employee_Name as CurrentProTL, empl.Employee_Name as NewProTL, empl.pk as NewProTLId, eptl.taskName
            FROM  `tblswitchemprequest`
			INNER JOIN `emp_project_task_list` eptl
			ON tblswitchemprequest.projTaskPK = eptl.pk
            INNER JOIN  `projects`
            ON tblswitchemprequest.projId = projects.PK
            INNER JOIN  employee
            ON tblswitchemprequest.nameId = employee.PK
            INNER JOIN employee e
            ON tblswitchemprequest.requestById = e.PK
            INNER JOIN emp_curr_proj
            ON emp_curr_proj.ETPK = employee.PK
            INNER JOIN projects p
            ON emp_curr_proj.PTPK= p.PK
            Left JOIN employee emp
            ON emp.PK= p.TeamLead
            Left JOIN employee empl
            ON empl.PK= projects.TeamLead
            where response = 0
            AND emp_curr_proj.Active = 1
            AND nameId = ". $_COOKIE["userID"];
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}

#region Assign Work Functions
//function assignWork($empId,$projectId,$assignWork,$workDate){
//    //echo $workDate;
//    global $con;
//    date_default_timezone_set("Asia/Karachi");
//    //echo "date format".date('Y-m-d H:i:s');
//    //echo $empId.",".$projectId.",".$assignWork.",".$workDate;
//    $sql = "INSERT INTO `tblempassignwork` (`EmpId`, `AssignWork`, `AssignById`, `ProjectId`, `WorkDate`, `AssignDateTime`)
//          VALUES($empId,'".$assignWork."',".$_COOKIE["userID"].",".$projectId.",'".$workDate."','".date('Y-m-d H:i:s')."')";
//    $result = mysql_query($sql,$con) or die(mysql_error());
//    echo $result;
//}
function assignWork(){
    global $con;
    date_default_timezone_set("Asia/Karachi");
    $sql = "INSERT INTO `tblempassignwork` (`EmpId`, `AssignWork`, `AssignById`, `ProjectId`, `WorkDate`, `AssignDateTime`)
          VALUES(".$_POST["empId"].",'".$_POST["assignWork"]."',".$_COOKIE["userID"].",".$_POST["projectId"].",'".$_POST["workDate"]."','".date('Y-m-d H:i:s')."')";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}

function saveTaskSolution(){
    global $con;
    $sql = "UPDATE tblempassignwork SET Solution = '".$_POST["taskSolution"]."' where EmpAWPK = ".$_POST["taskId"];
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}

function getUserAssignWork()
{
    global $con;
    $sql = "SELECT pro.Name as ProjectName,  eaw.AssignWork, eaw.WorkDate, eaw.Solution, eaw.EmpAWPK, emp.Employee_Name as AssignedBy
            FROM `tblempassignwork` eaw
            INNER JOIN projects pro
            ON pro.pk = eaw.ProjectId
            INNER JOIN employee emp
            ON emp.PK = eaw.AssignById
            where eaw.hasCompleted = 0
            AND eaw.EmpId = ".$_COOKIE["userID"];
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}

function projectTaskDeleteById($taskId){
    global $con;
    $sql = "DELETE FROM `emp_project_task_list` WHERE pk = ".$taskId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}

function showAssignWork($workStatus){
    //$workStatus    //1 completed    //2 cancel    //0 pending
    global $con;
    $sql = "SELECT EmpAWPK, eaw.EmpId, eaw.ProjectId, eaw.EmpAWPK, eaw.Solution, pro.Name as ProjectName, eaw.AssignWork, eaw.WorkDate, empName.Employee_Name as EmployeeName FROM `tblempassignwork` eaw
            INNER JOIN projects pro
            ON pro.pk = eaw.ProjectId
            INNER JOIN employee empName
            ON empName.PK = eaw.EmpId
            Where eaw.hasCompleted = $workStatus
            AND AssignById = ".$_COOKIE["userID"]."
            Order by eaw.WorkDate, pro.Name ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function showAssignWorkAll($workStatus){
    //$workStatus    //1 completed    //2 cancel    //0 pending
    global $con;
    $sql = "SELECT EmpAWPK, eaw.EmpId, eaw.ProjectId, eaw.EmpAWPK, eaw.Solution, pro.Name as ProjectName, eaw.AssignWork, eaw.WorkDate, empName.Employee_Name as EmployeeName FROM `tblempassignwork` eaw
            INNER JOIN projects pro
            ON pro.pk = eaw.ProjectId
            INNER JOIN employee empName
            ON empName.PK = eaw.EmpId
            Where eaw.hasCompleted = $workStatus
            Order by eaw.WorkDate, pro.Name ";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function assignWorkCancel($recordId, $reasonToCancel)
{
    global $con;
    $sql = "UPDATE tblempassignwork SET hasCompleted = 2, comment = '$reasonToCancel' where EmpAWPK =  $recordId";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function assignWorkReactive($recordId)
{
    global $con;
    $sql = "UPDATE tblempassignwork SET hasCompleted = 0 where EmpAWPK =  $recordId";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function assignWorkComplete($assignWorkId){
    global $con;
    date_default_timezone_set("Asia/Karachi");
    $sql = "UPDATE tblempassignwork SET hasCompleted = 1, CompletedDateTime = '".date('Y-m-d H:i:s')."' where EmpAWPK =  $assignWorkId";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function assignWorkincomplete($assignWorkId){
    global $con;
    date_default_timezone_set("Asia/Karachi");
    $sql = "UPDATE tblempassignwork SET hasCompleted = 0, CompletedDateTime = '".date('Y-m-d H:i:s')."' where EmpAWPK =  $assignWorkId";
    $result = mysql_query($sql,$con) or die(mysql_error());
}
function countAssignTasks(){
    global $con;
    $sql = "SELECT hasCompleted, Count(hasCompleted) as 'TotalTask' FROM `tblempassignwork` WHERE AssignById = ".$_COOKIE["userID"]." Group by hasCompleted";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function getProjectTeamLeadId($projectId){
    global $con;
    $sql = "SELECT TeamLead FROM `projects` WHERE PK = ".$projectId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function countAssignTasksAll(){
    global $con;
    $sql = "SELECT hasCompleted, Count(hasCompleted) as 'TotalTask' FROM `tblempassignwork`  Group by hasCompleted";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
#endregion Assign Work Functions

#region Project Mode Change Request related Function
function requestProjectModeChange($projId, $projStatusId, $projModeId){
    if(CheckRequestProjectModeChange($projId) <= 0) {
        global $con;
        date_default_timezone_set("Asia/Karachi");
        $sql = "INSERT INTO `tbl_project_mode_change_request` (projId, projStatusId, projModeId, requestById, requestDateTime)
          VALUES($projId," . $projStatusId . "," . $projModeId . "," . $_COOKIE["userID"] . ",'" . date('Y-m-d H:i:s') . "')";
        $result = mysql_query($sql, $con) or die(mysql_error());
        echo $result;
    }else {
        echo 'Request already exists.';
    }
}
function CheckRequestProjectModeChange($projId){
    global $connPDO;
    $sql = "SELECT * FROM  `tbl_project_mode_change_request` WHERE  `projId` ='$projId' AND  `requestHandleById` IS NULL ";

    $queryExecuted = $connPDO->query($sql);
    $recordCount = $queryExecuted->fetchColumn();
    return $recordCount;

}
function ProjectModeChangeRequest(){
    global $con;
    $sql = "SELECT id, pmch.projId, projects.Name as ProjectName, pmch.projStatusId, pmch.projModeId, pm.PM_Name as ProjectMode, pmch.requestById, employee.Employee_Name as RequestBy, pmch.requestDateTime as RequestTime from tbl_project_mode_change_request pmch
            INNER JOIN  projects
            ON projects.PK = pmch.projId
            INNER JOIN employee
            ON employee.PK = pmch.requestById
            INNER JOIN project_mode pm
            ON pm.PM_PK = pmch.projModeId
            WHERE pmch.status = 0";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);
}
function ProjectModeChangeRequestHandle($status, $recordId){
    ini_set('date.timezone', 'Asia/Karachi');
    global $con;
    date_default_timezone_set("Asia/Karachi");
    $sql = "UPDATE tbl_project_mode_change_request SET status=".$status." ,requestHandleById=".$_COOKIE["userID"].",requestHandleDateTime='".date('Y-m-d H:i:s')."' Where id=".$recordId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
function getProjectModeChangeRequestMadeList(){
    global $con;
    $sql = "SELECT id, pmch.projId, projects.Name as ProjectName, pmch.projStatusId, pmch.projModeId, pm.PM_Name as ProjectMode, pmch.requestById, employee.Employee_Name as RequestBy, pmch.requestDateTime as RequestTime from tbl_project_mode_change_request pmch
            INNER JOIN  projects
            ON projects.PK = pmch.projId
            INNER JOIN employee
            ON employee.PK = pmch.requestById
            INNER JOIN project_mode pm
            ON pm.PM_PK = pmch.projModeId
            WHERE pmch.status = 0
            AND pmch.requestById =".$_COOKIE["userID"];
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode($data);

}
function getProjectMode($projectId){
    global $connPDO;
    $sql =  "SELECT * FROM  projects where 	PK = ".$projectId;
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);

    while($row = $queryExecuted->fetch()){
        $activeQuestDate = $row["Status"];
    }
    echo $activeQuestDate;
}
#endregions Project Mode Change Request related Function

#region Dinner Related Functions
function AddDinnerItem($dinnerName, $desc, $price, $status){
    global $con;

    $sql = "INSERT INTO `dinnermenu` (dinnerName, Description, price, active) VALUES($dinnerName,".$desc.",".$price.",".$status.")";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
function getDinnerItem(){
    global $con;
    $sql = "Select * from dinnerMenu order by active";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while ($row = mysql_fetch_assoc($result)){
        $data[] = $row;
    }
    echo json_encode($data);
}
function getDinnerItemActive(){
    global $con;
    $sql = "Select * from dinnerMenu where active = 1 order by active";
    $result = mysql_query($sql,$con) or die(mysql_error());
    $data = array();
    while ($row = mysql_fetch_assoc($result)){
        $data[] = $row;
    }
    echo json_encode($data);
}
function getDinnerDetail ($pkid,$sortVoteBy){
    global $con;
    $sql = "select distinct c.dinnerName, count(c.dinnerName) as Total  from
            (SELECT `ETPK`,`PTPK`,emp_curr_proj.`Active`, Employee.Employee_Name,projects.name as Projects FROM `emp_curr_proj`
            left join employee
            on employee.pk = emp_curr_proj.ETPK
            left join projects
            on projects.pk = emp_curr_proj.PTPK
            ) as a
            left join
            (select vote_poll_output.Option,EmpPK, dinnerItemId from vote_poll_output where `QuesNo` =$pkid and `Output` = 'true')as b
            on a.ETPK = b.emppk
            left join
            (select dinnerId, dinnerName from dinnermenu ) as c
            on b.dinnerItemId = c.dinnerId
            group by dinnerName
            ORDER BY `$sortVoteBy` ASC";
    /*
     where active = 1
            group by dinnerName
            ORDER BY `$sortVoteBy` ASC";
    */
    $result = mysql_query($sql,$con) or die (mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result)){
        $data[] = $row;
    }
    echo json_encode($data);
}
function dinnerItemStatusUpdate($dinnerId, $dinnerStatus){
    global $con;
    $sql = "UPDATE dinnermenu SET active=".$dinnerStatus."' Where dinnerId=".$dinnerId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
function dinnerItemDelete($dinnerId){
    global $con;
    $sql = "delete from dinnermenu  where dinnerId = ".$dinnerId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
#endregion Dinner Related Functions


#region VotingQuestion
function checkVoteQuestionGenerated($currentDate){
    global $con;
    $sql = "select * from vote_poll where Active = 1 and askDate = '".$currentDate."'";
    $result = mysql_query($sql,$con) or die (mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result)){
        $data[] = $row;
    }
    echo json_encode($data);
}
function checkVoteSubmittedByUser($QuestID, $userId){
    global $con;
    //echo "SELECT * FROM `vote_poll_output` WHERE QuesNo = ".$QuestID." and EmpPK =".$_COOKIE[&UserID"];
    $sql = "SELECT * FROM `vote_poll_output` WHERE QuesNo = ".$QuestID." and EmpPK =".$userId;
    $result = mysql_query($sql,$con) or die (mysql_error());
    $data = array();
    while($row = mysql_fetch_assoc($result)){
        $data[] = $row;
    }
    echo json_encode($data);
}
#endregion Voting Question
function getEmployeeCount(){

    global $connPDO;
    $sql = "SELECT distinct(Category_Name), Count(*) as totalEmployee, ColourCode FROM employee
        inner join dept_category
        ON dept_category.PK = employee.Emp_Dept_Category
        where Active = 1
        and Emp_Dept_Category <> 0
        group by Category_Name
        order by totalEmployee desc";
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);
}
function getSupervisorCurrentProjectsEmployeeName($projectId){
    global $connPDO;
    ini_set('date.timezone', 'Asia/Karachi');
    $sql = "SELECT PTPK, EmployeeNamePK, Employee_Name FROM `switch_person` sp
            INNER JOIN employee e
            ON e.PK = sp.EmployeeNamePK
            WHERE PTPK = $projectId
            and half = ".calculateHalf()."
            and switchDate = '".date('Y-m-d')."'";
    // echo date('Y-m-d');
    //echo $projectId;
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);
}
function employeeChangeTask($empId, $taskId, $half){
    global $con;
    ini_set('date.timezone', 'Asia/Karachi');
    $sql = "UPDATE switch_person SET TaskPK = ".$taskId." Where EmployeeNamePK = ".$empId." AND SwitchDate = '".date('Y-m-d')."' AND Half = ".$half;
    $result = mysql_query($sql,$con) or die(mysql_error());
    if($result ==1){
        $sqlQuery = "UPDATE emp_curr_proj SET TaskPK = ".$taskId." WHERE ETPK = ".$empId;

        $result1 = mysql_query($sqlQuery,$con) or die(mysql_error());
        echo $result1;
    }
    else{
        echo $result;
    }
}
function getEmployeeProjectByEmployeeId($empId){
    global $connPDO;
    $sql = "SELECT * FROM `emp_curr_proj`
            WHERE ETPK = $empId";
    // echo date('Y-m-d');
    //echo $projectId;
    $queryExecuted = $connPDO->query($sql);
    $queryExecuted->setFetchMode(PDO::FETCH_ASSOC);
    $activeEmployeeCount = array();
    while($row = $queryExecuted->fetch()){
        $activeEmployeeCount[] = $row;
    }
    echo json_encode($activeEmployeeCount);

}
function requestChangeEmpProjectTask($empId, $projectId, $half, $taskId){
    global $con;
    ini_set('date.timezone', 'Asia/Karachi');
    $sql = "INSERT INTO `change_task_request` (EmpId, ProjectPK, Half, TaskPK, RequestDateTime) VALUES($empId, $projectId,".$half.",".$taskId.",'".date('Y-m-d H:i:s')."')";
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
function ProjectTaskChangeRequestUpdate($requestId, $stateId){
    global $con;
    $sql = "UPDATE `change_task_request` SET Response =".$stateId.", ResponseDateTime='".date('Y-m-d H:i:s')."' WHERE ChangeTaskRequestPK=".$requestId;
    $result = mysql_query($sql,$con) or die(mysql_error());
    echo $result;
}
function CheckLastTaskChangeRequest($empId, $projectId){
    global $connPDO;
    $sql = "SELECT count(*) as RecordCount from change_task_request WHERE Response is null AND EmpId = '$empId' AND ProjectPK = '$projectId'";
    //$queryExecuted = $connPDO->fet($sql);
    $queryExecuted = $connPDO->query($sql);
    $recordFoundCount = $queryExecuted->fetchColumn();
    echo $recordFoundCount;
}
function CheckLastTaskChangeRequestById($requestId){
    global $connPDO;
    $sql = "SELECT count(*) as RecordCount from change_task_request WHERE Response is null AND ChangeTaskRequestPK = '$requestId'";
    //$queryExecuted = $connPDO->fet($sql);
    $queryExecuted = $connPDO->query($sql);
    $recordFoundCount = $queryExecuted->fetchColumn();
    echo $recordFoundCount;
}
function GetEmpProjectId($empId){
    global $connPDO;
    $sql = "SELECT PTPK FROM `emp_curr_proj` where ETPK ='$empId'";
    $queryExecuted = $connPDO->query($sql);
    $ProjectId = $queryExecuted->fetchColumn();
    echo $ProjectId;
}

#region ProjectQA
function SaveProjectNewQuestion(){
    global $connPDO;
    date_default_timezone_set("Asia/Karachi");
    $date = date('Y-m-d H:i:s');

    $sql = "INSERT INTO `project_question_answer` VALUES (null, :ProjectId, :ProjectQuestion, null, '$date', null,1,:QuestionById,0)";

    $queryInsert = $connPDO->prepare($sql);

    try {
        //echo $_POST["ProjectId"]." -- ".$_POST["ProjectQuestion"];
        //$querySuccess = $queryInsert->execute(array("ProjectId" => $_POST['ProjectId'],"ProjectQuestion" => $_POST["ProjectQuestion"]));
        $binds = array(
            ':ProjectId' => $_POST['ProjectId'],
            ':ProjectQuestion' => $_POST['ProjectQuestion'],
            ':QuestionById' => $_POST['QuestionById'],
            );
        $querySuccess = $queryInsert->execute($binds);
        echo $querySuccess;
    }
    catch(Exception $e) {
        echo '<h1>An error has ocurred.</h1><pre>', $e->getMessage() ,'</pre>';
    }
}
function GetProjectNamesByTeamLead(){
    $teamLeadId =(int) $_COOKIE['userID'];
    global $connPDO;
    $sql = "SELECT PK, Name, TeamLead FROM `projects`where TeamLead = '$teamLeadId' ORDER BY Status, StatusMode";
    $queryExecuted = $connPDO->query($sql);
    $array = $queryExecuted->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($array);
    echo $json;
}
function GetProjectNamesAll(){

    global $connPDO;
    $sql = "SELECT PK, Name, TeamLead FROM `projects` ORDER BY Name";
    $queryExecuted = $connPDO->query($sql);
    $array = $queryExecuted->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($array);
    echo $json;
}
function ProjectQuestionAnswerAll(){
    $teamLeadId =(int) $_COOKIE['userID'];
    global $connPDO;
    /*if($teamLeadId != 33) {
        $sql = "SELECT pqa.ProjectQAId, pro.Name, pqa.ProjectId, pqa.Active, ProjectQuestion, ProjectAnswer, AskDateTime, AnswerDateTime  FROM `project_question_answer` as pqa
            INNER JOIN projects pro
            ON pqa.ProjectId = pro.PK
            AND pro.TeamLead = '$teamLeadId'
            ORDER By pqa.AskDateTime";
    }else{*/
        $sql = "SELECT pqa.ProjectQAId, pro.Name, pqa.isEditable, pqa.ProjectId, pqa.Active, pqa.QuestionBy, ProjectQuestion, ProjectAnswer, AskDateTime, AnswerDateTime, emp.Employee_Name as AskedBy  FROM `project_question_answer` as pqa
            INNER JOIN projects pro
            ON pqa.ProjectId = pro.PK
            INNER JOIN employee emp
            ON emp.PK = pqa.QuestionBy
            ORDER By AnswerDateTime DESC";
    //}
    $queryExecuted = $connPDO->query($sql);
    $array = $queryExecuted->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($array);
    echo $json;

}
function ProjectQuestionAnswerByCurrentUser(){
    $loggedUserId =(int) $_COOKIE['userID'];
    global $connPDO;

    $sql = "SELECT pqa.ProjectQAId, pro.Name, pqa.isEditable, pqa.ProjectId, pqa.Active, pqa.QuestionBy, ProjectQuestion, ProjectAnswer, AskDateTime, AnswerDateTime, emp.Employee_Name as AskedBy  FROM `project_question_answer` as pqa
            INNER JOIN projects pro
            ON pqa.ProjectId = pro.PK
            INNER JOIN employee emp
            ON emp.PK = pqa.QuestionBy
            And  pqa.QuestionBy = $loggedUserId
             AND pqa.Active = 1
            ORDER By AnswerDateTime DESC";
    //}
    $queryExecuted = $connPDO->query($sql);
    $array = $queryExecuted->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($array);
    echo $json;
}
function ProjectQuestionAnswerByActive(){
    $teamLeadId =(int) $_COOKIE['userID'];
    global $connPDO;
    $sql = "SELECT pqa.ProjectQAId, pro.Name, pqa.isEditable, pqa.ProjectId, pqa.Active, pqa.QuestionBy, ProjectQuestion, ProjectAnswer, AskDateTime, AnswerDateTime, emp.Employee_Name as AskedBy  FROM `project_question_answer` as pqa
            INNER JOIN projects pro
            ON pqa.ProjectId = pro.PK
            INNER JOIN employee emp
            ON emp.PK = pqa.QuestionBy
            AND pqa.Active = 1

            ORDER By AnswerDateTime DESC";
    //AND pqa.isEditable = 0
    /*SELECT pqa.ProjectQAId, ProjectQAId, pro.Name, pqa.ProjectId, pqa.Active, ProjectQuestion, ProjectAnswer, AskDateTime, AnswerDateTime  FROM `project_question_answer` as pqa
            INNER JOIN projects pro
            ON pqa.ProjectId = pro.PK
            AND pqa.Active = 1
            ORDER By pqa.AskDateTime*/

    $queryExecuted = $connPDO->query($sql);
    $array = $queryExecuted->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($array);
    echo $json;

}
function ProjectQAAnswerByPM(){
    global $connPDO;
    date_default_timezone_set("Asia/Karachi");
    //echo date("Y-m-d H:i:s");

    $sql = "UPDATE `project_question_answer`
            SET ProjectAnswer = :ProjectQuestionAnswer,
            AnswerDateTime = '".date("Y-m-d H:i:s")."'
            where ProjectQAId = :ProjectQAId";

    $queryInsert = $connPDO->prepare($sql);

    try {

        //$querySuccess = $queryInsert->execute(array("ProjectId" => $_POST['ProjectId'],"ProjectQuestion" => $_POST["ProjectQuestion"]));
        $binds = array(
            ':ProjectQAId' => $_POST['ProjectQAId'],
            ':ProjectQuestionAnswer' => $_POST['ProjectQuestionAnswer'],
        );
        $querySuccess = $queryInsert->execute($binds);
        echo $querySuccess;
    }
    catch(Exception $e) {
        echo '<h1>An error has ocurred. </h1><pre>', $e->getMessage() ,'</pre>';
    }

}
function ProjectQAQuestionUpdateEditSave(){
    global $connPDO;
    date_default_timezone_set("Asia/Karachi");
    //echo date("Y-m-d H:i:s");

    $sql = "UPDATE `project_question_answer`
            SET ProjectQuestion = :ProjectQuestionUpdate,
            isEditable = 0
            where ProjectQAId = :ProjectQAId";

    $queryInsert = $connPDO->prepare($sql);

    try {

        //$querySuccess = $queryInsert->execute(array("ProjectId" => $_POST['ProjectId'],"ProjectQuestion" => $_POST["ProjectQuestion"]));
        $binds = array(
            ':ProjectQAId' => $_POST['ProjectQAId'],
            ':ProjectQuestionUpdate' => $_POST['ProjectQuestionUpdate'],
        );
        $querySuccess = $queryInsert->execute($binds);
        echo $querySuccess;
    }
    catch(Exception $e) {
        echo '<h1>An error has ocurred. </h1><pre>', $e->getMessage() ,'</pre>';
    }

}
function ProjectQAAnswerDeactive(){
    global $connPDO;

    $sql = "UPDATE `project_question_answer`
            SET Active = :active
            where ProjectQAId = :ProjectQAId";

    $queryInsert = $connPDO->prepare($sql);

    try {

        //$querySuccess = $queryInsert->execute(array("ProjectId" => $_POST['ProjectId'],"ProjectQuestion" => $_POST["ProjectQuestion"]));
        $binds = array(
            ':ProjectQAId' => $_POST['ProjectQAId'],
             ':active' => $_POST['active']
        );
        $querySuccess = $queryInsert->execute($binds);
        echo $querySuccess."responsed is";
    }
    catch(Exception $e) {
        echo '<h1>An error has ocurred. </h1><pre>', $e->getMessage() ,'</pre>';
    }

}
function ProjectQAAnswerAllowEdit(){
    global $connPDO;

    $sql = "UPDATE `project_question_answer`
            SET isEditable = :isEditable
            where ProjectQAId = :ProjectQAId";

    $queryInsert = $connPDO->prepare($sql);

    try {

        //$querySuccess = $queryInsert->execute(array("ProjectId" => $_POST['ProjectId'],"ProjectQuestion" => $_POST["ProjectQuestion"]));
        $binds = array(
            ':ProjectQAId' => $_POST['ProjectQAId'],
            ':isEditable' => $_POST['isEditable']
        );
        $querySuccess = $queryInsert->execute($binds);
        echo $querySuccess."responsed is";
    }
    catch(Exception $e) {
        echo '<h1>An error has ocurred. </h1><pre>', $e->getMessage() ,'</pre>';
    }
}

#endregion PreojectQA

#endregion All Functions
?>
