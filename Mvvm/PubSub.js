// 发布订阅模式
class PubSub {
  constructor() {
    this.eventBus = new Map()
  }
  on(eventName, callback) {
    const {eventBus} = this
    if (!eventBus.has(eventName)) {
      eventBus.set(eventName, [])
    }
    eventBus.get(eventName).push(callback)
  }

  emit(eventName, args) {
    const {eventBus} = this
    if (!eventBus.has(eventName)) {
      throw new Error('该事件不存在')
    }
    const listeners = eventBus.get(eventName)
    listeners.forEach(event => event(args))
  }

  off(eventName) {
    const {eventBus} = this
    if (eventBus.has(eventName)) {
      eventBus.delete(eventName)
    }
  }
}

const pub = new PubSub()
pub.on('test',function (a){
  console.log(a)
})
pub.emit('test','test,test,test,test,test,test,')



// 题外话 表编程 即策略模式
// {
//   const eventObj = {
//     input: ['callback1', 'callback2', 'callback3'],
//     click: ['callback1', 'callback2', 'callback3']
//   }
//
//   const getEvent = function (type, index) {
//     return eventObj[type][index]
//   }
//
//   console.log(getEvent('click', 1))
//   console.log(getEvent('input', 2))
// }
