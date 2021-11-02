/*
 * @Author: raotaohub
 * @Date: 2021-10-31 12:39:02
 * @LastEditTime: 2021-10-31 12:44:32
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\view\index.tsx
 * @Description: Edit......
 */

import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { renderRoutes } from 'react-router-config'

const Index = props => {
   const { route } = props
   console.log(route)
   //    const history = useHistory()
   const location = useLocation()
   return (
      <div>
         Index{location.pathname}
         {renderRoutes(route.routes)}
      </div>
   )
}

export default Index
