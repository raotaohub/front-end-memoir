# 神奇的 delete 操作符

```js
var bar = function () {}; // Global object 的 property  以下简称 G 型属性
function foo() {} // Global object 的 property  G 型属性
b = 999; // 未声明赋值
this.fun = function () {}; // Global object 的 property  但是是通过 property 属性赋值创建的 也是是 xxx.xxx 的形式 以下简称 GP 型属性
window.obj = {}; // Global object 的 property  但是是通过 property 属性赋值创建的 GP 型属性
this.array = []; // Global object 的 property  但是是通过 property 属性赋值创建的 GP 型属性

console.log(delete bar); // false    G 型属性
console.log(delete foo); // false    G 型属性
console.log(delete window.bar); // false    G 型属性
console.log(delete window.foo); // false    G 型属性
console.log(delete b); // true     未声明赋值  但是可以被删除 b 属于未声明的赋值的属性

console.log(delete fun); // true     GP 型属性  可删除
console.log(delete obj); // true     GP 型属性  可删除
console.log(delete array); // true     GP 型属性  可删除
console.log(window.bar === bar); // true     G  型属性  在访问上 它是Global object 的 property 但却不可删除
console.log(window.foo === foo); // true     G  型属性  在访问上 它是Global object 的 property 但却不可删除

// 实际上我没有声明 变量 a 所以以下操作是访问对象上不存在的属性
console.log(window === this); // true     该环境下 this 指向 window , window是浏览器环境的全局对象
console.log(this.a === window.a); // true     GP 型属性
console.log(window.a, this.a); // undefined undefined

console.log(delete this.a); // true     GP 型属性  可删除
console.log(delete window.a); // true     GP 型属性  可删除

//  attributes 是 在 property 创建期间决定的
function attributes() {} // 定义时就已经确认了 attributes(特性)
attributes = 999; // 未声明赋值
console.log(delete attributes); // false

this.attri = []; // GP 型属性 定义时就已经确认了 attributes(特性)
var attri = "特性"; // G 型属性
console.log(attri); // '特性'
console.log(delete attri); // false 尽管后一句用 G 型号
```
