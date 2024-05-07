
let currentPassword = null;
let urlisReady = false;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.currentPassword != null) {
        currentPassword = message.currentPassword;
          createCheck(listOfinputs);
    }
});


function getUrls() {

    //get only the example.com from www.test.test.test.example.com to example.com

    let urls = window.location.hostname;
    let url = urls.split('.');
    if (url.length > 2) {
        urls = url[url.length - 2] + '.' + url[url.length - 1];
    }
    console.log(urls);

    chrome.runtime.sendMessage({ message: "fetchData", url: urls }, function(response) {
        //console.log(response);
    });
    urlisReady = true;

}

let listOfinputs = [];

function hadenInput(input) { 
    if (urlisReady == true) {
        return;
    }
    if (input.autocomplete == "username" ||
        input.name == "username" ||
        input.type == "email" ||
        input.name == "email") {

        listOfinputs.push(input);
        getUrls();
    }

    //get all inputs
    var allInputs = document.getElementsByTagName('input');

    //check if the input is a password input
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].type == "password" || allInputs[i].name == "password" || allInputs[i].autocomplete == "current-password") {
            listOfinputs.push(allInputs[i]);
        }
    }
}

document.addEventListener('click', function(e) {
    if (e.target.tagName == 'INPUT') {
        hadenInput(e.target);
    }
});

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
    document.body.appendChild(div);

        document.getElementById('exButtenFill').addEventListener('click', () => {
            input[0].value = currentPassword.username;
            input[1].value = currentPassword.password;
            document.getElementById('exDiv').remove();
        });
        // Event listener for close button
        document.getElementById('exButtenClose').addEventListener('click', () => {
            document.getElementById('exDiv').remove();

        });
}


