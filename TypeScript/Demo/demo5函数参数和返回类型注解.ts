// 通过规定 函数返回值的类型 来排除函数体的书写错误
function getTotal(a: number, b: number): number {
  return a + b
}
const total = getTotal(5, 2)
console.log(total)

// 没有返回值的函数 应该写什么？ void
function sayHello(): void {
  console.log('Hello World')
}
// 永远不会有结果的函数，比如报错会导致程序终止，也就没有返回值了 应该写什么？ never
function errorFunction(): never {
  throw new Error()
  console.log('111')
}

// 参是一个对象的 要如何规定形参的类型呢？
function add({ one, two }: { one: number; two: number }) {
  return one + two
}
const addtotal = add({ one: 1, two: 2 })

// 参是一个对象 ，只有一个属性
function getNumber({ one }: { one: number }) {
  return one
}
const one = getNumber({ one: 1 })

export {}
