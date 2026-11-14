// message for dark or incognito mode (chrome)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || chrome.extension.inIncognitoContext)
  chrome.runtime.sendMessage({scheme: 'dark'});
else
  chrome.runtime.sendMessage({scheme: 'light'});
