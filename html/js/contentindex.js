
//This code is used to call the data for the blog entry.
var xmlhttpBlog = new XMLHttpRequest();

xmlhttpBlog.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var jsonObj = JSON.parse(this.responseText); //This is what parses the json for the data you are looking for. 
    document.getElementById("Title").innerHTML = jsonObj[0].Title;
    document.getElementById("Date").innerHTML = jsonObj[0].DATE;
    document.getElementById("Paragraph1").innerHTML = jsonObj[0].Paragraph1; //This is what assigns the data you want.  
    document.getElementById("Paragraph2").innerHTML = jsonObj[0].Paragraph2;
    document.getElementById("Paragraph3").innerHTML = jsonObj[0].Paragraph3;
    document.getElementById('image1').setAttribute("src", jsonObj[0].image1);
    document.getElementById('image2').setAttribute("src", jsonObj[0].image2);
    document.getElementById('image3').setAttribute("src", jsonObj[0].image3);
  }
};

ajax = function() {
  xmlhttpBlog.open("GET", "../php/contentFitness.php", true);
  xmlhttpBlog.send(); 
}


var linkItems = document.querySelectorAll('.linkListItem');

//document.getElementById("myBtn").addEventListener("click", displayDate); 
linkItems.addEventListener("click", ajax); 

//End of blog entry data




