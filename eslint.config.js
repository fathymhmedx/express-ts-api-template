import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';

/**
 * ESLint Flat Config v9+ for TypeScript + Node.js + Express projects
 */
export default [
  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      onlyWarn,
    },
    rules: {
      // TypeScript Best Practices
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_|^next$', // ignore _ or next
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // allow any
      '@typescript-eslint/explicit-function-return-type': 'off', // optional

      // Prettier
      ...prettier.rules,
    },
  },

  // Declaration files (.d.ts)
  {
    files: ['**/*.d.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    rules: {
      // Disable rules that don't make sense in type declaration files
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Ignore dist, node_modules, coverage
  {
    name: 'local/ignores',
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
];
