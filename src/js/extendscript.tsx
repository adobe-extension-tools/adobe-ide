import { evalExtendscript, getHostEnvironment, RGBColor } from 'cep-interface'
import { readFileSync } from 'fs'

// @ts-ignore
const Buffer = cep_node.Buffer
const jsxBundle = readFileSync('./dist/index.js').toString()
evalExtendscript(jsxBundle)

const host = getHostEnvironment();
if (host) {
  const skin = host.appSkinInfo;
  const bgColor = skin.panelBackgroundColor.color as RGBColor;
  document.body.style.backgroundColor = `rgba(${Math.round(bgColor.red)},${Math.round(bgColor.green)},${Math.round(bgColor.blue)},${bgColor.alpha})`
}
