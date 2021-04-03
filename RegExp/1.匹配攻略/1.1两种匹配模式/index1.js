/**
 * !1.横向匹配模式 {m,n} 意味着长度不确定 可以是多种情况
 * @description g是全局匹配 强调 所有！ 而不是第1个
 */
var reg = /hello/;

console.log(reg.test('hello world'));

var reg = /ab{2,5}c/g; // ? 第1个字符是 "a" 接下来是2到5个 "b" 最后是 "c"
var string = 'abc abbc abbbc abbbbc abbbbbc abbbbbbc';
console.log(string.match(reg)); // => ["abbc", "abbbc", "abbbbc", "abbbbbc"]
