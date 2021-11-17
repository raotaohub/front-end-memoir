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

const stateToProcessor = {
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
