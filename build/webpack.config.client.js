const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const devServerConfig = require('./decServerConfig')
const NODE_ENV = process.env.NODE_ENV
const config = {
    //打包模式，默认为production，会压缩打包的代码，开发模式设置成development可以提高打包速度
    mode: NODE_ENV || 'production',
    //入口
    entry: {
        main: [
            path.join(__dirname,'../client/main.js')
        ] 
    }, 
    //出口
    output: {
        //导出文件名 [name]是原文件名 [hash]为随机hash串
        filename: '[name].[hash].js',
        //文件导出的位置，此处设置的为根目录下的dist目录
        path: path.join(__dirname,'../dist'),
        //静态资源引入的路径，此处设置为/static，则编译后的静态资源引用为: /static/xxx.js之类
        publicPath: 'http://0.0.0.0:8080/static/'
    },
    module: {
        rules: [
            {
                enforce:'pre',
                test: /.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude:[path.resolve('../node_modules')]
            },
            {
                test: /.(js|jsx)$/,
                loader: 'babel-loader',
                exclude:[path.resolve('../node_modules')]
            }
        ]
    },
    plugins:[
        //html生成插件
        new htmlWebpackPlugin({
            //定义模板为client下的index.html
            template: path.join(__dirname, '../client/index.html')
        })
    ]
}

if(NODE_ENV == 'development'){
    //开发环境启用webpack-dev-server
    config.devServer = devServerConfig
    //添加webpack模块热加载插件
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config