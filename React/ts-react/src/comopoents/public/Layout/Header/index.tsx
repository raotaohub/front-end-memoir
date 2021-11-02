//------------------- 引入库
import React, { ReactElement } from 'react'
// import {connect} from "react-redux";
//-------------------
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

//------------------- 引入样式
import './index.less'
import { getMenus } from '@/routes/core'
import { Link, useLocation } from 'react-router-dom'
//------------------- antd组件解构
const { Header } = Layout

function LayoutHeader(props: any): ReactElement {
   const { pathname } = useLocation()
   return (
      <Header className='header'>
         <Menu theme='light' mode='horizontal' selectedKeys={[pathname]} defaultSelectedKeys={['1']}>
            {getMenus().map(menu => {
               return (
                  <Menu.Item key={menu.path}>
                     <Link to={menu.path}>
                        <span className={'selected-item item'}>{menu.title}</span>
                     </Link>
                  </Menu.Item>
               )
            })}
         </Menu>
      </Header>
   )
}

export default React.memo(LayoutHeader)
