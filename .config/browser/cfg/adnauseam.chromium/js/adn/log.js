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

/* Adnauseam Log API */

'use strict';

import µb from '../background.js';

const log = function () {
  if (µb.userSettings.eventLogging) {
    console.log.apply(console, arguments);
  }
  return true;
}

const warn = function () {
  if (µb.userSettings.eventLogging)
    console.warn.apply(console, arguments);
  return false;
}

const err = function () {
  console.error.apply(console, arguments);
  return false;
}

const logNetAllow = function () { // local only?

  const args = Array.prototype.slice.call(arguments);
  args.unshift('[ALLOW]')
  logNetEvent.apply(this, args);
};

const logNetBlock = function () {

  const args = Array.prototype.slice.call(arguments);
  args.unshift('[BLOCK]');
  logNetEvent.apply(this, args);
};

const logNetEvent = function () {

  if (µb.userSettings.eventLogging && arguments.length) {
    const args = Array.prototype.slice.call(arguments);
    const action = args.shift();
    args[0] = action + ' (' + args[0] + ')';
    log.apply(this, args);
  }
}

const logRedirect = function (fctxt, msg) {
  fctxt && log('[REDIRECT] ' + fctxt.url + ' => '
    + fctxt.redirectURL + (msg ? ' (' + msg + ')' : ''));
};

export {
  log, 
  warn, 
  err, 
  logNetAllow,
  logNetBlock,
  logNetEvent,
  logRedirect
}