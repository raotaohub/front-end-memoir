TypeScript
类型
number object null undefined unknown void never (元组) enum(枚举) any
unknown
unknown(不可预见类型) 在很多场景下可以避免使用 any 作为函数的参数类型而导致的静态类型检查 bug
function testUnknown(input: unknown): number {
if (Array.isArray(input)) {
return input.length // 类型被推断为 array 类型
}
return input.length // 这里的 input 还是 unknown,如果入参类型是 any,则会放弃检查直接成功
}
元组
const tuple = () => {
const a = '1'
const b = 2
return [a, b] as const // 不断言的话返回的是一个元组
}
const [a, b] = tuple() // 不断言的话 a 的类型为 string | number
枚举
export enum PLATFORM {
FHD = 'fhd',
FXG = 'fxg',
}
接口
interface User{
name: string
age?: number
readonly userId: string // 只能在对象刚刚创建的时候修改值
}
可索引类型
interface Props {
[prop: string]: string | number
}
类实现接口
export class PeopleA implements User {
name: string
readonly age: number
readonly userId: string
constructor(user: User) {
this.name = user.name
this.age = user.age
this.userId = user.userId
}
}
继承接口
interface Man {
age: number
}
interface User extends User, Man {
id: string
}
类
class People{
public name: string // 只能在类的内部访问
private age: number
constructor(uName: string, uAge: number) {
this.name = uName
this.age = uAge
}
}
抽象类
export abstract class TemplateHandle<P extends any, T extends IExpressTmeplate & ISendTemplate> {
template: T
abstract readonly fontInfo: FontInfo
// 抽象方法,必须在派生类中实现
abstract init(initTemplate: P, isEdit: boolean): void
}
泛型
泛型函数
const intersection = <T>(a: T[], b: T[]) => {
const s = new Set(b)
return a.filter(x => s.has(x))
}
泛型接口
export interface ReturnValue<T extends any[]> {
run: (...args: T) => void
cancel: () => void
}
泛型类
class Cat<T> {
private type: T
constructor(type: T) {
this.type = type
}
}
const cat = new Cat('dog') // 推断为 Cat<string>
泛型工具
Partial
// 将泛型中全部属性变为可选
type Partial<T> = {
[key in keyof T]?: T[key]
}
type partialUser = Partial<User>
Record
// 将 K 中所有属性值转化为 T 类型
type Record<K extends keyof any, T> = {
[key in K]: T
}
Pick
// 从泛型对象中提取健值对类型
type Pick<T, K extends keyof T> = {
[P in K]: T[P]
}
const user: Pick<User, 'name' | 'age'> = { name: 'rowesy', age: 18 }
Omit<T,K>
// 从泛型对象 T 中过滤包含 K 的健值对
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
const omitUser: Omit<User, 'name' | 'age'> = {
userId: '10001',
say: (what: string) => {
console.log(what)
}
}
Exclude<T,U>
// 在 T 类型中,去除 T 类型和 U 类型的交集,返回剩余的部分
type Exclude<T, U> = T extends U ? never : T
type T1 = Exclude<'a' | 'c', 'a' | 'b'> // "c"
type T2<T> = Exclude<string | number | Array<T>, Array<T>>
Required
// 将泛型中全部属性变为必选的
type Required<T> = {
[P in keyof T]-?: T[P]
}
type requiredUser = Required<User>
Readonly
// 将泛型中全部属性变为只读
type Readonly<T> = {
readonly [P in keyof T]: T[P]
}
const readonlyUser: Readonly<Partial<User>> = {
name: 'rowesy'
}
运算符
空值合并运算符 ??
??与||的功能相似，区别在于 ?? 在左侧表达式结果为 null 或者 undefined 时，才会返回右侧表达式 const a = undefined ?? 0 // 0
数字分隔符 \_
const num = 1_2_3.4_5_6 // 最终编译为 123.456
操作符
Keyof
keyof 可以获取一个类型所有键值，返回一个联合类型
type User = {
name: string
age: number
}
type UserKey = keyof User // 'name' | 'age'
// keyof 的一个典型用途是限制访问对象的 key 合法化
const getValue = (p: User, k: keyof User) => {
return p[k]
}
typeof
typeof 是获取一个对象/实例的类型, 只能用在具体的对象上
const rowesy: User = { name: 'rowesy', age: 18 }
type T = typeof rowesy // { name: string, age: number }
const me: T = { name: 'me', age: 18 }
// typeof 可以和 keyof 一起使用，用来获取对象键集合
type UserKey = keyof typeof rowesy // "name" | "age"
遍历属性 in
in 只能用在类型的定义中，可以对枚举类型进行遍历
type Partial<T> = {
[key in keyof T]?: T[key]
}
