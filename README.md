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
