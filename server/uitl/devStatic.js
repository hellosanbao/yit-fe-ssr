const axios = require('axios')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const reactDomServer = require('react-dom/server')
const bootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const path = require('path')
const { Helmet } = require('react-helmet')
const mfs = new MemoryFs

const serverConfig = require('../../build/webpack.config.server')
const devServerConfig = require('../../build/decServerConfig')

const webpackCompiler = webpack(serverConfig)
let serverBundle, creatAppStore

const getTemplate = () => {
  const fetchUrl = `${devServerConfig.publicPath}server.ejs`
  return new Promise((resolve, reject) => {
    axios.get(fetchUrl)
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
webpackCompiler.outputFileSystem = mfs
function wbpackBuildFinish () {
  if (serverBundle) {
    return Promise.resolve(true)
  }
  return new Promise((resolve) => {
    webpackCompiler.watch({}, (err, stats) => {
      if (err) throw err
      stats = stats.toJson()
      stats.errors.forEach(err => console.error(err))
      stats.warnings.forEach(warn => console.warn(warn))
      const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
      const bundle = mfs.readFileSync(bundlePath, 'utf-8')
      serverBundle = eval(bundle).default // eslint-disable-line
      creatAppStore = eval(bundle).creatAppStore // eslint-disable-line
      resolve(true)
    })
  })
}
const getStores = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (app) => {
  app.use(async (ctx, next) => {
    await wbpackBuildFinish()
    if (!ctx.url.startsWith('/api')) {
      const routerContext = {}
      const stores = creatAppStore()
      const app = serverBundle(stores, routerContext, ctx.url)
      await bootstrap(app)
      // bootstrap(app).then(async (ctx) => {
      const template = await getTemplate()
      const content = reactDomServer.renderToString(app)
      if (routerContext.url) {
        ctx.status = 302
        ctx.set('Location', routerContext.url)
      }
      const helmet = Helmet.renderStatic()
      // console.log(helmet.base.toString())
      const state = getStores(stores)
      ctx.body = ejs.render(template, {
        appString: content,
        initialState: JSON.stringify(state),
        helmet: helmet
      })
      // ctx.body = template.replace('<!-- app -->', content)
      // })
      next()
    }
  })
}
