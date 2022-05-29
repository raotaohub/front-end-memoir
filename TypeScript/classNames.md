```ts
/**
 * @param args any[]
 */

// 处理对象类型
type KeyToString<T extends string, U extends string = T> = [T] extends [never]
  ? ""
  : U extends U
  ? `${KeyToString<Exclude<T, U>>}${U}`
  : never;

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

type FilterByValType<O extends Record<string, any>, ValType> = {
  [Key in keyof O as ValType extends O[Key] ? never : Key]: O[Key];
};

type GetObjectKeysString<T, U = FilterByValType<T, false>> = T extends Record<string, any>
  ? LastInUnion<Join<KeyToString<keyof U & string>, " ">>
  : never;

type obj = GetObjectKeysString<{ a: "1"; c: "1"; b: false }>; // test

// 处理数组类型
type ToStringByStrOrNumTuple<A extends readonly unknown[], Str extends string = ""> = A extends [
  infer First,
  ...infer Other
]
  ? First extends number | string
    ? ToStringByStrOrNumTuple<[...Other], `${Str} ${First}`>
    : Str
  : Str;

type array = ToStringByStrOrNumTuple<["a", "b", "c", 1, 2, 3, false, undefined, null, symbol]>;

// 处理各类型参数
type ParseArg<T> = T extends object
  ? GetObjectKeysString<T>
  : T extends unknown[]
  ? ToStringByStrOrNumTuple<T>
  : T extends number | string
  ? `${T}`
  : "";

type parse = ParseArg<{ a: "1"; b: false; c: true }>;
type MergeValue<A extends string = "", B extends string = ""> = `${A} ${B}`;

type res4 = MergeValue<obj, array>;

// 合并返回值

type ClassNames<P extends ArrayLike<unknown>, Result extends string = ""> = P extends [
  infer Args,
  ...infer Rest
]
  ? ClassNames<Rest, MergeValue<Result, ParseArg<Args>>>
  : Result;

type class1 = ClassNames<[{ a: "1"; b: false; d: true }, 1, "2"]>;

const classNames = <T = unknown[] | Record<string, any> | number | string>(
  ...args: T[]
): ClassNames<T[]> => {
  const classes = [];

  for (const arg of args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length > 0) {
        const inner = classNames(...arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (const key in arg) {
          if ({}.hasOwnProperty.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
};

const c = classNames("3", { a: false, b: "2", c: true });
console.log(classNames({ a: false, b: "2", c: true }, "3"));
const obj = { a: false, b: "2", c: true };
type o = keyof typeof obj;

// export default classNames
```
