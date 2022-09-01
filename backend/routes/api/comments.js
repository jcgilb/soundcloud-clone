const express = require('express');
const { Song, User, Album, Comment } = require('../../db/models');
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

// Get all comments
// Authentication: false
router.get('/', async (req, res) => {
    const comments = await Comment.findAll();
    return res.json(comments);
});

// Get all comments created by the current user
// Authentication: true
router.get('/current', requireAuth, async (req, res) => {
    if (req.user) {
        const comments = await Comment.findAll({
            where: { userId: req.user.id }
        });
        return res.json({ comments });
    } else {
        res.status(401);
        return res.json({
            "message": "Authentication required",
            "statusCode": 401
        });
    }
});

// Edit a comment - PUT /:commentId
// Authentication: true
router.put('/:commentId', requireAuth, async (req, res) => {
    if (req.user) {
        const comment = await Comment.findOne({
            where: { id: req.params.commentId }
        });
        if (!comment) {
            res.status(404);
            return res.json({
                "message": "comment couldn't be found",
                "statusCode": 404
            });
        } if (req.user.id !== comment.userId) {
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            });
        }
        if (req.body.body) {
            comment.body = req.body.body;
            comment.save();
            return res.json(comment);
        } else {
            res.status(400);
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                    "title": "Comment title is required"
                }
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

// Delete a comment
// Authentication: true
router.delete('/:commentId', requireAuth, async (req, res) => {
    if (req.user) {
        const comment = await Comment.findByPk(req.params.commentId);
        if (!comment) {
            res.status(404);
            return res.json({
                "message": "Comment couldn't be found",
                "statusCode": 404
            });
        } else if (req.user.id !== comment.userId) {
            res.status(403);
            return res.json({
                "message": "Forbidden",
                "statusCode": 403
            })
        } else {
            await comment.destroy();
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