function Promise(executor) {
  /**
   * Promise的初始状态为 ‘pending’
   * 改变状态只有三种方式;
   * 1.resolve()、 2.reject()、 3.throw;
   * */
  const state = {
    PENDING: 'pending',
    FULFILL: 'fulfill',
    REJECTED: 'rejected',
  }
  this.PromiseState = state.PENDING
  this.PromiseReason = null
  const self = this;
  this.state = state
  /**
   * callbacks [{onResolved:onResolved,onRejected: onRejected}{...}...]
   *  当状态为 'fulfill' 时调用里面所有的成功回调 反之调用失败回调
   * */
  this.callbacks = []

  // 处理成功
  function resolve(data) {
    /**
     * 状态只允许改变一次;
     *  并且只能从 'pending' 状态改变到 'fulfill'
     *     或者从 'pending' 状态改变到 'rejected' 。
     */
    if (self.PromiseState === state.PENDING) {

      self.PromiseState = state.FULFILL // 1. 改变状态 ;
      self.PromiseReason = data         // 2. 设置结果值
      self.callbacks.forEach(cb => {    // 3. 执行回调
        cb.onResolved(data)
      })
    }
  }

  // 处理失败
  function reject(data) {
    if (self.PromiseState === state.PENDING) {
      self.PromiseState = state.REJECTED
      self.PromiseReason = data
      self.callbacks.forEach(cb => {
        cb.onRejected(data)
      })
    }
  }

  // 处理异常
  try {
    // 执行 执行器函数
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
/**
 *  一、then 方法接收两个函数作为参数
 *    1. 成功的回调  onResolved
 *    2. 失败的回调  onRejected
 *
 *  二、调用哪个回调？
 *    1. 判断当前的 PromiseState
 *
 *  三、回调什么时候执行？
 *    1. 状态改变的时候才执行 => 状态改变依靠 1.resolve()、 2.reject()、 3.throw;
 *
 *  四、then 方法返回的也是一个Promise对象它的状态 由什么决定？
 *   答: 2种情况,判断返回的结果值
 *      1. 回调函数返回的是 Promise
 *          调用返回值的 then 方法
 *      2. 回调函数返回的非 Promise
 *          调用对应状态的回调函数
 *  五、异常处理
 *      利用try/catch 捕获异常 并且在catch中调用 reject 来抛出错误改变Promise状态
 *
 */
Promise.prototype.then = function then(onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    // 状态为成功时 内部有可能又是一个Promise，该Promise的结果 决定了返回的Promise对象的状态
    if (this.PromiseState === 'fulfill') {
      try {
        let result = onResolved(this.PromiseReason) // 这个返回值是实例上的返回值
        if (result instanceof Promise) {
          result.then(
            r => {
              resolve(r)
            }, e => {
              reject(e)
            })
        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    // 状态为失败时
    if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseReason)
    }
    // 状态为不确定时也有两种情况同 fulfill
    if (this.PromiseState === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          /**
           * 使用 try/catch 语句包裹所有代码 来捕获期间的异常，
           * 若有异常就调用 reject()方法
           * */
          try {
            const result = onResolved(self.PromiseReason) // 这个返回值是实例上的返回值
            if (result instanceof Promise) {
              result.then(r => {
                resolve(r)
              }, e => {
                reject(e)
              })
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
            console.log('onResolved 捕获异常')
          }
        },
        onRejected: function () {
          try {
            const result = onRejected(self.PromiseReason)
            if (result instanceof Promise) {
              result.then(r => {
                resolve(r)
              }, e => {
                reject(e)
              })
            } else {
              resolve(result)
            }
          } catch (e) {
            reject(e)
            console.log('onRejected 捕获异常')
          }
        }
      })
    }
  })
}

