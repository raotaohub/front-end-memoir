import {observe} from "./Vm"

export default function defineReactive(obj, key, value) {

  // if (arguments.length === 2) {
  //   value = obj[key]
  // }
  value = obj[key]
  let childOb = observe(value)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('get' + '您试图访问' + key)
      return value
    },
    set(newVal) {
      console.log('set' + '您试图访问' + key + '属性', newVal)
      if (newVal === value) {
        return
      }
      value = newVal
      childOb = observe(value)
    }
  })
}
