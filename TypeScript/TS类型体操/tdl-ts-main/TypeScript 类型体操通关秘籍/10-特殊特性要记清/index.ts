// !特殊类型的特性
// ! any、never、联合类型
// ! class 有 public、protected、private

// ?https://juejin.cn/book/7047524421182947366/section/7048282437238915110
type IsAny<T> = "a" extends "b" & T ? true : false; // 交叉类型 同类型合并 不同类型丢弃

type res = IsAny<"">;

type IsEqual<T extends unknown, S extends unknown> = IsAny<T> extends true
  ? false
  : IsAny<S> extends true
  ? false
  : (T extends S ? true : false) & (S extends T ? true : false);

type res2 = IsEqual<any, "a">;
export {};
