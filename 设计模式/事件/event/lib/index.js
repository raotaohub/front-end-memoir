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
                listeners = {
                    "event1": [f1,f2,f3],
                    "event2": [f4,f5],
                }
            */
            this._events = {}
        }

        getListeners() {
            return this._events || (this._events = {});
        }

        on(name, cb) {

            if (!isValidListener(cb)) {
                throw console.log('listen callback must be a function')
            }

            const listeners = this.getListeners()

            const listenerIsWrapped = typeof cb === 'object'

            if (!listeners.hasOwnProperty(name)) {
                listeners[name] = []
            }

            listeners[name].push(listenerIsWrapped ? cb : {
                listener: cb,
                once: false
            })
            return this
        }

        emit(name, ...args) {
            const listeners = this.getListeners()
            if (listeners.hasOwnProperty(name)) {
                listeners[name].forEach((cb) => {

                    cb.listener && cb.listener.apply(this, args)

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

        remove(name, cb) {
            const listeners = this.getListeners()
            let index;
            if (listeners.hasOwnProperty(name)) {
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
