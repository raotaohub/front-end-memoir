import { RouteConfig } from './type'

interface IRoute {
   path: string
   exact: boolean
   component: React.ComponentType<any>
}

interface IOption {
   isMenu?: boolean
   icon?: string
   key?: string
   exact?: IRoute['exact']
   component?: React.ComponentType<any>
   [propName: string]: any
}

interface IMenu {
   path: string
   title: string
   iconName?: string
   show?: boolean
   subMenu?: IMenu[]
}

let success = false
export const routes: RouteConfig[] = []
export const menus: IMenu[] = []

function RouteFactory(path: string, option: IOption) {
   const router = routes.find(r => r.path === path)

   if (router?.path === path) throw new Error('重复的 path')

   let config: RouteConfig, menu: IMenu

   config = {
      path: `/${path}`,
      exact: option?.option || false,
      component: option.component,
      render: option?.render,
      routes: []
   }

   menu = {
      path: `/${path}`,
      title: option?.title,
      show: option?.show,
      iconName: option?.iconName,
      subMenu: []
   }

   routes.push(config)

   menus.push(menu)

   const createRoute = (_path: string, option: IOption) => {
      config?.routes?.push({
         path: `/${path}/${_path}`,
         exact: option?.exact ?? true,
         component: option?.component,
         render: option?.render
      })
      menu?.subMenu?.push({
         path: `/${path}/${_path}`,
         title: option?.title,
         show: option?.show,
         iconName: option?.iconName
      })
      console.log(config, menu)
   }

   return {
      config,
      createRoute
   }
}

export const createGroup = (path: string, option: IOption) => {
   return RouteFactory(path, option)
}

export const resetRoutes = () => {
   routes.length = 0
}

export const getRoutes = () => {
   return routes
}

export const getMenus = () => {
   return menus
}
// export interface RouteConfig {
//     key?: React.Key | undefined;
//     location?: Location | undefined;
//     component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType | undefined;
//     path?: string | string[] | undefined;
//     exact?: boolean | undefined;
//     strict?: boolean | undefined;
//     routes?: RouteConfig[] | undefined;
//     render?: ((props: RouteConfigComponentProps<any>) => React.ReactNode) | undefined;
//     [propName: string]: any;
// }
