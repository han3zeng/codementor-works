const config = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

module.exports = config;
