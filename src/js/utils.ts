import {
  evalExtendscript,
} from 'cep-interface'

export function safeRun(code: string) {
  const safeCode = `(function () {
    function errorToPretty (err) {
      var stack = $.stack.split('\\n')
      stack.shift()
      stack.pop()
      stack.pop()
      var lines = (err.source && err.source.split('\\n')) || []
      err.line--;
      return {
        name: err.name,
        message: err.message,
        line: err.line,
        context: [
          lines[err.line - 2] || '',
          lines[err.line - 1] || '',
          '---> ' + lines[err.line] || '',
          lines[err.line + 1] || '',
          lines[err.line + 2] || ''
        ],
        stack: stack
      }
    }
    try {
      return JSON.stringify((function () { ${code} })())
    } catch (err) {
      return JSON.stringify(errorToPretty(err))
    }
  })()`;
  return evalExtendscript(safeCode)
    .then(res => {
      if (typeof res === 'object' && res.stack && res.line && res.message && res.context) {
        const e = new Error(`${res.message}\nCONTEXT:\n${res.context.join('\n')}\nSTACK:\n${res.stack.join('\n')}`)
        e.stack = null
        throw e
      }
      return res
    })
}
