module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es5: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  globals: {},
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'max-len': [2, { code: 120 }], // allow line length upto 120 characters (airbnb default is 100)
    'no-underscore-dangle': [2, { "allow": ["_id"] }]
  },
};
