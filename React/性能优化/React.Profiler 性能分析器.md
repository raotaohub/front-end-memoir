react 提供一个性能分析组件，可以用来扫描每个组件的加载和更新状态。

```tsx
type ProfilerOnRenderCallback = (
	id: string,
	phase: "mount" | "update",
	actualDuration: number,
	baseDuration: number,
	startTime: number,
	commitTime: number,
	interactions: Set<SchedulerInteraction>,
) => void;

interface ProfilerProps {
	children?: ReactNode | undefined;
	id: string;
	onRender: ProfilerOnRenderCallback;
}

const Profiler: ExoticComponent<ProfilerProps>;
   
import React from 'react'

const ProfilerView = (props: IProps) => {
  const { id, enable, children } = props

  if (enable !== false && process.IS_DEV) {
    return (
      <React.Profiler id={id} onRender={onRenderCallback}>
        {children}
      </React.Profiler>
    )
  }
  return children
}


/**
 *
 * @param id // 发生提交的 Profiler 树的 “id”
 * @param phase // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
 * @param actualDuration // 本次更新 committed 花费的渲染时间
 * @param baseDuration // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
 * @param startTime // 本次更新中 React 开始渲染的时间
 * @param commitTime // 本次更新中 React committed 的时间
 * @param interactions // 属于本次更新的 interactions 的集合
 */
function onRenderCallback (params:Parameters<ProfilerOnRenderCallback>){
	...
}
```

1. 通过封装的`ProfilerView`方法，可来包裹具体组件可以获得相关性能指标。
2. 直接使用 Profile 插件，通过录制来查看火焰图。
