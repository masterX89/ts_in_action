// 函数定义
function addFunc1(x: number, y: number): number {
  return x + y
}

let addFunc2: (x: number, y: number) => number = (x: number, y: number) => {
  return x + y
}

type AddFunc3 = (x: number, y: number) => number
let addFunc3: AddFunc3 = (x, y) => x + y
addFunc3(1, 2)

interface AddFunc4 {
  (x: number, y: number): number
}
let addFunc4: AddFunc4 = (x, y) => x + y
addFunc4(1, 2)

// 注意 js 中对函数的参数个数不做检查
// 但是 ts 中会对参数个数进行检查

// 可选参数
function addFunc5(x: number, y?: number) {
  return y ? x + y : x
}
console.log(addFunc5(2))
console.log(addFunc5(2, 3))

// 默认参数
function addFunc6(x: number, y = 1, z: number, q = 2) {
  return x + y + z + q
}
console.log(addFunc6(2, undefined, 3))

// 剩余参数
function addFunc7(x: number, ...rest: number[]) {
  return x + rest.reduce((prev, cur) => prev + cur, 0)
}
console.log(addFunc7(1, 2, 3))

// 静态语言存在重载

// playground 结果
// 因此需要将有限匹配的函数写在前面

// "use strict";
// function addFunc8(...rest) {
//     if (rest[0] && typeof rest[0] === 'string')
//         return rest.join('');
//     if (rest[0] && typeof rest[0] === 'number')
//         return rest.reduce((prev, cur) => prev + cur, 0);
// }

function addFunc8(...rest: string[]): string
function addFunc8(...rest: number[]): number
function addFunc8(...rest: any[]): any {
  if (rest[0] && typeof rest[0] === 'string') return rest.join('')
  if (rest[0] && typeof rest[0] === 'number')
    return rest.reduce((prev, cur) => prev + cur, 0)
}

console.log(addFunc8(1, 2, 3, 4))
console.log(addFunc8('a', 'b', 'c'))
