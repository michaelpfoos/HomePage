//Get the button.
const headerButton = document.getElementById("burgermenu");

//Add the event listener to listen for the click on the header button
headerButton.addEventListener("click", function(e) {
  let target = e.target;

  //Only trigger the change if either the menu link or the burger is clicked on.
  if (target.id == 'burger' || target.id == 'headerBurgerButtonLink' || target.classList.contains('bar1') || target.classList.contains('bar2') || target.classList.contains('bar3')) {
    clickBurgerIcon();
  }  
})

//Add an event listener for load
window.addEventListener('load', checkWidth);

//Add an event listener for rezie
window.addEventListener('resize', checkWidth);


function checkWidth() { 
  const screenWidth = window.innerWidth;  
  const headerLinks = document.querySelectorAll('.headerLink');

  //check the screen width
  if (screenWidth >= 675 && headerLinks[0].classList.contains('hidenav'))  {
    //show the headerlinks
    hideHeaderLinks();       
  }
  if (screenWidth < 675 && headerButton.innerHTML.includes('MENU') && (!headerLinks[0].classList.contains('hidenav'))) {
    //hide the header links
    hideHeaderLinks();   
  }
}

function clickBurgerIcon() {
  const headerLinks = document.querySelectorAll('.headerLink');    

  //change the state of the icon.
  burgerIcon();  

  //flip the burger
  flipburger();

  //Toggle the links
  hideHeaderLinks();
 
}

//This function hides the header Links
function hideHeaderLinks() {
  const headerLinks = document.querySelectorAll('.headerLink');
  const Length = headerLinks.length;
  let i;

  for (i=0; i <= Length - 1; i++) {
    if (headerLinks[i].classList.contains('hidenav')) {
      //Remove the class here.
      headerLinks[i].classList.remove('hidenav'); 
      headerLinks[i].classList.add('shownav');
    }
    else if (headerLinks[i].classList.contains('hide')) {
      //Remove the class here.
      headerLinks[i].classList.remove('hide'); 
      headerLinks[i].classList.add('shownav');
    }    
    else {
      //Add the class here.
      headerLinks[i].classList.remove('shownav'); 
      headerLinks[i].classList.add('hidenav');
    }
  }
}

//Function to change the button from menu to exit.
function burgerIcon() {
  const headerButton = document.getElementById("headerBurgerButtonLink");
  if (headerButton.textContent.includes('MENU')) {
    headerButton.innerHTML = 'EXIT'
  }
  else headerButton.innerHTML = 'MENU';
}

//Flip the burger icon
function flipburger() {
  let burger = document.getElementById('burger');    
  burger.classList.toggle("change"); 
}