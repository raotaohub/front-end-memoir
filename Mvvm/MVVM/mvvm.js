class Mvvm {
  constructor(options) {
    const self = this
    this.$options = options
    this.$data = this.$options.data
    this.$el = document.querySelector(this.$options.el)

    // 劫持
    Object.keys(this.$data).forEach((key) => {
      this._Proxy(key)
    })
    // 解析
    this._compile()
  }
  $watch() {}
  _Proxy(key) {
    const that = this
    Object.defineProperty(that , key , {
      configurable: false ,
      writable: true ,
      get() {
        return that.$data[key]
      } ,
      set(newVal) {
        that.$data[key] = newVal
      }
    })
  }
  _compile() {}
}
