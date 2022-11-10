// this 就是调用的函数

Function.prototype.mybind = function (ctx, ...args) {
  return function (...innerArgs) {
    return this.call(ctx, ...args, ...innerArgs);
  };
};

Function.prototype.myapply = function (ctx, list) {
  ctx = ctx || window;
  ctx.fn = this; // 调用者就是这个函数
  let result;
  result = Array.isArray(list) ? ctx.fn(...list) : ctx.fn(); // 改变函数调用时的this
  delete ctx.fn;
  return result;
};

Function.prototype.mycall = function (ctx, ...args) {
  ctx = ctx || window;
  ctx.fn = this;
  const result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};
