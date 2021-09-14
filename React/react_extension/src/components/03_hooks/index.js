/*
 * @Author: raotaohub
 * @Date: 2021-02-12 15:34:29
 * @LastEditTime: 2021-02-12 15:55:39
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\src\components\03_hooks\index.js
 * @Description: Edit......
 */

import React, {Component} from "react";

/* export default class Demo extends Component {
  state = {
    count: 0,
  };
  add = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <h2>当前求和为：{this.state.count}</h2>
        <button onClick={this.add}>点击加1</button>
      </div>
    );
  }
} */
export default function Demo() {
  const [count, setCount] = React.useState(16); //语法: const [xxx, setXxx] = React.useState(initValue)
  const [name, setName] = React.useState("raotaohub");
  function add() {
    setCount((count) => count + 2); //1.setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
  }
  function changeName() {
    setName((name) => "zhuzhu"); //2.setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
  }
  return (
      <div>
        <h2>当前求和为：{count}</h2>
        <button onClick={add}>点击加2</button>
        <h2>当前名字为：{name}</h2>
        <button onClick={changeName}>点击改名</button>
      </div>
  );
}
