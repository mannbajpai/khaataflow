import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ExpenseSplit = sequelize.define('ExpenseSplit', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    groupExpenseId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'GroupExpenses',
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    settled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

export default ExpenseSplit;