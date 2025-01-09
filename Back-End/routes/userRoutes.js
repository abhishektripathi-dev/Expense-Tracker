const express = require("express");
const { signup, login, getUserDetails} = require("../controllers/userController");
// const { requestPasswordReset } = require("../controllers/passwordResetController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// router.post("/forgotpassword", requestPasswordReset);

router.get("/user", authenticate, getUserDetails);

module.exports = router;
