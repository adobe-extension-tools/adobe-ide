/// <reference types="types-for-adobe/aftereffects/2018"/>

import { customAlert } from './utils'
// import * as pino from 'pino'
// console.log(pino)

function test() {
  customAlert(`${Date.now()}`)
  return JSON.stringify({ foo: 'bar' })
}

function getInfo() {
  return JSON.stringify({
    name: app.name,
    version: app.version,
  })
}

$.global['com.fusepilot.test'] = {
  test,
  getInfo,
}
