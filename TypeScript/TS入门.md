# TS 入门

## 第一章：TS 的类型声明

### 1、常用基本类型

| 类型     | 例子                                 | 描述                                          |     |
| -------- | ------------------------------------ | --------------------------------------------- | --- |
| number   | 1、-1、0.1                           | 任意数字                                      |     |
| string   | 'hello'、'你好'                      | 任意字符串                                    |     |
| boolean  | true、false                          |                                               |     |
| 字面量   | let a = '你好' let b = 1 \| 2        | 限制 a 变量的值就是该字面量的值               |     |
| unknown  | \*                                   | 类型安全的 any                                |     |
| any      | \*                                   | 任意类型                                      |     |
| void     | 空值 undefined                       | 没有值或 undefined                            |     |
| never    | ():never => throw new Error('error') | 永远不会返回结果，程序报错也就连结果都没有了  |     |
| object   | {name : string , age? : number}      | 任意 JS 对象                                  |     |
| array    | [1,2,3]                              | 任意 JS 数组                                  |     |
| tuple    | [string,string]                      | 固定长度的数组                                |     |
| enum     | enum{A,B}                            |                                               |     |
| function | (a:string,b:string)=>string          | 函数接受为字符串的参数 a , b 、返回值是字符串 |     |

类型别名

```tsx
//有1个k变量的类型如下
let k : 1 | 2 | 3 | 4 | 5
//另1个l变量的类型和k一样
let l : 1 | 2 | 3 | 4 | 5

// 此时可以借助类型别名

type myType :  1 | 2 | 3 | 4 | 5

let k : myType

let l : myType

k = 1 √

l = 6 ×
```

## 第二章：面向对象

### 1、抽象类

```tsx
/**

 \*  abstract 声明的是抽象类，只能用于继承

 \*  抽象类里可以用 abstract 声明定义抽象方法

 */

abstract class People {
  name: string

  constructor(name: string) {
    this.name = name
  }

  abstract sayName(): void
}

// 继承于 People 的类 必须强制去实现 sayName 方法

class Chinese extends People {
  sayName() {
    console.log('我是' + this.name)
  }
}
```

### 2、接口

接口就是一个规范。

```tsx
// 用于定义一个类/对象 应该包含什么属性和方法 ； 同时还可以用做类型申明去使用 ； 并可以重复声明

interface IProps {
  name: string
  age: number
}

interface IProps {
  gender: string
}

const obj: IProps = {
  name: '🐖',
  age: 11,
  gender: '男',
}
```

```tsx
// 【声明类型】的时候可以用 type 类型别名 、也可以用interface 接口

// 接口只定义对象的结构。

// 定义类时，可以使类去实现一个接口。

interface IPeople {
  type: string
  sayType: () => void
}

class MyClass implements IPeople {
  type: string
  constructor(type: string) {
    this.type = type
  }

  sayType() {
    console.log('我是' + this.type)
  }
}
```
