const Koa = require('koa')
const staticMiddleware = require('./middleware/static')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body')
const Router = require('koa-router')
const initApi = require('./api')
const devSatic = require('./uitl/devStatic')
const koaFavicon = require('koa-favicon')
const { exec } = require('child_process')

const app = new Koa()
// 格式化post请求参数
app.use(koaBody())

// api相关
const router = new Router({
  prefix: '/api'
})
// 加载路由
initApi(router)
// 应用路由
app.use(router.routes())

// 获取NODE_ENV变量
const NODE_ENV = process.env.NODE_ENV
app.use(koaFavicon(path.join(__dirname, '../favicon.ico')))
// 生产环境
if (NODE_ENV != 'development') {
  const serverEntry = require('../dist/server-entry').default
  // 获取客户端打包后的index.html模板字符串
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  // 将所有请求路由前缀为/static的请求做静态资源引用处理
  app.use(staticMiddleware('/static', path.join(__dirname, '../dist/')))

  app.use(async (ctx, next) => {
    if (ctx.method == 'GET' && !ctx.url.startsWith('/api')) {
      // 使用renderToString方法将serverEntry的内容转化成返回给客户端的字符串
      let renderString = ReactSSR.renderToString(serverEntry)
      // 将转化后的字符串替换到模板中<!-- app -->标记的位置，然后返回给客户端
      renderString = template.replace('<!-- app -->', renderString)
      ctx.body = renderString
    } else {
      await next()
    }
  })
} else {
  // 开发环境
  devSatic(app)
}

app.listen(3333, '0.0.0.0') // 监听3333端口
exec('yarn dev:client')
console.log('server start listrn http://0.0.0.0:3333')
console.log('and client start listrn http://0.0.0.0:8080')
