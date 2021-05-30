const count: number = 918

// number string null boolean void symbol  这些数据基础静态类型

// 1、对象类型
const xiaojiejie: {
  name: string
  age: number
} = {
  name: '大脚',
  age: 18,
}

// 2、数组类型
// 声明xiaojiejies 类型是数组  数组里必须是字符串
const xiaojiejies: string[] = ['大小', 'nihao', '😀小红']

// 3、类类型 规定该变量为 Person 的一个实例
class Person {}
const xiaohong: Person = new Person()

// 4、函数类型 规定该函数返回值为 字符串
const jianXiaoJieJie: () => string = () => '大脚'

export {}
