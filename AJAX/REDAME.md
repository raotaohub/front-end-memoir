<!--
 * @Author: raotaohub
 * @Date: 2021-02-25 00:08:23
 * @LastEditTime: 2021-02-25 00:16:44
 * @LastEditors: raotaohub
 * @FilePath: \AJAX\REDAME.md
 * @Description: Edit......
-->

# 原生 AJAX 的使用

## AJAX 请求 4 步

1. 创建 XMLHttpRequest 实例

```js
const xhr = new XMLHttpRequest();
```

2. 初始化设置

```js
xhr.open(methodName, url);
```

3. 发送

```js
xhr.send();
```

4. 监听状态码

```js
xhr.onreadystatechange() = () => {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // 执行请求成功的操作
    } else {
      // 执行请求失败的操作
    }
  }
};
```

5. 其他【设置请求头】

```js
xhr.setHeader("xxxx", "xxxx");
```

## JSONP 跨域

- 原理是利用 script 标签的跨域漏洞。通过新增一个 script 标签，写入需要请求的地址，将它新增在 body 底部，请求完成删除。

1.
