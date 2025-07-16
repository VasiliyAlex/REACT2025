module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/.*\\.test\\.[jt]sx?$',
      '/src/.*\\.spec\\.[jt]sx?$',
      '/src/index\\.[jt]sx?$',
      '/src/setupTests\\.[jt]s$',
      '/src/.*\\.d\\.ts$'
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