## sessionStorage

1. 关闭浏览器或窗口，会自动清除对应的 sessionStorage
2. 同源页面不可共享！（复制标签页会复制 sessionStorage，但不共享），（同源嵌套的 iframe 可共享 ⭐）
3. 刷新 或者是 恢复 页面，会保持原有的 sessionStorage

## localStorage

1. 没有过期时间，需要手动清除
2. 同源页面可共享

## Cookie 和 cookie

Cookie 是一个 HTTP 请求标头，其中含有先前由服务器通过 Set-Cookie 标头投放,
或通过 JavaScript 的 Document.cookie 方法设置，然后存储到客户端的 HTTP cookie 。

cookie 是以 key=value 的方式，以字符串形式保存的,一般不超过 4KB

主要属性有

- path            地址
- domain          域名
- expires/max-age 有效期
- secure          仅通过 https 传输
- httponly        不能使用JavaScript 操作 cookie
- 新增的
- sameSite        同站点 Cookie 发送策略
  1. Strict 严格的 仅允许一方请求携带 Cookie , 当前网页 URL 与请求目标 URL 完全一致
  2. Lax    宽松的 允许部分第三方请求携带 Cookie
  3. None   普通的 无论是否跨站都会发送 Cookie
- sameParty       跨站点 Cookie 发送策略

示例

```js
// 在客户端通过JavaScript设置
document.cookie = "raotao=test;max-age=200000;path=/;";
```

```js
//在服务端通过响应头Set-Cookie投放
document.cookie = "raotao=test;max-age=200000;path=/;";
```

保存cookie
1. 设置 cookie 不会覆盖之前的值 ，而是添加到原有的 cookie 中。除非设置了已有的cookie。
2. 设置时 必须使用 encodeURIComponent( )
3. 读取时 必须使用 decodeURIComponent( )
document.cookie = 'name = ' + encodeURIComponent( Document.referrer )


最终 cookie 会通过 http 请求，在服务端与客户端之间传输，无论是否需要都会一直携带。

- cookie 三方跨域

```json
sameSite 设置 none
cookie 设置 sameParty && cookie 设置 Secure && sameSite !== strict
```

后端配置 first-party-set 文件
```json
{
  "owner": ".taobao.com",
  "members": [".tmall.com", ".alimama.com"]
}

```

https://juejin.cn/post/7087206796351242248