let peoples = [
  { n: "p1", w: 100 },
  { n: "p2", w: 200 },
  { n: "p3", w: 100 }
];
let rand = function (p) {
  p.sort((a, b) => a.w - b.w);

  const sum = p.reduce((total, item) => {
    total += item.w;
    return total;
  }, 0);

  console.log(sum);

  p.reduce((total, item) => {
    total += item.w;
    item.w = total / sum;
    return total;
  }, 0);

  console.log(p);
  const random = Math.random();

  return p.find((item) => random <= item.w).n;
};
console.log(rand(peoples));
