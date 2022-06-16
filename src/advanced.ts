// note:
// 结构之间兼容：成员少的兼容成员多的
// 函数之间兼容：参数多的兼容参数少的
// 1. 类型推断
// 1.1 从右向左 根据 值 推断类型
// let a: any
let a
// let aa: number
let a1 = 1
// let b: any[]
let b = []
// let bb: number[]
let b1 = [1]
// let b2: (number | null)[]
// `strictNullChecks` 为 `false` 时
// let b2: (number)[]
let b2 = [1, null]
// let c: (x?: number) => number
let c = (x = 1) => x

// 1.2 从左向右 根据 上下文 推断类型
// (parameter) e: KeyboardEvent
window.onkeydown = (e) => {
  console.log(e.key)
}
// (parameter) e: MouseEvent
window.onclick = (e) => {
  console.log(e)
}

// 1.3 类型断言
// 可以增强代码的灵活性，但是不要滥用
interface Foo {
  bar: number
}
let foo = {} as Foo
foo.bar = 1

// 尽量还是如下定义
let foo1: Foo = {
  bar: 1,
}

// 2. 类型兼容
// 2.1 子类型
// `null` 和 `undefined` 是所有类型的子类型（`strictNullChecks` 为 `false` 时）
// `never` 类型是任何类型的子类型
// 没有类型是 `never` 的子类型（即使 `any` 也不可以赋值给 `never`）

// 2.2 接口兼容
interface XAdvanced {
  a: any
  b: any
}
interface YAdvanced {
  a: any
  b: any
  c: any
}
let xAdvanced: XAdvanced = { a: 1, b: 2 }
let yAdvanced: YAdvanced = { a: 1, b: 2, c: 3 }

// Duck Test
xAdvanced = yAdvanced
// Property 'c' is missing in type 'XAdvanced' but required in type 'YAdvanced'
// yAdvanced = xAdvanced
console.log(xAdvanced)

// 2.3 函数兼容
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}
// i. 参数个数
let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// Argument of type '(a: number, b: number, c: number) => void' is not assignable to parameter of type 'Handler'
// hof(handler2)

// 可选参数和剩余参数
let func1 = (p1: number, p2: number) => {}
let func2 = (p1?: number, p2?: number) => {}
let func3 = (...args: number[]) => {}
// 可选参数 和 剩余参数 可以赋值给 固定参数
func1 = func2
func1 = func3
// 固定参数 和 剩余参数 不能赋值给 可选参数
// 但是 strickFunctionTypes 为 false 时候 可以兼容赋值
// func2 = func1
// func2 = func3
// 固定参数 和 可选参数 可以赋值给 剩余参数
func3 = func1
func3 = func2

// ii. 参数类型
// primitive value 较为好判断
let handler3 = (a: string) => {}
// hof(handler3)

// 但是 object 的类型不易判断
interface Point3D {
  x: number
  y: number
  z: number
}
interface Point2D {
  x: number
  y: number
}

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}
// 与接口兼容的现象恰好相反
// 但是与 函数兼容 中的参数个数现象一致，参数少的函数 可以赋值给 参数多的函数
p3d = p2d
// 参数类型一致但是对象个数不一致
// 但是 strickFunctionTypes 为 false 时候 可以兼容赋值
// 学名：函数参数的双向协变
// p2d = p3d

// iii. 返回值类型
let f = () => ({
  name: 'John',
})
let g = () => ({
  name: 'Jack',
  age: 13,
})
// Duck Test
f = g
// 少的返回值不能赋值给多的
// g = f

function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}

// 2.4 enum 兼容
enum Fruit {
  Apple,
  Banana,
}
enum Color {
  Red,
  Yellow,
}
let fruit: Fruit.Apple = Fruit.Apple
let no: number = Fruit.Apple
// 枚举之间互不兼容
// let color: Color.Red = Fruit.Apple

// 2.5 类兼容性
// 静态成员 和 构造函数 不参与比较
class A {
  constructor(p: number, q: number) {}
  id: number = 1
}

class B {
  static s = 1
  constructor(p: number) {}
  id: number = 2
}
let aAdvanced = new A(1, 2)
let bAdvanced = new B(1)
// 只比较 public 属性
aAdvanced = bAdvanced
bAdvanced = aAdvanced

// 父类子类之间互相兼容

// 2.6 泛型兼容
interface Empty<T> {
  value: T
}
let obj1: Empty<number> = { value: 1 }
let obj2: Empty<string> = { value: '1' }
let obj3: Empty<number> = { value: 2 }
// 泛型被使用后判断是否兼容
// obj1 = obj2
// obj2 = obj1
obj1 = obj3

// 函数泛型互相间兼容

// 3. 类型保护：可以使用 instanceof in typeof 都是 js 老朋友了
// 使用类型谓词 is 声明类型保护函数
enum Type {
  Strong,
  Weak,
}
class Java {
  helloJava() {
    console.log('Hello Java!')
  }
}
class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript!')
  }
}

function isJava(lang: Java | JavaScript): lang is Java {
  return lang instanceof Java
}

function isJavaScript(lang: Java | JavaScript): lang is JavaScript {
  return lang instanceof JavaScript
}

function getLang(type: Type): Java | JavaScript {
  const lang = type === Type.Strong ? new Java() : new JavaScript()
  if (isJava(lang)) {
    lang.helloJava()
  } else if (isJavaScript(lang)) {
    lang.helloJavaScript()
  }
  return lang
}

getLang(Type.Strong)
getLang(Type.Weak)

// 交叉类型适合 mixins
// 是两种类型的并集
interface Dog1 {
  wow(): void
}
interface Cat1 {
  mow(): void
}

let pet: Dog1 & Cat1 = {
  wow() {},
  mow() {},
}

// 联合类型并不确定，可以是多个类型中的一个
// 通过 联合类型 中的 共有属性，来进行 类型保护，形成不同的 类型保护 块

enum Kind {
  Square,
  Rectangle,
}

interface Square {
  kind: Kind.Square
  size: number
}

interface Rectangle {
  kind: Kind.Rectangle
  width: number
  height: number
}

type Shape = Square | Rectangle

function getArea(s: Shape): number {
  let area = 0
  switch (s.kind) {
    case Kind.Square:
      area = s.size * s.size
      break
    case Kind.Rectangle:
      area = s.width * s.height
      break
  }
  return area
}

console.log(getArea({ kind: Kind.Square, size: 2 }))
console.log(getArea({ kind: Kind.Rectangle, width: 2, height: 3 }))
