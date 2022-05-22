type KebabCaseToCamelCase<Str extends string> = Str extends `${infer Case}-${infer Rest}`
  ? `${Case}${KebabCaseToCamelCase<Capitalize<Rest>>}`
  : Str;

type camelcase = KebabCaseToCamelCase<"aa-bb-cc">;
export {};
