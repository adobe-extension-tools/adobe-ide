import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as path from 'path'

import App from './containers/App'

import './index.ui.css'

import {
  inCEPEnvironment,
  evalExtendscript,
  loadExtendscript,
  getExtensionPath,
} from './utils'

import { createLogger } from './log'

// node-require
import os = require('os')
// node-require
import fs = require('fs-extra')

const logger = createLogger('com.buck.publisher')

if (inCEPEnvironment()) {
  const extensionPath = getExtensionPath()

  const platform = os.platform()

  logger.info('start', extensionPath)

  const manifest = fs.readJSONSync(path.join(extensionPath, 'manifest.json'))

  loadExtendscript(manifest['index.jsx.ts'])

  // const result = fs.readFileSync(
  //   path.join(window.cep_node.__dirname, 'CSXS', 'manifest.xml')
  // )
  // console.log(result.toString())

  // evalExtendscript(`alert("Hello ${Date.now()}");`)
}

ReactDOM.render(<App logger={logger} />, document.getElementById(
  'root'
) as HTMLElement)
