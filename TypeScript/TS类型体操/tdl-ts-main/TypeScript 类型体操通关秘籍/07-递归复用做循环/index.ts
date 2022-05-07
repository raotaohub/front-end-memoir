/**
 * ! 1.TypeScript 不支持循环，但可以递归，从而达到循环的效果。
 */

// !Promise 的递归复用

type P = Promise<Promise<Promise<Record<string, any>>>>;

type DeepPromiseVal<P extends Promise<unknown>> = P extends Promise<infer ReturnType>
  ? ReturnType extends Promise<unknown>
    ? DeepPromiseVal<ReturnType>
    : ReturnType
  : never;

type pres = DeepPromiseVal<P>;

type DeepPromiseValueType2<T> = T extends Promise<infer ValueType> ? DeepPromiseValueType2<ValueType> : T;

type pres2 = DeepPromiseValueType2<P>;

// !数组类型的递归

type arr = [1, 2, 3, 4, 5];

type ReverseArr<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [...ReverseArr<Rest>, First]
  : T;

type res1 = ReverseArr<arr>;
