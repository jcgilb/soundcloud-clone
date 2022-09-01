const express = require('express');
const { Song, Playlist, PlaylistSong } = require('../../db/models');
const { check } = require('express-validator');


const router = express.Router();

// // Create a Playlist
// // Authentication: true
// router.post('/', async (req, res) => {
//     if (req.body.name) {
//         const newPlaylist = await Playlist.create({
//             userId: req.user.id,
//             name: req.body.name,
//             imageUrl: req.body.imageUrl
//         });
//         return res.json(newPlaylist);
//     } else {
//         res.status(400);
//         return res.json({
//             "message": "Validation Error",
//             "statusCode": 400,
//             "errors": {
//                 "name": "Playlist name is required"
//             }
//         });
//     }
// });

// // Add a Song to a Playlist based on the Playlists's id
// // Authentication: true
// // need to exclude createdAt updatedAt
// router.post('/:playlistId/songs', requireAuth, async (req, res) => {
//     const song = await Song.findByPk(req.body.songId);
//     if (song) {
//         const playlist = await Playlist.findByPk(req.params.playlistId);
//         if (playlist) {
//             const newPlaylistSong = await PlaylistSong.create({
//                 songId: song.id,
//                 playlistId: playlist.id,
//             });
//             return res.json(newPlaylistSong);
//         } else {
//             res.status(404);
//             res.json({
//                 "message": "Song couldn't be found",
//                 "statusCode": 404
//             });
//         }
//     } else {
//         res.status(404);
//         res.json({
//             "message": "Song couldn't be found",
//             "statusCode": 404
//         });
//     }
// });

// // Get details of a Playlist from an id
// // Authentication: false
// router.get('/:playlistId', async (req, res) => {
//     const playlistDetails = await Playlist.findOne({
//         where: { id: req.params.playlistId },
//         include: {
//             model: PlaylistSong,
//             where: { playlistId: req.params.playlistId },
//             through: { attributes: [] },
//             include: {
//                 model: Song,
//                 where: { id: req.params.playlistId },
//                 attributes:
//                     ['id', 'userId', 'albumId', 'title', 'description',
//                         'url', 'createdAt', 'updatedAt', 'imageUrl'
//                     ]
//             }
//         }

//     });
//     return res.json(playlistDetails);
// });


module.exports = router;
