import {
  inCEPEnvironment,
  loadExtendscript,
  getExtensionPath,
  getHostEnvironment,
  RGBColor
} from "cep-interface";

if (inCEPEnvironment()) {
  // @ts-ignore
  const os = window.cep_node.require("os");
  // @ts-ignore
  const fs = window.cep_node.require("fs-extra");
  // @ts-ignore
  const path = window.cep_node.require("path");
  // @ts-ignore
  const { logger } = require("./logger");

  const extensionPath = getExtensionPath();

  logger.info("start", extensionPath);

  const manifest = fs.readJsonSync(path.join(extensionPath, "manifest.json"));
  loadExtendscript(manifest["index.jsx.ts"]);

  const host = getHostEnvironment();
  if (host) {
    const skin = host.appSkinInfo;
    const bgColor = skin.panelBackgroundColor.color as RGBColor;
    document.body.style.background = `rgb(${parseInt(bgColor.red)}, ${parseInt(bgColor.green)}, ${
      parseInt(bgColor.blue)
    })`;
  }
}
