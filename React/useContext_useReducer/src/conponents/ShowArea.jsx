import React from 'react';
import {ColorContext} from "../color"; /**1. 引入 **/

/**
 * 第二步，在被包裹的组件中使用这个上下文状态。
 * */
const ShowArea = (props) => {
  const {color} = React.useContext(ColorContext) /**2. 获得该上下文对象的状态 **/

  return (
      <div style={{color: color}}> 字体颜色</div> /**3. 使用该上下文对象状态作为本组件的状态 **/
  )
}

export default ShowArea;
