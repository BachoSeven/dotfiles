'use strict';
var ext_api = chrome || browser;
var manifestData = ext_api.runtime.getManifest();
var ext_chromium = !!manifestData.key;
var ext_name = manifestData.name;
var ext_version = manifestData.version;
var ext_manifest_version = manifestData.manifest_version;
var navigator_ua = navigator.userAgent;
var navigator_ua_mobile = navigator_ua.toLowerCase().includes('mobile');

var mv3_alive_max = 15;
var mv3_alive_counter = mv3_alive_max;
if (ext_manifest_version === 3) {
  self.importScripts('sites.js');
  setInterval(function () {
    if (mv3_alive_counter < mv3_alive_max) {
      mv3_alive_counter++;
      ext_api.runtime.getPlatformInfo();
    }
  }, 20000);
}

if (!ext_chromium)
  ext_api = browser;

if (typeof ext_api.action !== 'object') {
  ext_api.action = ext_api.browserAction;
}

var dompurify_sites = [];
var optin_setcookie = false;
var optin_fetch = false;
var optin_update = true;
var blocked_referer = false;
var domain;

// defaultSites are loaded from sites.js at installation extension

var restrictions = {
  'anandabazar.com': /^((?!\/epaper\.anandabazar\.com\/).)*$/,
  'autohebdo.fr': /\/www\.autohebdo\.fr\//,
  'bloomberg.com': /^((?!(\.bloomberg\.com\/news\/terminal\/|(blinks|mercury)\.bloomberg\.com)).)*$/,
  'bloombergadria.com': /^((?!\.bloombergadria\.com\/video\/).)*$/,
  'dn.no': /^((?!\.dn\.no\/dn\/epaper\/).)*$/,
  'economictimes.com': /\.economictimes\.com($|\/($|(__assets|prime)(\/.+)?|.+\.cms))/,
  'espn.com': /^((?!\.espn\.com\/watch).)*$/,
  'esquire.com': /^((?!\/classic\.esquire\.com\/).)*$/,
  'expresso.pt': /^((?!\/tribuna\.expresso\.pt\/).)*$/,
  'faz.net': /^((?!\/zeitung\.faz\.net\/).)*$/,
  'foreignaffairs.com': /^((?!\/reader\.foreignaffairs\.com\/).)*$/,
  'ft.com': /^((?!\/cn\.ft\.com\/).)*$/,
  'hilltimes.com': /^((?!\.hilltimes\.com\/slideshow\/).)*$/,
  'hindustantimes.com': /^((?!\/epaper\.hindustantimes\.com\/).)*$/,
  'iai.tv': /^((?!\/iai\.tv\/video\/).)*$/,
  'ilmanifesto.it': /^((?!\/ilmanifesto\.it\/edizioni\/).)*$/,
  'ilsole24ore.com': /^((?!\/ntplus.+\.ilsole24ore\.com\/).)*$/,
  'la-croix.com': /^((?!\/kiosque\.la-croix\.com\/).)*$/,
  'lasegunda.com': /^((?!\/digital\.lasegunda\.com\/).)*$/,
  'leparisien.fr': /^((?!\/l\.leparisien\.fr\/).)*$/,
  'livemint.com': /^((?!\/epaper\.livemint\.com\/).)*$/,
  'lopinion.fr': /^((?!\.lopinion\.fr\/lejournal).)*$/,
  'mid-day.com': /^((?!\/epaper\.mid-day\.com\/).)*$/,
  'newyorker.com': /^((?!\/archives\.newyorker\.com\/).)*$/,
  'nytimes.com': /^((?!(\/(help|myaccount|timesmachine)\.nytimes\.com\/)|\.nytimes\.com\/games\/).)*$/,
  'quora.com': /^((?!\.quora\.com\/search\?q=).)*$/,
  'science.org': /^((?!\.science\.org\/doi\/).)*$/,
  'scmp.com': /^((?!\.scmp\.com\/plus).)*$/,
  'sky.it': /\/(sport|tg24)\.sky\.it\//,
  'standardmedia.co.ke': /^((?!epaper\.standardmedia\.co\.ke).)*$/,
  'study.com': /\/study\.com\/.+\/lesson\//,
  'sueddeutsche.de': /^((?!zeitung\.sueddeutsche\.de).)*$/,
  'tagesspiegel.de': /^((?!\/(background|checkpoint)\.tagesspiegel\.de\/).)*$/,
  'techinasia.com': /\.techinasia\.com\/.+/,
  'thehindu.com': /^((?!epaper\.thehindu\.com).)*$/,
  'thehindubusinessline.com': /^((?!epaper\.thehindubusinessline\.com).)*$/,
  'thetimes.com': /^((?!epaper\.thetimes\.com).)*$/,
  'uol.com.br': /^((?!(conta|email)\.uol\.com\.br).)*$/,
}

for (let domain of grouped_sites['###_au_news_corp'])
  restrictions[domain] = new RegExp('^((?!todayspaper\\.' + domain.replace(/\./g, '\\.') + '\\/).)*$');

for (let domain of grouped_sites['###_fr_be_groupe_rossel'])
  restrictions[domain] = new RegExp('^((?!journal\\.' + domain.replace(/\./g, '\\.') + '\\/).)*$');

for (let domain of grouped_sites['###_il_haaretz_group'])
  restrictions[domain] = /\/(ty-article(-\w+)?\/|hblocked)/;

if (ext_chromium) {
  for (let domain of [])
    restrictions[domain] = new RegExp('((\\/|\\.)' + domain.replace(/\./g, '\\.') + '\\/$|' + restrictions[domain].toString().replace(/(^\/|\/$)/g, '') + ')');
}

// Don't remove cookies before/after page load
var allow_cookies = [];
var remove_cookies = [];
// select specific cookie(s) to hold/drop from remove_cookies domains
var remove_cookies_select_hold, remove_cookies_select_drop;

// Set User-Agent/headers
var use_google_bot, use_bing_bot, use_facebook_bot, use_useragent_custom, use_useragent_custom_obj, use_headers_custom, use_headers_custom_obj, use_headers_filter, use_headers_filter_obj;
// Set Referer
var use_facebook_referer, use_google_referer, use_twitter_referer, use_referer_custom, use_referer_custom_obj;
// Set random IP-address
var random_ip = {};
var use_random_ip = [];
// concat all sites with change of headers (useragent, referer or random ip)
var change_headers;

// block paywall-scripts
var blockedRegexes = {};
var blockedRegexesDomains = [];
var blockedRegexesGeneral = {};
var blockedJsInline = {};
var blockedJsInlineDomains = [];

// unhide text on amp-page
var amp_unhide;
// redirect to amp-page
var amp_redirect;
// load contentScript in all frames
var cs_all_frames;
// block contentScript
var cs_block;
// clear localStorage in contentScript
var cs_clear_lclstrg;
// code for contentScript
var cs_code;
// parameters for contentScript (default)
var cs_param;
// load text from json (script[type="application/ld+json"])
var ld_json;
// load text from json (script#__NEXT_DATA__)
var ld_json_next;
// load text from json (script source)
var ld_json_source;
// load text from json (link[rel="alternate"][type="application/json"][href])
var ld_json_url;
// load text from archive.is
var ld_archive_is;
// load text from och.to/unlock
var ld_och_to_unlock;
// add external link to article
var add_ext_link;

// custom: block javascript
var block_js_custom = [];
var block_js_custom_ext = [];

// manifest v3
var gpw_domains;
var rule_excluded_base_domains;

function initSetRules() {
  allow_cookies = [];
  remove_cookies = [];
  remove_cookies_select_drop = {};
  remove_cookies_select_hold = {};
  use_google_bot = [];
  use_bing_bot = [];
  use_facebook_bot = [];
  use_useragent_custom = [];
  use_useragent_custom_obj = {};
  use_headers_custom = [];
  use_headers_custom_obj = {};
  use_headers_filter = [];
  use_headers_filter_obj = {};
  use_facebook_referer = [];
  use_google_referer = [];
  use_twitter_referer = [];
  use_referer_custom = [];
  use_referer_custom_obj = {};
  random_ip = {};
  change_headers = [];
  amp_unhide = [];
  amp_redirect = {};
  cs_all_frames = [];
  cs_block = {};
  cs_clear_lclstrg = [];
  cs_code = {};
  cs_param = {};
  dompurify_sites = [];
  ld_json = {};
  ld_json_next = {};
  ld_json_source = {};
  ld_json_url = {};
  ld_archive_is = {};
  ld_och_to_unlock = {};
  add_ext_link = {};
  block_js_custom = [];
  block_js_custom_ext = [];
  blockedRegexes = {};
  blockedRegexesDomains = [];
  blockedRegexesGeneral = {};
  blockedJsInline = {};
  blockedJsInlineDomains = [];
  init_custom_flex_domains();
}

const userAgentDesktopG = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const userAgentMobileG = "Chrome/150.0.0.0 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)";

const userAgentDesktopB = "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)";
const userAgentMobileB = "Chrome/150.0.0.0 Mobile Safari/537.36 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)";

const userAgentDesktopF = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';

var enabledSites = [];
var disabledSites = [];
var optionSites = {};
var customSites = {};
var customSites_grouped_domains = [];
var customSites_domains = [];
var updatedSites = {};
var updatedSites_new = [];
var updatedSites_domains_new = [];
var excludedSites = [];

function setDefaultOptions() {
  ext_api.storage.local.set({
    sites: filterObject(defaultSites, function (val, key) {
      return val.domain && !val.domain.match(/^(###$|#options_(disable|optin)_)/)
    },
      function (val, key) {
      return [key, val.domain]
    })
  }, function () {
    ext_api.runtime.openOptionsPage();
  });
}

function check_sites_updated(sites_updated_json, optin_update = false) {
  fetch(sites_updated_json)
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        json = filterObject(json, function (val, key) {
          let domain_filter = [];
          return (val.domain && !domain_filter.includes(val.domain) && !(val.upd_version && (val.upd_version <= ext_version)) && !(val.upd_version_min && (val.upd_version_min > ext_version)))
        });
        expandSiteRules(json, true);
        ext_api.storage.local.set({
          sites_updated: json
        });
        if (!optin_update) {
          let updated_ext_version_new = Object.values(json).map(x => x.upd_version || '').sort().pop();
          if (updated_ext_version_new) {
            ext_api.management.getSelf(function (result) {
              if (result.installType === 'development')
                setExtVersionNew(updated_ext_version_new);
            })
          }
        }
      })
    }
  }).catch(err => false);
}

var ext_path = 'https://gitflic.ru/project/magnolia1234/bpc_updates/blob/raw?file=';
var sites_updated_json = 'sites_updated.json';
var sites_updated_json_online = ext_path + sites_updated_json;
var self_hosted = !!(manifestData.update_url || (manifestData.browser_specific_settings && manifestData.browser_specific_settings.gecko.update_url));

function clear_sites_updated() {
  ext_api.storage.local.set({
    sites_updated: {}
  });
}

function prep_regex_str(str, domain = '') {
  if (domain)
    str = str.replace(/{domain}/g, domain.replace(/\./g, '\\.'));
  return str.replace(/^\//, '').replace(/\/\//g, '/').replace(/([^\\])\/$/, "$1")
}

var add_session_rule;
var init_session_rules;
var push_session_rule;
var update_session_rules;
if (ext_manifest_version === 3) {

init_session_rules = function (counters = true, rules = true) {
  if (counters) {
    rule_id = 0;
    regex_id = 0;
    domain_id = 0;
  }
  if (rules) {
    sesRules = [];
    sesRuleIds = [];
  }
}

push_session_rule = function (rule, rule_id) {
  sesRules.push(rule);
  sesRuleIds.push(rule_id);
}

update_session_rules = function (rules, rule_ids) {
  ext_api.declarativeNetRequest.updateSessionRules({
    addRules: rules,
    removeRuleIds: rule_ids
  }, );
}

add_session_rule = function (domain, rule, blockedRegexes_rule = '', blockedRegexesGeneral_rule = '', blockedJsInline_rule = '', use_headers_filter_obj_rule = '') {
  function regexToUrlFilter(rule, regex, domain) {
    let urlFilter;
    if (!(regex.match(/([([|*{$\^]|\\[a-z\?])/) || regex.match(/([^\.]|\\\.)\+/))) {
      let match_domain = gpw_domains.concat(['tinypass.com', 'wallkit.net', domain]).find(x => regex.replace(/\\/g, '').match(new RegExp(x.replace(/\./, '\\.'))));
      urlFilter = regex.replace(/\\/g, '').replace(/\.\+/g, '*');
      if (match_domain)
        urlFilter = '||' + urlFilter.replace(/^[\.\/]/g, '');
      delete rule.condition.regexFilter;
      rule.condition.urlFilter = urlFilter;
    }
    if (!urlFilter)
      regex_id++;
  }
  domain_id++;
  if (block_js_custom.includes(domain) || block_js_custom_ext.includes(domain)) {
    rule_id++;
    let rule_regex;
    let url_filter;
    let allow = false;
    if (block_js_custom.includes(domain)) {
      rule_regex = "[\\/\\.]" + domain.replace(/\./g, '\\.') + "\\/";
      url_filter = '||' + domain;
      if (block_js_custom_ext.includes(domain))
        url_filter = '*';
    } else if (block_js_custom_ext.includes(domain)) {
      url_filter = '*';
      allow = true;
    }
    
    let block_rule = {
      "id": rule_id,
      "priority": 1,
      "action": {
        "type": "block"
      },
      "condition": {
        "initiatorDomains": [domain],
        "urlFilter": url_filter,
        "resourceTypes": ["script"]
      }
    };
    push_session_rule(block_rule, rule_id);

    if (allow) {
      rule_id++;
      let allow_rule = {
        "id": rule_id,
        "priority": 2,
        "action": {
          "type": "allow"
        },
        "condition": {
          "initiatorDomains": [domain],
          "urlFilter": '||' + domain,
          "resourceTypes": ["script"]
        }
      };
      push_session_rule(allow_rule, rule_id);
    }
    
  } else if (blockedRegexes_rule) {
    rule_id++;
    let rule_regex = blockedRegexes_rule;
    if (rule_regex instanceof RegExp)
      rule_regex = rule_regex.source;

    let block_rule = {
      "id": rule_id,
      "priority": 1,
      "action": {
        "type": "block"
      },
      "condition": {
        "initiatorDomains": [domain],
        "regexFilter": rule_regex,
        "resourceTypes": ["script", "xmlhttprequest"]
      }
    };
    if (domain === 'bloomberg.com')
      block_rule.condition.resourceTypes = block_rule.condition.resourceTypes.concat(["stylesheet"]);  
    else if (domain === 'thehindu.com')
      block_rule.condition.initiatorDomains = ['www.thehindu.com'];
    regexToUrlFilter(block_rule, rule_regex, domain);
    push_session_rule(block_rule, rule_id);
  }
  
  if (blockedRegexesGeneral_rule) {
    rule_id++;
    let rule_regex = blockedRegexesGeneral_rule.block_regex;
    if (rule_regex instanceof RegExp)
      rule_regex = rule_regex.source;
    let rule_excluded_domains = excludedSites.concat(rule_excluded_base_domains, blockedRegexesGeneral_rule.excluded_domains);
    
    let block_rule = {
      "id": rule_id,
      "priority": 1,
      "action": {
        "type": "block"
      },
      "condition": {
        "excludedInitiatorDomains": rule_excluded_domains,
        "regexFilter": rule_regex,
        "resourceTypes": ["script", "xmlhttprequest"]
      }
    };
    regexToUrlFilter(block_rule, rule_regex, domain);
    push_session_rule(block_rule, rule_id);
  }
  
  let header_rule = {};
  if (!rule.allow_cookies || rule.useragent || rule.useragent_custom || rule.headers_custom || rule.referer || rule.referer_custom || rule.random_ip) {
    rule_id++;
    header_rule = {
      "id": rule_id,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "requestHeaders": []
      },
      "condition": {
        "urlFilter": "||" + domain,
        "resourceTypes": ["main_frame", "sub_frame", "xmlhttprequest", "script"]
      }
    };

    if (['economist.com'].includes(domain))
      header_rule.condition.resourceTypes = header_rule.condition.resourceTypes.concat(["stylesheet", "image", "media"]);
    
    if (!allow_cookies.includes(domain)) {
      header_rule.action.requestHeaders.push({
        "header": "Cookie",
        "operation": "set",
        "value": ""
      });
    }
    
    let mobile = navigator.userAgent.toLowerCase().includes('mobile');
    let useUserAgentMobile = mobile && ![].includes(domain);
    
    let userAgentG = useUserAgentMobile ? userAgentMobileG : userAgentDesktopG;
    let userAgentB = useUserAgentMobile ? userAgentMobileB : userAgentDesktopB;
    
    if (rule.useragent || rule.useragent_custom || rule.headers_custom) {
      if (rule.headers_filter) {
        header_rule.condition.initiatorDomains = [domain]; // not working consistently (for all other sites)
        let filter_regex = use_headers_filter_obj_rule;
        if (filter_regex instanceof RegExp)
          filter_regex = filter_regex.source;
        delete header_rule.condition.urlFilter;
        header_rule.condition.regexFilter = filter_regex;
        regexToUrlFilter(header_rule, filter_regex, domain);
      }
      if (rule.useragent === 'googlebot') {
        let googlebotEnabled = true;
        if (googlebotEnabled) {
          header_rule.action.requestHeaders.push({
            "header": "User-Agent",
            "operation": "set",
            "value": userAgentG
          });
          header_rule.action.requestHeaders.push({
            "header": "Referer",
            "operation": "set",
            "value": "https://www.google.com/"
          });
          header_rule.action.requestHeaders.push({
            "header": "X-Forwarded-For",
            "operation": "set",
            "value": "66.249.66.1"
          });
        }
      } else if (rule.useragent === 'bingbot') {
        header_rule.action.requestHeaders.push({
          "header": "User-Agent",
          "operation": "set",
          "value": userAgentB
        });
      } else if (rule.useragent === 'facebookbot') {
        header_rule.action.requestHeaders.push({
          "header": "User-Agent",
          "operation": "set",
          "value": userAgentDesktopF
        });
      } else {
        if (rule.useragent_custom) {
          if (grouped_sites['###_il_haaretz_group'].includes(domain))
            header_rule.condition.urlFilter = '||' + domain + '/*/ty-article*';
          header_rule.action.requestHeaders.push({
            "header": "User-Agent",
            "operation": "set",
            "value": use_useragent_custom_obj[domain]
          });
        }
        if (rule.headers_custom) {
          for (let header in use_headers_custom_obj[domain]) {
            header_rule.action.requestHeaders.push({
              "header": header,
              "operation": "set",
              "value": use_headers_custom_obj[domain][header]
            });
          }
        }
      }
    } else if (rule.referer || rule.referer_custom) {
      if (use_google_referer.includes(domain)) {
        header_rule.action.requestHeaders.push({
          "header": "Referer",
          "operation": "set",
          "value": "https://www.google.com/"
        });
      } else if (use_facebook_referer.includes(domain)) {
        header_rule.action.requestHeaders.push({
          "header": "Referer",
          "operation": "set",
          "value": "https://www.facebook.com/"
        });
      } else if (use_twitter_referer.includes(domain)) {
        header_rule.action.requestHeaders.push({
          "header": "Referer",
          "operation": "set",
          "value": "https://t.co/"
        });
      }
      if (rule.referer_custom) {
        header_rule.action.requestHeaders.push({
          "header": "Referer",
          "operation": "set",
          "value": use_referer_custom_obj[domain]
        });
      }
    }
    
    if (rule.random_ip) {
      let randomIP_val;
      if (rule.random_ip === 'eu')
        randomIP_val = randomIP(185, 185);
      else
        randomIP_val = randomIP();
      header_rule.action.requestHeaders.push({
        "header": "X-Forwarded-For",
        "operation": "set",
        "value": randomIP_val
      });
    }
    if (header_rule.action.requestHeaders.length)
      push_session_rule(header_rule, rule_id);
    else
      rule_id--;
  }
  
  if (blockedJsInline_rule) {
    rule_id++;
    let rule_regex = blockedJsInline_rule.source;
    let block_inline_rule = {
      "id": rule_id,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "responseHeaders": [{
            "header": "Content-Security-Policy",
            "operation": "set",
            "value": "script-src *;"
          }
        ]
      },
      "condition": {
        "requestDomains": [domain],
        "regexFilter": rule_regex,
        "resourceTypes": ["main_frame", "sub_frame"]
      }
    }
    regexToUrlFilter(block_inline_rule, rule_regex, domain);
    push_session_rule(block_inline_rule, rule_id);
  }

  if (grouped_sites['###_au_news_corp'].includes(domain)) {
    rule_id++;
    regex_id++;
    let au_news_corp_amp = defaultSites['Australia News Corp'].amp_redirect;
    let redirect_rule = {
      "id": rule_id,
      "priority": 1,
      "action": {
        "type": "redirect",
        "redirect": {
          "regexSubstitution": "https://www." + domain + "/\\1" + (au_news_corp_amp ? '?amp' : '')
        }
      },
      "condition": {
        "regexFilter": ".+\\." + domain + "\\/subscribe\\/.+&dest=.+\\.com\\.au%2F([\\w-%]+)&.+",
        "resourceTypes": ["main_frame"]
      }
    };
    push_session_rule(redirect_rule, rule_id);
  }
}

} // manifest v3

function addRules(domain, rule, flex = false) {
  if (rule.remove_cookies > 0 || rule.hasOwnProperty('remove_cookies_select_hold') || !(rule.hasOwnProperty('allow_cookies') || rule.hasOwnProperty('remove_cookies_select_drop')) || rule.cs_clear_lclstrg)
    cs_clear_lclstrg.push(domain);
  if (rule.hasOwnProperty('remove_cookies_select_drop') || rule.hasOwnProperty('remove_cookies_select_hold')) {
    rule.allow_cookies = 1;
    rule.remove_cookies = 1;
  }
  if (rule.allow_cookies > 0 && !allow_cookies.includes(domain))
    allow_cookies.push(domain);
  if (rule.remove_cookies > 0 && !remove_cookies.includes(domain))
    remove_cookies.push(domain);
  if (rule.hasOwnProperty('remove_cookies_select_drop'))
    remove_cookies_select_drop[domain] = rule.remove_cookies_select_drop;
  if (rule.hasOwnProperty('remove_cookies_select_hold'))
    remove_cookies_select_hold[domain] = rule.remove_cookies_select_hold;
  if (rule.hasOwnProperty('block_regex')) {
    if (rule.block_regex instanceof RegExp)
      blockedRegexes[domain] = rule.block_regex;
    else {
      try {
        blockedRegexes[domain] = new RegExp(prep_regex_str(rule.block_regex, domain));
      } catch (e) {
        console.log(`regex not valid, error: ${e}`);
      }
    }
  }
  if (rule.hasOwnProperty('block_regex_general')) {
    if (rule.block_regex_general instanceof RegExp)
      blockedRegexesGeneral[domain] = {block_regex: rule.block_regex_general};
    else {
      try {
        blockedRegexesGeneral[domain] = {block_regex: new RegExp(prep_regex_str(rule.block_regex_general, domain))};
      } catch (e) {
        console.log(`regex not valid, error: ${e}`);
      }
    }
    blockedRegexesGeneral[domain]['excluded_domains'] = rule.excluded_domains ? rule.excluded_domains : [];
  }
  if (rule.hasOwnProperty('block_js_inline')) {
    if (rule.block_js_inline instanceof RegExp)
      blockedJsInline[domain] = rule.block_js_inline;
    else {
      try {
        blockedJsInline[domain] = new RegExp(prep_regex_str(rule.block_js_inline, domain));
      } catch (e) {
        console.log(`regex not valid, error: ${e}`);
      }
    }
  }
  if (rule.useragent) {
    switch (rule.useragent) {
    case 'googlebot':
      if (!use_google_bot.includes(domain))
        use_google_bot.push(domain);
      break;
    case 'bingbot':
      if (!use_bing_bot.includes(domain))
        use_bing_bot.push(domain);
      break;
    case 'facebookbot':
      if (!use_facebook_bot.includes(domain))
        use_facebook_bot.push(domain);
      break;
    }
  } else if (rule.useragent_custom || rule.headers_custom) {
    if (rule.useragent_custom && !use_useragent_custom.includes(domain)) {
      use_useragent_custom.push(domain);
      use_useragent_custom_obj[domain] = rule.useragent_custom;
    }
    if (rule.headers_custom && !use_headers_custom.includes(domain)) {
      use_headers_custom.push(domain);
      use_headers_custom_obj[domain] = rule.headers_custom;
    }
  }
  if (rule.headers_filter) {
    if (!use_headers_filter.includes(domain)) {
      use_headers_filter.push(domain);
      if (rule.headers_filter instanceof RegExp)
        use_headers_filter_obj[domain] = rule.headers_filter;
      else {
        try {
          use_headers_filter_obj[domain] = new RegExp(prep_regex_str(rule.headers_filter, domain));
        } catch (e) {
          console.log(`regex not valid, error: ${e}`);
        }
      }
    }
  }
  if (rule.referer) {
    switch (rule.referer) {
    case 'facebook':
      if (!use_facebook_referer.includes(domain))
        use_facebook_referer.push(domain);
      break;
    case 'google':
      if (!use_google_referer.includes(domain))
        use_google_referer.push(domain);
      break;
    case 'twitter':
      if (!use_twitter_referer.includes(domain))
        use_twitter_referer.push(domain);
      break;
    }
  } else if (rule.referer_custom) {
    if (!use_referer_custom.includes(domain)) {
      use_referer_custom.push(domain);
      use_referer_custom_obj[domain] = rule.referer_custom;
    }
  }
  if (rule.random_ip) {
    random_ip[domain] = rule.random_ip;
  }
  if (rule.amp_unhide > 0 && !amp_unhide.includes(domain))
    amp_unhide.push(domain);
  if (rule.amp_redirect)
    amp_redirect[domain] = rule.amp_redirect;
  if (rule.cs_all_frames)
    cs_all_frames.push(domain);
  if (rule.cs_block)
    cs_block[domain] = 1;
  if (rule.cs_code) {
    if (typeof rule.cs_code === 'string') {
      try {
        rule.cs_code = JSON.parse(rule.cs_code);
      } catch (e) {
        console.log(`cs_code not valid: ${rule.cs_code} error: ${e}`);
      }
    }
    if (typeof rule.cs_code === 'object')
      cs_code[domain] = rule.cs_code;
  }
  if (rule.cs_param)
    cs_param[domain] = rule.cs_param;
  if (rule.ld_json)
    ld_json[domain] = rule.ld_json;
  if (rule.ld_json_next)
    ld_json_next[domain] = rule.ld_json_next;
  if (rule.ld_json_source)
    ld_json_source[domain] = rule.ld_json_source;
  if (rule.ld_json_url)
    ld_json_url[domain] = rule.ld_json_url;
  if (rule.ld_archive_is)
    ld_archive_is[domain] = rule.ld_archive_is;
  if (rule.ld_och_to_unlock)
    ld_och_to_unlock[domain] = rule.ld_och_to_unlock;
  if (rule.ld_json || rule.ld_json_next || rule.ld_json_source || rule.ld_json_url || rule.ld_archive_is || rule.ld_och_to_unlock || rule.cs_dompurify)
    if (!dompurify_sites.includes(domain))
      dompurify_sites.push(domain);
  if (rule.add_ext_link && rule.add_ext_link_type)
    add_ext_link[domain] = {css: rule.add_ext_link, type: rule.add_ext_link_type};

  // custom
  if (rule.block_js > 0)
    block_js_custom.push(domain);
  if (rule.block_js_ext > 0)
    block_js_custom_ext.push(domain);

  if (ext_manifest_version === 3) {
    init_session_rules(false, flex);
    add_session_rule(domain, rule, blockedRegexes[domain], blockedRegexesGeneral[domain], blockedJsInline[domain], use_headers_filter_obj[domain]);
    if (flex && sesRules.length)
      update_session_rules(sesRules, sesRuleIds);
  }
}

function customFlexAddRules(custom_domain, rule) {
  addRules(custom_domain, rule, true);
  if (blockedRegexes[custom_domain])
    blockedRegexesDomains.push(custom_domain);
  if (blockedJsInline[custom_domain]) {
    blockedJsInlineDomains.push(custom_domain);
    if (ext_manifest_version === 2)
      disableJavascriptInline();
  }
  if (rule.useragent || rule.useragent_custom || rule.headers_custom || rule.referer || rule.referer_custom || rule.random_ip)
    change_headers.push(custom_domain);
  if (rule.random_ip)
    use_random_ip.push(custom_domain);
  ext_api.tabs.reload({bypassCache: true});
}

// manifest v3
var rule_id = 0;
var regex_id = 0;
var domain_id = 0;
var sesRules = [];
var sesRuleIds = [];

function set_rules(sites, sites_updated, sites_custom) {
  initSetRules();
  let prev_rule_id = rule_id;
  if (ext_manifest_version === 3)
    init_session_rules();
  for (let site in sites) {
    let site_domain = sites[site].toLowerCase();
    let custom = false;
    if (!site_domain.match(/^(###$|#options_)/)) {
      let rule = {};
      let site_default = defaultSites.hasOwnProperty(site) ? site : Object.keys(defaultSites).find(default_key => compareKey(default_key, site));
      if (site_default) {
        rule = defaultSites[site_default];
        let site_updated = Object.keys(sites_updated).find(updated_key => compareKey(updated_key, site));
        if (site_updated) {
          rule = sites_updated[site_updated];
          if (rule.nofix && rule.group) {
            enabledSites.splice(enabledSites.indexOf(site_domain), 1);
            nofix_sites.push(site_domain);
          }
        }
      } else if (sites_updated.hasOwnProperty(site)) { // updated (new) sites
        rule = sites_updated[site];
      } else if (sites_custom.hasOwnProperty(site)) { // custom (new) sites
        rule = sites_custom[site];
        custom = true;
      } else
        continue;
      let domains = [site_domain];
      let group = false;
      if (rule.hasOwnProperty('group')) {
        domains = (typeof rule.group !== 'string') ? rule.group : rule.group.split(',');
        group = true;
      }
      let rule_default = {};
      if (rule.hasOwnProperty('exception')) {
        for (let key in rule)
          rule_default[key] = rule[key];
      }
      for (let domain of domains) {
        let custom_in_group = false;
        if (rule_default.hasOwnProperty('exception')) {
          let exception_rule = rule_default.exception.filter(x => domain === x.domain || (typeof x.domain !== 'string' && x.domain.includes(domain)));
          if (exception_rule.length > 0)
            rule = exception_rule[0];
          else
            rule = rule_default;
        }
        // custom domain for default site(group)
        if (!custom) {
          let isCustomSite = matchDomain(customSites_domains, domain);
          let customSite_title = isCustomSite ? Object.keys(customSites).find(key => customSites[key].domain === isCustomSite) : '';
          if (customSite_title && !customSitesExt_remove.includes(isCustomSite)) {
            // add default block_regex
            let block_regex_default = '';
            if (rule.hasOwnProperty('block_regex'))
              block_regex_default = rule.block_regex;
            rule = {};
            for (let key in sites_custom[customSite_title])
              rule[key] = sites_custom[customSite_title][key];
            if (block_regex_default && !rule.block_regex_ignore_default) {
              if (rule.hasOwnProperty('block_regex')) {
                if (block_regex_default instanceof RegExp)
                  block_regex_default = block_regex_default.source;
                rule.block_regex = '(' + block_regex_default + '|' + prep_regex_str(rule.block_regex, domain) + ')';
              } else
                rule.block_regex = block_regex_default;
            }
            if (group)
              custom_in_group = true;
            else
              custom = true;
          } else {
            if (rule.nofix) {
              enabledSites.splice(enabledSites.indexOf(domain), 1);
              nofix_sites.push(domain);
            } else {
              let group_site_updated = Object.keys(sites_updated).find(updated_key => group && sites_updated[updated_key].domain === domain);
              if (group_site_updated)
                rule = sites_updated[group_site_updated];
            }
          }
        }
        addRules(domain, rule);
      }
    }
  }
  blockedRegexesDomains = Object.keys(blockedRegexes);
  blockedJsInlineDomains = Object.keys(blockedJsInline);
  if (ext_manifest_version === 2)
    disableJavascriptInline();
  else if (ext_manifest_version === 3)
    update_session_rules(sesRules, sesRuleIds);
  use_random_ip = Object.keys(random_ip);
  change_headers = use_google_bot.concat(use_bing_bot, use_facebook_bot, use_useragent_custom, use_headers_custom, use_facebook_referer, use_google_referer, use_twitter_referer, use_referer_custom, use_random_ip);

  if (ext_manifest_version === 3) {
    let block_rules_length = blockedRegexesDomains.length + blockedJsInlineDomains.length;
    console.log('block_rules: ' + block_rules_length);
    console.log('regex_rules (max. 1000): ' + regex_id);
    console.log('total_rules (max. 5000): ' + rule_id);
    console.log('domains: ' + domain_id);
    
    let fake_rules = [];
    let fake_rules_ids = [];
    for (let i = rule_id + 1; i < prev_rule_id + 1; i++) {
      fake_rules.push({
        "id": i,
        "priority": 1,
        "action": {
          "type": "allow"
        },
        "condition": {
          "urlFilter": "###",
          "resourceTypes": ["main_frame"]
        }
      });
      fake_rules_ids.push(i);
    }
    
    ext_api.declarativeNetRequest.updateSessionRules({
      removeRuleIds: fake_rules_ids
    }, () => {
      if (ext_api.runtime.lasterror)
        console.log(ext_api.runtime.lasterrror.message)
    });
  }

}// manifest v3

// add grouped sites to en/disabledSites (and exclude sites)
function add_grouped_enabled_domains(groups) {
  for (let key in groups) {
    if (enabledSites.includes(key))
      enabledSites = enabledSites.concat(groups[key]);
    else
      disabledSites = disabledSites.concat(groups[key]);
  }
  // custom
  for (let site in customSites) {
    let group = customSites[site].group;
    if (group) {
      let group_array = group.split(',');
      if (enabledSites.includes(customSites[site].domain))
        enabledSites = enabledSites.concat(group_array);
      else
        disabledSites = disabledSites.concat(group_array);
    }
  }
    for (let site of excludedSites) {
      if (enabledSites.includes(site)) {
        enabledSites.splice(enabledSites.indexOf(site), 1);
        disabledSites.push(site);
      }
    }
}

// Get the enabled sites (from local storage) & set_rules for sites
ext_api.storage.local.get({
  sites: {},
  sites_default: Object.keys(defaultSites).filter(x => defaultSites[x].domain && !defaultSites[x].domain.match(/^(#options_|###$)/)),
  sites_custom: {},
  sites_updated: {},
  sites_excluded: [],
  ext_version_old: '2.3.9.0',
  ext_update_check: 0,
  optIn: false,
  optInFetch: false,
  optInUpdate: true
}, function (items) {
  var sites = items.sites;
  optionSites = sites;
  var sites_default = items.sites_default;
  customSites = items.sites_custom;
  customSites = filterObject(customSites, function (val, key) {
    return !(val.add_ext_link && !val.add_ext_link_type)
  });
  customSites_grouped_domains = Object.values(customSites).map(x => x.domain);
  customSites_domains = customSites_grouped_domains.concat(Object.values(customSites).filter(x => x.group).map(x => x.group.split(',').map(x => x.trim())).flat());
  updatedSites = items.sites_updated;
  updatedSites_domains_new = Object.values(updatedSites).filter(x => x.domain && !defaultSites_domains.includes(x.domain) || x.group).map(x => x.group ? x.group.filter(y => !defaultSites_domains.includes(y)).concat([x.domain]) : x.domain).flat();
  var ext_version_old = items.ext_version_old;
  optin_setcookie = items.optIn;
  optin_fetch = items.optInFetch;
  optin_update = items.optInUpdate;
  excludedSites = items.sites_excluded;

  enabledSites = Object.values(sites).filter(function (val) {
    return (val && val !== '###' && (defaultSites_domains.concat(customSites_domains, updatedSites_domains_new).includes(val)));
  }).map(function (val) {
    return val.toLowerCase();
  });

  // Enable new sites by default (opt-in)
  updatedSites_new = Object.keys(updatedSites).filter(x => updatedSites[x].domain && !defaultSites_domains.includes(updatedSites[x].domain));
  for (let site_updated in updatedSites) {
    defaultSites[site_updated] = updatedSites[site_updated];
    if (updatedSites[site_updated].group)
      grouped_sites[updatedSites[site_updated].domain] = updatedSites[site_updated].group;
  }
  if (ext_version > ext_version_old || updatedSites_new.length > 0) {
    if (enabledSites.includes('#options_enable_new_sites')) {
      let sites_new = Object.keys(defaultSites).filter(x => defaultSites[x].domain && !defaultSites[x].domain.match(/^(#options_|###$)/) && !sites_default.some(key => compareKey(key, x)));
      for (let site_new of sites_new)
        sites[site_new] = defaultSites[site_new].domain;
      let sites_old = ['NHST Media Group'];
      for (let site_old of sites_old)
        if (sites[site_old])
          delete sites[site_old];
      // reset ungrouped sites
      let new_domain_sites = {
        'Medium (opt-in to custom sites for custom domains)': '###_medium',
        'The Baltimore Banner': 'thebanner.com',
        'The Times Literary Supplement': 'the-tls.com'
      };
      for (let key in new_domain_sites) {
        if (sites[key] && sites[key] !== new_domain_sites[key])
          sites[key] = new_domain_sites[key];
      }
      ext_api.storage.local.set({
        sites: sites
      });
    } else {
      ext_api.management.getSelf(function (result) {
        if ((result.installType === 'development' || (result.installType !== 'development' && !enabledSites.includes('#options_on_update')))) {
          let new_groups = ['###_fr_groupe_telegramme', '###_uk_iconic_media'];
          let open_options = new_groups.some(group => !enabledSites.includes(group) && grouped_sites[group].some(domain => enabledSites.includes(domain) && !customSites_domains.includes(domain)));
          if (open_options)
            ext_api.runtime.openOptionsPage();
        }
      });
    }
    sites_default = Object.keys(defaultSites).filter(x => defaultSites[x].domain && !defaultSites[x].domain.match(/^(#options_|###$)/));
    ext_api.storage.local.set({
      sites_default: sites_default,
      ext_version_old: ext_version
    });
  }

  disabledSites = defaultSites_grouped_domains.concat(customSites_grouped_domains, updatedSites_domains_new).filter(x => x && !enabledSites.includes(x));
  add_grouped_enabled_domains(grouped_sites);
  if (ext_manifest_version === 3) {
    gpw_domains = Object.values(defaultSites).filter(x => x.block_regex_general && !x.domain.startsWith('###')).map(x => x.domain);
    rule_excluded_base_domains = disabledSites.filter(x => !x.match(/(^###|_)/) && !gpw_domains.includes(x));
  }
  set_rules(sites, updatedSites, customSites);
  if (enabledSites.includes('#options_optin_update_rules') && self_hosted) {
    sites_updated_json = sites_updated_json_online;
    //sites_custom_ext_json = ext_path + 'sites_custom.json';
  }
  var ext_update_check = items.ext_update_check;
  if (!ext_update_check || (Date.now() - ext_update_check > 3 * 60 * 60 * 1000)) {
    if (optin_update)
      check_update();
    check_sites_updated(sites_updated_json, optin_update);
    check_sites_custom_ext(optin_update);
    ext_api.storage.local.set({
      ext_update_check: Date.now()
    });
  }
  setTimeout(function () {
  if (!Object.keys(sites).length)
    ext_api.runtime.openOptionsPage();
  }, 500);
});

// Listen for changes to options
ext_api.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync')
    return;
  if (!ext_chromium) {
    for (let key in changes) {
      let equal;
      if (typeof changes[key].newValue === 'object')
        equal = JSON.stringify(changes[key].newValue) === JSON.stringify(changes[key].oldValue);
      else
        equal = changes[key].newValue === changes[key].oldValue;
      if (equal)
        delete changes[key];
    }
  }
  for (let key in changes) {
    var storageChange = changes[key];
    if (key === 'sites') {
      var sites = storageChange.newValue;
      optionSites = sites;
      enabledSites = Object.values(sites).filter(function (val) {
        return (val && val !== '###' && (defaultSites_domains.concat(customSites_domains, updatedSites_domains_new).includes(val)));
      }).map(function (val) {
        return val.toLowerCase();
      });
      disabledSites = defaultSites_grouped_domains.concat(customSites_grouped_domains, updatedSites_domains_new).filter(x => x && !enabledSites.includes(x));
      add_grouped_enabled_domains(grouped_sites);
      if (ext_manifest_version === 3) {
        gpw_domains = Object.values(defaultSites).filter(x => x.block_regex_general && !x.domain.startsWith('###')).map(x => x.domain);
        rule_excluded_base_domains = disabledSites.filter(x => !x.match(/(^###|_)/) && !gpw_domains.includes(x));
      }
      set_rules(sites, updatedSites, customSites);
    }
    if (key === 'sites_custom') {
      var sites_custom = storageChange.newValue ? storageChange.newValue : {};
      var sites_custom_old = storageChange.oldValue ? storageChange.oldValue : {};
      customSites = sites_custom;
      customSites_grouped_domains = Object.values(customSites).map(x => x.domain);
      customSites_domains = customSites_grouped_domains.concat(Object.values(customSites).filter(x => x.group).map(x => x.group.split(',').map(x => x.trim())).flat());
      
      // add/remove custom sites in options (not for default site(group))
      var sites_custom_added = Object.keys(sites_custom).filter(x => !Object.keys(sites_custom_old).includes(x) && !defaultSites.hasOwnProperty(x) && !defaultSites_domains.includes(sites_custom[x].domain));
      var sites_custom_removed = Object.keys(sites_custom_old).filter(x => !Object.keys(sites_custom).includes(x) && !defaultSites.hasOwnProperty(x) && !defaultSites_domains.includes(sites_custom_old[x].domain));
      
      ext_api.storage.local.get({
        sites: {}
      }, function (items) {
        var sites = items.sites;
        if (sites_custom_added.concat(sites_custom_removed).length > 0) {
          for (let key of sites_custom_added)
            sites[key] = sites_custom[key].domain;
          for (let key of sites_custom_removed)
            delete sites[key];
          
          ext_api.storage.local.set({
            sites: sites
          }, function () {
            true;
          });
        } else {
          var sites_custom_group_update = Object.keys(sites_custom).filter(x => sites_custom[x].group && Object.keys(sites_custom_old).includes(x) && sites_custom_old[x].group && sites_custom[x].group !== sites_custom_old[x].group && enabledSites.includes(sites_custom[x].domain));
          for (let key of sites_custom_group_update)
            enabledSites = enabledSites.concat(sites_custom[key].group.split(','));
          set_rules(sites, updatedSites, customSites);
        }
      });
    }
    if (key === 'sites_updated') {
      var sites_updated = storageChange.newValue || {};
      updatedSites = sites_updated;
      updatedSites_domains_new = Object.values(updatedSites).filter(x => (x.domain && !defaultSites_domains.includes(x.domain) || x.group)).map(x => x.group ? x.group.filter(y => !defaultSites_domains.includes(y)).concat([x.domain]) : x.domain).flat();
      updatedSites_new = Object.keys(updatedSites).filter(x => updatedSites[x].domain && !defaultSites_domains.includes(updatedSites[x].domain));
      if (updatedSites_new.length > 0) {
        if (enabledSites.includes('#options_enable_new_sites')) {
          for (let site_updated_new of updatedSites_new)
            optionSites[site_updated_new] = updatedSites[site_updated_new].domain;
          ext_api.storage.local.set({
            sites: optionSites
          });
        }
      } else
        set_rules(optionSites, updatedSites, customSites);
    }
    if (key === 'sites_excluded') {
      var sites_excluded = storageChange.newValue ? storageChange.newValue : [];
      var sites_excluded_old = storageChange.oldValue ? storageChange.oldValue : [];
      excludedSites = sites_excluded;

      // add/remove excluded sites in en/disabledSites
      var sites_excluded_added = sites_excluded.filter(x => !sites_excluded_old.includes(x));
      var sites_excluded_removed = sites_excluded_old.filter(x => !sites_excluded.includes(x));

      for (let site of sites_excluded_added) {
        if (enabledSites.includes(site)) {
          enabledSites.splice(enabledSites.indexOf(site), 1);
          disabledSites.push(site);
        }
      }
      for (let site of sites_excluded_removed) {
        if (disabledSites.includes(site)) {
          disabledSites.splice(disabledSites.indexOf(site), 1);
          enabledSites.push(site);
        }
      }
    }
    if (key === 'ext_version_new') {
      ext_version_new = storageChange.newValue;
    }
    if (key === 'ext_upd_version_new') {
      ext_upd_version_new = storageChange.newValue;
    }
    if (key === 'optIn') {
      optin_setcookie = storageChange.newValue;
    }
    if (key === 'optInFetch') {
      optin_fetch = storageChange.newValue;
    }
    if (key === 'optInUpdate') {
      optin_update = storageChange.newValue;
    }
  }
});

// Set and show default options on install
ext_api.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    setDefaultOptions();
  } else if (details.reason == "update") {
    ext_api.management.getSelf(function (result) {
      if (enabledSites.includes('#options_on_update') && result.installType !== 'development')
        ext_api.runtime.openOptionsPage();
    });
  }
});

if (ext_manifest_version === 2) {

// Google AMP cache redirect
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  var url = details.url.split('?')[0];
  var updatedUrl;
  if (matchUrlDomain('cdn.ampproject.org', url))
    updatedUrl = 'https://' + url.split(/cdn\.ampproject\.org\/[a-z]\/s\//)[1];
  else if (matchUrlDomain('google.com', url))
    updatedUrl = 'https://' + url.split(/\.google\.com\/amp\/s\//)[1];
  return { redirectUrl: decodeURIComponent(updatedUrl) };
},
{urls:["*://*.cdn.ampproject.org/*/s/*", "*://*.google.com/amp/s/*"], types:["main_frame"]},
["blocking"]
);

// inkl bypass
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }
  var updatedUrl = details.url.replace(/etok=[\w]*&/, '');
  if (details.url.includes('/signin?') && details.url.includes('redirect_to='))
    updatedUrl = 'https://www.inkl.com' + decodeURIComponent(updatedUrl.split('redirect_to=')[1]);
  return { redirectUrl: updatedUrl };
},
{urls:["*://*.inkl.com/*"], types:["main_frame"]},
["blocking"]
);

// Australia News Corp redirect subscribe to amp
var au_news_corp_subscr = grouped_sites['###_au_news_corp'].map(domain => '*://www.' + domain + '/subscribe/*');
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details) || details.url.includes('/digitalprinteditions') || !(details.url.includes('dest=') && details.url.split('dest=')[1].split('&')[0])) {
    return;
  }
  let au_news_corp_amp = defaultSites['Australia News Corp'].amp_redirect;
  let destUrl = new URL(decodeURIComponent(details.url.split('dest=')[1].split('&')[0]));
  let updatedUrl = destUrl.origin + '/' + destUrl.pathname.replace(/^\//, '').replace(/\//g, '%2F') + (au_news_corp_amp ? '?amp' : '');
  return {
    redirectUrl: updatedUrl
  };
}, {
  urls: au_news_corp_subscr,
  types: ["main_frame"]
},
  ["blocking"]);

// fix nytimes x-frame-options (hidden iframe content)
ext_api.webRequest.onHeadersReceived.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }
  var headers = details.responseHeaders;
  headers = headers.map(function (header) {
      if (header.name === 'x-frame-options')
        header.value = 'SAMEORIGIN';
      return header;
    });
  return {
    responseHeaders: headers
  };
}, {
  urls: ["*://*.nytimes.com/*"]
},
  ['blocking', 'responseHeaders']);

}// manifest v2

function blockJsInlineListener(details) {
  let domain = matchUrlDomain(blockedJsInlineDomains, details.url);
  let matched = domain && details.url.match(blockedJsInline[domain]);
  if (matched && optin_setcookie && [].includes(domain))
    matched = false;
  if (!isSiteEnabled(details) || !matched)
    return;
  var headers = details.responseHeaders;
  headers.push({
    'name': 'Content-Security-Policy',
    'value': "script-src *;"
  });
  return {
    responseHeaders: headers
  };
}

function disableJavascriptInline() {
  // block inline script
  ext_api.webRequest.onHeadersReceived.removeListener(blockJsInlineListener);
  var block_js_inline_urls = [];
  for (let domain in blockedJsInline)
    block_js_inline_urls.push("*://*." + domain + "/*");
  if (block_js_inline_urls.length)
    ext_api.webRequest.onHeadersReceived.addListener(blockJsInlineListener, {
      'types': ['main_frame', 'sub_frame'],
      'urls': block_js_inline_urls
    },
      ['blocking', 'responseHeaders']);
}

if (ext_chromium) {
  var focus_changed = false;
  ext_api.windows.onFocusChanged.addListener((windowId) => {
    if (windowId > 0)
      focus_changed = true;
  });
}

  function runOnTab(tab) {
    let tabId = tab.id;
    let url = tab.url;
    let rc_domain = matchUrlDomain(remove_cookies, url);
    let rc_domain_enabled = rc_domain && enabledSites.includes(rc_domain);
    let lib_file = 'lib/empty.js';
    if (matchUrlDomain(dompurify_sites, url))
      lib_file = 'lib/purify.min.js';
    var bg2csData = {};
    if (optin_setcookie && matchUrlDomain(['###'], url))
      bg2csData.optin_setcookie = 1;
    if (optin_fetch)
      bg2csData.optin_fetch = 1;
    if (matchUrlDomain(amp_unhide, url))
      bg2csData.amp_unhide = 1;
    let amp_redirect_domain = matchUrlDomain(Object.keys(amp_redirect), url);
    if (amp_redirect_domain)
      bg2csData.amp_redirect = amp_redirect[amp_redirect_domain];
    let cs_block_domain = matchUrlDomain(Object.keys(cs_block), url);
    if (cs_block_domain)
      bg2csData.cs_block = 1;
    let cs_clear_lclstrg_domain = matchUrlDomain(cs_clear_lclstrg, url);
    if (cs_clear_lclstrg_domain)
      bg2csData.cs_clear_lclstrg = 1;
    let cs_code_domain = matchUrlDomain(Object.keys(cs_code), url);
    if (cs_code_domain)
      bg2csData.cs_code = cs_code[cs_code_domain];
    let cs_param_domain = matchUrlDomain(Object.keys(cs_param), url);
    if (cs_param_domain)
      bg2csData.cs_param = cs_param[cs_param_domain];
    let ld_json_domain = matchUrlDomain(Object.keys(ld_json), url);
    if (ld_json_domain)
      bg2csData.ld_json = ld_json[ld_json_domain];
    let ld_json_next_domain = matchUrlDomain(Object.keys(ld_json_next), url);
    if (ld_json_next_domain)
      bg2csData.ld_json_next = ld_json_next[ld_json_next_domain];
    let ld_json_source_domain = matchUrlDomain(Object.keys(ld_json_source), url);
    if (ld_json_source_domain)
      bg2csData.ld_json_source = ld_json_source[ld_json_source_domain];
    let ld_json_url_domain = matchUrlDomain(Object.keys(ld_json_url), url);
    if (ld_json_url_domain)
      bg2csData.ld_json_url = ld_json_url[ld_json_url_domain];
    let ld_archive_is_domain = matchUrlDomain(Object.keys(ld_archive_is), url);
    if (ld_archive_is_domain)
      bg2csData.ld_archive_is = ld_archive_is[ld_archive_is_domain];
    let ld_och_to_unlock_domain = matchUrlDomain(Object.keys(ld_och_to_unlock), url);
    if (ld_och_to_unlock_domain)
      bg2csData.ld_och_to_unlock = ld_och_to_unlock[ld_och_to_unlock_domain];
    let add_ext_link_domain = matchUrlDomain(Object.keys(add_ext_link), url);
    if (add_ext_link_domain)
      bg2csData.add_ext_link = add_ext_link[add_ext_link_domain];
    let use_cs_all_frames = !!matchUrlDomain(cs_all_frames, url);
    let tab_runs = 5;
    let cs_local = 'en';
    let hostname = urlHost(url).replace(/^www\./, '');
    if (hostname.match(/^thelocal\.\w{2}/))
      cs_local = 'en';
    else if (hostname.match(/\.(ar|br|cl|mx|pe|uy)$/) || matchUrlDomain(['abcmais.com', 'clarin.com', 'cronista.com', 'elespectador.com', 'elmercurio.com', 'eltiempo.com', 'eltribuno.com', 'eluniverso.com', 'exame.com', 'globo.com', 'lasegunda.com', 'latercera.com', 'milenio.com', 'nacion.com', 'revistaoeste.com', 'semana.com'], url))
      cs_local = 'es.pt';
    else if ((hostname.match(/\.(de|at|ch)$/) && !matchUrlDomain(grouped_sites['###_ch_esh_medias'].concat(['letemps.ch']), url)) || matchUrlDomain(['diepresse.com', 'faz.net', 'handelsblatt.com', 'ostdeutscheallgemeine.com', 'wochenblatt.com'], url))
      cs_local = 'de';
    else if (hostname.match(/\.(dk|fi|se)$/))
      cs_local = 'fi.se';
    else if (hostname.match(/\.(es|pt|cat)$/) || matchUrlDomain(['diariocordoba.com', 'diariovasco.com', 'elconfidencial.com', 'elcorreo.com', 'elespanol.com', 'elpais.com', 'elperiodico.com', 'elperiodicodearagon.com', 'elperiodicoextremadura.com', 'elperiodicomediterraneo.com', 'emporda.info', 'expansion.com', 'larioja.com', 'lavanguardia.com', 'levante-emv.com', 'marca.com', 'mundodeportivo.com', 'politicaexterior.com'], url))
      cs_local = 'es.pt';
    else if (hostname.endsWith('.fr') || matchUrlDomain(['aoc.media', 'bienpublic.com', 'connaissancedesarts.com', 'courrierinternational.com', 'jeuneafrique.com', 'journaldunet.com', 'la-croix.com', 'lecho.be', 'ledauphine.com', 'legrandcontinent.eu', 'lejsl.com', 'lerevenu.com', 'lesinrocks.com', 'lesoir.be', 'letemps.ch', 'linforme.com', 'loeildelaphotographie.com', 'macg.co', 'parismatch.com', 'philomag.com', 'philonomist.com', 'pourleco.com', 'reforme.net', 'science-et-vie.com', 'sudinfo.be', 'valeursactuelles.com'].concat(grouped_sites['###_be_groupe_ipm'], grouped_sites['###_ch_esh_medias'], grouped_sites['###_fr_groupe_nice_matin']), url))
      cs_local = 'fr';
    else if (hostname.endsWith('.it') || matchUrlDomain(['eastwest.eu', 'ilsole24ore.com', 'italian.tech', 'quotidiano.net', 'tuttosport.com'], url))
      cs_local = 'it';
    else if (hostname.match(/\.(nl|be)$/) || matchUrlDomain(['projectcargojournal.com', 'railfreight.cn', 'railfreight.com', 'railtech.com'], url))
      cs_local = 'nl';
    else if (hostname.match(/\.(bg|cz|hr|pl|ua)$/) || matchUrlDomain(['oko.press', 'parkiet.com', 'wyborcza.biz'], url))
      cs_local = 'pl';
    let cs_local_file = 'cs_local/contentScript' + '_' + cs_local + '.js';
    for (let n = 0; n < tab_runs; n++) {
      setTimeout(function () {
        if (n < 1) {
        // run contentScript.js on page
        if (ext_manifest_version === 2) {
          ext_api.tabs.executeScript(tabId, {
            file: lib_file,
            runAt: 'document_start',
            allFrames: use_cs_all_frames
          }, function (res) {
            if (ext_api.runtime.lastError)
              return;
            ext_api.tabs.executeScript(tabId, {
              file: 'contentScript.js',
              runAt: 'document_start',
              allFrames: use_cs_all_frames
            }, function (res) {
              if (ext_api.runtime.lastError)
                return;
              ext_api.tabs.executeScript(tabId, {
                file: cs_local_file,
                runAt: 'document_start',
                allFrames: use_cs_all_frames
              }, function (res) {
                if (ext_api.runtime.lastError || res[0]) {
                  return;
                }
              })
            })
          });
        } else if (ext_manifest_version === 3) {
          mv3_alive_counter = 0;
          let script_world = "ISOLATED";
          if (matchUrlDomain(['businesspost.ie', 'hbr.org', 'la-croix.com', 'ouest-france.fr'].concat(grouped_sites['###_fr_groupe_ebra']), url))
            script_world = "MAIN";
          ext_api.scripting.executeScript({
            target: {
              tabId: tabId,
              allFrames: use_cs_all_frames
            },
            files: [lib_file, "contentScript.js", cs_local_file],
            injectImmediately: true,
            world: script_world
          }).catch(err => false);
        }
        // send bg2csData to contentScript.js
        if (true) {
          setTimeout(function () {
            if (ext_manifest_version === 3 || !ext_chromium)
              ext_api.tabs.sendMessage(tabId, {msg: "bg2cs", data: bg2csData}).catch(x => false);
            else
              ext_api.tabs.sendMessage(tabId, {msg: "bg2cs", data: bg2csData});
          }, 100);
        }
        } // run cs once
        // remove cookies after page load
        if (rc_domain_enabled && !['enotes.com', 'investors.com'].includes(rc_domain)) {
          remove_cookies_fn(rc_domain, true);
        }
      }, n * 200);
    }
  }

  function runOnTab_once(tab) {
    let tabId = tab.id;
    let url = tab.url;
    // load contentScript_once.js to identify custom site (flex) of group
    if (!(matchUrlDomain(custom_flex_domains.concat(custom_flex_not_domains, customSites_domains, updatedSites_domains_new, excludedSites, nofix_sites), url) || matchUrlDomain(defaultSites_domains, url))) {
      if (ext_manifest_version === 2) {
        ext_api.tabs.executeScript(tabId, {
          file: 'contentScript_once.js',
          runAt: 'document_start'
        }, function (res) {
          if (ext_api.runtime.lastError || res[0]) {
            return;
          }
        });
      } else if (ext_manifest_version === 3) {
        ext_api.scripting.executeScript({
          target: {
            tabId: tabId
          },
          files: ["contentScript_once.js"]
        }).catch(err => false);
      }
    }
    // load toggleIcon.js (icon for dark or incognito mode in Chrome))
    if (ext_chromium) {
      if (ext_manifest_version === 2) {
        ext_api.tabs.executeScript(tabId, {
          file: 'options/toggleIcon.js',
          runAt: 'document_start'
        }, function (res) {
          if (ext_api.runtime.lastError || res[0]) {
            return;
          }
        });
      } else if (ext_manifest_version === 3) {
        ext_api.scripting.executeScript({
          target: {
            tabId: tabId
          },
          files: ["options/toggleIcon.js"]
        }).catch(err => false);
      }
    }
  }

  var set_var_sites = ['automobilwoche.de', 'journaldemontreal.com', 'journaldequebec.com', 'lepoint.fr', 'lexpress.fr', 'nzherald.co.nz'];
  function runOnTab_once_var(tab) {
    let tabId = tab.id;
    let url = tab.url;
    let domain = matchUrlDomain(set_var_sites, url);
    // load contentScript_once_var.js to set variables for site
    if (domain && enabledSites.includes(domain)) {
      if (ext_manifest_version === 2) {
        ext_api.tabs.executeScript(tabId, {
          file: 'contentScript_once_var.js',
          runAt: 'document_start'
        }, function (res) {
          if (ext_api.runtime.lastError || res[0]) {
            return;
          }
        });
      } else if (ext_manifest_version === 3) {
        ext_api.scripting.executeScript({
          target: {
            tabId: tabId
          },
          files: ["contentScript_once_var.js"],
          injectImmediately: true,
          world: "MAIN"
        }).catch(err => false);
      }
    }
  }

ext_api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let tab_status = changeInfo.status;
  if (/^http/.test(tab.url)) {
    if ((tab_status && (tab_status === 'complete' || matchUrlDomain(['startribune.com'].concat(grouped_sites['###_usa_tribune']), tab.url))) || (!tab_status && changeInfo.url)) {
      let timeout = changeInfo.url ? 500 : 0;
      setTimeout(function () {
        if (isSiteEnabled(tab)) {
          runOnTab(tab);
        }
        runOnTab_once(tab);
      }, timeout);
    }
    runOnTab_once_var(tab);
  }
});

if (ext_manifest_version === 2) {

var extraInfoSpec = ['blocking', 'requestHeaders'];
if (ext_api.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS'))
  extraInfoSpec.push('extraHeaders');

ext_api.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var requestHeaders = details.requestHeaders;

  var header_referer = '';
  if (details.originUrl)
    header_referer = details.originUrl;
  else {
    for (let n in requestHeaders) {
      if (requestHeaders[n].name.toLowerCase() == 'referer') {
        header_referer = requestHeaders[n].value;
        break;
      }
    }
    var blocked_referer_domains = [];
    if (!header_referer && details.initiator) {
      header_referer = details.initiator;
      if (!blocked_referer && matchUrlDomain(blocked_referer_domains, details.url) && ['script', 'xmlhttprequest'].includes(details.type)) {
        for (let domain of blocked_referer_domains)
          restrictions[domain] = new RegExp('((\\/|\\.)' + domain.replace(/\./g, '\\.') + '($|\\/$)|' + restrictions[domain].toString().replace(/(^\/|\/$)/g, '') + ')');
        blocked_referer = true;
      }
    }
  }

  // block external javascript for custom sites (optional)
  if (['script'].includes(details.type)) {
    let domain_blockjs_ext = matchUrlDomain(block_js_custom_ext, header_referer);
    if (domain_blockjs_ext && !matchUrlDomain(domain_blockjs_ext, details.url) && isSiteEnabled({url: header_referer}))
      return { cancel: true };
  }

  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  var block_resourcetypes = ['script', 'xmlhttprequest'];
  if (matchUrlDomain('bloomberg.com', header_referer) && matchUrlDomain('bwbx.io', details.url) && details.type === 'stylesheet')
    block_resourcetypes = block_resourcetypes.concat(['stylesheet']);
  if (block_resourcetypes.includes(details.type)) {
    let domain = matchUrlDomain(blockedRegexesDomains, header_referer);
    if (domain && details.url.match(blockedRegexes[domain]) && isSiteEnabled({url: header_referer}))
      return { cancel: true };
  }

  // block general paywall scripts
  if (['script', 'xmlhttprequest'].includes(details.type)) {
    for (let domain in blockedRegexesGeneral) {
      if (details.url.match(blockedRegexesGeneral[domain].block_regex) && !(matchUrlDomain(excludedSites.concat(disabledSites, blockedRegexesGeneral[domain].excluded_domains), header_referer)))
        return { cancel: true };
    }
  }

  if (!isSiteEnabled(details)) {
    return;
  }

  // block javascript of (sub)domain for custom sites (optional)
  var domain_blockjs = matchUrlDomain(block_js_custom, details.url);
  if (domain_blockjs && details.type === 'script') {
    return { cancel: true };
  }

  var useUserAgentMobile = false;
  var setReferer = false;
  var setUserAgent = false;

var ignore_types = ['font', 'image', 'stylesheet'];

if (matchUrlDomain(change_headers, details.url) && !ignore_types.includes(details.type)) {
  var mobile = details.requestHeaders.filter(x => x.name.toLowerCase() === "user-agent" && x.value.toLowerCase().includes("mobile")).length;
  var headers_filter_domain = matchUrlDomain(use_headers_filter, details.url);
  var googlebotEnabled = matchUrlDomain(use_google_bot, details.url) && 
    !(matchUrlDomain('nytimes.com', details.url) && details.url.includes('.nytimes.com/live/')) &&
    !(headers_filter_domain && !details.url.match(use_headers_filter_obj[headers_filter_domain]));
  var bingbotEnabled = matchUrlDomain(use_bing_bot, details.url);
  var facebookbotEnabled = matchUrlDomain(use_facebook_bot, details.url);
  var useragent_customEnabled = matchUrlDomain(use_useragent_custom, details.url);
  var headers_customEnabled = matchUrlDomain(use_headers_custom, details.url);

  // if referer exists, set it
  requestHeaders = requestHeaders.map(function (requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (googlebotEnabled || matchUrlDomain(use_google_referer, details.url)) {
        requestHeader.value = 'https://www.google.com/';
      } else if (matchUrlDomain(use_facebook_referer, details.url)) {
        requestHeader.value = 'https://www.facebook.com/';
      } else if (matchUrlDomain(use_twitter_referer, details.url)) {
        requestHeader.value = 'https://t.co/';
      } else if (domain = matchUrlDomain(use_referer_custom, details.url)) {
        requestHeader.value = use_referer_custom_obj[domain];
      }
      setReferer = true;
    }
    if (requestHeader.name === 'User-Agent') {
      useUserAgentMobile = requestHeader.value.toLowerCase().includes("mobile") && !matchUrlDomain([], details.url);
      if (googlebotEnabled)
        requestHeader.value = useUserAgentMobile ? userAgentMobileG : userAgentDesktopG;
      else if (bingbotEnabled)
        requestHeader.value = useUserAgentMobile ? userAgentMobileB : userAgentDesktopB;
      else if (facebookbotEnabled)
        requestHeader.value = userAgentDesktopF;
      else {
        if (domain = useragent_customEnabled)
          requestHeader.value = use_useragent_custom_obj[domain];
      }
      setUserAgent = true;
    }
    return requestHeader;
  });

  // otherwise add it
  if (!setReferer) {
    if (googlebotEnabled || matchUrlDomain(use_google_referer, details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.google.com/'
      });
    } else if (matchUrlDomain(use_facebook_referer, details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.facebook.com/'
      });
    } else if (matchUrlDomain(use_twitter_referer, details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://t.co/'
      });
    } else if (domain = matchUrlDomain(use_referer_custom, details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: use_referer_custom_obj[domain]
      });
    }
  }

  // override User-Agent to use Googlebot
  if (googlebotEnabled) {
    if (!setUserAgent) {
      requestHeaders.push({
        "name": "User-Agent",
        "value": useUserAgentMobile ? userAgentMobileG : userAgentDesktopG
      })
    }
    requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": "66.249.66.1"
    })
  }

  // override User-Agent to use Bingbot
  else if (!setUserAgent && bingbotEnabled) {
    requestHeaders.push({
      "name": "User-Agent",
      "value": useUserAgentMobile ? userAgentMobileB : userAgentDesktopB
    })
  }

  // override User-Agent to use Facebookbot
  else if (!setUserAgent && facebookbotEnabled) {
    requestHeaders.push({
      "name": "User-Agent",
      "value": userAgentDesktopF
    })
  }

  // override User-Agent/headers to custom
  else {
    if (!setUserAgent && (domain = useragent_customEnabled)) {
      requestHeaders.push({
        "name": "User-Agent",
        "value": use_useragent_custom_obj[domain]
      });
    }
    if (domain = headers_customEnabled) {
      for (let header in use_headers_custom_obj[domain]) {
        requestHeaders.push({
          "name": header,
          "value": use_headers_custom_obj[domain][header]
        })
      }
    }
  }
 
  // random IP for sites in use_random_ip
  let domain_random = matchUrlDomain(use_random_ip, details.url);
  if (domain_random && !googlebotEnabled) {
    let randomIP_val;
    if (random_ip[domain_random] === 'eu')
      randomIP_val = randomIP(185, 185);
    else
      randomIP_val = randomIP();
    requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": randomIP_val
    })
  }
}

  // remove cookies before page load
  if (!matchUrlDomain(allow_cookies, details.url)) {
    requestHeaders = requestHeaders.map(function(requestHeader) {
      if (requestHeader.name === 'Cookie') {
        requestHeader.value = '';
      }
      return requestHeader;
    });
  }
  return { requestHeaders: requestHeaders };
}, {
  urls: ['*://*/*']
}, extraInfoSpec);
// extraInfoSpec is ['blocking', 'requestHeaders'] + possible 'extraHeaders'

}// manifest v2

function check_sites_custom_ext(optin_update) {
  fetch(sites_custom_ext_json)
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        customSitesExt = Object.values(json).map(x => x.domain);
        if (!optin_update) {
          if (json['###_remove_sites'] && json['###_remove_sites'].cs_code) {
            customSitesExt_remove = json['###_remove_sites'].cs_code.split(/,\s*/);
            let upd_match = customSitesExt_remove.filter(x => x.match(/^###_custom_/));
            if (upd_match.length) {
              ext_api.storage.local.set({
                sites_custom_upd_version: upd_match[0].replace('###_custom_', '')
              });
            }
          }
        }
      })
    }
  }).catch(err => false);
}

var customSitesExt = [];
var customSitesExt_remove = [];
var sites_custom_ext_json = 'custom/sites_custom.json';

ext_api.tabs.onUpdated.addListener(function (tabId, info, tab) { updateBadge(tab); });
ext_api.tabs.onActivated.addListener(function (activeInfo) { if (activeInfo.tabId) ext_api.tabs.get(activeInfo.tabId, updateBadge); });

var gpw_no_badge_domains = Object.values(defaultSites).filter(x => x.block_regex_general && !x.domain.startsWith('###') && x.excluded_domains && x.excluded_domains.includes(x.domain)).map(x => x.domain);
function updateBadge(activeTab) {
  if (ext_api.runtime.lastError || !activeTab || !activeTab.active)
    return;
  let badgeText = '';
  let color = 'red';
  let currentUrl = activeTab.url;
  if (currentUrl) {
    if (isSiteEnabled({url: currentUrl})) {
      badgeText = 'ON';
      color = 'red';
    } else if (matchUrlDomain(enabledSites, currentUrl)) {
      badgeText = 'ON-';
      color = 'orange';
    } else if (matchUrlDomain(disabledSites, currentUrl)) {
      badgeText = 'OFF';
      color = 'blue';
    } else if (matchUrlDomain(nofix_sites, currentUrl)) {
      badgeText = 'X';
      color = 'silver';
    }
    if (matchUrlDomain(gpw_no_badge_domains, currentUrl))
      badgeText = '';
    if (ext_upd_version_new > ext_version)
      badgeText = '^' + badgeText;
    let isDefaultSite = matchUrlDomain(defaultSites_domains, currentUrl);
    let isCustomSite = matchUrlDomain(customSites_domains, currentUrl);
    let isUpdatedSite = matchUrlDomain(updatedSites_domains_new, currentUrl);
    if (!isDefaultSite && (isCustomSite || isUpdatedSite)) {
      ext_api.permissions.contains({
        origins: ['*://*.' + (isCustomSite || isUpdatedSite) + '/*']
      }, function (result) {
        if (!result)
          badgeText = enabledSites.includes(isCustomSite || isUpdatedSite) ? 'C' : '';
        if (color && badgeText)
          ext_api.action.setBadgeBackgroundColor({color: color});
        ext_api.action.setBadgeText({text: badgeText});
      });
    } else {
      if (!badgeText && matchUrlDomain(customSitesExt, currentUrl))
        badgeText = '+C';
      if (color && badgeText)
        ext_api.action.setBadgeBackgroundColor({color: color});
      ext_api.action.setBadgeText({text: badgeText});
    }
  } else
      ext_api.action.setBadgeText({text: badgeText});
}

function setExtVersionNew(check_ext_version_new, check_ext_upd_version_new = check_ext_version_new) {
  ext_version_new = check_ext_version_new;
  ext_upd_version_new = check_ext_upd_version_new;
  ext_api.storage.local.set({
    ext_version_new: ext_version_new,
    ext_upd_version_new: ext_upd_version_new
  });
}

var ext_version_new, ext_upd_version_new;
function check_update() {
  let manifest_new = ext_path + 'manifest.json';
  fetch(manifest_new)
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        let json_ext_version_new = json['version'];
        ext_api.management.getSelf(function (result) {
          if (result.installType !== 'development') {
            if (manifestData.browser_specific_settings && manifestData.browser_specific_settings.gecko.update_url) {
              let json_upd_version_new = manifestData.browser_specific_settings.gecko.update_url;
              fetch(json_upd_version_new)
              .then(response => {
                if (response.ok) {
                  response.json().then(upd_json => {
                    if (upd_json.addons) {
                      let ext_id = manifestData.browser_specific_settings.gecko.id;
                      let json_ext_upd_version_new = upd_json.addons[ext_id].updates[0].version;
                      setExtVersionNew(json_ext_version_new, json_ext_upd_version_new);
                    }
                  })
                } else
                  setExtVersionNew(json_ext_version_new, '1');
              }).catch(err => setExtVersionNew(json_ext_version_new, '1'));
            } else if (manifestData.update_url) {
              let json_upd_version_new = manifestData.update_url;
              fetch(json_upd_version_new)
              .then(response => {
                if (response.ok) {
                  response.text().then(upd_html => {
                    if (upd_html.includes(".crx' version='")) {
                      let json_ext_upd_version_new = upd_html.split(".crx' version='")[1].split("'")[0];
                      setExtVersionNew(json_ext_version_new, json_ext_upd_version_new);
                    }
                  })
                } else
                  setExtVersionNew(json_ext_version_new, '1');
              }).catch(err => setExtVersionNew(json_ext_version_new, '1'));
            }
          } else
            setExtVersionNew(json_ext_version_new);
        })
        ext_api.storage.local.set({
          sites_custom_upd_version: json['sites_custom_upd_version'] || ''
        });
      })
    } else
      setExtVersionNew('');
  }).catch(err => setExtVersionNew(''));
}

function site_switch() {
  ext_api.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
      let currentUrl = tabs[0].url;
      let isDefaultSite = matchUrlDomain(defaultSites_grouped_domains, currentUrl);
      if (!isDefaultSite) {
        let isDefaultSiteGroup = matchUrlDomain(defaultSites_domains, currentUrl);
        if (isDefaultSiteGroup)
          isDefaultSite = Object.keys(grouped_sites).find(key => grouped_sites[key].includes(isDefaultSiteGroup));
      }
      if (!isDefaultSite) {
        let sites_updated_domains_new = Object.values(updatedSites).filter(x => x.domain && !defaultSites_domains.includes(x.domain)).map(x => x.domain);
        let isUpdatedSite = matchUrlDomain(sites_updated_domains_new, currentUrl);
        if (!isUpdatedSite) {
          let sites_updated_group_domains_new = Object.values(updatedSites).filter(x => x.group).map(x => x.group.filter(y => !defaultSites_domains.includes(y))).flat();
          let isUpdatedSite_group = matchUrlDomain(sites_updated_group_domains_new, currentUrl);
          if (isUpdatedSite_group)
            isUpdatedSite = Object.values(updatedSites).filter(x => x.group && x.group.includes(isUpdatedSite_group)).map(x => x.domain)[0];
        }
        if (isUpdatedSite)
          isDefaultSite = isUpdatedSite;
      }
      let defaultSite_title = isDefaultSite ? Object.keys(defaultSites).find(key => defaultSites[key].domain === isDefaultSite) : '';
      let isCustomSite = matchUrlDomain(customSites_domains, currentUrl);
      let customSite_title = isCustomSite ? Object.keys(customSites).find(key => customSites[key].domain === isCustomSite || (customSites[key].group && customSites[key].group.split(',').includes(isCustomSite))) : '';
      if (isCustomSite && customSite_title && customSites[customSite_title].domain !== isCustomSite)
        isCustomSite = customSites[customSite_title].domain;
      let isCustomFlexSite = matchUrlDomain(custom_flex_domains, currentUrl);
      let isCustomFlexGroupSite = isCustomFlexSite ? Object.keys(custom_flex).find(key => custom_flex[key].includes(isCustomFlexSite)) : '';
      let customFlexSite_title = isCustomFlexGroupSite ? Object.keys(defaultSites).find(key => defaultSites[key].domain === isCustomFlexGroupSite) : '';
      let site_title = defaultSite_title || customSite_title || customFlexSite_title;
      let domain = isDefaultSite || isCustomSite || isCustomFlexGroupSite;
      if (domain && site_title) {
        let added_site = [];
        let removed_site = [];
        if (enabledSites.includes(domain))
          removed_site.push(site_title);
        else
          added_site.push(site_title);
        ext_api.storage.local.get({
          sites: {}
        }, function (items) {
          var sites = items.sites;
          for (let key of added_site)
            sites[key] = domain;
          for (let key of removed_site) {
            key = Object.keys(sites).find(sites_key => compareKey(sites_key, key));
            delete sites[key];
          }
          ext_api.storage.local.set({
            sites: sites
          }, function () {
            ext_api.tabs.reload({bypassCache: true});
          });
        });
      }
    }
  });
}

function remove_cookies_fn(domainVar, exclusions = false) {
  ext_api.cookies.getAllCookieStores(function (cookieStores) {
    ext_api.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (!ext_api.runtime.lastError && tabs && tabs[0] && /^http/.test(tabs[0].url)) {
        let tabId = tabs[0].id;
        let storeId = '0';
        for (let store of cookieStores) {
          if (store.tabIds.includes(tabId))
            storeId = store.id;
        }
        storeId = storeId.toString();
        if (domainVar === 'asia.nikkei.com')
          domainVar = 'nikkei.com';
        var cookie_get_options = {
          domain: domainVar
        };
        if (storeId !== 'null')
          cookie_get_options.storeId = storeId;
        var cookie_remove_options = {};
        ext_api.cookies.getAll(cookie_get_options, function (cookies) {
          for (let cookie of cookies) {
            if (exclusions) {
              var rc_domain = cookie.domain.replace(/^(\.?www\.|\.)/, '');
              // hold specific cookie(s) from remove_cookies domains
              if ((rc_domain in remove_cookies_select_hold) && remove_cookies_select_hold[rc_domain].includes(cookie.name)) {
                continue; // don't remove specific cookie
              }
              // drop only specific cookie(s) from remove_cookies domains
              if ((rc_domain in remove_cookies_select_drop) && !(remove_cookies_select_drop[rc_domain].includes(cookie.name))) {
                continue; // only remove specific cookie
              }
              // hold on to consent-cookie
              if (cookie.name.match(/(consent|^optanon)/i)) {
                continue;
              }
            }
            cookie.domain = cookie.domain.replace(/^\./, '');
            cookie_remove_options = {
              url: (cookie.secure ? "https://" : "http://") + cookie.domain + cookie.path,
              name: cookie.name
            };
            if (storeId !== 'null')
              cookie_remove_options.storeId = storeId;
            ext_api.cookies.remove(cookie_remove_options);
          }
        });
      }
    });
  })
}

function clear_cookies() {
  ext_api.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
      let tabId = tabs[0].id;
      if (ext_manifest_version === 2) {
        ext_api.tabs.executeScript({
          file: 'options/clearCookies.js',
          runAt: 'document_start'
        }, function (res) {
          if (ext_api.runtime.lastError || res[0]) {
            return;
          }
        });
      } else if (ext_manifest_version === 3) {
        ext_api.scripting.executeScript({
          target: {
            tabId: tabId
          },
          files: ['options/clearCookies.js']
        }).catch(err => false);
      }
      ext_api.tabs.update(tabId, {
        url: tabs[0].url
      });
    }
  });
}

var chrome_scheme = 'light';
ext_api.runtime.onMessage.addListener(function (message, sender) {
  if (message.request === 'clear_cookies') {
    clear_cookies();
  }
  // clear cookies for domain
  if (message.request === 'clear_cookies_domain' && message.data) {
    remove_cookies_fn(message.data.domain, true);
  }
  if (message.request === 'custom_domain' && message.data && message.data.domain) {
    let custom_domain = message.data.domain;
    let group = message.data.group;
    let nofix = message.data.nofix;
    if (group) {
      if (!custom_flex_domains.includes(custom_domain)) {
        if (nofix && !nofix_groups.includes(group))
          nofix_groups.push(group);
        if (!nofix_groups.includes(group)) {
          if (custom_flex[group])
            custom_flex[group].push(custom_domain);
          else
            custom_flex[group] = [custom_domain];
          custom_flex_domains.push(custom_domain);
          if (enabledSites.includes(group)) {
            if (!enabledSites.includes(custom_domain))
              enabledSites.push(custom_domain);
            let rules = Object.values(updatedSites).find(x => x.domain === group) || Object.values(defaultSites).find(x => x.domain === group);
            if (rules) {
              if (rules.hasOwnProperty('exception')) {
                let exception_rule = rules.exception.filter(x => custom_domain === x.domain || (typeof x.domain !== 'string' && x.domain.includes(custom_domain)));
                if (exception_rule.length)
                  rules = exception_rule[0];
              }
              if ([].includes(group)) {
                if (!set_var_sites.includes(custom_domain))
                  set_var_sites.push(custom_domain);
              }
            } else
              rules = Object.values(customSites).find(x => x.domain === group);
            if (rules) {
              customFlexAddRules(custom_domain, rules);
            }
          } else if (disabledSites.includes(group)) {
            if (!disabledSites.includes(custom_domain))
              disabledSites.push(custom_domain);
          }
        } else
          nofix_sites.push(custom_domain);
    }
  } else
    custom_flex_not_domains.push(custom_domain);
  }
  if (message.request === 'site_switch') {
    site_switch();
  }
  if (message.request === 'check_sites_updated') {
    check_sites_updated(sites_updated_json_online);
  }
  if (message.request === 'clear_sites_updated') {
    clear_sites_updated();
  }
  if (message.request === 'check_update') {
    check_update();
  }
  if (message.request === 'popup_show_toggle') {
    ext_api.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
        let currentUrl = tabs[0].url;
        let domain;
        let isExcludedSite = matchUrlDomain(excludedSites, currentUrl);
        if (!isExcludedSite) {
          let isDefaultSite = matchUrlDomain(defaultSites_domains, currentUrl);
          let isCustomSite = matchUrlDomain(customSites_domains, currentUrl);
          let isUpdatedSite = matchUrlDomain(updatedSites_domains_new, currentUrl);
          let isCustomFlexSite = matchUrlDomain(custom_flex_domains, currentUrl);
          domain = isDefaultSite || isCustomSite || isUpdatedSite || isCustomFlexSite;
          if (domain)
            ext_api.runtime.sendMessage({
              msg: "popup_show_toggle",
              data: {
                domain: domain,
                enabled: enabledSites.includes(domain)
              }
            })
        }
      }
    })
  }
  if (message.request === 'refreshCurrentTab') {
    ext_api.tabs.reload(sender.tab.id, {bypassCache: true});
  }

  if (message.request === 'getExtFetch' && message.data) {
    message.data.html = '';
    let options = {};
    if (message.data.options.headers)
      options.headers = message.data.options.headers;
    if (message.data.options.method)
      options.method = message.data.options.method;
    if (message.data.options.body)
      options.body = message.data.options.body;
    fetch(message.data.url, options)
    .then(response => {
      if (response.ok) {
        response.text().then(html => {
          let json_key = message.data.json_key;
          if (json_key) {
            try {
              let json = JSON.parse(html);
              if (json)
                message.data.html = getNestedKeys(json, json_key);
            } catch (err) {
              console.log(err);
            }
          } else
            message.data.html = html;
          ext_api.tabs.sendMessage(sender.tab.id, {msg: "showExtFetch", data: message.data});
        })
      } else
        ext_api.tabs.sendMessage(sender.tab.id, {msg: "showExtFetch", data: message.data});  
    })
  }

  function sendArticleSrc(tab_id, message) {
    if (ext_manifest_version === 3 || !ext_chromium)
      ext_api.tabs.sendMessage(tab_id, {
        msg: "showExtSrc",
        data: message.data
      }).catch(err => false);
    else
      ext_api.tabs.sendMessage(tab_id, {
        msg: "showExtSrc",
        data: message.data
      });
  }
  
  // manifest v3: offscreen
  let OFFSCREEN_DOCUMENT_PATH = '/options/offscreen.html';
  async function sendMessageToOffscreenDocument(request, data) {
    if (!(await hasOffscreenDocument())) {
      await ext_api.offscreen.createDocument({
        url: OFFSCREEN_DOCUMENT_PATH,
        reasons: [ext_api.offscreen.Reason.DOM_PARSER],
        justification: 'Parse DOM'
      }).catch(err => false);
    }
    ext_api.runtime.sendMessage({request, data}).catch(err => false);
  }
  
  if (message.request === 'getExtSrc' && message.data) {
    message.data.html = '';
    function getArticleSrc(message) {
      let url_src = message.data.url_src || message.data.url;
      fetch(url_src, {headers: message.data.headers})
      .then(response => {
        if (response.ok) {
          response.text().then(html => {
            let recursive;
            if (message.data.url.startsWith('https://archive.')) {
              if (url_src.includes('/https')) {
                if (html.includes('<div class="TEXT-BLOCK"')) {
                  message.data.url_src = html.split('<div class="TEXT-BLOCK"')[1].split('</div>')[0].split('href="')[1].split('"')[0];
                  getArticleSrc(message);
                  recursive = true;
                } else
                  html = '';
              }
            }
            if (!recursive) {
              if (html) {
                if (message.data.base64) {
                  html = decode_utf8(atob(html));
                  message.data.selector_source = 'body';
                }
                if (ext_manifest_version === 2) {
                  let parser = new DOMParser();
                  let doc = parser.parseFromString(html, 'text/html');
                  let article_new = doc.querySelector(message.data.selector_source);
                  message.data.html = article_new ? article_new.outerHTML : '';
                  sendArticleSrc(sender.tab.id, message);
                } else if (ext_manifest_version === 3) {
                  message.data.html = html;
                  message.data.tab_id = sender.tab.id;
                  sendMessageToOffscreenDocument('getExtSrc_dom', message.data); // promise
                }
              } else {
                message.data.html = '';
                sendArticleSrc(sender.tab.id, message);
              }
            }
          });
        } else {
          message.data.blocked = true;
          sendArticleSrc(sender.tab.id, message);
        }
      }).catch(function (err) {
        sendArticleSrc(sender.tab.id, message);
      });
    }
    getArticleSrc(message);
  }

  // manifest v3: offscreen
  async function handleOffscreenMessages(message) {
    if (message.request === 'getExtSrc_dom_result') {
      sendArticleSrc(message.data.tab_id, message);
      closeOffscreenDocument();
    }
  }
  
  async function closeOffscreenDocument() {
    if (!(await hasOffscreenDocument()))
      return;
    await ext_api.offscreen.closeDocument().catch(err => false);
  }
  
  async function hasOffscreenDocument() {
    let matchedClients = await clients.matchAll();
    for (let client of matchedClients) {
      if (client.url.endsWith(ext_api.runtime.id + OFFSCREEN_DOCUMENT_PATH))
        return true;
    }
    return false;
  }
  
  if (message.request === 'getExtSrc_dom_result' && message.data) {
    handleOffscreenMessages(message); // promise
  }

  if (message.scheme && (![chrome_scheme, 'undefined'].includes(message.scheme) || focus_changed)) {
      let icon_path = {path: {'128': 'bypass.png'}};
      if (message.scheme === 'dark')
          icon_path = {path: {'128': 'bypass-dark.png'}};
      ext_api.action.setIcon(icon_path);
      chrome_scheme = message.scheme;
      focus_changed = false;
  }
});

// show the opt-in tab on installation
ext_api.storage.local.get(["optInShown", "customShown", "fetchShown"], function (result) {
  if (!result.optInShown || !result.customShown || (!ext_chromium && !result.fetchShown)) {
    setTimeout(function () {
    ext_api.tabs.create({
      url: "options/optin/opt-in.html"
    });
    }, 1500);
    ext_api.storage.local.set({
      "optInShown": true,
      "customShown": true,
      "fetchShown": true
    });
  }
});

function filterObject(obj, filterFn, mapFn = function (val, key) {
  return [key, val];
}) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => filterFn(val, key)).map(([key, val]) => mapFn(val, key)));
}

function compareKey(firstStr, secondStr) {
  return firstStr.toLowerCase().replace(/\s\(.*\)/, '') === secondStr.toLowerCase().replace(/\s\(.*\)/, '');
}

function isSiteEnabled(details) {
  var enabledSite = matchUrlDomain(enabledSites, details.url);
  if (!ext_name.startsWith('Bypass Paywalls Clean') || !(self_hosted || /0$/.test(ext_version)))
    enabledSite = '';
  if (enabledSite in restrictions) {
    return restrictions[enabledSite].test(details.url);
  }
  return !!enabledSite;
}

function matchDomain(domains, hostname = '') {
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

function prepHostname(hostname) {
  return hostname.replace(/^(www|m|account|amp(\d)?|edition|eu|mobil|wap)\./, '');
}

function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function stripUrl(url) {
  return url.split(/[\?#]/)[0];
}

function decode_utf8(str) {
  return decodeURIComponent(escape(str));
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

// Refresh the current tab (http)
function refreshCurrentTab() {
  ext_api.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
      if (ext_api.runtime.lastError)
        return;
      ext_api.tabs.update(tabs[0].id, {
        url: tabs[0].url
      });
    }
  });
}
