// 函数中的泛型

// 函数名后用 尖括号 <名字>
function join<T>(a: T, b: T) {
  return `${a}${b}`
}

// 使用的时候 尖括号 <类型>  这样就要求了两个形参都使用泛型T , T为string类型
join<string>('1', '2')

// 数组中的泛型

function myFun<T>(any: T[]) {
  //写法1
  return any
}

myFun<number>([1, 2, 3])

function myAun<T>(any: Array<T>) {
  //写法2
  return any
}

myAun<string>(['你好'])

/***********************************************  使用多个泛型  **********************************************/
function add<T, P>(first: T, second: P) {
  return `${first}${second}`
}
add<string, number>('string', 123)
