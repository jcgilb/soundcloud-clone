"use strict";

const { Song } = require("../models");

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "When It Rains",
    description: "Jazz",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200619/audioUrl/clair-de-lune-prelude-claude-debussy-concert-grand-piano-6681_j9yvz6.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800701/imageUrl/maxresdefault_hjogtz.jpg",
  },
  {
    albumId: 2,
    userId: 2,
    title: "Canadian Sunset",
    description: "Jazz",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200641/audioUrl/nocturne-in-d-flat-major-op-27-no-2-frederic-chopin-513s-12489_s3pc0h.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800670/imageUrl/maxresdefault_smtuvi.jpg",
  },
  {
    albumId: 3,
    userId: 3,
    title: "Affirmation",
    description: "Jazz",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200645/audioUrl/peter-tchaikovsky-old-french-song-opus-39-16-classical-remix-7692_tru56i.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800555/imageUrl/ab67616d0000b2735a5a012f4063c464eab6aec3_mfyfoq.jpg",
  },
  {
    albumId: 4,
    userId: 4,
    title: "produk 29 [101]",
    description: "from syro album",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200704/audioUrl/classical-piano-by-chopin-sonate-op-35-trauermarsch-119909_p7lvzh.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800501/imageUrl/maxresdefault_un2jge.jpg",
  },
  {
    albumId: 5,
    userId: 4,
    title: "Avril 14th",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200734/audioUrl/moonlight-sonata-sonate-no-14-1st-movement-ludwig-van-bethoven-12490_ntwjay.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800155/imageUrl/ab67616d0000b273a5aef98a1762d0f64bb6ed9a_zzwsha.jpg",
  },
  {
    albumId: 6,
    userId: 4,
    title: "#20",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200742/audioUrl/le-cygne-camille-saint-saens-le-carnaval-des-animaux-1886-piano-9290_nps2il.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799823/imageUrl/artworks-000060921309-12xzsv-t500x500_yzh7b7.jpg",
  },
  {
    albumId: 6,
    userId: 4,
    title: "Rhubarb",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200641/audioUrl/nocturne-in-d-flat-major-op-27-no-2-frederic-chopin-513s-12489_s3pc0h.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799957/imageUrl/0022554238_10_i9ymmc.jpg",
  },
  {
    albumId: 7,
    userId: 4,
    title: "Flim",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200645/audioUrl/peter-tchaikovsky-old-french-song-opus-39-16-classical-remix-7692_tru56i.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1666285640/previewImage/57723_mhfflz.jpg",
  },
  {
    albumId: 8,
    userId: 4,
    title: "Alberto Balsalm",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200704/audioUrl/classical-piano-by-chopin-sonate-op-35-trauermarsch-119909_p7lvzh.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1666286066/previewImage/gcl60ucb8aw01_gdxnye.jpg",
  },
  {
    albumId: 9,
    userId: 5,
    title: "Janet",
    description: "track 3",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200734/audioUrl/moonlight-sonata-sonate-no-14-1st-movement-ludwig-van-bethoven-12490_ntwjay.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784185/imageUrl/qVHzKdDyeETx_jghaen.jpg",
  },
  {
    albumId: 10,
    userId: 6,
    title: "Every Piece Matters",
    description: "track 4",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200742/audioUrl/le-cygne-camille-saint-saens-le-carnaval-des-animaux-1886-piano-9290_nps2il.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784406/imageUrl/Plini_-_Handmade_Cities_aqgigu.jpg",
  },
  {
    albumId: 11,
    userId: 6,
    title: "Selenium Forest",
    description: "by Plini",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202196/audioUrl/classical-piano-by-debussy-reflections-in-the-water-120121_qlzkpv.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799862/imageUrl/ab67616d0000b2732e9201c4cae199bd211c2a3c_qg3yry.jpg",
  },

  {
    albumId: 12,
    userId: 7,
    title: "Monomyth",
    description: "by Animals As Leaders",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202211/audioUrl/peter-tchaikovsky-overture-from-nutcracker-classical-remix-7695_ahctnp.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800446/imageUrl/ab67616d0000b273ff3b01461a1689010df1a4ba_oiqgbu.jpg",
  },
  {
    albumId: 13,
    userId: 7,
    title: "Physical Education",
    description: "by Animals As Leaders",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202223/audioUrl/frederic-chopin-nocturne-in-b-flat-minor-op9-1-classical-remix-7613_srgqou.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800409/imageUrl/81Le-A3K89L._SS500__l1sz9f.jpg",
  },
  {
    albumId: 14,
    userId: 8,
    title: "G.O.A.T.",
    description: "by Polyophia",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202232/audioUrl/frederic-chopin-nocturne-in-f-major-op-15-1-classical-remix-7616_muyfyy.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799758/imageUrl/ab67616d0000b2737a799cc62e624fd6432779e3_tquwwg.jpg",
  },
  {
    albumId: 15,
    userId: 9,
    title: "Nephicide",
    description: "by Jogger",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202243/audioUrl/peter-tchaikovsky-mazurka-opus-39-10-classical-remix-7690_ovclhq.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800373/imageUrl/artworks-bsec5ifu2dhc-0-t500x500_q5jigg.jpg",
  },
  {
    albumId: 16,
    userId: 10,
    title: "Spectres de Mouse",
    description: "by mouse one the keys",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202262/audioUrl/piano-orchestra-ballad-in-d-major-3691_qkfzkh.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800330/imageUrl/hqdefault_dqlldj.jpg",
  },
  {
    albumId: 17,
    userId: 11,
    title: "Sunrise",
    description: "by Vanilla",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202274/audioUrl/fantasie-impromtu-by-fredric-chopin-classic-guitar-ahmad-mousavipour-13871_i60bx0.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800284/imageUrl/maxresdefault_iv1yeo.jpg",
  },
  {
    albumId: 18,
    userId: 12,
    title: "I Wish You Could Talk",
    description: "by Squarepusher",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202287/audioUrl/bach_suite-16611_o6nd3u.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800247/imageUrl/ab67616d0000b2732094a47b6509e90af2758b2e_uinwyt.jpg",
  },
  {
    albumId: 19,
    userId: 12,
    title: "Tommib Help Buss",
    description: "by Squarepusher",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202291/audioUrl/walzer-in-e_moll-ferdinando-carulli-guitar-ahmad-mousavipour-happy-new-year-13386_o9bwzn.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800187/imageUrl/ab67616d0000b2736f200b6100d266319f544f94_tzpth1.jpg",
  },
  {
    albumId: 20,
    userId: 12,
    title: "Beep Street",
    description: "by Squarepusher",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200619/audioUrl/clair-de-lune-prelude-claude-debussy-concert-grand-piano-6681_j9yvz6.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800026/imageUrl/a1296597700_5_ttmfhl.jpg",
  },
  {
    albumId: 21,
    userId: 13,
    title: "Ain't Gon' Stop",
    description: "by Sol",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200641/audioUrl/nocturne-in-d-flat-major-op-27-no-2-frederic-chopin-513s-12489_s3pc0h.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800218/imageUrl/1200x1200bf-60_obxxko.jpg",
  },
  {
    albumId: 22,
    userId: 14,
    title: "Roads Must Roll",
    description: "by Boom Bip",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200645/audioUrl/peter-tchaikovsky-old-french-song-opus-39-16-classical-remix-7692_tru56i.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800120/imageUrl/maxresdefault_saknei.jpg",
  },
  {
    albumId: 23,
    userId: 15,
    title: "Samurai Champloo",
    description: "by The Brotet",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666200734/audioUrl/moonlight-sonata-sonate-no-14-1st-movement-ludwig-van-bethoven-12490_ntwjay.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800065/imageUrl/ab67616d0000b2736b540886ef9bd8a30abab30e_vdnayb.jpg",
  },
  {
    albumId: 24,
    userId: 16,
    title: "K",
    description: "by Owane",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202196/audioUrl/classical-piano-by-debussy-reflections-in-the-water-120121_qlzkpv.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799993/imageUrl/a0243687528_10_ii3xvo.jpg",
  },
  {
    albumId: 25,
    userId: 17,
    title: "Counting Stars",
    description: "by Nujabes",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202287/audioUrl/bach_suite-16611_o6nd3u.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799722/imageUrl/d51e49f14893773a0fab7dfeb16f8c15_dorjjo.jpg",
  },
  {
    albumId: 26,
    userId: 18,
    title: "Lazy Sunshine",
    description: "by Daedelus",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202274/audioUrl/fantasie-impromtu-by-fredric-chopin-classic-guitar-ahmad-mousavipour-13871_i60bx0.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799639/imageUrl/ab67616d0000b273676bdd59b1d8849df9db5ec9_tvizyf.jpg",
  },
  {
    albumId: 27,
    userId: 19,
    title: "May I Have This Dance",
    description: "by Francis and the Lights",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202211/audioUrl/peter-tchaikovsky-overture-from-nutcracker-classical-remix-7695_ahctnp.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799566/imageUrl/ab67616d0000b27391113e5a10d92959ee12e3e6_elv7sl.jpg",
  },
  {
    albumId: 28,
    userId: 20,
    title: "Nikes On",
    description: "by Healy",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202297/audioUrl/jazz-it-up-1227_r66vje.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799513/imageUrl/418462900415_vpvhn3.jpg",
  },
  {
    albumId: 29,
    userId: 21,
    title: "Superfly",
    description: "by Raury",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1666202196/audioUrl/classical-piano-by-debussy-reflections-in-the-water-120121_qlzkpv.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799464/imageUrl/f847180d44c6b2ab9b41b6a12d61d46f.1000x1000x1_l45jtv.jpg",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await Song.bulkCreate(songs, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Song",
      {
        where: { title: songs.map((song) => song.title) },
      },
      {}
    );
  },
};
