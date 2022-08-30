'use strict';

const { Album } = require('../models');

const albums = [
  {
    userId: 1,
    title: 'Collapse EP',
    description: '2018, 5 songs',
    imageUrl: 'https://soundcloud.com/richarddjames/sets/collapse-ep-4'
  },
  {
    userId: 2,
    title: 'Berhana',
    description: '2016, 6 songs',
    imageUrl: 'https://soundcloud.com/berhana/sets/berhana-2'
  },
  {
    userId: 3,
    title: 'Handmade Cities',
    description: '2016, 7 songs',
    imageUrl: 'https://soundcloud.com/plini-music/handmade-cities'
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Album.bulkCreate(albums, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', {
      where: { title: albums.map(album => album.title) }
    }, {});
  }
};



// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return await queryInterface.bulkCreate('Albums', [
//       {
//         userId: 1,
//         title: 'Collapse EP',
//         description: '2018, 5 songs',
//         imageUrl: 'https://soundcloud.com/richarddjames/sets/collapse-ep-4'
//         // imageUrl: '../frontend/assets/aphex-twin-i-care-because-you-do.jpg'
//       },
//       {
//         userId: 2,
//         title: 'Berhana',
//         description: '2016, 6 songs',
//         // imageUrl: '../frontend/assets/berhana.jpg',
//         imageUrl: 'https://soundcloud.com/berhana/sets/berhana-2'
//       },
//       {
//         userId: 3,
//         title: 'Handmade Cities',
//         description: '2016, 7 songs',
//         // imageUrl: '../frontend/assets/handmade-cities.jpg',
//         imageUrl: 'https://soundcloud.com/plini-music/handmade-cities'
//       }
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     const Op = Sequelize.Op;
//     return await queryInterface.bulkDelete('Albums', {
//       title: { [Op.in]: ['Collapse EP', 'Berhana', 'Handmade Cities'] }
//     }, {});
//   }
// };
