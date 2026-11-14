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

// util functions used in multiple; script files

'use strict';

import { i18n$ } from '../i18n.js';
import uDom from './uDom.js';

/**************************** exports *********************************/

// targets on these domains are never internal (may need to be regex)
export const internalLinkDomainsDefault = ['google.com', 'asiaxpat.com', 'nytimes.com',
'columbiagreenemedia.com', '163.com', 'sohu.com', 'zol.com.cn', 'baidu.com',
'yahoo.com', 'facebook.com', 'youtube.com', 'flashback.org',
"amazon.ae","amazon.ca","amazon.cn","amazon.co.jp","amazon.co.uk","amazon.com","amazon.com.au","amazon.com.be","amazon.com.br","amazon.com.mx","amazon.com.tr","amazon.de","amazon.eg","amazon.es","amazon.fr","amazon.in","amazon.it","amazon.nl","amazon.pl","amazon.sa","amazon.se","amazon.sg",
];

export const makeCloneable = function (notes) {
  notes && notes.forEach(function (n) { delete n.func }); // remove func to allow clone
  // see https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
};

export const isFirefox = function() { // hack for webextensions incompatibilities
  return navigator && navigator.userAgent &&
    navigator.userAgent.includes('Firefox/');
}

export const isMobile = function() {
  return typeof window.NativeWindow !== 'undefined';
}

// from: http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
export const b64toBlob = function (b64Data, contentType, sliceSize) {

  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(b64Data), byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {

    const slice = byteCharacters.slice(offset, offset + sliceSize), byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: contentType });
};

export const toBase64Image = function (img) {

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  // Copy the image contents to the canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  try {

    const dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

  } catch (err) {

    log(err);
    return '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';
  }
};

export const rand = function (min, max) {
  if (arguments.length == 1) {
    max = min;
    min = 0;
  } else if (!arguments.length) {
    max = 1;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

export const setCost = function (numVisited) {
  var costPerClick = 0
  vAPI.messaging.send('dashboard', {what:'getCostPerClick'}).then(response => {
    costPerClick = response
    const $west = uDom('#worth-estimate'), $cost = uDom('.cost');
  
    if (numVisited > 0) {
      $cost.removeClass('hidden');
      $west.text('= $' + (numVisited * costPerClick).toFixed(2));
    } else {
      $cost.addClass('hidden');
    }
  });
};

export const arrayRemove = function (arr, obj) {
  const i = arr.indexOf(obj);
  if (i != -1) {
    arr.splice(i, 1);
    return true;
  }
  return false;
};

export const trimChar = function (s, chr) {
  while (s.endsWith(chr)) {
    s = s.substring(0, s.length - chr.length);
  }
  return s;
};

export const showVaultAlert = function (msg) {
  if (msg) {
    $("#alert-vault").removeClass('hide');
    $("#alert-vault p").text(msg);
  } else {
    $("#alert-vault").addClass('hide');
  }
};

export const type = function (obj) { // from Angus Croll
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
};

export const getExportFileName = function () {
  return i18n$('adnExportedAdsFilename')
    .replace('{{datetime}}', new Date().toLocaleString())
    .replace(/[:/,]+/g, '.').replace(/ +/g, '');
};

export const computeHash = function (ad, privateAd) {
  // DO NOT MODIFY

  if (!ad) return;

  if (!ad.contentData || !ad.pageUrl) {
    console.error("Invalid Ad: no contentData || pageUrl", ad);
    return;
  }

  let // change from pageUrl (4/3/16) ***
    hash = ad.pageDomain || ad.pageUrl;

  const // fall back to pageUrl if no pageDomain, for backward compatibility
    keys = Object.keys(ad.contentData).sort();

  for (let i = 0; i < keys.length; i++) {
    // fix to #445  (10/7/16)
    if (keys[i] != 'width' && keys[i] != 'height')
      hash += '::' + ad.contentData[keys[i]];
  }

  if (privateAd) hash += "private";
  return YaMD5.hashStr(hash);
};

export const byField = function (prop) {

  let sortOrder = 1;

  if (prop[0] === "-") {
    sortOrder = -1;
    prop = prop.substr(1);
  }

  return function (a, b) {
    const result = (a[prop] < b[prop]) ? -1 : (a[prop] > b[prop]) ? 1 : 0;
    return result * sortOrder;
  };
};

/************************ URL utils *****************************/

export const parseHostname = function (url) {

  return new URL(url).hostname;
};

// TODO: replace with core::domainFromURI?
export const parseDomain = function (url, useLast) { // dup in parser.js

  const domains = decodeURIComponent(url).match(/https?:\/\/[^?\/]+/g);

  return (domains && domains.length > 0) ? new URL(
    useLast ? domains[domains.length - 1] : domains[0])
    .hostname : undefined;
};

export const isValidDomain = function (v) { // dup in parser.js

  // from: https://github.com/miguelmota/is-valid-domain/blob/master/is-valid-domain.js
  const re = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi;
  return v ? re.test(v) : false;
};

/*
 * Start with resolvedTargetUrl if available, else use targetUrl
 * Then extract the last domain from the (possibly complex) url
 */
export const targetDomain = function (ad) {

  const dom = parseDomain(ad.resolvedTargetUrl || ad.targetUrl, true);

  if (!dom) console.warn("Unable to parse domain: " + ad.targetUrl);

  return dom;
};

/*** functions used to export/import/clear ads in vault.js and options.js ***/

export const exportToFile = function (action) {

  const outputData = function (jsonData, fileType) {
    let filename = getExportFileName();
    const url = URL.createObjectURL(new Blob([jsonData], { type: "text/plain" }));

    if (fileType === undefined) fileType = "Ads";
    filename = "AdNauseam_" + fileType + filename.substr(9, filename.length);

    vAPI.download({
      'url': url,
      'filename': filename
    });
  };

  switch (action) {
    case 'backupUserData':
      Promise.resolve(
        vAPI.messaging.send('dashboard', {
          what: 'backupUserData'
        }),
      ).then(response => {
        outputData(JSON.stringify(response.userData, null, '  '), "Settings_and_Ads");
      });
      break;
    case 'exportSettings':
      Promise.resolve(
        vAPI.messaging.send('dashboard', {
          what: 'backupUserData'
        }),
      ).then(response => {
        delete response.userData.userSettings.admap
        outputData(JSON.stringify(response.userData, null, '  '), "Settings");
      });
      break;
    default:
      vAPI.messaging.send('adnauseam', {
        what: "exportAds",
        includeImages: false
      }).then(data => {
        outputData(data);
      })
  }
};

// loading while ads are being imported #1877
export const toogleVaultLoading = function(show) {
  console.log("toogleVaultLoading")
  var $container = $("#container")
  if (show) {
    $container.css('opacity', '0');
    $('#loading-img').show();
    showVaultAlert(false)
  } else {
    $container.css('opacity', '1');
    $('#loading-img').hide();
  }
}

export const handleImportAds = function(evt) {

  const files = evt.target.files;

  const reader = new FileReader();

  console.log("[Adn] handleImportAds!")

  reader.onload = function (e) {

    toogleVaultLoading(true)

    let adData;
    try {
      const data = JSON.parse(e.target.result);
      adData = data.userSettings ? data.userSettings.admap : data;

      if (adData === undefined && data.userSettings && data.timeStamp) {
        toogleVaultLoading(false)
        window.alert(i18n$('adnImportAlertFormat'));
        return;
      }

    } catch (e) {
      toogleVaultLoading(false)
      postImportAlert({
        count: -1,
        error: e
      });
      return;
    }

    adsOnLoadHandler(adData, files[0].name);
  }

  reader.readAsText(files[0]);
}

export const adsOnLoadHandler = function (adData, file) {
  vAPI.messaging.send('adnauseam', {
    what: 'importAds',
    data: adData,
    file: file
  }).then(data => {
    toogleVaultLoading(false)
    postImportAlert(data);
  })
}

export const postImportAlert = function (msg) {

  const text = msg.count > -1 ? msg.count : (msg.error ? msg.error + ";" : "") + " 0";
  window.alert(i18n$('adnImportAlert')
    .replace('{{count}}', text));
};

export const clearAds = function () {

  const msg = i18n$('adnClearConfirm');
  const proceed = window.confirm(msg); // changed from vAPI.confirm merge1.14.12
  if (proceed) {
    vAPI.messaging.send('adnauseam', { what: 'clearAds' });
  }
};

export const purgeDeadAds = function (deadAds, callback) {
  const msg = i18n$('adnPurgeConfirm');
  const proceed = window.confirm(msg); // changed from vAPI.confirm merge1.14.12
  if (proceed) {
    vAPI.messaging.send('adnauseam', {
      what: 'purgeDeadAds',
      'deadAds': deadAds
    }).then(data => {
      callback(data);
    });
  }
};

export const openPage = function(url) {
  vAPI.messaging.send(
    'default', {
    what: 'gotoURL',
    details: {
      url: url,
      select: true,
      index: -1
    }
  });
}

// check if current i18n language uses the latin alphabet
export const isNonLatin = function() {
  return /[^\u0000-\u00ff]/.test(i18n$('adnAboutPageName'));
}

// check if current i18n language is cyrilic (ru, uk, bg, sr, mk)
export const isCyrillic = function() {
  return /[а-яА-Я]/.test(i18n$('adnAboutPageName'));
}

/******************************************************************************/

export const startImportFilePicker = function() {
  const input = document.getElementById('importFilePicker');
  // Reset to empty string, this will ensure an change event is properly
  // triggered if the user pick a file, even if it is the same as the last
  // one picked.
  input.value = '';
  input.click();
};

/********* decode html entities in ads titles in vault and menu *********/

export const decodeEntities = (function () {
  //from here: http://stackoverflow.com/a/9609450
  // this prevents any overhead from creating the object each time
  const element = document.createElement('div');
  function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }
    return str;
  }
  return decodeHTMLEntities;
})();



/********* advault capture feature  *********/

export async function generateCaptureSvg (jsonData, currentZoom, $loaded, $total) {
  // create hidden div to hold the SVG
  const output = document.createElement('div');
  output.style.display = 'none';
  const svgContent = await generateSVG(jsonData, currentZoom, $loaded, $total);
  output.innerHTML = svgContent;
  // Make the SVG downloadable
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });  
  const url = URL.createObjectURL(blob);
  return url;
}

export async function fetchImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Handle CORS
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const base64 = canvas.toDataURL('image/png'); // Convert to PNG format
      resolve(base64);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

export async function generateSVG(json, currentZoom, $loaded, $total) {
  if (!json.ads || !Array.isArray(json.ads)) {
    throw new Error('Invalid JSON structure. Expected an "ads" array.');
  }

  const svgHeader = `<svg xmlns="http://www.w3.org/2000/svg" width="${window.innerWidth}" height="${window.innerHeight}" viewBox="0 0 ${window.innerWidth} ${window.innerHeight}">\n`;
  const svgFooter = `</svg>`;

  console.log("Adn Capture: Total images", json.ads.length);
  var imageCounter = 0;
  $total.parent().show();
  $total.text(json.ads.length);
  // Fetch and encode all image URLs to Base64
  const images = await Promise.all(
    json.ads.map(async (ad) => {
      let src = ad.src;
      if (src.startsWith('http')) {
        src = await fetchImageAsBase64(src);
      }
      //console.log("Parsed image", ad);
      imageCounter++
      console.log("Adn Capture: Image", imageCounter, "of", json.ads.length);
      $loaded.text(imageCounter);
      let x = ad.pos.x*currentZoom + window.innerWidth/2;
      let y = ad.pos.y*currentZoom + window.innerHeight/2;
      let w = ad.width*currentZoom;
      let h = ad.height*currentZoom;
      return `<image href="${src}" x="${x}" y="${y}" height="${h}" width="${w}" />`;
    })
  );

  return `${svgHeader}${images.join('\n')}\n${svgFooter}`;
}