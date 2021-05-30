// 联合类型 变量类型可能是两种以上 

// 两种保护 断言方式 in操作符方式 typeof判断方式 instanceof方式

function add(first: string | number, second: string | number) {
  // 判断一下类型
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`
  }
  return first + second
}

function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"
console.log(padLeft("Hello world", 45))