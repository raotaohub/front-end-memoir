//------------------- 引入库
import React, { ReactElement, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//-------------------
import { Layout, Menu } from 'antd'

//------------------- 引入样式
import './menuView.less'
import { getMenus } from '@/routes/core'
// import reactLogo from '../../assets/logo192.png';
//------------------- antd组件解构
const { Sider } = Layout
const { SubMenu } = Menu

function MenuView(props: any): ReactElement {
   const { collapsed, refresh, toggle } = props
   const history = useHistory()
   const { pathname } = useLocation()

   const to = (path: string) => {
      history.push(path)
   }

   return (
      <Sider theme='light' collapsible onCollapse={toggle} collapsed={collapsed} width={160} className='site-layout-background'>
         <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
            {getMenus().map(menu => {
               return (
                  <SubMenu className='sub-menu-item' key={menu.path} title={menu.title}>
                     {menu.subMenu?.map(sub => {
                        return (
                           <Menu.Item key={sub.path}>
                              <Link to={sub.path}>
                                 <span className={'selected-item item'}>{sub.title}</span>
                              </Link>
                           </Menu.Item>
                        )
                     })}
                  </SubMenu>
               )
            })}
         </Menu>
      </Sider>
   )
}

export default React.memo(MenuView)
