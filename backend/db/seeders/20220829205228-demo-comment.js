'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        songId: 1,
        userId: 1,
        body: 'hi aphextwin'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Comments', {
      id: { [Op.in]: [1] }
    }, {});
  }
};
