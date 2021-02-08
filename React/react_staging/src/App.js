import React from "react"
import {Button,Space, DatePicker} from 'antd';
import {WechatOutlined} from '@ant-design/icons';
import "antd/dist/antd.css"

export default class App extends React.Component {
  onChange = ()=>{
    console.log("改变了改变了改变了改变了改变了")
  }
  render() {
    return (
      <div>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <br/>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
        <WechatOutlined/>
        <Space direction="vertical">
          <DatePicker onChange={this.onChange}/>
        </Space>
      </div>
    )
  }
}
//├─
//└─


