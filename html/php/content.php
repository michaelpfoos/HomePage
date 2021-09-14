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

       //Put the query in to a variable
       $query = "SELECT DateEntered, DATE_FORMAT(DATE,'%m/%d/%Y') as DATE, Title, Paragraph1, Paragraph2, Paragraph3, SUBSTRING(image1, 3) as image1, SUBSTRING(image2, 3) as image2, SUBSTRING(image3, 3) as image3, COALESCE(image1alt, '') AS image1alt, COALESCE(image2alt, '') AS image2alt, COALESCE(image3alt, '') AS image3alt, coalesce(link1, '') AS link1, coalesce(link2, '') as link2, coalesce(link3, '') as link3, coalesce(link1Caption, '') AS link1Caption, coalesce(link2Caption, '') AS link2Caption, coalesce(link3Caption, '') AS link3Caption, coalesce(keywords, '') as keywords  FROM blogContent WHERE BlogID = ?"; 

       //Prepare the query
       $stmt = $mysqli->prepare($query);                 

       //Bind the parameters to the query
       $stmt->bind_param('s', $blogID); 
       
        //Execute the statement
        $stmt->execute();

        //Get the results
        $result = $stmt->get_result(); 
        
        //Put the resutls in to JSON.
        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
        }
        echo json_encode($myArray); 

      

$stmt->close();
$mysqli->close();


?>
