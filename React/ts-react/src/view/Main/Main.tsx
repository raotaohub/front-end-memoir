// //------------------- 引入库
// import React, { ReactElement, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
// //------------------- 引入antd

// //------------------- 引入样式
// import './index.less'

// //------------------- 引入公共组件

// import { getUser } from '../utils/storage'

// function Index(props: any): ReactElement {
//   const [collapsed, setCollapsed] = React.useState(false)
//   const { route } = props
//   console.log(route)

//   let history = useHistory()

//   useEffect(() => {
//     let current = true

//     if (current && !getUser('admin')) history.replace('/login')

//     return () => {
//       current = false
//     }
//   }, [history])

//   return (
//     <React.Fragment>
//       <div id='admin'>
//         欢迎来到疙瘩后台~admin
//         <div className='bg'>aaaaaaaaaaaaaa</div>
//       </div>
//     </React.Fragment>
//   )
// }

// export default Index

/*
 * @Author: raotaohub
 * @Date: 2021-02-19 20:44:47
 * @LastEditTime: 2021-05-03 22:07:17
 * @LastEditors: raotaohub
 * @FilePath: \react_admin_client_ts\src\page\Admin\admin.tsx
 * @Description: Edit......
 */
//------------------- 引入库
import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

//------------------- 引入antd
import { Layout, message } from 'antd'

//------------------- 引入样式
import './main.less'

//------------------- 引入公共组件
import LayoutHeader from '../../comopoents/public/Layout/LayoutHeader'
import LayoutContent from '../../comopoents/public/Layout/LayoutContent'
import LayoutSideBar from '../../comopoents/public/Layout/LayoutSideBar'
import { Observer } from 'mobx-react'

function Main(props: any): ReactElement {
   const [collapsed, setCollapsed] = React.useState(false)
   const { route } = props
   console.log(route)

   let history = useHistory()

   useEffect(() => {
      let current = true

      // message.success('欢迎进入疙瘩后台')

      //   if (current && !getUser('admin')) history.replace('/login')

      return () => {
         current = false
         // RemoveUser('admin')
      }
   }, [history])

   const toggle = () => {
      setCollapsed(!collapsed)
   }
   const refresh = () => {
      history.replace('/')
   }
   return (
      <Observer>
         {() => (
            <Layout style={{ height: '100%', width: '100%' }}>
               <LayoutSideBar toggle={toggle} collapsed={collapsed} refresh={refresh} />
               <Layout className='site-layout'>
                  <LayoutHeader toggle={toggle} collapsed={collapsed}>
                     ♥♥♥疙瘩的后台管理页~
                  </LayoutHeader>
                  <LayoutContent>{/* {renderRoutes(route.routes)} */}</LayoutContent>
               </Layout>
            </Layout>
         )}
      </Observer>
   )
}

export default React.memo(Main)
