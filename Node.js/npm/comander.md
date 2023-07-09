## Your First Extension

```
https://code.visualstudio.com/api/get-started/your-first-extension
```

## **快速删除 node_modules**

```shell
npm install rimraf -g
rimraf node_modules

```

## 清除 npm 缓存

npm cache clean --force

## nvm - node.js 版本管理工具

```js

nvm v                 显示nvm版本
nvm list              列出本地已安装所有版本
nvm list available    添加可选参数available列出所有克下载版本
nvm install 10.22.0   安装node.js的命令 version指定版本号
nvm install stable    安装最新稳定版node.js
nvm uninstall 10.22.0 卸载node.js的命令 version指定版本号
nvm use 10.22.0       切换到指定的node.js版本，使用此版本nodejs
nvm on                启用node.js版本管理
nvm off               关闭node.js版本管理

```

## nrm - npm 下载源管理工具

```js

nrm ls 					命令 - 显示版本列表
nvm add <name> <url>	命令 - 添加源
nvm use 				命令 - 使用指定的源
nrm test <registry>		命令 - 测试响应源的响应时间
nrm del <registry>

```

## ncm - npm 依赖更新管理工具

```js
npm install -g npm-check-updates
npm-check-updates		检测所有可升级依赖
ncu -u					一键升级并更新 package.json
ncu -u to upgrade package.json
```

## npm - node 包管理工具

```shell

npm config get registry //查看 npm 当前源
npm config set registry https://registry.npm.taobao.org //设置 npm 源为淘宝
npm install --registry=https://registry.npm.taobao.org //使用特定源安装所有依赖的包
npm install express --registry=https://registry.npm.taobao.org：使用特定源安装 express 包
npm uninstall -g <packageName> 全局删除模块
npm uninstall <packageName> 删除模块
npm outdated				检查全部模块可升级选项
npm outdated <packageName>	检查特定模块可升级选项 推荐用ncm

1. 查看全局安装的package
npm ls -g
2. 查看全局安装package的路径
npm root -g
3. 查看当前项目的package
npm ls
4. 查看当前项目的package
npm root
5. 升级npm版本
npm install -g npm
6. 清除缓存
npm cache clean --force
```

## Regexp - 正则

```js
/\d{1,35}/ig

number
// 匹配折行的数字
\d{1,35},?[\n,\r].

string

'+[\S,\D]*',?
```

## **vscode**

```css
peacock  窗口颜色插件
Ctrl+Shift+P -> peacock Change -> to a Favorite Color

```
