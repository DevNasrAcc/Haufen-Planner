//$log = window.jQuery;
var $log = jQuery.noConflict();

function login() {
    rememberMe();
    var loginID = $log("#loginID").val();
    var pass = $log("#password").val();
    var overTime = $log('input[name=overTime]:checked').val();
    var go_path = "login.php?action=login&vars=3&var1="+loginID+"&var2="+pass+"&var3="+overTime;
    $log("#login_submit").html("Wait.....");
    $log("#chk").val(go_path);
    $log.get(go_path,
        {
        }, function(data)
        {
            if($log.trim(data) == "successful")
            {
                $log("#mesg").text(data);
                $log("#mesg").css('color', 'green');
                if(readCookie("Cost_Department") != 3){ //if user is not production manager nor team lead
                    window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
                }
                else {
                    var go_path = "login.php?action=isUserTeamLead&vars=1&var1=" + readCookie("userID");
                    $log.get(go_path,
                        {
                        }, function(data)
                        {
                            var output = JSON.parse(data);
                            //check if user is team lead? or the production manager. output.length ==0 means user is production Manager
                            if(output.length == 0 || output[0].Dept_Category == 5){
                                //check previous date office off, If NOT then get that hoursworked have entered or not
                                checkPreviousDateOfficeOff();
                            }
                            else {
                                //leading simple user to the main page
                                window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
                            }
                        });
                }
            }
            else if($log.trim(data) == "successfulGermany")
            {
                window.location.replace("http://" + location.host + "/Employee_Switch_Persons/projectstatus.php");
            }
            else
            {
                //$log("#mesg").text(data);
                //$log("#mesg").css('color', 'red');
                alert("login Error\n" + data);
                $log("#login_submit").html("Login Again");
            }
        });
}

//This variable will use in date in checkPreviousDateOfficeOff Function
var incrementDay = 1;

///<summary>
///This function will check that Previous Date Office Off or not, if off then, go to previous date and so on. after that,
//check day "Hours Entry"(Employee Efforts) have done or not not. If Hours Entry not have done go to hours entry page else to
//home page
///</summary>
function checkPreviousDateOfficeOff(){
    var previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - incrementDay);
    var d = previousDate.getDate();
    var m = previousDate.getMonth()+1;
    var y = previousDate.getFullYear();
    var dateString = y+'-'+m+'-'+d;
    var go_path = "Employee_Switch_Person.php?action=checkPreviousDateOfficeOff&vars=2&var1="+dateString+"&var2=" + readCookie("userID");
    $log.get(go_path,
        {
        }, function(data){
            if(data == "[]"){//it means off this day e.g., sunday this day or any official off
                incrementDay++;
                checkPreviousDateOfficeOff();//Go back one day more and then check--recursive process
            }
            else{//date have found
				//var go_path;
                // go_path = "Employee_Switch_Person.php?action=getEmployeeCategory&vars=1&var1=" + readCookie("userID");
                //$log.get(go_path,
                //    {},
                //   function(data){
                //       if(data[0].Category_Name == 5){
                go_path = "Employee_Switch_Person.php?action=checkEmployeesEffortAddORNotByLastDate&vars=2&var1="+readCookie("userID")+"&var2="+dateString;
                $log.get(go_path,
                    {
                    }, function(data){
                        if(data == "[]"){
                            window.location.replace("http://" + location.host + "/Employee_Switch_Persons/ModelerPage.php");
                        }
                        else {
                            alert("REDIRECTING YOU! Please add your sub-ordinate's progress first.");
                            var uri = "http://" + location.host + "/Employee_Switch_Persons/empProgress.php?dt=" + dateString;
                            var uri_enc = encodeURIComponent(uri);
                            window.location.replace(uri);
                        }
                    });
            }
        });
}

function logout(){
    var go_path = "login.php?action=logout&vars=0";
    $log.get(go_path,
        {
        }, function(data)
        {
            $log("#chk").val(data);
            window.location.replace("http://" + location.host + "/Employee_Switch_Persons/loginPage.php");
        });
}

function logoutByOther(){
    var loginID = $log("#logoutThis").attr("name");
    //alert("id: "+loginID);
    var go_path = "login.php?action=logoutByOther&vars=1&var1="+loginID;
    $log.get(go_path,
        {
        }, function(data)
        {
            $log("#chk").val(go_path);
        });
}

function rememberMe(){
    if($log("#rememberMeCheck").is(":checked")){
        var encrypted = CryptoJS.AES.encrypt($log("#password").val(), "pw");
        document.cookie = 'un = '+ $log("#loginID").val()+'; expires = Wed, 30 Dec 2020 00:00:00 UTC;';
        document.cookie = 'pw = '+ encrypted +'; expires = Wed, 30 Dec 2020 00:00:00 UTC';
    }
    else {
        document.cookie = "un=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "pw=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
}

function onLoadLogin(){
    if(readCookie("un") || readCookie("pw"))
    {
        var decrypted = CryptoJS.AES.decrypt(readCookie("pw"), "pw");
        decrypted = decrypted.toString(CryptoJS.enc.Utf8);
        $log("#loginID").val(readCookie("un"));
        $log("#password").val(decrypted);
        $log("#rememberMeCheck").prop('checked',true);
    }
}

$log(document).ready(function (){
    $log('#password').keypress(function(e){
        if(e.keyCode == '13'){
            rememberMe();
            login();
        }
    });
});

//Reading Cookies function
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
