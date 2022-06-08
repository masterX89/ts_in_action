// interface: https://www.tslang.cn/docs/handbook/interfaces.html

// 对象类型 接口 - 鸭式辨型
// 如果它看起来像鸭子、游泳像鸭子、叫声像鸭子，那么它可能就是只鸭子
// 举个例子方便理解
// 我们知道 2..toString() 会得到 '2' 明明是一个 primitive value 却表现得和 object 一样
// 原因是 engine 帮我们创建了一个临时对象，使用后又销毁了
// 同理：new Number(2) 的行为其实和 primitive value 的 2 是一样的
// 那么 lodash 就是这样判断 number 的

// function isNumber(value) {
//   return typeof value == 'number' ||
//     (isObjectLike(value) && getTag(value) == '[object Number]')
// }

// primitive value 的 number 和 new Number 可供人使用的方法一样，那么就认为他们都是 number
// 所以 Duck Test 不关注究竟是什么类型，而关注 它能做什么

interface List {
  readonly id: number
  name: string
  // 可选属性
  age?: number
}
interface Result {
  data: List[]
}

function render(result: Result) {
  result.data.forEach((value) => {
    console.log(value.id, value.name)
    if (value.age) console.log(value.age)
    // 只读属性 Cannot assign to 'id' because it is a read-only property.
    // value.id++
  })
}

let result = {
  data: [
    // duck test
    { id: 1, name: 'a', sex: 'male' },
    { id: 2, name: 'b', age: 24 },
  ],
}

render(result)
// 如果使用字面量则 TS 会检查
// Type '{ id: number; name: string; sex: string; }' is not assignable to type 'List'.
// Object literal may only specify known properties, and 'sex' does not exist in type 'List'.
// render({
//   data: [
//     // duck test
//     { id: 1, name: 'a', sex: 'male' },
//     { id: 2, name: 'b' },
//   ],
// })
// 使用字面量的三种方法
// 1. 使用 变量 赋值
// 2. 使用 类型 断言
// 告诉编译器我们明确知道类型为 Result 从而绕过类型检查
render({
  data: [
    { id: 1, name: 'a', sex: 'male' },
    { id: 2, name: 'b' },
  ],
} as Result)

// 这种也是一种 类型断言 不建议使用，在 react 中会造成歧义
render(<Result>{
  data: [
    { id: 1, name: 'a', sex: 'male' },
    { id: 2, name: 'b' },
  ],
})

// 3. 字符串索引签名
// interface List {
//   id: number
//   name: string
//   // TODO: 索引签名 https://jkchao.github.io/typescript-book-chinese/typings/indexSignatures.html#typescript-%E7%B4%A2%E5%BC%95%E7%AD%BE%E5%90%8D
//   [x: string]: any
// }
// render({
//   data: [
//     { id: 1, name: 'a', sex: 'male' },
//     { id: 2, name: 'b' },
//   ],
// })

// 以上均为 对象 中属性确定的情况
// 当对象中 属性不确定时，可以使用 数字 或者 字符串 索引的接口
interface StringArray {
  [index: number]: string
}

let chars: StringArray = ['Ab', 'B', 'C', 'D', 'E', 'F']

interface Names {
  [x: string]: string
  // Property 'y' of type 'number' is not assignable to 'string' index type 'string'.
  // y: number
  // 数字 和 字符串 索引 可以混用
  [z: number]: string
}

// 但是 数字 签名的返回值必须是 字符串索引签名返回值 的 子类型
// 'number' index type 'number' is not assignable to 'string' index type 'string'.
// interface NamesError {
//   [x: string]: string
//   [z: number]: number
// }

interface NamesRight {
  [x: string]: any
  [z: number]: number
}
