import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as path from 'path'

import App from './containers/App'

// import './index.ui.css'

import {
  inCEPEnvironment,
  evalExtendscript,
  loadExtendscript,
  getExtensionPath,
  getHostEnvironment,
<<<<<<< HEAD
  RGBColor,
=======
>>>>>>> 75964668ae098b2f09a36c9c86efb7354bbedfbd
} from 'cep-interface'

// node-require
import os = require('os')
// node-require
import fs = require('fs-extra')

import { logger } from './logger'

if (inCEPEnvironment()) {
  const extensionPath = getExtensionPath()

  const platform = os.platform()

  logger.info('start', extensionPath)

  const manifest = fs.readJSONSync(path.join(extensionPath, 'manifest.json'))

  loadExtendscript(manifest['index.jsx.ts'])

  const host = getHostEnvironment()
  if (host) {
    const skin = host.appSkinInfo
    const bgColor = skin.panelBackgroundColor.color as RGBColor
    document.body.style.backgroundColor = `rgb(${bgColor.red}, ${
      bgColor.green
    }, ${bgColor.blue})`
  }

  // const result = fs.readFileSync(
  //   path.join(window.cep_node.__dirname, 'CSXS', 'manifest.xml')
  // )
  // console.log(result.toString())

  // evalExtendscript(`alert("Hello ${Date.now()}");`)
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
