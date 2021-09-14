var blogCommentButton = document.getElementById('btnComments');
var blogPostCommentDiv = document.getElementById('inputDiv');
var blogPostCommentButton = document.getElementById('btnPostComment');
//var blogPostCommentArticle = document.getElementById('divComments');

//Add event listeners
blogCommentButton.addEventListener("click", blogCommentButtonFunction);
blogPostCommentButton.addEventListener("click", blogPostCommentFunction);
addEventListener("load", blogCommentButtonFunction);
addEventListener("load", hidePostComment);

//declare a function to clear text for the input boxes
function cleartext(target) {
    if (   
        (target.classList.contains('inputTextName') || target.classList.contains('inputTextComment'))         
        && (target.innerHTML == 'Input name here...' || target.innerHTML == 'Input Comment here...')) {

    //clear the text
    target.innerHTML = "";
}
else return;

}

//declare function to close/hide the post form
function blogPostCommentFunction() {    
    if (blogPostCommentDiv.classList.contains('blogPostHide')) {
        showPostComment();
        blogPostCommentButton.innerHTML = "Hide Add Comment";
    }
    else {
        hidePostComment();
        blogPostCommentButton.innerHTML = "Add Comment";
    }
}

//declare function to close/hide the comments when the button is pushed.
function blogCommentButtonFunction() {
    if (!document.querySelector(".blogPostComments")) {
        return
    }
    else {
        const blogPostArticles = document.querySelector(".blogPostComments");        

        if (blogPostArticles.classList.contains('blogPostCommentsHide')) {
            showBlogComment(); 
            blogCommentButton.innerHTML = "Hide Comments";       
        }
        else {
            hideBlogComment();
            blogCommentButton.innerHTML = "Show Comments";  
        } 
    }      
}

//declare function to hide the comments
function hideBlogComment() {
    var index;
    const blogPostArticles = document.querySelectorAll(".blogPostComments");    
    const blogPostArticlesLength = blogPostArticles.length;    

    for (index = 0; index <= blogPostArticlesLength - 1; index++) {
    blogPostArticles[index].classList.add('blogPostCommentsHide');
    }
}

//declare function to show the comments
function showBlogComment() {
    var index;
    const blogPostArticles = document.querySelectorAll(".blogPostComments");
    const blogPostArticlesLength = blogPostArticles.length;    

    for (index = 0; index <= blogPostArticlesLength - 1; index++) {
        blogPostArticles[index].classList.remove('blogPostCommentsHide');
        }
}

//Declare a function to show the "Post a Comment" button
function hidePostComment() {
    blogPostCommentDiv.classList.add('blogPostHide');
}

//Declare a function to hide the "Post a Comment" button
function showPostComment() {
    blogPostCommentDiv.classList.remove('blogPostHide');
}

//Modal section
const modal = document.getElementById('imgModal');
const blogDivision = document.getElementById('blogDivID');

//add the event listener.
blogDivision.addEventListener('click', function(e){
    //insert code here.  
    let target = e.target;        

    if (target.className === "blogPostImage") {
        //declare the variables        
        let modalImg = document.getElementById("modalImg");
        let captionText = document.getElementById("Modalcaption");

        //change the display properties
        modal.style.display = "block";
        modalImg.src = target.src; //change this.src to img.src
        captionText.innerHTML = target.alt;
    }

})

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

//Add event listener to close the modal
span.addEventListener('click', closeModal);

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = "none";
}
//End of Modal Section