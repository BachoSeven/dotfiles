//"use strict";

var ca_gcm_domains = ['lesoleil.com'].concat(['latribune.ca', 'lavoixdelest.ca', 'ledroit.com', 'ledroitfranco.com', 'lenouvelliste.ca', 'lequotidien.com']);
var ca_torstar_domains = ['niagarafallsreview.ca', 'stcatharinesstandard.ca', 'thepeterboroughexaminer.com', 'therecord.com', 'thespec.com', 'thestar.com', 'wellandtribune.ca'];
var ke_nation_media_domains = ['businessdailyafrica.com', 'nation.africa'];
var ke_nation_media_custom_domains = ['monitor.co.ug', 'mwananchi.co.tz', 'mwanaspoti.co.tz', 'thecitizen.co.tz', 'theeastafrican.co.ke'];
var medium_custom_domains = ['betterprogramming.pub', 'towardsdatascience.com'];
var no_dn_media_domains = ['dn.no', 'europower.no', 'fiskeribladet.no', 'hydrogeninsight.com', 'intrafish.com', 'intrafish.no', 'kystens.no', 'rechargenews.com', 'tradewindsnews.com', 'upstreamonline.com'];
var sg_sph_media_domains = ['businesstimes.com.sg', 'straitstimes.com'];
var uk_dmg_media_domains = ['dailymail.com', 'thisismoney.co.uk'];
var uk_iconic_media_domains = ['scotsman.com', 'yorkshirepost.co.uk'];
var uk_reach_domains = ['dailyrecord.co.uk', 'express.co.uk'];
var usa_adv_local_domains = ['al.com', 'cleveland.com', 'lehighvalleylive.com', 'masslive.com', 'mlive.com', 'nj.com', 'oregonlive.com', 'pennlive.com', 'silive.com', 'syracuse.com'];
var usa_arizent_custom_domains = ['accountingtoday.com', 'benefitnews.com', 'bondbuyer.com', 'dig-in.com', 'financial-planning.com', 'nationalmortgagenews.com'];
var usa_conde_nast_domains = ['architecturaldigest.com', 'bonappetit.com', 'cntraveler.com', 'epicurious.com', 'gq.com' , 'newyorker.com', 'vanityfair.com', 'vogue.co.uk', 'vogue.com', 'wired.com'];
var usa_cox_first_media_domains = ['daytondailynews.com', 'journal-news.com', 'springfieldnewssun.com'];
var usa_craincomm_domains = ['360dx.com', 'adage.com', 'autonews.com', 'chicagobusiness.com', 'crainscleveland.com', 'crainsdetroit.com', 'crainsgrandrapids.com', 'crainsnewyork.com', 'european-rubber-journal.com', 'genomeweb.com', 'modernhealthcare.com', 'pionline.com', 'plasticsnews.com', 'precisionmedicineonline.com', 'rubbernews.com', 'tirebusiness.com', 'utech-polyurethane.com'];
var usa_gannett_domains = ['azcentral.com', 'cincinnati.com', 'commercialappeal.com', 'courier-journal.com', 'democratandchronicle.com', 'desmoinesregister.com', 'detroitnews.com', 'dispatch.com', 'freep.com', 'indystar.com', 'jacksonville.com', 'jsonline.com', 'knoxnews.com', 'news-press.com', 'northjersey.com', 'oklahoman.com', 'palmbeachpost.com', 'tennessean.com'];
var usa_hearst_comm_domains = ['ctinsider.com', 'ctpost.com', 'expressnews.com', 'houstonchronicle.com', 'nhregister.com', 'sfchronicle.com', 'statesman.com', 'timesunion.com'];
var usa_hearst_comm_mag_domains = ['bicycling.com', 'cosmopolitan.com', 'countryliving.com', 'delish.com', 'elle.com', 'elledecor.com', 'esquire.com', 'goodhousekeeping.com', 'harpersbazaar.com', 'housebeautiful.com', 'menshealth.com', 'oprahdaily.com', 'popularmechanics.com', 'prevention.com', 'roadandtrack.com', 'runnersworld.com', 'townandcountrymag.com', 'womenshealthmag.com'];
var usa_lee_ent_domains = ['buffalonews.com', 'journalnow.com', 'journalstar.com', 'madison.com', 'nwitimes.com', 'omaha.com', 'richmond.com', 'stltoday.com', 'tucson.com', 'tulsaworld.com'];
var usa_mcc_domains = ['bnd.com', 'charlotteobserver.com', 'elnuevoherald.com', 'fresnobee.com', 'kansas.com', 'kansascity.com', 'kentucky.com', 'mcclatchydc.com', 'miamiherald.com', 'newsobserver.com', 'sacbee.com', 'star-telegram.com', 'thestate.com', 'tri-cityherald.com'];
var usa_mng_domains = ['bostonherald.com', 'denverpost.com', 'eastbaytimes.com', 'mercurynews.com', 'ocregister.com', 'pressenterprise.com', 'sandiegouniontribune.com', 'twincities.com'];
var usa_nymag_domains = ['curbed.com', 'grubstreet.com', 'nymag.com', 'thecut.com', 'vulture.com'];
var usa_outside_mag_domains = ["backpacker.com", "betamtb.com", "betternutrition.com", "cleaneatingmag.com", "climbing.com", "outsideonline.com", "oxygenmag.com", "skimag.com", "trailrunnermag.com", "triathlete.com", "vegetariantimes.com", "womensrunning.com", "yogajournal.com"];
var usa_penske_media_domains = ['billboard.com', 'rollingstone.com', 'sourcingjournal.com', 'sportico.com', 'variety.com', 'wwd.com'];
var usa_tribune_domains = ['baltimoresun.com', 'capitalgazette.com', 'chicagotribune.com', 'courant.com', 'dailypress.com', 'mcall.com', 'nydailynews.com', 'orlandosentinel.com', 'pilotonline.com', 'sun-sentinel.com'];

var msg_once_page;
if (matchDomain('businesspost.ie')) {
  window.addEventListener('message', function (event) {
    if (event.data) {
      if (event.data.type === 'from_page') {
        if (true) {
          let data = event.data.data;
          let article = document.querySelector('div.article-body-section');
          if (data && article && dompurify_loaded && !msg_once_page) {
            msg_once_page = true;
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(data) + '</div>', 'text/html');
            let article_new = doc.querySelector('div');
            if (article_new) {
              let audio_tts = article_new.querySelector('audio[style]');
              if (audio_tts)
                audio_tts.removeAttribute('style');
              article.innerHTML = '';
              article.appendChild(article_new);
            }
          }
        }
      }
    }
  }, false);
}

cs_default = function (bg2csData = '') {

if (bg2csData && bg2csData.cs_param)
  cs_param = bg2csData.cs_param;

if (!(csDone || csDoneOnce)) {

if (matchDomain('medium.com') || matchDomain(medium_custom_domains) || document.querySelector('head > link[href*=".medium.com/"]')) {
  let url = window.location.href;
  let paywall = document.querySelector('article.meteredContent');
  if (paywall) {
    paywall.removeAttribute('class');
    let header = paywall.querySelector('h1');
    if (header) {
      if (cs_param.ext_domains) {
        header.before(externalLink(cs_param.ext_domains.split(','), 'https://{domain}/{url}', url, 'BPC > Try for full article text:'));
      } else {
        header.before(externalLink(['freedium-mirror.cfd', 'readmedium.com', 'archive.today'], 'https://{domain}/{url}', url, 'BPC > Try for full article text:'));
      }
    }
  }
  window.setTimeout(function () {
    let banner = pageContains('div > div > p', /author made this story available to/);
    if (banner.length)
      removeDOMElement(banner[0].parentNode.parentNode);
  }, 1000);
}

else if (window.location.hostname.match(/^www\.thelocal\.(at|ch|com|de|dk|es|fr|it|no|se)$/)) {
  let paywall = document.querySelector('p#articleBodyForbidden');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div#articleBody');
    if (article)
      article.removeAttribute('style');
  }
  let ads = 'div.tl-ad-container, div.ml-manual-widget-container';
  hideDOMStyle(ads);
}

else if (window.location.hostname.match(/\.(au|nz)$/) || matchDomain(['afr.com', 'nzgeo.com'])) {//australia & new zealand

if (matchDomain('afr.com')) {
  let error = document.querySelector('div[data-testid="DefaultError"]');
  if (error) {
    csDoneOnce = true;
    refreshCurrentTab();
  }
  let article_sel = '#endOfArticle:not(:empty)';
  let article = document.querySelector(article_sel);
  if (!article) {
    article_sel = '#body-content';
    article = document.querySelector(article_sel);
  }
  if (article) {
    window.setTimeout(function () {
      let pars = article.querySelectorAll('p:not([class]), p[class*="-defaultWrapper"], figure:not(:empty)');
      let pagination = document.querySelector('div > span#pagination-top');
      if (((pars.length && pars.length < 5) || pagination) && dompurify_loaded) {
        if (pagination) {
          removeDOMElement(pagination.parentNode);
        } else {
          let loading = pageContains(article_sel + ' div', 'Loading...');
          removeDOMElement(...pars, ...loading);
        }
        let url = window.location.href.split(/[#\?]/)[0];
        fetch(url)
        .then(response => {
          if (response.ok) {
            response.text().then(html => {
              if (html.includes('__REDUX_STATE__=')) {
                try {
                  let json = JSON.parse(html.split('__REDUX_STATE__=')[1].split('};')[0].replace(/:undefined([,}])/g, ':0$1').replace(/new\sMap\(\[[^{]*\]\)/g, 0) + '}');
                  if (json) {
                    let placeholders;
                    function find_item(match, p1, offset, string) {
                      let placeholder_id = p1;
                      let result = '';
                      if (placeholder_id && placeholders[placeholder_id]) {
                        let item = placeholders[placeholder_id];
                        if (item.data) {
                          if (['linkArticle', 'linkExternal'].includes(item.type)) {
                            if (item.data.text) {
                              if (item.data.url)
                                result = '<a href="' + item.data.url + '"' + (item.data.newTab ? 'target="_blank"' : '') + '>' + item.data.text + '</a>';
                              else
                                result = item.data.text;
                            }
                          } else if (item.type === 'image') {
                            if (item.data.fileName) {
                              let credit = (item.data.credit && item.data.credit.trim()) || item.data.source;
                              result = '<figure><img src="https://static.ffx.io/images/w_960/' + item.data.fileName + '" style="width: 100%;"><figcaption>' + (item.data.caption ? item.data.caption : '') + (credit ? '<span style="font-weight: bold;">&nbsp;' + credit + '</span>' : '') + '</figcaption></figure>';
                            }
                          } else if (item.type === 'omny') {
                            if (item.data.src)
                              result = '<embed src="' + item.data.src + '/embed" style="width:100%" frameborder="0">';
                          } else if (item.type === 'youtube') {
                            if (item.data.url) {
                              if (item.data.url.includes('watch?v='))
                                result = '<iframe src="' + item.data.url.replace('watch?v=', 'embed/') + '" style="width: 100%; height: 400px;"></iframe>';
                              else
                                result = '<a href="' + item.data.url + '" target="_blank">' + item.data.url + '</a>';
                            }
                          } else if (['instagram', 'twitter'].includes(item.type)) {
                            if (item.data.url)
                              result = '<a href="' + item.data.url + '" target="_blank">' + item.data.url + '</a>';
                          } else if (item.type === 'iframe') {
                            if (item.data.url) {
                              let height = 400;
                              if (item.data.url.includes('/headshots/'))
                                height = 100;
                              result = '<iframe src="' + item.data.url + '" style="width: 100%; height: ' + height + 'px; border: none;"></iframe>';
                            }
                          } else if (!['callout', 'domainListing', 'quote', 'relatedStory', 'video'].includes(item.type)) {
                            console.log(item);
                          }
                        }
                      }
                      return result;
                    }
                    let json_text = json.page.content.asset.body;
                    if (json_text) {
                      placeholders = json.page.content.asset.bodyPlaceholders;
                      if (placeholders)
                        json_text = json_text.replace(/<x-placeholder id="(\w+)"><\/x-placeholder>/g, find_item);
                      let parser = new DOMParser();
                      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
                      let content_new = doc.querySelector('div');
                      if (article_sel.startsWith('#endOfArticle')) {
                        let widget = document.querySelector('div[class$="-wrapper"] > div#WidgetContainer');
                        if (widget)
                          content_new.firstChild.before(widget.parentNode);
                        let author = article.querySelector('section[class$="-articleBylineToolsWrapper"]');
                        if (author)
                          content_new.firstChild.before(author);
                        article.parentNode.replaceChild(content_new, article);
                        window.setTimeout(function () {
                          content_new.id = 'endOfArticle';
                        }, 500);
                      } else
                        article.firstChild.before(content_new);
                      addStyle(article_sel + ' :is(p, h2) {margin: 20px 0px !important;}');
                    } else {
                      let parser = new DOMParser();
                      let posts = json.page.content.asset.posts;
                      article.innerHTML = '';
                      for (let post of posts) {
                        let asset = post.asset;
                        if (asset && asset.body) {
                          let json_text = asset.body;
                          placeholders = asset.bodyPlaceholders;
                          if (placeholders)
                            json_text = json_text.replace(/<x-placeholder id="(\w+)"><\/x-placeholder>/g, find_item);
                          let doc = parser.parseFromString('<section>' + DOMPurify.sanitize(json_text, dompurify_options) + '</section>', 'text/html');
                          let par = doc.querySelector('section');
                          let header;
                          if (asset.headlines && asset.headlines.headline) {
                            header = document.createElement('h2');
                            header.innerText = asset.headlines.headline;
                            header.id = post.id;
                          }
                          let byline = document.createTextNode('');
                          if (asset.byline) {
                            byline = document.createElement('p');
                            byline.innerText = asset.byline;
                            byline.style = 'margin-bottom: 24px;'
                          }
                          article.append(header, byline, par);
                        }
                      }
                      addStyle('section:not([class]) > p {margin: 24px 0px;}');
                      let key_posts = document.querySelectorAll('li > a[href*="?post="]');
                      for (let elem of key_posts)
                        elem.href = elem.href.replace('?post=', '#');
                    }
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            });
          }
        }).catch(function (err) {
          false;
        });
      }
    }, 1000);
  }
}

else if (matchDomain('businessdesk.co.nz')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall && dompurify_loaded) {
    paywall.classList.remove('paywall');
    let signup_box = document.querySelector('div.signup-box-container');
    removeDOMElement(signup_box);
    let url = window.location.href.split(/[#\?]/)[0];
    fetch(url)
    .then(response => {
      if (response.ok) {
        response.text().then(html => {
          let match = html.match(/:query="'([^"]+)'"/);
          if (match) {
            let parser = new DOMParser();
            let src_text = breakText(parseHtmlEntities(match[1])).replace(/\n\n/g, '<br><br>').replace(/\.([^\s\d]|&)/g, ". $1");
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(src_text, dompurify_options) + '</div>', 'text/html');
            let content_new = doc.querySelector('div');
            paywall.innerHTML = '';
            paywall.appendChild(content_new);
          }
        })
      }
    })
  }
}

else if (matchDomain(['crikey.com.au', 'smartcompany.com.au', 'themandarin.com.au'])) {
  let paywall_sel = 'div#pmc-zephr-paywall';
  let paywall = document.querySelector(paywall_sel);
  if (paywall) {
    let article_sel = 'div.entry-content';
    let article = document.querySelector(article_sel);
    if (article) {
      getJsonUrl(paywall_sel, '', article_sel + ' > p');
      article.style['max-height'] = 'none';
    }
  }
  let ads = 'div.wp-block-pm-ad-placeholder-block, div[style*="linear-gradient"]';
  hideDOMStyle(ads);
}

else if (matchDomain('forbes.com.au')) {
  getJsonUrl('div[class*="_gate"]', '', 'div.article-page__content-body');
  let fade = document.querySelector('div[style*="background-image: linear-gradient"]');
  removeDOMElement(fade);
}

else if (matchDomain('macrobusiness.com.au')) {
  let paywall = pageContains('div > p', 'The full text of this article is available');
  if (paywall[0] && dompurify_loaded) {
    let fade = document.querySelector('div.bg-gradient-to-t');
    removeDOMElement(paywall[0].parentNode, fade);
    let json_script = document.querySelector('script#__NUXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        let json_text = json.filter(x => typeof x === 'string' && x.match(/(<|\\u003C)p>/))[0];
        if (json_text) {
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
          let content_new = doc.querySelector('div');
          let article = document.querySelector('div.content');
          if (article) {
            article.innerHTML = '';
            article.appendChild(content_new);
          }
        } else
          refreshCurrentTab();
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('nzgeo.com')) {
  hideDOMStyle('div#paywall-bottom');
}

else if (matchDomain('nzherald.co.nz')) {
  // plus code in contentScript_once_var.js (timing)
  let banners = '#premium-toaster, div[id$="article-body-ad"]';
  hideDOMStyle(banners);
}

else if (matchDomain('thesaturdaypaper.com.au')) {
  let ads = 'div[data-ad-type]';
  hideDOMStyle(ads);
}

else if (matchDomain(['brisbanetimes.com.au', 'smh.com.au', 'theage.com.au', 'watoday.com.au'])) {
  let ads = 'div[data-testid="ad"]';
  hideDOMStyle(ads);
}

else {
  // Australian Community Media newspapers
  let au_comm_media_domains = ['bendigoadvertiser.com.au', 'bordermail.com.au', 'canberratimes.com.au', 'centralwesterndaily.com.au', 'dailyadvertiser.com.au', 'dailyliberal.com.au', 'examiner.com.au', 'illawarramercury.com.au', 'newcastleherald.com.au', 'northerndailyleader.com.au', 'standard.net.au', 'theadvocate.com.au', 'thecourier.com.au', 'westernadvocate.com.au'];
  if (matchDomain(au_comm_media_domains) || document.querySelector('div#footer a[href^="https://acm.media/"]')) {
    let mask = document.querySelector('div[class^="gradient-mask-"]');
    if (mask) {
      mask.removeAttribute('class');
      let div_hidden = document.querySelectorAll('div.flex-col div.hidden');
      for (let elem of div_hidden)
        elem.classList.remove('hidden');
    } else {
      let subscribe_truncate = document.querySelector('.subscribe-truncate');
      if (subscribe_truncate)
        subscribe_truncate.classList.remove('subscribe-truncate');
      let subscriber_hiders = document.querySelectorAll('.subscriber-hider');
      for (let subscriber_hider of subscriber_hiders)
        subscriber_hider.classList.remove('subscriber-hider');
    }
    let noscroll = document.querySelectorAll('html[style], body[style]');
    for (let elem of noscroll)
      elem.removeAttribute('style');
    let story_generic_iframe = '.story-generic__iframe';
    let blocker = 'div.blocker';
    let overlays = 'div.transition-all, div[id^="headlessui-dialog"]';
    let ads = '.ad-placeholder, .sticky, [id*="-container"], #hindsight-ads-iframe, div.vf3-conversations-list__promo, div#tbl-next-up, iframe[data-ad-id]';
    hideDOMStyle(story_generic_iframe + ', ' + blocker + ', ' + overlays + ', ' + ads);
  } else if (window.location.hostname.endsWith('.com.au')) {
    // Australia News Corp
    let au_news_corp_domains = ['adelaidenow.com.au', 'cairnspost.com.au', 'codesports.com.au', 'couriermail.com.au', 'dailytelegraph.com.au', 'geelongadvertiser.com.au', 'goldcoastbulletin.com.au', 'heraldsun.com.au', 'ntnews.com.au', 'theaustralian.com.au', 'thechronicle.com.au', 'themercury.com.au', 'townsvillebulletin.com.au', 'weeklytimesnow.com.au'];
    if (matchDomain(au_news_corp_domains)) {
      let url = window.location.href;
      if (window.location.pathname.startsWith('/subscribe/') && !url.includes('/digitalprinteditions')) {
        let og_url = document.querySelector('head > meta[property="og:url"][content]');
        if (og_url) {
          let og_url_obj = new URL(decodeURIComponent(og_url.content));
          let url_new = og_url_obj.origin + '/' + og_url_obj.pathname.replace(/^\//, '').replace(/\//g, '%2F');
          if (bg2csData && bg2csData.amp_redirect)
            url_new += '?amp';
          csDoneOnce = true;
          window.setTimeout(function () {
            window.location.href = url_new;
          }, 500);
        }
      } else if (window.location.search.match(/[&\?]amp/)) {
        amp_unhide_subscr_section('[id^="ad-mrec-"]', false);
        let figure_stretch = document.querySelectorAll('figure.stretch');
        for (let elem of figure_stretch)
          elem.classList.remove('stretch');
        let comments = document.querySelector('#comments-load, .comments-module');
        removeDOMElement(comments);
      } else {
        if (window.location.pathname.includes('/video/') && document.querySelector('div.vms-premium-video'))
          header_nofix('div.video-hub');
        let ads = '.header_ads-container, .ad-block';
        hideDOMStyle(ads);
      }
    } else {
      // Australian Seven West Media
      if (matchDomain('thewest.com.au') || document.querySelector('head > link[href="https://images.thewest.com.au"]')) {
        function thewest_main(node) {
          let filter = /^window\.PAGE_DATA\s?=\s?/;
          let json_script = getSourceJsonScript(filter);
          if (json_script) {
            let json_text = json_script.text.split(filter)[1];
            json_text = json_text.replace(/:undefined([,}])/g, ':"undefined"$1');
            try {
              let json_article = JSON.parse(json_text);
              let json_pub;
              for (let key in json_article) {
                let json_resolution = json_article[key].data.result.resolution;
                if (json_resolution && json_resolution.publication) {
                  json_pub = json_resolution.publication;
                  break;
                }
              }
              let json_content = [];
              let url_loaded;
              if (json_pub) {
                json_content = json_pub.content.blocks;
                url_loaded = json_pub._self;
              } else
                refreshCurrentTab();
              //let json_video = json_pub.mainVideo;
              let url = window.location.href;
              if (!url_loaded || !url.includes(url_loaded.slice(-10)))
                refreshCurrentTab();
              let par_elem, par_sub1, par_sub2;
              let par_dom = document.createElement('div');
              let tweet_id = 1;
              for (let par of json_content) {
                par_elem = '';
                if (par.kind === 'text') {
                  par_elem = document.createElement('p');
                  par_elem.innerText = par.text;
                } else if (par.kind === 'subhead') {
                  par_elem = document.createElement('h2');
                  par_elem.innerText = par.text;
                } else if (par.kind === 'pull-quote') {
                  par_elem = document.createElement('i');
                  par_elem.innerText = (par.attribution ? par.attribution + ': ' : '') + par.text;
                } else if (par.kind === 'embed') {
                  if (par.reference.includes('https://omny.fm/') || par.reference.includes('https://docdro.id/')) {
                    par_elem = document.createElement('embed');
                    par_elem.src = par.reference;
                    par_elem.style = 'height:500px; width:100%';
                    par_elem.frameborder = '0';
                  } else {
                    par_elem = document.createElement('a');
                    par_elem.href = par.reference;
                    par_elem.innerText = par.reference.split('?')[0];
                  }
                } else if (par.kind === 'unordered-list') {
                  if (par.items) {
                    par_elem = document.createElement('ul');
                    for (let item of par.items)
                      if (item.text) {
                        par_sub1 = document.createElement('li');
                        if (item.intentions[0] && item.intentions[0].href) {
                          par_sub2 = document.createElement('a');
                          par_sub2.href = item.intentions[0].href;
                        } else {
                          par_sub2 = document.createElement('span');
                        }
                        par_sub2.innerText = item.text;
                        par_sub1.appendChild(par_sub2);
                        par_elem.appendChild(par_sub1);
                      }
                  }
                } else if (par.kind === 'inline') {
                  if (par.asset.kind === 'image' && par.asset.original && par.asset.original.reference) {
                    par_elem = makeFigure(par.asset.original.reference, par.asset.captionText, {style: 'width:100%'});
                  }
                } else if (par.kind === 'inline-related') {
                  par_elem = document.createElement('p');
                  if (par.publications) {
                    for (let elem of par.publications) {
                      let par_link = document.createElement('a');
                      par_link.href = elem._self;
                      par_link.innerText = elem.heading;
                      par_elem.appendChild(par_link);
                      par_elem.appendChild(document.createElement('br'));
                    }
                  }
                } else {
                  par_elem = document.createElement('p');
                  par_elem.innerText = par.text;
                  console.log(par.kind);
                }
                if (par_elem)
                  par_dom.appendChild(par_elem);
              }
              let content = document.querySelector('div[class*="StyledArticleContent"]');
              if (content) {
                content.innerHTML = '';
                content.appendChild(par_dom);
              } else {
                par_dom.setAttribute('style', 'margin: 20px;');
                node.before(par_dom);
              }
            } catch (err) {
              console.log(err);
            }
          }
          removeDOMElement(node);
        }
        let paywall_sel = 'div.paywall div[data-testid*="BreachScreen"], div[class*="StyledBreachWallContent"]';
        setInterval(function () {
          let paywall = document.querySelector(paywall_sel);
          if (paywall)
            thewest_main(paywall);
        }, 1000);
        let ads = 'div.headerAdvertisement, div.ad-no-notice';
        hideDOMStyle(ads);
      } else if (document.querySelector('head > link[rel="dns-prefetch"][href="//static.ew.mmg.navigacloud.com"]')) { // McPherson Media Group
        let paywall = document.querySelector('div#content-Load-message');
        if (paywall) {
          removeDOMElement(paywall);
          let lockable = document.querySelectorAll('div[id^="lockable-"]');
          for (let elem of lockable) {
            elem.removeAttribute('style');
            elem.removeAttribute('id');
          }
          let gradient = document.querySelector('div.gradienttext');
          if (gradient)
            gradient.removeAttribute('class');
        }
      } else
        csDone = true;
    }
  } else
    csDone = true;
}

} else if ((window.location.hostname.match(/\.(ie|uk)$/) && !matchDomain(['vogue.co.uk'])) || matchDomain(['autosport.com', 'dailymail.com', 'decanter.com', 'fnlondon.com', 'ft.com', 'gbnews.com', 'granta.com', 'iai.tv', 'irishexaminer.com', 'motorsportmagazine.com', 'newstatesman.com', 'scotsman.com', 'tes.com', 'the-past.com', 'the-tls.com', 'thelawyer.com', 'thetimes.com', 'unherd.com', 'worldeconomics.com'])) {//united kingdom/ireland

if (matchDomain('autocar.co.uk')) {
  let paywall = document.querySelector('div.ms-block, div.register-block');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let article = document.querySelector('div.block-node');
        if (json_text && article) {
          article.innerHTML = '';
          let article_new = document.createElement('p');
          article_new.innerText = json_text;
          let fade = document.querySelector('div.article-section > div[style*="max-height"]');
          removeDOMElement(fade);
          let url = window.location.href;
          article.append(article_new, 'Text-only > for missing media/links: ', googleSearchToolLink(url));
        }
      }
    }
  }
  let ads = 'div[class*="-ads-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('autosport.com')) {
  header_nofix('div.ms-article-content > p', 'div.ms-piano_article-banner');
}

else if (matchDomain('businesspost.ie')) {
  function bpie_main() {
    if ($) {
      let article_id_dom = document.querySelector('article#article[data-uuid]');
      let article_id;
      if (article_id_dom)
        article_id = article_id_dom.getAttribute('data-uuid');
      if (article_id) {
        let bp_ajaxurl = 'https://www.businesspost.ie/wp-admin/admin-ajax.php';
        let data_ajax = {
          action: 'fetch_article_content',
          type: 'POST',
          data: {
            id: article_id
          },
          dataType: 'json',
          contentType: 'application/json'
        };
        $.ajax({
          type: 'POST',
          url: bp_ajaxurl,
          data: data_ajax,
          success: function (data) {
            window.postMessage({type: 'from_page', data: data});
          }
        });
      }
    } else
      window.location.reload(true);
  }
  csDoneOnce = true;
  window.setTimeout(function () {
    let paywall = document.querySelector('div#bp_paywall_content');
    let article_id_dom = document.querySelector('article#article[data-uuid]');
    let article_id;
    if (article_id_dom)
      article_id = article_id_dom.getAttribute('data-uuid');
    if (paywall || article_id) {
      removeDOMElement(paywall);
      insert_script(bpie_main);
    }
  }, 500);
  let ads = 'div[id^="Inline-MPU-article-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('decanter.com')) {
  let paywall = document.querySelector('div[id^="react_subscriber_content_"]');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let data = document.querySelector('div[data-dom-id^="react_subscriber_content_"][data-props]');
    if (data) {
      try {
        let json = JSON.parse(data.getAttribute('data-props'));
        if (json && json.content) {
          let content = decode_utf8(atob(json.content));
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(content, dompurify_options) + '</div>', 'text/html');
          let content_new = doc.querySelector('div');
          data.before(content_new);
          header_nofix('div.collection-wrapper', '', 'BPC > no fix for reviews');
          let fade = 'div.piano-container-fade';
          hideDOMStyle(fade);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('fnlondon.com')) {
  if (window.location.pathname.startsWith('/amp/'))
    ampToHtml();
  let paywall = document.querySelector('div#cx-snippet');
  if (paywall) {
    removeDOMElement(paywall);
    window.setTimeout(function () {
      let article_sel = cs_param.article_sel || 'div[data-article-id] section';
      let article = document.querySelector(article_sel);
      if (article) {
        article.removeAttribute('class');
        addStyle(article_sel + ' p {margin: 20px 0px !important;}');
        let article_id_dom = document.querySelector('head > meta[name="article.id"][content]');
        if (article_id_dom) {
          let article_id = article_id_dom.content;
          let url_src = 'https://fn.djmedia.djservices.io/apps/finnews/theaters/default-article?screen_ids=' + article_id;
          let x_access_token = cs_param['x-access-token'] || "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJBVVRIX1BIUkFTRV9QUk9EX0lPUyI6IlZlRXRaemRIaGF4bzhKRWpzaHlEIn0.bxWGVMaft1RN0_qWAnzoNBLx12sc0Jt4rLBaoG5n08AQTS9RibwlJlZrqUca_tm0lSCwl3Z1ehJcVepVH_YcNgRJsujt49JVFSGBO8B69zFDERS05x2RM_n0k8Jg9cyErhfsgWTsb8ObR6iRhHmw702_VcEzJrmdXwq44Bw3NgkBPOgIAZn37SA7hx__gvd8Hdxd5LLgZwxXTG1kWFW4S--vf4CxUt-uEY94m1VqaUyyMTEMvXTmktS2wReBH8mawDvBdyBDkQrPx7oaFP1zq4h-B1mQCj_wMRfR-QUls6BTpBPQUjO02FaTf-2RbHzAYn3xTpmxs0GE12iD4QBSbg";
          getExtFetch(url_src, '', {headers: {"app-identifier": "com.news.screens", "device-type": "phone", "x-access-token": x_access_token}}, fix_dowjones_fetch, data_ext_fetch_id++, [article, 'div.media-layout img[src]']);
        }
      }
    }, 1000);
  }
  let signin_links = document.querySelectorAll('a[href^="https://www.fnlondon.com/client/login"][href*="target="]');
  for (let elem of signin_links) {
    elem.href = '#'; //decodeURIComponent(elem.href.split('target=')[1].split('&')[0]);
    elem.innerText = 'Open';
    elem.addEventListener('click', function () { window.location.reload(); });
  }
  let ads = 'div.grid__rail_top';
  hideDOMStyle(ads);
}

else if (matchDomain('ft.com')) {
  func_post = function () {
    if (mobile) {
      document.querySelectorAll('div[style^="z-index:"][style*=";width:"]').forEach(e => e.removeAttribute('style'));
      document.querySelectorAll('section[style^="column-gap:"] > figure').forEach(e => e.parentNode.removeAttribute('style'));
      document.querySelectorAll('div[style*="grid-template-areas"], article#site-content').forEach(e => e.style = 'margin: 10px;');
      document.querySelectorAll('aside[style], ul#onward-journey-collection > li[style]').forEach(e => e.removeAttribute('style'));
      document.querySelectorAll('div#o-topper [style*="color:rgb(255, 255, 255);"]').forEach(e => e.style.color = '');
    }
    hideDOMStyle('form[action*="/api/"]', 2);
    let lazy_images = document.querySelectorAll('figure > picture > img[loading="lazy"]');
    for (let elem of lazy_images) {
      elem.style = 'width: 100%;';
      if (mobile) {
        elem.parentNode.removeAttribute('style');
        elem.parentNode.parentNode.removeAttribute('style');
        elem.parentNode.parentNode.querySelectorAll('figcaption').forEach(e => e.removeAttribute('style'));
      }
    }
    let charts = document.querySelectorAll('div[frameborder][old-src]:not([src])');
    for (let elem of charts) {
      let iframe = document.createElement('iframe');
      iframe.src = elem.getAttribute('old-src').split('?')[0];
      iframe.style = 'width: 100%; height: 600px; border: none;';
      elem.parentNode.replaceChild(iframe, elem);
    }
    let custom_codes = document.querySelectorAll('custom-code-component[title]');
    for (let elem of custom_codes) {
      let title = document.createElement('div');
      let title_main = document.createElement('div');
      title_main.innerText = elem.title;
      title_main.style = 'font-weight: bold;';
      title.append(title_main, document.createTextNode(elem.getAttribute('subtitle') || ''), document.createElement('br'), document.createTextNode(elem.getAttribute('credit') || ''));
      elem.before(title);
      removeDOMElement(elem.querySelector('div[style*="align-items:"]'));
    }
    let videos = document.querySelectorAll('div > video > source[src^="data:image/"][old-src]');
    for (let elem of videos) {
      let video_new = document.createElement('video');
      video_new.src = elem.getAttribute('old-src');
      video_new.setAttribute('controls', '');
      video_new.style = 'width: 100%;';
      let container = elem.parentNode.parentNode;
      container.parentNode.style = 'margin: 20px;';
      container.parentNode.replaceChild(video_new, container);
    }
    let tables = document.querySelectorAll('div[style]:not([id]) > table:not([id])');
    for (let elem of tables) {
      elem.parentNode.removeAttribute('style');
      elem.querySelectorAll('tr[style*="visibility:hidden"]').forEach(e => e.style.visibility = 'visible');
    }
    let title = document.querySelector('head > meta[property="og:title"][content]');
    if (title)
      document.title = title.content;
  }
  let url = window.location.href.split(/[#?]/)[0];
  let paywall_sel = 'div#barrier-page';
  let paywall = document.querySelector(paywall_sel);
  if (paywall) {
    let url_app = url.replace('/www.', '/app.');
    header_nofix('body', '', 'BPC > open full article (app)', url_app);
    getArchive(url, paywall_sel, '', 'div.n-layout__row--content', '', 'div[style*="article-body"]', 'body');
  }
  let html = document.querySelector('html[style*="overflow"]');
  if (html)
    html.style.overflow = 'visible';
  let banners = '.js-article-ribbon, div.o-ads, pg-slot';
  hideDOMStyle(banners);
}

else if (matchDomain('gbnews.com')) {
  let ads = 'div.ad--billboard, div[class^="ad--placeholder"], div.video-inbody, div.sticky-banner-wrapper, div.sidebar-ad-wrapper, div.vf3-conversations-list__promo';
  hideDOMStyle(ads);
}

else if (matchDomain('granta.com')) {
  getJsonUrl('div.article-sign-up-container', '', 'div.article-excerpt');
}

else if (matchDomain('iai.tv')) {
  let paywall = document.querySelector('div.article-paywall-main');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div > div.iai-article--content-inner');
    if (article) {
      let content_new = document.querySelector('head > meta[name="twitter:description"][content]');
      if (content_new) {
        let parser = new DOMParser();
        let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(content_new.content, dompurify_options) + '</div>', 'text/html');
        let article_new = doc.querySelector('div');
        article.parentNode.replaceChild(article_new, article);
      }
    }
  }
}

else if (matchDomain('investorschronicle.co.uk')) {
  let paywall = document.querySelector('div#hard-barrier');
  if (paywall) {
    removeDOMElement(paywall);
    let article_sel = 'div.article__content';
    let article = document.querySelector(article_sel);
    if (article) {
      header_nofix(article_sel + ' > div', '', 'BPC > no fix (audio-only)');
      let app_script = document.querySelector('script#app-state');
      if (app_script) {
        let json_text = decodeURIComponent(app_script.text);
        if (json_text.includes(',"projectAudioUrl":"')) {
          let audio_tts = document.createElement('audio');
          audio_tts.src = json_text.split(',"projectAudioUrl":"')[1].split('"')[0];
          audio_tts.setAttribute('controls', '');
          article.firstChild.before(audio_tts);
        }
      }
    }
  }
  let ads = 'div[id$="ad-wrapper"]';
  hideDOMStyle(ads);
}

else if (matchDomain('irishexaminer.com')) {
  let premium = document.querySelector('head > meta[name="isPremium"][content="true"]');
  let article = document.querySelector('article');
  if (premium && article) {
    removeDOMElement(premium);
    function stripAppLinks(story) {
      story.querySelectorAll('a.readmore-event[href$="?type=app"]').forEach(e => e.href = e.href.split('?')[0]);
    }
    let bbw_embed = document.querySelector('figure.bbw-embed');
    if (bbw_embed) {
      let json_script = bbw_embed.parentNode.querySelector('script[type="application/ld+json"]');
      if (json_script && json_script.text.match(/"embedUrl":\s?"/)) {
        let embed_url = json_script.text.split(/"embedUrl":\s?"/)[1].split('"')[0];
        let iframe = document.createElement('iframe');
        iframe.src = embed_url;
        iframe.style = 'width: 100%;  aspect-ratio: 16 / 9; border: none;';
        bbw_embed.parentNode.replaceChild(iframe, bbw_embed);
      }
    }
    let url = window.location.href;
    let app = window.location.search.startsWith('?type=app');
    if (!app) {
      let paywall = document.querySelector('div#paywall-premium');
      if (paywall && dompurify_loaded) {
        let body_hide = article.querySelector('style:not(:empty)');
        removeDOMElement(paywall, body_hide);
        let url_src = url.split(/[#\?]/)[0] + '?type=app';
        let story = article.querySelector('story');
        if (story) {
          let podcast = article.querySelector('story > figure.bbw-embed');
          if (!podcast) {
            fetch(url_src)
            .then(response => {
              if (response.ok) {
                response.text().then(html => {
                  if (html.includes('<story')) {
                    let parser = new DOMParser();
                    dompurify_options.ADD_TAGS = dompurify_options.ADD_TAGS.concat(['story']);
                    let doc = parser.parseFromString(DOMPurify.sanitize(html, dompurify_options), 'text/html');
                    let story_new = doc.querySelector('story');
                    if (story_new) {
                      stripAppLinks(story_new);
                      story.parentNode.replaceChild(story_new, story);
                    }
                  }
                });
              }
            });
          }
        } else
          window.location.href = url_src;
      }
    } else {
      let longread = document.querySelector('head > meta[name="isLongRead"][content="true"]');
      if (longread) {
        removeDOMElement(longread);
        let row = article.querySelector('div.row');
        if (row)
          row.append(googleSearchToolLink(url.split('?')[0]));
      } else {
        let div = document.createElement('div');
        div.style.margin = '20px';
        let home = document.createElement('a');
        home.innerText = window.location.hostname;
        home.href = 'https://' + window.location.hostname;
        div.append(home);
        article.before(div);
        let story = article.querySelector('story');
        if (story)
          stripAppLinks(story);
        hideDOMStyle('.bbw-embed', 2);
      }
    }
  }
  let ads = 'div[data-ad-unit-id]';
  hideDOMStyle(ads);
}

else if (matchDomain('literaryreview.co.uk')) {
  getJsonUrl('p.subscribe-for-more', '', 'div#_articlereview');
}

else if (matchDomain('motorsportmagazine.com')) {
  getJsonUrl('aside.paywall', '', 'div[data-behaviour="post-content"]');
  let banner = document.querySelector('div[data-behaviour="react-paywall-threshold"]');
  removeDOMElement(banner);
  let ads = 'aside.ad-space';
  hideDOMStyle(ads);
}

else if (matchDomain('newstatesman.com')) {
  if (window.location.hostname === 'magazine.newstatesman.com') {
    restorePugpigPage();
  } else {
    let paywall = document.querySelectorAll('p[data-ct]');
    if (paywall.length && dompurify_loaded) {
      removeDOMElement(...paywall);
      let json_script = document.querySelector('script#tie-schema-json');
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text);
          let date = json.datePublished;
          let meta_date_dom = document.querySelector('head > meta[property="article:published_time"][content]');
          if (meta_date_dom && meta_date_dom.content)
            date = meta_date_dom.content;
          if (json && date) {
            date = date.split(/T\d/)[0].replace(/-/g, '/');
            let path_new = window.location.pathname.split('/').pop();
            if (path_new) {
              let url = 'https://magazine.newstatesman.com/' + date + '/' + path_new + '/content.html';
              let article_sel = 'div.c-article-content__container';
              let article = document.querySelector(article_sel);
              if (article) {
                let pars_old = article.querySelectorAll('p.wp-block-paragraph, iframe[id^="datawrapper-chart-"]');
                replaceDomElementExt(url, false, false, article_sel + ' > p[class*="-drop-cap"]', 'BPC > no fix (no magazine source file)', 'section.pp-article__body');
                window.setTimeout(function () {
                  if (!document.querySelector('div#bpc_fail'))
                    removeDOMElement(...pars_old);
                }, 1000);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    let ads = 'div.ad';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('observer.co.uk')) {
  let ads = 'div._minH-50px:has(> div#landing-top)';
  hideDOMStyle(ads);
}

else if (matchDomain('stylist.co.uk')) {
  let paywall = document.querySelector('div[data-testid="paywall-component"]');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let paywall_inline = document.querySelector('div.paywall--inline');
    if (paywall_inline)
      paywall_inline.removeAttribute('class');
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json.props.pageProps.data.post.acf.widgets) {
          let url_next = json.props.pageProps.data.post.id;
          if (url_next && !window.location.pathname.endsWith(url_next))
            refreshCurrentTab();
          let pars = json.props.pageProps.data.post.acf.widgets;
          let first_par = document.querySelector('main div[data-column="true"] > p');
          if (first_par) {
            let article = first_par.parentNode;
            let teaser = article.querySelectorAll('div > p:not([class])');
            removeDOMElement(...teaser);
            if (article) {
              let parser = new DOMParser();
              for (let par of pars) {
                let elem = document.createElement('p');
                if (par.paragraph) {
                  let content = par.paragraph;
                  let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                  elem = content_new.querySelector('div');
                } else if (par.acf_fc_layout === 'heading') {
                  if (par.text)
                    elem.appendChild(document.createTextNode(par.text));
                } else if (['image', 'interactive_image'].includes(par.acf_fc_layout)) {
                  let image_array = [];
                  if (par.image)
                    image_array = [par.image];
                  else if (par.image_collection)
                    image_array = par.image_collection;
                  for (let img_elem of image_array) {
                    let figure = makeFigure(img_elem.url, img_elem.caption ? (img_elem.caption + ' ' + img_elem.description) : img_elem.alt, {alt: img_elem.alt, style: 'width: 95%;'});
                    elem.appendChild(figure);
                  }
                } else if (par.acf_fc_layout === 'listicle') {
                  let ul = document.createElement('ul');
                  for (let sub_item of par.item) {
                    let li = document.createElement('li');
                    if (sub_item.url) {
                      let par_link = document.createElement('a');
                      par_link.href = sub_item.url;
                      par_link.innerText = sub_item.title;
                      par_link.target = '_blank';
                      li.appendChild(par_link);
                    } else
                      li.innerText = sub_item.title;
                    if (sub_item.paragraph) {
                      let content = sub_item.paragraph;
                      let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(content) + '</div>', 'text/html');
                      let par_elem = content_new.querySelector('div');
                      li.appendChild(par_elem);
                    }
                    if (sub_item.image) {
                      let img = document.createElement('img');
                      img.src = sub_item.image.url;
                      img.alt = sub_item.image.alt;
                      img.style = 'width: 95%;';
                      li.appendChild(img);
                      li.appendChild(document.createElement('br'));
                    }
                    li.style = 'font-size: 20px; margin: 20px 0px;';
                    ul.appendChild(li);
                  }
                  elem.appendChild(ul);
                } else if (par.embed_link) {
                  let par_link = document.createElement('a');
                  par_link.href = par.embed_link;
                  par_link.innerText = 'Embedded link: ' + par.embed_link;
                  par_link.target = '_blank';
                  elem.appendChild(par_link);
                } else if (par.acf_fc_layout === 'divider') {
                  elem.appendChild(document.createElement('hr'));
                } else if (par.acf_fc_layout === 'related_articles') {
                  if (par.posts) {
                    for (let post of par.posts) {
                      if (post.link && post.title.rendered) {
                        let par_link = document.createElement('a');
                        par_link.href = post.link;
                        par_link.innerText = 'You may also like: ' + post.title.rendered;
                        elem.appendChild(par_link);
                        elem.appendChild(document.createElement('br'));
                      }
                    }
                  }
                } else if (!['newsletter_signup', 'pull-quote'].includes(par.acf_fc_layout))
                  console.log(par);
                if (elem.hasChildNodes()) {
                  elem.style = 'font-family: "Source Serif Pro"; font-size: 20px; line-height: 34px;';
                  article.appendChild(elem);
                }
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('telegraph.co.uk')) {
  let subwall = '[class^="subwall"]';
  let ads = '.advert, .commercial-unit';
  hideDOMStyle(subwall + ', ' + ads);
}

else if (matchDomain('tes.com')) {
  let paywall = document.querySelector('div.tg-paywall-message');
  if (paywall) {
    removeDOMElement(paywall);
    let overlay = document.querySelector('div.tg-paywall-body-overlay');
    if (overlay)
      overlay.removeAttribute('class');
  }
  let banner = document.querySelector('div.js-paywall-info');
  removeDOMElement(banner);
}

else if (matchDomain('the-past.com')) {
  let paywall = document.querySelector('div.leaky_paywall_message_wrap');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.entry-content');
    if (article) {
      let url = window.location.href;
      article.before(googleSearchToolLink(url));
    }
  }
}

else if (matchDomain('the-tls.com')) {
  getJsonUrl('div.tls-single-article__closed-paywall', '', 'div.tls-article-body', {art_class: 'tls-article-body'});
  let fade = 'div.tls-single-article__closed-paywall-wrapper';
  let ads = 'div[class*="tls-single-article__ad-slot"]';
  hideDOMStyle(fade + ', ' + ads);
}

else if (matchDomain('thelawyer.com')) {
  if (window.location.pathname.startsWith('/mda/')) {
    header_nofix('div.sf-content__post', 'div.sf-login-form');
  } else if (dompurify_loaded) {
    let body = document.querySelector('body[class*="postid-"]');
    if (body) {
      let article_id = body.className.split('postid-')[1].split(' ')[0];
      if (article_id) {
        func_post = function () {
          let lazy_images = document.querySelectorAll('img.lazy[data-src]:not([src])');
          for (let elem of lazy_images) {
            elem.src = elem.getAttribute('data-src');
            elem.removeAttribute('class');
          }
        }
        getJsonUrl('div.sf-login-form', '', 'div.sf-content-body__text', {art_append: 1}, article_id, '', false, true);
      }
    }
  }
}

else if (matchDomain('thenewworld.co.uk')) {
  let paywall = document.querySelector('div[data-show-fade-on-noaccess]');
  if (paywall) {
    removeDOMElement(paywall);
    let content = document.querySelector('div[data-show-has-access]');
    if (content)
      content.removeAttribute('data-show-has-access');
  }
  let banners = document.querySelectorAll('div[data-show-subs-blocked]');
  removeDOMElement(...banners);
}

else if (matchDomain('thestage.co.uk')) {
  func_post = function () {
    let paywall = document.querySelector(paywall_sel);
    if (paywall) {
      removeDOMElement(paywall);
      let article = document.querySelector(article_sel);
      if (article)
        article.before(googleSearchToolLink(url));
    }
  }
  let paywall_sel = 'div#ao-MeteringDNAllow';
  let article_sel = 'div[id^="aos-FeatureArticle2Col-"], div[id^="aos-ReviewArticle-"]';
  let url = window.location.href;
  getArchive(url, paywall_sel, '', article_sel);
}

else if (matchDomain(['thesun.co.uk', 'thesun.ie', 'thescottishsun.co.uk'])) {
  let ads = 'div.billboard, div.advert-wrapper';
  hideDOMStyle(ads);
}

else if (matchDomain('thetimes.com')) {
  if (!matchDomain('epaper.thetimes.com')) {
    func_post = function () {
      let article = document.querySelector(article_sel);
      if (article) {
        if (mobile) {
          let figure_div = article.querySelector('figure > div[style] > div[style^="min-height:"]');
          if (figure_div) {
            figure_div.removeAttribute('style');
            figure_div.parentNode.removeAttribute('style');
          }
          let inline_images = article.querySelectorAll('img[style]');
          for (let elem of inline_images) {
            elem.style = 'display: block; margin-left: auto; margin-right: auto; width: 90%;';
            let parent_node = elem.parentNode;
            if (parent_node.tagName === 'PICTURE')
              parent_node = parent_node.parentNode;
            parent_node.removeAttribute('style');
            elem.removeAttribute('sizes');
          }
          article.querySelectorAll('div[style*="margin-left:"][style*="text-align:"], div[style*="grid-template-columns:"], figcaption, figure > span[style]').forEach(e => e.style = 'margin: 0px 20px');
          article.querySelectorAll('div[style*=";width:"]').forEach(e => e.style.width = '90%');
          let author = document.querySelector(article_sel + ' div[style^="min-height:"]:has(a[href^="https://www.thetimes.com/profile/"])');
          if (author)
            author.style = 'width: 90%; margin: 20px;';
          let header = article.querySelector('div[style] > h1');
          if (header)
            header.parentNode.removeAttribute('style');
        }
        let charts = document.querySelectorAll('times-datawrapper[embed-code]');
        for (let elem of charts) {
          let div = document.createElement('div');
          if (!mobile)
            div.style = 'margin: 0px 20%;';
          let iframe = document.createElement('iframe');
          iframe.src = decodeURIComponent(elem.getAttribute('embed-code'));
          iframe.style = 'width: 80%; height: 400px; border: none;';
          div.appendChild(iframe);
          elem.parentNode.replaceChild(div, elem);
        }
        let embed_iframes = article.querySelectorAll('div > times-embed-iframe-max[src]');
        for (let elem of embed_iframes) {
          let iframe_new;
          let iframe_src = elem.getAttribute('src');
          if (iframe_src.startsWith('https://youtube.com/')) {
            iframe_new = document.createElement('iframe');
            iframe_new.src = iframe_src;
            iframe_new.style = 'width: 100%; aspect-ratio: 16 / 9; border: none;';
          } else if (iframe_src.startsWith('https://www.tiktok.com/')) {
            iframe_new = document.createElement('iframe');
            iframe_new.src = iframe_src;
            iframe_new.style = 'width: 400px; aspect-ratio: 1 / 2; border: none;';
          } else if (iframe_src.startsWith('https://embed.acast.com/')) {
            iframe_new = document.createElement('iframe');
            iframe_new.src = iframe_src;
            iframe_new.style = 'width: 100%; border: none;';
          } else {
            iframe_new = document.createElement('a');
            iframe_new.href = iframe_new.innerText = iframe_src;
            iframe_new.target = '_blank';
          }
          elem.parentNode.removeAttribute('style');
          elem.parentNode.replaceChild(iframe_new, elem);
        }
        if (read_next) {
          let art_bottom = article.querySelector('nav ~div');
          if (art_bottom)
            art_bottom.after(read_next);
        }
      }
    }
    let read_next = document.querySelector('div.article-previous-next--sticky');
    let paywall_sel = cs_param.paywall_sel || 'div#paywall-portal-article-footer, div#paywall-takeover';
    let article_sel = cs_param.article_sel || 'article[id]';
    let url = window.location.href;
    if (window.location.pathname.includes('/article/') && !window.location.search.startsWith('?shareToken=')) {
      let paywall = document.querySelector(paywall_sel);
      if (paywall) {
        let article = document.querySelector(article_sel);
        if (article)
          article.before(googleSearchToolLink(url));
        getArchive(url, paywall_sel, '', article_sel);
      }
      let scroll_style = 'html, body {overflow: auto !important; height: auto !important;}';
      addStyle(scroll_style);
    }
    let banners = 'div#paywall-portal-page-footer';
    let ads = 'div.channel-header-ad, div[id^="advert-"], div[class*="InlineAdWrapper"], div[id^="ad-article-inline"], div:has(> div > div#ad-header)';
    hideDOMStyle(banners + ', ' + ads);
  }
}

else if (matchDomain('unherd.com')) {
  let preview = document.querySelector('div#premiumpreview');
  if (preview) {
    removeDOMElement(preview);
    let premium = document.querySelector('div#premiumcontent');
    if (premium)
      premium.removeAttribute('id');
  }
}

else if (matchDomain('worldeconomics.com')) {
  let paywall = document.querySelector('div#paywall');
  if (paywall) {
    removeDOMElement(paywall);
    document.querySelectorAll('div.blurred').forEach(e => e.classList.remove('blurred'));
    document.querySelectorAll('div.blurredImage').forEach(e => e.classList.remove('blurredImage'));
  }
  let noscroll = document.querySelector('body.noscroll');
  if (noscroll)
    noscroll.classList.remove('noscroll');
  let banners = 'div.StickyFooter, div#scrollable';
  hideDOMStyle(banners);
}

else if (matchDomain(uk_dmg_media_domains)) {
  let paywall = document.querySelector('body.is-paywalled-article');
  if (paywall)
    paywall.classList.remove('is-paywalled-article');
  let ads = 'ad-slot, div.billboard-container';
  hideDOMStyle(ads);
}

else if (matchDomain(uk_iconic_media_domains) || document.querySelector('footer a[href^="https://www.mediaconcierge.co.uk"]')) {
  let premium = document.querySelector('div.premium.no-entitlement');
  if (premium)
    premium.classList.remove('premium', 'no-entitlement');
  let ads = 'div[class^="MarkupAds__Container-"], div[class*="_AdContainer-"], div[class^="Dailymotion__Wrapper-"], div.banner, aside.sidebar, div#mantis-carousel-wrapper:has( > mantis-ui-widget:empty)';
  hideDOMStyle(ads);
}

else if (matchDomain(uk_reach_domains) || document.querySelector('footer a[href="https://jobs.reachplc.com/jobs"]')) {
  let ads = document.querySelectorAll('div#superbanner, div.ad-wrapper, div[id^="div-gpt-ad-"], div.taboola-above-article, div#mantis-recommender-top-placeholder, div#ovp-primis, div[data-testid^="commercial-"]');
  removeDOMElement(...ads);
}

else
  csDone = true;

} else {//other (like com/org & not ar/at/au/be/br/cat/ch/cl/de/dk/fi/fr/es/ie/nl/pe/pt/se/uk/uy))

if (matchDomain('404media.co')) { //custom
  func_post = function () {
    let paywall = pageContains('h2', 'This post is for paid members only');
    if (paywall.length) {
      removeDOMElement(paywall[0].parentNode);
      header_nofix('article', '', 'BPC > no archive-fix');
    }
    document.querySelectorAll('img[src^="https://archive."][currentsourceurl]').forEach(e => e.src = e.getAttribute('currentsourceurl'));
    let iframe_divs = document.querySelectorAll('div[frameborder][old-src]');
    for (let elem of iframe_divs) {
      let iframe = document.createElement('iframe');
      iframe.src = elem.getAttribute('old-src');
      iframe.style = 'width: 90%; aspect-ratio: 16 / 9; border: 0;';
      iframe.scrolling = 'no';
      if (elem.parentNode.getAttribute('style').includes('padding-top:'))
        elem.parentNode.style['padding-top'] = '0px';
      elem.parentNode.replaceChild(iframe, elem);
    }
  }
}

else if (matchDomain(usa_adv_local_domains)) {
  if (!window.location.search.startsWith('?outputType=amp')) {
    document.querySelectorAll('.article__paragraph--blur').forEach(e => e.classList.remove('article__paragraph--blur'));
    let paywall_sel = 'div.paywall';
    let paywall = document.querySelector(paywall_sel);
    let article = document.querySelector('div.entry-content');
    if (paywall && article && dompurify_loaded) {
      function fusionGetContent(fusion_text) {
        try {
          let json = JSON.parse(fusion_text.split('Fusion.globalContent=')[1].split(';Fusion.')[0]);
          if (json) {
            let section = article.querySelector('div[style="display: none;"] > section');
            article.innerHTML = '';
            let parser = new DOMParser();
            let pars = json.content_elements;
            for (let par of pars) {
              let par_new;
              if (['header', 'text'].includes(par.type)) {
                if (par.content) {
                  let doc = parser.parseFromString('<p class="article__paragraph">' + DOMPurify.sanitize(par.content) + '</p>', 'text/html');
                  par_new = doc.querySelector('p');
                }
              } else if (par.image_type) {
                if (par.url) {
                  let caption_text = par.caption;
                  if (par.credits && par.credits.by && par.credits.by[0] && par.credits.by[0].byline)
                    caption_text += ' - ' + par.credits.by[0].byline;
                  par_new = makeFigure(par.url, caption_text, {alt: par.alt_text}, {'class': 'article__image-caption'});
                  par_new.className = 'article__image';
                  par_new.style = 'width: 75%; margin-left: auto; margin-right: auto;';
                }
              } else if (par.type === 'custom_embed') {
                if (par.subtype === 'custom-image' && par.embed && par.embed.config) {
                  let config = par.embed.config;
                  if (config.image_src) {
                    let caption_text = config.image_caption;
                    if (config.image_credit)
                      caption_text += ' ' + config.image_credit;
                    par_new = makeFigure(config.image_src, caption_text, {}, {'class': 'article__image-caption'});
                    par_new.className = 'article__image';
                  }
                }
              } else if (par.raw_oembed) {
                if (par.raw_oembed.html) {
                  let doc = parser.parseFromString('<p>' + DOMPurify.sanitize(par.raw_oembed.html, dompurify_options) + '</p>', 'text/html');
                  par_new = doc.querySelector('p');
                }
              } else if (par.type === 'list') {
                if (par.items) {
                  par_new = document.createElement('ul');
                  for (let item of par.items) {
                    let li = document.createElement('li');
                    let doc = parser.parseFromString('<span>' + DOMPurify.sanitize(item.content) + '</span>', 'text/html');
                    let span = doc.querySelector('span');
                    li.appendChild(span);
                    par_new.appendChild(li);
                  }
                }
              } else if (!['quote', 'raw_html'].includes(par.type)) {
                console.log(par);
              }
              if (par_new)
                article.appendChild(par_new);
            }
            if (section) {
              section.parentNode.removeAttribute('style');
              article.appendChild(section);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      let fusion_script = document.querySelector('script#fusion-metadata');
      if (fusion_script) {
        paywall.classList.remove('paywall');
        if (fusion_script.text.includes('Fusion.globalContent=')) {
          fusionGetContent(fusion_script.text);
        } else {
          let url = window.location.href.split(/[#\?]/)[0];
          fetch(url)
          .then(response => {
            if (response.ok) {
              response.text().then(html => {
                if (html.includes('Fusion.globalContent='))
                  fusionGetContent(html);
              });
            }
          });
        }
      } else
        amp_redirect(paywall_sel, '', window.location.pathname + '?outputType=amp');
    }
  }
  let ads = 'div.ad, div.ad-inner, div.ad-unit, div#below-toprail, div[id^="taboola"], div.content-blocker__wrapper';
  hideDOMStyle(ads);
}

else if (matchDomain('abqjournal.com')) {
  let paywall = document.querySelector('div.lab-paywall-locked');
  if (paywall)
    paywall.classList.remove('lab-paywall-locked');
}

else if (matchDomain('adn.com')) {
  let ads = 'div.adn-adwrap, span.rev-content-widget__ad-label';
  hideDOMStyle(ads);
}

else if (matchDomain('adweek.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let fade = 'div.adw-article-body div[style*="linear-gradient"]';
    hideDOMStyle(fade);
    let article = document.querySelector('div.non-paywall');
    if (article) {
      let json_script = getArticleJsonScript();
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text);
          if (json && json.sharedContent) {
            let json_text = json.sharedContent.articleBody;
            if (json_text.match(/\[[^\[]+]/)) {
              let url = window.location.href;
              article.after(googleSearchToolLink(url));
              header_nofix('div#bpc_archive', '', 'BPC > no fix (missing (social) media)');
            }
            json_text = json_text.replace(/\[[^\[]+]/g, '').replace(/((\r)?\n)+/g, '\r\n\r\n');
            if (json_text)
              article.innerText = json_text;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

else if (matchDomain('ajc.com')) {
  let paygate = document.querySelector('div.story-paygate_placeholder');
  if (paygate)
    paygate.removeAttribute('class');
  let video_blocker = document.querySelector('div.video-blocker');
  removeDOMElement(video_blocker);
  let ads = 'div.arc_ad';
  hideDOMStyle(ads);
}

else if (matchDomain('al-monitor.com')) {
  func_post = function () {
    if (mobile) {
      let article = document.querySelector(article_sel);
      if (article) {
        let lazy_images = article.querySelectorAll('picture > img[loading="lazy"][style]');
        for (let elem of lazy_images) {
          elem.style = 'width: 95%;';
          elem.parentNode.removeAttribute('style');
        }
        let art_width = article.offsetWidth - 20 + 'px';
        let header = document.querySelector('header');
        if (header)
          header.style.width = art_width;
        let elems = article.querySelectorAll(':not(a, svg)[style*="width"]');
        for (elem of elems) {
          elem.style.width = art_width;
          elem.style['grid-template-columns'] = '';
        }
        let lang = article.querySelector('div[style] > ul[style*="align-items"]');
        if (lang)
          lang.parentNode.removeAttribute('style');
        let par = article.querySelector('div[style] > div[dir="ltr"]');
        if (par)
          par.parentNode.style = 'width: ' + art_width;
      }
    }
  }
  let url = window.location.href;
  let paywall_sel = cs_param.paywall_sel || 'div.node__paywall';
  let article_sel = 'article';
  let paywall = document.querySelector(paywall_sel);
  if (paywall) {
    let article_hidden = document.querySelector('div.ab-control');
    let article_main = document.querySelector('div[class^="ab-variation"]');
    if (article_hidden && article_main) {
      removeDOMElement(article_hidden);
      article_main.removeAttribute('class');
      article_main.removeAttribute('style');
    }
    getArchive(url, paywall_sel, '', article_sel, '', article_sel, article_sel + ' > div');
  }
}

else if (matchDomain('americanbanker.com') || matchDomain(usa_arizent_custom_domains)) {
  let inline_gate = document.querySelector('.inline-gate');
  if (inline_gate) {
    inline_gate.classList.remove('inline-gate');
    let inline_gated = document.querySelectorAll('.inline-gated');
    for (let elem of inline_gated)
      elem.classList.remove('inline-gated');
  }
  let ads = document.querySelectorAll('div.GoogleDfpAd');
  removeDOMElement(...ads);
}

else if (matchDomain('anandabazar.com')) {
  let paywall = document.querySelector('div.readmoreouterbox');
  if (paywall) {
    paywall.removeAttribute('class');
    let outerbox = document.querySelector('article#outerboxarticlebox');
    if (outerbox)
      outerbox.removeAttribute('id');
  }
  let expcontainer = document.querySelector('div.expcontainer');
  if (expcontainer)
    expcontainer.removeAttribute('class');
  let ads = 'div.paywallouterbox, div.readarticlebox, div.showmorebox, div.adbox';
  hideDOMStyle(ads);
}

else if (matchDomain('artnet.com')) {
  if (window.location.pathname.endsWith('/amp-page')) {
    amp_unhide_subscr_section();
  } else {
    let body_hidden = document.querySelector('.article-body');
    if (body_hidden)
      body_hidden.style = 'display:block;';
    let banner = document.querySelector('div[id^="issuem-leaky-paywall-"]');
    removeDOMElement(banner);
  }
}

else if (matchDomain('asia.nikkei.com')) {
  let paywall = document.querySelector('div#paywall-offer');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div#article-body-preview > div');
    if (article) {
      let json_script = document.querySelector('script#__NEXT_DATA__');
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text);
          if (json && json.props.pageProps.data.body) {
            let json_text = json.props.pageProps.data.body;
            if (!json_text.includes('<div>'))
              json_text = '<div>' + json_text + '</div>';
            let parser = new DOMParser();
            let doc = parser.parseFromString(DOMPurify.sanitize(json_text, dompurify_options), 'text/html');
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
  let banners = 'div#pianoj_ribbon, div#paywall-offer';
  hideDOMStyle(banners);
}

else if (matchDomain('axios.com')) {
  function axios_noscroll(node) {
    node.removeAttribute('style');
    let overlay = 'div[class^="Modal_paywall"], div[class^="Modal_cta"]';
    hideDOMStyle(overlay, 2);
  }
  let noscroll = document.querySelector('html[style]');
  if (noscroll)
    axios_noscroll(noscroll);
  waitDOMAttribute('html', 'HTML', 'style', axios_noscroll, true);
  let banners = 'div[data-cy="pro-paywall"], div.apexAd, div[class*="NativeAd"], span[data-ad-type]';
  hideDOMStyle(banners);
  csDoneOnce = true;
}

else if (matchDomain('balkaninsight.com')) {
  getJsonUrl('div.subscribeWrapper', '', 'div.post_teaser', {art_append: 1, art_hold: 1});
}

else if (matchDomain('bangkokpost.com')) {
  let paywall = document.querySelector('div.force_login--popup');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article-content.is-paywalled');
    if (article) {
      article.className = 'article-content';
      article.removeAttribute('style');
      let pars_hidden = article.querySelectorAll('p, h2');
      for (let par of pars_hidden) {
        par.innerText = [...par.innerText].reverse().join('');
      }
    }
  }
}

else if (matchDomain(['barandbench.com', 'theleaflet.in', 'thenewsminute.com'])) {
  let paywall = document.querySelector('div[id*="paywall-banner"]');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.paywall');
    if (article) {
      let article_new = getArticleQuintype();
      if (article_new && article.parentNode)
        article.parentNode.replaceChild(article_new, article);
    }
  }
}

else if (matchDomain('benzinga.com')) {
  function benz_main(node) {
    removeDOMElement(node);
    if (!window.location.pathname.startsWith('/report/')) {
      let blurred = document.querySelector('div.article-content-paywalled');
      if (blurred) {
        blurred.classList.remove('article-content-paywalled');
        let key_points = document.querySelectorAll('li.blur-sm');
        for (let elem of key_points)
          elem.classList.remove('blur-sm');
        let article = document.querySelector('div#article-body');
        if (article) {
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.text);
              if (json && json.props.pageProps.article.primaryImage) {
                let img_data = json.props.pageProps.article.primaryImage;
                if (img_data.url) {
                  let img = document.createElement('img');
                  img.src = img_data.url;
                  img.alt = img_data.alt;
                  article.before(img);
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    } else {
      let blurred = document.querySelector('div.blur-lg');
      if (blurred)
        blurred.classList.remove('blur-lg');
    }
  }
  waitDOMElement('div.paywall-content', 'DIV', benz_main, false);
  csDoneOnce = true;
}

else if (matchDomain('bhaskar.com')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    let paywall_sel = 'div.paywallBlockedContent';
    let paywall = document.querySelector(paywall_sel);
    if (paywall) {
      let banner = document.querySelector(paywall_sel + ' ~ div');
      if (banner)
        removeDOMElement(banner);
      paywall.removeAttribute('class');
    }
    let ads = document.querySelectorAll('div[style*="overflow:hidden"][style*="max-height:"], div[id^="Ad--"], article  div:empty');
    if (ads)
      removeDOMElement(...ads);
  } else
    ampToHtml();
}

else if (matchDomain('bizjournals.com')) {
  if (window.location.pathname.includes('/subscriber-only/')) {
    header_nofix('div.primary');
  } else {
    let paywall = document.querySelector('div.paywall-content:empty');
    if (paywall && dompurify_loaded) {
      paywall.classList.remove('paywall-content');
      let gallery_intro = document.querySelector('header div[data-dev="MediaGallery"]');
      if (window.location.search.startsWith('?rel=gallery')) {
        if (gallery_intro)
          header_nofix('header', '', 'BPC > go to full article', window.location.href.split('?')[0] + '?rel=plus');
        return;
      } else if (!window.location.search.startsWith('?rel=plus')) {
        window.location.href = window.location.pathname + '?rel=plus';
        return;
      }
      if (gallery_intro)
        header_nofix('header', '', 'BPC > show intro gallery', window.location.href.split('?')[0] + '?rel=gallery');
      let header_images = document.querySelectorAll('img[loading][width][src]');
      for (let img of header_images) {
        let img_width_match = img.src.match(/(\*\d+xx)/);
        if (img_width_match)
          img.src = img.src.replace(img_width_match[1], '*' + img.width + 'xx');
      }
      let article = document.querySelector('div#ContentTease');
      if (article) {
        let json_script = document.querySelector('script#__NUXT_DATA__');
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            if (json) {
              let pars_index = json.indexOf('paragraph') + 1;
              if (pars_index) {
                let intro = article.querySelector('p[class]');
                let par_class = intro ? intro.className : 'content mb-4';
                article.innerHTML = '';
                let parser = new DOMParser();
                let hl_index = json.indexOf('highlights') + 1;
                if (hl_index) {
                  let container = document.createElement('div');
                  container.className = 'border border-gray-300 p-2 font-sans';
                  container.style = 'margin-bottom: 20px;';
                  let title = document.createElement('h3');
                  title.className = 'pb-4 font-bold';
                  title.innerText = 'Story Highlights';
                  let doc = parser.parseFromString('<div class="' + par_class + '">' + DOMPurify.sanitize(json[hl_index], dompurify_options) + '</div>', 'text/html');
                  let highlights = doc.querySelector('div');
                  container.append(title, highlights);
                  article.appendChild(container);
                }
                let json_images = json.filter(x => x && x.ord && x.url);
                for (let i = pars_index; i < json.length; i++) {
                  let par = json[i];
                  if (!par)
                    continue;
                  let style;
                  if (par === 'header') {
                    style = 'font-weight: bold;';
                    i++;
                    par = json[i];
                  } else if (par.type && json[par.type] === 'media' && par.ord) {
                    let json_img = json_images.find(x => x.ord === par.ord);
                    if (json_img) {
                      let figure = makeFigure(json[json_img.url], json[json_img.caption].replace(/<br>/g, '') + (json[json_img.byline] ? '\r\n' + json[json_img.byline].toUpperCase() : ''), {alt: json[json_img.altText]});
                      figure.className = par_class;
                      article.appendChild(figure);
                    }
                  } else if (par.type && json[par.type] === 'gallery' && par.id) {
                    let gallery = json.find(x => x && x.media && x.id === par.id && x.type && json[x.type] === 'gallery');
                    if (gallery) {
                      if (gallery.title) {
                        let title = document.createElement('p');
                        title.innerText = json[gallery.title];
                        title.style = 'font-weight: bold;';
                        article.appendChild(title);
                      }
                      for (let img of json[gallery.media]) {
                        let json_img = json[img];
                        let figure = makeFigure(json[json_img.url], json[json_img.caption].replace(/<br>/g, '') + (json[json_img.byline] ? '\r\n' + json[json_img.byline].toUpperCase() : ''), {alt: json[json_img.altText]});
                        figure.className = par_class;
                        article.appendChild(figure);
                      }
                    }
                  }
                  if (typeof par === 'string' && !['blockquote', 'default', 'embed', 'gallery', 'horizontal_line', 'image', 'list', 'media', 'top25list'].includes(par)) {
                    if (par.match(/^\d{4}-\d{2}-/))
                      break;
                    let doc = parser.parseFromString('<div class="' + par_class + '">' + DOMPurify.sanitize(par, dompurify_options) + '</div>', 'text/html');
                    let par_new = doc.querySelector('div');
                    par_new.querySelectorAll('iframe[allow*="fullscreen"][allowfullscreen]').forEach(e => e.removeAttribute('allowfullscreen'));
                    if (style)
                      par_new.style = style;
                    article.appendChild(par_new);
                  } else if (par.is_primary || par['primary-channel'])
                    break;
                }
              }
              let audio_tts = document.querySelector('div[data-dev="ArticlePlayer"]');
              if (audio_tts) {
                let audio_src = json.find(x => x && typeof x === 'string' && x.endsWith('.mp3'));
                if (audio_src) {
                  let audio_new = document.createElement('audio');
                  audio_new.src = 'https://audiop.bizjournals.com' + audio_src;
                  audio_new.setAttribute('controls', '');
                  audio_tts.parentNode.replaceChild(audio_new, audio_tts);
                }
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else if (window.location.pathname.endsWith('.html')) {
      let main_content = document.querySelector('div.main-content');
      if (main_content && !main_content.querySelector('div'))
        header_nofix(main_content, '', 'BPC > go to main page to pass Cloudflare check', window.location.href.split(/\/(news|stories)\//)[0]);
    }
    window.setTimeout(function () {
      let dialog = document.querySelector('div[id^="headlessui-dialog-"], div.sheet-overlay');
      if (dialog) {
        removeDOMElement(dialog);
        let html = document.querySelector('html[style]');
        if (html)
          html.removeAttribute('style');
        let overlays = document.querySelectorAll('html.is-overlaid, body.is-overlaid');
        for (let elem of overlays)
          elem.classList.remove('is-overlaid');
        let nuxt_inert = document.querySelector('div#__nuxt[inert]');
        if (nuxt_inert)
          nuxt_inert.removeAttribute('inert');
      }
    }, 1000);
  }
  let ads = 'div.adwrap, div[data-dev="MovableAd"]';
  hideDOMStyle(ads);
}

else if (matchDomain('bloomberg.com')) {
  if (!runOnce) {
    runOnce = true;
    document.querySelectorAll('html[class], body[class]').forEach(e => e.removeAttribute('class'));
    waitDOMAttribute('html', 'HTML', 'class', node => node.removeAttribute('class'), true);
    waitDOMAttribute('body', 'BODY', 'class', node => node.removeAttribute('class'), true);
  }
  function addLink(item, elem) {
    if (item.data && item.content) {
      if (!item.data.href.startsWith('http') && item.data.webUrl)
        item.data.href = item.data.webUrl;
      if (item.content && item.content[0] && item.content[0].value) {
        let item_value = item.content[1] ? item.content.map(x => x.value).join('') : item.content[0].value;
        addLinkValue(item_value, item.data.href, elem);
      }
    }
  }
  function addLinkValue(item_text, item_href, elem) {
    if (item_href.startsWith('bbg://securities/') && !item_href.split('bbg://securities/')[1].includes('/')) {
      let path = '/quote/';
      if (item_href.match(/\/\d+[A-Z]%20[A-Z]{2}%20Equity/)) {
        path = '/profile/company/';
        item_href = item_href.replace('%20Equity', '').replace('%20', ':');
      }
      item_href = 'https://www.bloomberg.com' + path + item_href.split('bbg://securities/')[1];
    }
    let sub_elem = makeLink(item_href, item_text, 'text-decoration: underline;');
    if (item_href.startsWith('http') && (!item_href.startsWith(window.location.origin) || item_href.match(/\.bloomberg\.com\/(quote|profile\/company)\//)))
      sub_elem.target = '_blank';
    elem.appendChild(sub_elem);
  }
  function addEmbed(item, elem) {
    if (item.iframeData && item.iframeData.html) {
      let parser = new DOMParser();
      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(item.iframeData.html, dompurify_options) + '</div>', 'text/html');
      let embed_elem = doc.querySelector('div');
      elem.appendChild(embed_elem);
    }
  }
  function addMedia(par, elem) {
    if (par.subType === 'video') {
      if (par.data.video && par.data.video.src) {
        let video = document.createElement('video');
        video.src = par.data.video.src;
        video.setAttribute('controls', '');
        elem.appendChild(video);
        if (par.data.video.caption) {
          let caption = document.createElement('span');
          caption.innerText = parseHtmlEntities(par.data.video.caption.replace(/<\/?\w+>/g, '')) + (par.data.video.credit ? ' ' + par.data.video.credit : '');
          elem.appendChild(caption);
        }
        if (!window.navigator.userAgent.toLowerCase().includes('chrome') && video.src.includes('.m3u8')) {
          let video_link = document.createElement('a');
          video_link.href = video.src;
          video_link.innerText = 'Open video(m3u8)-link in media player';
          video_link.target = '_blank';
          video.before(video_link);
        }
      }
    } else if (par.subType === 'photo') {
      if (par.data.photo && par.data.photo.src) {
        let figure;
        if (!par.data.photo.caption.includes('href=')) {
          figure = makeFigure(par.data.photo.src, parseHtmlEntities((par.data.photo.caption + ' ' + par.data.photo.credit).replace(/<\/?\w+>/g, '')));
        } else {
          figure = document.createElement('figure');
          let img = document.createElement('img');
          img.src = par.data.photo.src;
          figure.appendChild(img);
          if (par.data.photo.caption) {
            let caption = document.createElement('figcaption');
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.data.photo.caption + ' ' + par.data.photo.credit, dompurify_options) + '</div>', 'text/html');
            let cap_div = doc.querySelector('div');
            caption.appendChild(cap_div);
            figure.appendChild(caption);
          }
        }
        elem.appendChild(figure);
      }
    } else if (par.subType === 'chart') {
      if (par.data.chart) {
        let figure = document.createElement('figure');
        if (false && par.data.attachment && par.data.attachment.title)
          figure.appendChild(document.createTextNode(par.data.attachment.title));
        let img = document.createElement('img');
        img.src = par.data.chart.fallback || par.data.chart.src;
        figure.appendChild(img);
        if (false && par.data.attachment && (par.data.attachment.source || par.data.attachment.footnote)) {
          let caption = document.createElement('figcaption');
          caption.innerText = par.data.attachment.source + '\r\n' + par.data.attachment.footnote;
          figure.appendChild(caption);
        }
        elem.appendChild(figure);
      }
    } else if (par.subType === 'audio') {
      addPodcast(par.data, elem);
    } else
      console.log(par);
  }
  function addPodcast(data, elem) {
    if (data.attachment && data.attachment.url && data.attachment.title && data.attachment.description) {
      let title = document.createTextNode(data.attachment.title);
      let audio = document.createElement('audio');
      audio.src = data.attachment.url;
      audio.setAttribute('controls', '');
      let parser = new DOMParser();
      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(data.attachment.description.replace(/\n\n/g, '<br><br>'), dompurify_options) + '</div>', 'text/html');
      let description = doc.querySelector('div');
      description.style = 'margin: 20px 0px; padding: 20px; border: 1px solid black;';
      description.firstChild.before(title, audio);
      elem.appendChild(description);
    }
  }
  function addEntity(item, elem) {
    if (item.content && item.content[0] && item.content[0].value) {
      if (item.subType === 'person') {
        elem.appendChild(document.createTextNode(item.content[0].value));
      } else if (item.subType === 'security') {
        if (item.data && item.data.link && item.data.link.href)
          addLinkValue(item.content[0].value, item.data.link.href, elem);
        else
          elem.appendChild(document.createTextNode(item.content[0].value));
      } else if (item.subType === 'story' && item.data && item.data.link) {
        if (item.data.link.destination && item.data.link.destination.web)
          addLinkValue(item.content[0].value, item.data.link.destination.web, elem);
        else if (item.data.link.title)
          elem.appendChild(document.createTextNode(item.data.link.title));
      } else
        console.log(item);
    }
  }
  function addList(content, elem) {
    let ul = document.createElement('ul');
    ul.setAttribute('style', 'list-style-type: disc; padding: 5px;');
    for (let item of content) {
      if (item.type === 'listItem') {
        let li = document.createElement('li');
        for (let list_item of item.content) {
          if (list_item.type === 'text' && list_item.value) {
            li.appendChild(document.createTextNode(list_item.value));
          } else if (list_item.type === 'paragraph' && list_item.content) {
            addPar(list_item.content, li);
          } else if (list_item.type === 'link') {
            addLink(list_item, li);
          } else if (list_item.type === 'entity' && list_item.content && list_item.content[0] && list_item.content[0].value) {
            addEntity(list_item, li);
          } else if (list_item.type === 'div' && list_item.content) {
            addPar(list_item.content, li);
          } else
            console.log(list_item);
        }
        ul.appendChild(li);
      }
    }
    elem.appendChild(ul);
  }
  function addPar(content, elem) {
    for (let item of content) {
      if (item.type === 'text' && item.value) {
        let span = document.createElement('span');
        span.innerText = item.value;
        if (item.attributes) {
          if (item.attributes.strong)
            span.style = 'font-weight: bold';
          else if (item.attributes.emphasis)
            span.style = 'font-style: italic';
          else
            console.log(item);
        }
        elem.appendChild(span);
      } else if (['br', 'hr'].includes(item.type)) {
        elem.appendChild(document.createElement(item.type));
      } else if (item.type === 'link') {
        addLink(item, elem);
      } else if (item.type === 'entity') {
        addEntity(item, elem);
      } else if (['paragraph', 'div'].includes(item.type)) {
        addPar(item.content, elem);
      } else if (item.type === 'list' && item.content) {
        addList(item.content, elem);
      } else if (item.type === 'media' && item.data) {
        addMedia(item, elem);
      } else if (item.type === 'embed') {
        addEmbed(item, elem);
      } else if (item.type === 'footnoteRef') {
        if (item.data && item.data.footnoteContent && item.data.footnoteContent[0]) {
          let sub_item = item.data.footnoteContent[0];
          if (['paragraph', 'div'].includes(sub_item.type)) {
            footnote_nr++;
            let footnote_link = makeLink('#footer-ref-footnote-' + footnote_nr, footnote_nr, 'font-size: smaller; vertical-align: super; margin: 0px 5px; text-decoration: underline;');
            footnote_link.id = 'inline-ref-footnote-' + footnote_nr;
            elem.appendChild(footnote_link);
            let footnote_bottom = document.createElement('li');
            footnote_bottom.id = 'footer-ref-footnote' + footnote_nr;
            addPar(sub_item.content, footnote_bottom);
            let footnote_bottom_link = makeLink('#inline-ref-footnote-' + footnote_nr, 'View in article', 'margin: 0px 5px; text-decoration: underline;');
            footnote_bottom_link.id = 'footer-ref-footnote-' + footnote_nr;
            footnote_bottom.appendChild(footnote_bottom_link);
            footnotes.appendChild(footnote_bottom);
          } else
            console.log(sub_item);
        }
      } else
        console.log(item);
    }
  }
  let footnote_nr = 0;
  let footnotes = document.createElement('ol');
  footnotes.style = 'font-style: italic; margin: 20px 0px; list-style-type: decimal;';
  let url = window.location.href;
  if (url.match(/s\/\d{4}-/) && dompurify_loaded) {
    let json_next_script = document.querySelector('script#__NEXT_DATA__');
    if (json_next_script) {
      try {
        let json = JSON.parse(json_next_script.text);
        let json_pars = json.props.pageProps.story.body.content;
        let article_pars = document.querySelectorAll('div > p[class^="ArticleBodyText_"]');
        let article;
        if (article_pars.length && (article_pars.length < 5) && json_pars.length) {
          let par_class = article_pars[0].getAttribute('class');
          article = article_pars[0].parentNode;
          article.style = '-webkit-mask-image: none !important; mask-image: none !important;';
          if (json.props.pageProps.story.readingUrl) {
            let audio_tts = document.createElement('audio');
            audio_tts.src = json.props.pageProps.story.readingUrl;
            audio_tts.setAttribute('controls', '');
            article.before(audio_tts);
          }
          if (json.props.pageProps.story.aiSummary && json.props.pageProps.story.aiSummary.text && json.props.pageProps.story.aiSummary.text.length) {
            window.setTimeout(function () {
              let ai_summary = document.querySelector('div[class^="SummaryOnlyTakeaways_takeaways_"], div.done');
              if (!ai_summary) {
                ai_summary = document.createElement('div');
                ai_summary.style = 'width: 80%; margin: auto;';
                let title = document.createElement('div');
                title.innerText = 'Takeaways';
                title.style = 'font-weight: bold; margin: 20px;';
                ai_summary.appendChild(title);
                article.firstChild.before(document.createElement('br'), ai_summary);
              }
              if (ai_summary.className !== 'done') {
                ai_summary.className = 'done';
                ai_summary.style.border = 'solid';
                let ul = document.createElement('ul');
                ul.style = 'margin: 20px 50px; list-style-type: disc;';
                for (let elem of json.props.pageProps.story.aiSummary.text) {
                  let item = document.createElement('li');
                  item.innerText = elem;
                  ul.appendChild(item);
                }
                ai_summary.appendChild(ul);
              }
            }, 2000);
          }
          for (let par of json_pars) {
            let elem = document.createElement('p');
            elem.setAttribute('class', par_class);
            elem.setAttribute('data-component', 'paragraph');
            if (par.type === 'heading')
              elem.style = 'font-weight: bold;';
            if (['heading', 'paragraph'].includes(par.type) && par.content) {
              addPar(par.content, elem);
            } else if (par.type === 'hr') {
              let sub_elem = document.createElement('hr');
              elem.appendChild(sub_elem);
            } else if (par.type.endsWith('quote') && par.content) {
              elem.appendChild(document.createElement('br'));
              for (let item of par.content) {
                if (item.type === 'paragraph' && item.content) {
                  for (let sub_item of item.content) {
                    if (sub_item.type === 'text' && sub_item.value)
                      elem.appendChild(document.createTextNode(sub_item.value + ' '));
                    else if (sub_item.type === 'entity')
                      addEntity(sub_item, elem);
                  }
                }
              }
              elem.style = 'font-style: italic';
            } else if (par.type === 'media' && par.data) {
              addMedia(par, elem);
            } else if (par.type === 'embed') {
              addEmbed(par, elem);
            } else if (par.type === 'div' && par.content) {
              addPar(par.content, elem);
              elem.appendChild(document.createElement('br'));
            } else if (par.type === 'list' && par.content) {
              addList(par.content, elem);
            } else if (par.type === 'byTheNumbers' && par.content) {
              for (let item of par.content) {
                if (item.type === 'byTheNumbersItem' && item.content) {
                  for (let sub_item of item.content) {
                    if (sub_item.content) {
                      addPar(sub_item.content, elem);
                      elem.appendChild(document.createElement('br'));
                    }
                  }
                }
              }
            } else if (!['ad', 'inline-newsletter', 'inline-recirc', 'tabularData'].includes(par.type))
              console.log(par);
            if (elem.hasChildNodes)
              article.appendChild(elem);
          }
          removeDOMElement(...article_pars);
          if (footnote_nr)
            article.appendChild(footnotes);
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (window.location.pathname.includes('/live-blog/') && dompurify_loaded) {
    let paywall = document.querySelector('div[class*="Liveblog_regwallWaiting_"]');
    if (paywall) {
      paywall.removeAttribute('class');
      let json_next_script = document.querySelector('script#__NEXT_DATA__');
      if (json_next_script) {
        try {
          let json = JSON.parse(json_next_script.text);
          let liveblog = json.props.pageProps.liveblog;
          if (liveblog) {
            paywall.innerHTML = '';
            let posts = liveblog.posts;
            for (let post of posts) {
              let elem = document.createElement('div');
              elem.style = 'margin: 20px;';
              elem.style.width = document.querySelector('main') ? document.querySelector('main').offsetWidth * 0.8 + 'px' : '400px';
              if (post.body && post.body.content && post.body.content[0] && post.body.content[0].content) {
                let header = post.header;
                if (header) {
                  if (header.contributorName) {
                    if (header.contributorThumbnailUrl) {
                      let author_img = document.createElement('img');
                      author_img.src = header.contributorThumbnailUrl;
                      elem.appendChild(author_img);
                    }
                    if (header.contributorSlug) {
                      let author_link = makeLink('/authors/' + header.contributorSlug, header.contributorName, 'text-decoration: underline;');
                      elem.appendChild(author_link);
                    } else
                      elem.append(document.createTextNode(header.contributorName), document.createElement('br'));
                    if (header.timestamp && header.timestamp.raw)
                      elem.append(document.createTextNode(' - ' + new Intl.DateTimeFormat("en-US", {dateStyle: "long", timeStyle: "short", timeZone: "America/New_York"}).format(new Date(header.timestamp.raw))), document.createElement('br'));
                  }
                }
                let pars = post.body.content[0].content;
                for (let par of pars) {
                  if (par.type === 'text' && par.value) {
                    elem.appendChild(document.createTextNode(par.value));
                  } else if (par.type === 'link') {
                    addLink(par, elem);
                  } else if (par.type.endsWith('quote') && par.content) {
                    elem.appendChild(document.createElement('br'));
                    elem.style['font-style'] = 'italic';
                    addPar(par.content, elem);
                  } else if (par.type === 'div') {
                    elem.appendChild(document.createElement('br'));
                    addPar(par.content, elem);
                  } else if (par.type === 'br') {
                    elem.appendChild(document.createElement('br'));
                  } else
                    console.log(par);
                }
                elem.appendChild(document.createElement('hr'));
              }
              if (elem.hasChildNodes())
                paywall.appendChild(elem);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  } else if (window.location.pathname.startsWith('/quote/')) {
    let blur_class = '_contentBlur_';
    let blur_sel = 'div[class*="' + blur_class + '"]';
    document.querySelectorAll(blur_sel).forEach(e => e.removeAttribute('class'));
    waitDOMElement(blur_sel, 'DIV', x => {
      x.classList.forEach(y => {
        if (y.includes(blur_class))
          x.classList.remove(y);
      });
    });
  } else if (window.location.pathname.startsWith('/profile/company/')) {
    let scripts = document.querySelectorAll('script[type="application/ld+json"]');
    let json_script;
    for (let script of scripts) {
      if (script.innerText.includes(',"@type":"Organization",')) {
        json_script = script;
        break;
      }
    }
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        let article = document.querySelector('section[class^="info__"]');
        if (article) {
          let data = document.createElement('div');
          data.style = 'margin: 20px;';
          let br = document.createElement('br');
          let json_items = ['address', 'telephone', 'url', 'foundingDate', 'numberOfEmployees', 'employee'];
          for (let item of json_items) {
            if (json[item]) {
              let div = document.createElement('div');
              div.style = 'margin: 20px 0px;';
              if (item === 'employee') {
                if (json[item].length) {
                  div.innerText = 'EXECUTIVES/BOARD' + '\r\n';
                  for (let person of json[item]) {
                    if (person.name) {
                      let sub_div = document.createElement('div');
                      sub_div.innerText = person.name + (person.jobTitle ? ' - ' + person.jobTitle : (person.worksFor ? ' - ' + person.worksFor : ''));
                      div.appendChild(sub_div);
                    }
                  }
                }
              } else if (item === 'url') {
                div.innerText = 'WEBSITE' + '\r\n';
                let sub_div = document.createElement('a');
                sub_div.innerText = json[item];
                if (!json[item].startsWith('https://'))
                  json[item] = 'https://' + json[item];
                sub_div.href = json[item];
                sub_div.target = '_blank';
                div.appendChild(sub_div);
              } else
                div.innerText = item.toUpperCase() + '\r\n' + json[item];
              data.appendChild(div);
            }
          }
          article.appendChild(data);
        }
        removeDOMElement(json_script);
      } catch (err) {
        console.log(err);
      }
    }
    let profile_shimmering = 'div[class^="shimmering"]';
    hideDOMStyle(profile_shimmering);
  } else if (window.location.pathname.startsWith('/live/')) {
    setInterval(function () {
      window.localStorage.clear();
    }, 15 * 60 * 1000);
  }
  let paywall_sel = 'div#fortress-container-root';
  let leaderboard = 'div[id^="leaderboard"], div[class^="leaderboard"], div.canopy-container';
  let shimmering = 'article.first-story div[class*="Placeholder_placeholderParagraphWrapper-"]';
  let ads = 'div[data-ad-status], div[data-ad-type], div[class*="FullWidthAd_"], div.adWrapper, div.dvz-v0-ad';
  hideDOMStyle([paywall_sel, leaderboard, shimmering, ads].join(','));
}

else if (matchDomain('bloombergadria.com')) {
  let article_hidden = document.querySelector('article.single-news[style]');
  if (article_hidden)
    article_hidden.removeAttribute('style');
  let ads = '.banner';
  hideDOMStyle(ads);
}

else if (matchDomain('bostonglobe.com')) {
  if (window.location.search.startsWith('?outputType=amp'))
    amp_unhide_subscr_section();
}

else if (matchDomain('bt.no')) {
  let ads = 'div[class^="advertory-bt-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('business-standard.com')) {
  function bs_main(node) {
    removeDOMElement(node);
    let audio_tts = document.querySelector('audio[src$="-short.mp3"]');
    if (audio_tts)
      audio_tts.src = audio_tts.src.replace('-short', '');
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && json.props.pageProps.data.htmlContent) {
          let json_text = json.props.pageProps.data.htmlContent;
          let article_sel = cs_param.article_sel || 'article div[class^="MainStory_storycontent__"], article div[class^="blueprint-story-detail_storbpcontent_"]';
          let article = document.querySelector(article_sel);
          if (json_text && article) {
            removeDOMElement(json_script);
            article.innerHTML = '';
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
            let article_new = doc.querySelector('div');
            if (article_new) {
              if (mobile)
                article_new.style = 'width: 90%; margin: 20px;';
              let zoom_images = article_new.querySelectorAll('div > img.zoomimg');
              for (let img of zoom_images) {
                img.style = 'margin: 20px 0px;';
                let caption = img.parentNode.querySelector('div[style]');
                if (caption)
                  caption.removeAttribute('style');
              }
              window.setTimeout(function () {
                article.appendChild(article_new);
              }, 1000);
            }
          }
        } else
          refreshCurrentTab();
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!window.location.pathname.startsWith('/amp/')) {
    if (dompurify_loaded) {
      let paywall_sel = cs_param.paywall_sel || 'div[class^="subscription_subscriptionPlan_"], div[class^="BluePrintPaywall_BPstoryPaywall_"]';
      let paywall = document.querySelector(paywall_sel);
      if (paywall) {
        bs_main(paywall);
      } else {
        csDoneOnce = true;
        waitDOMElement(paywall_sel, 'DIV', bs_main, false);
      }
    }
    let banner = 'section.sbcrbtmlfull, div.subscribfixed_artcalLeftBox__hmpMi';
    let ads = 'div.advertisement-bg, div[id^="between_article_content_"]';
    hideDOMStyle(banner + ', ' + ads);
  } else
    ampToHtml();
}

else if (matchDomain('businessinsider.com')) {
  let ads = 'div.masthead-ad, div.l-ad, div.in-post-sticky, aside.has-video-ad, div.ad-callout-wrapper';
  hideDOMStyle(ads);
}

else if (matchDomain('businessinsider.jp')) {
  let paywall = document.querySelector('div.piano-paywall-container[hidden]');
  if (paywall)
    paywall.removeAttribute('hidden');
}

else if (matchDomain('businessoffashion.com')) {
  let ads = 'div[class^="default__AdsBlockWrapper"], div[data-test="common-nbabanner"]';
  hideDOMStyle(ads);
}

else if (matchDomain(ca_gcm_domains)) {
  let paywall = document.querySelector('div._block_1dgevo');
  if (paywall) {
    removeDOMElement(paywall);
    refreshCurrentTab();
  }
  let counter = document.querySelector('div#paywall-banner-content');
  removeDOMElement(counter);
}

else if (matchDomain('caravanmagazine.in')) {
  func_post = function () {
    let footer = document.querySelector(article_src_sel + ' footer');
    removeDOMElement(footer);
  }
  let url = url_old = window.location.href;
  let paywall_sel = cs_param.paywall_sel || 'div.pay_wall, div.reg_wall';
  let article_sel = cs_param.article_sel || 'div.article_content';
  let article_src_sel = cs_param.article_src_sel || 'div#app > header ~ div';
  setInterval(function () {
    url = window.location.href;
    if (url !== url_old) {
      url_old = url;
      if (url.match(/(\w+-){3,}/))
        refreshCurrentTab();
    }
    getArchive(url, paywall_sel, '', article_sel, '', article_src_sel);
    csDoneOnce = false;
    let subscr_button = document.querySelector('button[aria-label="Close subscription prompt"]');
    if (subscr_button)
      subscr_button.click();
  }, 1000);
}

else if (matchDomain('cen.acs.org')) {
  let meteredBar = document.querySelector('.meteredBar');
  removeDOMElement(meteredBar);
}

else if (matchDomain(['chronicle.com', 'philanthropy.com'])) {
  let preview = document.querySelector('div[data-content-summary]');
  removeDOMElement(preview);
  let article_hidden = document.querySelector('div[class~="contentBody" i][hidden]');
  if (article_hidden) {
    let attributes = [...article_hidden.attributes].filter(x => x.name !== 'class');
    for (let elem of attributes)
      article_hidden.removeAttribute(elem.name);
  }
  let ads = 'div.GoogleDfpAd-container';
  hideDOMStyle(ads);
}

else if (matchDomain('citywire.com')) {
  let ads = 'div.cw-top-advert';
  hideDOMStyle(ads);
}

else if (matchDomain('cnbc.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.ArticleGate-proGate');
    if (paywall) {
      removeDOMElement(paywall);
      let article = document.querySelector('div.ArticleBody-articleBody');
      if (article) {
        let intro = article.querySelectorAll('div.group > p');
        if (intro.length < 5) {
          removeDOMElement(...intro);
          article.style = "margin: 20px; font-family: Lyon,Helvetica,Arial,sans-serif; font-size: 18px; line-height: 1.66";
          let span_hidden = document.querySelectorAll('span[hidden]');
          for (let elem of span_hidden) {
            elem.removeAttribute('hidden');
            elem.removeAttribute('class');
            if (elem.innerText)
              elem.innerText = elem.innerText.split('DISCLOSURES: (None)')[0];
            article.appendChild(elem);
          }
        }
      }
    }
  }, 2000);
  let ads = 'div.TopBanner-container';
  hideDOMStyle(ads);
}

else if (matchDomain('cnn.com')) {
  let subwall = document.querySelector('div[data-component-id="subwall"]');
  if (subwall) {
    removeDOMElement(subwall);
    let noscroll = document.querySelectorAll('html[style], body[style]');
    for (let elem of noscroll)
      elem.removeAttribute('style');
    waitDOMAttribute('html', 'HTML', 'style', node => node.removeAttribute('style'), true);
    waitDOMAttribute('body', 'BODY', 'style', node => node.removeAttribute('style'), true);
  }
  let regwall_keys = Object.keys(window.localStorage).filter(x => x.match(/reg_?wall/i));
  for (let item of regwall_keys)
    window.localStorage.removeItem(item);
  let ads = 'div[class*="ad-slot-"], div.container__ads';
  hideDOMStyle(ads);
}

else if (matchDomain('columbian.com')) {
  header_nofix('story', 'div#inline-paywall');
  let ads = 'div.modal, div#sticky-footer-cta, div.article-inline, div[id^="ad-instory-"], div#onesignal-slidedown-container';
  hideDOMStyle(ads);
}

else if (matchDomain('csmonitor.com')) {
  let paywall = document.querySelector('div.paywall');
  removeDOMElement(paywall);
}

else if (matchDomain('cw.com.tw')) {
  header_nofix('div.article__content', 'div.paywall');
}

else if (matchDomain('cyclingnews.com')) {
  let paywall = document.querySelector('div.paywall-locker');
  if (paywall) {
    paywall.classList.remove('paywall-locker');
    let banner = 'div.kiosq-main-layer';
    hideDOMStyle(banner);
  }
  let metered_keys = Object.keys(window.localStorage).filter(x => x.match(/^kiosq_article/));
  for (let item of metered_keys)
    window.localStorage.removeItem(item);
}

else if (matchDomain('dagsavisen.no')) {
  let ads = 'div.arcad-block-container';
  hideDOMStyle(ads);
}

else if (matchDomain('dailyherald.com')) {
  let ads = 'div.dhTopAd, div[data-widget-host="revcontent"]';
  hideDOMStyle(ads);
}

else if (matchDomain('dallasnews.com')) {
  if (window.location.search.startsWith('?outputType=amp')) {
    amp_unhide_subscr_section();
  }
  let ads = 'div[data-block-type="ad"], div[data-pub-id], article div.b-gray300';
  hideDOMStyle(ads);
}

else if (matchDomain('defector.com')) {
  let paywall = document.querySelector('div[class^="ContentGate_wrapper__"]');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article_sel = 'div[class^="PostContent_wrapper__"]';
    let article = document.querySelector(article_sel);
    if (article) {
      window.setTimeout(function () {
        let pars = article.querySelectorAll('p');
        if (pars.length < 3) {
          let url = window.location.href.split('?')[0];
          replaceDomElementExt(url, false, false, article_sel);
        }
      }, 1000);
    }
  }
}

else if (matchDomain(['digiday.com', 'glossy.co', 'modernretail.co'])) {
  let ads = 'div[class^="ad_"]';
  hideDOMStyle(ads);
}

else if (matchDomain('discovermagazine.com')) {
  window.setTimeout(function () {
    let mammoth = document.querySelector('.iXVGnF');
    if (mammoth)
      refreshCurrentTab();
    let body = document.querySelector('body');
    if (body)
      body.style = 'overflow: auto !important;';
    let banners = 'div.fIkXwQ, div[style*="fadeIn"], div[role="button"][aria-label="Dismiss Dialog"]';
    hideDOMStyle(banners);
  }, 1000);
}

else if (matchDomain('dwell.com')) {
  if (window.location.pathname.match(/^(\/amp)?\/article\//)) {
    if (!window.location.search.startsWith('?rel=plus')) {
      let paywall = pageContains('div > a', /Try Dwell\+ for FREE/);
      if (paywall.length) {
        removeDOMElement(paywall[0]);
        window.location.href = window.location.pathname.replace(/^\/amp/, '') + '?rel=plus';
      }
    } else {
      let paywall = document.querySelector('div#mainPanel div[class^="FCR_"]');
      let article = document.querySelector('div > section[class]');
      if (paywall && article && dompurify_loaded) {
        removeDOMElement(paywall);
        article.classList.remove('_2S7l9_l2eDI5b8DSR29ijf');
        let filter = /^window\.INITIAL_STATE\s?=\s?/;
        let json_script = getSourceJsonScript(filter);
        if (json_script) {
          let split1 = json_script.text.split(filter)[1];
          let state = (split1.split('};')[0] + '}');
          if (state) {
            try {
              let json = JSON.parse(state);
              if (json) {
                let items = json.articles.items;
                let id = Object.keys(items)[0];
                let photos = json.photos ? json.photos.items : '';
                let json_text = items[id].attributes.body.replace(/(<br>|<span style=".+;">|<\/span>)/g, '');
                function find_img_url(match, p1, p2, offset, string) {
                  let contributorId;
                  let format;
                  if (photos && photos[p1]) {
                    contributorId = photos[p1].attributes.userId;
                    format = photos[p1].attributes.format;
                  }
                  let result = '<p>missing photo: ' + p1 + '</p>';
                  if (contributorId)
                    result = '<figure><img src="https://images2.dwell.com/photos/' + contributorId + '/' + p1 + '/original.' + format + '?auto=format&q=35&w=1280"><figcaption>' + p2 + '</figcaption></figure>';
                  return result;
                }
                json_text = json_text.replace(/<dwell-photo photoId="(\d+)"\scaption="([^"]+)"[^<]+photoUserId="\d*"\/>/g, find_img_url);
                let parser = new DOMParser();
                let doc = parser.parseFromString('<section class="' + article.className + '">' + DOMPurify.sanitize(json_text, dompurify_options) + '</section>', 'text/html');
                let article_new = doc.querySelector('section');
                article.parentNode.replaceChild(article_new, article);
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      let photo_links = document.querySelectorAll('div > a[href^="' + window.location.pathname.replace(/\/\d{8,}/, '') + '"]');
      for (let elem of photo_links)
        elem.href += '?rel=plus';
      let close_button = document.querySelector('header > div > span > svg');
      if (!document.querySelector('a#bpc_close') && close_button) {
        let elem = document.createElement('a');
        elem.href = window.location.pathname.split('?')[0].replace(/\/\d{8,}/, '');
        elem.id = 'bpc_close';
        elem.innerText = 'close';
        elem.style.color = 'white';
        close_button.parentNode.parentNode.appendChild(elem);
      }
    }
  }
  let ads = 'div.EYrS5iukqzJMkNAcFQ0ho';
  hideDOMStyle(ads);
}

else if (matchDomain('economictimes.com')) {
  if (window.location.pathname.includes('/amp_')) {
    let paywall = document.querySelector('.paywall_wrap');
    if (paywall && dompurify_loaded) {
      let content = document.querySelector('.paywall[style="display:none;"]');
      if (content) {
        let parser = new DOMParser();
        let doc = parser.parseFromString('<div style="margin: 20px 0px;">' + DOMPurify.sanitize(breakText(content.innerText).replace(/\n/g, '<br>'), dompurify_options) + '</div>', 'text/html');
        let content_new = doc.querySelector('div');
        let charts = content_new.querySelectorAll('iframe[id^="datawrapper-chart-"]');
        for (let elem of charts) {
          elem.width = '100%';
          elem.style.margin = '20px 0px';
        }
        if (content_new && content.parentNode)
          content.parentNode.replaceChild(content_new, content);
      } else {
        let link_alt = document.querySelector('head > link[rel="alternate"][href]');
        if (link_alt)
          window.location.href = link_alt.href;
      }
      let intro = document.querySelector('.art_wrap');
      let article_blocker = document.querySelector('.articleBlocker');
      removeDOMElement(paywall, intro, article_blocker);
    }
    let ads = 'amp-ad, amp-fx-flying-carpet, div.ads, div.taboolaAd, amp-consent';
    hideDOMStyle(ads);
  } else {
    window.setTimeout(function () {
      let paywall = document.querySelector('div#blocker_layer');
      let data_prime = document.querySelector('div[data-prime="1"]');
      let amphtml = document.querySelector('head > link[rel="amphtml"]');
      if (paywall || data_prime) {
        removeDOMElement(paywall);
        if (data_prime)
          data_prime.removeAttribute('data-prime');
        if (amphtml)
          amp_redirect_not_loop(amphtml);
        else if (window.location.pathname.startsWith('/epaper/'))
          window.location.href = 'https://economictimes.indiatimes.com' + window.location.pathname;
      } else {
        let ads = '.adContainer';
        hideDOMStyle(ads);
      }
    }, 500);
  }
}

else if (matchDomain('economictimes.indiatimes.com')) {
  let paywall = document.querySelector('section.prime_paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let content_sel = 'div.content1, div.artText';
    let content = document.querySelector(content_sel);
    let full_text = document.querySelector('div.paywall.p1');
    if (content && full_text) {
      content.innerText = breakText(full_text.innerText);
      if (full_text.innerText.match(/\[["`]datawrapper-height["`]\]/)) {
        let amphtml = document.querySelector('head > link[rel="amphtml"][href]');
        header_nofix(content_sel, '', 'BPC > for charts try amp-page', amphtml.href);
      }
    }
    addStyle('div.pageContent {height: auto !important;}');
    let article_wrap = document.querySelector('div.article_wrap[style]');
    if (article_wrap)
      article_wrap.removeAttribute('style');
  } else {
      let paywall = document.querySelector('article.primeArticle.paywall, div.paywall');
      if (paywall) {
        paywall.classList.remove('paywall');
        header_nofix(paywall.querySelector('div'));
      }
  }
  if (mobile) {
    let pageholder = document.querySelector('main.pageHolder');
    if (pageholder) {
      pageholder.classList.remove('pageHolder');
      let header = document.querySelector('header');
      if (header)
        header.style = 'width: 100% !important;';
      let f_col = document.querySelector('div.f_col');
      removeDOMElement(f_col);
    }
  }
  let ads = 'div.topAdContainer, div.vdo_ai_can_ani, div[data-ad-slot], div#topAd, div.stickyAd, div.blocker_wrap';
  hideDOMStyle(ads);
}

else if (matchDomain('economist.com')) {
  let ads = 'div[class*="adComponent"]';
  hideDOMStyle(ads);
}

else if (matchDomain('enotes.com')) {
  let paywall = document.querySelector('section#enotes-paywall');
  if (paywall) {
    let section_words = pageContains('p', /\(This entire section contains/);
    removeDOMElement(paywall, ...section_words);
    ext_api.runtime.sendMessage({request: 'clear_cookies_domain', data: {domain: 'enotes.com'}});
    let blurred = document.querySelectorAll('div.u-paywall');
    for (let elem of blurred)
      elem.className = 'o-rte-text u-space--top';
    let ads = document.querySelectorAll('div:not([class]) > div[id^="div-gpt-ad-"]');
    for (let ad of ads)
      hideDOMElement(ad.parentNode);
  }
}

else if (matchDomain('entrepreneur.com')) {
  let ads = 'div.ad__wrapper, div#piano-metered-container';
  hideDOMStyle(ads);
}

else if (matchDomain('epoch.org.il')) {
  let match = window.location.pathname.match(/\/(\d+)\//);
  if (match) {
    let article_id = match[1];
    getJsonUrl('div.register-login-box', '', 'div.paywall', {}, article_id);
  }
}

else if (matchDomain('espn.com')) {
  let url = window.location.href;
  getArchive(url, 'aside.espn-plus-container-wrapper', '', 'section#article-feed > article');
}

else if (matchDomain('euobserver.com')) {
  let paywall = pageContains(cs_param.paywall_sel || 'div > h4', cs_param.paywall_text || 'To read this story, log in or subscribe');
  if (paywall.length && dompurify_loaded) {
    removeDOMElement(paywall[0].parentNode);
    let article = document.querySelector(cs_param.article_sel || 'div:has(> p.rte-p)');
    if (article) {
      let filter = /^window\.__basedcache__\s?=\s?/;
      let json_script = getSourceJsonScript(filter);
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text.split(filter)[1]);
          if (json) {
            let body = findKeyJson(json, ['body']);
            if (body) {
              article.innerHTML = '';
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div style="font-size: 18px; line-height: 30px; position: relative;">' + DOMPurify.sanitize(body, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              article.appendChild(article_new);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

else if (matchDomain('fastcompany.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let filter = /\\"content\\":\[/;
    let json_script = getSourceJsonScript(filter, ':not([id], [src], [type])');
    if (json_script) {
      try {
        let json = JSON.parse('[' + json_script.text.split(filter)[1].split(/\],\\"/)[0].replace(/\\\\\\"/g, '\\"').replace(/(\[|,)\\"/g, '$1"').replace(/\\"(\]|,)/g, '"$1').replace(/\\\\n/g, '') + ']');
        if (json) {
          let article = document.querySelector('article');
          if (article) {
            article.innerHTML = '';
            article.className = 'article-container';
            let parser = new DOMParser();
            for (let pars of json)
              for (let par of pars) {
                if (!par.match(/^\$\w{2}$/)) {
                  let content_new = parser.parseFromString('<div class="content-chunk">' + DOMPurify.sanitize(par, dompurify_options) + '</div>', 'text/html');
                  let elem = content_new.querySelector('div');
                  let img_srcset_drop = elem.querySelectorAll('figure > img[srcset]');
                  for (let img of img_srcset_drop)
                    img.removeAttribute('srcset');
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
  let ads = 'div[class*="ad-wrapper"]';
  hideDOMStyle(ads);
}

else if (matchDomain('fieldandstream.com')) {
  let overlay = document.querySelectorAll('div[class^="mailmunch-"]');
  removeDOMElement(...overlay);
  let noscroll = document.querySelector('html.mailmunch-pop-open');
  if (noscroll)
    noscroll.removeAttribute('class');
}

else if (matchDomain('financialexpress.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall)
    paywall.classList.remove('paywall');
  let register = 'div.pcl-wrap';
  let ads_selector = window.location.pathname.endsWith('/lite/') ? '.ad-bg-container' : 'div[class*="-ads-blocks-ad-unit"]';
  hideDOMStyle(register + ', ' + ads_selector);
}

else if (matchDomain('firstthings.com')) {
  let paywall = 'div.leaky_paywall_message_wrap';
  hideDOMStyle(paywall);
  leaky_paywall_unhide_disable = true;
}

else if (matchDomain('fmrmagazine.com')) {
  let paywall = document.querySelector('div.fr-gate-overlay');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.issue-article-intro');
    if (article) {
      let url_src = window.location.href.split(/[#\?]/)[0] + '.json';
      fetch(url_src)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            try {
              let json_text = json.page.body_html;
              if (json_text) {
                let parser = new DOMParser();
                let doc = parser.parseFromString(DOMPurify.sanitize(json_text, dompurify_options), 'text/html');
                let article_new = doc.querySelector('div.issue-article-content');
                if (article_new)
                  article.after(article_new);
                addStyle('body {overflow: auto !important;}');
              }
            } catch (err) {
              console.log(err);
            }
          });
        }
      })
    }
  }
}

else if (matchDomain('forbes.com')) {
  waitDOMAttribute('html', 'HTML', 'class', node => node.removeAttribute('class'), true);
  waitDOMAttribute('body', 'BODY', 'class', node => node.removeAttribute('class'), true);
  csDoneOnce = true;
  let hardwall = document.querySelectorAll('div.halfway-hardwall-insertion-point');
  removeDOMElement(...hardwall);
  if (window.location.pathname.startsWith('/newsletters/')) {
    let paywall = document.querySelector('div > div.newsletter-teaser');
    if (paywall) {
      paywall.classList.remove('newsletter-teaser');
      let header = paywall.parentNode;
      header_nofix(header);
    }
  }
  let ads = 'fbs-ad, div[class^="fbs-ad"], div[data-testid^="fbs-ad"], div.inlineAdContainer, div[data-testid="locked-top-ad-container"]';
  hideDOMStyle(ads);
}

else if (matchDomain('foreignaffairs.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('.paywall');
    let loading_indicator = document.querySelector('.loading-indicator');
    let msg_bottom = document.querySelector('.messages--container--bottom');
    removeDOMElement(paywall, loading_indicator, msg_bottom);
    let article_dropcap = document.querySelectorAll('.article-dropcap');
    for (let elem of article_dropcap)
      elem.classList.add('loaded');
  }, 1000);
}

else if (matchDomain('foreignpolicy.com')) {
  let content_ungated = document.querySelector('div.content-ungated');
  if (content_ungated && dompurify_loaded) {
    removeDOMElement(content_ungated);
    let content_gated = document.querySelector('div.content-gated');
    if (content_gated) {
      let insider = document.querySelector('body.is-fp-insider');
      if (insider) {
        getJsonUrl('div.content-gated', {rm_class: 'content-gated'}, 'div.content-gated');
        window.setTimeout(function () {
          let lazy_images = document.querySelectorAll('img[loading="lazy"]');
          for (let elem of lazy_images)
            elem.removeAttribute('loading');
        }, 1000);
      } else
        content_gated.classList.remove('content-gated');
    }
  }
  let audio_tts_overlay = document.querySelector('div.fp-audio-embed--disabled > div.share-dropdown > span.bigfoot-footnote__container');
  if (audio_tts_overlay) {
    audio_tts_overlay.parentNode.removeAttribute('class');
    removeDOMElement(audio_tts_overlay);
  }
}

else if (matchDomain('fortune.com')) {
  let ads = 'div.leaderboard-ad-wrapper-parent, div.leading-0, div.z-body-popover, div.nativo-wrapper, div#outbrain-container, div[class^="sc-"]:has(> div[data-cy^="in-stream-"], > div > div[data-google-query-id]), div[class^="min-h-"]:has(> div#article-piano-template-plea-container)';
  hideDOMStyle(ads);
}

else if (matchDomain('foxnews.com')) {
  let paywall = document.querySelector('div.article-gating-wrapper');
  removeDOMElement(paywall);
  let overlay = document.querySelector('div[class*="gated-overlay"]');
  if (overlay)
    overlay.removeAttribute('class');
}

else if (matchDomain('ftm.eu')) {
  let videos = document.querySelectorAll('div.body > div.video-pp');
  for (let video of videos) {
    let video_id_dom = video.querySelector('a.video[data-youtube-id]');
    if (video_id_dom) {
      video_new = document.createElement('iframe');
      video_new.src = 'https://www.youtube.com/embed/' + video_id_dom.getAttribute('data-youtube-id');
      video_new.style = 'width: 95%; height: 400px; margin: 0px 20px;';
      video.parentNode.replaceChild(video_new, video);
    }
  }
  let audio_controls = document.querySelectorAll('audio[controls][style]');
  for (let elem of audio_controls)
    elem.removeAttribute('style');
  document.querySelectorAll('div.foldable').forEach(e => e.classList.remove('foldable'));
  let banners = 'div.banner-pp';
  hideDOMStyle(banners);
}

else if (domain = matchDomain(['haaretz.co.il', 'haaretz.com', 'themarker.com'])) {
  if (window.location.pathname.match(/\/ty-article(-\w+)?\//)) {
    blockJsReferrer();
    let mh = document.querySelector('div[data-test="masthead"]');
    if (!mh) {
      let article = document.querySelector('main, header#masthead > svg');
      if (article) {
        let mh_new = document.createElement('div');
        mh_new.style = 'font-size: 20px; font-weight: bold; text-align: center; margin: 20px;';
        mh_new.setAttribute('data-test', 'masthead');
        let main = document.createElement('a');
        main.href = 'https://www.' + domain;
        main.innerText = domain.toUpperCase();
        mh_new.appendChild(main);
        article.before(mh_new);
      }
    }
    window.setTimeout(function () {
      let hidden_images = document.querySelectorAll('a[data-test="link"][href^="/ty-image/"]:not([rel])');
      for (let elem of hidden_images) {
        elem.setAttribute('rel', '');
        if (!elem.querySelector('img')) {
          let figure_div = elem.querySelector('figure > div');
          if (figure_div) {
            let link_href = elem.href.replace('&amp;', '&');
            fetch(link_href)
            .then(response => {
              if (response.ok) {
                response.json().then(json => {
                  try {
                    let img_src = json.path || json.imageUrl;
                    let img = document.createElement('img');
                    img.src = img_src;
                    img.style = 'width: 90%;';
                    figure_div.parentNode.replaceChild(img, figure_div);
                  } catch (err) {
                    console.log(err);
                  }
                });
              }
            });
          }
        }
      }
      let facebook_videos = document.querySelectorAll('div.fb_iframe_widget[data-href]');
      for (let video of facebook_videos) {
        let video_new = document.createElement('iframe');
        video_new.src = video.getAttribute('data-href');
        video_new.style = 'width: 100%; aspect-ratio: 4 / 3; border: none;';
        video.parentNode.replaceChild(video_new, video);
      }
      document.querySelectorAll('video[data-src]:not([src])').forEach(e => e.src = e.getAttribute('data-src'));
      let podcasts = document.querySelectorAll('a[href^="https://traffic.omny.fm/"]');
      for (let elem of podcasts) {
        let podcast_new = document.createElement('audio');
        podcast_new.src = elem.href.split('?')[0];
        podcast_new.setAttribute('controls', '');
        elem.parentNode.appendChild(podcast_new);
        elem.href = 'javascript:void(0)"';
      }
      document.querySelectorAll('a[href*="_app=true"]').forEach(e => e.href = e.href.split('?')[0]);
    }, 1000);
  } else if (window.location.pathname.startsWith('/hblocked') && window.location.search.startsWith('?returnTo='))
    header_nofix('main', '', 'BPC > return to article', decodeURIComponent(window.location.search.split('?returnTo=')[1]));
  let history_keys = Object.keys(window.localStorage).filter(x => x.match(/^(reading(Count)?History|raData)/i));
  for (let item of history_keys)
    window.localStorage.removeItem(item);
  let ads = 'div[data-testid="static-ad-slot"], div.fe-button-ruler';
  hideDOMStyle(ads);
}

else if (matchDomain('harpers.org')) {
  let paywall = document.querySelector('div#full-paywall');
  if (paywall) {
    paywall.removeAttribute('id');
    header_nofix(paywall, '', 'BPC > no fix (for older articles archive may work)');
    let url = window.location.href;
    paywall.before(archiveLink(url));
  }
  let ads = 'div#ctas';
  hideDOMStyle(ads);
}

else if (matchDomain('hbr.org')) {
  if (window.location.pathname.startsWith('/data-visuals')) {
    let feed_entries = document.querySelectorAll('li.feed-entry');
    for (let feed_entry of feed_entries) {
      let download = feed_entry.querySelector('span.entry-download > a[href*="/undefined/"]');
      if (download) {
        let figure = feed_entry.querySelector('figure.entry-image > img[src]');
        if (figure) {
          download.href = figure.src;
          download.setAttribute('download', '');
        }
      }
    }
  } else {
    function hbr_main() {
      window.setTimeout(function () {
        window.top.postMessage({type: 'article-paywall:full-content'}, '*');
      }, 1000);
    }
    let popup = document.querySelector('.persistent-banner');
    removeDOMElement(popup);
    let paywall = document.querySelector('div[id^="paywall"]');
    if (paywall) {
      removeDOMElement(paywall);
      insert_script(hbr_main);
    }
  }
}

else if (matchDomain('hilltimes.com')) {
  function hilltimes_main(node) {
    getJsonUrl('div.paywallcont', '', 'div#entry-content');
  }
  let paywall_sel = 'div.paywallcont';
  let paywall = document.querySelector(paywall_sel);
  if (dompurify_loaded) {
    if (paywall)
      hilltimes_main(paywall);
    else
      waitDOMElement(paywall_sel, 'DIV', hilltimes_main, false);
    csDoneOnce = true;
  }
  let banner = 'section.hide_this_section';
  hideDOMStyle(banner);
}

else if (matchDomain('hindustantimes.com')) {
  if (!window.location.pathname.endsWith('-amp.html')) {
    let paywall = document.querySelector('.paywall');
    if (paywall)
      paywall.classList.remove('paywall');
    document.querySelectorAll('.hide').forEach(e => e.classList.remove('hide'));
    let trc_overlay = document.querySelector('section.trc_related_container > div[role="button"]');
    if (trc_overlay)
      trc_overlay.click();
    let body_sticky = document.querySelector('body.desktopAdSticky');
    if (body_sticky)
      body_sticky.classList.remove('desktopAdSticky');
    let banners = 'div.paywall-container, div[class^="adHeight"], div.desktopAd';
    hideDOMStyle(banners);
  } else {
    let banners = 'div[class^="sub-paywall-version"], section[amp-access="NOT userSubscribed"], div.storyAd';
    hideDOMStyle(banners);
  }
}

else if (matchDomain('historyextra.com')) {
  let ads = 'div.ad-slot, div.ad-banner, div.stitcher-ad--dai-placeholder';
  hideDOMStyle(ads);
}

else if (matchDomain('historytoday.com')) {
  if (window.location.hostname.startsWith('app.')) {
    restorePugpigPage();
  } else {
    let paywall = document.querySelector('div.nopremium-message');
    if (paywall) {
      let app_link = document.createElement('a');
      let app_url = 'app.historytoday.com';
      app_link.href = 'https://' + app_url;
      app_link.innerText = 'BPC > no fix, search article on: ' + app_url;
      app_link.style = 'color: red; font-weight: bold;';
      let app_div = document.createElement('div');
      app_div.style = 'margin: 20px;';
      app_div.appendChild(app_link);
      paywall.before(app_div);
      removeDOMElement(paywall);
    }
    hideDOMStyle('div#block-signupblock');
  }
}

else if (matchDomain('hotnews.ro')) {
  let paywall = document.querySelector('div.hn-paywall[hidden]');
  if (paywall) {
    paywall.classList.remove('hn-paywall');
    paywall.removeAttribute('hidden');
    paywall.removeAttribute('inert');
  }
}

else if (matchDomain('inc.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let locked = document.querySelector('div.article-container--locked');
    if (locked)
      locked.className = 'article-container';
  }
  let ads = 'div.second-scroll-border';
  hideDOMStyle(ads);
}

else if (matchDomain('inc42.com')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_access_hide('="status"', '="NOT status"', 'div.wru-widget');
  } else {
    let banner = document.querySelector('div[id*="_leaderboard_"]');
    removeDOMElement(banner);
  }
}

else if (matchDomain('indianexpress.com')) {
  if (window.location.pathname.endsWith('/lite/'))
    amp_unhide_access_hide('="(usertrace.ruleEngineResponseDto.actionName = \'allow_access\')"', '', 'div.ev-premium-paywall');
  else {
    let paywall = document.querySelector('div.paywall[style]');
    if (paywall) {
      paywall.removeAttribute('class');
      paywall.removeAttribute('style');
    }
  }
  let ads = 'div[class^="adsbox"], div.adboxtop, div[class^="o-ad"], div.desktop-full-ad, div.ads-container, div.register-box';
  hideDOMStyle(ads);
}

else if (matchDomain('indiatoday.in')) {
  if (window.location.pathname.match(/(\/amp)?\/magazine\//)) {
    let url = window.location.href;
    if (!url.includes('/amp/')) {
      amp_redirect('div#csc-paywall');
    } else {
      amp_unhide_access_hide('="granted"', '="NOT NOT granted"', 'div[class^="wrapper_main-container_"], div.readmore__box');
    }
  }
}

else if (matchDomain('infzm.com')) {
  let url = window.location.href;
  if (url.includes('.com/wap/#/content/')) {
    let container = document.querySelector('section.container');
    if (container)
      container.classList.remove('container');
    getArchive(url, 'div.infzm-content__payment-prompt', '', 'article');
  } else if (url.includes('.com/contents/')) {
    let paywall = document.querySelector('div.nfzm-article-jumbotron--unauth');
    if (paywall) {
      removeDOMElement(paywall);
      window.location.href = url.replace('.com/contents/', '.com/wap/#/content/').split('?')[0];
    }
  }
}

else if (matchDomain('inkl.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    let gradient_container = document.querySelector('div.gradient-container');
    removeDOMElement(gradient_container);
  }
  let what_is_inkl = document.querySelector('.what-is-inkl-container, .features-panel');
  let signup = document.querySelectorAll('.article-signup-container, .locked-sign-up-container, div[class*="/inkl-watermark.svg"]');
  let shared_banner = document.querySelector('div.shared-article-inline-banner');
  removeDOMElement(what_is_inkl, ...signup, shared_banner);
  let dismiss_button = document.querySelector('div.dismiss-button-container button.btn');
  if (dismiss_button)
    dismiss_button.click();
  let dive_deeper_summary_bodies = document.querySelectorAll('div.dive-deeper-container div.summary-body');
  if (dive_deeper_summary_bodies) {
    for (let summary_body of dive_deeper_summary_bodies) {
      if (!summary_body.querySelector('a')) {
        let ng_click = summary_body.getAttribute('ng-click').replace("showArticle('", '').replace("')", '');
        let weblink = document.createElement('a');
        weblink.text = 'open';
        weblink.href = 'https://www.inkl.com/news/' + ng_click;
        summary_body.appendChild(weblink);
      }
    }
  }
}

else if (matchDomain('inquirer.com')) {
  let audio_paywall = document.querySelector('button.audio-paywall-trigger');
  if (audio_paywall) {
    let audio = audio_paywall.parentNode.querySelector('audio[src]');
    if (audio) {
      audio.setAttribute('controls', '');
      audio_paywall.parentNode.parentNode.replaceChild(audio, audio_paywall.parentNode);
    }
  }
  let ads = 'div[data-ad-name]';
  hideDOMStyle(ads);
}

else if (matchDomain('insidehighered.com')) {
  let ads = 'div[id^="block-dfptag"], div.wp-block-ihe-ad, section.section-ad_slot, div#roadblock';
  hideDOMStyle(ads);
}

else if (matchDomain('insights.citeline.com')) {
  let paywall = document.querySelector('div.paywall-wrap');
  let article = document.querySelector('article.b-article-body');
  if (paywall && article && dompurify_loaded) {
    removeDOMElement(paywall);
    let fusion_script = document.querySelector('script#fusion-metadata');
    if (fusion_script && fusion_script.text.includes('Fusion.contentCache=')) {
      try {
        let json = JSON.parse(fusion_script.text.split('Fusion.contentCache=')[1].split(';Fusion.')[0]);
        if (json && json['content-api']) {
          let pars;
          let content_api = json['content-api'];
          for (let key in content_api) {
            let content = content_api[key];
            if (content.data && content.data.content_elements && content.data.content_restrictions) {
              pars = content.data.content_elements;
              break;
            }
          }
          if (pars && pars.length) {
            article.innerHTML = '';
            let parser = new DOMParser();
            for (let par of pars) {
              let elem;
              if (['header', 'text'].includes(par.type)) {
                if (par.content) {
                  let doc = parser.parseFromString('<p class="c-paragraph">' + DOMPurify.sanitize(par.content) + '</p>', 'text/html');
                  elem = doc.querySelector('p');
                  if (par.type === 'header')
                    elem.style = 'font-weight: bold;';
                }
              } else if (par.type === 'image') {
                if (par.url) {
                  let caption_text = par.caption;
                  if (par.credits && par.credits.affiliation && par.credits.affiliation[0] && par.credits.affiliation[0].name)
                    caption_text += ' (' + par.credits.affiliation[0].name + ')';
                  elem = makeFigure(par.url, caption_text);
                }
              } else if (par.type === 'raw_html') {
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(parseHtmlEntities(par.content), dompurify_options) + '</div>', 'text/html');
                elem = doc.querySelector('div');
                let infogram = elem.querySelector('div.infogram-embed[data-id]');
                if (infogram) {
                  elem.innerHTML = '';
                  let iframe = document.createElement('iframe');
                  iframe.src = 'https://e.infogram.com/' + infogram.getAttribute('data-id');
                  iframe.style = 'width: 100%; aspect-ratio: 4 / 3;';
                  elem.appendChild(iframe);
                } else
                  elem.querySelectorAll('iframe[allow*="fullscreen"][allowfullscreen]').forEach(e => e.removeAttribute('allowfullscreen'));
              } else if (par.type === 'custom_embed') {
                let html = getNestedKeys(par, 'embed.config.html');
                if (html) {
                  elem = document.createElement('div');
                  elem.className = 'key-takeaways align-right';
                  let headline = getNestedKeys(par, 'embed.config.headline');
                  if (headline) {
                    let embed_headline = document.createElement('h6');
                    embed_headline.innerText = headline;
                    elem.appendChild(embed_headline);
                  }
                  let doc = parser.parseFromString(DOMPurify.sanitize(html), 'text/html');
                  let elem_type_match = html.match(/^<(\w+)/);
                  if (elem_type_match) {
                    let elem_type = elem_type_match[1];
                    let embed_content = doc.querySelector(elem_type);
                    if (embed_content)
                      elem.appendChild(embed_content);
                  }
                }
              } else if (!['divider'].includes(par.type))
                console.log(par);
              if (elem)
                article.appendChild(elem);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  let ads = 'div[id^="arcad-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('interestingengineering.com')) {
  let article = document.querySelector('div.body-content');
  if (article) {
    let article_hidden = document.querySelector('div#taboola-article-content');
    if (article_hidden)
      article_hidden.removeAttribute('id');
    let art_pars = article.querySelectorAll('p');
    let paywall = document.querySelector('div#paywall-div');
    if ((paywall || art_pars.length < 5) && dompurify_loaded) {
      removeDOMElement(paywall);
      let scripts = document.querySelectorAll('script:not([src], [type])');
      let json_script;
      let script_start = 'self.__next_f.push([1,"\\';
      let script_len = 0;
      for (let script of scripts) {
        if (script.text.startsWith(script_start) && script.text.length > script_len) {
          json_script = script;
          script_len = script.text.length;
        }
      }
      if (json_script) {
        try {
          let json_text = parseHtmlEntities('\\' + json_script.text.split(script_start)[1].split('"])')[0].replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/\\u0026/g, '&').replace(/\\"/g, '"')).replace(/\\n/g, '');
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
          let article_new = doc.querySelector('div');
          article_new.className = article.className;
          article.parentNode.replaceChild(article_new, article);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  let ads = 'div[id^="harz"]';
  hideDOMStyle(ads);
}

else if (matchDomain('investing.com')) { //custom
  header_nofix('h1', 'div#article-paywall');
}

else if (matchDomain('investors.com')) {
  window.setTimeout(function () {
    header_nofix('div.single-post-content', 'div.investors-paywall-overlay', 'BPC > no fix');
  }, 1000);
  let ads = 'div.ads, div.headerAds';
  hideDOMStyle(ads);
}

else if (matchDomain('ipolitics.ca')) {
  let login = document.querySelector('div.login');
  if (login && dompurify_loaded) {
    removeDOMElement(login);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.innerText);
        if (json && json.props.pageProps.post && json.props.pageProps.post.content) {
          let url_next = json.props.pageProps.post.slug;
          if (url_next && !window.location.pathname.includes(url_next))
            refreshCurrentTab();
          let article_new = json.props.pageProps.post.content;
          let article = document.querySelector('.post-body');
          if (article) {
            article.innerHTML = '';
            article.classList.remove('locked');
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(article_new) + '</div>', 'text/html');
            let content_new = doc.querySelector('div');
            article.appendChild(content_new);
          }
        } else {
          refreshCurrentTab();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('japantimes.co.jp')) {
  window.setTimeout(function () {
    let url = window.location.href;
    let paywall = document.querySelector('div.blocker');
    if (paywall) {
      removeDOMElement(paywall);
      let article = document.querySelector('div#jtarticle');
      if (article)
        article.firstChild.before(document.createTextNode('Refresh page or'), googleSearchToolLink(url), archiveLink(url));
    }
  }, 5000);
  let banner = document.querySelector('div.subscribe');
  removeDOMElement(banner);
  let ads = 'div.DisplayAd';
  hideDOMStyle(ads);
}

else if (matchDomain('jpost.com')) {
  let premium_banners = document.querySelectorAll('.hide-for-premium, #hiddenPremiumForm, #hiddenLink');
  removeDOMElement(...premium_banners);
}

else if (matchDomain('kathimerini.gr')) {
  let ads = 'div.nx-billboard-ad-row';
  hideDOMStyle(ads);
}

else if (matchDomain('kompas.id')) {
  let url_artikel = window.location.pathname.startsWith('/artikel/');
  let delay = url_artikel ? 2500 : 0;
  window.setTimeout(function () {
    let paywall = document.querySelector('kompasid-paywall');
    if (paywall) {
      removeDOMElement(paywall);
      if (url_artikel) {
        let intro = document.querySelector('div.paywall');
        removeDOMElement(intro);
        let art_hidden = document.querySelector('div.non-paywall[style]');
        if (art_hidden)
          art_hidden.removeAttribute('style');
        let audio_tts = document.querySelector('button.button-play-audio');
        if (audio_tts) {
          let audio_src_dom = document.querySelector('audio > source[src$=".mp3"]');
          if (audio_src_dom) {
            let audio_new = document.createElement('audio');
            audio_new.src = audio_src_dom.src;
            audio_new.setAttribute('controls', '');
            audio_tts.parentNode.replaceChild(audio_new, audio_tts);
          }
        }
        let gallery = document.querySelector(cs_param.gallery_sel || 'div.mx-auto > div > div.swiper-free-mode');
        if (gallery) {
          let article = gallery.parentNode.parentNode;
          article.innerHTML = '';
          let json_script = document.querySelector('script#__NUXT_DATA__');
          if (json_script) {
            try {
              let pars = JSON.parse(json_script.text);
              let img_pars = pars.filter(x => x && (typeof x === 'object') && x.src && x.caption);
              for (let elem of img_pars) {
                let figure = makeFigure(pars[elem.src], pars[elem.caption] + (elem.credit ? ' ' + pars[elem.credit] : ''), {alt: pars[elem.alt]});
                figure.style = 'width: 80%; margin: 50px;';
                article.appendChild(figure);
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      } else {
        let art_hidden = document.querySelector('section.paywall.hidden');
        if (art_hidden)
          art_hidden.classList.remove('hidden');
      }
    }
  }, delay);
}

else if (matchDomain('latimes.com')) {
  let subscribers = pageContains('div.infobox > p.infobox-title', /subscribers/i);
  if (subscribers.length)
    removeDOMElement(subscribers[0].parentNode);
  let ads = 'div.google-dfp-ad-wrapper, div.revcontent';
  hideDOMStyle(ads);
}

else if (matchDomain('law.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.paywall-content');
    if (paywall) {
      paywall.removeAttribute('class');
      let article = document.querySelector('div.article-content');
      if (article) {
        let podcast = document.querySelector('article > a[href="/podcast/"]');
        if (!podcast) {
          let pars = article.querySelectorAll('p');
          if (pars.length < 5)
            header_nofix(article);
        }
      }
      let pw_banner = 'div.paywall-container';
      hideDOMStyle(pw_banner);
    }
  }, 1000);
}

else if (matchDomain('ledevoir.com')) {
  let counter = document.querySelector('.paywall-breakpoint-wrapper');
  removeDOMElement(counter);
}

else if (matchDomain('livelaw.in')) {
  let amp = window.location.pathname.startsWith('/amp/');
  let paywall = document.querySelector(amp ? 'div.subscribeNow' : 'div#subscription_paid_message');
  if (paywall) {
    let intro = document.querySelector(amp ? 'div.story' : 'div.details-story-wrapper');
    removeDOMElement(paywall, intro);
    let paywall_content = document.querySelector('div.paywall-content.hide');
    if (paywall_content) {
      if (paywall_content.innerText.length) {
        paywall_content.className = amp ? '' : 'news_details_page_row2 details-story-wrapper';
      } else if (!amp) {
        let amphtml = document.querySelector('head > link[rel="amphtml"]');
        if (amphtml)
          amp_redirect_not_loop(amphtml);
      }
    }
  }
  let ads = 'inside-post-ad, amp-ad';
  hideDOMStyle(ads);
}

else if (matchDomain('livemint.com')) {
  if (window.location.pathname.includes('/amp-')) {
    let paywall = document.querySelectorAll('[amp-access="NOT subscribed"]');
    removeDOMElement(...paywall);
  } else {
    let paywall = document.querySelector('div.paywall');
    if (paywall)
      paywall.classList.remove('paywall');
    let banners = document.querySelectorAll('div[class^="storyPaywall_paywallStory_"]');
    removeDOMElement(...banners);
    let ads = '[class^="ad"], [id^="ad"], #subscribeAd, .taboolaHeight';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('magazine.atavist.com')) {
  let bottom_notification = document.querySelector('div.bottom-notification');
  let overlay = document.querySelector('div.notification-overlay');
  removeDOMElement(bottom_notification, overlay);
  let paywall = document.querySelector('body.paywall-notification-visible');
  if (paywall)
    paywall.classList.remove('paywall-notification-visible');
}

else if (matchDomain('manoramaonline.com')) {
  if (!window.location.pathname.endsWith('.amp.html')) {
    amp_redirect('ev-engagement');
  } else {
    amp_unhide_access_hide("=\"result='ALLOW_ACCESS'\"");
  }
}

else if (matchDomain('marketwatch.com')) {
  blockJsReferrer();
  if (window.location.pathname.startsWith('/livecoverage/')) {
    window.setTimeout(function () {
      fix_dowjones_live();
    }, 1500);
  } else {
    let paywall = document.querySelector('div#cx-snippet-container');
    if (paywall) {
      removeDOMElement(paywall);
      window.setTimeout(function () {
        let article_sel = 'section[class*="-Container"]';
        let article = document.querySelector(article_sel);
        if (article) {
          addStyle(article_sel + '::after {background: none !important;}');
          let article_id_dom = document.querySelector('head > meta[name="article.id"][content]');
          if (article_id_dom) {
            let article_id = article_id_dom.content;
            let url_src = 'https://mwatch.djmedia.djservices.io/apps/marketwatch/theaters/article?screen_ids=' + article_id;
            let x_access_token = cs_param['x-access-token'] || "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJBVVRIX1BIUkFTRV9QUk9EX0FORFJPSUQiOiJjWXhLbURPOENOcm9wOEZINmtkTyJ9.xozUBM2fH4fY5JvdSrpvesZHeNFqS9aIFSZdXsvty5tgE1qb5w26I5Fe-FGQTYQdfPCQmJ60dh-QsxPKmsm3J0l50zF5CiiTAzmvD5D_XWkV_sa_L5eMqLvLyV2Wcrld9-LhKfmyqQlqDSU79276_sgo6yxDA2xqKDzFzwoOj3OILFKdkXvZNbN9NGapoTEV6z8CWt2nOxnBsN-_cXjpeDE_Al2EgWtSLA32nlRcbJ9Nm4ZRpZzCr5AKaUtysnjiAFpWyp1MSnYMJEZImYbt7nm9k2qd3ResXx0vZu-PZkr9bi4zprCUmvbLzopRbVbDwcDJowWpwyo3DnrjOhBKgw";
            getExtFetch(url_src, '', {headers: {"app-identifier": "com.news.screens", "device-type": "phone", "x-access-token": x_access_token}}, fix_dowjones_fetch, data_ext_fetch_id++, [article, 'div.img__lead img[src]']);
          }
        }
      }, 2000);
    }
  }
  let ads = 'div.element--ad, div.j-ad, div.adWrapper, div#cx-articlecover';
  hideDOMStyle(ads);
}

else if (matchDomain('medscape.com')) {
  if (matchDomain('login.medscape.com')) {
    let params = new URLSearchParams(window.location.search);
    if (params.get('urlCache')) {
      let cache_url = atob(params.get('urlCache'));
      let header = document.querySelector('div.mdscp-reg-create-account');
      if (header)
        header.before(googleSearchToolLink(cache_url));
    }
    csDoneOnce = true;
  }
  let ads = 'div.text-ad-unit, div[id^="ads-"], div.adswrapper';
  hideDOMStyle(ads);
}

else if (matchDomain('mexiconewsdaily.com')) {
  let div_hidden = document.querySelector('body.single div.td-post-content > div.tdb-block-inner');
  if (div_hidden)
    div_hidden.classList.remove('tdb-block-inner');
}

else if (matchDomain('mid-day.com')) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_access_hide('="granted"', '="NOT granted"', '[class*="BannerAd"], div.midday-wrapper');
  } else {
    amp_redirect('div#myModalFullscreen');
    let read_more = document.querySelector('#read-more-my');
    if (read_more)
      read_more.click();
  }
}

else if (matchDomain('nationalgeographic.com')) {
  function natgeo_func(node) {
    removeDOMElement(node);
    let body = document.querySelector('body[class]');
    if (body) {
      body.removeAttribute('class');
      body.removeAttribute('style');
    }
  }
  let paywall = document.querySelector('div[id^="fittPortal"]');
  if (paywall)
    natgeo_func(paywall);
  waitDOMElement('div[id^="fittPortal"]', 'DIV', natgeo_func, false);
  csDoneOnce = true;
  window.setTimeout(function () {
    let url = window.location.href;
    let subscribed = document.querySelector('div.Article__Content--gated');
    let msg = document.querySelector('div#bpc_archive');
    if (subscribed && !msg) {
      subscribed.appendChild(archiveLink(url));
      subscribed.setAttribute('style', 'overflow: visible !important;');
    }
    let overlay = document.querySelector('div.Article__Content__Overlay--gated');
    if (overlay)
      overlay.classList.remove('Article__Content__Overlay--gated');
  }, 2000);
  let ads = 'div.ad-slot, div.InsertedAd, div.natgeo-ad';
  hideDOMStyle(ads);
}

else if (matchDomain('nationalreview.com')) {
  if (!window.location.pathname.endsWith('/amp/')) {
    let paywall_sel = 'div.continue-reading';
    let paywall = document.querySelector(paywall_sel);
    if (paywall) {
      let amphtml = document.querySelector('head > link[rel="amphtml"][href]');
      if (amphtml && !amphtml.href.includes(window.location.pathname)) {
        removeDOMElement(paywall);
        refreshCurrentTab();
      } else
        getJsonUrl(paywall_sel, '', 'div.article-content', {art_class: 'article-content article-content--headless'});
    }
  }
  let banners = 'div.zephr-wrapper, div#bc-root, div.cookie-text';
  let ads = 'amp-ad, .ad-unit, .ad-skeleton, amp-connatix-player, div[class*="-connatix-"]';
  hideDOMStyle(banners + ', ' + ads);
}

else if (matchDomain('nature.com')) {
  func_post = function () {
    header_nofix('article', 'h2#access-options', 'BPC > no archive-fix');
  }
  let url = window.location.href;
  getArchive(url, 'div.app-access-wall, h2#access-options', '', 'article');
}

else if (matchDomain('nautil.us')) {
  window.setTimeout(function () {
    let adm_button = document.querySelector('div[class^="a__sc-np"] button');
    if (adm_button)
      adm_button.click();
  }, 500);
  let ads = 'div.article-ad, div[class^="PrimisVideoAdBlock_wrapper__"]';
  hideDOMStyle(ads);
}

else if (matchDomain('nbcnews.com')) {
  let gate = document.querySelector('div.article-body__content--subscriber-gated');
  if (gate)
    gate.classList.remove('article-body__content--subscriber-gated');
  hideDOMStyle('div[data-testid="article-subscriber-gate"]');
}

else if (matchDomain('ndtvprofit.com')) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_unhide_subscr_section();
  } else {
    window.setTimeout(function () {
      amp_redirect('div[class^="hard-paywall"], div[class*="geotag-container_"]');
    }, 1000);
  }
  let ads = 'div.responsive-ad';
  hideDOMStyle(ads);
}

else if (matchDomain('newcriterion.com')) {
  getJsonUrl('div.paywall-overlay', '', 'div.entry-content');
}

else if (matchDomain('newrepublic.com')) {
  let modal = document.querySelector('div.article-scheduled-modal');
  let pw_popups = document.querySelector('div#pwPopups');
  removeDOMElement(modal, pw_popups);
  let ads = '.ad-unit';
  hideDOMStyle(ads);
}

else if (matchDomain('newscientist.com')) {
  if (!window.location.hostname.startsWith('appan.')) {
    let paywall = document.querySelector('section#subscription-barrier');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let json_script = document.querySelector('script#ns-seo-schema');
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text);
          if (json && json.datePublished) {
            let date = json.datePublished.split(/T\d/)[0].replace(/-/g, '/');
            let path_new = window.location.pathname.split(/\/article\/(\d+-|mg\d+-\d+-)/)[2];
            if (path_new) {
              let url = 'https://appan.newscientist.com/' + date + '/' + path_new + 'content.html';
              func_post = function () {
                let lazy_images = document.querySelectorAll('img[src^="../"][data-src]');
                for (let elem of lazy_images) {
                  elem.src = elem.getAttribute('data-src');
                  elem.removeAttribute('height');
                  elem.removeAttribute('width');
                }
                let videos = document.querySelectorAll('figure > div.pugpig-video[data-video-url]');
                for (let elem of videos) {
                  let iframe = document.createElement('iframe');
                  iframe.src = elem.getAttribute('data-video-url');
                  iframe.style = 'width: 100%; height: 400px; margin: 20px 0px;';
                  elem.parentNode.replaceChild(iframe, elem);
                }
              }
              replaceDomElementExt(url, false, false, 'section.ArticleContent', 'BPC > no fix (source file)', 'section[class$="-article__body"]');
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    let ads = 'div.advert-wrapper';
    hideDOMStyle(ads);
  } else {
    restorePugpigPage();
  }
}

else if (matchDomain('newsday.com')) {
  let listen_button = document.querySelector('div.listen-button > button[disabled], div.listen-button > div.loader');
  if (listen_button) {
    let audio_src_dom = listen_button.parentNode.querySelector('audio > source[src]');
    if (audio_src_dom) {
      let audio = document.createElement('audio');
      audio.src = audio_src_dom.src;
      audio.setAttribute('controls', '');
      listen_button.parentNode.replaceChild(audio, listen_button);
    }
  }
  let nd_lock = document.querySelector('html[class]');
  if (nd_lock)
    nd_lock.removeAttribute('class');
  let ads = 'div.ad';
  hideDOMStyle(ads);
}

else if (matchDomain('newslaundry.com')) {
  let paywall = document.querySelector('div > div > img[alt^="paywall"]');
  if (paywall && dompurify_loaded) {
    let banner = document.querySelector('div.FrsvM');
    removeDOMElement(paywall.parentNode.parentNode, banner);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = parseHtmlEntities(json.articleBody).replace(/<\/p>\./g, '</p>');
        let article = document.querySelector('div.story-element-text');
        if (json_text && article) {
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
          let article_new = doc.querySelector('div');
          article.innerHTML = '';
          article.appendChild(article_new);
        }
      }
    }
    let video = document.querySelector('a:has(figure)');
    if (video) {
      let scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let video_script;
      for (let script of scripts) {
        if (script.innerText.includes('"embedUrl":"')) {
          video_script = script;
          break;
        }
      }
      if (video_script) {
        let video_new = document.createElement('iframe');
        video_new.src = video_script.innerText.split('"embedUrl":"')[1].split('"')[0];
        video_new.style = 'width: 100%; aspect-ratio: 16 / 9;';
        video_new.setAttribute('frameborder', 0);
        video.parentNode.replaceChild(video_new, video);
      }
    }
  }
  hideDOMStyle('div.story-card div[role="dialog"]');
}

else if (matchDomain('newsweek.com')) {
  let ads = 'div#topad, div[id^="dfp-ad-"], div#piano-inline-engagement';
  hideDOMStyle(ads);
}

else if (matchDomain(['nola.com', 'shreveportbossieradvocate.com', 'theadvocate.com'])) {
  if (window.location.pathname.endsWith('.amp.html')) {
    let body_hidden = document.querySelector('.site-container');
    if (body_hidden)
      body_hidden.setAttribute('style', 'display:block;');
  } else {
    let ads = 'div.tnt-ads-container, div.asset-breakout-ads';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('nybooks.com')) {
  let paywall_article = document.querySelector('.paywall-article');
  if (paywall_article)
    paywall_article.classList.remove('paywall-article');
  let banners = 'div.toast-cta, div.inline-ad';
  hideDOMStyle(banners);
}

else if (matchDomain('nypost.com')) {
  if (window.location.pathname.includes('/sports/')) {
    let paywall = document.querySelectorAll('head > meta[content*="Sports Plus"]');
    if (paywall.length) {
      removeDOMElement(...paywall);
      let article_sel = 'div.single__content';
      let article = document.querySelector(article_sel);
      if (article) {
        article.classList.remove('entry-content-exclusive-covered');
        let json_url_dom = document.querySelector('head > link[rel="alternate"][type="application/json"][href]'); ;
        if (json_url_dom) {
          let match = json_url_dom.href.match(/\d+$/);
          if (match) {
            let article_id = match[0];
            let url_src = 'https://nypost.nypost.djservices.io/apps/nypost-v3/theaters/sports?screen_ids=' + article_id;
            if (window.navigator.userAgent.toLowerCase().includes('chrome')) {
              header_nofix(article, '', 'BPC > try to load full content by json-link (reconstructed article)', url_src);
            } else {
              let footer = article.querySelector('div.single__footer');
              getExtFetch(url_src, '', {headers: cs_param}, fix_dowjones_fetch, data_ext_fetch_id++, [article, 'div.featured-image img[src]']);
              article.querySelectorAll('p[class]').forEach(e => e.removeAttribute('class'));
              if (footer) {
                window.setTimeout(function () {
                  article.appendChild(footer);
                }, 1000);
              }
            }
          }
        }
      }
    }
  }
  let ads = 'div.ad';
  hideDOMStyle(ads);
}

else if (matchDomain('nypost.nypost.djservices.io')) {
  csDoneOnce = true;
  let params = new URLSearchParams(window.location.search);
  let article_id = parseInt(params.get('screen_ids'));
  if (window.location.pathname.startsWith('/apps/') && article_id) {
    let html = document.querySelector('body > pre');
    if (html) {
      try {
        let json = JSON.parse(html.innerText);
        if (json) {
          let article = document.createElement('div');
          article.style = 'margin: 50px; font-family: Arial, "Helvetica Neue"; font-size: 16px;';
          let url_src = window.location.href;
          fix_dowjones_fetch(url_src, html.innerText, article);
          let home = document.createElement('a');
          home.href = 'https://nypost.com/sports-plus';
          home.innerText = 'New York Post - SPORTS+';
          let return_link;
          if (json.screens && json.screens[0] && json.screens[0].metadata) {
            let header = document.createElement('div');
            let metadata = json.screens[0].metadata;
            return_link = document.createElement('a');
            return_link.href = metadata.shareUrl || 'https://nypost.com/sports-plus';
            return_link.innerText = 'BPC > return to New York Post article';
            let title = document.createElement('h1');
            let title_text = metadata.title;
            if (title_text) {
              document.title = title_text;
              title.innerText = title_text;
            }
            let author = document.createTextNode(metadata.author ? 'By ' + metadata.author : '');
            let date = document.createTextNode(metadata.createdAt ? 'Published ' + new Intl.DateTimeFormat("en-US", {dateStyle: "long", timeStyle: "short", timeZone: "America/New_York"}).format(new Date(metadata.createdAt)) + ' ET' : '');
            header.append(home, title, author, document.createElement('br'), date);
            article.firstChild.before(header);
            article.lastChild.after(return_link);
          }
          html.innerHTML = '';
          html.appendChild(article);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('nysun.com')) {
  let paywall = document.querySelector('p > a[href^="/login?"]');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article-wrapper > div:last-child');
    if (article) {
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          if (json_text) {
            article.innerHTML = '';
            let article_new = document.createElement('div');
            article_new.innerText = breakText(json_text);
            article.appendChild(article_new);
          }
        }
      }
    }
  }
}

else if (matchDomain('nytimes.com')) {
  let ads = 'div#top-wrapper, div#bottom-wrapper, div#dock-container, div[class$="ad-wrapper"], div[class^="adunit_"], div[data-testid^="Dropzone-"], div[class^="css-"]:has( > div[data-testid="StandardAd"])';
  hideDOMStyle(ads);
}

else if (matchDomain('ogj.com')) {
  document.querySelectorAll('div.image-content > div[src] > img[src*="auto=format"]').forEach(e => e.src = e.src.split('?')[0]);
}

else if (matchDomain('outlookbusiness.com')) {
  let paywall = document.querySelector('div#csc-paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      let json = JSON.parse(json_script.innerText);
      if (json && json.props.initialState.dashboard.ARTICLE_POST_DETAIL_API.data.article_data.description) {
        let article_new = json.props.initialState.dashboard.ARTICLE_POST_DETAIL_API.data.article_data.description;
        let article = document.querySelector('div.story-content');
        if (article) {
          article.innerHTML = '';
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(article_new) + '</div>', 'text/html');
          let content_new = doc.querySelector('div');
          article.appendChild(content_new);
        }
      }
    }
  }
}

else if (matchDomain('outlookindia.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = parseHtmlEntities(json.articleBody).replace(/\n/g, "$&\r\n");
        let content = document.querySelector('div#articleBody');
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

else if (matchDomain('politico.com')) {
  let ads = 'div.ad, div[class^="leaderboardAd"]';
  hideDOMStyle(ads);
}

else if (matchDomain('project-syndicate.org')) {
  func_post = function () {
    let hidden_images = document.querySelectorAll('img[src][new-cursrc]');
    for (let elem of hidden_images) {
      if (elem.src.startsWith('data:image/'))
        elem.src = elem.getAttribute('new-cursrc');
      elem.style = 'width: 95%;';
    }
    let art_bodies = document.querySelectorAll('[itemprop="articleBody"]');
    let first = true;
    for (let elem of art_bodies) {
      if (mobile) {
        let mobile_style = 'width: 90%; margin: 20px;';
        elem.parentNode.style = mobile_style;
        if (first) {
          let intro = document.querySelector('[itemprop="abstract"]');
          if (intro)
            intro.parentNode.parentNode.style = mobile_style;
          document.querySelectorAll('h1').forEach(e => e.style = mobile_style + ' font-size: 40px;');
          first = false;
        }
      }
      let pars = elem.querySelectorAll('div');
      if (pars.length) {
        if (pars.length < 3)
          header_nofix(article_sel, '', 'BPC > no archive-fix');
      }
    }
    if (!art_bodies.length)
      header_nofix(article_sel, '', 'BPC > no archive-fix');
  }
  let url = window.location.href;
  let article_sel = 'main > article';
  getArchive(url, 'div.paywall--base', '', article_sel);
  let nav_sidebar = 'nav.article__sidebar';
  hideDOMStyle(nav_sidebar);
}

else if (matchDomain('puck.news')) {
  func_post = function () {
    let pars = document.querySelectorAll(article_sel + ' > div:not([id]) > div:not([style*="background-color:"]) > div');
    if (pars.length && pars.length < 5)
      header_nofix(article_sel, '', 'BPC > no archive-fix');
  }
  let url = window.location.href;
  let article_sel = 'article';
  getArchive(url, 'div[data-puck-paywall]', '', article_sel);
  let modals = 'div#paywall-modal, div.paywall-gradient';
  hideDOMStyle(modals);
  let pw_banner = document.querySelector('div[data-dd="paywall"]:not(.hidden) > div > div.max-w-paywall-body');
  if (pw_banner)
    removeDOMElement(pw_banner.parentNode);
  let overlay = document.querySelector('body.paywall-active');
  if (overlay)
    overlay.classList.remove('paywall-active');
}

else if (matchDomain('quora.com')) {
  let overlays = document.querySelectorAll('div[class*="_overlay"]');
  removeDOMElement(...overlays);
  let mask_image = document.querySelector('div.jhqnqh');
  if (mask_image)
    mask_image.classList.remove('jhqnqh');
  let read_more_buttons = document.querySelectorAll('button.puppeteer_test_read_more_button.qu-bg--gray_ultralight');
  for (let elem of read_more_buttons)
    elem.click();
  let overlay_cards = document.querySelectorAll('div[class*="OverlayCard"]');
  for (let elem of overlay_cards)
    elem.removeAttribute('class');
  window.setTimeout(function () {
    let answers = document.querySelectorAll('div[class*="dom_annotate_question_answer_item_"]');
    for (let answer of answers) {
      let wall = answer.querySelector('div.content-monetization-wall');
      if (wall) {
        wall.classList.remove('content-monetization-wall');
        let timestamp_link = answer.querySelector('a.answer_timestamp[href]');
        if (timestamp_link) {
          let answer_link = document.createElement('a');
          answer_link.innerText = 'BPC > open Quora+ answer';
          answer_link.href = timestamp_link.href;
          wall.appendChild(answer_link);
        }
      }
    }
  }, 500);
  let ads = 'div[id^="div-gpt-ad-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('reuters.com')) {
  let ads = 'div[data-testid="ResponsiveAdSlot"], div[data-testid="Dianomi"]';
  hideDOMStyle(ads);
}

else if (matchDomain('reviewjournal.com')) {
  let ads = 'div.ads-insert, div.rj-ads-wrapper';
  hideDOMStyle(ads);
}

else if (matchDomain('rotowire.com')) {
  let paywall = document.querySelector('div.pw-content, div.article__body > div[class^="img_"]');
  if (paywall) {
    paywall.removeAttribute('class');
    let banners = 'div.article-preview-fader, div.paywall-full';
    hideDOMStyle(banners);
  }
  document.querySelectorAll('img.lozad[data-src]:not([src])').forEach(e => e.src = e.getAttribute('data-src'));
}

else if (matchDomain('rtings.com')) { //custom
  let blurred = document.querySelector('div.e-blurred');
  if (blurred)
    header_nofix('div.app-body', '', 'BPC > no fix for blurred items');
  csDoneOnce = true;
  hideDOMStyle('div.insider_notice');
}

else if (matchDomain('rugbypass.com')) {
  if (window.location.pathname.match(/^\/plus\/\w/)) {
    let paywall = document.querySelector('.premium-fold-bottom');
    if (paywall) {
      paywall.classList.remove('premium-fold-bottom');
      let offer = document.querySelector('.plus-article-offer');
      removeDOMElement(offer);
      let fade = document.querySelector('.fade');
      if (fade)
        fade.classList.remove('fade');
    }
    let lazy_images = document.querySelectorAll('figure > img.lazy[data-src]:not([src])');
    for (let elem of lazy_images) {
      elem.src = elem.getAttribute('data-src');
      elem.removeAttribute('class');
    }
  } else
    csDoneOnce = true;
}

else if (matchDomain('scholastic.com')) {
  let paywall = document.querySelector('div.paywallModalElement');
  if (paywall) {
    let modal = document.querySelector('div.modal-backdrop');
    removeDOMElement(paywall, modal);
    let body_modal = document.querySelector('body.modal-open');
    if (body_modal)
      body_modal.removeAttribute('class');
  }
}

else if (matchDomain('science.org')) {
  let paywall = document.querySelector('div.alert-read-limit');
  removeDOMElement(paywall);
  let overlay = document.querySelector('body.alert-read-limit__overlay');
  if (overlay)
    overlay.classList.remove('alert-read-limit__overlay');
}

else if (matchDomain('scmp.com')) {
  window.setTimeout(function () {
    if (matchDomain('amp.scmp.com')) {
      amp_unhide_subscr_section('div.ad-banner, div.advert-fly-carpet-container, div.inline-advert');
      let amp_images = document.querySelectorAll('section.article-body amp-img[src]');
      for (let elem of amp_images) {
        let img = document.createElement('img');
        img.src = elem.getAttribute('src');
        img.alt = elem.getAttribute('alt');
        img.style = 'width: 90%;';
        elem.parentNode.replaceChild(img, elem);
      }
      let default_meters = document.querySelectorAll('div[id^="default-meter-page-views"]');
      removeDOMElement(...default_meters);
    } else {
      let paywall = document.querySelectorAll('div[data-qa="GenericArticle-PaywallContainer"], div.js-reading-0-percent-completion-tracker');
      if (paywall.length) {
        removeDOMElement(...paywall);
        let article = document.querySelector('section[data-qa="ContentBody-ContentBodyContainer"]');
        if (article) {
          let json_script = document.querySelector('script#__NEXT_DATA__');
          if (json_script) {
            try {
              let json = JSON.parse(json_script.text);
              if (json && json.props.pageProps.payload.data.article.body.json) {
                let pars = json.props.pageProps.payload.data.article.body.json;
                if (pars && pars.length)
                  article.innerHTML = '';
                for (let par of pars) {
                  let elem = document.createElement('p');
                  if (window.location.pathname.startsWith('/magazines/'))
                    elem.style = 'margin: 20px 0px;';
                  if (['p', 'h3'].includes(par.type)) {
                    for (let sub_elem of par.children) {
                      if (sub_elem.type === 'text') {
                        if (sub_elem.data)
                          elem.appendChild(document.createTextNode(sub_elem.data));
                      } else if (['a', 'em', 'span', 'strong'].includes(sub_elem.type)) {
                        let first_child = sub_elem.children && sub_elem.children[0];
                        if (sub_elem.children && sub_elem.children.length > 1) {
                          let elem_text = sub_elem.children.map(x => x.data || x.children[0].data).join('');
                          first_child = {type: 'text', data: elem_text};
                        }
                        if (first_child) {
                          if (first_child.type === 'text') {
                            if (first_child.data) {
                              let a_link = document.createElement('span');
                              if (sub_elem.attribs && sub_elem.attribs.href) {
                                a_link = document.createElement('a');
                                a_link.style = 'text-decoration: underline;';
                                a_link.href = sub_elem.attribs.href;
                                if (!matchUrlDomain(window.location.hostname, sub_elem.attribs.href))
                                  a_link.target = '_blank';
                              } else if (sub_elem.type === 'em')
                                a_link.style = 'font-style: italic;';
                              else if (sub_elem.type === 'strong')
                                a_link.style = 'font-weight: bold;';
                              a_link.innerText = first_child.data;
                              elem.appendChild(a_link);
                            }
                          }
                        }
                      } else if (sub_elem.type === 'img') {
                        if (sub_elem.attribs) {
                          let attribs = sub_elem.attribs;
                          if (attribs.src)
                            elem = makeFigure(attribs.src, attribs.title, {alt: attribs.alt, style: 'width: 100%;'}, {style: 'font-size: 80%;'});
                        }
                      } else {
                        console.log(sub_elem);
                      }
                    }
                  } else if (par.type === 'div') {
                    if (par.attribs) {
                      if (par.attribs.class === 'image-inline-container') {
                        if (par.children && par.children[0]) {
                          let attribs = par.children[0].attribs;
                          if (attribs.src)
                            elem = makeFigure(attribs.src, attribs.title, {alt: attribs.alt, style: 'width: 100%;'}, {style: 'font-size: 80%;'});
                        }
                      } else if (par.attribs.class.match(/(methode-html|oembed|video)-wrapper/) && par.children) {
                        addIframe(par.children);
                        function addIframe(par_children) {
                          for (let sub_elem of par_children) {
                            if (sub_elem.children)
                              addIframe(sub_elem.children);
                            if (sub_elem.type === 'iframe') {
                              let attribs = sub_elem.attribs;
                              if (attribs.src) {
                                let figure = document.createElement('figure');
                                let iframe = document.createElement('iframe');
                                iframe.src = attribs.src;
                                if (attribs.width && attribs.height) {
                                  if (!attribs.width.includes('%')) {
                                    let ratio = attribs.width / (article.offsetWidth);
                                    iframe.width = attribs.width / ratio;
                                    iframe.height = attribs.height / ratio;
                                  } else {
                                    iframe.width = attribs.width;
                                    iframe.height = attribs.height;
                                  }
                                } else if (attribs.style) {
                                  iframe.style = attribs.style;
                                  if (attribs.height)
                                    iframe.height = attribs.height;
                                }
                                figure.appendChild(iframe);
                                if (attribs.title) {
                                  let iframe_title = document.createElement('figcaption');
                                  iframe_title.innerText = attribs.title;
                                  iframe_title.style = 'font-size: 80%;';
                                  figure.appendChild(iframe_title);
                                }
                                elem.appendChild(figure);
                              }
                            }
                          }
                        }
                      } else if (par.attribs.class)
                        console.log(par);
                    }
                  } else if (!['blockquote-quote', 'inline-ad-slot', 'inline-plus-widget', 'track-viewed-percentage'].includes(par.type))
                    console.log(par);
                  if (elem.hasChildNodes())
                    article.appendChild(elem);
                }
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
    }
  }, 1000);
  let ads = 'div[data-qa*="AdSlot"], div.adblock-message';
  hideDOMStyle(ads);
}

else if (matchDomain('seattletimes.com')) {
  let ads = 'div.top-ad-wrapper, div.ad, div.native-ad-article';
  hideDOMStyle(ads);
}

else if (matchDomain('sfstandard.com')) {
  let ads = 'div.sticky, div#__next > div[style="display:inline"]';
  hideDOMStyle(ads);
}

else if (matchDomain(sg_sph_media_domains)) {
  if (matchDomain('straitstimes.com')) {
    let audio_tts;
    let audio_button = document.querySelector('button[aria-label="button for Unlock audio"]');
    if (audio_button) {
      let audio_script;
      let scripts = document.querySelectorAll('script:not([id], [src], [type])');
      for (let script of scripts) {
        if (script.text.startsWith('window.__reactRouterContext.streamController') && script.text.includes(',\\"ttsUrl\\",\\"https')) {
          audio_script = script;
          break;
        }
      }
      if (audio_script) {
        audio_tts = document.createElement('audio');
        audio_tts.src = 'https' + audio_script.text.split(',\\"ttsUrl\\",\\"https')[1].split('\\",')[0];
        audio_tts.setAttribute('controls', '');
        audio_button.parentNode.replaceChild(audio_tts, audio_button);
      }
    }
    let art_pars = document.querySelectorAll('div.storyline-wrapper > p');
    if (window.location.pathname.startsWith('/opinion/') || window.location.search.startsWith('?rel=plus')) {
      if (art_pars.length && art_pars.length < 5) {
        func_post = function () {
          header_nofix('main', '', 'BPC > no archive-fix' + (audio_tts ? ' (audio-only)' : ''));
          let audio_button = document.querySelector('button[aria-label="button for Unlock audio"]');
          if (audio_button && audio_tts)
            audio_button.parentNode.replaceChild(audio_tts, audio_button);
        }
        let url = window.location.href;
        getArchive(url, 'div.paywall', '', 'main');
      }
    } else {
      let paywall = pageContains('div.headline-stack p', cs_param.paywall_sel || 'For subscribers');
      if (paywall) {
        if (art_pars.length && art_pars.length < 5)
          window.location.href = window.location.pathname + '?rel=plus';
      }
    }
  } else if (matchDomain('businesstimes.com.sg')) {
    let article = document.querySelector('div.body-content > div[class]');
    if (article) {
      let par_hidden = article.querySelectorAll('p.hidden');
      if (par_hidden.length) {
        par_hidden[0].parentNode.removeAttribute('class');
        for (let elem of par_hidden)
          elem.classList.remove('hidden');
        let fade = article.querySelector('p[class*="bg-gradient-to-t"]');
        if (fade)
          fade.className = par_hidden[0].className;
      }
    }
  }
  let ads = 'div.ads, div[id^="dfp-ad-"], div.cx_paywall_placeholder, div[data-testid="cas-block-component"], div.sph-ads-shell';
  hideDOMStyle(ads);
}

else if (matchDomain('slate.com')) {
  let slate_roadblock = '.slate-roadblock';
  let ads = 'section[class*="-ad"], div.slate-ad';
  hideDOMStyle(slate_roadblock + ', ' + ads);
}

else if (matchDomain('slideshare.net')) {
  let limit_overlay = document.querySelector('.limit-overlay');
  if (limit_overlay)
    limit_overlay.classList.remove('limit-overlay');
}

else if (matchDomain('sloanreview.mit.edu')) {
  if (window.location.pathname.startsWith('/article/')) {
    window.setTimeout(function () {
      let pars = document.querySelectorAll('div.article-content > p');
      if (pars.length && pars.length < 7)
        refreshCurrentTab_bg();
    }, 1000);
  }
}

else if (matchDomain('sofrep.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    let intro = document.querySelector('div.non-paywall');
    removeDOMElement(intro);
    waitDOMElement('div#paywall_wrap', 'DIV', node => removeDOMElement(node.parentNode));
  }
  let banners = document.querySelectorAll('#scrollerCTA, #botCta');
  removeDOMElement(...banners);
}

else if (matchDomain('spacenews.com')) {
  getJsonUrl('div.newspack-content-gate__gate', '', 'div.entry-content');
  let ads = 'spacenews-zone-container';
  hideDOMStyle(ads);
}

else if (matchDomain('spectator.com')) {
  let ads = 'div[id^="midcontent"]:empty';
  hideDOMStyle(ads);
}

else if (matchDomain('spglobal.com')) {
  let paywall = document.querySelector('div.article-access-banner');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div#researchContainer');
    if (article) {
      let json_script = document.querySelector('script#__NEXT_DATA__');
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text);
          if (json.props.pageProps.props[0].html) {
            let json_text = parseHtmlEntities(json.props.pageProps.props[0].html);
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div style="margin-bottom: 200px;">' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
            let article_new = doc.querySelector('div');
            article.parentNode.replaceChild(article_new, article);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

else if (matchDomain('standardmedia.co.ke')) {
  let paywall = document.querySelector(cs_param.paywall_sel || 'div.spw-wrap');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector(cs_param.article_sel || 'div.content');
    if (article) {
      let json_script = getArticleJsonScript();
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text.replace(/[\r\n]/g, ''));
          if (json) {
            let json_text = parseHtmlEntities(breakText(json.articleBody)).replace(/\.\s{2}/g, '.<br><br>').replace(/[\r\n]/g, '<br>');
            if (json_text) {
              let figcaption = document.querySelector('figcaption');
              if (figcaption) {
                let file_regex = /\[File, Standard\]?/;
                if (json_text.match(file_regex))
                  json_text = json_text.split(file_regex)[1];
                else
                  json_text = json_text.replace(/\s{2,}/g, ' ').replace(figcaption.innerText.replace(/\s{2,}/g, ' '), '');
              }
              let parser = new DOMParser();
              let doc = parser.parseFromString('<p>' + DOMPurify.sanitize(json_text) + '</p>', 'text/html');
              let article_new = doc.querySelector('p');
              let pars_old = article.querySelectorAll('p:not([class]), div > .card-text');
              removeDOMElement(...pars_old);
              article.appendChild(article_new);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  let ads = 'div.ad';
  hideDOMStyle(ads);
}

else if (matchDomain('staradvertiser.com')) {
  let paywall = document.querySelectorAll('div.fade');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let div_hidden = document.querySelector('div#hsa-paywall-content[style]');
    if (div_hidden)
      div_hidden.removeAttribute('style');
    let noscroll = document.querySelector('body.overflow-hidden');
    if (noscroll)
      noscroll.classList.remove('overflow-hidden');
  }
  let ads = 'div.promo-container, div.teads-inread';
  hideDOMStyle(ads);
}

else if (matchDomain('startribune.com')) {
  let ads = 'div[data-testid$="-ad"]';
  hideDOMStyle(ads);
}

else if (matchDomain('statnews.com')) {
  let url = window.location.href;
  getArchive(url, cs_param.paywall_sel || 'div.restricted-content-breaker', '', cs_param.article_sel || '.the-content', '',  cs_param.article_src_sel || 'main section, div[style*="counter-reset:"]');
  let ads = 'div.header-ad-wrap, div[class*="dfp-ad"]';
  hideDOMStyle(ads);
}

else if (matchDomain('stereogum.com')) {
  let paywall = document.querySelector('div[class^="PostContent_truncate"]');
  if (paywall && dompurify_loaded) {
    paywall.removeAttribute('class');
    let article = paywall;
    if (article) {
      let json_script = document.querySelector('script#__NEXT_DATA__');
      if (json_script) {
        let parser = new DOMParser();
        function addPar(par, article) {
          let doc = parser.parseFromString(DOMPurify.sanitize(par.innerHTML, dompurify_options), 'text/html');
          let par_new = doc.querySelector(par.tagName);
          if (par_new)
            article.appendChild(par_new);
        }
        function addIframe(par, article) {
          if (par.attributes) {
            let iframe = document.createElement('iframe');
            for (let att of par.attributes) {
              if (att.name === 'src' && att.value)
                iframe.src = att.value;
              else if (att.name === 'height')
                iframe.style.height = att.value;
            }
            iframe.style.width = '100%';
            iframe.style.border = 'none';
            if (!iframe.style.height) {
              iframe.style.height = '600px';
              iframe.scrolling = 'yes';
            }
            if (iframe.src)
              article.appendChild(iframe);
          }
        }
        try {
          let json = JSON.parse(json_script.text);
          let json_slug = getNestedKeys(json, 'query.slug');
          if (!json_slug) {
            refreshCurrentTab();
          } else if (json_slug && Array.isArray(json_slug) && json_slug.length) {
            let url_next = json_slug[0];
            if (url_next && !window.location.pathname.startsWith('/' + url_next + '/'))
              refreshCurrentTab();
          }
          let pars = getNestedKeys(json, 'props.pageProps.blocks');
          if (pars && pars.length) {
            let intro = article.querySelector('p');
            removeDOMElement(intro);
            for (let par of pars) {
              if (par.innerHTML && par.tagName) {
                addPar(par, article);
              } else if (par.name === 'lede/iframe') {
                addIframe(par, article);
              } else if (par.name === 'lede/flex-list-item') {
                if (par.innerBlocks) {
                  for (let item of par.innerBlocks) {
                    if (item.attributes) {
                      for (let att of item.attributes) {
                        if (att.name === 'titleValue' && att.value) {
                          let title = document.createElement('h2');
                          title.innerText = att.value;
                          article.appendChild(title);
                        }
                      }
                    }
                    if (item.name === 'lede/iframe')
                      addIframe(item, article);
                    else if (item.name === 'core/paragraph')
                      addPar(item, article);
                    else if (item.name === 'core/group') {
                      if (item.innerBlocks) {
                        for (let elem of item.innerBlocks) {
                          if (elem.innerHTML && elem.tagName)
                            addPar(elem, article);
                          else
                            console.log(elem);
                        }
                      }
                    } else
                      console.log(item);
                  }
                }
              } else if (!['lede/affiliate', 'lede/review-card'].includes(par.name))
                console.log(par);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    let ads = 'div.adthrive-ad';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('stocknews.com')) {
  let hideme = document.querySelector('div#hideme');
  removeDOMElement(hideme);
  let blurmes = document.querySelectorAll('div[id^="blurme"]');
  for (let i = 0; i < blurmes.length; i++)
    blurmes[i].setAttribute('id', 'blurmenot' + i);
}

else if (matchDomain('study.com')) {
  let faded_content = document.querySelector('div.faded-content');
  if (faded_content)
    faded_content.removeAttribute('class');
  let div_hidden = document.querySelector('div.hidden[ng-non-bindable]');
  if (div_hidden)
    div_hidden.removeAttribute('class');
  let banners = document.querySelectorAll('div.article-cutoff-div');
  removeDOMElement(...banners);
}

else if (matchDomain('swarajyamag.com')) {
  if (!window.location.pathname.startsWith('/amp/')) {
    window.setTimeout(function () {
      amp_redirect('div#hide-partial-content', {rm_attrib: 'id'});
    }, 1000);
  } else {
    let amp_images = document.querySelectorAll('amp-img[src*=".jpg"]');
    for (let elem of amp_images) {
      let img_new = document.createElement('img');
      img_new.src = elem.getAttribute('src').split('?')[0];
      img_new.alt = elem.getAttribute('alt');
      elem.parentNode.replaceChild(img_new, elem);
    }
  }
}

else if (matchDomain('techinasia.com')) {
  let paywall_sel = 'div.paywall-content';
  let paywall = document.querySelector(paywall_sel + ':not(.done)');
  if (paywall && dompurify_loaded) {
    paywall.classList.add('done');
    hideDOMStyle(paywall_sel);
    let content_new = paywall.querySelector('div.content');
    if (content_new) {
      let empty_par = content_new.querySelector('a.flourish-credit:not(img), h2:not(:has(~ p))');
      if (!empty_par) {
        let div = document.createElement('div');
        div.className = paywall.className.replace('paywall-content', '');
        div.appendChild(content_new);
        paywall.before(div);
        let container = document.querySelector('div.col div > div.container');
        if (container)
          container.classList.remove('container');
      } else {
        let url = window.location.href;
        let url_xhr = url.replace('.com/', '.com/wp-json/techinasia/2.0/posts/').replace('/visual-story/', '/');
        fetch(url_xhr)
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              let json_text = json.posts[0].content;
              json_text = json_text.replace(/width\=\"(\d){3,}\"/g, 'width="100%"').replace(/height\=\"(\d){3,}\"/g, 'height="100%"');
              if (json_text) {
                let parser = new DOMParser();
                let doc = parser.parseFromString('<div class="content">' + DOMPurify.sanitize(json_text) + '</div>', 'text/html');
                let content_new = doc.querySelector('div.content');
                let content = document.querySelector('div.content');
                if (content)
                  content_new.className = content.className;
                paywall.before(content_new);
              }
            });
          }
        });
      }
    }
  }
  let splash_subscribe = document.querySelector('div.splash-subscribe');
  let paywall_hard = document.querySelector('div.paywall-hard');
  removeDOMElement(splash_subscribe, paywall_hard);
}

else if (matchDomain(['techtarget.com', 'computerweekly.com'])) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.classList.remove('paywall');
    let banners = document.querySelectorAll('p#firstP, div#inlineRegistrationWrapper');
    removeDOMElement(...banners);
  }
}

else if (matchDomain('texasmonthly.com')) {
  let ads = 'div.promo-in-body';
  hideDOMStyle(ads);
}

else if (matchDomain('the-american-interest.com')) {
  let counter = document.getElementById('article-counter');
  removeDOMElement(counter);
}

else if (matchDomain('the-scientist.com')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.classList.remove('paywall');
    let fader = document.querySelector('div.gated-fader');
    let modal = document.querySelector('div#Modal');
    removeDOMElement(fader, modal);
  }
}

else if (matchDomain('the-star.co.ke')) {
  let paywall = document.querySelector('div.premium-gate__content');
  if (paywall)
    paywall.removeAttribute('class');
  hideDOMStyle('div.premium-gate__paywall, div.in-article-ad, div.tbl-feed-container, iframe[src*="/ads-iframe/"], div.premium-content figure:not(:has(img))');
}

else if (matchDomain('theamericanconservative.com')) {
  let paywall_sel = 'section.c-blog-post__body--locked';
  let paywall = document.querySelector(paywall_sel);
  if (paywall) {
    let art_options = {
      art_append: 1,
      func_text: function (json_text) {
        if (json_text.includes('<p class="has-drop-cap">')) {
          let split = json_text.split(/(<p class="has-drop-cap">)/);
          json_text = split[1] + split[2];
        };
        return json_text;
      }
    };
    getJsonUrl(paywall_sel, {rm_class: 'c-blog-post__body--locked'}, 'div.c-blog-post__content', art_options);
  } else {
    let img_dark = document.querySelector('div.c-hero-article__image-img.o-image');
    if (img_dark)
      img_dark.removeAttribute('class');
  }
  let modal = document.querySelector('div#emailsub-modal');
  removeDOMElement(modal);
  let noscroll = document.querySelector('body.modal-open');
  if (noscroll)
    noscroll.classList.remove('modal-open');
}

else if (matchDomain('theamericanscholar.org')) {
  getJsonUrl('div.ssagk-form', '', 'div.post_summary');
}

else if (matchDomain('theatlantic.com')) {
  let banners = 'aside#paywall, div[class^="LostInventoryMessage_"]';
  hideDOMStyle(banners);
}

else if (matchDomain('thebanner.com')) {
  let ads = 'div.article-body__inline-ad, div#leaderboard-ad';
  hideDOMStyle(ads);
}

else if (matchDomain('thebulletin.org')) {
  getJsonUrl('div.article--cropped', '', 'div#body-copy', {art_append: 1});
}

else if (matchDomain('thedailybeast.com')) {
  let paywall = document.querySelector('div.Body__paywall-container');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = document.querySelector('script[displayName="initialState"]');
    if (json_script) {
      let json_str = json_script.text.substring(json_script.textContent.indexOf('{'));
      try {
        let json = JSON.parse(json_str);
        if (json.body) {
          let pars = json.body.sections;
          let cards = json.body.cards;
          if (pars) {
            let mobile_doc = document.querySelector('div.Mobiledoc');
            if (mobile_doc) {
              let mobile_doc_text = mobile_doc.innerText.replace(/(\r|\n)/g, '');
              for (let elem of pars) {
                let par_elem = '';
                if (elem[0] === 1) {
                  if (elem[1] === 'p') {
                    let par = '';
                    for (let part of elem[2])
                      par += part[3];
                    if (par && !mobile_doc_text.includes(par)) {
                      par_elem = document.createElement('p');
                      par_elem.innerText = par;
                    }
                  }
                } else if (elem[0] === 10) {
                  if (cards && cards[elem[1]]) {
                    let card = cards[elem[1]];
                    if (card[0] === 'pt-image') {
                      par_elem = document.createElement('p');
                      let par_fig = makeFigure(card[1].url, card[1].title + ' ' + card[1].credit);
                      par_elem.appendChild(par_fig);
                    } else if (card[0] === 'pt-fancy-links-card') {
                      par_elem = document.createElement('p');
                      let par_link = document.createElement('a');
                      par_link.href = card[1].links;
                      par_link.innerText = card[1].linksData[0].long_headline;
                      par_elem.appendChild(par_link);
                    }
                  }
                }
                if (par_elem)
                  mobile_doc.appendChild(par_elem);
              }
            }
          }
        }
        csDoneOnce = true;
      } catch (err) {
        console.log(err);
      }
    }
  }
  let ads = document.querySelectorAll('div > div.tdb-ads-block');
  for (let ad of ads)
    hideDOMElement(ad.parentNode);
}

else if (matchDomain('thediplomat.com')) {
  if (matchDomain('magazine.thediplomat.com')) {
    let article = document.querySelector('article > section.h-96');
    if (article && dompurify_loaded) {
      article.classList.remove('h-96');
      let art_body = article.querySelector('div.prose');
      if (art_body) {
        let art_img = article.parentNode.querySelector('figure > picture > img[src]');
        let art_img_src;
        let art_img_match;
        if (art_img) {
          art_img_src = art_img.getAttribute('src');
          let match = art_img.getAttribute('src').match(/\/media\/\d+\/(\w+)\.\w+/);
          if (match)
            art_img_match = match[1];
        }
        let url = window.location.href.split(/[#\?]/)[0];
        fetch(url)
        .then(response => {
          if (response.ok) {
            response.text().then(html => {
              if (html.includes('<script>window.__remixContext.streamController.enqueue("')) {
                try {
                  let source = (html.split('<script>window.__remixContext.streamController.enqueue("')[1].split(/\](\\n)?"\);<\/script>/)[0] + ']').replace(/\\"/g, '"').replace(/\\\\"/g, '\\"');
                  let json = JSON.parse(source);
                  if (json) {
                    let body_index = json.indexOf('body') + 1;
                    if (body_index) {
                      art_body.innerHTML = '';
                      let parser = new DOMParser();
                      for (let i = body_index; i < json.length; i++) {
                        let par = json[i];
                        if (typeof par === 'string') {
                          if (par.startsWith('<p>')) {
                            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par, dompurify_options) + '</div>', 'text/html');
                            let par_new = doc.querySelector('div');
                            let pars = par_new.querySelectorAll('p');
                            for (let par of pars)
                              art_body.appendChild(par);
                          } else if (art_img_match && par !== art_img_match && par.includes(art_img_match.slice(0, -1))) {
                            let caption;
                            for (let n = i - 5; n < i; n++) {
                              let item = json[n];
                              if (typeof item === 'string' && !item.startsWith('<p>') && !['caption', 'credit_name', 'file', 'image'].includes(item) && !item.match(/\d+_\d+/))
                                caption = caption ? caption + '\r\n' + item : item;
                            }
                            let figure = makeFigure(art_img_src.replace(art_img_match, par), caption);
                            figure.style = 'margin: 20px 0px;';
                            art_body.appendChild(figure);
                          }
                        }
                      }
                    }
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            });
          }
        })
      }
      let fade = 'aside.bg-gradient-to-b';
      hideDOMStyle(fade, 2);
      let banner = document.querySelector('section > a[href^="https://thediplomat.com/subscriptions"]');
      if (banner)
        removeDOMElement(banner.parentNode);
    }
  }
  let ads = 'aside.td-ad-container--labeled, div[data-actirise]';
  hideDOMStyle(ads);
}

else if (matchDomain('thedispatch.com')) {
  let paywall_sel = 'section.piano-paywall--active';
  let paywall = document.querySelector(paywall_sel);
  if (paywall) {
    if (window.location.pathname.startsWith('/podcast/')) {
      let tablist = document.querySelector('div[role="tablist"]');
      if (tablist) {
        let yoast_script = document.querySelector('script.yoast-schema-graph[type="application/ld+json"]');
        if (yoast_script) {
          try {
            let json = JSON.parse(yoast_script.text);
            if (json['@graph']) {
              let audio_src_obj = json['@graph'].find(x => x['@type'] && x['@type'] === 'PodcastEpisode' && x.associatedMedia && x.associatedMedia.contentUrl);
              if (audio_src_obj) {
                let audio_new = document.createElement('audio');
                audio_new.src = audio_src_obj.associatedMedia.contentUrl;
                audio_new.setAttribute('controls', '');
                tablist.before(audio_new);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else if (window.location.pathname.startsWith('/next-250/') && dompurify_loaded) {
      removeDOMElement(paywall);
      let article = document.querySelector('section#article-body');
      if (article) {
        let article_id_dom = document.querySelector('article[data-post-id]');
        if (article_id_dom) {
          let article_id = article_id_dom.getAttribute('data-post-id');
          if (article_id) {
            let url_src = 'https://thedispatch.com/wp-json/dispatch/v1/post-content/' + article_id;
            fetch(url_src)
            .then(response => {
              if (response.ok) {
                response.text().then(html => {
                  try {
                    if (html) {
                      let parser = new DOMParser();
                      let doc = parser.parseFromString(DOMPurify.sanitize(html, dompurify_options), 'text/html');
                      let article_new = doc.querySelectorAll('div');
                      for (let par of article_new)
                        article.appendChild(par);
                      hideDOMStyle('div.pull-quote-contents', 2);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                });
              }
            })
          }
        }
      }
    } else if (window.location.pathname.startsWith('/newsletter/')) {
      header_nofix('section#article-body > div > p', paywall_sel);
    }
    document.querySelectorAll('[style*="overflow: hidden"]:is(html, body)').forEach(e => e.removeAttribute('style'));
  }
  hideDOMStyle('div.tp-container-inner, section.piano-fixed-bottom-overlay');
}

else if (matchDomain('theglobeandmail.com')) {
  let lazy_images = document.querySelectorAll('img[src^="data:image/"][data-src]');
  for (let elem of lazy_images)
    elem.src = elem.getAttribute('data-src');
  let fusion_script = document.querySelector('script#fusion-metadata');
  if (fusion_script && fusion_script.text.includes('Fusion.globalContent=')) {
    csDoneOnce = true;
    try {
      let json = JSON.parse(fusion_script.text.split('Fusion.globalContent=')[1].split(';Fusion.')[0]);
      window.setTimeout(function () {
        let audio_tts = document.querySelector('div > div#audio-panel > p[class^="ArticlePlayer__LoginCopy"]');
        if (audio_tts) {
          let audio_json = getNestedKeys(json, 'additional_properties.tts_audio');
          if (audio_json) {
            let audio_src = audio_json.url_en_M || audio_json.url_en_F;
            if (audio_src) {
              let audio = document.createElement('audio');
              audio.src = audio_src;
              audio.setAttribute('controls', '');
              audio_tts.parentNode.parentNode.replaceChild(audio, audio_tts.parentNode);
            }
          }
        }
        let video = document.querySelector('div > div.c-video:empty');
        if (video) {
          let streams = findKeyJson(json, 'streams');
          if (streams && streams.length) {
            let stream = streams.pop();
            if (stream.url) {
              let video_new = document.createElement('video');
              video_new.src = stream.url;
              video_new.style = 'width: 90%; margin: 0px 15px;';
              video_new.setAttribute('controls', '');
              video.parentNode.replaceChild(video_new, video);
            }
          }
        }
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }
  let ads = 'div.c-ad--base';
  hideDOMStyle(ads);
}

else if (matchDomain('thehill.com')) {
  if (!window.location.pathname.match(/^\/(video|hilltv)\//)) {
    let lead_video = document.querySelector('div.wp-block-nexstar-video > div#lead-media-1.nexstar-video');
    if (lead_video) {
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json && json.image && json.image.url) {
          let lead_fig = makeFigure(json.image.url, parseHtmlEntities(json.image.name || ''), '', {class: 'caption'});
          if (mobile)
            lead_fig.style = 'width:90%; margin: 0px 20px;';
          lead_video.parentNode.parentNode.replaceChild(lead_fig, lead_video.parentNode);
        }
      }
    }
  }
  let banners = 'div[data-civicscience-widget]:empty, aside.ad-unit, iframe#instaread_iframe:not([src])';
  hideDOMStyle(banners);
}

else if (matchDomain(['thehindu.com', 'thehindubusinessline.com'])) {
  if (!window.location.pathname.endsWith('/amp/')) {
    if (matchDomain('www.thehindu.com')) {
      let paywall_sel = 'div#artmeterpv';
      if (document.querySelector(paywall_sel) && !document.querySelector(paywall_sel + ' ~ div.also-read'))
        amp_redirect(paywall_sel);
    } else if (matchDomain('frontline.thehindu.com')) {
      let paywall = document.querySelector('body.articlepaywall');
      if (paywall)
        paywall.classList.remove('articlepaywall');
      hideDOMStyle('div[class^="article-standard_piano-inline"]', 2);
    }
    let ads = 'div.ad, div.article-ad, div.dfp-ad, div#paywallbox, div[id^="piano-art-"], #test';
    hideDOMStyle(ads);
  } else {
    addStyle('body {scrollbar-width: thin;}')
    let ads = 'div[class^="height"], div[class^="advt"], div[id^="piano"]';
    hideDOMStyle(ads);
  }
  let read_more = document.querySelector('div.paywallbox-btn > button');
  if (read_more)
    read_more.click();
}

else if (matchDomain(['thejuggernaut.com', 'jgnt.co'])) {
  let paywall = pageContains('div.font-mono', /(Read this article and many more by subscribing today|Join today to read the full story)/);
  if (paywall.length) {
    removeDOMElement(paywall[0].parentNode);
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && getNestedKeys(json, 'props.pageProps.post.fields')) {
          let url_next = json.query.slug;
          if (url_next && !window.location.pathname.includes(url_next))
            refreshCurrentTab();
          let fields = json.props.pageProps.post.fields;
          let pars = fields.fullText ? fields.fullText.content : fields.textEssay.fields.body.content;
          window.setTimeout(function () {
          let article = document.querySelector('div[class*="opacity-"]');
          if (article) {
            article.innerHTML = '';
            article.removeAttribute('class');
            if (mobile)
              article.style = 'margin: 0px 20px;';
            let fade = document.querySelectorAll('div.bg-gradient-to-b');
            for (let elem of fade)
              elem.removeAttribute('class');
            let modal = document.querySelector('div#headlessui-portal-root');
            removeDOMElement(modal);
            let par_first = true;
            function attach_text(sub_item, elem) {
              if (sub_item.value) {
                let sub_elem = document.createElement('span');
                sub_elem.innerText = sub_item.value;
                if (sub_item.marks && sub_item.marks.length) {
                  let style = '';
                  for (let mark of sub_item.marks) {
                    if (mark.type === 'bold')
                      style += 'font-weight: bold;';
                    else if (mark.type === 'italic')
                      style += 'font-style: italic;';
                    else if (mark.type === 'underline')
                      style += 'text-decoration: underline;';
                  }
                  sub_elem.style = style;
                }
                elem.appendChild(sub_elem);
              }
            }
            function attach_hyperlink(sub_item, elem) {
              if (sub_item.content && sub_item.content[0] && sub_item.content[0].value && sub_item.data && sub_item.data.uri) {
                let sub_elem = document.createElement('a');
                sub_elem.href = sub_item.data.uri;
                sub_elem.innerText = sub_item.content[0].value;
                if (!matchUrlDomain(['thejuggernaut.com', 'jgnt.co'], sub_item.data.uri))
                  sub_elem.target = '_blank';
                sub_elem.style = 'text-decoration: underline;';
                elem.appendChild(sub_elem);
              }
            }
            function attach_paragraph(par, elem) {
              if (par.content && par.content.length) {
                let span_elem = document.createElement('span');
                for (let item of par.content) {
                  if (item.nodeType === 'text') {
                    attach_text(item, span_elem);
                  } else if (item.nodeType === 'hyperlink') {
                    attach_hyperlink(item, span_elem);
                  } else
                    console.log(item);
                }
                elem.appendChild(span_elem);
              }
            }
            for (let par of pars) {
              let elem = document.createElement('p');
              if (par.nodeType.match(/^(paragraph|heading-\d)$/)) {
                attach_paragraph(par, elem);
              } else if (['blockquote'].includes(par.nodeType)) {
                if (par.content && par.content.length) {
                  for (let item of par.content) {
                    if (item.nodeType === 'paragraph') {
                      elem.style = 'margin: 0px 20px; font-style: italic;';
                      attach_paragraph(item, elem);
                    } else
                      console.log(item);
                  }
                }
              } else if (par.nodeType === 'hr') {
                elem.appendChild(document.createElement('hr'));
              } else if (par.nodeType === 'embedded-asset-block') {
                if (!par_first) {
                  if (par.data && par.data.target && par.data.target.fields) {
                    if (par.data.target.fields.file && par.data.target.fields.file.url) {
                      let figure = makeFigure(par.data.target.fields.file.url, par.data.target.fields.description);
                      elem.appendChild(figure);
                    }
                  }
                } else
                  par_first = false;
              } else if (par.nodeType === 'unordered-list') {
                if (par.content && par.content.length) {
                  let ul = document.createElement('ul');
                  for (let item of par.content) {
                    if (item.nodeType === 'list-item') {
                      if (item.content) {
                        for (let sub_item_par of item.content) {
                          if (sub_item_par.nodeType === 'paragraph') {
                            let li = document.createElement('li');
                            attach_paragraph(sub_item_par, li);
                            ul.appendChild(li);
                          }
                        }
                      }
                    } else
                      console.log(item);
                  }
                  elem.appendChild(ul);
                }
              } else {
                console.log(par);
              }
              if (elem.hasChildNodes()) {
                article.appendChild(document.createElement('br'));
                article.appendChild(elem);
              }
            }
          }
          }, 1000);
        } else
          refreshCurrentTab();
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain('thelampmagazine.com')) {
  let paywall = document.querySelector('div.paywall-gradient');
  if (paywall) {
    paywall.removeAttribute('class');
    let banner = document.querySelector('section.p-8');
    removeDOMElement(banner);
  }
  let login = document.querySelectorAll('a.js-login-modal-trigger');
  for (let elem of login) {
    elem.removeAttribute('class');
    let url_search = '/search?q=' + elem.innerText.replace(/\s/g, '+');
    elem.href = url_search;
    elem.onclick = x => window.location.href = url_search;
  }
}

else if (matchDomain('thenewatlantis.com')) {
  let article_gated = document.querySelector('.article-gated');
  if (article_gated)
    article_gated.classList.remove('article-gated');
}

else if (matchDomain('thenewslens.com')) {
  let paywall = document.querySelector('div.article-mask-box');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let article = document.querySelector('section.article-body');
        if (json_text && article) {
          let article_text = article.innerText.replace(/\n/g, '');
          let split = json_text.split('。');
          for (let elem of split) {
            if (!elem.includes('(function(') && !article_text.includes(elem)) {
              let par_new = document.createElement('p');
              par_new.innerText = elem + '。';
              article.append(par_new);
            }
          }
        }
      }
    }
  }
}

else if (matchDomain('thepointmag.com')) {
  let overlay = document.querySelectorAll('div.overlay, div#tpopup-');
  removeDOMElement(...overlay);
}

else if (matchDomain('thequint.com')) {
  window.setTimeout(function () {
    let lock = document.querySelector('div > img[alt^="lock"]');
    if (lock && dompurify_loaded) {
      lock.removeAttribute('alt');
      let paywall = document.querySelector('div#paywall-widget');
      if (paywall) {
        removeDOMElement(paywall);
        let article = document.querySelector('div.story-element');
        if (article) {
          let article_new = getArticleQuintype();
          if (article_new && article.parentNode)
            article.parentNode.replaceChild(article_new, article);
        }
      }
      let body_hidden = document.querySelector('div#story-body-wrapper');
      if (body_hidden) {
        body_hidden.removeAttribute('class');
        body_hidden.removeAttribute('style');
      }
      function thequint_unhide(node) {
        node.removeAttribute('style');
      }
      waitDOMAttribute('div#story-body-wrapper', 'DIV', 'style', thequint_unhide, true);
    }
  }, 4000);
}

else if (matchDomain('theweek.com')) {
  let paywall = document.querySelector('div.kiosq-main-layer');
  removeDOMElement(paywall);
  let locker = document.querySelector('div.paywall-locker');
  if (locker)
    locker.classList.remove('paywall-locker');
}

else if (matchDomain('thewrap.com')) {
  getJsonUrl('div#zephr-payment-form-root', '', 'div.entry-content', {art_append: 1});
  let fade = document.querySelector('div.content-area div[style*="background-image: linear-gradient"]');
  removeDOMElement(fade);
}

else if (matchDomain('timeshighereducation.com')) {
  let paywall = document.querySelector('div.paywall-active');
  if (paywall) {
    removeDOMElement(paywall);
    let fade = document.querySelectorAll('div.paywall-fade');
    for (let elem of fade)
      elem.classList.remove('paywall-fade');
  }
  let hidden_images = document.querySelectorAll('img.b-lazy[src^="data:image/"][data-src]');
  for (let hidden_image of hidden_images) {
    hidden_image.setAttribute('src', hidden_image.getAttribute('data-src'));
    hidden_image.classList.remove('b-lazy');
    hidden_image.parentElement.classList.remove('media--loading');
  }
  let ads = 'div[data-ad-page], section.block-the-dfp';
  hideDOMStyle(ads);
}

else if (matchDomain('timesofindia.indiatimes.com')) {
  if (!window.location.pathname.includes('/amp_')) {
    let toi_plus = window.location.pathname.endsWith('.cms') && (window.location.pathname.startsWith('/toi-plus/') || document.querySelector('div.header-container a[aria-label="toi-plus"]'));
    if (toi_plus) {
      window.setTimeout(function () {
        let paywall = document.querySelector('div[id^="story-blocker"]');
        let article = document.querySelector('div.paywall') || document.querySelector('article');
        if (paywall && article && dompurify_loaded) {
          removeDOMElement(paywall);
          let art_match = window.location.pathname.match(/\/(\d+)\.cms/);
          if (art_match) {
            let article_id = art_match[1];
            let url_path = cs_param.url_path || 'https://plus.timesofindia.com/aufs/feed/show/article/v1';
            let url_search = cs_param.url_search || '&fv=1495';
            let url_src = url_path + '?id=' + article_id + url_search;
            fetch(url_src)
            .then(response => {
              if (response.ok) {
                response.json().then(json => {
                  try {
                    let json_text = getNestedKeys(json, 'it.Story').replace(/\n/g, '<br>');
                    if (json_text) {
                      let parser = new DOMParser();
                      dompurify_options.ADD_TAGS = dompurify_options.ADD_TAGS.concat(['twitter']);
                      let doc = parser.parseFromString('<div style="font-size: 16px;">' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
                      let article_new = doc.querySelector('div');
                      let videos_hidden = article_new.querySelectorAll('video[su]:not([src^="http"])');
                      for (let elem of videos_hidden) {
                        let video_link = document.createElement('a');
                        video_link.href = elem.getAttribute('su');
                        video_link.innerText = elem.getAttribute('caption') || elem.getAttribute('cap') || video_link.href;
                        video_link.target = '_blank';
                        elem.before(document.createElement('br'));
                        elem.parentNode.replaceChild(video_link, elem);
                      }
                      let charts = article_new.querySelectorAll('embed[type="webViewScript"][src]');
                      for (let elem of charts) {
                        if (elem.src.includes('/articleshow/')) {
                          let elem_text = decodeURIComponent(elem.src.split('/articleshow/')[1]);
                          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(elem_text, dompurify_options) + '</div>', 'text/html');
                          let elem_new = doc.querySelector('div');
                          elem.parentNode.replaceChild(elem_new, elem);
                        } else
                          console.log(elem);
                      }
                      let twitter_embeds = article_new.querySelectorAll('twitter[id]');
                      for (let elem of twitter_embeds) {
                        let twitter_link = document.createElement('a');
                        twitter_link.href = 'https://x.com/user/status/' + elem.id;
                        twitter_link.innerText = 'Embedded Twitter/X-link';
                        twitter_link.target = '_blank';
                        elem.parentNode.replaceChild(twitter_link, elem);
                      }
                      if (article.tagName === 'DIV') {
                        article.innerHTML = '';
                        article.removeAttribute('class');
                      }
                      article.appendChild(article_new);
                    }
                  } catch (err) {
                    console.log(err);
                  }
                });
              }
            })
          }
          window.setTimeout(function () {
            let popup_button = document.querySelector('div.primeshow button:not([data-type])');
            if (popup_button)
              popup_button.click();
          }, 1000);
        }
      }, 1000);
    } else if (!window.location.search.startsWith('?rel=plus')) {
      waitDOMElement('div.popupoverlay', 'DIV', x => window.location.href = window.location.href.split(/[#?]/)[0] + '?rel=plus');
    } else { // app-only
      document.querySelectorAll('img[src$=".cms"][data-src]').forEach(e => e.src = e.getAttribute('data-src'));
      hideDOMStyle('div[data-type="in_view"] > div[id^="toi-article-container-"], div.O6qEE', 2);
    }
    let ads = 'div.bannerBenefitsWrapper, div.paisa-wrapper, embed[type="mrecAd"], div.Wi1aZ';
    hideDOMStyle(ads);
  } else {
    ampToHtml();
  }
}

else if (matchDomain('epaper.indiatimes.com')) {
  let blocker = document.querySelector('div.epaperBlockerWrap');
  removeDOMElement(blocker);
  if (window.location.pathname.startsWith('/english-news-paper-today-toi-print-edition/')) {
    let paywall = document.querySelector('section#blocker');
    if (paywall) {
      let fq = document.querySelector('section#fq');
      removeDOMElement(paywall, fq);
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          let content = document.querySelector('section[type="synopsis"]');
          if (json_text && content) {
            let article_new = document.createElement('p');
            article_new.innerText = breakText(json_text);
            content.innerHTML = '';
            addStyle('[type="synopsis"]::after {background: none !important;}');
            content.appendChild(article_new);
          }
        }
      }
    }
  }
}

else if (matchDomain('tokyo-np.co.jp')) {
  let banners = 'div.container:has(div#Pay_Entry)';
  hideDOMStyle(banners);
}

else if (matchDomain('tomshardware.com')) {
  let paywall = document.querySelector('div.paywall-locker');
  if (paywall)
    paywall.classList.remove('paywall-locker');
  hideDOMStyle('div#kiosq-app-paywall-js, div.dfp-leaderboard-container');
}

else if (matchDomain(no_dn_media_domains)) {
  if (matchDomain('tradewindsnews.com') && window.location.pathname.startsWith('/markets/')) {
    let paywall = document.querySelector('iframe[src]');
    removeDOMElement(paywall);
    let overflow = document.querySelector('body[style]');
    if (overflow)
      overflow.removeAttribute('style');
    let blurred = document.querySelector('body > div[style]');
    if (blurred)
      blurred.removeAttribute('style');
  } else {
    window.setTimeout(function () {
      function dn_main(node) {
        let article = document.querySelector('div#dn-content');
        let json_script = document.querySelector('script#__NUXT_DATA__');
        if (article && json_script && dompurify_loaded) {
          removeDOMElement(node.parentNode);
          try {
            let pars = JSON.parse(json_script.text);
            let article_id_index = (pars.indexOf('global-article') + 1) || (pars.indexOf('dn-article') + 1);
            if (article_id_index) {
              let article_id = pars[article_id_index];
              if (article_id && !window.location.pathname.endsWith(article_id)) {
                refreshCurrentTab();
                return;
              }
            } else {
              refreshCurrentTab();
              return;
            }
            article.innerHTML = '';
            article.classList.remove('shadow');
            let img_first = true;
            let parser = new DOMParser();
            for (let par of pars) {
              let elem;
              if (par && par.type) {
                let type = pars[par.type];
                if (['text', 'subhead'].includes(type)) {
                  if (par.html || par.value) {
                    let index = par.html || par.value;
                    let json_text = pars[index];
                    let content_new = parser.parseFromString('<p class="dn-text">' + DOMPurify.sanitize(json_text) + '</p>', 'text/html');
                    elem = content_new.querySelector('p');
                    if (par.value)
                      elem.style = 'font-weight: bold;';
                  }
                } else if (type === 'picture') {
                  if (img_first)
                    img_first = false;
                  else {
                    let caption_text = pars[par.caption];
                    if (par.credit)
                      caption_text += ' (' + pars[par.credit] + ')';
                    elem = makeFigure(pars[par.src], caption_text);
                    elem.className = 'dn-image';
                  }
                } else if (type === 'embed') {
                  elem = document.createElement('div');
                  if (par.value) {
                    let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(pars[par.value], dompurify_options) + '</div>', 'text/html');
                    let video = content_new.querySelector('div');
                    elem.appendChild(video);
                  }
                } else if (type === 'factbox') {
                  elem = document.createElement('div');
                  elem.className = 'dn-factbox';
                  addStyle('div.dn-factbox p {margin: 20px 0px;}');
                  if (par.title) {
                    let title = document.createElement('p');
                    title.innerText = pars[par.title];
                    title.className = 'dn-text';
                    title.style = 'font-weight: bold;';
                    elem.appendChild(title);
                  }
                  if (par.html) {
                    let content_new = parser.parseFromString('<div>' + DOMPurify.sanitize(pars[par.html]) + '</div>', 'text/html');
                    let box = content_new.querySelector('div');
                    box.querySelectorAll('p').forEach(e => e.className = 'dn-text');
                    elem.appendChild(box);
                  }
                } else if (type === 'summary') {
                  if (par.bullets) {
                    elem = document.createElement('ul');
                    for (let item of pars[par.bullets]) {
                      let li = document.createElement('li');
                      li.innerText = pars[item];
                      elem.appendChild(li);
                    }
                  }
                } else if (type === 'news' && par.title && par.url) {
                  elem = document.createElement('p');
                  let sub_elem = document.createElement('a');
                  sub_elem.href = pars[par.url];
                  sub_elem.innerText = 'Related: ' + pars[par.title];
                  sub_elem.style = 'font-weight: bold;';
                  elem.appendChild(sub_elem);
                } else if (!['ad', 'ad_group', 'adobetarget', 'author', 'break', 'Emne', 'job', 'Location', 'ma_frame', 'news', 'Organisasjon', 'Organisation', 'Organization', 'promobox', 'Person', 'Personer', 'quote', 'readpeak', 'Region', 'Regions', 'related', 'Sector', 'Sectors', 'Selskap', 'Shiptype', 'Sted', 'Steder', 'Topic', 'ukens_stilling', 'video'].includes(type)) {
                  for (let item in par) {
                    console.log(item);
                    console.log(pars[par[item]]);
                  }
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
      let paywall_sel = 'div#sub-paywall-container';
      let paywall = document.querySelector(paywall_sel);
      if (paywall) {
        if (matchDomain('dn.no') && window.location.pathname.match(/^\/(d2|magasinet|smak)\//)) {
          removeDOMElement(paywall);
          let article = document.querySelector('article');
          if (article) {
            let url = window.location.href;
            article.firstChild.before(googleSearchToolLink(url));
            if (mobile) {
              let body = document.querySelector('body');
              if (body)
                body.style.width = '80%';
            }
          }
        } else {
          if (window.location.pathname.match(/^\/(e-avis|editions)/)) {
            removeDOMElement(paywall);
            header_nofix('section.wrapper');
          } else
            dn_main(paywall);
        }
      }
    }, 1000);
  }
  let ads = 'div.top-ad-placeholder, div.dn-dfp-container';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_conde_nast_domains)) {
  let maps = document.querySelectorAll('div.map_wrapper');
  for (let elem of maps)
    elem.style.visibility = 'visible';
  let banners = 'div.ad, aside.paywall-bar, div[class^="MessageBannerWrapper-"], div.ad-stickyhero, div.ad_wrapper';
  hideDOMStyle(banners);
}

else if (matchDomain(usa_cox_first_media_domains)) {
  let ads = document.querySelectorAll('div.arc_ad');
  removeDOMElement(...ads);
}

else if (domain = matchDomain(usa_craincomm_domains)) {
  if (matchDomain('european-rubber-journal.com')) {
    let paywall = document.querySelector('div.article-overlay');
    if (paywall) {
      let fade = document.querySelector('div.gradient');
      removeDOMElement(paywall, fade);
      let truncated = document.querySelector('div.truncated');
      if (truncated)
        truncated.classList.remove('truncated');
    }
  } else {
    let fusion_script = document.querySelector('script#fusion-metadata');
    if (fusion_script && fusion_script.text.includes('Fusion.globalContent=')) {
      let paywall_sel = cs_param.paywall_sel || 'div[data-paywall-template]';
      let paywall = document.querySelector(paywall_sel);
      let article_sel = cs_param.article_sel || 'article.b-article-body';
      let article = document.querySelector(article_sel);
      if (paywall && article && dompurify_loaded) {
        removeDOMElement(paywall);
        try {
          let json = JSON.parse(fusion_script.text.split('Fusion.globalContent=')[1].split(';Fusion.')[0]);
          if (json) {
            article.innerHTML = '';
            let parser = new DOMParser();
            let pars = json.content_elements;
            for (let par of pars) {
              let par_new;
              if (['header', 'text'].includes(par.type)) {
                if (par.content) {
                  let doc = parser.parseFromString('<p class="c-paragraph">' + DOMPurify.sanitize(par.content) + '</p>', 'text/html');
                  par_new = doc.querySelector('p');
                }
              } else if (par.type === 'image') {
                if (par.url) {
                  let caption_text = par.caption;
                  if (par.credits && par.credits.affiliation && par.credits.affiliation[0] && par.credits.affiliation[0].name)
                    caption_text += ' (' + par.credits.affiliation[0].name + ')';
                  par_new = makeFigure(par.url, caption_text);
                }
              } else if (par.type === 'raw_html') {
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(parseHtmlEntities(par.content), dompurify_options) + '</div>', 'text/html');
                par_new = doc.querySelector('div');
              } else if (par.raw_oembed) {
                if (par.raw_oembed._id) {
                  par_new = document.createElement('p');
                  let par_link = document.createElement('a');
                  par_link.href = par_link.innerText = par.raw_oembed._id.replace(/\/$/, '');
                  par_link.target = '_blank';
                  par_new.appendChild(par_link);
                }
              } else if (par.type === 'video') {
                if (par.canonical_url) {
                  if (domain.startsWith(par.canonical_website)) {
                    par_new = document.createElement('p');
                    let par_link = document.createElement('a');
                    par_link.href = par_link.innerText = 'https://www.' + domain + par.canonical_url.replace(/\/$/, '');
                    par_link.target = '_blank';
                    par_new.appendChild(par_link);
                  } else
                    console.log(par);
                }
              } else if (par.type === 'list') {
                if (par.items) {
                  par_new = document.createElement('ul');
                  for (let item of par.items) {
                    let li = document.createElement('li');
                    let doc = parser.parseFromString('<span>' + DOMPurify.sanitize(item.content) + '</span>', 'text/html');
                    let span = doc.querySelector('span');
                    li.appendChild(span);
                    par_new.appendChild(li);
                  }
                }
              } else if (!['custom_embed'].includes(par.type)) {
                console.log(par);
              }
              if (par_new)
                article.appendChild(par_new);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  let ads = 'div.footer__ads-footer';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_hearst_comm_mag_domains)) {
  let audio_tts = document.querySelector('audio[data-media-manager-id^="tts-"][style]');
  if (audio_tts) {
    let json_script = document.querySelector('script#__NEXT_DATA__');
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        let audio_src = findKeyJson(json, 'speech_file_url');
        if (audio_src) {
          audio_tts.removeAttribute('style');
          audio_tts.src = audio_src;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

else if (matchDomain(usa_nymag_domains)) {
  document.querySelectorAll('iframe[data-src]:not([src])').forEach(e => e.src = e.getAttribute('data-src'));
  let ads = 'div.m-ad, section.ad-splash, aside.ad_static';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_outside_mag_domains)) {
  let ads = 'div.ad-placeholder-wrapper, div.prestitial-ad';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_penske_media_domains)) {
  let ads = 'div.admz';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_tribune_domains)) {
  let paywall_sel = cs_param.paywall_sel || 'div.sspw-wrapper';
  getJsonUrl(paywall_sel, '', 'div.body-copy', {art_class: 'body-copy'});
  let ads = 'div.dfp-ad, div.bx-slab, div.sbn-widget-body, div#mobile-adhesion';
  hideDOMStyle(ads);
}

else if (matchDomain('usatoday.com')) {
  let roadblock = document.querySelector('.roadblock-container');
  if (roadblock) {
    removeDOMElement(roadblock);
    article_next = document.querySelector('article.next-in-depth-story > div.article-inner');
    if (article_next) {
      let url = article_next.getAttribute('data-url');
      let weblink = document.createElement('a');
      weblink.href = url;
      weblink.innerText = 'open next in-depth story';
      article_next.appendChild(weblink);
    }
  }
  let ads = 'aside[aria-label="advertisement"], div.gnt_tb';
  hideDOMStyle(ads);
}

else if (matchDomain('vice.com')) {
  getJsonUrl('section.unlock-container', '', 'div.entry-content');
  let ads = 'div.lngtd-dyn-ph, div.lngtd-ad-wrapper-banner';
  hideDOMStyle(ads);
}

else if (matchDomain('vikatan.com')) {
  window.setTimeout(function () {
    let paywall_sel = cs_param.paywall_sel || 'div[class^="styles-m__paywall-main-wrapper_"]';
    let paywall = document.querySelector(paywall_sel);
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      if (!window.location.pathname.startsWith('/amp/')) {
        let json_script = getArticleJsonScript();
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            if (json) {
              let article = document.querySelector('div.story-element');
              if (article) {
                let parser = new DOMParser();
                let json_text = parseHtmlEntities(json.articleBody).replace(/>\.</g, '><br><');
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
                let content_new = doc.querySelector('div');
                let content = document.querySelector('div.story-element > div');
                if (content)
                  content.parentNode.replaceChild(content_new, content);
                else
                  article.appendChild(content_new);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
        let story_hidden = document.querySelector('div[class^="styles-m__story-card-wrapper_"]');
        if (story_hidden)
          story_hidden.removeAttribute('class');
      } else
        ampToHtml();
    }
  }, 1500);
  let ads = 'div[class^="styles-m__popup-wrapper-adb_"], div[class^="styles-m__subscribe-banner-wrapper_"], div[id^="ps-floating-container-"], div[id^="div-ad-desk-"], div[data-type="_mgwidget"]';
  hideDOMStyle(ads);
}

else if (matchDomain('voguebusiness.com')) {
  let article = document.querySelector('article');
  if (article) {
    let pars = article.querySelectorAll('p:not([class]), p.paywall');
    if (pars.length < 5) {
      removeDOMElement(...pars);
      let filter = /^window\.__PRELOADED_STATE__\s?=\s?/;
      let json_script = getSourceJsonScript(filter, '[type]:not([src])');
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text.split(filter)[1].split('};')[0] + '}');
          let body = document.querySelector('div.body__inner-container');
          if (body) {
            let pars = json.transformed.article.body;
            function makeElem(elem, par_elem) {
              if (Array.isArray(elem) && elem.length) {
                let elem_new;
                let item = elem[0];
                if (typeof item === 'string') {
                  if (['p', 'h2', 'em', 'strong'].includes(item)) {
                    elem_new = document.createElement(item);
                    par_elem.appendChild(elem_new);
                    elem.shift();
                    makeElem(elem, elem_new);
                  } else if (item === 'a' && elem.length > 2) {
                    elem_new = document.createElement('a');
                    let a_data = elem[1];
                    elem_new.href = a_data.href;
                    if (a_data.isExternal)
                      elem_new.target = '_blank';
                    makeElem(elem.slice(2), elem_new);
                    par_elem.appendChild(elem_new);
                  } else if (item === 'inline-embed' || !(['ad', 'cm-unit', 'inline-newsletter', 'journey-inline-newsletter', 'native-ad'].includes(item) || (item.length < 30 && item.includes('inline-embed')))) {
                    if (item === 'inline-embed') {
                      let img_data = elem[1];
                      if (img_data && img_data.type === 'image') {
                        if (img_data.props && img_data.props.image && img_data.props.image.sources) {
                          let caption_text;
                          if (img_data.props.dangerousCaption) {
                            caption_text = img_data.props.dangerousCaption.replace(/<\/?\w+>/g, '');
                            if (img_data.props.dangerousCredit)
                              caption_text += ' ' + img_data.props.dangerousCredit;
                          }
                          let figure = makeFigure(img_data.props.image.sources.lg.url, caption_text);
                          par_elem.appendChild(figure);
                        }
                      }
                    } else {
                      elem_new = document.createTextNode(item);
                      par_elem.appendChild(elem_new);
                      elem.shift();
                      makeElem(elem, par_elem);
                    }
                  }
                } else if (Array.isArray(item)) {
                  if (['a', 'em', 'strong'].includes(item[0])) {
                    makeElem(item, par_elem);
                    elem.shift();
                    makeElem(elem, par_elem);
                  } else {
                    console.log(item);
                  }
                } else if (typeof item === 'object') {
                  if (!item.class)
                    console.log(item);
                  elem.shift();
                  makeElem(elem, par_elem);
                }
              } else if (typeof elem === 'string' && !['div'].includes(elem)) {
                par_elem.appendChild(document.createTextNode(elem));
              }
            }
            for (let par of pars)
              makeElem(par, body);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

else if (matchDomain('vox.com')) {
  let ads = 'div[data-concert]';
  hideDOMStyle(ads);
}

else if (matchDomain('warontherocks.com')) {
  if (window.location.pathname.startsWith('/episode/')) {
    header_nofix('div.single-content-section', 'a[href ^= "https://warontherocks.com/subscribe"]');
  } else {
    let paywall_sel = cs_param.paywall_sel || 'a[href^="https://warontherocks.com/membership"]';
    let article_sel = cs_param.article_sel || 'div.tw\\:container.tw\\:mb-20>div';
    getJsonUrl(paywall_sel, '', article_sel);
  }
}

else if (matchDomain('washingtonexaminer.com')) {
  let ads = 'div.wex-ad-wrap';
  hideDOMStyle(ads);
}

else if (matchDomain('washingtonpost.com')) {
  let ads = 'wp-ad-wrapper, div[data-qa$="-ad"], div[data-component="Ad"], div[data-qa="outbrain"], div.PJLV-ifmxCWD-css';
  hideDOMStyle(ads);
}

else if (matchDomain('winnipegfreepress.com')) {
  let ads = '.billboard-ad-space, .ad, .article-ad, .fixed-sky';
  hideDOMStyle(ads);
}

else if (matchDomain('worldview.ranenetwork.com')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.content-copy-text--guest');
    if (paywall)
      paywall.removeAttribute('class');
  }, 1500);
  hideDOMStyle('div.tw-sticky');
}

else if (matchDomain('wsj.com')) {
  blockJsReferrer();
  if (window.location.pathname.startsWith('/livecoverage/')) {
    window.setTimeout(function () {
      fix_dowjones_live();
    }, 1500);
  } else {
    let paywall_sel = '.snippet-promotion, div[id*="-snippet-overlay"]';
    let paywall = document.querySelector(paywall_sel);
    if (paywall && dompurify_loaded) {
      let url = window.location.href;
      let article_sel = 'article section';
      let wsj_pro = paywall.querySelector('a[href^="https://wsjpro.com/"]');
      if (wsj_pro)
        article_sel = 'article';
      let article = document.querySelector(article_sel);
      if (article) {
        let video_sel = 'div[data-type="video"]';
        let video = document.querySelector(video_sel);
        let schema_script = document.querySelector('script#articleschema');
        func_post = function () {
          let pars = document.querySelectorAll(article_sel + ' div[style*="font-family:"]');
          if (pars.length < 5)
            header_nofix(article_sel, '', 'BPC > no archive-fix');
          if (video) {
            let video_new = document.querySelector(video_sel);
            if (video_new && video_new.parentNode)
              video_new.parentNode.replaceChild(video, video_new);
          }
          let inline_videos = document.querySelectorAll('div[id^="video"]');
          for (let inline_video of inline_videos) {
            let video_id = inline_video.id.replace('video', '');
            if (video_id && schema_script) {
              try {
                let video_data = JSON.parse(schema_script.text).find(x => x['@type'] === 'VideoObject' && x.embedUrl.includes(video_id));
                if (video_data && inline_video.parentNode) {
                  let elem = document.createElement('iframe');
                  elem.src = video_data.embedUrl;
                  elem.style = 'width: ' + inline_video.offsetWidth + 'px; height: ' + inline_video.offsetWidth * 3 / 4 + 'px;';
                  inline_video.parentNode.replaceChild(elem, inline_video);
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
          if (mobile) {
            let inline_images = document.querySelectorAll('div[style] > figure > picture > img');
            for (let elem of inline_images) {
              elem.style = 'width: 100%;';
              elem.removeAttribute('height');
              elem.removeAttribute('width');
              elem.parentNode.removeAttribute('style');
              elem.parentNode.parentNode.parentNode.removeAttribute('style');
            }
            let inline_data = document.querySelectorAll('div[data-layout="inline"][style]');
            for (let elem of inline_data)
              elem.removeAttribute('style');
          }
          let read_next = document.querySelector('div#cx-what-to-read-next');
          removeDOMElement(read_next);
          let inline_wrappers = document.querySelectorAll('div[style*="background-position"] > div[id^="wrapper-INLINEIMM_"]');
          for (let elem of inline_wrappers)
            removeDOMElement(elem.parentNode);
        }
        getArchive(url, paywall_sel, '', article_sel);
      }
    }
  }
  let ads = 'div.wsj-ad, div.adWrapper, div.css-xgokil-Box, div#cx-article-cover-overlay, div#dianomi-module';
  hideDOMStyle(ads);
}

else if (matchDomain('ynet.co.il')) {
  let paywall = document.querySelector('div.paywall-wrapper');
  if (paywall) {
    removeDOMElement(paywall);
    window.location.href = window.location.pathname + '?rel=plus';
  }
  let overlay = document.querySelector('#yitwall');
  removeDOMElement(overlay);
}

else if (matchDomain(ke_nation_media_domains) || matchDomain(ke_nation_media_custom_domains)) {
  let paywall = document.querySelectorAll('div.modal, [id*="wall"], section.wall-guard');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let article = document.querySelector('div.article-page');
    if (article) {
      article.querySelectorAll('.nmgp').forEach(e => e.classList.remove('nmgp'));
      article.querySelectorAll('aside[hidden]').forEach(e => e.removeAttribute('hidden'));
    }
  }
  let ads = 'div.banner, div.spinner, aside.promotion-banner, div.content-page-ad_wrap, div#subscription-renewal-widget';
  hideDOMStyle(ads);
}

else if (matchDomain(['oed.com']) || (window.location.hostname.replace(/^www\./, '').startsWith('oxford') && document.querySelector('div[id^="footer"] a[href="https://global.oup.com/privacy"]'))) {
  let paywall_sel = 'div.contentRestrictedMessage';
  let article_sel = 'div#readPanel > div';
  if (matchDomain('oed.com')) {
    paywall_sel = 'div.paywallOptions';
    article_sel = 'div#entry_content';
  }
  header_nofix(article_sel, paywall_sel, cs_param.signin_text || 'BPC > Sign in with library card 12345678 or 11111111 & library of Royal Bor. of Kensington and Chelsea');
}

else if (matchDomain(usa_gannett_domains) || document.querySelector('head > link[href*="/gannett_net.js"], footer a[href^="https://www.gannett.com"]')) {
  if (window.location.pathname.endsWith('/restricted/') && window.location.search.startsWith('?return='))
    window.location.href = decodeURIComponent(window.location.href.split('?return=')[1]);
  let ads = 'aside[aria-label="advertisement"], div.gnt_tb';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_hearst_comm_domains) || document.querySelector('head > script[src*="/treg.hearstnp.com/"]')) {
  addStyle('body {overflow: visible!important;}');
  let ads = 'div[data-block-type="ad"], div[data-widget-host="revcontent"], div.b-gray300, div#mod-target-div';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_lee_ent_domains.concat(ca_torstar_domains)) || document.querySelector('head > meta[name="tncms-access-version"]')) {
  function unscramble(t) {
    for (var n = "", i = 0, r = t.length; i < r; i++) {
      var s = t.charCodeAt(i);
      if (s >= 33 && s <= 126) {
        var sTmp = String.fromCharCode(33 + (s - 33 + 47) % 94);
        n += sTmp;
      } else
        n += t.charAt(i);
    }
    return n;
  }
  let paywall = document.querySelector('div.subscriber-offers');
  removeDOMElement(paywall);
  let subscriber_only = document.querySelectorAll('div.subscriber-only');
  for (let elem of subscriber_only) {
    if (elem.classList.contains('encrypted-content') && dompurify_loaded) {
      let parser = new DOMParser();
      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(unscramble(elem.innerText)) + '</div>', 'text/html');
      let content_new = doc.querySelector('div');
      elem.parentNode.replaceChild(content_new, elem);
    }
    elem.removeAttribute('style');
    elem.removeAttribute('class');
  }
  let banners = document.querySelectorAll('div.subscription-required, div.redacted-overlay');
  removeDOMElement(...banners);
  let ads = 'div.tnt-ads-container, div[class*="adLabelWrapper"], div.globalHeaderBillboard';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_mcc_domains) || document.querySelector('head > link[href^="https://mcclatchy-d.openx.net"], footer a[href^="https://www.mcclatchy.com/privacy-policy"]')) {
  if (window.location.hostname.startsWith('amp.')) {
    amp_unhide_subscr_section();
    let subscriptions_action = document.querySelector('div[subscriptions-action][subscriptions-display="NOT data.hasError"]');
    if (subscriptions_action)
      subscriptions_action.removeAttribute('subscriptions-action');
    let art_cropped = document.querySelector('div.article-body.cropped');
    if (art_cropped)
      art_cropped.classList.remove('cropped');
    let subscr_tag = document.querySelector('div#subscriber-exclusive-tag');
    let amp_players = document.querySelectorAll('amp-connatix-player, amp-iframe.trinity-player');
    removeDOMElement(subscr_tag, ...amp_players);
    let amp_images = document.querySelectorAll('amp-img[srcset]:not([src])');
    for (let elem of amp_images) {
      let img = document.createElement('img');
      img.src = elem.getAttribute('srcset').split(' ')[0],
      img.alt = elem.getAttribute('alt'),
      img.style = 'width: 100%;';
      elem.parentNode.replaceChild(img, elem);
    }
  } else {
    window.setTimeout(function () {
      let paywall = document.querySelector('p#yzwall');
      if (paywall) {
        removeDOMElement(paywall);
        let pars_hidden = document.querySelectorAll('.yzfade, .yzarret');
        for (let elem of pars_hidden)
          elem.removeAttribute('class');
      }
    }, 1000);
  }
  let ads = 'div[data-type="ad"], div.vf-promo, div#ymovrly, div.ad__slot--wrapper, connatix-video-ad, px-sellwild';
  hideDOMStyle(ads);
}

else if (matchDomain(usa_mng_domains) || document.querySelector('head > link[rel="stylesheet"][id^="dfm-accuweather-"], footer li > a[href^="https://www.medianewsgroup.com"]')) {
  if (window.location.pathname.endsWith('/amp/'))
    amp_unhide_subscr_section('div.ampWrapperInside, div#paywall');
  else if (dompurify_loaded) {
    let paywall_sel = '#server-paywall';
    let paywall = document.querySelector(paywall_sel);
    let article_sel = 'div.body-copy';
    let article = document.querySelector(article_sel);
    if (paywall && article) {
      func_post = function () {
        let slideshow = article.querySelector('div.article-slideshow');
        if (slideshow) {
          slideshow.removeAttribute('class');
          let image_wrappers = slideshow.querySelectorAll('div.image-wrapper');
          for (let elem of image_wrappers) {
            elem.removeAttribute('class');
            elem.style = 'margin: 20px 0px;';
          }
          let caption = 'div.mng-gallery-information-container, button.icon-close';
          hideDOMStyle(caption, 2);
        }
        if (iframe)
          article.appendChild(iframe);
      }
      let iframe = article.querySelector('iframe');
      getJsonUrl(paywall_sel, '', article_sel, {art_append: 1, art_class: 'body-copy'});
    }
    let ads = 'div.dfp-ad';
    hideDOMStyle(ads);
  }
}

else if (document.querySelector('head > script[src*=".axate.io/"]')) {
  let premium = document.querySelector('.premium, div[class*="-premium"]');
  if (premium)
    premium.removeAttribute('class');
}

else if (document.querySelector('head > meta[property][content^="https://cdn.forumcomm.com/"]')) {
  let ads = 'div.GoogleDfpAd-Content';
  hideDOMStyle(ads);
}

else if (document.querySelector('head > script[data-memberstack-app]')) {
  let banners = 'div.free-text, div.subscribe-box';
  hideDOMStyle(banners);
}

else if (document.querySelector('head > script[src*=".postmedia.digital/"], head > meta[content*=".postmedia.digital/"]')) {
  let ads = 'div.ad__section-border, div[id^="tbl_"], div.js-widget-content, section.ad';
  hideDOMStyle(ads);
}

else if (document.querySelector('head > link[href$=".wallkit.net"]')) {
  let paywall = document.querySelector('div.wkwp-paywall');
  if (paywall)
    paywall.removeAttribute('class');
  hideDOMStyle('div.wkwp-paywall-block');
}

else
  csDone = true;
}

} // end csDone(Once)

ads_hide();
var leaky_paywall_unhide_disable;
if (!leaky_paywall_unhide_disable)
  leaky_paywall_unhide();

} // end cs_default function

function fix_dowjones_live() {
  let paywall = document.querySelector('div#cx-lc-snippet');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json) {
          let article = document.querySelector('div[data-id="StreamBody_index_MainContainer"]');
          if (article) {
            let pars = json[0].liveBlogUpdate;
            for (let par of pars) {
              if (par.headline && par.articleBody) {
                let headline = document.createElement('p');
                headline.innerText = par.headline;
                headline.style = 'font-weight: bold;';
                let author = document.createElement('a');
                if (par.author && par.author.sameAs) {
                  author.href = par.author.sameAs[0];
                  author.innerText = par.author.name;
                }
                let date = document.createElement('p');
                if (par.dateModified && par.datePublished) {
                  date.innerText = 'Updated ' + new Intl.DateTimeFormat("en-US", {dateStyle: "long", timeStyle: "short", timeZone: "America/New_York"}).format(new Date(par.dateModified)) + ' ET / Original ' + new Intl.DateTimeFormat("en-US", {dateStyle: "long", timeStyle: "short", timeZone: "America/New_York"}).format(new Date(par.datePublished)) + ' ET';
                }
                let body = document.createElement('p');
                body.innerText = par.articleBody;
                article.after(document.createElement('br'), headline, author, date, document.createElement('br'), body);
              }
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    let fade = document.querySelectorAll('div[class*="-CardWrapper"]');
    for (let elem of fade)
      elem.removeAttribute('class');
  }
}

var fetchOnce;
function fix_dowjones_fetch(url_src, data, article, img_lead_sel) {
  try {
    if (data && !fetchOnce) {
      fetchOnce = true;
      let json = JSON.parse(data);
      if (json && json.screens && json.screens[0] && json.screens[0].frames && json.screens[0].frames.length > 1) {
        let pars = json.screens[0].frames;
        let par_class;
        let intro = article.querySelector('p[class*="Paragraph"], [data-type="hed"]');
        if (intro) {
          if (intro.tagName === 'P')
            par_class = intro.className;
          else {
            let par_first = article.querySelector('p[class*="Paragraph"]');
            if (par_first)
              par_class = par_first.className;
          }
        }
        if (!par_class)
          addStyle('div.crawler p:not([class]) {margin: 20px 0px;}');
        let body_first = true;
        let img_lead = document.querySelector(img_lead_sel);
        let img_lead_url;
        if (img_lead)
          img_lead_url = img_lead.src.split('?')[0];
        article.innerHTML = '';
        function addBodyText(elem, par) {
          if (par.body && par.body.text && (par.body.text !== 'Visit page')) {
            if (par.body.additions) {
              let items = par.body.additions.filter(x => x.type === 'link' && x.value && x.hasOwnProperty('rangeStart') && x.rangeLength);
              if (items.length) {
                function addLink(item, body_part, start_index) {
                  item.rangeStart = item.rangeStart - start_index;
                  let start = body_part.substring(0, item.rangeStart);
                  let middle = body_part.substring(item.rangeStart, item.rangeStart + item.rangeLength);
                  let end = body_part.substring(item.rangeStart + item.rangeLength);
                  let sub_elem = document.createElement('a');
                  sub_elem.href = item.value;
                  sub_elem.innerText = middle;
                  sub_elem.style = 'text-decoration: underline;';
                  elem.append(document.createTextNode(start.replace(/\s_/g, '')), sub_elem, document.createTextNode(end.replace(/\s_/g, '')));
                }
                let start_index = end_index = 0;
                for (let item of items) {
                  end_index = start_index + item.rangeStart + item.rangeLength;
                  let body_part = par.body.text.substring(start_index, end_index);
                  addLink(item, body_part, start_index);
                  start_index = end_index;
                }
                if (end_index)
                  elem.appendChild(document.createTextNode(par.body.text.substring(end_index).replace(/\s_/g, '')));
              } else
                elem.innerText = par.body.text.replace(/\s_/g, '');
            } else
              elem.innerText = par.body.text.replace(/\s_/g, '');
          }
        }
        for (let par of pars) {
          let elem = document.createElement('p');
          if (par_class)
            elem.className = par_class;
          if (par.type === 'body') {
            if (par.body && par.styleID.match(/(default|bodyFrame|article-body)/)) {
              if (body_first && intro) {
                elem = intro;
                body_first = false;
              } else
                addBodyText(elem, par);
            }
          } else if (par.type === 'listelement') {
            if (par.body) {
              elem.appendChild(document.createTextNode(' • '));
              addBodyText(elem, par);
            }
          } else if (par.type === 'image') {
            if (par.image && par.image.url && !(img_lead_url && par.image.url.startsWith(img_lead_url))) {
              let caption = (par.caption ? par.caption.text + ' - ' : '') + (par.credit ? par.credit.text : '');
              elem = makeFigure(par.image.url, caption, {style: 'width: 80%; margin: auto;'});
              elem.style = 'margin: 20px 0px;';
            }
          } else if (['article', 'inlineArticle'].includes(par.type) && par.title && par.title.text && par.shareUrl) {
            let sub_elem = document.createElement('a');
            sub_elem.href = par.shareUrl;
            sub_elem.innerText = par.title.text;
            sub_elem.style = 'font-weight: bold;';
            elem.appendChild(sub_elem);
          } else if (par.type === 'dynamicinset') {
            if (par.webview && par.webview.value && par.webview.value !== window.location.href.split('?')[0]) {
              let iframe = document.createElement('iframe');
              iframe.src = par.webview.value;
              iframe.style = 'height: 600px; width: 100%; border: none;';
              elem.appendChild(iframe);
            }
          } else if (par.type === 'screen') {
            if (par.screen && par.screen.frames) {
              elem = document.createElement('p');
              let sub_elem = document.createElement('table');
              let row_new = true;
              let tr;
              for (let frame of par.screen.frames) {
                if (row_new) {
                  tr = document.createElement('tr');
                  row_new = false;
                }
                if (frame.body) {
                  let td = document.createElement('td');
                  td.innerText = frame.body.text;
                  tr.appendChild(td);
                } else if (frame.type === 'divider') {
                  sub_elem.appendChild(tr);
                  row_new = true;
                }
              }
              sub_elem.appendChild(tr);
              elem.appendChild(sub_elem);
            } else
              console.log(par);
          } else if (par.type === 'video') {
            if (par.url) {
              let video = document.createElement('video');
              video.src = par.url;
              video.setAttribute('controls', '');
              video.style = 'width: 100%;';
              elem.appendChild(video);
            }
          } else if (par.type === 'youtube') {
            if (par.videoId) {
              elem = document.createElement('p');
              let sub_elem = document.createElement('iframe');
              sub_elem.src = 'https://www.youtube.com/embed/' + par.videoId;
              sub_elem.style = 'width: 100%; height: 400px;';
              elem.appendChild(sub_elem);
            }
          } else if (par.type === 'jwplayer') {
            if (par.videos && par.videos[0] && par.videos[0].url) {
              if (window.navigator.userAgent.toLowerCase().includes('chrome')) {
                let video = document.createElement('video');
                video.src = par.videos[0].url;
                video.setAttribute('controls', '');
                video.style = 'width: 100%;';
                elem.appendChild(video);
              } else {
                let sub_elem = document.createElement('a');
                sub_elem.href = sub_elem.innerText = par.videos[0].url;
                elem.appendChild(sub_elem);
              }
            }
          } else if (par.type === 'audioplayer') {
            if (par.media && par.media.contentUrl) {
              let audio_tts = document.createElement('audio');
              audio_tts.src = par.media.contentUrl;
              audio_tts.setAttribute('controls', '');
              elem.appendChild(audio_tts);
            }
          } else if (!['ad', 'authorBios', 'byline', 'caption', 'columnistHeader', 'divider', 'inlineComment', 'paywall-promotion', 'pullquote', 'pullquotebody', 'scrollinggallery', 'sectionTitle', 'tagCloud', 'tags', 'title', 'verticalContainer', 'webview'].includes(par.type)) {
            console.log(par);
          }
          if (elem.hasChildNodes())
            article.appendChild(elem);
        }
      } else
        header_nofix(article, '', 'BPC > no fix (source file)');
    }
  } catch (err) {
    console.log(err);
  }
}
