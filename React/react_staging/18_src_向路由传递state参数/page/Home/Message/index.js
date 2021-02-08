import React, {Component} from 'react';
import {Link, Route} from "react-router-dom"
import Detail from "./Detail";

class Message extends Component {
  state = {
    messageList: [
      {id: "01", title: "消息1"},
      {id: "02", title: "消息2"},
      {id: "03", title: "消息3"},
      {id: "04", title: "消息3"},
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
                  {/** 1.入口 传递 params **/}
                  {/*<Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>*/}
                  {/** 2.入口 传递 search 参数 **/}
                  {/*<Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>*/}
                  {/** 3.入口 传递 state 参数 **/}
                  <Link to={{
                    pathname: "/home/message/detail",
                    state: {id: msgObj.id, title: msgObj.title}
                  }}>{msgObj.title}</Link>
                </li>
              )
            })
          }
        </ul>
        <hr/>
        {/** 1.出口 接收 params 参数**/}
        {/*<Route path={`/home/message/detail/:id/:title`} component={Detail}/>*/}
        {/** 2. search 不用申明接收**/}
        {/*<Route path="/home/message/detail" component={Detail}/>*/}
        {/** 3. params 不用申明接收**/}
        <Route path="/home/message/detail" component={Detail}/>
      </div>
    );
  }
}

export default Message;
