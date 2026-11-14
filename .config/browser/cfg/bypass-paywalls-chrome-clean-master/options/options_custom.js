var ext_api = chrome || browser;
var manifestData = ext_api.runtime.getManifest();
var navigator_ua = navigator.userAgent;
var navigator_ua_mobile = navigator_ua.toLowerCase().includes('mobile');
var custom_switch = ((manifestData.optional_permissions && manifestData.optional_permissions.length) || (manifestData.optional_host_permissions && manifestData.optional_host_permissions.length));

var useragent_options = ['', 'googlebot', 'bingbot', 'facebookbot'];
var referer_options = ['', 'facebook', 'google', 'twitter'];
var random_ip_options = ['', 'all', 'eu'];
var add_ext_link_type_options = ['', 'archive.is', 'google_search_tool'];

function capitalize(str) {
  return (typeof str === 'string') ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function sortJson(json) {
  return Object.keys(json)
  .sort().reduce(function (Obj, key) {
    Obj[key] = json[key];
    return Obj;
  }, {});
}

function filterObject(obj, filterFn, mapFn = function (val, key) {
  return [key, val];
}) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => filterFn(val, key)).map(([key, val]) => mapFn(val, key)));
}

// Saves options to ext_api.storage
function save_options() {
  var textareaEl = document.querySelector('#bypass_sites textarea');
  var sites_custom = {};
  if (textareaEl.value) {
    var sites_custom = JSON.parse(textareaEl.value);
    sites_custom = filterObject(sites_custom, function (val, key) {
      return !(val.add_ext_link && !val.add_ext_link_type)
    });
  }
  ext_api.storage.local.set({
    sites_custom: sites_custom
  }, function () {
    // Update status to let user know custom sites were saved.
    var status = document.getElementById('status');
    status.textContent = 'Custom sites saved.';
    setTimeout(function () {
      status.textContent = '';
      location.href = 'options.html';
      //window.close();
    }, 800);
  });
}

// Sort json by key in textarea
function sort_options() {
  var textareaEl = document.querySelector('#bypass_sites textarea');
  var sites_custom = {};
  if (textareaEl.value) {
    var sites_custom = JSON.parse(textareaEl.value);
    var sites_custom_sorted = sortJson(sites_custom);
    textareaEl.value = JSON.stringify(sites_custom_sorted);
  }
}

// Export custom sites to file
function export_options() {
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    var result = JSON.stringify(items.sites_custom);
    var a = document.createElement("a");
    var file = new Blob([result], {type: "text/plain"});
    a.href = window.URL.createObjectURL(file);
    let date = new Date();
    let dateStr = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    a.download = 'bypass_paywalls_clean_custom_' + dateStr + '.txt';
    a.click();
  });
}

function import_json(result) {
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    var sites_custom = items.sites_custom;
    var sites_custom_new = JSON.parse(result);
    var customSitesExt_remove = [];
    if (sites_custom_new['###_remove_sites'] && sites_custom_new['###_remove_sites'].cs_code)
      customSitesExt_remove = sites_custom_new['###_remove_sites'].cs_code.split(/,\s*/);
    for (let site in sites_custom_new) {
      let customSite_diff = Object.keys(sites_custom).find(key => sites_custom[key].domain === sites_custom_new[site].domain && key !== site);
      if (customSite_diff)
        delete sites_custom[customSite_diff];
      if (sites_custom_new[site].group) {
        let group = sites_custom_new[site].group;
        let customSites_group = Object.keys(sites_custom).filter(key => group.split(',').includes(sites_custom[key].domain));
        for (let key of customSites_group)
          delete sites_custom[key];
      }
      sites_custom[site] = sites_custom_new[site];
    }
    sites_custom = filterObject(sites_custom, function (val, key) {
      return val.domain && !(customSitesExt_remove.includes(val.domain) || (val.add_ext_link && !val.add_ext_link_type))
    });
    ext_api.storage.local.set({
      sites_custom: sortJson(sites_custom)
    }, function () {
      // Update status to let user know custom sites were imported.
      var status = document.getElementById('status');
      status.textContent = 'Custom sites imported.';
      setTimeout(function () {
        //status.textContent = '';
        importInput.value = '';
        renderOptions();
      }, 800);
    });
  });
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Import custom sites from local/online
function import_url_options(e, online) {
  let url = '/custom/sites_custom.json';
  if (online)
    url = 'https://gitflic.ru/project/magnolia1234/bpc_updates/blob/raw?file=sites_custom.json';
  try {
    fetch(url)
    .then(response => {
      if (response.ok) {
        response.text().then(result => {
          import_json(result);
        })
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// Import custom sites from file
function import_options(e) {
  var files = e.target.files;
  var reader = new FileReader();
  reader.onload = _imp;
  reader.readAsText(files[0]);
}

function _imp() {
  var result = this.result;
  import_json(result);
}

// Add custom site to ext_api.storage
function add_options() {
  var inputEls = document.querySelectorAll('#add_site input, #add_site select, #add_site textarea');
  var sites_custom = {};
  
  for (let elem of inputEls) {
    if (elem.dataset.key === 'title') {
      var title = capitalize(elem.value);
      if (!title)
        break;
      sites_custom[title] = {};
    } else {
      if (elem.dataset.value) {
        if (elem.checked)
          sites_custom[title][elem.dataset.key] = parseInt(elem.dataset.value);
      } else if (elem.value) {
        if (['block_host_perm_add', 'group'].includes(elem.dataset.key))
          elem.value = elem.value.replace(/,{2,}/g, ',').replace(/(\s|www\.|,$)/g, '');
        sites_custom[title][elem.dataset.key] = elem.value;
      }
    }
  }
  
  if (title && sites_custom[title]['domain']) {
    sites_custom[title]['domain'] = sites_custom[title]['domain'].replace(/(http(s)?:\/\/|\/$)/g, '').replace(/^(www|amp(html)?|m|wap)(\d)?\./, '').toLowerCase();
    
    // add new site to local storage
    ext_api.storage.local.get({
      sites_custom: {}
    }, function (items) {
      var sites_custom_old = items.sites_custom;
      
      for (var key in sites_custom) {
        sites_custom_old[key] = sites_custom[key];
      }
      
      ext_api.storage.local.set({
        sites_custom: sites_custom_old
      }, function () {
        // Update status to let user know new custom site was added.
        var status_add = document.getElementById('status_add');
        status_add.textContent = 'Site added.';
        setTimeout(function () {
          //status.textContent = '';
          renderOptions();
        }, 800);
      });
    });
  }
}

// Delete custom site from ext_api.storage
function delete_options() {
  var selectEl = document.querySelector('#custom_sites select');
  var sites_custom = {};
  var remove_key = selectEl.value;
  if (!remove_key)
    return false;
  
  // delete site from local storage
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    var sites_custom_old = items.sites_custom;
    delete sites_custom_old[remove_key];
    
    ext_api.storage.local.set({
      sites_custom: sites_custom_old
    }, function () {
      // Update status to let user know custom site was deleted.
      var status_delete = document.getElementById('status_delete');
      status_delete.textContent = 'Site deleted.';
      setTimeout(function () {
        //status.textContent = '';
        renderOptions();
      }, 800);
    });
  });
}

// Delete custom (& default) sites from ext_api.storage
function delete_default_options() {
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    sites_custom = filterObject(items.sites_custom, function (val, key) {
      return !defaultSites_domains.includes(val.domain);
    });
    
    ext_api.storage.local.set({
      sites_custom: sites_custom
    }, function () {
      // Update status to let user know custom & default sites were deleted.
      var status_delete = document.getElementById('status_delete');
      status_delete.textContent = 'Default sites deleted.';
      setTimeout(function () {
        //status.textContent = '';
        renderOptions();
      }, 800);
    });
  });
}

// Edit custom site (copy to add)
function edit_options() {
  var selectEl = document.querySelector('#custom_sites select');
  var sites_custom = {};
  var title = selectEl.value;
  if (!title)
    return false;
  
  // copy site to add-fields
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    sites_custom = items.sites_custom;
    var edit_site = sites_custom[title];
    document.querySelector('input[data-key="title"]').value = title;
    document.querySelector('input[data-key="domain"]').value = edit_site.domain;
    document.querySelector('textarea[data-key="group"]').value = edit_site.group || '';
    document.querySelector('input[data-key="allow_cookies"]').checked = (edit_site.allow_cookies > 0);
    document.querySelector('input[data-key="remove_cookies"]').checked = (edit_site.remove_cookies > 0);
    document.querySelector('input[data-key="cs_clear_lclstrg"]').checked = (edit_site.cs_clear_lclstrg > 0);
    document.querySelector('select[data-key="useragent"]').selectedIndex = useragent_options.indexOf(edit_site.useragent);
    document.querySelector('textarea[data-key="useragent_custom"]').value = edit_site.useragent_custom || '';
    document.querySelector('select[data-key="referer"]').selectedIndex = referer_options.indexOf(edit_site.referer);
    document.querySelector('textarea[data-key="referer_custom"]').value = edit_site.referer_custom || '';
    document.querySelector('select[data-key="random_ip"]').selectedIndex = random_ip_options.indexOf(edit_site.random_ip);
    document.querySelector('input[data-key="block_js"]').checked = (edit_site.block_js > 0);
    document.querySelector('input[data-key="block_js_ext"]').checked = (edit_site.block_js_ext > 0);
    document.querySelector('input[data-key="block_js_inline"]').value = edit_site.block_js_inline || '';
    document.querySelector('input[data-key="block_regex"]').value = edit_site.block_regex || '';
    document.querySelector('input[data-key="block_regex_ignore_default"]').checked = (edit_site.block_regex_ignore_default > 0 || edit_site.block_regex_ignore_default > 0);
    document.querySelector('input[data-key="block_host_perm_add"]').value = edit_site.block_host_perm_add || '';
    document.querySelector('input[data-key="amp_unhide"]').checked = (edit_site.amp_unhide > 0);
    document.querySelector('input[data-key="amp_redirect"]').value = edit_site.amp_redirect || '';
    document.querySelector('input[data-key="ld_json"]').value = edit_site.ld_json || '';
    document.querySelector('input[data-key="ld_json_next"]').value = edit_site.ld_json_next || '';
    document.querySelector('input[data-key="ld_json_source"]').value = edit_site.ld_json_source || '';
    document.querySelector('input[data-key="ld_json_url"]').value = edit_site.ld_json_url || '';
    document.querySelector('input[data-key="ld_archive_is"]').value = edit_site.ld_archive_is || '';
    document.querySelector('input[data-key="add_ext_link"]').value = edit_site.add_ext_link || '';
    document.querySelector('select[data-key="add_ext_link_type"]').selectedIndex = add_ext_link_type_options.indexOf(edit_site.add_ext_link_type);
    document.querySelector('input[data-key="cs_block"]').checked = (edit_site.cs_block > 0);
    document.querySelector('textarea[data-key="cs_code"]').value = edit_site.cs_code || '';
  });
}

// request permissions for custom sites (in list only)
function request_permissions() {
  var perm_custom = document.getElementById('perm-custom');
  ext_api.permissions.request({
    origins: perm_origins
  }, function (granted) {
    if (granted) {
      perm_custom.innerText = 'YES';
    } else {
      perm_custom.innerText = 'NO';
    }
  });
}

// remove permissions for custom sites
function remove_permissions() {
  var perm_custom = document.getElementById('perm-custom');
  ext_api.permissions.remove({
    origins: perm_origins
  }, function (removed) {
    if (removed) {
      perm_custom.innerText = 'NO';
    }
  });
}

var perm_origins;
// Restores checkbox input states using the preferences stored in ext_api.storage.
function renderOptions() {
  ext_api.storage.local.get({
    sites_custom: {},
    sites_updated: {},
    sites_custom_upd_version: ''
  }, function (items) {
    var sites_custom = sortJson(items.sites_custom);
    var sites_custom_domains_new = Object.values(sites_custom).filter(x => x.domain && !defaultSites_domains.includes(x.domain)).map(x => x.group ? x.group.split(',').filter(x => x).map(x => x.trim()) : x.domain).flat();
    var sites_custom_perm_domains_new = Object.values(sites_custom).filter(x => x.block_host_perm_add).map(x => x.block_host_perm_add.split(',').filter(x => x).map(x => x.trim())).flat();
    var sites_updated = filterObject(items.sites_updated, function (val, key) {
      return !val.nofix
    });
    var sites_updated_domains_new = Object.values(sites_updated).filter(x => (x.domain && !defaultSites_domains.includes(x.domain) || x.group)).map(x => x.group ? x.group.filter(y => !defaultSites_domains.includes(y)) : x.domain).flat();
    var sites_updated_perm_domains_new = Object.values(sites_updated).filter(x => x.block_host_perm_add).map(x => x.block_host_perm_add.split(',').filter(x => x).map(x => x.trim())).flat();
    var sitesEl = document.getElementById('bypass_sites');
    sitesEl.innerHTML = '';
    var labelEl = document.createElement('label');
    var textareaEl = document.createElement('textarea');
    textareaEl.value = JSON.stringify(sites_custom);
    textareaEl.rows = 12;
    textareaEl.cols = 40;
    labelEl.appendChild(textareaEl);
    sitesEl.appendChild(labelEl);
    
    // add site
    var add_sitesEl = document.getElementById('add_site');
    add_sitesEl.innerHTML = '';
    var inputEl;
    var add_checkboxes = {
      'title': 0,
      'domain': 0,
      'group': 0,
      'allow_cookies': 1,
      'remove_cookies': 1,
      'cs_clear_lclstrg (clear localStorage)': 1,
      'useragent': 0,
      'useragent_custom': 0,
      'referer': 0,
      'referer_custom': 0,
      'random_ip': 0,
      'block_js (domain)': 1,
      'block_js_ext': 1,
      'block_js_inline': 0,
      'block_regex (add to default)': 0,
      'block_regex_ignore_default': 1,
      'block_host_perm_add': 0,
      'amp_unhide': 1,
      'amp_redirect': 0,
      'ld_json': 0,
      'ld_json_next': 0,
      'ld_json_source': 0,
      'ld_json_url': 0,
      'ld_archive_is': 0,
      'add_ext_link': 0,
      'add_ext_link_type': 0,
      'cs_block (no default cs)': 1,
      'cs_code': 0,
    };
    var add_options = {
      useragent: useragent_options,
      referer: referer_options,
      random_ip: random_ip_options,
      add_ext_link_type: add_ext_link_type_options
    };
    for (var key in add_checkboxes) {
      if (add_checkboxes[key]) {
        inputEl = document.createElement('input');
        inputEl.type = 'checkbox';
        inputEl.dataset.value = 1;
      } else {
        if (add_options[key]) {
          inputEl = document.createElement('select');
          for (let elem of add_options[key]) {
            let option = document.createElement("option");
            option.value = elem;
            option.text = elem;
            inputEl.appendChild(option);
          }
        } else {
          if (!['cs_code', 'group', 'referer_custom', 'useragent_custom'].includes(key)) {
            inputEl = document.createElement('input');
            inputEl.size = 35;
          } else {
            inputEl = document.createElement('textarea');
            inputEl.rows = 5;
            inputEl.cols = 35;
          }
          let placeholders = {
            title: 'Example',
            domain: 'example.com',
            group: 'example1.com,example2.com',
            block_js_inline: '\\.example\\.com\\/article\\/',
            block_regex: '\\.example\\.com\\/js\\/',
            block_host_perm_add: 'example1.com,example2.com',
            amp_redirect: 'div.paywall|amp_url',
            ld_json: 'div.paywall|div.article',
            ld_json_next: 'div.paywall|div.article',
            ld_json_source: 'div.paywall|div.article|filter|json_key',
            ld_json_url: 'div.paywall|div.article',
            ld_archive_is: 'div.paywall|div.art|div.art_src|div.art_link',
            add_ext_link: 'div.paywall|div.article',
            cs_code: 'for dev: check imported examples',
          };
          if (placeholders[key])
            inputEl.placeholder = placeholders[key];
        }
      }
      labelEl = document.createElement('label');
      labelEl.style = 'margin: 2px 0px;';
      inputEl.dataset.key = key.split(' (')[0];
      labelEl.appendChild(inputEl);
      labelEl.appendChild(document.createTextNode(' ' + key));
      add_sitesEl.appendChild(labelEl);
    }
    
    // list of custom sites
    var custom_sitesEl = document.getElementById('custom_sites');
    custom_sitesEl.innerHTML = '';
    labelEl = document.createElement('label');
    var selectEl = document.createElement('select');
    selectEl.id = 'sites';
    selectEl.size = 6;
    var optionEl;
    
    for (let key in sites_custom) {
      optionEl = document.createElement('option');
      let domain = sites_custom[key]['domain'];
      let group = sites_custom[key]['group'];
      
      let isDefaultSite = defaultSites_domains.includes(domain);
      optionEl.text = isDefaultSite ? '*' : '';
      optionEl.text += key;
      if (!navigator_ua_mobile) {
        optionEl.text += ': ' + domain +
        (sites_custom[key]['allow_cookies'] > 0 ? ' | allow_cookies' : '') +
        (sites_custom[key]['remove_cookies'] > 0 ? ' | remove_cookies' : '') +
        (sites_custom[key]['cs_clear_lclstrg'] > 0 ? ' | cs_clear_lclstrg' : '') +
        (sites_custom[key]['useragent'] ? ' | useragent: ' + sites_custom[key]['useragent'] : '') +
        (sites_custom[key]['useragent_custom'] ? ' | useragent_custom' : '') +
        (sites_custom[key]['googlebot'] > 0 ? ' | googlebot' : '') +
        (sites_custom[key]['referer'] ? ' | referer: ' + sites_custom[key]['referer'] : '') +
        (sites_custom[key]['referer_custom'] ? ' | referer_custom' : '') +
        (sites_custom[key]['random_ip'] ? ' | random_ip: ' + sites_custom[key]['random_ip'] : '') +
        ((sites_custom[key]['block_js'] > 0) ? ' | block_js' : '') +
        ((sites_custom[key]['block_js_ext'] > 0) ? ' | block_js_ext' : '') +
        (sites_custom[key]['block_js_inline'] ? ' | block_js_inline' : '') +
        (sites_custom[key]['block_regex'] ? ' | block_regex' : '') +
        (sites_custom[key]['amp_unhide'] > 0 ? ' | amp_unhide' : '') +
        (sites_custom[key]['amp_redirect'] ? ' | amp_redirect' : '') +
        (sites_custom[key]['ld_json'] ? ' | ld_json' : '') +
        (sites_custom[key]['ld_json_next'] ? ' | ld_json_next' : '') +
        (sites_custom[key]['ld_json_source'] ? ' | ld_json_source' : '') +
        (sites_custom[key]['ld_json_url'] ? ' | ld_json_url' : '') +
        (sites_custom[key]['ld_archive_is'] ? ' | ld_archive_is' : '') +
        (sites_custom[key]['add_ext_link'] && sites_custom[key]['add_ext_link_type'] ? ' | add_ext_link' : '') +
        (sites_custom[key]['cs_code'] ? ' | cs_code' : '');
      }
      optionEl.value = key;
      selectEl.add(optionEl);
    }
    labelEl.appendChild(selectEl);
    custom_sitesEl.appendChild(labelEl);
    
    if (sites_updated_domains_new.length > 0) {
      labelEl = document.createElement('p');
      labelEl.appendChild(document.createElement('label'));
      labelEl.appendChild(document.createTextNode('Updated sites: ' + sites_updated_domains_new.concat(sites_updated_perm_domains_new).join(', ')));
      custom_sitesEl.appendChild(labelEl);
    }
    
    perm_origins = sites_custom_domains_new.concat(sites_updated_domains_new, sites_custom_perm_domains_new, sites_updated_perm_domains_new).filter(x => !x.includes('###')).map(x => '*://*.' + x + '/*');
    var perm_custom = document.getElementById('perm-custom');
    ext_api.permissions.contains({
      origins: perm_origins
    }, function (result) {
      if (result) {
        perm_custom.innerText = 'YES';
      } else {
        perm_custom.innerText = 'NO';
      }
    });

    var sites_custom_upd_version = items.sites_custom_upd_version;
    if (sites_custom['###_remove_sites'] && sites_custom['###_remove_sites'].cs_code) {
      let custom_version = '';
      let match = sites_custom['###_remove_sites'].cs_code.split(/,\s*/).filter(x => x.match(/^###_custom_/));
      if (match.length)
        custom_version = match[0].replace('###_custom_', '');
      if (custom_version < sites_custom_upd_version) {
        var custom_update = document.getElementById('custom-update');
        custom_update.style = 'font-weight: bold; color: red; margin: 20px 0px;';
        custom_update.innerText = 'Custom sites updated (import from local/online)!\r\n';
      }
    }
  });
  
  var custom_enabled = document.getElementById('custom-enabled');
  ext_api.permissions.contains({
    origins: ["*://*/*"]
  }, function (result) {
    if (result) {
      custom_enabled.innerText = 'YES';
    } else {
      custom_enabled.innerText = 'NO';
    }
  });
}

function handleSearch() {
  let search = document.getElementById('search').value.toLowerCase().replace('www.', '');
  let listItems = document.querySelectorAll('select#sites > option');
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    let sites_custom = items.sites_custom;
    let grouped_sites = filterObject(sites_custom, function (val, key) {
      return val.group
    }, function (val, key) {
      return [val.domain, val.group.split(',')]
    });
    for (let item of listItems) {
      let itemDomain = sites_custom[item.value].domain;
      let itemText = item.value.toLowerCase();
      let itemGroup = itemDomain ? grouped_sites[itemDomain] : '';
      if (itemText.includes(search) || (itemDomain.includes(search) || (itemGroup && itemGroup.includes(search))))
        item.style.display = 'block';
      else
        item.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', renderOptions);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('sort').addEventListener('click', sort_options);
document.getElementById('export').addEventListener('click', export_options);
document.getElementById('import').onclick = function () {importInput.click()}
document.getElementById('importInput').addEventListener("change", import_options, false);
document.getElementById('import_local').addEventListener('click', e => import_url_options(e, false));
document.getElementById('import_online').addEventListener('click', e => import_url_options(e, true));
document.getElementById('add').addEventListener('click', add_options);
document.getElementById('delete').addEventListener('click', delete_options);
document.getElementById('delete_default').addEventListener('click', delete_default_options);
document.getElementById('edit').addEventListener('click', edit_options);
document.getElementById('search').addEventListener('input', handleSearch);
if (custom_switch) {
  document.getElementById('perm_request').addEventListener('click', request_permissions);
  document.getElementById('perm_remove').addEventListener('click', remove_permissions);
}
