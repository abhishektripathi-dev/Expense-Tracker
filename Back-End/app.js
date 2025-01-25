const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

// Database
const sequelize = require("./utils/database");

// Routes
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const resetPasswordRoutes = require("./routes/resetPassword");
const downloadRoutes = require('./routes/downloadRoutes');


// Models
const User = require("./models/User");
const Expense = require("./models/Expense");
const ForgotPassword = require("./models/ForgotPassword");
const PremiumPayment = require("./models/PremiumPayment");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(cors()); // Enable CORS for all requests

// Routes
app.use("/api", userRoutes);
app.use("/api", expenseRoutes);
app.use("/api", paymentRoutes);
app.use("/api", leaderboardRoutes);
app.use("/api", resetPasswordRoutes);
app.use('/api', downloadRoutes);

// Associations for User and Expense
User.hasMany(Expense, { foreignKey: "userId", onDelete: "CASCADE" });
Expense.belongsTo(User, { foreignKey: "userId" });


// Associations for User and PremiumPayment
User.hasMany(PremiumPayment, { foreignKey: "userId", onDelete: "CASCADE" });
PremiumPayment.belongsTo(User, { foreignKey: "userId" });


// Associations for User and ForgotPassword
User.hasMany(ForgotPassword, { foreignKey: "userId", as: "passwordResets" });
ForgotPassword.belongsTo(User, { foreignKey: "userId", as: "user" });

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
