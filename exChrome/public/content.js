//see if the page is any of the following:
    //get infomaion from popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('Message received in content.js:', message);
});

//on page load event

let domain = document.domain;
console.log('The page is loaded:', domain);
chrome.runtime.sendMessage({message: "page_loaded", domain: domain});



let passwordStorePass = checkIfPageIsPasswordPage();
var currentInput = null;

function checkIfPageIsPasswordPage() {
    var currentDomain = document.domain;
    //strio the www. from the domain and .com
    console.log(currentDomain);
    currentDomain = currentDomain.replace("www.", "");
    for (i = 0; i < getPasswords().length; i++) {
        if (currentDomain.includes(getPasswords()[i].name)) {
            console.log("This page is " + getPasswords()[i].name);
            return getPasswords()[i];
        }
    }
    return null;
}


    

function handleLoad() {
    if (passwordStorePass != null) {
        var inputsAll = document.getElementsByTagName('input');
        console.log(inputsAll);
        for (i = 0; i < inputsAll.length; i++) {
            if (inputsAll[i].autocomplete == "username" || inputsAll[i].name == "username" || inputsAll[i].type == "email" || inputsAll[i].name == "email") {
                currentInput = inputsAll[i];
                createCheck();
            }
        }
    }
}

//on page load
window.onload = function() {
    //delay the function for 2 seconds
    setTimeout(function() {
        handleLoad();
    }
    , 2000);
};

function createCheck() {
    var div = document.createElement('div');
    div.id = 'exDiv';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = 'rgba(0,0,0,0.2)'
    div.style.position = 'absolute';
    div.style.top = '0px';
    div.style.zIndex = '1000';

    div.style.left = '0px';
    div.innerHTML = '<div style="position: absolute; max-width: 300px;   top: 30%; left: 70%; transform: translate(-50%, -50%); background-color: white; padding:20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2);"><h1>Do you want to fille your passwrd?</h1><div style="display: flex;    justify-content: center;    align-items: center;"> <button id="exButtenClose" style="padding: 10px; border-radius: 5px; border: 1px solid black; margin: 5px; width: 80px; background-color: #fff0f0;" id="close">Close</button><button  id="exButtenFill"  style="padding: 10px; width: 80px; border-radius: 5px; border: 1px solid black; margin: 10px; background-color: #f0fff0;" id="fill">Fill</button></div></div>'
    document.body.appendChild(div);
}

document.addEventListener('click', function(e) {
    console.log(currentInput);
    if (e.target.id == 'exButtenFill') {
        currentInput.value = passwordStorePass.username;
        document.getElementById('exDiv').remove();
    }
    if (e.target.id == 'exButtenClose') {
        document.getElementById('exDiv').remove();
    }
}
);


