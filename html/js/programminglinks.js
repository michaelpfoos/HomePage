const urllink = '../php/programminglinks.php';

fetch(urllink)
.then(response => {
  if (response.status !== 200) {
    const headerlinkerror = 'failed loading header links: status code '    
    throw Error(headerlinkerror + response.status);
  }
  return response.json()
})
.then(data => {          
    var myObjLength = data.length;     

    for (x = 0;x < myObjLength; x++) {        

        //declare a variable to store the url.
        var programmingUrl = "/programming.html?id=" + data[x].BlogID.toString();

        //Get the unordered list element.        
        var linkListProgramming = document.getElementById('navLinkProgramming');

        //Create the list item to hold the link        
        var listElementProgramming = document.createElement('li');  
        
        //Create the link itself
        var linkElementProgramming = document.createElement('a');

         //Assign the text to the link         
         linkElementProgramming.textContent = data[x].DATE + ": " + data[x].Title;  
         //Assign the href to the link
         linkElementProgramming.setAttribute("href", programmingUrl);         
         linkElementProgramming.setAttribute("id", data[x].BlogID);
         linkElementProgramming.setAttribute("class", "linkListItem");  

        //append the link to the list item
        listElementProgramming.appendChild(linkElementProgramming);

        //append the list item to the list
        linkListProgramming.appendChild(listElementProgramming);   

    }//End of loop  
})
.catch((err) => {
  console.error(err);  //Displays a formatted red      
});