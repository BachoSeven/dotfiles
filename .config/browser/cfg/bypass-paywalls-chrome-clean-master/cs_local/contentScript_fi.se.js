//"use strict";

cs_default = function (bg2csData = '') {

if (bg2csData && bg2csData.cs_param)
  cs_param = bg2csData.cs_param;

if (!(csDone || csDoneOnce)) {

if (window.location.hostname.endsWith('.dk')) {

if (matchDomain(['berlingske.dk', 'weekendavisen.dk'])) {
  let paywall = document.querySelector('div#paywall');
  if (paywall && dompurify_loaded) {
    removeDOMElement(paywall);
    let article = document.querySelector('div[itemprop="articleBody"');
    if (article) {
      let intro = article.querySelector('p');
      let intro_class = intro ? intro.className : '';
      let json_script = document.querySelector('script#__NEXT_DATA__');
      if (json_script) {
        try {
          let json = JSON.parse(json_script.text);
          if (json && json.props.pageProps.article.body) {
            function getChildValue(child) {
              let value;
              if (child.children && child.children[0]) {
                if (child.children[0].value)
                  value = child.children[0].value;
                else if (child.children[0].children)
                  value = child.children[0].children[0].value;
              }
              return value;
            }
            article.innerHTML = '';
            let parser = new DOMParser();
            let pars = json.props.pageProps.article.body;
            for (let par of pars) {
              let elem = document.createElement('p');
              if (['ParagraphNode', 'HeadingNode'].includes(par.type)) {
                elem.className = intro_class;
                if (par.children) {
                  for (let child of par.children) {
                    let sub_elem;
                    if (child.type === 'TextNode') {
                      sub_elem = document.createElement('span');
                      sub_elem.innerText = child.value;
                      if (par.type === 'HeadingNode')
                        sub_elem.style = 'font-weight: bold;';
                    } else if (child.type === 'HyperlinkNode') {
                      let value = getChildValue(child);
                      if (child.url && value) {
                        sub_elem = document.createElement('a');
                        sub_elem.href = child.url;
                        sub_elem.innerText = value;
                      } else
                        console.log(child)
                    } else if (child.type === 'LineBreakNode') {
                      let sub_elem = document.createElement('br');
                    } else
                      console.log(child);
                    if (sub_elem)
                      elem.appendChild(sub_elem);
                  }
                }
              } else if (par.type === 'FigureNode') {
                if (par.asset && par.asset.image && par.asset.image.assets) {
                  let asset = par.asset.image.assets.pop();
                  if (asset && asset.url) {
                    let caption;
                    if (par.caption && par.caption[0]) {
                      caption = getChildValue(par.caption[0]);
                      if (par.byline && par.byline[0])
                        caption += ' ' + getChildValue(par.byline[0]);
                    }
                    let sub_elem = makeFigure(asset.url, caption, {style: 'width: 95%;'});
                    elem.appendChild(sub_elem);
                  }
                }
              } else if (par.type === 'ListNode') {
                let sub_elem = document.createElement('ul');
                if (par.children) {
                  for (let child of par.children) {
                    let value = getChildValue(child);
                    if (value) {
                      let li = document.createElement('li');
                      li.innerText = value;
                      sub_elem.appendChild(li);
                    }
                  }
                  elem.appendChild(sub_elem);
                }
              } else if (par.type === 'LineBreakNode') {
                let sub_elem = document.createElement('br');
                elem.appendChild(sub_elem);
              } else if (par.type === 'CustomCodeNode') {
                elem = document.createElement('div');
                if (par.code && !par.code.includes('newsletterSignupWidget')) {
                  let doc = parser.parseFromString('<div>' + DOMPurify.sanitize(par.code, dompurify_options) + '</div>', 'text/html');
                  let sub_elem = doc.querySelector('div');
                  elem.appendChild(sub_elem);
                }
              } else
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
  let ads = 'div[data-ad-banner]';
  hideDOMStyle(ads);
}

} else if (window.location.hostname.endsWith('.se')) {

if (matchDomain('dn.se')) {
  let url = window.location.href;
  let paywall_sel = 'div.paywall-wrapper';
  let article_sel = 'article';
  let paywall = document.querySelector(paywall_sel);
  if (paywall) {
    let article = document.querySelector(article_sel);
    if (article) {
      getArchive(url, paywall_sel, '', article_sel);
      article.before(googleSearchToolLink(url));
    }
  }
  let ads = 'div.bad';
  hideDOMStyle(ads);
}

else if (document.querySelector('footer a[href*=".bonniernews.se/cookiepolicy"]')) {
  let ads = 'div.panorama, div[data-bad-fullpage-container], lcl-ad';
  hideDOMStyle(ads);
}

}

else if (matchDomain('suomensotilas.fi')) {
  let obscured = document.querySelector('div.epfl-pw-obscured');
  if (obscured)
    obscured.classList.remove('epfl-pw-obscured');
}

else
  csDone = true;

} // end csDone(Once)

ads_hide();
leaky_paywall_unhide();

} // end cs_default function
