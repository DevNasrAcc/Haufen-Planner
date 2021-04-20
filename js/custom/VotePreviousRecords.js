/**
 * Created by Faizan Khan on 9/28/2015.
 * This JS FIle will use to get Vote Records details
 */
var $jqueryLib = jQuery.noConflict();

$jqueryLib(document).ready(function(){
    $jqueryLib("#VoteRecordDate").change(function(){
        getPreviousVoteRecord();
    });
})

function getPreviousVoteRecord (){
    var go_path = "Server/VotePreviousRecords.php?action=PreviousVoteRecordByDate&vars=1&var1=" + $jqueryLib("#VoteRecordDate").val() ;
    $jqueryLib.get(go_path,
        {
        }, function(data)
        {
        console.log(data);
            if(data != -1){
            console.log(data);
            var response = JSON.parse(data);
            var q;
                var htmls= "<table class='table'><tr><td>Employee Name</td><td>Project</td><td>Answer</td><td>Option Selected</td></tr>";
                for(var i = 0; i < response.length; i++){

                    if(q != response[i].Question){
                        htmls +="<tr><td colspan='4'> Question: <b>" + response[i].Question + "</b></td></tr>";
                    }
                    htmls += "<tr><td>" + response[i].Employee_Name + "</td>"+
                    "<td>" + response[i].Projects + "</td>"+
                        //"<td>" + response[i].Question + "</td>"+
                    "<td>" + response[i].vote_Value+ "</td>"+
                    "<td>" + response[i].Option + "</td>"+
                    "</tr>";

                    q = response[i].Question;
                }
                htmls = htmls + "</table>";
                $jqueryLib(".votingDetail").html(htmls);
            }
            else
            {
                $jqueryLib(".votingDetail").html("No record available.");
            }
        });
}
