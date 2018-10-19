import {
  evalExtendscript,
  getApplicationID,
  getExtensionPath,
  inCEPEnvironment,
  openURLInDefaultBrowser,
} from 'cep-interface'
import * as React from 'react'

import { id } from '../../shared'

function parseHosts(hostsString) {
  if (hostsString == '*')
    hostsString = `PHXS, IDSN, AICY, ILST, PPRO, PRLD, AEFT, FLPR, AUDT, DRWV, MUST, KBRG`
  const hosts = hostsString
    .split(/(?![^)(]*\([^)(]*?\)\)),(?![^\[]*\])/)
    .map(host => host.trim())
    .map(host => {
      let [name, version] = host.split('@')
      if (version == '*' || !version) {
        version = '[0.0,99.9]'
      } else if (version) {
        version = version
      }
      return {
        name,
        version,
      }
    })
  return hosts
}

const hostNames = parseHosts(process.env.HOSTS).map((host) => host.name)
const index = hostNames.indexOf(getApplicationID())
const debugPort = 3001 + index

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
        <button onClick={() => openURLInDefaultBrowser(`http://localhost:${debugPort}`)}>Open debugger</button>
      </div>
    )
  }
}
