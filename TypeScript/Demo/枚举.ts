enum Status {
  MESSAGE,
  DATA,
  COMPONENTS,
}
function Getserve(status: any) {
  if (status === Status.MESSAGE) {
    return 'message'
  } else if (status === Status.DATA) {
    return 'data'
  } else if (status === Status.COMPONENTS) {
    return 'components'
  }
}
// 使用枚举这种方式定义 可以使代码可读性提高 （语义化）

//调用枚举的数据        既可以直接用.取值                也可用数字取值
console.log(console.log(Getserve(Status.MESSAGE)) === console.log(Getserve(0))) // true
