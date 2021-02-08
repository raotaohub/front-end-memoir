import {observe,dependArray} from "./Vm"
import {Dep} from "./Dep"

/**
 * defineReactive()函数是直接对数据进行监听的方法
 * @obj   要设置属性的对象
 * @key   要设置的属性名
 * @value 要设置的属性值
 *
 * 调用observe()就会对该值进行层层监听
 * childOb = observe(value) 可以保证就算给属性赋值为对象一样可以监听
 * */

console.log('没有被触摸Dep.target =', Dep.target)

export default function defineReactive(obj, key, value) {
  let childOb = observe(value)
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(Dep.target)
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if(Array.isArray(value)){
            dependArray(value)
          }
        }
      }
      console.log('访问数据触发get' + '您试图访问' + key + '属性', value)
      return value
    },
    set(newVal) {
      if (newVal === value) {
        return
      }
      console.log('修改数据触发set' + '您试图修改' + key + '属性', newVal)
      value = newVal
      childOb = observe(value)
      dep.notify()
    }
  })
}


