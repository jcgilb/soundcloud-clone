const express = require('express');
const { Song, User, Album } = require('../../db/models');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');

const router = express.Router();

// const validateAlbumRequests = [
//     check('title')
//         .exists({ checkFalsy: true })
//         .withMessage('Song title is required.'),
//     check('url')
//         .exists({ checkFalsy: true })
//         .withMessage('Audio is required.'),
//     handleValidationErrors
// ];

// // Get all albums
// // Authentication: false
// router.get('/', async (req, res) => {
//     const albums = await Album.findAll();
//     return res.json(albums);
// });

// // Get all albums created by the current user
// // Authentication: true
// router.get('/current', requireAuth, async (req, res) => {
//     const { user } = req;
//     if (user) {
//         const albums = await Album.findAll({
//             where: { userId: user.id }
//         });
//         return res.json({ albums });
//     } else {
//         res.status(401);
//         return res.json({
//             "message": "Authentication required",
//             "statusCode": 401
//         });
//     }
// });

// // Get details of an album by id
// // Authentication: false
// router.get('/:albumId', async (req, res) => {
//     const album = await Album.findOne({
//         where: { id: req.params.albumId },
//         include: [
//             { model: User, as: 'Artist', attributes: ['id', 'username', 'previewImage'] },
//             { model: Song }
//         ]
//     });
//     if (album) {
//         console.log("will this print")
//         return res.json(album);
//     } else {
//         res.status(404)
//         return res.json({
//             "message": "album couldn't be found"
//         });
//     }
// });

// // Create an album 
// // Authentication: true
// router.post('/', async (req, res) => {
//     const newAlbum = await Album.create({
//         userId: req.user.id,
//         title: req.body.title,
//         description: req.body.description,
//         imageUrl: req.body.imageUrl
//     });
//     if (!newAlbum) {
//         res.status(400);
//         return res.json({
//             "message": "Validation Error",
//             "statusCode": 400,
//             "errors": {
//                 "title": "Album title is required",
//                 "url": "Audio is required"
//             }
//         });
//     } else {
//         return res.json(newAlbum);
//     }
// });

// // Edit a Album - PUT /:albumId
// // Authentication: true
// router.put('/:albumId', requireAuth, async (req, res) => {
//     const lastAlbum = await Album.findAll({
//         order: [['id', 'DESC']],
//         limit: 1,
//         raw: true
//     });
//     if (req.params.albumId < 0 || req.params.albumId > lastAlbum[0].id) {
//         res.status(404);
//         return res.json({
//             "message": "Album couldn't be found",
//             "statusCode": 404
//         });
//     }
//     if (req.user) {
//         const album = await Album.findOne({
//             where: { id: req.params.albumId }
//         });
//         if (req.user.id !== album.userId) {
//             res.status(403);
//             return res.json({
//                 "message": "Forbidden",
//                 "statusCode": 403
//             })
//         }
//         if (album) {
//             if (req.body.title) {
//                 album.title = req.body.title;
//                 album.description = req.body.description;
//                 album.imageUrl = req.body.imageUrl;
//                 album.save();
//                 return res.json(album);
//             } else {
//                 res.status(400);
//                 return res.json({
//                     "message": "Validation Error",
//                     "statusCode": 400,
//                     "errors": {
//                         "title": "Album title is required"
//                     }
//                 });
//             }
//         } else {
//             res.status(404);
//             return res.json({
//                 "message": "Album couldn't be found",
//                 "statusCode": 404
//             });
//         }
//     } else {
//         res.status(401);
//         return res.json({
//             "message": "Authentication required",
//             "statusCode": 401
//         });
//     }
// });

// // Delete a album
// // Authentication: true
// router.delete('/:albumId', requireAuth, async (req, res) => {
//     if (req.user) {
//         const album = await Album.findByPk(req.params.albumId);
//         if (!album) {
//             res.status(404);
//             return res.json({
//                 "message": "Album couldn't be found",
//                 "statusCode": 404
//             });
//         } else if (req.user.id !== album.userId) {
//             res.status(403);
//             return res.json({
//                 "message": "Forbidden",
//                 "statusCode": 403
//             })
//         } else {
//             await album.destroy();
//             return res.json({
//                 "message": "Successfully deleted",
//                 "statusCode": 200
//             });
//         }
//     } else {
//         res.status(401);
//         return res.json({
//             "message": "Authentication required",
//             "statusCode": 401
//         });
//     }
// });


module.exports = router;