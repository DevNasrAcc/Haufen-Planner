<table border='1' id="setting_WhiteBoard">
    <tr>
        <td><b>White board Previous <b></td>
        <td>
    <!-- <input class="dateinput" name="idate" type="text" id="PreBoardDate"  placeholder= "Date for White Board">-->
<!--            onchange="whiteboardfn_PreDate()"-->
            <button onclick="whiteboardfn_PreDateNavigation('-')"><span class="glyphicon glyphicon-chevron-left"></span></button>
           <input type="date" name="idate" type="text" id="PreBoardDate">
            <button onclick="whiteboardfn_PreDateNavigation('+')"><span class="glyphicon glyphicon-chevron-right"></span></button>
        </td>
        <td>
            <input type="radio" name="half" value="half1"   id="half1" checked="checked">1 Half
            <input type="radio" name="half" value="half2"  id="half2">2 Half
            <input type="radio" name="half" value="half3"  id="half3">3 OverTime
        </td>
        <td>
            <input type="button" value="Pre WhiteBoard" onclick="whiteboardfn_PreDate()">


            <input type="button" value="Attendance Sheet" onclick="whiteboardfn_Attendance()">
            <input type="button" value="Clear" onclick="whiteboardfn_Clear()">
            <!--<input type="button" value="Next Date" onclick="whiteboardfn_PreDateNextDate()">-->
        </td>
    </tr>
</table>
<p>
<table border='1' id="whiteboard_PreDate">
</table>
