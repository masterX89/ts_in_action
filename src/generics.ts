// 泛型文档: https://www.tslang.cn/docs/handbook/generics.html
// 泛型大大增强了灵活性
function identity(arg: number): number {
  return arg
}
// 如果要上面的函数支持多种类型，可以使用函数重载、联合类型等
// 但是要改写成支持多种类型，可以使用 any
// 而 any 会丢失信息，这即是 泛型 的应用场景
// 不预先确定数据类型，具体的类型在使用时确定

// 理解：将泛型看作另一个维度的参数，泛型代表类型而非值

// 1. 使用 泛型 定义函数
function log<T>(arg: T): T {
  console.log(arg)
  return arg
}
// 调用
log<string[]>(['a', 'b'])
// 建议使用类型推断
log(['c', 'd'])

// 2. 使用 泛型 定义函数类型
type Log = <T>(arg: T) => T
let myLog: Log = log

// 3. 使用 泛型 定义 函数接口
// 该写法和 type 别名等价
interface Log2 {
  // 该泛型只约束了一个函数
  <T>(val: T): T
}

// 4. 使用泛型约束接口所有成员
interface Log3<T = string> {
  // 该泛型只约束了一个函数
  (val: T): T
}

let myLog3: Log3 = log
myLog3('str')
let myLog31: Log3<number> = log
myLog31(1)

// 使用泛型约束类
class Log4<T> {
  run(val: T) {
    console.log(val)
    return val
  }
}
let log4 = new Log4<number>()
log4.run(1)
// 亦可不指明泛型
let log41 = new Log4()
log41.run('str')

interface Length {
  length: number
}
// 使用 interface 去约束 泛型
function log5<T extends Length>(val: T): T {
  console.log(val)
  // 需要约束 T 存在 length 属性
  console.log(val.length)
  return val
}
log5('aaa')
log5([1, 2, 3])
log5({ a: 1, b: 2, length: 2 })
log5(() => {})
// 没有 length 属性
// log5(1)
