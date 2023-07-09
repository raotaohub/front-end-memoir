```js
// bad 已经抛出错误 就不要使用 return来返回了
function foo() {
  return throw xx;
}

// good
function foo() {
  throw xx;
}

function foo() {
  throw new Error("xx");
  throw new Error("xx");
  throw new AggregateError("xx");
  throw new EvalError("xx");
  throw new InternalError("xx");
  throw new RangeError("xx");
  throw new ReferenceError("xx");
  throw new SyntaxError("xx");
  throw new TypeError("xx");
  throw new URIError("xx");
}
```

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error
