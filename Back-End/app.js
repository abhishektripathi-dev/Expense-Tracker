const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Database
const sequelize = require("./config/database");

// Routes
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// Models
const User = require("./models/User");
const Expense = require("./models/Expense");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);

// Associations
User.hasMany(Expense, { foreignKey: "userId", onDelete: "CASCADE" });
Expense.belongsTo(User, { foreignKey: "userId" });

// Database connection
sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        console.log("Database synced successfully.");
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });
