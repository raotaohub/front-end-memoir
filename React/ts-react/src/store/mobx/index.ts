/*
 * @Author: raotaohub
 * @Date: 2021-05-02 14:32:48
 * @LastEditTime: 2021-05-02 14:55:48
 * @LastEditors: raotaohub
 * @FilePath: \react_admin_client_ts\src\store\mobx\index.ts
 * @Description: mobx 状态管理对象入口文件
 */
import TestStore from './testStore';
import stepFormStore from './stepStore';

const store = {
  TestStore,
  stepFormStore,
};

export default store;
