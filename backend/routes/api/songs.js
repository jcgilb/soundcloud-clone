const express = require('express');
const { Song, User, Album } = require('../../db/models');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');

const router = express.Router();

// Get all songs
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
    } else return res.json({
        "message": "Authentication required",
        "statusCode": 401
    });
});


// Get details of a Song from an id
// Authentication: false
router.get('/:songId', async (req, res) => {
    const song = await Song.findOne({
        where: { id: req.params.songId }
    });
    if (song) {
        return res.json(song);
    } else {
        res.status(404)
        return res.json({
            "message": "Song not found"
        });
    }
});

// Create a Song - creates new song w/ or w/o album.
// Authentication: true
router.post('/', restoreUser, async (req, res) => {
    const { user } = req;
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
        userId: user.id
    });
    if (!newSong) {
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "title": "Song title is required",
                "url": "Audio is required"
            }
        });
    }
    return res.json(newSong);

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