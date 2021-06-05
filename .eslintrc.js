const path = require("path")

module.exports = {
  extends: ["plugin:prettier/recommended", "prettier/@typescript-eslint"],
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.eslint.json"),
  },
  rules: {
    "prettier/prettier": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/adjacent-overload-signatures": "warn",
        "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
        "@typescript-eslint/class-name-casing": "warn",
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "all",
            ignoreRestSiblings: false,
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false, classes: true, variables: false, typedefs: true },
        ],
        "@typescript-eslint/no-useless-constructor": "warn",
      },
    },
  ],
}