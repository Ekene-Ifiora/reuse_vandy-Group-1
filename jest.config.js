module.exports = {
    testEnvironment: "jsdom",
    setupFiles: ["jest-localstorage-mock"],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    roots: ['./src/hooks'],
    testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
    coverageDirectory: "jest-coverage"
};