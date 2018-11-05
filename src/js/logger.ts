const fs = global.cep_node.require("fs-extra")
const os = global.cep_node.require("os")
const path = global.cep_node.require("path")
const pino = global.cep_node.require("pino")

function getLogPath(id: string): string {
  const homeDir = os.homedir()
  const file = `${id}.log`
  const platform = os.platform()

  switch (platform) {
    case "darwin": {
      return path.join(homeDir, "Library", "Logs", file);
    }
    case "win32": {
      return path.join(homeDir, "AppData", "Roaming", file);
    }
    case "linux": {
      return path.join(homeDir, ".logs", file);
    }
    default:
      return path.join(homeDir, ".logs", file);
  }
}

export function createLogger(logPath: string) {
  return pino({}, fs.createWriteStream(logPath, { flags: "a" }))
}

export const logPath = getLogPath(process.env.BUNDLE_ID)
export const logger = createLogger(logPath)
