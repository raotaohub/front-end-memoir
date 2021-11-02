const { merge } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 打包速度分析
const speedMeasurePlugin = new SpeedMeasurePlugin()

const prodConfig = speedMeasurePlugin.wrap({
   mode: 'production',
   plugins: [
      new webpack.DefinePlugin({
         'process.IS_DEV': JSON.stringify(false)
      })
   ],
   optimization: {
      // 提取公用包
      splitChunks: {
         cacheGroups: {
            default: false,
            vendors: false,
            basic: {
               test: /(react|react-dom|react-router-dom)/,
               name: 'basic',
               priority: 30,
               enforce: true, // 忽略minSize,minChunks,maxAsyncRequests,maxInitialRequests等选项
               chunks: 'initial'
            },
            antd: {
               test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
               name: 'antd',
               priority: 20,
               enforce: true,
               chunks: 'initial'
            },
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               chunks: 'initial',
               enforce: true,
               priority: 10,
               name: 'vendor'
            },
            common: {
               chunks: 'all',
               minChunks: 2,
               enforce: true,
               priority: 5,
               name: 'common'
            }
         }
      },
      minimize: true
   },
   performance: {
      hints: false
   }
})

module.exports = merge(baseConfig, prodConfig)
