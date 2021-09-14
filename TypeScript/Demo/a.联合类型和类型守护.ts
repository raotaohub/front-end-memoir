// 联合类型 变量类型可能是两种以上

// 两种保护 断言方式 in操作符方式 typeof 判断方式 instanceof方式

/**
 * @description:
 * 如果一个值是联合类型，那么我们只能访问它们中共有的部分（共有的属性与方法），
 * 由于只能访问共有，导致我们在想要访问某一个的时候ts会提示报错，这时我们就需要类型保护了
 */
interface IProps1 {
  type: boolean
  skill: () => {}
}

interface IProps2 {
  ability: boolean
  sayHello: () => {}
}

// 1、 断言方式 as
function getMemo(props: IProps1 | IProps2) {
  if ((props as IProps1).type) {
    ;(props as IProps1).skill()
  } else {
    ;(props as IProps2).sayHello()
  }
}

// 2、in操作符方式
function getMemo2(props: IProps1 | IProps2) {
  if ('skill' in props) {
    props.skill()
  } else {
    props.sayHello()
  }
}

// 3、typeof方式
function add(first: string | number, second: string | number) {
  // 判断一下类型
  if (typeof first === 'string' && typeof second === 'string') {
    return `${first}${second}`
  } else if (typeof first === 'number' && typeof second === 'number') {
    return first + second
  }
}

function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

padLeft('Hello world', 4) // returns "    Hello world"
console.log(padLeft('Hello world', 45))
