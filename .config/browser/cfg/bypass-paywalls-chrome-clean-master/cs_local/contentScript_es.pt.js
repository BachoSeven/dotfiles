//"use strict";

var ar_grupo_clarin_domains = ['clarin.com', 'lavoz.com.ar', 'losandes.com.ar', 'ole.com.ar'];
var es_epiberica_domains = ['diariodemallorca.es', 'eldia.es', 'elperiodico.com', 'epe.es', 'farodevigo.es', 'informacion.es', 'laprovincia.es', 'levante-emv.com', 'lne.es', 'mallorcazeitung.es', 'superdeporte.es'];
var es_epiberica_custom_domains = ['diaridegirona.cat', 'diariocordoba.com', 'diariodeibiza.es', 'elcorreogallego.es', 'elcorreoweb.es', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info', 'laopinioncoruna.es', 'laopiniondemalaga.es', 'laopiniondemurcia.es', 'laopiniondezamora.es', 'regio7.cat'];
var es_grupo_vocento_domains = ['abc.es', 'canarias7.es', 'diariosur.es', 'diariovasco.com', 'elcomercio.es', 'elcorreo.com', 'eldiariomontanes.es', 'elnortedecastilla.es', 'hoy.es', 'ideal.es', 'larioja.com', 'lasprovincias.es', 'laverdad.es', 'lavozdigital.es'];
var es_unidad_domains = ['elmundo.es', 'expansion.com', 'marca.com'];
var pe_grupo_elcomercio_domains = ['diariocorreo.pe', 'elcomercio.pe', 'gestion.pe'];

cs_default = function (bg2csData = '') {

if (bg2csData && bg2csData.cs_param)
  cs_param = bg2csData.cs_param;

if (!(csDone || csDoneOnce)) {

if (window.location.hostname.match(/\.(es|pt|cat)$/) || matchDomain(['diariocordoba.com', 'diariovasco.com', 'elconfidencial.com', 'elcorreo.com', 'elespanol.com', 'elpais.com', 'elperiodico.com', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info', 'expansion.com', 'larioja.com', 'lavanguardia.com', 'levante-emv.com', 'marca.com', 'mundodeportivo.com', 'politicaexterior.com'])) {//spain/portugal

if (matchDomain(['ara.cat', 'arabalears.cat'])) {
  if (!window.location.pathname.endsWith('.amp.html')) {
    amp_redirect('div.paywall');
    let ads = 'div.advertising';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('diariodenavarra.es')) {
  let paywall = document.querySelector('div#paywall_message');
  if (paywall) {
    removeDOMElement(paywall);
    let json_script = getArticleJsonScript();
    if (json_script) {
      let json = JSON.parse(json_script.text);
      if (json) {
        let json_text = json.articleBody;
        let article = document.querySelector('div.free-html');
        if (json_text && article)
          article.innerText = parseHtmlEntities(json_text);
      }
    }
  }
}

else if (matchDomain('dn.pt')) {
  let paywall = document.querySelector('div#metered-paywall-banner');
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

else if (matchDomain('elconfidencial.com')) {
  let premium = document.querySelector('div.newsType__content--closed');
  if (premium)
    premium.classList.remove('newsType__content--closed');
  let ads = 'div[id^="mega_"], div[id^="roba_"]';
  hideDOMStyle(ads);
}

else if (matchDomain('eldiario.es')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_access_hide('^="access"', '="NOT access"');
  } else {
    amp_redirect('aside.paywall');
    let ads = 'div.edi-advertising, div.header-ad, aside.news-sponsored-content, div.report__wrapper';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('elespanol.com')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_subscr_section();
  } else {
    let paywall = document.querySelector('div.full-suscriptor-container');
    if (paywall) {
      removeDOMElement(paywall);
      let content_hidden = document.querySelector('div.content-not-granted-paywall');
      if (content_hidden)
        content_hidden.classList.remove('content-not-granted-paywall');
    }
    let ads = '[id*="superior"], [class*="adv"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain(es_unidad_domains)) {
  if (!window.location.hostname.startsWith('amp.')) {
    let url = window.location.href;
    if (!window.location.pathname.startsWith('/mejores-colegios')) {
      amp_redirect('div[class^="ue-c-article__premium"]', '', url.replace('/www.', '/amp.'));
    } else if (matchDomain('elmundo.es')) {
      header_nofix('main p', 'div.ue-c-article__premium');
      header_nofix('table', 'div.ue-c-paywall');
    }
  } else {
    amp_unhide_access_hide('="authorized=true"', '="authorized!=true"');
    amp_unhide_subscr_section('.advertising, .ue-c-ad');
  }
}

else if (matchDomain('elpais.com')) {
  if (window.location.pathname.endsWith('.amp.html') || window.location.search.match(/(\?|&)outputType=amp/)) {
    amp_unhide_access_hide('="vip"], [amp-access="success"', '="NOT vip"], [amp-access="NOT success"', 'div._cf');
  }
  let ads = 'div.ad-giga, aside.outbrain';
  hideDOMStyle(ads);
}

else if (matchDomain(es_grupo_vocento_domains)) {
  let paywall_sel = cs_param.paywall_sel || 'div.voc-paywall, div.container-wall-exclusive__content-login, ev-engagement[group-name^="paywall-"]';
  let paywall = document.querySelectorAll(paywall_sel);
  if (!window.location.pathname.endsWith('_amp.html')) {
    if (paywall.length) {
      let span_break = document.querySelector('span.c-text');
      removeDOMElement(...paywall, span_break);
      let art_hidden = document.querySelectorAll('.paywall, div.wpb_column > span');
      for (let elem of art_hidden) {
        let attributes = [...elem.attributes];
        for (let attrib of attributes)
          elem.removeAttribute(attrib.name);
        if (elem.tagName === 'DIV')
          elem.className = 'paywall';
      }
    }
    hideDOMStyle('figure.paywall2 img', 3);
    let div_hidden = document.querySelectorAll('article div[hidden]');
    for (let elem of div_hidden) {
      elem.removeAttribute('hidden');
      elem.style = 'display: block !important;';
    }
    if (window.location.pathname.match(/[-\/]directo-/) && !document.querySelector('div#firstPost'))
      header_nofix('article h1');
    let ads = '.voc-advertising, div.voc-ob-wrapper, div.voc-discounts, div.ev-em-modal, span.mega-superior, div.v-adv';
    hideDOMStyle(ads, 2);
  } else {
    amp_unhide_access_hide('="result=\'ALLOW_ACCESS\'"', '="result!=\'ALLOW_ACCESS\'"', 'div.v-adv');
    let body_top = document.querySelector('body#top');
    if (body_top)
      body_top.removeAttribute('id');
  }
  let banner = 'div.container-wall-exclusive';
  hideDOMStyle(banner);
}

else if (matchDomain(es_epiberica_domains) || matchDomain(es_epiberica_custom_domains)) {
  let paywall = document.querySelector('p.ft-helper-closenews');
  if (paywall) {
    paywall.classList.remove('ft-helper-closenews');
  }
  if (window.location.pathname.endsWith('.amp.html') || ['amp.elperiodico.com', 'amp.epe.es'].includes(window.location.hostname)) {
    let amp_images = document.querySelectorAll('figure > amp-img[src]');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      elem.src = amp_image.getAttribute('src');
      elem.style = 'width: 75%; margin: 0px 50px;';
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
    document.querySelectorAll('div#the-most').forEach(e => e.removeAttribute('style'));
    let ads = 'amp-next-page, span.ad-signature, div.wrap, .ft-ad';
    hideDOMStyle(ads);
  } else {
    let ads = 'div.commercial-up-full__wrapper, .ft-ad, div[class^="_mo_recs"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('expresso.pt')) {
  if (!window.location.hostname.startsWith('amp.')) {
    let article_sel = 'div.article-content';
    let paywall = document.querySelector(article_sel + ' > div.g-premium-blocker');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let article = document.querySelector(article_sel);
      if (article) {
        let url = window.location.href.split(/[#\?]/)[0];
        fetch(url)
        .then(response => {
          if (response.ok) {
            response.text().then(html => {
              if (html.match(/window\.__INITIAL_DATA__\s?=\s?/)) {
                try {
                  article.innerHTML = '';
                  let json = JSON.parse(html.split(/window\.__INITIAL_DATA__\s?=\s?/)[1].split(';window.')[0].replace(/":undefined([,}])/g, "\":\"undefined\"$1")).nodes;
                  let pars = [];
                  for (let elem in json) {
                    let item = json[elem];
                    if (item.type === 'Layout') {
                      for (let elem of item.nodes) {
                        if (elem.type === 'MainBody')
                          pars = elem.nodes[0].data.content.contents;
                      }
                      break;
                    }
                  }
                  let parser = new DOMParser();
                  for (let par of pars) {
                    let par_new;
                    if (par.html) {
                      let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.html, dompurify_options) + '</div>', 'text/html');
                      par_new = doc.querySelector('div');
                    } else if (par.type === 'PICTURE') {
                      if (par.urlOriginal) {
                        par_new = makeFigure(par.urlOriginal, par.caption, {style: 'width:100%'});
                      }
                    } else if (par.link && par.title) {
                      if (par.contents) {
                        par_new = document.createElement('div');
                        for (let elem of par.contents) {
                          let elem_new;
                          if (elem.html) {
                            let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(elem.html, dompurify_options) + '</div>', 'text/html');
                            elem_new = doc.querySelector('div');
                          } else if (elem.urlOriginal) {
                            elem_new = makeFigure(elem.urlOriginal, elem.caption, {style: 'width:100%'});
                          }
                          if (elem_new)
                            par_new.appendChild(elem_new);
                        }
                      } else {
                        par_new = document.createElement('p');
                        let art_link = document.createElement('a');
                        art_link.innerText = par.title;
                        art_link.href = par.link;
                        par_new.appendChild(art_link);
                      }
                    }
                    if (par_new)
                      article.appendChild(par_new);
                    else
                      console.log(par);
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
    }
  } else
    ampToHtml();
}

else if (matchDomain('infolibre.es')) {
  if (window.location.pathname.endsWith('.amp.html')) {
    amp_unhide_access_hide('^="access"', '="NOT access"');
  } else {
    amp_redirect('div.paywall__wrapper');
    let ads = 'div.edi-advertising, div.header-ad';
    hideDOMStyle(ads);
  }
}

else if (matchDomain(['lavanguardia.com', 'mundodeportivo.com'])) {
  let ads = 'span.content-ad, span.hidden-ad, span.ad-unit, div.ad-div';
  hideDOMStyle(ads);
}

else if (matchDomain('observador.pt')) {
  let ads = 'div.obs-ad-placeholder, obs-toaster, obs-moa-btn-seats, obs-moa-new';
  hideDOMStyle(ads);
}

else if (matchDomain('politicaexterior.com')) {
  let paywall = document.querySelector('div[class^="paywall-"]');
  if (paywall) {
    let article = document.querySelector('div.entry-content-text');
    let json = document.querySelector('script[type="application/ld+json"]:not([class])');
    if (json) {
      let json_text = JSON.parse(json.text).description.replace(/&amp;nbsp;/g, '');
      let article_new = document.createElement('div');
      article_new.setAttribute('class', 'entry-content-text');
      article_new.innerText = '\r\n' + json_text;
      article.parentNode.replaceChild(article_new, article);
    }
    removeDOMElement(paywall);
  }
}

else if (matchDomain('publico.es')) {
  let ads = 'div.pb-ads';
  hideDOMStyle(ads);
}

else if (matchDomain('sabado.pt')) {
  if (!window.location.pathname.includes('/amp/'))
    amp_redirect('.bloqueio_exclusivos, .container_assinatura, .bloco_bloqueio', '', window.location.href.replace('/detalhe/', '/amp/'));
  else
    amp_unhide_access_hide('="subscriber"', '="NOT subscriber"', 'div.adbox, amp-consent, .detalheAds, .exclusivos_bar');
}

else
  csDone = true;

} else if (window.location.hostname.match(/\.(ar|br|cl|mx|pe|uy)$/) || matchDomain(['abcmais.com', 'clarin.com', 'cronista.com', 'elespectador.com', 'elmercurio.com', 'eltiempo.com', 'eltribuno.com', 'eluniverso.com', 'exame.com', 'globo.com', 'lasegunda.com', 'latercera.com', 'milenio.com', 'nacion.com', 'revistaoeste.com', 'semana.com'])) {//south america

if (matchDomain('abcmais.com')) {
  if (!window.location.pathname.endsWith('/amp/')) {
    getJsonUrl('section#section-iframe-assinante', '', 'div.degressing-opacity');
  } else {
    let paywall = document.querySelector('div.b-vindo');
    if (paywall && dompurify_loaded) {
      removeDOMElement(paywall);
      let template = document.querySelector('template');
      if (template) {
        let article = document.querySelector('section > div.resumo');
        if (article) {
          let parser = new DOMParser();
          let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(template.innerHTML, dompurify_options) + '</div>', 'text/html');
          let article_new = doc.querySelector('div');
          article.parentNode.replaceChild(article_new, article);
        }
      }
    }
  }
}

else if (matchDomain('abril.com.br')) {
  if (window.location.pathname.endsWith('/amp/')) {
    let paywall = document.querySelector('.piano-modal');
    removeDOMElement(paywall);
  } else {
    let ads = 'div.ads, div.ads-bilboards, div.MGID';
    hideDOMStyle(ads);
  }
}

else if (matchDomain(ar_grupo_clarin_domains)) {
  let ads = 'div.ad-slot, div.box-adv, div.wrapperblock, div.banner, div[id^="div-gpt-ad-"], div.bannerTopHeader, div.sticky, div.SRA';
  hideDOMStyle(ads);
}

else if (matchDomain('cartacapital.com.br')) {
  if (!window.location.pathname.endsWith('/amp/')) {
    let paywall = document.querySelector('aside.paywall');
    if (paywall) {
      removeDOMElement(paywall);
      let json_script = getArticleJsonScript();
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text);
          if (json) {
            let json_text = json[1].articleBody.replace(/\s{2,}/g, '\r\n\r\n');
            let content = document.querySelector('section.s-content__text');
            if (json_text && content) {
              content.innerHTML = '';
              let article_new = document.createElement('p');
              article_new.innerText = json_text;
              content.appendChild(article_new);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      let content_soft = document.querySelector('div.contentSoft');
      if (content_soft) {
        content_soft.removeAttribute('class');
        let freemium = document.querySelectorAll('div[class^="s-freemium"], div.maggazine-add');
        removeDOMElement(...freemium);
      }
    }
    let ads = 'div.div_ros_topo';
    hideDOMStyle(ads);
  } else
    ampToHtml();
}

else if (matchDomain('cronista.com')) {
  let paywall = document.querySelector('div.article-body--blurred');
  if (paywall)
    paywall.classList.remove('article-body--blurred');
  let ads = 'div#ad-slot-header, div.ad-slot-intext, div#selectMediaNota, div.b-suscription-container, div.paywall-chain--show';
  hideDOMStyle(ads);
}

else if (matchDomain('crusoe.com.br')) {
  getJsonUrl('section.paywall', '', 'div#content_post', {art_append: 1});
  let ads = 'div#gpt-leaderboard, div.ads_desktop, div[class^="container-banner-"], div.catchment-box';
  hideDOMStyle(ads);
}

else if (matchDomain('diplomatique.org.br')) {
  getJsonUrl('div.entry-content div.module_row', '', 'div.entry-content');
}

else if (matchDomain(pe_grupo_elcomercio_domains)) {
  let paywall = document.querySelector('.paywall');
  if (paywall) {
    paywall.removeAttribute('class');
    paywall.removeAttribute('style');
    let fade = document.querySelector('p.story-contents--fade');
    if (fade)
      fade.classList.remove('story-contents--fade');
  }
  let ads = 'div[class^="content_gpt"]';
  hideDOMStyle(ads);
}

else if (matchDomain('elespectador.com')) {
  if (window.location.search.includes('outputType=amp')) {
    amp_unhide_access_hide('="granted"', '="NOT granted"', '[class^="Widget"], amp-fx-flying-carpet, div[style*=";background:"]:has(amp-ad)', false);
    let googledoc_iframes = document.querySelectorAll('div > amp-iframe[src^="https://docs.google.com/viewer"][class]');
    for (let elem of googledoc_iframes) {
      let a_link = document.createElement('a');
      a_link.href = elem.getAttribute('src');
      a_link.innerText = 'pdf-link';
      a_link.target = '_blank';
      elem.removeAttribute('class');
      elem.parentNode.before(a_link);
    }
  } else {
    amp_redirect('div.exclusive_validation');
    let ads = 'div.Ads, div[class^="Ads_"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('elmercurio.com')) {
  if (window.location.hostname.startsWith('digital.')) {
    window.setTimeout(function () {
      let elem_hidden = document.querySelectorAll('[style="visibility:hidden"]');
      for (let elem of elem_hidden)
        elem.removeAttribute('style');
      let page_pdf_content = document.querySelector('div.page_pdf_content');
      let close_html = document.querySelector('div.close_html');
      let cont_page_full = document.querySelector('div.cont_page_full');
      removeDOMElement(page_pdf_content, close_html, cont_page_full);
    }, 1000);
    window.setTimeout(function () {
      let cont_articlelight = document.querySelector('div.cont_articlelight');
      if (cont_articlelight)
        cont_articlelight.setAttribute('style', 'height: 100% !important; width: 90% !important');
    }, 3000);
    if (window.location.pathname.startsWith('/mobile')) {
      let lessreadmore = document.querySelectorAll('article.lessreadmore');
      for (let article of lessreadmore)
        article.classList.remove('lessreadmore');
      let bt_readmore = document.querySelectorAll('div[id*="bt_readmore_"]');
      removeDOMElement(...bt_readmore);
    }
  } else if (window.location.pathname.endsWith('/Registro/Login.aspx')) {
    header_nofix('body');
  }
}

else if (matchDomain('elobservador.com.uy')) {
  if (window.location.pathname.endsWith('/amp')) {
    amp_unhide_access_hide('="observador.mostrarNota"');
    let amp_images = document.querySelectorAll('div.fixed-container > amp-img.null');
    for (let amp_image of amp_images) {
      let elem = document.createElement('img');
      Object.assign(elem, {
        src: amp_image.getAttribute('src'),
        alt: amp_image.getAttribute('alt'),
        title: amp_image.getAttribute('title')
      });
      amp_image.parentNode.replaceChild(elem, amp_image);
    }
  } else {
    amp_redirect('div.mensaje_member', '', window.location.pathname + '/amp');
  }
}

else if (matchDomain('eltiempo.com')) {
  let exclusivo = document.querySelector('div.c-articulo-exclusivo');
  if (exclusivo)
    exclusivo.classList.remove('c-articulo-exclusivo');
  let modulos = document.querySelector('div.modulos');
  if (modulos)
    modulos.classList.remove('modulos');
  let ads = '[class^="c-add"]';
  hideDOMStyle(ads);
}

else if (matchDomain('eltribuno.com')) {
  let ads = 'div.container-spot, div.anticipo-cont';
  hideDOMStyle(ads);
}

else if (matchDomain('eluniversal.com.mx')) {
  let ads = 'div.dfp-tag-wrapper-container';
  hideDOMStyle(ads);
}

else if (matchDomain('eluniverso.com')) {
  let paywall = document.querySelectorAll('head > meta[name][content="premium"]');
  let article = document.querySelector('section.article-body');
  if (paywall.length && article && dompurify_loaded) {
    removeDOMElement(...paywall);
    let fusion_script = document.querySelector('script#fusion-metadata');
    if (fusion_script && fusion_script.text.includes('Fusion.globalContent=')) {
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
                let doc = parser.parseFromString('<p class="prose-text">' + DOMPurify.sanitize(par.content) + '</p>', 'text/html');
                par_new = doc.querySelector('p');
              }
            } else if (par.type === 'interstitial_link') {
              if (par.url && par.content) {
                par_new = document.createElement('p');
                int_link = document.createElement('a');
                int_link.href = par.url;
                int_link.innerText = par.content;
                par_new.appendChild(int_link);
              }
            } else if (par.type === 'image') {
              if (par.url) {
                let caption_text = par.caption;
                if (par.credits && par.credits.by && par.credits.by[0] && par.credits.by[0].name)
                  caption_text += ' - ' + par.credits.by[0].name;
                par_new = makeFigure(par.url, caption_text);
              }
            } else if (par.type === 'raw_html') {
              let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.content, dompurify_options) + '</div>', 'text/html');
              par_new = doc.querySelector('div');
            } else if (par.raw_oembed) {
              if (par.raw_oembed.html) {
                let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.raw_oembed.html, dompurify_options) + '</div>', 'text/html');
                par_new = doc.querySelector('div');
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
            } else if (par.type === 'table') {
              if (par.header && par.rows) {
                par_new = document.createElement('table');
                let h_row = document.createElement('tr');
                for (let item of par.header) {
                  let th = document.createElement('th');
                  let doc = parser.parseFromString('<span>' + DOMPurify.sanitize(item.content) + '</span>', 'text/html');
                  let span = doc.querySelector('span');
                  th.appendChild(span);
                  h_row.appendChild(th);
                }
                par_new.appendChild(h_row);
                for (let row of par.rows) {
                  let tr = document.createElement('tr');
                  for (let item of row) {
                    let td = document.createElement('td');
                    let doc = parser.parseFromString('<span>' + DOMPurify.sanitize(item.content) + '</span>', 'text/html');
                    let span = doc.querySelector('span');
                    td.appendChild(span);
                    tr.appendChild(td);
                  }
                  par_new.appendChild(tr);
                }
              }
            } else if (!['quote'].includes(par.type)) {
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
    let banner = pageContains('div > span', /Contenido exclusivo para suscriptores/);
    if (banner.length)
      removeDOMElement(banner[0].parentNode);
  }
  let ads = 'div[id^="ad-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('em.com.br')) {
  if (!window.location.pathname.endsWith('/amp.html')) {
    amp_redirect('.news-blocked-content');
    let ads = 'div.ads, div.containerads, div.edm-banner, div.publicidade-interna-container';
    hideDOMStyle(ads);
  } else {
    amp_unhide_subscr_section('amp-fx-flying-carpet');
    let compress_text = document.querySelector('div.compress-text');
    if (compress_text)
      compress_text.classList.remove('compress-text');
  }
}

else if (matchDomain('estadao.com.br')) {
  if (window.location.pathname.match(/(\.amp$|^\/amp\/)/) || window.location.search.startsWith('?amp')) {
    amp_unhide_access_hide('="outputValue=\'hide_paywall\'"', '="outputValue=\'show_paywall\'"', 'amp-fx-flying-carpet, div[class^="pAd"], div.ads-container');
  } else {
    let paywall = document.getElementById('paywall-wrapper-iframe-estadao');
    removeDOMElement(paywall);
    let ads = 'div[class^="styles__Container-sc-"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('exame.com')) {
  let hidden_images = document.querySelectorAll('img[src^="data:image/"');
  for (let elem of hidden_images) {
    let noscript = elem.parentNode.querySelector('noscript');
    if (noscript && noscript.innerText.includes('src="'))
      elem.src = noscript.innerText.split('src="')[1].split('"')[0];
  }
  let ads = 'div[class*="ad-pos-"]';
  hideDOMStyle(ads);
}

else if (matchDomain('uol.com.br')) {
 if (matchDomain('piaui.uol.com.br')) {
    let audio_cont = document.querySelector('div.audio-player-container:has(audio[src])');
    if (audio_cont) {
      let audio = audio_cont.querySelector('audio[src]');
      if (audio) {
        let audio_new = document.createElement('audio');
        audio_new.src = audio.src;
        audio_new.setAttribute('controls', '');
        audio_cont.parentNode.replaceChild(audio_new, audio_cont);
      }
    }
    let ads = 'div[class^="piaui-interna-"], div.main__advert';
    hideDOMStyle(ads, 2);
  } else if (matchDomain('folha.uol.com.br')) {
    if (window.location.pathname.startsWith('/amp/')) {
      amp_unhide_subscr_section('amp-sticky-ad');
    } else {
      let signup = document.querySelector('.c-top-signup');
      removeDOMElement(signup);
    }
  } else if (matchDomain('blogfolha.uol.com.br')) {
    let hidden_images = document.querySelectorAll('div[id^="attachment_"] > a > img[src^="http:"][srcset]');
    for (let hidden_image of hidden_images) {
      hidden_image.src = hidden_image.src.replace('http:', 'https:');
      hidden_image.srcset = '';
    }
  }
  let ads = 'div[class*="advertising"], div.jupiter-ads, div.up-floating, div[data-cp-id$="asfads"], div.ms-hapb, div.ms-apb, div.cardAd';
  hideDOMStyle(ads);
}

else if (matchDomain('gauchazh.clicrbs.com.br')) {
  let div_hidden = document.querySelector('div.m-paid-content > div.hidden');
  if (div_hidden)
    div_hidden.removeAttribute('class');
  let ads = 'div.ad-banner, div.animate-pulse, div.overflow-hidden:has(div.bg-ad-placeholder), section.ads-section-area';
  hideDOMStyle(ads);
  let ads_rem = document.querySelectorAll('div[class^="superbaner"]');
  removeDOMElement(...ads_rem);
}

else if (matchDomain('gazetadopovo.com.br')) {
  if (window.location.pathname.endsWith('/amp/')) {
    amp_unhide_subscr_section('div.ads-amp, div.tpl-wrapper', false);
  } else {
    let ads = 'div[class*="c-ads"]';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('globo.com')) {
  if (matchDomain('valor.globo.com')) {
    if (!window.location.pathname.startsWith('/google/amp/')) {
      amp_redirect('div.paywall');
    } else {
      amp_unhide_subscr_section();
      amp_images_replace();
    }
  } else if (window.location.pathname.includes('/amp/'))
    ampToHtml();
  if (!window.location.pathname.includes('/amp/')) {
    let ads = 'div[id^="ad-container"], div.content-ads, div[class^="block__advertising"], div#pub-in-text-wrapper, div.area_publicidade_container';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('ladiaria.com.uy')) {
  if (window.location.search.startsWith('?display=amp')) {
    csDoneOnce = true;
    ampToHtml();
  } else {
    let banners = document.querySelectorAll('div.softwall, div.subscribe-notice');
    removeDOMElement(...banners);
  }
}

else if (matchDomain('lagaceta.com.ar')) {
  let ads = 'div.add';
  hideDOMStyle(ads);
}

else if (matchDomain('lanacion.com.ar')) {
  if (matchDomain('suscripciones.lanacion.com.ar')) {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('callback')) {
      func_post = function () {
        let title = document.querySelector('h1');
        if (title)
          document.title = title.innerText + ' - LA NACION';
        let banners = 'header.ds-header, button#btnAudioSignature, div#v-share';
        hideDOMStyle(banners, 2);
      }
      let url = atob(searchParams.get('callback')).split('?')[0];
      getArchive(url, 'main > section > div', '', 'main', '', 'div#fusion-app');
    }
  }
  let ads = 'div.ln-banner-container';
  hideDOMStyle(ads);
  removeDOMElement(...document.querySelectorAll('div.ds-banner'));
}

else if (matchDomain('lance.com.br')) {
  let paywall = document.querySelector('div.paywall-content[class*="h-\["]');
  if (paywall)
    removeClassesByPrefix(paywall, 'h-\[');
  let banners = 'div[class*="backdrop-blur-"], div.shadow-sticky, div[style*="repeating-linear-gradient"], span.mx-2, span.h-px';
  hideDOMStyle(banners);
}

else if (matchDomain('lasegunda.com')) {
  if (window.location.pathname.endsWith('/Registro/Login.aspx') && window.location.search.startsWith('?urlBack=')) {
    let intro = document.querySelector('body > div > article');
    if (intro) {
      intro.parentNode.removeAttribute('style');
      intro.parentNode.parentNode.style = 'margin: 20px;';
      let mh_new = document.createElement('div');
      mh_new.style = 'font-size: 20px; font-weight: bold; text-align: center; margin: 20px;';
      let main = document.createElement('a');
      main.href = 'https://www.lasegunda.com';
      main.innerText = 'la Segunda';
      mh_new.appendChild(main);
      intro.before(mh_new);
      let page = document.querySelector('div#page');
      if (page) {
        let article_id_match = window.location.search.split('?urlBack=')[1].match(/\/(\d{6,})\//);
        if (article_id_match && dompurify_loaded) {
          csDoneOnce = true;
          let article_id = article_id_match[1];
          let url_src = 'https://newsapi.ecn.cl/NewsApi/lasegunda/noticia/' + article_id;
          fetch(url_src)
          .then(response => {
            if (response.ok) {
              response.json().then(json => {
                try {
                  if (json._source) {
                    let art_source = json._source;
                    let author = document.createElement('span');
                    author.innerText = art_source.autor + (art_source.fechaPublicacion ? '\r\n' + art_source.fechaPublicacion.replace('T', ' ').replace(/:00$/, '') : '');
                    page.appendChild(author);
                    if (art_source.tablas && art_source.tablas.tablaMedios && art_source.tablas.tablaMedios[0]) {
                      let figure = makeFigure(art_source.tablas.tablaMedios[0].Url);
                      figure.style = 'margin: 15px;';
                      intro.firstChild.before(figure);
                    }
                    function make_fig(p1, p2 = '') {
                      let result = '<figure style="margin: 15px 0px"><img src="' + p1 + '"><figcaption>' + (p2 ? p2.replace(/^;\s?/, '') : '') + '</figcaption></figure>';
                      return result;
                    }
                    function make_imagen(match, p1, offset, string) {
                      return make_fig(p1);
                    }
                    function make_imagen_credito(match, p1, p2, offset, string) {
                      return make_fig(p1, p2);
                    }
                    function make_video(match, p1, offset, string) {
                      return '<video controls src="' + p1 + '" style="width: 100%; margin: 15px 0px;">';
                    }
                    function make_cifra(match, p1, p2, offset, string) {
                      return p1 + p2.replace(/^;\s?/, ' ');
                    }
                    let art_text = art_source.texto.replace(/&nbsp;/g, ' ').replace(/{IMAGEN?\s([^}]+)}/g, make_imagen);
                    art_text = art_text.replace(/{IMAGENCREDITO\s([^;]+)(;\s?[^}]+)}/g, make_imagen_credito);
                    art_text = art_text.replace(/{VIDEO?\s([^}]+)}/g, make_video);
                    art_text = art_text.replace(/{CIFRA\s([^;]+)(;\s?[^}]+)}/g, make_cifra);
                    art_text = art_text.replace(/{CITA[^}]+}/g, '').replace(/{DESTACAR\s/g, '').replace(/}/g, '');
                    if (!art_text.includes('{'))
                      art_text = art_text.replace(/}/g, '');
                    else
                      console.log('source still has macros');
                    let parser = new DOMParser();
                    let doc = parser.parseFromString('<div style="margin: 20px 0px;">' + DOMPurify.sanitize(art_text, dompurify_options) + '<br></div>', 'text/html');
                    let article_new = doc.querySelector('div');
                    page.append(article_new, document.createElement('br'));
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
  }
}

else if (matchDomain('latercera.com')) {
  let ads = 'div.ads-block';
  hideDOMStyle(ads);
}

else if (matchDomain('milenio.com')) {
  if (window.location.pathname.startsWith('/milenio-plus'))
    header_nofix('main');
  let ads = 'aside[data-camus-module-type="ad"], aside#taboola-below-article-thumbnails-no-feed';
  hideDOMStyle(ads);
}

else if (matchDomain('nacion.com')) {
  let ads = 'div[data-ad-label]';
  hideDOMStyle(ads);
}

else if (matchDomain('nsctotal.com.br')) {
  let ads = 'div.ad, div[id^="floater"]';
  hideDOMStyle(ads);
}

else if (matchDomain('revistaoeste.com')) {
  if (window.location.pathname.startsWith('/revista/')) {
    let loading_content = document.querySelector('div.loading_content');
    if (loading_content)
      loading_content.removeAttribute('class');
    let spinner = document.querySelector('svg.spinner-eclipse');
    removeDOMElement(spinner);
    let lazy_images = document.querySelectorAll('img[src^="data:image/"][data-src]');
    for (let elem of lazy_images)
      elem.src = elem.getAttribute('data-src');
  } else {
    let div_expandable = document.querySelector('div.expandable');
    if (div_expandable)
      div_expandable.classList.remove('expandable');
    let ads = 'section.ad-wrapper, div.autozep-outer';
    hideDOMStyle(ads);
  }
}

else if (matchDomain('semana.com')) {
  if (!window.location.pathname.startsWith('/amp/'))
    amp_redirect('div.paywall > div:not(.article-body)');
  let ads = 'div.ads-cls, amp-fx-flying-carpet';
  hideDOMStyle(ads);
}

else
  csDone = true;
}

} // end csDone(Once)

ads_hide();
leaky_paywall_unhide();

} // end cs_default function
