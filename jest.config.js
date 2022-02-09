module.exports = {
  testEnvironment: 'jsdom',
  preset: '@shelf/jest-mongodb',
  testEnvironment: '<rootDir>/custom-test-env.js',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts']
}
