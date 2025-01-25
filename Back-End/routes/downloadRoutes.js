// filepath: /C:/Users/Abhishek Tripathi/Desktop/Expense Tracker/Back-End/routes/downloadRoutes.js
const express = require('express');

const downloadController = require('../controllers/downloadController');
const checkPremium = require('../middlewares/checkPremium');
const { authenticate } = require('../middlewares/auth'); // Assuming you have an authentication middleware

const router = express.Router();

// console.log(typeof downloadController.downloadFile); // Should log 'function'
// console.log(typeof authenticate); // Should log 'function'
// console.log(typeof checkPremium); // Should log 'function'


router.get('/download', authenticate, checkPremium, downloadController.downloadFile);


module.exports = router;