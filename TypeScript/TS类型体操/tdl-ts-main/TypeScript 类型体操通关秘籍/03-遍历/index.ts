// !interface | object | class 索引类型的遍历

type myReadonly<T extends {}> = {
  readonly [Key in keyof T]: T[Key];
};

type res1 = myReadonly<{ a: string; b: string }>;

// !array 数组类型的遍历

const tuple = ["a", "b", "c"] as const;

type ArrayToObject<A extends readonly (number | string | symbol)[]> = {
  [P in A[number]]: P;
};

type res2 = ArrayToObject<typeof tuple>;

// !string 的遍历
/* type res2 = {
  a: "a";
  b: "b";
  c: "c";
} */

type foreachString<T extends string, R extends unknown[] = []> = T extends `${infer F}${infer Rest}`
  ? foreachString<Rest, [...R, F]>
  : R;

type res3 = foreachString<'1234567'>
export { };
