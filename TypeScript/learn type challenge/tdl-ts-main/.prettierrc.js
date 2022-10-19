/*
 * https://www.prettier.cn/docs/options.html
 * 全部检查
 * npx prettier --check .
 * 全部修复
 * npx prettier --write .
 */
module.exports = {
    printWidth: 100,
    semi: false, // 在语句末尾打印分号(默认ture)
    singleQuote: true, // 使用单引号
    jsxSingleQuote: true, // 在jsx中也使用单引号
    arrowParens: 'avoid',
    insertPragma: false,
    tabWidth: 2,
    useTabs: false,
    endOfLine: 'auto',
    trailingComma: 'none',
    bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
    proseWrap: 'never'
}
