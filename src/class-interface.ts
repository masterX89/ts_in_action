// class vs. interface
// excalidraw: ./assets/class-interface
// 现在看到的源码中 class 更偏向于应对 实例化 的场景
// 而 interface 更倾向于 约束 对象的 props
// 两者的用法繁多，要学习还是要结合实际的应用场景来学
interface Human {
  name: string
  eat(): void
}

// 对象 接口 类型
const jack: Human = {
  name: 'Jack',
  eat() {},
}

// class 和 interface 的关系
class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }
  // 接口只能约束 class 的共有成员
  // private name: string
  name: string
  eat() {}
}

interface Man extends Human {
  run(): void
}
interface Child {
  cry(): void
}
// 合并了多个 interface
interface Boy extends Man, Child {}

// 对象类型接口
const boy: Boy = {
  name: 'John',
  eat() {},
  run() {},
  cry() {},
}

// 接口继承类
// 接口 抽象了 类的成员 而无具体实现
class Auto {
  state: number = 1
}
interface AutoInterface extends Auto {}
// 对象接口类型
const auto: AutoInterface = {
  state: 2,
}
class C implements AutoInterface {
  // 无需声明 state 因为从 interface 中实现了
  state = 3
}

console.log(Auto)
console.log(auto)
console.log(C)

class Bus extends Auto implements AutoInterface {}
console.log(Bus)
