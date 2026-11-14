var ext_api = (typeof browser === 'object') ? browser : chrome;
ext_api.runtime.onMessage.addListener(handleMessages);

async function handleMessages(message) {
  if (message.request === 'getExtSrc_dom')
    getExtSrc_dom(message.data);
}

function getExtSrc_dom(data) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(data.html, 'text/html');
  let article_new = doc.querySelector(data.selector_source);
  data.html = article_new ? article_new.outerHTML : '';
  sendToBackground('getExtSrc_dom_result', data);
}

function sendToBackground(request, data) {
  ext_api.runtime.sendMessage({request, data});
}
