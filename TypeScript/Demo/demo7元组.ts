// 这里的业务逻辑实际上已经出问题了   string number string
const arr: (number | string)[] = ['你好', 1, '你好']

// 元组 赋值必须和 类型注解的位置及数据类型 一一对应
const mintureArr: [string, number, string] = ['你好', 1, '你好']

const xiaojiejie: [string, number, string][] = [
  ['你好', 1, '你好'],
  ['你好', 1, '你好'],
  ['你好', 1, 2], // 报错因为没有一一对应
]

export {}
