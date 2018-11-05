import 'extendscript-es5-shim-ts'

import console from './console'

interface Process {
  env: {
    [key: string]: string | undefined
  }
}

declare const process: Process

function showAlert() {
  alert(`Alert from Extendscript.\n${new Date().toString()}`);
}

console.log('Log from ExtendScript')
console.warn('Warning from ExtendScript')
console.error('Error from ExtendScript')
console.log({
  object: 'from ExtendScript',
  bundleName: process.env.BUNDLE_NAME
})

function getInfo() {
  return JSON.stringify({
    version: app.version
  });
}

$.global[process.env.BUNDLE_ID!] = {
  showAlert,
  getInfo
};
