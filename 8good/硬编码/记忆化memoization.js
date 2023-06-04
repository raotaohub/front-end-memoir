/**
 * @name: 记忆化memoization
 * @author: raotaohub
 * @date: 2021-09-14 22:09
 * @description：记忆化memoization
 * @update: 2021-09-14 22:09
 */

let count = 0;
function memoizeFunction(fn) {

    const cache = {};

    return function() {
        const key = arguments[0];

        // console.log("key:", key);
        // console.log("cache:", cache);
        // console.log(count++, cache[key]);

        if (cache[key]) {
            return cache[key];
        } else {
            const result = fn.apply(this, arguments);
            cache[key] = result;
            return result;
        }
    };
}

const fibonacci = memoizeFunction(function(n) {
    return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

console.time("start1");
fibonacci(3000);
console.timeEnd("start1");

// 第二次有缓存
console.time("start2");
fibonacci(3000);
console.timeEnd("start2");

