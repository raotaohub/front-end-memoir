<!--
 * @Author: raotaohub
 * @Date: 2021-02-12 14:28:20
 * @LastEditTime: 2021-02-12 16:02:57
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\README.md
 * @Description: Edit......
-->

## 1.项目搭建

1. create-react-app 项目名字

2. 删除 public 内所有文件再新增一个`index.html`

3. 删除 src 内所有文件再新增一个 `App.js` 和 `index.js`
4. 在 `index.js` 中如下

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

5. 在`App.js`中如下

```js
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return <div>hello.....</div>;
  }
}
```

## 2.setState 的两种写法

```js
	(1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据,
					要在第二个callback函数中读取

```

## 3.lazyLoad 路由懒加载

1. 先引入 router

```js
yarn add react-router-dom
```

2. 引入内置组件 lazy

```js
import { lazy } from "react";

const Home = lazy(() => import("./Home")); //1.通过React的lazy函数配合import()函数动态加载路由组件 => 路由组件代码会被分开打包

const About = lazy(() => import("./About"));

//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
<Suspense fallback={<h1>loading.....</h1>}>
  <Switch>
    <Route path="/xxx" component={Xxxx} />
    <Redirect to="/login" />
  </Switch>
</Suspense>;
```

## 4.Hooks

1. State Hook: React.useState()

```js
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

2. Effect Hook: React.useEffect()
