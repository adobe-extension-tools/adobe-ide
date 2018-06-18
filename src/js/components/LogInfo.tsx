import * as React from "react";

export default class LogInfo extends React.Component {
  state: {
    logPath?: string;
    isInCEPEnvironment: boolean;
    platform?: string;
  } = {
    isInCEPEnvironment: false
  };

  async componentWillMount() {
    const { inCEPEnvironment } = await import("cep-interface");

    if (inCEPEnvironment()) {
      const { logPath } = await import("../logger");
      // @ts-ignore
      const process = window.cep_node.require("process");
      this.setState({
        logPath,
        isInCEPEnvironment: true,
        platform: process.platform
      });
    }
  }

  onLog = async (level: string) => {
    const { inCEPEnvironment } = await import("cep-interface");
    if (inCEPEnvironment()) {
      const { logger } = await import("../logger");
      logger[level]("log");
    }
  };

  openLog = async () => {
    const { inCEPEnvironment } = await import("cep-interface");
    if (inCEPEnvironment()) {
      // @ts-ignore
      const child = window.cep_node.require("child_process");
      if (this.state.platform === "darwin") {
        child.spawn("open", [this.state.logPath]);
      }
    }
  };

  render() {
    return (
      <div className="LogInfo">
        <h3>Log Info</h3>

        {!this.state.isInCEPEnvironment && <p>Not in CEP environment.</p>}

        <ul>
          <li>Path: {this.state.logPath}</li>
        </ul>

        {this.state.platform == "darwin" && (
          <button onClick={this.openLog}>Open Log</button>
        )}
        <button onClick={this.onLog.bind(this, "info")}>Log Info</button>
        <button onClick={this.onLog.bind(this, "error")}>Log Error</button>
      </div>
    );
  }
}
