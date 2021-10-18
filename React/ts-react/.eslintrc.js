module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  // 所有的规则需要在这里配置
  rules: {
    eqeqeq: 'warn',
    'default-case': 'error',
    'no-lonely-if': 'warn',
    'no-else-return': 'warn',
    'no-unmodified-loop-condition': 'warn',
    'prefer-arrow-callback': 'error',
    // 必须驼峰
    '@typescript-eslint/camelcase': 'off',
    // map,filter,reducer等数组方法必须有返回值
    'array-callback-return': 'warn',
    // hooks规则
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // 关闭react prop-types类型检验
    'react/prop-types': 'off',
    // 配置@typescript-eslint的规则
    '@typescript-eslint/interface-name-prefix': 'off',
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
    // 允许使用any
    '@typescript-eslint/no-explicit-any': 'off',
    // 允许不显示的给函数写返回类型
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 允许在React组件定义中缺少displayName
    'react/display-name': 'off',
    'react/jsx-no-target-blank': 'off'
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
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
}
