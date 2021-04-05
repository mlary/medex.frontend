module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-typescript',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'max-len': [2, 140, 4, { ignoreUrls: true }],
    'import/no-cycle': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-inferrable-types': 0,
    'linebreak-style': 0,
    'max-classes-per-file': 0,
    'spaced-comment': 0,
    'no-console': 0,
    'eol-last': 0,
    '@typescript-eslint/quotes': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/await-thenable': 0,
    'react/jsx-props-no-spreading': 0,
    'no-underscore-dangle': 0,
    'comma-dangle': ['error', 'ignore'],
  },
};
