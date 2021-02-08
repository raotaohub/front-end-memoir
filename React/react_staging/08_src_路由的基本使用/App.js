import React from "react"
import {Link, Route, BrowserRouter,} from "react-router-dom";
import About from "./components/Home";
import Home from "./components/About"

/** (1).导航使用 <Link to="/xx" component= {} ></Link>标签
 *  (2).展示用 <Route path="/xx"> </Route>
 *  (3). 最外层需要一个路由器 <BrowserRouter> </BrowserRouter> 或 哈希路由<HashRouter>
 * **/
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div>
            <div className="row">
              <div className="col-xs-offset-2 col-xs-8">
                <div className="page-header"><h2>React Router Demo</h2></div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 col-xs-offset-2">
                <div className="list-group">
                  {/**原生的HTML页面中，靠 a 标签进行跳转 **/}
                  {/*<a className="list-group-item active" href="./about.html">About</a>*/}
                  {/*<a className="list-group-item" href="./home.html">Home</a>*/}

                  {/**  在React中靠 路由链接 【实现组件切换】**/}
                  <Link className="list-group-item" to="/about">About</Link>
                  <Link className="list-group-item" to="/home">Home</Link>

                </div>
              </div>
              <div className="col-xs-6">
                <div className="panel">
                  <div className="panel-body">
                    {/** 注册路由 **/}

                    <Route path="/about" component={About}/>
                    <Route path="/home" component={Home}/>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}


