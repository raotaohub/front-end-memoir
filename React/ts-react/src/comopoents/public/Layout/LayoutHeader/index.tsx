//------------------- 引入库
import React, { ReactElement } from 'react';
// import {connect} from "react-redux";
//-------------------
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

//------------------- 引入样式
import './index.less';
//------------------- antd组件解构
const { Header } = Layout;

function LayoutHeader(props: any): ReactElement {
  const { toggle, collapsed } = props;
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      {props.children}
    </Header>
  );
}

export default React.memo(LayoutHeader);
