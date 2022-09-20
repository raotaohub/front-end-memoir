function forEach(arrays, callback) {
  let index = -1;
  let length = arrays.length;
  while (++index < length) {
    if (arrays[index]) callback(arrays[index], index);
  }
  return arrays;
}

function deepCopy(o, hash = new Map()) {
  const type = typeof o;
  if (type === "object" && o !== null) {
    if (o instanceof RegExp) return new RegExp(o);

    if (o instanceof Date) return new Date(o);

    const newVal = new o.constructor();

    if (hash.get(o)) return hash.get(o);
    hash.set(o, newVal);

    for (let k in o) {
      if (Object.prototype.hasOwnProperty.call(o, k)) {
        newVal[k] = deepCopy(o[k], hash);
      }
    }

    return newVal;
  }

  return o;
}

const target: any = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child"
  },
  ts: null,
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
  func1: () => {
    console.log("code秘密花园");
  },
  func2: function (a, b) {
    return a + b;
  }
};

target.target = target;

console.time();

const result = deepCopy(target);

console.log(result);

console.timeEnd();
