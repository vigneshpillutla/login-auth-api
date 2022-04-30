module.exports = {
  testEnvironment: 'node',
  globalTeardown: '<rootDir>/test-teardown-globals.js',
  testMatch: ['**/tests/**/*.spec.js'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js']
};
