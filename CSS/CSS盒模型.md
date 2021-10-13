# 盒模型

在 CSS 中所有元素都被一个个‘盒子’所包裹

1. W3C 标准盒模型：
    - height 和 width 不包括 padding + border
2. IE 盒模型：
    - height 和 width 包括 padding + border
3. 如何通过 CSS 设置

```css
 {
    box-sizing: content-box; /* 是W3C盒子模型 */ 内容盒子
    box-sizing: border-box; /* 是IE盒子模型 */ 边框盒子
}
```

# BFC 的应用和清除浮动

## 现有的 CSS 定位方案

1. 普通流 normal flow
2. 浮动流 float 元素的 float 不为 none
3. 绝对定位流

## 二、什么是 BFC

Block Formatting Contexts (块级格式化上下文) 属**普通流**

## 三、触发 BFC 的条件？

1. body 元素
2. float 不为 none 以外的值
3. overflow 不为 visible 以外的值
4. display 设置
    1. inline-block 行内块级元素
    2. table-cells 表单元素
    3. flex 或者 inline-flex 弹性盒子
    4. grid 或者 inline-grid 网格盒子
    5. table-cells 表单元素 3.
5. position 设置 absolute 或 fixed
6. 等等..

## 居中问题

```css
/* 一、flex布局 */
.父元素{
    display:flex;
    algin-items:center;
    justify-content:center;
}

/* 二、grid布局 */
.父元素{
    display:grid;
    //algin-items:center;
    //justify-content:center;
    place-items: <align-items> <justify-items>;
}

/* 三、子绝父相 全0 + margin auto */
.父元素{
    position:relative;
}
.子元素{
    position:absolut;
    top:0;
    right:0;
    bottom:0;
    left:0;
    margin:auto;
}

/* 四、子绝父相 偏移 50% + -50% */
.父元素{
    position:relative；
}
.子元素{
    position:absolut;
    top：50%;
    left:50%;
    transform:transformX(-50%);transformY(-50%)
}
```

## link 和@import 的区别

-   link：<link src='css.css' rel='xxx' rss='xxx'></link> 是同步执行的，除了可以引入 CSS 文件，还可以定义 rel rss。可以用 js 动态引入
-   @import：@import 引入的 css 需要等到页面加载完成后才被加载，会导致闪烁。不可以 js 引入
