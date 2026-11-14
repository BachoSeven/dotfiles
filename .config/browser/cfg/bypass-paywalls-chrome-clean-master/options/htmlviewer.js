
if (window.location.href.startsWith('https://codebeautify.org/htmlviewer')) {
  let htmlviewer = document.querySelector('head > link[rel="canonical"][href="https://codebeautify.org/htmlviewer"]');
  if (!htmlviewer) {
    let ads = 'div.OUTBRAIN, div[id^="taboola-"], div.ad-container, div[class*="-ad-container"], div[class*="_ad-container"], div.arc_ad, div[id^="adv-"], div[class^="ad_"], div[class^="advert"], aside.ad, div[id^="adUnit"], div[id^="ads-"]';
    hideDOMStyle(ads, 10);
    let cookie_consent = 'div#didomi-host, div#onetrust-consent-sdk, div[id^="sp_message_container"], div#CybotCookiebotDialog, div#usercentrics-root, div.cmp-root-container, div#cmp-modal, div[role="dialog"], div.cookiewall, div#klaro';
    hideDOMStyle(cookie_consent, 11);
    let cookie_consent_clear = document.querySelectorAll('aside#usercentrics-cmp-ui');
    for (let elem of cookie_consent_clear)
      elem.remove();
    let cybot_fade = document.querySelector('div#CybotCookiebotDialogBodyUnderlay');
    if (cybot_fade)
      cybot_fade.remove();
    let html_noscroll = ['cmp-modal-open', 'sp-message-open'];
    for (let elem of html_noscroll) {
      let noscroll = document.querySelector('html[class~="' + elem + '"]');
      if (noscroll)
        noscroll.classList.remove(elem);
    }
    let body_noscroll = ['didomi-popup-open', 'no-scroll', 'oneTrustMobile', 'overflowHidden', 'showFirstLayer'];
    for (let elem of body_noscroll) {
      let noscroll = document.querySelector('body[class~="' + elem + '"]');
      if (noscroll)
        noscroll.classList.remove(elem);
    }
    let overflow_hidden = document.querySelector('body[style*="overflow: hidden;"]');
    if (overflow_hidden)
      overflow_hidden.style.overflow = 'auto';

    unhideDataImages();
    let hide;
    let canonical = document.querySelector('head > link[rel="canonical"][href^="http"], head > meta[property="og:url"][content^="http"]');
    if (canonical) {
      let canonical_url = canonical.href || canonical.content;
      let hostname = urlHost(canonical_url);
      correctLinks(hostname);
      unhideHostImages(hostname);
	  
      if (hostname.endsWith('.be')) {
        if (matchUrlDomain(['gva.be', 'hbvl.be', 'nieuwsblad.be', 'standaard.be'], canonical_url)) {
          hide = 'div.mh-ad-label, section[data-theme-sponsored-content], div[data-pym-src]';
        } else if (matchUrlDomain(['lecho.be', 'tijd.be'], canonical_url)) {
          let charts = document.querySelectorAll('div.c-blancoinset');
          for (let chart of charts) {
            if (chart.innerHTML.includes('src="https://datawrapper.dwcdn.net/')) {
              let iframe = document.createElement('iframe');
              iframe.src = chart.innerHTML.split('src="')[1].split('"')[0];
              iframe.style.width = '100%';
              iframe.style.margin = '20px 0px';
              iframe.style.border = 'none';
              chart.parentNode.replaceChild(iframe, chart);
            }
          }
          hide = 'div.sticky-sharebuttons, div.next-best-offer';
        }
      } else if (hostname.match(/\.(de|at|ch)$/) || matchUrlDomain(['fashionmagazine.it', 'foodservice24.pl', 'handelextra.pl', 'horizont.net', 'lebensmittelzeitung.net', 'mmponline.pl', 'textiletechnology.net'], canonical_url)) {
        if (matchUrlDomain('aachener-zeitung.de', canonical_url)) {
          hide = 'div.mh-ad-label, section[data-chameleon-subtheme="sponsored-content"], div[class^="storyblock-list_"]';
        } else if (matchUrlDomain(['allgaeuer-zeitung.de', 'augsburger-allgemeine.de', 'mainpost.de', 'suedkurier.de'], canonical_url)) {
          let videos = document.querySelectorAll('div.externalContentBox');
          for (let elem of videos) {
            let video_src_dom = elem.querySelector('turbo-source[src$=".mp4"]');
            if (video_src_dom) {
              let video_new = document.createElement('video');
              video_new.src = video_src_dom.getAttribute('src');
              video_new.setAttribute('controls', '');
              video_new.style = 'width: 100%; margin: 20px 0px;';
              elem.parentNode.replaceChild(video_new, elem);
            }
          }
          let flourish_embeds = document.querySelectorAll('div.flourish-embed[data-url]');
          for (let elem of flourish_embeds) {
            let embed_link = document.createElement('a');
            embed_link.href = embed_link.innerText = elem.getAttribute('data-url');
            embed_link.target = '_blank';
            elem.before(embed_link);
          }
          hide = 'div.pt_onlinestory';
        } else if (matchUrlDomain('die-tagespost.de', canonical_url)) {
          hide = 'section#footer-popup';
        } else if (matchUrlDomain('fraenkischertag.de', canonical_url)) {
          hide = 'div.art-detail-bottom-ad, div.newsletter-widget';
        } else if (matchUrlDomain(['ga.de', 'rp-online.de', 'saarbruecker-zeitung.de', 'volksfreund.de'], canonical_url)) {
          hide = 'aside[data-html-glomex], div[data-cy="video-glomex-player"]';
        } else if (matchUrlDomain('idowa.de', canonical_url)) {
          hide = 'div.ad';
        } else if (matchUrlDomain('golem.de', canonical_url)) {
          let galleries = document.querySelectorAll('div.go-gallery');
          if (galleries.length) {
            let act_style = 'margin: 20px 0px';
            let gal_items = galleries[0].querySelectorAll('div.go-gallery__item');
            if (gal_items.length > galleries.length) {
              let act_index_array = [];
              document.querySelectorAll('div.go-gallery__item[data-active="true"][data-index]').forEach(e => act_index_array.push(e.getAttribute('data-index')));
              act_index_array.push(gal_items.length)
              let n = 0;
              for (let elem of galleries) {
                let wrapper = elem.querySelector('div.go-gallery__wrapper');
                if (wrapper)
                  wrapper.removeAttribute('class');
                let active_item = elem.querySelector('div.go-gallery__item[data-active="true"][data-index]');
                if (active_item) {
                  active_item.style = act_style;
                  let act_nr = act_index_array[n + 1] - act_index_array[n] - 1;
                  if (act_nr) {
                    for (let i = 0; i < act_nr; i++) {
                      if (active_item.nextSibling) {
                        active_item = active_item.nextSibling;
                        active_item.setAttribute('data-active', true);
                        active_item.style = act_style;
                      }
                    }
                  }
                }
                n++;
              }
            } else
              document.querySelectorAll('div.go-gallery__item[data-active="true"]').forEach(e => e.style = act_style);
          }
          addStyle('p.go-golem-plus {margin-block: 18px !important;}');
          hide = 'div.go-gallery__item[data-active="false"], button.go-gallery__btn, div.go-ad-slot';
        } else if (matchUrlDomain('lkz.de', canonical_url)) {
          let article_hidden = document.querySelector('div#main');
          if (article_hidden)
            article_hidden.removeAttribute('id');
          hide = 'div.nfy-element-ad, div.error-screen';
        } else if (matchUrlDomain('main-echo.de', canonical_url)) {
          document.querySelectorAll('[hidden]').forEach(e => e.removeAttribute('hidden'));
          hide = 'div[id^="traffective-ad-"]';
        } else if (matchUrlDomain('nn.de', canonical_url)) {
          hide = 'div.article__ad__container, div[class] > img:not([alt])';
        } else if (matchUrlDomain('nordsee-zeitung.de', canonical_url)) {
          hide = 'div[id^="traffective-ad-Billboard"]';
        } else if (matchUrlDomain(['noz.de', 'shz.de'], canonical_url)) {
          let foldable = document.querySelector('div.foldable-content');
          if (foldable)
            foldable.classList.remove('foldable-content');
          let videos = document.querySelectorAll('div.yt_container');
          for (let video of videos) {
            if (video.innerHTML.includes('<iframe src="')) {
              let video_link = document.createElement('a');
              video_link.href = video_link.innerText = video.innerHTML.split('<iframe src="')[1].split('"')[0].split('?')[0].replace('/embed/', '/watch?v=');
              video_link.target = '_blank';
              video_link.style = 'width: 100%;';
              video.parentNode.replaceChild(video_link, video);
            }
          }
          hide = 'div.msn-ads';
        } else if (matchUrlDomain('sn.at', canonical_url)) {
          hide = 'div.adbox';
        } else if (matchUrlDomain('tagesspiegel.de', canonical_url)) {
          let host_origin = 'https://' + hostname;
          if (matchUrlDomain('interaktiv.tagesspiegel.de', canonical_url)) {
            document.querySelectorAll('img.tslr-lazy[data-src], img.tslr-lazy[data-src-l]').forEach(e => e.src = host_origin + (e.getAttribute('data-src-l') || e.getAttribute('data-src')).replace(/[\s\r\n]/g, ''));
            let video_intro = document.querySelector('video.tslr-lazy-v-video[src^="/"]');
            if (video_intro) {
              video_intro.src = host_origin + video_intro.getAttribute('src');
              video_intro.removeAttribute('class');
            }
          } else {
            let videos = document.querySelectorAll('div > div.jwplayer');
            for (let elem of videos) {
              let video_meta_dom = elem.parentNode.querySelector('meta[name="twitter:player:stream"][content]');
              if (video_meta_dom) {
                let video_new = document.createElement('video');
                video_new.src = video_meta_dom.content;
                video_new.setAttribute('controls', '');
                video_new.style = 'width: 100%';
                elem.parentNode.parentNode.replaceChild(video_new, elem.parentNode);
              }
            }
          }
          let charts = document.querySelectorAll('div.tslr-figure-graphic__content, div[data-input-id]');
          for (let elem of charts) {
            let elem_html = elem.innerHTML;
            if (elem_html.includes('<iframe'))
              elem_html = elem_html.split('<iframe')[1].split('>')[0];
            let elem_new = document.createElement('iframe');
            let elem_new_src;
            if (elem_html.includes(' src="https://datawrapper.dwcdn.net/')) {
              elem_new_src = elem_html.split(' src="')[1].split('"')[0].replace(/\w+\.png$/, '');
              elem_new.style = 'width: 100%; border: none;';
              elem_new.style.height = elem_html.includes('; height:') ? elem_html.split('; height:')[1].split(';')[0] : '600px';
            } else if (elem_html.includes(' data-src-m="')) {
              elem_new = document.createElement('img');
              elem_new_src = host_origin + elem_html.split(' data-src-m="')[1].split('"')[0].replace(/[\r\n\s]/g, '');
              elem_new.style = 'width: 100%;';
            }
            if (elem_new_src) {
              elem_new.src = elem_new_src;
              elem.parentNode.replaceChild(elem_new, elem);
            }
          }
          hide = 'div.iqdcontainer';
        } else if (matchUrlDomain('volksstimme.de', canonical_url)) {
          hide = 'div.fp-ad-wrapper, div.fp-ad-label, div[id*="-article_"], div.fp-main-header__weather-widget, div.fp-main-header__menu-search-wrapper, div.fp-header__sticky a[href="https://www.sao.de"]';
        } else if (matchUrlDomain('wissenschaft.de', canonical_url)) {
          hide = 'div#lightbox';
        } else if (matchUrlDomain('wiwo.de', canonical_url)) {
          document.querySelectorAll('app-iframe > iframe[style]').forEach(e => e.style.height = '500px');
        } else if (matchUrlDomain('zeit.de', canonical_url)) {
          let animated_video = document.querySelector('header picture.js-animated-video[hidden]');
          if (animated_video) {
            animated_video.removeAttribute('hidden');
            let video_container = animated_video.parentNode.querySelector('picture + div');
            if (video_container)
              video_container.remove();
          }
          let embed_wrappers = document.querySelectorAll('div.embed-wrapper > div.embed');
          for (let elem of embed_wrappers) {
            let html = elem.innerHTML;
            if (html.includes('class="embed__iframe"') && html.includes('src="')) {
              let iframe = document.createElement('iframe');
              iframe.src = html.split('src="')[1].split('"')[0];
              iframe.style = 'width: 100%; height: 500px; border: none;';
              elem.parentNode.replaceChild(iframe, elem);
              iframe.parentNode.style = 'margin: 10px 150px;';
            }
          }
          hide = 'div[id^="iqadtile"], .iqdcontainer';
        } else if (matchUrlDomain('zvw.de', canonical_url)) {
          hide = '.nfy-banner';
        } else if (document.querySelector('head > meta[name="tdm-policy"][content^="https://www.dfv.de"]')) {
          let audio_tts = document.querySelector('div#mp3player[data-src]');
          if (audio_tts) {
            let audio = document.createElement('audio');
            audio.src = audio_tts.getAttribute('data-src');
            audio.setAttribute('controls', '');
            audio.style = 'width: 100%;';
            audio_tts.parentNode.replaceChild(audio, audio_tts);
          }
          hide = 'div.Ad, div.PageArticle_aside';
        }
      } else if (hostname.endsWith('.fi')) {
        if (matchUrlDomain(['aamulehti.fi', 'hs.fi', 'is.fi'], canonical_url)) {
          hide = 'header, footer, div.article-actions, div.skip-link, article.list, iframe[data-testid="iframe-embed"]';
          let image_containers = document.querySelectorAll('div.aspect-ratio-container');
          for (let elem of image_containers)
            elem.classList.remove('aspect-ratio-container');
        }
      } else if (hostname.endsWith('.fr') || matchDomain(['africaintelligence.com', 'glitz.paris', 'intelligenceonline.com'], hostname)) {
        if (matchDomain('humanite.fr', hostname)) {
          hide = 'tab-bar-component, div#form_don';
        } else if (matchDomain(['africaintelligence.com', 'africaintelligence.fr', 'glitz.paris', 'intelligenceonline.com', 'intelligenceonline.fr', 'lalettre.fr'], hostname)) {
          if (matchDomain(['glitz.paris', 'lalettre.fr'], hostname)) {
            let hostname_alt = 'www.intelligenceonline.fr';
            document.querySelectorAll('head > link[rel*="stylesheet"]').forEach(e => e.href = e.href.replace(hostname, hostname_alt));
            document.querySelectorAll('img[src^="https://' + hostname + '"]:not([src*="/logo-"]').forEach(e => e.src = e.src.replace(hostname, hostname_alt).replace(/\/(en|fr)\//, '/'));
          }
          let details_hide = document.querySelector('div.article-details__collapse');
          if (details_hide)
            details_hide.removeAttribute('class');
        }
      } else if (hostname.endsWith('.no')) {
        if (matchUrlDomain('aftenposten.no', canonical_url)) {
          let audio_tts = document.querySelector('button[aria-label="lytt"]');
          if (audio_tts) {
            let scripts = document.querySelectorAll('script:not([src], [type])');
            let json_script;
            for (let script of scripts) {
              if (script.text.match(/^window\.__PRELOADED_STATE__\s?=\s?/)) {
                json_script = script;
                break;
              }
            }
            if (json_script && json_script.text.includes('"podcast_media":"')) {
              let audio_new = document.createElement('audio');
              audio_new.src = json_script.text.split('"podcast_media":"')[1].split('"')[0].replace(/\\u002F/g, '/');
              audio_new.setAttribute('controls', '');
              audio_tts.parentNode.replaceChild(audio_new, audio_tts);
            }
          }
          let summary = document.querySelector('div#summary-details[class]');
          if (summary)
            summary.removeAttribute('class');
          let img_intro_background = document.querySelector('div.dd-intro > div.dd-intro__background');
          if (img_intro_background)
            img_intro_background.classList.remove('dd-intro__background');
          for (let n = 0; n < 10; n++) {
            window.setTimeout(function () {
              let noscroll = document.querySelector('html.sp-message-open');
              if (noscroll)
                noscroll.removeAttribute('class');
            }, n * 1000);
          }
          hide = 'div[class^="advertory-"] , div#data-controller-stripe, button[aria-controls="summary-details"]';
        }
      } else if (hostname.endsWith('.se')) {
        if (matchUrlDomain('aftonbladet.se', canonical_url)) {
          let video = document.querySelector('div[class^="inlinevideo-root_"]');
          if (video) {
            let json_script = document.querySelector('script[type="application/ld+json"]');
            if (json_script) {
              try {
                let json = JSON.parse(json_script.text);
                if (json[1] && json[1].video && json[1].video.contentURL) {
                  let video_new = document.createElement('video');
                  video_new.setAttribute('controls', '');
                  video_new.src = json[1].video.contentURL;
                  video_new.style = 'width: 100%;';
                  video.parentNode.replaceChild(video_new, video);
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
        } else if (matchUrlDomain('corren.se', canonical_url)) {
          hide = '.ad-hidden';
        } else if (matchUrlDomain('di.se', canonical_url)) {
          let charts = document.querySelectorAll('div.exp-sme-widget--datawrapper');
          for (let elem of charts) {
            if (elem.innerHTML.includes(' src="')) {
              let iframe = document.createElement('iframe');
              iframe.src = elem.innerHTML.split(' src="')[1].split('"')[0];
              iframe.style = 'width: 100%;';
              elem.parentNode.replaceChild(iframe, elem);
            }
          }
        } else if (matchUrlDomain('dn.se', canonical_url)) {
          let readmore = document.querySelector('lcl-collapse-container[style]');
          if (readmore) {
            readmore.removeAttribute('style');
            let bar = readmore.querySelector('div.collapsed-container__read-more-bar');
            bar.remove();
          }
          document.querySelectorAll('div.slideshow__items').forEach(e => e.removeAttribute('class'));
          hide = 'div.bad';
        } else if (matchUrlDomain('gp.se', canonical_url)) {
          let ref_headers = document.querySelectorAll('div#ref-header-publisher');
          if (ref_headers.length > 1)
            ref_headers[0].remove();
          let swipers = document.querySelectorAll('div[data-testid="article-body_image-gallery"] > div.swiper');
          for (let swiper of swipers) {
            let imgs = swiper.querySelectorAll('div.swiper-slide:not(.swiper-slide-duplicate) > img[src]');
            for (let img of imgs) {
              let img_new = document.createElement('img');
              img_new.src = img.src;
              img_new.style = 'width: 75%; margin: 20px;';
              swiper.after(img_new);
            }
            swiper.remove();
          }
          let hidden_images = document.querySelectorAll('img[srcset]');
          for (let elem of hidden_images) {
            elem.removeAttribute('srcset');
            if (elem.width > 200) {
              elem.style = 'width: 75%';
              elem.removeAttribute('height');
            }
          }
          let author_img = document.querySelector('img[src*="/images/byline/"]');
          if (author_img)
            author_img.style = 'width: 100px; height: 100px;';
          hide = 'div:has(> nav), button, footer, div.header-top, div[data-testid^="header_"], svg[data-testid="svg-wrapper"], a.skip-to-content, a[data-testid="article-link-read-more"] img';
        }
      } else if (hostname.endsWith('.uk')) {
        if (matchUrlDomain('artsprofessional.co.uk', canonical_url)) {
          let body = document.querySelector('body');
          if (body)
            body.style.margin = '20px';
          hide = 'div.UserBar, div.ap-in-content-news';
        } else if (matchUrlDomain('investorschronicle.co.uk', canonical_url)) {
          hide = 'div#specialist__renderer--header';
        }
      } else {
        if (matchUrlDomain(['businesslive.co.za', 'timeslive.co.za'], canonical_url)) {
          hide = 'div#gdpr-overlay';
        } else if (matchUrlDomain('dnevnik.bg', canonical_url)) {
          document.querySelectorAll('div.swiper-wrapper').forEach(e => e.removeAttribute('class'));
          document.querySelectorAll('div.swiper > div[style^="transition-duration"]').forEach(e => e.removeAttribute('style'));
          hide = 'div.adslot, div[id^="div-gpt-ad-"]';
        } else if (matchUrlDomain('faz.net', canonical_url)) {
          hide = 'div.iqdcontainer, div[data-fsw="market"], section[data-external-selector="job-recommendations"]';
        } else if (matchUrlDomain(['ibj.com', 'insideindianabusiness.com', 'theindianalawyer.com'], canonical_url)) {
          hide = 'header#masthead, header.site-header, nav, footer, aside#secondary, div.article-audio, div.article-left-rail, div.promo-container, div.toolbar';
          document.querySelectorAll('article p').forEach(e => e.removeAttribute('style'));
        } else if (matchUrlDomain('law.com', canonical_url)) {
          hide = 'div.paywall-container';
        } else if (matchUrlDomain('medscape.com', canonical_url)) {
          if (canonical_url.includes('.com/slideshow/')) {
            let slide_container = document.querySelector('div.slide-container > div.slick-list[style]');
            if (slide_container) {
              slide_container.removeAttribute('style');
              slide_container.querySelectorAll('div[data-slick-index][class]').forEach(e => e.removeAttribute('class'));
              slide_container.querySelectorAll('img.lazy-load[data-src]').forEach(e => e.src = e.getAttribute('data-src'));
            }
          }
          hide = 'div.text-ad-unit, div[id^="ads-"], div.adswrapper';
        } else if (matchUrlDomain('nouvelobs.com', canonical_url)) {
          hide = 'div[class^="paywall"], div.dfp-slot';
        } else if (matchUrlDomain('nypost.com', canonical_url)) {
          let videos = document.querySelectorAll('figure > div.wp-block-embed__wrapper');
          for (let elem of videos) {
            if (elem.innerHTML.includes(' src="')) {
              let video_new = document.createElement('iframe');
              video_new.src = elem.innerHTML.split(' src="')[1].split('"')[0].split('?')[0];
              video_new.style = 'width: 100%; aspect-ratio: 16 / 9; border: none';
              elem.parentNode.parentNode.replaceChild(video_new, elem.parentNode);
            }
          }
        } else if (matchUrlDomain('politiken.dk', canonical_url)) {
          hide = 'aside.z-30';
          let factboxes = document.querySelectorAll('div.js-factbox-bodytext-clamped');
          for (let elem of factboxes) {
            elem.style['max-height'] = 'none';
            let buttons = 'button, div:empty';
            hideDOMStyle(buttons, 2);
          }
        } else if (matchUrlDomain('repubblica.it', canonical_url)) {
          hide = 'div.cookiewall, div[data-src^="//box.kataweb.it/"]';
        } else if (matchUrlDomain('telecompaper.com', canonical_url)) {
          hide = 'div[role="dialog"]';
        } else if (matchUrlDomain('the-past.com', canonical_url)) {
          hide = 'div.ad-break';
        } else if (matchUrlDomain('thetimes.com', canonical_url)) {
          let charts = document.querySelectorAll('times-datawrapper[embed-code]');
          for (let elem of charts) {
            let div = document.createElement('div');
            let iframe = document.createElement('iframe');
            iframe.src = decodeURIComponent(elem.getAttribute('embed-code'));
            iframe.style = 'width: 80%; height: 400px; border: none;';
            div.appendChild(iframe);
            elem.parentNode.replaceChild(div, elem);
          }
          document.querySelectorAll('div.opta-widget.hide-details').forEach(e => e.classList.remove('hide-details'));
          hide = 'div.ad-header, div.inline-article-ad, div.article-promoted-content';
        }
      }
    }
    if (hide)
      hideDOMStyle(hide);
  }
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

function correctLinks(hostname) {
  let links = document.querySelectorAll('a[href^="/"], link[rel*="stylesheet"][href^="/"], link[rel*="stylesheet"][href^="../"]');
  for (let elem of links) {
    if (typeof elem.href === 'string')
      elem.href = elem.href.replace('codebeautify.org', hostname);
  }
}

function unhideHostImages(hostname) {
  let hidden_images = document.querySelectorAll('img[src^="/"]');
  for (let elem of hidden_images) {
    elem.src = elem.src.replace('codebeautify.org', hostname);
    elem.removeAttribute('srcset');
    let sources = elem.parentNode.querySelectorAll('source[srcset]');
    for (let source of sources)
      source.removeAttribute('srcset');
  }
}

function unhideDataImages() {
  let hidden_images = document.querySelectorAll('img[src^="data:image/"]');
  for (let elem of hidden_images) {
    if (elem.getAttribute('data-src'))
      elem.src = elem.getAttribute('data-src');
    else if (elem.parentNode) {
      let source = elem.parentNode.querySelector('source[data-srcset]');
      if (source) {
        elem.src = source.getAttribute('data-srcset').split(/[\?\s]/)[0];
      }
    }
  }
}
