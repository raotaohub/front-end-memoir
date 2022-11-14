# 关于 http 缓存

## 概念

HTTP 缓存请求结果，实现将缓存，应用于后续请求的策略，达到减少请求，优化加载速度的效果。

## 缓存的开关

1. 强缓存
   - Cache-Control : 
     - no-cache ; 不使用缓存，但不会阻止 ；`max-age=0` 和 `must-revalidate` 的组合与 `no-cache` 具有相同的含义。
     - no-store ; 不储存任何的缓存 ； 
     - public ;   任何情况都缓存该资源 。
     - must-revalidate ； 必须向源服务器发起请求
2. 协商缓存

## 1.强缓存策略（长期缓存）

通过响应头 Cache-Control : max-age = date ；如

```js
Cache-Control: max-age=604800
```

对于示例响应，max-age 的含义如下：

如果响应的 age 小于一周，则响应为 fresh。
如果响应的 age 超过一周，则响应为 stale。
只要存储的响应保持新鲜（fresh），它将用于兑现客户端请求。

> 在 HTTP/1.0 中，新鲜度过去由 Expires 标头指定; 如果同时存在 max-age > Expires



[HTTP Caching]([draft-ietf-httpbis-cache-19](https://datatracker.ietf.org/doc/html/RFC9111#section-5.2.2.9))

## 2. 协商缓存（重验证缓存）

配置 Cache-Control: max-age=0; no-cache;



`在响应标头中携带`
Etag : hash
LAST-MODIFIED : date

`在请求标头中携带`
If-Modified-Since : date 时间
If-None-Match : hash	 哈希值

概念:
过期的请求不会被立即抛弃，而是比较`时间`|`标记`的机制，询问服务器是否将过期的响应，转化为新的响应。

请求过程
客户端请求服务端时，通过比较`请求标头`中

If-Modified-Since 或 If-None-Match 中的哈希值，与`响应标头` Etag 是否一致

若不一致 , 则返回 200 资源获取成功，并缓存该资源
若为一致 , 则返回 304 Not Modified ，从缓存中获取





## 实际运用

1. 版本化 URL 的长期缓存，如 abcd123.js 带有 hash 值的资源

设置 Cache-Control: max-age=31536000

2. 非版本化 URL 的协商缓存，如inde.html 、 xxx.png 



**相关资料**

[MDN-HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E6%A6%82%E8%A7%88)

[使用 HTTP 缓存避免不必要的网络请求 (web.dev)](https://web.dev/http-cache/)

[Configuring HTTP caching behavior (web.dev)](https://web.dev/codelab-http-cache/)

[HTTP 缓存流程图 (web.dev)](https://web.dev/http-cache/#flowchart)
