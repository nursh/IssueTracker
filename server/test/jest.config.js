const path = require('path');

module.exports = {
  roots: [path.join(__dirname, '../src')],
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'node',
  coverageDirectory: path.join(__dirname, '../coverage'),
  setupFiles: ['dotenv/config'],
  collectCoverageFrom: ['**/src/**/*.js'],
  coveragePathIgnorePatterns: [
    '.*/__tests__/.*',
    '.*/src/index.js',
    '.*/src/db.js',
    '.*/src/app.js',
    '.*/src/passport/',
    '.*/src/**/*-schema.js'
  ]
};
