<?php
 
 //store the paramaters passed alongw itwh the post in to variables
 $id = $_POST["ID"];
 $name = $_POST["Name"];
 $comment = $_POST["Comment"];

 //iniitalize the mysqli api
 include '../../etc/misc.php';
 $server =  $foos->server;
 $user = $foos->user;
 $password = $foos->password;
 $database = $foos->database;

 $mysql = new mysqli($server, $user, $password, $database); 

 //specify the query
 $query = "INSERT INTO blogComment (DateEntered, DATE, COMMENT, BlogID, NAME) VALUES (CURRENT_TIMESTAMP, CURDATE(), ?, ?, ?)";

 //Prepare the query
 $stmt = $mysql->prepare($query);                 

 //Bind the parameters to the query
 $stmt->bind_param('sis', $comment, $id, $name); 

 //Execute the statement
 $stmt->execute();

  //Check to see if the statement worked.
  if ($stmt->affected_rows > 0) {

    /*
    //use phpmailer instead
    use PHPMailer\PHPMailer\PHPMailer;

    
    //Set up the connection and who the email is going too
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;                     // Enable SMTP authentication
    $mail->Username = 'michaelpfoos@gmail.com'; // your email id
    $mail->Password = 'Fomi86fomi'; // your password
    $mail->SMTPSecure = 'tls';                  
    $mail->Port = 587;     //587 is used for Outgoing Mail (SMTP) Server.
    $mail->setFrom('michaelpfoos@gmail.com', 'NaMichael Foos');
    $mail->addAddress('michaelpfoos@gmail.com');   // Add a recipient
    $mail->isHTML(true);  // Set email format to HTML

    //Configure the content
    $bodyContent = '<h1>A comment was added at michaelfoos.com</h1>';
    $bodyContent .= '<p>The following comment was added by '.$name.' at MichaelFoos.com</p>';
    $mail->Subject = 'Email from michaelfoos.com';
    $mail->Body    = $bodyContent;

    //send the message
    $mail->send();
    */
  
    //Email myself letting me know the comment has been posted.  
    $message = "The following comment was added by ".$name." at MichaelFoos.com".PHP_EOL.$comment;

    //wrap the message in case ti's longer than 70 characters
    $message = wordwrap($message, 70, "\r\n");    

    //Send email to altert me of  failed login attempt
    mail("michaelpfoos@gmail.com", "Comment added at michaelfoos.com", $message);    

    //Notify the user that the comment has been added
    $return_arr[] = array("message" => "Comment successfully added!");
    echo json_encode($return_arr);      
    } else {
    //Notify the user the comment has not been added
    $return_arr[] = array("message" => "Record not inserted, better luck next time budddy!");
    echo json_encode($return_arr);              
}   

//Close the statement
$stmt->close();

//Close the connection
$mysql->close();       
?>