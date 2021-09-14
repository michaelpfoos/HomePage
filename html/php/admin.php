<?php
//include the foosDBSecurity class
require_once "../../etc/security.php";

//store the paramaters passed alongw itwh the post in to variables
 $username = $_POST["username"];
 $password = $_POST["password"]; 

//Check the IP Address to find out if it's been banned
$validateIP = $usersecurity->validateip();

if ($validateIP === 'Maximum Login Attempts Exceeded Please Contatct a System Administrator') {
   //Code goes here
   //Echo an empty session ID.  
   $sessionArray = array(
      "sessionID" => 'Maximum Login Attempts Exceeded Please Contatct a System Administrator'
   );

   //Return the error as the sessionID
   echo json_encode($sessionArray); 
   exit();
}

//Get the user id
$userid = $usersecurity->getuserid($username);

//Attempt to validate the password
$validate = $usersecurity->validatepassword($password, $userid);

//check the validation
if (isset($validate)) {
   //Authenticate
   $sessionid = $usersecurity->generatesessionid();

   //Exchange the sessionID with the server
   $usersecurity->exchangesessionid($userid, $sessionid);

   //Put the sessionid in to an array
   $sessionArray = array(
      "sessionID" => $sessionid
   );    
   //Echo the sessionid back to the client side
   echo json_encode($sessionArray);  
}
else {  
   //Log the failed login attempt
   $usersecurity->failedloginattempt($username);

   //Echo an empty session ID.  
   $sessionArray = array(
      "sessionID" => ''
   );

   //Email the empty session arrat.
   echo json_encode($sessionArray); 

    //Email the admin to alert them of the failed attempt.
    //$foossecurity->emailfailedloginattempt();   

    
}

 ?>