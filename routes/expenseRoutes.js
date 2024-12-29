const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.get("/expenses", expenseController.getExpenses);
router.post("/expenses", expenseController.addExpense);
router.put("/expenses/:id", expenseController.updateExpense);
router.delete("/expenses/:id", expenseController.deleteExpense);

module.exports = router;
