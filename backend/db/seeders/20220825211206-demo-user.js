'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'rdjames@user.io',
        username: 'Aphex Twin',
        firstName: 'Richard',
        lastName: 'James',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'berhana@user.io',
        username: 'Berhana',
        firstName: 'Amain',
        lastName: 'Berhane',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'plini@user.io',
        username: 'Plini',
        firstName: 'Plini',
        lastName: 'Roessler-Holgate',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Aphex Twin', 'Berhana', 'Plini'] }
    }, {});
  }
};