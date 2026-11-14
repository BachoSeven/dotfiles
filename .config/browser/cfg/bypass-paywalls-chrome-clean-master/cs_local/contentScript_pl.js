//"use strict";

cs_default = function (bg2csData = '') {

if (bg2csData && bg2csData.cs_param)
  cs_param = bg2csData.cs_param;

if (!(csDone || csDoneOnce)) {

if (window.location.hostname.endsWith('.bg')) {

if (matchDomain('capital.bg')) {
  let paywall = document.querySelector(cs_param.paywall_sel || 'section > article a[href^="/paywall_click/"], section[data-paywall-id]');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let img_main = document.querySelector('div.story--header picture > img[src]');
        let article = document.querySelector(cs_param.article_sel || 'div.story-content');
        if (json_text && article) {
          article.innerHTML = '';
          let article_new = document.createElement('p');
          let json_pars = parseHtmlEntities(json_text).replace(/\s{2,}/g, '\r\n\r\n').split(/[\[\]]{2}/);
          for (let elem of json_pars) {
            let par;
            if (!elem.match(/[\[\]]{2}/)) {
              if (elem.match(/img:\d+/)) {
                if (img_main) {
                  let img_new_id = elem.split('img:')[1];
                  if (img_new_id) {
                    par = document.createElement('img');
                    par.src = img_main.src.replace(/_\d+\./, '_' + img_new_id + '.').split('?')[0];
                    par.style = 'margin: 20px; width: 90%;';
                  }
                }
              } else if (!elem.match(/(embed|quote):\d+/)) {
                par = document.createElement('p');
                par.innerText = elem;
              }
            }
            if (par)
              article.appendChild(par);
          }
        }
      }
    }
  } else
    header_nofix('div.story-content > p', 'section > header > a[data-referral="Paywall"]');
  let ads = 'div.banner';
  hideDOMStyle(ads);
}

else if (matchDomain('dnevnik.bg')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.paywall-container');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      function addGST() {
        let url = window.location.href;
        let article = document.querySelector('div.story-body');
        if (article)
          article.firstChild.before(googleSearchToolLink(url));
      }
      let article_lock = document.querySelector('div.article-lock');
      if (article_lock) {
        let scripts = document.querySelectorAll('script:not([src], [type])');
        let json_script;
        let link_script;
        let script_start = 'self.__next_f.push([1,"';
        for (let script of scripts) {
          if (script.text.startsWith(script_start)) {
            if (!link_script && script.text.includes('significantLink\\":'))
              link_script = script;
            else if (!json_script && script.text.includes('story_content\\":'))
              json_script = script;
            if (json_script && link_script)
              break;
          }
        }
        if (json_script) {
          article_lock.classList.remove('article-lock');
          let banner = 'div.paywall-content';
          hideDOMStyle(banner);
          let img_main = document.querySelector('div.story-gallery-main figure > img[src]');
          let links;
          if (link_script)
            links = link_script.text.split('significantLink\\":[')[1].split('\\"],')[0].replace(/\\"/g, '').split(',');
          try {
            let json_pars_text = json_script.text.split('story_content\\":')[1].split('}]},')[0].replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/<br \/>/g, '') + '}]}';
            let json_pars = JSON.parse(json_pars_text);
            if (json_pars && json_pars.parsed && json_pars.parsed.length) {
              article_lock.innerHTML = '';
              if (json_pars.parsed.find(x => x.type && ['embed', 'gallery'].includes(x.type)))
                addGST();
              let parser = new DOMParser();
              for (let elem of json_pars.parsed) {
                let par;
                if (elem.value && !elem.value.match(/[\[\]]{2}/)) {
                  if (elem.type === 'img') {
                    if (img_main) {
                      let img_new_id = elem.value;
                      if (img_new_id) {
                        par = document.createElement('img');
                        par.src = img_main.src.replace(/_\d+\./, '_' + img_new_id + '.').split('?')[0];
                        par.style = 'margin: 20px; width: 90%;';
                      }
                    }
                  } else if (elem.type === 'storyid') {
                    if (links) {
                      let story_id = elem.value;
                      if (story_id) {
                        let story = links.find(x => x.includes(story_id + '_'));
                        if (story) {
                          par = document.createElement('a');
                          par.href = story;
                          par.innerText = story.split(story_id + '_')[1].replace(/_/g, ' ').replace('/', '');
                          par.className = 'story-related';
                          if (!matchUrlDomain(window.location.hostname, story))
                            par.target = '_blank';
                        }
                      }
                    }
                  } else if (elem.type && !['embed', 'gallery', 'quote'].includes(elem.type)) {
                    if (elem.value.match(/^\$\w{2}$/)) {
                      let par_script;
                      let filter = script_start + elem.value.slice(1) + ':';
                      for (let script of scripts) {
                        if (script.text.startsWith(filter)) {
                          par_script = script;
                          break;
                        }
                      }
                      if (par_script)
                        elem.value = par_script.text.split(filter)[1].split(/^\w{3,5},/)[1].split(/"\]\)$/)[0].replace(/\\u003c/g, '<').replace(/\\u003e/g, '>');
                    }
                    let doc = parser.parseFromString('<div role="paragraph">' + DOMPurify.sanitize(elem.value, dompurify_options) + '</div>', 'text/html');
                    par = doc.querySelector('div');
                  }
                  if (par)
                    article_lock.appendChild(par);
                }
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else
        addGST();
    }
  }, 1000);
  let ads = 'div[data-ad-page]';
  hideDOMStyle(ads);
}

else
  csDone = true;

} else if (window.location.hostname.endsWith('.cz')) {

if (matchDomain('denik.cz')) {
  let paywall = document.querySelector('div#js-subscriptionBox');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article_sel = 'div.article-content';
    let article = document.querySelector(article_sel);
    if (article) {
      func_post = function () {
        let div_hidden = document.querySelector('div.paywall');
        if (div_hidden)
          div_hidden.removeAttribute('class');
        let videos = document.querySelectorAll('video[id]:not([src])');
        for (let elem of videos) {
          elem.removeAttribute('class');
          let video_button = elem.parentNode.querySelector('button');
          removeDOMElement(video_button);
        }
      }
      let url = window.location.href;
      replaceDomElementExt(url, false, false, article_sel);
    }
  }
  let ads = 'div.leaderboard-top, div.outstream, div[class^="sticky-"], div[class*="wallpaper-"]';
  hideDOMStyle(ads);
}

else
  csDone = true;

} else if (window.location.hostname.endsWith('.hr')) {

if (matchDomain('telegram.hr')) {
  let audio_wrapper = document.querySelector('div.audio-wrapper');
  if (audio_wrapper) {
    let audio_disabled = audio_wrapper.querySelector('div.play-button-wrap > button.disabled');
    if (audio_disabled) {
      let audio_src_dom = audio_wrapper.querySelector('audio > source[src]');
      if (audio_src_dom) {
        let audio_new = document.createElement('audio');
        audio_new.src = audio_src_dom.src;
        audio_new.setAttribute('controls', '');
        audio_disabled.parentNode.parentNode.replaceChild(audio_new, audio_disabled.parentNode);
      }
    }
  }
  let ads = 'div.banner-slot, div#intext_midas';
  hideDOMStyle(ads);
}

else
  csDone = true;

} else if (window.location.hostname.endsWith('.pl') || matchDomain(['oko.press', 'parkiet.com', 'wyborcza.biz'])) {

var pl_ringier_domains = ['auto-swiat.pl', 'businessinsider.com.pl', 'forbes.pl', 'komputerswiat.pl', 'newsweek.pl', 'onet.pl'];

if (matchDomain('oko.press')) {
  let hidden_images = document.querySelectorAll('div.image-container > span > img[src^="data:image/"]');
  for (let img of hidden_images) {
    let noscript_img = img.parentNode.querySelector('noscript');
    if (noscript_img && noscript_img.innerText.includes('src="'))
      img.src = noscript_img.innerText.split('src="')[1].split('"')[0];
  }
}

else if (matchDomain('pb.pl')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.classList.remove('paywall');
    let article_hidden = paywall.querySelector('section.o-article-content');
    if (article_hidden)
      article_hidden.removeAttribute('class');
    let loader = document.querySelector('div.o-piano-template-loader-box');
    removeDOMElement(loader);
  }
}

else if (matchDomain(pl_ringier_domains)) {
  let premium = document.querySelector('div.contentPremium[style]');
  if (premium) {
    premium.removeAttribute('class');
    premium.removeAttribute('style');
    premium.parentNode.removeAttribute('class');
  }
  if (matchDomain('newsweek.pl')) {
    let audio_tts = document.querySelector('button.pw-ap__button[disabled]');
    if (audio_tts)
      audio_tts.removeAttribute('disabled');
    let podcast_locked = document.querySelector('div.embed__podcastPlayer.contentPremium-locked');
    if (podcast_locked)
      podcast_locked.classList.remove('contentPremium-locked');
    let podcast_video = document.querySelector('div.videoPremiumWrapper > div.embed__mainVideoWrapper');
    if (podcast_video) {
      podcast_video.removeAttribute('class');
      podcast_video.parentNode.removeAttribute('class');
    }
  }
  let ads = 'div.adPlaceholder , div[class^="Ad"][class*="Placeholder_"], div[data-placeholder-caption], div[data-run-module$=".floatingAd"], aside[data-ad-container], aside.adsContainer, [class^="pwAds"], .hide-for-paying, div.onet-ad, div.bottomBar, ad-default, ad-floating-group, aside.ods-ads__ad-space';
  hideDOMStyle(ads);
}

else if (matchDomain('polityka.pl')) {
  let paywall = document.querySelector('div.cg-article-salebox');
  if (paywall) {
    removeDOMElement(paywall);
    let elem_hidden = document.querySelectorAll('div.cg_article_meat > [style]');
    for (let elem of elem_hidden)
      elem.removeAttribute('style');
    let fade = document.querySelector('article.article_status-cut');
    if (fade)
      fade.classList.remove('article_status-cut');
  }
}

else if (matchDomain(['rp.pl', 'parkiet.com'])) {
  let paywall = document.querySelector('div.paywallComp');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article--content');
    if (article) {
      let url = window.location.href;
      article.firstChild.before(googleSearchToolLink(url));
    }
  }
}

else if (matchDomain(['wyborcza.biz', 'wyborcza.pl', 'wysokieobcasy.pl', 'magazyn-kuchnia.pl'])) {
  func_post = function () {
    let block_quotes = document.querySelectorAll('blockquote > a[href]');
    for (let elem of block_quotes) {
      if (!elem.innerText.trim())
        elem.innerText = elem.href;
    }
    let empty_spans = document.querySelectorAll('figure > a > span:empty');
    removeDOMElement(...empty_spans);
    let ads = 'div[style^="min-height:"]';
    hideDOMStyle(ads, 2);
  }
  let url = window.location.href;
  let paywall_sel = 'div.article--content-fadeout';
  let paywall = document.querySelector(paywall_sel);
  let article_sel = 'div.container[class*="pt"]';
  if (paywall) {
    let article = document.querySelector(article_sel);
    if (article)
      article.before(googleSearchToolLink(url));
    getArchive(url, paywall_sel, {rm_attrib: 'class'}, article_sel, '', 'div.body > div:not([style*="background-color:"]):not([old-position]):not([name]):not([id])');
  }
  let ads = 'div[id^="adUnit"], div[id^="ads-"]';
  hideDOMStyle(ads);
}

else
  csDone = true;

} else if (window.location.hostname.endsWith('.ua')) {

if (matchDomain('forbes.ua')) {
  let paywall = document.querySelector('div.js-closed-part');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = parseHtmlEntities(json.articleBody).replace(/\n/g, "$&\r\n");
        let article = document.querySelector('div.c-post-text');
        if (json_text && article)
          article.innerText = json_text;
      }
    }
  }
}

else if (matchDomain('nv.ua')) {
  if (!window.location.pathname.includes('/amp/')) {
    amp_redirect('div[id^="media_paywall"]');
  } else {
    let paywall = document.querySelector('div.paywall-area');
    if (paywall) {
      paywall.removeAttribute('class');
      let subscr = paywall.querySelector('div.make-subscription');
      removeDOMElement(subscr);
    }
    let article = document.querySelector('div.article__content');
    if (article)
      article.removeAttribute('class');
  }
}

else
  csDone = true;
}

} // end csDone(Once)

ads_hide();
leaky_paywall_unhide();

} // end cs_default function
