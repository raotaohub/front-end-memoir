/**
 * ! 1.TypeScript 类型系统支持 3 种可以声明任意类型的变量： type、infer、类型参数。
 * ! 2.TypeScript 类型不支持修改，因此只能重新构造。
 */

/**
 * ! type 类型别名
 */
type ttt = Promise<number>;
/**
 * ! infer 类型提取
 */
type GetVal<P> = P extends Promise<infer Value> ? Value : never;
type res = GetVal<ttt>;
/**
 * ! 类型参数
 */
type isTwo<T> = T extends 2 ? true : false;

/**
 * ! 一、数组、字符串、函数等类型的重新构造
 * ? 1.数组
 */

type tuple = [1, 2, 3];
// 新增1个
type Push<T extends unknown[], V> = [...T, V];

// 新增1+个
type PushPlus<T extends unknown[], V> = V extends unknown[] ? [...T, ...V] : [...T, V];

type res2 = Push<tuple, 4>;
type res3 = PushPlus<tuple, [4, 5, 6]>;

type Shift<T extends unknown[], V> = [V, ...T];
type res4 = Shift<tuple, 5>;

// 合并数组
type tuple1 = [1, 2];
type tuple2 = ["guang", "dong"];

type Zip<T extends unknown[], P extends unknown[]> = T extends [...infer Rest]
  ? P extends [...infer Rest2]
  ? [Rest, Rest2]
  : []
  : [];

type res5 = Zip<tuple1, tuple2>;
type res6 = Expand<[tuple1, tuple2]>;
type res7 = [Expand<tuple1>, Expand<tuple2>];

type Zip2<One extends [unknown, unknown], Other extends [unknown, unknown]> = One extends [
  infer OneFirst,
  infer OneSecond
]
  ? Other extends [infer OtherFirst, infer OtherSecond]
  ? [[OneFirst, OtherFirst], [OneSecond, OtherSecond]]
  : []
  : [];

type res8 = Zip2<tuple1, tuple2>;

// ?合并任意个数 【递归、剩余参数】

type ZipPlus<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer Rest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
  ? [[OneFirst, OtherFirst], ...ZipPlus<Rest, OtherRest>]
  : []
  : [];

type Zip2Result = ZipPlus<[1, 2, 3, 4, 5], ["guang", "dong", "is", "best", "friend"]>;

/**
 * ! 一、数组、字符串、函数等类型的重新构造
 * ? 2.字符串
 */

// ?首字转大写

type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : Str;

type res9 = CapitalizeStr<"raotaohub">;

// ? 实现 rao_tao_hub 到 raoTaoHub 的变换。
type CamelCase<Str extends string> = Str extends `${infer First}_${infer Second}${infer Rest}`
  ? `${First}${CapitalizeStr<Second>}${CamelCase<Rest>}`
  : Str;

type res10 = CamelCase<"rao_tao_hub">;

// ?删除其中一段子串

type DropSubStr<
  Str extends string,
  Delete extends string
  > = Str extends `${infer Prefix}${Delete}${infer Subfix}`
  ? DropSubStr<`${Prefix}${Subfix}`, Delete>
  : Str;

type res11 = DropSubStr<"~~~rao~~tao~hub~~~", "~">;

/**
 * ! 一、数组、字符串、函数等类型的重新构造
 * ? 3.函数
 */

type AppendArgument<F extends Function, AppendArg> = F extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, AppendArg]) => ReturnType
  : never;

type res12 = AppendArgument<(a: string, b: string) => string, boolean>;

/**
 * ! 二、索引类型的重新构造
 */

type O = {
  a: string;
  b: number;
  gender: boolean;
};

type Mapping<O extends object> = {
  [Key in keyof O]: O[Key];
};

type res13 = Mapping<O>;

// ? 映射的过程中可以对 value key 做修改

// ? 1. 对 key 做修改 （as 重映射 的使用）
type UppercaseKey<O extends object> = {
  [Key in keyof O as CapitalizeStr<Key & string>]: O[Key];
};

type res14 = UppercaseKey<O>;

// ? 2. 对 value 做修改
// #

// ? 创建索引类型
type MyRecord<Key extends number | string | symbol, Val> = {
  [P in Key]: Val;
};
type IAllProps = MyRecord<string, any>;
type IMapType = MyRecord<number, string>;

// 只读
type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};
type res15 = ToReadonly<O>;

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

type res16 = ToMutable<O>;

// 过滤

type FilterByValType<O extends Record<string | number | symbol, any>, ValType> = {
  [Key in keyof O as ValType extends O[Key] ? Key : never]: O[Key];
};

type res17 = FilterByValType<O, string | number>;

// 从类型定义的属性中，选取指定一组属性，返回一个新的类型定义。
type My_Pick<O extends object, T extends keyof O> = {
  [K in T]: O[K];
};

type res18 = My_Pick<O, "gender">;
type res19 = MyPick<O, "gender">;

// Omit 排除指定属性

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type res20 = Exclude<"a" | "b" | "gender", "c">;
type res21 = Exclude<"a" | "b" | "gender", "b">; // 排除 b 剩余 a
type res22 = Pick<O, "a" | "gender">; // 挑选出 a 来构建新的映射类型
type res23 = MyOmit<O, "b">;
type res26 = Omit<O, "b">;

type MyOmit2<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? Key : never]: T[Key];
};

type res24 = MyOmit<O, "b">;

const statusConfig = {
  normal: 0,
  freeze: 1,
  block: 2
} as const;

type ValueOf<T> = T[keyof T];
type StatusVal = ValueOf<typeof statusConfig>;
