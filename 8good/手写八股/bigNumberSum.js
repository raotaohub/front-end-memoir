/**
 * 思路
 *  1. number 不能加，但 string 可以
 *  2. number 不能存，但 string 可以
 *
 * 步骤
 *  1. 传入的数据转成 string ，通过补 "0" ，让2个值长度相同
 *  2. traverse 相加，利用1个变量保存进位值 carry bit value
 * 
 * 拓展
 *      两数相加
 *      N数相加
 */
// 34567
//    24
// 00024

function toStr(a) {
  if (typeof a === "string") return a;

  if (typeof a === "number") return String(a);

  throw "invalid !";
}
``
function bigNumberSun(a, b) {
  a = toStr(a);
  b = toStr(b);

  let cur = 0;
  while (cur < a.length || cur < b.length) {
    if (!a[cur]) {
      a = "0" + a;
    } else if (!b[cur]) {
      b = "0" + b;
    }

    cur++;
  }

  const res = [];
  let carryBit = 0;

  for (let i = a.length - 1; i > -1; i--) {
    const sum = Number(a[i]) + Number(b[i]) + carryBit;
    carryBit = sum >= 10 ? 1 : 0;
    res.push(sum % 10);
  }

  return res.reverse().join("");
}

console.log(bigNumberSun(345672222222, 34522222));
