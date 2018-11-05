/// <reference path="index.d.ts" />
import './console'
import './extendscript'
import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './containers/App'

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement)
