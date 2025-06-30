const jwt = require('jsonwebtoken');
require('dotenv').config();

function sign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { sign };
