<!DOCTYPE html>
<html>
    <head>
        <title>About Michael Foos</title>       
        <link href="..\css\header.css" type ="text/css" rel="Stylesheet">  
        <meta name="robots" content="noindex">
        <meta charset="utf-8"/>  
    </head>
    <body>
    <div class="headerParentFlex">   
        <div id="divRow1">     
          <label class="headerTitle">Michael Foos</label>
          <div id="stretchRow1"></div>              
          <a id="headerBurgerButtonLink">&#8801;MENU</a>      
        </div>          
        <a class="headerLink hide" href="../index.html">Home</a>               
            <a class="headerLink hide" href="../aboutme.html">About me</a>   
            <a class="headerLink hide" href="../programming.html">Programming</a>   
            <a class="headerLink hide" href="../fitness.html">Fitness</a>                            
      </div>
      <div id="divSpacer"></div>
      <header>
          <h1 id="pageTitle">Blog Post Upload Status</h1>
      </header>  
        <?php

        //Require the user security library.      
        require_once '../../etc/security.php';

        //get the sessoinid
        $sessionid = $_POST["sessionHolder"];  
        
        //Check the sessionid.  If fails user will be returned to the login page.
        $usersecurity->checksession($sessionid);
        
        //Declare the variables to pass to mysqli
        $server =  $foos->server;
        $user = $foos->user;
        $password = $foos->password;
        $database = $foos->database;        
        
        //Connect to the database
        $mysqli = new mysqli($server, $user, $password, $database);   
        
        //define the image variables before the loop is defined in case they are blank.      
        $image1 = "";
        $image2 = "";
        $image3 = "";

        //Loop through the images
        for ($counter = 1; $counter <= 3; $counter++) {
          if(isset ($_FILES['Image'.$counter])) {
          
          $datetimestamp = date("Ymdhi"); //add a time stamp to add to the end of the file name.
          $target_dir = "../images/uploads/";             
          $errors= array();                    
          $file_name = $datetimestamp.$_FILES['Image'.$counter]['name']; //The Image is the name of the file in the array.  (Defined in your HTTP attribute).  
          $file_size = $_FILES['Image'.$counter]['size'];          
          $file_tmp = $_FILES['Image'.$counter]['tmp_name'];
          $file_type= $_FILES['Image'.$counter]['type'];          
          $file_ext=strtolower(end(explode('.',$file_name)));        
          $extensions = array("jpeg","jpg","png");          

          if(in_array($file_ext,$extensions)=== false){
            $errors[]="Image".$counter."error: extension not allowed, please choose a JPEG or PNG file."."<br />";
        }
        
        if($file_size > 12097152){
            $errors[]='Image'.$counter.'error: File size must be excately 12 MB'."<br />";
        }     
        
        //This moves the file. 
        //For this step to work www-data must have access to the directory the file is being moved too.  This is the default user name PHP uses to move files.  
        if(empty($errors)==true){
            move_uploaded_file($file_tmp,$target_dir.$file_name); //replaced the directory provided in the example with my target directory.
            echo "Success for Image".$counter."<br />";
        }else{
            print_r($errors);        
          }      

      } //end of isset 
        //End of Image Section
            //Define image name 1 for database entry
            if ($_FILES['Image'.$counter]['name'] != "" && 'Image'.$counter === 'Image1') {
              $image1 = $target_dir.$file_name; //define in loop                 
            } 
  
            //Define image name 2 for database entry
            if ($_FILES['Image'.$counter]['name'] != "" && 'Image'.$counter === 'Image2') {
              $image2 = $target_dir.$file_name; //define in loop                          
            } 
            //Define image name 3 for database entry
            if ($_FILES['Image'.$counter]['name'] != "" && 'Image'.$counter === 'Image3') {
              $image3 = $target_dir.$file_name; //define in loop                          
            } 
                
      } //end of image loop  

        //Get the post data
        $Title = $_POST["Title"];
        $Paragraph1 = $_POST["Paragraph1"];
        $Paragraph2 = $_POST["Paragraph2"];
        $Paragraph3 = $_POST["Paragraph3"]; 
        $PostType = $_POST["Post_Type"];  
        $Image1Caption = $_POST["image1Caption"];
        $Image2Caption = $_POST["image2Caption"];
        $Image3Caption = $_POST["image3Caption"]; 
        $Link1 = $_POST["link1"]; 
        $Link2 = $_POST["link2"];  
        $Link3 = $_POST["link3"];      
        $Link1Caption = $_POST["link1Caption"];  
        $Link2Caption = $_POST["link2Caption"];  
        $Link3Caption = $_POST["link3Caption"];
        $keywords = $_POST["Keywords"];


        //Declare query.  CURRENT_TIMESTAMP gets the date and time with hours, minutes, and seconds.  CURDATE gets the date and time.
        $Query = 'INSERT INTO blogContent (DateEntered, DATE, Title, Paragraph1, Paragraph2, Paragraph3, image1, image2, image3, Post_Type, image1alt, image2alt, image3alt, link1, link2, link3, link1Caption, link2Caption, link3Caption, keywords) VALUES (CURRENT_TIMESTAMP, CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        //Prepare the query
        $stmt = $mysqli->prepare($Query);    

        //Bind the parameters to the query
        $stmt->bind_param('ssssssssssssssssss', $Title, $Paragraph1, $Paragraph2, $Paragraph3, $image1, $image2, $image3, $PostType, $Image1Caption, $Image2Caption, $Image3Caption, $Link1, $Link2, $Link3, $Link1Caption, $Link2Caption, $Link3Caption, $keywords);

        //Execute the statement
        $stmt->execute();        

          //Check to see if the statement worked.
          if ($stmt->affected_rows > 0) {
              echo "<p>Record successfully inserted in to the database!</p>";   
              //redirect to home page
              header("Location: ../index.html");     
              } else {
              echo "<p>Record not inserted, better luck next time budddy!</p>";      
          }   

        //Close the statement
        $stmt->close();        
       
        ?>
      

      <script src="..\js/header.js"></script>
    </body>
</html>