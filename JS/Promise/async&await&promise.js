// 使用 async

function filterName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("halo");
    }, 1000);
  });
}

async function getAllName() {
  const res = await filterName();
  console.log(res);
  console.log("你好");
}

getAllName();

/**
 * async await
 * 优点：像书写同步代码一样组织异步的逻辑。
 * 缺点：具有感染性，如果要保持他的优点，那么其他预制配合的函数也要变成async函数
 */

/**
 * promise
 * 优点：解决回调地狱，链式调用
 * 缺点：链式调用，代码堆叠
 */

function add() {
  return new Promise((resolve, reject) => {
    resolve("11");
  });
}

// add().then((v) => console.log(v));

const res = await add()

console.log(res)