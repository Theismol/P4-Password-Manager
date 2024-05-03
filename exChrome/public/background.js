let allUrls = [];
console.log(allUrls);

console.log("Chrome extension goormide content.js");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.currentPasswords) {
        allUrls = request.currentPasswords;
        console.log(allUrls);
    }

    if (request.message === "open_new_tab") {
        chrome.tabs.create({"url": "http://localhost:3000/login"});
    }

    if (request.message === "page_loaded") {
        console.log(request.domain);
        var currentDomain = request.domain;
        checkIfPageIsPasswordPage(currentDomain);

    }

}
);

function checkIfPageIsPasswordPage(domain) {
    //strip the www. from the domain and .com
    console.log(domain);
    domain = domain.replace(".com", "");
    domain = domain.split(".").pop();
    for (let i = 0; i < allUrls.length; i++) {
        console.log(allUrls[i].title);
        if (allUrls[i].title.includes(domain)) {
            console.log("-------------");
            sendToCurrentTab(allUrls[i]);
        }
    }
    return null;
}

function sendToCurrentTab(currentPassword) {
    console.log("Sending to current tab");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {currentPassword: currentPassword});
});}

