'use strict';

const { Song } = require('../models');

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: 'I - Bells and Piano',
    description: 'I - Bells and Piano by Gregor Quendel is licensed under a Attribution-NonCommercial-NoDerivatives 4.0 International License. Link to music: https://freemusicarchive.org/music/gregor-quendel/cinematic-film-music/i-bells-and-piano-versionmp3/ ',
    url: 'https://res.cloudinary.com/ddmb8mrlb/video/upload/v1663785125/audioUrl/Gregor_Quendel_-_I_-_Bells_and_Piano_Version.mp3_rgtrk1.mp3',
    imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663785637/imageUrl/image_q6nxwq.jpg'
  },
  {
    albumId: 2,
    userId: 2,
    title: 'themme fatale',
    description: 'themme fatale by pan is licensed under a Attribution-ShareAlike 4.0 International License. Link to music: https://freemusicarchive.org/music/pan-1/single/themme-fatale/',
    url: 'https://res.cloudinary.com/ddmb8mrlb/video/upload/v1663786729/audioUrl/pan_-_themme_fatale_ieiuzm.mp3',
    imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663786527/imageUrl/image_mia43b.png'
  },
  {
    albumId: 3,
    userId: 3,
    title: 'Depth In',
    description: 'Depth In by Ketsa is licensed under a Attribution-NonCommercial-NoDerivatives 4.0 International License. Link to music: https://freemusicarchive.org/music/Ketsa/1000/depth-in/',
    url: 'https://res.cloudinary.com/ddmb8mrlb/video/upload/v1663787654/audioUrl/Ketsa_-_Depth_In_qiorvw.mp3',
    imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784406/imageUrl/Plini_-_Handmade_Cities_aqgigu.jpg'
  }
  // {
  //   albumId: 1,
  //   userId: 1,
  //   title: 'T69 collapse',
  //   description: 'track 1',
  //   url: 'https://www.youtube.com/watch?v=SqayDnQ2wmw',
  //   imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784330/imageUrl/APHEX-TWIN-COLLAPSE-EP-WINYL_me2eav.jpg'
  // },
  // {
  //   albumId: 2,
  //   userId: 2,
  //   title: 'Janet',
  //   description: 'track 3',
  //   url: 'https://www.youtube.com/watch?v=PnI6jDiLdsA',
  //   imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784185/imageUrl/qVHzKdDyeETx_jghaen.jpg'
  // },
  // {
  //   albumId: 3,
  //   userId: 3,
  //   title: 'Every Piece Matters',
  //   description: 'track 4',
  //   url: 'https://www.youtube.com/watch?v=Rv_a6rlRjZk&list=PLmAVRRr5uCHP9F_Z1w5gpar2PvsvrhFCA',
  //   imageUrl: 'https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784406/imageUrl/Plini_-_Handmade_Cities_aqgigu.jpg'
  // }
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
