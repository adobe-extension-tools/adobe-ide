import {
  evalExtendscript,
  getApplicationID,
  getExtensionPath,
  openURLInDefaultBrowser,
} from 'cep-interface'
import * as React from 'react'

const debugPorts = JSON.parse(process.env.DEBUG_PORTS)
const debugPort = debugPorts[getApplicationID()]

export default class AdobeAppInfo extends React.Component {
  public state = {
    info: null,
    extensionPath: null
  }

  async componentDidMount() {
    const info = await evalExtendscript(`$.global["${process.env.BUNDLE_ID}"].getInfo()`)
    const extensionPath = await getExtensionPath()
    this.setState({ info, extensionPath })
  }

  render() {
    const { info, extensionPath } = this.state
    if (!info) return null
    return (
      <div className="AdobeAppInfo">
        <h3>Adobe App Info</h3>
        <ul>
          <li>Id: {process.env.BUNDLE_ID}</li>
          <li>Version: {info.version}</li>
          <li>Extension Path: {extensionPath}</li>
        </ul>
        <button onClick={() => openURLInDefaultBrowser(`http://localhost:${debugPort}`)}>Open debugger</button>
      </div>
    )
  }
}
