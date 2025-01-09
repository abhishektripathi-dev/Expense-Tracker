const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database"); // Import the connection instance
const User = require("./User"); // Import the User model

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: { // Add the foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference the User model
      key: "id",   // Use the `id` column in the User model
    },
    onDelete: "CASCADE", // Optional: Delete expenses if the user is deleted
  },
});


// Export the model
module.exports = Expense;
