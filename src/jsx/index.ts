/// <reference path="../../node_modules/types-for-adobe/shared/PlugPlugExternalObject.ts" />
import 'extendscript-es5-shim-ts'

import { id } from '../shared'
import console from './console'

function showAlert() {
  alert(`Alert from Extendscript.\n${new Date().toString()}`);
}

console.log('Log from ExtendScript')
console.warn('Warning from ExtendScript')
console.error('Error from ExtendScript')
console.log({
  object: 'from ExtendScript'
})

function getInfo() {
  return JSON.stringify({
    id,
    name: app.name,
    version: app.version
  });
}

$.global[id] = {
  showAlert,
  getInfo
};
