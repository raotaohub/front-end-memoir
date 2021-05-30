// TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。
// 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

interface IGirl {
  name: string
  age: number
  bust: number
  waistLine?: number
}

const searchResume = (girl: IGirl) => {
  const { name, age, bust } = girl
  age < 24 && bust >= 90 && console.log(name + '你被录用了是')
  ;(age >= 24 || bust < 90) && console.log(name + '你被淘汰了❌')
  girl.waistLine && console.log(girl.waistLine)
}
const girl = {
  name: '小红',
  age: 18,
  bust: 89,
  waistLine: 80,
}
searchResume(girl)
