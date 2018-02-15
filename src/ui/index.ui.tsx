import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './containers/App'

import './index.ui.css'

import {
  nodeRequire,
  inCEPEnvironment,
  evalExtendscript,
  loadExtendscript,
  getExtensionPath,
} from './utils'

import { createLogger } from './log'

const logger = createLogger('com.buck.publisher')

import * as path from 'path'

if (inCEPEnvironment()) {
  const platform = nodeRequire('os').platform()
  const fs = nodeRequire('fs-extra')
  const extensionPath = getExtensionPath()

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
