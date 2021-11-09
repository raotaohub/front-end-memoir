// User 是一个构造器函数
function User<T extends string, R extends number>(name: T, age: R, career: R, work: R) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}
// 工厂函数
function Factory(name, age, career) {
    let work;
    switch (career) {
        case "coder":
            work = ["写代码", "写系分", "修Bug"];
            break;
        case "product manager":
            work = ["订会议室", "写PRD", "催更"];
            break;
        case "boss":
            work = ["喝茶", "看报", "见客户"];
        case "xxx":
        // 其它工种的职责分配
        //...
    }
    return new User(name, age, career, work);
}

/**
 * 抽象类 —— 抽象工厂
 * */
abstract class SmartPhone {
    abstract system: string;
    abstract call(tel: number): void;

    abstract photograph(size: number): { image: string };
}
/**
 * 普通类
 * 当普通类继承自某 1 abstract class 时，必须实现继承而来的相关属性和方法
 **/
class IosSmartPhone extends SmartPhone {
    system: string;
    call(tel: number): void {
        throw new Error("Method not implemented.");
    }
    photograph(size: number): { image: string } {
        throw new Error("Method not implemented.");
    }
}
