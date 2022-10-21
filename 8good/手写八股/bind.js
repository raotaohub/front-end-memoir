// this 就是调用的函数

Function.prototype.mybind = function (ctx, ...args) {
  return function (...innerArgs) {
    return this.call(ctx, ...args, ...innerArgs);
  };
};
