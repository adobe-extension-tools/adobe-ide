import { nodeRequire } from './utils'
const fs = nodeRequire('fs-extra')
const os = nodeRequire('os')

console.log(os.homedir())
console.log(os.arch())
console.log(os.platform())
console.log(os.freemem())
console.log(os.totalmem())

export default nodeRequire('pino')(
  {},
  fs.createWriteStream('/Users/michaeldelaney/log.txt', { flags: 'a' })
)
