console.log("Chrome extension goormide content.js");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message);
    if (request.message === "open_new_tab") {
        chrome.tabs.create({"url": "http://localhost:3000/login"});
    }
    sendResponse({message: "success"});
}
);



