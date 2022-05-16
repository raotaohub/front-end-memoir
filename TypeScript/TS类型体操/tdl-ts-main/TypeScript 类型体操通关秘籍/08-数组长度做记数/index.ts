/**
 * ! 1.TypeScript 不支持直接进行加减乘除运算，但是可以通过数组的长度模拟类似的运算。
 */

type BuildArray<
  Length extends number,
  Val = unknown,
  Result extends unknown[] = []
> = Result["length"] extends Length ? Result : BuildArray<Length, Val, [Val, ...Result]>;

type getArrayLength<A extends unknown[]> = A["length"];

type array = BuildArray<4, 4>;
type length = getArrayLength<array>;

// ?加法
type Add<N1 extends number, N2 extends number> = getArrayLength<
  [...BuildArray<N1>, ...BuildArray<N2>]
>;

type add = Add<1, 1>;

// ?减法
// 3 - 1 = 2

type Subtrac<N1 extends number, N2 extends number> = BuildArray<N1> extends [
  ...BuildArray<N2>,
  ...infer Rest
]
  ? getArrayLength<Rest> // 被减去的项 +  剩余的项 = N1 那么剩余的项的数量就是N1-N2的结果
  : never;

// [ unknown , unknown , unknown ] extends [...[ unknown , unknown ], unknown ] ? [unknown]['length'] : never
type subtrac = Subtrac<3, 2>;

// ?乘法
// (2 * 5 = 10)  === ( 5 + 5 = 10 ) === ( 2 + 2 + 2 + 2 + 2 = 10 )
type Multipli<
  Multiplier extends number,
  Base extends number,
  Result extends unknown[] = []
> = Multiplier extends 0
  ? getArrayLength<Result>
  : Multipli<Subtrac<Multiplier, 1>, Base, [...Result, ...BuildArray<Base>]>;

type multipli = Multipli<2, 5>;

// 6 / 2 = 3   === ( 6 - 2 - 2 - 2 === 0 则 2 的出现次数 为除数)
type Division<
  Divide extends number,
  R extends number,
  Result extends unknown[] = []
> = Divide extends 0
  ? getArrayLength<Result>
  : Division<Subtrac<Divide, R>, R, [unknown, ...Result]>;

type division = Division<6, 2>;

// ?字符串计数

type getStrLength<
  Str extends string,
  Result extends unknown[] = []
> = Str extends `${infer First}${infer Rest}`
  ? getStrLength<Rest, [First, ...Result]>
  : getArrayLength<Result>;

type res = getStrLength<"012345">;

// ?比较

type GreaterThan<
  N1 extends number,
  N2 extends number,
  CountRes extends unknown[] = []
> = N1 extends N2 // n1 === n2
  ? false
  : CountRes["length"] extends N2
  ? true
  : CountRes["length"] extends N1
  ? false
  : GreaterThan<N1, N2, [...CountRes, unknown]>;

// 2 extends 1 ? false : []['length'] extends 1 ? true : []['length'] extends 1 ? false : GreaterThan<2,1[unknown]>
// 2 extends 1 ? false : [unknown]['length'] extends 1 ? true : [unknown]['length'] extends 1 ? false : GreaterThan<2,1[unknown,unknown]>

type res2 = GreaterThan<2, 1>;
export {};
