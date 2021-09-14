/*
 * @Author: raotaohub
 * @Date: 2021-02-12 14:42:11
 * @LastEditTime: 2021-02-12 16:24:14
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\src\App.js
 * @Description: Edit......
 */
import React, {Component} from "react";
import Demo from "./components/04_Fragment";

export default class App extends Component {
  render() {
    return (
        <div app="App">
          <h3>hello react .....</h3>
          <div>
            <Demo/>
          </div>
        </div>
    );
  }
}
