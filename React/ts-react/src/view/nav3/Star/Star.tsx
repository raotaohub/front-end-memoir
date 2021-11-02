/*
 * @Author: raotaohub
 * @Date: 2021-10-24 17:21:32
 * @LastEditTime: 2021-10-31 12:22:52
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\view\nav2\Star\Star.tsx
 * @Description: Edit......
 */
import React from 'react'
import { useHistory, useLocation } from 'react-router'

const Star = () => {
   //    const history = useHistory()
   const location = useLocation()
   return <div>Star{location.pathname} </div>
}

export default Star
