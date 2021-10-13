React Hook
useState
const App = () => {
const [val, setVal] = useState<string>('1')
const [obj, setObj] = useState({ name: 'test', age: 20 })
const onClick = () => {
setVal('2')
}
}
注意
• 不要直接修改 state 的值 错误写法:

```js
const [state, setState] = useState({ name: "saas", age: 20 });
const _state = state;
state.name = "fhd";
setState(_state);
```

正确使用:
const [ state,setState ] = useState({name:'saas',age:20})
// 1.普通函数中更新
const toSetState = () =>{
setState({...state,name:'fhd'})
}
// 在 hook (useCallback 、useEffect 、useMemo 同理) 中更新 state
const handleSetState = useCallback(() =>{
setState (state=> ({ ...state,name:'fhd'}))
},[])
useRef
useRef 可以保存任何可变值(字符串,数组,函数等)，且返回的 ref 对象在组件的整个生命周期内保持不变,useRef 的更新不会导致组件重新渲染
使用 useRef 获取 dom 节点 const tableRef= useRef()
我是要被获取的 div 元素
配合 useImperativeHandle 获取自定义组件所暴露出的 ref 实例(可供父组件调用子组件方法) tableRef.current.getSelectedOrders()
useImperativeHandle
暴露实例对象 useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值,他应当与 forwardRef 一起使用:
// 暴露属性或方法给父组件使用
useImperativeHandle(ref, () => {
return {
value:'1',
doSome: () => {
// to do xx
}
}
})
useEffect
Effect Hook 可以让你在函数组件中执行副作用操作,useImperativeHandle 应当与 forwardRef 一起用
ex：
useEffect 模拟 class 生命周期
componentDidMount
const useMount = (fn: () => void) => {
React.useEffect(() => {
fn()
}, [])
}
componentWillUnmount
const useUnmount = (fn: () => any): void => {
const fnRef = React.useRef(fn)
// 使用 ref 存储函数
fnRef.current = fn
React.useEffect(() => {
// 组件卸载时,执行方法
return () => {
if (fnRef.current && typeof fnRef.current === 'function') {
fnRef.current()
}
}
}, [])
}
componentDidUpdate
const useUpdateEffect: typeof React.useEffect = (effect, deps) => {
const isMounted = React.useRef(false)
React.useEffect(() => {
if (!isMounted.current) {
isMounted.current = true
} else {
return effect()
}
}, deps) // 忽略首次渲染,只在依赖项更新时运行
}
useUpdateEffect(()=>{ // 用法同 useEffect },[])
总结

1. useEffect 是用来执行副作用的 2.每次组件重新 render，useEffect 都会被重新执行(当然可以通过手动控制来跳过 Effect :设置依赖项)
2. useEffect 可以看作是 class 组件里 componentDidMount, componentDidUpdate, componentWillUnmount 这几个生命周期的组合
useLayoutEffect
说明：
• useEffect 会在渲染完成之后调用
• useLayoutEffect 会在 DOM 渲染之前调用
尽可能使用标准的 useEffect 以避免阻塞视觉更新。
import React, { useLayoutEffect, useState, useEffect } from "react";
import "./styles.css";
export default () => {
const [count, setCount] = useState(0);
useEffect(() => {
if (count === 0) {
console.log("useEffect", count);
}
}, [count]);
useLayoutEffect(() => {
if (count === 0) {
const randomNum = 10 + Math.random() \* 200;
const now = performance.now();
while (performance.now() - now < 100) {
console.log("useLayoutEffect", count);
}
setCount(randomNum);
}
}, [count]);
return <div onClick={() => setCount(0)}>{count}</div>;
};
console.log=>【计算次数可能会非常多】useLayoutEffect 0【仅仅 1 次】useEffect 0
结论：
useCallback
解释:将回调函数及依赖项数组作为参数传入 useCallback,该回调函数仅在某个依赖项改变时才会更新，它将返回该回调函数的 memorized，在给子组件传递一个函数时需要使用 useCallback 包裹
用法:
const memoizedCallback=useCallback(()=>{console.log('useCallback'))},[])
useMemo
解释:把"创建"函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算,传入 useMemo 的函数会在渲染期间执行
用法:
const value = React.useMemo(() => {
const memory = new Array(100000000)
.join(',')
.split(',')
.map(item => item)
return memory // 返回缓存的值
}, [])
useMemo 同样可以缓存一个函数
const search = React.useMemo(
() => () => {
tableRef.current.getOrders()
},
[]
)
useReducer
解释:useReducer 也是用来管理组件状态的,它更适合用于管理包含多个子值的 state 对象， 它通过 dispatch 来更新状态,用法同 redux
type Action = {
type: 'increment' | 'decrement'
payload?: unknown
}
type State = {
count: number
}
const reducer=(state: State, action: Action) => {
switch (action.type) {
case 'increment':
return { count: state.count + 1 }
case 'decrement':
return { count: state.count - 1 }
default:
break
}
}
// 指定初始 state
const [state, dispatch] = useReducer(reducer, initState)
// 惰性初始化:适用于从外部接收初始 state 的场景
const init = (initialCount: number) => {
return { count: initialCount }
}
const Test: React.FC<Props> = ({ initialCount }) => {
const [state, dispatch] = useReducer(reducer, initialCount, init)
return (
 <div onClick={() => dispatch({ type: 'increment' })} className='container'>
 {state.count}
 </div>
 )
 }
 export default React.memo(Test)
 // dispatch
 // 通过dispach触发更新,React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变,因此可以向子组件传递 dispatch 而不是回调函数
 // <CustomComponent dispatch={dispatch}>
 // <Child />
 // </CustomComponent>
 useContext
 解释: 1.接收一个 context 对象 （React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。 2.当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用  useContext 时重新渲染
 const value = useContext(MyContext)
 自定义hook
 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook,通过自定义 Hook，可以将组件逻辑提取到可重用的函数中,上述的 useMount , useUnmount , useUpdateEffect 就是自定义hook
