# webpack的使用

### 一、起步！

#### 1. 构建一个项目

基本安装需要创建一个文件，并通过命令行打开该文件初始化和构建操作如下。

> mkdir mvvm-webpack-demo
>
> cd webpack-demo
>
> npm init -y
>
> npm install webpack webpack-cli --save-dev



#### 2. 执行一次编译

**``
npx webpack 
``**
将转译结果输出到 dist/main.js



#### 3. 使用一个传统技艺——配置文件

在根目录下创建 webpack.config.js 文件并配置

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

> 如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它。

现在执行 **`$ npx webpack --config webpack.config.js `** 则会以这个配置文件来打包



#### 4. 配置npm scripts 

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

现在，可以使用 `npm run build` 命令代替 **`$ npx webpack --config webpack.config.js `** 和 **`npx webpack`**了



### 二、资源管理

#### 1.加载CSS，并在module中配置

为了在 JavaScript 模块中 `import` 一个 CSS 文件，你需要安装 [style-loader](https://webpack.docschina.org/loaders/style-loader) 和 [css-loader](https://webpack.docschina.org/loaders/css-loader)，并在 [`module` 配置](https://webpack.docschina.org/configuration/module) 中添加这些 loader：

**webpack.config.js**

```bash
npm install --save-dev style-loader css-loader 让webpack支持 import
npm install --save-dev postcss-loader postcss  让webpack支持 postcss

```

[配置postcss的地址](https://webpack.docschina.org/loaders/postcss-loader/)

```diff
 const path = require('path');
 
 module.exports = {
   entry: './src/index.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
+  module: {
+    rules: [		规则
+      {
+        test: /\.css$/i, 			匹配什么样的文件后缀
+        use: ['style-loader', 'css-loader'], 匹配什么
+      },
+    ],
+  },
 };
```

#### 2.加载 images 图像、字体、其他资源

```javascript
// 2.3 加载images图像
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource'
},
// 2.4 加载字体
{
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
},
// 2.5 加载其他资源 npm install --save-dev csv-loader xml-loader
{
  test: /\.(csv|tsv)$/i,
  use: ['csv-loader'],
},
{
  test: /\.xml$/i,
  use: ['xml-loader'],
},
```



### 三、管理输出

执行下面的操作

~~~html
<!--管理输出
1.在src下创建
    - Vm.js
        ```
        export default function printMe() {
          console.log('I get called from Vm.js!');
        }
        ```
    - index.js
        ```
        import printMe from './Vm.js'
        ```
2.在dist/index.html中修改 script 标签
    <title/>
    <script src="./print.bundle.js"/>
    <head/>
<body/>
    <script src="./index.bundle.js"/>
...

3.修改配置文件的入口和出口
    entry:[
        index: './src/index.js',
        print: './src/Vm.js',
    ],
    output:{
        filename:'[name].bundle.js'
        path: path.resolve(__dirname, 'dist'),
    }
4.执行 npm run build =>
    结果: 在dist文件中输出了两个 js 文件
    【1】 print.bundle.js
    【2】 index.bundle.js
-->
~~~

问题1

> 当entry的配置中修改文件名称，打包后 dist 中的 index.html 中引用的仍然是原来的名字。

解决方法：

```
//安装插件HtmlWebpackPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

问题2

> 每次dist打包之后，文件会混乱，通常的做法是先清理dist中的所有文件。

解决方法：

```
//dist清理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```



### 四、开发环境

#### 1. 使用 source map 来定位错误代码

配置devtool: 'inline-source-map'

```js
使用前
Uncaught ReferenceError: cosnole is not defined
    printMe webpack://mvvm-webpack-demo/./src/Vm.js?:6

使用后
Uncaught ReferenceError: cosnole is not defined  printMe Vm.js:2
```

#### 2. 选择一个开发工具，避免每次npm run build ，当代码发生变化后自动编译

- watch mode(观察模式)  需要刷新才可以看到修改的结果 执行 `npm run watch`

```
-package.json 
	-scripts : {
		"watch" : "webpack --watch",
	}
```

- 使用 webpack-dev-server (具有实时重新加载)	执行 `npm start`

```bash
npm install --save-dev webpack-dev-server
```

```
-webpack.config.js
	-module.exports={
		// 添加配置
		devServer: {
        contentBase: './dist',
      },
	}
-package.json
	-scripts{
		"start": "webpack serve --open"
	}
```

- webpack-dev-middleware

```bash
npm install --save-dev express webpack-dev-middleware
访问以下了解更多
https://webpack.docschina.org/guides/development/#using-webpack-dev-middleware
```



### 模块热替换

使用 webpack-dev-server (具有实时重新加载)	执行 `npm start`

+

```diff
    devServer: {
      contentBase: './dist',
+     hot: true,
    },
```

+

入口文件只能指定一个即可



一样使用 `npm start` 启动，修改文件后会发现HMR启动了

```
log.js:24 [HMR] Waiting for update signal from WDS...
```



# OK 现在让我们先使用这个配置的webpack学习 mvvm 吧！
