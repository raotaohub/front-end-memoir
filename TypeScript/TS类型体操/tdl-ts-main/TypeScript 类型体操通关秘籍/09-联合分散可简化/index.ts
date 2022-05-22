// !分布式条件类型

type Union = "a" | "b" | "c";
type UpercaseA<T extends string> = T extends "a" ? Uppercase<T> : T;

type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

type union = IsUnion<1 | 2>;

// 合并计算结果
type res = UpercaseA<Union>;

// 实现驼峰字符串

type Camelcase<Str extends string> = Str extends
  | `${infer Left}_${infer Right}${infer Rest}`
  | `${infer Left}-${infer Right}${infer Rest}`
  ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
  : Str;

type camelcase = Camelcase<"hello_world_hello">;

// BEM

type BEM<
  Blok extends string,
  Element extends string[],
  Modifer extends string[]
> = `${Blok}__${Element[number]}--${Modifer[number]}`;

type textBem = BEM<"text", ["value", "name"], ["success", "warning"]>;

// ? 取出 keyof

type KeyToString<T extends string, U extends string = T> = [T] extends [never]
  ? ""
  : U extends U
  ? `${KeyToString<Exclude<T, U>>}${U}`
  : never;

type k = KeyToString<keyof res24>;
type k2 = KeyToString<keyof res24>;

type Join<T extends string, K extends string = ","> = T extends `${infer S}${infer R}`
  ? R extends ""
    ? S
    : `${S}${K}${Join<R, K>}`
  : "";

type UnionToIntersection<U> = (U extends any ? (x: U) => any : never) extends (x: infer R) => any
  ? R
  : never;

type LastInUnion<U> = UnionToIntersection<U extends any ? (x: U) => 0 : never> extends (
  x: infer L
) => 0
  ? L
  : never;

type s = LastInUnion<Join<KeyToString<keyof { a: "1"; b: "2" }>, " ">>;

export {};
