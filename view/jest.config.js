module.exports =  {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest for TypeScript + JSX
    "^.+\\.jsx?$": "babel-jest", // Use ts-jest for TypeScript + JSX
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
  },
  testMatch: ["<rootDir>/src/__tests__/**/*.test.[jt]s?(x)"], // Match test files
};
