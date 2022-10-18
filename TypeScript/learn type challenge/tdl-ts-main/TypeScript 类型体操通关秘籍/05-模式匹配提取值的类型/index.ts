// 提取返回值
type p = Promise<string>;

type GetValueType<P> = P extends Promise<infer value> ? value : never;

type result = GetValueType<p>;

/**
 * !数组
 */
// 提取数组第1个元素的类型

type GetArrayFirstType<A extends unknown[]> = A extends [infer First, ...unknown[]] ? First : never;
// type GetArrayFirstType<A extends unknown[]> = A extends [infer First, ...infer T] ? First : never;

type result1 = GetArrayFirstType<[1, "2", []]>;

// 提取数组第1个元素的类型

type GetArrayLastType<A extends unknown[]> = A extends [...unknown[], infer Last] ? Last : never;
// type GetArrayLastType<A extends unknown[]> = A extends [...infer T, infer Last] ? Last : never;

type result2 = GetArrayLastType<[1, "2", []]>;

// 提取除第1个元素外的类型
type GetExcludeFirstType<A extends unknown[]> = A extends []
  ? []
  : A extends [infer F, ...infer T]
  ? T
  : never;

type ShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;

type result3 = GetExcludeFirstType<[1, "2", []]>;

// 提取除最后1个元素外的类型
type GetExcludeLastType<A extends unknown[]> = A extends []
  ? []
  : A extends [...infer T, infer F]
  ? T
  : never;

type PopArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer Rest, unknown]
  ? Rest
  : never;

type result4 = GetExcludeLastType<[1, "2", []]>;

/**
 * !字符串
 */

type startWith<Str extends string, Pirfix extends string> = Str extends `${Pirfix}${string}`
  ? true
  : false;

type result5 = startWith<"raotaohub-abc", "raotaohub">;

type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Pirfix}${From}${infer Suffix}` ? `${Pirfix}${To}${Suffix}` : Str;

type result6 = ReplaceStr<"raotaohub-abc", "hub", "pbc">;

type TrimStrLeft<Str extends string> = Str extends `${" " | "\n" | "\t"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${" " | "\n" | "\t"}`
  ? TrimStrRight<Rest>
  : Str;
type TrimStr<Str extends string> = TrimStrLeft<TrimStrRight<Str>>;

type result7 = TrimStr<"\t\n\t\n             \n\t\n\t哈哈哈\t\n\t\n             \n\t\n\t">;

/**
 * !函数
 */
// 提取函数参数类型
type GetParamType<F extends Function> = F extends (...args: infer Args) => unknown ? Args : never;

type Func = (a: string, b: number, c: boolean) => boolean;
type result8 = GetParamType<Func>;
type result9 = ReturnType<Func>;

type GetReturnType<F extends Function> = F extends (...args: any) => infer R ? R : never;
type result10 = GetReturnType<Func>;

class Dong {
  name: string;

  constructor() {
    this.name = "dong";
  }

  hello(this: Dong, a: string) {
    return "hello, I'm " + this.name + a;
  }
}

type GetThisParameterType<F extends Function> = F extends (
  this: infer ThisType,
  ...args: any[]
) => unknown
  ? ThisType
  : unknown;
const dong = new Dong();

type result11 = GetThisParameterType<Dong["hello"]>;

dong.hello("rao");
// dong.hello.call({ name: 'tao' }, ''); //  类型 "{ name: string; }" 中缺少属性 "hello"，但类型 "Dong" 中需要该属性

/**
 * !构造器
 */
/* declare class Hello {} // ts(7009) 解决方案
function Hello(this: any) {
  this.name = 'name';
}
const hello = new Hello(); */

interface Person {
  name: string;
}
interface PersonConstructor {
  new (name: string): Person; // ?构造器类型可以用 interface 声明，使用 new(): xx 的语法。
}
// 提取构造函数返回值类型
type GetInstanceType<ConstructorType extends new (...args: any) => any> =
  ConstructorType extends new (...args: any) => infer InstanceType ? InstanceType : any;

type result12 = GetInstanceType<PersonConstructor>;

// 提取构造函数参数类型
type GetConstructorParameters<ConstructorType extends new (...args: any) => any> =
  ConstructorType extends new (...args: infer T) => any ? T : never;

type result13 = GetConstructorParameters<PersonConstructor>;
export {};

// ?索引类型

type GetRefProps<P> = "ref" extends keyof P
  ? P extends { ref?: infer Value | undefined }
    ? Value
    : never
  : never;
