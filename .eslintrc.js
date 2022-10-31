module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  overrides: [
    {
      files: ["hardhat.config.js"],
      globals: { task: true },
    },
  ],
  rules: {
    "node/no-extraneous-require": [
      "error",
      {
        allowModules: ["@nomicfoundation/hardhat-network-helpers", "chai"],
      },
    ],
    "no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "hre",
      },
    ],
  },
};
