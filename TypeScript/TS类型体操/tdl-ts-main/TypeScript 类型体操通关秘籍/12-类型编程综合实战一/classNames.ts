type Join<T extends string, K extends string = ","> = T extends `${infer S}${infer R}`
  ? R extends ""
    ? S
    : `${S}${K}${Join<R, K>}`
  : "";

type join = Join<"aaaaa", "=">;

type UnionToInstersection<U> = (U extends any ? (x: U) => any : never) extends (x: infer R) => any
  ? R
  : never;

type LastInUnion<U> = UnionToInstersection<U extends any ? (x: U) => 0 : never> extends (
  x: infer L
) => 0
  ? L
  : never;
