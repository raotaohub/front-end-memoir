/*
 * @Author: raotaohub
 * @Date: 2021-05-02 14:32:48
 * @LastEditTime: 2021-10-24 22:27:34
 * @LastEditors: raotaohub
 * @FilePath: \ts-react\src\store\index.ts
 * @Description: mobx 状态管理对象入口文件
 */
import globalStore from './globalStore/globalStore'
import routesStore from './routesStore/routesStore'

const store = {
   globalStore,
   routesStore
}

export default store
