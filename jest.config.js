/** @type {import('jest').Config} */
const config = {
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['text', 'html', 'cobertura'],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules'],

    transform: { '\\.[tj]sx?$': 'ts-jest' },

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\dist\\\\'],

    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!src/types/*.ts',
        '!src/utils/*.{js,ts}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!src/index.tsx',
    ],

    coverageThreshold: {
        global: {
            statements: 90,
        },
    },
};

module.exports = config;
