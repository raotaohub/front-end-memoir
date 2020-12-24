function Mvvm(options) {
  this.$options = options; // 先将用户定义的配置保存到 vm
  this._data = this.$options.data // 保存 data 到 vm
  var data = this._data // 用一个内部变量保存 data
  var me = this // 保存 vm

  // 遍历 data 中所有的属性
  Object.keys(data).forEach((key) => {
    this._proxy(key)  // 对指定的属性实现 代理
  })
  // 创建编译解析对象
  this.$compile = new Compile(this.$options.el, me)

}
Mvvm.prototype = {

  $watch() {
  },
  _proxy(key) {
    var me = this
    // 给 vm 添加指定的属性并且每个属性都包含 getter/setter
    Object.defineProperty(me, key, {
      configurable: false,
      enumerable: true,
      get() {
        return me._data[key]   // vm.key    时 代理读
      },
      set(newVal) {
        me._data[key] = newVal // vm.key=xx 时 代理写
      }
    })
  },

}
