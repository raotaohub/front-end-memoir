/*
 * @Author: raotaohub
 * @Date: 2021-02-19 20:44:47
 * @LastEditTime: 2021-10-24 17:43:58
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
import { Layout, Menu, message } from 'antd'

//------------------- 引入公共组件
import Header from '@/comopoents/public/Layout/Header'
import _Content from '@/comopoents/public/Layout/Content'
import SideBar from '@/comopoents/public/Layout/SideBar'
import Loading from '@/comopoents/public/Loading/Loading'

//------------------- 引入样式
import './main.less'

import routes from '@/routes/index'
import Logs from '@/view/logs/Logs/Logs'

interface IProps {
   className?: string
   ready: boolean
   route?: any
}

const Main = (props: IProps): ReactElement => {
   const [collapsed, setCollapsed] = React.useState(false)
   const { route, ready } = props
   console.log(route)

   let history = useHistory()

   useEffect(() => {
      let current = true

      message.success('welcome')

      return () => {
         current = false
      }
   }, [])

   const toggle = () => {
      setCollapsed(!collapsed)
   }
   const refresh = () => {
      history.replace('/')
   }
   return (
      <Observer>
         {() => (
            <HashRouter>
               <Layout style={{ height: '100%', width: '100%' }}>
                  <Header />
                  <Layout>
                     <SideBar width={200} className='site-layout-background'></SideBar>
                     <Layout style={{ padding: '0 24px 24px' }}>
                        <Loading loading={!ready} size='large' tip='正在初始化,请稍等...' height='100vh'>
                           <Layout.Content
                              className='site-layout-background'
                              style={{
                                 overflowY: 'auto',
                                 overflowX: 'hidden',
                                 margin: '12px 6px',
                                 padding: 24,
                                 height: '100%'
                              }}
                           >
                              {renderRoutes(routes)}
                           </Layout.Content>
                        </Loading>
                     </Layout>
                  </Layout>
               </Layout>
            </HashRouter>
         )}
      </Observer>
   )
}

export default React.memo(Main)
