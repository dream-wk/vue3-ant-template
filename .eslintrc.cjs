module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest', // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    jsxPragma: 'React',
    ecmaFeatures: {
      tsx: true, // Allows for the parsing of JSX
      jsx: true,
    },
    createDefaultProgram: false,
    extraFileExtensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'], // '.ts', '.tsx', '.js', '.jsx' 这里可以不用这些的
  },
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
