import './App.css'
import * as React from 'react'
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution'
import 'monaco-editor/esm/vs/language/json/monaco.contribution'
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'
import 'monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/caretOperations/transpose.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/clipboard.js';
import 'monaco-editor/esm/vs/editor/contrib/codelens/codelensController.js';
import 'monaco-editor/esm/vs/editor/contrib/colorPicker/colorDetector.js';
import 'monaco-editor/esm/vs/editor/contrib/comment/comment.js';
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu.js';
import 'monaco-editor/esm/vs/editor/contrib/cursorUndo/cursorUndo.js';
import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js';
import 'monaco-editor/esm/vs/editor/contrib/folding/folding.js';
import 'monaco-editor/esm/vs/editor/contrib/format/formatActions.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
import 'monaco-editor/esm/vs/editor/contrib/inPlaceReplace/inPlaceReplace.js';
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/links/links.js';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js';
import 'monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.js';
import 'monaco-editor/esm/vs/editor/contrib/referenceSearch/referenceSearch.js';
import 'monaco-editor/esm/vs/editor/contrib/rename/rename.js';
import 'monaco-editor/esm/vs/editor/contrib/smartSelect/smartSelect.js';
import 'monaco-editor/esm/vs/editor/contrib/snippet/snippetController2.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
import 'monaco-editor/esm/vs/editor/contrib/toggleTabFocusMode/toggleTabFocusMode.js';
import 'monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter.js';
import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickOutline.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickCommand.js';
import 'monaco-editor/esm/vs/editor/standalone/browser/toggleHighContrast/toggleHighContrast.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import {
  evalExtendscript,
  registerKeyEventsInterest,
  addEventListener
} from 'cep-interface'
import RunIcon from '../icons/RunIcon';
import { Hook, Console, Decode } from 'console-feed'

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

const fs = require('fs')

export default class App extends React.Component {
  public containerRef = React.createRef<HTMLDivElement>()

  state = {
    showConsole: true,
    command: '',
    console: []
  }

  constructor(props) {
    super(props)
    this.evalCode = this.evalCode.bind(this)
  }

  componentDidMount() {
    // add console.log event listener
    addEventListener('CONSOLE_LOG', (e) => {
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
    // @ts-ignore
    window.MonacoEnvironment = {
      getWorker: function (moduleId, label) {
        if (label === 'json') {
          return new Worker('../../../node_modules/monaco-editor/esm/vs/language/json/json.worker.js')
        }
        if (label === 'css') {
          return new Worker('../../../node_modules/monaco-editor/esm/vs/language/css/css.worker.js')
        }
        if (label === 'html') {
          return new Worker('../../../node_modules/monaco-editor/esm/vs/language/html/html.worker.js')
        }
        if (label === 'typescript' || label === 'javascript') {
          return new Worker('../../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js')
        }
        return new Worker('../../../node_modules/monaco-editor/esm/vs/editor/editor.worker.js')
      }
    }
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      fs.readFileSync('node_modules/types-for-adobe/shared/global.d.ts', 'utf8'),
      'global.d.ts'
    )
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      fs.readFileSync('node_modules/types-for-adobe/shared/ScriptUI.d.ts', 'utf8'),
      'ScriptUI.d.ts'
    )
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      fs.readFileSync('node_modules/types-for-adobe/AfterEffects/2018/index.d.ts', 'utf8'),
      'AfterEffects.d.ts'
    )
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES5,
      // noLib: true,
      allowNonTsExtensions: true
    })
    const model = monaco.editor.createModel(
      `console.log(typeof app.project.activeItem)`,
      'typescript',
      monaco.Uri.parse('file:///index.ts')
    );

    window.monaco = monaco;
    window.model = model;

    monaco.editor.create(this.containerRef.current, {
      automaticLayout: true,
      language: 'typescript',
      theme: "vs-dark",
      lineNumbers: 'on',
      acceptSuggestionOnCommitCharacter: true,
      model: model
    });

    // var quickCommandAction = model.getAction("editor.action.quickCommand");
    // model.addCommand(monaco.KeyCode.F1, quickCommandAction._run);
    console.log(monaco)
    console.log(model)
    // editor._standaloneKeybindingService._getResolver()._lookupMap.get("editor.action.quickCommand")[0].resolvedKeybinding._firstPart.keyCode = monaco.KeyCode.F2; editor._standaloneKeybindingService.updateResolver();
  }

  evalCode() {
    monaco.languages.typescript.getTypeScriptWorker()
      .then(function (worker) {
        worker('file:///index.ts')
          .then(function (client) {
            client.getEmitOutput('file:///index.ts').then(function (r) {
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

// { this.state.console.map((line, i) => {
//   return line.map(arg => (
//     <pre key={i + JSON.stringify(line)} style={{ color: 'white' }}>
//       {JSON.stringify(arg)}
//     </pre>
//   ))
// }) }
