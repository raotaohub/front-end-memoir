// 统计字符串中出现次数最多的字符及次数

// 先建立字典，再统计
function getFrequentChar(str) {
  let count = 0;

  const o = Object.entries(
    str.split("").reduce((container, cur) => {
      container[cur] = (container[cur] || 0) + 1;
      return container;
    }, {})
  );

  return Object.entries(o).reduce((a, c) => {
    return c[1] > a[1] ? c : a;
  }, o[0]);
}

console.log(getFrequentChar("aaabbaaacc"));

// 一边循环一遍统计
function getFrequentChar(str) {
  let dict = {},
    maxC = ["", 0];
  for (let c of str) {
    dict[c] = (dict[c] || 0) + 1;
    if (dict[c] > maxC[1]) {
      maxC = [c, dict[c]];
    }
  }
  return maxC;
}
console.log(getFrequentChar("aaabbaaacc"));

class Student {
  constructor(name) {
    this.name = "Tom";
  }

  getInfo() {
    return {
      name: "Jerry",
      getName: () => {
        return this.name;
      }
    };
  }
}
let s = new Student();
console.log(s.getInfo().getName()); // Jerry
