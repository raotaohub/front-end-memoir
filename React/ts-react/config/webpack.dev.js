const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.IS_DEV': JSON.stringify(<tru></tru>e)
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

module.exports = merge(baseConfig, devConfig)
