//https://www.w3schools.com/js/js_json_php.asp

var xmlhttp = new XMLHttpRequest();
var pcxmlhttp = new XMLHttpRequest();

//One method is to get this from the URL.  https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters
var url_string = window.location.href;
var url = new URL(url_string);
var blogID = url.searchParams.get("id");

//add event listeners
addEventListener('load', triggerBlog);
addEventListener('load', pcgetContent);


//create a function to trigger the appearance of the blog.
function triggerBlog() { 

  if (blogID == null && (!document.getElementsByClassName('blogDiv')[0].classList.contains('blogDivHide'))) {
    displayBlog(); //hide the blog section
  }
  else if (blogID != null && document.getElementsByClassName('blogDiv')[0].classList.contains('blogDivHide')) {
    displayBlog();
    getContent();
  }
  else getContent();
}

//Will use the xmlhttp to get the content.
function getContent() {
  xmlhttp.open("GET", "../php/content.php?blogID=" + blogID, true);
  xmlhttp.send();   
}

//define the xmlhttp.onreadystatechange
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    //declare the object to hold the JSOn
    var myObj = JSON.parse(this.responseText); //This is what parses the json for the data you are looking for. 

    //Update the head data
    const pagetitle = document.getElementById('pageTitle');
    const keywords = document.getElementById('keywords');    
    pagetitle.innerHTML = "Michael Foos's Programming Blog: " + myObj[0].Title;
    if (myObj[0].keywords != '') {
      keywords.content = myObj[0].keywords;
    }

    //Update the blog post data
    document.getElementById("Title").innerHTML = myObj[0].Title;
    document.getElementById("Date").innerHTML = myObj[0].DATE;
    document.getElementById("Paragraph1").innerHTML = myObj[0].Paragraph1; //This is what assigns the data you want.  
    document.getElementById("Paragraph2").innerHTML = myObj[0].Paragraph2;
    document.getElementById("Paragraph3").innerHTML = myObj[0].Paragraph3;
        if (myObj[0].image1 == '') {
      document.getElementById("image1").classList.add("blogPostHide");
    }
    else {
      document.getElementById('image1').setAttribute("src", myObj[0].image1);
      document.getElementById('image1').setAttribute("alt", myObj[0].image1alt);
    }
    if (myObj[0].image2 == '') {
      document.getElementById("image2").classList.add("blogPostHide");
    }
    else {
      document.getElementById('image2').setAttribute("src", myObj[0].image2);
      document.getElementById('image2').setAttribute("alt", myObj[0].image2alt);
    }
    if (myObj[0].image3 == '') {
      document.getElementById("image3").classList.add("blogPostHide");
    }
    else {
      document.getElementById('image3').setAttribute("src", myObj[0].image3);
      document.getElementById('image3').setAttribute("alt", myObj[0].image3alt);
    } 
    //section deals with the links at the end of the blog post
    //create elements to store the links
    const linkDiv = document.getElementById('blogPostLinks');
    var linkContainerParagraph = document.createElement('p');
    var link = document.createElement('a'); 

    //Determine if the link division should be un-hid 
    if (myObj[0].link1 != '' || myObj[0].link2 != '' || myObj[0].link3 != '') {
      linkDiv.classList.remove('blogDivHide');
    }

    //assaign values to the links and append them to the document
    if (myObj[0].link1 != '') {
      linkContainerParagraph.setAttribute('class', 'linkContainerParagraph');
      link.setAttribute('href', myObj[0].link1);
      link.setAttribute('class', 'blogPostLink');
      link.innerHTML = 'Link 1: ' + myObj[0].link1Caption;
      linkDiv.appendChild(linkContainerParagraph);
      linkContainerParagraph.appendChild(link);
    } 
    if (myObj[0].link2 != '') {
      linkContainerParagraph = document.createElement('p');
      link = document.createElement('a');
      linkContainerParagraph.setAttribute('class', 'linkContainerParagraph');
      link.setAttribute('href', myObj[0].link2);
      link.setAttribute('class', 'blogPostLink');
      link.innerHTML = 'Link 2: ' + myObj[0].link2Caption;
      linkDiv.appendChild(linkContainerParagraph);
      linkContainerParagraph.appendChild(link);
    } 
    if (myObj[0].link3 != '') {
      linkContainerParagraph = document.createElement('p');
      link = document.createElement('a');
      linkContainerParagraph.setAttribute('class', 'linkContainerParagraph');
      link.setAttribute('href', myObj[0].link3);
      link.setAttribute('class', 'blogPostLink');
      link.innerHTML = 'Link 3: ' + myObj[0].link3Caption;
      linkDiv.appendChild(linkContainerParagraph);
      linkContainerParagraph.appendChild(link);
    } 
  }
}


//Declare function to hide or show the blog section when not in use.  
function displayBlog() {
  let blogDiv = document.getElementsByClassName('blogDiv'); 

  if (blogDiv[0].classList.contains('blogDivHide')) {
      blogDiv[0].classList.remove('blogDivHide');
  }
  else {
      blogDiv[0].classList.add('blogDivHide');
  } 
}

//Function to get the comment contents defined below.
function pcgetContent() {
  pcxmlhttp.open("GET", "../php/contentBlogComment.php?blogID=" + blogID, true);
  pcxmlhttp.send();   
}

//define xmlhttp to pull the comments
pcxmlhttp.onreadystatechange = function() {
  let date = "";
  let name = "";
  let comment = "";
  let i = 0; 
  let article = document.getElementById('blogComments');


  if (this.readyState == 4 && this.status == 200) {
    var pcJSON = JSON.parse(this.responseText); //This is what parses the json for the data you are looking for. 
    let pcLength = pcJSON.length;   

    //loop through the json to populate the DOM with the comments.
    for (i = 0; i < pcLength; i++) {
      //get the values from the JSON and assign them to the variables
      date = pcJSON[i].DATE;      
      name = pcJSON[i].NAME;      
      comment = pcJSON[i].Comment;      

      //create the section
      let section = document.createElement('section');
      section.setAttribute('class', 'blogPostComments');
      section.classList.add('blogPostCommentsHide');

      //Set up the Name
      let commentName = document.createElement('p');
      commentName.setAttribute('class', 'commentName');
      commentName.innerHTML = '<b>Name:</b>' + name;

      //Set up the date
      let commentDate = document.createElement('p');
      commentDate.setAttribute('class', 'commentDate');
      commentDate.innerHTML = '<b>Date:</b>' + date;

      //Set up the text
      let commentText = document.createElement('p');
      commentText.setAttribute('class', 'commentText');
      commentText.innerHTML = comment;

      //append elements      
      section.appendChild(commentName); //add the comment name
      section.appendChild(commentDate); //add the date
      section.appendChild(commentText); //add the text
      article.appendChild(section); //Add the section to the article
    }

  }
}


