/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^public-ip$': '<rootDir>/src/__tests__/__mocks__/publicIp.js', // Mocking the public-ip module
  },
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/__tests__/__mocks__/"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};