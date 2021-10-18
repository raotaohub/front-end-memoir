const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name]_[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
        options: {
          // 开启babel缓存
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          // 将css提取成单独的文件
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#2196f3',
                  'warning-color': '#fb8c00',
                  'success-color': '#4caf50',
                  'info-color': '#2196f3'
                }
              }
            }
          }
        ]
      }
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'imgs/[name]_[hash:8][ext]',
              fallback: 'file-loader?name=imgs/[name]_[hash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      // new TsconfigPathsPlugin({
      // 配置文件引入 tsconfig.json
      // configFile: resolve('tsconfig.json')
      // configFile: path.join(__dirname, '../tsconfig.json')
      // })
    ]
  },
  plugins: [
    // 将css提取成单独的文件
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugins({
      title: 'rao'
    })
  ],
  // 缓存生成的Webpack模块
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
}
