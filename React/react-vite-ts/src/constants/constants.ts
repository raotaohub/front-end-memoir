import moment from 'moment'

// TODO 时间格式常量
export const DAY_FORMAT = 'YYYY-MM-DD HH:mm'
export const MONTH_FORMAT = 'YYYY-MM'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm'

export const MINUTE_RANGE = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59
]

export const HOUR_RANGE = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23
]
// TODO moment 日期和事件常量

// 本月开始时 本月结束时 如05-01 ~ 05-31
export const MONTH_START = moment().startOf('month')
export const MONTH_END = moment().endOf('month')

// 上个月开始时 上个月结束时 如03-01 ~ 03-31
export const LAST_MONTH_START = moment().subtract(1, 'months').startOf('month')
export const LAST_MONTH_END = moment().subtract(1, 'months').endOf('month')

// 下个月开始 下个月结束
export const NEXT_MONTH_START = moment().add(1, 'months').startOf('month')
export const NEXT_MONTH_END = moment().add(1, 'months').endOf('month')

// 1个月前
export const A_MONTH_AGO = moment().subtract(1, 'months')
// 2个月前
export const TWO_MONTH_AGO = moment().subtract(2, 'months')
// 3个月前
export const THR_MONTH_AGO = moment().subtract(3, 'months')

// 今天开始时 今天结束时
export const TODAY_START = moment().startOf('day')
export const TODAY_EDN = moment().endOf('day')

// 半个小时前 此时此刻
export const HALF_HOUR_START = moment().subtract(30, 'minute')
export const AT_NOW_END = moment()
