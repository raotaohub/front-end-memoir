import {def} from "./utils"

/**
 * 将 Vm data中的数组强制指定数组的原型对象属性 setPrototypeOf(),并写7个同名方法 实现拦截数组
 * */
const arrayPrototype = Array.prototype
const arrayMethods = Object.create(arrayPrototype)
const arrayChanges = [
  'push',     // 在尾部插入 1 个或多个参数，并返回新 length
  'pop',      // 删除最后一个元素，并返回这个元素
  'shift',    // 删除第一个元素，并返回这个元素
  'unshift',  // 在头部插入 1 个或多个参数，并返回新 length
  'splice',   // 在任意的位置给数组添加或删除任意个元素。
  'sort',     // 接收一个函数
  'reverse'   // 反转数组
]
arrayChanges.forEach(methodName => {
  /**
   * @original 遍历7个方法名，缓存原始数组的方法
   * */
  const original = arrayPrototype[methodName]
  /**
   * 在拦截器上定义7个同名方法，当用户调用这7个方法的时候，会顺着原型链往上摸索，就会读到这里的同名方法
   * */
  def(arrayMethods, methodName, function () {

    const ob = this.__ob__

    let inserted = null

    switch (methodName) {
      case 'push':
      case  'unshift':
        inserted = [...arguments]
        break;
      case 'splice' :
        inserted = [...arguments].slice(2)
        break;
    }
    if (inserted) {
      ob.observeArray(inserted)
    }
    ob.dep.notify()

    /**
     * @original 最用依然用数组原始方法执行用户操作
     * @this  :调用方法的数组
     * @arguments :开发者传入的参数
     * @return :某些数组方法是具有返回值的
     * */

    return original.apply(this, arguments)

  }, false)
})

export {arrayMethods}
