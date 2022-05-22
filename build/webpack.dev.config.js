// module.exports = {
//   devtool: 'cheap-module-eval-source-map',
// }

const webpack = require('webpack')
module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        devtools: 'cheap-module-eval-source-map',
      },
    }),
  ],
}
