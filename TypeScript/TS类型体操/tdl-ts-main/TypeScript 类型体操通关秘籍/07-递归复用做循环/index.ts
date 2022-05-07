/**
 * ! 1.TypeScript 不支持循环，但可以递归，从而达到循环的效果。
 */

// !Promise 的递归复用

type P = Promise<Promise<Promise<Promise<Promise<Record<"a" | "b", boolean>>>>>>;

type DeepPromiseVal<P extends Promise<unknown>> = P extends Promise<infer ReturnType>
  ? ReturnType extends Promise<unknown>
    ? DeepPromiseVal<ReturnType>
    : ReturnType
  : never;

type pres = DeepPromiseVal<P>;

type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : T;

type pres2 = DeepPromiseValueType2<P>;

type DeepPromiseValPlush<T> = T extends Promise<infer V> ? DeepPromiseValPlush<V> : T;

type pres3 = DeepPromiseValPlush<P>;

// !数组类型的递归

type arr = [1, 2, 3, 4, 5];

// ?反转
type ReverseArr<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseArr<Rest>, First]
  : T;

type res1 = ReverseArr<arr>;

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

// ?包含

type Includes<A extends unknown[], F> = A extends [infer Item, ...infer Rest]
  ? IsEqual<F, Item> extends true
    ? true
    : Includes<Rest, F>
  : false;

type res3 = Includes<[1, 2, 3, 4, 5], 3>;

// ?移除

type RemoveItem<A extends unknown[], Find, Result extends unknown[] = []> = A extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<Find, First> extends true
    ? RemoveItem<Rest, Find, Result>
    : RemoveItem<Rest, Find, [...Result, First]>
  : Result;

type res4 = RemoveItem<[1, 2, 3, 4, 5], 1>;

// ?构建
type BuildArray<
  Length extends number,
  Value,
  Result extends unknown[] = []
> = Result["length"] extends Length ? Result : BuildArray<Length, Value, [...Result, Value]>;

type result5 = BuildArray<5, 5>;

export {};
