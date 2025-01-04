// routes/leaderboardRoutes.js
const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");
const { authenticate } = require("../middlewares/auth");

// Route to fetch leaderboard data
router.get("/leaderboard", authenticate, leaderboardController.getLeaderboard);

module.exports = router;
