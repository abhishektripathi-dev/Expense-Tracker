const path = require("path");
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME?.trim(),
  process.env.DB_USER?.trim(),
  process.env.DB_PASSWORD?.trim(),
  {
    host: process.env.DB_HOST?.trim(),
    dialect: process.env.DB_DIALECT?.trim() || "mysql", // Default to "mysql"
  }
);

module.exports = sequelize;
