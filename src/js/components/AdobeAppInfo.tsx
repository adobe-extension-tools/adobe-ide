import * as React from "react";
import "./AdobeAppInfo.css";
import { evalExtendscript, getExtensionPath } from "cep-interface";
import { id } from "../../shared";
import { logPath } from "../logger";

export default class AdobeAppInfo extends React.Component {
  state = {
    id: undefined,
    version: undefined,
    name: undefined,
    extensionPath: undefined
  };

  async componentDidMount() {
    const info: any = await evalExtendscript(`$.global["${id}"].getInfo()`);
    const extensionPath = await getExtensionPath();

    this.setState({
      id: info.id,
      name: info.name,
      version: info.version,
      extensionPath
    });
  }

  onClick = async () => {
    const result = await evalExtendscript(`$.global["${id}"].showAlert()`);
  };

  render() {
    return (
      <div className="AdobeAppInfo">
        <ul>
          <li>Id: {this.state.id}</li>
          <li>Name: {this.state.name}</li>
          <li>Version: {this.state.version}</li>
          <li>Extension Path: {this.state.extensionPath}</li>
          <li>Log: {logPath}</li>
        </ul>
        <button onClick={this.onClick}>Alert from Extendscript</button>
      </div>
    );
  }
}
