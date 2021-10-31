/*
 * @Author: raotaohub
 * @Date: 2021-10-24 17:21:32
 * @LastEditTime: 2021-10-31 23:36:28
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\view\nav2\Nav2.tsx
 * @Description: Edit......
 */
import MenuView from '@/comopoents/public/Layout/MenuView/MenuView'
import Loading from '@/comopoents/public/Loading/Loading'
import { Layout } from 'antd'
import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { renderRoutes } from 'react-router-config'

const Nav2 = (props: any) => {
   const { route } = props
   //    const history = useHistory()
   const location = useLocation()
   return (
      <Layout style={{ padding: '16px' }}>
         <Layout.Content
            className='site-layout-background'
            style={{
               overflowY: 'auto',
               overflowX: 'hidden',
               padding: 10,
               height: '100%'
            }}
         >
            Nav2父路由{location.pathname}
            {renderRoutes(route.routes)}
         </Layout.Content>
      </Layout>
   )
}

export default Nav2
