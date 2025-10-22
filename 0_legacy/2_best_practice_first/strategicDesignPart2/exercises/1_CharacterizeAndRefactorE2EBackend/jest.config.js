module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tests/tsconfig.json",
    },
  },
  testEnvironment: "node",
  testRegex: "./tests/.*\\.(test|spec)?\\.(ts|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/tests"],
};
