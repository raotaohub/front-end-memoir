let uid = 0
/**
 * Dep.target 全局的一个标记，在Vue中一次只能处理一个 watcher
 * 每次使用的时候 让Dep.target = watcher , 用完了再指向 null
 * */
Dep.target = null
/**
 * @this.id 每个Dep实例身上都有一个 id 用于标记自身
 * @this.subs 每个Dep实例身上都有一个 subs 数组用于存放 watcher
 * */
function Dep() {
  console.log('Dep')
  this.id = uid++
  this.subs = []
}
/**
 * addSub 将 watcher 添加到 dep 中；
 * 由 Dep 的实例调用
 * @sub Watcher的实例
 * */
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}

Dep.prototype.depend = function () {
  // Dep.target.addDep(this)
}

Dep.prototype.notify = function () {
  const subs = this.subs.slice()
  for (let i = 0, l = subs.length; i < l; i++) {
    subs[i].update()
  }
}

export {Dep}
