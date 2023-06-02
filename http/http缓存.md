# 关于 HTTP 之浏览器缓存与服务器重验证缓存

> 前言 1.吃饱撑着。

其实我也不懂这 2 种缓存机制到底叫什么，浏览器缓存对应强缓存，服务器重校验缓存对应协商缓存。hash 对应 etag。

## 概念

HTTP 缓存请求结果，实现将缓存，应用于后续请求的策略，达到减少请求，优化加载速度的效果。

## 缓存的 2 种机制

1.  强缓存，**由浏览器确定缓存资源是否可用**
    - Cache-Control :
      - no-cache ; 不使用缓存，但不会阻止 ；
        > `max-age=0` 和 `must-revalidate` 的组合与 `no-cache` 具有相同的含义。
      - no-store ; 不储存任何的缓存 ，意味着资源由服务器直接返回；
      - public ; 任何情况都缓存该资源 。
      - must-revalidate ； 必须向源服务器发起请求
      - max-age:`秒`相对时间
    - Expires
      - `GMT`绝对时间
2.  协商缓存，**由服务器确定缓存资源是否可用**
    - 通过比对资源的 hash 值 和 date 有效期，由服务器判断资源是否匹配，匹配返回 304 从浏览器读取，否则返回 200 和最新资源。

### <a id="where_did_cache_from">1. 缓存从何而来</a>

`客户端` **第一次** 请求 `服务端`得到响应体时，**浏览器**根据 `Cache-Control`字段决定是否要缓存到浏览器中。

### 2. Cache-Control 通用消息头可以调整缓存机制

- **请求体中的** `Cache-Control`：

  - no-cache：强制每次请求都要向服务器验证资源是否过期`（启用协商缓存机制）`；
  - no-store：禁止任何形式的缓存`（别存到我浏览器里）`；
  - max-age=xxx：用于指定从请求发出开始，客户端愿意接受的响应的最长缓存`秒`数；

- **响应体中的** `Cache-Control`：
  - public：响应可以被客户端和代理服务器缓存；
  - private：响应只能被客户端缓存，不能被代理服务器缓存；
  - no-cache：缓存前必须向服务器验证资源是否过期`（不允许缓存，必须用协商缓存校验）`；
  - no-store：禁止任何形式的缓存`(别存到浏览器里)`；
  - max-age=xxx：资源在 xxx 秒内可以从缓存中读取，不必再向服务器请求；

### 3. 易混淆点

1.  **请求头中** no cache 和 no store 的区别：

    1.  `no cache`，我浏览器不直接使用本地缓存，而要以`协商缓存的机制`重校验是否可用。
    2.  `no store`代表绝对不能被缓存（缓存协议各个版本 7788 的太多了怕漏）

2.  **响应头中** no cache 和 no store 的区别：

    1.  `no cache`不代表不缓存，被浏览器缓存的响应，再次使用时，需要向我服务器重校验。
    2.  `no store`代表绝对不能被缓存，浏览器以及其他 7788 的东西都不能。

3.  **请求头**和**响应头中**的 `max-age`有什么区别
    1.  **对于这个时间** 注意本概念适用上下文超出该标签范围
        1.  对于客户端是指`我发出时`，倘若浏览器有缓存，我可以直接使用 max-age 秒内的缓存。
        2.  对于服务器是指`被接收时`，这个资源被接收时，max-age 秒内我希望接收方`可以`不用再向我请求。

> 由于是通用标头的通用属性，因此要分清楚是谁对谁。

## 2 种机制的例子说明

### 1.强缓存策略（长期缓存）

#### 1. 通过`响应头` Cache-Control : max-age = date ；如

##### 服务端视角

```js
Cache-Control: max-age=604800
```

对于这个响应，max-age 的含义如下：

如果响应的 age 小于一周，则响应为 fresh。
如果响应的 age 超过一周，则响应为 stale。
只要存储的响应保持新鲜（fresh），它将用于兑现客户端请求。

##### 客户端视角

现在客户端进行第一次请求，并缓存了该响应。
现在客户端进行第二次请求，因为已经缓存该响应，那么在绝对时间`604800秒`内浏览器不会真正的将 HTTP 请求发到服务器。

#### 2. 通过`请求头` Cache-Control : max-age = date ；如

```js
Cache-Control: max-age=604800
```

##### 客户端端视角

若已有该资源缓存，并且该缓存的`max-age`在该请求发出时的绝对时间`604800秒`内，浏览器直接使用缓存，否则发送真实 HTTP 请求到服务器。

##### 服务端视角

当 HTTP 请求到达服务器，乖乖交出资源。

[HTTP Caching](<[draft-ietf-httpbis-cache-19](https://datatracker.ietf.org/doc/html/RFC9111#section-5.2.2.9)>)

### 2. 协商缓存（重校验缓存）

> 例子:请求头配置 Cache-Control: max-age=0; no-cache; 这意味着每次请求都要重校验

#### `在请求标头中携带`

**If-Modified-Since** : date 时间

**If-None-Match** : hash 哈希值

> 从<a href="#where_did_cache_from">缓存从何而来</a>得知，请求头中上述 2 个值，就是在首次请求时，获得的响应中得到的。

#### `在响应标头中携带`

**LAST-MODIFIED** : date 时间

**Etag** : hash 哈希值

概念:

> 过期的请求不会被立即抛弃，而是比较`时间`|`标记`的机制，询问服务器是否将过期的响应，转化为新的响应。

#### 请求过程

**客户端**发起 HTTP 请求，并在`请求标头`的`Cache-Control`字段携带：

1.  If-Modified-Since: date 时间
2.  If-None-Match : hash 哈希值

**服务端**接收请求，比对`请求头`中
If-Modified-Since 中的 date 时间 或 If-None-Match 中 hash，与当前资源的 LAST-MODIFIED 或 Etag 是否一致：

1.  若不一致 , 则返回 200 资源获取成功，并缓存该资源。

2.  若为一致 , 则返回 304 Not Modified ，从缓存中获取。

不像强缓存那章啰嗦一通了！

## 实际运用

1.  版本化 URL 的长期缓存，如 abcd123.js 带有 hash 值的资源;

```js
设置 Cache-Control: max-age=31536000
```

2.  非版本化 URL 的协商缓存，如 inde.html 、 xxx.png

```js
设置 Cache-Control: max-age=0;
```

大白话：

- 有版本的资源，比如 react,react-dom，你不升级他打包后的 hashcontent 压根不变，走强缓存，省的用户每次请求。
- 没版本的如 index.html，这东西走强缓存不是麻烦了，万一更新了，客户端还傻傻用缓存会出问题。必须协商缓存，每次都来验证。

## 授之于鱼叉

**相关资料**

ChatGPT

[MDN-HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E6%A6%82%E8%A7%88)

[使用 HTTP 缓存避免不必要的网络请求 (web.dev)](https://web.dev/http-cache/)

[Configuring HTTP caching behavior (web.dev)](https://web.dev/codelab-http-cache/)

[HTTP 缓存流程图 (web.dev)](https://web.dev/http-cache/#flowchart)
