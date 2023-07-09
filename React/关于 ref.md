## 1. useRef 的返回值 类型问题

所以如果你希望创建的 ref 对象 current 属性是可修改的，需要加上  `| null`。

```tsx
 1.
  const ref = React.useRef<number>();
  ref.current = 11;
 
 2.
  const ref2 = React.useRef<string>(null);
  ref2.current = ''; // Error

3.
  React.createRef() 方法时返回的也是一个 `RefObject`。
```

## 2. 他是特殊的 props

如果 ref 作为 props 传递，则无法直接在 props 中访问到，必须声明第二个行参数 ref。（ [renderWithHooks](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.dev%2Ffacebook%2Freact%2Fblob%2Fdbe9e732af1f12757a55adb12a8279d7db898b60%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiberHooks.old.js%23L368 "https://github.dev/facebook/react/blob/dbe9e732af1f12757a55adb12a8279d7db898b60/packages/react-reconciler/src/ReactFiberHooks.old.js#L368")）

但是可以通过修改 props 属性名传递，如 divRef。

另外 **key** 属性也是如此。

```tsx
const ref = React.useRef('hello')

<Component ref={ref} id="my-app" ></Component>

// warn
function Component(props){
	console.log(props.ref) // undefined
}

<Component divRef={ref} id="my-app" ></Component>
function Component(props){
	console.log(props.ref) //{current:"hello"}
}
```

## ref 的应用

### 1. React-Ref 相关用法

- 配合 React.forwardRef 和 useImperativeHandle 使用

#### example1

```tsx
const B = React.forwardRef((props: any, ref) => {
  const [state, setstate] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      update: (n: any) => {
        setstate(n);
      }
    }),
    []
  );
  console.log("child", state, props.count);

  return <div>{state}</div>;
});

const App = function () {
  const [state, setstate] = useState(0);
  const ref = useRef(null);

  return (
    <div className="App">
      <button
        onClick={() => {
          setstate(state + 1);
          (ref.current as any).update(state + 1);
        }}
      >
        click
      </button>
      <B count={state} ref={ref} />
    </div>
  );
};
export default App;
```

#### example2

```tsx
const A = React.forwardRef((_, ref) => {
  useImperativeHandle(ref, ...);
});
const B = React.forwardRef(({ children }, ref) => {
  const onClick = () => { ref.update() }
  return <>
    {children}
  </>
});
const App = () => {
  const ref = useRef(null);
  return
    <B ref={ref}>
    	<A ref={ref} />
  	</B>
}
参考
作者：Nawbc
链接：https://www.zhihu.com/question/444068787/answer/1889579115
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

### 实践 - ImageView 组件

```jsx
import React, { useState, useImperativeHandle, useRef } from 'react'
import { Image } from 'antd'

export interface ImageViewRef {
  visible: (src: string) => void
  hiden: () => void
}

const ImageView = React.forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState<boolean>(false)

  const [src, setSrc] = useState<string>(
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  )

  useImperativeHandle(
    ref,
    () => ({
      visible: (src: string) => {
        setVisible(true)
        setSrc(src)
      },
      hiden: () => {
        setVisible(false)
        setSrc('')
      },
    }),
    []
  )

  return (
    <Image
      preview={{
        visible: visible,
        onVisibleChange: () => {
          setVisible(false)
        },
      }}
      width={0}
      src={src}
    />
  )
})

export default ImageView

const A = () => {
  const imageViewRef = useRef<any>(null)

  const bindImageMethod = (e: any) => {
    if (e.type === 'click' && e.target.nodeName === 'IMG' && e.target.src) {
      imageViewRef.current?.visible(e.target.src)
    }
  }

  return (
    <>
      <ImageView ref={imageViewRef} />
      <span onClick={bindImageMethod}>
        <img />
        <div></div>
      </span>
    </>
  )
}

type IProps = {
  ref: Ref<xxxx>
  ....
}

const ForwardXXXXX: React.ForwardRefExoticComponent<IProps> = React.forwardRef(XXXX)

export default React.memo(ForwardUnsualTrades)

```
