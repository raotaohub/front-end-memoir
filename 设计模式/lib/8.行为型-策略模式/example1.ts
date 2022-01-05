function checkAuth(data) {
  if (data.role !== "juejin") {
    console.log("不是掘金用户");
    return false;
  }
  if (data.grade < 1) {
    console.log("掘金等级小于 1 级");
    return false;
  }
  if (data.job !== "FE") {
    console.log("不是前端开发");
    return false;
  }
  if (data.type !== "eat melons") {
    console.log("不是吃瓜群众");
    return false;
  }
}

const strategy = {
  checkRole(val) {
    return val === "juejin";
  },
  checkGrade(val) {
    return val < 1;
  },
  checkJob(val) {
    return val === "FE";
  },
  checkType(val) {
    return val === "eat melons";
  }
};

class Rule {
  constructor() {}
  private rules = [];
  add = (val, method) => {
    this.rules.push(() => strategy[method](val));
  };
  check = () => {
    for (let i = 0, len = this.rules.length; i < len; i++) {
      if (this.rules[i]()) {
        return false;
      }
    }
    return true;
  };
}

// 检测A

function check() {
  const rule = new Rule();
  rule.add("juejin", "checkRole"); // 第一个参数是要检测的值，第二个为用以检测的方法名
  rule.add("FE", "checkJob"); // 用检查工作岗位的方法，检查值是否合规
}

// ...
