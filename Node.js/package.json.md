[package.json 指南 (nodejs.cn)](https://dev.nodejs.cn/learn/the-package-json-guide/#软件包版本)

[Node.js (nodejs.org)](https://nodejs.org/zh-cn)

## 相关命令

npm install -S | -D
-S (-save) 写入 生产依赖 dependencies
-D (-save-dev) 写入 开发依赖 devDependencies
-g 全局安装到 npm 的安装目录
-force 强制执行

- pkg 版本号@+number 的安装

```shell
npm install webpack@5 -D // 指定安装webpack5.x的版本
npm install webpack@5.12 -D // 指定安装webpack5.12的版本
```

## 版本号规则

版本号以 x.y.z ：为例子

- z ：表示一些小的 bugfix, 更改 z 的号，
- y ：表示一些大的版本更改，比如一些 API 的变化
- x ：表示一些设计的变动及模块的重构之类的，会升级 x 版本号

`^`: **只会执行不更改最左边非零数字的更新。** 如果写入的是 `^0.13.0`，则当运行 `npm update` 时，可以更新到 `0.13.1`、`0.13.2` 等，但不能更新到 `0.14.0` 或更高版本。 如果写入的是 `^1.13.0`，则当运行 `npm update` 时，可以更新到 `1.13.1`、`1.14.0` 等，但不能更新到 `2.0.0` 或更高版本。

`~`: 如果写入的是 `〜0.13.0`，则当运行 `npm update` 时，会更新到补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。

`>`: 接受高于指定版本的任何版本。

`>=`: 接受等于或高于指定版本的任何版本。

`<=`: 接受等于或低于指定版本的任何版本。

`<`: 接受低于指定版本的任何版本。

`=`: 接受确切的版本。

`-`: 接受一定范围的版本。例如：`2.1.0 - 2.6.2`。

`||`: 组合集合。例如 `< 2.1 || > 2.6`。

## resolutions

某些包的内部依赖包总是最新的，导致 package.json 中明明已经指定版本号了，但是依旧不会按照项目中配置的下载。

这个时候需要使用 resolutions 来指定正确的包版本

```json
+ "resolutions": {
+   "@types/react-dom": "^16.8.0"
+ },

  "devDependencies": {
    "react": "^16.8.0",
    "react-dom": "^16.8.0",
  },
```
