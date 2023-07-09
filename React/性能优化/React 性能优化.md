## React Function 组件的性能优化

Function 组件的问题在于本质上作为 1 个函数，发生不必要的重新渲染时会调用该函数，并且内部的函数，变量作用域都会重新开辟，因此开销比较高。

有哪些情况会导致 re-render 呢

1. state 变化（Object.is）
2. props 变化（oldProps !== newProps 默认全等比较）
3. context 变化（oldContext !== newContext,hasContextChange,Context具有传染性）
4. 最重要的是，组件的父组件 re-render，也会导致该组件 re-render，那么该组件的 children 组件也会 re-render

> 见：
> react\packages\react-reconciler\src\ReactFiberBeginWork.old.js
> beginWork 方法

## 一、state 导致的重更新

错误示例

```tsx
const Son = () => {
  console.log("子组件重新渲染了！！");
  return <div className="son">子组件</div>;
};

const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((old) => old + 1); // 执行将导致 Son 组件重新执行

  return (
    <div className="parent">
      <p>父组件Count--{count}</p>
      <button onClick={handleClick}>增加</button>
      <Son />
    </div>
  );
};
```

### 1. React.memo || PureComponent 用来包裹组件

- 其中 memo 第二个参数可以传入 1 个函数，用来比较 2 次 props，通过返回一个 Boolean 值控制是否重新渲染。
- 若不传默认进行浅比较

```tsx
const Son = React.memo(() => {
  console.log("子组件重新渲染了！！");
  return <div className="son">子组件</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((old) => old + 1); // 执行将导致 Son 组件重新执行

  return (
    <div className="parent">
      <p>父组件Count--{count}</p>
      <button onClick={handleClick}>增加</button>
      <Son />
    </div>
  );
};
```

### 2. React.useMemo 缓存值，避免重新声明变量，函数

```tsx
const Son = () => {
  console.log("子组件重新渲染了！！");
  return <div className="son">子组件</div>;
};

const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((old) => old + 1); // 执行将导致 Son 组件重新执行

  return (
    <div className="parent">
      <p>父组件Count--{count}</p>
      <button onClick={handleClick}>增加</button>
      {useMemo(
        () => (
          <Son />
        ),
        []
      )}
    </div>
  );
};
```

### 3. 使用 **children** 将无状态组件传入

```tsx
const Son = React.memo(() => {
  console.log("子组件重新渲染了！！");
  return <div className="son">子组件</div>;
});

const Parent = ({ children }) => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((old) => old + 1); // 执行将导致 Son 组件重新执行

  return (
    <div className="parent">
      <p>父组件Count--{count}</p>
      <button onClick={handleClick}>增加</button>
      {children} //
      在状态组件中使用children直接渲染子组件可以避免在状态组件中React使用React.createElement(Son)
    </div>
  );
};

const App = () => {
  return (
    <Parent>
      <Son />
    </Parent>
  );
};
```

## 二、Props 导致的重复更新

```tsx
const Son = ({ componentDetails, anyMethod }) => {
  /*...*/
};

const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((old) => old + 1);
  };
  return (
    <div className="parent">
      <h5>错误示例</h5>
      <p>父组件Count--{count}</p>
      <button onClick={handleClick}>增加</button>
      /* ❌每次 React.createElement时，会重新创建一个新的变量，引用变了*/
      <Son componentDetails={{ name: "子组件" }} /*❌*/ anyMethod={() => {}} /*❌*/ />
    </div>
  );
};

export { Son, Parent };
```

### 1. 常量可以定义在组件外部

```tsx
const Son = ({ componentDetails, anyMethod }) => {
  /*...*/
};

const constant1 = { name: "子组件" }; // ✅
const constant2 = () => {}; // ✅

const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((old) => old + 1);
  };
  return (
    <div className="parent">
      <h5>错误示例</h5>
      <p>父组件Count--{count}</p>
      <button onClick={handleClick}>增加</button>

      <Son componentDetails={constant1} anyMethod={constant2} />
    </div>
  );
};

export { Son, Parent };
```

### 2. 使用 useMemo 包裹数据 和 useCallback 包裹函数 再传递给子组件

避免不必要的重申明

```tsx
const Son = ({ componentDetails, anyMethod }) => {
  useEffect(() => {
    console.log("Son -> componentDetails", componentDetails);
  }, [componentDetails]);
  useEffect(() => {
    console.log("Son -> anyMethod", anyMethod);
  }, [anyMethod]);
  return <div className="son">{componentDetails.name}</div>;
};

const Parent = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((old) => old + 1);
  };

  const anyMethod = useCallback(() => {}, []); // ✅
  const componentDetails = useMemo(() => ({ name: "子组件" }), []); // ✅

  return (
    <div className="parent">
      <h5>错误示例</h5>
      <p>父组件Count--{count}</p>
      <button onClick={handleClick}>增加</button>

      <Son componentDetails={componentDetails} anyMethod={anyMethod} />
    </div>
  );
};

export { Son, Parent };
```

## 三、Context 导致的重复更新

### 1. children

### 2. React.memo

### 3. Context应该就近使用，避免过度传染。


## 四、反思 useMemo 和 useCallback

[「好文翻译」为什么你可以删除 90% 的 useMemo 和 useCallback ？ - 掘金 (juejin.cn)](https://juejin.cn/post/7251802404877893689)

performance 检测，一切以数据为准。

```tsx
const List = ({ countries }) => {
  const before = performance.now();
  const sortedCountries = orderBy(countries, 'name', sort);
  // this is the number we're after
  const after = performance.now() - before;
  return (    // same  )
};

// useMemo 更适合用来缓存组件，或者是计算量特别大出数据，如递归，阶层！
const List = ({ countries }) => {
  const content = useMemo(() => {
    const sortedCountries = orderBy(countries, 'name', sort);
    return sortedCountries.map((country) =>
      <Item country={country} key={country.id} />
    );
  }, [countries, sort]);
  return content;
};

```
