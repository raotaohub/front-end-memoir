import {observe} from "./Vm"

let count = 0
export default function defineReactive(obj, key, value) {

  console.log(count++)

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
