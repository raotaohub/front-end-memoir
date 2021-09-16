/**
 * Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
 * License: MIT - http://mrgnrdrck.mit-license.org
 *
 * https://github.com/mroderick/PubSubJS
 */

(function (root, factory) {
    'use strict';

    var PubSub = {};
    root.PubSub = PubSub;
    factory(PubSub);
    // CommonJS and Node.js module support
    if (typeof exports === 'object') {
        if (module !== undefined && module.exports) {
            exports = module.exports = PubSub; // Node.js specific `module.exports`
        }
        exports.PubSub = PubSub; // CommonJS module 1.1.1 spec
        module.exports = exports = PubSub; // CommonJS
    }
        // AMD support
    /* eslint-disable no-undef */
    else if (typeof define === 'function' && define.amd) {
        define(function () { return PubSub; });
        /* eslint-enable no-undef */
    }

}((typeof window === 'object' && window) || this, function (PubSub) {
    /**
     * {
     * message1:{uid01:Function,uid02:Function}
     * message2:{uid01:Function,uid02:Function}
     * message3:{uid01:Function,uid02:Function}
     * message4,
     * message5,
     * ...
     * }
     * **/
    let messages = {},
        lastUid = -1,
        ALL_SUBSCRIBING_MSG = '*';

    /**  **/
    PubSub.subscribe = function (message, callback) {
        /** 确保第 2 个参数是一个函数 **/
        if (typeof callback !== 'function') throw console.log('callback must be a function')

        message = (typeof message === 'symbol') ? message.toString() : message

        if (!Object.prototype.hasOwnProperty.call(messages, message)) {
            messages[message] = []
        }

        const token = 'uid' + String(++lastUid)

        messages[message][token] = callback

        return token
    }

    function hasKeys(obj) {
        let key;

        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                return true;
            }
        }
        return false;
    }

    function hasDirectSubscribersFor(message) {
        let topic = String(message),
            found =
                /** 1.确保 messages 总线中有该 订阅 **/
                Boolean(Object.prototype.hasOwnProperty.call(messages, topic)
                    && /** 2. 确保订阅中有对应的 回调 **/
                    hasKeys(messages[topic]))

        return found;
    }

    /** 查找是否有该 订阅 **/
    function hasSubscribes(message) {
        let topic = String(message),
            found = hasDirectSubscribersFor(topic),
            /** 寻找 a.b.c 这种消息 **/
            position = topic.lastIndexOf(".");

        while (!found && position !== -1) {
            topic = topic.substring(0, position + 1)
            position = topic.lastIndexOf(".");
            found = hasDirectSubscribersFor(topic)
        }
        /** **/

        return found
    }

    function deliverMessage(originalMessage, matchedMessage, data) {
        /** 获得订阅对象**/
        let subscribers = messages[matchedMessage],
            callSubscriber = function (subscriber, message, data) {
                try {
                    subscriber(message, data)
                } catch (e) {
                    setTimeout(function () {
                    }, 0)
                }
            },
            k;

        if (!Object.prototype.hasOwnProperty.call(messages, matchedMessage)) {
            return;
        }

        for (k in subscribers) {
            if (Object.prototype.hasOwnProperty.call(subscribers, k)) {
                callSubscriber(subscribers[k], originalMessage, data)
            }
        }

    }

    /** 创建 订阅对应的 回调 **/
    function createDeliveryFunction(message, data) {
        return function () {
            let topic = String(message),
                /** 修剪层次结构并将消息传递到每个级别 **/
                position = topic.lastIndexOf('.');

            deliverMessage(message, message, data)

            while (position !== -1) {
                topic = topic.substring(0, position)
                position = topic.lastIndexOf(".");
                deliverMessage(message, topic, data)
            }
            /** **/

            deliverMessage(message, "*", data)
        }
    }

    PubSub.publish = function (message, data, sync = false) {

        const deliver = createDeliveryFunction(message, data)
        const has = hasSubscribes(message)

        if (!has) return false

        if (sync === true) {
            deliver()
        } else {
            setTimeout(deliver, 0)
        }

        return false

    }

    /**  **/
    PubSub.unsubscribe = function (value) {

        let descendantTopicExists = function (topic) {
                let m;
                for (m in messages) {
                    if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
                        return true;
                    }
                }

                return false;
            },
            isTopic =
                typeof value === 'string' && (Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value))
            , isToken = !isTopic && typeof value === 'string'
            , isFunction = typeof value === 'function'
            /** 用于迭代 **/
            , m
            , message,
            t,
            /** 执行结果 **/
            result = false;

        if (isTopic) {
            let m
            for (m in messages) {
                if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(value) === 0) {
                    delete messages[m]
                    return
                }
            }
        }

        for (m in messages) {
            if (Object.prototype.hasOwnProperty.call(messages, m)) {
                message = messages[m]
                /** message1:{uid01:Function,uid02:Function} **/
                /** 如果是 token 的话，那么存储在 message 下的属性中 **/

                if (isToken && message[value]) {
                    delete message[value]
                    result = value // 返回移除的回调
                    break; /** token 是唯一的，因此可以在这里停止**/
                }

                /** 如果是 Function 的话，那么对应的是 message 下的属性的值中，因此要遍历全部属性 **/
                if (isFunction) {
                    for (t in message) {
                        /** 如果 函数的引用一致则说明找到了**/
                        if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value) {
                            delete message[t]
                            result = true
                        }
                    }

                }
            }
        }
        return result
    }

}));
PubSub = module.exports



