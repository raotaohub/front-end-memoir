//  字符串数组
const stringArr: string[] = ['ab', 'cd', 'ef']
//  数字数组
const numberArr: number[] = [1, 2, 3, 5]
//  undefined数组
const undefinedArr: undefined[] = [undefined, undefined]
//  null数组
const nullArr: null[] = [null, null]

// 混合形的 有字符串 有数字的
const mixtureArr: (string | number)[] = ['我是字符串', 1, '11', 111, 111, '好']

// 混合型   有对象 对象里有属性  有数组 数字里有 数字 和 字符串

const objArr: Lady = [
  {
    name: '胖大海',
    age: 30,
  },
  ['胖小海', 16],
]

interface ILady {
  name: string
  age: number
  sayName: () => void
}

const xiaojiejie: ILady[] = [
  { name: '111', age: 111, sayName: () => {} },
  { name: '222', age: 222, sayName: () => {} },
  { name: '333', age: 333, sayName: () => {} },
]

// 也可以定义 type 或者 class

type Lady = ({ name: string; age: number } | (string | number)[])[]

export {}
