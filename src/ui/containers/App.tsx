import * as React from 'react'

import './App.css'

import { evalExtendscript, getExtensionPath } from '../utils'

class AdobeAppInfo extends React.Component {
  state = {
    version: undefined,
    name: undefined,
    extensionPath: undefined,
  }

  async componentDidMount() {
    const info: any = await evalExtendscript(
      `$.global['com.fusepilot.test'].getInfo()`
    )
    const extensionPath = await getExtensionPath()

    this.setState({ name: info.name, version: info.version, extensionPath })
  }

  onClick = async () => {
    console.log(this.props)
    // log.info('clicked')

    const result = await evalExtendscript(
      `$.global['com.fusepilot.test'].test()`
    )
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
  onClick = async () => {
    this.props.logger.info('clicked')
  }

  render() {
    return (
      <div className="App">
        <h1>Buck</h1>
        <button onClick={this.onClick}>Log</button>
        <AdobeAppInfo />
      </div>
    )
  }
}
