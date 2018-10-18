import { evalExtendscript, getExtensionPath, inCEPEnvironment } from 'cep-interface'
import * as React from 'react'

import { id } from '../../shared'

export default class AdobeAppInfo extends React.Component {
  state = {
    id: undefined,
    version: undefined,
    name: undefined,
    extensionPath: undefined,
    isInCEPEnvironment: false
  }

  async componentDidMount() {
    if (inCEPEnvironment()) {
      const info: any = await evalExtendscript(`$.global["${id}"].getInfo()`)
      const extensionPath = await getExtensionPath();
      this.setState({
        id: info.id,
        name: info.name,
        version: info.version,
        extensionPath,
        isInCEPEnvironment: true
      })
    }
  }

  render() {
    return (
      <div className="AdobeAppInfo">
        <h3>Adobe App Info</h3>
        {!this.state.isInCEPEnvironment && <p>Not in CEP environment.</p>}
        <ul>
          <li>Id: {this.state.id}</li>
          <li>Name: {this.state.name}</li>
          <li>Version: {this.state.version}</li>
          <li>Extension Path: {this.state.extensionPath}</li>
        </ul>
      </div>
    )
  }
}
