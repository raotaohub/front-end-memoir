function Compile(el, vm) {
  this.$vm = vm
  // 获取到挂载的 app 节点
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init()
    this.$el.appendChild(this.$fragment)
  }
  // 1. 创建一个空 DocumentFragment
  // 2. 取出el中所有子节点 添加为 fragment 的子节点
  // 3. 遍历 fragment 所有层次的子节点并编译 init()
  // 4. 将编译好的 fragment 插入回 el 中
}

Compile.prototype = {
  node2Fragment(el) {
    let fragment = document.createDocumentFragment(), child
    while (child = el.firstChild) {
      fragment.appendChild(child) // 节点将被被移除，再被插入到新的位置
    }
    return fragment
  },
  init() {
    this.compileElement(this.$fragment)
  },
  compileElement(el) {
    let me = this // 保存 this 指Compile的实例
    let childNodes = el.childNodes // 保存所有子元素集合，包括HTML节点，所有属性，文本节点。通过nodeType判断类型
    let reg = /{{(.*)}}/;

    [].slice.call(childNodes).forEach(node => {
      let text = node.textContent
      if (me.isElementNode(node)) {
        me.compile(node)

      } else if (me.isTextNode(node) && reg.test(text)) {
        me.compile(node, RegExp.$1)
      }
      // 判断 节点是否还有子节点 子节点长度是否不为 0
      if (node.childNodes && node.childNodes.length) {
        // 若还有子节点则 递归调用
        me.compileElement(node)
      }
    })
  },

  isElementNode(node) {
    return node.nodeType === 1
  },
  isTextNode(node) {
    return node.nodeType === 3
  }

}
