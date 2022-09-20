function curry(fn, ...rest) {
  let args = [...rest].slice(0);
  let length = fn.length;

  function inner(...rest) {
    args = args.concat(...rest);

    if (args.length < length) return inner;

    return fn.apply(null, args);
  }

  return inner;
}

function currying(fn, ...args) {
  return args.length >= fn.length ? fn(...args) : (..._args) => currying(fn, ...args, ..._args);
}

const add1 = curry((x, y) => x + y);
console.log(add1(1)(2));
console.log(add1(1, 2));

const add2 = currying((x, y) => x + y);
console.log(add2(1)(2));
console.log(add2(1, 2));
