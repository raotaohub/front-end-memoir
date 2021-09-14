/*
 * @Author: raotaohub
 * @Date: 2021-02-12 14:42:07
 * @LastEditTime: 2021-02-12 15:11:55
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\src\index.js
 * @Description: Edit......
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
    document.getElementById("root")
);
