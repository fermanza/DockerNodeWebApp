const appRoot = require('app-root-path');
const path = require('path');

const appEnv = process.env.APP_ENV || 'development';
const basePath = appRoot.toString();
const host = process.env.HOST;
const port = process.env.PORT || 3003;
const baseUrl = appEnv === 'development' ? `${host}:${port}` : host;

module.exports = {
  appEnv,
  appKey: process.env.APP_KEY,
  host,
  baseUrl,
  basePath,

  database: {
    host: process.env.DB_HOST || 'localhost',
    name: process.env.DB_NAME || '_liferafttest',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
  },

  roles: {
    list: {
      1: 'admin',
      2: 'enduser'
    },
    usesWebApp: [1, 2],
    admin: 1,
    default: 2,
  },
  
};
