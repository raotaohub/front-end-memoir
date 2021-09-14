/*
 * @Author: raotaohub
 * @Date: 2021-01-27 17:43:33
 * @LastEditTime: 2021-02-23 23:23:43
 * @LastEditors: raotaohub
 * @FilePath: \mvvm-webpack-demo\src\js\Dep.js
 * @Description: Edit......
 */
let uid = 0;
/**
 * Dep.target 全局的一个标记，在Vue中一次只能处理一个 watcher
 * 每次使用的时候 让Dep.target = watcher , 用完了再指向 null
 * */
Dep.target = null;
/**
 * @this.id   每个Dep实例身上都有一个 id 用于标记自身
 * @this.subs 每个Dep实例身上都有一个 subs 数组用于存放 watcher
 * */
function Dep() {
    this.id = uid++;
    this.subs = [];
}
/**
 * addSub 将 watcher 添加到 dep 中；
 * 由 Dep 的实例调用
 * @sub Watcher的实例
 * */
Dep.prototype.addSub = function(sub) {
    console.log("addSub");
    this.subs.push(sub);
};

Dep.prototype.depend = function() {
    console.log("在getter中收集依赖,depend");
    Dep.target.addDep(this);
};

Dep.prototype.notify = function() {
    console.log("notify");
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
        subs[i].update();
    }
};

export { Dep };
