import React from "react"
import {Route, BrowserRouter, Switch, Redirect} from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About"
import Header from "./components/Header";
import MyNavLink from "./components/MyNavLink";

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
                <Header a={9999999}/>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 col-xs-offset-2">
                <div className="list-group">

                  <MyNavLink to="/about">About</MyNavLink>
                  <MyNavLink to="/home">Home</MyNavLink>

                </div>
              </div>
              <div className="col-xs-6">
                <div className="panel">
                  <div className="panel-body">
                    {/** Switch只允许进行单一匹配，最好使用该标签 **/}
                    <Switch>
                      <Route path="/about" component={About}/>
                      <Route path="/home" component={Home}/>
                      {/** 重定向 **/}
                      <Redirect to="/about"></Redirect>
                    </Switch>
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


