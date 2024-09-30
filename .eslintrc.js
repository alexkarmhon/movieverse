module.exports = {
  parser: '@typescript-eslint/parser', // Використовуємо TypeScript парсер для ESLint
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'const' },
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'let' },
      { blankLine: 'always', prev: 'let', next: '*' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: 'for', next: '*' },
      { blankLine: 'always', prev: '*', next: 'while' },
      { blankLine: 'always', prev: 'while', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: 'switch', next: '*' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'always', prev: 'export', next: '*' },
      { blankLine: 'always', prev: '*', next: 'import' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'always', prev: '*', next: 'class' },
      { blankLine: 'always', prev: 'class', next: '*' },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json', // Додайте цей рядок, якщо використовуєте TypeScript проєкт
  },
};
