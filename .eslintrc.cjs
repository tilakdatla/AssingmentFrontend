module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react', 'import'],
    rules: {
      'import/no-unresolved': 'error',
      'import/no-named-as-default': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  