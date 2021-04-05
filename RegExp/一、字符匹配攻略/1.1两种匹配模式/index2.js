/**
 * !2.纵向匹配模式 [abc] 意味着具体到 某一位字符 可以是多种情况的
 * @description g是全局匹配 强调 所有！ 而不是第1个
 */

var reg = /a[123]b/g; // ?第1个字符是 "a" 第2个可以是 "1" "2" "3" 其中1个，第3个是 "b"

var string = 'a0b a1b a2b a3b a4b';

/**
 *@match方法 匹配支持匹配的字符串或对象，并返回包含该搜索结果的数组；如果找不到匹配项，则返回null
 *
 */
console.log(string.match(reg)); // => [ 'a1b', 'a2b', 'a3b' ]
