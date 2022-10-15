var sciHubPlugin = '0.2.1';

chrome.browserAction.onClicked.addListener(function(tab) {
	var url = 'https://sci-hub.ru/';
	if (tab.url.indexOf('sci-hub.') < 0
		&& tab.url.indexOf('scholar.google') < 0
		&& tab.url.indexOf('.') > 0)
			url = url + tab.url;
	chrome.tabs.create({'url': url}, function(tab) {
			var listener =
			chrome.webRequest.onBeforeSendHeaders.addListener(
			function(details) {
				details.requestHeaders.push({ name: "sci-hub-plugin", value: sciHubPlugin});
				chrome.webRequest.onBeforeSendHeaders.removeListener(listener);
				return {requestHeaders: details.requestHeaders};
			},
			{urls: [url], tabId: tab.id},
			["blocking", "requestHeaders"]);
		});	
});
