/*
 * @Author: raotaohub
 * @Date: 2021-02-25 00:17:40
 * @LastEditTime: 2021-02-25 11:25:04
 * @LastEditors: raotaohub
 * @FilePath: \AJAX\until\jsonp.js
 * @Description: Edit......
 */

// 转换 data 为查询字符串形式
function objToQuery(object) {
  const array = [];
  for (let key in object) {
    array.push(encodeURIComponent(key) + "=" + encodeURIComponent(object[key]));
  }
  return array.join("&");
}

function jsonp({ url, data, callback }) {
  /**
   * 1.获得全局标签
   * 2.定义函数名 保证不会出现重复
   * 3.创建script标签
   * 4.将传入的scr写入到script中
   * 5.定义标签属性
   * 6.插入到全局标签的后面
   */
  const container = document.getElementsByTagName("head")[0];
  const fnName = `jsonp_${new Date().getTime()}`;
  const script = document.createElement("script");
  script.src = `${url}?${objToQuery(data)}&callback=${fnName}`;
  script.type = "text/javascript";
  container.appendChild(script);

  /**
   * 在全局环境中 用fnName定义一个函数
   * 当该函数被调用的时候会执行，然后移除标签和函数
   */
  window[fnName] = function (response) {
    callback && callback(response);
    container.removeChild(script);
    delete window[fnName];
  };
  /**
   * 异常处理：如果s
   *
   */
  script.onerror = function () {
    window[fnName] = function () {
      callback && callback("error!");
      container.removeChild(script);
      delete window[fnName];
    };
  };
}

jsonp({
  url: "url",
  data: {
    key1: "value1",
  },
  callback(data) {
    // data 是服务端返回的数据
  },
});
