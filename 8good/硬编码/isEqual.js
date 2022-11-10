function isValueEqual(a, b) {
  // 基本值、引用、 特殊值
  if (a === b) {
    return true;
  }

  if (typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b)) return true;

  // 引用
  if (typeof a === "object" && a !== null && typeof b === "object" && b !== null) {
    const keys1 = Object.keys(a);
    const keys2 = Object.keys(b);

    // 长度比较
    if (keys1.length !== keys2.length) return false;

    for (const k of keys1) {
      // 递归值比较
      console.log("k:", k);
      if (!isValueEqual(a[k], b[k])) return false;
    }

    return true;
  }
  return false;
}

// console.log(isValueEqual([1, 2], [1, 2]));
console.log(isValueEqual({ a: [1, 2] }, { a: [1, 2] }));
