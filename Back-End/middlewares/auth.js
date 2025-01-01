const jwt = require("jsonwebtoken");
require("dotenv").config();

// Secret key for signing JWTs
const SECRET_KEY = process.env.JWT_SECRET_KEY; // Replace with an environment variable in production

// Authentication middleware
exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header

    if (!token) {
        return res.status(401).json({ message: "Access token missing or invalid" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
