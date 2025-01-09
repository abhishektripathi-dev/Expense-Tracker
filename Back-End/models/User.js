const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default to non-premium
    },
});

module.exports = User;
