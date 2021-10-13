# PubSub-js

## 发布订阅的基本思路

-   发布 publish

    -   对某个消息(message)进行进行 1 次发布 -> 那么所有 订阅该消息的 的订阅者将收到该消息，并且会收到发布的数据(data)

-   订阅 subscribe

    -   使用者可以对某个消息(message)进行订阅，并在订阅时约定，当该消息发布时进行某些操作(callback)

-   移除订阅 unsubscribe

    -   使用者可以取消对某个(message)消息的订阅，当该消息再次发布的时候将不再进行某些操作(callback)

-   消息池 messages
    -   1 个消息，会对应多个订阅者 subscriber
    -   example: 消息 A 有 张三订阅、李四订阅。
        当消息 A 发布的时候，张三想知道 消息的长度(callback)，李四想知道消息的内容(callback)，因此要将消息 A 和张三、李四及他们的操作保存起来，便于在消息发布时逐一通知。

```javascript
message = {
    消息A: {
        uid_01: /*张三*/ function () {
            console.log("消息的长度");
        },
        uid_02: /*李四*/ function () {
            console.log("消息的内容");
        }
    },
    消息B: {
        uid_03: /*王五*/ function () {
            //...
        },
        uid_04: /*黄六*/ function () {
            //...
        }
    }
};
```

## 思考

和 EventEmitter 对比有什么异同
