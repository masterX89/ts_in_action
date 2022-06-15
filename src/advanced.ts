// 1. 从右向左 根据 值 推断类型
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

// 2. 从左向右 根据 上下文 推断类型
// (parameter) e: KeyboardEvent
window.onkeydown = (e) => {
  console.log(e.key)
}
// (parameter) e: MouseEvent
window.onclick = (e) => {
  console.log(e)
}

// 3. 类型断言
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
