//see if the page is any of the following:

let urlsIsReady = false;
let currentPasswrd = null;
let listOfinputs = [];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.currentPassword);
    if(request.currentPassword != null) {
        console.log(request.currentPassword);
        currentPasswrd = request.currentPassword;
    }
});


function getUrlsAndCheck() {
    const currentUrl = window.location.hostname;
    //strip the www. from the domain and .com
    // https://www.test.test.test.google.com
    // how to get only google.com
    let domain = currentUrl.split('.').slice(-2).join('.');

    //send a message to the background.js
    chrome.runtime.sendMessage({message: "fetchData", url: domain}, function(response) {
        if (response != null) {
            urlsIsReady = true;
            createCheck(listOfinputs);
            return true;
        }
    });
    return false;
}



let positionX = 0, positionY = 0;

function hadenInput(input) { 
    if (urlsIsReady) {
        return;
    }
    if (input.autocomplete == "username" ||
        input.name == "username" ||
        input.type == "email" ||
        input.name == "email") {
        // unfocus the input
        input.blur();
        listOfinputs.push(input);

        getUrlsAndCheck();
    }
    //get all inputs
    var allInputs = document.getElementsByTagName('input');
    //check if the input is a password input
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].type == "password" || allInputs[i].name == "password" || allInputs[i].autocomplete == "current-password") {
            
            //get the position of the input
            positionX = allInputs[i].getBoundingClientRect().left;
            positionY = allInputs[i].getBoundingClientRect().top;

            listOfinputs.push(allInputs[i]);
        }
    }
    
}

document.addEventListener('click', function(e) {
    if (e.target.tagName == 'INPUT') {
        hadenInput(e.target);
    }
}
);

function createCheck(input) {
const div = document.createElement('div');
div.id = 'exDiv';
div.innerHTML = `
<div style="position: absolute; left: 100px; top: 100px; max-width: 300px;
z-index: 1000; background-color: white; padding:20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">

<h1 style="text-align: center; color: black;">Fill your password?</h1>
    <div style="display: flex; justify-content: center; align-items: center;">
        <button style="padding: 10px; color: black;
border-radius: 5px; border: 1px solid black; margin: 5px; width: 80px; background-color: #fff0f0;" id="exButtenClose">Close</button>
        <button style="padding: 10px; width: 80px; color: black;
border-radius: 5px; border: 1px solid black; margin: 10px; background-color: #f0fff0;" id="exButtenFill">Fill</button>
    </div>
</div>`;

document.body.appendChild(div);        //set the position of the div

        document.getElementById('exButtenFill').addEventListener('click', () => {
            input[0].value = currentPasswrd.username;
            input[1].value = currentPasswrd.password;
            document.getElementById('exDiv').remove();
        });
        // Event listener for close button
        document.getElementById('exButtenClose').addEventListener('click', () => {
            //set boolean to false
            document.getElementById('exDiv').remove();
        });
    }

