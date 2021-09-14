/*
 * @Author: raotaohub
 * @Date: 2021-02-12 14:49:45
 * @LastEditTime: 2021-02-12 15:04:30
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\src\components\01_setState\index.js
 * @Description: Edit......
 */
import React, {Component} from "react";

export default class Demo extends Component {
  state = {
    count: 0,
  };

  add = () => {
    // （1）对象式的 setState 接收一个对象，和一个回调，在render之后调用
    /*  const { count } = this.state;
    this.setState({ count: count + 1 }, () => {
      console.log("setState之后的输出", this.state.count);
    }); // 状态更新是异步的
    // console.log("setState之后的输出", this.state.count); */

    // （2）函数式 setState 接收一个函数，默认接收2个参数
    this.setState((state, props) => {
      return {count: state.count + 1};
    });
  };

  render() {
    return (
        <div>
          <h5>01_setState</h5>
          <div>当前求和项是：{this.state.count}</div>
          <button onClick={this.add}>点击加1</button>
        </div>
    );
  }
}
