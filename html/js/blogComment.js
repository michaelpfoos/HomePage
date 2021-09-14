const commentButton = document.getElementById('submitComment');
var xmlhttppostComment = new XMLHttpRequest();
const id = url.searchParams.get("id"); 

//add an event listener to listen for the click of the post comment button
commentButton.addEventListener('click', function(e) {

 //declare the local variables
 var inputName = document.getElementById('inputTextName');
 let inputComment = document.getElementById('inputTextComment');
 let url = '../php/postBlogComment.php';
 const error = document.getElementById('postCommentError');

 //prevent the click from submitting the form.  
 e.preventDefault(); 
 
 if (inputName.value == "" || inputName.value == "Input name here..." || inputComment.value == "" || inputComment.value == "Input Comment here...") {
     //alert("Please provide your name and a comment in order to proceed.");
     error.textContent = 'Please provide your name and a comment in order to proceed.' 
     error.classList.add('postCommentError');
 }
 else {    
     error.style.display = 'none'; 
     const Paramater = "Name=" + inputName.value + "&" + "Comment=" + inputComment.value + "&" + 'ID=' + id;          
     xmlhttppostComment.open('POST', url, true);
     xmlhttppostComment.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //This header is required.  The whole thing will not work without it.  Study this to find out why.
     xmlhttppostComment.send(Paramater);     
 }

 //alert the user that they need to enter in a name or comment before submitting the data.

})

//define the xmlhttp.onreadystatechange
xmlhttppostComment.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {      
      postComment(JSON.parse(xmlhttppostComment.responseText));      
    }
  }

  function postComment(response) {
    //Grab the dom elements
    let message = document.getElementById('postCommentP');
    let modal = document.getElementById('postCommentModal');
    let close = document.getElementById('commentClose');    

    //set the message = to the response.
    message.textContent = response[0].message;   

    //Make the modal display
    modal.style.display = 'block';

    //Add the event listener to close the modal when the user clicks the x
    close.addEventListener('click', function() {
      location.reload(); //Reloads the page
    })

  }


