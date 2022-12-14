const express = require('express');
const { Song, Playlist, PlaylistSong } = require('../../db/models');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { ResultWithContext } = require('express-validator/src/chain');

const router = express.Router();

// Create a Playlist
// Authentication: true
router.post('/', async (req, res) => {
    if (req.body.name) {
        const newPlaylist = await Playlist.create({
            userId: req.user.id,
            name: req.body.name,
            imageUrl: req.body.imageUrl
        });
        return res.json(newPlaylist);
    } else {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "name": "Playlist name is required"
            }
        });
    }
});

// Get all Playlists created by the Current User
// Authentication: true
router.get('/current', [requireAuth, restoreUser], async (req, res) => {
    const playlists = await Playlist.findAll({
        where: { userId: req.user.id }
    });
    // if (!playlists.length) {
    if (!playlists) {
        res.status(404);
        return res.json({
            "statusCode": 404,
            "message": "No playlists to see here"
        });
    }
    return res.json({ playlists });
});

// Add a Song to a Playlist based on the Playlists's id
// Authentication: true
router.post('/:playlistId/songs', requireAuth, async (req, res) => {
    const song = await Song.findByPk(req.body.songId);
    if (!song) {
        res.status(404);
        res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        });
    }
    const playlist = await Playlist.findByPk(req.params.playlistId);
    if (!playlist) {
        res.status(404);
        res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        });
    }
    const newPlaylistSong = await PlaylistSong.create({
        songId: song.id,
        playlistId: playlist.id,
        attributes: ['id', 'playlistId', 'songId']
    });
    const newSong = newPlaylistSong.toJSON();
    delete newSong.createdAt
    delete newSong.updatedAt
    delete newSong.order
    return res.json(newSong);
});

// Get details of a playlist by id
// Authentication: false
router.get('/:playlistId', async (req, res) => {
    const playlist = await Playlist.findOne({
        include: [{
            model: Song,
            attributes: [
                'id', 'userId', 'albumId', 'title', 'description',
                'url', 'createdAt', 'updatedAt', 'imageUrl'],
            through: { attributes: [] },
        }],
        where: { id: req.params.playlistId }
    });
    if (!playlist) {
        res.status(404);
        return res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        });
    }
    raw: true
    return res.json(playlist);
});

// Edit a Playlist
// Authentication: true
router.put('/:playlistId', requireAuth, async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "name": "Playlist name is required"
            }
        });
    }
    const playlist = await Playlist.findByPk(req.params.playlistId);
    if (!playlist) {
        res.status(404);
        return res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        });
    }
    playlist.name = req.body.name;
    playlist.imageUrl = req.body.imageUrl;
    playlist.save();
    return res.json(playlist);
});

// Delete a Playlist
// Authentication: true
router.delete('/:playlistId', requireAuth, async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.playlistId);
    if (!playlist) {
        res.status(404);
        return res.json({
            "message": "Playlist couldn't be found",
            "statusCode": 404
        });
    }
    if (req.user.id !== playlist.userId) {
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }
    else {
        await playlist.destroy();
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }
});

module.exports = router;

