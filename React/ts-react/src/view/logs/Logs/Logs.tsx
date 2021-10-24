/*
 * @Author: raotaohub
 * @Date: 2021-10-24 17:21:32
 * @LastEditTime: 2021-10-24 17:39:24
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\view\logs\Logs\Logs.tsx
 * @Description: Edit......
 */
import React from 'react'
import { useHistory, useLocation } from 'react-router'

const Logs = () => {
   //    const history = useHistory()
   const location = useLocation()
   return <div>1111111{location.pathname} </div>
}

export default Logs
