import { configure, makeAutoObservable, runInAction, when, reaction } from 'mobx'

function getAsyncData() {
   return {
      status: 200,
      message: '我是数据♥'
   }
}

// 全局mobx配置
configure({
   enforceActions: 'always', // 始终需要通过 action 来改变状态
   computedRequiresReaction: true // 禁止从动作或反应外部直接访问任何未观察到的计算值
})

export class GlobalStore {
   isReady = false // !observable state
   amount = 1 // !observable state
   data = {} // !observable state
   constructor() {
      // *自动观察所有的数据
      makeAutoObservable(this)
      // *when 监听this.isReady 一次性行为，并触发回调
      when(
         () => this.isReady,
         () => this.doSomething()
      )
      // *reaction 监听this.amount ，每次变化都触发回调
      reaction(
         () => this.amount,
         (value, previousValue) => {
            console.log(value === this.amount, previousValue)
         }
      )
   }

   // !计算属性
   get price() {
      return `$${this.amount * 100}`
   }

   // !活动
   increment() {
      this.amount++
   }

   // !活动
   decrement() {
      this.amount--
   }

   doSomething() {
      alert('随便做点什么把')
   }

   // !async action，
   async asyncAction() {
      try {
         const data = await getAsyncData()
         // !异步action中，改变状态时，外层要包裹 runInAction(() => {/** ...*/})
         runInAction(() => {
            this.data = data
            this.isReady = true
         })
      } catch (e) {
         throw new Error(e as any)
      }
   }
}

const globalStore = new GlobalStore()

export default globalStore
