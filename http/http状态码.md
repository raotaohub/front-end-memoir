# HTTP 响应状态码

## 概述

HTTP 响应状态码用来表示一个请求是否完成，响应被归类为以下 5 大类

1. 1\*\* 消息
2. 2\*\* 成功
3. 3\*\* 重定向
4. 4\*\* 客户端错误
5. 5\*\* 服务端错误

## 1\*\* 消息

## 2\*\* 成功

1. 200 成功

## 3\*\* 重定向

1. 300 拥有多个重定向
2. 301 永久重定向，并给出新的 URL
   ```shell
   $ curl www.bilibili.com -vvv
   < HTTP/1.1 301 Moved Permanently
   < Server: Tengine
   < Date: Thu, 22 Oct 2020 08:04:59 GMT
   < Content-Type: text/html
   < Content-Length: 239
   < Connection: keep-alive
   < Location: https://www.bilibili.com/
   ```
3. 302 临时重定向，并给出新的 URL

   ```shell
    $ curl www.zhihu.com -vvv
    < HTTP/1.1 302 Found
    < Location: https://www.zhihu.com/
    < Content-Length: 0
    < X-NWS-LOG-UUID: 16068764905156850032
    < Connection: keep-alive
    < Server: Lego Server
    < Date: Thu, 22 Oct 2020 08:20:29 GMT
    < X-Cache-Lookup: Return Directly

   ```

4. 303 资源在别处，重定向时要通过 get 请求获取

5. 304 资源没有改变 Not Modify

6. 307 暂时重定向，重定向时时不能改变 HTTP 请求方式

## 4\*\* 客户端错误

1. 400 请求报文错误
2. 401 请求需要身份验证
3. 403 拒绝请求，无可奉告
4. 404 找不到所请求的资源。
5. 429 限制请求速率 git 推送常见

## 5\*\* 服务端错误

1. 500 服务器内部错误
2. 502 上游服务失败
3. 503 服务器过载，稍后重试
4. 504 getaway timeout 超时
