import * as React from 'react'

import './App.css'

import { evalExtendscript, getExtensionPath } from '../utils'

class AdobeAppInfo extends React.Component {
  state = {
    version: undefined,
    name: undefined,
    extensionPathc: undefined,
  }

  async componentDidMount() {
    const info = await evalExtendscript(`$['com.fusepilot.test'].getInfo()`)
    const extensionPath = await getExtensionPath()
    console.log(info)

    this.setState({ name: info.name, version: info.version, extensionPath })
  }

  onClick = async () => {
    const result = await evalExtendscript(`$['com.fusepilot.test'].test()`)
    console.log(result)
  }

  render() {
    return (
      <div className="AdobeAppInfo">
        Name: {this.state.name}
        Version: {this.state.version}
        Extension Path: {this.state.extensionPath}
        <button onClick={this.onClick}>Click</button>
      </div>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Buck</h1>
        <AdobeAppInfo />
      </div>
    )
  }
}
