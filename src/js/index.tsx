/// <reference path="index.d.ts" />
import './console'
import './extendscript'
import './style.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './containers/App'
import { registerKeyEventsInterest } from 'cep-interface'

document.addEventListener('keydown', function (e) {
  console.log(e);
})

function keyRegisterOverride() {
    var os = navigator.platform.substr(0, 3);
    if (os === 'Mac')
        var maxKey = 126; // Mac Key Codes   
    else if (os === 'Win')
        var maxKey = 222; // HTML Key Codes
    var allKeys = [];
    for (var k = 0; k <= maxKey; k++) {
        for (var j = 0; j <= 15; j++) {
            var guide = (j >>> 0).toString(2).padStart(4, '0');
            allKeys.push({
                keyCode: k,
                ctrlKey: guide[0] === '1',
                altKey: guide[1] === '1',
                shiftKey: guide[2] === '1',
                metaKey: guide[3] === '1'
            });
        }
    }
    var keyRes = registerKeyEventsInterest(JSON.stringify(allKeys));
    console.log("Key Events Registered Completed: " + keyRes);
}
keyRegisterOverride();

function getRootEl() {
  let rootEl = document.getElementById("root") as HTMLElement
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.style.width = '100%'
    rootEl.style.height = '100%'
    document.body.appendChild(rootEl)
  }
  return rootEl
}

ReactDOM.render(<App />, getRootEl())

declare global {
  interface NodeModule {
    hot: any
  }
}

if (module.hot) {
  module.hot.accept(() => { })
}