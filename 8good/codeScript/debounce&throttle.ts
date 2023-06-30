// 暴力版： 定时器期间，有新操作时，清空旧定时器，重设新定时器
function debounce(fn, wait) {
  let timer;
  const ctx = this;
  return function () {
    // 如果 timer 存在则表示当前还在周期内，需要清空旧的定时器创建新的定时器
    if (timer) {
      clearTimeout(timer);
    }
    // 创建定时器，用于在周期结束后执行函数逻辑
    timer = setTimeout(() => {
      fn.apply(ctx, arguments);
      clearTimeout(timer);
      timer = null;
    }, wait);
  };
}

function throttle(fn = () => {}, delay = 0) {
  let timer = null;
  const ctx = this;

  return function () {
    if (timer) return; // 如果定时器存在则结束
    const args = arguments;
    // 若不存在则开启一个定时器，delay时间后执行
    timer = setTimeout(() => {
      fn.apply(ctx, args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}
