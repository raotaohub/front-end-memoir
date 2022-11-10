/* 考察函数参数是按值传递的，对象传递的是地址，并非引用。 */

function changeObjProperty(o) {
  o.siteUrl = "http://a.com";
  console.log(o); // { siteUrl: 'http://a.com' }
  o = new Object();
  console.log(o); // {}
  o.siteUrl = "http://b.com";
  console.log(o); // { siteUrl: 'http://b.com' }
}

let s = new Object();
changeObjProperty(s);
console.log(s.siteUrl); // http://a.com

/**
 * 形参 o 此时接收的是1个对象，引用类型
 * 第 5 行 o = new Object(); 实际上只是给 o 复制了新的地址 ，而之前的 o 的地址还存在着。
 */
