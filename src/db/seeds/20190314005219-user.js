'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'user',
      email: 'user@username.com',
      password: 'password1',
      role: 'standard',
      createdAt: '2019-03-13 07:04:00',
      updatedAt: '2019-03-13 07:05:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
