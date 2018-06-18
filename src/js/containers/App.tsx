import * as React from "react";

import "./App.css";

import AdobeAppInfo from "../components/AdobeAppInfo";
import LogInfo from "../components/LogInfo";
import { logger } from "../logger";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>react-parcel-cep-starter</h1>
        <AdobeAppInfo />
        <LogInfo />
      </div>
    );
  }
}
