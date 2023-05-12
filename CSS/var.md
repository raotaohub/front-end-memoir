[var() - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)

```css
:root {
  --main-bg-color: pink;
}

body {
  background-color: var(--main-bg-color, <回退值>);
}
```
