/// <reference types="types-for-adobe/aftereffects/2018"/>

import { id } from '../shared'

function showAlert() {
  alert(`${Date.now()}`)
}

function getInfo() {
  return JSON.stringify({
    id,
    name: app.name,
    version: app.version,
  })
}

$.global[id] = {
  showAlert,
  getInfo,
}
