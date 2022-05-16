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
export {};
