import React, {Component} from 'react';
import {Link, Route} from "react-router-dom"
import Detail from "./Detail";

class Message extends Component {
  state = {
    messageList: [
      {id: "01", title: "消息1"},
      {id: "02", title: "消息2"},
      {id: "03", title: "消息3"},
    ]
  }
  render() {
    const {messageList} = this.state
    return (
      <div>
        <ul>
          {
            messageList.map((msgObj) => {
              return (
                <li key={msgObj.id}>
                  {/** 入口 传递 params**/}
                  <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>&nbsp;&nbsp;
                </li>
              )
            })
          }
        </ul>
        <hr/>
        {/** 出口 接收 params 参数**/}
        <Route path={`/home/message/detail/:id/:title`} component={Detail}/>
      </div>
    );
  }
}

export default Message;
