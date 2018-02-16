// node-require
import fs = require('fs-extra')
// node-require
import os = require('os')
// node-require
import path = require('path')
// node-require
import pino = require('pino')

function getLogPath(id: string): string {
  const homeDir = os.homedir()
  const file = `${id}.log`
  const platform = os.platform()

  switch (platform) {
    case 'linux': {
      return path.join(homeDir, '.logs', file)
    }

    case 'darwin': {
      return path.join(homeDir, 'Library', 'Logs', file)
    }

    case 'win32': {
      return path.join(homeDir, 'AppData', 'Roaming', file)
    }

    default:
      return path.join(homeDir, '.logs', file)
  }
}

export function createLogger(id: string) {
  const logPath = getLogPath(id)
  return pino({}, fs.createWriteStream(logPath, { flags: 'a' }))
}
