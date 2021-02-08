/** webpack入口文件 **/

import React from 'react'; // 入口文件引入React核心库
import ReactDOM from 'react-dom';

import './index.css'; // 引入全局样式表

import App from './App';// 引入APP组件

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


