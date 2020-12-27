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
   *  callbacks [{onResolved:onResolved,onRejected: onRejected},{...}...]
   *  当状态为 改变时 通过遍历的方式调用所有对应的 回调函数
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
      self.PromiseState = state.FULFILL // 1. 改变状态
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
    // 执行 传入的执行器函数 => 内部逻辑由用户决定调用 resolve 还是 reject
    executor(resolve, reject)
  } catch (e) {
    // 发生异常 则try/catch捕获 并调用 reject()
    reject(e)
  }
}
/** Promise静态方法
 *  Promise.resolve() 返回的是一个 Promise 对象
 *    返回的 Promise 对象的状态 通过判断传入值的类型来判断
 *      1. 是Promise对象 由该Promise传入的状态决定
 *      2. 非Promise对象 则状态为 'fulfill'
 * */
Promise.resolve = function resolve(value) {
  return new Promise((resolve, reject) => {
    try {
      if (value instanceof Promise) {
        value.then(r => {
          resolve(r)
        }, e => {
          reject(e)
        })
      } else {
        resolve(value)
      }
    } catch (e) {
      reject(e)
    }
  })
}

/** Promise静态方法
 *  Promise.reject() 返回的是一个 Promise 对象
 *    其状态永远为 ‘rejected’
 * */
Promise.reject = function reject(value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

/**
 * 思路是遍历数组中全部的 Promise 对象 ； 只要有一个失败则Promise为失败，若全部成功才为成功
 *  调用then方法，1. 在成功的回调函数内一一对应保存成功的值，自增计数器
 *              2. 判断计数器的值是否和数组的长度相等，若相等则表示全部遍历完成且都为成功，调用 resolve() 并传入数组
 *              3. 在失败的回调函数内 直接调用 reject(e) 并传入失败的值
 * */
Promise.all = function all(promises) {
  let result = []
  let count = 0
  let length = promises.length
  return new Promise((resolve, reject) => {
    for (let i = 0; i < length; i++) {
      promises[i].then(r => {
        count++
        result[i] = r   // 使用push 可能会在调用异步任务时导致无序
        if (count === length) {
          resolve(result)
        }
      }, e => {
        reject(e)
      })
    }
  })
}

/**
 *  思路：哪个Promise先改变结果,返回的 Promise 的状态和值就由它决定
 *    1. 使用 for of 挨个调用 then 方法
 *    2. 该方法要求被遍历的对象拥有 Symbol.iterator 属性
 *    3. 因此使用 try/catch 捕获异常并抛出
 * */

Promise.race = function race(promises) {
  return new Promise((resolve, reject) => {
    let flag = false
    try {
      for (const p of promises) {
        p.then(r => {
          resolve(r)
          flag = true
        }, e => {
          reject(e)
          flag = true
        })
        if (flag) break
      }
    } catch (e) {
      console.warn(e)
      reject(e)
    }
  })
}
/**
 *  一、then 实例对象 方法接收两个函数作为参数
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
 *   答: 由2种情况,需要先判断返回的值的类型
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
  /**
   * 如果没有传递 成功或失败 的回调函数; 应该设置一个默认值
   * */
  if (typeof onResolved !== 'function') {
    onResolved = defaultOnResolve => {
      return defaultOnResolve
    }
  }
  if (typeof onRejected !== 'function') {
    onResolved = defaultOnReject => {
      throw defaultOnReject
    }
  }
  return new Promise((resolve, reject) => {
    /**
     *  四、五、
     */
    function callback(type) {
      // let timer = setTimeout(() => {
      try {
        let result = type(self.PromiseReason) // 这个返回值是实例上的返回值
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
        // clearTimeout(timer)
      } catch (e) {
        reject(e)
        console.log('try/catch 捕获到异常')
        // clearTimeout(timer)
      }
      // }, 0)
    }

    // 状态为成功时 内部有可能又是一个Promise，该Promise的结果 决定了返回的Promise对象的状态
    if (this.PromiseState === 'fulfill') {
      callback(onResolved)
    }

    // 状态为失败时
    if (this.PromiseState === 'rejected') {
      callback(onRejected)
    }

    // 状态为不确定时也有两种情况同 fulfill ;将回调函数保存在一个数组中;并在状态改变时依次执行回调
    if (this.PromiseState === 'pending') {
      this.callbacks.push({
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

/**
 *  catch 具备异常穿透的能力
 *   也就是可以在最后一个catch调用 统一处理异常
 *                                  1. 传递了处理失败的回调 在then方法中保存处理失败的回调
 *   实现原理是依然是保存失败的回调函数,有两种情况;
 *                                  2. 没有传递 在then方法中设置默认值
 *
 * */
Promise.prototype.catch = function _catch(onRejected) {
  return this.then(undefined, onRejected)
}
