const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

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
      port: 3030,
      hot: 'only',
      proxy: {}
   },
   devtool: 'source-map'
}

module.exports = merge(baseConfig, devConfig)
