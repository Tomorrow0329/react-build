/**
 * webpack ：这不必多说，其用于编译 JavaScript 模块。
 * webpack-cli ：此工具用于在命令行中运行 webpack。
 *
 * webpack 配置是标准的 Node.js 的 CommonJS 模块，它通过 require 来引入其他模块，
 * 通过 module.exports 导出模块，由 webpack 根据对象定义的属性进行解析。
 */
/**
 * 插件
 * cross-env：可跨平台设置和使用环境变量。不同操作系统设置环境变量的方式不一定相同，比如 Mac 电脑上使用 export NODE_ENV=development ，而 Windows 电脑上使用的是 set NODE_ENV=development ，有了这个利器，我们无需在考虑操作系统带来的差异性。
 * webpack-merge: 不必说了；
 * html-webpack-plugin：这个插件能帮助我们将打包后的 js 文件自动引进 html 文件中；
 * webpack-dev-server：可以在本地起一个 http 服务，通过简单的配置还可指定其端口、热更新的开启等；
 * dev-tool：可以帮助我们将编译后的代码映射回原始源代码，即大家经常听到的 source-map；
 */
const path = require('path')
const { PROJECT_PATH, isDev } = require('../constants')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    // path.resolve ：node 的官方 api，可以将路径或者路径片段解析成绝对路径。
    // __dirname ：其总是指向被执行 js 文件的绝对路径，比如在我们 webpack 文件中访问了 __dirname ，那么它的值就是在电脑系统上的绝对路径，
    app: path.resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
  },
  /**
   * loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
   * 因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。
   * loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。
   * loader 甚至允许你直接在 JavaScript 模块中 import CSS文件！
   */
  module: {
    rules: [
      // webpack loader 的执行顺序是从右到左，即从后往前;
      {
        test: /\.css$/,
        use: [
          'style-loader', // loader 是有顺序的，webpack 肯定是先将所有 css 模块依赖解析完得到计算结果再创建 style 标签。因此应该把 style-loader 放在 css-loader 的前面（webpack loader 的执行顺序是从右到左，即从后往前）。
          {
            loader: 'css-loader', // 遇到后缀为 .css 的文件，webpack 先用 css-loader 加载器去解析这个文件，遇到 @import 等语句就将相应样式文件引入（所以如果没有 css-loader ，就没法解析这类语句），计算后生成css字符串，接下来 style-loader 处理此字符串生成一个内容为最终解析完的 css 代码的 style 标签，放到 head 标签里。
            options: {
              modules: false, // 默认就是 false, 若要开启，可在官网具体查看可配置项
              sourceMap: isDev, // 开启后与 devtool 设置一致, 开发环境开启，生产环境关闭
              importLoaders: 0, // 指定在 CSS loader 处理前使用的 laoder 数量
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: isDev,
              importLoaders: 1, // 需要先被 less-loader 处理，所以这里设置为 1
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=5000',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
  ],
}
