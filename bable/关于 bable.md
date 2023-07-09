### Babel

## 常见`plugin`和`Preset`

**所谓`Preset`就是一些`Plugin`组成的合集**,你可以将`Preset`理解称为就是一些的`Plugin`整合称为的一个包。

### 常见`Preset`

文章中列举了三个最常用的`Preset`，更多的`Prest`[你可以在这里查阅](https://link.juejin.cn?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-env "https://babeljs.io/docs/en/babel-preset-env")。

#### `babel-preset-env`

`@babel/preset-env`是一个智能预设，它可以将我们的高版本`JavaScript`代码进行转译根据内置的规则转译成为低版本的`javascript`代码。

`preset-env`内部集成了绝大多数`plugin`（`State > 3`）的转译插件，它会根据对应的参数进行代码转译。

具体的参数配置你可以在[这里看到](https://link.juejin.cn?target=https%3A%2F%2Fbabeljs.io%2Fdocs%2Fen%2Fbabel-preset-env%23options "https://babeljs.io/docs/en/babel-preset-env#options")。

> `@babel/preset-env`不会包含任何低于 Stage 3 的 JavaScript 语法提案。如果需要兼容低于`Stage 3`阶段的语法则需要额外引入对应的`Plugin`进行兼容。

> 需要额外注意的是`babel-preset-env`仅仅针对语法阶段的转译，比如转译箭头函数，`const/let`语法。针对一些`Api`或者`Es 6`内置模块的`polyfill`，`preset-env`是无法进行转译的。这块内容我们会在之后的`polyfill`中为大家进行详细讲解。

#### `babel-preset-react`

通常我们在使用`React`中的`jsx`时，相信大家都明白实质上`jsx`最终会被编译称为`React.createElement()`方法。

`babel-preset-react`这个预设起到的就是将`jsx`进行转译的作用。

#### `babel-preset-typescript`

对于`TypeScript`代码，我们有两种方式去编译`TypeScript`代码成为`JavaScript`代码。

1.  使用`tsc`命令，结合`cli`命令行参数方式或者`tsconfig`配置文件进行编译`ts`代码。
2.  使用`babel`，通过`babel-preset-typescript`代码进行编译`ts`代码。

### `babel`的工作流程

在日常前端项目中，绝大多数时候我们使用`babel`进行`js`代码的转化。

它的工作流程大概可以概括称为以下三个方面:

- `Parse`（解析）阶段：这个阶段将我们的`js`代码(字符串)进行词法分析生成一系列`tokens`，之后再进行语法分析将`tokens`组合称为一颗`AST`抽象语法树。(比如`babel-parser`它的作用就是这一步)
- `Transform`（转化）阶段：这个阶段`babel`通过对于这棵树的遍历，从而对于旧的`AST`进行增删改查，将新的`js`语法节点转化称为浏览器兼容的语法节点。(`babel/traverse`就是在这一步进行遍历这棵树)
- `Generator`（生成）阶段：这个阶段`babel`会将新的`AST`转化同样进行深度遍历从而生成新的代码。(`@babel/generator`)

我们用一张图来描述一下这个过程：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/787ab733a63c4314b6ce01b3812ba04f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

### `babel`中`AST`的遍历过程
