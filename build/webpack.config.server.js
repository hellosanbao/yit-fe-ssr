const path = require('path')
module.exports = {
    //webpack打包内容的执行环境设置成node执行环境
    target:'node',
    //打包模式，默认为production，会压缩打包的代码，开发模式设置成development可以提高打包速度
    mode: 'development',
    //入口
    entry: {
        main: path.join(__dirname,'../client/server-entry.js')
    }, 
    //出口
    output: {
        //导出文件名 [name]是原文件名 [hash]为随机hash串
        filename: 'server-entry.js',
        //文件导出的位置，此处设置的为根目录下的dist目录
        path: path.join(__dirname,'../dist'),
        //静态资源引入的路径，此处设置为/static，则编译后的静态资源引用为: /static/xxx.js之类
        publicPath: 'http://0.0.0.0:8080/static/',
        //打包结果使用commonjs2的模块加载方案
        libraryTarget:'commonjs2'
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                loader: 'babel-loader',
                exclude:[path.join(__dirname,'../node_modules')]
            }
        ]
    }
}