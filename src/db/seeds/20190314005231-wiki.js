'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wikis', [{
      title: 'Dogwiki',
      body: 'A wiki about dogs.',
      private: false,
      createdAt: '2019-03-13 07:01:00',
      updatedAt: '2019-03-13 07:02:00',
      userId: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wikis', null, {});
  }
};
