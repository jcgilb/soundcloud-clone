'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'gquendel@user.io',
        username: 'Gregor Quendel',
        firstName: 'Gregor',
        lastName: 'Quendel',
        hashedPassword: bcrypt.hashSync('password'),
        previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663785258/previewImage/image_mkamxb.jpg"
      },
      {
        email: 'pan@user.io',
        username: 'pan',
        firstName: 'Pan',
        lastName: 'Music',
        hashedPassword: bcrypt.hashSync('password2'),
        previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663786411/previewImage/image_mksjhp.png"
      },
      {
        email: 'kesta@user.io',
        username: 'Kesta',
        firstName: 'Kesta',
        lastName: 'Music',
        hashedPassword: bcrypt.hashSync('password3'),
        previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663787236/previewImage/image_eas8ux.jpg"
      },
      {
        email: 'makaih@user.io',
        username: 'Makaih Beats',
        firstName: 'Makaih',
        lastName: 'Beats',
        hashedPassword: bcrypt.hashSync('password'),
        previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665000880/imageUrl/image_tum7j8.webp"
      },
      {
        email: 'viscid@user.io',
        username: 'Viscid',
        firstName: 'Viscid',
        lastName: 'Music',
        hashedPassword: bcrypt.hashSync('password'),
        previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665000880/imageUrl/image_tum7j8.webp"
      }
      // {
      //   email: 'rdjames@user.io',
      //   username: 'Aphex Twin',
      //   firstName: 'Richard',
      //   lastName: 'James',
      //   hashedPassword: bcrypt.hashSync('password'),
      //   previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663783590/previewImage/aphex-twin-logo-nuggie-bisma_krgzis.jpg"
      // },
      // {
      //   email: 'berhana@user.io',
      //   username: 'Berhana',
      //   firstName: 'Amain',
      //   lastName: 'Berhane',
      //   hashedPassword: bcrypt.hashSync('password2'),
      //   previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663783732/previewImage/34LfZlo0_400x400_dv09qy.jpg"
      // },
      // {
      //   email: 'plini@user.io',
      //   username: 'Plini',
      //   firstName: 'Plini',
      //   lastName: 'Roessler-Holgate',
      //   hashedPassword: bcrypt.hashSync('password3'),
      //   previewImage: "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663783852/previewImage/plini1_rjrplc.jpg"
      // }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      // username: { [Op.in]: ['Aphex Twin', 'Berhana', 'Plini'] }
      username: { [Op.in]: ['Gregor Quendel', 'pan', 'Kesta'] }
    }, {});
  }
};