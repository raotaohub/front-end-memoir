# 关于 Context&Reducer

## Reducer

...暂无

## Context

1. createContext 函数返回 1 个 Context 上下文环境。
   1. Context.Provider 是一个组件，用来包裹其他需要透传通讯的组件
   2. Context.Provider 的 value 属性，传递 1 个`value`
   3. Context.Provider 被其包裹的组件，可以使用 useContext(Context),来获取它上面最近的 context provider 的 `value`。
      1. 可以是 useState()[0]
      2. 可以是 useReducer(reducer,initialState)[0]
      3. 可以是 其他任意值
   4. createContext 只负责创建 Context 上下文环境 切记。
   5. useContext 只负责取 <Context.Provider value={取这里的值}></Context.Provider>

[createContext – React](https://zh-hans.react.dev/reference/react/createContext#troubleshooting)

### 我没有办法改变 context 的值

如下的代码为 context 指定了 _默认_ 值：

```
const ThemeContext = createContext('light');
```

该值永远不会发生改变。当 React 无法找到匹配的 provider 时，该值会被作为备选值。

要想使上下文的值随时间变化，[添加状态并用一个 context provider 包裹组件](https://zh-hans.react.dev/reference/react/useContext#updating-data-passed-via-context)。

注意，只有在 **上层根本没有匹配的 provider** 时才使用 [`createContext(defaultValue)`调用的默认值](https://zh-hans.react.dev/reference/react/useContext#specifying-a-fallback-default-value)。

## 总的来看 createContext 的第一个参数，软用没用，迷惑性极强。

## context 的性能问题

```tsx
const DEFAULT_VALUE = {
  props: null,
  openGlobalModal: () => undefined,
  closeGlobalModal: () => undefined
};

const GlobalModalContext = createContext(DEFAULT_VALUE);

const GlobalModalContextProvider = ({ children }) => {
  const [props, setProps] = useState(null);
  const closeGlobalModal = useCallback(() => setProps(null), []);
  const contextValue = useMemo(() => {
    return {
      props,
      closeGlobalModal,
      openGlobalModal: setProps
    };
  }, [props, closeGlobalModal, setProps]);

  return <GlobalModalContext.Provider value={contextValue}>{children}</GlobalModalContext.Provider>;
};
```

优化后

```tsx
const GlobalModalPropsContext = createContext(null);

const DEFAULT_ACTION = {
  openGlobalModal: () => undefined,
  closeGlobalModal: () => undefined
};

const GlobalModalActionContext = createContext(DEFAULT_ACTION);

const GlobalModalContextProvider = ({ children }) => {
  const [props, setProps] = useState(null);
  const closeGlobalModal = useCallback(() => setProps(null), []);
  const actionValue = useMemo(() => {
    return {
      closeGlobalModal,
      openGlobalModal: setProps
    };
  }, [closeGlobalModal, setProps]);

  return (
    // 注意第一条经验，变得少的在外面
    <GlobalModalActionContext.Provider value={actionValue}>
      <GlobalModalPropsContext.Provider value={props}>{children}</GlobalModalPropsContext.Provider>
    </GlobalModalActionContext.Provider>
  );
};
```

[React Context 最佳实践加源码解析 - 掘金 (juejin.cn)](https://juejin.cn/post/6921859508260044814#heading-2)

[Context API 效能問題 - use-context-selector 解析 (techbridge.cc)](https://blog.techbridge.cc/2020/09/13/use-context-selector-src-analysis/)

[从 Context 源码实现谈 React 性能优化 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/337952324)
