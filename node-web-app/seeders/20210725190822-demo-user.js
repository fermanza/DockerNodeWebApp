'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const psw = await bcrypt.hash("123123", 10);
    await queryInterface.bulkInsert('users', [{
      name: 'Fernando',
      address: 'Valle Real',
      phone_number: '3314118887',
      email: 'fermanza@gmail.com',
      roleId: 1,
      password: psw ,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
