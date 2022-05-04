module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.spec.(ts|js)'],
  testEnvironment: 'node',
  globalTeardown: '<rootDir>/test-teardown-globals.js',
  // testMatch: ['**/tests/**/*.spec.js'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js']
};
