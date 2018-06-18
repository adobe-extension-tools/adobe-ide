import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./containers/App";

import "./index.css";

import { inCEPEnvironment } from "cep-interface";

if (inCEPEnvironment()) {
  import("./extendscript");
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
