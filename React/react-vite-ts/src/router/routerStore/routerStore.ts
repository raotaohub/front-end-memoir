import { observable, action } from 'mobx'
import * as H from 'history'
import { IMenu, RouteItem } from './types'

export class RouterStore {
  @observable
  routes: RouteItem[] = []

  @observable
  menuList: IMenu[] = []

  history: H.History | undefined

  init = (history: H.History) => {
    this.history = history
  }

  @action
  addMenu = (menu: IMenu) => {
    this.menuList.push(menu)
  }

  @action
  addRoute = (route: RouteItem) => {
    this.routes.push(route)
  }
}
const routerStore = new RouterStore()
export { routerStore }
