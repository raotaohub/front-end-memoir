const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

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
    contentBase: './dist',
    port: 8000,
    stats: 'errors-only'
  },
  devtool: 'inline-source-map'
}

module.exports = merge(commonConfig, devConfig)
