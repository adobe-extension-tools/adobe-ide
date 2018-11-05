import * as React from 'react'

import { logger, logPath } from '../logger'

export default class LogInfo extends React.Component {
  onLog = async (level: string) => {
    logger[level]('log')
  }

  openLog = async () => {
    const child = global.cep_node.require('child_process')
    if (process.platform === 'darwin') {
      child.spawn('open', [logPath])
    }
  }

  render() {
    return (
      <div className="LogInfo">
        <h3>Log Info</h3>
        <ul>
          <li>Path: {logPath}</li>
        </ul>
        {/* {readFileSync('./dist/.debug').toString()} */}
        {process.platform == 'darwin' && (
          <button onClick={this.openLog}>Open Log</button>
        )}
        <button onClick={this.onLog.bind(this, 'info')}>Log Info</button>
        <button onClick={this.onLog.bind(this, 'error')}>Log Error</button>
      </div>
    )
  }
}
