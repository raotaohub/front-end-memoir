function currying(fn) {
  let args = [...arguments].slice(1);
  const fnL = fn.length;

  function closure() {
    args = args.concat(...arguments);

    if (args.length < fnL) return closure;

    return fn.apply(null, args);
  }

  return closure;
}

const add = currying((a, b, c) => a + b + c, 1, 2);

console.log(add(3)); // 5
