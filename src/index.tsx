import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './containers/App'

import './index.css'

import { nodeRequire, inCEPEnvironment } from './utils'

if (inCEPEnvironment()) {
  const platform = nodeRequire('os').platform()
  console.log('CEP', platform)
}

// console.log(result.toString())

console.log('cep', window.cep)
console.log('cep_node', window.cep_node)
console.log('adobe_cep', window.__adobe_cep__)

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
