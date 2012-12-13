chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.url){
    chrome.tabs.create({ "url" : "about:blank#" + request.url, "selected" : false }, onTabCreated);
  }
});

function onTabCreated(tab) {
  chrome.tabs.update(tab.id, {"url" : tab.url.split('#')[1]});
}
