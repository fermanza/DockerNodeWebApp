import sequelize from 'sequelize';

import config from 'config';

import User from './models/user';
import Role from './models/role';

const { host, port, name, username, password } = config.database;

// initialize database connection
const db = new sequelize(
  name,
  username,
  password,
  {
    host,
    port,
    dialect: 'mysql',
    operatorsAliases: false,
    // timezone: 'America/Mexico_City' // set time zone to UTC
  }
);

// Check database connection
db.authenticate()
  .then(() => console.log('Connection to DB has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

export const UserModel = User(db, sequelize);
export const RoleModel = Role(db, sequelize);
export const dbt = db;
export const sequelizet = sequelize;

const Models = {
  User: UserModel,
  Role: RoleModel,
};

Object.keys(Models).forEach((modelName) => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models);
  }
});
