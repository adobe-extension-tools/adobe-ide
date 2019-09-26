const path = require('path')
const { createConfig } = require('cep-bundler-webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// const WrapperPlugin = require('wrapper-webpack-plugin')

const config = createConfig({
    devHost: '0.0.0.0', 
    out: path.join(__dirname, 'dist'),
    type: 'cep',
    entry: './src/js/index.tsx'
});

config.plugins.push(new MonacoWebpackPlugin({
    languages: ['json', 'javascript', 'typescript']
}))

config.mode = process.env.IS_DEV ? 'development' : 'production'
// config.plugins = config.plugins.filter(p => !(p instanceof WrapperPlugin))

console.log(config)
module.exports = config
