/// <reference path="console.d.ts" />

import dispatch from './bridge'

function log(level: string) {
  return (...args: any[]) => {
    var safeArgs = args.map(arg => {
      try {
        JSON.stringify(arg)
        return arg
      } catch (e) {
        return arg.toString()
      }
    })
    dispatch(`CONSOLE_${level}`, JSON.stringify(safeArgs))
  }
}

$.global.console = {
  log: log('LOG'),
  warn: log('WARN'),
  error: log('ERROR')
}

export default console