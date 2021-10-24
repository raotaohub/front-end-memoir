import { RouteConfigComponentProps } from 'react-router-config'

export interface RouteConfig {
   key?: React.Key | undefined
   // location?: Location | undefined
   component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType | undefined
   path?: string | string[] | undefined
   exact?: boolean | undefined
   strict?: boolean | undefined
   routes?: RouteConfig[] | undefined
   render?: ((props: RouteConfigComponentProps<any>) => React.ReactNode) | undefined
   [propName: string]: any
}
