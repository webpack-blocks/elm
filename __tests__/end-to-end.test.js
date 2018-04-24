import test from 'ava'
import jsdom from 'jsdom'
import path from 'path'
import webpack from 'webpack'

const fixturesPath = path.join(__dirname, '..', '__e2e-fixtures__')

test('building the elm project works', async (t) => {
  const projectPath = path.join(fixturesPath, 'elm')
  const buildPath = path.join(projectPath, 'build')

  const config = require(path.join(projectPath, 'webpack.config.js'))
  await runWebpack(config)

  global.window = await setUpJsdomEnv()
  global.document = global.window.document
  require(path.join(buildPath, 'bundle.js'))

  t.pass()
})

function runWebpack (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (error, stats) => {
      if (error) {
        reject(error)
      } else if (stats.hasErrors()) {
        stats.toJson().errors.forEach((error) => console.error(error, '\n'))
        reject(new Error('Webpack soft error occured. See stderr output.'))
      } else {
        resolve(stats)
      }
    })
  })
}

function setUpJsdomEnv () {
  return new Promise((resolve, reject) => {
    jsdom.env('<html><body></body></html>', (error, window) => {
      if (error) {
        reject(error)
      } else {
        resolve(window)
      }
    })
  })
}
