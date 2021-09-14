// 【声明类型】的时候可以用 type 类型别名 、也可以用interface 接口
// 接口只定义对象的结构。

interface IPeople {
  type: string
  sayType: () => void
}

// 接口也是可以继承的
interface IChinese extends IPeople {
  name: string
}

// 定义类时，可以使类去实现一个接口。
class MyClass implements IPeople {
  type: string

  constructor(type: string) {
    this.type = type
  }

  sayType() {
    console.log('我是' + this.type)
  }
}

export {}
