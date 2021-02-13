/*
 * @Author: raotaohub
 * @Date: 2021-02-12 15:25:38
 * @LastEditTime: 2021-02-12 15:26:42
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\src\components\02_lazyLoad懒加载\Loading\index.js
 * @Description: Edit......
 */
import React, { Component } from "react";

export default class Loading extends Component {
  render() {
    return (
      <div>
        <h1>加载中...</h1>
        <h2>不许懒加载，必须用已就位的组件</h2>
      </div>
    );
  }
}
