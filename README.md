## 初始化项目

#### .npmrc

设置镜像源, 在根目录添加一个 .npmrc 并做简单的配置即可

```
  npm config set registry https://registry.npm.taobao.org

```

## 规范代码提交

> 1、VScode 扩展 EditorConfig
>
> - a. 功能：统一编辑器风格，缩进、取出多余空格、尾部插入一行；
> - b. 用法：根目录需添加文件 .editorconfig；

> 2、NPM 包 Prettier
>
> - a. 功能：统一项目风格，对象末尾添加“,”、使用单引号还是双引号、在对象中的括号之间打印空格 等；
> - b. 用法：npm install prettier -D；根目录需添加文件 .prettierrc；安装 VScode 扩展 Prettier - Code formatter ctrl+s 时就可以自动规范格式啦(原来是它！)；

> 3、ESLint、StyleLint；

## Webpack 基本配置

> 1、input、output;

> 2、区分开发环节、生产环境文件配置、mode；

> 3、webpack-dev-server：webpack 会本地 run 一个服务，通过简单的配置还可指定其端口、热更新的开启等；

> 4、devtool：source-map;

> 5、Plugin 插件
>
> - a.基础插件：html-webpack-plugin、clean-webpack-plugin(清除之前的 dist 文件)
> - b.

> 6、Loader
>
> - a.基础 Loader: style-loader、css/less/sass-loader、url-loader(处理图片)、postcss-loader(修复 css 兼容问题);
> - b.babel-loader 编译.ts/.tsx/.jsx 文件

> 7、
> 8、
> 9、
