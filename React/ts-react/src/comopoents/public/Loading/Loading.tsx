import React from 'react'
import { Spin } from 'antd'
import './loading.less'

type Size = 'small' | 'large' | 'default'
interface IProps {
   tip?: string
   size?: Size
   delay?: number
   tipClassName?: string
   className?: string
   height?: number | string
   children?: React.ReactNode
   loading?: boolean
}
const Loading = (props: IProps) => {
   const { tip, size, delay, height, tipClassName, className } = props
   return props.loading !== false ? (
      <div style={{ height }} className={`loading-wrapper ${className ? className : ''}`}>
         <Spin className={tipClassName} tip={tip} size={size} delay={delay} />
      </div>
   ) : (
      <>{props.children}</>
   )
}
export default React.memo(Loading)
