const packageJson = require('./package.json')
const packageName = packageJson.name
const name = packageJson.cep.name
const bundleId = packageJson.cep.id
const version = packageJson.version
module.exports = {
  packager: {
    name: name,
    bundleId: bundleId,
    version: version,
    src: './dist',
    zxp: {
      dest: `${__dirname}/archive/${packageName}-${version}.zxp`
    },
    macOs: {
      dest: `${__dirname}/archive/${packageName}-${version}.pkg`,
      // keychain: 'login.keychain',
      // keychainPassword: '',
      // identifier: 'Developer ID Installer: Koen Schmeets',
      resources: `${__dirname}/resources/macos`
    },
    windows: {
      name: name,
      // cert: `${__dirname}/certs/pathto.p12`,
      // certPassword: '',
      dest: `${__dirname}/archive/${packageName}-${version}.exe`,
      resources: `${__dirname}/resources/windows`,
      site: 'https://www.github.com/adobe-extension-tools'
    },
  }
}