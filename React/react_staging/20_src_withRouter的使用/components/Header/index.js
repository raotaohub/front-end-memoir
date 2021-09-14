import React, {Component} from 'react';
import {withRouter} from "react-router-dom"

class Header extends Component {
  /** 普通组件的 props 身上是没有 history 属性 **/
  /** 但是可以通过 withRouter 实现 **/
  back = () => {
    this.props.history.goBack()
  }
  forward = () => {
    this.props.history.goForward()
  }
  go = () => {
    this.props.history.go(-2)
  }
  /** ----------------------------------- **/

  render() {
    console.log("Header收到的props是", this.props)
    const {props} = this
    return (
        <div>
          <h5>props是{props.a}</h5>
          <button onClick={this.back}>回退</button>
          &nbsp;
          <button onClick={this.forward}>前进</button>
          &nbsp;
          <button onClick={this.go}>g o</button>
          &nbsp;
        </div>
    );
  }
}
/** withRouter 可以加工一般组件，让一般组件具备路由组件才特有的 API **/
/** @return 新组件 **/
export default withRouter(Header);/** -- **/
/** ----------------------------------- **/
