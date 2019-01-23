const path = require('path')
const webpacMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
module.exports = webpacMerge(baseConfig,{
  //webpack打包内容的执行环境设置成node执行环境
  target: 'node',
  //打包模式，默认为production，会压缩打包的代码，开发模式设置成development可以提高打包速度
  // mode: 'development',
  //入口
  entry: {
    main: path.join(__dirname, '../client/src/server-entry.js')
  },
  //出口
  output: {
    //导出文件名
    filename: 'server-entry.js',
    //打包结果使用commonjs2的模块加载方案
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [path.resolve('../node_modules')]
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  }
})
