class Lady {
    content = "hi , 帅哥";

    sayHello() {
        return this.content;
    }
}

// 继承类 用 extends 关键字

class XiaoJieJie extends Lady {
    sayLove() {
        return "I love you";
    }

    // 也可以重写父类里的方法 也可以通过 super 关键字 调用父类里的sayHello
    sayHello() {
        return "hi honey!" + super.sayHello() + ",你们好呀";
    }
}

// 子类里 继承了 父类的方法和属性

let xiaojiejie = new XiaoJieJie();

console.log(xiaojiejie.sayLove());
console.log(xiaojiejie.sayHello());

/**************************************              类的3种访问类型            **************************************/
// public private protected

// 类的内部 花括号之内
class Person {
    /**************************************              public            **************************************/

    public name: string; //公用的 类的内外部都可以调用
    /**************************************              private            **************************************/

    private age: number; //私有的 只允许在类的内部使用 外部不可以使用

    readonly school: string; // 受保护的 可以在继承中的类使用 外部不可以使用

    protected sayHello() {
        /**************************************              protected            **************************************/

        console.log(this.name + "say Hello !");
    }
}

class Teacher extends Person {
    name = "我是老师";

    public sayCall() {
        /**************************************              protected            **************************************/

        // 可以在继承中的类使用 外部不可以使用
        this.sayHello();
    }
}

const person = new Person();
const person2 = new Teacher();
person2.sayCall();

/**************************************              类的构造函数            **************************************/

// 就是说 类在初始化的时候 自动执行一个方法 constructor()
class Dog {
    public name: string;

    // 构造函数 要求传递一个 name
    constructor(name: string) {
        this.name = name;
    }

    // 可以简化写法 constructor(public name: string)
}

// constructor的继承怎么写？

class oldDog extends Dog {
    constructor(public age: number) {
        // 若要继承父类的 constructor 必须调用 super()
        super("wanwan");
    }
}

// 创建实例的时候 要求传递一个name
const dog = new Dog("jspang");
console.log(dog.name);

const olddog = new oldDog(7);
console.log(olddog.name);
console.log(olddog.age);

/**************************************              类的Getter 和Setter            **************************************/

class Single {
    private _instance: any;

    get instance() {
        return this._instance;
    }

    set instance(ins) {
        this._instance = ins;
    }
}

export {};
