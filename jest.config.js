const jestConfig = {
  testEnvironment: "node",
  roots: ["src"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  collectCoverage: true,
  collectCoverageFrom: ["**/*.js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [],
  preset: "ts-jest/presets/js-with-babel",
};

export default jestConfig;
