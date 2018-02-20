import * as React from 'react'

import './App.css'

import AdobeAppInfo from '../components/AdobeAppInfo'
import { logger } from '../logger'

export default class App extends React.Component {
  onClick = async () => {
    logger.info('clicked')
  }

  render() {
    return (
      <div className="App">
        <h1>react-parcel-cep-starter</h1>
        <button onClick={this.onClick}>Log Event</button>
        <AdobeAppInfo />
      </div>
    )
  }
}
