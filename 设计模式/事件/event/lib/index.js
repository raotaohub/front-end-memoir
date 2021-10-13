;(function (exports) {
    function isValidListener(listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    function indexOfListener(listeners, listener) {
        let i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    class EventEmitter {
        constructor() {
            /*
                _events = {
                    "event1": [f1,f2,f3],
                    "event2": [f4,f5],
                }
            */
            this._events = {}
        }

        getListeners() {
            return this._events || (this._events = {});
        }
        // 注册一个监听
        on(name, cb) {
            // 回调必须是个函数
            if (!isValidListener(cb)) {
                throw console.log('listen callback must be a function')
            }
            // 获得事件总线对象
            const listeners = this.getListeners()

            const listenerIsWrapped = typeof cb === 'object'
            // 看看是否有该事件
            if (!listeners.hasOwnProperty(name)) {
                listeners[name] = [] // 如果没有则为添加事件到事件总线对象
            }
            // 将回调存入该事件的任务队列中
            listeners[name].push(listenerIsWrapped ? cb : {
                listener: cb,
                once: false
            })
            return this
        }
        // 触发一个事件
        emit(name, ...args) {
            // 获得事件总线对象
            const listeners = this.getListeners()
            // 看看是否有该事件
            if (listeners.hasOwnProperty(name)) {
                // 取出这个事件的任务队列并执行里面的子任务
                listeners[name].forEach((cb) => {

                    cb.listener && cb.listener.apply(this, args)
                    // 如果这个事件是1次性的那么执行后注销
                    if (cb.once === true) {
                        this.remove(name, cb.listener)
                    }

                })
            }
            return this
        }

        once(name, cb) {
            return this.on(name, {
                listener: cb, once: true
            })
        }
        // 移除1个事件
        remove(name, cb) {
            // 获得事件总线对象
            const listeners = this.getListeners()
            let index;
            // 看看是否有该事件
            if (listeners.hasOwnProperty(name)) {
                // 在该事件的任务队列中查找这个回调，如果有的话就删除
                index = indexOfListener(listeners[name], cb)
                if (index !== -1) {
                    listeners[name].splice(index, 1);
                }
            }
            return this
        }

        removeAll(name) {
            const listeners = this.getListeners()
            if (name) {
                listeners[name] = []
            } else {
                this._events = {}
            }
        }
    }

// Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = EventEmitter;
    } else {
        exports.EventEmitter = EventEmitter;
    }

}(typeof window !== 'undefined' ? window : this || {}));
