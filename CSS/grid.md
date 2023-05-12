## 一、grid 网格布局的基本概念 1.容器 container 项目 item

.container 元素 才能称为容器，而容器内的 .item 元素 则是项目

```html
<div class="container">
  <div class="item1">1</div>
  <div class="item2">2</div>
  <div class="item3">3</div>
  <div class="item4">4</div>
  <div class="item5">5</div>
</div>
```

2.网格线 行线 row lines ,列线 column lines
划分网格的线就是网格线，在一个 3\*3 的网格中，具有 4 根行线和 4 根列线。

3.行 和 列
● 每两条行线 row lines 之间即为行
● 每两条行线 column lines 之间即为列

1. 单元格 cell
   ● row lines 与 column lines 之间的区域就 单元格 cell
   ● 在 4 行线 \* 4 列线的网格中，有 9 个单元格

## 二、容器的属性

创建网格容器 display:grid
display:inline-grid

创建行 grid-template-rows replace()
函数

属性简写
grid-template
创建列 grid-template-column
创建区域模板 grid-template-areas

行间距 grid-rows-gap

    属性简写

grid-gap
列间距 grid-column-gap

控制块内元素在行轴上的
对齐方式 justify-items

    属性简写

place-items
控制块内元素在列轴上的
对齐方式 align-items

设置整个内容区域在容器的
水平位置 justify-content

    属性简写

place-content
设置整个内容区域在容器的
垂直位置 align-content

## 三、项目的属性

控制剩余行 gird-row <start-line> / <end-line>

控制剩余列 gird-column <start-line> / <end-line>

设置模板区域 grid-area

设置项目自身行轴对齐方式 justify-self

    place-self

设置项目自生列轴对齐方式 align-self

## 四、网格布局划分区域模板的使用

1.容器的属性：
grid-template-areas:
'header header header'
'advert content content'
'footer footer footer';

2.项目的属性：
grid-area: 填入容器模板区域对应的名字;
grid-area: 开始水平/开始垂直/结束水平/结束垂直;

3.注意点
需要为项目命名，然后在容器的 grid-template-areas 属性中定义位置。

CSS 网格: 使用媒体查询创建响应式布局 | freeCodeCamp.org

## 五、单位

fr：设置列或行占剩余空间的比例，
auto：设置列宽或行高自动等于它的内容的宽度或高度，
%：将列或行调整为它的容器宽度或高度的百分比，

## 实际使用 demo

可以实现复杂的布局

```css
.trade-form-content {
  .grid-wrapper {
    display: grid;
    column-gap: 0px;
    row-gap: 12px;

    grid-template-areas:
      "g1 g2 g3"
      "g4 g5 g6 "
      "g7 g8 g9 "
      "g10 g11 g12";

    grid-template-columns: 380px 380px 380px;
    grid-template-rows: repeat(4, auto);

    .g1 {
      grid-area: g1;

      .g1-1 {
        //...
      }
    }

    .g2 {
      grid-area: g2;
    }

    .g3 {
      grid-area: g3;
    }

    .g4 {
      grid-area: g4;
    }

    .g5 {
      grid-area: g5;
    }
    .g6 {
      grid-area: g6;
    }

    .g7 {
      grid-area: g7;
    }

    .g8 {
      grid-area: g8;
    }

    .g9 {
      grid-area: g9;
    }

    .g10 {
      grid-area: g10;
    }

    .g11 {
      grid-area: g11;
    }
    .g12 {
      grid-area: g12;
    }
  }

  // 通过 class 动态调整排列和渲染
  .collapse-wrapper,
  .one-click {
    .g4,
    .g5,
    .g6,
    .g7,
    .g8,
    .g9,
    .g10,
    .g11,
    .g12 {
      display: none;
    }

    .g3 {
      margin: 0 0 0 12px;
    }

    // 改布局
    .grid-wrapper {
      display: inline-grid;
      grid-template-columns: 362px 362px 300px;
      grid-template-rows: repeat(1, auto);
      row-gap: 0;
    }
  }
}
```

```css
.container {
  .grid-wrapper {
    display: grid;
    column-gap: 20px;
    row-gap: 20px;

    grid-template-areas:
      "g5 g2 g3 g4"
      "g5 g6 g7 g8"
      "g9 g10 g11 g12";

    grid-template-columns: 360px 344px 300px 360px;
    grid-template-rows: repeat(3, auto);

    .g1 {
      grid-area: g1;
    }

    .g2 {
      grid-area: g2;
    }
  }

  .collapse-wrapper,
  .one-click {
    .g5,
    .g6,
    .g7,
    .g8,
    .g9,
    .g10,
    .g11,
    .g12 {
      display: none;
    }

    .grid-wrapper {
      display: inline-grid;
      grid-template-columns: 362px 344px 300px 360px;
      grid-template-rows: repeat(1, auto);
      row-gap: 0;
    }
  }
}
```
