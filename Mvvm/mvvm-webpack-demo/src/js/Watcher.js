import {Dep} from "./Dep";

/**
 * 什么时候会触发 get ？ 当读取对象值的时候 。也就是获得 exp 的值的时候，
 * 在取值之前，将当前 watcher 赋值给Dep.target, 那么触发get的时候, if 语句判断将通过。 dep.depend()执行
 *
 * @vm:Object 实例对象
 * @exp:string | Function 要观察的表达式
 * @cb:Function 当被观察的表达式的【值】变化时的回调函数
 * @getter:Function 是一个获得器函数！
 * @this.value:any 取得表达式的值，这就是触发get的时候！也就是”touch“ 一下，将引发一连串的反应。即在getter中收集依赖。
 * */

/**
 * @uid2 是一个外部变量，用来标识每个 watcher 的id
 * */
let uid2 = 0

function Watcher(vm, exp, cb) {
  this.vm = vm
  this.exp = exp
  this.cb = cb
  this.id = uid2++
  this.depIdsAnddeps = {}
  this.getter = parsePath(this.exp)
  this.value = this.get()
}

Watcher.prototype.update = function () {
  /**
   *  update方法会执行视图发生变化时候的回调 cb
   *  这个方法会真正的触发视图的改变
   * */
  this.cb.call(this)
  console.log('view module updated--视图更新完成--view module updated')
}
/**
 *
 * */
Watcher.prototype.addDep = function (dep) {
  if (!this.depIdsAnddeps.hasOwnProperty(dep.id)) {
    console.log('addDep')
    this.depIdsAnddeps[dep.id] = dep
    dep.addSub(this)
  }
}
Watcher.prototype.get = function () {
  let vm = this.vm
  Dep.target = this
  console.log('被触摸 Dep.target=', Dep.target)
  let value = this.getter.call(this, vm)
  Dep.target = null
  console.log('触摸结束 Dep.target=', Dep.target)
  return value
}

/**
 * @parsePath 返回一个函数
 * @exp : string | Function 如 "obj.a"
 * @obj 传入一个对象，获得 exp 表达式的值
 *
 * **注意** 这里 i 从 1 开始，因为我传入的就是obj本身
 * 简要的写一下该方法，由于exp也可以传入function ，但是这里不考虑这种情况,这是一个高阶函数
 * */
function parsePath(exp) {
  let segments = exp.split('.')
  return function (obj) {
    for (let i = 1; i < segments.length; i++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}

export {Watcher}
