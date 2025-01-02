const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

// Database
const sequelize = require("./config/database");

// Routes
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

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
app.use("/api", paymentRoutes);


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
