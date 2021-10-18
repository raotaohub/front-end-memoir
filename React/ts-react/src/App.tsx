/*
 * @Author: raotaohub
 * @Date: 2021-02-19 17:00:44
 * @LastEditTime: 2021-10-16 23:12:09
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\App.tsx
 * @Description: App外壳组件
 */
import React, { Suspense } from 'react'
import { Spin } from 'antd'

import { renderRoutes } from 'react-router-config'

import { BrowserRouter } from 'react-router-dom'

import { Provider as MobxProvider } from 'mobx-react'

import routes from './routes/index'
import mobxStore from './store/mobx/index'

function App() {
  return (
    <Suspense fallback={<Spin delay={250} tip='加载中~🤭' size='large' />}>
      <MobxProvider {...mobxStore}>
        {/* <BrowserRouter>{renderRoutes(routes)}</BrowserRouter> */}
        hello-raotao
      </MobxProvider>
    </Suspense>
  )
}

console.log(mobxStore)

export default React.memo(App)
