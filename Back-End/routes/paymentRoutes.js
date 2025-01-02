const express = require("express");
const { createPremiumOrder, verifyPremiumPayment } = require("../controllers/paymentController");
const { authenticate } = require("../middlewares/auth"); // Assuming you have an auth middleware

const router = express.Router();

router.get("/premium", authenticate, createPremiumOrder);
router.post("/premiumverify", authenticate, verifyPremiumPayment);

module.exports = router;
