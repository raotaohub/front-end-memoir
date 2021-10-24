//------------------- 引入库
import React, { ReactElement } from 'react';
//-------------------
import { Layout } from 'antd';

//------------------- 引入样式
import './index.less';
//------------------- antd组件解构
const { Content } = Layout;

function LayoutContent(props: any): ReactElement {
  console.log(props);
  
  return (
    <Content
      className="site-layout-background"
      style={{
        overflowY: 'scroll',
        overflowX: 'hidden',
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      {props.children}
    </Content>
  );
}

export default React.memo(LayoutContent);
