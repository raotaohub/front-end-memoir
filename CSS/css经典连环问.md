## 什么是标签语义化

标签语义化就是标签和内容具有相互对应的关系。比如表示文章内容可用<article>,文章的标题可以用 h1~h6 标签。
这样做的好处是便于开发人员阅读，利于 SEO 爬虫搜索

## H5 在语义化方面新增哪些标签

● <title> 文档的标题
● <head> 头部
● <header> 首页
● <footer> 页脚
● <section>
● <main> 主要内容
● <nav> 一部分
● <article>
● <ul> 有序标签
● <ol> 无序标签

## 那你知道行内和块级元素有什么区别？

● 块级元素会撑满父元素。每个块级元素会独占一行。可以设置宽高。可以包含块级元素和行内元素。
● 行内元素的宽高由内容决定。行内元素不会独占一行。不可以设置宽高。只能包含行内元素。

## 要如何转换行内和块级元素？

● display: inline;
● display: inline-block;
● display: block;

## 块级盒子（Block box） 和 内联盒子（Inline box）

在 CSS 中我们广泛地使用两种“盒子” —— 块级盒子 (block box) 和 内联盒子 (inline box)。
这两种盒子会在页面流（page flow）和元素之间的关系方面表现出不同的行为：
块级的（block）盒子会表现出以下行为：
● 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
● 每个盒子都会换行
● width 和 height 属性可以发挥作用
● 内边距（padding）, 外边距（margin）和 边框（border）会将其他元素从当前盒子周围“推开”
除非特殊指定，诸如标题 (<h1>等) 和段落 (<p>) 默认情况下都是块级的盒子。

内联的（inline）盒子会表现出以下行为：
● 盒子不会产生换行。
● width 和 height 属性将不起作用。
● 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。
● 水平方向的内边距、外边距以及边框会被应用且会把其他处于 inline 状态的盒子推开。
用做链接的 <a> 元素、 <span>、 <em> 以及 <strong> 都是默认处于 inline 状态的。
我们通过对盒子 display 属性的设置，比如 inline 或者 block ，来控制盒子的外部显示类型。

display: none 和 visibility: hidden 有什么区别？
● opacity？ 元素透明度
● z-index？ 层叠顺序（z-index 必须设置定位才生效）

## link 和@import 的区别

link：<link src='css.css' rel='xxx' rss='xxx'></link> 是同步执行的，除了可以引入 CSS 文件，还可以定义 rel rss。可以用 js 动态引入
@import：@import 引入的 css 需要等到页面加载完成后才被加载，会导致闪烁。不可以 js 引入

## 知道 BFC 是什么吗？

### 一、首先需要了解 CSS 定位方案

1.普通流 normal flow 2.浮动流 float
● 元素的 float 不为 none 3.绝对定位流

### 二、什么是 BFC

Block Formatting Contexts (块级格式化上下文) 属普通流

### 三、触发 BFC 的条件？

1. body 元素
2. float 不为 none 以外的值
3. overflow 不为 visible 以外的值
4. display 设置
   a. inline-block 行内块级元素
   b. table-cells 表单元素
   c. flex 或者 inline-flex 弹性盒子
   d. grid 或者 inline-grid 网格盒子
5. position 设置 absolute 或 fixed

### 四、BFC 的特性

1. 外边距折叠 margin 取大的值 margin 坍塌
   解决方法：将元素放在不同的 BFC 容器中
2. 可以包含 浮动元素 并 被其撑大
通常浮动元素会脱离普通文档流转为 浮动流
<div style="border: 1px solid #000;"> // 父元素
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div> // 子元素
</div>

<div style="border: 1px solid #000;overflow: hidden"> // 父元素
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div> // 子元素
</div>

1. BFC 可以阻止被浮动元素的覆盖在上面
<div style="height: 100px;width: 100px;float: left;background: lightblue">
    我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px;background: #eee">
    我是一个没有设置浮动,也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;
</div>

<div style="height: 100px;width: 100px;float: left;background: lightblue">
    我是一个左浮动的元素
</div>
<div style="width: 200px; height: 200px;background: #eee;overflow:hidden">
    我是一个没有设置浮动,但是触发 BFC 元素, width: 200px; height:200px; background: #eee;
</div>

### 五、有哪些清除浮动的方法？

> 企业级清除浮动
> 在浮动元素的后方加一个盒子 clearfix 并设置
> clearfix{

    content:'';
    clear:both;
    display:blok;
    font-size:0px;
    height:0px;
    visibility:hidden;

}

如何实现在没有固定宽高的情况下，水平垂直居中呢？
一、flex 布局
父元素{
display:flex;
algin-items:center;
justify-content:center;
}

二、grid 布局
父元素{
display:grid;
//algin-items:center;
//justify-content:center;
place-items: <align-items> <justify-items>;
}

三、子绝父相 全 0 + margin auto
父元素{
position:relative;
}
子元素{
position:absolut;
top:0;
right:0;
bottom:0;
left:0;
margin:auto;
}

四、子绝父相 50% + -50%
父元素{
position:relative；
}
子元素{
position:absolut;
top：50%;
left:50%;
transform:transformX(-50%);transformY(-50%)
}

五、盒模型
概念：在 CSS 中所有元素都被一个个 盒子 所包裹，不同盒模型下宽高的值采用不同的计算方式。
设置盒模型。
/_ box-sizing _/
.{
box-sizing: content-box; //是 W3C 盒子模型 height 和 width 不包括 padding + border
box-sizing: border-box; //是 IE 盒子模型 height 和 width 包括 padding + border
}
