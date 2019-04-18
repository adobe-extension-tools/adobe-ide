import 'extendscript-es5-shim-ts'
import console from './console'

$.write = (...args) => {
  console.log(...args)
}

$.writeln = (...args) => {
  console.log(...args)
}