import {
  evalExtendscript,
  getApplicationID,
  getExtensionPath,
  openURLInDefaultBrowser,
} from 'cep-interface'
import * as React from 'react'

import { id } from '../../shared'

const debugPorts = JSON.parse(process.env.DEBUG_PORTS)
const debugPort = debugPorts[getApplicationID()]

export default class AdobeAppInfo extends React.Component {
  async render() {
    const info = await evalExtendscript(`$.global["${id}"].getInfo()`)
    return (
      <div className="AdobeAppInfo">
        <h3>Adobe App Info</h3>
        <ul>
          <li>Id: {info.id}</li>
          <li>Name: {info.name}</li>
          <li>Version: {info.version}</li>
          <li>Extension Path: {await getExtensionPath()}</li>
        </ul>
        <button onClick={() => openURLInDefaultBrowser(`http://localhost:${debugPort}`)}>Open debugger</button>
      </div>
    )
  }
}
