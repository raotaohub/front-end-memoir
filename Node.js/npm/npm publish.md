1. 注册 npm 账号 https://www.npmjs.com/
2. 本地通过命令行 `npm login` 登陆
3. 进入到项目目录下（与 package.json 同级），在 package.json files字段指定发布文件、文件夹 

```json
{
  "name": "pkg-xxx",
  "version": "0.0.1",
  "main": "lib/index.js",
  "module": "esm/index.js",
  "typings": "types/index.d.ts",
  "files": [
    "CHANGELOG.md",
    "lib",
    "esm",
    "dist",
    "types",
  ],
  ...
}
```

执行 `npm publish --registry=https://registry.npmjs.org/` 即可发布