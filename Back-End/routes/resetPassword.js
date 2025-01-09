const express = require("express");

const  resetPasswordController  = require("../controllers/resetPasswordController");

const router = express.Router();

router.get('/updatepassword/:resetpasswordid', resetPasswordController.updatepassword)

router.post('/resetpassword/:id', resetPasswordController.resetpassword)

router.post('/forgotpassword', resetPasswordController.forgotpassword)

module.exports = router;