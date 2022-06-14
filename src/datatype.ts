// 基础类型文档 https://www.tslang.cn/docs/handbook/basic-types.html
// 原始类型
let num: number = 0
let str: string = '0'
let bool: boolean = false

// array
let arr1: number[] = [0, 1, 2]
let arr11: (number | string)[] = [0, 1, 2, 'str']
// 范型
let arr2: Array<number> = [0, 1, 2]
let arr22: Array<number | string> = [0, 1, 2, 'str']

// tuple
let tuple1: [number, string] = [1, '1']
let tuple2: [number, string, number] = [1, '1', 1]
// tuple 越界添加
// TODO: 和联合类型有关
tuple1.push(1)
console.log(tuple1)
// 无法越界访问
// tuple1[2]

// function
// let add = (a, b) => a + b // implicitly any
let add = (a: number, b: number): number => a + b
// 类型推断
let add2 = (a: number, b: number) => a + b
// 函数类型
let compute: (a: number, b: number) => number
compute = (x, y) => x + y

// 对象
// let obj: object = { x: 1, y: 2 }
// obj.x = 2 // x not exist
let obj: { x: number; y: number } = { x: 1, y: 2 }
obj.x = 2

// symbol
let symbol1: symbol = Symbol(1)
let symbol2 = Symbol(1)
console.log(symbol1 === symbol2)

// undefined null
let un1: undefined = undefined
// let un2: undefined = 1 // undefined 和 null 是任何数据的子类型
// "strictNullChecks": false ,/* When type checking, take into account `null` and `undefined`. */
// 但是一般用 number | undefined
// num = undefined
let nu: null = null

// void
// undefined 并非是保留字 甚至可以 undefined = 0
// 因此 void 0 是更加真实的 undefined
// NOOP
const NOOP = () => {}

// any
// 接触 ts 的第一个类型 哈哈
let x

// never
let error = () => {
  throw new Error('error')
}
let endless = () => {
  while (true) {}
}

// TODO: 那么 unknown 呢？
