class EventEmitter {
    constructor() {
        this._events = {};
    }

    on(name, listener) {
        if (typeof listener !== "function") {
            throw console.log("listener must be a function");
        }
        const events = this._events;
        if (!events[name]) {
            events[name] = [];
        }
        events[name].push(listener);

        return this;

    }

    emit(name, ...args) {
        const listeners = this._events[name];

        if (!listeners || !listeners.length) return console.log("监听列表不存在");

        listeners.forEach(fn => fn.apply(this, args));

        return this;

    }

    remove(name, listener) {
        const listeners = this._events[name];
        if (!listeners || !listeners.length) return console.log("监听列表不存在");

        let index;

        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i] === listener) {
                listeners.splice(i, 1);
                break;
            }
        }

        return this;

    }
}
