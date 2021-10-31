/*
 * @Author: raotaohub
 * @Date: 2021-10-24 17:21:32
 * @LastEditTime: 2021-10-31 12:55:49
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\view\nav1\Rate\Rate.tsx
 * @Description: Edit......
 */
import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { renderRoutes } from 'react-router-config'

const Rate = (props: any) => {
   const { route } = props
   console.log(route)
   const location = useLocation()
   return (
      <div>
         Rate{location.pathname}
         {renderRoutes(route.routes)}
      </div>
   )
}

export default Rate
