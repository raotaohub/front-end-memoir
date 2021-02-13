/*
 * @Author: raotaohub
 * @Date: 2021-02-12 15:06:16
 * @LastEditTime: 2021-02-12 15:27:18
 * @LastEditors: raotaohub
 * @FilePath: \react_extension\src\components\02_lazyLoad懒加载\index.js
 * @Description: Edit......
 */
import React, { lazy, Suspense } from "react";

import { NavLink, Route, BrowserRouter } from "react-router-dom";

// import About from "./About";
// import Home from "./Home";
import Loading from "./Loading";
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-8">
                <div className="page-header">
                  <h2>React Router Demo</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 col-xs-offset-2">
                <div className="list-group">
                  {/**原生的HTML页面中，靠 a 标签进行跳转 **/}
                  {/*<a className="list-group-item active" href="./about.html">About</a>*/}
                  {/*<a className="list-group-item" href="./home.html">Home</a>*/}

                  {/**  在React中靠 路由链接 【实现组件切换】**/}
                  <NavLink className="list-group-item" to="/about">
                    {" "}
                    About
                  </NavLink>
                  <NavLink className="list-group-item" to="/home">
                    {" "}
                    Home
                  </NavLink>
                </div>
              </div>
              <div className="col-xs-6">
                <div className="panel">
                  <div className="panel-body">
                    {/** 注册路由 **/}
                    <Suspense fallback={<Loading />}>
                      <Route path="/about" component={About} />
                      <Route path="/home" component={Home} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
