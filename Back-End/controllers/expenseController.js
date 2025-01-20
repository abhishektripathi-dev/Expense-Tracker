const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
    console.log(req.body);
    const { amount, description, category} = req.body;

    try {
        const newExpense = await Expense.create({
            amount,
            description,
            category,
            userId: req.user.id, // Assuming `req.user` is populated by the `authenticate` middleware
        });
        res.status(201).json({
            message: "Expense added successfully",
            newExpense,
        });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({
            message: "An error occurred while adding the expense",
        });
    }
};

// exports.getExpenses = async (req, res) => {
//     try {
//         // Retrieve expenses specific to the authenticated user
//         const allExpenses = await Expense.findAll({
//             where: {
//                 userId: req.user.id, // Filter by user ID
//             },
//         });

//         res.status(200).json(allExpenses);
//     } catch (error) {
//         console.error("Error retrieving expenses:", error);
//         res.status(500).json({
//             message: "An error occurred while retrieving expenses",
//         });
//     }
// };
exports.getExpenses = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
    const offset = (page - 1) * limit;

    try {
        // Retrieve expenses specific to the authenticated user with pagination
        const { count, rows: expenses } = await Expense.findAndCountAll({
            where: {
                userId: req.user.id, // Filter by user ID
            },
            limit,
            offset,
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            expenses,
            pagination: {
                totalItems: count,
                totalPages,
                currentPage: page,
                itemsPerPage: limit,
            },
        });
    } catch (error) {
        console.error("Error retrieving expenses:", error);
        res.status(500).json({
            message: "An error occurred while retrieving expenses",
        });
    }
};
// /api/expenses?page=1&limit=10

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, category } = req.body;

    try {
        const expense = await Expense.findOne({
            where: { id, userId: req.user.id },
        }); // Ensure the user owns the expense

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        expense.amount = amount;
        expense.description = description;
        expense.category = category;

        await expense.save();

        res.status(200).json({ message: "Expense updated successfully" });
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({
            message: "An error occurred while updating the expense",
        });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({
            where: { id, userId: req.user.id }, // Ensure the user owns the expense
        });

        if (!expense) {
            return res
                .status(404)
                .json({ message: "Expense not found or unauthorized" });
        }

        await expense.destroy();
        return res
            .status(200)
            .json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        return res
            .status(500)
            .json({ message: "An error occurred while deleting the expense" });
    }
};
