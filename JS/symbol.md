## Symbol()

创建一个 symbol

```js
Symbol("ha") === Symbol("ha"); // false
```

## Symbol.for()

来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol

```js
Symbol.for("lolo") === Symbol.for("lolo"); // true
```

对象的属性可以是 string 也可以是 symbol

> 实际应用 react 、easy-modal-react

```js
let A = {}

A[Symbol('aa')] = 'a1'
A[Symbol('aa')] = 'a2'

{
	Symbol(aa): "a1",
	Symbol(aa): "a2"
}
```

## Object.getOwnPropertySymbols()

**`Object.getOwnPropertySymbols()`** 方法返回一个给定对象自身的所有 Symbol 属性的数组。

```
Object.getOwnPropertySymbols(obj)
```

[12. Symbol - 《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》 - 书栈网 · BookStack](https://www.bookstack.cn/read/es6-3rd/docs-symbol.md)

## Symbol()

创建一个 symbol

```js
Symbol("ha") === Symbol("ha"); // false
```

## Symbol.for()

来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol

```js
Symbol.for("lolo") === Symbol.for("lolo"); // true
```

对象的属性可以是 string 也可以是 symbol

```js
let A = {}

A[Symbol('aa')] = 'a1'
A[Symbol('aa')] = 'a2'

{
	Symbol(aa): "a1",
	Symbol(aa): "a2"
}
```

## Object.getOwnPropertySymbols()

**`Object.getOwnPropertySymbols()`** 方法返回一个给定对象自身的所有 Symbol 属性的数组。

```
Object.getOwnPropertySymbols(obj)
```

[12. Symbol - 《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》 - 书栈网 · BookStack](https://www.bookstack.cn/read/es6-3rd/docs-symbol.md)
