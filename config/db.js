const { Sequelize } = require('sequelize');
require('dotenv').config();
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false
  }
);

module.exports = sequelize;
