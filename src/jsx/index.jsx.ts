import { customAlert } from './utils'

function test() {
  customAlert(Date.now())
  return JSON.stringify({ foo: 'bar', date: Date.now() })
}

writeLn(`yo ${Date.now()}`)

$['com.fusepilot.test'] = {
  test,
}
