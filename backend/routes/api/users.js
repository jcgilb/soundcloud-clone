const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// // Sign up
// router.post('/', async (req, res) => {
//     const { email, password, firstName, lastName, username } = req.body;
//     const user = await User.signup({ email, username, firstName, lastName, password });
//     await setTokenCookie(res, user);
//     return res.json({
//         user
//     });
// });

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a first name.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a last name.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, requireAuth, async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body;
    const user = await User.signup({ email, username, firstName, lastName, password });
    user.toJSON();
    let token = await setTokenCookie(res, user);
    user.token = token;
<<<<<<< HEAD
=======
    raw: true
>>>>>>> dev
    return res.json({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "token": token
    });
});

// Get details of an Artist from an id
// Authentication: false
router.get('/:userId', async (req, res) => {
    const artist = await User.findByPk(req.params.userId);
    if (!artist) {
        res.status(404);
        return res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        });
    } else return res.json(artist);
});

// Get all playlists of an artist from an id
// Authentication: false
router.get('/:userId/playlists', async (req, res) => {
    const playlists = await User.findByPk(req.params.userId, {
        attributes: [],
        include: { model: Playlist }
    });
    if (!playlists) {
        res.status(404);
        return res.json({
            "message": "Artist couldn't be found",
            "statusCode": 404
        });
    } else return res.json(playlists);
});



module.exports = router;