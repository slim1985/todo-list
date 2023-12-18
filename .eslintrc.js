module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: [
        '**/node_modules/**',
        '**/*.d.ts.map',
        '**/*.d.ts',
        '**/dist/**',
        '**/build/**',
        'webpack.config.dev.js',
        'webpack.config.prod.js',
    ],
};
