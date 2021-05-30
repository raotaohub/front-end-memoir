// Stadic Tpye
let count: number = 1

console.log(count.toString())

// 自定义静态类型

// 定义一个类型 xiaojiejie 为对象
interface xiaojiejie {
  // 指定uname 为字符串
  uname: string
  // 指定age 为数字
  age: number
}

// Ts的这种特性 也可以指定数据为对象 同时指定对象中的属性类型

const xiaohong: xiaojiejie = {
  uname: '小红',
  age: 18,
}
console.log(xiaohong.uname)
console.log(xiaohong.age)

export {}
