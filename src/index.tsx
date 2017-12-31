import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './containers/App'

import './index.css'

import { nodeRequire, inCEPEnvironment } from './utils'

if (inCEPEnvironment()) {
  const platform = nodeRequire('os').platform()
  console.log(platform)
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
