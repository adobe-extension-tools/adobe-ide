import './App.css'
import * as React from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  evalExtendscript,
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
    // remove current editors (for HMR)
    const currentModels = monaco.editor.getModels()
    if (currentModels.length > 0) {
      currentModels.forEach(model => {
        model.dispose()
      })
    } else {
      // add console.log event listener
      addEventListener('CONSOLE_LOG', (e: any) => {
        this.setState({
          console: [...this.state.console, e.data]
        })
      })
    }
  
    const globalTypes = require('!!raw-loader!../../../node_modules/types-for-adobe/shared/global.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      globalTypes.default,
      'file:///global.d.ts'
    )
    const scriptUiTypes = require('!!raw-loader!../../../node_modules/types-for-adobe/shared/ScriptUI.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      scriptUiTypes.default,
      'file:///ScriptUI.d.ts'
    )
    const afterEffectsTypes = require('!!raw-loader!../../../node_modules/types-for-adobe/AfterEffects/2018/index.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      afterEffectsTypes.default,
      'file:///AfterEffects.d.ts'
    )
    const consoleTypes = require('!!raw-loader!../../jsx/console.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      consoleTypes.default,
      'file:///console.d.ts'
    )
    const es5ShimTypes = require('!!raw-loader!../../../node_modules/extendscript-es5-shim-ts/index.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      es5ShimTypes.default,
      'file:///ES5Shim.d.ts'
    )
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES5,
      noLib: true,
      allowNonTsExtensions: true
    })
    const model = monaco.editor.createModel(
      `console.log(app.project.activeItem.name)`,
      'typescript',
      monaco.Uri.parse('file:///index.ts')
    );
    monaco.editor.defineTheme('myTheme', {
      "base": "vs-dark",
      "inherit": true,
      "rules": [
        {
          "foreground": "969896",
          "token": "comment"
        },
        {
          "foreground": "ced1cf",
          "token": "keyword.operator.class"
        },
        {
          "foreground": "ced1cf",
          "token": "constant.other"
        },
        {
          "foreground": "ced1cf",
          "token": "source.php.embedded.line"
        },
        {
          "foreground": "cc6666",
          "token": "variable"
        },
        {
          "foreground": "cc6666",
          "token": "support.other.variable"
        },
        {
          "foreground": "cc6666",
          "token": "string.other.link"
        },
        {
          "foreground": "cc6666",
          "token": "string.regexp"
        },
        {
          "foreground": "cc6666",
          "token": "entity.name.tag"
        },
        {
          "foreground": "cc6666",
          "token": "entity.other.attribute-name"
        },
        {
          "foreground": "cc6666",
          "token": "meta.tag"
        },
        {
          "foreground": "cc6666",
          "token": "declaration.tag"
        },
        {
          "foreground": "de935f",
          "token": "constant.numeric"
        },
        {
          "foreground": "de935f",
          "token": "constant.language"
        },
        {
          "foreground": "de935f",
          "token": "support.constant"
        },
        {
          "foreground": "de935f",
          "token": "constant.character"
        },
        {
          "foreground": "de935f",
          "token": "variable.parameter"
        },
        {
          "foreground": "de935f",
          "token": "punctuation.section.embedded"
        },
        {
          "foreground": "de935f",
          "token": "keyword.other.unit"
        },
        {
          "foreground": "f0c674",
          "token": "entity.name.class"
        },
        {
          "foreground": "f0c674",
          "token": "entity.name.type.class"
        },
        {
          "foreground": "f0c674",
          "token": "support.type"
        },
        {
          "foreground": "f0c674",
          "token": "support.class"
        },
        {
          "foreground": "b5bd68",
          "token": "string"
        },
        {
          "foreground": "b5bd68",
          "token": "constant.other.symbol"
        },
        {
          "foreground": "b5bd68",
          "token": "entity.other.inherited-class"
        },
        {
          "foreground": "b5bd68",
          "token": "markup.heading"
        },
        {
          "foreground": "8abeb7",
          "token": "keyword.operator"
        },
        {
          "foreground": "8abeb7",
          "token": "constant.other.color"
        },
        {
          "foreground": "81a2be",
          "token": "entity.name.function"
        },
        {
          "foreground": "81a2be",
          "token": "meta.function-call"
        },
        {
          "foreground": "81a2be",
          "token": "support.function"
        },
        {
          "foreground": "81a2be",
          "token": "keyword.other.special-method"
        },
        {
          "foreground": "81a2be",
          "token": "meta.block-level"
        },
        {
          "foreground": "b294bb",
          "token": "keyword"
        },
        {
          "foreground": "b294bb",
          "token": "storage"
        },
        {
          "foreground": "b294bb",
          "token": "storage.type"
        },
        {
          "foreground": "b294bb",
          "token": "entity.name.tag.css"
        },
        {
          "foreground": "ced2cf",
          "background": "df5f5f",
          "token": "invalid"
        },
        {
          "foreground": "ced2cf",
          "background": "82a3bf",
          "token": "meta.separator"
        },
        {
          "foreground": "ced2cf",
          "background": "b798bf",
          "token": "invalid.deprecated"
        }
      ],
      "colors": {
        "editor.foreground": "#C5C8C6",
        "editor.background": "#1D1F21",
        "editor.selectionBackground": "#373B41",
        "editor.lineHighlightBackground": "#282A2E",
        "editorCursor.foreground": "#AEAFAD",
        "editorWhitespace.foreground": "#4B4E55"
      }
    });
    const editor = monaco.editor.create(this.containerRef.current, {
      automaticLayout: true,
      language: 'typescript',
      theme: "myTheme",
      lineNumbers: 'on',
      acceptSuggestionOnCommitCharacter: true,
      model: model
    });
    editor.addCommand(monaco.KeyMod.WinCtrl | monaco.KeyCode.KEY_A, function () {
      editor.setSelection(new monaco.Range(0, 0, Infinity, Infinity));
    })
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