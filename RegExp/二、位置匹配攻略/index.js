const str = '     rao tao[]hub[],123dd';
const reg = /^\s+|\s+$/g;
const result = str.replace(reg, function (word) {
  return word.toUpperCase();
});
console.log(result);

var res = 'my name is echo'.replace(/(^|\s)\w/g, function (word) {
  return word.toUpperCase();
});
console.log(res); //My Name Is Echo
