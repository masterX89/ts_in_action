// Class doc: https://www.tslang.cn/docs/handbook/classes.html
// 总体而言，ts 的类覆盖了 es6 中的类

// abstract class 是 ts 对 es6 做的增强
// 抽象类只能被 继承 不能被 实例化
abstract class Animal {
  eat() {
    console.log('eat')
  }
  // 抽象方法 子类 必须实现
  abstract sleep(): void
}
class Dog extends Animal {
  // 应用场景: It is generally used in classes that contain static members only
  // private constructor(name: string) {
  //   this.name = name
  // }
  // 应用场景: 作为 基类
  // protected constructor(name: string) {
  //   this.name = name
  // }
  constructor(name: string) {
    super()
    this.name = name
  }
  name: string
  sex?: string
  readonly legs: number = 4
  // 只能通过 类 或者 子类 来访问 而不能通过 实例 来访问
  static food: string = 'bones'
  run() {}
  private pri() {}
  // 只能在 类 和 子类 中访问，而不能在 实例 中访问
  protected pro() {}
  sleep() {
    console.log('dog sleep')
  }
}
// “类的成员属性”都是实例属性，而不是原型属性，“类的成员方法”都是“原型”方法。
// 与 ES6 不同的是属性需要有 初始值 或者 在构造函数中初始化 或者 可选

// 使用 Dan 的心智模型去解释：./assets/class.excalidraw
// constructor: class Dog
// run: ƒ run()
// [[Prototype]]: Object
console.dir(Dog)
console.log(Dog.food)
console.log(Dog.prototype)
// 如果 private Constructor 的话 类既不能被 继承 也不能 实例化
// 应用场景: It is generally used in classes that contain static members only
// Constructor of class 'Dog' is private and only accessible within the class declaration.

// 如果 protected Constructor 的话 类不能被 实例化 但是可以 继承
// Constructor of class 'Dog' is protected and only accessible within the class declaration.
const dog = new Dog('dog')
// name: "dog"
// [[Prototype]]: Object
console.log(dog)
console.log(Object.getPrototypeOf(dog))
// Property 'pri' is private and only accessible within class 'Dog'
// dog.pri()
// Property 'pro' is protected and only accessible within class 'Dog' and its subclasses.
// dog.pro()

class Husky extends Dog {
  constructor(name: string, size: number) {
    // Constructors for derived classes must contain a 'super' call.
    super(name)
    this.size = size
    // Property 'pri' is private and only accessible within class 'Dog'
    // this.pri()
    this.pro()
  }
  size: number
}
console.dir(Husky)
console.log(Husky.food)
const husky = new Husky('Husky', 2)

class Collie extends Dog {
  // 构造函数参数使用 public 修饰符可以将 属性添加进入 实例 中
  constructor(name: string, public color: string) {
    super(name)
    this.color = color
  }
  // 省略该定义 个人不提倡
  // color: string
}

console.dir(Collie)

// 多态: 抽象方法 由子类实现 就可以达到 运行时 绑定的特性
class Cat extends Animal {
  sleep() {
    console.log('cat sleep')
  }
}

const cat = new Cat()
const animals: Animal[] = [dog, cat]
animals.forEach((animal) => {
  animal.sleep()
})

// 链式调用
class WorkFlow {
  step1() {
    console.log(this)
    return this
  }
  step2() {
    console.log(this)
    return this
  }
}
new WorkFlow().step1().step2()

// 原型链 去寻找 step1 和 step2
// this 指向问题 object 是谁调用指向谁 因此是SubWorkFlow
class SubWorkFlow extends WorkFlow {
  subStep() {
    console.log(this)
    return this
  }
}
new SubWorkFlow().step1().subStep().step2()
