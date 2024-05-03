//see if the page is any of the following:
    //get infomaion from popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('Message received in content.js:', message);
});

//on page load event
//
//get passwords from the chrome.storage 

function getValueFromStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, function(result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}

let urlsIsReady = false;
async function getUrls() {
    const allPassword = await getValueFromStorage('passwords');
    console.log(allPassword);
    const myJson = JSON.parse(allPassword);
    console.log(myJson);
        //name: allPassword.name,
        //url: allPassword.url,
        //username: allPassword.username,
        //password: allPassword.password
    let currentDown = window.location.hostname;
    currentDown = currentDown.replace("www.", "");
    for (let i = 0; i < myJson.length; i++) {
        console.log(myJson[i].url);
        //incudes in the url
        if (myJson[i].url.includes(currentDown)) {
            console.log("This page is " + myJson[i].url);
            return myJson[i];
        }
    }
    return null;
}

function hadenInput(input) { 
    let listOfinputs = [];
    if (urlsIsReady) {
        return;
    }
    if (input.autocomplete == "username" ||
        input.name == "username" ||
        input.type == "email" ||
        input.name == "email") {
        // unfocus the input
        urlsIsReady = true;
        input.blur();

        listOfinputs.push(input);
    }
    //get all inputs
    var allInputs = document.getElementsByTagName('input');
    //check if the input is a password input
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].type == "password" || allInputs[i].name == "password" || allInputs[i].autocomplete == "current-password") {
            listOfinputs.push(allInputs[i]);
        }
    }
    createCheck(listOfinputs);
}

document.addEventListener('click', function(e) {
    if (e.target.tagName == 'INPUT') {
        hadenInput(e.target);
    }
}
);

function createCheck(input) {
     getUrls().then((result) => {
        if (result != null) {
            console.log(result);
        const div = document.createElement('div');
        div.id = 'exDiv';
        div.innerHTML = `

        <div style="position: absolute; max-width: 300px; top: 30%; left: 70%; transform: translate(-50%, -50%); background-color: white; padding:20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">

            <h1>Fill your password?</h1>
            <div style="display: flex; justify-content: center; align-items: center;">
                <button style="padding: 10px; border-radius: 5px; border: 1px solid black; margin: 5px; width: 80px; background-color: #fff0f0;" id="exButtenClose">Close</button>
                <button style="padding: 10px; width: 80px; border-radius: 5px; border: 1px solid black; margin: 10px; background-color: #f0fff0;" id="exButtenFill">Fill</button>
            </div>
        </div>`;

        document.body.appendChild(div);

        document.getElementById('exButtenFill').addEventListener('click', () => {
            input[0].value = result.username;
            input[1].value = result.password;
            document.getElementById('exDiv').remove();
        });
        // Event listener for close button
        document.getElementById('exButtenClose').addEventListener('click', () => {
            document.getElementById('exDiv').remove();

        });

            }
        }
        );
}

