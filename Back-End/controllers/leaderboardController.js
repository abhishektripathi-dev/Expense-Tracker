const sequelize = require("../utils/database");
const User = require("../models/User");
const Expense = require("../models/Expense");

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboardData = await User.findAll({
            attributes: [
                "id",
                "name",
                "isPremium",
                [sequelize.fn("SUM", sequelize.col("Expenses.amount")), "totalExpenses"],
            ],
            include: [
                {
                    model: Expense,
                    attributes: [],
                },
            ],
            group: ["User.id"],
            order: [[sequelize.literal("SUM(Expenses.amount)"), "DESC"]],
            raw: true,
        });

        const formattedData = leaderboardData.map((user) => ({
            name: user.name,
            totalExpenses: user.totalExpenses || 0, // Handle users with no expenses
            isPremium: user.isPremium,
        }));

        res.status(200).json({ leaderboard: formattedData });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({
            message: "An error occurred while fetching leaderboard data.",
        });
    }
};
