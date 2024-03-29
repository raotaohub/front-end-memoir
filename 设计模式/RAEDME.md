系统的学习一下各类常用的设计模式，这里使用的语言是 JavaScript

## SOLID 设计原则

"SOLID" 是由罗伯特·C·马丁在 21 世纪早期引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。
设计原则是设计模式的指导理论，它可以帮助我们规避不良的软件设计。SOLID 指代的五个基本原则分别是：

**单一功能原则**（Single Responsibility Principle）
**开放封闭原则**（Opened Closed Principle）
里式替换原则（Liskov Substitution Principle）
**接口隔离原则**（Interface Segregation Principle）

> 例子

```typescript
//狗 的技能 吃 捕食 跑..
//鸟 的技能 吃 捕食 飞..
abstract class Animal {
  abstract eat() {}
  abstract prey() {}
}

abstract class Action {
  abstract run() {}
  abstract fly() {}
}

class Dog extends Animal {
  eat() {
    consooe.log("我继承了 Animal，就需要实现 Animal 的抽象方法");
  }
  prey() {
    consooe.log("我继承了 Animal，就需要实现 Animal 的抽象方法");
  }
  run() {
    consooe.log("我继承了 Action，就需要实现 Action 的抽象方法，我是小狗所以我会奔跑");
  }
  fly() {
    // 需要实现
  }
}

class Birds extends Animal {
  eat() {
    consooe.log("我继承了 Animal，就需要实现 Animal 的抽象方法");
  }
  prey() {
    consooe.log("我继承了 Animal，就需要实现 Animal 的抽象方法");
  }
  run() {
    // 需要实现
  }
  fly() {
    consooe.log("我继承了 Action，就需要实现 Action 的抽象方法，我是小鸟会飞翔");
  }
}
```

依赖反转原则（Dependency Inversion Principle）

## 23 种设计模式

- 创建型：封装了创建对象的过程
-             ├──单例模式
-             ├──原型模式
-             ├──构造器模式 ？
-             ├──工厂模式
-             ├──抽象工厂模式
- 结构形：封装的是对象之间组合方式的变化
-             ├──桥接
-             ├──外观模式
-             ├──组合器模式 ？
-             ├──装饰器模式
-             ├──适配器模式
-             ├──代理模式
-             ├──元享模式
- 行为形：将是对象千变万化的行为进行抽离
-             ├──迭代器
-             ├──解释器模式
-             ├──观察者模式 ？
-             ├──中介模式
-             ├──访问者模式
-             ├──策略模式
-             ├──状态模式
-             ├──备忘录模式
-             ├──模板方法模式
-             ├──职责链模式
-             ├──命令模式

<!-- 不管是if-else、
switch-case，
还是map、
array、
table、
表驱动，
还是多态、
策略模式
都不会降低代码复杂度，
但是可以提高阅读性和可维护性
-->

<!--
* 策略模式 和 状态模式
策略模式和状态模式确实是相似的，它们都封装行为、都通过委托来实现行为分发。
但策略模式中的行为函数是”潇洒“的行为函数，它们不依赖调用主体、互相平行、各自为政，井水不犯河水。
而状态模式中的行为函数，首先是和状态主体之间存在着关联，由状态主体把它们串在一起；另一方面，正因为关联着同样的一个（或一类）主体，所以不同状态对应的行为函数可能并不会特别割裂。
?对比两者
!策略模式 ：
!状态模式 ：依赖于调用者的状态
 -->

<!--

* 观察者模式与发布-订阅模式的区别是什么？

?对比两者
!观察者模式 ： 比如 Vue 的Watcher Dep 与 Observer
!发布订阅模式 ：依赖于调用者的状态
 -->

发布订阅模式

设计模式\picture\发布订阅模式.png

![img](.\picture\发布订阅模式.png)

观察者模式

![img](.\picture\观察者模式.png)

```

```

<details>
<summary>点击展开重写状态</summary>

你的代码
你的代码
你的代码
你的代码
你的代码

</details>
