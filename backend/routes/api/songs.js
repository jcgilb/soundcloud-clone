const express = require('express');
const { Song, User } = require('../../db/models');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

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