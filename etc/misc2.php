<?php

class foosDBSecurity {      
    
    public function getFoosPW ($password) {  
        $algorithm = PASSWORD_ARGON2ID;       

        //hash and salt the password
        return password_hash($password, $algorithm);          
      }
    
}

$foosDBSecurity = new foosDBSecurity;
 
?>