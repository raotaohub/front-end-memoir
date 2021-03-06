/**
 * 第一步，创建一个状态管理上下文，被该组件包裹的对象，就可以访问到它的 状态
 * **/
import React, {createContext, useReducer} from 'react'

/** 创建上下文环境 ,并且暴露它**/
export const ColorContext = createContext({})

/**
 * 创建并暴露constant
 * */
export const UPDATE_COLOR = 'UPDATE_COLOR'

/**
 * 第三步，创建reducer ,更新颜色的纯函数
 * */

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color
    default:
      return state
  }
}

/**
 * 创建一个 Color 组件
 * Color 组件包裹的所有子组件都可以通过调用 ColorContext 访问到 value
 *
 * 第三步 在Color 组件中使用 useReducer 得到 initial 和 dispatch
 */
export const Color = props => {
  const [color, dispatch] = useReducer(reducer, 'blue')
  return (
      <ColorContext.Provider value={{color, dispatch}}>
        {props.children}
      </ColorContext.Provider>
  )
}


