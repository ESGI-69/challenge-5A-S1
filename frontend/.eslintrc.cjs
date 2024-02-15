module.exports = {
  root: true,
  env: { browser: true, es2020: true, "jest": true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    quotes: [ "error", "single" ],
    "comma-dangle": [ "error", "always-multiline" ],
    "no-console": [ "warn", { "allow": [ "warn", "error" ] } ],
    "quote-props": [ "error", "as-needed" ],
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "object-curly-spacing": [ "error", "always" ],
    "object-shorthand": [ "error", "always" ],
    "array-bracket-newline": [
      "error",
      {
        "multiline": true,
        "minItems": 3
      }
    ],
    "array-bracket-spacing": [ "error", "always" ],
    "array-element-newline": [
      "error",
      {
        "multiline": true,
        "minItems": 3
      }
    ],
    "arrow-body-style": [ "error", "as-needed" ],
    "semi": [ "error", "always" ],
    "no-else-return": "error",
    "no-trailing-spaces": "error",
    "prefer-destructuring": [
      "error",
      {
        "array": true,
        "object": true
      },
      {
        "enforceForRenamedProperties": false
      }
    ],
    "eol-last": [ "error", "always" ],
    "keyword-spacing": [ "error", { "before": true, "after": true } ],
    "comma-spacing": [ "error", { "before": false, "after": true } ],
    "no-empty": [ "error", { "allowEmptyCatch": true } ],
    "prefer-template": "error",
    "no-multiple-empty-lines": [ "error", { "max": 1 } ],
    "sort-imports": [ "error", { "ignoreDeclarationSort": true } ],
  },
}
