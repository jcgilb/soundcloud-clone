const express = require("express");
const { Song, SongLikes } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

// Get all songlikes
// Authentication: false
router.get("/", async (req, res) => {
  const likes = await SongLikes.findAll({});
  return res.json({ likes });
});

// Delete a song like
// Authentication: true
router.delete("/:likeId", requireAuth, async (req, res) => {
  if (req.user) {
    const like = await SongLikes.findByPk(req.params.likeId);
    if (!like) {
      res.status(404);
      return res.json({
        message: "Like couldn't be found",
        statusCode: 404,
      });
    } else if (req.user.id !== like.userId) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    } else {
      await like.destroy();
      return res.json({
        message: "Successfully disliked",
        statusCode: 200,
      });
    }
  } else {
    res.status(401);
    return res.json({
      message: "Authentication required",
      statusCode: 401,
    });
  }
});

module.exports = router;
