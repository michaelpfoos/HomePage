const url = '../php/homepagelinks.php';

fetch(url)
  .then(
    //This is where you check for errors.
    function(response) {
      if (response.status !== 200) {        
        throw Error('Unable to load header links: Status Code ' + response.status);
        return;
      }
      //The key is in the response
      //https://developer.mozilla.org/en-US/docs/Web/API/Response
      response.json().then(
        function(data) {
          const myObj = data;  
          const myObjLength = myObj.length;  
          
          for (x = 0;x < myObjLength; x++) {    

            if (myObj[x].Post_Type == 'F') {       
      
              //declare a variable to store the url.
              var fitnessUrl = "/fitness.html?id=" + myObj[x].BlogID.toString();
      
              //Get the unordered list element.
              var linkListFitness = document.getElementById('navLinksFitness');
      
              //Create the list item to hold the link
              var listElementFitness = document.createElement('li');      
              
              //Create the link itself
              var linkElementFitness = document.createElement('a');
      
               //Assign the text to the link
               linkElementFitness.textContent = myObj[x].DATE + ": " + myObj[x].Title;      
               //Assign the href to the link
               linkElementFitness.setAttribute("href", fitnessUrl);         
               linkElementFitness.setAttribute("id", myObj[x].BlogID);
               linkElementFitness.setAttribute("class", "linkListItem");  
      
              //append the link to the list item
              listElementFitness.appendChild(linkElementFitness);
      
              //append the list item to the list
              linkListFitness.appendChild(listElementFitness);
            }   
            
             if (myObj[x].Post_Type == 'P') {  
      
               //declare a variable to store the url.
               var programingUrl = "/programming.html?id=" + myObj[x].BlogID.toString(); //This will eventually need to be changed to /programing.html
      
              //Get the unordered list element.
              var linkListPrograming = document.getElementById('navLinksProgramming');   
      
              //Create the list item to hold the link        
              var listElementPrograming = document.createElement('li');
      
              //Create the link itself
              var linkElementPrograming = document.createElement('a');
              
               //Assign the text to the link
               linkElementPrograming.textContent = myObj[x].DATE + ": " + myObj[x].Title;      
               //Assign the href to the link
               linkElementPrograming.setAttribute("href", programingUrl);         
               linkElementPrograming.setAttribute("id", myObj[x].BlogID);
               linkElementPrograming.setAttribute("class", "linkListItem");  
        
              //append the link to the list item
              listElementPrograming.appendChild(linkElementPrograming);
      
              //append the list item to the list
              linkListPrograming.appendChild(listElementPrograming);
            }         
            
          }//End of loop  

        }
      )
    }
  )
  .catch((err) => {
    console.error('Error', err);  //Displays a formatted red      
  });

  