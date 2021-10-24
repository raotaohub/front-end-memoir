/*
 * @Author: raotaohub
 * @Date: 2021-02-19 17:00:44
 * @LastEditTime: 2021-10-24 22:47:09
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\App.tsx
 * @Description: App外壳组件
 */
import React, { useEffect, useState } from 'react'
import { Provider as MobxProvider } from 'mobx-react'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
// ------
import mobxStore from '@store/index'
import globalStore from './store/globalStore/globalStore'
import routesStore from './store/routesStore/routesStore'
// ------
import Main from '@/comopoents/public/Main/Main'
// ------
import './app.css'

// todo 在这里可以向 globalStore 设置某个特定的值

function App() {
   const [init, setInit] = useState(false)

   useEffect(() => {
      // mobxStore.init
      console.log('mobxStore-init:', mobxStore)
      setTimeout(() => {
         setInit(true)
      }, 1500)
   }, [])

   // 在这里用 mobx的Store 初始化 ，包括生成路由[]、菜单[]

   return (
      <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
         <MobxProvider {...mobxStore}>
            <Main ready={init} />
         </MobxProvider>
      </ConfigProvider>
   )
}

export default React.memo(App)
