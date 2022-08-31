const express = require('express');
const { Song, User, Album } = require('../../db/models');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');

const router = express.Router();

const validateSongRequests = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Song title is required.'),
    check('url')
        .exists({ checkFalsy: true })
        .withMessage('Audio is required.'),
    handleValidationErrors
];

// Get all songs
// Authentication: false
router.get('/', async (req, res) => {
    const songs = await Song.findAll();
    return res.json(songs);
});

// Get all Songs created by the Current User
// Authentication: true
router.get('/current', restoreUser, async (req, res) => {
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
    if (song) {
        return res.json(song);
    } else {
        res.status(404)
        return res.json({
            "message": "Song couldn't be found"
        });
    }
});

// Create a Song - creates new song w/ or w/o album.
// Authentication: true
// make sure a user cannot create a new song on someone else's album
router.post('/', restoreUser, async (req, res) => {
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
    });
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
router.put('/:songId', restoreUser, async (req, res) => {
    if (req.params.songId < 0 || req.params.songId > await Song.count()) {
        res.status(404);
        return res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        });
    }
    if (req.body.url === null || req.body.title === null) {
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
    if (req.user) {
        const song = await Song.findAll({
            where: { id: req.params.songId }
        });
        if (req.user.id !== song[0].userId) {
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        }
        if (song.length) {
            song[0].title = req.body.title;
            song[0].description = req.body.description;
            song[0].url = req.body.url;
            song[0].albumId = req.body.albumId;
            song[0].save();
            return res.json(song[0]);
        } else {
            res.status(404);
            return res.json({
                "message": "Song couldn't be found",
                "statusCode": 404
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

// Delete a Song
// Authentication: true
router.delete('/:songId', restoreUser, async (req, res) => {
    if (req.user) {
        const song = await Song.findByPk(req.params.songId);
        if (req.user.id !== song.userId) {
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        }
        if (song) {
            await song.destroy();
            return res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            });
        } else {
            res.status(404);
            return res.json({
                "message": "Song couldn't be found",
                "statusCode": 404
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

// All endpoints that require authentication 
// and the current user does not have the
// correct role(s) or permission(s).

// * Request: endpoints that require proper authorization
// * Error Response: Require proper authorization
//   * Status Code: 403
//   * Headers:
//     * Content-Type: application/json
//   * Body:

//     ```json
//     {
//       "message": "Forbidden",
//       "statusCode": 403
//     }
//     ```
// All endpoints that require a current user to be logged in.

// * Request: endpoints that require authentication
// * Error Response: Require authentication
//   * Status Code: 401
//   * Headers:
//     * Content-Type: application/json
//   * Body:

//     ```json
//     {
//       "message": "Authentication required",
//       "statusCode": 401
//     }
//     ```

module.exports = router;