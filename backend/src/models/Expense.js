import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Expense = sequelize.define('Expense', {
    
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key: "id"
        },
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default Expense;