## babel 版本问题

官方默认`babel-loader`,`babel`  对应的版本需要一致
即`babel-loader`需要搭配最新版本`babel`

@babel 均要使用同一版本，如 7.12.0

```
"@babel/core": "^7.12.0",
"@babel/preset-env": "^7.12.0",
"@babel/preset-react": "^7.12.0",
"babel-loader": "^8.2.2",
```

[babel-loader - npm (npmjs.com)](https://www.npmjs.com/package/babel-loader)

![[Pasted image 20230621020924.png]]

## npm 安装版本不一致原因
