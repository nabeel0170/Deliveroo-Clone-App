module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended'],
  ignorePatterns: [
    '**/assets/**/*.png', // Ignore all PNG files
    '**/node_modules/**',
    'dist/**',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // Handle unused vars more flexibly
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // Allow require imports for specific cases
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // Additional TypeScript-specific rules
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
