// 理解 Observer 观察者模式的本质

// 1 对多的关系
class Dep {
  constructor() {
    this.objList = []
  }

  addObserver(observer) {
    this.objList.push(observer)
  }

  notify() {
    this.objList.forEach(item => item.update())
  }

}

// Observer 观察者 多对 1 的关系
class Observer {
  constructor(observer) {
    this.observer = observer
  }
  // Observer 观察者拥有 update 方法
  update() {
    console.log(this.observer + '本观察者 通知已接收')
  }
}

// 创建 被观察者
let dep = new Dep()
// 创建 观察者
let observer1 = new Observer('observer1')
let observer2 = new Observer('observer2')

// 添加 观察者
dep.addObserver(observer1)
dep.addObserver(observer2)

// 发布
// 通知
father.notify()

