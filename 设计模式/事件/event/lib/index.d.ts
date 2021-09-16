declare class EventEmitter extends Wolfy87EventEmitter.EventEmitter {
}

export = EventEmitter;
export as namespace EventEmitter;

declare namespace Wolfy87EventEmitter {
    export class EventEmitter {
        /*事件总线对象*/
        private _events: { [key: string]: Function[] };

        getListeners(): { [key: string]: Function[] }

        on(name: string, listener: Function | { listeners: Function, once: boolean }): {};

        emit(event: string, ...args: any[]): EventEmitter;

        once(name: string, listeners: Function): EventEmitter;

        remove(name: string, listeners: Function): EventEmitter;

        removeAll(name?: string): EventEmitter;
    }
}

