const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/User");

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        console.log(existingUser);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({ name, email, password: hashedPassword });

        // Return success message
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        // Handle error
        console.error("Error registering user:", error);
        res.status(500).json({
            message: "An error occurred while registering user",
        });
    }
};

function generateToken(user) {
    const payload = { id: user.id, email: user.email };
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
        console.error(
            "JWT_SECRET_KEY is not defined in the environment variables"
        );
        throw new Error("Server configuration error");
    }

    // return jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return jwt.sign(payload, secretKey);
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "User not authorized" });
        }

        res.status(200).json({
            message: "User login successful",
            token: generateToken(user),
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "An error occurred while logging in" });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "isPremium"],
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Failed to fetch user details" });
    }
};
