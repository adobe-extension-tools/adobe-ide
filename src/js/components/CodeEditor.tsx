import * as React from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { safeRun } from '../utils' 
import { getApplicationID, openURLInDefaultBrowser } from 'cep-interface';

class CodeEditor extends React.Component {
  public containerRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    // remove current editors (for HMR)
    const currentModels = monaco.editor.getModels()
    if (currentModels.length > 0) {
      currentModels.forEach(model => {
        model.dispose()
      })
    }
    /* else {
      // add console.log event listener
      addEventListener('CONSOLE_LOG', (e: any) => {
        this.setState({
          console: [...this.state.console, e.data]
        })
      })
    }*/
    const javascriptTypes = require('!!raw-loader!../../../node_modules/types-for-adobe/shared/JavaScript.d.ts')
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      javascriptTypes.default,
      'file:///javascript.d.ts'
    )
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
    const programTypes: any = {
      aeft: require('!!raw-loader!../../../node_modules/types-for-adobe/AfterEffects/2018/index.d.ts').default,
      audt: require('!!raw-loader!../../../node_modules/types-for-adobe/Audition/2018/index.d.ts').default,
      ppro: require('!!raw-loader!../../../node_modules/types-for-adobe/Premiere/2018/index.d.ts').default,
      phsp: require('!!raw-loader!../../../node_modules/types-for-adobe/Photoshop/2015.5/index.d.ts').default,
      ilst: require('!!raw-loader!../../../node_modules/types-for-adobe/Illustrator/2015.3/index.d.ts').default,
      idsn: require('!!raw-loader!../../../node_modules/types-for-adobe/InDesign/2018/index.d.ts').default,
    }
    const appId = getApplicationID().toLowerCase()
    if (programTypes.hasOwnProperty(appId)) {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        programTypes[appId],
        'file:///programtypes.d.ts'
      )
    }
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
    const editor = monaco.editor.create(this.containerRef.current, {
      automaticLayout: true,
      language: 'typescript',
      theme: "vs-dark",
      lineNumbers: 'on',
      acceptSuggestionOnCommitCharacter: true,
      
      model: model
    });
    editor.addCommand(monaco.KeyMod.WinCtrl | monaco.KeyCode.KEY_A, function () {
      editor.setSelection(new monaco.Range(0, 0, Infinity, Infinity));
    })
  }

  render() {
    return <div ref={this.containerRef} style={{ width: '100%', height: '100%' }} />
  }
}

export default CodeEditor