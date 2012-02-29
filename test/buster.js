var buster = require('buster');
module.exports = {
  node: {
    env: 'node',
    tests: ['./**/*-test.js']
  }
  //browser: {
    //env: 'browser',
    //sources: ['../lib/**/*.js'],
    //tests: ['test/**/*-test.js']
  //}
};
