// Class doc: https://www.tslang.cn/docs/handbook/classes.html
// 总体而言，ts 的类覆盖了 es6 中的类
class Dog {
  constructor(name: string) {
    this.name = name
  }
  name: string
  sex?: string
  run() {}
  private pri() {}
}
// “类的成员属性”都是实例属性，而不是原型属性，“类的成员方法”都是“原型”方法。
// 与 ES6 不同的是属性需要有 初始值 或者 在构造函数中初始化 或者 可选

// 使用 Dan 的心智模型去解释：./assets/class.excalidraw
// constructor: class Dog
// run: ƒ run()
// [[Prototype]]: Object
console.dir(Dog)
console.log(Dog.prototype)
const dog = new Dog('dog')
// name: "dog"
// [[Prototype]]: Object
console.log(dog)
console.log(Object.getPrototypeOf(dog))
// Property 'pri' is private and only accessible within class 'Dog'
// dog.pri()

class Husky extends Dog {
  constructor(name: string, size: string) {
    // Constructors for derived classes must contain a 'super' call.
    super(name)
    this.size = size
  }
  size: string
}
console.dir(Husky)
