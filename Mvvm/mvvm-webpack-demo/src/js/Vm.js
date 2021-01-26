import Observer from "./Observer"

/**
 * vue Mvvm模式，对于对象嵌套的监视，是通过链式调用，间接递归的手法实现的。
 *    来看看具体实现
 *
 * @observe函数 : 用于对data的每个属性进行观察
 *  -什么时候调用 : 在vm被实例化的时候，以及遍历每一层属性的时候。
 *  -会执行什么  : 会调用 new Observer() , 内部会调用 defineReactive()
 * @defineReactive函数 : 直接实现对data属性进行观察
 *  -什么时候执行 :
 *  -会执行什么 : 内部会调用 observe()
 * */

const obj = {
  a: {
    b: {
      c: 3,
    }
  },
  d: {}
}

observe(obj)
console.log(obj)

console.log(obj.a.b.c)


function observe(value) {
  if (!value || typeof value !== 'object') return;

  let ob

  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

export {observe}



