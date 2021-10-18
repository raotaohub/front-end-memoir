import { observable, action, makeAutoObservable } from 'mobx'

// 刷新页面会使mobx重新初始化

class StepFormStore {
  constructor() {
    // *自动观察所有的数据 !一定要执行这步
    makeAutoObservable(this)
  }
  @observable current = 0
  @observable info = {}

  @action setCurrent(current: number) {
    this.current = current
  }
  @action setInfo(info: {}) {
    this.info = info
  }
}

export default new StepFormStore()
