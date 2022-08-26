'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn('Users', 'lastName');
  }
};
