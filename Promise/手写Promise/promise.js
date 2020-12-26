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
 *  then 方法接收两个函数作为参数
 *    1. 成功的回调
 *    2. 失败的回调
 *  判断当前状态来决定调用哪个回调
 *  回调什么时候执行？
 *    状态改变的时候才执行 => 状态改变依靠 1.resolve()、 2.reject()、 3.throw;
 */
Promise.prototype.then = function then(onResolved, onRejected) {

  if (this.PromiseState === this.state.FULFILL) {
    onResolved(this.PromiseReason)
  }
  if (this.PromiseState === this.state.REJECTED) {
    onRejected(this.PromiseReason)
  }
  if (this.PromiseState === this.state.PENDING) {
    this.callbacks.push({
      onResolved: onResolved,
      onRejected: onRejected
    })
  }
}

