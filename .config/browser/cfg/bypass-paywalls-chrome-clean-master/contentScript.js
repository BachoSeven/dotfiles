//"use strict";
var ext_api = chrome || browser;
var ext_chromium = window.navigator.userAgent.toLowerCase().includes('chrome');
if (ext_api.runtime && ext_api.storage) {
  var manifestData = ext_api.runtime.getManifest();
  ext_chromium = !!manifestData.key;
}
var mobile = window.navigator.userAgent.toLowerCase().includes('mobile');
var domain;
var func_post;
var fetch_headers;
var bg2csData_fetch;
var data_ext_fetch = [];
var data_ext_fetch_id = 0;
var csDone;
var csDoneOnce;
var runOnce;
var cs_param = {};
var dompurify_loaded = (typeof DOMPurify === 'function');
var dompurify_options = {ADD_TAGS: ['amp-img', 'embed', 'iframe', 'list'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'itemprop', 'layout', 'target']};

var usa_mcc_domains = ['bnd.com', 'charlotteobserver.com', 'elnuevoherald.com', 'fresnobee.com', 'kansas.com', 'kansascity.com', 'kentucky.com', 'mcclatchydc.com', 'miamiherald.com', 'newsobserver.com', 'sacbee.com', 'star-telegram.com', 'thestate.com', 'tri-cityherald.com'];

function clearLocalStorage(bg2csData = '') {
  if (bg2csData && bg2csData.cs_clear_lclstrg && !matchDomain(['britannica.com', 'nationalreview.com', 'thecritic.co.uk'].concat(usa_mcc_domains))) {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}

function run_custom(bg2csData, dompurify_loaded) {

// custom/updated sites: load text from json (script[type="application/ld+json"])
if (bg2csData.ld_json && dompurify_loaded) {
  let data = bg2csData.ld_json;
  if (data.includes('|')) {
    window.setTimeout(function () {
      let data_split = data.split('|');
      let paywall_sel = data_split[0];
      let article_sel = data_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      let article = document.querySelector(article_sel);
      // optional
      let article_append = data_split[2];
      let article_hold = data_split[3];
      if (paywall.length && article) {
        removeDOMElement(...paywall);
        let json_script = getArticleJsonScript();
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text.replace(/[\r\n\t]/g, ''));
            let json_key = findKeyJson(json, /^articlebody$/i) || findKeyJson(json, /^text$/i);
            if (json_key) {
              let json_text = parseHtmlEntities(json_key.replace(/(\\r)?\\n/g, '<br>').replace(/\[[^\[]+]/g, ''));
              if (!json_text.match(/\s(src|href)=/))
                json_text = breakText(json_text).replace(/\n\n/g, '<br><br>');
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div style="margin: 25px 0px">' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_append || !article.parentNode) {
                if (!article_hold)
                  article.innerHTML = '';
                article.appendChild(article_new);
              } else if (article.parentNode)
                article.parentNode.replaceChild(article_new, article);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 1000);
  }
}

// custom/updated sites: load text from json (script#__NEXT_DATA__)
if (bg2csData.ld_json_next && dompurify_loaded) {
  let data = bg2csData.ld_json_next;
  if (data.includes('|')) {
    window.setTimeout(function () {
      let data_split = data.split('|');
      let paywall_sel = data_split[0];
      let article_sel = data_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      let article = document.querySelector(article_sel);
      // optional
      let article_append = data_split[2];
      let article_hold = data_split[3];
      if (paywall.length && article) {
        removeDOMElement(...paywall);
        let json_script = document.querySelector('script#__NEXT_DATA__');
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            let query_slug = json.query && json.query.slug;
            if (query_slug && Array.isArray(query_slug))
              query_slug = query_slug.pop();
            let url_next = query_slug || findKeyJson(json, ['slug']);
            if (url_next && (typeof url_next === 'string') && !decodeURIComponent(window.location.pathname).endsWith(decodeURIComponent(url_next)))
              refreshCurrentTab();
            let json_text = findKeyJson(json, ['blocks', 'body', 'BodyPlainText', 'content', 'contentHtml', 'description', 'html'], 500);
            if (typeof json_text === 'string')
              json_text = parseHtmlEntities(json_text);
            else if (Array.isArray(json_text))
              json_text = '<p style="margin: 10px;">' + json_text.map(x => (typeof x === 'string') ? x : (x.children ? x.children.map(y => y.text).join('') : x.text || x.innerHTML)).join('<br><br>') + '</p>';
            if (json_text) {
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_append || !article.parentNode) {
                if (!article_hold)
                  article.innerHTML = '';
                article.appendChild(article_new);
              } else if (article.parentNode)
                article.parentNode.replaceChild(article_new, article);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 1000);
  }
}

// custom/updated sites: load text from json (page source)
if (bg2csData.ld_json_source && dompurify_loaded) {
  let data = bg2csData.ld_json_source;
  if (data.includes('|')) {
    window.setTimeout(function () {
      let data_split = data.split('|');
      let paywall_sel = data_split[0];
      let article_sel = data_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      let article = document.querySelector(article_sel);
      let filter = new RegExp(data_split[2].replace(/\./g, '\\.').replace('=', '\\s?=\\s?'));
      let json_key = data_split[3];
      // optional
      let article_append = data_split[4];
      let article_hold = data_split[5];
      if (paywall.length && article) {
        removeDOMElement(...paywall);
        let json_script = getSourceJsonScript(filter, ':not([src])');
        if (json_script) {
          let script_text = json_script.text.split(filter)[1];
          if (script_text.includes('};'))
            script_text = script_text.split('};')[0] + '}';
          try {
            let json = JSON.parse(script_text);
            if (json) {
              let json_text = parseHtmlEntities(getNestedKeys(json, json_key));
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_append || !article.parentNode) {
                if (!article_hold)
                  article.innerHTML = '';
                article.appendChild(article_new);
              } else if (article.parentNode)
                article.parentNode.replaceChild(article_new, article);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 1000);
  }
}

// custom/updated sites: load text from json (link[rel="alternate"][type="application/json"][href])
if (bg2csData.ld_json_url && dompurify_loaded) {
  let data = bg2csData.ld_json_url;
  if (data.includes('|')) {
    window.setTimeout(function () {
      let data_split = data.split('|');
      let paywall_sel = data_split[0];
      let article_sel = data_split[1];
      // optional
      let article_append = data_split[2];
      let article_hold = data_split[3];
      let article_id_sel = data_split[4];
      let key = data_split[5];
      let url_rest = data_split[6];
      let article_id;
      if (article_id_sel) {
        let article_id_sel_dom = document.querySelector(article_id_sel + '[content]');
        if (article_id_sel_dom)
          article_id = article_id_sel_dom.content;
        else
          return;
      }
      function setMediaSrc(elem) {
        if (elem.getAttribute('data-src'))
          elem.src = elem.getAttribute('data-src');
        else {
          let data_src = [...elem.attributes].find(x => x.name.endsWith('-src'));
          if (data_src)
            elem.src = elem.getAttribute(data_src.name);
        }
      }
      func_post = function () {
        let img_sel = 'img[src^="data:image/"]';
        let hidden_images = document.querySelectorAll('figure ' + img_sel + ', picture ' + img_sel);
        for (let elem of hidden_images)
          setMediaSrc(elem);
        let iframes = document.querySelectorAll('iframe[src="about:blank"]');
        for (let elem of iframes)
          setMediaSrc(elem);
      }
      getJsonUrl(paywall_sel, '', article_sel, {art_append: article_append, art_hold: article_hold, art_style: 'margin: 25px 0px;'}, article_id, key, url_rest);
    }, 1000);
  }
}

// custom/updated sites: load text from archive.is
if (bg2csData.ld_archive_is && dompurify_loaded) {
  let data = bg2csData.ld_archive_is;
  if (data.includes('|')) {
    window.setTimeout(function () {
      let url = window.location.href;
      let data_split = data.split('|');
      let paywall_sel = data_split[0];
      let article_sel = data_split[1];
      // optional
      let article_src_sel = data_split[2] || article_sel;
      let article_link_sel = data_split[3] || article_sel;
      func_post = func_post || function () {
        if (mobile) {
          document.querySelectorAll('figure img[loading="lazy"][style], picture img[loading="lazy"][style]').forEach(e => e.style = 'width: 95%;');
        }
      }
      getArchive(url, paywall_sel, '', article_sel, '', article_src_sel, article_link_sel);
    }, 1000);
  }
}

// custom/updated sites: add link to article
if (bg2csData.add_ext_link) {
  let data = bg2csData.add_ext_link;
  if (data.css && data.css.includes('|') && data.type) {
    window.setTimeout(function () {
      let url = window.location.href;
      let data_split = data.css.split('|');
      let paywall_sel = data_split[0];
      let article_sel = data_split[1];
      let paywall = document.querySelectorAll(paywall_sel);
      if (paywall.length) {
        removeDOMElement(...paywall);
        let article = document.querySelector(article_sel);
        if (article) {
          switch (data.type) {
          case 'archive.is':
            article.firstChild.before(archiveLink(url));
            break;
          case 'google_search_tool':
            article.firstChild.before(googleSearchToolLink(url));
            break;
          }
        }
      }
    }, 1000);
  }
}

// check for opt-in confirmation (from background.js)
if (bg2csData.optin_setcookie) {
  false;
}

if (bg2csData.optin_fetch) {
  bg2csData_fetch = bg2csData.optin_fetch;
}

// custom/updated sites: try to unhide text on amp-page
if (bg2csData.amp_unhide) {
  window.setTimeout(function () {
    let amp_page_hide = document.querySelector('script[src*="/amp-access-"], script[src*="/amp-subscriptions-"]');
    if (amp_page_hide) {
      amp_unhide_subscr_section();
      amp_unhide_access_hide();
      amp_images_replace();
      amp_iframes_replace();
    }
  }, 100);
}

// custom/updated sites: amp-redirect
if (bg2csData.amp_redirect) {
  window.setTimeout(function () {
    let amp_script = document.querySelector('script[src^="https://cdn.ampproject.org/"]');
    let amphtml = document.querySelector('head > link[rel="amphtml"]');
    let amp_page = amp_script && !amphtml;
    if (!amp_page) {
      let data = bg2csData.amp_redirect;
      let data_split = data.split('|');
      let paywall_sel = data_split[0];
      // optional
      let amp_url = data_split[1];
      if (amp_url) {
        if (amp_url.includes('{path}'))
          amp_url = amp_url.replace('{path}', window.location.pathname).replace(/\/\//g, '/');
        if (amp_url.includes('{host}'))
          amp_url = 'https://' + amp_url.replace('{host}', window.location.hostname.replace('www.', ''));
      }
      amp_redirect(paywall_sel, '', amp_url);
    }
  }, 500);
}

function cs_code_elems(elems) {
  for (let elem of elems) {
    if (elem.add_style)
      addStyle(elem.add_style, 6);
    else if (elem.hide_elem)
      hideDOMStyle(elem.hide_elem, 6);
    else if (elem.rm_elem_wait)
      waitDOMElement(elem.rm_elem_wait, elem.rm_elem_wait.match(/^\w+/)[0].toUpperCase(), removeDOMElement, true);
    else if (elem.cond) {
      let first = true;
      let elem_dom = document.querySelectorAll(elem.cond);
      for (let item of elem_dom) {
        if (elem.rm_elem)
          removeDOMElement(item);
        if (elem.rm_class) {
          let rm_class = elem.rm_class.split(/[,|]/).map(x => x.trim());
          item.classList.remove(...rm_class);
        }
        if (elem.rm_attrib) {
          let rm_attribs = elem.rm_attrib.split('|');
          for (let rm_attrib of rm_attribs)
            item.removeAttribute(rm_attrib);
        }
        if (elem.set_attrib && elem.set_attrib.includes('|')) {
          let attrib = elem.set_attrib.split('|')[0];
          let value = elem.set_attrib.split('|')[1];
          item.setAttribute(attrib, value);
        }
        if (first && elem.elems) {
          first = false;
          cs_code_elems(elem.elems);
        }
      }
    }
  }
}

// custom/updated sites: cs_code
if (bg2csData.cs_code) {
  window.setTimeout(function () {
    cs_code_elems(bg2csData.cs_code);
  }, 1000);
}

}// run_custom

var cs_default; // load from cs_local (by background.js)
function run_cs_default(bg2csData = '') {
  for (let n = 0; n < 5; n++) {
    setTimeout(function () {
      clearLocalStorage(bg2csData);
      if (!bg2csData.cs_block && typeof cs_default === 'function')
        cs_default(bg2csData);
    }, n * 200);
  }
}

var msg_once;
var msg_once_ses;
var url_old;
if (ext_api.runtime && ext_api.storage) {
  ext_api.runtime.onMessage.addListener(
    function (request, sender) {
    if (request.msg === 'bg2cs') {
      let bg2csData = request.data;
      if (!(msg_once && (url_old === window.location.href))) {
        msg_once = true;
        url_old = window.location.href;
        if (Object.keys(bg2csData).filter(x => ![('cs_block', 'cs_clear_lclstrg', 'optin_fetch', 'optin_setcookie')].includes(x)).length)
          run_custom(bg2csData, dompurify_loaded);
      }
      run_cs_default(bg2csData);
    } else if (request.msg === 'showExtSrc') {
      if (!(msg_once_ses && url_old === window.location.href)) {
        msg_once_ses = true;
        url_old = window.location.href;
        replaceDomElementExtSrc(request.data.url, request.data.url_src, request.data.html, true, false, request.data.selector, request.data.text_fail, request.data.selector_source, request.data.selector_archive, request.data.blocked);
      }
    } else if (request.msg === 'showExtFetch') {
      let fetch_id = request.data.data_ext_fetch_id;
      if (data_ext_fetch[fetch_id]) {
        data_ext_fetch[fetch_id].func(request.data.url, request.data.html, ...data_ext_fetch[fetch_id].args);
      } else
        refreshCurrentTab(true, false);
    }
  })
} else {
  run_cs_default();
}

// General Functions
function removeDOMElement(...elements) {
  for (let element of elements) {
    if (element)
      element.remove();
  }
}

function hideDOMElement(...elements) {
  for (let element of elements) {
    if (element)
      element.style = 'display:none !important;';
  }
}

function hideDOMStyle(selector, id = 1) {
  let style = document.querySelector('head > style#ext'+ id);
  if (!style && document.head) {
    let sheet = document.createElement('style');
    sheet.id = 'ext' + id;
    sheet.innerText = selector + ' {display: none !important;}';
    document.head.appendChild(sheet);
  }
}

function addStyle(css, id = 1) {
  let style = document.querySelector('head > style#add'+ id);
  if (!style && document.head) {
    let sheet = document.createElement('style');
    sheet.id = 'add' + id;
    sheet.innerText = css;
    document.head.appendChild(sheet);
  }
}

function waitDOMElement(selector, tagName = '', callback, multiple = false) {
  new window.MutationObserver(function (mutations) {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!tagName || (node.tagName === tagName)) {
          if (node.matches(selector)) {
            callback(node);
            if (!multiple)
              this.disconnect();
          }
        }
      }
    }
  }).observe(document, {
    subtree: true,
    childList: true
  });
}

function waitDOMAttribute(selector, tagName = '', attributeName = '', callback, multiple = false) {
  let targetNode = document.querySelector(selector);
  if (!targetNode)
    return;
  new window.MutationObserver(function (mutations) {
    for (let mutation of mutations) {
      if (mutation.target.attributes[attributeName]) {
        callback(mutation.target);
        if (!multiple)
          this.disconnect();
      }
    }
  }).observe(targetNode, {
    attributes: true,
    attributeFilter: [attributeName]
  });
}

function matchDomain(domains, hostname = window.location.hostname) {
  if (typeof domains === 'string')
    domains = [domains];
  return domains.find(domain => hostname === domain || hostname.endsWith('.' + domain)) || false;
}

function urlHost(url) {
  if (/^http/.test(url)) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      console.log(`url not valid: ${url} error: ${e}`);
    }
  }
  return url;
}

function matchUrlDomain(domains, url) {
  return matchDomain(domains, urlHost(url));
}

function makeFigure(url, caption_text, img_attrib = {}, caption_attrib = {}) {
  let elem = document.createElement('figure');
  let img = document.createElement('img');
  img.src = url;
  for (let attrib in img_attrib)
    if (img_attrib[attrib])
      img.setAttribute(attrib, img_attrib[attrib]);
  elem.appendChild(img);
  if (caption_text) {
    let caption = document.createElement('figcaption');
    for (let attrib in caption_attrib)
      if (caption_attrib[attrib])
        caption.setAttribute(attrib, caption_attrib[attrib]);
    let cap_par = document.createElement('p');
    cap_par.innerText = caption_text;
    caption.appendChild(cap_par);
    elem.appendChild(caption);
  }
  return elem;
}

function makeLink(url, title, style = '') {
  let a_link = document.createElement('a');
  a_link.href = url;
  a_link.innerText = title;
  if (style)
    a_link.style = style;
  return a_link;
}

function header_nofix(header, cond_sel = '', msg = 'BPC > no fix', url = '') {
  if (header && typeof header === 'string')
    header = document.querySelector(header);
  if (header && !document.querySelector('div#bpc_nofix')) {
    if (cond_sel) {
      let elem = document.querySelectorAll(cond_sel);
      if (elem.length)
        removeDOMElement(...elem);
      else
        return false;
    }
    let nofix_div = document.createElement('div');
    nofix_div.id = 'bpc_nofix';
    nofix_div.style = 'margin: 20px; font-size: 20px; font-weight: bold; color: red;';
    if (url) {
      let url_link = document.createElement('a');
      url_link.href = url;
      url_link.innerText = msg;
      if (!matchUrlDomain(window.location.hostname, url))
        url_link.target = '_blank';
      nofix_div.appendChild(url_link);
    } else
      nofix_div.innerText = msg;
    header.before(nofix_div);
  }
}

function blockJsReferrer() {
  if (document.head && !document.querySelector('head > meta[name="referrer"][content="no-referrer"]')) {
    var meta = document.createElement('meta');
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.head.appendChild(meta);
  }
}

function clearPaywall(paywall, paywall_action) {
  if (paywall) {
    if (!paywall_action)
      removeDOMElement(...paywall);
    else {
      for (let elem of paywall) {
        if (paywall_action.rm_class)
          elem.classList.remove(paywall_action.rm_class);
        else if (paywall_action.rm_attrib)
          elem.removeAttribute(paywall_action.rm_attrib);
      }
    }
  }
}

function getArchive(url, paywall_sel, paywall_action = '', selector, text_fail = '', selector_source = selector, selector_archive = selector) {
  let url_archive = 'https://' + archiveRandomDomain() + '/' + (url.includes('/#/') ? encodeURIComponent(url.split('?')[0]) : url.split(/[#\?]/)[0]);
  let paywall = document.querySelectorAll(paywall_sel);
  if (paywall.length && dompurify_loaded) {
    clearPaywall(paywall, paywall_action);
    csDoneOnce = true;
    replaceDomElementExt(url_archive, true, false, selector, text_fail, selector_source, selector_archive);
  }
}

function getExtFetch(url, json_key = '', options = {}, callback, data_ext_fetch_id = 0, args = []) {
  data_ext_fetch[data_ext_fetch_id] = {func: callback, args: args};
  ext_api.runtime.sendMessage({request: 'getExtFetch', data: {url: url, json_key: json_key, options: options, data_ext_fetch_id: data_ext_fetch_id}});
}

var selector_level;
function replaceDomElementExt(url, proxy, base64, selector, text_fail = '', selector_source = selector, selector_archive = selector) {
  let article = document.querySelector(selector);
  let archive_match = url.match(/https:\/\/archive\.\w{2}\//);
  if (!article) {
    if (archive_match && document.body)
      document.body.firstChild.before(archiveLink(url));
    return;
  } else if (proxy && !ext_chromium && !bg2csData_fetch) { //fetch consent (Firefox only)
    window.setTimeout(function () {
      header_nofix(article, '', 'BPC > opt-in for consent to fetch site content (by external url-request).\r\nSee options > opt-in (new Mozilla Firefox \'data transmission\' consent requirement).');
      if (archive_match)
        article.before(archiveLink(url));
    }, 1000);
    return;
  }
  if (proxy) {
    selector_level = true;
    if (!text_fail) {
      if (archive_match)
        text_fail = 'BPC > Try for full article text (no need to report issue for external site):\r\n';
      else if (!matchUrlDomain(window.location.hostname, url))
        text_fail = 'BPC > failed to load from external site:\r\n';
    }
    ext_api.runtime.sendMessage({request: 'getExtSrc', data: {url: url, selector: selector, selector_source: selector_source, selector_archive: selector_archive, base64: base64, text_fail: text_fail, headers: fetch_headers}});
  } else {
    fetch(url, {headers: fetch_headers})
    .then(response => {
      let article = document.querySelector(selector);
      if (response.ok) {
        response.text().then(html => {
          replaceDomElementExtSrc(url, '', html, false, base64, selector, text_fail, selector_source);
        });
      } else {
        replaceTextFail(url, article, proxy, text_fail);
      }
    }).catch(function (err) {
      replaceTextFail(url, article, proxy, text_fail);
    });
  }
}

function getSelectorLevel(selector) {
  if (selector.replace(/,\s+/g, ',').match(/[>\s]+/) && !selector.includes(':has(>'))
    selector = selector.replace(/,\s+/g, ',').split(',').map(x => x.match(/[>\s]+/) ? x + ', ' + x.split(/[>\s]+/).pop() : x).join(', ');
  return selector;
}

function replaceDomElementExtSrc(url, url_src, html, proxy, base64, selector, text_fail = '', selector_source = selector, selector_archive = selector, blocked = false) {
  let article = document.querySelector(selector);
  let article_link = document.querySelector(selector_archive);
  let no_content_msg = ' ~ no article content found! :';
  if (html) {
    if (!proxy && base64) {
      html = decode_utf8(atob(html));
      selector_source = 'body';
    }
    let parser = new DOMParser();
    window.setTimeout(function () {
      if (url.startsWith('https://archive.') && url_src) {
        let domain_archive = url.match(/^https:\/\/(archive\.\w{2})/)[1];
        let pathname = new URL(url_src).pathname;
        html = html.replace(new RegExp('https:\\/\\/' + domain_archive.replace('.', '\\.') + '\\/o\\/\\w+\\/', 'g'), '').replace(new RegExp("(src=\"|background-image:url\\(')" + pathname.replace('/', '\\/'), 'g'), "$1" + 'https://' + domain_archive + pathname);
      }
      let doc = parser.parseFromString(DOMPurify.sanitize(html, dompurify_options), 'text/html');
      //console.log(DOMPurify.removed);
      if (selector_level)
        selector_source = getSelectorLevel(selector_source);
      let article_new = doc.querySelector(selector_source);
      if (article_new) {
        article_new.querySelectorAll('img[src][currentsourceurl]').forEach(e => e.src = e.getAttribute('currentsourceurl'));
        if (article && article.parentNode) {
          if (url.startsWith('https://archive.')) {
            let arch_dom = (selector_archive !== selector) ? (article_new.querySelector(selector_archive) || document.querySelector(selector_archive)) : article_new;
            if (arch_dom) {
              if (arch_dom.firstChild)
                arch_dom = arch_dom.firstChild;
              let arch_div = document.createElement('div');
              arch_div.appendChild(archiveLink_renew(url_src));
              arch_div.appendChild(archiveLink(window.location.href.split(/[#\?]/)[0], 'BPC > Full article text fetched from (no need to report issue for external site):\r\n'));
              arch_div.style = 'margin: 0px 0px 50px;';
              arch_dom.before(arch_div);
            }
            let targets = article_new.querySelectorAll('a[target="_blank"][href^="' + window.location.origin + '"]');
            for (let elem of targets)
              elem.removeAttribute('target');
            let invalid_links = article_new.querySelectorAll('link[rel*="preload"]:not([href])');
            removeDOMElement(...invalid_links);
          }
          window.setTimeout(function () {
            if (article.parentNode) {
              article.parentNode.replaceChild(article_new, article);
              if (func_post)
                func_post();
            }
          }, 200);
        }
      } else
        replaceTextFail(url, article_link, proxy, text_fail.replace(':', no_content_msg));
    }, 200);
  } else {
    replaceTextFail(url, article_link, proxy, url_src ? text_fail.replace(':', no_content_msg) : (blocked ? text_fail.replace(':', ' ~ fetch blocked! :') : text_fail));
  }
}

function replaceTextFail(url, article, proxy, text_fail) {
  if (text_fail && article) {
    let text_fail_div = document.createElement('div');
    text_fail_div.id = 'bpc_fail';
    text_fail_div.setAttribute('style', 'margin: 0px 50px; font-weight: bold; color: red;');
    text_fail_div.appendChild(document.createTextNode(text_fail));
    if (proxy) {
      if (url.startsWith('https://archive.')) {
        text_fail_div = archiveLink(url.replace(/^https:\/\/archive\.\w{2}\//, ''), text_fail);
      } else {
        let a_link = document.createElement('a');
        a_link.innerText = url;
        a_link.href = url;
        a_link.target = '_blank';
        text_fail_div.appendChild(a_link);
      }
    }
    if (article.firstChild)
      article.firstChild.before(text_fail_div);
    else
      article.appendChild(text_fail_div);
  }
}

function amp_images_replace() {
  window.setTimeout(function () {
    let amp_images = document.querySelectorAll('figure amp-img[src^="http"]');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      elem.src = amp_image.getAttribute('src');
      elem.alt = amp_image.getAttribute('alt');
      elem.style = 'width: 100%;';
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
  }, 1000);
}

function amp_iframes_replace(weblink = false, source = '') {
  let amp_iframes = document.querySelectorAll('amp-iframe' + (source ? '[src*="' + source + '"]' : ''));
  let par, elem;
  for (let amp_iframe of amp_iframes) {
    if (!weblink) {
      if (amp_iframe.offsetHeight > 10) {
        elem = document.createElement('iframe');
        elem.src = amp_iframe.getAttribute('src').replace(/^http:/, 'https:');
        elem.style = 'height: ' + amp_iframe.offsetHeight + 'px; width: 100%; border: 0px;';
        if (amp_iframe.getAttribute('sandbox'))
          elem.sandbox = amp_iframe.getAttribute('sandbox');
        amp_iframe.parentNode.replaceChild(elem, amp_iframe);
      }
    } else {
      par = document.createElement('p');
      par.style = 'margin: 20px 0px;';
      elem = document.createElement('a');
      elem.innerText = 'Media-link';
      elem.setAttribute('href', amp_iframe.getAttribute('src'));
      elem.setAttribute('target', '_blank');
      par.appendChild(elem);
      amp_iframe.parentNode.replaceChild(par, amp_iframe);
    }
  }
}

function amp_redirect_not_loop(amphtml) {
  if (!check_loop()) {
    window.location.href = amphtml.href;
  } else {
    let header = (document.body && document.body.firstChild) || document.documentElement;
    header_nofix(header, '', 'BPC > redirect to amp failed (disable amp-to-html extension/add-on or browser setting)');
  }
}

function amp_redirect(paywall_sel, paywall_action = '', amp_url = '') {
  let paywall = document.querySelectorAll(paywall_sel);
  let amphtml = document.querySelector('head > link[rel="amphtml"]');
  if (!amphtml && amp_url)
    amphtml = {href: amp_url};
  if (paywall.length && amphtml) {
    clearPaywall(paywall, paywall_action);
    amp_redirect_not_loop(amphtml);
  }
}

function amp_unhide_subscr_section(amp_ads_sel = '', replace_iframes = true, amp_iframe_link = false, source = '') {
  let preview = document.querySelectorAll('[subscriptions-section="content-not-granted"]');
  removeDOMElement(...preview);
  let subscr_section = document.querySelectorAll('[subscriptions-section="content"]');
  for (let elem of subscr_section)
    elem.removeAttribute('subscriptions-section');
  if (amp_ads_sel)
    hideDOMStyle(amp_ads_sel, 5);
  if (replace_iframes)
    amp_iframes_replace(amp_iframe_link, source);
}

function amp_unhide_access_hide(amp_access = '', amp_access_not = '', amp_ads_sel = '', replace_iframes = true, amp_iframe_link = false, source = '') {
  let access_hide = document.querySelectorAll('[amp-access' + amp_access + '][amp-access-hide]:not([amp-access="error"], [amp-access^="message"], .piano)');
  for (let elem of access_hide)
    elem.removeAttribute('amp-access-hide');
  if (amp_access_not) {
    let amp_access_not_dom = document.querySelectorAll('[amp-access' + amp_access_not + ']');
    removeDOMElement(...amp_access_not_dom);
  }
  if (amp_ads_sel)
    hideDOMStyle(amp_ads_sel, 6);
  if (replace_iframes)
    amp_iframes_replace(amp_iframe_link, source);
}

function ampToHtml() {
  window.setTimeout(function () {
    let canonical = document.querySelector('head > link[rel="canonical"][href]');
    if (canonical)
      window.location.href = canonical.href;
  }, 1000);
}

function check_loop(interval = 2000) {
  let loop = true;
  let loop_date = Number(sessionStorage.getItem('###_loop'));
  if (!(loop_date && (Date.now() - loop_date < interval))) {
    sessionStorage.setItem('###_loop', Date.now());
    loop = false;
  }
  return loop;
}

function refreshCurrentTab(not_loop = true, not_loop_msg = true) {
  if (!not_loop || !check_loop(5000)) {
    window.setTimeout(function () {
      window.location.reload(true);
    }, 500);
  } else if (not_loop_msg) {
    let header = (document.body && document.body.firstChild) || document.documentElement;
    header_nofix(header, '', 'BPC > refresh loop stopped');
  }
}

function refreshCurrentTab_bg() {
  ext_api.runtime.sendMessage({request: 'refreshCurrentTab'});
}

function archiveRandomDomain() {
  let tld_array = ['fo', 'is', 'li', 'md', 'ph', 'vn'];
  let tld = tld_array[randomInt(6)];
  return 'archive.' + tld;
}

function archiveLink(url, text_fail = 'BPC > Try for full article text (no need to report issue for external site):\r\n') {
  return externalLink(['archive.today', archiveRandomDomain()], 'https://{domain}?run=1&url={url}', url, text_fail);
}

function archiveLink_renew(url, text_fail = 'BPC > Only use to renew if text is incomplete or updated:\r\n') {
  return externalLink([new URL(url).hostname], '{url}/again?url=' + window.location.href.split(/[#\?]/)[0], url, text_fail);
}

function googleSearchToolLink(url, text_fail = 'BPC > Try for full article text (test url & copy html (tab) code to [https://codebeautify.org/htmlviewer]):\r\n') {
  return externalLink(['search.google.com'], 'https://search.google.com/test/rich-results?url={url}', encodeURIComponent(url), text_fail);
}

function freediumLink(url, text_fail = 'BPC > Try for full article text:\r\n') {
  return externalLink(['freedium.cfd'], 'https://{domain}/{url}', url, text_fail);
}

function readMediumLink(url, text_fail = 'BPC > Try for full article text:\r\n') {
  return externalLink(['readmedium.com'], 'https://{domain}/{url}', url, text_fail);
}

function externalLink(domains, ext_url_templ, url, text_fail = 'BPC > Full article text:\r\n') {
  let text_fail_div = document.createElement('div');
  text_fail_div.id = 'bpc_archive';
  text_fail_div.setAttribute('style', 'margin: 20px; font-size: 20px; font-weight: bold; color: red; line-height: normal;');
  let parser = new DOMParser();
  text_fail = text_fail.replace(/\[(?<url>[^\]]+)\]/g, function (match, url) {
    return "<a href='" + url + "' target='_blank' style='color: red'>" + new URL(url).hostname + "</a>";
  });
  let doc = parser.parseFromString('<span>' + text_fail + '</span>', 'text/html');
  let elem = doc.querySelector('span');
  text_fail_div.appendChild(elem);
  for (let domain of domains) {
    let ext_url = ext_url_templ.replace('{domain}', domain).replace('{url}', url.split('?')[0]);
    let a_link = document.createElement('a');
    a_link.innerText = domain;
    a_link.href = ext_url;
    a_link.target = '_blank';
    text_fail_div.appendChild(document.createTextNode(' | '));
    text_fail_div.appendChild(a_link);
  }
  return text_fail_div;
}

function removeClassesByPrefix(el, prefix) {
  let el_classes = el.classList;
  for (let el_class of el_classes) {
    if (el_class.startsWith(prefix))
      el_classes.remove(el_class);
  }
}

function removeClassesList(list) {
  for (let class_item of list) {
    let elems = document.querySelectorAll('.' + class_item);
    for (let elem of elems)
      elem.classList.remove(class_item);
  }
}

function cookieExists(name) {
  return document.cookie.split(';').some(function (item) {
    return item.trim().indexOf(name + '=') === 0
  })
}

function setCookie(name, value, domain, path, days) {
  let max_age = days * 24 * 60 * 60;
  document.cookie = name + "=" + (value || "") + "; domain=" + domain + "; path=" + path + "; max-age=" + max_age;
}

function insert_script(func, insertAfterDom) {
  let bpc_script = document.querySelector('script#bpc_script');
  if (!bpc_script) {
    let script = document.createElement('script');
    script.setAttribute('id', 'bpc_script');
    script.appendChild(document.createTextNode('(' + func + ')();'));
    let insertAfter = insertAfterDom ? insertAfterDom : (document.body || document.head || document.documentElement);
    insertAfter.appendChild(script);
  }
}

function getSourceJsonScript(filter, attributes = ':not([src], [type])') {
  if (typeof filter === 'string')
    filter = new RegExp(filter);
  let scripts = document.querySelectorAll('script' + attributes);
  for (let script of scripts) {
    if (script.text.match(filter))
      return script;
  }
  return false;
}

function getArticleJsonScript() {
  let scripts = document.querySelectorAll('script[type="application/ld+json"]');
  let json_script;
  for (let script of scripts) {
    if (script.innerText.match(/"(articlebody|text)":/i)) {
      json_script = script;
      break;
    }
  }
  return json_script;
}

function restorePugpigLink(node, art_link_sel = '') {
  let art_link = !art_link_sel ? node : node.querySelector(art_link_sel);
  if (art_link)
    art_link.onmousedown = x => window.location.href = art_link.href;
}

function restorePugpigPage() {
  let art_link_sel = 'a.pp-widget-article, a.pp-related__link';
  window.setTimeout(function () {
    document.querySelectorAll(art_link_sel).forEach(e => restorePugpigLink(e));
  }, 2000);
  waitDOMElement(art_link_sel, 'A', restorePugpigLink, true);
  waitDOMElement('li[class^="collection_type-"]', 'LI', node => restorePugpigLink(node, art_link_sel), true);
  csDoneOnce = true;
  let modal = '.modal:is(section, div), div.modal__overlay';
  hideDOMStyle(modal);
  let audio_tts = document.querySelector('audio.pp-audio__player');
  if (audio_tts)
    audio_tts.style = 'display: block !important;';
  let paywall_sel = 'div.paywall';
  let paywall = document.querySelector(paywall_sel);
  if (paywall)
    refreshCurrentTab();
  hideDOMStyle(paywall_sel + ', div.drawer__overlay', 2);
  if (window.location.pathname.endsWith('/content.html') && window.top === window.self) {
    let header = document.querySelector('div#home');
    if (!header) {
      let article = document.querySelector('div.pp-container');
      if (article) {
        let header_new = document.createElement('div');
        header_new.id = 'home';
        header_new.style = 'font-size: 20px; font-weight: bold; text-align: center; margin: 20px;';
        let main = document.createElement('a');
        let hostname = window.location.hostname;
        main.href = 'https://' + hostname;
        main.innerText = hostname.toUpperCase();
        header_new.appendChild(main);
        article.before(header_new);
      }
    }
  }
}

function getArticleQuintype() {
  let article_new;
  let json_script = document.querySelector('script#static-page');
  if (json_script) {
    try {
      article_new = document.createElement('div');
      let parser = new DOMParser();
      let json = JSON.parse(json_script.text);
      let slug = decodeURIComponent(json.qt.data.story.slug);
      if (slug && !decodeURIComponent(window.location.pathname).includes(slug))
        refreshCurrentTab_bg();
      let pars = json.qt.data.story.cards;
      for (let par of pars) {
        let story_elements = par['story-elements'];
        for (let elem of story_elements) {
          let par_elem;
          if (['text', 'title'].includes(elem.type) && elem.text) {
            let doc = parser.parseFromString('<div style="margin: 25px 0px">' + DOMPurify.sanitize(elem.text, dompurify_options) + '</div>', 'text/html');
            par_elem = doc.querySelector('div');
          } else if (elem.type === 'image') {
            if (elem['image-s3-key']) {
              par_elem = document.createElement('figure');
              let img = document.createElement('img');
              img.src = 'https://media.assettype.com/' + elem['image-s3-key'];
              par_elem.appendChild(img);
              if (elem.title) {
                let caption = document.createElement('figcaption');
                if (elem.title.includes('</')) {
                  let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(elem.title, dompurify_options) + '</div>', 'text/html');
                  caption.appendChild(doc.querySelector('div'));
                } else
                  caption.innerText = elem.title;
                par_elem.appendChild(caption);
              }
            }
          } else if (elem.type === 'jsembed') {
            if (elem.subtype === 'tweet') {
              if (elem.metadata && elem.metadata['tweet-url']) {
                par_elem = document.createElement('a');
                par_elem.href = par_elem.innerText = elem.metadata['tweet-url'];
                par_elem.target = '_blank';
              } else
                console.log(elem);
            }
          } else if (elem.type === 'youtube-video') {
            if (elem['embed-url']) {
              par_elem = document.createElement('iframe');
              par_elem.src = elem['embed-url'];
              par_elem.style = 'width: 100%; height: 400px;';
            }
          } else if (elem.type === 'file') {
            if (elem.url && elem['file-name']) {
              par_elem = document.createElement('a');
              par_elem.href = elem.url;
              par_elem.innerText = elem['file-name'];
              par_elem.target = '_blank';
            }
          } else if (!['widget'].includes(elem.type))
            console.log(elem);
          if (par_elem)
            article_new.appendChild(par_elem);
        }
      }
      if (!article_new.hasChildNodes())
        article_new = '';
    } catch (err) {
      console.log(err);
    }
  }
  return article_new;
}

function mediafin_init_auth() {
  localStorage.setItem('###_auth_date', '');
  localStorage.setItem('###_auth_token', '');
}

function mediafin_reset_auth(article = '') {
  mediafin_init_auth();
  mediafin_get_auth();
  if (article)
    header_nofix(article, '', 'BPC > no data yet (refresh page)');
}

function mediafin_get_auth() {
  let now_date = (new Date()).toISOString().split('T')[0];
  let ls_date = localStorage.getItem('###_auth_date') || '';
  let ls_token;
  if (ls_date && ls_date === now_date) {
    ls_token = localStorage.getItem('###_auth_token') || '';
  } else {
    let url_auth = 'https://api.mediafin.be/oktaproxy/oauth/token';
    getExtFetch(url_auth, '', {method: "POST", headers: {"Content-Type": "application/json"}, body: cs_param.request_body || atob('eyJjbGllbnRfaWQiOiJRZFZzVjdLZXJDWlhBSDNoNklJYXhVUXFsc2tLWldMaiIsImNsaWVudF9zZWNyZXQiOiJlaHJqQWpHMWtKdWFFekx3eUl5bHk3QmpQNFhCei1ZUk96akpRbzJYREhld19FT1ZBMmE5XzY2bzJsTGotMngtIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsImF1ZGllbmNlIjoiaHR0cHM6Ly9hdXRoLm1lZGlhZmluLmJlLyJ9')}, auth_mediafin);
    function auth_mediafin(url, data) {
      try {
        if (data) {
          mediafin_init_auth();
          let json = JSON.parse(data);
          if (json && json.token_type && json.access_token) {
            localStorage.setItem('###_auth_date', now_date);
            localStorage.setItem('###_auth_token', json.token_type + ' ' + json.access_token);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    return '';
  }
  return ls_token;
}

function mediafin_main(url, data, article) {
  try {
    if (data) {
      let json = JSON.parse(data);
      if (json && json.content && json.content.paragraphs) {
        let embedded = json.embedded;
        if (embedded && embedded.images && embedded.images[0] && embedded.images[0].aspectRatios['16/9']) {
          let img_item = embedded.images[0];
          let img_ratio = img_item.aspectRatios['16/9'].pop();
          if (img_ratio && img_ratio.url) {
            let lead_img = makeFigure(img_ratio.url, (img_item.caption || '') + (img_item.credit ? ' ©' + img_item.credit : ''), {style: 'width: 100%;'}, {style: 'margin: 10px;'});
            article.appendChild(lead_img);
          }
        }
        let parser = new DOMParser();
        let pars = json.content.paragraphs;
        for (let par of pars) {
          let elem;
          if (par.type === 'text') {
            let doc = parser.parseFromString(DOMPurify.sanitize(par.content.replace(/\[\[urn:issue:\d+\]\]/g, ''), dompurify_options), 'text/html');
            let elem_type_match = par.content.match(/^<(\w+)/);
            if (elem_type_match) {
              let elem_type = elem_type_match[1];
              elem = doc.querySelector(elem_type);
            }
          } else if (par.type === 'heading') {
            let sub_type = par.subType || 'h2';
            elem = document.createElement(sub_type);
            elem.innerText = par.content;
          } else if (par.type === 'image') {
            if (par.urn && par.aspectRatio && embedded && embedded.images) {
              let img_item = embedded.images.find(x => x.urn === par.urn && x.aspectRatios && x.aspectRatios[par.aspectRatio]);
              if (img_item) {
                let img_ratio = img_item.aspectRatios[par.aspectRatio].pop();
                if (img_ratio && img_ratio.url)
                  elem = makeFigure(img_ratio.url, (img_item.caption || '') + (img_item.credit ? ' ©' + img_item.credit : ''), {style: 'width: 100%;'}, {style: 'margin: 10px;'});
              }
            }
          } else if (par.type === 'inlineStory') {
            if (par.urn && embedded && embedded.inlinestories) {
              let story = embedded.inlinestories.find(x => x.urn === par.urn && x.callToAction && x.callToAction.url);
              if (story) {
                elem = document.createElement('div');
                elem.style = 'font-weight: bold; margin: 20px 0px;';
                let span = document.createElement('span');
                span.innerText = story.callToAction.label + ': ';
                let a_link = document.createElement('a');
                a_link.href = a_link.innerText = story.callToAction.url;
                a_link.target = '_blank';
                elem.append(span, a_link);
              }
            }
          } else if (par.type === 'relatedArticles') {
            if (par.urn && embedded && embedded.relatedArticles) {
              let articles = embedded.relatedArticles.find(x => x.urn === par.urn && x.articles && x.articles.length);
              if (articles) {
                elem = document.createElement('div');
                elem.style = 'margin: 10px 0px';
                let intro = document.createElement('h2');
                intro.innerText = matchDomain('lecho.be') ? 'Sur ce sujet' : 'LEES MEER';
                elem.appendChild(intro);
                for (let art of articles.articles) {
                  if (art.content && art.content.main && art.content.main.title && art.paths && art.paths[0] && art.paths[0].path) {
                    let a_par = document.createElement('div');
                    a_par.style = 'font-weight: bold; margin: 10px 0px;';
                    let a_link = document.createElement('a');
                    a_link.href = art.paths[0].path;
                    a_link.innerText = art.content.main.title;
                    a_link.target = '_blank';
                    a_par.appendChild(a_link);
                    elem.appendChild(a_par);
                  }
                }
              }
            }
          } else if (!['advertisement', 'applicationHook', 'citation', 'html', 'insetbox', 'numbercitation', 'tweet'].includes(par.type))
            console.log(par);
          if (elem)
            article.appendChild(elem);
        }
      } else
        mediafin_reset_auth(article);
    } else
      mediafin_reset_auth(article);
  } catch (err) {
    console.log(err);
  }
}

function filterObject(obj, filterFn, mapFn = function (val, key) {
  return [key, val];
}) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => filterFn(val, key)).map(([key, val]) => mapFn(val, key)));
}

function matchKeyJson(key, keys) {
  let match = false;
  if (typeof keys === 'string')
    match = (key === keys);
  else if (Array.isArray(keys))
    match = keys.includes(key);
  else if (keys instanceof RegExp)
    match = keys.test(key);
  return match;
}

function findKeyJson(json, keys, min_val_len = 0) {
  let source = '';
  if (Array.isArray(json)) {
    for (let elem of json)
      source = source || findKeyJson(elem, keys, min_val_len);
  } else if (typeof json === 'object') {
    for (let elem in json) {
      let json_elem = json[elem];
      if (typeof json_elem === 'string' && matchKeyJson(elem, keys)) {
        if (json_elem.length > min_val_len)
          return json_elem;
      } else if (Array.isArray(json_elem) && json_elem.length > 1 && matchKeyJson(elem, keys)) {
        return json_elem;
      } else
        source = source || findKeyJson(json_elem, keys, min_val_len);
    }
  }
  return source;
}

function getNestedKeys(obj, key) {
  if (key in obj)
    return obj[key];
  let keys = key.split('.');
  let value = obj;
  for (let i = 0; i < keys.length; i++) {
    value = value[keys[i]];
    if (value === undefined)
      break;
  }
  return value;
}

function getJsonUrlText(article, callback, article_id = '', key = '', url_rest = false, url_slash = false) {
  let json_url_dom = document.querySelector('head > link[rel="alternate"][type="application/json"][href]');
  let json_url;
  if (json_url_dom) {
    json_url = json_url_dom.href;
    let hostname = window.location.hostname;
    let regex = /www\.autohebdo(f1)?\.\w{2,3}/;
    if (json_url.match(regex) && !json_url.includes(hostname))
      json_url = json_url.replace(regex, hostname);
  }
  if (!json_url && article_id)
    json_url = window.location.origin + '/wp-json/wp/v2/posts/' + article_id;
  if (url_rest)
    json_url = json_url.replace('/wp-json/', '/?rest_route=/');
  else if (url_slash)
    json_url = json_url.replace('/wp-json/', '//wp-json/');
  if (json_url) {
    fetch(json_url)
    .then(response => {
      if (response.ok) {
        response.text().then(html => {
          try {
            let json = JSON.parse(html.replace(/<script>[\S\s]+<\/script>/g, ''));
            let json_text = parseHtmlEntities(!key ? json.content.rendered : getNestedKeys(json, key));
            if (json_text && json_text !== 'undefined')
              callback(json_text, article);
          } catch (err) {
            console.log(err);
          }
        });
      }
    });
  }
}

function getJsonUrlAdd(json_text, article, art_options = {}) {
  let art_type = 'div';
  let art_attrib = '';
  if (Object.keys(art_options).length) {
    if (art_options.art_type)
      art_type = art_options.art_type;
    if (art_options.art_class)
      art_attrib += ' class="' + art_options.art_class + '"';
    if (art_options.art_id)
      art_attrib += ' id="' + art_options.art_id + '"';
    if (art_options.art_style)
      art_attrib += ' style="' + art_options.art_style + '"';
    if (art_options.func_text)
      json_text = art_options.func_text(json_text);
  }
  let parser = new DOMParser();
  let doc = parser.parseFromString('<' + art_type + art_attrib + '>' + DOMPurify.sanitize(json_text, dompurify_options) + '</' + art_type + '>', 'text/html');
  let article_new = doc.querySelector(art_type);
  article_new.querySelectorAll('iframe[allow*="picture-in-picture clipboard-write;"]').forEach(e => e.setAttribute('allow', e.getAttribute('allow').replace(/[\w-]+ clipboard-write;/g, '')));
  if (art_options.art_append || !article.parentNode) {
    if (!art_options.art_hold)
      article.innerHTML = '';
    article.appendChild(article_new);
  } else
    article.parentNode.replaceChild(article_new, article);
  if (func_post)
    func_post();
}

function getJsonUrl(paywall_sel, paywall_action = '', article_sel, art_options = {}, article_id = '', key = '', url_rest = false, url_slash = false) {
  let paywall = document.querySelectorAll(paywall_sel);
  let article = document.querySelector(article_sel);
  if (paywall.length && article && dompurify_loaded) {
    clearPaywall(paywall, paywall_action);
    getJsonUrlText(article, (json_text, article) => {
      if (json_text && article)
        getJsonUrlAdd(json_text, article, art_options);
    }, article_id, key, url_rest, url_slash);
  }
}

function genHexString(len) {
  let output = '';
  for (let i = 0; i < len; i++)
    output += (Math.floor(Math.random() * 16)).toString(16);
  return output;
}

function makeRandomNumber(len) {
  let result = '';
  let characters = '123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < len; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomIP(range_low = 0, range_high = 223) {
  let rndmIP = [];
  for (let n = 0; n < 4; n++) {
    if (n === 0)
      rndmIP.push(range_low + randomInt(range_high - range_low + 1));
    else
      rndmIP.push(randomInt(255) + 1);
  }
  return rndmIP.join('.');
}

function pageContains(selector, text) {
  let elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function findOverlap(a, b) {
  if (b.length === 0)
    return "";
  if (a.endsWith(b))
    return b;
  return findOverlap(a, b.substring(0, b.length - 1));
}

function breakText(str, headers = false) {
  str = str.replace(/(?:^|[A-Za-z\"\“\”\)])(\.+|\?|!)(?=[A-ZÖÜ\„\”\d][A-Za-zÀ-ÿ\„\d]{1,})/gm, "$&\n\n");
  if (headers)
    str = str.replace(/(([a-z]{2,}|[\"\“]))(?=[A-Z](?=[A-Za-zÀ-ÿ]+))/gm, "$&\n\n");
  return str;
}

function parseHtmlEntities(encodedString) {
  let parser = new DOMParser();
  let doc = parser.parseFromString('<textarea>' + encodedString + '</textarea>', 'text/html');
  let dom = doc.querySelector('textarea');
  return dom.value;
}

function encode_utf8(str) {
  return unescape(encodeURIComponent(str));
}

function decode_utf8(str) {
  return decodeURIComponent(escape(str));
}

function ads_hide() {
  var overlay = document.querySelector('body.didomi-popup-open');
  if (overlay)
    overlay.classList.remove('didomi-popup-open');
  var ads = 'div.OUTBRAIN, div[id^="taboola-" i], div.ad-container, div[class*="-ad-container"], div[class*="_ad-container"], div.arc_ad, div[id^="poool-"]:empty, amp-ad, amp-embed[type="mgid"], amp-embed[type="outbrain"], amp-embed[type="taboola"]';
  hideDOMStyle(ads, 10);
  addStyle('@media print {div[id^="bpc_"] {visibility: hidden; margin: 0px;}}', 10);
}

function leaky_paywall_unhide() {
  if (document.querySelector('head > link[href*="/leaky-paywall"], script[src*="/leaky-paywall"], div[id^="issuem-leaky-paywall-"]')) {
    let js_cookie = document.querySelector('script#leaky_paywall_cookie_js-js-extra');
    if (js_cookie && js_cookie.text.includes('"post_container":"')) {
      let post_sel = js_cookie.text.split('"post_container":"')[1].split('"')[0];
      if (post_sel) {
        let post = document.querySelector(post_sel);
        if (post)
          post.removeAttribute('class');
      }
    }
  }
}
