require('dotenv').config();

const config = require('./');

const { host, name, username, password } = config.database;

module.exports = {
  development: {
    username,
    password,
    database: name,
    host,
    dialect: 'mysql'
  },
  production: {
    username,
    password,
    database: name,
    host,
    dialect: "mysql"
  }
};