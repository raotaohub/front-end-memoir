/*
 * @Author: raotaohub
 * @Date: 2021-02-19 20:44:47
 * @LastEditTime: 2021-10-31 23:46:30
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\comopoents\public\Main\Main.tsx
 * @Description: Edit......
 */
//------------------- 引入库
import React, { ReactElement, useEffect } from 'react'
import { Observer } from 'mobx-react'
import { HashRouter, Route, useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

//------------------- 引入antd
import { Layout, message } from 'antd'

//------------------- 引入公共组件
import Header from '@/comopoents/public/Layout/Header'
import _Content from '@/comopoents/public/Layout/Content'
import MenuView from '@/comopoents/public/Layout/MenuView/MenuView'
import Loading from '@/comopoents/public/Loading/Loading'

//------------------- 引入type
import { RouteConfig } from '@/routes/type'

//------------------- 引入样式
import './main.less'

interface IProps {
   className?: string
   ready: boolean
   route?: any
   routes: RouteConfig[]
   menus: any
}

const Main = (props: IProps): ReactElement => {
   const [collapsed, setCollapsed] = React.useState(false)
   const { ready, routes } = props
   console.log(routes)

   useEffect(() => {
      let current = true

      message.success('welcome')

      return () => {
         current = false
      }
   }, [])

   return (
      <Observer>
         {() => (
            <HashRouter>
               <Layout style={{ height: '100%', width: '100%' }}>
                  <Header />
                  <Layout>{renderRoutes(routes)}</Layout>
               </Layout>
            </HashRouter>
         )}
      </Observer>
   )
}

export default React.memo(Main)
