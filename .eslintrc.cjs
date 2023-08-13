module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "vue/no-unused-components": "warn",
    "vue/no-multiple-template-root": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-inferrable-types": ["warn", {"ignoreParameters": true}],
    "@typescript-eslint/ban-ts-comment": "off",
    "no-var": "error",
    "prefer-const": "error",
  },
};