## 配置代理
devServer：{
    proxy：{
        target:'xxxxxxxxxx' // 代理地址
    }
}

DevServer
devServer.proxy
https://webpack.docschina.org/configuration/dev-server/#devserverproxy

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.IS_DEV': JSON.stringify(true)
    })
  ],
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, '../dist'),
    port: 8000,
    stats: 'errors-only',
    proxy: {
      '/devApi/': {
        // target: 'http://fhyapi.fhd001.com',
        target: 'http://mgrapi.fhd001.com',
        changeOrigin: true,
        pathRewrite: {
          '^/devApi/': ''
        }
      }
    }
  },
  devtool: 'inline-source-map'
}