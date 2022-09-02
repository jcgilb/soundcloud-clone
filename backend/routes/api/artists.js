const express = require('express');
const { Song, User, Album, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');

const router = express.Router();


// Get all Songs of an Artist from an id
// Authentication: false
router.get('/:userId/songs', async (req, res) => {
    const songs = await User.findAll({
        where: { id: req.params.userId },
        attributes: [],
        include: { model: Song }
    });
    if (!songs.length) {
        res.status(404);
        return res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        });
    } else return res.json(songs[0]);
});

// Get all albums of an artist from an id
// Authentication: false
router.get('/:userId/albums', async (req, res) => {
    const albums = await User.findAll({
        where: { id: req.params.userId },
        attributes: [],
        include: { model: Album }
    });
    if (!albums.length) {
        res.status(404);
        return res.json({
            "message": "Album couldn't be found",
            "statusCode": 404
        });
    } else return res.json(albums[0]);
});

module.exports = router;