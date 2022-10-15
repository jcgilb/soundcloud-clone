"use strict";

const { Song } = require("../models");

const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "When It Rains",
    description: "Jazz",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799036/audioUrl/BRAD_MEHLDAU_When_It_Rains_odfnzx.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800701/imageUrl/maxresdefault_hjogtz.jpg",
  },
  {
    albumId: 2,
    userId: 2,
    title: "Canadian Sunset",
    description: "Jazz",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799074/audioUrl/Canadian_Sunset_bqp2v0.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800670/imageUrl/maxresdefault_smtuvi.jpg",
  },
  {
    albumId: 3,
    userId: 3,
    title: "Affirmation",
    description: "Jazz",

    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799087/audioUrl/George_Benson_-_Affirmation_yx6lrb.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800555/imageUrl/ab67616d0000b2735a5a012f4063c464eab6aec3_mfyfoq.jpg",
  },
  {
    albumId: 4,
    userId: 4,
    title: "produk 29 [101]",
    description: "from syro album",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665000851/audioUrl/Makaih_Beats_-_Perfect_Timing_yutuo5.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800501/imageUrl/maxresdefault_un2jge.jpg",
  },
  {
    albumId: 5,
    userId: 4,
    title: "Avril 14th",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799152/audioUrl/Aphex_Twin_-_Avril_14th_c9xset.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800155/imageUrl/ab67616d0000b273a5aef98a1762d0f64bb6ed9a_zzwsha.jpg",
  },
  {
    albumId: 6,
    userId: 4,
    title: "#20",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665002161/audioUrl/Viscid_-_Galvanize_fnfcsi.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799823/imageUrl/artworks-000060921309-12xzsv-t500x500_yzh7b7.jpg",
  },
  {
    albumId: 6,
    userId: 4,
    title: "Rhubarb",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799229/audioUrl/Aphex_Twin_-_Rhubarb_jflnyj.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799957/imageUrl/0022554238_10_i9ymmc.jpg",
  },
  {
    albumId: 7,
    userId: 4,
    title: "Flim",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799287/audioUrl/Aphex_Twin_-_Flim_Extended_Version_1080p_HD_HQ_xlm0wx.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799674/imageUrl/ab67616d0000b273c4d5de8930bbc762a68c0bc7_kkqqwo.jpg",
  },
  {
    albumId: 8,
    userId: 4,
    title: "Alberto Balsalm",
    description: "by Aphex Twin",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799277/audioUrl/Alberto_Balsalm_wrbaoc.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665802425/imageUrl/AphexTwinICareBecauseYouDo_tqnt4m.jpg",
  },
  {
    albumId: 9,
    userId: 5,
    title: "Janet",
    description: "track 3",
    url: "https://www.youtube.com/watch?v=PnI6jDiLdsA",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784185/imageUrl/qVHzKdDyeETx_jghaen.jpg",
  },
  {
    albumId: 10,
    userId: 6,
    title: "Every Piece Matters",
    description: "track 4",
    url: "https://www.youtube.com/watch?v=Rv_a6rlRjZk&list=PLmAVRRr5uCHP9F_Z1w5gpar2PvsvrhFCA",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1663784406/imageUrl/Plini_-_Handmade_Cities_aqgigu.jpg",
  },
  {
    albumId: 11,
    userId: 6,
    title: "Selenium Forest",
    description: "by Plini",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799217/audioUrl/Plini_-__SELENIUM_FOREST__v3yehz.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799862/imageUrl/ab67616d0000b2732e9201c4cae199bd211c2a3c_qg3yry.jpg",
  },

  {
    albumId: 12,
    userId: 7,
    title: "Monomyth",
    description: "by Animals As Leaders",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799102/audioUrl/ANIMALS_AS_LEADERS_-_Monomyth_Official_Music_Video_tlahyw.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800446/imageUrl/ab67616d0000b273ff3b01461a1689010df1a4ba_oiqgbu.jpg",
  },
  {
    albumId: 13,
    userId: 7,
    title: "Physical Education",
    description: "by Animals As Leaders",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799110/audioUrl/ANIMALS_AS_LEADERS_-_Physical_Education_Official_Music_Video_aavjce.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800409/imageUrl/81Le-A3K89L._SS500__l1sz9f.jpg",
  },

  {
    albumId: 14,
    userId: 8,
    title: "G.O.A.T.",
    description: "by Polyophia",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799247/audioUrl/Polyphia___G.O.A.T._Official_Music_Video_kyshmq.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799758/imageUrl/ab67616d0000b2737a799cc62e624fd6432779e3_tquwwg.jpg",
  },
  {
    albumId: 15,
    userId: 9,
    title: "Nephicide",
    description: "by Jogger",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799117/audioUrl/NEPHICIDE_by_JOGGER_ixypt2.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800373/imageUrl/artworks-bsec5ifu2dhc-0-t500x500_q5jigg.jpg",
  },
  {
    albumId: 16,
    userId: 10,
    title: "Spectres de Mouse",
    description: "by mouse one the keys",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799122/audioUrl/Mouse_on_the_keys_-_Spectres_de_Mouse_sxf1mo.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800330/imageUrl/hqdefault_dqlldj.jpg",
  },
  {
    albumId: 17,
    userId: 11,
    title: "Sunrise",
    description: "by Vanilla",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799128/audioUrl/Vanilla_-_Sunrise_zngar2.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800284/imageUrl/maxresdefault_iv1yeo.jpg",
  },
  {
    albumId: 18,
    userId: 12,
    title: "I Wish You Could Talk",
    description: "by Squarepusher",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799136/audioUrl/Squarepusher_-_I_Wish_You_Could_Talk_qq1cmg.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800247/imageUrl/ab67616d0000b2732094a47b6509e90af2758b2e_uinwyt.jpg",
  },
  {
    albumId: 19,
    userId: 12,
    title: "Tommib Help Buss",
    description: "by Squarepusher",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799147/audioUrl/Squarepusher_-_Tommib_Help_Buss_khnt6u.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800187/imageUrl/ab67616d0000b2736f200b6100d266319f544f94_tzpth1.jpg",
  },
  {
    albumId: 20,
    userId: 12,
    title: "Beep Street",
    description: "by Squarepusher",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799192/audioUrl/Squarepusher_-_Beep_Street_hzyosj.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800026/imageUrl/a1296597700_5_ttmfhl.jpg",
  },
  {
    albumId: 21,
    userId: 13,
    title: "Ain't Gon' Stop",
    description: "by Sol",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799143/audioUrl/Sol_-_Ain_t_Gon_Stop_ssxkhn.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800218/imageUrl/1200x1200bf-60_obxxko.jpg",
  },
  {
    albumId: 22,
    userId: 14,
    title: "Roads Must Roll",
    description: "by Boom Bip",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799173/audioUrl/Boom_Bip_-_Roads_Must_Roll_jwkjyx.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800120/imageUrl/maxresdefault_saknei.jpg",
  },
  {
    albumId: 23,
    userId: 15,
    title: "Samurai Champloo",
    description: "by The Brotet",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799181/audioUrl/_Samurai_Champloo_-_Shiki_No_Uta__Nujabes_-_The_Brotet_mnhint.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665800065/imageUrl/ab67616d0000b2736b540886ef9bd8a30abab30e_vdnayb.jpg",
  },
  {
    albumId: 24,
    userId: 16,
    title: "K",
    description: "by Owane",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799200/audioUrl/_K__jv8g7v.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799993/imageUrl/a0243687528_10_ii3xvo.jpg",
  },
  {
    albumId: 25,
    userId: 17,
    title: "Counting Stars",
    description: "by Nujabes",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799261/audioUrl/Nujabes_-_Counting_Stars_xw1dwb.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799722/imageUrl/d51e49f14893773a0fab7dfeb16f8c15_dorjjo.jpg",
  },
  {
    albumId: 26,
    userId: 18,
    title: "Lazy Sunshine",
    description: "by Daedelus",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799295/audioUrl/Daedelus_-_Lazy_Sunshine_ooatcg.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799639/imageUrl/ab67616d0000b273676bdd59b1d8849df9db5ec9_tvizyf.jpg",
  },
  {
    albumId: 27,
    userId: 19,
    title: "May I Have This Dance",
    description: "by Francis and the Lights",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799312/audioUrl/Francis_and_the_Lights_-_May_I_Have_This_Dance_feat._Chance_the_Rapper_viiz3o.mp3",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799566/imageUrl/ab67616d0000b27391113e5a10d92959ee12e3e6_elv7sl.jpg",
  },
  {
    albumId: 28,
    userId: 20,
    title: "Nikes On",
    description: "by Healy",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799319/audioUrl/Healy_-_Nikes_On_Audio_.mp3_nq7s8p.mp4",
    imageUrl:
      "https://res.cloudinary.com/ddmb8mrlb/image/upload/v1665799513/imageUrl/418462900415_vpvhn3.jpg",
  },
  {
    albumId: 29,
    userId: 21,
    title: "Superfly",
    description: "by Raury",
    url: "https://res.cloudinary.com/ddmb8mrlb/video/upload/v1665799331/audioUrl/Raury-_Superfly_mogsx5.mp4",
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
