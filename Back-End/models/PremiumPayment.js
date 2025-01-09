const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const PremiumPayment = sequelize.define("PremiumPayment", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // Ensure this matches your `User` model
            key: "id",
        },
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true, // Will be null until payment is verified
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDING", // Possible values: PENDING, SUCCESS
    },
});

module.exports = PremiumPayment;
