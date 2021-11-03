/*
 * @Author: raotaohub
 * @Date: 2021-10-24 17:21:32
 * @LastEditTime: 2021-11-01 22:14:47
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\view\nav1\Logs\Logs.tsx
 * @Description: Edit......
 */
import React from 'react'
import { useHistory, useLocation } from 'react-router'

const Logs = () => {
   //    const history = useHistory()
   const location = useLocation()
   return <div>Logs{location.pathname} </div>
}

export default React.memo(Logs)
