const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const proxy = require('http-proxy-middleware')
const devSatic = require('./uitl/devStatic')

const app = express()

//获取NODE_ENV变量
const NODE_ENV = process.env.NODE_ENV
//生产环境
if (NODE_ENV != 'development') {
    const serverEntry = require('../dist/server-entry').default
    //获取客户端打包后的index.html模板字符串
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    //将所有请求路由前缀为/static的请求做静态资源引用处理
    app.use('/static', express.static(path.join(__dirname, '../dist')))

    app.get('*', async (req, res, next) => {
        //使用renderToString方法将serverEntry的内容转化成返回给客户端的字符串
        let renderString = ReactSSR.renderToString(serverEntry)
        //将转化后的字符串替换到模板中<!-- app -->标记的位置，然后返回给客户端
        renderString = template.replace('<!-- app -->', renderString)
        res.send(renderString)
    })
} else {
    app.use('/static', proxy({
        target: 'http://0.0.0.0:8080'
    }))
    // 开发环境
    devSatic(app)
}
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3333

app.listen(port, host, function () {
    console.log(`server is listening on http://${host}:${port}`)
})