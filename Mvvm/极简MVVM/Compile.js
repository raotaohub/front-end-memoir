//  Compile 编译模板是什么？ 就是将绑定的节点，如在vue中经常用的方式是 id='app' , 把app所有的子节点取出来解析编译
function compile() {
  let eleList = this.$el.children
  let reg = /{{(.*)}}/
  for (let i = 0; i < eleList.length; i++) {
    if (eleList[i].tagName === 'INPUT') {
      // 获取 v-model的属性值
      let key = eleList[i].getAttribute('v-model')
      eleList[i].value = this[key]
      let observer = new Observer(eleList[i])
      this.subObj[key].addObserver(observer)
      let that = this
      eleList[i].oninput = function () {
        that.subObj[key].notify(this.value)
      }
    } else {
      let key = reg.exec(eleList[i].innerHTML)[1]
      eleList[i].innerHTML = this[key]
      let observer = new Observer(eleList[i])
      this.subObj[key].addObserver(observer)
    }
  }
}
