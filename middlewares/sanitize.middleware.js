const xss = require('xss-clean');
const helmet = require('helmet');

module.exports = [helmet(), xss()];
