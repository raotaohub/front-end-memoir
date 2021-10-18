module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  // 所有的规则需要在这里配置
  rules: {
    eqeqeq: 'warn',
    'no-else-return': 'warn',
    'default-case': 'error',
    'array-callback-return': 'warn', // map,filter,reducer等数组方法必须有返回值
    // hooks规则
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off', // 关闭react prop-types类型检验
    // 配置@typescript-eslint的规则
    '@typescript-eslint/camelcase': 'off', // 驼峰
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      // 接口定义不允许加分号
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用any
    '@typescript-eslint/explicit-function-return-type': 'off', // 允许不显示的给函数写返回类型
    'react/display-name': 'off' // 允许在React组件定义中缺少displayName
  },
  env: {
    browser: true,
    node: true
  },
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  parserOptions: {
    //指定ESLint可以解析JSX语法
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
}
