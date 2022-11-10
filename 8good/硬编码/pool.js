function pMap(list, mapper, concurrency = Infinity) {
  // list 为 Iterator，先转化为 Array
  list = Array.from(list);
  return new Promise((resolve, reject) => {
    let currentIndex = 0;
    let result = [];
    let resolveCount = 0;
    let len = list.length;
    function next() {
      const index = currentIndex;
      currentIndex++;
      Promise.resolve(list[index])
        .then((o) => mapper(o, index))
        .then((o) => {
          result[index] = o;
          resolveCount++;
          if (resolveCount === len) {
            resolve(result);
          }
          if (currentIndex < len) {
            next();
          }
        });
    }
    for (let i = 0; i < concurrency && i < len; i++) {
      next();
    }
  });
}

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds));

const now = Date.now();
console.log("Start");
pMap([1, 1, 1], (x) => sleep(x * 1000)).then((o) => {
  console.log(o);
  console.log(Date.now() - now, "seconds");
});

pMap([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], (x) => x * 3).then((o) => console.log(o));
