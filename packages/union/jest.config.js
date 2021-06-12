export default {
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/lib/"
  ],
  coverageProvider: "v8",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  testEnvironment: "jsdom",
  testMatch: [
    "**/src/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/examples/",
    "/lib/"
  ],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)?$": "ts-jest",
    "^.+\\.js$": "babel-jest"
  },
  transformIgnorePatterns: [
    // "/node_modules/",
    // "/dist/",
    "\\.pnp\\.[^\\/]+$"
  ],
  verbose: true,
};
