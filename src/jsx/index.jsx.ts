/// <reference types="types-for-adobe/aftereffects/2018"/>

import { customAlert } from './utils'

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
