import { addEventListener } from 'cep-interface'

// add console.log event listener
addEventListener('CONSOLE_LOG', function (e: any) {
  console.log.apply(console, e.data);
})

// add console.warn event listener
addEventListener('CONSOLE_WARN', function (e: any) {
  console.warn.apply(console, e.data)
})

// add console.error event listener
addEventListener('CONSOLE_ERROR', function (e: any) {
  console.error.apply(console, e.data)
});
