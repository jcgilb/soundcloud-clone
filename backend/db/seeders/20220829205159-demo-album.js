"use strict";

const { Album } = require("../models");

const albums = [
  {
    userId: 1,
    title: "Largo",
    description: "Released 2002",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800701/imageUrl/maxresdefault_hjogtz.jpg",
  },
  {
    userId: 2,
    title: "Boss Guitar",
    description: "Wes Mongomery",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800670/imageUrl/maxresdefault_smtuvi.jpg",
  },
  {
    userId: 3,
    title: "Breezin'",
    description: "George Benson",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800555/imageUrl/ab67616d0000b2735a5a012f4063c464eab6aec3_mfyfoq.jpg",
  },
  {
    userId: 4,
    title: "Syro",
    description: "rdjames syro album",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800501/imageUrl/maxresdefault_un2jge.jpg",
  },
  {
    userId: 4,
    title: "Drukqs",
    description: "Released 2001",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800155/imageUrl/ab67616d0000b273a5aef98a1762d0f64bb6ed9a_zzwsha.jpg",
  },
  {
    userId: 4,
    title: "Selected Ambient Works Volume II",
    description: "Released 1994",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799823/imageUrl/artworks-000060921309-12xzsv-t500x500_yzh7b7.jpg",
  },
  {
    userId: 4,
    title: "Come To Daddy",
    description: "Released 1997",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799674/imageUrl/ab67616d0000b273c4d5de8930bbc762a68c0bc7_kkqqwo.jpg",
  },

  {
    userId: 4,
    title: "...I Care Because You Do",
    description: "Released 1995",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665802425/imageUrl/AphexTwinICareBecauseYouDo_tqnt4m.jpg",
  },
  {
    userId: 5,
    title: "Berhana",
    description: "2016, 6 songs",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784185/imageUrl/qVHzKdDyeETx_jghaen.jpg",
  },
  {
    userId: 6,
    title: "Handmade Cities",
    description: "2016, 7 songs",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784406/imageUrl/Plini_-_Handmade_Cities_aqgigu.jpg",
  },
  {
    userId: 6,
    title: "Trilogy",
    description: "Released 2015",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799862/imageUrl/ab67616d0000b2732e9201c4cae199bd211c2a3c_qg3yry.jpg",
  },
  {
    userId: 7,
    title: "Parrhesia",
    description: "Released 2022",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800446/imageUrl/ab67616d0000b273ff3b01461a1689010df1a4ba_oiqgbu.jpg",
  },
  {
    userId: 7,
    title: "The Joy of Motion",
    description: "Released 2014",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800409/imageUrl/81Le-A3K89L._SS500__l1sz9f.jpg",
  },
  {
    userId: 8,
    title: "New Levels of Devils",
    description: "Released 2018",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799758/imageUrl/ab67616d0000b2737a799cc62e624fd6432779e3_tquwwg.jpg",
  },
  {
    userId: 9,
    title: "This Great Pressure",
    description: "Released 2009",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800373/imageUrl/artworks-bsec5ifu2dhc-0-t500x500_q5jigg.jpg",
  },
  {
    userId: 10,
    title: "an anxious object",
    description: "Released 2006",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800330/imageUrl/hqdefault_dqlldj.jpg",
  },
  {
    userId: 11,
    title: "Topic",
    description: "Released 2015",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800284/imageUrl/maxresdefault_iv1yeo.jpg",
  },
  {
    userId: 12,
    title: "Go Plastic",
    description: "Released 2001",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800247/imageUrl/ab67616d0000b2732094a47b6509e90af2758b2e_uinwyt.jpg",
  },
  {
    userId: 12,
    title: "Squarepusher",
    description: "Released 2004",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800187/imageUrl/ab67616d0000b2736f200b6100d266319f544f94_tzpth1.jpg",
  },
  {
    userId: 12,
    title: "Hard Normal Daddy",
    description: "Released 1997",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800026/imageUrl/a1296597700_5_ttmfhl.jpg",
  },
  {
    userId: 13,
    title: "The Headspace Traveler",
    description: "Released 2016",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665805682/imageUrl/ab67616d0000b2738d3c0269efcd88b14e37d447_odtsfd.jpg",
  },
  {
    userId: 14,
    title: "Seed to Sun",
    description: "Released 2002",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800120/imageUrl/maxresdefault_saknei.jpg",
  },
  {
    userId: 15,
    title: "Shiki No Uta",
    description: "Released 2018",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800065/imageUrl/ab67616d0000b2736b540886ef9bd8a30abab30e_vdnayb.jpg",
  },
  {
    userId: 16,
    title: "Greatest Hits (EP)",
    description: "Released 2015",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799993/imageUrl/a0243687528_10_ii3xvo.jpg",
  },
  {
    userId: 17,
    title: "2nd Collection",
    description: "Released 2007",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799722/imageUrl/d51e49f14893773a0fab7dfeb16f8c15_dorjjo.jpg",
  },
  {
    userId: 18,
    title: "Baker's Dozen: Daudelus",
    description: "Released 2017",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799639/imageUrl/ab67616d0000b273676bdd59b1d8849df9db5ec9_tvizyf.jpg",
  },
  {
    userId: 19,
    title: "Farewell, Starlite!",
    description: "Released 2016",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799566/imageUrl/ab67616d0000b27391113e5a10d92959ee12e3e6_elv7sl.jpg",
  },
  {
    userId: 20,
    title: "Tungsten",
    description: "Released 2021",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799513/imageUrl/418462900415_vpvhn3.jpg",
  },
  {
    userId: 21,
    title: "Indigo Child",
    description: "Released 2014",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799464/imageUrl/f847180d44c6b2ab9b41b6a12d61d46f.1000x1000x1_l45jtv.jpg",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Album.bulkCreate(albums, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Albums",
      {
        where: { title: albums.map((album) => album.title) },
      },
      {}
    );
  },
};
