interface Key {
  [key: string]: string
}

const learn: Key = {
  Any: '任意类型，谨慎使用，避免使typescript变成anyscript',
  Unknown: '与any类似，但是比any更加安全',
  Void: '通常用于返回值的函数',
  Never:
    'never occur 从来不会发生的类型，例如永远不会有结果的，抛出异常或者死循环。',
}

export default learn
