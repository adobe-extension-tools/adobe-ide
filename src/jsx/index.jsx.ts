// import { customAlert } from './utils'

// function test() {
//   customAlert(Date.now())
//   return JSON.stringify({ foo: 'bar', date: Date.now() })
// }

function test() {
  alert(`test2 ${Date.now()}`)
  return JSON.stringify({ foo: 'bar' })
}

function getInfo() {
  return JSON.stringify({ name: app.name, version: app.version })
}

$['com.fusepilot.test'] = {
  test,
  getInfo,
}
