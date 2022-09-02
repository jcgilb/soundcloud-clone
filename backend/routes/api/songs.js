const express = require('express');
const { Song, User, Album, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
// const Op = Sequelize.Op;

const router = express.Router();

// const validateSongRequests = [
//     check('title')
//         .exists({ checkFalsy: true })
//         .withMessage('Song title is required.'),
//     check('url')
//         .exists({ checkFalsy: true })
//         .withMessage('Audio is required.'),
//     handleValidationErrors
// ];

// Get all songs
// Authentication: false
router.get('/', async (req, res) => {
    let { page, size } = req.query;
    if (!page || isNaN(page)) page = 1;
    if (!size || isNaN(size)) size = 1;
    let pagination = {};
    if (page && page > 0) {
        if (size && size > 0) {
            page = parseInt(page);
            size = parseInt(size);
            pagination.limit = size;
            pagination.offset = (page - 1) * size;
        } else {
            res.status(400);
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "size": "Size must be greater than or equal to 0"
                }
            });
        }
    } else {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "page": "Page must be greater than or equal to 0"

            }
        });
    }
    const songs = await Song.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        ...pagination
    });
    if (songs[0].createdAt > new Date()) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "createdAt": "CreatedAt is invalid"
            }
        });
    }
    return res.json({
        songs,
        page,
        size
    });
});

// Get all Songs created by the Current User
// Authentication: true
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
        const songs = await Song.findAll({
            where: { userId: user.id }
        });
        return res.json({ songs });
    } else {
        res.status(401);
        return res.json({
            "message": "Authentication required",
            "statusCode": 401
        });
    }
});

// Get details of a Song from an id
// Authentication: false
router.get('/:songId', async (req, res) => {
    const song = await Song.findOne({
        where: { id: req.params.songId },
        include: [
            { model: User, as: "Artist", attributes: ['id', 'username', 'previewImage'] },
            { model: Album, attributes: ['id', 'title', 'imageUrl'] },
        ],
    });
    if (!song) {
        res.status(404)
        return res.json({
            "message": "Song couldn't be found"
        });
    } else {
        return res.json(song);
    }
});

// Get all Comments by a Song's id
// Authentication: false
router.get('/:songId/comments', async (req, res) => {
    const comments = await Song.findOne({
        where: { id: req.params.songId },
        attributes: [],
        include: [{
            model: Comment,
            include: [{
                model: User,
                // attributes: ['id', 'username'],
                // through: { attributes: [] }
            }]
        }]
    });
    if (!comments) {
        res.status(404);
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        });
    } else {
        return res.json(comments);
    }
});

// User.find({
//     where: { id: id },
//     attributes: [],
//     include: [{
//         model: UserRole,
//         include: [{
//             model: Permission,
//             attributes: ['id', 'name'],
//             through: { attributes: [] }
//         }]
//     }]
// })

// Create a Comment for a Song based on the Song's id
// Authentication: true
router.post('/:songId/comments', requireAuth, async (req, res) => {
    const song = await Song.findByPk(req.params.songId);
    if (!song) {
        res.status(404);
        return res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        });
    }
    if (!req.body.body) {
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "body": "Comment body text is required"
            }
        });
    }
    const comment = await Comment.create({
        userId: req.user.id,
        songId: song.id,
        body: req.body.body
    });
    return res.json(comment);
});

// Create a Song - creates new song w/ or w/o album.
// Authentication: true
// make sure a user cannot create a new song on someone else's album
router.post('/', requireAuth, async (req, res) => {
    const albums = await Album.findAll();
    if (req.body.albumId < 0 || req.body.albumId > albums.length) {
        res.status(404);
        return res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        })
    }
    const newSong = await Song.create({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        imageUrl: req.body.imageUrl,
        albumId: req.body.albumId,
        userId: req.user.id
    })
    if (!newSong) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "title": "Song title is required",
                "url": "Audio is required"
            }
        });
    } else {
        return res.json(newSong);
    }
});

// Edit a Song - PUT /:songId
// Authentication: true
router.put('/:songId', requireAuth, async (req, res) => {
    if (req.user) {
        const song = await Song.findByPk(req.params.songId);
        if (!song) {
            res.status(404);
            return res.json({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        }
        if (req.user.id !== song.userId) {
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }
        if (!req.body.url || !req.body.title) {
            res.status(400);
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "title": "Song title is required",
                    "url": "Audio is required"
                }
            });
        }
        song.title = req.body.title;
        song.description = req.body.description;
        song.url = req.body.url;
        song.albumId = req.body.albumId;
        song.save();
        return res.json(song);
    } else {
        res.status(401);
        return res.json({
            "message": "Authentication required",
            "statusCode": 401
        });
    }
});

// Delete a Song
// Authentication: true
router.delete('/:songId', requireAuth, async (req, res) => {
    if (req.user) {
        const song = await Song.findByPk(req.params.songId);
        if (!song) {
            res.status(404);
            return res.json({
                "message": "Song couldn't be found",
                "statusCode": 404
            });
        }
        if (req.user.id !== song.userId) {
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        } else {
            await song.destroy();
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        }
    } else {
        res.status(401);
        return res.json({
            "message": "Authentication required",
            "statusCode": 401
        });
    }
});

module.exports = router;