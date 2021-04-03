let reg = /good|nice/g

// 分支匹配的问题

let reg2= /good|goodbye/g

let str2 = 'goodbye'

console.log(str2.match(reg2)) // => ['good']


/* 
 !分支匹配的问题
 字符串中明明是 goodbye 但是匹配结果是 good
 !分析
 分支匹配是惰性的 p1|p2|p3 
 当 p1 匹配成功就不匹配 p2 了
 !解决方案👇将更希望被匹配的放在前面
*/
let reg3 = /goodbye|good/g

let str3 = 'goodbye'

console.log(str3.match(reg3)) // => ['goodbye']