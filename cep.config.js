const path = require('path')
const { createConfig } = require('cep-bundler-webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const config = createConfig({
    devHost: '0.0.0.0', 
    out: path.join(__dirname, 'dist'),
    type: 'cep',
    entry: './src/js/index.tsx'
});

config.plugins.push(new MonacoWebpackPlugin({
    languages: ['json', 'javascript', 'typescript']
}))

module.exports = config