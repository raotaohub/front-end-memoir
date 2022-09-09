// ?字符串类型
// 横杠转驼峰
type KebabCaseToCamelCase<Str extends string> = Str extends `${infer Case}-${infer Rest}`
  ? `${Case}${KebabCaseToCamelCase<Capitalize<Rest>>}`
  : Str;

type camelcase = KebabCaseToCamelCase<"aa-bb-cc-dd">;

// 驼峰转横杠
type CamelCaseToKebabCase<Str extends string> = Str extends `${infer Case}${infer Rest}`
  ? Case extends Lowercase<Case> // 关键点在这 通过大小写 来判断是否是驼峰的分界
  ? `${Case}${CamelCaseToKebabCase<Rest>}`
  : `-${Lowercase<Case>}${CamelCaseToKebabCase<Rest>}`
  : Str;

type kebabcase = CamelCaseToKebabCase<camelcase>;

// ?数组类型

type Chunk<
  A extends unknown[],
  ChunkLen extends number = 1,
  Item extends unknown[] = [],
  Result extends unknown[] = []
  > = A extends [infer Val, ...infer Rest]
  ? Item["length"] extends ChunkLen
  ? Chunk<Rest, ChunkLen, [Val], [...Result, Item]> // 如果 Item 已经满足 Chunlen，那么把 Item 加入结果数组
  : Chunk<Rest, ChunkLen, [...Item, Val], Result> // 如果 Item 没有满足，那么继续构建 Item
  : [...Result, Item];

type chunk = Chunk<[1], 3>;

// ?索引类型
/* 
[‘a’, ‘b’, ‘c’]
=>
{
  a: {
      b: {
          c: 'xxx'
      }
  } 
}
*/

//* type a = keyof any =>  type a = string | number | symbol 取当前支持索引支持的类型

type TupleToNestedObject<T extends unknown[], V> = T extends [infer Val, ...infer Rest]
  ? {
    [Key in Val as Key extends keyof any ? Key : never]: Rest extends unknown[]
    ? TupleToNestedObject<Rest, V>
    : V;
  }
  : V;

type t = TupleToNestedObject<["a", "b", "c"], "xxx">;


type StringToTuple<S extends string, Res extends never[] = []> = S extends `${infer F}${infer Rest}` ? StringToTuple<Rest, [...Res, F]> : Res

type TupleToUn<T extends unknown[], V = never> = T extends [infer Val, ...infer Rest]
  ? TupleToUn<Rest, Val | V>
  : V;

type t3 = TupleToUn<StringToTuple<'wertyuzcns'>>;


export { };
