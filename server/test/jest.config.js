const path = require('path');

module.exports = {
  roots: [path.join(__dirname, '../src')],
  rootDir: path.join(__dirname, '..'),
  testEnvironment: 'node',
  coverageDirectory: path.join(__dirname, '../coverage'),
  setupFiles: ['dotenv/config'],
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 85,
      functions: 85,
      branches: 85,
      lines: 85
    }
  },
  coveragePathIgnorePatterns: [
    '.*/__tests__/.*',
    '.*/src/index.js',
    '.*/src/db.js',
    '.*/src/app.js',
    '.*/src/passport/',
    '.*/src/users/user-schema.js',
    '.*/src/projects/project-schema.js',
    '.*/src/issues/issue-schema.js',
    '.*/src/helpers/issue-schema-enums.js'
  ]
};
