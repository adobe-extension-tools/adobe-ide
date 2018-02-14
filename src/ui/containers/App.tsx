import * as React from 'react'

import './App.css'

import { evalExtendscript } from '../utils'

class AdobeAppInfo extends React.Component {
  state = {
    version: undefined,
    name: undefined,
  }

  async componentDidMount() {
    const version = await evalExtendscript(`app.version`)
    const name = await evalExtendscript(`app.name`)
    const app = await evalExtendscript(`JSON.stringify(app)`)
    // console.log(app)

    this.setState({ name, version })
  }

  render() {
    return (
      <div className="AdobeAppInfo">
        Name: {this.state.name}
        Version: {this.state.version}
        <button
          onClick={() => {
            evalExtendscript(`$['com.fusepilot.test'].test()`)
          }}
        >
          Click
        </button>
      </div>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Buck</h1>
        <AdobeAppInfo />
      </div>
    )
  }
}
