console.log('胖子')
// 命名空间
namespace Components {
  // 命名空间支持嵌套
  export namespace SubComponents {
    export class Test {
      constructor() {
      }
    }
  }

  export class Header {
    constructor() {
      const ele = document.createElement('div')
      ele.innerHTML = 'this is a Header '
      document.body.appendChild(ele)
    }
  }

  export class Content {
    constructor() {
      const ele = document.createElement('div')
      ele.innerHTML = 'this is a Header '
      document.body.appendChild(ele)
    }
  }

  export class Footer {
    constructor() {
      const ele = document.createElement('div')
      ele.innerHTML = 'this is a Header '
      document.body.appendChild(ele)
    }
  }

  export class Page {
    constructor() {
      new Header()
      new Content()
      new Footer()
    }
  }
}
