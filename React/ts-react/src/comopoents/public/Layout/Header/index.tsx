//------------------- 引入库
import React, { ReactElement } from 'react'
// import {connect} from "react-redux";
//-------------------
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

//------------------- 引入样式
import './index.less'
//------------------- antd组件解构
const { Header } = Layout

function LayoutHeader(props: any): ReactElement {
   const { toggle, collapsed } = props
   return (
      <Header className='header'>
         <div className='logo' />
         <Menu theme='light' mode='horizontal' defaultSelectedKeys={['2']}>
            <Menu.Item key='1'>nav 1</Menu.Item>
            <Menu.Item key='2'>nav 2</Menu.Item>
            <Menu.Item key='3'>nav 3</Menu.Item>
         </Menu>
      </Header>
   )
}

export default React.memo(LayoutHeader)
