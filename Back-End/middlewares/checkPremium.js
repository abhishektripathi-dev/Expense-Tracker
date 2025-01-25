const User = require("../models/User");

const checkPremium = (req, res, next) => {
    const user = req.user; // Assuming user information is stored in req.user after authentication

    User.findByPk(user.id)
        .then((user) => {
            if (user && user.isPremium) {
                next();
            } else {
                res.status(403).json({
                    message: "Downloading is only for premium members",
                });
            }
        })
        .catch((error) => {
            console.error("Error checking premium status:", error);
            res.status(500).json({
                message: "An error occurred while checking premium status",
            });
        });
};

module.exports = checkPremium;
