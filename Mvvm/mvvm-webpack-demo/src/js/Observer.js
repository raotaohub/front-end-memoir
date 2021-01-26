import {def} from "./utils";
import defineReactive from "./defineReactive"

/**
 * Observer类 实例化的同时，会对传入的参数添加 __ob__ 属性。并执行walk(value)
 * @value 传入的参数
 *
 * def函数是对 defineProperty的封装
 * @value 要添加属性的对象    实例化时传入的参数
 * @key   要添加的属性名     ’__ob__‘ 属性名
 * @value 要设置的属性值     this 指向 ob
 * @enumerable 表示不允许枚举
 *
 * */
export default function Observer(value) {

  def(value, '__ob__', this, false)

  this.walk(value)

}
/**
 * walk()方法，会遍历当前对象中所有的属性，并调用 defineReactive()函数，至此形成了间接递归，对data进行层层监听。
 * */
Observer.prototype.walk = function (value) {
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}


