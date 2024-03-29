// 目标/发布者
class SubJect {
    constructor() {
        this.objList = [];
    }
    addObserver(observer) {
        this.objList.push(observer);
    }
    notify(newVal) {
        this.objList.forEach(observer => observer.update(newVal));
    }
}
//  Observer 观察者/订阅者;
//  观察谁？ 观察传入的属性;
//  观察者拥有一个更新方法;
class Observer {
    constructor(el) {
        this.el = el;
    }
    update(newVal) {
        if (this.el.tagName === "INPUT") {
            if (this.el.value !== newVal) {
                this.el.value = newVal;
            }
        } else {
            if (this.el.innerHTML !== newVal) {
                this.el.innerHTML = newVal;
            }
        }
    }
}

class Mvvm {
    constructor(options) {
        const that = this;
        this.$options = options;
        this.$el = document.querySelector(this.$options.el);
        this.$data = this.$options.data;
        this.subObj = {};
        this.proxy();
        this.compile();
    }
//  Proxy 数据代理与劫持
    proxy() {
        for (let key in this.$data) {
            // 每个数据都是观察的目标
            this.subObj[key] = new SubJect();

            Object.defineProperty(this, key, {
                get() {
                    return this.$data[key];
                },
                // 在数据变动时发布消息给订阅者，触发相应的监听回调
                set(newVal) {
                    this.$data[key] = newVal;
                    //  变动则通知
                    this.subObj[key].notify(newVal);
                }
            });
        }
    }
//  Compile 编译模板
    compile() {
        let eleList = this.$el.children;
        let reg = /\{\{(.*)\}\}/;
        for (let i = 0; i < eleList.length; i++) {
            if (eleList[i].tagName === "INPUT") {
                // 获取 v-model的属性值
                let key = eleList[i].getAttribute("v-model");
                eleList[i].value = this[key];
                let observer = new Observer(eleList[i]);
                this.subObj[key].addObserver(observer);
                let that = this;
                eleList[i].oninput = function() {
                    that.subObj[key].notify(this.value);
                };
            } else {
                let key = reg.exec(eleList[i].innerHTML)[1];
                eleList[i].innerHTML = this[key];
                let observer = new Observer(eleList[i]);
                this.subObj[key].addObserver(observer);
            }
        }
    }
}
