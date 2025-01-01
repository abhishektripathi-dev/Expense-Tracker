const express = require("express");
const expenseController = require("../controllers/expenseController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/expenses", authenticate, expenseController.getExpenses);
router.post("/expenses", authenticate, expenseController.addExpense);
router.put("/expenses/:id", authenticate, expenseController.updateExpense);
router.delete("/expenses/:id", authenticate, expenseController.deleteExpense);

module.exports = router;
