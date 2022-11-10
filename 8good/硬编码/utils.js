/**
 * @description:
 */
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds));
/**
 * @description:
 */
const delay = (fn, delay, ...args) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn(...args));
    }, delay);
  });
};

/**
 * @description:
 */
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;

  if (hash.get(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash); // 递归
    }
  }
  return cloneObj;
}

const deepGet = (obj: any, path: string | string[], defaultVal?: any) => {
  const _path = Array.isArray(path) ? path : path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  return _path.reduce((subObj, subKey) => (subObj || {})[subKey], obj) || defaultVal;
};

/**
 * @description:
 */
function debounce(fn, wait) {
  let timer = null;
  return function () {
    if (!timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this);
    }, wait);
  };
}

/**
 * @description:
 */
function throttle(fn, wait) {
  let lastTime = 0;
  return function () {
    let nowTime = new Date();
    if (nowTime - lastTime >= wait) {
      fn.apply(this);
      lastTime = nowTime;
    }
  };
}

const trim = (str) => str.trim || str.replace(/^\s+|\s+$/g, "");
// 随机生成不重复
const shuffle = (list) => list.sort((x, y) => Math.random() - 0.5);

/**
 * @description: 根据对象的key，求数组对象的差集
 * @param {any} arr1
 * @param {any} arr2
 * @param {string} keyName
 * @return {{any:any}[]} 差集数组对象
 */
const getDifferenceSet = (arr1: IAllProps[], arr2: IAllProps[], keyName: string) => {
  return Object.values(
    arr1.concat(arr2).reduce((acc: any, cur: any) => {
      if (acc[cur[keyName]] && acc[cur[keyName]][keyName] === cur[keyName]) {
        delete acc[cur[keyName]];
      } else {
        acc[cur[keyName]] = cur;
      }
      return acc;
    }, {})
  );
};

/**
 * @description: 根据对象的key，求数组对象的交集
 * @param {any} arr1
 * @param {any} arr2
 * @param {string} keyName
 * @return {{any:any}[]} 交集数组对象
 */
const getIntersectionSet = (arr1: IAllProps[], arr2: IAllProps[], keyName: string) => {
  let long = arr1,
    short = arr2;
  const intersection: IAllProps[] = [],
    set = new Set();
  if (long.length < short.length) {
    long = arr2;
    short = arr1;
  }

  outer: for (let i = 0, len1 = short.length; i < len1; i++) {
    const v = short[i];
    inside: for (let j = 0, len2 = long.length; j < len2; j++) {
      const item = long[j];
      if (set.has(item[keyName])) continue inside;
      if (v[keyName] === item[keyName]) {
        set.add(item[keyName]);
        intersection.push(item);
        continue inside;
      }
      // if (intersection.length === len1) break outer
    }
  }
  return intersection;
};
