// class CoffeeMaker {
//   state: string;
//   constructor() {
//     /**
//       这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
//     **/
//     // 初始化状态，没有切换任何咖啡模式
//     this.state = "init";
//   }

//   // 关注咖啡机状态切换函数
//   changeState(state) {
//     // 记录当前状态
//     this.state = state;
//     if (state === "american") {
//       // 这里用 console 代指咖啡制作流程的业务逻辑
//       console.log("我只吐黑咖啡");
//     } else if (state === "latte") {
//       console.log(`给黑咖啡加点奶`);
//     } else if (state === "vanillaLatte") {
//       console.log("黑咖啡加点奶再加香草糖浆");
//     } else if (state === "mocha") {
//       console.log("黑咖啡加点奶再加点巧克力");
//     }
//   }
// }

// const mk = new CoffeeMaker();
// mk.changeState("latte"); // 输出 '给黑咖啡加点奶'
// todo
// class CoffeeMaker {
//   state: string;
//   constructor() {
//     /**
//       这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
//     **/
//     // 初始化状态，没有切换任何咖啡模式
//     this.state = "init";
//   }
//   changeState(state) {
//     // 记录当前状态
//     this.state = state;
//     if (state === "american") {
//       // 这里用 console 代指咖啡制作流程的业务逻辑
//       this.americanProcess();
//     } else if (state === "latte") {
//       this.latteProcress();
//     } else if (state === "vanillaLatte") {
//       this.vanillaLatteProcress();
//     } else if (state === "mocha") {
//       this.mochaProcress();
//     }
//   }
//   //   复用了这个部分
//   americanProcess() {
//     console.log("我只吐黑咖啡");
//   }

//   latteProcress() {
//     this.americanProcess();
//     console.log("加点奶");
//   }

//   vanillaLatteProcress() {
//     this.latteProcress();
//     console.log("再加香草糖浆");
//   }

//   mochaProcress() {
//     this.latteProcress();
//     console.log("再加巧克力");
//   }
// }

// const mk = new CoffeeMaker();
// mk.changeState("latte");

// todo 开放封闭

/* const stateToProcessor = {
  american() {
    console.log("我只吐黑咖啡");
  },
  latte() {
    this.american();
    console.log("加点奶");
  },
  vanillaLatte() {
    this.latte();
    console.log("再加香草糖浆");
  },
  mocha() {
    this.latte();
    console.log("再加巧克力");
  }
};

class CoffeeMaker {
  state: string;
  constructor() {
    this.state = "init";
  }

  // 关注咖啡机状态切换函数
  changeState(state) {
    // 记录当前状态
    this.state = state;
    // 若状态不存在，则返回
    if (!stateToProcessor[state]) {
      return;
    }
    stateToProcessor[state](); // 这里是一个map 映射
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");
 */
class CoffeeMaker {
  state: string;
  leftMilk: string;
  constructor() {
    /**
      这里略去咖啡机中与咖啡状态切换无关的一些初始化逻辑
    **/
    // 初始化状态，没有切换任何咖啡模式
    this.state = "init";
    // 初始化牛奶的存储量
    this.leftMilk = "500ml";
  }
  // 把状态-行为映射对象作为主体类对应实例的一个属性添加进去
  stateToProcessor = {
    that: this,
    american() {
      // 尝试在行为函数里拿到咖啡机实例的信息并输出
      console.log("咖啡机现在的牛奶存储量是:", this.that.leftMilk);
      console.log("我只吐黑咖啡");
    },
    latte() {
      this.american();
      console.log("加点奶");
    },
    vanillaLatte() {
      this.latte();
      console.log("再加香草糖浆");
    },
    mocha() {
      this.latte();
      console.log("再加巧克力");
    }
  };

  // 关注咖啡机状态切换函数 这里的状态就是指 制作不同咖啡时所需的状态
  changeState(state) {
    this.state = state;
    if (!this.stateToProcessor[state]) {
      return;
    }
    this.stateToProcessor[state]();
  }
}

const mk = new CoffeeMaker();
mk.changeState("latte");

/* 
唯一的区别在于，定义里强调了”类“的概念。
但我们的示例中，包括大家今后的实践中，一个对象的状态如果复杂到了你不得不给它的每 N 种状态划分为一类、
一口气划分很多类这种程度，我更倾向于你去反思一个这个对象是不是做太多事情了。事实上，在大多数场景下，
我们的行为划分，都是可以像本节一样，控制在”函数“这个粒度的。

* 状态模式的调用 会依赖调用者的状态 比如这里【CoffeeMaker类】的 state
*/

export default {};
