//主线程直接执行
console.log('1');
//丢到宏事件队列中
setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  })
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5')
  })
})
//微事件1
process.nextTick(function () {
  console.log('6');
})
//主线程直接执行
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  //微事件2
  console.log('8')
})
//丢到宏事件队列中
setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  })
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12')
  })
})