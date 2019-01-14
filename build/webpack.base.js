const path = require('path')
module.exports = {
  output:{
    //文件导出的位置，此处设置的为根目录下的dist目录
    path: path.join(__dirname, '../dist'),
    //静态资源引入的路径，此处设置为/static，则编译后的静态资源引用为: /static/xxx.js之类
    publicPath: 'http://0.0.0.0:8080/static/'
  },
  resolve:{
    extensions:['.js','.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [path.join(__dirname,'../node_modules')]
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname,'../node_modules')]
      }
    ]
  }
}
