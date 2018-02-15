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

import log from './log'

import * as path from 'path'

if (inCEPEnvironment()) {
  const platform = nodeRequire('os').platform()
  const fs = nodeRequire('fs-extra')
  const extensionPath = getExtensionPath()

  log.info('start', extensionPath)

  const manifest = fs.readJSONSync(path.join(extensionPath, 'manifest.json'))

  loadExtendscript(manifest['index.jsx.ts'])

  // const result = fs.readFileSync(
  //   path.join(window.cep_node.__dirname, 'CSXS', 'manifest.xml')
  // )
  // console.log(result.toString())

  // evalExtendscript(`alert("Hello ${Date.now()}");`)
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
