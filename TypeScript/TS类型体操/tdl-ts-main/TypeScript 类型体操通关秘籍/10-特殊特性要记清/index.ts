// !特殊类型的特性
// ! any、never、联合类型
// ! class 有 public、protected、private

// ?any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any，可以用这个特性判断 any 类型。
// ?联合类型作为类型参数出现在条件类型左侧时，会分散成单个类型传入，最后合并。
// ?never 作为类型参数出现在条件类型左侧时，会直接返回 never。
// ?any 作为类型参数出现在条件类型左侧时，会直接返回 trueType 和 falseType 的联合类型。
// ?元组类型也是数组类型，但每个元素都是只读的，并且 length 是数字字面量，而数组的 length 是 number。可以用来判断元组类型。
// ?函数参数处会发生逆变，可以用来实现联合类型转交叉类型。
// ?可选索引的值为 undefined 和值类型的联合类型。可以用来过滤可选索引，反过来也可以过滤非可选索引。
// ?索引类型的索引为字符串字面量类型，而可索引签名不是，可以用这个特性过滤掉可索引签名。
// ?keyof 只能拿到 class 的 public 的索引，可以用来过滤出 public 的属性。

// ?https://juejin.cn/book/7047524421182947366/section/7048282437238915110 判断是否是 any 类型
type IsAny<T> = "a" extends "b" & T ? true : false; // 交叉类型 同类型合并 不同类型丢弃

type res = IsAny<"">;

type IsEqual<T extends unknown, S extends unknown> = IsAny<T> extends true
  ? false
  : IsAny<S> extends true
  ? false
  : (T extends S ? true : false) & (S extends T ? true : false);

type res2 = IsEqual<any, "a">;

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;

type IsNotEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? false
  : true;
type res3 = IsEqual<any, "a">;

// 判断是否是联合类型
type isUnion<A, B = A> = A extends A ? ([A] extends [B] ? false : true) : never;

// 判断 never
type isNever<T> = [T] extends [never] ? true : false;

// 判断tuple

// ? 1. 元组也是数组 但是每个元素都是只读的
type isTuple<T> = T extends [...tuple: infer Eles] ? IsNotEqual<Eles["length"], number> : false;

type arrayLength = string[]["length"];
type tupleLength = [1, 2]["length"];

// !如果允许父类型赋值给子类型，就叫做【逆变】。

// !如果允许子类型赋值给父类型，就叫做【协变】。

// !在 TypeScript 中【有函数参数是有逆变的性质的】，这就是说，若函数参数可能是多个类型，参数类型会变成它们的交叉类型。

export type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (
  x: infer R
) => unknown
  ? R
  : never;

type union = 1 | 2;
type uniontoIntersection = UnionToIntersection<union>;

export {};
