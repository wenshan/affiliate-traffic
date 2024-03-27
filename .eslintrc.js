module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  rules: {
    'no-unused-vars': 'off',
    'array-callback-return': 'off',
  },
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
};
