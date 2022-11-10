// src/app2.js
const express = require("express");
const app = express();

app.all("*", (req, res, next) => {
  console.log(req);

  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// 定义一个接口，index.html页面请求这个接口就是跨域（因为端口不同）
app.get("/anotherService", (req, res) => {
  res.json({ code: 0, msg: "这是8003端口返回的" });
});

app.listen("8003", () => {
  console.log("app2 running at port 8003");
});
