const common = require('./webpack.common')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('path')
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { PROJECT_PATH } = require('../constants')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimize: true, // true 为压缩，false为不压缩
    nodeEnv: 'production',
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 去除所有注释，除了有特殊标记的注释
        terserOptions: {
          compress: { pure_funcs: ['console.log'] }, // 设置我们想要去除的函数，比如我就将代码中所有 console.log 去除
        },
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      // glob 是用来查找文件路径的，我们同步找到 src 下面的后缀为 .tsx 、 .(sc|c|le)ss 的文件路径并以数组形式返给 paths ，然后该插件就会去解析每一个路径对应的文件，将无用样式去除； nodir 即去除文件夹的路径，加快处理速度
      // 注意：一定也要把引入样式的 tsx 文件的路径也给到，不然无法解析你没有哪个样式类名，自然也无法正确剔除无用样式了
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body'],
    }),
  ],
})
