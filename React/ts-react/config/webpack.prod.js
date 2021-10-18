const { merge } = require('webpack-merge')

const webpack = require('webpack')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 打包速度分析
const speedMeasurePlugin = new SpeedMeasurePlugin()
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const prodConfig = speedMeasurePlugin.wrap({
  mode: 'production',
  plugins: [
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano')
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportTitle: 'bundle-analyzer-report',
      reportFilename: 'bundle-analyzer-report.html'
    }),
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
  },
  stats: 'errors-only'
})

module.exports = merge(baseConfig, prodConfig)
