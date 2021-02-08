const proxy = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    proxy('/api1', // 指 凡是请求中带有该字段都转发给5000
      {
        target: "http://localhost:5000",// 指 转发的目标地址
        changeOrigin: true, // 指 是否表明真实的Host字段
        pathRewrite: {'^/api1': ''} // 指 替换匹配的字段再转发给服务器
      }
    ),
    proxy('/api2', // 指 凡是请求中带有该字段都转发给5000
      {
        target: "http://localhost:5001",// 指 转发的目标地址
        changeOrigin: true, // 指 是否表明真实的Host字段
        pathRewrite: {'^/api2': ''} // 指 替换匹配的字段再转发给服务器
      }
    ),
  )
}
// 正则匹配
