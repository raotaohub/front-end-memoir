/*
 * @Author: raotaohub
 * @Date: 2021-10-24 17:21:32
 * @LastEditTime: 2021-10-31 12:23:15
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\view\nav2\Like\Like.tsx
 * @Description: Edit......
 */
import React from 'react'
import { useHistory, useLocation } from 'react-router'

const Like = () => {
   //    const history = useHistory()
   const location = useLocation()
   return <div>Like{location.pathname} </div>
}

export default Like
