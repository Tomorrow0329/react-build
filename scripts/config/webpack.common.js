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
 * webpackbar: [优化]显示编译进度
 * fork-ts-checker-webpack-plugin: [优化] 编译时针对ts类型文件，在我们打包或启动本地服务时给予错误提示,防止一些隐性 bug 存在；
 * hard-source-webpack-plugin : [优化]一个能大大提高二次编译速度的神器,它为程序中的模块（如 lodash）提供了一个中间缓存，放到本项目 node_modules/.cache/hard-source 下，就是 hard-source-webpack-plugin ，首次编译时会耗费稍微比原来多一点的时间，因为它要进行一个缓存工作，但是再之后的每一次构建都会变得快很多;
 * mini-css-extract-plugin: [优化]抽离出样式文件
 * purgecss-webpack-plugin :[优化]去除未使用/无意义 css
 */
const path = require('path')
const { PROJECT_PATH, isDev } = require('../constants')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  entry: {
    // path.resolve ：node 的官方 api，可以将路径或者路径片段解析成绝对路径。
    // __dirname ：其总是指向被执行 js 文件的绝对路径，比如在我们 webpack 文件中访问了 __dirname ，那么它的值就是在电脑系统上的绝对路径，
    app: path.resolve(PROJECT_PATH, './src/index.tsx'),
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
  resolve: {
    // resolve 属性，在 extensions 中定义好文件后缀名后，在 import 某个文件的时候可以省略后缀；
    // 依次尝试进行查找，所以我们在配置时尽量把最常用到的后缀放到最前面，可以缩短查找时间；
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: path.resolve(PROJECT_PATH, './src'),
      Components: path.resolve(PROJECT_PATH, './src/components'),
      Utils: path.resolve(PROJECT_PATH, './src/utils'),
    },
  },
  module: {
    rules: [
      // webpack loader 的执行顺序是从右到左，即从后往前;
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true }, // 【优化】babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，所以我们开启 cacheDirectory 将这些公共文件缓存起来，下次编译就会加快很多
        exclude: /node_modules/, // node_modules 目录不需要我们去编译，排除后，有效提升编译效率
      },
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
  optimization: {
    // TODO! 再仔细看下文档 关于这里的介绍；
    // 把一些引用的第三方包也打成单独的 chunk,不需要重复引用
    splitChunks: {
      chunks: 'all',
      name: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false,
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
    new WebpackBar({
      name: isDev ? '正在启动' : '正在打包',
      color: '#fa8c16',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
      },
    }),
    new HardSourceWebpackPlugin(),
  ],
}
