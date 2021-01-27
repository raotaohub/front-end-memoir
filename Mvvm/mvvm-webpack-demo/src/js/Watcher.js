
/**
 * 什么时候会触发 get ？ 当读取对象值的时候 。也就是获得 exp 的值的时候，
 * 在取值之前，将当前 watcher 赋值给Dep.target, 那么触发get的时候, if 语句判断将通过。 dep.depend()执行
 * */
function Watcher(data,exp,cb) {
  this.deps = []
}

Watcher.prototype.update = function () {
  console.log('view update')
}
Watcher.prototype.addDep = function (dep) {

}
Watcher.prototype.getter = function (){

}

console.log()

export {Watcher}
