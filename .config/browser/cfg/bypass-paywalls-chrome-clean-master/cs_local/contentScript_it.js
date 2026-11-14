//"use strict";

var it_ilmessaggero_domains = ['corriereadriatico.it', 'ilgazzettino.it', 'ilmattino.it', 'ilmessaggero.it', 'quotidianodipuglia.it'];
var it_gedi_domains = ['italian.tech', 'lastampa.it', 'lescienze.it', 'repubblica.it'];
var it_quotidiano_domains = ['ilgiorno.it', 'ilrestodelcarlino.it', 'iltelegrafolivorno.it', 'lanazione.it', 'quotidiano.net'];

cs_default = function (bg2csData = '') {

if (bg2csData && bg2csData.cs_param)
  cs_param = bg2csData.cs_param;

if (!(csDone || csDoneOnce)) {

if (matchDomain('corriere.it')) {
  if (window.location.pathname.endsWith('_amp.shtml')) {
    amp_unhide_subscr_section('iframe[src^="https://ads."]');
  } else {
    if (window.location.pathname.includes('_preview.shtml') && !window.location.pathname.startsWith('/podcast/')) {
      window.setTimeout(function () {
        window.location.href = window.location.pathname.replace('_preview.shtml', '.shtml');
      }, 500);
    }
  }
  let ads = 'div.bck-adv, div.boxADVmanuale';
  hideDOMStyle(ads);
}

else if (matchDomain('corrieredellosport.it')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    amp_redirect('div[class^="MainTextTruncated_paragraph__"]');
    let ads = 'div[class^="AdUnit_placeholder"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('eastwest.eu')) {
  let paywall = document.querySelector('.paywall');
  if (paywall) {
    paywall.removeAttribute('style');
    paywall.classList.remove('paywall');
    let intro = document.querySelectorAll('div#testo_articolo > p, div#testo_articolo > h3');
    let offerta = document.querySelectorAll('div.offerta_abbonamenti');
    removeDOMElement(...intro, ...offerta);
  }
}

else if (matchDomain('editorialedomani.it')) {
  let paywall = document.querySelector('div.paywallbox');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article-preview');
    if (article) {
      article.classList.remove('article-faded');
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          let par = article.querySelector('p');
          if (par)
            par.innerText = json_text;
        }
      }
    }
  }
}

else if (matchDomain('gazzetta.it')) {
  if (window.location.pathname.endsWith('_preview.shtml')) {
    let paywall = document.querySelector('section.bck-freemium__wall');
    if (paywall) {
      removeDOMElement(paywall);
      if (!window.location.search.startsWith('?reason=unauthenticated')) {
        window.location.href = window.location.pathname.replace('_preview', '') + '?gaa_at=g';
      } else {
        let json_script = getArticleJsonScript();
        let header = 'div.content > h2';
        if (json_script) {
          let json = JSON.parse(json_script.text);
          if (json) {
            let json_text = json.articleBody.replace(/(\s{3}|&nbsp;)/g, '\r\n\r\n');
            let content = document.querySelector('div.content > p.has-first-letter');
            if (json_text && content) {
              let content_new = document.createElement('p');
              content_new.innerText = json_text;
              content.parentNode.replaceChild(content_new, content);
              let article_body = document.querySelector('section.body-article');
              if (article_body)
                article_body.style = 'height: auto;';
            } else
              header_nofix(header);
          }
        } else
          header_nofix(header);
      }
    }
  } else if (window.location.pathname.endsWith('_amp.shtml'))
    ampToHtml();
}

else if (matchDomain('ilfattoquotidiano.it')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section('div#_4sVideoContainer, div#post-consent-ui');
    let logo = document.querySelector('a > amp-img[src$="/svg/logo-tablet.svg"]');
    if (logo) {
      let logo_new = document.createElement('img');
      logo_new.src = logo.getAttribute('src').replace('/svg/logo-tablet.svg', '/fq-www/logo-ifq-it.svg');
      logo_new.height = logo.getAttribute('height');
      logo_new.width = logo.getAttribute('width');
      logo.parentNode.replaceChild(logo_new, logo);
    }
  } else {
    let paywall = document.querySelector('div#ifq-paywall-metered');
    if (paywall) {
      removeDOMElement(paywall);
      let art_hidden = document.querySelector('article[id].cropped');
      if (art_hidden)
        art_hidden.classList.remove('cropped');
    } else
      header_nofix('div.ifq-post__content, div.article-content', 'div#ifq-paywall-hard, section.fqml-paywall');
  }
  let ads = 'div.adv, div.st-adunit, div[id^="ifq-adv-"], div.mgbox';
  hideDOMStyle(ads);
  let ad_units = document.querySelectorAll('div[id^="div-flx-"] > div[data-adunit]');
  for (let elem of ad_units)
    hideDOMElement(elem.parentNode);
}

else if (matchDomain('ilfoglio.it')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let div_hidden = document.querySelector('div.paywall-wrapper__story-content');
    if (div_hidden)
      div_hidden.removeAttribute('class');
  }
  let ads = '.advertisement';
  hideDOMStyle(ads);
}

else if (matchDomain('ilmanifesto.it')) {
  let paywall = document.querySelector('div[class*="before:bg-gradient-to-t"]');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let url = window.location.href;
    replaceDomElementExt(url, false, false, 'article div.prose');
  }
}

else if (matchDomain('ilsole24ore.com')) {
  header_nofix('div.paywalltext', 'div.lock');
  waitDOMAttribute('body', 'BODY', 'style', node => node.removeAttribute('style'), true);
  csDoneOnce = true;
  let ads = 'div.background-adv, div.abox, div.ob-smartfeed-wrapper, div.s24_adb';
  hideDOMStyle(ads);
}

else if (matchDomain(['iltirreno.it', 'lanuovasardegna.it']) || matchDomain(['gazzettadimodena.it', 'gazzettadireggio.it', 'lanuovaferrara.it'])) {
  if (window.location.pathname.includes('/news/')) {
    let paywall = document.querySelector('span > img[alt*="Paywall"]');
    if (paywall) {
      let header = paywall.parentNode.parentNode;
      header_nofix(header);
      removeDOMElement(paywall.parentNode);
    }
    window.setTimeout(function () {
      let banners = document.querySelectorAll('div.MuiSnackbar-root, div.css-16cchgy');
      removeDOMElement(...banners);
    }, 1000);
  }
}

else if (matchDomain(it_ilmessaggero_domains)) {
  if (window.location.pathname.toLowerCase().includes('/amp/')) {
    amp_unhide_subscr_section();
  } else {
    let noscroll = document.querySelector('html[style]');
    if (noscroll)
      noscroll.removeAttribute('style');
    let ads = 'div.adv_banner, div.inread_adv, div#outbrain';
    hideDOMStyle(ads);
  }
}

else if (matchDomain(it_quotidiano_domains)) {
  if (window.location.pathname.endsWith('/amp') || window.location.search.startsWith('?amp')) {
    amp_unhide_access_hide('="c.customGranted"', '="NOT c.customGranted"', 'amp-fx-flying-carpet, .watermark-adv, .amp__watermark');
  } else {
    amp_redirect('div[data-testid="paywall-container"], div[class^="Paywall_paywall_"]', '', window.location.pathname + '/amp');
    let ads = 'div[id^="div-gpt-ad"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('italiaoggi.it')) {
  let paywall = document.querySelector('div.boxAbb');
  if (paywall && dompurify_loaded) {
    let overlay = document.querySelector('div.article-locked-overlay');
    removeDOMElement(paywall, overlay);
    let article_locked = document.querySelector('div.article-locked');
    if (article_locked) {
      article_locked.classList.remove('article-locked');
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          let content = article_locked.querySelector('section');
          if (json_text && content) {
            let parser = new DOMParser();
            json_text = json_text.replace(/&amp;apos;/g, "'").replace(/;/g, '');
            let doc = parser.parseFromString('<div><section>' + DOMPurify.sanitize(json_text) + '</section></div>', 'text/html');
            let content_new = doc.querySelector('div');
            content.parentNode.replaceChild(content_new, content);
          }
        }
      }
    }
  }
}

else if (domain = matchDomain(it_gedi_domains)) {
  let amp = window.location.pathname.match(/\/amp(\/)?$/);
  if (matchDomain('lastampa.it')) {
    if (window.location.pathname.includes('/news/')) {
      if (!amp) {
        let paywall = document.querySelector('iframe[id^="__limio_frame"]');
        if (paywall) {
          removeDOMElement(paywall);
          refreshCurrentTab(false);
        }
        let modal = document.querySelector('aside#widgetDP');
        removeDOMElement(modal);
      } else
        ampToHtml();
    }
  } else if (matchDomain('repubblica.it')) {
    if (!amp)
      amp_redirect('iframe[id^="__limio_frame"]', '', window.location.pathname + 'amp/');
    else {
      amp_unhide_subscr_section();
      if (!mobile)
        addStyle('img.i-amphtml-fill-content {min-height: 50% !important; min-width: 50% !important;}');
      let paywall = document.querySelector('div.not_granted__content');
      if (paywall) {
        removeDOMElement(paywall);
        let article = document.querySelector('div.story__wrapper');
        if (article) {
          let url = window.location.href.split(/[#\?]/)[0].replace(/\/amp\/$/, '');
          article.before(googleSearchToolLink(url));
        }
      }
    }
  } else {
    if (!amp) {
      let paywall = document.querySelector('div#ph-paywall');
      removeDOMElement(paywall);
    } else
      ampToHtml();
  }
  let ads = 'div[id^="adv"]';
  hideDOMStyle(ads);
}

else if (matchDomain('milanofinanza.it')) {
  let paywall = document.querySelector('div.paywall-content, section.payment');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text.replace(/!=/g, '').replace(/!function\(\){[^!]+(\(\);|0;[a-z])/g, ''));
        if (json) {
          let json_text = parseHtmlEntities(json.articleBody);
          let article = document.querySelector('div.article-locked');
          if (json_text && article) {
            article.innerHTML = '';
            let article_new = document.createElement('p');
            article_new.innerText = json_text;
            article.appendChild(article_new);
          }
        }
      } catch (err) {
        console.log(err);
        header_nofix('div.article-locked', '', 'BPC > no fix (json-error)');
      }
    }
  }
}

else if (matchDomain('nationalgeographic.it')) {
  document.querySelectorAll('section[style]').forEach(e => e.removeAttribute('style'));
  hideDOMStyle('section.paywall-container');
}

else if (matchDomain('sky.it')) {
  let paywall = document.querySelector('div.c-paywall');
  if (paywall && window.location.hostname.match(/^(sport|tg24)\./)) {
    removeDOMElement(paywall);
    let article = document.querySelector('div > div.c-article-abstract');
    let json_script = getArticleJsonScript();
    if (article && json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json[0].articleBody;
          if (json_text) {
            let par_new = document.createElement('p');
            par_new.innerText = json_text;
            article.parentNode.appendChild(par_new);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  let ads = 'div.c-adv';
  hideDOMStyle(ads);
}

else if (matchDomain('tuttosport.com')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let paywall = document.querySelector('div[class^="MainTextTruncated_premium"]');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let article = document.querySelector('div > div[class^="MainTextTruncated_truncatedContent"]');
      if (article) {
        let json_script = document.querySelector('script#__NEXT_DATA__');
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            if (json && json.props.pageProps.news && json.props.pageProps.news.content) {
              let url_next = json.props.pageProps.news.href;
              if (url_next && !window.location.pathname.includes(url_next))
                window.location.href = window.location.pathname;
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json.props.pageProps.news.content, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              article.parentNode.replaceChild(article_new, article);
            } else
              refreshCurrentTab();
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
    let ads = 'div[class^="AdUnit_"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('vanityfair.it')) {
  let ads = 'div.ad';
  hideDOMStyle(ads);
}

else
  csDone = true;

} // end csDone(Once)

ads_hide();
leaky_paywall_unhide();

} // end cs_default function
