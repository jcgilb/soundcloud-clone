"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "brad@user.io",
          username: "Brad Mehldau",
          firstName: "Brad",
          lastName: "Mehldau",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800836/previewImage/wVSlJq_I_400x400_wgyie2.jpg",
        },
        {
          email: "wes@user.io",
          username: "Wes Montgomery",
          firstName: "Wes",
          lastName: "Montgomery",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663786411/previewImage/image_mksjhp.png",
        },
        {
          email: "george@user.io",
          username: "George Benson",
          firstName: "George",
          lastName: "Benson",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1664117317/icons/commentsquare_lphvlw.jpg",
        },
        {
          email: "rdjames@user.io",
          username: "Aphex Twin",
          firstName: "Richard",
          lastName: "James",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663783590/previewImage/aphex-twin-logo-nuggie-bisma_krgzis.jpg",
        },
        {
          email: "berhana@user.io",
          username: "Berhana",
          firstName: "Amain",
          lastName: "Berhane",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663783732/previewImage/34LfZlo0_400x400_dv09qy.jpg",
        },
        {
          email: "plini@user.io",
          username: "Plini",
          firstName: "Plini",
          lastName: "Roessler-Holgate",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663783852/previewImage/plini1_rjrplc.jpg",
        },
        {
          email: "animalsasleaders@user.io",
          username: "Animals As Leaders",
          firstName: "Tosin",
          lastName: "Abasi",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665802988/imageUrl/AAL_PressPhoto-scaled_fmfifo.jpg",
        },
        {
          email: "polyphia@user.io",
          username: "Polyphia",
          firstName: "Tim",
          lastName: "Henson",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665803640/previewImage/tim_header01_1_crop_bjquxs.jpg",
        },
        {
          email: "jogger@user.io",
          username: "Jogger",
          firstName: "Amir",
          lastName: "Yaghmai",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665803918/imageUrl/jogger-1_o5i3cu.jpg",
        },
        {
          email: "mouse@user.io",
          username: "mouse on the keys",
          firstName: "Akira",
          lastName: "Kawasaki",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665804442/previewImage/Akira-Kawasaki_a8ivxr.jpg",
        },
        {
          email: "vanilla@user.io",
          username: "vanilla",
          firstName: "Hugo",
          lastName: "Harrison",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800284/imageUrl/maxresdefault_iv1yeo.jpg",
        },
        {
          email: "squarepusher@user.io",
          username: "Squarepusher",
          firstName: "Tom",
          lastName: "Jenkinson",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665805016/imageUrl/3000_zu6vza.jpg",
        },
        {
          email: "sol@user.io",
          username: "Sol",
          firstName: "Alexander",
          lastName: "Rosenberg",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665805595/previewImage/1280px-Sol__28Seattle_rapper_29_03_s1gtjc.jpg",
        },
        {
          email: "boombip@user.io",
          username: "Boom Bip",
          firstName: "Bryan",
          lastName: "Hollon",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665805861/previewImage/huge_avatar_ioca2g.jpg",
        },
        {
          email: "brotet@user.io",
          username: "The Brotet",
          firstName: "Brotet",
          lastName: "Band",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665983259/previewImage/ab6761610000e5ebb44a0f431732e030bc2e5a13_sdgdui.jpg",
        },
        {
          email: "owane@user.io",
          username: "Owane",
          firstName: "Owane",
          lastName: "Pederson",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665806642/previewImage/OS00NTg0LmpwZWc_bf2zld.jpg",
        },
        {
          email: "nujabes@user.io",
          username: "Nujabes",
          firstName: "Seba",
          lastName: "Jun",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665806902/previewImage/Nujabes_performing_live_v3ntik.jpg",
        },
        {
          email: "deadelus@user.io",
          username: "Deadelus",
          firstName: "Alfred",
          lastName: "Darlington",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665807186/previewImage/daedelus_k5azui.jpg",
        },

        {
          email: "francis@user.io",
          username: "Francis and the Lights",
          firstName: "Francis",
          lastName: "Starlite",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665807408/previewImage/francis-and-the-lights-friends_aq5bis.jpg",
        },
        {
          email: "healy@user.io",
          username: "Healy",
          firstName: "Jah",
          lastName: "Phealy",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665807584/previewImage/ab6761610000e5eb27a46f83908dd15efb8efbf6_dmwb3v.jpg",
        },
        {
          email: "raury@user.io",
          username: "Raury",
          firstName: "Raury",
          lastName: "Tullis",
          hashedPassword: bcrypt.hashSync("password"),
          previewImage:
            "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665807765/previewImage/raury-10e-2015-01_rtnyse.jpg",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        where: { username: user.map((user) => user.username) },
      },
      {}
    );
  },
};
