/*
 * @Author: raotaohub
 * @Date: 2022-05-03 15:14:26
 * @LastEditTime: 2022-05-28 22:32:30
 * @LastEditors: raotaohub
 * @FilePath: \TypeScript\TS类型体操\tdl-ts-main\TypeScript 类型体操通关秘籍\04-类型运算符\index.ts
 * @Description:
 */

/**
 * !交叉：&
 *  */
type one = string;
type two = number;
type Cross = one & two; //  never 交叉类型将不同类型舍弃 两个类型相同，交叉之后得到 never

type one1 = string;
type two1 = string;
type Cross1 = one1 & two1; //  string 同类型合并 两个类型相同，交叉之后得到该类型

/**
 * !联合：|
 *  */

/**
 **条件：extends ? : 和 inter 推导 */
type First<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? T : never;
type Last<Tuple extends unknown[]> = Tuple extends [...infer R, infer T] ? T : never;

type first = First<[1, 2, 3]>;
type last = Last<[1, 2, 3]>;

type Func = () => first;

type Test = ReturnType<Func>;

type ExcludeFirst<Tuple extends unknown[]> = Tuple extends [infer T, ...infer R] ? R : never;
type ExcludeLast<Tuple extends unknown[]> = Tuple extends [...infer R, infer T] ? R : never;

type excludeFirst = ExcludeFirst<[1, 2, 3]>;
type excludeLast = ExcludeLast<[1, 2, 3]>;

/**
 * !映射类型 可用于索引类型 object 和 class
 */

type MapType<T> = {
  [Key in /*遍历类型*/ keyof /*索引查询*/ T]: T[Key] /*索引访问*/;
};

const obj = { a: 1, b: 2, c: 3 };
type res1 = keyof typeof obj;
type res = MapType<{ a: string; b: number; c: boolean }>;

type MapTypeKeyx3<T> = {
  [key in keyof T as `${
    key & string /*通过交叉类型同类合并，异类舍弃，只留下string类型的key*/
  }${key & string}${key & string}`]: [T[key], key];
};

type result = MapTypeKeyx3<{ a: string }>;

/**
 * !typeof 获取值的类型 （右侧是1个值）
 */

type res2 = Partial<Readonly<typeof obj>>;

/**
 * !keyof 获取可索引类型的 键 （右侧是1个类型）
 * 相关文章：
 * https://mp.weixin.qq.com/s/TZAJ3YUiPwWFxZTB8Le3vw
 */

type res3 = keyof res2;

// ?分布式类型 https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;

// *如果想要解决这个问题 可以使用 元组包裹

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type StrArrOrNumArr2 = ToArrayNonDist<string | number>;

type PNonDist<T> = [T] extends ["x"] ? 1 : 2;
/**
 * type A4 = 2;
 */
type A4 = PNonDist<"x" | "y">;

export {};
