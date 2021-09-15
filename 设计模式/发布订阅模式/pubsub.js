/**
 * @name: pubsub.js
 * @author: raotaohub
 * @date: 2021-09-15 20:58
 * @description：pubsub.js
 * @update: 2021-09-15 20:58
 */

const PubSub = require("pubsub-js");

var mySubscriber = function (msg, data) {
    console.log( msg, data );
};


var token = PubSub.subscribe('MY TOPIC', mySubscriber);

PubSub.publish('MY TOPIC', 'hello world!');


PubSub.publishSync('MY TOPIC', 'hello world!');
