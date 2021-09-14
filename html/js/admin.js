//add the constants
const username = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('loginFormSubmit');
const error = document.getElementById('passwordError');
var xmlhttpvalidatepw = new XMLHttpRequest();

//add event listener
login.addEventListener('click', function(e) {
    //what to do here.
    let paramater = "username=" + username.value + "&" + "password=" + password.value;      
    let url = '../php/admin.php';
    
    //Post the information
    if (username.value != '' && password.value != '') {
        xmlhttpvalidatepw.open('POST', url, true);
        xmlhttpvalidatepw.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //This header is required.  The whole thing will not work without it.  Study this to find out why.
        xmlhttpvalidatepw.send(paramater);
    }

    else error.innerHTML ='Please enter a username and password'; 
})

//Create the function to valide the user.
//define the xmlhttp.onreadystatechange
xmlhttpvalidatepw.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {        
        let chkResponse = JSON.parse(xmlhttpvalidatepw.responseText);            
        let sessionID = chkResponse.sessionID;         
        sessionStorage.setItem("sessionID", sessionID);
        console.log(sessionID);                        

        switch (sessionID) {
            case '':
                error.innerHTML = "Error! Username or password does not match the database!";                    
                break;

            case 'Maximum Login Attempts Exceeded Please Contatct a System Administrator':
                error.innerHTML = 'Maximum Login Attempts Exceeded Please Contatct a System Administrator';
                break;

            default:                      
            error.innerHTML = "";         
            //re-direct to the blog post page
            window.location.href = "postBlog.html";
        }            
    }
  }

