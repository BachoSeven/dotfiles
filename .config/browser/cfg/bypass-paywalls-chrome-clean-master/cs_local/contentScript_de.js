//"use strict";

var ch_tamedia_domains = ['24heures.ch', 'bazonline.ch', 'bernerzeitung.ch', 'derbund.ch', 'tagesanzeiger.ch', 'tdg.ch'];
var de_funke_medien_domains = ['abendblatt.de', 'braunschweiger-zeitung.de', 'harzkurier.de', 'ikz-online.de', 'morgenpost.de', 'nrz.de', 'otz.de', 'thueringer-allgemeine.de', 'tlz.de', 'waz.de', 'wp.de', 'wr.de'];
var de_ippen_media_domains = ['fr.de', 'merkur.de', 'ovb-online.de'];
var de_lv_domains = ['profi.de', 'wochenblatt.com'];
var de_madsack_domains = ['haz.de', 'kn-online.de', 'ln-online.de', 'lvz.de', 'maz-online.de', 'neuepresse.de', 'ostsee-zeitung.de', 'rnd.de', 'saechsische.de'];
var de_motor_presse_domains = ['aerokurier.de', 'auto-motor-und-sport.de', 'flugrevue.de', 'motorradonline.de', 'womenshealth.de'];
var de_rp_medien_domains = ['ga.de', 'rp-online.de', 'saarbruecker-zeitung.de', 'volksfreund.de'];
var de_smn_domains = ['schwarzwaelder-bote.de', 'stuttgarter-nachrichten.de', 'stuttgarter-zeitung.de'];
var de_smn_custom_domains = ['cannstatter-zeitung.de', 'esslinger-zeitung.de', 'frankenpost.de', 'insuedthueringen.de', 'krzbb.de', 'kurier.de', 'np-coburg.de'];
var de_vrm_domains = ['allgemeine-zeitung.de', 'echo-online.de', 'wiesbadener-kurier.de'];
var de_vrm_custom_domains = ['buerstaedter-zeitung.de', 'hochheimer-zeitung.de', 'lampertheimer-zeitung.de', 'lauterbacher-anzeiger.de', 'main-spitze.de', 'mittelhessen.de', 'oberhessische-zeitung.de', 'wormser-zeitung.de'];

cs_default = function (bg2csData = '') {

if (bg2csData && bg2csData.cs_param)
  cs_param = bg2csData.cs_param;

if (!(csDone || csDoneOnce)) {

if (matchDomain('aerztezeitung.de')) {
  let paywall = document.querySelector('div.AZLoginModule');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let content = document.querySelector('p.intro');
        if (json_text && content) {
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          content.after(article_new);
        }
      }
    }
  }
}

else if (matchDomain('automobilwoche.de')) {
  // plus code in contentScript_once_var.js (timing)
  let banners = 'div#piano-paywall-container';
  hideDOMStyle(banners);
}

else if (matchDomain(['beobachter.ch', 'handelszeitung.ch'])) {
  window.setTimeout(function () {
  let paywall = document.querySelector('div#piano-inlined');
  if (paywall && dompurify_loaded) {
    let fade = document.querySelector('div.article-body > div.paywall-wrapper-with-print-info');
    removeDOMElement(paywall, fade);
    let json_script = document.querySelector('script#hydrationdata');
    if (json_script) {
      try {
        let json = JSON.parse(decodeURIComponent(escape(atob(json_script.text))));
        if (json) {
          let url_id = findKeyJson(json, 'gcid');
          if (url_id && !window.location.pathname.endsWith(url_id))
            refreshCurrentTab();
          let pars = json.state;
          let paragraphs = document.querySelectorAll('div.paragraph');
          let article = paragraphs[0];
          if (article) {
            article.setAttribute('class', 'paragraph text-paragraph');
            for (let paragraph of paragraphs)
              paragraph.innerHTML = '';
            let parser = new DOMParser();
            let img_first = true;
            let img_use = false;
            let img_caption;
            for (let par in pars) {
              let par_elem = pars[par];
              let elem = document.createElement('div');
              elem.style = 'font-size: 1.7rem; margin: 25px;';
              let sub_elem;
              if (par_elem.__typename === 'TextParagraph' && par_elem.text) {
                let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(par_elem.text) + '</div>', 'text/html');
                sub_elem = content_new.querySelector('div');
              } else if (par_elem.__typename === 'EmbedParagraph' && par_elem.embedCode) {
                let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(par_elem.embedCode.split('<embeddedscript')[0], dompurify_options) + '</div>', 'text/html');
                sub_elem = content_new.querySelector('div');
                let iframe = sub_elem.querySelector('iframe[width]');
                if (iframe) {
                  iframe.removeAttribute('width');
                  iframe.removeAttribute('height');
                  iframe.style = 'width: 100%; height: 100%;';
                }
                let iframe_fullscreen = sub_elem.querySelector('iframe[allow*="fullscreen"][allowfullscreen]');
                if (iframe_fullscreen)
                  iframe_fullscreen.removeAttribute('allowfullscreen');
              } else if (par_elem.__typename === 'ImageFile') {
                if (par_elem.origin) {
                  if (!img_first) {
                    sub_elem = makeFigure(par_elem.origin, '_', {alt: par_elem.alt, style: 'width: 100%'});
                    img_caption = sub_elem.querySelector('figcaption');
                    img_use = true;
                  } else
                    img_first = false;
                }
              } else if (par_elem.__typename === 'Image') {
                if (img_use && img_caption && par_elem.credit)
                  img_caption.after('Quelle: ', par_elem.credit);
              } else if (par_elem.__typename === 'ImageParagraph') {
                if (img_use && img_caption && par_elem.caption)
                  img_caption.innerText = par_elem.caption.replace(/(<\/?[^>]+>)/g, '');
              } else if (par_elem.__typename === 'MinistageParagraph') {
                if (par_elem.ministage && par_elem.ministage.headline) {
                  sub_elem = document.createElement('p');
                  sub_elem.append(par_elem.ministage.headline, ' - ' + par_elem.ministage.lead);
                  if (par_elem.ministage.link) {
                    let sub_link = document.createElement('a');
                    sub_link.href = par_elem.ministage.link.path;
                    sub_link.innerText = par_elem.ministage.link.label;
                    sub_elem.append(document.createElement('br'), sub_link);
                  }
                }
              } else if (par_elem.__typename === 'ListicleItemParagraph') {
                if (par_elem.title &&par_elem.text && par_elem.link && par_elem.link.path) {
                  sub_elem = document.createElement('a');
                  sub_elem.href = par_elem.link.path;
                  sub_elem.innerText = par_elem.title + ' - ' + par_elem.text.replace(/(<\/?[^>]+>)/g, '');
                }
              } else if (par_elem.__typename === 'Product') {
                if (par_elem.title && par_elem.link && par_elem.link.path) {
                  sub_elem = document.createElement('a');
                  sub_elem.href = par_elem.link.path;
                  sub_elem.innerText = (par_elem.shortTitle ? par_elem.shortTitle + ' - ' : '') + par_elem.title;
                }
              } else if (!['Article', 'Author', 'BlockquoteParagraph', 'Channel', 'InfoBoxParagraph', 'InputFormParagraph', 'LandingPage', 'Query', 'TeaserParagraph', 'TeaserStageParagraph'].includes(par_elem.__typename)) {
                console.log(par_elem);
              }
              if (sub_elem) {
                elem.appendChild(sub_elem);
                article.appendChild(elem);
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  }, 1000);
  let ads = 'div.ad-wrapper, div[id^="apn-ad-slot-"], div[class^="piano-article-aside"]';
  hideDOMStyle(ads);
}

else if (matchDomain(['berliner-zeitung.de', 'ostdeutscheallgemeine.com'])) {
  let ads = 'div[class^="traffective_"], div[class^="article_billboard-"], div[class*="_ad_"], div[class^="outbrain_"], div[id^="qmn-ad-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('bild.de')) {
  func_post = function () {
    if (mobile) {
      let lazy_images = document.querySelectorAll('figure img[loading="lazy"][style]');
      for (let elem of lazy_images) {
        elem.style = 'width: 95%; margin: 10px;';
        elem.parentNode.removeAttribute('style');
      }
      let header = document.querySelector('article > h2 > span:last-child');
      if (header)
        header.style = 'margin: 10px;';
      let content = document.querySelector('article time ~ div');
      if (content)
        content.style = 'margin: 10px;';
    }
    let div_empty = document.querySelectorAll('div[style]');
    for (let elem of div_empty)
      if (!elem.innerText.length)
        removeDOMElement(elem);
    let article = document.querySelector('main > article');
    if (article && article.innerText.length < 1000)
      header_nofix('h2', '', 'BPC > no archive-fix');
    let ads = 'article aside > span';
    hideDOMStyle(ads, 2);
  }
  let url = window.location.href;
  getArchive(url, 'div.offer-module', '', 'article');
  let ads = 'div.addelivered';
  hideDOMStyle(ads);
}

else if (matchDomain('blick.ch')) {
  let ads = 'aside[class*="slot-code"], aside[class*="_teaser_"][class*="slot-code"]';
  hideDOMStyle(ads);
}

else if (matchDomain('bnn.de')) {
  func_post = function () {
    let summary = document.querySelector('summary');
    if (summary) {
      let gradient = summary.querySelector('span[style*="background-image:linear-gradient"]');
      if (gradient) {
        gradient.removeAttribute('style');
        gradient.click();
      }
      let sum_button = summary.parentNode.parentNode.querySelector('button');
      removeDOMElement(sum_button);
    }
    if (mobile) {
      document.querySelectorAll('picture img[loading="lazy"][style]').forEach(e => e.style = 'width: 95%;');
    }
    header_nofix('article section', 'section > span[style*="filter:blur"]', 'BPC > no archive-fix');
  }
  let url = window.location.href;
  getArchive(url, 'section.paywall', '', 'article');
}

else if (matchDomain('boersen-zeitung.de')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('storefront-section#paywall');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let url = window.location.href;
      replaceDomElementExt(url, false, false, 'article');
    }
  }, 1000);
}

else if (matchDomain('cicero.de')) {
  if (!window.location.search.startsWith('?amp')) {
    let url = window.location.href;
    getArchive(url, 'div.plenigo-paywall', '', cs_param.article_sel || 'article > div:has(> div.ad-container)', '', cs_param.article_src_sel || 'article > div:has(h3)');
  } else if (document.querySelector('div.paywall-fadeout'))
    ampToHtml();
}

else if (matchDomain('diepresse.com')) {
  let paywall = document.querySelector('div.premium-content.hide');
  if (paywall)
    paywall.removeAttribute('class');
  let fade = 'div.paywall-container--locked';
  hideDOMStyle(fade);
}

else if (matchDomain('faz.net')) {
  window.setTimeout(function () {
  let paywall = document.querySelector('div.wall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let art_match = window.location.pathname.match(/-(\d+)\.html$/);
    if (art_match) {
      let article_id = art_match[1];
      let article_sel = 'div[data-external-selector="body-elements"]';
      let article = document.querySelector(article_sel);
      if (article) {
        article.removeAttribute('class');
        let intro = article.querySelector('[class][data-selector="body-paragraph"]');
        if (intro) {
          let par_class = intro.className;
          let url = window.location.href;
          let url_src = 'https://fnetcore-api-prod.azurewebsites.net/api/v3/article?id=' + article_id;
          getExtFetch(url_src, '', {}, main_faz);
          function main_faz(url, data) {
            try {
              if (data && intro) {
                let json_data = JSON.parse(data);
                let pars = json_data.content_elements;
                let parser = new DOMParser();
                let elem;
                for (let par of pars) {
                  if (par.html) {
                    let doc = parser.parseFromString(DOMPurify.sanitize(par.html, dompurify_options), 'text/html');
                    let elem_type_match = par.html.match(/^<(\w+)/);
                    if (elem_type_match) {
                      let elem_type = elem_type_match[1];
                      elem = doc.querySelector(elem_type);
                      if (elem_type !== 'iframe')
                        elem.className = par_class;
                      if (elem_type.match(/h\d/))
                        elem.style = 'font-weight: bold;';
                    }
                  } else if (par.image && par.image.url) {
                    elem = makeFigure(par.image.url, par.image.caption + ' ' + par.image.source);
                    elem.style = 'margin: 20px 0px;';
                  } else if (!par.adItem && !par.articleIds && par.isBlurred)
                    console.log(par);
                  if (elem && intro.parentNode)
                    intro.parentNode.append(elem);
                }
                removeDOMElement(intro);
                if (window.location.pathname.startsWith('/podcasts/')) {
                  let audio = document.querySelector('button[track-label="Podcast"]');
                  if (audio && json_data.podcastAudioInfo && json_data.podcastAudioInfo.url) {
                    let audio_new = document.createElement('audio');
                    audio_new.src = json_data.podcastAudioInfo.url;
                    audio_new.setAttribute('controls', '');
                    audio.parentNode.replaceChild(audio_new, audio);
                  }
                } else {
                  let audio = document.querySelector('button[track-label="TTS"]');
                  if (audio && json_data.audioInfo && json_data.audioInfo.url) {
                    let audio_new = document.createElement('audio');
                    audio_new.src = json_data.audioInfo.url;
                    audio_new.setAttribute('controls', '');
                    audio.parentNode.replaceChild(audio_new, audio);
                  }
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      } else
        header_nofix('div.story-content[data-module="text"]');
    }
  }
  }, 1000);
  let ads = 'div.lay-PaySocial, div.iqadtile_wrapper, div.iqdcontainer';
  hideDOMStyle(ads);
}

else if (matchDomain('freiepresse.de')) {
  func_post = function () {
    if (mobile) {
      pageContains('div[style]:not([id])', 'Hier verpassen Sie spannende Inhalte!').forEach(e => e.removeAttribute('style'));
    }
    let gallery_images = document.querySelectorAll(article_sel + ' div[style] > div[style] > div[style*=";opacity:"]');
    if (gallery_images.length) {
      gallery_images[0].parentNode.parentNode.removeAttribute('style');
      for (let elem of gallery_images) {
        elem.removeAttribute('style');
        elem.parentNode.removeAttribute('style');
      }
    }
  }
  let url = url_old = window.location.href;
  let paywall_sel = 'div.default-paywall, div.upscore-paywall-placeholder';
  let article_sel = 'div#artikel-content';
  if (dompurify_loaded) {
  setInterval(function () {
    url = window.location.href;
    if (url !== url_old) {
      url_old = url;
      if (window.location.pathname.match(/-artikel\d+$/))
        refreshCurrentTab();
    }
    getArchive(url, paywall_sel, '', article_sel);
    csDoneOnce = false;
  }, 1000);
  }
  let ads = 'div#BSB, div[id^="CAD"], div.taboola-endless-feed';
  hideDOMStyle(ads);
}

else if (matchDomain('handelsblatt.com')) {
  let paywall = document.querySelector('app-paywall[style="display: block;"]');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('article');
    if (article) {
      let url = window.location.href;
      article.after(googleSearchToolLink(url));
      header_nofix('article', '', 'BPC > refresh page');
    }
  }
  window.localStorage.removeItem('HB.METERING');
  let related_topics = document.querySelector('app-storyline-related-topics');
  let overlay = document.querySelector('div[id^="sp_message_container_"]');
  removeDOMElement(overlay, related_topics);
  let noscroll = document.querySelector('html[class]');
  if (noscroll)
    noscroll.removeAttribute('class');
  let charts = document.querySelectorAll('iframe[name^="iframe-"][loading][src*="grafik.handelsblatt.com"]');
  for (let elem of charts) {
    elem.style = 'height: 1000px;';
    elem.removeAttribute('loading');
    elem.scrolling = 'yes';
  }
  let ads = 'app-commercial-teaser-group';
  hideDOMStyle(ads);
}

else if (matchDomain('heise.de')) {
  func_post = function () {
    header_nofix('article', 'div[id^="upscore-paywall-offer"]', 'BPC > no archive-fix');
    let dark_mode = document.querySelector('html.dark');
    if (dark_mode)
      dark_mode.classList.remove('dark');
    if (mobile) {
      document.querySelectorAll('figure img[loading="lazy"][style]').forEach(e => e.style = 'width: 95%;');
    }
  }
  let paywall_sel = cs_param.paywall_sel || 'a-gift:has(div.paywall-delimiter)';
  let url = window.location.href;
  getArchive(url, paywall_sel, '', 'article');
  let ads = 'div.ad-ldb-container, div.inread-cls-reduc, aside.img-ad, a-opt-in';
  hideDOMStyle(ads);
}

else if (matchDomain('jacobin.de')) {
  let paywall = pageContains('h3.m-auto', 'Dieser Artikel ist nur mit Abo zugänglich.');
  if (paywall.length && dompurify_loaded) {
    let slash = document.querySelector('div.slash');
    removeDOMElement(paywall[0].parentNode, slash);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && json.props.pageProps.sections && json.props.pageProps.sections[1].content) {
          let url_next = json.query.slug;
          if (url_next && !window.location.pathname.includes(url_next))
            refreshCurrentTab();
          let pars = json.props.pageProps.sections[1].content;
          let first_par = document.querySelector('body > div#__next p.bodyText');
          if (first_par) {
            let par_class = first_par.getAttribute('class');
            let article = first_par.parentNode;
            if (article) {
              let add_par = false;
              for (let par of pars) {
                if (!add_par) {
                  if (par.type === 'paywall')
                    add_par = true;
                } else {
                  if (par.text) {
                    let elem_type = 'p';
                    let elem_class = par_class;
                    let elem_style;
                    if (['paragraph', 'quote'].includes(par.type)) {
                      if (par.type === 'quote')
                        elem_style = 'font-size: 36px; font-weight: bold;';
                    } else if (par.type === 'header') {
                      elem_type = 'h2';
                      elem_class = 'content-element font-headline h2 my-1em';
                    }
                    let content = par.text.replace(/&nbsp;/g, '');
                    let parser = new DOMParser();
                    let content_new = parser.parseFromString('<' + elem_type + ' class="' + elem_class + (elem_style ? '" style="' + elem_style : '') + '">' + DOMPurify.sanitize(content, dompurify_options) + '</' + elem_type + 'p>', 'text/html');
                    article.appendChild(content_new.querySelector(elem_type));
                  } else
                    console.log(par);
                }
              }
              let author_footer = article.querySelector('div.content-element > div > h3');
              if (author_footer)
                article.appendChild(author_footer.parentNode.parentNode);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('krautreporter.de')) {
  let paywall = document.querySelector('section.js-access-wall');
  if (paywall) {
    removeDOMElement(paywall);
    window.setTimeout(function () {
      document.querySelectorAll('.blurred').forEach(e => e.classList.remove('blurred', 'json-ld-paywall-marker', 'hidden@print'));
    }, 500);
    let banners = 'div.js-paywall-divider, #steady-checkout';
    hideDOMStyle(banners);
  }
}

else if (matchDomain(['ksta.de', 'rundschau-online.de'])) {
  function unhide_article(node) {
    removeDOMElement(node);
    let article = document.querySelector('div[data-article-content][style]');
    if (article)
      article.removeAttribute('style');
  }
  waitDOMElement('div[data-type="paywall"]', 'DIV', unhide_article, true);
  csDoneOnce = true;
  let banners = 'div.dm-slot, div.dm-zephr-banner';
  hideDOMStyle(banners);
}

else if (matchDomain('kurier.at')) {
  let paywall = document.querySelector('div#cfs-paywall-container');
  if (paywall) {
    removeDOMElement(paywall);
    let div_hidden = document.querySelector('div.paywall');
    if (div_hidden) {
      div_hidden.classList.remove('paywall');
      div_hidden.removeAttribute('style');
    }
  }
  let ads = 'div[data-ad], div[data-outbrain]';
  hideDOMStyle(ads);
}

else if (matchDomain(['mittelbayerische.de', 'pnp.de'])) {
  let url = window.location.href;
  getArchive(url, 'div.paywall-layer', '', 'div#article-body');
  let ads = 'div.d-sm-block, div[id^="glomex_frame"], glomex-integration';
  hideDOMStyle(ads);
}

else if (matchDomain('motorradonline.de')) {
  if (window.location.pathname.endsWith('/amp/'))
    ampToHtml();
}

else if (matchDomain(['noz.de', 'shz.de'])) {
  func_post = function () {
    let article = document.querySelector(article_sel);
    if (article) {
      let podcasts = article.querySelectorAll('div > div[allow][old-src]');
      for (let elem of podcasts) {
        let iframe = document.createElement('iframe');
        iframe.src = elem.getAttribute('old-src');
        iframe.style = 'width: 100%; height: 300px;';
        elem.parentNode.replaceChild(iframe, elem);
      }
      if (mobile) {
        article.querySelectorAll('section#c2, section#c4').forEach(e => e.style = 'margin: 20px');
        let lazy_images = article.querySelectorAll('div > figure > picture > img[loading="lazy"][style]');
        for (let elem of lazy_images) {
          elem.style = 'width: 95%;';
          elem.parentNode.parentNode.parentNode.removeAttribute('style');
        }
      }
      let paywall = article.querySelector('section#c3');
      if (paywall) {
        removeDOMElement(paywall);
        article.before(googleSearchToolLink(url));
      }
    }
  }
  let url = window.location.href;
  let article_sel = 'article';
  getArchive(url, 'div.paywall', '', article_sel);
  let ads = 'div.ad_label';
  hideDOMStyle(ads);
}

else if (matchDomain('nw.de')) {
  let paywall = document.querySelector('div.abo-container');
  let article = document.querySelector('div#paywall');
  if (paywall && article) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        let json_text = parseHtmlEntities(json.articleBody.replace(/\\n/g, '\n\n').replace(/\\\//g, '/').replace(/\.responsive[-@%{}()\.:;\w\s]+}\s?}/g, ''));
        article.innerText = json_text;
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('nwzonline.de')) {
  let ads = 'div.adslot';
  hideDOMStyle(ads);
}

else if (matchDomain(['nzz.ch', 'themarket.ch'])) {
  let fade = document.querySelectorAll('.nzzinteraction');
  for (let elem of fade)
    elem.classList.remove('nzzinteraction');
  let fade_new = document.querySelector('div.barrier');
  if (fade_new)
    fade_new.removeAttribute('class');
  let ads = 'div.resor';
  hideDOMStyle(ads);
}

else if (matchDomain('philomag.de')) {
  let paywall = document.querySelector('div[id^="block-paywall"]');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articlebody.replace(/%paywall%/g, '').replace(/(\\r)?\\n/g, '<br><br>');
        let content = document.querySelector('div.content-center > div.description');
        if (json_text && content) {
          content.innerHTML = '';
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          content.appendChild(article_new);
        }
      }
    }
  }
}

else if (matchDomain('profil.at')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    paywall.removeAttribute('style');
    let fade = 'div#cfs-paywall-container';
    hideDOMStyle(fade);
  }
  let overlay = 'div.consentOverlay';
  hideDOMStyle(overlay, 2);
}

else if (matchDomain('rheinpfalz.de')) {
  let ads = 'div.nfy-banner, aside.nfy-content-ad';
  hideDOMStyle(ads);
}

else if (matchDomain('schweizermonat.ch')) {
  getJsonUrl('div.entry-paywall-login', '', 'div.entry-main > div.entry__post-content');
}

else if (matchDomain('spektrum.de')) {
  let paywall = document.querySelector('article.pw-premium');
  if (paywall)
    paywall.classList.remove('pw-premium');
  document.querySelectorAll('iframe:not([src])[data-src]').forEach(e => e.src = e.getAttribute('data-src'));
  if (!runOnce) {
    runOnce = true;
    waitDOMAttribute('body', 'BODY', 'style', node => node.removeAttribute('style'), true);
  }
}

else if (matchDomain('spiegel.de')) {
  let url = window.location.href;
  func_post = function () {
    let failed_iframes = document.querySelectorAll('div > div[x-show="!iframeIsLoaded"]');
    for (let elem of failed_iframes)
      hideDOMElement(elem.parentNode);
    let body_dark = document.querySelector('body[class*="dark:"]');
    if (body_dark)
      removeClassesByPrefix(body_dark, 'dark:');
    let charts = document.querySelectorAll('section div[x-data*="{isLoaded:"]');
    for (let elem of charts)
      elem.style.height = elem.offsetHeight + 'px';
    document.querySelectorAll('figure > div > img.lazyload[src^="data:image/"][data-src').forEach(e => e.src = e.getAttribute('data-src')); //games
    if (mobile) {
      document.querySelectorAll('picture img[loading="lazy"][style]:not([src^="data:image/"])').forEach(e => e.style = 'width: 95%;');
      let header_img = document.querySelector('header div[style*=";width:"]');
      if (header_img)
        header_img.style.width = 'unset';
    }
    header_nofix('article', '*:not(.hidden) > svg[id*="-plus-paywall-"]', 'BPC > no archive-fix');
    if (document.querySelector('head > link[type="application/rss+xml"][href="https://www.spiegel.de/thema/liveblogs/index.rss"]'))
      header_nofix('article', 'div[x-embed-bridge-handler] > div[x-show="!isInitialized"]', 'BPC > for liveblogs use archive-link');
  }
  getArchive(url, 'div[data-area="paywall"]', '', 'article');
  let ads = 'div[data-advertisement], div[x-data^="{adIndex:"]';
  hideDOMStyle(ads);
}

else if (matchDomain('springermedizin.de')) {
  let paywall = document.querySelector('div#pay-wall');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let article = document.querySelector('div > p.intro--paragraph');
        if (json_text && article) {
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          article.parentNode.replaceChild(article_new, article);
        }
      }
    }
  }
}

else if (matchDomain('stern.de')) {
  func_post = function () {
    header_nofix(link_sel, paywall_sel, 'BPC > no archive-fix');
    if (mobile) {
      let article = document.querySelector(article_src_sel);
      if (article) {
        let lazy_images = article.querySelectorAll('figure > img[loading="lazy"][style]');
        for (let elem of lazy_images) {
          elem.style = 'width: 95%;';
          elem.parentNode.style = 'margin-bottom: 20px';
          let caption = elem.parentNode.querySelector('figcaption');
          if (caption)
            caption.style = 'width: 95%;';
        }
        let article_recs = article.querySelectorAll('article');
        for (let elem of article_recs)
          elem.style = 'width: 95%;';
        let article_opulent = document.querySelector('div.page-opulent__body-inner > div > div');
        if (article_opulent) {
          article_opulent.removeAttribute('style');
          let gradient = 'span[style*="linear-gradient"]';
          hideDOMStyle(gradient, 2);
        }
      }
    }
    let widgets = document.querySelectorAll('ws-socialwidget > slot > slot[slot="content"]');
    for (let elem of widgets) {
      let parser = new DOMParser();
      let doc = parser.parseFromString('<div style="margin: 20px 0px;">' + DOMPurify.sanitize(elem.innerText, dompurify_options) + '</div>', 'text/html');
      let elem_new = doc.querySelector('div');
      let container = elem.parentNode.parentNode;
      container.parentNode.replaceChild(elem_new, container);
    }
  }
  if (!dompurify_options.ADD_TAGS.includes('ws-paywall'))
    dompurify_options.ADD_TAGS = dompurify_options.ADD_TAGS.concat(['ws-paywall', 'ws-socialwidget']);
  let paywall_sel = cs_param.paywall_sel || 'main > article ws-paywall';
  let article_sel = cs_param.article_sel || 'div.article__body';
  let article_src_sel = cs_param.article_src_sel || 'main > article > div:last-child';
  let link_sel = cs_param.link_sel || 'div.page__content-inner, div.page-opulent';
  let url = window.location.href;
  getArchive(url, paywall_sel, '', article_sel, '', article_src_sel, link_sel);
  let ads = 'section.ad-container';
  hideDOMStyle(ads);
}

else if (matchDomain('sueddeutsche.de')) {
  let url = window.location.href;
  if (matchDomain('sz-magazin.sueddeutsche.de')) {
    func_post = function () {
      header_nofix('main', 'div#sz-paywall:not(:empty)', 'BPC > no archive-fix');
    }
    getArchive(url, 'div.offerpage-container', '', 'main');
  } else if (window.location.pathname.startsWith('/projekte/artikel/')) {
    func_post = function () {
      let lazy_images = document.querySelectorAll('img[loading="lazy"][style*="min-width:"]');
      for (let elem of lazy_images)
        elem.style = 'width: 80%; margin: auto;';
      let sticky = document.querySelectorAll('div > div > div[old-position="sticky"]');
      for (let elem of sticky) {
        let div_hidden = elem.parentNode.parentNode.querySelector('div[style^="display:none;"]');
        if (div_hidden)
          div_hidden.removeAttribute('style');
        removeDOMElement(elem.parentNode);
      }
      if (intro) {
        let intro_old = document.querySelector(intro_sel);
        if (intro_old && intro_old.parentNode)
          intro_old.parentNode.replaceChild(intro, intro_old);
      }
      header_nofix('main', 'div#sz-paywall', 'BPC > no archive-fix');
    }
    let intro_sel = 'section#module-0';
    let intro = document.querySelector(intro_sel);
    getArchive(url, 'div.offer-page', '', 'main');
  } else {
    func_post = function () {
      let article = document.querySelector(article_sel);
      if (article) {
        article.style.padding = '50px';
        let lazy_images = article.querySelectorAll('div[style] > picture > img[loading="lazy"][style]');
        for (let elem of lazy_images) {
          elem.removeAttribute('style');
          let container = elem.parentNode.parentNode;
          container.removeAttribute('style');
          let span = container.parentNode.querySelector('span[style]:empty');
          removeDOMElement(span);
        }
      }
    }
    let article_sel = 'div[itemprop="articleBody"]';
    getArchive(url, 'head > meta[content="locked"]', '', article_sel);
  }
  let ads = 'er-ad-slot, div.iqdcontainer';
  hideDOMStyle(ads);
}

else if (matchDomain('tagesspiegel.de')) {
  let paywall_sel = 'div#paywall';
  let article_sel = 'div#story-elements';
  let url = window.location.href;
  if (matchDomain('www.tagesspiegel.de')) {
    func_post = function () {
      let videos = document.querySelectorAll('div[old-src]:not([src])');
      for (let elem of videos) {
        let iframe = document.createElement('iframe');
        iframe.src = elem.getAttribute('old-src');
        iframe.style = 'width: 100%; height: 400px;';
        elem.parentNode.replaceChild(iframe, elem);
      }
      let opinionary = document.querySelector('div > div#opinary-automation-placeholder');
      if (opinionary)
        hideDOMElement(opinionary.parentNode);
      if (mobile) {
        let lazy_images = document.querySelectorAll('figure img[loading="lazy"][style]');
        for (let elem of lazy_images)
          elem.style = 'width: 95%;';
      }
    }
    let paywall = document.querySelector(paywall_sel);
    if (paywall) {
      let article = document.querySelector(article_sel);
      if (article)
        article.before(googleSearchToolLink(url));
      getArchive(url, paywall_sel, '', article_sel);
    }
    let audio_script = document.querySelector('script[type="application/ld+json"]');
    if (audio_script && audio_script.innerHTML.includes('"contentUrl":"')) {
      let audio_new = document.createElement('audio');
      audio_new.src = audio_script.innerHTML.split('"contentUrl":"')[1].split('"')[0];
      audio_new.setAttribute('controls', '');
      let header = document.querySelector('article > header');
      if (header) {
        header.lastChild.after(audio_new);
        removeDOMElement(audio_script);
      }
    }
  } else if (matchDomain('interaktiv.tagesspiegel.de')) {
    let paywall = document.querySelector(paywall_sel);
    if (paywall) {
      removeDOMElement(paywall);
      let article = document.querySelector('main.tslr-article p');
      if (article) {
        article.before(googleSearchToolLink(url));
        article.before(archiveLink(url));
      }
    }
  }
  let ads = 'div.iqdcontainer';
  hideDOMStyle(ads);
}

else if (matchDomain('vn.at')) {
  if (window.location.href.match(/\.vn\.at\/.+\/\d{4}\//)) {
    let paywall = document.querySelector('div.paywalled-content');
    if (paywall) {
      csDoneOnce = true;
      let par = paywall.querySelector('p');
      if (!par) {
        refreshCurrentTab_bg();
      } else {
        let lazy_images = document.querySelectorAll('img[src^="data:image/"][lazy-src]');
        for (let elem of lazy_images) {
          elem.src = elem.getAttribute('lazy-src');
        }
      }
    } else
      refreshCurrentTab_bg();
  }
}

else if (matchDomain('vol.at')) {
  window.setTimeout(function () {
    let art_pars_sel = cs_param.art_pars_sel || 'article div.content-block--wrapper:not(:empty)';
    let art_pars = document.querySelectorAll(art_pars_sel);
    if (art_pars.length && (art_pars.length < 5) && dompurify_loaded) {
      let article_sel = cs_param.article_sel || 'div.vodl-paywall';
      let article = document.querySelector(article_sel);
      if (article) {
        article.classList.remove('vodl-paywall');
        let json_script = document.querySelector('script#__NUXT_DATA__');
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            let audio_src = json.find(x => x && typeof x === 'string' && x.endsWith('.mp3'));
            if (audio_src) {
              let audio_button = document.querySelector('article header button');
              if (audio_button) {
                let audio_new = document.createElement('audio');
                audio_new.src = audio_src;
                audio_new.setAttribute('controls', '');
                audio_button.parentNode.replaceChild(audio_new, audio_button);
              }
            }
            let blocks_obj = json.find(x => x && typeof x === 'object' && x.blocks);
            if (blocks_obj) {
              let blocks = json[blocks_obj.blocks];
              if (!(Array.isArray(blocks) && blocks.length))
                return;
              let intro = document.querySelector('div.lead-block');
              removeDOMElement(intro);
              let img_header = document.querySelector('article figure img[src]');
              let img_origin;
              if (img_header && img_header.src.match(/\.at\/\d/))
                img_origin = img_header.src.split(/\/\d/)[0];
              let parser = new DOMParser();
              let first = true;
              for (let par of blocks) {
                let elem = document.createElement('div');
                let par_type = json[json[par].t];
                if (['HtmlBlock', 'DCXImage'].includes(par_type)) {
                  let html = json[json[par].h];
                  if (first) {
                    first = false;
                    if (html.endsWith('</figure>'))
                      continue;
                  }
                  let doc = parser.parseFromString('<div class="content-block--wrapper" style="margin: 20px 0px;">' + DOMPurify.sanitize(html, dompurify_options) + '</div>', 'text/html');
                  elem = doc.querySelector('div');
                  if (par_type === 'HtmlBlock') {
                    let iframely_link = elem.querySelector('div.iframely-embed > div.iframely-responsive > a[href]');
                    if (iframely_link) {
                      elem = document.createElement('a');
                      elem.href = elem.innerText = iframely_link.href;
                      elem.appendChild(document.createElement('br'));
                    }
                  } else {
                    let img_hidden = elem.querySelector('img[src^="/"][srcset]');
                    if (img_hidden && img_origin) {
                      img_hidden.src = img_hidden.src.replace('https://www.vol.at', img_origin);
                      img_hidden.removeAttribute('srcset');
                    }
                  }
                } else if (!['Author'].includes(par_type)) {
                  console.log(par_type);
                  for (let key in json[par])
                    console.log(key + ': ' + json[json[par][key]]);
                }
                if (elem)
                  article.appendChild(elem);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }, 1000);
  let ads = 'div[id^="rm-adslot-"], div.vodl-ad, div[id^="piano_rec"], div.vodl-paywall';
  hideDOMStyle(ads);
}

else if (matchDomain('welt.de')) {
  func_post = function () {
    if (mobile) {
      document.querySelectorAll('main header, main header ~ div').forEach(e => e.removeAttribute('style'));
      let main_divs = document.querySelectorAll('main div[style] > div > div[id]');
      for (let elem of main_divs) {
        if (elem.querySelector('img'))
          elem.parentNode.parentNode.removeAttribute('style');
      }
      document.querySelectorAll('main img[loading="lazy"][style]').forEach(e => e.style = 'width: 95%;');
    }
    header_nofix('main header', 'img[alt^="WELTplus"][loading]', 'BPC > no archive-fix');
    let podcast_sel = 'div[id^="pdg-"]';
    if (!window.location.pathname.startsWith('/podcasts/')) {
      let audio_tts = 'div:not([id]) > ' + podcast_sel;
      hideDOMStyle(audio_tts, 2);
      podcast_sel = 'div[id] > ' + podcast_sel;
    }
    let podcasts = document.querySelectorAll(podcast_sel);
    for (let podcast of podcasts) {
      let player = podcast.querySelector('div > button#play-button');
      if (player) {
        let src_doc = podcast.querySelector('a[href^="https://audio.podigee-cdn.net/"]');
        if (src_doc) {
          let audio_new = document.createElement('audio');
          audio_new.src = src_doc.href;
          audio_new.setAttribute('controls', '');
          player.parentNode.parentNode.replaceChild(audio_new, player.parentNode);
        }
      } else
        removeDOMElement(podcast)
    }
    let ads = pageContains('span', 'Anzeige');
    removeDOMElement(...ads);
  }
  let url = window.location.href;
  getArchive(url, 'div.contains_walled_content, div.c-article-paywall', '', 'main header + div');
  addStyle('div.page-content-wrapper {overflow: auto !important; height: auto !important;}');
  let ads = 'div[data-component="Outbrain"], div[class*="c-ad"], div.q-grey-background';
  hideDOMStyle(ads);
}

else if (matchDomain('weser-kurier.de')) {
  let ads = 'div.ad-wrapper, div.anyad, div.msn-ads';
  hideDOMStyle(ads);
}

else if (matchDomain('wiwo.de')) {
  let ads = 'div.iqadtile';
  hideDOMStyle(ads);
}

else if (matchDomain('zeit.de')) {
  let header_sel = 'article > header';
  let header = document.querySelector(header_sel);
  func_post = function () {
    if (header) {
      let header_new = document.querySelector(header_sel);
      if (header_new)
        header_new.parentNode.replaceChild(header, header_new);
    }
    let comments_link = document.querySelector('div[style*="align-items"] a[href$="#comments"]');
    if (comments_link)
      comments_link.href = '#comments';
    document.querySelectorAll('div[style*="padding-bottom:"]:has(figure), div[style*="grid-template-columns:"]:has(figure)').forEach(e => e.removeAttribute('style'));
    let gst_link = false;
    let figures = document.querySelectorAll('figure:has(img[loading="lazy"][style])');
    for (let figure of figures) {
      let lazy_image = figure.querySelector('img');
      if (lazy_image.src.startsWith('data:image/')) {
        let json_script = figure.querySelector('script[type="application/ld+json"]:not(:empty)');
        if (json_script && json_script.text.match(/"url":\s?"/)) {
          let img_url = json_script.text.split(/"url":\s?"/)[1].split('",')[0];
          if (!img_url.includes('.zeit.de/newsletter/')) {
            lazy_image.src = img_url;
            lazy_image.style = 'width: 95%;';
            figure.removeAttribute('style');
          }
        } else if (!gst_link && !figure.querySelector('figcaption[style*="display:none;"]')) {
          gst_link = true;
          header.append(googleSearchToolLink(url));
          header_nofix('div#bpc_archive', '', 'BPC > no images (see GST-link)');
        }
      } else
        lazy_image.style = 'width: 95%;';
    }
    let audio_tts = document.querySelector('div.audio-player');
    if (audio_tts) {
      let audio_src = document.querySelector('head > meta[property="og:audio"][content]:not([content^="https://media-delivery.zeit.de/"])');
      if (audio_src) {
        let audio_new = document.createElement('audio');
        audio_new.src = audio_src.content;
        audio_new.setAttribute('controls', '');
        audio_tts.parentNode.replaceChild(audio_new, audio_tts);
      }
    }
    let videos = document.querySelectorAll('div > div[allowfullscreen][old-src]');
    for (let elem of videos) {
      let iframe = document.createElement('iframe');
      iframe.src = elem.getAttribute('old-src');
      iframe.style = 'width: 100%; height: 400px;';
      elem.parentNode.replaceChild(iframe, elem);
    }
    let charts = document.querySelectorAll('div > div[id^="datawrapper-chart-"][old-src]');
    for (let elem of charts) {
      let iframe = document.createElement('iframe');
      iframe.src = elem.getAttribute('old-src');
      iframe.style = 'width: 100%; height: 400px; border: none;';
      elem.parentNode.replaceChild(iframe, elem);
    }
    if (mobile) {
      let span_empty = document.querySelectorAll('span:empty');
      removeDOMElement(...span_empty);
    }
    let ads = 'div.f2v-paywall-header, div[style*=";min-height:"]:has( > div[id^="iqadtile"])';
    hideDOMStyle(ads, 2);
  }
  let url = window.location.href.split(/[#\?]/)[0];
  if (document.querySelector('head > link[rel="next"]'))
    url += '/komplettansicht';
  getArchive(url, 'aside#paywall', '', 'main', '', 'main', 'article > div');
  let duv_paywall = document.querySelector('div.duv-paywall-preview');
  if (duv_paywall) {
    duv_paywall.querySelectorAll('[disabled]').forEach(e => e.removeAttribute('disabled'));
    let fader = 'div.duv-fader';
    hideDOMStyle(fader, 3);
  }
  let ads = 'div[id^="iqadtile"], .iqdcontainer, div[data-prop-vivi-embed-name="blurred-paywall-header"]';
  hideDOMStyle(ads);
}

else if (matchDomain(ch_tamedia_domains) || document.querySelector('div#__next > div.page-section li > a[href^="https://jobs.tamedia.ch/"]')) {
  let paywall = document.querySelector('div#piano-premium > div');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('article p');
    if (article) {
      let url = window.location.href;
      article.after(googleSearchToolLink(url));
    }
  }
  let ads = 'div[class^="TopAds_"]';
  hideDOMStyle(ads);
}

else if (matchDomain(de_funke_medien_domains)) {
  let paywall = document.querySelector('div#paywall-container');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let spark_script = document.querySelector('script#__SPARK__');
    if (spark_script) {
      let match = spark_script.text.match(/PUBLICATION:\s?'([\w-]+)',/);
      if (match) {
        func_post = function () {
          document.querySelectorAll('div[data-carousel-id-slider]').forEach(x => x.removeAttribute('class'));
          let embed_templates = document.querySelectorAll('div[data-embed-id] > template[data-embedbox-id-embed-template]');
          for (let elem of embed_templates) {
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(elem.innerHTML, dompurify_options) + '</div>', 'text/html');
            let blockquote = doc.querySelector('div');
            elem.parentNode.before(blockquote);
            removeDOMElement(elem.parentNode);
          }
          let charts = document.querySelectorAll('aside > div[id^="datawrapper-vis-"]');
          for (let elem of charts) {
            let img = elem.querySelector('noscript > img[src]');
            if (img) {
              elem.parentNode.before(img);
              removeDOMElement(elem.parentNode);
            }
          }
        }
        let spark_domain = match[1];
        let url_src = 'https://app-webview.sparknews.funkemedien.de/' + spark_domain + window.location.pathname;
        fetch_headers = {"Authorization": cs_param['authorization'] || "Basic YXBpOkNTeGxxRG1YM2xCTmRsS1l6allRcWZqTnFZMkhQVUVm"};
        replaceDomElementExt(url_src, true, false, 'div.article-body', 'BPC > no fix (source file)');
      }
    }
  }
  let ads = 'aside[data-module-id="SparkAdSlotModule"]';
  hideDOMStyle(ads);
}

else if (matchDomain(de_lv_domains)) {
  let paywall = document.querySelector('div[id^="paymentprocess-"]');
  if (paywall) {
    let intro = document.querySelector('div.m-paywall__textFadeOut');
    removeDOMElement(paywall, intro);
    let div_hidden = document.querySelector('div.paywall-full-content[style]');
    if (div_hidden) {
      div_hidden.removeAttribute('class');
      div_hidden.removeAttribute('style');
    }
  }
  let ads = 'div.adZone';
  hideDOMStyle(ads);
}

else if (matchDomain(de_motor_presse_domains)) {
  let ads = 'div#ads-container, div.va-sponsored, div.mps_markAd';
  hideDOMStyle(ads);
}

else if (matchDomain(de_rp_medien_domains)) {
  func_post = function () {
    let paywall = document.querySelector('div#park-paywall');
    if (paywall) {
      let article = document.querySelector('article');
      if (article)
        article.firstChild.before(googleSearchToolLink(url));
    }
    let audio_tts = document.querySelector('div#article-audio-player > div > div');
    if (audio_tts) {
      let audio_script = document.querySelector('script[type="application/ld+json"]');
      if (audio_script) {
        try {
          let audio_json = JSON.parse(audio_script.text);
          if (audio_json) {
            let audio_src = audio_json.audio || audio_json.id;
            if (audio_src) {
              let audio_new = document.createElement('audio');
              audio_new.src = audio_src;
              audio_new.setAttribute('controls', '');
              audio_tts.parentNode.replaceChild(audio_new, audio_tts);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    let videos = 'glomex-player, aside:has(div#glomexdiv)';
    hideDOMStyle(videos, 5);
  }
  let url = window.location.href;
  getArchive(url, 'div.park-paywall-content', '', 'article');
  let ads = 'div.portal-slot';
  hideDOMStyle(ads);
}

else if (matchDomain(de_madsack_domains) || document.querySelector('link[href*=".rndtech.de/"]')) {
  if (!window.location.search.startsWith('?outputType=valid_amp')) {
    window.setTimeout(function () {
      let paywall = document.querySelector('div.paywalledContent');
      if (paywall && dompurify_loaded) {
        paywall.classList.remove('paywalledContent');
        let paywall_banners = document.querySelectorAll('div[class^="ArticleContentLoaderstyled__Gradient"], div[class^="Articlestyled__FullscreenPaywallScrollContainer-"], div[class^="Articlestyled_"] > svg');
        removeDOMElement(...paywall_banners);
        let article = paywall;
        let fusion_script = document.querySelector('script#fusion-metadata');
        if (fusion_script && fusion_script.text.includes('Fusion.globalContent=')) {
          try {
            let json = JSON.parse(fusion_script.text.split('Fusion.globalContent=')[1].split(';Fusion.')[0]);
            if (json) {
              let article_top = article.querySelector('p');
              if (article_top) {
                let style_height = 'height: auto;';
                article_top.style = style_height;
                let par_class = article_top.className;
                let parser = new DOMParser();
                let authors = json.authors;
                if (authors) {
                  let info = document.createElement('p');
                  info.style = 'font-size: 20px; margin: 20px 0px;';
                  for (let author of authors) {
                    if (author.imageUrl) {
                      let img = document.createElement('img');
                      img.src = author.imageUrl;
                      img.style = 'border-radius: 50%; overflow: hidden; height: 56px; width: 56px;';
                      info.append(img);
                    }
                    let name_link = document.createElement('a');
                    name_link.innerText = author.name;
                    name_link.href = author.url;
                    name_link.style = 'margin: 0px 20px;';
                    info.append(name_link);
                  }
                  if (json.displayDate) {
                    let date = new Date(json.displayDate);
                    let date_str = date.toLocaleDateString('de-DE') + ', ' + date.toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"}) + ' Uhr';
                    info.append(date_str)
                  }
                  article.append(info);
                }
                let first_par = true;
                let pars = json.elements;
                for (let par of pars) {
                  let elem = document.createElement('p');
                  if (par.type === 'header') {
                    let sub_elem = document.createElement('h2');
                    sub_elem.innerText = par.text;
                    sub_elem.className = par_class;
                    sub_elem.style = 'font-family: \'DIN Next LT Pro\', Arial, Roboto, sans-serif; font-weight:bold; letter-spacing:-0.25px; font-size:22px; padding-bottom:4px; height: auto;';
                    elem.appendChild(sub_elem);
                  } else if (par.type === 'image') {
                    if (par.imageInfo) {
                      elem = makeFigure(par.imageInfo.src, par.imageInfo.caption + '\r\n' + par.imageInfo.credit, {style: 'width:100%', alt: par.imageInfo.alt}, {style: 'font-family: Inter, Arial, Roboto, sans-serif; font-size: 12px; line-height: 16px; padding: 0px;'});
                    }
                  } else if (par.type === 'list' && par.list.items) {
                    let sub_elem = document.createElement('ul');
                    for (let item of par.list.items) {
                      let li = document.createElement('li');
                      li.className = par_class;
                      li.style = style_height;
                      let doc = parser.parseFromString('<span><strong>• </strong>' + DOMPurify.sanitize(item.text) + '</span>', 'text/html');
                      li.appendChild(doc.querySelector('span'));
                      sub_elem.appendChild(li);
                    }
                    elem.appendChild(sub_elem);
                  } else if (par.type === 'oembed') {
                    if (par.html) {
                      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.html, dompurify_options) + '</div>', 'text/html');
                      elem.appendChild(doc.querySelector('div'));
                    }
                  } else if (par.type === 'rawHtml') {
                    if (par.html) {
                      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.html, dompurify_options) + '</div>', 'text/html');
                      elem.appendChild(doc.querySelector('div'));
                    }
                  } else if (par.text) {
                    if (par.text.trim()) {
                      if (first_par) {
                        if (json.location) {
                          par.text = '<strong>' + json.location + '. </strong>' + par.text;
                          first_par = false;
                        }
                      }
                      elem.className = par_class;
                      elem.style = style_height + ' font-weight: normal;';
                      let doc = parser.parseFromString('<span>' + DOMPurify.sanitize(par.text) + '</span>', 'text/html');
                      elem.appendChild(doc.querySelector('span'));
                    }
                  } else if (!['ad', 'newsletterAd', 'piano'])
                    console.log(par);
                  if (elem.hasChildNodes())
                    article.appendChild(elem);
                }
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }, 1000);
    let ads = 'div[class^="Adstyled__AdWrapper"]';
    hideDOMStyle(ads);
  } else {
    ampToHtml();
  }
}

else if (matchDomain(de_smn_domains) || matchDomain(de_smn_custom_domains)) {
  if (matchDomain(de_smn_domains)) {
    let restricted = document.querySelector('div.restricted-area');
    if (restricted)
      restricted.classList.remove('restricted-area');
  } else {
    func_post = function () {
      if (mobile) {
        document.querySelectorAll('figure > img[loading="lazy"][style]').forEach(e => e.style = 'width: 95%;');
      }
    }
    let url = window.location.href;
    getArchive(url, 'div.mod-paywall, div.upscore-paywall-placeholder', '', 'article, div#article-container');
  }
  let ads = 'div.mod-paywall, div.Billboard, div[id*="board"], div.ad, div[id^="traffective-ad-"], div.glomex';
  hideDOMStyle(ads);
}

else if (matchDomain(de_ippen_media_domains) || matchDomain(['schwaebische-post.de']) || document.querySelector('header a[href^="https://www.ippen.media"]')) {
  let ads = 'div[class^="id-TBeepSlot-"], div[data-id-advertdfpconf]';
  hideDOMStyle(ads);
}

else if (matchDomain(de_vrm_domains) || matchDomain(de_vrm_custom_domains)) {
  func_post = function () {
    let article = document.querySelector(article_sel);
    if (article) {
      article.querySelectorAll('div > div[role="button"]').forEach(e => removeDOMElement(e.parentNode));
      let art_width = article.offsetWidth;
      let img_style = 'width: 95%; margin: 10px;';
      let galleries = article.querySelectorAll('div[elementname="gallery"]');
      for (let elem of galleries) {
        let gal_images = elem.querySelectorAll('img[src]');
        let container = document.createElement('div');
        container.style = 'width: ' + 0.7 * art_width + 'px; margin: auto;';
        for (item of gal_images) {
          let figure = makeFigure(item.src, item.alt, {style: img_style});
          container.appendChild(figure);
        }
        elem.parentNode.replaceChild(container, elem);
      }
      if (mobile) {
        let pictures = document.querySelectorAll('picture > img[style]');
        for (let elem of pictures) {
          elem.style = img_style;
          elem.parentNode.removeAttribute('style');
        }
      }
      let ads = article_sel + ' div:empty:not([class])';
      hideDOMStyle(ads, 2);
    }
  }
  let article_sel = 'article section';
  let url = window.location.href;
  window.setTimeout(function () {
    getArchive(url, 'div.--blurredContent', {rm_attrib: 'class'}, article_sel);
  }, 1000);
  let ads = 'div.adSlot, div.loadingBanner';
  hideDOMStyle(ads);
}

else
  csDone = true;

} // end csDone(Once)

ads_hide();
leaky_paywall_unhide();

} // end cs_default function

function breakText_headers(str) {
  str = breakText(str, true);
  // exceptions: names with alternating lower/uppercase (no general fix)
  let str_rep_arr = ['AstraZeneca', 'BaFin', 'BerlHG', 'BfArM', 'BilMoG', 'BioNTech', 'ChatGPT', 'DiGA', 'EuGH', 'FinTechRat', 'GlaxoSmithKline', 'IfSG', 'medRxiv', 'mmHg', 'OpenAI', 'PlosOne', 'StVO', 'TikTok'];
  let str_rep_split;
  let str_rep_src;
  for (let str_rep of str_rep_arr) {
    str_rep_split = str_rep.split(/([a-z]+)(?=[A-Z](?=[A-Za-z]+))/);
    str_rep_src = str_rep_split.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue + ((currentValue !== currentValue.toUpperCase()) ? '\n\n' : '');
      });
    if (str_rep_src.endsWith('\n\n'))
      str_rep_src = str_rep_src.slice(0, -2);
    str = str.replace(new RegExp(str_rep_src, "g"), str_rep);
  }
  str = str.replace(/De\n\n([A-Z])/g, "De$1");
  str = str.replace(/La\n\n([A-Z])/g, "La$1");
  str = str.replace(/Le\n\n([A-Z])/g, "Le$1");
  str = str.replace(/Mc\n\n([A-Z])/g, "Mc$1");
  return str;
}
