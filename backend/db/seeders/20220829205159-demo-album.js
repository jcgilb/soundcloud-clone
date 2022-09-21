'use strict';

const { Album } = require('../models');

const albums = [

  {
    userId: 1,
    title: 'Cinematic Film Music',
    description: 'Classical, Soundtrack, Experimental, Contemporary Classical, Acoustic',
    imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663785637/imageUrl/image_q6nxwq.jpg'
  },
  {
    userId: 2,
    title: 'themme fatale',
    description: 'Blues, Rock, Soundtrack, Lo-fi Rock, Minimalism, Instrumental, Lo-fi Instrumental',
    imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663786527/imageUrl/image_mia43b.png'
  },
  {
    userId: 3,
    title: 'Kesta 1000',
    description: 'International, Novelty, Soundtrack, Ambient Electronic, Ambient, Glitch, Chill-out, Downtempo, Instrumental, Lo-fi Instrumental',
    imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663787444/imageUrl/image_hztzyu.jpg'
  }
  // {
  //   userId: 1,
  //   title: 'Collapse EP',
  //   description: '2018, 5 songs',
  //   imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784330/imageUrl/APHEX-TWIN-COLLAPSE-EP-WINYL_me2eav.jpg'
  // },
  // {
  //   userId: 2,
  //   title: 'Berhana',
  //   description: '2016, 6 songs',
  //   imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784185/imageUrl/qVHzKdDyeETx_jghaen.jpg'
  // },
  // {
  //   userId: 3,
  //   title: 'Handmade Cities',
  //   description: '2016, 7 songs',
  //   imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784406/imageUrl/Plini_-_Handmade_Cities_aqgigu.jpg'
  // }
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
