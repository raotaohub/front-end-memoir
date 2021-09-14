let reg = /ab{1,3}?c/g

let str = 'ab abbc abbbc abbbbc'

console.log(str.match(reg))

let reg2 = /ab?c/g

let reg3 = /ab+c/g

let reg4 = /ab*c/g
