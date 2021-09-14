// 1. type annotation 类型注解
// 2. type inference 类型推断
//  如果TS可以推断则 不写类型注解，如果无法推断则必须写

// type annotation 类型注解

let count: number

count = 123

// 这里 : number  就叫做类型注解
let countInference = 123

// type inference 类型推断
const one = 1
const two = 2
const three = one + two

// TS无法自动推断的时候就应该写 类型注释

function getTotal(a: number, b: number) {
  return (a + b).toString()
}

getTotal(1, 2)

function getTotal2(a: number, b: number) {
  return (a + b).toString()
}

getTotal2(1, 2)

export {}
