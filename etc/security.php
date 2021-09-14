<?php
  //require misc.php which contains the database information
  require_once "misc.php";

  //set up your mysqli connection  
  define('server', $foos->server);
  define('dbuser', $foos->user);
  define('dbpassword', $foos->password);
  define('database', $foos->database); 

  //define a constant for the hashing algorithm.
  define('passwordalgorithm', PASSWORD_ARGON2ID);

  class usersecurity 
  {     
    //Create a method to hash a password.
    public function hashpassword($password) {           
        
        //hash and salt the password
        return password_hash($password, passwordalgorithm);          
      }

    public function getuserid($username) {          
      //Connect to the database
      $mysqli = new mysqli(server, dbuser, dbpassword, database);

      //Declare the query
      $query = 'select id from users where username = ?';

      //prepare the query
      $stmt = $mysqli->prepare($query);

      //Bind the paramaters
      $stmt->bind_param('s', $username);

      //Execute the query
      $stmt->execute();

      //Get the results
      $result = $stmt->get_result();  
         
      //This gets the array results.
      $userid = $result->fetch_array(MYSQLI_NUM);

      //Close the statement
      $stmt->close();      

      //Return the results       
      if (isset($userid[0])) {
        return $userid[0]; //There will only ever be 1 match.
      }
      else return null;
    }
    
    //This method will reset a password
    function changepassword($newpassword, $userid) {

      //Hash the password
      $newpassword = $this->hashpassword($newpassword); //To call another function from within the same class use $this.            

      //Decalre an empty array to hold the result of the query
      $result = Array(
        'Result'=>''        
      );

      //This will return statement needs to be replaced with statement to update the database.
      if (isset($newpassword) && isset($userid)) {

        //connect to mysql
        $mysqli = new mysqli(server, dbuser, dbpassword, database);

        //declare the query
        $query = "UPDATE users SET userpassword = ? WHERE id = ?";

        //prepare the query
        $stmt = $mysqli->prepare($query);        

        //Bind the paramaters to the query
        $stmt->bind_param('si', $newpassword, $userid);

        //Execute the statement on the server
        $stmt->execute();

        //Check if the statement worked.
        if ($stmt->affected_rows > 0) {
          $result[Result] = "Success! Password changed successfully";  
        }
        else {
          $result[Result] = "Error: changepassword function in security.php failed";
        }

        //close the statement
        $stmt->close();       

        //Return the results
        return json_encode($result);
      }
      else $result[Result] = "Error: changepassword function in security.php failed";      
      return json_encode($result);
    }  
    
    public function generatesessionid() {
      //Specify permitted chars
      $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

      // Output: Generate the random string to hash.  
      $sessionID = MD5(substr(str_shuffle($permitted_chars), 0, 20));

      return $sessionID;    
    }

    public function exchangesessionid($userid, $sessionid) {      
       //Decalre an empty array to hold the result of the query
       $result = Array(
        'Result'=>''        
      );

      //connect to mysql
      $mysqli = new mysqli(server, dbuser, dbpassword, database);

      //Declare the query
      $query = "UPDATE users SET sessionID = ?, session_time_out = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 15 MINUTE) WHERE id = ?;";

      //prep the query
      $stmt = $mysqli->prepare($query); 

      //Bind the paramaters
      $stmt->bind_param('si', $sessionid, $userid);

      //Execute the statement
      $stmt->execute();    
      
      //Check if the statement worked.
      if ($stmt->affected_rows > 0) {
        $result[Result] = "SessionID has been updated in the database";  
      }
      else {
        $result[Result] = "Error: exchangesessionid function in security.php failed";
      }

      return json_encode($result);
    }

      //https://stackoverflow.com/questions/13646690/how-to-get-real-ip-from-visitor
      public function getUserIP() {
  
      // Get real visitor IP behind CloudFlare network
      if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
                $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
                $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
      }
      $client  = @$_SERVER['HTTP_CLIENT_IP'];
      $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
      $remote  = $_SERVER['REMOTE_ADDR'];

      if(filter_var($client, FILTER_VALIDATE_IP))
      {
          $ip = $client;
      }
      elseif(filter_var($forward, FILTER_VALIDATE_IP))
      {
          $ip = $forward;
      }
      else
      {
          $ip = $remote;
      }

      return $ip;
  }

  public function validateip() {
    //connect to mysql
    $mysqli = new mysqli(server, dbuser, dbpassword, database);

    //Get the users IP Address
    $ipaddress = $this->getUserIP();  

    //declare the query
    $query = "SELECT COUNT(ip_address) AS ip_address
              FROM failed_logins 
              WHERE attempted >= DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 15 MINUTE) AND ip_address = ? HAVING COUNT(ip_address) >= 5";
    
    //Prepare the statement
    $stmt - $mysqli->prepare($query);    

    //prep the query
    $stmt = $mysqli->prepare($query); 

    //Bind the paramaters  
    $stmt->bind_param('s', $ipaddress);   

    //Execute the statement
    $stmt->execute(); 

    //Get the results  
    $result = $stmt->get_result();    

    //Put the results in to an array.
    $ipcheck = array();  
    
    //Store the password received from the database.
    $ipcheck = $result->fetch_array(MYSQLI_ASSOC);   
      
    if (isset($ipcheck)) {
      return 'Maximum Login Attempts Exceeded Please Contatct a System Administrator';    
    }
    else {
      return 'Success';
    }  

    //Close the statement
    $stmt->close();
  }


  public function validatepassword($password, $userid) {   

    //connect to mysql
    $mysqli = new mysqli(server, dbuser, dbpassword, database);

    //declare the query
    $query = "SELECT userpassword FROM users WHERE id = ?";

    //Prepare the query
    $stmt = $mysqli->prepare($query);                 

    //Bind the parameters to the query
    $stmt->bind_param('i', $userid); 

    //Execute the statement
    $stmt->execute();

    //Get the results
    $result = $stmt->get_result(); 
    
    //Put the results in to an array.
    $myArray = array();

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $myArray[] = $row;
    }      

    //Store the password received from the database.
    $hashpassword = $myArray[0][userpassword];      

    //close the statement
    $stmt->close();

    if (password_verify($password, $hashpassword)) {
      return 'Success';
    }
    else return null;
  }

  public function failedloginattempt($username) {
    //Get the IP address
    $ipaddress = $this->getUserIP();      
    
    //Connect to the database
    $mysqli = new mysqli(server, dbuser, dbpassword, database);

    //Declare the query
    $query = 'INSERT INTO failed_logins (username, ip_address, attempted) VALUES (?, ?, CURRENT_TIMESTAMP)';

    //Prepare the query
    $stmt = $mysqli->prepare($query);                 

    //Bind the parameters to the query
    $stmt->bind_param('ss', $username, $ipaddress);
    
    //execute the statement
    $stmt->execute();

    //close the statement
    $stmt->close();
  } 
    
  public function emailfailedloginattempt() {
    //Email myself
    $msg = "Documenting a failed login attempt at michaelfoos.com";

    //Send email to altert me of  failed login attempt
    mail("michaelpfoos@gmail.com", "Test email from michaelfoos.com", $msg);
  }

  public function checksession($sessionid) {
    //Connect to the database
    $mysqli = new mysqli(server, dbuser, dbpassword, database);

    //Declare the query.
    $query = "SELECT CASE WHEN session_time_out > CURRENT_TIMESTAMP THEN 'GO' ELSE 'STOP' END as session_time_out FROM users WHERE sessionID = ?";

    //prepare the query
    $stmt = $mysqli->prepare($query);

    //Bind the paramater to hte query
    $stmt->bind_param('s', $sessionid);

    //execute the statement
    $stmt->execute();

    //Get the results
    $result = $stmt->get_result();  
    
    //This gets the array results.
    $sessioncheckresult = $result->fetch_array(MYSQLI_NUM);

    //close the statement
    $stmt->close();

    if (isset($sessioncheckresult[0]) && $sessioncheckresult[0] == 'GO') {      
    //Since the session is valided return to processing.      
    return;
    }
    else {
      //session verification failed, return to login page.
      header("Location: ../admin.html"); //redirect to the log in page in case of a time out.
      //Exit the script.
      exit();
    }      
  }
}
 
$usersecurity = new usersecurity;

?>




