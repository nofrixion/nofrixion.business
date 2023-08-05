module.exports = {
  extends: [
    "./index.js",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",

    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  parserOptions: {},
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        // Multiple tsconfigs (useful for monorepos)
        // use a glob pattern
        project: "packages/*/tsconfig.json",
      },
    },
  },
  ignorePatterns: ["dist/"],
};
