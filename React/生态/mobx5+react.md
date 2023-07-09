# react 中使用 mobx

TODO mobx5 的写法每次修改 store 里面的数据，在 store 里面都是可以 console 出新的数据的。正确姿势看 TODO2

但是就是不能更新到视图上刚开始使用的是强制去刷新组件，

使其能得到最新的数据，每次数据操作完了后就用 useState hook 去更新组件具体

## MobX 和 React => 极佳的官网示例

https:mobx.js.org/react-integration.html

## TODO 一、mobx5.x 与 6.x 差异

```tsx
/**
 * const [fresh,setFresh] = useState(true)
 * 执行完操作后就
 * setFresh(!fresh)
 **/

 5.0写法
 class Test{
  @observable name="";
 }

6.0写法
class Test{
  name;
  constructor(){
   makeAutoObservable(this)  makeObservable(this,{name:observable,...})
  }
 }
```

## TODO 二、mobx5.x + react_hooks 开发使用注意事项 & 参考文章

1. https:zhuanlan.zhihu.com/p/157555656 mobx | 6. mobx-react-lite 如何支持 react hook

2. https:juejin.cn/post/6844904147922190349#heading-17 Hooks & Mobx 只需额外知道两个 Hook，便能体验到如此简单的开发方式

3. https:www.jianshu.com/p/55ba6d415bb1 mobx 中的 inject,observer 迁移至 react Hooks 写法

类组件使用@inject('xxxStore') 方式注入到组件中并从 this.props.xxxStore 中取出使用

类组件使用@observer 方式使组件成为【响应式组件】

函数组件使用 inject(xxxStore)(observer(组件)) 并从 props.xxxStore 中取出使用

store 的使用

1. App 项目入口处注入 store

```tsx
  import store from '@store/index'
  <Provider {...store}> <App> </Provider>
```

## Hook1 useObserver

对需要能够响应式的组件用这个包裹一下 或 使用<Observer>包裹组件</Observer>

```tsx
  const store = useLocalStore(() => ({key: 'value'}))  🙂响应式的数据

  function App() {
  	return useObserver(() => {    🙂包裹组件
  	return <div>{store.key}</div>  🙂在组件中使用响应式的数据
  	})
  }


```

? App 组件 =>被 useObserver(HOC)包裹后 就可以对响应式数据的变化做出更新了【响应式组件】

? 若 UI 组件中依赖到 store 中的某个值，应该使用 useObserver 而不是 useLocalStore

？Observer 包裹组件，更新细粒度更小 推荐

## Hook2 useLocalStore

该函数返回一个需要响应式的对象。然后就没有然后了。

```tsx
const store = useLocalStore(() => ({key: 'value'}))
大致等同于
const [store] = useState(() => obserable({key: 'value'}))  🙂响应式的数据
```

多个值的使用

```tsx
const { username, orderId } = useObserver(() => ({
  username: user.name,
  orderId: order.id
}))

 ? 在函数式组件中使用 🙂响应式的数据 username , orderId => Hooks1

 ! 自定义Hook 均在以上基础上再进行封装
```

## TODO 三、mobx6.x + react_hooks 又该如何使用呢？

! 特别指出 mobx6.x 与 mobx5.x 写法差异较大 无法平稳过度

? 回顾 TODO1 可以看到在定义 store 类时就有所不同

? 1.首先是弃用了装饰器语法

? 2.实现 observable,action 修饰器功能可在 constructor 通过 makeObservable 或 makeAutoObservable 声明

? 3.useLocalStore 不推荐使用，以 useLocalObservable 代替

? 使用示例：mobx6.x https:github.com/mobxjs/mobx

? 官方文档：https:mobx.js.org/README.html

? 会给基于 mobx5.x 的项目带来哪些问题呢？思考带来的一些问题 如多 store 之间的继承
