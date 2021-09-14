const urllink = '../php/fitnesslinks.php';

fetch(urllink)
.then(response => {
  if (response.status !== 200) {
    const headerlinkerror = 'failed loading header links: status code '    
    throw Error(headerlinkerror + response.status);
  }
  return response.json()   
})
.then(data => {  
  const myObjLength = data.length;  

  for (x = 0;x < myObjLength; x++) {        

  //declare a variable to store the url.
  var fitnessUrl = "/fitness.html?id=" + data[x].BlogID.toString();

  //Get the unordered list element.
  var linkListFitness = document.getElementById('navLinksFitness');

  //Create the list item to hold the link
  var listElementFitness = document.createElement('li');      
  
  //Create the link itself
  var linkElementFitness = document.createElement('a');

   //Assign the text to the link
   linkElementFitness.textContent = data[x].DATE + ": " + data[x].Title;   

   //Assign the href to the link
   linkElementFitness.setAttribute("href", fitnessUrl);         
   linkElementFitness.setAttribute("id", data[x].BlogID);
   linkElementFitness.setAttribute("class", "linkListItem");  

  //append the link to the list item
  listElementFitness.appendChild(linkElementFitness);

  //append the list item to the list
  linkListFitness.appendChild(listElementFitness);          

  }//End of loop  
 })
 .catch((err) => {
   console.error('Error', err);  //Displays a formatted red      
 });
 
