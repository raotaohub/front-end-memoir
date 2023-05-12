# script 标签的加载

```js
<script src="app.js"></script>
<script defer src="app.js"></script>
<script async src="app.js"></script>
```

1. 默认情况下 script 标签的执行是从上到下的，download 和会阻塞 HTML parse。【阻塞】
2. async 加载，script download 和 HTML parse 并行，一但 script 下载完成，就执行 JS 代码（对内联 script 无效）。【可能阻塞】
3. defer 加载，script download 和 HTML parse 并行，HTML 解析完成后，执行 JS 代码（对内联 script 无效）。【不阻塞】

https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html

通常，您希望尽可能使用异步，然后推迟然后不执行任何属性。以下是一些要遵循的一般规则：
如果脚本是模块化的并且不依赖于任何脚本，请使用异步。
如果脚本依赖于另一个脚本或被另一个脚本依赖，则使用 defer。
如果脚本很小并且被异步脚本所依赖，则使用内联脚本，在异步脚本上方没有放置任何属性。
