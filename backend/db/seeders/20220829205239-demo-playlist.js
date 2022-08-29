'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Playlists', [
      {
        userId: 2,
        name: 'in2da city - a playlist by berhana',
        imageUrl: 'https://soundcloud.com/berhana/sets/in2dacity-a-playlist-by'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Playlists', {
      title: { [Op.in]: ['in2da city - a playlist by berhana'] }
    }, {});
  }
};
