const path = require('path')
module.exports = {
    //server启动的host名
    host:'0.0.0.0',
    //server监听的端口
    port:'8080',
    //server启动的根目录
    contentBase:path.join(__dirname,'../dist'),
    //启用热替换功能
    hot:true,
    hotOnly:true,
    //服务启动后自动打开浏览器
    open:false,
    //当应用出错时，在页面上出现黑色弹层展示错误信息
    overlay:{
        errors:true
    },
    //添加devServer请求前缀，与output的public保持一致
    publicPath:'http://0.0.0.0:8080/static/',
    //所有的404请求都返回到index
    historyApiFallback:{
        index:'/static/index.html'
    },
    proxy:{
      '/api':'http://0.0.0.0:3333'
    },
    setup: function(app) {
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*') // 第二个参数表示允许跨域的域名，* 代表所有域名
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
            // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
            if (req.method == 'OPTIONS') {
                res.sendStatus(200)
            } else {
                next()
            }
        })
    }
}
