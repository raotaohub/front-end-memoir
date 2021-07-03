let reg = /饶韬/g
let count = 0

console.log(reg.exec('饶韬，啊啊啊饶韬。11231.胃容物饶韬。'))
while ((res = reg.exec('饶韬，啊啊啊饶韬。11231.胃容物饶韬。'))) {
  count++
  console.log(count)
}

let result = reg.test('飒飒请饶韬')
console.log(result);
