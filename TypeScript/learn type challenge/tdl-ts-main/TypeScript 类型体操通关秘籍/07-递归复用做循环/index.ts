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

/* 如果要改变数组内容 通常需要额外1个参数来装填结果 Result */

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

// !字符串类型的递归

// ?替换单个
type Replace<
  Str extends string,
  SubStr extends string,
  newSubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}` ? `${Prefix}${newSubStr}${Suffix}` : Str;

type result6 = Replace<"raotaohub-abc", "hub", "pbc">;

// ?替换全部
type ReplaceAll<
  Str extends string,
  SubStr extends string,
  newSubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? `${Prefix}${newSubStr}${ReplaceAll<Suffix, SubStr, newSubStr>}`
  : Str;

type result7 = ReplaceAll<"raotaohub-abc-hub", "hub", "pbc">;

// ?StringToUnion

type StringToUnion<Str extends string> = Str extends `${infer One}${infer Two}${infer Three}`
  ? One | Two | Three
  : never;

type res7 = StringToUnion<"pbc">;

type StringToUnionPlus<Str extends string> = Str extends `${infer One}${infer Rest}`
  ? One | StringToUnionPlus<Rest>
  : never;

type res8 = StringToUnionPlus<"raotaohub">;

// ?ReverseStr 反转
type ReverseStr<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : Str;

type ReverseStr2<
  Str extends string,
  Result extends string = ""
> = Str extends `${infer First}${infer Rest}` ? ReverseStr2<Rest, `${First}${Result}`> : Result;

type res9 = ReverseStr<"1234567">;

type re10 = ReverseStr2<"1234567">;

// !DeepReadonly 索引类型——对象类型的递归

type Readonly<T extends object> = {
  readonly [Key in keyof T]: T[Key];
};

type res11 = Readonly<{ a: "1" }>;

type DeepReadonly1<T extends object> = {
  readonly [Key in keyof T]: T[Key] extends object ? DeepReadonly<T[Key]> : T[Key]; // ! error 函数没有被正确处理
};
/* 
interface RESULT {
  readonly a: "1";
  readonly b: {
    readonly b: "2";
  };
  readonly c: () => void;
} */
type res12 = DeepReadonly1<{ a: "1"; b: { b: "2" }; c: () => void }>;

type DeepReadonly<T extends object> = T extends any
  ? {
      readonly [Key in keyof T]: T[Key] extends object
        ? T[Key] extends Function
          ? T[Key]
          : DeepReadonly<T[Key]>
        : T[Key];
    }
  : never;

type res13 = DeepReadonly<{ a: "1"; b: { b: "2" }; c: () => void }>;

type DeepReadonly2<T extends object> = {
  readonly [key in keyof T]: T[key] extends Record<string | number | symbol, unknown>
    ? DeepReadonly2<T[key]>
    : T[key];
};

type res14 = DeepReadonly2<{ a: "1"; b: { b: "2" }; c: () => void }>;

export {};
