// 关于 enum: https://www.tslang.cn/docs/handbook/enums.html

// 1. 数字枚举
const enum TagType {
  Start,
  End,
}

enum ErrorCode {
  TypeError = 1001,
  ReferenceError = 2001,
}
console.log('TypeError: ', ErrorCode[1001])

// 可以定义起始值
enum Roles {
  Guest = 1,
  Developer,
  Maintainer,
  Owner,
}

// TS playground 结果
// 反向映射
// "use strict";
// var Roles;
// (function (Roles) {
//     Roles[Roles["Guest"] = 1] = "Guest";
//     Roles[Roles["Developer"] = 2] = "Developer";
//     Roles[Roles["Maintainer"] = 3] = "Maintainer";
//     Roles[Roles["Owner"] = 4] = "Owner";
// })(Roles || (Roles = {}));

// 1: "Guest"
// 2: "Developer"
// 3: "Maintainer"
// 4: "Owner"
// Developer: 2
// Guest: 1
// Maintainer: 3
// Owner: 4
// [[Prototype]]: Object
console.log('enum: ', Roles)

// 为了效率可以使用 二进制
// 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.
export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}

// 2. 字符串枚举
export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

// TS playground
// 说明字符串枚举 不能 反向映射
// export var ReactiveFlags;
// (function (ReactiveFlags) {
//     ReactiveFlags["IS_REACTIVE"] = "__v_isReactive";
//     ReactiveFlags["IS_READONLY"] = "__v_isReadonly";
// })(ReactiveFlags || (ReactiveFlags = {}));

// IS_REACTIVE: "__v_isReactive"
// IS_READONLY: "__v_isReadonly"
// [[Prototype]]: Object
console.log(ReactiveFlags)
console.log(ReactiveFlags['IS_REACTIVE'])

// 3. 异构枚举
// 不建议使用
enum Answer {
  N,
  Y = 'yes',
}

// 枚举特性
// read-only
// Cannot assign to 'Guest' because it is a read-only property
// Roles.Guest = 100

// 4. 枚举成员
enum Member {
  // 4.1 const 编译时计算出结果
  a,
  b = Member.a, // Member[0] 会得到 b
  c = 1 + 3,
  // 4.2 computed 运行时
  d = Math.random(),
  e = 'abc'.length,
  // computed 后的 member 必须初始化
  // Enum member must have initializer
  // f,
}
// "use strict";
// var Member;
// (function (Member) {
//     // const 编译时计算出结果
//     Member[Member["a"] = 0] = "a";
//     Member[Member["b"] = 0] = "b";
//     Member[Member["c"] = 4] = "c";
//     // computed 运行时
//     Member[Member["d"] = Math.random()] = "d";
//     Member[Member["e"] = 'abc'.length] = "e";
// })(Member || (Member = {}));
console.log(Member[0])

// 5. const enum
// TS playground
// "use strict";
// const enum 在 编译 阶段会被移除
// 常量枚举成员在使用的地方会被内联进来
// 常量枚举不允许包含计算成员
const enum Month {
  Jan,
  Feb,
  Mar,
}

// "use strict";
// let directions = [0 /* Directions.Up */, 1 /* Directions.Down */, 2 /* Directions.Left */, 3 /* Directions.Right */];
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right,
]

// 6. 枚举类型

enum E {
  a,
  b,
}

enum F {
  a = 0,
  b = 1,
}

enum G {
  a = 'apple',
  b = 'banana',
}

// 可以将 数字类型的值 赋值给 枚举类型 的变量
let e: E = 1
// Type '"str"' is not assignable to type 'E'
// let e: E = 'str'
let f: F = 2
// This condition will always return 'false' since the types 'E' and 'F' have no overlap
// e === f
let ee: E = 1
console.log(e === ee)

// 同样可以将 数字类型的值 赋值给 枚举成员类型 的变量
let e1: E.a = 1
let e2: E.b = 1
// This condition will always return 'false' since the types 'E.a' and 'E.b' have no overlap.
// e1 === e2
let e3: E.a = 1
e1 === e3

let g1: G = G.a
let g2: G.a = G.a
// Type 'G.b' is not assignable to type 'G.a'
// let g2: G.a = G.b
