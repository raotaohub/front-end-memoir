type IAllProps = Record<string, any>;

const isEmpty = (str: any) => {
  return str === undefined || str === null || str === "undefined" || str === "";
};
const isNotEmpty = (str: any) => {
  return str !== undefined && str !== null && str !== "undefined" && str !== "";
};
const isNull = (obj: any) => {
  return obj === undefined || obj === null;
};
const isNotNull = (obj: any) => {
  return obj !== undefined && obj !== null;
};
const isEmptyObject = (obj: object) => {
  return !obj || Object.keys(obj).length === 0;
};
const isNotEmptyObject = (obj: object) => {
  return obj && Object.keys(obj).length !== 0;
};
const isArray = <T>(ary: T): boolean => {
  return ary && Array.isArray(ary);
};

const isNotEmptyArray = <T>(ary: T[]): boolean => {
  return Array.isArray(ary) && ary.length !== 0;
};

const parseBoolStr = (str: string) => {
  try {
    return typeof str === "string" && str.toLowerCase() === "true";
  } catch (e) {
    return false;
  }
};

// 求两数组的交集(一维)
const intersection = <T>(a: T[], b: T[]) => {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
};

const getRequestProtocol = () => {
  let protocol = "";
  try {
    const locUrl: any = new String(window.location);
    if (locUrl.startWith("https")) {
      protocol = "https:";
    } else {
      protocol = "http:";
    }
  } catch (e) {}
  return protocol;
};

type timeType = "second" | "millisecond";
type range = 0 | 1 | 30 | 90;

export const timeFormat = "YYYY-MM-DD HH:mm:ss";

// const formatTime = (time: number, type: timeType = 'second', format = timeFormat) =>
//   type === 'second' ? moment.unix(time).format(format) : moment(time).format(format)

/**
 *
 * @param range 最大可选范围
 * @param startTime 开始时间时间戳
 * @param endTime 结束时间时间戳
 * @param type 毫秒/秒
 */

// const timeTip = (
//   range: range,
//   startTime: number | string | Moment,
//   endTime: number | string | Moment,
//   type: timeType = 'second',
//   dateFormat = 'YYYY-MM',
//   needLimit = true
// ) => {
//   const nowTime = moment()

//   if (!startTime) {
//     return '请选择开始时间'
//   }
//   if (!endTime) {
//     return '请选择结束时间'
//   }

//   if (typeof startTime !== 'number') {
//     startTime = moment(startTime).unix()
//   }
//   if (typeof endTime !== 'number') {
//     endTime = moment(endTime).unix()
//   }

//   const startValue =
//     type === 'second' ? moment.unix(startTime).format(dateFormat) : moment(startTime).format(dateFormat)
//   const endValue =
//     type === 'second' ? moment.unix(endTime).format(dateFormat) : moment(endTime).format(dateFormat)

//   if (startTime > endTime) {
//     return '开始时间不能大于结束时间'
//   }

//   if (endTime > moment().endOf('month').unix()) {
//     return '不能查询未来的数据'
//   }

//   if (range === 30) {
//     if (startValue !== endValue) {
//       return '不能跨月查询，请在一个月内选择'
//     }
//   }

//   if (range === 90) {
//     const limitTime = nowTime.subtract(3, 'months').format(dateFormat)

//     if (needLimit) {
//       if (startValue !== endValue) {
//         return '不能跨月查询，请在一个月内选择'
//       }
//     }

//     if (startValue < limitTime) {
//       return '只能查询近3个月的记录'
//     }
//   }
// }

const forDight = (dight: number, how: number) => {
  return Math.round(dight * Math.pow(10, how)) / Math.pow(10, how);
};

const clone = (obj: any) => {
  let o: any = null;
  try {
    switch (typeof obj) {
      case "undefined":
        break;
      case "string":
        o = obj + "";
        break;
      case "number":
        o = obj - 0;
        break;
      case "boolean":
        o = obj;
        break;
      case "object":
        if (obj === null) {
          o = null;
        } else if (obj instanceof Array) {
          o = [];
          for (let i = 0, len = obj.length; i < len; i++) {
            o.push(clone(obj[i]));
          }
        } else {
          o = {};
          for (const k in obj) {
            o[k] = clone(obj[k]);
          }
        }
        break;
      default:
        o = obj;
        break;
    }
  } catch (e) {
    o = obj;
    console.error("clone error");
  }
  return o;
};

const splitList = <T = unknown>(list: T[], max = 1) => {
  const returnList: Array<T[]> = [];
  if (list.length > max) {
    let tempList: T[] = [];
    for (let i = 0; i < list.length; i++) {
      tempList.push(list[i]);
      if (tempList.length >= max) {
        returnList.push(tempList);
        tempList = [];
      }
    }
    if (tempList.length > 0) {
      returnList.push(tempList);
    }
  } else {
    returnList.push(list);
  }
  return returnList;
};

const convert = (obj: any, isRequest: boolean) => {
  let o: any = null;
  try {
    switch (typeof obj) {
      case "undefined":
        break;
      case "string":
        o = obj + "";
        break;
      case "number":
        o = obj - 0;
        break;
      case "boolean":
        o = obj;
        break;
      case "object":
        if (obj === null) {
          o = null;
        } else if (obj instanceof Array) {
          o = [];
          for (let i = 0, len = obj.length; i < len; i++) {
            o.push(convert(obj[i], isRequest));
          }
        } else {
          o = {};
          for (const k in obj) {
            let newK = new String(k) as string;
            if (isRequest) {
              let tempK = "";
              let isUnderline = false;
              for (let i = 0; i < newK.length; i++) {
                let c = newK.charAt(i);
                if (c === "_") {
                  isUnderline = true;
                } else {
                  if (isUnderline) {
                    c = c.toUpperCase();
                    isUnderline = false;
                  }
                  tempK += c;
                }
              }
              newK = tempK;
            } else {
              let tempK = "";
              for (let i = 0; i < newK.length; i++) {
                const c = newK.charAt(i);
                if (c >= "A" && c <= "Z") {
                  tempK += "_" + c.toLowerCase();
                } else {
                  tempK += c;
                }
              }
              newK = tempK;
            }
            o[newK] = convert(obj[k], isRequest);
          }
        }
        break;
      default:
        o = obj;
        break;
    }
  } catch (e) {
    o = obj;
  }
  return o;
};

const getNativeTime = () => {
  return forDight(new Date().getTime() / 1000, 0);
};

// const getTodayTime = () => {
//   const timeStr = formatTime(new Date().getTime(), 'millisecond', 'YYYY-MM-DD') + ' 00:00:00'
//   return moment(timeStr).valueOf() / 1000
// }

const regYuanToFen = (yuan: number, digit: number) => {
  let m = 0;
  const s1 = yuan.toString();
  const s2 = digit.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / Math.pow(10, m);
};

const isMobile = (value: string): boolean => {
  const reg = /^((\+?86-)|(\(\+86\)-)|0)?1[3-9][0-9]\d{8}$/;
  return reg.test(value);
};

/**
 * 某个时间在某段时间之间
 * @param time
 * @param startTime
 * @param endTime
 */
// const timeIsBetween = (time: number, startTime: number, endTime: number) => {
//   return moment(time).isBetween(startTime, endTime)
// }

const sortBy = (array: any[], sort: string, desc?: boolean) => {
  if (sort === undefined || sort === "") {
    return;
  }
  const numberArr: unknown[] = [];
  const charArr: unknown[] = [];
  const otherArr: unknown[] = [];
  const nullArr: unknown[] = [];
  for (let i = 0; i < array.length; i++) {
    const thisObj = array[i];
    const sortKey = thisObj[sort];
    if (sortKey === undefined || sortKey === "") {
      nullArr.push(thisObj);
    } else {
      const firstChar = new String(sortKey)[0];
      if (/(^[0-9]$)/.test(firstChar)) {
        numberArr.push(thisObj);
      } else if (/(^[A-Za-z]$)/.test(firstChar)) {
        charArr.push(thisObj);
      } else {
        otherArr.push(thisObj);
      }
    }
  }
  const realSortHandler = function (a: any, b: any) {
    if (a[sort] > b[sort]) {
      return 1;
    } else if (a[sort] < b[sort]) {
      return -1;
    }
    return 0;
  };
  const realDescSortHandler = function (a: any, b: any) {
    if (a[sort] < b[sort]) {
      return 1;
    } else if (a[sort] > b[sort]) {
      return -1;
    }
    return 0;
  };
  const pushObjHandler = function (from: any, to: any) {
    for (let i = 0; i < from.length; i++) {
      to.push(from[i]);
    }
  };
  array.length = 0;
  if (numberArr.length > 0) {
    if (desc) {
      numberArr.sort(realDescSortHandler);
    } else {
      numberArr.sort(realSortHandler);
    }
    pushObjHandler(numberArr, array);
  }
  if (charArr.length > 0) {
    if (desc) {
      charArr.sort(realDescSortHandler);
    } else {
      charArr.sort(realSortHandler);
    }
    pushObjHandler(charArr, array);
  }
  if (otherArr.length > 0) {
    if (desc) {
      otherArr.sort(realDescSortHandler);
    } else {
      otherArr.sort(realSortHandler);
    }
    pushObjHandler(otherArr, array);
  }
  if (nullArr.length > 0) {
    pushObjHandler(nullArr, array);
  }
};

/**
 * 对对象按照字母顺序进行排序
 */
const sortObject = (obj: any) => {
  const newkey = Object.keys(obj).sort();
  const newObj: any = {};
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
};

const formatPrice = (price: any) => {
  price = new String(price);
  let isDecimal = false;
  let needZeroCount = 2;
  for (let i = 0; i < price.length; i++) {
    const c = price.charAt(i);
    if (c === ".") {
      isDecimal = true;
    } else if (isDecimal) {
      needZeroCount = needZeroCount - 1;
    }
  }
  if (needZeroCount === 1) {
    price += "0";
  } else if (needZeroCount === 2) {
    price += ".00";
  }
  return price;
};

const handleParam = (value: string) => {
  if (value === "全部" || value === "未选择" || value === "all" || value === "noSelect") {
    return null;
  }
  return value;
};

/**
 * 移除无效参数
 * @param params
 */
const clearEmptyParams = <T extends { [key: string]: any }>(params: T): T => {
  if (typeof params === "object") {
    for (const key in params) {
      let value = params[key] as any;
      if (typeof value === "string" && value) {
        value = value.trim();
        params[key] = value;
      }
      if (value === undefined || value === null || value === "") {
        delete params[key];
      }
    }
  }
  return params;
};

const swapLocation = <T>(arr: T[], index1: number, index2: number) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

/**
 * 下移数组元素
 */
const indexDown = <T>(arr: T[], index: number) => {
  const length = arr.length;
  if (index + 1 !== length) {
    return swapLocation(arr, index, index + 1);
  }
};

/**
 * 上移数组元素
 */
const indexUp = <T>(arr: T[], index: number) => {
  if (index !== 0) {
    return swapLocation(arr, index, index - 1);
  }
};

/**
 * 元素置顶,直接改变原数组
 */
const toFirst = <T>(ary: T[], index: number) => {
  if (index !== 0) {
    ary.unshift(ary.splice(index, 1)[0]);
  }
};

const instance = <T>(instanceOf: () => T) => {
  let _instance: T;
  return () => {
    if (!_instance) _instance = instanceOf();
    return _instance;
  };
};

/**
 * async await 下的异常捕获
 * @param promise promise 对象
 */
export const to = <T>(promise: Promise<T>): Promise<[T, any]> => {
  return promise
    .then((data) => {
      return [data, null] as [T, any];
    })
    .catch((err) => [null, err]);
};

// const getStartTime = (type: moment.unitOfTime.StartOf) => {
//   return moment().startOf(type).unix()
// }

// const getEndTime = (type: moment.unitOfTime.StartOf, date?: string) => {
//   if (date) {
//     return moment(date).endOf(type).unix()
//   }
//   return moment().endOf(type).unix()
// }

// const getYesterdayTime = () => {
//   return moment().subtract(1, 'days').startOf('day').unix()
// }

/**
 * 驼峰大写
 * @param value
 * @param deep
 */
export function formatHump(value: any, deep = false) {
  if (value) {
    for (const key in value) {
      const newKey = key.replace(/_([a-z])/g, ($1, $2) => $2.toLocaleUpperCase());
      if (newKey !== key) {
        value[newKey] = value[key];
      }
      if (deep) {
        if (Array.isArray(value[key])) {
          value[key]?.forEach((item: any) => {
            formatHump(item, true);
          });
        } else if (typeof value[key] === "object") {
          formatHump(value[key], true);
        }
      }
    }
  }
}

const camelize = (value: any, deep = false) => {
  if (value) {
    if (typeof value === "object") {
      for (const key in value) {
        const newKey = key.replace(/([^_])(?:_+([^_]))/g, ($0, $1, $2) => {
          return $1 + $2.toUpperCase();
        });
        if (newKey !== key) {
          value[newKey] = value[key];
          delete value[key];
        }
        if (deep) {
          if (Array.isArray(value[newKey])) {
            value[newKey]?.forEach((item: any) => {
              camelize(item, true);
            });
          } else if (typeof value[newKey] === "object") {
            camelize(value[newKey], true);
          }
        }
      }
    }
  }
};

/**
 * 驼峰转下划线命名
 * @param str 字符串
 */
const underscore = (value: any, deep = false) => {
  if (value) {
    if (typeof value === "object") {
      for (const key in value) {
        const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        if (newKey !== key) {
          value[newKey] = value[key];
          delete value[key];
        }
        if (deep) {
          if (Array.isArray(value[newKey])) {
            value[newKey]?.forEach((item: any) => {
              underscore(item, true);
            });
          } else if (typeof value[newKey] === "object") {
            underscore(value[newKey], true);
          }
        }
      }
    }
  }
};

function replaceAll(str: string, reallyDo: any, replaceWith: any, ignoreCase?: string) {
  try {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
      return str.replace(new RegExp(reallyDo, ignoreCase ? "gi" : "g"), replaceWith);
    }
    return str.replace(reallyDo, replaceWith);
  } catch (e) {
    return str;
  }
}

const filterCharacter = (value: string, characters: string) => {
  let str = value;
  if (str && characters) {
    for (let index = 0; index < characters.length; index++) {
      const character = characters[index];
      const reg = new RegExp(character, "g");
      if (str.includes(character)) {
        str = str.replace(reg, "");
      }
    }
  }
  return str;
};

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

const removeRepeatOfArr = (arr: any[], key: string) => {
  const newobj: IAllProps = {},
    newArr: IAllProps[] = [];
  let item;
  for (let i = 0; i < arr.length; i++) {
    item = arr[i];
    if (!newobj[item[key]]) {
      newobj[item[key]] = newArr.push(item);
    }
  }
  return newArr;
};

const deepGet = (obj: any, path: string | string[], defaultVal?: any) => {
  const _path = Array.isArray(path) ? path : path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  return _path.reduce((subObj, subKey) => (subObj || {})[subKey], obj) || defaultVal;
};

const deepSet = (obj: any, path: string | string[], value: any) => {
  const _path = Array.isArray(path) ? path : path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  let temp = obj;
  _path.forEach((key, index, array) => {
    if (index === _path.length - 1) {
      temp[key] = value;
    } else {
      if (!temp.hasOwnProperty(key)) {
        // if the key doesn't exist on object
        const next = array[index + 1];
        temp[key] = String(Number(next)) === next ? [] : {}; // create a new object if next is item in array is not a number
      }
      temp = temp[key];
    }
  });
  return obj;
};

/**
 * 去除字符串首尾的指定字符, 默认为空格(whitespace)
 * @param origin 任意字符
 * @param character 需要去除的字符
 */
export const trim = (origin: string, character?: string): string => {
  if (typeof origin !== "string") {
    return origin;
  }

  let result = "";
  if (!character) {
    const reg = /(^\s+)|(\s+$)/g;
    result = origin.replace(reg, "");
  } else {
    const reg = new RegExp(`(^${character}+)|(${character}+$)`, "g");
    result = origin.replace(reg, "");
  }
  return result;
};

type IMiddleware<T, R> = (ctx: T, next: () => Promise<R>) => any;

export const compose = <T = any, R = any>(middleware: IMiddleware<T, R>[]) => {
  if (!Array.isArray(middleware)) {
    throw new TypeError("Middleware stack must be an array!");
  }
  for (const fn of middleware) {
    if (typeof fn !== "function") throw new TypeError("Middleware must be composed of functions!");
  }

  /**
   * @description:
   * @param {T} ctx
   * @param {function} next
   * @return {*}
   */
  return function (ctx: T, next: () => Promise<R>) {
    let index = -1;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(0);
    function dispatch(i: number): Promise<any> {
      if (i <= index) return Promise.reject(new Error("next() called multiple times"));
      index = i;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let fn: IMiddleware<any, any> = middleware[i];

      if (i === middleware.length) fn = next;

      if (!fn) return Promise.resolve();

      try {
        return Promise.reject(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
};

/**
 * 2023~2024 用的最多的一个工具方法了，缺点是不支持字符串枚举，因为字符串枚举不会生成 vk 映射
 * 枚举转select选项数组
 * @param enumObject 枚举对象
 * @param valueMapKey 用于映射原始key的中文表达
 * @returns select选项数组
 */
export const getEnumOptions = <T extends number | string>(
  enumObject: Record<string, T>,
  disabled?: ((label: string, value: T) => boolean) | boolean
): { value: T; label: string }[] =>
  Object.entries(enumObject)
    .filter(([label]) => Number.isNaN(+label))
    .map(([key, value]) => {
      return {
        label: key,
        value,
        disabled: typeof disabled === "function" ? disabled(key, value) : disabled ?? false
      };
    });

const Util = {
  deepSet,
  deepGet,
  isEmpty,
  isNotEmpty,
  isNotEmptyArray,
  isNull,
  isNotNull,
  isEmptyObject,
  isNotEmptyObject,
  isArray,
  intersection,
  getRequestProtocol,
  getNativeTime,
  forDight,
  clone,
  splitList,
  convert,
  sortBy,
  sortObject,
  formatPrice,
  regYuanToFen,
  isMobile,
  handleParam,
  clearEmptyParams,
  indexUp,
  indexDown,
  toFirst,
  instance,
  replaceAll,
  camelize,
  underscore,
  filterCharacter,
  getDifferenceSet,
  removeRepeatOfArr,
  getIntersectionSet,
  parseBoolStr,
  getEnumOptions
};

export default Util;
