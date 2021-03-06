import React from 'react'
import {ColorContext, UPDATE_COLOR} from "../color"; /** 1. 引入**/

/**
 * 第四步 在组件中使用 useContext 得到 dispatch
 * */
const Buttons = (props) => {
  const {dispatch} = React.useContext(ColorContext)
  /** 2. 得到dispatch**/

  const changeColor = (color) => {
    return () => {
      dispatch({type: UPDATE_COLOR, color: color})
    }
  }
  return (
      <React.Fragment>
        <button onClick={changeColor('red')}>红色</button>
        <button onClick={changeColor('yellow')}>黄色</button>
      </React.Fragment>

  )
}
export default Buttons
