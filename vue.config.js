module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule('scss')
  //     .test(/\.scss$/)
  //     .use(['vue-style-loader', 'css-loader', 'sass-loader'])
  //     .loader('sass-loader')
  // }
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less$/,
          loader: ['style', 'css', 'less']
        }
      ]
    }
  }
  // configureWebpack: config => {
  //   config.module.rules.push({
  //     test: /\.less$/,
  //     loader: ['style','css','less']
  //     // use: ['style-loader','css-loader','less-loader']
  //   })
  // }
}
