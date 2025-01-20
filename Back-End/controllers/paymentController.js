const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const PremiumPayment = require("../models/PremiumPayment"); // Assuming you have a PremiumPayment model
const User = require("../models/User"); // Assuming you have a User model
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
exports.createPremiumOrder = async (req, res) => {
    try {
        const order = await razorpay.orders.create({
            amount: 2500, // Amount in paise (₹25.00)
            currency: "INR",
            receipt: `receipt_${req.user.id}_${Date.now()}`,
        });

        // Optionally save order details to the database
        await PremiumPayment.create({
            id: order.id,
            userId: req.user.id,
            orderId: order.id,
            status: "PENDING",
        });

        res.status(200).json({ key_id: process.env.RAZORPAY_KEY_ID, order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Failed to create payment order" });
    }
};

// Verify Razorpay Payment
exports.verifyPremiumPayment = async (req, res) => {
    const { order_id, payment_id } = req.body;

    try {
        // Find the order in the database
        const payment = await PremiumPayment.findOne({ where: { orderId: order_id } });
        if (!payment) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update payment status in the database
        payment.paymentId = payment_id;
        payment.status = "SUCCESS";
        await payment.save();

        // Update user to premium status
        const user = await User.findByPk(payment.userId);
        if (user) {
            user.isPremium = true;
            await user.save();
        }

        res.status(200).json({ message: "Payment verified and premium activated" });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Payment verification failed" });
    }
};
