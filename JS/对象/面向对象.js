// let person = {};
// Object.defineProperty(person, "name", {
//   configurable: true,
//   enumerable: true,
//   writable: false,
//   value: "Nicholas"
// });

// console.log(person.name); // "Nicholas"
// person.name = "Greg";
// console.log(person.name); // "Nicholas"

// for (const i in person) {
//   console.log(i)
// }

// let person = {};
// Object.defineProperty(person, "name", {
//   configurable: false,
//   enumerable: true,
//   value: "Nicholas"
// });
// 抛出错误
// Object.defineProperty(person, "name", {
//   configurable: true,
//   value: "Nicholas"
// });

// for (const i in person) {
//   console.log(i, person[i])
// }
// console.log(person.name)

// 访问器
// let book = {
//   year_: 2017,
//   edition: 1
// };

// Object.defineProperty(book, "year", {

//   get() {
//     return this.year_;
//   },
//   set(newValue) {
//     if (newValue > 2017) {
//       this.year_ = newValue;
//       this.edition += newValue - 2017;
//     }
//   }

// });

// book.year = 2018
// console.log(book.edition); // 2

// 定义多个属性
// Object.defineProperties(book, {

//   year_: {
//     value: 2017
//   },
//   edition: {
//     value: 1
//   },
//   year: {
//     get() {
//       return this.year_;
//     },

//     set(newValue) {
//       if (newValue > 2017) {
//         this.year_ = newValue;
//         this.edition += newValue - 2017;
//       }
//     }
//   }

// })

let book = {};
Object.defineProperties(book, {
  year_: {
    value: 2017
  },
  edition: {
    value: 1
  },
  year: {
    get: function () {
      return this.year_;
    },
    set: function (newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    }
  }
});
let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
console.log(descriptor.value); // 2017
console.log(descriptor.configurable); // false
console.log(typeof descriptor.get); // "undefined"

// let descriptor = Object.getOwnPropertyDescriptor(book, "year");
// console.log(descriptor.value); // undefined
// console.log(descriptor.enumerable); // false
// console.log(typeof descriptor.get); // "function"

// Object.assign()
let dest, src, result;
/**
 * 简单复制
 */
// dest = {};
// src = { id: 'src' };
// result = Object.assign(dest, src);
// // Object.assign 修改目标对象
// // 也会返回修改后的目标对象
// console.log(dest === result); // true
// console.log(dest !== src); // true
// console.log(result); // { id: src }
// console.log(dest); // { id: src }

/**
 * 多个源对象
 */
// dest = {};
// result = Object.assign(dest, { a: 'foo' }, { b: 'bar' });
// console.log(result); // { a: foo, b: bar }

// for (const i in dest) {
//   console.log(i, dest[i])
// }

/**
 * 获取函数与设置函数
 */
// dest = {
//   set a(val) {
//     console.log(`Invoked dest setter with param ${val}`);
//   }
// };
// src = {
//   get a() {
//     console.log('Invoked src getter');
//     return 'foo';
//   }
// };
// Object.assign(dest, src);
// // 调用src 的获取方法
// // 调用dest 的设置方法并传入参数"foo"
// // 因为这里的设置函数不执行赋值操作
// // 所以实际上并没有把值转移过来
// console.log(dest); // { set a(val) {...} }

/**
 * 对象引用
 */
dest = {};
src = {a: {fn: 'fn'}};
Object.assign(dest, src);
// 浅复制意味着只会复制对象的引用
dest.a.fn = 'nf'
console.log(dest.a.fn); // { a :{} }
console.log(dest.a === src.a); // true

let person = {
  name_: '',
  get name() {
    return this.name_;
  },
  set name(name) {
    this.name_ = name;
  },
  sayName() {
    console.log(`My name is ${this.name_}`);
  }
};

// 父类
function Parent() {
  this.name = '写代码像蔡徐抻'
  this.colors = ["red", "blue", "green"]
}

// 父类的原型方法
Parent.prototype.getName = function () {
  return this.name
}

// 子类
function Child() {
}

// 让子类的原型对象指向父类实例, 这样一来在Child实例中找不到的属性和方法就会到原型对象(父类实例)上寻找
Child.prototype = new Parent()
const child1 = new Child()
Child.prototype.constructor = Child // 根据原型链的规则,顺便绑定一下constructor, 这一步不影响继承, 只是在用到constructor时会需要
const child2 = new Child()
child1.name = 'foo'
console.log(child1.name)
console.log(child2.name)

// 原型链的问题主要在于原型中包含引用值的时候
child1.colors.push('我在child1乱入')
console.log(child1.colors)  // ["red", "blue", "green", "我在child1乱入"]
console.log(child2.colors)  // ["red", "blue", "green", "我在child1乱入"]    入侵到 child2



