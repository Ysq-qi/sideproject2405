const eslintConfigGoogle = require("eslint-config-google");

module.exports = [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: {
      google: eslintConfigGoogle,
    },
    rules: {
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    },
  },
  {
    files: ["**/*.spec.*"],
    env: {
      mocha: true,
    },
    rules: {},
  },
];