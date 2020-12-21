class HD {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.status = HD.PENDING
    this.value = null;
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    // 仅有当前状态为准备中时 才可修改
    if (this.status == HD.PENDING) {
      this.status = HD.FULFILLED
      this.value = value
    }
  }
  reject(reason) {
    if (this.status == HD.PENDING) {
      this.status = HD.REJECTED
      this.value = reason
    }
  }
  // then中两个 参数 是可以不传的，想用成功或失败的哪个就用哪个
  then(onFulfilled, onRejected) {
    // 如果没有穿
    if (typeof onFulfilled != 'function') {
      onFulfilled = () => { }
    }
    if (typeof onRejected != 'function') {
      onRejected = () => { }
    }

    if (this.status == HD.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status == HD.REJECTED) {
      onRejected(this.value)
    }
  }
}