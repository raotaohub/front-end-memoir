// function askPrice(tag: string, originPrice: number) {
//   // 处理预热价
//   if (tag === "pre") {
//     if (originPrice >= 100) {
//       return originPrice - 20;
//     }
//     return originPrice * 0.9;
//   }

//   // 处理大促价
//   if (tag === "onSale") {
//     if (originPrice >= 100) {
//       return originPrice - 30;
//     }
//     return originPrice * 0.8;
//   }

//   // 处理返场价
//   if (tag === "back") {
//     if (originPrice >= 200) {
//       return originPrice - 50;
//     }
//     return originPrice;
//   }

//   // 处理尝鲜价
//   if (tag === "fresh") {
//     return originPrice * 0.5;
//   }
// }

// * 策略模式 —— 定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。
// * 缺点是 需要了解这个 类型-行为的映射对象的全部
// * 优点是 用数据结构换取了代码阅读的复杂度 ， 它行为函数只做一件事，不依赖外部的状态

const priceProcessor = {
  pre: function prePrice(originPrice: number) {
    if (originPrice >= 100) {
      return originPrice - 20;
    }
    return originPrice * 0.9;
  },

  onSale: function onSalePrice(originPrice: number) {
    if (originPrice >= 100) {
      return originPrice - 30;
    }
    return originPrice * 0.8;
  },

  back: function backPrice(originPrice: number) {
    if (originPrice >= 200) {
      return originPrice - 50;
    }
    return originPrice;
  },

  fresh: function freshPrice(originPrice: number) {
    return originPrice * 0.5;
  }
};

function askPrice(tag: string, originPrice: number) {
  if (!priceProcessor[tag]) {
    return console.log("不存在的类型");
  }
  if (!originPrice) {
    return console.log("请说出咨询的价格");
  }
  return priceProcessor[tag](originPrice);
}
