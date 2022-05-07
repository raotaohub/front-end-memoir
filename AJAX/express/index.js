/*
 * @Author: raotaohub
 * @Date: 2021-02-24 16:20:38
 * @LastEditTime: 2021-02-24 23:52:57
 * @LastEditors: raotaohub
 * @FilePath: \AJAX\express\index.js
 * @Description: Edit......
 */
const express = require("express");

const app = express();

/* 1、2、 */
app.get("/server", (request, response) => {
  // 设置响应
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.send("HELLO AJAX");
});

/* 3、 */
app.post("/server", (request, response) => {
  // 设置响应
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Access-Control-Allow-Headers", "*");

  response.send("HELLO AJAX POST");
});

/* 4、 设置允许任何请求头*/
// 第二步设置all方法，允许任何方法
app.all("/server", (request, response) => {
  // 设置响应
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Access-Control-Allow-Headers", "*"); // 第一步 ，设置自定义请求头

  response.send("HELLO AJAX POST");
});

/* 5、 解析JSON数据*/
app.post("/json-server", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Access-Control-Allow-Headers", "*");

  const data = {
    name: "raotao",
    age: 19,
    school: "MJU",
  };

  let str = JSON.stringify(data);

  response.send(str);
});

/* 6、 延时响应*/

app.get("/setTimeout", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Access-Control-Allow-Headers", "*");

  setTimeout(() => {
    response.send("超时消息");
  }, 3000);
});

/* 7、  */
app.get("/delay", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");

  response.setHeader("Access-Control-Allow-Headers", "*");

  setTimeout(() => {
    response.send("超时消息");
  }, 1000);
});

/* 跨域 JSONP */
app.all("/jsonp", (request, response) => {
  // response.send("alert('jsonp')");
  const data = {
    name: "raotaohub",
  };

  let str = JSON.stringify(data);

  response.end(`handle(${str})`);
});

app.listen(8000, () => {
  console.log("服务已启动");
});

/**
 * 引入 nodemon做热更新
 * `npm install -g nodemon`
 */
