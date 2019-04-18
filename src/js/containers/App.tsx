import './App.css'
import * as React from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  evalExtendscript,
  registerKeyEventsInterest,
  addEventListener
} from 'cep-interface'
import RunIcon from '../icons/RunIcon';
import { Console } from 'console-feed'

function safeRun(code: string) {
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

export default class App extends React.Component {
  public containerRef = React.createRef<HTMLDivElement>()

  state = {
    showConsole: true,
    command: '',
    console: [] as any[]
  }

  constructor(props: any) {
    super(props)
    this.evalCode = this.evalCode.bind(this)
  }

  componentDidMount() {
    // add console.log event listener
    addEventListener('CONSOLE_LOG', (e: any) => {
      this.setState({
        console: [...this.state.console, e.data]
      })
    })
    // const registerKey = registerKeyEventsInterest(JSON.stringify(
    //   [
    //     { "keyCode": 0, "metaKey": true },
    //     { "keyCode": 91 },
    //     // { "keyCode": 0, "metaKey": true },
    //     { "keyCode": 65, "metaKey": true }
    //     // {
    //     //   "keyCode": 65,
    //     //   "ctrlKey": true,
    //     // }
    //   ]
    // ))
    // console.log('registerKey result', registerKey)
    const globalTypes = require('!!raw-loader!../../../node_modules/types-for-adobe/shared/global.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      globalTypes.default,
      'global.d.ts'
    )
    const scriptUiTypes = require('!!raw-loader!../../../node_modules/types-for-adobe/shared/ScriptUI.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      scriptUiTypes.default,
      'ScriptUI.d.ts'
    )
    const afterEffectsTypes = require('!!raw-loader!../../../node_modules/types-for-adobe/AfterEffects/2018/index.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      afterEffectsTypes.default,
      'AfterEffects.d.ts'
    )
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES5,
      // noLib: true,
      allowNonTsExtensions: true
    })
    const model = monaco.editor.createModel(
      `console.log(app.project.activeItem.name)`,
      'typescript',
      monaco.Uri.parse('file:///index.ts')
    );
    monaco.editor.create(this.containerRef.current, {
      automaticLayout: true,
      language: 'typescript',
      theme: "vs-dark",
      lineNumbers: 'on',
      acceptSuggestionOnCommitCharacter: true,
      model: model
    });
  }

  evalCode() {
    monaco.languages.typescript.getTypeScriptWorker()
      .then(function (worker) {
        worker('file:///index.ts')
          .then(function (client: any) {
            client.getEmitOutput('file:///index.ts').then(function (r: any) {
              const src = r.outputFiles[0].text
              console.log(src);
              safeRun(src)
                .then(res => {
                  console.log(res)
                })
                .catch(err => {
                  console.log(err)
                })
            })
          });
      });
  }

  render() {
    const consoleHeight = this.state.showConsole ? window.innerHeight / 3 : 0
    return (
      <div>
        <div ref={this.containerRef} style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 40 + consoleHeight }}>
        </div>
        {this.state.showConsole ? (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, paddingBottom: 40, height: consoleHeight, overflow: 'auto' }}>
            <Console style={{ fontWeight: 'bold', fontSize: 20 }} logs={this.state.console.map(line => ({ method: 'log', data: line }))} variant="dark" />
            <input
              type="text"
              style={{
                position: 'absolute',
                bottom: 40,
                width: '100%',
                background: '#A9A9A9',
                outine: 'none',
                border: 'none',
                padding: 4,
                color: '#fff'
              }}
              onChange={(e) => this.setState({ command: e.target.value })}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  safeRun(this.state.command)
                    .then(res => {
                      this.setState({ console: [...this.state.console, [res]] })
                      console.log(res)
                    })
                    .catch(err => {
                      console.log(err)
                    })
                }
              }}
            />
          </div>
        ) : null}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, textAlign: 'right' }}>
          <a href="#" onClick={() => this.setState({ showConsole: !this.state.showConsole })}>C</a>
          <RunIcon height={30} color="grey" onClick={this.evalCode} />
        </div>
      </div>
    );
  }
}