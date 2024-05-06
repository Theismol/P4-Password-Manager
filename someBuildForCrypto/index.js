import CryptoJS from 'crypto-js';
let encryptedpassword = '';
let listUrl = [];

const getValueFromStorage = () => {
    chrome.storage.sync.get(['encryptedpassword'], function (result) {
        encryptedpassword = result.encryptedpassword;
        for (let i = 0; i < encryptedpassword.length; i++) {
            listUrl.push(encryptedpassword[i].url);
        }
    });
};
getValueFromStorage();
console.log(listUrl);


const fetchData = async (url) => {
    try {
        const response = await fetch("http://localhost:4000/api/auth/getUserKey", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await response.json();

        for (let i = 0; i < encryptedpassword.length; i++) {
            //check if the url is the same as the current url
            if (encryptedpassword[i].url.includes(url)) {
                const currentPassword = CryptoJS.AES.decrypt(encryptedpassword[i].password, data.key).toString(CryptoJS.enc.Utf8);
                console.log(currentPassword);
                const currenSile = {
                    username: encryptedpassword[i].username,
                    password: currentPassword,
                };

                sendToCurrentTab(currenSile);

            }
        }
    } catch (error) {
        console.error("Error fetching passwords:", error);
    }

};

//check if the url is in the list

function checkUrl(url) {
    console.log("URL: ", url);
    for (let i = 0; i < listUrl.length; i++) {
        //include the url in the list
        if (listUrl[i].includes(url)) {
            return true;
        }
    }
    return false;
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if (request.message === 'fetchData') {
        if (checkUrl(request.url)) {
            sendResponse({type: "success", message: "Data fetched successfully!"});
            fetchData(request.url)
        }
    }
});


function sendToCurrentTab(currentPassword) {
    console.log("Sending to current tab");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {currentPassword: currentPassword});
});}






