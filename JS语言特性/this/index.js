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
