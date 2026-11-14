var ext_api = chrome || browser;

try {
  window.localStorage.clear();
  window.sessionStorage.clear();
} catch (e) {
  console.log(e);
}

var cookie_domain = getCookieDomain(document.domain);

// send domain to background.js (to clear cookies)
ext_api.runtime.sendMessage({
  request: 'clear_cookies_domain',
  data: {
    domain: cookie_domain
  }
});

function getCookieDomain(hostname) {
  let domain = hostname;
  let n = 0;
  let parts = hostname.split('.');
  let str = '_gd' + (new Date()).getTime();
  try {
    while (n < (parts.length - 1) && document.cookie.indexOf(str + '=' + str) == -1) {
      domain = parts.slice(-1 - (++n)).join('.');
      document.cookie = str + "=" + str + ";domain=" + domain + ";";
    }
    document.cookie = str + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
  } catch (e) {
    console.log(e);
  }
  return domain;
}

var msg = "Cookies (and local storage) removed from " + cookie_domain;
showMessage(msg, 2000);

function showMessage(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute("style", "position:fixed;top:40%;left:40%;z-index:99;padding:4px;font-family: Arial, sans-serif;font-size:18px;color:white;background-color:blue;");
  el.innerText = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  (document.body || document.head || document.documentElement).appendChild(el);
}
