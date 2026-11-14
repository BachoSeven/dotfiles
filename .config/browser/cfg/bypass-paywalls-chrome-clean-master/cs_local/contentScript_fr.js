//"use strict";

var be_groupe_ipm_domains = ['dhnet.be', 'lalibre.be', 'lavenir.net', 'moustique.be'];
var fr_gcf_custom_domains = ['larep.fr', 'leberry.fr', 'lechorepublicain.fr', 'lejdc.fr', 'lepopulaire.fr', 'leveil.fr', 'lyonne.fr'];
var fr_groupe_ebra_domains = ['bienpublic.com', 'dna.fr', 'estrepublicain.fr', 'lalsace.fr', 'ledauphine.com', 'lejsl.com', 'leprogres.fr', 'republicain-lorrain.fr', 'vosgesmatin.fr'];
var fr_groupe_la_depeche_domains = ['centrepresseaveyron.fr', 'journaldemillau.fr', 'ladepeche.fr', 'lindependant.fr', 'midilibre.fr', 'nrpyrenees.fr', 'petitbleu.fr', 'rugbyrama.fr'];
var fr_groupe_la_manche_libre_custom_domains = ['echoancenis.fr', 'echoduberry.fr', 'hautanjou.fr', 'larenaissancehebdo.fr', 'lecourriercauchois.fr', 'lecourrierdelamayenne.fr'];
var fr_groupe_macg_domains = ['igen.fr', 'macg.co', 'watchgeneration.fr'];
var fr_be_groupe_rossel_domains = ['aisnenouvelle.fr', 'courrier-picard.fr', 'lardennais.fr', 'lavoixdunord.fr', 'lemessager.fr', 'lesoir.be', 'lest-eclair.fr', 'liberation-champagne.fr', 'lunion.fr', 'nordlittoral.fr', 'paris-normandie.fr', 'sudinfo.be'];
var fr_groupe_nice_matin_domains = ['monacomatin.mc', 'nicematin.com', 'varmatin.com'];

var msg_once_page;
if (matchDomain([].concat(fr_groupe_ebra_domains))) {
  window.addEventListener('message', function (event) {
    if (event.data) {
      if (event.data.type === 'from_page') {
        if (matchDomain(fr_groupe_ebra_domains) && dompurify_loaded) {
          let json = event.data.data;
          if (json.html) {
            let article = document.querySelector('article.viewPartial:not(.done)');
            if (article) {
              article.classList.add('done');
              let intro = article.querySelectorAll('div.fullDetailActions, div.illustration, div.videoComponent');
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json.html, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              let fda = article_new.querySelector('div.fullDetailActions');
              for (let elem of intro) {
                let elem_class = elem.className;
                if (article_new.querySelector('[class="' + elem_class + '"]'))
                  removeDOMElement(elem);
                else if (fda)
                  fda.after(elem);
                else
                  article_new.firstChild.before(elem);
              }
              let infos = article.querySelector('div.infos');
              if (infos)
                infos.after(article_new);
              let body_content = document.querySelector('div.retrievedBodyContent');
              if (body_content) {
                let widget = article.querySelector('div.col_main div#poool-widget');
                if (widget)
                  body_content.before(widget);
              }
              article.classList.remove('locked');
              let preview = document.querySelector('div.previewContent');
              removeDOMElement(preview);
              if (typeof $ !== 'undefined') {
                dompurify_options.FORCE_BODY = true;
                dompurify_options.ADD_TAGS = dompurify_options.ADD_TAGS.concat(['script']);
                $("head").append(DOMPurify.sanitize(json.js, dompurify_options));
                formatWsContent();
              } else {
                let carousel = article.querySelector('ul.carousel-wrapper__slides');
                if (carousel) {
                  carousel.removeAttribute('class');
                  carousel.querySelectorAll('li > figure').forEach(e => e.removeAttribute('class'));
                  removeDOMElement(carousel.querySelector('figure:has(img[src^="data:image"])'));
                }
              }
              let accroche = document.querySelector('.mainContent .accroche');
              if (accroche)
                accroche.classList.add('unlocked');
              article.querySelectorAll('iframe[src=""][data-src]').forEach(e => e.src = e.getAttribute('data-src'));
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

if (matchDomain('actu.fr')) {
  let ads = 'div.ac-banner-ad';
  hideDOMStyle(ads);
}

else if (matchDomain('alternatives-economiques.fr')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('#temp-paywall');
    removeDOMElement(paywall);
    let data_ae_poool = document.querySelector('div[data-ae-poool]');
    if (data_ae_poool)
      data_ae_poool.removeAttribute('style');
  }, 500);
}

else if (matchDomain('aoc.media')) {
  func_post = function () {
    let article = document.querySelector('section.bottom-article');
    if (article)
      article.style = 'margin-bottom: 25px;';
  }
  getJsonUrl('section.article-payant', '', 'div.premium-article');
}

else if (matchDomain(['arcinfo.ch', 'lacote.ch', 'lenouvelliste.ch'])) {
  let paywall = document.querySelector('section#paywall-articles');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let url_id = window.location.pathname.match(/\d+$/).pop();
    let html = document.documentElement.outerHTML;
    let json;
    if (html.includes('window.__NUXT__=')) {
      json = html.split('window.__NUXT__=')[1].split('</script>')[0].trim().replace(/blocs:\[\{.*?\}\],/g, '');
      if (url_id && !json.includes('{"' + url_id + '":'))
        refreshCurrentTab();
    }
    let article = document.querySelector('div.html-content');
    if (article && json) {
      let content = '';
      let content_new;
      let json_html_filter = /html:{type:["\w]+,content:\[{/;
      if (json.match(json_html_filter)) {
        content = (json.match(json_html_filter)[0].replace(/html:/, '') + json.split(json_html_filter)[1].split('}]},has_pre_content')[0] + '}]}').replace(/:\[[,"\-\w]+\],/g, ':[],').replace(/([{,])(\w+)(?=:(["\{\[]|([\w$]{1,3}|[\d$]+)[,\}]))/g, "$1\"$2\"").replace(/\":(\[)?([\w\$\.]+)([\]},])/g, "\":$1\"$2\"$3");
        try {
          let pars = JSON.parse(content).content;
          article.innerHTML = '';
          let nuxt_vars = json.split(/^\(function\(/)[1].split('){')[0].split(',');
          let nuxt_values = json.split('}}(')[1].split('));')[0].replace(/(^|,)(true|\.?\d+|{}),/g, ',"$1$2",').replace(/(^|,)(false),/g, ',"$1$2",').replace(/(^|,)(null),/g, ',"$1$2",').replace(/,(void\s\d|Array\(\d+\)),/g, ',"$1",').replace(/,(\.?\d+|{}|Array\(\d+\)),/g, ',"$1",').split(/\\?",\\?"/);
          if (nuxt_vars.length !== nuxt_values.length)
            console.log('nuxt_vars: ' + nuxt_vars.length + ' != nuxt_values: ' + nuxt_values.length)
          function findNuxtText(str, attributes = false) {
            if (str && str.length < 4 && nuxt_vars.length && nuxt_values.length && !(attributes && str.length === 1 && str === str.toUpperCase())) {
              let index = nuxt_vars.indexOf(str);
              if (nuxt_values[index])
                str = nuxt_values[index].replace(/\\u002F/g, '/').replace(/^,/, '');
            }
            return str;
          }
          function addPar(par, elem) {
            let par_type = findNuxtText(par.type);
            if (par.content) {
              let tagName = 'p';
              if (par.content.length > 1)
                tagName = 'span';
              for (let item of par.content) {
                if (item.text && findNuxtText(item.text).trim()) {
                  let sub_elem = document.createElement(tagName);
                  if (item.marks) {
                    for (let mark of item.marks) {
                      let mark_type = findNuxtText(mark.type);
                      if (mark_type === 'link') {
                        if (mark.attrs && mark.attrs.href) {
                          sub_elem = document.createElement('a');
                          sub_elem.href = findNuxtText(mark.attrs.href);
                          sub_elem.target = mark.attrs.target ? findNuxtText(mark.attrs.target) : '_self';
                          sub_elem.style['text-decoration'] = 'underline';
                        }
                      } else if (mark_type === 'bold') {
                        sub_elem.style['font-weight'] = 'bold';
                      } else if (mark_type === 'italic') {
                        sub_elem.style['font-style'] = 'italic';
                      } else if (!['prefix', 'textStyle'].includes(mark_type))
                        console.log(mark_type)
                    }
                  }
                  sub_elem.innerText = findNuxtText(item.text);
                  if (par_type === 'heading')
                    sub_elem.style = 'font-weight: bold;';
                  elem.appendChild(sub_elem);
                }
              }
              if (tagName === 'span')
                elem.append(document.createElement('br'), document.createElement('br'));
            }
          }
          function addFigure(par, elem) {
            let attrs = par.attrs;
            if (attrs && attrs.src) {
              let src = findNuxtText(attrs.src);
              let caption;
              let meta_img = getNestedKeys(attrs, 'meta.image');
              if (meta_img)
                caption = (meta_img.caption ? findNuxtText(meta_img.caption) : '') + (meta_img.copyright ? '\r\n' + findNuxtText(meta_img.copyright) : '');
              let figure = makeFigure(src, caption);
              elem.appendChild(figure);
            }
          }
          function addIframely(par, elem) {
            let attrs = par.attrs;
            if (attrs && attrs.embed && attrs.embed.html) {
              let idiv = document.createElement('div');
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div style="margin: 20px 0px;">' + DOMPurify.sanitize(attrs.embed.html, dompurify_options) + '</div>', 'text/html');
              let iframely = doc.querySelector('div');
              let iframe = iframely.querySelector('iframe[data-iframely-url]:not([src])');
              if (iframe)
                iframe.src = iframe.getAttribute('data-iframely-url');
              idiv.append(document.createTextNode(attrs.embed.title), iframely);
              elem.appendChild(idiv);
            }
          }
          function addVideo(par, elem) {
            let attrs = par.attrs;
            if (attrs && attrs.src) {
              let video = document.createElement('iframe');
              video.src = findNuxtText(attrs.src).replace('watch?v=', '/embed/').split('&')[0];
              video.style = 'width: 100%; aspect-ratio: 16 / 9; border: 0; margin: 20px 0px;';
              elem.appendChild(video);
            }
          }
          for (let par of pars) {
            let par_new = document.createElement('div');
            let par_type = findNuxtText(par.type);
            if (['paragraph', 'heading'].includes(par_type)) {
              addPar(par, par_new);
            } else if (['figure', 'image'].includes(par_type)) {
              addFigure(par, par_new);
            } else if (par_type === 'youtube') {
              addVideo(par, par_new);
            } else if (par_type === 'iframely') {
              addIframely(par, par_new);
            } else if (par_type === 'preset') {
              let content = par.content;
              if (content) {
                let attrs_name = getNestedKeys(par, 'attrs.name');
                if (attrs_name) {
                  attrs_name = findNuxtText(attrs_name);
                  if (attrs_name === 'encadre')
                    par_new.style = 'border: solid; padding: 20px;';
                  else if (attrs_name === 'exergue') {
                    par_new.appendChild(document.createElement('hr'));
                    par_new.style = 'margin: 0px 20px;';
                  }
                  for (let elem of content) {
                    let sub_type = findNuxtText(elem.type);
                    if (['paragraph', 'heading'].includes(sub_type)) {
                      addPar(elem, par_new);
                    } else if (['figure', 'image'].includes(sub_type)) {
                      addFigure(elem, par_new);
                    } else if (sub_type === 'youtube') {
                      addVideo(elem, par_new);
                    } else if (sub_type === 'iframely') {
                      addIframely(elem, par_new);
                    } else if (sub_type === 'preset') {
                      addPar(elem.content[0], par_new);
                    } else {
                      console.log(sub_type);
                      console.log(elem);
                    }
                  }
                }
              }
            } else if (!['profile'].includes(par_type)) {
              console.log(par_type);
              console.log(par);
            }
            if (par_new.hasChildNodes())
              article.appendChild(par_new);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        if (json.includes('text_1="')) {
          content = json.split('text_1="').pop().split('";')[0];
        } else {
          let parts = json.split('html:"');
          parts.splice(0, 1);
          for (let part of parts)
            content += part.split('",has_pre_content')[0];
        }
        if (content) {
          content = content.replace(/\\u003C/g, '<').replace(/\\u003E/g, '>').replace(/\\u002F/g, '/').replace(/\\"/g, '"').replace(/\\r\\n/g, '');
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div class="html-content">' + DOMPurify.sanitize(content, dompurify_options) + '</div>', 'text/html');
          content_new = doc.querySelector('div');
          let iframely = content_new.querySelectorAll('div > div.fr-iframely');
          for (let elem of iframely) {
            let url_dom = elem.querySelector('[data-iframely-url]');
            if (url_dom) {
              let iframe = document.createElement('iframe');
              iframe.src = url_dom.getAttribute('data-iframely-url');
              iframe.style = 'width: 100%; height: 400px;';
              elem.parentNode.replaceChild(iframe, elem);
            }
          }
          let table_app = content_new.querySelectorAll('table > thead');
		  for (let elem of table_app) {
            if (elem.querySelector('a[href^="https://apps.apple.com/"]'))
              removeDOMElement(elem);
          }
          let article_top = article.parentNode.parentNode;
          removeDOMElement(article.parentNode);
          article_top.appendChild(content_new);
        } else
          header_nofix(article, '', 'BPC > no fix (page source)');
      }
    }
  }
  let ads = 'div.components-advertisement';
  hideDOMStyle(ads);
}

else if (matchDomain('atlantico.fr')) {
  let ads = 'div#pv_atf, div#infeed';
  hideDOMStyle(ads);
}

else if (matchDomain('autohebdo.fr')) {
  if (window.location.pathname.endsWith('.html'))
    getJsonUrl('div.box-info.yellow', '', 'div.editor', {art_append: 1});
}

else if (matchDomain('autoplus.fr')) {
  let ads = 'div.placeholder-pub_dfp';
  hideDOMStyle(ads);
}

else if (matchDomain(be_groupe_ipm_domains)) {
  let paywall = document.querySelector('div.is-preview');
  if (paywall) {
    paywall.classList.remove('is-preview');
    window.setTimeout(function () {
      let div_hidden = document.querySelector('div.is-hidden');
      if (div_hidden)
        div_hidden.classList.remove('is-hidden');
    }, 1000);
  }
  let ads = 'div.ap-AdContainer';
  hideDOMStyle(ads);
}

else if (matchDomain('capital.fr')) {
  let paywall = document.querySelector(cs_param.paywall_sel || 'div#articleWall-wrapper');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector(cs_param.article_sel || 'div#articleWall > div#articleWall-paid');
    if (article) {
      article.removeAttribute('class');
      article.removeAttribute('hidden');
      article.style['margin-top'] = '40px';
      article.parentNode.removeAttribute('class');
    }
  }
  let videos = document.querySelectorAll('div > div#prisma-player-leader[data-ads-core*="Dailymotion"]');
  for (let video of videos) {
    try {
      let json = JSON.parse(video.getAttribute('data-ads-core'));
      if (json && json.playerVideoId) {
        let iframe = document.createElement('iframe');
        iframe.src = 'https://www.dailymotion.com/embed/video/' + json.playerVideoId;
        iframe.style = 'height: ' + video.offsetHeight + 'px; width: ' + video.offsetWidth + 'px;';
        video.parentNode.replaceChild(iframe, video);
      }
    } catch (err) {
      console.log(err);
    }
  }
  let ads = 'div.ad, div.ads-display, div.outbrain-ads';
  hideDOMStyle(ads);
}

else if (matchDomain('challenges.fr')) {
  let paywall = document.querySelector('div.views-article__premium > img[alt="premium-icon"]');
  if (paywall && dompurify_loaded) {
    paywall.removeAttribute('alt');
    let article = document.querySelector('div.amorce');
    if (article) {
      let pars = article.querySelectorAll('div.text');
      if (!pars.length)
        pars = article.querySelectorAll('p[class], h2');
      if (pars.length && pars.length < 4) {
        let json_script = document.querySelector('script#__NUXT_DATA__');
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            let article_id_match = window.location.pathname.match(/_\d+$/);
            if (article_id_match) {
              let url_nuxt_alias = json.find(x => x && typeof x === 'object' && Object.keys(x).find(y => y.startsWith('alias-') && y.endsWith(article_id_match[0])));
              if (!url_nuxt_alias)
                refreshCurrentTab();
            }
            let audio_src = json.find(x => x && typeof x === 'string' && x.includes('.mp3'));
            if (audio_src) {
              let audio_tts = document.createElement('audio');
              audio_tts.src = audio_src.split('?')[0];
              audio_tts.setAttribute('controls', '');
              article.before(audio_tts);
            }
            let pars_index = json.indexOf('article') + 1;
            if (pars_index) {
              for (let i = pars_index; i < json.length; i++) {
                let par = json[i];
                if (par && typeof par === 'object' && !Array.isArray(par)) {
                  if (par.type) {
                    let elem;
                    let par_type = json[par.type];
                    function addChildren(elem, children) {
                      for (let child of children) {
                        let child_par = json[child];
                        if (child_par.type) {
                          let child_type = json[child_par.type];
                          if (child_type === 'text') {
                            let item = document.createElement('span');
                            let value = parseHtmlEntities(json[child_par.value].replace(/(\r?\n)+/g, ''));
                            if (value) {
                              item.innerText = value;
                              elem.appendChild(item);
                            }
                          } else if (child_type === 'element') {
                            addElement(elem, child_par);
                          } else if (child_type === 'component') {
                            if (child_par.props) {
                              let item;
                              let props = json[child_par.props];
                              if (props.image) {
                                let props_image = json[props.image];
                                if (props_image.src) {
                                  let src = json[props_image.src].split('?')[0];
                                  let caption;
                                  if (props_image.legend)
                                    caption = json[props_image.legend] + (props_image.credits ? ' - ' + json[props_image.credits] : '');
                                  item = makeFigure(src, caption);
                                }
                              } else if (props.link && props.htmlString) {
                                item = document.createElement('a');
                                item.href = json[props.link];
                                item.innerText = 'Lire aussi: ' + json[props.htmlString];
                              } else if (props.value) {
                                let parser = new DOMParser();
                                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json[props.value], dompurify_options) + '</div>', 'text/html');
                                item = doc.querySelector('div');
                              } else
                                console.log(props);
                              if (item)
                                elem.appendChild(item);
                            }
                          } else
                            console.log(child_par);
                        }
                      }
                    }
                    function addElement(elem, par) {
                      if (par.tag && (json[par.tag] !== 'script') && par.children) {
                        let elem_new = document.createElement(json[par.tag]);
                        if (par.props) {
                          let par_props = json[par.props];
                          for (let prop in par_props) {
                            elem_new.setAttribute(prop, json[par_props[prop]]);
                          }
                        }
                        addChildren(elem_new, json[par.children]);
                        elem.appendChild(elem_new);
                      }
                    }
                    if (par_type === 'element') {
                      elem = document.createElement('div');
                      addElement(elem, par);
                      window.setTimeout(function () {
                        article.innerHTML = '';
                        article.appendChild(elem);
                      }, 1000);
                      break;
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
  }
  let ads = 'div.domain-ui-ad-placeholder, div.widget-poool-engage';
  hideDOMStyle(ads);
}

else if (matchDomain('charliehebdo.fr')) {
  let paywall = document.querySelector('div#paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('article[id^="post-"]');
    if (article) {
      let article_id = article.id.split('post-')[1];
      if (article_id) {
        let intro_pars = article.querySelectorAll('div#principal > p');
        if (intro_pars.length) {
          let url = window.location.href;
          let json_url = 'https://charliehebdo.fr/wp-json/wp/v2/posts/' + article_id + '?appkey=' + (cs_param.appkey || 'JeSuisCharlie2023');
          fetch(json_url)
          .then(response => {
            if (response.ok) {
              response.json().then(json => {
                let json_text = json.content.rendered;
                if (json_text) {
                  let parser = new DOMParser();
                  let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
                  let article_new = doc.querySelector('div');
                  intro_pars[0].before(article_new);
                  removeDOMElement(...intro_pars);
                }
              });
            }
          });
        }
      }
    }
  }
}

else if (matchDomain('connaissancedesarts.com')) {
  let ads = 'div[class*="banniere"]';
  hideDOMStyle(ads);
}

else if (matchDomain('courrierinternational.com')) {
  let paywall = document.querySelector('div#bloc_paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article_sel = 'div.article-text';
    let article = document.querySelector(article_sel);
    if (article) {
      let url = window.location.href;
      let url_src = 'https://apps.courrierinternational.com/cri/v1/premium-android-phone/article?id=' + encodeURIComponent(window.location.pathname);
      let json_key = 'templates.raw_content.content';
      getExtFetch(url_src, json_key, {}, main_cri);
      function main_cri(url, data) {
        try {
          if (data) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(DOMPurify.sanitize(data, dompurify_options), 'text/html');
            let article_new = doc.querySelector(article_sel);
            if (article_new) {
              article_new.querySelectorAll('a[href^="crifr://article?id="]').forEach(e => e.href = decodeURIComponent(e.href.split('crifr://article?id=')[1].split('&')[0]).split('?')[0]);
              article.parentNode.replaceChild(article_new, article);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  let ads = 'div.dfp-slot, div.dfp__container';
  hideDOMStyle(ads);
}

else if (matchDomain('elle.fr')) {
  if (window.location.hostname.startsWith('amp.')) {
    amp_unhide_access_hide('="poool.access OR cmi_premium.access"');
  } else {
    let hidden_images = document.querySelectorAll('img[src^="data:image/"][data-src]');
    for (let hidden_image of hidden_images)
      hidden_image.setAttribute('src', hidden_image.getAttribute('data-src'));
    let subscription_bar = document.querySelector('.tc-subscription-bar');
    removeDOMElement(subscription_bar);
  }
  let ads = 'div[class*="--placeholder"]';
  hideDOMStyle(ads);
}

else if (matchDomain('franc-tireur.fr')) {
  let paywall = document.querySelector('div#poool-widget-content');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('section.article-body');
    if (article) {
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          if (json_text) {
            let parser = new DOMParser();
            let doc = parser.parseFromString('<p>' + DOMPurify.sanitize(breakText(json_text.replace(/\s\?/g, '?')).replace(/\n\n/g, '<br><br>'), dompurify_options) + '</p>', 'text/html');
            let article_new = doc.querySelector('p');
            article.innerHTML = '';
            article.appendChild(article_new);
          }
        }
      }
    }
  }
}

else if (matchDomain(fr_be_groupe_rossel_domains)) {
  let paywall = document.querySelector(cs_param.paywall_sel || 'r-panel.r-panel--paywall, r-panel.r-paywall--header');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    hideDOMStyle('r-mini-panel.r-mini-panel--froomle, div.r-paywall', 2);
    let article = document.querySelector(cs_param.article_sel || 'article.r-article > r-article--section, div.r-content, div.qiota_reserve');
    if (article) {
      article.removeAttribute('class');
      article.removeAttribute('id');
      let article_id;
      let url_src;
      let match = window.location.pathname.match(/^\/(art\/|id)?(\d+)\//);
      if (match) {
        article_id = match[2];
        let apps = 'apps';
        let apps_list = {
          'aisnenouvelle.fr': 'an',
          'courrier-picard.fr': 'cp',
          'lardennais.fr': 'ar',
          'lest-eclair.fr': 'ee',
          'liberation-champagne.fr': 'lc',
          'lunion.fr': 'un'
        };
        for (let domain in apps_list) {
          if (matchDomain(domain))
            apps += '_' + apps_list[domain];
        }
        url_src = window.location.origin + '/api/article/' + apps + '/' + article_id + '.json';
      } else {
        let match_archive = window.location.pathname.match(/\/art\/(d-\d+-\w+)$/);
        if (match_archive) {
          article_id = match_archive[1];
          url_src = window.location.origin + '/api/archive-detail/apps/' + article_id + '.json';
        }
      }
      if (url_src) {
        fetch(url_src)
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              if (json.body) {
                let parser = new DOMParser();
                dompurify_options.ADD_TAGS = dompurify_options.ADD_TAGS.concat(['epigraph', 'i-carousel', 'r-article--section', 'r-carousel', 'r-embed', 'r-img']);
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json.body, dompurify_options) + '</div>', 'text/html');
                let article_new = doc.querySelector('div');
                article_new.querySelectorAll('iframe[allow*="fullscreen"][allowfullscreen]').forEach(e => e.removeAttribute('allowfullscreen'));
                if (matchDomain('lesoir.be')) {
                  let readmore_links = article_new.querySelectorAll('a.link-card[href], a.embedly-card[href]');
                  for (let elem of readmore_links) {
                    if (elem.innerText === 'uri')
                      if (elem.className === 'embedly-card') {
                        elem.innerText = elem.href.split('?')[0];
                        elem.target = '_blank';
                      } else
                        elem.innerText = elem.href.split('/').pop();
                  }
                }
                if (json.package_type && json.package_type.includes('multimedia') && json.medias_first_urls && json.medias_first_urls.video) {
                  let video = document.createElement('iframe');
                  video.src = json.medias_first_urls.video.replace(/^http:/, 'https:');
                  video.style = 'width: 100%; aspect-ratio: 16 / 9; border: 0; margin: 20px 0px;';
                  article_new.firstChild.before(video);
                }
                article.innerHTML = '';
                article.appendChild(article_new);
              }
            })
          } else
            header_nofix(article, '', 'BPC > no fix (source file)');
        }).catch(err => console.log(err));
      } else
        header_nofix(article);
    }
  }
  let ads = 'r-pub, div.adm-ad-loading, div#article_paywall_es';
  hideDOMStyle(ads);
}

else if (matchDomain(fr_groupe_ebra_domains)) {
  function ebra_main() {
    let done;
    for (let n = 1; n <= 5; n++) {
      window.setTimeout(function () {
        if (typeof getWebContentKey === 'function' && !done) {
          done = true;
          let url_src = window.location.origin + "/services/grdc/detail?key=" + getWebContentKey();
          fetch(url_src)
          .then(response => {
            if (response.ok) {
              response.json().then(json => {
                let article = document.querySelector('article.viewPartial');
                if (article)
                  window.postMessage({type: 'from_page', data: json});
              })
            }
          }).catch(err => console.log(err));
        }
      }, n * 1000);
    }
  }
  let paywall = document.querySelector('div#paywall-dynamic');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    insert_script(ebra_main);
  }
  let ads = 'div.wrapperPub, div[id="#paywall-dynamic"]';
  hideDOMStyle(ads);
}

else if (matchDomain(fr_groupe_la_depeche_domains)) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div.article-full__body-content');
    if (article) {
      article.removeAttribute('style');
      article.removeAttribute('data-state');
    }
    let video = document.querySelector('div.article__media--premium > div.video-container.subscriber-placeholder > iframe[data-digiteka-src]:not([src])');
    if (video) {
      video.src = video.getAttribute('data-digiteka-src').replace(/^\/\//, 'https://');
      video.parentNode.classList.remove('subscriber-placeholder');
      let video_bloc = video.parentNode.parentNode.querySelector('div[rel="js-subscription-bloc"]');
      removeDOMElement(video_bloc);
    }
  }
  let ads = 'div.ad';
  hideDOMStyle(ads);
}

else if (matchDomain(fr_groupe_macg_domains)) {
  if (window.location.search.startsWith('?amp')) {
    ampToHtml();
  } else {
    let paywall_sel = cs_param.paywall_sel || 'main section.border-club';
    let paywall = document.querySelector(paywall_sel);
    let article = document.querySelector('div.news-body');
    if (paywall && article && dompurify_loaded) {
      removeDOMElement(paywall);
      let match = window.location.pathname.match(/-(\d+)$/);
      if (match) {
        let article_id = match[1];
        let url_src = window.location.origin + '/api/article/' + article_id;
        let json_key = 'data.0.content';
        csDoneOnce = true;
        getExtFetch(url_src, json_key, {}, main_macg);
        function main_macg(url, data) {
          try {
            if (data) {
              let parser = new DOMParser();
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(data, dompurify_options) + '</div>', 'text/html');
              let article_new = doc.querySelector('div');
              if (article_new) {
                article.innerHTML = '';
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
  let ads = 'div[data-optidigital-slot], div[class*="min-h-"]';
  hideDOMStyle(ads);
}

else if (matchDomain(fr_groupe_nice_matin_domains)) {
  if (window.location.pathname.startsWith('/amp/')) {
    amp_iframes_replace();
    let qiota_script = document.querySelector('amp-script.i-amphtml-layout-size-defined[src$="/qiota-amp.js"]');
    if (qiota_script) {
      qiota_script.classList.remove('i-amphtml-layout-size-defined');
      let amp_images = document.querySelectorAll('amp-img > img.i-amphtml-fill-content');
      for (let elem of amp_images)
        elem.removeAttribute('class');
      let sizers = document.querySelectorAll('i-amphtml-sizer');
      removeDOMElement(...sizers);
    }
  }
  let ads = 'div[class^="ad-slot-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('jeuneafrique.com')) {
  let now_date = (new Date()).toISOString().split('T')[0];
  let ls_date = localStorage.getItem('###_json_date') || '';
  let ls_json_articles = {};
  let ls_json_urls = {};
  function show_data(article, body, ls_json_urls) {
    let parser = new DOMParser();
    let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(parseHtmlEntities(body), dompurify_options) + '</div>', 'text/html');
    let article_new = doc.querySelector('div');
    let readmore_links = article_new.querySelectorAll('div.sc-lire-aussi');
    for (let elem of readmore_links) {
      elem.style = 'margin-bottom: 20px';
      let app_link = elem.querySelector('a[href^="jeuneafrique://article/"');
      if (app_link) {
        let match = app_link.href.match(/\d+$/);
        if (match && ls_json_urls[match[0]])
          app_link.href = ls_json_urls[match[0]];
      }
    }
    article.innerHTML = '';
    article.parentNode.replaceChild(article_new, article);
  }
  function store_data(json, limit, limit_low = 100, article_id = '', article = '') {
    try {
      let src_articles = json.articles.filter(x => !x.content_status_open);
      if (src_articles) {
        if (article_id) {
          let src_article = src_articles.filter(x => x.id == article_id)[0];
          if (src_article)
            show_data(article, src_article.content_full, ls_json_urls);
          else
            header_nofix(article, '', 'BPC > no fix (source file)');
        }
        if (!ls_date || limit > limit_low || now_date > ls_date) {
          ls_json_articles = {};
          ls_json_urls = {};
        } else if (ls_date && !Object.keys(ls_json_articles).length) {
          let ls_articles = localStorage.getItem('###_json');
          ls_json_articles = JSON.parse(ls_articles);
          let ls_urls = localStorage.getItem('###_json_urls') || {};
          ls_json_urls = JSON.parse(ls_urls);
        }
        for (let art of src_articles)
          ls_json_articles[art.id] = art.content_full;
        for (let art of json.articles)
          ls_json_urls[art.id] = art.url;
        localStorage.setItem('###_json', JSON.stringify(ls_json_articles));
        localStorage.setItem('###_json_date', now_date);
        localStorage.setItem('###_json_urls', JSON.stringify(ls_json_urls));
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (!window.location.pathname.startsWith('/api/mobile/v6.0/featured')) {
    let paywall = document.querySelector('div#poool-widget');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let article = document.querySelector('div.article__content > div[data-mrf-recirculation]');
      let article_id = window.location.pathname.split('/')[1];
      if (article && article_id) {
        let limit_low = 50 + randomInt(50);
        let limit_high = 600 + randomInt(100);
        function fetch_data(limit) {
          let url_src = 'https://www.jeuneafrique.com/api/mobile/v6.0/featured/?limit=' + limit + '&rel=' + randomInt(100000);
          fetch(url_src, {headers: cs_param})
          .then(response => {
            if (response.ok) {
              response.json().then(json => {
                store_data(json, limit, limit_low, article_id, article);
              })
            } else {
              if (ext_chromium)
                header_nofix(article, '', 'BPC > try to load full content by json-link & refresh current article tab (only for recent article)', url_src);
              else
                header_nofix(article, '', 'BPC > no fix (source file)');
            }
          }).catch(x => header_nofix(article, '', 'BPC > no fix (source file)'))
        }
        let json_date;
        let json_script = document.querySelector('script[type="application/ld+json"]');
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text);
            if (json && json['@graph']) {
              let date_arr = json['@graph'].filter(x => x.datePublished);
              if (date_arr.length)
                json_date = date_arr[0].datePublished;
            }
          } catch (err) {
            console.log(err);
          }
        }
        let art_date = json_date ? json_date.split('T')[0] : now_date;
        if (ls_date) {
          let ls_articles = localStorage.getItem('###_json');
          ls_json_articles = JSON.parse(ls_articles);
          let ls_urls = localStorage.getItem('###_json_urls') || {};
          ls_json_urls = JSON.parse(ls_urls);
          let art_data = ls_json_articles[article_id];
          if (art_data)
            show_data(article, art_data, ls_json_urls);
          else if (ls_date < art_date)
            fetch_data(limit_high);
          else if (now_date === art_date)
            fetch_data(limit_low);
          else
            header_nofix(article, '', 'BPC > no fix (source file)')
        } else {
          fetch_data(limit_high);
        }
      }
    }
    let ads = 'div.banner-ad, div.box-ad-brand';
    hideDOMStyle(ads);
  } else {
    csDoneOnce = true;
    let params = new URLSearchParams(window.location.search);
    let limit = parseInt(params.get('limit'));
    if (limit) {
      let html = document.querySelector('body > pre');
      if (html) {
        try {
          let json = JSON.parse(html.innerText);
          store_data(json, limit);
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
}

else if (matchDomain('journaldunet.com')) {
  let reg_wall = document.querySelector('div.reg_wall');
  removeDOMElement(reg_wall);
  let entry_reg_wall = document.querySelector('div.entry_reg_wall[style]');
  if (entry_reg_wall)
    entry_reg_wall.removeAttribute('style');
}

else if (matchDomain('la-croix.com')) {
  function lacroix_main() {
    fetch('/extend_access', {
      method: "POST"
    }).then(x => window.location.reload())
  }
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    removeDOMElement(paywall);
    insert_script(lacroix_main);
  }
  let ads = 'div[data-gam]';
  hideDOMStyle(ads);
}

else if (domain = matchDomain('lamanchelibre.fr') || matchDomain(fr_groupe_la_manche_libre_custom_domains)) {
  let paywall = document.querySelector(cs_param.paywall_sel || 'div#paywall_ctn');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article_id_match = window.location.pathname.match(/^\/\w+-(\d+)-/);
    if (article_id_match) {
      let article_id = article_id_match[1];
      let article = document.querySelector(cs_param.article_sel || 'div.article_txt');
      if (article_id && article) {
        let url_src = 'https://app-api.' + domain + '/v1/getNew.php?id=' + article_id;
        fetch(url_src)
        .then(response => {
          if (response.ok) {
            response.json().then(json => {
              try {
                let parser = new DOMParser();
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json.result[0].body, dompurify_options) + '</div>', 'text/html');
                let article_new = doc.querySelector('div');
                article_new.className = article.className;
                article_new.classList.remove('melody');
                let ng_images = article_new.querySelectorAll('div.picture_container > p > img[ng-src]:not([src])');
                for (let elem of ng_images) {
                  elem.src = elem.getAttribute('ng-src');
                  let fs_button = elem.parentNode.parentNode.querySelector('div.fullscreen_button');
                  removeDOMElement(fs_button);
                }
                article.parentNode.replaceChild(article_new, article);
              } catch (err) {
                console.log(err);
              }
            })
          }
        })
      }
    }
  }
  let ads = 'div.class_pub, div#tbl-next-up';
  hideDOMStyle(ads);
}

else if (matchDomain('lecho.be')) {
  let article_match = window.location.pathname.match(/\/(\d+)\.html$/);
  if (article_match && dompurify_loaded) {
    let article_id = article_match[1];
    let url = window.location.href;
    let nofix_msg = 'BPC > no data yet (refresh page)';
    if (matchDomain('investisseur.lecho.be')) {
      window.setTimeout(function () {
      let paywall = document.querySelector(cs_param.paywall_sub_sel || 'div[class*="_paywallContainer"]');
      if (paywall) {
        removeDOMElement(paywall);
		let article_sel = cs_param.article_sub_sel || 'div[class*="_articleBodyCenter"]';
        let article = document.querySelector(article_sel);
        if (article) {
          let authorization = mediafin_get_auth();
          if (authorization) {
            csDoneOnce = true;
            let url_src = 'https://api.mediafin.be/content/article/urn:article:' + article_id;
            getExtFetch(url_src, '', {headers: {authorization: cs_param.authorization || authorization}}, mediafin_main, data_ext_fetch_id++, [article]);
          } else {
            header_nofix(article, '', nofix_msg);
            article.before(googleSearchToolLink(url));
          }
        }
        addStyle('body {overflow: auto !important} ' + article_sel + ' {margin: 20px 0px;}');
        let banner = document.querySelector('div[data-id="react-paywall-auth0"]');
        removeDOMElement(banner);
      }
      }, 1000);
    } else {
      hideDOMStyle('div.ds-modal-wrapper');
      let paywall = document.querySelector('html.paywall-active');
      if (paywall) {
        paywall.classList.remove('paywall-active');
        if (!(window.location.href.includes('/live-blog/') || document.querySelector('header.live-blog-header'))) {
          let article = document.querySelector('div[itemprop="articleBody"]');
          if (article) {
            let authorization = mediafin_get_auth();
            if (authorization) {
              csDoneOnce = true;
              let url_src = 'https://api.mediafin.be/content/article/urn:article:' + article_id;
              getExtFetch(url_src, '', {headers: {authorization: cs_param.authorization || authorization}}, mediafin_main, data_ext_fetch_id++, [article]);
            } else {
              header_nofix(article, '', nofix_msg);
              article.before(googleSearchToolLink(url));
            }
          }
        } else {
          let main = document.querySelector('main');
          if (main)
            main.after(googleSearchToolLink(url));
        }
      }
    }
    function clear_inert() {
      document.querySelectorAll('[inert]').forEach(e => e.removeAttribute('inert'));
    }
    clear_inert();
  }
}

else if (matchDomain('lecourrierdesstrateges.fr')) {
  window.setTimeout(function () {
    let paywall = document.querySelector('div.jpw-truncate-btn');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let json_script = getArticleJsonScript();
      if (json_script) {
        let json = JSON.parse(json_script.text);
        if (json) {
          let json_text = json.articleBody;
          let content = document.querySelector('div.content-inner');
          if (json_text && content) {
            let parser = new DOMParser();
            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
            let content_new = doc.querySelector('div');
            content.parentNode.replaceChild(content_new, content);
            let hidden_images = document.querySelectorAll('img[src][srcset]');
            for (let elem of hidden_images)
              elem.removeAttribute('srcset');
            let entry_content = document.querySelector('div.entry-content[style]');
            if (entry_content)
              entry_content.removeAttribute('style');
          }
        }
      }
    }
  }, 500);
}

else if (matchDomain('lefigaro.fr')) {
  let paywall = document.querySelector('div#fig-premium-paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div[data-component="fig-content-body"]');
    if (article) {
      let resource_key = cs_param.resource_key || '34e68a3419a876e36729503e2107dfa556e1a105892e27010130a30018ccbe60';
      let url = window.location.href.split([/\?#/])[0];
      let url_src = 'https://api-graphql.lefigaro.fr/graphql?id=FigaroCoreMobile_resourceByUrl_persistent_' + resource_key + '&variables={%22url%22:%20%22' + url + '%22}';
      fetch(url_src)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            try {
              let pars = json.data.resource.body.structured;
              if (pars.length)
                article.innerHTML = '';
              let parser = new DOMParser();
              for (let par of pars) {
                let elem;
                let sub_elem;
                let par_type = par.__typename;
                if (['Heading', 'Paragraph', 'ParagraphWithPaywall'].includes(par_type)) {
                  if (par.paywall)
                    par = par.paywall;
                  if (par.text.replace(/&nbsp;/g, '')) {
                    let doc = parser.parseFromString('<p class="fig-paragraph">' + DOMPurify.sanitize(par.text, dompurify_options) + '</p>', 'text/html');
                    elem = doc.querySelector('p');
                    if (par_type === 'Heading')
                      elem.style = 'font-weight: bold; font-size: 1.85rem;';
                  }
                } else if (['Photo', 'VideoFigaro'].includes(par_type)) {
                  if (par.thumbnail)
                    par = par.thumbnail;
                  if (par.image) {
                    elem = document.createElement('p');
                    elem.className = 'fig-paragraph';
                    let img = makeFigure(par.image.url, par.caption.replace(/<[^<]*>/g, '') + ' ' + par.credit, '', {class: 'fig-media__legend'});
                    elem.append(img, document.createElement('br'));
                  }
                } else if (par_type === 'Frame') {
                  if (par.text) {
                    elem = document.createElement('p');
                    elem.className = 'fig-paragraph';
                    let title = document.createElement('p');
                    title.innerText = par.title;
                    title.className = 'fig-paragraph';
                    title.style = 'font-weight: bold;';
                    let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.text, dompurify_options) + '</div>', 'text/html');
                    let text = doc.querySelector('div');
                    elem.append(title, text);
                  }
                } else if (par_type.endsWith('Link')) {
                  if (par.link)
                    par = par.link;
                  if (par.title && par.url) {
                    elem = document.createElement('p');
                    if (par.prefix) {
                      let prefix = document.createElement('span');
                      prefix.innerText = par.prefix + ' ';
                      elem.append(prefix);
                    }
                    let link_elem = document.createElement('a');
                    link_elem.href = par.url;
                    link_elem.innerText = par.title.replace(/<[^<]*>/g, '');
                    link_elem.target = '_blank';
                    elem.append(link_elem);
                  }
                } else if (par.sourceCode) {
                  if (par.sourceCode.includes(' data-url="https://podcasts.')) {
                    elem = document.createElement('iframe');
                    elem.src = par.sourceCode.split(' data-url="')[1].split('"')[0];
                    elem.style = 'width: 100%; ' + (mobile ? 'aspect-ratio: 1 / 1' : 'height: 250px');
                  } else {
                    let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.sourceCode, dompurify_options) + '</div>', 'text/html');
                    elem = doc.querySelector('div');
                    let tweet_link = elem.querySelector('a[href^="https://twitter.com/"], a[href^="https://x.com/"]');
                    if (tweet_link) {
                      tweet_link.innerText = tweet_link.href;
                      tweet_link.target = '_blank';
                    }
                  }
                } else if (par_type === 'Youtube') {
                  if (par.id) {
                    elem = document.createElement('iframe');
                    elem.src = 'https://www.youtube.com/embed/' + par.id;
                    elem.style = 'width: 100%; height: 400px;';
                  }
                } else if (par_type === 'List') {
                  if (par.list) {
                    elem = document.createElement('ul');
                    elem.style = 'list-style: inside;';
                    for (let item of par.list) {
                      let li = document.createElement('li');
                      li.style = 'margin: 10px 0px;';
                      let doc = parser.parseFromString('<span>' + DOMPurify.sanitize(item) + '</span>', 'text/html');
                      let span = doc.querySelector('span');
                      li.appendChild(span);
                      elem.appendChild(li);
                    }
                  }
                } else if (par_type === 'HorizontalRule') {
                  elem = document.createElement('hr');
                } else if (par_type === 'Quote') {
                  elem = document.createElement('blockquote');
                  elem.style = 'margin: 30px;';
                  let qtext = document.createElement('p');
                  qtext.innerText = parseHtmlEntities(par.text);
                  qtext.style = 'font-weight: bold; font-size: 28px; margin: 15px 0px;';
                  let qcredit = document.createElement('p');
                  qcredit.innerText = par.credit ? parseHtmlEntities(par.credit) : '';
                  elem.append(qtext, qcredit);
                } else if (!['Brightcove'].includes(par_type)) {
                  console.log(par);
                }
                if (elem)
                  article.appendChild(elem);
              }
            } catch (err) {
              console.log(err);
            }
          })
        }
      }).catch(x => header_nofix(article, '', 'BPC > no fix (source file)'))
    }
  }
  let ads = 'div.fig-ad-content';
  hideDOMStyle(ads);
}

else if (matchDomain('legrandcontinent.eu')) {
  let paywall = document.querySelector('body.paywall, body.pw, body.softwall');
  if (paywall)
    paywall.classList.remove('paywall', 'pw', 'softwall');
  let banners = document.querySelectorAll('div#fix-pw, div.disposableBanner');
  removeDOMElement(...banners);
}

else if (matchDomain(['lejdd.fr', 'parismatch.com', 'public.fr'])) {
  let banners = '.forbidden';
  let ads = 'div[class^="lmn-"], div.premium-hidden, div.p-aside--placeholder, section.outbrain-container';
  hideDOMStyle(banners + ', ' + ads);
  let bottom_hide = document.querySelector('.cnt[data-poool-mode="hide"]');
  if (bottom_hide) {
    bottom_hide.removeAttribute('data-poool-mode');
    bottom_hide.removeAttribute('style');
  }
}

else if (matchDomain('lemagit.fr')) {
  let paywall = document.querySelector('div.paywall');
  if (paywall) {
    paywall.classList.remove('paywall');
    let banners = document.querySelectorAll('p#firstP, div#inlineRegistrationWrapper');
    removeDOMElement(...banners);
  }
}

else if (matchDomain('lemonde.fr')) {
  let url = window.location.href.split(/[\?#]/)[0];
  let paywall_sel = 'section.lmd-paywall';
  let paywall = document.querySelector(paywall_sel);
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    hideDOMStyle(paywall_sel, 2);
    let article = document.querySelector('.article__content');
    if (article) {
      let match = url.match(/article.*_(\d+)_/);
      if (match) {
        let id = match[1];
        let url_base = 'https://apps.lemonde.fr/aec/v1/' + (window.location.pathname.startsWith('/en/') ? 'en/' : '') + 'premium-android-phone/article/';
        let url_src = url_base + id;
        let json_key = 'template_vars.content';
        csDoneOnce = true;
        getExtFetch(url_src, json_key, {}, main_lemonde);
        function main_lemonde(url, data) {
          try {
            if (data) {
              let parser = new DOMParser();
              let doc = parser.parseFromString(DOMPurify.sanitize(data, dompurify_options), 'text/html');
              let article_new = doc.querySelector('.article_content');
              if (article_new) {
                article_new.className = 'article__content';
                article_new.style = 'margin: 50px 0px;';
                article_new.querySelectorAll('p').forEach(e => e.className = 'article__paragraph');
                article_new.querySelectorAll('h2').forEach(e => e.className = 'article__sub-title');
                article_new.querySelectorAll('h3.question').forEach(e => e.className = 'article__question');
                article_new.querySelectorAll('figure').forEach(e => e.style = 'margin: 0px 10px; line-height: normal;');
                article_new.querySelectorAll('div.see-also-container, div.reference').forEach(e => e.style = 'margin: 20px 0px;');
                let image_divs = article_new.querySelectorAll('div.image');
                for (let elem of image_divs) {
                  elem.style = 'margin: 20px 0px;';
                  let img = elem.querySelector('a > img[data-src]');
                  if (img) {
                    if (img.src.startsWith('data:image/'))
                      img.src = img.getAttribute('data-src');
                    img.parentNode.before(img);
                  }
                }
                let videos = article_new.querySelectorAll('div.video-container');
                for (let video of videos) {
                  let video_id_dom = video.querySelector('div[data-provider="dailymotion"][data-id]');
                  if (video_id_dom) {
                    let iframe = document.createElement('iframe');
                    iframe.src = 'https://www.dailymotion.com/embed/video/' + video_id_dom.getAttribute('data-id');
                    iframe.style = 'height: 400px; width: 100%; margin: 20px 0px;';
                    video.parentNode.replaceChild(iframe, video);
                  }
                }
                let cartes = article_new.querySelectorAll('div.cartes > div.carte > img[src_700][src_350]');
                for (let elem of cartes) {
                  elem.parentNode.parentNode.removeAttribute('class');
                  elem.src = mobile ? elem.getAttribute('src_350') : elem.getAttribute('src_700');
                  elem.style = 'width: 90%; margin: auto;';
                }
                let charts = article_new.querySelectorAll('section.snippet-infog');
                for (let elem of charts) {
                  let img = elem.querySelector('img:not([src])');
                  if (img) {
                    let attributes = [...img.attributes].filter(x => img.getAttribute(x.name) && x.name.startsWith('src_'));
                    if (attributes.length) {
                      img.src = img.getAttribute(attributes[0].name);
                      elem.removeAttribute('class');
                    }
                  }
                }
                let inread = article_new.querySelectorAll('div.inread-container');
                removeDOMElement(...inread);
                let links = article_new.querySelectorAll('div.link-container > a[href^="lmfr://"]');
                function link_lemonde(url, data, elem) {
                  if (data)
                    elem.href = data;
                }
                for (let elem of links) {
                  let url_link = elem.href;
                  let url_match = url_link.split(/[\?#]/)[0].match(/^lmfr:\/\/.*element\/article\/(\d+)/);
                  if (url_match) {
                    let id = url_match[1];
                    let url_src = url_base + id;
                    let json_key = 'element.url';
                    getExtFetch(url_src, json_key, {}, link_lemonde, data_ext_fetch_id++, [elem]);
                  } else if (url_link.match(/^lmfr:\/.*\/live\/\d+\?/) && url_link.includes('www.lemonde.fr')) {
                    url_link = decodeURIComponent('https://www.lemonde.fr' + url_link.replace(/%25/g, '%').split('www.lemonde.fr')[1].split('.html')[0] + '.html');
                    link_lemonde(url, url_link, elem);
                  }
                }
                article_new.querySelectorAll('div.reference > a[href^="lmfr://"][href*="/open-url?"][href*="&url="]').forEach(e => e.href = decodeURIComponent(e.href.split('&url=')[1].split('&')[0]).split('?')[0]);
                article.innerHTML = '';
                article.parentNode.replaceChild(article_new, article);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }
  let ads = 'div.dfp-slot, div.dfp__container, div.media-notice';
  hideDOMStyle(ads);
}

else if (matchDomain('leparisien.fr')) {
  func_post = function () {
    if (mobile) {
      let body = document.querySelector('section#left div[style^="display:block;"][style*="margin-inline-start:"]');
      if (body)
        body.removeAttribute('style');
    }
    let ads = 'section#left div[style^="background-color:"]';
    hideDOMStyle(ads, 2);
  }
  let url = window.location.href;
  getArchive(url, 'div.paywall', '', 'section#left');
  let ads = 'div.ad_element, div[class*="inread-ads"]';
  hideDOMStyle(ads);
}

else if (matchDomain('lepoint.fr')) {
  // plus code in contentScript_once_var.js (timing)
  let ads = 'div.ad-slot-container';
  hideDOMStyle(ads);
}

else if (matchDomain('lequipe.fr')) {
  let paywall = document.querySelector(cs_param.paywall_sel || 'article.Article--limited div.Article__paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    addStyle('div.Article__paragraph--limited {visibility: visible !important; height: auto !important; margin: 0px 0px 20px !important;}');
    let article_id = window.location.pathname.match(/\d+$/)[0];
    let article = document.querySelector('div.article__body');
    if (article_id && article) {
      let url_src = 'https://dwh.lequipe.fr/api/v4/efr/news/' + article_id;
      fetch(url_src)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            try {
              let pars = json.items.filter(x => x.layout === 'article_body')[0].objet.paragraphs;
              pars.shift();
              article.innerHTML = '';
              article.style = 'margin: 20px;';
              addStyle('div.article__body > div.Paragraph {font-family: "DINNextLTPro-Regular", sans-serif; font-size: 18px; font-weight: 400; line-height: 26px; margin: 20px 0px;}', 2);
              let parser = new DOMParser();
              for (let par of pars) {
                let elem;
                if (par.content || par.note) {
                  if (!par.content)
                    par.content = '';
                  if ((par.content.match(/(^<div|\/div>$)/g) || []).length !== 1) {
                    let elem_type = 'div';
                    if (par.title) {
                      par.content = '<h2>' + par.title + '</h2>' + par.content;
                    } else if (par.note) {
                      if (par.note.label && par.note.rating) {
                        let par_img = par.note.image || par.note.picture;
                        let img = (par_img && par_img.url) ? '<img src="' + par_img.url.replace('{width}', '200').replace('{height}', 200).replace('{quality}', '75') + '" >' : '';
                        par.content = '<h2>' + par.note.label + ': ' + par.note.rating + '</h2>' + img + par.content;
                      }
                    }
                    let doc = parser.parseFromString('<div class="Paragraph">' + DOMPurify.sanitize(par.content, dompurify_options) + '</div>', 'text/html');
                    elem = doc.querySelector(elem_type);
                  }
                } else if (par.title) {
                  elem = document.createElement('h2');
                  elem.innerText = par.title;
                } else if (par.media) {
                  if (par.media.url && par.media.ratio) {
                    let ratio = par.media.ratio;
                    if (!parseInt(ratio))
                      ratio = 1.5;
                    let url = par.media.url.replace(/\\u002F/g, '/').replace('{width}', '400').replace('{height}', parseInt(400 / ratio)).replace('{quality}', '75');
                    let caption = par.media.legende && par.media.legende.length > 2 ? par.media.legende : '';
                    elem = makeFigure(url, caption, {'style': 'width: 100%;'}, {'style': 'font-weight: bold;'});
                  } else if (par.media.__type === 'video' && par.media.id) {
                    let url = par.media.image.url.replace('{width}', '400').replace('{height}', 400).replace('{quality}', '75');
                    elem = makeFigure(url, par.media.legend, {'style': 'width: 100%;'});
                    let video_link = document.createElement('a');
                    video_link.href = video_link.innerText = 'https://geo.dailymotion.com/player.html?video=' + par.media.id;
                    video_link.style = 'text-decoration: underline;';
                    video_link.target = '_blank';
                    elem.appendChild(video_link);
                  }
                } else if (par.__type === 'article_paragraph_playing_field') {
                  if (par.data) {
                    let url = par.data;
                    fetch(url)
                    .then(response => {
                      if (response.ok) {
                        response.json().then(json => {
                          if (json.arbitre && json.titulaires) {
                            let ids = [json.arbitre].concat(json.titulaires);
                            if (json.banc)
                              for (let elem of json.banc)
                                ids = ids.concat([elem.entraineur], elem.remplacants);
                            let notes = document.querySelectorAll('span.EditorRatingsField__note');
                            for (let note of notes) {
                              let name_dom = note.parentNode.querySelector('span[class$="--name"]');
                              if (name_dom) {
                                let name = (name_dom.innerText.includes(':') ? name_dom.innerText.split(':')[1] : name_dom.innerText).trim();
                                let json_note = ids.find(x => x.nom === name);
                                if (json_note)
                                  note.innerText = json_note.note;
                              }
                            }
                          }
                        })
                      }
                    })
                  }
                } else if (!['article_paragraph_pub'].includes(par.__type))
                  console.log(par);
                if (elem)
                  article.appendChild(elem);
              }
            } catch (err) {
              console.log(err);
            }
          })
        }
      }).catch(x => header_nofix(article, '', 'BPC > no fix (source file)'))
    }
  }
  let ads = 'div.AmPlaceholder, div.Modal[data-modal="amsBlock"], div#tbl-next-up';
  hideDOMStyle(ads);
  let noscroll = document.querySelector('html');
  if (noscroll)
    noscroll.style.overflow = 'auto';
}

else if (matchDomain('lerevenu.com')) {
  let ads = 'div.wrapperAd';
  hideDOMStyle(ads);
}

else if (matchDomain(['lesechos.fr', 'historia.fr'])) {
  if (window.location.pathname.startsWith('/amp/')) {
    ampToHtml();
  } else {
    window.setTimeout(function () {
      let paywall = document.querySelector('div#paywall, div#registerWall');
      if (paywall && dompurify_loaded) {
        removeDOMElement(paywall);
        let filter = /window\.__REACT_QUERY_STATE__\s?=\s?/;
        let json_script = getSourceJsonScript(filter);
        if (json_script) {
          try {
            let json = JSON.parse(json_script.text.split(filter)[1].split('};')[0] + '}');
            let data_article = json.queries.find(x => getNestedKeys(x, 'state.data.stripes')).state;
            let url = window.location.href;
            let url_loaded = data_article.data.path;
            if (url_loaded && (!url_loaded.slice(-7).match(/\d+/) || !url.includes(url_loaded.slice(-7))))
              refreshCurrentTab();
            else {
              let json_text = data_article.data.stripes[0].mainContent[0].data.description;
              let article = document.querySelector('div.post-paywall');
              if (article) {
                let contentNode = document.createElement('div');
                let parser = new DOMParser();
                let doc = parser.parseFromString('<div class="' + article.className + '">' + DOMPurify.sanitize(json_text, dompurify_options) + '</div>', 'text/html');
                let article_new = doc.querySelector('div');
                article_new.querySelectorAll('img').forEach(e => e.style.width = '100%');
                let videos = article_new.querySelectorAll('iframe[allow*="fullscreen"][allowfullscreen]');
                for (let elem of videos) {
                  elem.removeAttribute('allowfullscreen');
                  if (mobile)
                    elem.style.width = '100%';
                }
                if (article.parentNode && article_new) {
                  article.parentNode.replaceChild(article_new, article);
                  let article_lastnode = document.querySelector('.post-paywall  > :last-child');
                  if (article_lastnode) {
                    article_lastnode.setAttribute('style', 'height: auto !important; overflow: hidden !important; max-height: none !important;');
                  }
                }
              }
              let styleElem = document.head.appendChild(document.createElement('style'));
              styleElem.innerText = ".post-paywall::after {height: auto !important;}";
			}
          } catch (err) {
            console.log(err);
          }
        }
      }
      let ads = 'div.sc-1u9r8h-0';
      hideDOMStyle(ads);
    }, 500);
  }
}

else if (matchDomain('lesinrocks.com')) {
  if (window.location.search.match(/(\?|&)amp/)) {
    let size_defined = document.querySelector('amp-script.i-amphtml-layout-size-defined');
    if (size_defined)
      size_defined.style = 'overflow:visible !important;';
    let overlays = document.querySelectorAll('section.learn_more, div.sidebar, div.menu-footer, div.tooltip_bib, footer.content-info');
    removeDOMElement(...overlays);
  }
}

else if (matchDomain('letelegramme.fr')) {
  let paywall = document.querySelectorAll('div.tlg-paywalled');
  for (let elem of paywall)
    elem.classList.remove('tlg-paywalled');
  let ads = 'div[id^="pub_"]';
  hideDOMStyle(ads);
}

else if (matchDomain('letemps.ch')) {
  let url = window.location.href;
  getArchive(url, 'div.post-subscribe', '', 'div#article-body-wrapper');
  let fade = document.querySelector('div.post__content--faded');
  if (fade)
    fade.classList.remove('post__content--faded');
  let top_ad = document.querySelector('div.topad');
  removeDOMElement(top_ad);
}

else if (matchDomain('lexpress.fr')) {
  // plus code in contentScript_once_var.js (timing)
  let audio_tts = document.querySelector('div.etx_wrapper > div.etx_embed_player--disabled');
  if (audio_tts) {
    let audio_script = audio_tts.querySelector('script[type="module"]');
    if (audio_script && audio_script.innerHTML.includes('audioUrl: "')) {
      let audio_new = document.createElement('audio');
      audio_new.src = audio_script.innerHTML.split('audioUrl: "')[1].split('"')[0];
      audio_new.setAttribute('controls', '');
      audio_tts.parentNode.replaceChild(audio_new, audio_tts);
    }
  }
  let ads = 'div[class^="block_pub"], div[class^="bottom-bar"], div.teads__block, div.ban-bottom, div[class^="placeholder--ban-atf"]';
  hideDOMStyle(ads);
}

else if (matchDomain('liberation.fr')) {
  window.setTimeout(function () {
  let paywall = document.querySelector(cs_param.paywall_sel || 'div#article-body-paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector(cs_param.article_sel || 'article[data-datawall-status]') || document.querySelector('div[class^="default__Main-sc-"] div[class^="default__OutbrainWrapper-"]');
    if (article) {
      if (article.tagName !== 'article')
        article.removeAttribute('class');
      let url_src = 'https://arc.api.liberation.fr/content/v4/?website=liberation&website_url=' + encodeURIComponent(window.location.pathname);
      let x_api_key = cs_param['x-api-key'] || 'a7X29mBvQeP1Ld98CgF2rK5uTzWY4h';
      fetch(url_src, {headers: {"x-api-key": x_api_key}})
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            if (json && json.content_elements) {
              let pars = json.content_elements;
              if (pars.length)
                article.innerHTML = '';
              let parser = new DOMParser();
              for (let par of pars) {
                let elem = document.createElement('p');
                let sub_elem;
                if (['header', 'raw_html', 'text'].includes(par.type)) {
                  if (par.content) {
                    let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.content, dompurify_options) + '</div>', 'text/html');
                    sub_elem = doc.querySelector('div');
                    if (par.type === 'header')
                      sub_elem.style = 'font-weight: bold; font-size: 1.85rem;';
                  }
                } else if (par.type === 'correction') {
                  if (par.text) {
                    sub_elem = document.createElement('span');
                    elem.innerText = par.text;
                  }
                } else if (par.type === 'image') {
                  if (par.url) {
                    let caption;
                    if (par.caption) {
                      caption = par.caption;
                      if (par.credits) {
                        if (par.credits.by && par.credits.by[0] && par.credits.by[0].name)
                          caption += ' ' + par.credits.by[0].name;
                        if (par.credits.affiliation && par.credits.affiliation[0] && par.credits.affiliation[0].name)
                          caption += '/' + par.credits.affiliation[0].name;
                      }
                    }
                    sub_elem = makeFigure(par.url, caption);
                  }
                } else if (par.type === 'custom_embed') {
                  if (par.embed && par.embed.config) {
                    let config = par.embed.config;
                    sub_elem = document.createElement('div');
                    sub_elem.style = 'border: 1px solid black;';
                    if (config.title) {
                      let sub_item = document.createElement('p');
                      sub_item.innerText = config.title;
                      sub_item.style = 'font-weight: bold; margin: 20px;';
                      sub_elem.appendChild(sub_item);
                    }
                    if (config.content) {
                      let sub_item = document.createElement('p');
                      sub_item.innerText = config.content;
                      sub_item.style = 'margin: 20px;';
                      sub_elem.appendChild(sub_item);
                    }
                  } else
                    console.log(par);
                } else if (par.type === 'oembed_response') {
                  if (par.raw_oembed && par.raw_oembed.html) {
                    if (par.subtype !== 'twitter') {
                      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.raw_oembed.html, dompurify_options) + '</div>', 'text/html');
                      sub_elem = doc.querySelector('div');
                    } else if (par.raw_oembed.url) {
                      sub_elem = document.createElement('a');
                      sub_elem.href = sub_elem.innerText = par.raw_oembed.url;
                      sub_elem.target = '_blank';
                    }
                  }
                } else if (par.type === 'link_list') {
                  if (par.items) {
                    sub_elem = document.createElement('p');
                    sub_elem.appendChild(document.createElement('hr'));
                    sub_elem.appendChild(document.createTextNode('Lire aussi'));
                    sub_elem.appendChild(document.createElement('br'));
                    for (let item of par.items) {
                      if (item.content && item.url) {
                        let item_link = document.createElement('a');
                        item_link.href = item.url;
                        item_link.innerText = item.content;
                        sub_elem.appendChild(item_link);
                        sub_elem.appendChild(document.createElement('br'));
                      }
                    }
                    sub_elem.appendChild(document.createElement('hr'));
                  }
                } else if (!['quote'].includes(par.type)) {
                  console.log(par);
                }
                if (sub_elem) {
                  elem.appendChild(sub_elem);
                  article.appendChild(elem);
                }
              }
            }
          })
        }
      }).catch(x => header_nofix(article, '', 'BPC > no fix (source file)'))
    }
  }
  }, 2000);
  let ads = 'div[class^="StickyAd"], div[class^="default__OutbrainWrapper"], article ~ div[class]:empty';
  hideDOMStyle(ads);
}

else if (matchDomain('linforme.com')) {
  header_nofix('div.article--content', 'div.paywall-pro');
}

else if (matchDomain('loeildelaphotographie.com')) {
  let paywall = document.querySelector('.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
  }
  let premium_pic_boxes = document.querySelectorAll('.premium-pic-box');
  let banners = document.querySelectorAll('.membership-promo-container, .login_form_litle');
  removeDOMElement(...premium_pic_boxes, ...banners);
  let blurred_images = document.querySelectorAll('img[style*="blur"]');
  for (let blurred_image of blurred_images)
    blurred_image.removeAttribute('style');
}

else if (matchDomain('lopinion.fr')) {
  let url = window.location.href;
  getArchive(url, 'div.paywall-premium:empty', '', 'div.mainBody', '', cs_param['article_src_sel'] || 'div[style*=";line-height:1.8;"] div[style*=";line-height:1.8;"]');
  document.querySelectorAll('img.Image:not([data-lazy-false], [style*="opacity:"])').forEach(e => e.style.opacity = 1);
  let ads = 'div.ResponsiveAd, div[id^="div-gpt-ad-"], div.Article-abonne';
  hideDOMStyle(ads);
}

else if (matchDomain('ouest-france.fr')) {
  if (matchDomain('www.ouest-france.fr')) {
    function ouest_france_main() {
      window.cmsfetch.push({
        url: window.cms_bypass_rpc_url,
        params: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: 'platform/bypass-payant/get',
            jsonrpc: '2.0',
            method: 'getToken',
            params: {
              publicitaire: !0,
              id_contenu: window.dataLayer[0].mdId
            }
          })
        },
        fn: function (e) {
          let data = JSON.parse(e);
          let newURL = new URL(window.location.href);
          newURL.searchParams.append('token', data.result.token);
          window.location.href = newURL.toString();
        }
      });
    }
    if (!window.location.search.includes('token=')) {
      let paywall = document.querySelector('div.mur');
      if (paywall) {
        removeDOMElement(paywall);
        insert_script(ouest_france_main);
      }
    } else {
      document.querySelectorAll('iframe:not([src])[data-embed-src]').forEach(e => e.src = e.getAttribute('data-embed-src'));
    }
  } else {
    function ouest_france_sub() {
      if (window.location.pathname.includes('/video-')) {
        let video = document.querySelector('article figure');
        if (video) {
          let og_video_dom = document.querySelector('head > meta[property="og:video"][content]');
          if (og_video_dom) {
            let video_new = document.createElement('video');
            video_new.src = og_video_dom.content;
            video_new.style = 'width: 100%;';
            video_new.setAttribute('controls', '');
            video.parentNode.replaceChild(video_new, video);
          }
        }
      } else
        header_nofix('article');
    }
    let paywall = document.querySelector('div.mur');
    if (paywall) {
      removeDOMElement(paywall);
      insert_script(ouest_france_sub);
    }
  }
  let ads = 'div.pub, div.feed-taboola, div[id^="pub_pave_article"]';
  hideDOMStyle(ads);
  let banner = document.querySelector('div#pub_megabanner');
  removeDOMElement(banner);
}

else if (matchDomain('philomag.com')) {
  if (!window.location.search.startsWith('?amp')) {
    amp_redirect('div.paywall-content');
  } else {
    let amp_script = document.querySelector('amp-script');
    if (amp_script) {
      amp_script.removeAttribute('class');
      amp_script.removeAttribute('layout');
      let empty_sizer = amp_script.querySelector('i-amphtml-sizer:empty');
      removeDOMElement(empty_sizer);
      let overlay = amp_script.querySelector('div.i-amphtml-fill-content');
      if (overlay)
        overlay.removeAttribute('class');
      amp_script.style.opacity = 1;
    }
  }
}

else if (matchDomain('philonomist.com')) {
  let paywall = document.querySelector('div.content-bandeau');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = parseHtmlEntities(findKeyJson(json, ['articleBody'])).replace(/\s{2,}/g, '\r\n\r\n');
        let article = document.querySelector('div.main-body');
        if (json_text && article) {
          let par_last = article.querySelector('div > p:last-child');
          if (par_last) {
            let par_last_str = par_last.innerText.substring(0, 50);
            if (json_text.replace(/<[^<]*>/g, '').includes(par_last_str)) {
              par_last.innerText = json_text.substring(json_text.indexOf(par_last_str));
            } else {
              article.innerHTML = ' ';
              let article_new = document.createElement('p');
              article_new.innerText = json_text;
              article.appendChild(article_new);
            }
          }
        }
      }
    }
  }
}

else if (matchDomain('pourleco.com')) {
  let paywall = document.querySelector('div[data-pleco-poool^="paywall"]');
  if (paywall) {
    let intro = document.querySelector('div[data-pleco-transition="fade"]');
    removeDOMElement(paywall, intro);
    let article = document.querySelector('div[class*="article-"][style]');
    if (article)
      article.removeAttribute('style');
  }
}

else if (matchDomain('reforme.net')) {
  let article_sel = 'div.elementor-widget-theme-post-content';
  getJsonUrl(article_sel + ' section', '', article_sel);
  let banner = 'div.free-access-banner';
  hideDOMStyle(banner);
}

else if (matchDomain('science-et-vie.com')) {
  if (window.location.hostname.startsWith('amp.')) {
    let pars = document.querySelectorAll('.qiota_reserve > p, .qiota_reserve > h2');
    let pars_text = [];
    for (let par of pars) {
      if (pars_text.includes(par.innerText))
        removeDOMElement(par);
      else
        pars_text.push(par.innerText);
    }
    let sizer = document.querySelector('div.article-content > amp-script > i-amphtml-sizer');
    removeDOMElement(sizer);
    let replaced_content = document.querySelector('div.i-amphtml-replaced-content');
    if (replaced_content)
      replaced_content.removeAttribute('class');
  }
  document.querySelectorAll('div[data-hbdbrk-parent], div[data-hbdbrk]').forEach(e => e.removeAttribute('style'));
  removeDOMElement(...document.querySelectorAll('div.ads, div[data-actirise-template]'));
}

else if (matchDomain('sciencesetavenir.fr')) {
  if (window.location.pathname.endsWith('.amp')) {
    amp_unhide_access_hide('="paywall.access OR cha.access"', '="NOT (paywall.access OR cha.access)"');
  } else {
    let content = document.querySelectorAll('.user-paying-content');
    for (let elem of content) {
      elem.classList.remove('user-paying-content');
      elem.removeAttribute('hidden');
    }
    let paywall = document.querySelector('.temp-paywall');
    removeDOMElement(paywall);
    let amorce = 'div.amorce.manual';
    let ads = 'div[class*="pub-container"], div.banner';
    hideDOMStyle(amorce + ', ' + ads);
  }
}

else if (matchDomain(['sudouest.fr', 'charentelibre.fr', 'larepubliquedespyrenees.fr'])) {
  let paywall = document.querySelectorAll('.visible-not-premium');
  if (paywall.length) {
    removeDOMElement(...paywall);
    let visible_premium = document.querySelectorAll('div.visible-premium');
    for (let elem of visible_premium)
      elem.classList.remove('visible-premium');
  }
  let footer_premium = '.footer-premium';
  let ads = 'div.pub, div.ph-easy-subscription';
  hideDOMStyle(footer_premium + ', ' + ads);
}

else if (matchDomain('telerama.fr')) {
  let paywall = document.querySelector('section.paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article_sel = 'article.article__page-content';
    let article = document.querySelector(article_sel);
    if (article) {
      let url_src = 'https://apps.telerama.fr/tlr/v1/premium-android-tablet/element?id=' + encodeURIComponent(window.location.pathname);
      let json_key = 'templates.raw_content.content';
      getExtFetch(url_src, json_key, {}, main_telerama);
      function main_telerama(url, data) {
        try {
          if (data) {
            let parser = new DOMParser();
            let doc = parser.parseFromString(DOMPurify.sanitize(data, dompurify_options), 'text/html');
            let article_new = doc.querySelector(article_sel);
            if (article_new && article.parentNode) {
              article_new.querySelectorAll('a[href^="tlrm://element?id="]').forEach(e => e.href = decodeURIComponent(e.href.split('tlrm://element?id=')[1]));
              article_new.querySelectorAll('figure > img[data-src]:not([src])').forEach(e => e.src = e.getAttribute('data-src'));
              article_new.querySelectorAll('section.video > iframe[data-src]:not([src])').forEach(e => e.src = e.getAttribute('data-src'));
              article.parentNode.replaceChild(article_new, article);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
  let ads = 'div.dfp-slot';
  hideDOMStyle(ads);
}

else if (matchDomain('valeursactuelles.com')) {
  let paywall = document.querySelector('div.va-paywall');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      try {
        let json = JSON.parse(json_script.text);
        if (json && json['@graph'] && json['@graph'][0] && json['@graph'][0].articleBody) {
          let article = document.querySelector('div.post__content');
          if (article) {
            let json_text = json['@graph'][0].articleBody;
            article.innerText = json_text
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  let banners = 'div.subscription-banner, div.stick-sidebar, div[data-od-slot-key]';
  hideDOMStyle(banners);
}

else if (matchDomain('lamontagne.fr') || matchDomain(fr_gcf_custom_domains)) { // Groupe Centre France
  let paywall = document.querySelector('meta[name="premium"][content="true"]');
  if (paywall) {
    removeDOMElement(paywall);
    let article = document.querySelector('div#content section > div.flex-col');
    if (article) {
      let div_empty = article.querySelector('div[class^="min-h"]:empty');
      removeDOMElement(div_empty);
      let url = window.location.href;
      fetch(url)
      .then(response => {
        if (response.ok) {
          response.text().then(html => {
            if (html.includes('\\"contentJson\\":')) {
              let html_json = html.split('\\"contentJson\\":')[1].split(']},\\"')[0].replace(/\\"/g, '"').replace(/\\\\"/g, '\\"') + ']}';
              try {
                let json = JSON.parse(html_json);
                if (json && json.content) {
                  let cf_paywall = json.content.find(x => x.type === 'cf-paywall');
                  if (cf_paywall) {
                    let pars = cf_paywall.content;
                    for (let par of pars) {
                      function handle_par(par) {
                        let elem = document.createElement('div');
                        if (['paragraph', 'heading', 'cf-line-heading', 'cf-quote'].includes(par.type)) {
                          if (par.content) {
                            if (par.type === 'heading')
                              elem.style = 'font-weight: bold;';
                            else if (par.type === 'cf-quote')
                              elem.style = 'font-style: italic;';
                            for (let item of par.content) {
                              let sub_elem;
                              if (item.text) {
                                sub_elem = document.createElement('span');
                                let sub_elem_style = '';
                                if (item.marks) {
                                  for (let mark of item.marks) {
                                    if (mark.type === 'link') {
                                      if (mark.attrs && mark.attrs.href) {
                                        sub_elem = document.createElement('a');
                                        sub_elem.href = mark.attrs.href;
                                        sub_elem_style = 'text-decoration:underline;';
                                      }
                                    } else if (mark.type === 'bold')
                                      sub_elem_style += 'font-weight: bold;';
                                    else if (mark.type === 'italic')
                                      sub_elem_style += 'font-style: italic;';
                                    if (sub_elem_style)
                                      sub_elem.style = sub_elem_style;
                                  }
                                }
                                sub_elem.innerText = item.text;
                                if (par.type === 'cf-quote') {
                                  if (par.attrs && par.attrs.author)
                                    sub_elem.innerText += ' - ' + par.attrs.author + (par.attrs.source ? ' ' + par.attrs.source : '');
                                }
                              } else if (item.type === 'hardBreak') {
                                sub_elem = document.createElement('br');
                              } else
                                console.log(item);
                              if (sub_elem)
                                elem.appendChild(sub_elem);
                            }
                          }
                        } else if (par.type === 'cf-image') {
                          if (par.attrs && par.attrs.src) {
                            elem = document.createElement('img');
                            elem.src = par.attrs.src;
                          }
                        } else if (par.type === 'cf-embed') {
                          if (par.attrs && par.attrs.url) {
                            elem = document.createElement('iframe');
                            elem.src = par.attrs.url.replace(/^\/\//, 'https://');
                            if (par.attrs.width)
                              elem.width = par.attrs.width;
                            if (par.attrs.height)
                              elem.height = par.attrs.height;
                          }
                        } else if (par.type === 'cf-read-also') {
                          if (par.attrs && par.attrs.text && par.attrs.url) {
                            elem = document.createElement('a');
                            elem.innerText = 'À lire aussi: ' + par.attrs.text;
                            elem.href = par.attrs.url;
                            elem.style = 'text-decoration:underline;';
                          }
                        } else {
                          console.log(par);
                        }
                        if (elem)
                          article.appendChild(elem);
                      }
                      if (par.type === 'cf-aside' && par.content) {
                        for (let sub_par of par.content)
                          handle_par(sub_par);
                      } else
                        handle_par(par);
                    }
                  }
                }
                if (html.includes(',\\"textToSpeech\\":{')) {
                  let tts_url = html.split(',\\"textToSpeech\\":{')[1].split(',\\"url\\":\\"')[1].split('\\",\\"')[0];
                  if (tts_url) {
                    let audio_div = document.createElement('div');
                    audio_div.innerText = "Écouter l'article";
                    audio_div.style = 'margin-bottom: 20px; font-weight: bold;';
                    let audio = document.createElement('audio');
                    audio.src = tts_url;
                    audio.style = 'width: 100%';
                    audio.setAttribute('controls', '');
                    audio_div.appendChild(audio);
                    article.before(audio_div);
                  }
                }
              } catch (err) {
                console.log(err);
              }
            }
          })
        }
      }).catch(err => console.log(err))
    }
  }
  let ads = 'div.ad-slot, div[class="w-[100vw]"], div.transition-all';
  hideDOMStyle(ads);
}

else
  csDone = true;

} // end csDone(Once)

ads_hide();
leaky_paywall_unhide();

} // end cs_default function
