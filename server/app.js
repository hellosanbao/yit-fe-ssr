const Koa = require('koa')
const Router = require('koa-router')
const static = require('./middleware/static')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const devSatic = require('./uitl/devStatic')
const c2k = require('koa-connect')
const proxy = require('http-proxy-middleware')

const app = new Koa()
const router = new Router()

//获取NODE_ENV变量
const NODE_ENV = process.env.NODE_ENV
app.use(async(ctx,next)=>{
    console.log(ctx.path)
    await next()
})
//生产环境
if(NODE_ENV!='development'){
    const serverEntry = require('../dist/server-entry').default
    //获取客户端打包后的index.html模板字符串
    const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf-8')
    //将所有请求路由前缀为/static的请求做静态资源引用处理
    app.use(static('/static',path.join(__dirname,'../dist/')))
    
    router.get('*',async (ctx)=>{
        //使用renderToString方法将serverEntry的内容转化成返回给客户端的字符串
        let renderString = ReactSSR.renderToString(serverEntry)
        //将转化后的字符串替换到模板中<!-- app -->标记的位置，然后返回给客户端
        renderString = template.replace('<!-- app -->',renderString)
        ctx.body = renderString
    })
}else{
    app.use(c2k(proxy('/static',{ target:'http://0.0.0.0:8080',changeOrigin:true})))
    // 开发环境
    devSatic(router)
}
app.use(router.routes())   //应用路由
app.listen(3333,'0.0.0.0') //监听3333端口

console.log('server start listrn http://0.0.0.0:3333')