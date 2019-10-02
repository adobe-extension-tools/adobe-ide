import * as React from 'react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Console } from 'console-feed'
import { safeRun } from '../utils'
import CodeEditor from '../components/CodeEditor';
import RunIcon from '../icons/RunIcon';

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
    // const consoleHeight = this.state.showConsole ? window.innerHeight / 3 : 0
    return (
      <div className="spectrum spectrum--medium spectrum--dark" style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <div className="app">
          <div className="app__navigation">
            Navigation
          </div>
          <div className="app__contents">
            Contents
          </div>
        </div>
        {/* <div style={{ height: '50%' }}>
          <CodeEditor />
        </div>
        <Console
          style={{ fontWeight: 'bold', fontSize: 20 }}
          logs={this.state.console.map(line => ({ method: 'log', data: line }))}
          variant="dark"
        />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, textAlign: 'right' }}>
          <RunIcon height={30} color="grey" onClick={this.evalCode} />
        </div> */}
      </div>
    );
  }
}


/*
{this.state.showConsole ? (
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 40, paddingBottom: 40, height: consoleHeight, overflow: 'auto' }}>
            <button className="spectrum-Button spectrum-Button--overBackground">
              <span className="spectrum-Button-label">Button</span>
            </button>
            <Console style={{ fontWeight: 'bold', fontSize: 20 }} logs={this.state.console.map(line => ({ method: 'log', data: line }))} variant="dark" />
            <input
              type="text"
              style={{
                position: 'absolute',
                bottom: 40,
                width: '100%',
                background: '#A9A9A9',
                outline: 'none',
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
            />}
          </div>
        ) : null}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, textAlign: 'right' }}>
          <a href="#" onClick={() => this.setState({ showConsole: !this.state.showConsole })}>C</a>
          <RunIcon height={30} color="grey" onClick={this.evalCode} />
        </div>
*/