//------------------- 引入库
import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
//-------------------
import { Layout, Menu } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'

// import adminMenu from '../../routes/adminRoutes/index'

//------------------- 引入样式
import './index.less'
// import reactLogo from '../../assets/logo192.png';
//------------------- antd组件解构
const { Sider } = Layout
const { SubMenu } = Menu

function LayoutSideBar(props: any): ReactElement {
   const { collapsed, refresh } = props
   const history = useHistory()

   const to = (path: string) => {
      history.push(path)
   }

   return (
      // <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
      //    <div onClick={refresh} className='logo-wrapper'>
      //       {/* <img className="img" src={reactLogo} alt="logo" /> */}
      //       <span className={collapsed ? ' hide' : 'title'}>
      //          <UserOutlined></UserOutlined> 疙瘩后台
      //       </span>
      //    </div>

      //    <Menu theme='light' mode='inline' defaultSelectedKeys={['1']}>
      //       {adminMenu.map(item => {
      //     if (item) {
      //       return (
      //         <SubMenu key={item.key} title={item.name}>
      //           {item.routes &&
      //             item.routes.map(child => {
      //               return (
      //                 <Menu.Item
      //                   key={child.key}
      //                   onClick={() => {
      //                     to(child.path)
      //                   }}
      //                 >
      //                   {child.name}
      //                 </Menu.Item>
      //               )
      //             })}
      //         </SubMenu>
      //       )
      //     }
      //     return null
      //   })}
      //    </Menu>
      // </Sider>
      <Sider width={200} className='site-layout-background'>
         <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
            <SubMenu key='sub1' icon={<UserOutlined />} title='subnav 1'>
               <Menu.Item key='1'>option1</Menu.Item>
               <Menu.Item key='2'>option2</Menu.Item>
               <Menu.Item key='3'>option3</Menu.Item>
               <Menu.Item key='4'>option4</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<LaptopOutlined />} title='subnav 2'>
               <Menu.Item key='5'>option5</Menu.Item>
               <Menu.Item key='6'>option6</Menu.Item>
               <Menu.Item key='7'>option7</Menu.Item>
               <Menu.Item key='8'>option8</Menu.Item>
            </SubMenu>
            <SubMenu key='sub3' icon={<NotificationOutlined />} title='subnav 3'>
               <Menu.Item key='9'>option9</Menu.Item>
               <Menu.Item key='10'>option10</Menu.Item>
               <Menu.Item key='11'>option11</Menu.Item>
               <Menu.Item key='12'>option12</Menu.Item>
            </SubMenu>
         </Menu>
      </Sider>
   )
}

export default React.memo(LayoutSideBar)
