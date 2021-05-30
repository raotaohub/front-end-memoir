/**************************************  用接口的形式 改写一下下面这段代码  **************************************/
// function printLabel(labelledObj: { label: string }) {
//   console.log(labelledObj.label);
// }

// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);

// 声明一个接口
interface LabelledValue {
  label: string
}

// 要求参数对象有一个 属性 label 且为 string类型
function printLabel(labeledObj: LabelledValue) {
  console.log(labeledObj.label)
}

let myObj = { size: 10, label: "饶韬 size 10 Object" }

printLabel(myObj)

/**************************************              可选属性              **************************************/

interface SquareConfig {
  color?: string;  // ? 表示这个属性是可选的
  width?: number;  // ? 表示这个属性是可选的
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black", width: 99 });
console.log(mySquare) // { color: 'black', area: 100 }

/**************************************              接口也可以描述函数类型              **************************************/

/*
  1.  函数的参数名不需要与接口里定义的名字相匹配
  2.  函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的
 */

interface SearchFunc {
  (source: string, subString: string): boolean; //定义了一个函数类型的接口 要求返回值是 boolean类型
}
let mySearch: SearchFunc
mySearch = function (src: string, sub: string) {
  let result = src.search(sub)
  return result > -1
}

/**************************************              可索引的类型             **************************************/
// TypeScript支持两种索引签名：字符串 和  数字。

interface StringArry {
  [propname: string]: any //  索引任意 字符串类型的属性名 和任意的属性值
  [index: number]: string //  索引任意 数字类型的属性名   和字符串类型的属性值  但是数字索引的返回值必须是字符串
}

/**************************************              类类型             **************************************/

interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}
//  实现一个类 implements 关键字
class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
// 类静态部分与实例部分的区别
interface ClockConstructor {
  new(hour: number, minute: number);
}

class aClock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}










































































































































export { }