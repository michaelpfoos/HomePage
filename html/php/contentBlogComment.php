<?php

//Create the connection
include '../../etc/misc.php';
$server =  $foos->server;
$user = $foos->user;
$password = $foos->password;
$database = $foos->database;


$mysqli = new mysqli($server, $user, $password, $database);
$myArray = array();
$blogID = $_GET['blogID']; //works without the variable.

/* check connection https://www.php.net/manual/en/mysqli.real-escape-string.php */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
   }

$query = "SELECT DATE_FORMAT(DATE,'%m/%d/%Y') as DATE, NAME, Comment FROM blogComment WHERE BlogID = ? ORDER BY DateEntered DESC";

 //Prepare the query
 $stmt = $mysqli->prepare($query);                 

 //Bind the parameters to the query
 $stmt->bind_param('i', $blogID); 
 
  //Execute the statement
  $stmt->execute();

  //Get the results
  $result = $stmt->get_result(); 
  
  //Put the resutls in to an array.
  while($row = $result->fetch_array(MYSQLI_ASSOC)) {
      $myArray[] = $row;
  }
  //This is what echos the array in to json.  
  echo json_encode($myArray); 


$stmt->close();
$mysqli->close();

?>