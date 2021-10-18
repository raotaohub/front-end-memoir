const path = require('path')
//安装插件HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
//dist清理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//导入ts路径配置插件
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// module.exports = {
//   entry:{
//     index: "./src/index.js"
//   }
//   // output: {
//   //   filename: 'bundle.js',
//   //   path: '../dist'
//   // },
//   module: {
//     rules: [
//       {
//         oneOf: [
//           {
//             test: /\.(js|jsx|ts|tsx)$/,
//             exclude: /node-modules/,
//             loader: 'babel-loader',
//             options: {
//               // 开启babel缓存
//               cacheDirectory: true
//             }
//           },
//           {
//             test: /\.css$/,
//             use: [
//               // 将css提取成单独的文件
//               MiniCssExtractPlugin.loader,
//               'css-loader'
//             ]
//           },
//           {
//             test: /\.scss$/,
//             use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
//           },
//           {
//             test: /\.(png|svg|jpg|gif)$/,
//             use: [
//               {
//                 loader: 'url-loader',
//                 options: {
//                   limit: 8192,
//                   name: 'imgs/[name]_[hash:8][ext]',
//                   fallback: 'file-loader?name=imgs/[name]_[hash:8][ext]'
//                 }
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
//   // resolve: {
//   //   extensions: ['.ts', '.tsx', '.js'],
//   //   plugins: [
//   //     new TsconfigPathsPlugin({
//   //       // 配置文件引入 tsconfig.json
//   //       // configFile: resolve('tsconfig.json')
//   //       configFile: path.join(__dirname, '../tsconfig.json')
//   //     })
//   //   ]
//   // },
// }

module.exports = {
  mode: 'development',
  entry: {
    index: '../src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: '学习Vue的响应式原理mvvm'
    })
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {}
}
