/*
 * @Author: raotaohub
 * @Date: 2022-05-28 12:58:55
 * @LastEditTime: 2022-05-28 22:53:58
 * @LastEditors: raotaohub
 * @FilePath: \TypeScript\TS类型体操\tdl-ts-main\TypeScript 类型体操通关秘籍\13-类型编程综合实战二\index.ts
 * @Description: 函数重载的三种写法
 */

import { UnionToIntersection } from "../10-特殊特性要记清";

// ? 一 声明
declare function func1(name: string): string;
declare function func1(name: number): number;

// ? 二 接口

interface Func2 {
  (name: string): string;
  (name: number): number;
  a: 1; // ?函数的静态属性
}

declare const func2: Func2;

// ? 三  取交叉类型

type Func3 = ((name: string) => string) & ((name: number) => number);

declare const func3: Func3;

type res = ReturnType<typeof func3>;

// 联合转交叉 拿到联合类型的最后一个类型：

type UnionToFuncIntersection<T> = UnionToIntersection<T extends any ? () => T : never>;

type res2 = ReturnType<UnionToFuncIntersection<"1" | "2">>;

type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
  : [];

type res3 = UnionToTuple<keyof { a: "1"; b: "2"; c: "3" }>;
export {};
