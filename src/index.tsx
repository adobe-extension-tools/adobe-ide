import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './containers/App'

import './index.css'

import {
  nodeRequire,
  inCEPEnvironment,
  evalExtendscript,
  prepExtendscriptEnvironment,
} from './utils'

if (inCEPEnvironment()) {
  const platform = nodeRequire('os').platform()
  console.log('CEP', platform)

  const fs = nodeRequire('fs-extra')
  // const path = nodeRequire('path')

  // const result = fs.readFileSync(
  //   path.join(window.cep_node.__dirname, 'CSXS', 'manifest.xml')
  // )
  // console.log(result.toString())

  // evalExtendscript(`alert("Hello ${Date.now()}");`)
}

console.log('cep', window.cep)
console.log('cep_node', window.cep_node)
console.log('adobe_cep', window.__adobe_cep__)

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
