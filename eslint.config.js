import html from '@html-eslint/eslint-plugin';
import { TEMPLATE_ENGINE_SYNTAX } from '@html-eslint/parser';
import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
    rules: {
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
    },
  },
  {
    files: ['**/*.{html,njk}'],
    plugins: {
      '@html-eslint': html,
    },
    language: '@html-eslint/html',
    languageOptions: {
      templateEngineSyntax: TEMPLATE_ENGINE_SYNTAX.TWIG,
    },
    rules: {
      '@html-eslint/no-multiple-empty-lines': ['error', { max: 1 }],
      '@html-eslint/quotes': ['error', 'double'],
    },
  },
];
