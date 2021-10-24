import { RoutesStore as RoutesStoreModel } from './routesStore'

export as namespace IRoutesStore

export type RoutesStore = RoutesStoreModel

export enum ICONNAME {
   Trashbin = 'trashbin',
   Fold = 'fold',
   Set = 'set',
   Copy = 'copy'
}

export interface IMenu {
   /**
    * 唯一标记
    */
   name: string
   /**
    * 菜单标题
    */
   title: string
   /**
    * 菜单图标
    */
   iconName?: ICONNAME
   /**
    * 子菜单
    */
   children?: ISubMenu[]
   /**
    * 是否显示
    */
   show: boolean
}

export interface ISubMenu {
   /**
    * 唯一标记
    */
   name: string
   /**
    * 匹配路径
    */
   path?: string
   /**
    * 匹配别名
    */
   alias?: string[]
   /**
    * 子菜单标题
    */
   title: string
   /**
    * 是否显示
    */
   show: boolean
}
