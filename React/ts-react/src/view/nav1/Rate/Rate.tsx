/*
 * @Author: raotaohub
 * @Date: 2021-10-24 17:21:32
 * @LastEditTime: 2021-11-01 22:15:11
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

export default React.memo(Rate)
