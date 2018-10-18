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

interface Console {
  log: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}

interface Global {
  console: Console
}

declare var console: Console;

$.global.console = {
  log: log('LOG'),
  warn: log('WARN'),
  error: log('ERROR')
}

export default console