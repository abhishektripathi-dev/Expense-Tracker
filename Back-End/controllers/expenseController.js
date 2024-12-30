// controllers/expenseController.js
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
    const { amount, description, category } = req.body;

    try {
        const expense = await Expense.create({ amount, description, category });
        res.status(201).json({
            message: "Expense added successfully",
            expense,
        });
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({
            message: "An error occurred while adding the expense",
        });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error retrieving expenses:", error);
        res.status(500).json({
            message: "An error occurred while retrieving expenses",
        });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, category } = req.body;

    try {
        const expense = await Expense.findByPk(id);
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
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        await expense.destroy();
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({
            message: "An error occurred while deleting the expense",
        });
    }
};
