/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],

  moduleNameMapper: {
    "^public-ip$": "<rootDir>/src/__tests__/__mocks__/publicIp.js", // Mocking the public-ip module
  },
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/__tests__/__mocks__/",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
