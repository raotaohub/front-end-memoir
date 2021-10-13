const path = require("path");
//安装插件HtmlWebpackPlugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
//dist清理插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: "学习Vue的响应式原理mvvm"
        })
    ],
    output: {
        // filename: 'bundle.js',
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {}
};
