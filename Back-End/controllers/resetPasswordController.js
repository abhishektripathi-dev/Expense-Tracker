const path = require("path");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const crypto = require("crypto");

const User = require("../models/User");
const ForgotPassword = require("../models/ForgotPassword");
const sendEmail = require("../utils/sendEmail");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Forgot Password - Request a reset link
exports.forgotpassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetUrl = `${process.env.FRONTEND_URL}/resetPassword.html?token=${resetToken}`;


        const expiryTime = new Date(Date.now() + 3600000); // 1 hour from now

        await ForgotPassword.create({
            userId: user.id,
            resetToken,
            active: true,
            expiresby: expiryTime,
        });

        const message = `Click the link below to reset your password:\n\n${resetUrl}`;
        await sendEmail(user.email, "Password Reset Request", message);

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        console.error("Error requesting password reset:", error);
        res.status(500).json({ message: "An error occurred while requesting password reset" });
    }
};

// Reset Password - Update the password
exports.resetpassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const resetPasswordEntry = await ForgotPassword.findOne({
            where: {
                resetToken: id,
                active: true,
                expiresby: { [Op.gt]: new Date() },
            },
        });

        if (!resetPasswordEntry) {
            return res.status(404).json({ message: "Invalid or expired reset token" });
        }

        const user = await User.findByPk(resetPasswordEntry.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        resetPasswordEntry.active = false;
        await resetPasswordEntry.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "An error occurred while resetting password" });
    }
};

// Update Password - Directly update user password
exports.updatepassword = async (req, res) => {
    const { resetpasswordid } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const resetPasswordEntry = await ForgotPassword.findOne({
            where: { id: resetpasswordid, active: true },
        });

        if (!resetPasswordEntry) {
            return res.status(404).json({ message: "Reset token not found or already used" });
        }

        const user = await User.findByPk(resetPasswordEntry.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        resetPasswordEntry.active = false;
        await resetPasswordEntry.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "An error occurred while updating the password" });
    }
};