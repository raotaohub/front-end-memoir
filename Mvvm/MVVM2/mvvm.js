class Mvvm {
  constructor(options) {
    this.$options = options
    var data = this.$data = this.$options.data
    var me = this
    observe(data)
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        Object.defineProperty(me, key, {
          enumerable: true,
          configurable: true,
          get() {
            return me.$data[key]
          },
          set(newVal) {
            if (data[key] === newVal) {
              return
            }
            me.$data[key] = newVal
          }
        })
      }
    }
  }

}
function Observe(data) {
  for (let key in data) {
    let val = data[key]
    observe(val)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        observe(val)
      }
    })
  }
}

function observe(data) {
  if (typeof data !== 'object') return
  return new Observe(data)
}

function Compile(el,vm) {

}
