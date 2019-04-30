interface Console {
  log: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}

interface Global {
  console: Console
}

declare var console: Console;