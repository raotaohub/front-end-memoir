let reg = /a[12345]b/g

let str = 'ab a1b a2b a3b a4b a5b a6b'

console.log(str.match(reg))

/* 
    1. 范围表示法
    2. 排除范围法
 */

let reg2 = /a[0-9]b/g

let reg3 = /a[^0-9]b/g