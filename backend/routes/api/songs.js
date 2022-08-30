const express = require('express')
const { Song } = require('../../db/models')
// const { check } = require('express-validator');
// const { setTokenCookie, requireAuth } = require('../../utils/auth');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs);
});

module.exports = router;