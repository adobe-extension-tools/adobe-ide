/// <reference path="index.d.ts" />
import './console'
import './extendscript'
import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './containers/App'

function getRootEl() {
  let rootEl = document.getElementById("root") as HTMLElement
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.style.width = '100%'
    rootEl.style.height = '100%'
    document.body.appendChild(rootEl)
  }
  return rootEl
}

ReactDOM.render(<App />, getRootEl())

declare global {
  interface NodeModule {
    hot: any
  }
}

if (module.hot) {
  module.hot.accept(() => { })
}