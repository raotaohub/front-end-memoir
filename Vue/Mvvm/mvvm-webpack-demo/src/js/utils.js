/**
 * @def 用于方便的定义一个对象的数据属性
 * */
export const def = function(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: enumerable,
        writable: true,
        configurable: true
    });
};
