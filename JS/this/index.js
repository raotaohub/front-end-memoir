// this指向问题
// 1.箭头函数定义时确定
// 2.普通函数执行时确定

class Student {
  constructor(name) {
    this.name = "Tom";
  }

  getInfo() {
    return {
      name: "Jerry",
      getName: () => {
        return this.name;
      },
      getNames() {
        return this.name;
      }
    };
  }
}
let s = new Student();
console.log(s.getInfo().getName()); // Tom 1.箭头函数定义时确定
console.log(s.getInfo().getNames()); // Jerry 2.普通函数执行时确定

// 当使用new关键字来创建一个构造函数的实例时，构造函数内部的this关键字会指向这个实例对象。

function Person(name) {
  this.name = name;
}

const person = new Person("John");

console.log(person.name); // Output: "John"

/**
 *  在上面的例子中，当使用new关键字调用Person构造函数时，this关键字会指向新创建的person实例对象。
 * 因此，在构造函数内部，this.name被设置为构造函数的第一个参数name的值。
 */
