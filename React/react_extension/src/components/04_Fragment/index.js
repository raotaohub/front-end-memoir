/*
 * @Author: raotaohub
 * @Date: 2021-02-12 16:22:09
 * @LastEditTime: 2021-02-12 16:27:38
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\src\components\04_Fragment\index.js
 * @Description: Edit......
 */
import React, {Component, Fragment} from "react";

// Fragment 在渲染的时候会被抛弃，可以减少层级
export default class Demo extends Component {
  render() {
    return (
        <Fragment>
          <button>111111</button>
          <button>222222</button>
        </Fragment>
    );
  }
}
