var ext_api = chrome || browser;

// Saves options to ext_api.storage
function save_options(event) {
  var inputEls = document.querySelectorAll('#bypass_sites input');
  var sites = {};
  
  var sites = Array.from(inputEls).reduce(function (memo, inputEl) {
    if (inputEl.checked) {
      memo[inputEl.dataset.key] = inputEl.dataset.value;
    }
    return memo;
  }, {});
  
  ext_api.storage.local.set({
    sites: sites
  }, function () {
    // Update status to let user know options were saved.
    if (event) {
      var status_label = document.querySelectorAll('[id^="status"]');
      for (let status of status_label) {
        status.textContent = 'Options saved.';
        setTimeout(function () {
          status.textContent = '';
        }, 800);
      }
    }
  });
}

// Restores checkbox input states using the preferences stored in ext_api.storage.
function renderOptions() {
  var labelEl;
  ext_api.storage.local.get({
    sites: {},
    sites_updated: {},
    sites_custom: {},
    sites_excluded: []
  }, function (items) {
    var sites = items.sites;
    var sites_updated = filterObject(items.sites_updated, function (val, key) {
      return !val.nofix
    });
    var sites_updated_domains_new = Object.values(sites_updated).filter(x => (x.domain && !defaultSites_domains.includes(x.domain) || x.group)).map(x => x.group ? x.group.filter(y => !defaultSites_domains.includes(y)) : x.domain).flat();
    var sites_updated_perm_domains_new = Object.values(sites_updated).filter(x => x.block_host_perm_add).map(x => x.block_host_perm_add.split(',').filter(x => x).map(x => x.trim())).flat();
    var sites_custom = items.sites_custom;
    var sites_custom_domains_new = Object.values(sites_custom).filter(x => x.domain && !defaultSites_domains.includes(x.domain)).map(x => x.group ? x.group.split(',').map(x => x.trim()) : x.domain).flat();
    var sites_custom_perm_domains_new = Object.values(sites_custom).filter(x => x.block_host_perm_add).map(x => x.block_host_perm_add.split(',').filter(x => x).map(x => x.trim())).flat();

    var perm_origins = sites_custom_domains_new.concat(sites_updated_domains_new, sites_custom_perm_domains_new, sites_updated_perm_domains_new).filter(x => !x.includes('###')).map(x => '*://*.' + x + '/*');
    var perm_custom = document.getElementById('perm-custom');
    ext_api.permissions.contains({
      origins: perm_origins
    }, function (result) {
      if (result) {
        perm_custom.innerText = '';
      } else {
        perm_custom.textContent = ">> check host (domain) permissions for custom/updated sites";
        perm_custom.style.margin = '10px';
      }
    });

    var sites_excluded = items.sites_excluded;
    var sitesEl = document.getElementById('bypass_sites');
    var site_types = {
      "updated": {
        sites: sites_updated,
        title: '* Updated (new) sites (opt-in to custom sites)',
        default_sites: false
      },
      "default": {
        sites: defaultSites,
        title: '* Default settings',
        default_sites: true
      },
      "custom": {
        sites: sites_custom,
        title: '* Custom (new) sites',
        default_sites: false
      }
    };
    for (let site_type in site_types) {
      labelEl = document.createElement('label');
      labelEl.setAttribute('style', ' font-weight: bold;');
      if (site_types[site_type].title) {
        labelEl.appendChild(document.createElement('hr'));
        labelEl.appendChild(document.createTextNode(site_types[site_type].title));
        if (site_type !== 'updated' && Object.keys(site_types[site_type].sites).length)
          labelEl.appendChild(document.createTextNode(' - #' + Object.keys(site_types[site_type].sites).length));
      }
      sitesEl.appendChild(labelEl);
      let sites_arr = site_types[site_type].sites;
      for (let key in sites_arr) {
        let domain = sites_arr[key]['domain'];
        if (!domain || (key === '###_remove_sites') || (!site_types[site_type].default_sites && (defaultSites.hasOwnProperty(key) || defaultSites_domains.includes(domain))))
          continue;
        labelEl = document.createElement('label');
        let inputEl = document.createElement('input');
        inputEl.type = 'checkbox';
        inputEl.dataset.key = key;
        inputEl.dataset.value = domain;
        inputEl.checked = Object.keys(sites).some(title => compareKey(title, key)) && !sites_excluded.includes(domain);
        if (domain !== '###') {
          labelEl.appendChild(inputEl);
        } else {
          labelEl.appendChild(document.createElement('hr'));
          labelEl.setAttribute('style', ' font-weight: bold;');
        }
        labelEl.appendChild(document.createTextNode(' ' + key));
        sitesEl.appendChild(labelEl);
      }
    }
    // excluded
    labelEl.appendChild(document.createElement('hr'));
    labelEl = document.createElement('label');
    labelEl.setAttribute('style', ' font-weight: bold;');
    labelEl.appendChild(document.createTextNode('* Excluded Sites (domain(s) ignored when checked in list)'));
    sitesEl.appendChild(labelEl);
    labelEl = document.createElement('label');
    labelEl.appendChild(document.createTextNode(sites_excluded.join()));
    sitesEl.appendChild(labelEl);
    save_options();
  });
}

function handleSearch() {
  let search = document.getElementById('search').value.toLowerCase().replace('www.', '');
  let listItems = document.querySelectorAll('#bypass_sites > label');
  grouped_sites = filterObject(grouped_sites, function (val, key) {
    return val.length
  });
  ext_api.storage.local.get({
    sites_updated: {},
    sites_custom: {}
  }, function (items) {
    let sites_updated_groups = filterObject(items.sites_updated, function (val, key) {
      return val.group
    }, function (val, key) {
      return [val.domain, val.group]
    });
    for (let site in sites_updated_groups) {
      let site_default = Object.keys(defaultSites).find(key => compareKey(key, site)) || site;
      grouped_sites[site_default] = sites_updated_groups[site];
    }
    let sites_custom_groups = filterObject(items.sites_custom, function (val, key) {
      return val.group
    }, function (val, key) {
      return [val.domain, val.group.split(',')]
    });
    for (let site in sites_custom_groups)
      grouped_sites[site] = sites_custom_groups[site];
    for (let item of listItems) {
      let itemText = item.textContent.toLowerCase();
      let itemInput = item.querySelector('input[data-value]');
      let itemDomain = itemInput ? itemInput.getAttribute('data-value') : '';
      let itemGroup = itemDomain ? grouped_sites[itemDomain] : '';
      if (itemText.includes(search) || !itemDomain || (itemDomain && (itemDomain.match(/^(###$|#options_[^d])/) || itemDomain.includes(search) || (itemGroup && itemGroup.includes(search)))))
        item.style.display = 'block';
      else
        item.style.display = 'none';
    }
    var nofix = document.getElementById('nofix');
    if (nofix_sites.includes(search)) {
      nofix.innerText = 'No (proper) fix for domain ' + search + ', but it may still be part of (imported) custom sites.';
      nofix.style.margin = '10px';
    } else
      nofix.innerText = '';
  });

  let selectButtons = document.querySelectorAll('#select-all, #select-none');
  for (let elem of selectButtons) {
    if (search == '')
      elem.style.display = 'block';
    else
      elem.style.display = 'none';
  }
}

function selectAll() {
  var inputEls = Array.from(document.querySelectorAll('input[data-key]'));
  inputEls = inputEls.filter(function (input) {
      return (!input.dataset.value.match(/^#options_(disable|optin)_/));
    });
  inputEls.forEach(function (inputEl) {
    inputEl.checked = true;
  });
  // Update status to let user know all sites are selected.
  var status = document.getElementById('status');
  status.textContent = 'All sites selected.';
  setTimeout(function () {
    status.textContent = '';
  }, 800);
}

function selectNone() {
  var inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach(function(inputEl) {
    inputEl.checked = false;
  });
}

function closeButton() {
  window.close();
}

function check_sites_updated() {
  ext_api.runtime.sendMessage({request: 'check_sites_updated'});
  location.reload();
}

function clear_sites_updated() {
  ext_api.runtime.sendMessage({request: 'clear_sites_updated'});
  location.reload();
}

function compareKey(firstStr, secondStr) {
  return firstStr.toLowerCase().replace(/\s\(.*\)/, '') === secondStr.toLowerCase().replace(/\s\(.*\)/, '');
}

function filterObject(obj, filterFn, mapFn = function (val, key) {
  return [key, val];
}) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => filterFn(val, key)).map(([key, val]) => mapFn(val, key)));
}

document.addEventListener('DOMContentLoaded', renderOptions);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('save_top').addEventListener('click', save_options);
document.getElementById('select-all').addEventListener('click', selectAll);
document.getElementById('select-none').addEventListener('click', selectNone);
document.getElementById('button-close').addEventListener('click', closeButton);
document.getElementById('check_sites_updated').addEventListener('click', check_sites_updated);
document.getElementById('clear_sites_updated').addEventListener('click', clear_sites_updated);
document.getElementById('search').addEventListener('input', handleSearch);
