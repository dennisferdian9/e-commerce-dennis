import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginReact from 'eslint-plugin-react';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
    plugins: {
      prettier,
      react: eslintPluginReact,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off', // No need for React import in JSX/TSX files
      'react/jsx-uses-react': 'off', // React is not explicitly used in JSX/TSX files
    },
    settings: {
      react: {
        version: 'detect', // Automatically detects the React version
      },
    },
  },
];

// Export the config array
export default config;
