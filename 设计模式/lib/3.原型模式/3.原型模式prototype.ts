/**
 * 原型范式编程
 * 这在JavaScript中实现面向对象的基石。
 * 这里以如何在JS中实现 new 来描述这个模式
 */
function Parent(name) {
  this.name = name;
}

function myNew(Parent, ...args) {
  // 1.以构造函数的原型为对象创建 o
  const o = Object.create(Parent.prototype);
  // 2.传入参数调用构造函数，并把this指向 o
  const result = Parent.apply(o, args);
  // 3. 若2步骤返回是对象则返回该对象，否则返回1步骤创建的 o
  return typeof result === "object" ? result : o;
}

const p = myNew(Parent, "raotaohub");
console.log(p.__proto__ === Parent.prototype);
console.log(Parent === Parent.prototype.constructor);
console.log(Parent.prototype.__proto__ === Parent.prototype);

// 这样就创建了一个 以Parent的原型为模板的对象 p
// 1. 实例 p 的__proto__属性指向了，其构造函数 Parent 的 prototype 属性
// 2. 构造函数原型（ prototype ）的 constructor 属性引用该构造函数 这是个循环引用的关系
// 3. 所有对象原型的 __proto__ 属性尽头是 null ，所有对象都是 Object.prototype 的派生

const foo: any = {
  p: {}
};

foo.p.c = foo;
