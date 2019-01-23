const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpacMerge = require('webpack-merge')

const devServerConfig = require('./decServerConfig')
const baseConfig = require('./webpack.base')
const NODE_ENV = process.env.NODE_ENV
const config = webpacMerge(baseConfig,{
  //打包模式，默认为production，会压缩打包的代码，开发模式设置成development可以提高打包速度
  mode: NODE_ENV || 'production',
  //入口
  entry: {
    main: [
      path.join(__dirname, '../client/src/client-entry.js')
    ]
  },
  //出口
  output: {
    //导出文件名 [name]是原文件名 [hash]为随机hash串
    filename: '[name].[hash].js',
  },
  plugins: [
    //html生成插件
    new htmlWebpackPlugin({
      //定义模板为client下的index.html
      template: path.join(__dirname, '../client/src/index.html')
    }),
    new htmlWebpackPlugin({
      //定义模板为服务端渲染的模板文件
      template: '!!ejs-compiled-loader!'+path.join(__dirname, '../client/src/server.ejs'),
      filename:'server.ejs'
    })
  ]
})

if (NODE_ENV == 'development') {
  //开发环境启用webpack-dev-server
  config.devServer = devServerConfig
  //添加webpack模块热加载插件
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
