# 脚手架配置

## 初始化项目

#### .npmrc

设置镜像源, 在根目录添加一个 .npmrc 并做简单的配置即可<br>

```
  npm config set registry https://registry.npm.taobao.org

```

## 规范代码提交

###### 1、VScode 扩展 EditorConfig<br>

a. 功能：统一编辑器风格，缩进、取出多余空格、尾部插入一行；<br>
b. 用法：根目录需添加文件 .editorconfig；<br>

###### 2、NPM 包 Prettier<br>

a. 功能：统一项目风格，对象末尾添加“,”、使用单引号还是双引号、在对象中的括号之间打印空格 等；
b. 用法：npm install prettier -D；根目录需添加文件 .prettierrc；安装 VScode 扩展 Prettier - Code formatter ctrl+s 时就可以自动规范格式啦(原来是它！)；

###### 3、ESLint、StyleLint；

## Webpack 基本配置

###### 1、input、output;

###### 2、区分开发环节、生产环境文件配置、mode；

###### 3、webpack-dev-server：webpack 会本地 run 一个服务，通过简单的配置还可指定其端口、热更新的开启等；

###### 4、devtool：source-map;

###### 5、Plugin 插件配置

a.基础插件：html-webpack-plugin、clean-webpack-plugin(清除之前的 dist 文件)<br>
b.

###### 6、Loader 配置

a.基础 Loader: style-loader、css/less/sass-loader、url-loader(处理图片)、postcss-loader(修复 css 兼容问题);<br>
b.babel-loader 编译.ts/.tsx/.jsx 文件<br>

## 支持 React

1、安装 react react-dom；<br>
2、配置 babel-loader/@babel/core/@babel/preset-react:<br>
a. babel-loader 使用 babel 解析文件;<br>
b.@babel/core 是 babel 的核心模块;<br>
c.@babel/preset-react 转译 jsx 语法;<br>
3、配置 .babelrc

```
{
  "presets": ["@babel/preset-react"]
}
```

## 支持 TypeScript

1、安装 babel 插件：@babel/preset-typescript --它直接去掉 ts 的类型声明，然后再用其他 babel 插件进行编译<br>
2、修改.babelrc 配置<br>
3、配置 tsconfig.json<br>

## 配置优化

1、多环境配置，抽离静态变量<br>
2、显示编译进度，添加 webpackbar 插件（npm install webpackbar -D）<br>
3、对 ts 文件进行编译时类型检查，避免隐性 bug 出现，添加 fork-ts-checker-webpack-plugin 插件（npm install fork-ts-checker-webpack-plugin -D）<br>
4、加快二次编译速度，通过安装 hard-source-webpack-plugin 插件，缓存一部分编译代码，来提高二次编译速度<br>
5、组件懒加载：React.lazy React.Suspense<br>
6、🌟optimization 配置,将第三方依赖也打出来独立 chunk<br>

```
module.exports = {
	// other...
  externals: {//...},
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: true,
    },
  },
}
```

7、[开发环境]热更新
8、震惊！devServer.proxy 可以支持接口转发～～<br>
9、🌟 抽离 css 样式，安装插件 mini-css-extract-plugin<br>
10、🌟 压缩 js 代码，安装插件 terser-webpack-plugin<br>
11、🌟 压缩 css 代码，安装插件 optimize-css-assets-webpack-plugin<br>
12、🌟tree-shaking，webpack 内置的打包代码优化神器，在生产环境下，即 mode 设置为 production 时，打包后会将通过 ES6 语法 import 引入的未使用的代码去除<br>
13、打包分析器，插件 webpack-bundle-analyzer<br>

[todo]
1、src/下 文件的组织
2、接口请求、转发、axios 拦截器配置、跨域问题的解决
3、处理登录、鉴权
4、组件化
5、脚手架发 npm 包
