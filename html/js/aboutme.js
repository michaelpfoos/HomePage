//Resize event.  Added one to work on load in case a resolution begins at a lower resolution.  (Like a phone).
addEventListener("resize", moveElement);
addEventListener("load", moveElement);


function moveElement() {
    var screenWidth = window.innerWidth;

    if (screenWidth > 675) {
        moveUp();
    } 
    else moveDown();    
}

function moveUp() {
    //https://stackoverflow.com/questions/20910147/how-to-move-all-html-element-children-to-another-parent-using-javascript
    var upperParent = document.getElementById('workArticleUpper');
    var lowerParent = document.getElementById('workArticleLower');

    while (lowerParent.childNodes.length > 0) {
        upperParent.appendChild(lowerParent.childNodes[0]);
    }
}

function moveDown() {
    //https://stackoverflow.com/questions/20910147/how-to-move-all-html-element-children-to-another-parent-using-javascript
    var upperParent = document.getElementById('workArticleUpper');
    var lowerParent = document.getElementById('workArticleLower');

    while (upperParent.childNodes.length > 0) {
        lowerParent.appendChild(upperParent.childNodes[0]);
    }
}



