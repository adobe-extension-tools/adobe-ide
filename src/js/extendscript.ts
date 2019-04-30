import * as path from 'path'
import {
  evalExtendscript,
  getSystemPath,
  addEventListener,
  getExtensionPath,
  getHostEnvironment,
  RGBColor,
  THEME_COLOR_CHANGED_EVENT
} from 'cep-interface'

function setAppTheme() {
  const hostEnvironment = getHostEnvironment()
  const bgColor = hostEnvironment.appSkinInfo.panelBackgroundColor.color as RGBColor
  const colors = [bgColor.red, bgColor.green, bgColor.blue]
    .map(c => Math.round(
      ((c - 38.28) * 0.78) + 35 // this magic makes the color actually look like the default panels
    ))
  document.body.style.background = `rgb(${colors.join(', ')})`
}

setAppTheme()
addEventListener(THEME_COLOR_CHANGED_EVENT, setAppTheme)

if (process.env.IS_DEV) {
  const bundle = require('!!raw-loader!../../dist/extendscript.js')
  evalExtendscript(bundle.default)
} else {
  const __dirname = getSystemPath("extension")
  evalExtendscript(`$.global.extensionPath = ${JSON.stringify(getExtensionPath())};\n$.evalFile(${JSON.stringify(path.join(__dirname, 'extendscript.jsxbin'))})`)
}