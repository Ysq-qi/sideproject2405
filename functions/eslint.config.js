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
      "quotes": ["off", "double", { "allowTemplateLiterals": true }], //關閉引號檢查
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