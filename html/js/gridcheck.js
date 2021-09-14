//add event listener
window.addEventListener('load', gridSupportResponse);


function gridSupport() {
    //https://stackoverflow.com/questions/51327827/display-a-browser-compatibility-alert-via-css-grid-support
    var div = document.createElement('div');
    div.style.display = 'grid';
    return div.style.display === 'grid';
}

function gridSupportResponse() {
    if (!gridSupport()) {        
        const responseDiv = document.getElementById('gridCheck');
        responseDiv.innerHTML = "Your browser does not support CSS Grid.  This page may not display properly.  Please use a modern web browser such as Google Chrome, Microsoft Edge, or Mozilla Firefox";
        responseDiv.style.width='100%';
        responseDiv.style.backgroundColor='Red';
        responseDiv.style.color='White';
        responseDiv.style.fontSize='150%';
    }
}

