const { createConfig, entryPoint, performance, setOutput } = require('@webpack-blocks/webpack')

const elm = require('../..')
const path = require('path')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'main.js')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  elm({ cwd: __dirname }, true),
  performance({
    maxAssetSize: 200000,
    maxEntrypointSize: 500000,
    hints: 'error'
  })
])
