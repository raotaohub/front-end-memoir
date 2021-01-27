import Observer from "./Observer"
import Watcher from "./Watcher"
/**
 * vue Mvvm模式，对于对象嵌套的监视，是通过链式调用，间接递归的手法实现的。
 *    来看看具体实现
 *
 * @observe函数: 用于对data的每个属性进行观察
 *  -什么时候调用: 在vm被实例化的时候，以及遍历每一层属性的时候。
 *  -会执行什么: 执行new Observer() 并给当前data添加__ob__
 * @Observer类: 内部判断当前传入的data是对象还是数组并分别调用 walk()和observeArray()
 * @defineReactive函数 : 直接实现对 对象属性的监听
 *  -什么时候执行: 调用walk()
 *  -会执行什么: 为每个属性调用 observe()
 * @obseerveArray函数:
 *  -什么时候执行 : 调用observeArray()
 *  -会执行什么: 为每个元素调用observe()
 * */

const obj = {
  a: {
    b: {
      c: 3,
    }
  },
  d: [33, 44, 55]
}

observe(obj)
console.log(obj)

/**
 * Vm实例化的时候，就调用 observe(data)函数
 * 接下来 会对 data 添加__ob__属性
 *
 * @value 传入的数据
 * @ob 用于存储 Observer实例
 * @return ob 属性身上的__ob__
 * */
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

export {observe, obj}



