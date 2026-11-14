/*******************************************************************************

    AdNauseam - Fight back against advertising surveillance.
    Copyright (C) 2014-2024 Daniel C. Howe

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/dhowe/AdNauseam
*/

(function () {

  'use strict';

  if (window.location === null || typeof vAPI !== 'object') {
    //console.log('textads.js > window.location===null || vAPI not found');
    return;
  }

  if ( vAPI.textAdParser ) {
      //console.log('textads.js > already injected');
      return;
  }

  vAPI.textAdParser = (function () {

    /***************************** Functions ******************************/

    const bingText = function (dom) {

      const ads = [], divs = $find(dom,'div.sb_add');

      for (let i = 0; i < divs.length; i++) {
        let title;
        let site;
        let text;
        const idiv = divs[i];

        title = $find(idiv, 'h2 a');
        site = $find(idiv, 'div.b_attribution cite');
        text = $find(idiv, 'div.b_caption p');

        if (text.length && site.length && title.length) {

          const ad = vAPI.adParser.createAd('bing', $attr(title, 'href'), {
            title: $text(title),
            text: $text(text),
            site: $text(site)
          });
          ads.push(ad);

        } else {
          console.warn('[TEXTADS] bingTextHandler.fail: ', divs[i], title, site, text); //title, site, text);
        }
      }

      return ads;
    };

    const yahooText = function (e) {

      const ads = [], divs = $find(e, 'div.dd .layoutMiddle');

      for (let i = 0; i < divs.length; i++) {
        let title;
        let site;
        let text;
        const idiv = $find(divs[i], 'div.compTitle');

        if (idiv.length) {
          title = $find(idiv[0], 'h3.title a');
          site = $find(idiv[0], 'div > a');
        }

        text = $find(divs[i], 'div.compText a');

        if (text.length && site.length && title.length) {

          const ad = vAPI.adParser.createAd('yahoo', $attr(title, 'href'), {
            title: $text(title),
            text: $text(text),
            site: $text(site)
          });

          ads.push(ad);

        } else {

          console.warn('[TEXTADS] yahooTextHandler.fail: ', divs[i]); //title, site, text);
        }
      }

      return ads;
    };

    const aolText = function (div) {
      let ad;
      const title = $find(div, '.title span');
      const text = $find(div, '.desc span');
      const site = $find(div, '.durl span');
      const target = $find(div, '.title a');

      if (text.length && site.length && title.length && target.length) {

        ad = vAPI.adParser.createAd('aol', $attr(target, 'href'), {
          title: $text(title),
          text: $text(text),
          site: $text(site)
        });

      } else {

        console.warn('[TEXTADS] aolTextHandler.fail: ', text, site, document.title, document.URL);
      }

      return [ad];
    };

    const askText = function (dom) {
      const ads = [], divs = $find(dom, 'div[id^="e"][data-bg=true]:not(.wtaBubble)');

        for (let i = 0; i < divs.length; i++) {
          let title;
          let site;
          let text;
          const idiv = divs[i];

          title = $find(idiv, 'div:nth-child(2):not(.wtaBubble)');
          site = $find(idiv, 'div:nth-child(1) a');
          text = $find(idiv, 'span:nth-child(3)');

          if (text.length && site.length && title.length) {

            const ad = vAPI.adParser.createAd('ask', $attr(title, 'href'), {
              title: $text(title),
              text: $text(text),
              site: $text(site)
            });

            ads.push(ad);

          } else {

            console.warn('[TEXTADS] askTextHandler.fail: ', divs[i], title.length, site.length, text.length); //title, site, text);
          }
        }

      return ads;
    };

    const googleText = function (div) {
      let ad;

      var title = div.querySelector('[role="heading"] span').innerText;
      // element has no class, attribute, so it needs to be fetched like this 
      var text = ""
      var textDiv = null

      var textElements = [...div.querySelectorAll('div:not([class])')].filter(e => e.innerText.length > 15)
      var textElement = text = textElements[textElements.length-1]
      
      /*
      if (div.childNodes[0]?.childNodes[1]?.className == "") {
        textDiv = div?.childNodes[0]?.childNodes[1]
      } else {
        textDiv = div?.childNodes[0]?.childNodes[2]
      }
      var textElement = textDiv?.childNodes[0]?.childNodes[0]?.childNodes[0]

      if (typeof textElement == 'undefined') {
        console.warn('[ADN] textElement undefined', div.outerHTML)
        textElement = div.querySelector('div[style*="webkit-line-clamp"] div')
      }
      */

      text = textElement ? (textElement.innerText || textElement.wholeText) : ""

      var site = div.querySelector('[data-dtld]')?.getAttribute('data-dtld')
      var href = div.querySelector('[data-rw]')?.getAttribute('href') 

      if (text?.length && site?.length && title?.length && href?.length) {
        ad = vAPI.adParser.createAd('google', href, {
          title: title,
          text: text,
          site: site
        });

      } else {
        console.warn('[TEXTADS] googleTextHandler.fail: ', title, text, site);
      }

      return [ad];
    };

    const ddgText = function (div) {
      let ad;
      const title = $find(div, 'h2 > a[data-testid]');
      const text = $find(div, 'div > div > a:not([data-testid])');
      const site = $find(div, 'a[data-testid*=result-extras-url-link');

      if (text.length && site.length && title.length) {

        ad = vAPI.adParser.createAd('google', $attr(title, 'href'), {
          title: $text(title),
          text: $text(text),
          site: $attr(site, 'href')
        });

      } else {

        console.warn('[TEXTADS] ddgTextHandler.fail: ', text, site, title, div);
      }

      return [ad];
    };

    const baiduText = function (div) {

      if(!div.id.match(/\d{4}/g)) return;

      const sections = div.childNodes;
      let ad, title, text, site;

      if(sections.length == 3){
          title = $find(sections[0], 'h3 a'),
          text = $find(sections[1], 'a[hidefocus="hidefocus"]'),
          site = $find(sections[2], 'a > span');
      }
      else
        return;

      if (text.length && site.length && title.length) {

        ad = vAPI.adParser.createAd('baidu', $attr(title, 'href'), {
          title: $text(title),
          text: $text(text),
          site: $text(site)
        });

      } else {
        console.warn('[TEXTADS] baiduTextHandler.fail: ', text, site, document.URL, document.title);
      }

      return [ad];
    };

    const googleAdsText = function (div) {

       const ads = [], divs = $find(div, 'ul > li');

      for (let i = 0; i < divs.length; i++) {
        let title, subs, site, text;

          title = $find(divs[i], 'h4 > a');
          subs = $find(divs[i], 'p');
          if(subs.length > 1){
          text = [subs[0]];
          site = $find(subs[1], 'a');
          }

        if (text.length && site.length && title.length) {

          const ad = vAPI.adParser.createAd('google', $attr(title, 'href'), {
            title: $text(title),
            text: $text(text),
            site: $text(site)
          });
          console.log("[TEXTAD]",ad);

          ads.push(ad);

        } else {

          console.warn('[TEXTADS] googleAdsTextHandler.fail: ', divs[i]); //title, site, text);
        }
      }

      return ads;
    };

    const yandexAdsText = function (div) {
      var ads = []

      if (div == null || div == undefined) return
      
      const titleElement = div.querySelector(".OrganicTitleContentSpan.organic__title")
      const linkElement = div.querySelector(".OrganicTitle-Link")
      const textElement = div.querySelector(".OrganicText.organic__text")
      const siteElement = div.querySelector(".Link_theme_outer.Path-Item.link b")

      if (titleElement && linkElement && textElement && siteElement) {
        var link = linkElement.href
        var site = $text(siteElement)
        var title = $text(titleElement)
        var text = $text(textElement)

        const ad = vAPI.adParser.createAd('yandex', link, {
          site: site,
          title: title,
          text: text
        });

        console.log("[TEXTAD]", ad);

        ads.push(ad);
      } else {

        console.warn('[TEXTADS] yandexAdsTextHandler.fail: ', divs[i]); //title, site, text);
      }

      return ads
    }

    const startpageAdsText = function (div) {

      var ads = []

      if (div == null || div == undefined) return
      
      const titleElement = div.querySelector(".div.si40")
      const linkElement = div.querySelector(".a.si28")
      const textElement = div.querySelector(".span.si29 ")
      const siteElement = div.querySelector(".a.si28")

      if (titleElement && linkElement && textElement && siteElement) {
        var link = linkElement.href
        var site = $text(siteElement)
        var title = $text(titleElement)
        var text = $text(textElement)

        const ad = vAPI.adParser.createAd('startpage', link, {
          site: site,
          title: title,
          text: text
        });

        console.log("[TEXTAD]", ad);

        ads.push(ad);
      } else {

        console.warn('[TEXTADS] startpageAdsTextHandler.fail: ', divs[i]); //title, site, text);
      }
      return ads
    }

    var youtubeAds = function (div) {

      var ad, target, src,
          banner = $find(div, '#banner'),
          title = $find(div,'#title');

     src = div.style.cssText.match(/url\((.*?)\)/)
     if (src && src.length > 1) {
      src = src[1]
     } else {
      return
    }
     var parsed = src.replace(/\\/g,"");

     if (banner.length) {
       target = $attr(banner, 'href'); //relative url
       var proto = window.location.protocol || 'http';
       target = vAPI.adParser.normalizeUrl(proto, "youtube.com", target);
     }

      if (title.length && target.length && parsed.length) {
        ad = vAPI.adParser.createAd('youtube', target, {
          title: $text(title),
          src: parsed
        });
      }

      return [ad];
    }

    // TODO: replace with core::domainFromURI
    const parseDomain = function (url, useLast) { // dup. in shared

      const domains = decodeURIComponent(url).match(/https?:\/\/[^?\/]+/g);
      return domains && domains.length ? new URL(
          useLast ? domains[domains.length - 1] : domains[0])
        .hostname : undefined;
    };

    /*************************** JQUERY-SHIMS ****************************/

    const $is = function (elem, selector) {
      // jquery shim

      if (selector.nodeType) {
        return elem === selector;
      }

      const qa = (typeof (selector) === 'string' ?
          document.querySelectorAll(selector) : selector);

      let length = qa.length;
      const returnArr = [];

      while (length--) {
        if (qa[length] === elem) {
          return true;
        }
      }

      return false;
    };

    const $attr = function (ele, attr, val) { // jquery shim

      return val ? (ele.length ? ele[0] : ele).setAttribute(attr, val) :
        (ele.length ? ele[0] : ele).getAttribute(attr);
    };

    const $text = function (ele) { // jquery shim

      if (typeof ele.length === 'undefined')
        return ele.innerText || ele.textContent;

      let text = '';
      for (let i = 0; i < ele.length; i++) {

        text += ele[i].innerText || ele[i].textContent;
      }

      return text;
    };

    const $find = function (ele, selector) { // jquery shim

      return ele && (ele.length ? ele[0] : ele).querySelectorAll(selector);
    };

    /******************************** VARS ********************************/

    const googleRegex = /^(www\.)*google\.((com\.|co\.|it\.)?([a-z]{2})|com)$/i;

    const filters = [{
      selector: '[data-text-ad]',
      handler: googleText,
      name: 'google',
      domain: googleRegex
    }, {
      selector: '#adBlock',
      handler: askText, // not working
      name: 'ask',
      domain: /^.*\.ask\.com$/i
    }, {
      selector: '.ad',
      handler: aolText,
      name: 'aol',
      domain: /^.*\.aol\.com(\.([a-z]{2}))?$/i
    }, {
      selector: '.nrn-react-div',
      handler: ddgText,
      name: 'ddg',
      domain: /^(.*\.)?duckduckgo\.com/i
    }, {
      selector: 'div',
      handler: yahooText,
      name: 'yahoo',
      domain: /^.*\.yahoo\.com/i
    }, {
      selector: 'div.sb_add, li.b_ad, li.ad_scpa, li.adsMvC, li.adsMvE, li.ad_sc',
      handler: bingText,
      name: 'bing',
      domain: /^.*\.bing\.com/i
    }, {
      selector: 'div[style*="important"]',
      handler: baiduText,
      name: 'baidu',
      domain: /^.*\.baidu\.com/i
    }, {
      selector: '.bbccom_adsense_container',
      handler: googleAdsText,
      name: 'google - third party',
      domain: /^.*\.bbc\.com/i
    }, {
      selector: 'ytd-video-masthead-ad-advertiser-info-renderer',
      handler: youtubeAds,
      name: 'youtube ads',
      domain: /^.*youtube\.com/i
    },{
      selector: '.serp-item:has(.OrganicTextContentSpan span)',
      handler: yandexAdsText,
      name: 'yandex ads',
      domain: /^.*yandex\.com/i
    },{
      selector: 'div.clicktrackedAd_js',
      handler: startpageAdsText,
      name: 'startpage ads',
      domain: /^.*startpage\.com/i
    }];

    const checkFilters = function (elem) {

      const active = filters.filter(function (f) {
        const domain = (parent !== window) ? parseDomain(document.referrer) : document.domain;
        const matched = f.domain.test(domain);
        // if (!matched) console.warn('Domain mismatch: ' + domain + ' != ' + f.domain);
        return matched;
      });

      for (let i = 0; i < active.length; i++) {
        if ($is(elem, active[i].selector)) {
          return active[i].handler(elem);
        }
      }
    };

    /******************************** API *********************************/

    const process = function (elem) {
        // domain specific
        if (vAPI.prefs.textAdsDisabled) {
          console.log("adn: texts-ads disabled");
          return;
        }
        const ads = checkFilters(elem);
        if (ads) {
          for (let i = 0; i < ads.length; i++) {
            if (typeof ads[i] !== 'undefined') {
              if (vAPI.prefs.logEvents) console.log("[PARSED] TEXT-AD", ads[i]);
                vAPI.adParser.notifyAddon(ads[i]);
            }
          }
        }
      };

    const findGoogleTextAd = function(elem) {
          // table
          // -> .rhtitle
          // -> .rhbody
          // -> .rhurl

          const div = $find(elem, 'ul > li > div > table');
          if (!div.length) return;

          const title = $find(div, '.rhtitle'), text = $find(div, '.rhbody'), site = $find(div, 'a.rhurl');

          if (text.length && site.length && title.length) {

            const ad = vAPI.adParser.createAd('Google AdSense', $attr(site, 'href'), {
              title: $text(title),
              text: $text(text),
              site: $text(site)
            });

            if (ad) {
              if (vAPI.prefs.logEvents) console.log("[PARSED] TEXT-AD", ad);
              vAPI.adParser.notifyAddon(ad);
            }

          } else {
            console.warn('[TEXTADS] findGoogleTextAd.fail: ', title, site, text); //title, site, text);
          }

    };

    /**********************************************************************/

    return {
      process: process,
      findGoogleTextAd: findGoogleTextAd,
      youtubeAds: youtubeAds
    };

  })();
})();
