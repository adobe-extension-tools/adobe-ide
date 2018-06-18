// @ts-ignore
const fs = window.cep_node.require("fs-extra");
// @ts-ignore
const os = window.cep_node.require("os");
// @ts-ignore
const path = window.cep_node.require("path");
// @ts-ignore
const pino = window.cep_node.require("pino");

import { id } from "../shared";

function getLogPath(id: string): string {
  const homeDir = os.homedir();
  const file = `${id}.log`;
  const platform = os.platform();

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
  return pino({}, fs.createWriteStream(logPath, { flags: "a" }));
}

export const logPath = getLogPath(id);
export const logger = createLogger(logPath);
