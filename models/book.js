const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});

User.hasMany(Book, { foreignKey: 'userId', onDelete: 'CASCADE' });
Book.belongsTo(User, { foreignKey: 'userId' });

module.exports = Book;
