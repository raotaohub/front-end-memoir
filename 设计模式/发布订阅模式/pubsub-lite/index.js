module.exports = require("./lib/index.js");

let count = 0;
const mySubscriber = function(msg, data) {
    console.log(msg, data, ++count);
};

const token = PubSub.subscribe("MY TOPIC", mySubscriber);

const token2 = PubSub.subscribe("MY TOPIC", mySubscriber);

PubSub.publish("MY TOPIC", "hello world!");

const cb = function(msg, data) {
    console.log("点点点表达式", msg, data);
};

const cb2 = function(msg, data) {
    console.log("点点点表达式2222222", msg, data);
};
const token3 = PubSub.subscribe("a.b.c", cb);

const token4 = PubSub.subscribe("a.b", cb2);

PubSub.publish("a.b", "hello world!");

PubSub.unsubscribe("a.b.c");

PubSub.publish("a.b", "hello world!");
