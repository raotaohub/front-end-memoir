/**
 *如何保证1个类仅有一个实例呢
 *
 */
class Single {
    private static instance: any;

    constructor() {
        // return new Single();
        /**
         * @Description 造器函数的返回值
         * 返回对象 那么 new Single()时 返回的就是这个对象
         * 返回原始值 则返回new Single()的实例对象
         **/
    }

    static getInstance() {
        if (!Single.instance) {
            Single.instance = new Single();
        }
        return Single.instance;
    }
}

const s1 = Single.getInstance();
const s2 = Single.getInstance();

console.log(s1 === s2); // true

// 那么如果这样呢？
const ss1 = new Single();
const ss2 = new Single();
console.log(ss1, ss2); // Single{} Single{}
console.log(ss1 === ss2); // false

// 因此我们只暴露出调用的方法，而不直接暴露这个class
const useSingle = () => Single.getInstance();
export default useSingle;

const sss1 = useSingle();
const sss2 = useSingle();
console.log(sss1 === sss2); // true

/* closure version */

class Single2 {
    static getInstance: () => Single2;
}
Single2.getInstance = (function () {
    let instance;
    return () => {
        if (!instance) {
            instance = new Single2();
        }
        return instance;
    };
})();
