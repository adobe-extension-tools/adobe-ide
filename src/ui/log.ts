import { nodeRequire } from './utils'
const fs = nodeRequire('fs-extra')
const os = nodeRequire('os')
const path = nodeRequire('path')

// console.log(os.homedir())
// console.log(os.arch())
// console.log(os.platform())
// console.log(os.freemem())
// console.log(os.totalmem())

function getLogPath(id: string): string {
  const homeDir = os.homedir ? os.homedir() : process.env['HOME']
  const file = `${id}.${Date.now()}.log`
  const platform = os.platform()

  switch (platform) {
    case 'linux': {
      return path.join(homeDir, '.config', id, file)
    }

    case 'darwin': {
      return path.join(homeDir, 'Library', 'Logs', id, file)
    }

    case 'win32': {
      return path.join(homeDir, 'AppData', 'Roaming', id, file)
    }

    default:
      return path.join(homeDir, '.logs', id, file)
  }
}

fs.ensureDir(path.dirname(getLogPath('com.buck.publisher')))

export default nodeRequire('pino')(
  {},
  fs.createWriteStream(getLogPath('com.buck.publisher'), { flags: 'a' })
)
