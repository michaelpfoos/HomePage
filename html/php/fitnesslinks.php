<?php

//Create the connection
include '../../etc/misc.php';
$server =  $foos->server;
$user = $foos->user;
$password = $foos->password;
$database = $foos->database;


$mysqli = new mysqli($server, $user, $password, $database);
$myArray = array();

    /* check connection https://www.php.net/manual/en/mysqli.real-escape-string.php */
    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
       }

       //Put the query in to a variable
       $query = "SELECT BlogID, DATE_FORMAT(DATE,'%m/%d/%Y') as DATE, Title FROM blogContent WHERE Post_Type = 'F' ORDER BY DateEntered desc";

       //https://stackoverflow.com/questions/3351882/how-to-convert-mysqli-result-to-json/14064216#14064216
       if ($result = $mysqli->query($query)) {
           while($row = $result->fetch_array(MYSQLI_ASSOC)) {
               $myArray[] = $row;
           }
           echo json_encode($myArray);
       }

       
$result->close();
$mysqli->close();
?>
