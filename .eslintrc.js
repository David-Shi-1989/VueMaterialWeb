module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eol-last': 0,
    'object-curly-spacing': 1,
    'vue/no-unused-components': 1,
    'no-trailing-spaces': 1,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/type-annotation-spacing': 1
  }
}
