const path = require('path')
const { createConfig } = require('cep-bundler-webpack')

const config = createConfig({
    out: path.join(__dirname, 'dist'),
    type: 'extendscript',
    entry: './src/jsx/index.ts'
});

config.mode = process.env.IS_DEV ? 'development' : 'production'

module.exports = config