module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  env: {
    node: true
  },
  rules: {
    'no-console': 'off',
    'require-await': 'warn'
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      rules: {
        'jest/no-standalone-expect': 'off'
      }
    }
  ]
};
