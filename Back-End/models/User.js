const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const PremiumPayment = require("./PremiumPayment"); // Import PremiumPayment model

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

// Associations
User.hasMany(PremiumPayment, { foreignKey: "userId", onDelete: "CASCADE" });
PremiumPayment.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
