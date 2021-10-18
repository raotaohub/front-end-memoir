function Promise(fn) {
  const self = this
  const PENDING = 'pending',
      FULFILLED = 'fulfilled',
      REJECTED = 'rejected'

  this.PromiseState = PENDING
  this.PromiseReason = null

  this.callbacks = []

  function resolve(value) {
    if (self.PromiseState === PENDING) {
      self.PromiseState = FULFILLED
      self.PromiseReason = value
      self.callbacks.forEach(cb => cb.onResolved(value))
    }
  }

  function reject(value) {
    if (self.PromiseState === PENDING) {
      self.PromiseState = REJECTED
      self.PromiseReason = value
      self.callbacks.forEach(cb => cb.onRejected(value))
    }
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    try {
      if (value instanceof Promise) {
        value.then(
            res => {
              resolve(res)
            },
            err => {
              reject(err)
            }
        )
      } else {
        resolve(value)
      }
    } catch (e) {
      reject(e)
    }
  })
}

Promise.reject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.all = function (iterable) {
  return new Promise((resolve, reject) => {
    let length = iterable.length
    let count = 0
    let result = []
    for (let i = 0; i < length; i++) {
      iterable[i].then(
          v => {
            result[i] = v
            count++
            if (count === length) {
              resolve(result)
            }
          },
          e => {
            reject(e)
          }
      )
    }
  })
}

Promise.race = function (iterable) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < iterable.length; i++) {
      iterable[i].then(v => {
            resolve(v)
          },
          e => {
            reject(e)
          }
      )
    }
  })
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  // onResolved = typeof onResolved === 'function' ? onResolved : value => {return value}
  // onRejected = typeof onRejected === 'function' ? onRejected : value => {throw value}
  if (typeof onResolved !== 'function') {
    onResolved = function (value) {
      return value
    }
  }
  if (typeof onRejected !== 'function') {
    onRejected = function (reason) {
      throw reason
    }
  }
  return new Promise((resolve, reject) => {

    function callback(type) {
      let timer = setTimeout(() => {
        try {
          const result = type(self.PromiseReason)
          if (result instanceof Promise) {
            result.then(
                res => {
                  resolve(res)
                },
                err => {
                  reject(err)
                })
          } else {
            resolve(result)
          }
          clearTimeout(timer)
        } catch (err) {
          reject(err)
          clearTimeout(timer)
        }
      })
    }
    if (self.PromiseState === 'fulfilled') {
      callback(onResolved)
    }

    if (self.PromiseState === 'rejected') {
      callback(onRejected)
    }

    if (self.PromiseState === 'pending') {
      self.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })

}

// 接收的是一个 函数类型的参数
Promise.prototype.catch = function (onRejected) {
  // onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
  return this.then(undefined, onRejected)

}


var foo;
foo(); // 1
function foo() {
    console.log(1);
}
foo = function () {
    console.log(2);
};