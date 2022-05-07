/*
 * webpack 的入口文件
 * webpack ./src/index.js -o ./build/main.js --mode=development 4.x版本
 * ==>  webpack --entry ./src/index.js -o ./build --mode=development 5.x版本
 *
* */

function add(a,b){
  return a+b
}

console.log(add(1,2))

/*
try{
  console.log(name) // ReferenceError: age 没有定义
  let name = 'rao'
}catch(err){
  console.log(err)
}
/*
*  Cannot access 'name' before initialization
* */
