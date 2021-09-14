//declare constants
const sessionID = sessionStorage.sessionID;
var xmlhttpvalidatepw = new XMLHttpRequest();

//add an event listener to check local storage for the username and password on load.
document.addEventListener('load', sessionCheck(sessionID));

//password checks to make sure a username and pw has been entered.
function sessionCheck(sessionID) {
    if (sessionID == null) {
        //redirect
        window.location.href = "admin.html";
    }
    
    else
    document.getElementById('sessionHolder').innerHTML = sessionID; 
    return;
}
