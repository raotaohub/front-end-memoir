# AJAX 

[尚硅谷Web前端Ajax教程初学者零基础入门到精通全套完整版（ajax最新版）_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV1WC4y1b78y?p=30)

### 自动重启工具 和 express 

在文件目录下初始化
`$ npm init`

然后安装express
`$ npm install express --save`

安装nodemon
`npm install -g nodemon` 启动服务时 使用`nodemon server.js`

### 1.四步走

```javascript
  // 1.创建对象
  let xhr = new XMLHttpRequest()
  // 2.初始化 设置请求方式 和 url
  xhr.open('GET', 'http://127.0.0.1:8000/server')
  // 3.发送
  xhr.send()
  // 4.事件绑定 当状态码改变时时触发 readyState 是状态码 0 1 2 3 4 
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // 结果包含 行 头 空行 体
        console.log('相应行:', '状态码:' + xhr.status, '状态字符串:' + xhr.statusText,)
        console.log('响应头:', xhr.getAllResponseHeaders())
        console.log('响应体:', xhr.response)
        result.innerHTML = xhr.response
      }
    }
  }
```

### 2.服务端请求设置

```javascript
  // 1.引入
  const express = require('express')

  // 2.创建应用对象
  const app = express()

  // 3.创建路由规则
  app.get/post/delete.../all('地址',(request请求, response响应)=>{
    // 设置响应头 允许跨域 ; 允许任意头部
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Header', '*')
  })

```
### 3.服务端响应 json 数据
服务端只可以传递字符串，因此需要使用JSON转换
客户端接收有两种方式转换JSON数据
```javascript

1. 手动
   const data = JSON.parse(xhr.response)
2. 自动
   设置响应体数据
   xhr.responseType = 'json'

```

### 4.超时与异常处理

```javascript
  // 超时设置 超过该时间 则取消请求
  xhr.timeout = 2000

  // 超时回调
  xhr.ontimeout = () => console.log('超时拉~~~~~~~~~~~~~')

  // 网络异常
  xhr.onerror = () => alert('网络异常~~~~~~~~~~~~~')
```

### 5.取消请求

```javascript
  // abort方法
  xhr.abort()

```

### 6.重复发送请求

```javascript
  // abort方法
  xhr.abort()

```

### 7.跨域
  同源策略就是要求 端口 域名 地址 都相同 
  若有一项不同则为跨域

### 8.CORS
  在服务端设置

[跨源资源共享（CORS） - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#HTTP_响应首部字段)

```js
    // 服务端设置
    // 1. 引入
    // 2. 创建
    // 3. 定义路由规则
    app.get('/xxx', (request, response) => {
      // 设置CORS的方法 就是在响应头部添加如下格式的 规则
      response.setHeader('Access-Control-Allow-Headers', '*')
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.setHeader('Access-Control-Allow-Method', '*')
      ...

    })
```

