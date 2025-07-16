module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      'src/**/*.test.{js,jsx,ts,tsx}',
      'src/**/*.spec.{js,jsx,ts,tsx}',
      'src/index.{js,jsx,ts,tsx}',
      'src/setupTests.{js,ts}',
      'src/**/*.d.ts'
    ],
    coverageThreshold: {
      global: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50
      }
    }
  };