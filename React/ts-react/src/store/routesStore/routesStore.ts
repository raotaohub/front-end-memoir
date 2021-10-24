import { RouteConfig } from '@/routes/type'
import { configure, makeAutoObservable, runInAction, when, reaction } from 'mobx'
import { IMenu } from './type'

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

export class RoutesStore {
   menus: IMenu[] = []

   routes: RouteConfig[] = []

   loading: boolean = false
   constructor() {
      // *自动观察所有的数据
      makeAutoObservable(this)
      // *when 监听this.isReady 一次性行为，并触发回调
      when(
         () => this.loading,
         () => this.doSomething()
      )
      // *reaction 监听this.amount ，每次变化都触发回调
      reaction(
         () => this.loading,
         (value, previousValue) => {
            console.log(value === this.loading, previousValue)
         }
      )
   }

   private init() {
      this.routes = []
   }

   private addRoute(name: string, component: React.Component) {
      this.routes.push({})
   }

   private clear() {
      this.routes = []
   }

   private finish() {
      this.loading = true
   }

   doSomething() {
      alert('路由创建完成了')
   }
}

const routesStore = new RoutesStore()

export default routesStore
