/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: false,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
