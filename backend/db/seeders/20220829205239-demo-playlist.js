'use strict';

const { Playlist } = require('../models');

const playlists = [
  {
    userId: 2,
    name: 'in2da city - a playlist by berhana',
    imageUrl: 'https://soundcloud.com/berhana/sets/in2dacity-a-playlist-by'
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Playlist.bulkCreate(playlists, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Playlist', {
      where: { title: playlists.map(playlist => playlist.title) }
    }, {});
  }
};



// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Playlists', [
//       {
//         userId: 2,
//         name: 'in2da city - a playlist by berhana',
//         imageUrl: 'https://soundcloud.com/berhana/sets/in2dacity-a-playlist-by'
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete('Playlists', {
//       title: { [Op.in]: ['in2da city - a playlist by berhana'] }
//     }, {});
//   }
// };
