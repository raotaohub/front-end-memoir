## Redirect重定向
    
    <Switch>
      <Route path="/about" component={About}/>
      <Route path="/home" component={Home}/>
      <Route path="/test" component={Test}/>
      {/** 重定向标签写在所有路由的最下面，所有路径都不匹配的时候显示 **/}
      <Redirect to="/about"></Redirect>
    </Switch>

