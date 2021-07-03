const target = {
  id: 'target',
}

let proxy = new Proxy(target, () => {})

// 访问相同的 key 得到相同的 value
console.log(proxy.id)
console.log(target.id)

// 修改

proxy.id = 'raotao'
console.log('[proxy]', proxy.id)
console.log('[proxy]', target.id)

target.id = 'zhutou'
console.log(proxy.id)
console.log(target.id)

// 严格相等可以用来区分代理和目标
console.log(target === proxy) // false
