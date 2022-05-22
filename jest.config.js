import("jest-config");

module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended/all", "./setup.js"],
  testMatch: [
    "<rootDir>/__tests__/unit/**/*.ts",
    "<rootDir>/__tests__/api/**/*.ts",
  ],
};
