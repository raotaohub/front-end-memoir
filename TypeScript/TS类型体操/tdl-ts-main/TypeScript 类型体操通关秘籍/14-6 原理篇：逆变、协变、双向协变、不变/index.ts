// !协变（covariant） 子类型 赋值给 父类型

interface Person {
  name: string;
  age: number;
}

interface Guang {
  name: string;
  age: number;
  hobbies: string[];
}

let person = {} as Person; // ?父类型
let guang = {} as Guang; // ?子类型

person = guang;

// !逆变（contravariant） 父类型 赋值给 子类型

let printHobbies: (guang: Guang) => void;

printHobbies = (guang) => {
  //   console.log(guang.hobbies);
};

let printName: (person: Person) => void;

printName = (person) => {
  //   console.log(person.name);
};

printHobbies = printName; // WTF 这里父类型赋值给了子类型 不警告
printHobbies(person); // error
printHobbies(guang); // WTF 是因为在调用的时候，依旧按照 printHobbies 的定义来约束函数参数

// 这就是逆变，函数的参数有逆变的性质

printName = printHobbies;
printName(person);
printName(guang);

//

type res = "1" | "2" extends "1" | "2" | "3" ? true : false;

// !为了更严格的保证类型安全，ts 添加了 strictFunctionTypes 的编译选项，开启以后函数参数就只支持逆变，否则支持双向协变。

// !不变（invariant）

export {};
