/*
 * @Author: raotaohub
 * @Date: 2021-02-19 17:00:44
 * @LastEditTime: 2021-10-23 23:15:01
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\App.tsx
 * @Description: App外壳组件
 */
import React, { Suspense } from 'react'
import { Provider as MobxProvider } from 'mobx-react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import { Spin, ConfigProvider, Button, Layout, Menu, Breadcrumb } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

// import routes from './routes/index'
import mobxStore from './store/mobx/index'
import './app.css'
import { Header, Content } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import SubMenu from 'antd/lib/menu/SubMenu'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import Main from 'view/Main/Main'

function App() {
   return (
      <Suspense fallback={<Spin delay={250} tip='加载中~🤭' size='large' />}>
         <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
            <MobxProvider {...mobxStore}>
               <Main></Main>
               {/* <HashRouter> */}
               {/* {renderRoutes(routes)} */}
               {/* </HashRouter> */}
            </MobxProvider>
         </ConfigProvider>
      </Suspense>
   )
}

console.log(mobxStore)

export default React.memo(App)
