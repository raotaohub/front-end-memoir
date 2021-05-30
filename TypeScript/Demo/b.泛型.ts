// 函数中的泛型

/*********************************************  泛型解决什么问题  ********************************************/
function suchAs(first: string | number, second: string | number) {
  console.log(`${first}${second}`)
  return `${first}${second}`
}

suchAs('raotao', 'hub') // 此时返回 'raotaohub'
suchAs('raotao', 1) // 此时返回 'raotao1'

// 若我们要求 第1个参数是string 那么第2个参数也必须是string。就需要引入泛型来限制

/*********************************************  泛型的定义和使用  ********************************************/

function suchAs2<T>(first: T, second: T) {
  console.log(`${first}${second}`)
  return `${first}${second}`
}

// 调用方法的时候用 尖括号 并注明类型
suchAs2<number>(1, '11')
suchAs2<number>(1, 1)

// 函数名后用 尖括号 <名字>
function join<T>(a: T, b: T) {
  return `${a}${b}`
}

// 使用的时候 尖括号 <类型>  这样就要求了两个形参都使用泛型T , T为string类型u
// 相当于函数在调用的时候才确定参数类型，而这个参数类型在调用时传入
join<string>('1', '2')

/***********************************************  数组中的泛型  **********************************************/

function myFun<T>(any: T[]) {
  //写法1
  return any
}

myFun<number>([1, 2, 3])

function myAun<T>(any: Array<T>) {
  //写法2
  return any
}

// T[] === Array<T>

// 解读：myAun调用时指定了泛型T是 string ，myAun行参要求是 泛型T组成的数组。
// 此时any === string[]
myAun<string>(['你好'])

// 此时any === number[]
myAun<number>([1, 2, 3])

/***********************************************  使用多个泛型  **********************************************/
function addMethod<T, P>(first: T, second: P) {
  return `${first}${second}`
}

// 解读：addMethod调用时指定了泛型T是 string 、P是number，addMethod行参first要求是 泛型T、second是泛型P。
// 此时 first:string second:number
addMethod<string, number>('string', 123)

/***********************************************  在类中使用泛型  **********************************************/

class SelectRow1<T> {
  constructor(private select: T[]) {}
  getSelect(index: number): T {
    return this.select[index]
  }
}

const seleterRow1 = new SelectRow1<string>(['猪猪', '蛇蛇', '狗狗'])

seleterRow1.getSelect(1)

/***********************************************  泛型接口  **********************************************/

interface ISelectRow {
  name: string
}

class SelectRow2<T extends ISelectRow> {
  constructor(private select: T[]) {}
  getSelect(index: number): string {
    return this.select[index].name
  }
}

// 这就要求了实例化时传入的 [] 中每一个元素是一个对象，并且必须有name属性

const selectRow2 = new SelectRow2([
  { name: '猪猪' },
  { name: '蛇蛇' },
  { name: '狗狗', age: 19 },
])

/***********************************************  泛型约束  **********************************************/

// 约束了泛型T 只能是  number | string
class SelectRow3<T extends ISelectRow | number | string> {
  constructor(private select: T[]) {}
  getSelect(index: number) {
    if (typeof this.select[index] !== 'number' || 'string') {
      return (this.select[index] as ISelectRow).name
    }
    return this.select[index]
  }
}

const selectRow3 = new SelectRow3<number>([1, 2, 3])
selectRow3.getSelect(1)
