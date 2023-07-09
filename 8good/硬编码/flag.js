/**
 * @description: 数组扁平
 * @param {*} array
 * @return {*}
 */
function flag(array) {
  let result = [];

  function flag(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] instanceof Array) {
        flag(array[i]);
      } else {
        result.push(array[i]);
      }
    }
  }

  flag(array);
  return result;
}
