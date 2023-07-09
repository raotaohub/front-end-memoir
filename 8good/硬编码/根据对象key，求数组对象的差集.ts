/**
 * @description: 根据对象的key，求数组对象的差集
 * @param {any} arr1
 * @param {any} arr2
 * @param {string} keyName
 * @return {{any:any}[]} 差集数组对象
 */
export function getDifferenceSet(arr1: any, arr2: any, keyName: string) {
  return Object.values(
    arr1.concat(arr2).reduce((acc: any, cur: any) => {
      if (acc[cur[keyName]] && acc[cur[keyName]][keyName] === cur[keyName]) {
        delete acc[cur[keyName]]
      } else {
        acc[cur[keyName]] = cur
      }
      return acc
    }, {})
  )
}
