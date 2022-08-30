'use strict';

const { Song } = require('../models');

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: 'T69 collapse',
    description: 'track 1',
    url: 'https://www.youtube.com/watch?v=SqayDnQ2wmw',
    imageUrl: 'https://soundcloud.com/richarddjames/t69-collapse'
  },
  {
    albumId: 2,
    userId: 2,
    title: 'Janet',
    description: 'track 3',
    url: 'https://www.youtube.com/watch?v=PnI6jDiLdsA',
    imageUrl: 'https://soundcloud.com/berhana/janet-1'
  },
  {
    albumId: 3,
    userId: 3,
    title: 'Every Piece Matters',
    description: 'track 4',
    url: 'https://www.youtube.com/watch?v=Rv_a6rlRjZk&list=PLmAVRRr5uCHP9F_Z1w5gpar2PvsvrhFCA',
    imageUrl: 'https://soundcloud.com/plini-music/sets/handmade-cities'
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Song.bulkCreate(songs, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Song', {
      where: { title: songs.map(song => song.title) }
    }, {});
  }
};


// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Songs', [
//       {
//         albumId: 1,
//         userId: 1,
//         title: 'T69 collapse',
//         description: 'track 1',
//         url: 'https://www.youtube.com/watch?v=SqayDnQ2wmw',
//         imageUrl: 'https://soundcloud.com/richarddjames/t69-collapse'
//       },
//       {
//         albumId: 2,
//         userId: 2,
//         title: 'Janet',
//         description: 'track 3',
//         url: 'https://www.youtube.com/watch?v=PnI6jDiLdsA',
//         imageUrl: 'https://soundcloud.com/berhana/janet-1'
//       },
//       {
//         albumId: 3,
//         userId: 3,
//         title: 'Every Piece Matters',
//         description: 'track 4',
//         url: 'https://www.youtube.com/watch?v=Rv_a6rlRjZk&list=PLmAVRRr5uCHP9F_Z1w5gpar2PvsvrhFCA',
//         imageUrl: 'https://soundcloud.com/plini-music/sets/handmade-cities'
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete('Songs', {
//       title: { [Op.in]: ['Alberto Balsalm', 'Janet', 'Every Piece Matters'] }
//     }, {});
//   }
// };
