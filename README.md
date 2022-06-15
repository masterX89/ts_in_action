# ts

```bash
npm init -y
tsc --init
```

（按理说使用 type="module" 可以跑起来，之后试一试）

```bash
npm i webpack webpack-cli webpack-dev-server -D
```

```bash
npm i ts-loader typescript -D
```

```bash
npm i html-webpack-plugin -D
```

```bash
npm i clean-webpack-plugin -D
```

```bash
npm i webpack-merge -D
```

如果安装的版本是webpack5，则需要做以下修改：

1. 修改启动脚本为：

   ```
   "start": "webpack serve --mode development --env development --config ./build/webpack.config.js" 
   ```

2. 修改 ` webpack.config.js` 中的 `const merge = require('webpack-merge')` 为

   ```
    const { merge } = require('webpack-merge') 
   ```

3. 修改 webpack.dev.config.js 内容为：

   ```
   const webpack = require('webpack');
   module.exports = {
       plugins: [
           new webpack.LoaderOptionsPlugin({
               options: {
                   devtools: 'cheap-module-eval-source-map'
               }
           })
       ]
   }
   ```

## 类型检查机制

### 类型推断

> 无需指定变量类型（函数返回值类型），TS 根据某些规则自动推断类型

#### 基础类型推断

#### 最佳通用类型推断

#### 上下文类型推断

### 类型兼容性

当一个类型 Y 可以被赋值给另一个类型 X 时，可以说类型 X 兼容类型 Y

X 兼容 Y : X（目标类型） = Y（源类型）

### 类型保护

## TODO LIST

- [ ] 子类型
  - `null` 和 `undefined` 是所有类型的子类型（`strictNullChecks` 为 `false` 时）
  - `never` 类型是任何类型的子类型
  - 没有类型是 `never` 的子类型（即使 `any` 也不可以赋值给 `never`）
- [ ] `declare` 的用途
- [x] `var` 显然没有提升到整个程序的最上端，它可以突破块作用域，提升到了函数作用域最上端
```js
function f(input) {
    let a = 100;

    if (input) {
        var b = a + 1;
        return b;
    }
    return b;
}
f() // undefined
```